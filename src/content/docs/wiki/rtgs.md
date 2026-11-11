---
title: "RTGS"
slug: "wiki/rtgs"
tableOfContents: false
---

<nav data-pagefind-ignore class="wiki-source-toc" aria-label="Article sections"><details><summary>On this page</summary><ul><li><a href="#where-can-i-find-out-more-about-rtgs">Where can I find out more about RTGS?</a></li><li><a href="#what-countries-are-available-for-rtgs">What countries are available for RTGS?</a></li><li><a href="#what-currencies-are-available-for-rtgs">What currencies are available for RTGS?</a></li><li><a href="#what-is-the-maximum-trading-duration-for-rtgs">What is the maximum trading duration for RTGS?</a></li><li><a href="#what-is-the-maximum-btc-limit-for-an-rtgs-trade">What is the maximum BTC limit for an RTGS trade?</a></li><li><a href="#is-rtgs-a-payment-method-that-can-be-signed">Is RTGS a payment method that can be signed?</a></li><li><a href="#how-do-i-set-up-a-rtgs-account">How do I set up a RTGS account?</a></li><li><a href="#how-do-i-add-rtgs-as-a-payment-method-in-bisq">How do I add RTGS as a payment method in Bisq?</a></li><li><a href="#how-do-i-buy-btc-with-my-rtgs-account">How do I buy BTC with my RTGS account?</a></li><li><a href="#how-do-i-sell-btc-with-my-rtgs-account">How do I sell BTC with my RTGS account?</a></li><li><a href="#are-there-any-limits-for-me-to-be-aware-of-when-using-my-rtgs-account">Are there any limits for me to be aware of when using my RTGS account?</a></li><li><a href="#are-there-any-fees-for-me-to-be-aware-of-when-using-my-rtgs-account">Are there any fees for me to be aware of when using my RTGS account?</a></li><li><a href="#how-does-dispute-resolution-when-trading-with-rtgs">How does dispute resolution when trading with RTGS?</a></li></ul></details></nav>

<div class="wiki-recovered-article" lang="en">

**RTGS** is a payment method added in Bisq v1.7.5.

Real-Time Gross Settlement (RTGS) is an electronic funds transfer system maintained by the Reserve Bank of India. RTGS payment enable immediate and large remittances (minimum of 200,000 INR) by banking customers in India to transfer funds for between any two RTGS enabled bank accounts.

<span class="wiki-legacy-anchor" id="Where_can_I_find_out_more_about_RTGS?" aria-hidden="true">
</span>

## Where can I find out more about RTGS? {#where-can-i-find-out-more-about-rtgs}

Here is a list of RTGS resources:

