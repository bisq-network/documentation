# Intake of the full wiki backup

The restored site holds one revision per article from an 18 October 2026
snapshot. The full backup adds the revision history, pages the snapshot missed,
templates, full-size images and the complete list of editors. This runbook turns
the backup into a short, ordered list of work, without changing any article until
a reviewer decides to.

## 1. What to ask the wiki operator for

Preferred, because it contains no private account data:

- a full-history XML export: `php -d display_errors=stderr maintenance/dumpBackup.php --full --quiet > bisq-wiki-full.xml`
  (uncompressed; PHP notices must not end up inside the XML)
- the `images/` folder from the web root (without `thumb/`, `temp/` and `deleted/`)

The documented daily backups of [bisq-network/wiki](https://github.com/bisq-network/wiki)
are a database dump plus a web-root archive. Those contain user accounts, email
addresses and password hashes. If only that is available, follow step 2 on a
private machine and delete the restored database afterwards.

Never commit the database dump, `LocalSettings.php`, the XML export or anything
derived from user tables. `tmp/` is ignored by git; keep the backup outside the
repository altogether.

## 2. Only if you received a database dump

Restore it into a throwaway MediaWiki 1.34 and export the XML there. The wiki
runs 1.34, so use the same version to match the database schema. Not tested in
this repository; adjust names to the dump.

The daily backups are `mysqldump --all-databases` output compressed with bzip2.
Import only the wiki database: the dump also holds MariaDB's own `mysql` schema,
which would clash with the container's. Take `WIKI_DB` from `$wgDBname` in the
original `LocalSettings.php`.

```sh
bunzip2 -k bisq-wiki-backup.sql.bz2
docker network create wiki-intake
docker run -d --name wiki-db --network wiki-intake -e MARIADB_ROOT_PASSWORD=intake mariadb:10.5
until docker exec wiki-db mysqladmin -uroot -pintake ping --silent; do sleep 2; done
docker exec wiki-db mysql -uroot -pintake -e 'CREATE DATABASE `WIKI_DB`'
docker exec -i wiki-db mysql -uroot -pintake --one-database WIKI_DB < bisq-wiki-backup.sql
```

Create a minimal `LocalSettings.php` for the export only. Copy `$wgDBname` and
`$wgDBprefix` from the original file; nothing else from it is needed.

```php
<?php
$wgSitename = "Bisq Wiki";
$wgDBtype = "mysql";
$wgDBserver = "wiki-db";
$wgDBname = "COPY_FROM_ORIGINAL";
$wgDBprefix = "COPY_FROM_ORIGINAL";
$wgDBuser = "root";
$wgDBpassword = "intake";
```

```sh
docker run --rm --network wiki-intake -v "$PWD/LocalSettings.php:/var/www/html/LocalSettings.php:ro" \
  mediawiki:1.34 php -d display_errors=stderr maintenance/dumpBackup.php --full --quiet > bisq-wiki-full.xml
docker rm -f wiki-db && docker network rm wiki-intake
```

## 3. Reconcile the export with the restored snapshot

```sh
node scripts/reconcile-wiki-backup.mjs --xml ../backup/bisq-wiki-full.xml --images ../backup/images --out tmp/wiki-backup-intake
```

It reads the export page by page, makes no network request and changes nothing
in the repository. It stops with an error if the file is empty, compressed, not a
MediaWiki export, cut off before `</mediawiki>`, or a stub dump without text, so a
damaged file never reads as a backup with missing articles. It writes:

- `REPORT.md`: the ordered work list below, for maintainers and support staff
- `report.json`: every restored article with its status, the notes and proposal
  PRs that touch it, edits after the restored revision, and the full editor list
- `newer-revisions.jsonl`: the latest text of each changed article, in the field
  names the converter reads. The three additional historical articles are left
  out; the report lists them for an update by hand.

Usernames are public wiki data and are kept for attribution. Anonymous editors
are counted only; IP addresses never reach the output.

## 4. Work through the report in order

1. **Same revision, text differs.** Check the export's normalization (line endings, trailing newline) before anything else. A real difference here means the snapshot itself is in question.
2. **Newer revision.** One source-update PR per article, separate from any wording proposal. It replaces `public/wiki-source/<slug>.wiki.txt`, the metadata and the rendered article, and records the new revision. Then re-read the notes and proposal PRs the report lists against the newer text; some will be resolved by the update, others will need rebasing.
3. **Now a redirect / missing.** Decide whether the restored text stays as a historical article (as for the Chinese-title SSTap guide) or follows the redirect.
4. **Pages not restored.** Decide per page. Import only what is still useful, through the same pipeline.
5. **Template gaps.** Templates found in the backup can replace the current gap markers.
6. **Redirects.** Fix any disagreement with the compatibility routes; add redirects the site does not serve yet.
7. **Images.** Where the backup has a different file, compare it with the recovered one and record its provenance before replacing it.
8. **Attribution and licence.** Update `CONTENT-SOURCES.md` with the full editor lists and settle the content licence.

Step 2 uses the converter described in the next section.

## Re-render articles with the converter

`scripts/migrate-wiki.py` runs from the repository root and reads only
repository files: `public/wiki-source` (text and metadata), `migration/articles.json`,
`recovery-evidence/recovered-manifest.json` and `public/media/wiki`. It writes to
`tmp/wiki-converter` (ignored by git) or to `--out`; it refuses an output
directory inside the repository other than under `tmp/`.

Set up once, outside the repository. Of the pandoc releases tested, 3.12,
3.12.1 and 3.13 reproduce the committed articles; 3.11 and older wrap table
cells in `<p>`. The converter stops on any other version unless `--any-pandoc`
is given. On macOS or Windows, use the 3.13 release file for that platform.

```sh
python3 -m venv ../venv-migrate
../venv-migrate/bin/pip install -r scripts/requirements-migrate.txt
curl -L -o ../pandoc-3.13.tar.gz https://github.com/jgm/pandoc/releases/download/3.13/pandoc-3.13-linux-amd64.tar.gz
echo "38aa33b325a2bc96a4c39409631212db55702f564250bcdbead180b3bf646389  ../pandoc-3.13.tar.gz" | sha256sum -c
mkdir -p ../pandoc-3.13 && tar -xzf ../pandoc-3.13.tar.gz -C ../pandoc-3.13 --strip-components=1
export PANDOC="$PWD/../pandoc-3.13/bin/pandoc"
```

Check that the environment reproduces the snapshot. All 209 articles, their
source files and their restoration and formatting records must be
byte-identical; the command exits with status 1 otherwise and lists the
differences in `tmp/wiki-converter/comparison.json`:

```sh
../venv-migrate/bin/python scripts/migrate-wiki.py
```

Render the newer revisions from the intake. Only the listed articles are
converted; links in all articles resolve against the newer headings.

```sh
../venv-migrate/bin/python scripts/migrate-wiki.py --newer-revisions tmp/wiki-backup-intake/newer-revisions.jsonl --out tmp/source-updates
```

Try it with the fixture first: a synthetic revision of Watch keys with one
appended sentence and one appended section. The review diff must show only
the new TOC entry, the changed paragraph, the new heading with its legacy
anchor, the source text (without the ingest comment) and the revision metadata.

```sh
../venv-migrate/bin/python scripts/migrate-wiki.py --newer-revisions scripts/fixtures/newer-revision-watch-keys.jsonl --out tmp/fixture-run
```

The output directory holds:

- `diffs/<slug>.diff`: what the source-update PR changes, for review
- `site/`: the article and its source files at their repository paths
- `migration/articles.json`, `migration/title-route-map.json`: the updated records
- `fidelity-records.json`: the article's new values for `migration/restoration-fidelity.json` and `migration/source-formatting.json`
- `comparison.json`: removed section anchors, the files that still link to them, and other `migration/` records that name the article
- `converted/`: the converter's own output before restoration, kept as evidence

The committed articles are the converter output after the steps recorded in
`migration/restoration-fidelity.json` (wrappers removed, TOC excluded from
search, empty legacy-anchor spans before headings whose old MediaWiki anchor
differs) and, for the articles in `migration/source-formatting.json`, newline
entities turned into line breaks where the line does not end blank or in
whitespace. The converter applies both steps.

Before the first source update, maintainers have to decide how one is
recorded: `check-source-fidelity.mjs` binds every article to the 18 October
snapshot (whole-snapshot hash and per-article baseline receipts), so a
newer revision fails that check by design, like a wording change.

Not covered: the three additional articles (`migration/additional-articles.json`)
have their own layout and are rejected with a message. The snapshot sources
end with an ingest-added `<!-- BISQ VERSION: ... -->` comment that the backup
will not have. The converter drops comments, except in three articles where
it leaked into the output: the link text and address in How to run seednode
and Phase Zero, and the layout source in Bisq 1.

`scripts/derive-template-renderings.py` uses the same environment and
rewrites `migration/template-renderings-20261014.json` in place:
`../venv-migrate/bin/python scripts/derive-template-renderings.py`.

## 5. Support staff review

Reviewers use the **Review an article** issue form. One issue per article and
finding; staff do not need to edit files or open pull requests.

Suggested labels, created once by a maintainer. Create `review: article` before
the issue form is used: GitHub only applies labels that already exist.

```sh
gh label create "review: article" --color 0e8a16 --description "Support staff finding on one article"
gh label create "review: still correct" --color c2e0c6 --description "Checked against the application; no change needed"
gh label create "review: needs change" --color fbca04 --description "Correction proposed with evidence"
gh label create "review: needs maintainer" --color d93f0b --description "Reviewer unsure or product knowledge needed"
gh label create "source update" --color 1d76db --description "Newer wiki revision from the backup"
gh label create "safety" --color b60205 --description "Wallet recovery, keys, payouts, disputes or payments"
gh label create "product: Bisq 1" --color 5319e7
gh label create "product: Bisq 2" --color 5319e7
```

Order of review: articles with a source update first, then `safety` (wallet
recovery, keys and payouts, disputes, payment methods), then the remaining
articles that have open proposals, then the rest.

A wording correction still needs an accepted-change policy before it can merge:
the fidelity check rejects any change to article wording by design (see
`CONTRIBUTING.md`). That policy is a maintainer decision.
