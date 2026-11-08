---
title: "Improve performance and diagnose display problems"
description: "Investigate slow synchronization, memory pressure, HiDPI scaling and blank windows."
---

Check whether Bisq is synchronizing before treating high CPU or a sluggish interface as a fault. The bottom status bar distinguishes Bitcoin-wallet and DAO work. Let the operation finish, keep adequate free disk space, and use the required current release.

## Slow startup or a large wallet

Long wallet histories can make SPV rescans expensive. A personal Bitcoin node can improve access to data; it does not remove the scan itself. See [wallet resync](../wallet-troubleshooting/) before considering [wallet replacement](../restoring-data/#replace-only-the-wallet), which has strict no-active-trades conditions.

The historical macOS advice is to avoid minimizing Bisq if background resource management seems to interrupt activity. Treat this as a diagnostic observation, not a guarantee that macOS always suspends minimized windows.

## Java memory settings

The old memory guide suggests `-XX:MaxRAM=4g` rather than its example `8g`. **MaxRAM is an input to JVM memory ergonomics, not a hard cap on the whole process's resident memory.** Heap, native allocations and graphics resources differ; lowering a setting can cause allocation failures during resync.

For a controlled, reversible experiment, close Bisq and back up its installed `Bisq.cfg` before editing the relevant Java-options entry. The historical package format uses:

```ini
[JavaOptions]
java-options=-XX:MaxRAM=4g
```

Inspect the actual packaged file rather than creating a second incompatible options section. This file is in the application installation, not your data directory, and an upgrade may replace it. Revert the change if startup, synchronization or trading becomes unstable. The old software-rendering suggestion `-Dprism.order=sw` is likewise a JavaFX diagnostic setting, not a wallet repair.

## Linux memory arenas

On glibc systems, native allocator arenas can contribute to resident memory independently of Java heap. The historical Ubuntu 18 experiment used:

```sh
MALLOC_ARENA_MAX=4 /opt/bisq/bin/Bisq
```

This limits arenas for that process. Fewer arenas can increase allocation contention. The old reported reductions (about 300 MB resident and 3.7 GB virtual on one machine) are a single-system observation, not an expected saving on your hardware or a current benchmark. It does not apply universally to every Linux allocator.

## HiDPI and blank windows

The historical Linux JavaFX scaling example is `-Dglass.gtk.uiScale=1.4`. Apply it through the actual launcher's Java-options mechanism, not as a Bisq trading option. Try a modest scale, restart and check dialogs; its behavior depends on JavaFX and the display environment.

For a Windows window visible only on the taskbar, the recovered workaround changes the launch shortcut's **Run** setting from **Normal window** to **Maximized**. It addresses a window-placement issue, not synchronization or lost funds. The old troubleshooting page was explicitly a stub; its broken links have been replaced by these focused topics.

If the problem persists, collect the release version, operating system, exact symptom, synchronization stage and relevant redacted log excerpt for [support](../support/). Do not begin by deleting the data directory.

<details>
<summary>Sources and scope</summary>

- [Performance Tips — source revision 2020-12-12](../../wiki-source/performance-tips.wiki.txt).
- [Reducing memory usage — source revision 2021-08-21](../../wiki-source/reducing-memory-usage.wiki.txt).
- [Linux memory arenas — source revision 2020-06-18](../../wiki-source/linux-memory-arenas.wiki.txt).
- [Running on HiDPI screen — source revision 2021-04-28](../../wiki-source/running-on-hidpi-screen.wiki.txt).
- [Troubleshooting — source revision 2021-10-30](../../wiki-source/troubleshooting.wiki.txt).
- [Required current security release](https://github.com/bisq-network/bisq/releases/tag/v1.10.11).

- [Java MaxRAM and heap options](https://docs.oracle.com/en/java/javase/21/docs/specs/man/java.html).

Sources reviewed 7 November 2026. Current Bisq 1 code references are pinned to v1.10.11.

</details>
