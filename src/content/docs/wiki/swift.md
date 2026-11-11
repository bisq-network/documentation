---
title: "SWIFT"
slug: "wiki/swift"
tableOfContents: false
---

<nav data-pagefind-ignore class="wiki-source-toc" aria-label="Article sections"><details open><summary>On this page</summary><ul><li><a href="#background">Background</a></li><li><a href="#setting-up-the-payment-account">Setting up the payment account</a></li><li><a href="#notes-on-buying-btc">Notes on buying BTC</a></li><li><a href="#send-payment-in-correct-currency">Send payment in correct currency</a></li><li><a href="#put-an-appropriate-reason-for-payment">Put an appropriate reason for payment</a></li><li><a href="#use-the-correct-fee-option">Use the correct fee option</a></li><li><a href="#notes-on-selling-btc">Notes on selling BTC</a></li><li><a href="#understanding-swift-fees">Understanding SWIFT fees</a></li></ul></details></nav>

<div class="wiki-recovered-article" lang="en">

**SWIFT** (international wire transfer) is a network that allows financial institutions worldwide to send and receive payments internationally in multiple currencies.

Sender and receiver typically incur fees and payment times can also be slow (up to 7 days), but payments are secure and almost completely irreversible.

See [this table](../payment-methods/#fiat-payment-methods) for up-to-date trade limits and [signing requirements](../account-limits/#account-signing).

<span class="wiki-legacy-anchor" id="Background" aria-hidden="true">
</span>

## Background {#background}

Almost all banks have access to the SWIFT network. Some money transfer services also give users access to the SWIFT Network.

In order to set up a SWIFT payment account in Bisq, you will need:

- BIC/SWIFT code
- IBAN code

Also ensure that you are aware of:

- bank fees for sending and receiving SWIFT payments
- which currencies you can accept
- what the exchange rate would be in case conversion is necessary

**Policies vary by bank, and sometimes conversion fees are charged unexpectedly, so make sure you are aware of your bank\'s policies beforehand.**

<span class="wiki-legacy-anchor" id="Setting_up_the_payment_account" aria-hidden="true">
</span>

## Setting up the payment account {#setting-up-the-payment-account}

When [creating a new payment account](../creating-a-payment-account/#creating-a-national-currency-account) for SWIFT, keep the following in mind:

- Traders using SWIFT on Bisq could be anywhere in the world, so please fill all fields completely and accurately
- If you are not comfortable sharing your own address, provide the address of your bank

<aside class="wiki-admonition" role="note">

**Note**

**By default, Bisq sets up your SWIFT account to make and take offers from any country and any currency.** This means SWIFT accounts on Bisq are able to trade on ALL fiat currency markets. The currency for a particular trade will always be specified by the maker in their offer.

</aside>

Note: if you transact in a currency that is not native to your bank account (as either maker OR taker), your bank may make you pay currency exchange fees. **It is your responsibility to cover these fees.** Please make 100% sure you\'re aware of what to expect before making or taking an offer.

<span class="wiki-legacy-anchor" id="Notes_on_buying_BTC" aria-hidden="true">
</span>

## Notes on buying BTC {#notes-on-buying-btc}

You can buy BTC with SWIFT on Bisq in 2 waysː

1. Make an offer to buy BTC on a currency market of your choosing
2. Take an offer to buy BTC on the currency market specified in the offer

<span class="wiki-legacy-anchor" id="Send_payment_in_correct_currency" aria-hidden="true">
</span>

### Send payment in correct currency {#send-payment-in-correct-currency}

**The bitcoin buyer must send payment in the currency of the market on which the offer was made.** For example, if you make an offer to buy BTC using SWIFT on the BTC/USD market you should send USD (or ensure your bank converts your local currency into USD). Alternatively, if you take an offer to buy BTC using SWIFT on the BTC/EUR market you must send EUR.

Failure to send payment in the correct currency will result in a penalty for the BTC buyer of either (1) 5% of the trade amount or (2) the amount the receiver is missing in the specified currency as a result of the currency exchange (whichever is greater).

<span class="wiki-legacy-anchor" id="Put_an_appropriate_reason_for_payment" aria-hidden="true">
</span>

### Put an appropriate reason for payment {#put-an-appropriate-reason-for-payment}

In general, [the reason for payment field should be left blank](../trading-rules/#leave-the-reason-for-payment-field-empty).

Some users have reported instances in which an intermediary bank converts a payment\'s currency to the their own currency before converting back to the destination bank\'s local currency, and taking fees for doing this.

If you don\'t want this to happen, consider making the SWIFT sender put \"DO NOT CONVERT\" in the comment field for the wire transfer (not the comment field of the Bisq payment account). This will only work if the recipient is able to handle multi-currency incoming SWIFT payments.

<span class="wiki-legacy-anchor" id="Use_the_correct_fee_option" aria-hidden="true">
</span>

### Use the correct fee option {#use-the-correct-fee-option}

SWIFT transfers for Bisq trades should use the SHA (SHAred) fee option. [More on this below](../swift/#understanding-swift-fees).

<span class="wiki-legacy-anchor" id="Notes_on_selling_BTC" aria-hidden="true">
</span>

## Notes on selling BTC {#notes-on-selling-btc}

You can sell BTC with SWIFT on Bisq in 2 waysː

1. Make an offer to sell BTC on a currency market of your choosing
2. Take an offer to sell BTC on the currency market specified in the offer

The BTC seller should receive the funds in the currency specified in the offer. For example, if you *make* an offer to sell BTC using SWIFT on the BTC/USD market, you will receive USD. Alternatively if you *take* an offer to sell BTC using SWIFT on the BTC/EUR market, you will receive EUR.

Since SWIFT senders must use the SHA (SHAred) fee option for Bisq trades, sellers may incur fees on their end ([see more below](../swift/#understanding-swift-fees)). Make sure you are aware of these fees before selling BTC using SWIFT.

<span class="wiki-legacy-anchor" id="Understanding_SWIFT_fees" aria-hidden="true">
</span>

## Understanding SWIFT fees {#understanding-swift-fees}

When sending a SWIFT transfer the sender has three fee options to choose from:

- BEN (BENeficiary) – payee (recipient of the payment) incurs all payment transaction fees. Typically, the recipient receives the payment minus the transaction fees. The payer (sender of the payment) does not pay any transaction fees.
- OUR – payer (sender of the payment) incurs all payment transaction fees. Normally you are billed separately for the payment transfer. The payee (recipient of the payment) does not pay any transaction fees. The beneficiary receives the full payment amount.
- SHA (SHAred) – payer (sender of the payment) pays all fees charged by the sending bank, which are billed separately. The payee (recipient of the payment) pays all fees charged by their receiving bank. The recipient receives the payment minus any applicable fees.

**Bisq requires buyers to use the SHA (SHAred) fee option for SWIFT transfers.** If a BTC buyer sends a payment using the BEN (BENeficiary) fee option, they will likely incur a penalty to compensate the BTC seller.

Please make sure you are aware of your bank\'s fee schedule for the SHA (SHAred) fee option. Normally it will be $5-25 USD equivalent, but every bank is different.

</div>
