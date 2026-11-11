---
title: "Performance Tips"
slug: "wiki/performance-tips"
tableOfContents: false
---

<nav data-pagefind-ignore class="wiki-source-toc" aria-label="Article sections"><details open><summary>On this page</summary><ul><li><a href="#general-tips">General Tips</a></li><li><a href="#macos-specific-tips">macOS-specific Tips</a></li></ul></details></nav>

<div class="wiki-recovered-article" lang="en">

Bisq is designed and tested to work well on most user environments. This includes all major operating systems (Linux, macOS, Windows), as well as some more exotic ones ([Qubes](../running-bisq-on-qubes/), [Tails](../running-bisq-on-tails/)).

However, in certain setups and in certain situations, Bisq may be slower than usual.

If that is the case for you, here are a few performance tips for you to consider.

<span class="wiki-legacy-anchor" id="General_Tips" aria-hidden="true">
</span>

## General Tips {#general-tips}

- Use the latest Bisq version
- Expect a somewhat slower UI immediately upon opening Bisq, as long as Bisq is \"Synchronizing DAO\"
  - You can check if \"Synchronizing DAO\" is running in the bottom bar of the UI. If it is running, it will be shown as a progress bar.
  - Depending on the user\'s environment and hardware setup, this process *may* be resource intensive (high CPU usage, sluggish UI)
  - After this process is complete, Bisq should be faster and more responsive

<span class="wiki-legacy-anchor" id="macOS-specific_Tips" aria-hidden="true">
</span>

## macOS-specific Tips {#macos-specific-tips}

Avoid minimizing the Bisq app. In certain situations, macOS may try to allocate less resources to it (CPU, RAM), de-prioritize its threads, de-prioritize or interrupt open network connections, or attempt other optimizations to free up system resources.

</div>
