---
title: "BSQ swaps"
slug: "wiki/bsq-swaps"
tableOfContents: false
---

<nav data-pagefind-ignore class="wiki-source-toc" aria-label="Article sections"><details open><summary>On this page</summary><ul><li><a href="#process">Process</a></li><li><a href="#troubleshooting">Troubleshooting</a></li><li><a href="#background">Background</a></li><li><a href="#transaction-structure">Transaction structure</a></li><li><a href="#spam-prevention">Spam prevention</a></li></ul></details></nav>

<div class="wiki-recovered-article" lang="en"><p><strong>BSQ swaps</strong> allow <a href="../bsq/">BSQ</a> colored bitcoin and BTC to be traded atomically: instantly, risklessly, with less fees, and with no special Bisq account setup required.</p>
<span class="wiki-legacy-anchor" id="Process" aria-hidden="true"></span><h2 id="process"> Process </h2>
<p>With the BSQ swap protocol, BSQ and BTC can be traded in a single transaction without much of the baggage of the conventional trade protocol.</p>
<p>From a user's perspective, the process is rather seamless. No special payment accounts need to be created. The offer maker creates the offer (BSQ is default trade currency).</p>
<figure class="wiki-source-image" id="source-image-1"><a href="../../media/wiki/aefa4d4628aa6a64f584c10f48d27bc8a82a2ad2c017859ea728581e42af8009.png"><img alt="Creating a BSQ swap offer." decoding="async" height="689" loading="lazy" src="../../media/wiki/aefa4d4628aa6a64f584c10f48d27bc8a82a2ad2c017859ea728581e42af8009.png" width="1200"></a><figcaption>Creating a BSQ swap offer.<br><small>Historical thumbnail; original resolution not recovered. <a href="../../recovered-media/">Provenance catalogue</a>.</small></figcaption></figure>
<p>As long as the offer maker has enough of what they want to trade in their wallet (either BTC or BSQ), the offer will be live and visible on the network. If the relevant wallet balance ever goes below the amount required to complete the swap, the swap offer automatically deactivates.</p>
<ul>
<li>if a user creates a swap offer to sell 1000 BSQ, the offer will remain live as long as their BSQ wallet has more than 1000 BSQ</li>
<li>if a user creates a swap offer to buy 0.5 BTC, they need sufficient verified BSQ in their Bisq BSQ wallet to cover the trade and applicable buyer fee</li>
</ul>
<p>Offers can still be activated or deactivated manually in <code class="wiki-source-code" id="source-code-1">Portfolio</code> &gt; <code class="wiki-source-code" id="source-code-2">My Open Offers</code> as usual.</p>
<p>Taken offers show in a new <code class="wiki-source-code" id="source-code-3">BSQ Swap Trades</code> tab on the <code class="wiki-source-code" id="source-code-4">Portfolio</code> screen.</p>
<p>Of course, this trade protocol can only work while both users are online, but Bisq offers can only be taken when both maker and taker are online anyway, and these trades can be settled almost instantly so there is no further expectation that users be online for any particular amount of time (e.g. for 1 hour with <a href="../payment-methods/#altcoin-payment-methods">instant altcoins offers</a>).</p>
<div>
</div>
<span class="wiki-legacy-anchor" id="Troubleshooting" aria-hidden="true"></span><h2 id="troubleshooting"> Troubleshooting </h2>
<p>Since the protocol is trustless, BSQ swaps do not require Bisq's conventional <span class="wiki-link-gap">dispute resolution <small>[unrecovered article: dispute resolution]</small></span>.</p>
<p>Rarely, an invalid transaction could be committed to your wallet. In such a case, you will need to <a href="../resyncing-spv-file/">resync your SPV file</a> to get rid of it.</p>
<span class="wiki-legacy-anchor" id="Background" aria-hidden="true"></span><h2 id="background"> Background </h2>
<span class="wiki-legacy-anchor" id="Transaction_structure" aria-hidden="true"></span><h3 id="transaction-structure"> Transaction structure </h3>
<p>Here we cover the basic mechanics of BSQ swaps.</p>
<p>BTC buyers and sellers need to pay BTC mining fees and BSQ trading fees, but the BSQ swap protocol simplifies the transaction by only having BTC inputs for BTC sellers and BSQ inputs for BSQ sellers. The appropriate deductions are made from the outputs (e.g. the BTC buyer/BSQ seller gets BTC with their share of mining fees and trading fees deducted; similarly, the BTC seller/BSQ buyer gets BSQ with their share of mining fees and trading fees deducted).</p>
<p>Now let us examine an example trade to see the structure of such a transaction.</p>
<p>This is how a transaction for a 1 BTC/50,000 BSQ swap with a 0.5 BSQ maker fee and 1.5 BSQ taker fee would look. We estimate the buyer's share of the mining fee to be 2000 sats and the seller's share of the mining fee to be 2500 sats.</p>
<p>Assuming Alice makes an offer to buy BTC (sell BSQ) and Bob takes her offer (making him BTC seller/BSQ buyer):</p>
<ul>
<li>Alice's BSQ input(s): min. 50,000 BSQ + 0.5 BSQ trade fee</li>
<li>Bob's BTC input(s): min. 1 BTC + 2500 sat - 150 sat (his BSQ trade fee will be used for mining fee, so he needs a bit less of a mining fee)</li>
<li>Bob's BSQ payout output: 50,000 BSQ - 1.5 BSQ trade fee</li>
<li>Alice's BSQ change output: xxx BSQ - optional, can be omitted in case input was exact</li>
<li>Alice's BTC payout output: 1 BTC - 2000 sat miner fee + 50 sat from BSQ fee</li>
<li>Bob's BTC change output: yyy BTC - optional, can be omitted in case input was exact</li>
</ul>
<span class="wiki-legacy-anchor" id="Spam_prevention" aria-hidden="true"></span><h3 id="spam-prevention"> Spam prevention </h3>
<p>With the conventional Bisq trade protocol, the maker fee transaction acts as a spam prevention measure: you cannot create an offer without spending bitcoin.</p>
<p>The BSQ swap protocol has no such transaction, so instead, a proof-of-work (POW) mechanism is used. The difficulty level (number of leading zeros) is set in the filter. When creating an offer, the maker does the required POW and attaches the resulting data to their offer. Each node verifies the POW and only shows offers with valid POW.</p>
<p>If POW difficulty is increased, offer makers must re-do their POW in the background and republish their offers. Old offers are removed from the network and new offers with new POW are added.</p>
<p>Each offer has a counter appended to its offer ID (after the version number, in the full offer ID) each time a new POW is completed. This enables each re-published offer with new POW to have a new offer ID that looks the same to users (since the short offer ID doesn't change).</p>
<p>At first, POW difficulty will be set to a very low value so users do not notice anything (low milliseconds on modern laptop hardware), but will be increased as needed.</p>
</div>
