---
title: "Wise"
slug: "wiki/wise"
tableOfContents: false
---

<nav data-pagefind-ignore class="wiki-source-toc" aria-label="Article sections"><details open><summary>On this page</summary><ul><li><a href="#setting-up-a-wise-account">Setting up a Wise Account</a></li><li><a href="#setting-up-a-wise-account-in-bisq">Setting up a Wise Account in Bisq</a></li><li><a href="#getting-your-wise-account-ready-for-trading">Getting your Wise account ready for trading</a></li><li><a href="#making-payments-with-wise">Making payments with Wise</a></li></ul></details></nav>

<div class="wiki-recovered-article" lang="en">

**Wise**, formally TransferWise, was added as a distinct payment method to Bisq in v1.5.0.

Wise can be used in SEPA trades as well, where one peer uses SEPA and another uses TransferWise. This article discusses Wise-to-Wise trades, where both peers use Wise.

Wise is a web- and app-based money transfer service that supports multiple currencies. Wise to Wise payments allow users to send payment from any supported currency to any other supported currency. Payments utilize the Wise multi-currency account. This is available for users in most countries.

<span class="wiki-legacy-anchor" id="Setting_up_a_Wise_Account" aria-hidden="true">
</span>

## Setting up a Wise Account {#setting-up-a-wise-account}

Set up an account. Go to [Wise](https://wise.com/) and register for an account. KYC will be required.

<span class="wiki-legacy-anchor" id="Setting_up_a_Wise_Account_in_Bisq" aria-hidden="true">
</span>

## Setting up a Wise Account in Bisq {#setting-up-a-wise-account-in-bisq}

Go to <code class="wiki-source-code" id="source-code-1">Account</code> > <code class="wiki-source-code" id="source-code-2">National Currency Accounts</code> in Bisq and select <code class="wiki-source-code" id="source-code-3">Add New Account</code>.

Enter the email address you have registered with TransferWise and the currencies you would like to make and take offers with.

<span class="wiki-legacy-anchor" id="Getting_your_Wise_account_ready_for_trading" aria-hidden="true">
</span>

## Getting your Wise account ready for trading {#getting-your-wise-account-ready-for-trading}

*This section is primarily for **BTC sellers** using Wise.*

You can set up your account on the mobile app or on the web site. Screenshots are from the website.

On the left click \'open a balance\'. Choose the currency you would like to trade in and select Confirm. You can add as many currencies as you wish.

The following currencies all come with local bank details as part of your Wise account (may differ depending on locations):

- AUD
- EUR
- GBP
- NZD
- RON
- SGD
- USD

If you are selling Bitcoin on Bisq these accounts are useful as they allow you to trade with those currencies as they give you a recipient bank account that can be used to receive funds from the Buyer of Bitcoin

Click on recipients. This is where you set up where you want the money paid to.

Click \'Add your bank account\' and enter your bank account details (these can be your own bank details, or they can be the Wise local bank account details you have created).

Once added click the down arrow next to the account and select \'[make primary](https://wise.com/help/articles/2932129/nominating-a-primary-account)\'. This means when someone pays you via Wise to Wise it will go into your primary bank account.

NB: You need to have a primary bank account set up for each currency you wish to receive funds to on Wise. If you do not have a payment account set up the trader might not be able to send payment to you. If they are able payment will appear in your Wise balance for this currency.

<span class="wiki-legacy-anchor" id="Making_payments_with_Wise" aria-hidden="true">
</span>

## Making payments with Wise {#making-payments-with-wise}

*This section is primarily for **BTC buyers** using Wise.*

Because of the way Wise payments are implemented in the Bisq trade protocol, the only information sellers have about buyers is their email address.

Wise has a useful guide about this [in their help section](https://wise.com/help/articles/2932105/can-i-send-money-to-someone-with-only-their-email-address).

To set up a transfer to an email address, follow these steps:

1. Start a transfer by clicking the Send money button
2. At the recipient step, choose Someone else or Business or charity
3. Untick the box next to I know their bank details
4. Enter your recipient’s email and full name
5. Pay for the transfer as usual

You can then choose how you would like to pay. You can even pay by credit or debit card!

On the case that the payment was made with a name different from the email address (which is allowed) and could create some confusion, the receiver could verify that the name of the btc buyer is correct by writing his email on a new payment and see if the name matches the one he received it from. \*Of course do not go through resending them any funds, there is no need in order to verify the name.

</div>
