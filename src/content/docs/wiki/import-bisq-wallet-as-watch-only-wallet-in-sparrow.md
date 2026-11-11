---
title: "Import Bisq wallet as watch only wallet in Sparrow"
slug: "wiki/import-bisq-wallet-as-watch-only-wallet-in-sparrow"
tableOfContents: false
---

<div class="wiki-recovered-article" lang="en">

Having a separate watch-only wallet (one where you cannot spend from) for your Bisq instance can be useful sometimes, to reconcile transactions, or keep track of your activity by being able to add tags and descriptions to each transaction, which you cannot do from within Bisq.

In this guide, you will learn how to have Bisq wallet history and status visible in Sparrow.

In Bisq, open **Account > Wallet info**, and take note of both the *BTC segwit wallet* values, under **Watch keys**, and **HD keychain paths** (segwit is <code class="wiki-source-code" id="source-code-1">44\'/0\'/1\'</code> and legacy <code class="wiki-source-code" id="source-code-2">44\'/0\'/0\'</code>).

Open Sparrow, go to **File > Preferences** and disable *Validate derivations* (Bisq wallet uses a nonstandard derivation path for segwit, and Sparrow will not accept it unless you disable this check).

Then, go to **File > New Wallet** and call it *Bisq* (or whatever you prefer). In the next screen, click on *xPub / Watch only wallet*, paste in *xpub / zpub* the zpub key you copied from Bisq, and then edit the *Derivation* according to how it is in Bisq.

When you click *Apply*, you will be able to set a password to open the wallet in Sparrow, and then all transaction will be loaded, and new ones will be tracked directly within Sparrow.

</div>
