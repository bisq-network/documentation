# Intake of the full wiki backup

The restored site holds one revision per article from an 18 October 2026
snapshot. The full backup adds the revision history, pages the snapshot missed,
templates, full-size images and the complete list of editors. This runbook turns
the backup into a short, ordered list of work, without changing any article until
a reviewer decides to.

## 1. What to ask the wiki operator for

Preferred, because it contains no private account data:

- a full-history XML export: `php maintenance/dumpBackup.php --full --quiet > bisq-wiki-full.xml`
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

```sh
docker network create wiki-intake
docker run -d --name wiki-db --network wiki-intake -e MARIADB_ROOT_PASSWORD=intake mariadb:10.5
docker exec -i wiki-db mariadb -uroot -pintake < all-databases.sql
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
  mediawiki:1.34 php maintenance/dumpBackup.php --full --quiet > bisq-wiki-full.xml
docker rm -f wiki-db && docker network rm wiki-intake
```

## 3. Reconcile the export with the restored snapshot

```sh
node scripts/reconcile-wiki-backup.mjs --xml ../backup/bisq-wiki-full.xml --images ../backup/images --out tmp/wiki-backup-intake
```

It reads the export page by page, makes no network request and changes nothing
in the repository. It writes:

- `REPORT.md`: the ordered work list below, for maintainers and support staff
- `report.json`: every restored article with its status, the notes and proposal
  PRs that touch it, edits after the restored revision, and the full editor list
- `newer-revisions.jsonl`: the latest text of each changed article, in the field
  names the converter reads

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

Prerequisite for step 2: `scripts/migrate-wiki.py` still reads its inputs from
the original recovery workspace (`recovery/raw-pages.jsonl`, the image-recovery
manifest, a local pandoc and Python environment). It has to run from this
repository with `newer-revisions.jsonl` as input before the first source update.

## 5. Support staff review

Reviewers use the **Review an article** issue form. One issue per article and
finding; staff do not need to edit files or open pull requests.

Suggested labels, created once by a maintainer:

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
