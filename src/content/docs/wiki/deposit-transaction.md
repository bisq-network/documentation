---
title: "Deposit transaction"
slug: "wiki/deposit-transaction"
tableOfContents: false
---

<nav data-pagefind-ignore class="wiki-source-toc" aria-label="Article sections"><details open><summary>On this page</summary><ul><li><a href="#verifying-a-deposit-transaction">Verifying a deposit transaction</a></li></ul></details></nav>

<div class="wiki-recovered-article" lang="en"><p>A <strong>deposit transaction</strong> is created when an offer is taken—this transaction is a core element of Bisq's 2-of-2 multisignature escrow mechanism for securing trades.</p>
<span class="wiki-legacy-anchor" id="Verifying_a_deposit_transaction" aria-hidden="true"></span><h2 id="verifying-a-deposit-transaction"> Verifying a deposit transaction </h2>
<p>1. Go to the <code class="wiki-source-code" id="source-code-1">Open Trades</code> or <code class="wiki-source-code" id="source-code-2">Failed</code> tab and click on the <code class="wiki-source-code" id="source-code-3">i</code> icon next to trade ID.</p>
<figure class="wiki-source-image" id="source-image-1"><a href="../../media/wiki/c80ebc03c1277058e9b8ed9b22cb22136ed3dbd1874567e795f4353e36b9778c.png"><img alt="failed_trade_tab.png" decoding="async" height="290" loading="lazy" src="../../media/wiki/c80ebc03c1277058e9b8ed9b22cb22136ed3dbd1874567e795f4353e36b9778c.png" width="1000"></a><figcaption>failed_trade_tab.png<br><small>Historical thumbnail; original resolution not recovered. <a href="../../recovered-media/">Provenance catalogue</a>.</small></figcaption></figure>
<p><br>
2. Find the <code class="wiki-source-code" id="source-code-4">Deposit transaction ID</code></p>
<figure class="wiki-source-image" id="source-image-2"><a href="../../media/wiki/bb6ac4d1c8f82f7031fa5686f59d3a7664b04f4052b20fe72e64dcd90b018755.png"><img alt="Trade_details.png" decoding="async" height="700" loading="lazy" src="../../media/wiki/bb6ac4d1c8f82f7031fa5686f59d3a7664b04f4052b20fe72e64dcd90b018755.png" width="906"></a><figcaption>Trade_details.png<br><small>Historical full-size recovered source. <a href="../../recovered-media/">Provenance catalogue</a>.</small></figcaption></figure>
<p><br>
3. Search for the ID using any Bitcoin block explorer such as <a href="https://blockstream.info/" rel="noopener noreferrer">blockstream.info</a>. If the <code class="wiki-source-code" id="source-code-5">Deposit transaction</code> is valid you'll see the following result:</p>
<p><code>  2 outputs - the first is the deposit to the multi signature bitcoin address and the second is an <code class="wiki-source-code" id="source-code-6">OP_RETURN</code> code.</code></p>
<figure class="wiki-source-image" id="source-image-3"><a href="../../media/wiki/35ef33efa5b30c5333068444a64eeeb1d6075410f6dc0b4f3e14efdb4b14bf6e.png"><img alt="Deposittx.png" decoding="async" height="301" loading="lazy" src="../../media/wiki/35ef33efa5b30c5333068444a64eeeb1d6075410f6dc0b4f3e14efdb4b14bf6e.png" width="973"></a><figcaption>Deposittx.png<br><small>Historical full-size recovered source. <a href="../../recovered-media/">Provenance catalogue</a>.</small></figcaption></figure>
<p><br>
</p>
</div>
