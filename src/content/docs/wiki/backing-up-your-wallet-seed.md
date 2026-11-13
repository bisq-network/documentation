---
title: "Backing up your wallet seed"
slug: "wiki/backing-up-your-wallet-seed"
tableOfContents: false
---

<nav data-pagefind-ignore class="wiki-source-toc" aria-label="Article sections"><details open><summary>On this page</summary><ul><li><a href="#write-down-your-seed-words">Write down your seed words</a></li><li><a href="#what-seed-words-do-and-don-t-do">What seed words do and don&#x27;t do</a></li><li><a href="#wallet-derivation-paths">Wallet derivation paths</a></li></ul></details></nav>

<div class="wiki-recovered-article" lang="en">

It is critical that you **back up your wallet seed**. The Bisq wallet is totally controlled by you, and you only—wallets are created and stored by the Bisq software right on your machine.

For this reason, you should keep your Bisq wallet\'s seed words safe and [encrypt your Bisq wallet](../encrypting-your-wallet/) as well. There are no other copies of this data, so you\'re on your own if you lose them.

<span class="wiki-legacy-anchor" id="Write_down_your_seed_words" aria-hidden="true">
</span>

## Write down your seed words {#write-down-your-seed-words}

<p>With your wallet seed words and date, you can recover your Bisq wallet and funds if the wallet is ever lost, destroyed, or corrupted.</p>&#10;<span class="wiki-template-gap" role="note"><strong>[Unresolved template: Wallet_date_explainer]</strong> <code>{{Wallet_date_explainer}}</code></span>

You can find your wallet\'s seed words in <code class="wiki-source-code" id="source-code-1">Account</code> > <code class="wiki-source-code" id="source-code-2">Wallet seed</code>. If you\'ve encrypted your wallet, you\'ll need to enter the password before you can see your seed words.

**Please *actually* write down your seed words and date with a pen and paper.** Saving them on your computer, even if you do so in a secure password manager, makes it possible for a hacker to obtain them through sneaky schemes like keylogging. Going low-tech with pen and paper eliminates all such digital attack vectors.

<figure class="wiki-source-image" id="source-image-1"><a href="../../media/wiki/d2ea84b7c6e2a35395099a9afe80611c07d3b159ab64954ffacf6787f9d76d42.png"><img alt="Location of wallet seed words and date." decoding="async" height="741" loading="lazy" src="../../media/wiki/d2ea84b7c6e2a35395099a9afe80611c07d3b159ab64954ffacf6787f9d76d42.png" width="1200"></a><figcaption>Location of wallet seed words and date.<br><small>Historical full-size recovered source. <a href="../../recovered-media/">Provenance catalogue</a>.</small></figcaption></figure>&#10;<div>&#10;</div>

<span class="wiki-legacy-anchor" id="What_seed_words_do_and_don&#x27;t_do" aria-hidden="true">
</span>

## What seed words do and don\'t do {#what-seed-words-do-and-don-t-do}

Backing up a Bisq wallet\'s seed words only ensures that you will always have access to the funds stored in that Bisq wallet.

**All other Bisq data must be backed up separately.** Keys used for signing P2P messages (trade-related messages such as acknowledging payment sending/receiving, trader chat, dispute resolution, etc), Tor keys, payment account details, and more must be backed up separately.

<span class="wiki-legacy-anchor" id="Wallet_derivation_paths" aria-hidden="true">
</span><h2 id="wallet-derivation-paths"> Wallet derivation paths </h2>&#10;<span class="wiki-template-gap" role="note"><strong>[Unresolved template: Wallet derivation paths]</strong> <code>{{Wallet derivation paths}}</code></span>

In Bisq 1 v1.10.11, the BSQ path above is not the only one: BSQ native SegWit (P2WPKH) addresses use `m/44'/142'/1'`, and `m/44'/142'/0'` is the legacy BSQ path. That version creates new wallets with SegWit keychains and adds them to older legacy wallets, so these paths are not a complete recipe for restoring a Bisq wallet in other software. Other wallets show BSQ as ordinary bitcoin, and spending it there will probably lose the BSQ.

</div>
