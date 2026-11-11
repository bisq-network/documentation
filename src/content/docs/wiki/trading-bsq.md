---
title: "Trading BSQ"
slug: "wiki/trading-bsq"
tableOfContents: false
---

<nav data-pagefind-ignore class="wiki-source-toc" aria-label="Article sections"><details open><summary>On this page</summary><ul><li><a href="#why-obtain-or-use-bsq">Why Obtain or Use BSQ?</a></li><li><a href="#how-to-obtain-bsq-recommended-method-swaps">How to Obtain BSQ (Recommended Method: Swaps)</a></li><li><a href="#receiving-bsq">Receiving BSQ</a></li><li><a href="#deprecated-trading-method">Deprecated Trading Method</a></li></ul></details></nav>

<div class="wiki-recovered-article" lang="en"><p><strong>BSQ</strong> is the native token of the Bisq <a href="../introduction-to-the-dao/">DAO</a>, used optionally for paying <a href="../trading-fees/">trading fees</a> at a discount and required for certain <a href="../introduction-to-the-dao/">governance</a> functions like voting and making proposals. This page explains why you might want BSQ and how to obtain it.</p>
<span class="wiki-legacy-anchor" id="Why_Obtain_or_Use_BSQ?" aria-hidden="true"></span><h2 id="why-obtain-or-use-bsq"> Why Obtain or Use BSQ? </h2>
<p>There are two main reasons users acquire and use <a href="../bsq/">BSQ</a>:</p>
<ul>
<li><strong>For Traders:</strong> Using BSQ to pay trading fees provides a significant discount (target is ~50%, re-calibrated each DAO cycle (approximately monthly) - see <a href="../updating-bsq-trading-fees/">Updating BSQ trading fees</a>) compared to paying fees in BTC. See <a href="../paying-trading-fees-with-bsq/">Paying trading fees with BSQ</a>.</li>
<li><strong>For Contributors:</strong> BSQ is required to <a href="../participating-in-a-dao-voting-cycle/">make proposals and vote</a> in the Bisq DAO. Contributors also receive compensation for their work in BSQ, which they might then sell on the Bisq market for BTC. See <a href="../introduction-to-the-dao/">Introduction to the DAO</a>.</li>
</ul>
<span class="wiki-legacy-anchor" id="How_to_Obtain_BSQ_(Recommended_Method:_Swaps)" aria-hidden="true"></span><h2 id="how-to-obtain-bsq-recommended-method-swaps"> How to Obtain BSQ (Recommended Method: Swaps) </h2>
<p>Since Bisq v1.8.0, the primary, recommended, and default method for trading between BTC and BSQ within the Bisq application is via <strong><a href="../bsq-swaps/">BSQ swaps</a></strong>.</p>
<ul>
<li><strong>What are Swaps?</strong> <a href="../bsq-swaps/">BSQ swaps</a> allow BSQ and BTC to be traded <strong>atomically</strong> in a single Bitcoin transaction. This makes the process:</li>
</ul>
<p><code>   * </code><strong><code>Trustless:</code></strong><code> No counterparty risk during the exchange.</code><br>
<code>   * </code><strong><code>Instantaneous:</code></strong><code> The swap happens as soon as the transaction confirms on the blockchain.</code><br>
<code>   * </code><strong><code>Cheaper:</code></strong><code> Involves significantly lower <a href="../mining-fees/">mining fees</a> compared to the old multi-transaction protocol.</code><br>
<code>   * </code><strong><code>Simpler:</code></strong><code> Does not require setting up a specific "BSQ payment account".</code></p>
<ul>
<li><strong>How to Swap:</strong> Simply go to the <strong>Create Offer</strong> or <strong>Buy / Sell BTC</strong> screens in Bisq and select BSQ as the counter-currency against BTC. You can then make or take offers just like any other market. Ensure you have sufficient BTC or BSQ in your <a href="../bsq/#bsq-wallet">Bisq wallet</a> to cover the trade amount and any fees.</li>
</ul>
<div class="wiki-gallery"><figure class="wiki-source-image" id="source-image-1"><a href="../../media/wiki/f526f0ba331b39aa39e0cf1d9e32968094da3afb68fefb2a575cb0e511689ac8.png"><img alt="Offer book showing offers where you can buy BSQ with BTC (BSQ Swaps)." decoding="async" height="2590" loading="lazy" src="../../media/wiki/f526f0ba331b39aa39e0cf1d9e32968094da3afb68fefb2a575cb0e511689ac8.png" width="4320"></a><figcaption><p>Offer book showing offers where you can <strong>buy</strong> BSQ with BTC (BSQ Swaps).</p>
<br><small>Historical full-size recovered source. <a href="../../recovered-media/">Provenance catalogue</a>.</small></figcaption></figure><figure class="wiki-source-image" id="source-image-2"><a href="../../media/wiki/cff1f2ee8b422b0734b5e3ae81336fa94bf9a5aec9e24c028ed1ab7e9eae516e.png"><img alt="Offer book showing offers where you can sell BSQ for BTC (BSQ Swaps)." decoding="async" height="2590" loading="lazy" src="../../media/wiki/cff1f2ee8b422b0734b5e3ae81336fa94bf9a5aec9e24c028ed1ab7e9eae516e.png" width="4320"></a><figcaption><p>Offer book showing offers where you can <strong>sell</strong> BSQ for BTC (BSQ Swaps).</p>
<br><small>Historical full-size recovered source. <a href="../../recovered-media/">Provenance catalogue</a>.</small></figcaption></figure></div>
<p>For full technical details on how the swap protocol works, see the main <strong><a href="../bsq-swaps/">BSQ swaps</a></strong> page.</p>
<span class="wiki-legacy-anchor" id="Receiving_BSQ" aria-hidden="true"></span><h2 id="receiving-bsq"> Receiving BSQ </h2>
<p>If you need to receive BSQ (e.g., for contributor compensation, or from an external source), you can find your BSQ receiving address in the built-in Bisq wallet:</p>
<ol>
<li>Go to the `DAO` tab.</li>
<li>Select the `BSQ wallet` sub-tab.</li>
<li>Click the `Receive` button/tab.</li>
<li>Your current BSQ receiving address will be displayed. Click the copy icon to copy it.</li>
</ol>
<figure class="wiki-source-image" id="source-image-3"><a href="../../media/wiki/cd2f8d5041301a65e4af02606e65d5e66a63a55d84031b386b4f19bbfe7a55bd.png"><img alt="Find your BSQ receiving address under DAO &gt; BSQ Wallet &gt; Receive." decoding="async" height="707" loading="lazy" src="../../media/wiki/cd2f8d5041301a65e4af02606e65d5e66a63a55d84031b386b4f19bbfe7a55bd.png" width="1200"></a><figcaption>Find your BSQ receiving address under DAO &gt; BSQ Wallet &gt; Receive.<br><small>Historical thumbnail; original resolution not recovered. <a href="../../recovered-media/">Provenance catalogue</a>.</small></figcaption></figure>
<div>
</div>
<aside class="wiki-admonition" role="note"><p><strong>Warning</strong></p><p><strong>Important:</strong> BSQ tokens are colored coins based on Bitcoin. While stored in your Bisq Bitcoin wallet file, they should generally only be sent to/from addresses within the Bisq application wallet to avoid issues. Do not send BSQ directly to a non-Bisq Bitcoin wallet or exchange address.</p>
</aside>
<span class="wiki-legacy-anchor" id="Deprecated_Trading_Method" aria-hidden="true"></span><h2 id="deprecated-trading-method"> Deprecated Trading Method </h2>
<p>Previously, BSQ was traded using a manual process similar to other <a href="../payment-methods/#altcoin-payment-methods">altcoins</a>, requiring users to create a specific BSQ altcoin payment account. This method was deprecated in favor of <a href="../bsq-swaps/">BSQ swaps</a> (introduced in v1.8.0) because swaps are faster, cheaper, more secure (atomic), and easier to use. The old method offers no advantages and should no longer be used.</p>
</div>
