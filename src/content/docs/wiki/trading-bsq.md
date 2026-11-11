---
title: "Trading BSQ"
slug: "wiki/trading-bsq"
tableOfContents: false
---

<nav data-pagefind-ignore class="wiki-source-toc" aria-label="Article sections"><details open><summary>On this page</summary><ul><li><a href="#why-obtain-or-use-bsq">Why Obtain or Use BSQ?</a></li><li><a href="#how-to-obtain-bsq-recommended-method-swaps">How to Obtain BSQ (Recommended Method: Swaps)</a></li><li><a href="#receiving-bsq">Receiving BSQ</a></li><li><a href="#deprecated-trading-method">Deprecated Trading Method</a></li></ul></details></nav>

<div class="wiki-recovered-article" lang="en">

**BSQ** is the native token of the Bisq [DAO](../introduction-to-the-dao/), used optionally for paying [trading fees](../trading-fees/) at a discount and required for certain [governance](../introduction-to-the-dao/) functions like voting and making proposals. This page explains why you might want BSQ and how to obtain it.

<span class="wiki-legacy-anchor" id="Why_Obtain_or_Use_BSQ?" aria-hidden="true">
</span>

## Why Obtain or Use BSQ? {#why-obtain-or-use-bsq}

There are two main reasons users acquire and use [BSQ](../bsq/):

- **For Traders:** Using BSQ to pay trading fees provides a significant discount (target is \~50%, re-calibrated each DAO cycle (approximately monthly) - see [Updating BSQ trading fees](../updating-bsq-trading-fees/)) compared to paying fees in BTC. See [Paying trading fees with BSQ](../paying-trading-fees-with-bsq/).
- **For Contributors:** BSQ is required to [make proposals and vote](../participating-in-a-dao-voting-cycle/) in the Bisq DAO. Contributors also receive compensation for their work in BSQ, which they might then sell on the Bisq market for BTC. See [Introduction to the DAO](../introduction-to-the-dao/).

<span class="wiki-legacy-anchor" id="How_to_Obtain_BSQ_(Recommended_Method:_Swaps)" aria-hidden="true">
</span>

## How to Obtain BSQ (Recommended Method: Swaps) {#how-to-obtain-bsq-recommended-method-swaps}

Since Bisq v1.8.0, the primary, recommended, and default method for trading between BTC and BSQ within the Bisq application is via **[BSQ swaps](../bsq-swaps/)**.

- **What are Swaps?** [BSQ swaps](../bsq-swaps/) allow BSQ and BTC to be traded **atomically** in a single Bitcoin transaction. This makes the process:

`   * `**`Trustless:`**` No counterparty risk during the exchange.`\
`   * `**`Instantaneous:`**` The swap happens as soon as the transaction confirms on the blockchain.`\
`   * `**`Cheaper:`**<code> Involves significantly lower [mining fees](../mining-fees/) compared to the old multi-transaction protocol.</code>\
`   * `**`Simpler:`**` Does not require setting up a specific "BSQ payment account".`

- **How to Swap:** Simply go to the **Create Offer** or **Buy / Sell BTC** screens in Bisq and select BSQ as the counter-currency against BTC. You can then make or take offers just like any other market. Ensure you have sufficient BTC or BSQ in your [Bisq wallet](../bsq/#bsq-wallet) to cover the trade amount and any fees.

<div class="wiki-gallery"><figure class="wiki-source-image" id="source-image-1"><a href="../../media/wiki/f526f0ba331b39aa39e0cf1d9e32968094da3afb68fefb2a575cb0e511689ac8.png"><img alt="Offer book showing offers where you can buy BSQ with BTC (BSQ Swaps)." decoding="async" height="2590" loading="lazy" src="../../media/wiki/f526f0ba331b39aa39e0cf1d9e32968094da3afb68fefb2a575cb0e511689ac8.png" width="4320"></a><figcaption><p>Offer book showing offers where you can <strong>buy</strong> BSQ with BTC (BSQ Swaps).</p>&#10;<br><small>Historical full-size recovered source. <a href="../../recovered-media/">Provenance catalogue</a>.</small></figcaption></figure><figure class="wiki-source-image" id="source-image-2"><a href="../../media/wiki/cff1f2ee8b422b0734b5e3ae81336fa94bf9a5aec9e24c028ed1ab7e9eae516e.png"><img alt="Offer book showing offers where you can sell BSQ for BTC (BSQ Swaps)." decoding="async" height="2590" loading="lazy" src="../../media/wiki/cff1f2ee8b422b0734b5e3ae81336fa94bf9a5aec9e24c028ed1ab7e9eae516e.png" width="4320"></a><figcaption><p>Offer book showing offers where you can <strong>sell</strong> BSQ for BTC (BSQ Swaps).</p>&#10;<br><small>Historical full-size recovered source. <a href="../../recovered-media/">Provenance catalogue</a>.</small></figcaption></figure></div>

For full technical details on how the swap protocol works, see the main **[BSQ swaps](../bsq-swaps/)** page.

<span class="wiki-legacy-anchor" id="Receiving_BSQ" aria-hidden="true">
</span>

## Receiving BSQ {#receiving-bsq}

If you need to receive BSQ (e.g., for contributor compensation, or from an external source), you can find your BSQ receiving address in the built-in Bisq wallet:

1. Go to the \`DAO\` tab.
2. Select the \`BSQ wallet\` sub-tab.
3. Click the \`Receive\` button/tab.
4. Your current BSQ receiving address will be displayed. Click the copy icon to copy it.

<figure class="wiki-source-image" id="source-image-3"><a href="../../media/wiki/cd2f8d5041301a65e4af02606e65d5e66a63a55d84031b386b4f19bbfe7a55bd.png"><img alt="Find your BSQ receiving address under DAO &gt; BSQ Wallet &gt; Receive." decoding="async" height="707" loading="lazy" src="../../media/wiki/cd2f8d5041301a65e4af02606e65d5e66a63a55d84031b386b4f19bbfe7a55bd.png" width="1200"></a><figcaption>Find your BSQ receiving address under DAO &gt; BSQ Wallet &gt; Receive.<br><small>Historical thumbnail; original resolution not recovered. <a href="../../recovered-media/">Provenance catalogue</a>.</small></figcaption></figure>&#10;<div>&#10;</div>

<aside class="wiki-admonition" role="note">

**Warning**

**Important:** BSQ tokens are colored coins based on Bitcoin. While stored in your Bisq Bitcoin wallet file, they should generally only be sent to/from addresses within the Bisq application wallet to avoid issues. Do not send BSQ directly to a non-Bisq Bitcoin wallet or exchange address.

</aside>

<span class="wiki-legacy-anchor" id="Deprecated_Trading_Method" aria-hidden="true">
</span>

## Deprecated Trading Method {#deprecated-trading-method}

Previously, BSQ was traded using a manual process similar to other [altcoins](../payment-methods/#altcoin-payment-methods), requiring users to create a specific BSQ altcoin payment account. This method was deprecated in favor of [BSQ swaps](../bsq-swaps/) (introduced in v1.8.0) because swaps are faster, cheaper, more secure (atomic), and easier to use. The old method offers no advantages and should no longer be used.

</div>
