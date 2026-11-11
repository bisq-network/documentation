---
title: "Emergency wallet"
slug: "wiki/emergency-wallet"
tableOfContents: false
---

<nav data-pagefind-ignore class="wiki-source-toc" aria-label="Article sections"><details open><summary>On this page</summary><ul><li><a href="#warning">Warning</a></li><li><a href="#backup">Backup</a></li><li><a href="#emergency-wallet">Emergency wallet</a></li><li><a href="#restore-wallet-from-seed">Restore wallet from seed</a></li></ul></details></nav>

<div class="wiki-recovered-article" lang="en">

<span class="wiki-legacy-anchor" id="Warning" aria-hidden="true">
</span>

## Warning {#warning}

Ask for help on [Matrix](../user-support/#via-matrix-bisq-chat) to make sure this is the best solution to your issue. Use under your own risk.

<span class="wiki-legacy-anchor" id="Backup" aria-hidden="true">
</span>

## Backup {#backup}

Make a [backup](../backing-up-application-data/) of your Bisq data before using the emergency wallet.

<span class="wiki-legacy-anchor" id="Emergency_wallet" aria-hidden="true">
</span>

## Emergency wallet {#emergency-wallet}

This tool allows you to send all funds to a BTC or BSQ address. It should be used only when Bisq wallet is corrupted. You can access to external wallet through shortkey <code class="wiki-source-code" id="source-code-1">\'Ctrl + e\' or \'alt + e\' or \'cmd + e\'</code> for BTC, and <code class="wiki-source-code" id="source-code-2">\'Ctrl + b\' or \'alt + b\' or \'cmd + b\'</code> for BSQ.

<figure class="wiki-image-gap" id="source-image-1"><p><strong>Image not recovered: Emergency Wallet.png</strong></p><p>The original file is unavailable in this local recovery.</p></figure>
<div>
</div>

<span class="wiki-legacy-anchor" id="Restore_wallet_from_seed" aria-hidden="true">
</span>

## Restore wallet from seed {#restore-wallet-from-seed}

If the emergency wallet tool produces a transaction that fails to broadcast (you can see that at *Funds > Transactions*) you can import private keys to a [new Bisq instance](../switching-to-a-new-data-directory/) at *Accounts > Wallet Seed - Restore wallet from seed*. Importing seeds to an external wallet should be used only if this method fails, and is extremely recommended to report it to support.

</div>
