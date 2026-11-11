---
title: "Taking an offer"
slug: "wiki/taking-an-offer"
tableOfContents: false
---

<nav data-pagefind-ignore class="wiki-source-toc" aria-label="Article sections"><details open><summary>On this page</summary><ul><li><a href="#select-an-offer">Select an offer</a></li><li><a href="#deposit-and-fees">Deposit and fees</a></li><li><a href="#confirm-trade">Confirm trade</a></li><li><a href="#send-payment">Send payment</a></li><li><a href="#mark-payment-as-sent">Mark payment as sent</a></li><li><a href="#complete-trade">Complete trade</a></li></ul></details></nav>

<div class="wiki-recovered-article" lang="en">

After setting up a <span class="wiki-link-gap">payment account <small>[unrecovered article: Create a payment account]</small></span> you\'re ready to take your first offer.

<span class="wiki-legacy-anchor" id="Select_an_offer" aria-hidden="true">
</span>

## Select an offer {#select-an-offer}

First, click on **BUY BTC** and click on any of the available **TAKE OFFER TO BUY BTC** buttons. Each offer will list the min and max amounts you can buy, the exchange price and the payment method.

<figure class="wiki-source-image" id="source-image-1"><a href="../../media/wiki/b438c0e73f171e2e1c5cfe2bdb92e4c166f8b1dd0bdd67c718662d3a64a75510.png"><img alt="BuyBTC-accountenabled.png" decoding="async" height="558" loading="lazy" src="../../media/wiki/b438c0e73f171e2e1c5cfe2bdb92e4c166f8b1dd0bdd67c718662d3a64a75510.png" width="940"></a><figcaption>BuyBTC-accountenabled.png<br><small>Historical full-size recovered source. <a href="../../recovered-media/">Provenance catalogue</a>.</small></figcaption></figure>

\
**Note on limits for new payment accounts:**

For payment methods subject to account-signing restrictions, Bisq 1 v1.10.11 limits unsigned accounts to buying up to 0.002 BTC; the actual limit also depends on the account and payment method. Signing does not immediately remove all age-based limits.

