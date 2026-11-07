---
title: "Automatic backup"
slug: "wiki/automatic-backup"
description: "Historical recovered Bisq Wiki article; source revision 4096"
tableOfContents: false
---

<aside class="wiki-recovery-status" role="note"><p><strong>Recovered historical wiki article.</strong> This source text has not been verified as current product guidance. Missing templates and images are marked in place. <a href="../../">Reviewed guides</a> are available separately.</p></aside>

<details class="wiki-source-provenance"><summary>Source, revision and attribution</summary><p>Source revision <a href="https://bisq.wiki/index.php?oldid=4096">4096</a>, dated 2025-12-14T18:07:41Z. Snapshot last successful ingest: 2026-10-18. Exported revision contributor: SuddenWhipVapor; full author history and licensing remain unresolved.</p><p><a href="../../wiki-source/automatic-backup.wiki.txt" download>Download exact snapshot wikitext</a> · <a href="../../wiki-source/automatic-backup.json">Source metadata</a></p><p>SHA-256: <code>1394bf0f519d92ac9bfb2ab10e14fd28b5faa5ad877afa479dac907a49ffeb31</code>. Ingest-added product classification comments are not original author metadata.</p></details>



<div class="wiki-recovered-article" lang="en"><p>The Bisq application automatically creates a backup whenever a data storage file is updated. Recent backups are retained more densely, while older ones are gradually thinned out. This approach maintains a good balance between storage usage and ensuring that sufficiently recent backups are available when needed.</p>&#10;<p>Backup snapshots are created on every write (the backup filename is the store filename plus the timestamp format <code class="wiki-source-code" id="source-code-1">yyyy-MM-dd_HHmm</code>) and are grouped by the store’s parent filename.</p>&#10;<figure class="wiki-image-gap" id="source-image-1"><p><strong>Image not recovered: Resources automatic backup.png</strong></p><p>The original file is unavailable in this local recovery.</p></figure>&#10;<p>The system keeps backup snapshots based on the following rules and the <code class="wiki-source-code" id="source-code-2">MaxBackupSize</code> (default 100MB):</p>&#10;<ul>&#10;<li>Last hour: a snapshot every minute</li>&#10;<li>Past hour → 24 hours: the most recent snapshot from each hour is kept</li>&#10;<li>Past day → 7 days: the most recent snapshot from each day is kept</li>&#10;<li>Past week → 28 days: the most recent snapshot from each week is kept</li>&#10;<li>Past month → 1 year: the most recent snapshot from each month is kept</li>&#10;<li>Older than a year: the most recent snapshot from each year is kept</li>&#10;</ul>&#10;</div>


