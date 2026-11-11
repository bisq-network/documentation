#!/bin/sh
# Turn a MediaWiki database dump into an XML export with throwaway Docker containers.
#
#   sh scripts/sql-dump-to-xml.sh <dump.sql | dump.sql.gz | dump.sql.bz2> <output folder> [database] [table prefix]
#
# Use it only when the backup has no XML export, on a private machine: the dump
# also holds user accounts, email addresses and password hashes. It restores only
# the wiki database into a temporary MariaDB 10.5 container, runs MediaWiki 1.34's
# dumpBackup.php against it, and writes <output folder>/bisq-wiki-full.xml. The
# containers, their network (internal, without internet access) and the temporary
# settings file are removed afterwards, also when a step fails or on Ctrl-C. The
# output folder must be outside this repository.
#
# The database name is $wgDBname from the wiki's LocalSettings.php. It may be left
# out when the dump creates exactly one database besides MariaDB's own; the table
# prefix ($wgDBprefix) is found from the restored tables when left out. Both may
# contain only letters, digits and underscores.
set -eu

# Images pinned by digest: MariaDB 10.5.29 and MediaWiki 1.34.4.
MARIADB_IMAGE=mariadb@sha256:a530aeeefd82f4fa5150f391b6c75462140904780338766f6b03acecb1cca3ce
MEDIAWIKI_IMAGE=mediawiki@sha256:256fd9ff6a725e76a9cddb44be4313bc3d55a4da3f3d495f5e1f2f06f4880e16

# Text from the dump or the command line, without control characters, for messages.
say() { printf '%s\n' "$*" | tr -d '\000-\010\013-\037\177'; }
fail() { say "$1" >&2; exit "${2:-2}"; }
lower() { printf '%s' "$1" | tr '[:upper:]' '[:lower:]'; }

