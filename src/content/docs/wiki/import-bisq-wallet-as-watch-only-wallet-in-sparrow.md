---
title: "Import Bisq wallet as watch only wallet in Sparrow"
slug: "wiki/import-bisq-wallet-as-watch-only-wallet-in-sparrow"
description: "Historical recovered Bisq Wiki article; source revision 3466"
tableOfContents: false
---

<aside class="wiki-recovery-status" role="note"><p><strong>Recovered historical wiki article.</strong> This source text has not been verified as current product guidance. Missing templates and images are marked in place. <a href="../../">Reviewed guides</a> are available separately.</p></aside>

<details class="wiki-source-provenance"><summary>Source, revision and attribution</summary><p>Source revision <a href="https://bisq.wiki/index.php?oldid=3466">3466</a>, dated 2023-12-11T11:02:52Z. Snapshot last successful ingest: 2026-10-18. Exported revision contributor: SuddenWhipVapor; full author history and licensing remain unresolved.</p><p><a href="../../wiki-source/import-bisq-wallet-as-watch-only-wallet-in-sparrow.wiki.txt" download>Download exact snapshot wikitext</a> · <a href="../../wiki-source/import-bisq-wallet-as-watch-only-wallet-in-sparrow.json">Source metadata</a></p><p>SHA-256: <code>4b5d6188e0a0c498861875113c1d885ae9873517f0ce0726b5a11e8b752f39da</code>. Ingest-added product classification comments are not original author metadata.</p></details>



<div class="wiki-recovered-article" lang="en"><p>Having a separate watch-only wallet (one where you cannot spend from) for your Bisq instance can be useful sometimes, to reconcile transactions, or keep track of your activity by being able to add tags and descriptions to each transaction, which you cannot do from within Bisq.</p>&#10;<p>In this guide, you will learn how to have Bisq wallet history and status visible in Sparrow.</p>&#10;<p>In Bisq, open <strong>Account &gt; Wallet info</strong>, and take note of both the <em>BTC segwit wallet</em> values, under <strong>Watch keys</strong>, and <strong>HD keychain paths</strong> (segwit is <code class="wiki-source-code" id="source-code-1">44'/0'/1'</code> and legacy <code class="wiki-source-code" id="source-code-2">44'/0'/0'</code>).</p>&#10;<p>Open Sparrow, go to <strong>File &gt; Preferences</strong> and disable <em>Validate derivations</em> (Bisq wallet uses a nonstandard derivation path for segwit, and Sparrow will not accept it unless you disable this check).</p>&#10;<p>Then, go to <strong>File &gt; New Wallet</strong> and call it <em>Bisq</em> (or whatever you prefer). In the next screen, click on <em>xPub / Watch only wallet</em>, paste in <em>xpub / zpub</em> the zpub key you copied from Bisq, and then edit the <em>Derivation</em> according to how it is in Bisq.</p>&#10;<p>When you click <em>Apply</em>, you will be able to set a password to open the wallet in Sparrow, and then all transaction will be loaded, and new ones will be tracked directly within Sparrow.</p>&#10;</div>


