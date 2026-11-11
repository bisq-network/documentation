---
title: "Trading rules"
slug: "wiki/trading-rules"
tableOfContents: false
---

<nav data-pagefind-ignore class="wiki-source-toc" aria-label="Article sections"><details><summary>On this page</summary><ul><li><a href="#common-rules">Common rules</a></li><li><a href="#match-bisq-account-details-with-real-data">Match Bisq account details with real data</a></li><li><a href="#no-requirement-to-reply-in-trader-chat">No requirement to reply in trader chat</a></li><li><a href="#do-not-communicate-with-your-peer-away-from-bisq">Do not communicate with your peer away from Bisq</a></li><li><a href="#be-responsive-during-a-dispute">Be responsive during a dispute</a></li><li><a href="#do-not-change-payment-details-once-trade-is-in-progress">Do not change payment details once trade is in progress</a></li><li><a href="#rules-for-bitcoin-sellers">Rules for bitcoin sellers</a></li><li><a href="#click-confirm-payment-after-receiving-payment">Click Confirm payment after receiving payment</a></li><li><a href="#do-not-confirm-payments-with-mismatching-details">Do not confirm payments with mismatching details</a></li><li><a href="#rules-for-bitcoin-buyers">Rules for bitcoin buyers</a></li><li><a href="#make-payment-reasonably-early-within-trade-period">Make payment reasonably early within trade period</a></li><li><a href="#click-payment-started-after-sending-payment">Click Payment started after sending payment</a></li><li><a href="#leave-the-reason-for-payment-field-empty">Leave the &quot;reason for payment&quot; field empty</a></li><li><a href="#pay-any-transaction-fees">Pay any transaction fees</a></li><li><a href="#what-happens-when-things-go-wrong">What happens when things go wrong?</a></li></ul></details></nav>

<div class="wiki-recovered-article" lang="en">

Both Bisq traders must follow these **trading rules** to ensure smooth and successful trades.

To trade on Bisq, you assume one of two roles, no matter what national currency or cryptocurrency you’re trading: you either *buy bitcoin* or *sell bitcoin*.

The rules below are **default** rules for every transaction. Offer makers sometimes specify their own additional terms for handling payments. For example, a seller using cash deposits might require a picture of a receipt torn in half with \"NO REFUND\" written on it. Face-to-face traders often specify terms about where and how to meet.

Make sure you’re okay with an offer-maker’s terms **before** you accept an offer!

Trade rules also help with the following:

- Promoting good behavior from traders
- Penalizing bad behavior from traders
- Promoting good payment accounts of traders
- Penalizing bad payment accounts of traders
- Put the \'wrong doer\' in a worse position and the person \'not at fault\' in a better position

<span class="wiki-legacy-anchor" id="Common_rules" aria-hidden="true">
</span>

## Common rules {#common-rules}

<span class="wiki-legacy-anchor" id="Match_Bisq_account_details_with_real_data" aria-hidden="true">
</span>

#### Match Bisq account details with real data {#match-bisq-account-details-with-real-data}

The data you enter during fiat account creation in Bisq must match with the real data associated to the fiat account (for example, but not limited to, filling in your full account holder name instead of placing just your initials).

<span class="wiki-legacy-anchor" id="No_requirement_to_reply_in_trader_chat" aria-hidden="true">
</span>

#### No requirement to reply in trader chat {#no-requirement-to-reply-in-trader-chat}

While using the available trade chat can be helpful to resolve issues directly among traders without the overhead of mediation, and being communicative is a good way to ease the process for new traders, there is no obligation to reply to a peer\'s messages.

<span class="wiki-legacy-anchor" id="Do_not_communicate_with_your_peer_away_from_Bisq" aria-hidden="true">
</span>

#### Do not communicate with your peer away from Bisq {#do-not-communicate-with-your-peer-away-from-bisq}

Using email addresses, phone numbers, and other means to contact traders is strongly discouraged. The trader chat feature built into Bisq should be used instead: not only is it more private, but the chat record can more easily be made available to mediators and arbitrators (useful in case a trader’s chat messages indicate they broke a rule). This includes advertising offers to sell BTC with a way to contact you, for example a website, Telegram user name, or email.

In any case, it is forbidden to contact the peer using contacts obtained from their payment details, without their prior consent, or missing a compelling reason to do so.

<span class="wiki-legacy-anchor" id="Be_responsive_during_a_dispute" aria-hidden="true">
</span>

#### Be responsive during a dispute {#be-responsive-during-a-dispute}

Traders are expected to reply within 48hrs to either mediators or arbitrators, and could lose the dispute based on unresponsiveness.

Mediators may take up to 48 hours to respond to messages, and arbitrators may take up to 5 days to respond to messages.

<span class="wiki-legacy-anchor" id="Do_not_change_payment_details_once_trade_is_in_progress" aria-hidden="true">
</span>

#### Do not change payment details once trade is in progress {#do-not-change-payment-details-once-trade-is-in-progress}

Once the deposit transaction is published, the trade is in progress, and its terms cannot be changed. Traders agreed to use the payment details specified in the trade contract.

In the event of an unexpected circumstance (e.g. hitting a bank-imposed transfer limit, or a payment institution interfering with the transaction), traders can propose alternatives through trader chat or mediation, but the peer is not required to comply. It is each trader\'s responsibility to ensure that the payment account in their offer will work before an offer is taken.

<span class="wiki-legacy-anchor" id="Rules_for_bitcoin_sellers" aria-hidden="true">
</span>

## Rules for bitcoin sellers {#rules-for-bitcoin-sellers}

Whether making or taking an offer, bitcoin sellers put all the bitcoin they’re selling in the multisig escrow, so there’s less for them to do and fewer rules they need to follow.

