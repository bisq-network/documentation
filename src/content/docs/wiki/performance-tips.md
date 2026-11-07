---
title: "Performance Tips"
slug: "wiki/performance-tips"
description: "Historical recovered Bisq Wiki article; source revision 1918"
tableOfContents: false
---

<aside class="wiki-recovery-status" role="note"><p><strong>Recovered historical wiki article.</strong> This source text has not been verified as current product guidance. Missing templates and images are marked in place. <a href="../../">Reviewed guides</a> are available separately.</p></aside>

<details class="wiki-source-provenance"><summary>Source, revision and attribution</summary><p>Source revision <a href="https://bisq.wiki/index.php?oldid=1918">1918</a>, dated 2020-12-12T10:57:03Z. Snapshot last successful ingest: 2026-10-18. Exported revision contributor: Cd2357; full author history and licensing remain unresolved.</p><p><a href="../../wiki-source/performance-tips.wiki.txt" download>Download exact snapshot wikitext</a> · <a href="../../wiki-source/performance-tips.json">Source metadata</a></p><p>SHA-256: <code>6de1f30c6b8bb60ae40c0c18ba01fd10295d1b4c723a28e2daedc605b581336f</code>. Ingest-added product classification comments are not original author metadata.</p></details>

<nav class="wiki-source-toc" aria-label="Article sections"><details open><summary>On this page</summary><ul><li><a href="#general-tips">General Tips</a></li><li><a href="#macos-specific-tips">macOS-specific Tips</a></li></ul></details></nav>

<div class="wiki-recovered-article" lang="en"><p>Bisq is designed and tested to work well on most user environments. This includes all major operating systems (Linux, macOS, Windows), as well as some more exotic ones (<a href="../running-bisq-on-qubes/">Qubes</a>, <a href="../running-bisq-on-tails/">Tails</a>).</p>&#10;<p>However, in certain setups and in certain situations, Bisq may be slower than usual.</p>&#10;<p>If that is the case for you, here are a few performance tips for you to consider.</p>&#10;<h2 id="general-tips"> General Tips </h2>&#10;<ul>&#10;<li>Use the latest Bisq version</li>&#10;<li>Expect a somewhat slower UI immediately upon opening Bisq, as long as Bisq is "Synchronizing DAO"&#10;<ul>&#10;<li>You can check if "Synchronizing DAO" is running in the bottom bar of the UI. If it is running, it will be shown as a progress bar.</li>&#10;<li>Depending on the user's environment and hardware setup, this process <em>may</em> be resource intensive (high CPU usage, sluggish UI)</li>&#10;<li>After this process is complete, Bisq should be faster and more responsive</li>&#10;</ul></li>&#10;</ul>&#10;<h2 id="macos-specific-tips"> macOS-specific Tips </h2>&#10;<p>Avoid minimizing the Bisq app. In certain situations, macOS may try to allocate less resources to it (CPU, RAM), de-prioritize its threads, de-prioritize or interrupt open network connections, or attempt other optimizations to free up system resources.</p>&#10;</div>


