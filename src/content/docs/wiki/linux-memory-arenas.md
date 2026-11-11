---
title: "Linux memory arenas"
slug: "wiki/linux-memory-arenas"
tableOfContents: false
---

<div class="wiki-recovered-article" lang="en">

With the intention of improving efficiency of memory access in multi-threaded applications, [glibc](https://www.gnu.org/software/libc/manual/html_mono/libc.html) may create more memory regions (known as [arenas](https://sourceware.org/glibc/wiki/MallocInternals#Arenas_and_Heaps)) than necessary. In some cases, multi-threaded java applications allocating few and small objects can trigger creation of one arena for each of those threads, resulting in large growth of the Java process\' resident memory, no matter how well on-heap memory is managed by the application.

One way to limit arena creation in Bisq is to define the environment variable <code class="wiki-source-code" id="source-code-1">MALLOC_ARENA_MAX</code>.

`export MALLOC_ARENA_MAX=4`

If not set (default=0), a combination of applications may create as many arenas as the number of CPU cores \* 8.

This setting reduced resident memory use by \~300 MB, and reduced virtual memory use by \~3.7 GB on an 8-core machine with 16GB RAM running Ubuntu 18. The trade-off for reducing resident memory use in this way is the added cost of the contention between threads for memory access among fewer arenas, but this was not perceptible during testing and profiling (the major bottlenecks in Bisq performance are related to Tor/P2P network I/O).

There are many sources of information on this and other tunable memory allocation parameters, such as the Linux [mallopt](http://man7.org/linux/man-pages/man3/mallopt.3.html) man page. Additional research and troubleshooting tips are welcome.

</div>