<span class="wiki-legacy-anchor" id="Click_Confirm_payment_after_receiving_payment" aria-hidden="true">
</span><h4 id="click-confirm-payment-after-receiving-payment"><p><code>Click <code class="wiki-source-code" id="source-code-1">Confirm payment</code> after receiving payment </code></p>&#10;</h4>

Sellers have until the end of the maximum trade period to do so.

[Account signing](../account-limits/#account-signing), introduced in Bisq v1.2, enables a seller with a signed payment account to sign a buyer’s payment account when they successfully receive a payment. For such trades, it is recommended that the seller take as long as possible (i.e., wait until close to the end of the trade period) to confirm receipt of payment to reduce the chance of a chargeback.

<span class="wiki-legacy-anchor" id="Do_not_confirm_payments_with_mismatching_details" aria-hidden="true">
</span>

#### Do not confirm payments with mismatching details {#do-not-confirm-payments-with-mismatching-details}

Payer name, account numbers, payment method, institution, and other details of a payment should match the details in the trade contract. If there are any concerns that buyer\'s payment details do not match (e.g. wrong name, account number etc) mediation should be opened immediately, using the key combination <code class="wiki-source-code" id="source-code-2">Ctrl-O</code> while on the trade panel.\'\'\'

<aside class="wiki-admonition" role="note">

**Warning**

This is especially relevant for trades in which a signed seller trades with an unsigned buyer, because confirmation of payment receipt signs the buyer’s payment account. In case of such an issue, a dispute should be opened.

</aside>

<span class="wiki-legacy-anchor" id="Rules_for_bitcoin_buyers" aria-hidden="true">
</span>

## Rules for bitcoin buyers {#rules-for-bitcoin-buyers}

<aside class="wiki-admonition" role="note">

**Warning**

To avoid unexpected issues, make sure you can actually carry out a payment with the payment method you’ve set up in Bisq. Examples: Wells Fargo doesn’t allow cash deposits into bank accounts not owned by the depositor, and Zelle has weekly and monthly transfer maximums that are easy to overlook. The software will warn you about known issues, but cannot possibly keep up with all the newest banking and money transfer rules.

</aside>

<span class="wiki-legacy-anchor" id="Make_payment_reasonably_early_within_trade_period" aria-hidden="true">
</span>

#### Make payment reasonably early within trade period {#make-payment-reasonably-early-within-trade-period}

Buyer should complete at a time such that the seller has enough time to acknowledge receipt of the payment before the trade period is over. Waiting until the very end of the trade period to make a payment is not advised, as then the seller cannot reasonably act in time to acknowledge receipt (also, it’s annoying). The lengths of trade periods vary based on [payment method](../payment-methods/).

This is especially important for buyers with unsigned payment accounts trading with sellers with signed payment accounts. A seller will not want to confirm receipt of a payment made at the last minute from an untrusted account, so if you’re a buyer looking to get your payment account signed, you should make the payment *as soon as possible*.

Some payment methods include an option to cancel a payment after you have sent it eg Revolut and Interac e-Transfer. If you cancel payment without agreement with the seller or mediator you might end up being penalized for cancelling the trade.

<span class="wiki-legacy-anchor" id="Click_Payment_started_after_sending_payment" aria-hidden="true">
</span>

#### Click Payment started after sending payment {#click-payment-started-after-sending-payment}

Seller cannot mark payment as received until buyer confirms that they have sent it.

Don’t forget to do this!

<span class="wiki-legacy-anchor" id="Leave_the_&quot;reason_for_payment&quot;_field_empty" aria-hidden="true">
</span>

#### Leave the \"reason for payment\" field empty {#leave-the-reason-for-payment-field-empty}

<aside class="wiki-admonition" role="note">

**Warning**

Before 1.5.5, it was required to put the trade ID in the \'reason for payment\' field of a payment. As of 1.5.5, reason for payment should be left BLANK.

</aside>

Some payments offer a way to specify a reason for payment (some payment methods call it \"Message\" or \"Information for recipient\" or similar). **Leave this field BLANK.** Do not put the trade ID, any mentions of \"Bisq\" or \"Bitcoin\" or \"crypto\", or any other text whatsoever.

If you are required to fill in a reason, use your account name eg \"Joe Bloggs\" alternatively enter something non-descriptive like a dash \"-\". If you would prefer to use other text please agree this with your peer in trader chat. Please remember your peer is not obligated to agree anything and may not want to agree to anything other than leaving the description blank, your name or a dash.

Violating this rule will likely result in a [trade penalty](../table-of-penalties/).

Many banks don’t like anything related to Bitcoin, and may take draconian measures if they sense such a transaction.

Many users trade from personal accounts and may object to using anything that looks like it could be a commercial transaction.

<span class="wiki-legacy-anchor" id="Pay_any_transaction_fees" aria-hidden="true">
</span>

#### Pay any transaction fees {#pay-any-transaction-fees}

Any fees incurred to make the payment via the agreed payment method (e.g., bank fees for bank transfer, money-order fees for money orders, etc) are the buyer’s responsibility to pay.

The seller should receive the exact amount of the trade. The only exception to this rule is if the receiving institution imposes a fee on incoming payments—these fees are borne by the seller.

<span class="wiki-legacy-anchor" id="What_happens_when_things_go_wrong?" aria-hidden="true">
</span>

## What happens when things go wrong? {#what-happens-when-things-go-wrong}

Sometimes trades do not go to plan for whatever reason.

It is prudent for all traders to know when entering into the trade what will happen when things go wrong. Traders would be wise to make themselves aware of the <span class="wiki-link-gap">dispute resolution <small>[unrecovered article: dispute resolution]</small></span> process to ensure there are no surprises.

</div>
