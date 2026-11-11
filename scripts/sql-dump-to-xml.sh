#!/bin/sh
# Turn a MediaWiki database dump into an XML export with throwaway Docker containers.
#
#   sh scripts/sql-dump-to-xml.sh <dump.sql | dump.sql.gz | dump.sql.bz2> <output folder> [database] [table prefix]
#
# Use it only when the backup has no XML export, on a private machine: the dump
# also holds user accounts, email addresses and password hashes. It restores only
# the wiki database into a temporary MariaDB 10.5 container, runs MediaWiki 1.34's
# dumpBackup.php against it, and writes <output folder>/bisq-wiki-full.xml. The
# containers, their network and the temporary settings file are removed afterwards,
# also when a step fails. The output folder must be outside this repository.
#
# The database name is $wgDBname from the wiki's LocalSettings.php. It may be left
# out when the dump creates exactly one database besides MariaDB's own; the table
# prefix ($wgDBprefix) is found from the restored tables when left out.
set -eu

usage() { echo "Usage: sh scripts/sql-dump-to-xml.sh <dump.sql[.gz|.bz2]> <output folder> [database] [table prefix]" >&2; exit 2; }
[ $# -ge 2 ] || usage
dump=$1 out=$2 database=${3:-} prefix=${4-}
[ -f "$dump" ] || { echo "No such file: $dump" >&2; exit 2; }
command -v docker >/dev/null && docker info >/dev/null 2>&1 || { echo "Docker is not installed or not running." >&2; exit 2; }

repo=$(cd "$(dirname "$0")/.." && pwd -P)
parent=$(cd "$(dirname "$out")" 2>/dev/null && pwd -P) || { echo "The parent folder of $out does not exist." >&2; exit 2; }
case "$parent/$(basename "$out")/" in "$repo"/*) echo "Choose an output folder outside the repository ($repo): the export is backup data." >&2; exit 2 ;; esac
mkdir -p "$out"
out=$(cd "$out" && pwd -P)

case "$dump" in
  *.bz2) unpack="bzip2 -dc" ;;
  *.gz) unpack="gzip -dc" ;;
  *) unpack="cat" ;;
esac

if [ -z "$database" ]; then
  # Database names only, from the CREATE DATABASE lines; nothing else is read.
  names=$($unpack "$dump" | grep -a -o -E '^CREATE DATABASE (/\*!32312 IF NOT EXISTS\*/ )?`[^`]+`' | sed -E 's/.*`([^`]+)`/\1/' | grep -v -x -E 'mysql|information_schema|performance_schema|sys' || true)
  count=$(printf '%s' "$names" | grep -c . || true)
  if [ "$count" -eq 0 ]; then database=wiki
  elif [ "$count" -eq 1 ]; then database=$names
  else echo "The dump holds several databases: $(echo $names). Pass the wiki's (\$wgDBname) as the third argument." >&2; exit 2
  fi
fi

run=wiki-xml-$$
password=$(od -An -N12 -tx1 /dev/urandom | tr -d ' \n')
settings=$(mktemp -d)
cleanup() {
  docker rm -f "$run-db" >/dev/null 2>&1 || true
  docker network rm "$run" >/dev/null 2>&1 || true
  rm -f "$settings/LocalSettings.php"
  rmdir "$settings" 2>/dev/null || true
}
trap cleanup EXIT INT TERM

echo "Restoring database '$database' into a temporary MariaDB container…"
docker network create "$run" >/dev/null
docker run -d --name "$run-db" --network "$run" -e MARIADB_ROOT_PASSWORD="$password" mariadb:10.5 >/dev/null
# Wait for the final server over TCP: the image's first, socket-only start for
# initialisation already answers a ping before the root password is set.
tries=0
until docker exec -e MYSQL_PWD="$password" "$run-db" mysql -uroot -h127.0.0.1 -e 'SELECT 1' >/dev/null 2>&1; do
  tries=$((tries + 1)); [ $tries -lt 90 ] || { echo "MariaDB did not start." >&2; exit 1; }
  sleep 2
done
docker exec -e MYSQL_PWD="$password" "$run-db" mysql -uroot -e "CREATE DATABASE IF NOT EXISTS \`$database\`"
# --one-database skips every statement for other databases, including MariaDB's own
# user tables in an --all-databases dump.
$unpack "$dump" | docker exec -i -e MYSQL_PWD="$password" "$run-db" mysql -uroot --one-database "$database"

if [ $# -lt 4 ]; then
  found=$(docker exec -e MYSQL_PWD="$password" "$run-db" mysql -uroot -N -e "SELECT CONCAT('prefix:', SUBSTRING(table_name, 1, CHAR_LENGTH(table_name) - 4)) FROM information_schema.columns WHERE table_schema = '$database' AND column_name = 'page_title' AND table_name LIKE '%page'")
  case $(printf '%s\n' "$found" | grep -c '^prefix:' || true) in
    0) echo "No MediaWiki tables found in database '$database'." >&2; exit 1 ;;
    1) prefix=${found#prefix:} ;;
    *) echo "Several MediaWiki installations in '$database' ($(echo $found)). Pass the wiki's \$wgDBprefix as the fourth argument." >&2; exit 2 ;;
  esac
fi

cat > "$settings/LocalSettings.php" <<PHP
<?php
\$wgSitename = "Bisq Wiki";
\$wgServer = "http://localhost";
\$wgDBtype = "mysql";
\$wgDBserver = "$run-db";
\$wgDBname = "$database";
\$wgDBprefix = "$prefix";
\$wgDBuser = "root";
\$wgDBpassword = "$password";
PHP

echo "Exporting every page with its full history…"
docker run --rm --network "$run" -v "$settings/LocalSettings.php:/var/www/html/LocalSettings.php:ro" \
  mediawiki:1.34 php -d display_errors=stderr maintenance/dumpBackup.php --full --quiet > "$out/bisq-wiki-full.xml"
tail -c 64 "$out/bisq-wiki-full.xml" | grep -q '</mediawiki>' || { echo "The export is incomplete: $out/bisq-wiki-full.xml" >&2; exit 1; }

echo "Wrote $out/bisq-wiki-full.xml ($(grep -c '<page>' "$out/bisq-wiki-full.xml") pages)."
echo "Next: npm run compare-backup -- \"$out/bisq-wiki-full.xml\" <the backup part that holds images/>"
