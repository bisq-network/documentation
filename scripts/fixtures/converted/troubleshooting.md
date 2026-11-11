---
title: "Troubleshooting"
slug: "wiki/troubleshooting"
tableOfContents: false
---

<nav data-pagefind-ignore class="wiki-source-toc" aria-label="Article sections"><details open><summary>On this page</summary><ul><li><a href="#generic">Generic</a></li><li><a href="#bisq-won-t-start">Bisq won&#x27;t start</a></li><li><a href="#my-wallet-has-an-incorrect-balance">My wallet has an incorrect balance</a></li><li><a href="#bisq-is-using-too-much-ram">Bisq is using too much RAM</a></li><li><a href="#windows-specific">Windows specific</a></li><li><a href="#bisq-app-appears-in-taskbar-but-clicking-it-opens-a-blank-window">Bisq app appears in taskbar, but clicking it opens a blank window</a></li><li><a href="#my-problem-isn-t-addressed-here">My problem isn&#x27;t addressed here</a></li></ul></details></nav>

<div class="wiki-recovered-article" lang="en">

This article is a stub. The specific sections below are just examples for demonstration purposes.

<span class="wiki-legacy-anchor" id="Generic" aria-hidden="true">
</span>

## Generic {#generic}

<span class="wiki-legacy-anchor" id="Bisq_won&#x27;t_start" aria-hidden="true">
</span>

### Bisq won\'t start {#bisq-won-t-start}

See [Troubleshooting network issues](../troubleshooting-network-issues/).

<span class="wiki-legacy-anchor" id="My_wallet_has_an_incorrect_balance" aria-hidden="true">
</span>

### My wallet has an incorrect balance {#my-wallet-has-an-incorrect-balance}

- Resyncing your simplified payment verification (SPV) file may resolve this. See <span class="wiki-link-gap">Delete and resync SPV file <small>[unrecovered article: Delete and resync SPV file]</small></span>

<span class="wiki-legacy-anchor" id="Bisq_is_using_too_much_RAM" aria-hidden="true">
</span>

### Bisq is using too much RAM {#bisq-is-using-too-much-ram}

- Limiting the maximum amount of RAM the JVM is allowed to use may resolve this. See <span class="wiki-link-gap">Reduce JVM MAXRam <small>[unrecovered article: Reduce JVM MAXRam]</small></span>

* On Linux, restricting memory arena allocation can reduce Bisq\'s off-heap memory consumption. See [Linux Memory Arenas](../linux-memory-arenas/)

<span class="wiki-legacy-anchor" id="Windows_specific" aria-hidden="true">
</span>

## Windows specific {#windows-specific}

<span class="wiki-legacy-anchor" id="Bisq_app_appears_in_taskbar,_but_clicking_it_opens_a_blank_window" aria-hidden="true">
</span>

### Bisq app appears in taskbar, but clicking it opens a blank window {#bisq-app-appears-in-taskbar-but-clicking-it-opens-a-blank-window}

Try to maximize the Bisq window.

- Find the Bisq shortcut you use to start Bisq
- Right click on it > select \"shortcut\" > Change the Run dropdown from \"Normal size window\" to \"Maximized\"

Solution found by teambitcoin ([link](https://github.com/bisq-network/bisq/issues/5648#issuecomment-942695883))

<span class="wiki-legacy-anchor" id="My_problem_isn&#x27;t_addressed_here" aria-hidden="true">
</span>

## My problem isn\'t addressed here {#my-problem-isn-t-addressed-here}

See [user support](../user-support/) for ways to get support.

</div>
