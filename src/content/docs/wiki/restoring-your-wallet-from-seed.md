---
title: "Restoring your wallet from seed"
slug: "wiki/restoring-your-wallet-from-seed"
tableOfContents: false
---

<nav data-pagefind-ignore class="wiki-source-toc" aria-label="Article sections"><details open><summary>On this page</summary><ul><li><a href="#restoring-to-a-bisq-wallet">Restoring to a Bisq wallet</a></li><li><a href="#restoring-to-a-non-bisq-wallet">Restoring to a non-Bisq wallet</a></li></ul></details></nav>

<div class="wiki-recovered-article" lang="en">

You can **restore your wallet from seed** to recover your funds in unusual circumstances when nothing else is working (e.g., if a data directory *and* its backups become corrupted).

Note that such a recovery only restores funds (BTC and BSQ) but does not restore any other Bisq data such as payment accounts, open disputes, etc. This data is stored in the Bisq data directory. Furthermore, restoring from seed does not restore [reputation value](https://docs.bisq.network/dao-user-reference.html#voting-stake) earned from contributing to Bisq.

<span class="wiki-legacy-anchor" id="Restoring_to_a_Bisq_wallet" aria-hidden="true">
</span>

## Restoring to a Bisq wallet {#restoring-to-a-bisq-wallet}

Before restoring from seed, please try [restoring your wallet from a backup](../troubleshooting-wallet-issues/#restore-a-wallet-backup) first.

To restore a wallet using seed words, go to <code class="wiki-source-code" id="source-code-1">Account</code> > <code class="wiki-source-code" id="source-code-2">Wallet Seed</code>, enter the seed words and date in the \"Restore wallet from seed words\" section, and then click <code class="wiki-source-code" id="source-code-3">Restore Wallets</code>.

<dl>
<dt></dt>
<dd>
<em><span class="wiki-template-gap" role="note"><strong>[Unresolved template: Wallet_date_explainer]</strong> <code>{{Wallet_date_explainer}}</code></span></em>
</dd>
</dl>

Bisq will then restart and start to rebuild your wallet state. If you see a zero balance for BTC and/or BSQ after restoring from seed, wait until the program is done syncing with the Bitcoin network. You\'ll know syncing is done when the green bar on the bottom right labeled \"Synchronizing With Bitcoin Mainnet (using Tor) / Synchronizing DAO\" goes away.

<figure class="wiki-source-image" id="source-image-1"><a href="../../media/wiki/d078ae4a42402145bcd8aa7cd3a8bc96b24ef4049b31825edfb1730017c177b0.png"><img alt="Go here to restore a Bisq wallet from seed." decoding="async" height="710" loading="lazy" src="../../media/wiki/d078ae4a42402145bcd8aa7cd3a8bc96b24ef4049b31825edfb1730017c177b0.png" width="1200"></a><figcaption>Go here to restore a Bisq wallet from seed.<br><small>Historical full-size recovered source. <a href="../../recovered-media/">Provenance catalogue</a>.</small></figcaption></figure>
<div>
</div>

Things to know:

- **You should only restore from seed into a new Bisq wallet.**
- If your goal is merely to transfer BTC or BSQ to another Bisq instance, it\'s best to simply send the funds to the new instance with a transaction.
- You can restore BTC funds to an external wallet like Electrum, but restoring BSQ on a non-Bisq wallet is highly discouraged and *not* supported. The rules to form valid BSQ transactions are rather complex, and even the slightest error can result in invalid BSQ.

<span class="wiki-legacy-anchor" id="Restoring_to_a_non-Bisq_wallet" aria-hidden="true">
</span><h2 id="restoring-to-a-non-bisq-wallet"> Restoring to a non-Bisq wallet </h2>
<span class="wiki-template-gap" role="note"><strong>[Unresolved template: Wallet_derivation_paths]</strong> <code>{{Wallet_derivation_paths}}</code></span>

</div>
