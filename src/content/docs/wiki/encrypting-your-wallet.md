---
title: "Encrypting your wallet"
slug: "wiki/encrypting-your-wallet"
tableOfContents: false
---

<div class="wiki-recovered-article" lang="en"><p>Before <strong>encrypting your wallet</strong>, the private-key material in your Bisq wallet files is stored without password encryption.</p>
<p>This is not a good idea—anyone who gains access to your computer (whether by physically stealing it or by hacking it remotely) can gain access to your private keys and take your bitcoin.</p>
<p>Setting a password encrypts the wallet's private-key material. It does not encrypt all payment-account and trade data, application backups, or separately stored seed words.</p>
<p>To set a password, go to <code class="wiki-source-code" id="source-code-1">Account</code> &gt; <code class="wiki-source-code" id="source-code-2">Wallet Password</code> and enter a strong password.</p>
<p><strong>Do not forget this password, as it cannot be reset.</strong> Bisq will ask for your password every time it starts, so if you do happen to forget it, the only way to open Bisq will be to restore your wallet from seed words.</p>
<figure class="wiki-source-image" id="source-image-1"><a href="../../media/wiki/4789e4687c4082eb78a1e14fb22c4603ccb9ca877852a7083d8eae34591590d9.png"><img alt="Setting a password for your Bisq wallet." decoding="async" height="710" loading="lazy" src="../../media/wiki/4789e4687c4082eb78a1e14fb22c4603ccb9ca877852a7083d8eae34591590d9.png" width="1200"></a><figcaption>Setting a password for your Bisq wallet.<br><small>Historical full-size recovered source. <a href="../../recovered-media/">Provenance catalogue</a>.</small></figcaption></figure>
</div>
