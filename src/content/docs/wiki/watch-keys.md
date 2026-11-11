---
title: "Watch keys"
slug: "wiki/watch-keys"
tableOfContents: false
---

<nav data-pagefind-ignore class="wiki-source-toc" aria-label="Article sections"><details open><summary>On this page</summary><ul><li><a href="#importing-watch-key-to-external-wallet">Importing watch key to external wallet.</a></li></ul></details></nav>

<div class="wiki-recovered-article" lang="en">

**Watch keys** or xpubs are useful to display your balance in case of Bisq wallet corruption **without exposing private keys** to an external wallet estimated by the Bisq [wallet](../wallet/). Go to <code class="wiki-source-code" id="source-code-1">Account - Wallet Info</code> to find your watch keys. Use the watch key and HD path from the same currency and script-type entry in Wallet Info: legacy means P2PKH and native SegWit means P2WPKH. Match that script type when configuring the external watch-only wallet.

<figure class="wiki-source-image" id="source-image-1"><a href="../../media/wiki/e8f75ef328faf25bc96165933a2cc2fe2af7ddc3a7ccfc9b3dbd24bee6ffe050.png"><img alt="Wallet - watchkeys.png" decoding="async" height="533" loading="lazy" src="../../media/wiki/e8f75ef328faf25bc96165933a2cc2fe2af7ddc3a7ccfc9b3dbd24bee6ffe050.png" width="1000"></a><figcaption>Wallet - watchkeys.png<br><small>Historical thumbnail; original resolution not recovered. <a href="../../recovered-media/">Provenance catalogue</a>.</small></figcaption></figure>

<aside class="wiki-admonition" role="note">

**Note**

**Don\'t import private keys to an external wallet.** Use the [emergency wallet](../emergency-wallet/) instead.

</aside>

<span class="wiki-legacy-anchor" id="Importing_watch_key_to_external_wallet." aria-hidden="true">
</span>

## Importing watch key to external wallet. {#importing-watch-key-to-external-wallet}

Import the watch keys one by one to [Electrum](http://electrum.org/) or [Sentinel](https://samouraiwallet.com/sentinel) to display your balance safely. At Electrum, create a new <code class="wiki-source-code" id="source-code-2">Standard wallet</code> through <code class="wiki-source-code" id="source-code-3">Use Master Key</code> and paste the xpub or zpub, which is a string similar to *xpub6CUGRUonZSQ4TWtTMmzXdrXDtypWKiKrhko4egpiMZbpiaQL2jkwSB1icqYh2cfDfVxdx4df189oLKnC5fSwqPfgyP3hooxujYzAu3fDVmz*. Similar steps are required for Sentinel.

</div>
