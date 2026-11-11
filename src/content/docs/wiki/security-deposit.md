---
title: "Security deposit"
slug: "wiki/security-deposit"
tableOfContents: false
---

<nav data-pagefind-ignore class="wiki-source-toc" aria-label="Article sections"><details open><summary>On this page</summary><ul><li><a href="#note-for-new-users">Note for new users</a></li><li><a href="#recommended-amounts">Recommended amounts</a></li><li><a href="#reduced-peer-s-deposit-payout-during-arbitration">Reduced peer&#x27;s deposit payout during arbitration</a></li></ul></details></nav>

<div class="wiki-recovered-article" lang="en">

**Security deposits** in Bisq are BTC funds that buyer and seller lock in a 2of2 multisig address together with trade funds when an offer is taken in order to help ensure that both peers follow the trading protocol. Security deposits are fully reimbursed automatically to both trading peers when the trade ends without <span class="wiki-link-gap"> disputes <small>[unrecovered article: dispute resolution]</small></span>.

Security deposits are the most important tool Bisq offers to protect honest traders. Furthermore, requiring *both* parties to post a deposit increases chances that they will be willing to cooperate and determine amicable outcomes in case a trade doesn\'t go according to plan.

When a trade doesn\'t go the happy path, a portion or the total amount of the offending peer\'s deposit will be lost, depending on whether the trade is concluded in mediation or arbitration. For example, it is considered a protocol violation when the buyer doesn\'t pay the seller as specified in the trade contract (e.g., late payment, mismatching names, wrong payment method, etc). [This article](../trading-rules/) lists all Bisq trading rules.

<span class="wiki-legacy-anchor" id="Note_for_new_users" aria-hidden="true">
</span>

## Note for new users {#note-for-new-users}

Security deposits create a conundrum for new users: **bitcoin is required to buy bitcoin**. This can be inconvenient, but it\'s a core part of the security protocol. The initial amount of BTC required to do a trade can vary depending on the payment method, but the earlier 0.002 BTC starting estimate is not a universal minimum; check the chosen offer\'s deposit and fees. Take a look at [this article](../funding-your-wallet/#how-to-obtain-your-first-bitcoin) for suggestion on how to get this initial BTC without KYC ([Bisq Easy](../bisq-easy/), [Get your first BTC](../getting-your-first-btc/) room, a friend, ATM, sell something, work for it, etc).

Why the hard security deposit requirement? Bisq never custodies your funds, and it avoids reputation mechanisms that would weaken your privacy (e.g., reviews: to such reputation data, it must be stored somewhere *and* tied to an identity). Such mechanisms would only give a false sense of security anyway due to [sybil attacks](https://en.wikipedia.org/wiki/Sybil_attack).

<span class="wiki-legacy-anchor" id="Recommended_amounts" aria-hidden="true">
</span>

## Recommended amounts {#recommended-amounts}

Bisq allows offer makers to choose a security deposit percentage: **minimum is 15%** of trade amount and **maximum is 50%** of trade amount (absolute minimum in Bisq 1 v1.10.11 is 0.0003 BTC). The offer taker must deposit the same amount as the offer maker.

When creating an offer, Bisq recommends a security deposit based on recent volatility of the asset being traded: **the higher the volatility, the higher the recommended security deposit**. Using the recommended amount helps prevent trades from becoming future trades where the BTC buyer only sends payment to settle the trade if the BTC price has not fallen enough to compensate for losing the security deposit.

<aside class="wiki-admonition" role="note">

**Note**

Deposits and trade amounts are locked in the multisignature address to secure trades. So a peer selling 1 BTC who chooses to specify a 25% security deposit when making his offer will need to lock 1.25 BTC, which would require the buyer to lock 0.25 BTC when taking the offer. Ultimately, this means 1.5 BTC will be locked in a 2-of-2 multisig address when the deposit transaction is confirmed, and only at that point can the buyer send payment to the seller.

</aside>

<figure class="wiki-source-image" id="source-image-1"><a href="../../media/wiki/8b19642bc2a45ce9ac0ffc715b7b6c17e87d7adb406d7bde969b45dce1d37a32.png"><img alt="Depending on volatility, recommended security deposits can reach 50%." decoding="async" height="574" loading="lazy" src="../../media/wiki/8b19642bc2a45ce9ac0ffc715b7b6c17e87d7adb406d7bde969b45dce1d37a32.png" width="1000"></a><figcaption>Depending on volatility, recommended security deposits can reach 50%.<br><small>Historical thumbnail; original resolution not recovered. <a href="../../recovered-media/">Provenance catalogue</a>.</small></figcaption></figure>

\
When taking an offer, the security deposit set by the maker can be viewed on the <code class="wiki-source-code" id="source-code-1">Deposit BTC (%)</code> column.

<figure class="wiki-source-image" id="source-image-2"><a href="../../media/wiki/55b2bcaf905268ebeff3aff3be83219cfb7fce5a3ef122068a995dd1931035c4.png"><img alt="See required deposit % in this column on the offer book." decoding="async" height="322" loading="lazy" src="../../media/wiki/55b2bcaf905268ebeff3aff3be83219cfb7fce5a3ef122068a995dd1931035c4.png" width="1000"></a><figcaption>See required deposit % in this column on the offer book.<br><small>Historical thumbnail; original resolution not recovered. <a href="../../recovered-media/">Provenance catalogue</a>.</small></figcaption></figure>
<p><br>
</p>

<span class="wiki-legacy-anchor" id="Reduced_peer&#x27;s_deposit_payout_during_arbitration" aria-hidden="true">
</span>

## Reduced peer\'s deposit payout during arbitration {#reduced-peer-s-deposit-payout-during-arbitration}

The latest trade protocol, which introduced contributors as BurningMen, to eliminate the single-point-of-failure that was the legacy BurningMan, implies that the trader winning in arbitration will get a considerably smaller (if at all) portion of the peer\'s deposit as compensation, to account for the risk of malicious BM\'s exploiting the protocol itself.\
If you want to minimize the risk of having funds locked in arbitration for a prolonged time without any compensation after the resolution, you should take into account [this table](https://github.com/bisq-network/proposals/issues/411), and set a deposit % higher than the minimum amount possible, which will yield no compensation whatsoever.

</div>
