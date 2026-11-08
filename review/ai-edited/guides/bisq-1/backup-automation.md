---
title: "Plan and verify automated backups"
description: "Review snapshot consistency, archive verification, scheduling and safe retention before automating backups."
---

Automatic copies reduce the gap between manual backups, but a script copying live files is not automatically a consistent snapshot. Keep [the application backup and written seed](../backup-and-recovery/) as separate safeguards. Test restoration on a copy before depending on any schedule.

## Choose what to protect

The recovered Bisq 1 script archives selected `btc_mainnet/db` stores plus `keys`, wallet files and `tor/hiddenservice`, omitting reproducible network data. This saves space, but a fixed filename list can miss stores introduced by a new release. The selected-store list is retained in [last-resort reconstruction](../restoring-data/#last-resort-reconstruction); it is not a promise of complete coverage today.

For current routine backups, prefer the app's **Account → Backup** result, or a complete data-directory copy while Bisq is fully closed. Review skipped links/special files. Do not confuse this with [Bisq 2's automatic per-store snapshots](../../bisq-2/backup-and-recovery/#automatic-snapshots): that retention policy is not a Bisq 1 feature.

## Archive a verified snapshot

The source uses 7-Zip archives, timestamped names and an external drive/NAS destination. Compression does **not** encrypt an archive unless encryption is explicitly configured. Encrypt backups containing keys and account information; do not put passwords in command lines or scheduler logs.

For example, after Bisq is closed and you have identified the correct paths, a Linux/macOS shell can archive a complete directory to a **new** filename:

```sh
# Replace both paths; the destination must be outside the source directory.
7z a -t7z '/mounted-backup/Bisq-2026-11-07-closed.7z' '/actual/path/Bisq'
7z t '/mounted-backup/Bisq-2026-11-07-closed.7z'
```

On Windows the equivalent executable may be `C:\Program Files\7-Zip\7z.exe`; PowerShell uses `&` before a quoted executable path. Check the exit status after **both** creation and testing. An archive test checks readability, not that all necessary files were selected or captured consistently. Restore into an isolated empty directory and inspect its layout as a separate test; never extract over your active data as a test.

## Scheduling and retention

The historical Linux/macOS example schedules every eight hours with `0 */8 * * *` in crontab; the Windows version uses Task Scheduler with an eight-hour repeating trigger. The interval should follow your activity and loss tolerance. It does not guarantee that a newly opened trade or delayed payout transaction has already been copied.

A reliable job needs to verify the mounted destination, source location, available space, completion status and consistency method; avoid overlapping runs. Archive to a fresh name, verify it, and only then consider retention cleanup. Keep at least one known-good offline copy independent of the computer and test that failures are visible.

### Corrections to the old scripts

Do not run the recovered scripts unchanged:

- They can print “Backup completed” and delete old archives without checking whether `7z` succeeded.
- Unix cleanup uses `tail -n +BACKUP_COUNT`; this selects the Nth file as well, retaining one fewer than the requested count. A correct reviewed rotation must start after the N retained entries and must handle filenames safely.
- The macOS Bisq 1 path contains `Application\ Support` **inside double quotes**, where that backslash can become part of the path. Use `".../Application Support/..."`.
- The selected-file snapshot can race the application's writes; scheduling more often does not prove cross-file consistency.
- The source's `-spf` option stores full paths; inspect extraction paths before restore. Automatic deletion and overwriting are not necessary to make the first safe backup.
- The old Bisq 2 scripts copy only `db/private` and `db/settings`; they are not a complete current Bisq 2 backup recipe.

The original Windows, macOS and Linux scripts remain available in Sources for review. Their compression and scheduling ideas are preserved here; the unsafe unchecked rotation is intentionally not republished as a ready-to-run wallet backup job.

<details>
<summary>Sources and scope</summary>

- [Automatic backup script — source revision 2025-10-13](../../wiki-source/automatic-backup-script.wiki.txt).
- [Backup — source revision 2025-12-14](../../wiki-source/backup.wiki.txt).
- [Current Bisq 1 backup behavior](https://github.com/bisq-network/bisq/blob/ea9d5dff90c99ac462f2b0a7bf9ef92683956619/desktop/src/main/java/bisq/desktop/main/account/content/backup/BackupView.java).

Sources reviewed 7 November 2026. Current Bisq 1 code references are pinned to v1.10.11.

</details>
