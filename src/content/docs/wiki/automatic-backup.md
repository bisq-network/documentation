---
title: "Automatic backup"
slug: "wiki/automatic-backup"
tableOfContents: false
---

<div class="wiki-recovered-article" lang="en">

Bisq 2 v2.1.15 automatically creates a backup whenever a data storage file is updated. Multiple writes in the same minute can replace that minute\'s copy. Recent backups are retained more densely, while older ones are gradually thinned out. This approach maintains a good balance between storage usage and ensuring that sufficiently recent backups are available when needed.

Backup snapshots are created on every write (the backup filename is the store filename plus the timestamp format <code class="wiki-source-code" id="source-code-1">yyyy-MM-dd_HHmm</code>) and are grouped by the store’s parent filename.

<figure class="wiki-image-gap" id="source-image-1"><p><strong>Image not recovered: Resources automatic backup.png</strong></p><p>The original file is unavailable in this local recovery.</p></figure>

The system keeps backup snapshots based on the following rules, per-store <code class="wiki-source-code" id="source-code-2">MaxBackupSize</code> limits and a total backup-size default of 100 MB. Size-based pruning can remove older copies; local snapshots do not replace a backup on another device:

- Last hour: a snapshot every minute
- Past hour → 24 hours: the most recent snapshot from each hour is kept
- Past day → 7 days: the most recent snapshot from each day is kept
- Past week → 28 days: the most recent snapshot from each week is kept
- Past month → 1 year: the most recent snapshot from each month is kept
- Older than a year: the most recent snapshot from each year is kept

</div>