[ $# -ge 2 ] || fail "Usage: sh scripts/sql-dump-to-xml.sh <dump.sql[.gz|.bz2]> <output folder> [database] [table prefix]"
dump=$1 out=$2 database=${3:-} prefix=${4-}
[ -f "$dump" ] || fail "No such file: $dump"

# The output must stay outside the repository, also through links or another letter case.
repo=$(cd "$(dirname "$0")/.." && pwd -P)
inside_repo() { case "$(lower "$1")/" in "$(lower "$repo")"/*) return 0 ;; esac; return 1; }
parent=$(cd "$(dirname "$out")" 2>/dev/null && pwd -P) || fail "The parent folder of $out does not exist."
if inside_repo "$parent/$(basename "$out")"; then fail "Choose an output folder outside the repository ($repo): the export is backup data."; fi

case "$dump" in
  *.bz2) unpack="bzip2 -dc"; check="bzip2 -tq" ;;
  *.gz) unpack="gzip -dc"; check="gzip -tq" ;;
  *) unpack="cat"; check="true" ;;
esac
# sh has no pipefail: test the compressed file first, so a damaged dump stops here.
$check "$dump" 2>/dev/null || fail "$dump is damaged or incomplete; download it again." 1

# Names that are safe in SQL and shell text: letters, digits and underscores only.
valid_name() { case $1 in "" | *[!A-Za-z0-9_]*) return 1 ;; esac; }
valid_prefix() { case $1 in *[!A-Za-z0-9_]*) return 1 ;; esac; }
if [ -z "$database" ]; then
  # Database names only, from the CREATE DATABASE lines; nothing else is read.
  names=$($unpack "$dump" | grep -a -o -E '^CREATE DATABASE (/\*!32312 IF NOT EXISTS\*/ )?`[^`]+`' | sed -E 's/.*`([^`]+)`/\1/' | grep -v -x -E 'mysql|information_schema|performance_schema|sys' || true)
  count=$(printf '%s' "$names" | grep -c . || true)
  if [ "$count" -eq 0 ]; then database=wiki
  elif [ "$count" -eq 1 ]; then database=$names
  else fail "The dump holds several databases: $(echo $names). Pass the wiki's (\$wgDBname) as the third argument."
  fi
fi
valid_name "$database" || fail "Not a usable database name: $database. Only letters, digits and underscores are accepted; pass the wiki's \$wgDBname as the third argument."
[ $# -lt 4 ] || valid_prefix "$prefix" || fail "Not a usable table prefix: $prefix. Only letters, digits and underscores are accepted."

command -v docker >/dev/null && docker info >/dev/null 2>&1 || fail "Docker is not installed or not running."

mkdir -p "$out"
out=$(cd "$out" && pwd -P)
if inside_repo "$out"; then fail "Choose an output folder outside the repository ($repo): the export is backup data."; fi

run=wiki-xml-$$
password=$(od -An -N12 -tx1 /dev/urandom | tr -d ' \n')
work=$(mktemp -d)
cleanup() {
  docker rm -f "$run-db" >/dev/null 2>&1 || true
  docker network rm "$run" >/dev/null 2>&1 || true
  rm -f "$work/LocalSettings.php" "$work/unpack.status"
  rmdir "$work" 2>/dev/null || true
}
trap cleanup EXIT
trap 'exit 130' INT TERM HUP

client() { docker exec -i -e MYSQL_PWD="$password" "$run-db" mysql --sandbox -uroot "$@"; }

say "Restoring database '$database' into a temporary MariaDB container…"
docker network create --internal "$run" >/dev/null
docker run -d --name "$run-db" --network "$run" -e MARIADB_ROOT_PASSWORD="$password" "$MARIADB_IMAGE" >/dev/null
# Wait for the final server over TCP: the image's first, socket-only start for
# initialisation already answers a ping before the root password is set.
tries=0
until client -h127.0.0.1 -e 'SELECT 1' >/dev/null 2>&1 </dev/null; do
  tries=$((tries + 1)); [ $tries -lt 90 ] || fail "MariaDB did not start." 1
  sleep 2
done
client -e "CREATE DATABASE IF NOT EXISTS \`$database\`" </dev/null
# --one-database skips every statement for other databases, including MariaDB's own
# user tables in an --all-databases dump; --sandbox refuses shell and file commands.
{ $unpack "$dump" || echo $? > "$work/unpack.status"; } | client --one-database "$database"
[ ! -s "$work/unpack.status" ] || fail "Reading $dump failed; nothing was exported." 1

if [ $# -lt 4 ]; then
  found=$(client -N -e "SELECT CONCAT('prefix:', SUBSTRING(table_name, 1, CHAR_LENGTH(table_name) - 4)) FROM information_schema.columns WHERE table_schema = '$database' AND column_name = 'page_title' AND table_name LIKE '%page'" </dev/null)
  case $(printf '%s\n' "$found" | grep -c '^prefix:' || true) in
    0) fail "No MediaWiki tables found in database '$database'." 1 ;;
    1) prefix=${found#prefix:} ;;
    *) fail "Several MediaWiki installations in '$database' ($(echo $found)). Pass the wiki's \$wgDBprefix as the fourth argument." ;;
  esac
  valid_prefix "$prefix" || fail "Not a usable table prefix: $prefix. Pass the wiki's \$wgDBprefix as the fourth argument."
fi

# The settings read every value from the environment, so nothing from the dump becomes PHP code.
cat > "$work/LocalSettings.php" <<'PHP'
<?php
$wgSitename = "Bisq Wiki";
$wgServer = "http://localhost";
$wgDBtype = "mysql";
$wgDBserver = getenv("WIKI_DB_SERVER");
$wgDBname = getenv("WIKI_DB_NAME");
$wgDBprefix = getenv("WIKI_DB_PREFIX");
$wgDBuser = "root";
$wgDBpassword = getenv("WIKI_DB_PASSWORD");
PHP

say "Exporting every page with its full history…"
docker run --rm --network "$run" -v "$work/LocalSettings.php:/var/www/html/LocalSettings.php:ro" \
  -e WIKI_DB_SERVER="$run-db" -e WIKI_DB_NAME="$database" -e WIKI_DB_PREFIX="$prefix" -e WIKI_DB_PASSWORD="$password" \
  "$MEDIAWIKI_IMAGE" php -d display_errors=stderr maintenance/dumpBackup.php --full --quiet > "$out/bisq-wiki-full.xml"
tail -c 64 "$out/bisq-wiki-full.xml" | grep -q '</mediawiki>' || fail "The export is incomplete: $out/bisq-wiki-full.xml" 1

say "Wrote $out/bisq-wiki-full.xml ($(grep -c '<page>' "$out/bisq-wiki-full.xml") pages)."
say "Next: npm run compare-backup -- \"$out/bisq-wiki-full.xml\" <the backup part that holds images/>"