- [Real-Time Gross Settlement Wiki](https://en.wikipedia.org/wiki/Payment_and_settlement_systems_in_India#Real-time_gross_settlement)

<span class="wiki-legacy-anchor" id="What_countries_are_available_for_RTGS?" aria-hidden="true">
</span>

## What countries are available for RTGS? {#what-countries-are-available-for-rtgs}

RTGS is available users in India.

<span class="wiki-legacy-anchor" id="What_currencies_are_available_for_RTGS?" aria-hidden="true">
</span>

## What currencies are available for RTGS? {#what-currencies-are-available-for-rtgs}

RTGS supports INR currency.

<span class="wiki-legacy-anchor" id="What_is_the_maximum_trading_duration_for_RTGS?" aria-hidden="true">
</span>

## What is the maximum trading duration for RTGS? {#what-is-the-maximum-trading-duration-for-rtgs}

The maximum trade time is X days. Generally RTGS transfers will be completed within X days.

<span class="wiki-legacy-anchor" id="What_is_the_maximum_BTC_limit_for_an_RTGS_trade?" aria-hidden="true">
</span>

## What is the maximum BTC limit for an RTGS trade? {#what-is-the-maximum-btc-limit-for-an-rtgs-trade}

<span class="wiki-template-gap" role="note"><strong>[Unresolved template: MaxTradeSizeBisq1]</strong> <code>{{MaxTradeSizeBisq1}}</code></span>.

<span class="wiki-legacy-anchor" id="Is_RTGS_a_payment_method_that_can_be_signed?" aria-hidden="true">
</span>

## Is RTGS a payment method that can be signed? {#is-rtgs-a-payment-method-that-can-be-signed}

No, RTGS accounts do not require signing.

<span class="wiki-legacy-anchor" id="How_do_I_set_up_a_RTGS_account?" aria-hidden="true">
</span>

## How do I set up a RTGS account? {#how-do-i-set-up-a-rtgs-account}

Pretty much all bank accounts in India can make RTGS payments.

<span class="wiki-legacy-anchor" id="How_do_I_add_RTGS_as_a_payment_method_in_Bisq?" aria-hidden="true">
</span>

## How do I add RTGS as a payment method in Bisq? {#how-do-i-add-rtgs-as-a-payment-method-in-bisq}

It is easy to add your RTGS account to Bisq.

1. Go to the top menu in Bisq and select Account.
2. Then select National Currency Accounts.
3. Click add new account
4. Select RTGS
5. Complete the details
6. Choose to use a custom account name this helps makes it easier for you to manage multiple payment methods in Bisq (this will be visible only to you, for example: RTGS - INR - Aam Aadmi)
7. Click save new account

If you have more than one RTGS account you wish to add to Bisq you can create different accounts for each.

Make sure all the details are correct when you add.

<aside class="wiki-admonition" role="note">

**Warning**

RTGS is for payments of large trades of Rs. 200,000 or over.

When setting up your RTGS payment account please make sure to include your:

- Account owner full name
- Account number
- IFSC number
- These details should match your bank account that you will use for sending / receiving payments.

Please be aware there is a minimum trade amount of Rs. 200,000 that can be sent per transaction. If you are trading under this amount either the trade would get cancelled or both traders would have to agree on another payment method (eg [IMPS](../imps/) or [UPI](../upi/)).

</aside>

<span class="wiki-legacy-anchor" id="How_do_I_buy_BTC_with_my_RTGS_account?" aria-hidden="true">
</span>

## How do I buy BTC with my RTGS account? {#how-do-i-buy-btc-with-my-rtgs-account}

You can buy BTC with RTGS on Bisq in 2 waysː

1. Make an offer to buy BTC on the INR market.
2. Take an offer to buy BTC on the INR market.

When the offer is confirmed Bisq will provide you with the BTC Sellers RTGS details for you to complete the payment. You should send payment immediately and confirm you have done so in Bisq by clicking \'payment started\'.

If you have the option to include a payment reference please leave it blank. If your bank requires one, please just use your name that matches your bank account.

Once the BTC Seller receives your payment they will confirm in Bisq and your security deposit and your purchased trade amount will be available in your wallet.

<aside class="wiki-admonition" role="note">

**Warning**

Please send payment only to the account details provided in Bisq.

Please be aware there is a minimum trade amount of Rs. 200,000 that can be sent per transaction. If you are trading under this amount either the trade would get cancelled or both traders would have to agree on another payment method (eg [IMPS](../imps/) or [UPI](../upi/)).

</aside>

<span class="wiki-legacy-anchor" id="How_do_I_sell_BTC_with_my_RTGS_account?" aria-hidden="true">
</span>

## How do I sell BTC with my RTGS account? {#how-do-i-sell-btc-with-my-rtgs-account}

You can sell BTC with RTGS on Bisq in 2 waysː

1. Make an offer to sell BTC on the INR market.
2. Take an offer to sell BTC on the INR market.

When the offer is confirmed Bisq will provide with the BTC Buyer with your RTGS details for you to complete the payment. They should send payment at their first opportunity and confirm they have done so in Bisq by clicking \'payment started\'.

Once you receive payment from the BTC Buyer you should confirm payment has been received in Bisq. One you have done this the BTC Buyer will receive their funds and you will receive your security deposit back.

<aside class="wiki-admonition" role="note">

**Warning**

Please be aware there is a minimum trade amount of Rs. 200,000 that can be sent per transaction. If you are trading under this amount either the trade would get cancelled or both traders would have to agree on another payment method (eg [IMPS](../imps/) or [UPI](../upi/)).

</aside>

<span class="wiki-legacy-anchor" id="Are_there_any_limits_for_me_to_be_aware_of_when_using_my_RTGS_account?" aria-hidden="true">
</span>

## Are there any limits for me to be aware of when using my RTGS account? {#are-there-any-limits-for-me-to-be-aware-of-when-using-my-rtgs-account}

Minimum amount per transaction is Rs.200,000.

Maximum of 1,000,000 INR can be sent per day.

<span class="wiki-legacy-anchor" id="Are_there_any_fees_for_me_to_be_aware_of_when_using_my_RTGS_account?" aria-hidden="true">
</span>

## Are there any fees for me to be aware of when using my RTGS account? {#are-there-any-fees-for-me-to-be-aware-of-when-using-my-rtgs-account}

RTGS fees are low. Banks charge different amounts but fees are generally between 25-50 rupees.

<span class="wiki-legacy-anchor" id="How_does_dispute_resolution_when_trading_with_RTGS?" aria-hidden="true">
</span>

## How does dispute resolution when trading with RTGS? {#how-does-dispute-resolution-when-trading-with-rtgs}

If a dispute occurs the mediator may ask the buyer to send them information showing that they made the payment of the correct amount to the BTC Seller within the correct time frame.

The mediator may ask the seller to send them information to prove their account details are correct, or in the case of the BTC Buyer making a payment late, or of the wrong amount.

For more information see <span class="wiki-link-gap">dispute resolution <small>[unrecovered article: dispute resolution]</small></span>.

</div>