You can have your new payment account signed by selecting an offer to buy bitcoin from a seller who’s capable of signing your account. - Click \[[here](https://docs.bisq.network/payment-methods.html)\] for info on account signing

**Just look for an offer with a check mark.**

<span class="wiki-legacy-anchor" id="Deposit_and_fees" aria-hidden="true">
</span>

## Deposit and fees {#deposit-and-fees}

When taking an offer, Bisq creates a special trade wallet to hold your [security deposit](../security-deposit/) and [fees](../trading-costs/). This wallet will be used to pay your taker fee, and will then be used to transfer your security deposit into a multisig escrow transaction together with the seller’s security deposit and the bitcoin being traded.

<figure class="wiki-source-image" id="source-image-2"><a href="../../media/wiki/b2782501f26f46cb3c7cd5b5c07b391a8c7188c94733ab6e886de65c98ca5d15.png"><img alt="FundTrade.png" decoding="async" height="611" loading="lazy" src="../../media/wiki/b2782501f26f46cb3c7cd5b5c07b391a8c7188c94733ab6e886de65c98ca5d15.png" width="1000"></a><figcaption>FundTrade.png<br><small>Historical thumbnail; original resolution not recovered. <a href="../../recovered-media/">Provenance catalogue</a>.</small></figcaption></figure>

\
Once you and the seller have completed your ends of the trade, you’ll receive the bitcoin you bought along with your security deposit.

There are 2 ways to pay for the deposit and fees:

- If you already have enough bitcoin in your Bisq wallet, click **Transfer funds from Bisq wallet** and the funds will be automatically transfered to the trade wallet.
- If not, go ahead and send the amount required **Funds needed** to the specified address **Trade wallet address** using your personal wallet.

*Click \[[here](../trading-fees/)\] for details on trading fees and the BSQ token.*

<span class="wiki-legacy-anchor" id="Confirm_trade" aria-hidden="true">
</span>

## Confirm trade {#confirm-trade}

Once you’ve funded your trade wallet, you’ll see a **Review: Take offer to buy bitcoin button appear.**

Click it, Bisq will display all details pertaining to your offer.

<figure class="wiki-source-image" id="source-image-3"><a href="../../media/wiki/9ad522ef3a057a46bb7ea8a73927724bc778ee222ae7c60566fd84b4966c6d93.png"><img alt="ConfirmOffer.png" decoding="async" height="588" loading="lazy" src="../../media/wiki/9ad522ef3a057a46bb7ea8a73927724bc778ee222ae7c60566fd84b4966c6d93.png" width="939"></a><figcaption>ConfirmOffer.png<br><small>Historical full-size recovered source. <a href="../../recovered-media/">Provenance catalogue</a>.</small></figcaption></figure>

\
**Make sure these details are correct. After you confirm these details, there\'s no way to cancel the trade you must follow through or risk losing your deposit.**

If everything looks correct, go ahead and hit **Confirm: Take offer to buy bitcoin.**

Your trade has now officially begun!

<span class="wiki-legacy-anchor" id="Send_payment" aria-hidden="true">
</span>

## Send payment {#send-payment}

Now that you’ve taken an offer, it’s almost time to pay the seller.

First, before showing you the seller’s payment details, Bisq will wait for the Bitcoin network to confirm the trade’s transactions. On average, this takes 10 minutes.

Then, you’ll see a pop-up with the seller’s details. Go ahead and pay the seller through the agreed payment method.

<figure class="wiki-source-image" id="source-image-4"><a href="../../media/wiki/810809702e5d6cac26766f0d55987126164e34a314637f3620fe0b6d161ca338.png"><img alt="SellersPaymentDetails.png" decoding="async" height="666" loading="lazy" src="../../media/wiki/810809702e5d6cac26766f0d55987126164e34a314637f3620fe0b6d161ca338.png" width="840"></a><figcaption>SellersPaymentDetails.png<br><small>Historical full-size recovered source. <a href="../../recovered-media/">Provenance catalogue</a>.</small></figcaption></figure>

\
**How long should you wait before sending the payment?**

Each confirmation makes a bitcoin transaction exponentially harder to reverse. You can wait for as many confirmations as you like before sending payment—just note the remaining time indicator. The seller must receive your payment before that timer runs out.

<figure class="wiki-source-image" id="source-image-5"><a href="../../media/wiki/f5c57d36da319f0cacff06df8a6d9a52f1e1778ff7e8b60d50a1030fce0c7fb2.png"><img alt="Trade-remainingtime.png" decoding="async" height="189" loading="lazy" src="../../media/wiki/f5c57d36da319f0cacff06df8a6d9a52f1e1778ff7e8b60d50a1030fce0c7fb2.png" width="821"></a><figcaption>Trade-remainingtime.png<br><small>Historical full-size recovered source. <a href="../../recovered-media/">Provenance catalogue</a>.</small></figcaption></figure>

\
*Learn more about Bitcoin transaction confirmations \[[here](https://en.bitcoin.it/wiki/Confirmation)\]*

<span class="wiki-legacy-anchor" id="Mark_payment_as_sent" aria-hidden="true">
</span>

## Mark payment as sent {#mark-payment-as-sent}

**Important:**

**Once you’ve sent your payment, be sure to mark the payment as sent in Bisq by clicking the Payment started button.**

It’s easy to forget this step, but remember: Bisq doesn’t integrate with national currency payment methods in anyway so Bisq won’t know you’ve sent your payment until you say so.

When you click Payment started, the seller will receive a notification that lets them know the payment is on the way. They’ll be on the lookout for it now.

<figure class="wiki-source-image" id="source-image-6"><a href="../../media/wiki/a6373dd5b22be21a1452b0cb4704477bda86d94a8520df613947b586a612d017.png"><img alt="PaymentStarted.png" decoding="async" height="576" loading="lazy" src="../../media/wiki/a6373dd5b22be21a1452b0cb4704477bda86d94a8520df613947b586a612d017.png" width="982"></a><figcaption>PaymentStarted.png<br><small>Historical full-size recovered source. <a href="../../recovered-media/">Provenance catalogue</a>.</small></figcaption></figure>
<p><br>
</p>

<span class="wiki-legacy-anchor" id="Complete_trade" aria-hidden="true">
</span>

## Complete trade {#complete-trade}

When the seller receives your payment, they’ll mark it as received in Bisq. Bisq will then complete the trade by releasing the bitcoin you bought to you along with your security deposit.

You can keep your new bitcoin in your built-in Bisq wallet by clicking Move Funds to Bisq Wallet or send it elsewhere by clicking Withdraw to External Wallet.

<figure class="wiki-source-image" id="source-image-7"><a href="../../media/wiki/b497349c15a78678d7480d1467170443c255f116d14ab1939ab8c951fcb24ee9.png"><img alt="Movefundsaftertrade.png" decoding="async" height="323" loading="lazy" src="../../media/wiki/b497349c15a78678d7480d1467170443c255f116d14ab1939ab8c951fcb24ee9.png" width="1000"></a><figcaption>Movefundsaftertrade.png<br><small>Historical thumbnail; original resolution not recovered. <a href="../../recovered-media/">Provenance catalogue</a>.</small></figcaption></figure>

\
Congratulations. You’ve just completed your first trade on Bisq!

</div>
