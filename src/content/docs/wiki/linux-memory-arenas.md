---
title: "Linux memory arenas"
slug: "wiki/linux-memory-arenas"
description: "Historical recovered Bisq Wiki article; source revision 1514"
tableOfContents: false
---

<aside class="wiki-recovery-status" role="note"><p><strong>Recovered historical wiki article.</strong> This source text has not been verified as current product guidance. Missing templates and images are marked in place. <a href="../../">Reviewed guides</a> are available separately.</p></aside>

<details class="wiki-source-provenance"><summary>Source, revision and attribution</summary><p>Source revision <a href="https://bisq.wiki/index.php?oldid=1514">1514</a>, dated 2020-06-18T21:39:44Z. Snapshot last successful ingest: 2026-10-18. Exported revision contributor: Plebeian9000; full author history and licensing remain unresolved.</p><p><a href="../../wiki-source/linux-memory-arenas.wiki.txt" download>Download exact snapshot wikitext</a> · <a href="../../wiki-source/linux-memory-arenas.json">Source metadata</a></p><p>SHA-256: <code>3c28fff3fda50002a6305ad1a5bef2108930451304df71aec70fe59f1d439945</code>. Ingest-added product classification comments are not original author metadata.</p></details>



<div class="wiki-recovered-article" lang="en"><p>With the intention of improving efficiency of memory access in multi-threaded applications, <a href="https://www.gnu.org/software/libc/manual/html_mono/libc.html" rel="noopener noreferrer">glibc</a> may create more memory regions (known as <a href="https://sourceware.org/glibc/wiki/MallocInternals#Arenas_and_Heaps" rel="noopener noreferrer">arenas</a>) than necessary. In some cases, multi-threaded java applications allocating few and small objects can trigger creation of one arena for each of those threads, resulting in large growth of the Java process' resident memory, no matter how well on-heap memory is managed by the application.</p>&#10;<p>One way to limit arena creation in Bisq is to define the environment variable <code class="wiki-source-code" id="source-code-1">MALLOC_ARENA_MAX</code>.</p>&#10;<p><code>export MALLOC_ARENA_MAX=4</code></p>&#10;<p>If not set (default=0), a combination of applications may create as many arenas as the number of CPU cores * 8.</p>&#10;<p>This setting reduced resident memory use by ~300 MB, and reduced virtual memory use by ~3.7 GB on an 8-core machine with 16GB RAM running Ubuntu 18. The trade-off for reducing resident memory use in this way is the added cost of the contention between threads for memory access among fewer arenas, but this was not perceptible during testing and profiling (the major bottlenecks in Bisq performance are related to Tor/P2P network I/O).</p>&#10;<p>There are many sources of information on this and other tunable memory allocation parameters, such as the Linux <a href="http://man7.org/linux/man-pages/man3/mallopt.3.html" rel="noopener noreferrer">mallopt</a> man page. Additional research and troubleshooting tips are welcome.</p>&#10;</div>

<p class="wiki-source-categories"><strong>Source categories:</strong> Troubleshooting</p>
