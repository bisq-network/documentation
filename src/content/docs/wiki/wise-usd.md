---
title: "Wise-USD"
slug: "wiki/wise-usd"
tableOfContents: false
---

<nav data-pagefind-ignore class="wiki-source-toc" aria-label="Article sections"><details open><summary>On this page</summary><ul><li><a href="#wise-usd-characteristics">Wise-USD Characteristics</a></li><li><a href="#setup">Setup</a></li><li><a href="#1-set-up-wise-account-external">1. Set up Wise Account (External)</a></li><li><a href="#2-add-wise-usd-to-bisq">2. Add Wise-USD to Bisq</a></li><li><a href="#trading-process-bisq-v1">Trading Process (Bisq v1)</a></li><li><a href="#buying-btc-with-wise-usd">Buying BTC with Wise-USD</a></li><li><a href="#selling-btc-with-wise-usd">Selling BTC with Wise-USD</a></li><li><a href="#dispute-resolution">Dispute Resolution</a></li></ul></details></nav>

<div class="wiki-recovered-article" lang="en"><p><strong>Wise-USD</strong> (formerly TransferWise-USD) is a payment method available on Bisq, primarily for trading USD. It was added in Bisq v1.8.0.</p>
<p>Wise itself is a web- and app-based money transfer service supporting multiple currencies, allowing Wise-to-Wise transfers between users globally (see <a href="../wise/">Wise</a> payment method page, added in v1.5.4). However, due to specific US banking regulations and restrictions on USD transfers documented by Wise, a separate <strong>Wise-USD</strong> payment method is used within Bisq exclusively for USD trades.</p>
<aside class="wiki-admonition" role="note"><p><strong>Note</strong></p><p><strong>Version Context:</strong> The details on this page, particularly regarding trade limits, apply to trading on <strong><a href="../bisq-1/">Bisq v1</a></strong>.</p>
</aside>
<span class="wiki-legacy-anchor" id="Wise-USD_Characteristics" aria-hidden="true"></span><h2 id="wise-usd-characteristics"> Wise-USD Characteristics </h2>
<ul>
<li><strong>Availability:</strong> Generally available to users with a Wise account who are permitted by Wise to send/receive USD according to Wise's policies. Users should consult Wise for specific eligibility.</li>
<li><strong>Currency:</strong> <strong>USD</strong> only.</li>
<li><strong>Fees:</strong> Wise itself may charge small fees for sending USD or for currency conversion if funding the payment from a non-USD balance. Users should check Wise's current fee schedule.</li>
<li><strong>Limits &amp; Restrictions:</strong> While Bisq sets the BTC trade size limit (see below), <strong>Wise imposes its own sending/receiving limits and restrictions</strong> based on account verification, region, and other factors. Users <strong>must</strong> check their own Wise account limits and USD transfer eligibility before trading. See Wise help pages for details:
<ul>
<li><a href="https://wise.com/help/articles/2810318/why-cant-i-get-usd-account-details" rel="noopener noreferrer">Can I get USD account details?</a></li>
<li><a href="https://wise.com/help/articles/2946451/sending-usd-to-countries-outside-the-us" rel="noopener noreferrer">Sending US dollars to countries outside the US</a></li>
<li><a href="https://wise.com/help/articles/2974947/what-countries-can-i-send-usd-to" rel="noopener noreferrer">What countries can I send USD to?</a></li>
</ul></li>
<li><strong>Maximum Trade Duration:</strong> 4 days.</li>
<li><strong>Maximum BTC Limit (Bisq v1):</strong> <span class="wiki-template-gap" role="note"><strong>[Unresolved template: MaxTradeSizeBisq1]</strong> <code>{{MaxTradeSizeBisq1}}</code></span>.</li>
<li><strong><a href="../account-limits/">Account Signing</a> Required:</strong> No.</li>
</ul>
<span class="wiki-legacy-anchor" id="Setup" aria-hidden="true"></span><h2 id="setup"> Setup </h2>
<span class="wiki-legacy-anchor" id="1._Set_up_Wise_Account_(External)" aria-hidden="true"></span><h3 id="1-set-up-wise-account-external"> 1. Set up Wise Account (External) </h3>
<p>You must first have an active account with <a href="https://wise.com/" rel="noopener noreferrer">Wise</a>. Ensure your account is verified and eligible for sending/receiving USD payments according to Wise's terms and regional availability.</p>
<span class="wiki-legacy-anchor" id="2._Add_Wise-USD_to_Bisq" aria-hidden="true"></span><h3 id="2-add-wise-usd-to-bisq"> 2. Add Wise-USD to Bisq </h3>
<p>Once your external Wise account is ready:</p>
<ol>
<li>Go to the <strong>Account</strong> tab in Bisq.</li>
<li>Select <strong>National Currency Accounts</strong>.</li>
<li>Click <strong>Add New Account</strong>.</li>
<li>Select <strong>Wise-USD</strong> from the payment method dropdown list.</li>
<li>Fill in the required details accurately (e.g., your registered Wise email address).</li>
<li>(Optional) Add a custom <strong>Account Name</strong> visible only to you (e.g., "Wise-USD - John Doe") for easier management if you have multiple accounts.</li>
<li>Click <strong>Save New Account</strong>.</li>
</ol>
<figure class="wiki-source-image" id="source-image-1"><a href="../../media/wiki/29b8fc57907033c260aed21aa820f83a5caf08fda9f4dd6a0d80e6353549e588.png"><img alt="Selecting 'Wise-USD' when adding a new National Currency Account in Bisq v1." decoding="async" height="2590" loading="lazy" src="../../media/wiki/29b8fc57907033c260aed21aa820f83a5caf08fda9f4dd6a0d80e6353549e588.png" width="4320"></a><figcaption>Selecting 'Wise-USD' when adding a new National Currency Account in Bisq v1.<br><small>Historical full-size recovered source. <a href="../../recovered-media/">Provenance catalogue</a>.</small></figcaption></figure>
<div>
</div>
<aside class="wiki-admonition" role="note"><p><strong>Warning</strong></p><p>Ensure the details entered in Bisq exactly match your Wise account information. Mismatches can lead to failed trades or disputes.</p>
</aside>
<span class="wiki-legacy-anchor" id="Trading_Process_(Bisq_v1)" aria-hidden="true"></span><h2 id="trading-process-bisq-v1"> Trading Process (Bisq v1) </h2>
<span class="wiki-legacy-anchor" id="Buying_BTC_with_Wise-USD" aria-hidden="true"></span><h3 id="buying-btc-with-wise-usd"> Buying BTC with Wise-USD </h3>
<p>Follow these steps carefully when buying BTC:</p>
<ol>
<li>Make or take an offer to buy BTC on the USD market using Wise-USD.</li>
<li>Once the trade starts and the deposit confirms, view the seller's Wise-USD details (usually their registered email address) in the Bisq trade screen.</li>
<li>Log in to your Wise account (app or website) and send the exact USD payment amount to the seller's details <strong>only as provided in Bisq</strong>.</li>
<li><strong>Important - Payment Reference:</strong> When sending via Wise, leave the payment reference/description field <strong>blank</strong>. If Wise requires an entry, use <strong>only</strong> your exact name as registered on your Wise account. Do <strong>not</strong> add any other text (e.g., "Bisq", "BTC", trade IDs, order details, etc.).</li>
<li>After successfully sending the payment via Wise, click the <strong>Payment started</strong> button in Bisq.</li>
</ol>
<span class="wiki-legacy-anchor" id="Selling_BTC_with_Wise-USD" aria-hidden="true"></span><h3 id="selling-btc-with-wise-usd"> Selling BTC with Wise-USD </h3>
<p>Follow these steps carefully when selling BTC:</p>
<ol>
<li>Make or take an offer to sell BTC on the USD market using Wise-USD.</li>
<li>Once the trade starts and the deposit confirms, the buyer will see your Wise-USD details (from the account you added in Bisq).</li>
<li>Wait for the buyer to send the payment via Wise and click "Payment started" in Bisq.</li>
<li>Log in to your Wise account and <strong>verify</strong> you have received the <strong>correct USD amount</strong>.</li>
<li><strong>Verify Sender Name:</strong> Check that the payment came from a sender whose name <strong>exactly matches</strong> the BTC Buyer's name shown in the Bisq trade details.</li>
</ol>
<aside class="wiki-admonition" role="note"><p><strong>Warning</strong></p><p>If the names do <strong>not</strong> match, do <strong>not</strong> confirm the payment. Open <a href="../dispute-resolution-in-bisq-1/">dispute resolution</a> immediately.</p>
</aside>
<ol>
<li>Once <strong>both</strong> the payment amount and sender name are verified correct, click <strong>Confirm payment receipt</strong> in Bisq to release the BTC.</li>
</ol>
<span class="wiki-legacy-anchor" id="Dispute_Resolution" aria-hidden="true"></span><h2 id="dispute-resolution"> Dispute Resolution </h2>
<p>If a dispute arises (e.g., payment not received, wrong amount, sender name mismatch), follow the <a href="../dispute-resolution-in-bisq-1/">dispute resolution</a> process.</p>
<ul>
<li>A <a href="../mediator/">Mediator</a> may ask the buyer for proof of payment (screenshot from Wise showing recipient details, amount, date).</li>
<li>The <a href="../mediator/">Mediator</a> may ask the seller for information to verify their account details or confirm non-receipt/incorrect receipt.</li>
</ul>
</div>
