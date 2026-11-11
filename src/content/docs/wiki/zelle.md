---
title: "Zelle"
slug: "wiki/zelle"
tableOfContents: false
---

<nav data-pagefind-ignore class="wiki-source-toc" aria-label="Article sections"><details open><summary>On this page</summary><ul><li><a href="#about-zelle">About Zelle</a></li><li><a href="#using-zelle-on-bisq-v1">Using Zelle on Bisq v1</a></li><li><a href="#limits-and-requirements">Limits and Requirements</a></li><li><a href="#setting-up-your-zelle-account-in-bisq">Setting Up Your Zelle Account in Bisq</a></li><li><a href="#trading-with-zelle-on-bisq-v1">Trading with Zelle on Bisq v1</a></li><li><a href="#buying-btc-with-zelle">Buying BTC with Zelle</a></li><li><a href="#selling-btc-with-zelle">Selling BTC with Zelle</a></li><li><a href="#potential-issues">Potential Issues</a></li><li><a href="#dispute-resolution">Dispute Resolution</a></li><li><a href="#bank-blocking-payment">Bank Blocking Payment</a></li></ul></details></nav>

<div class="wiki-recovered-article" lang="en">

**Zelle** is a popular payment method within the United States (US) for buying and selling bitcoin for USD on Bisq. It is offered directly through the mobile apps or online banking of many US banks and credit unions. Zelle payments are typically instant, but users should be aware they can occasionally take longer (Bisq allows up to 4 days for the trade window).

<aside class="wiki-admonition" role="note">

**Note**

**Version Context:** The details on this page, particularly regarding trade limits and account signing, primarily apply to trading on **[Bisq v1](../bisq-1/)**.

</aside>

<span class="wiki-legacy-anchor" id="About_Zelle" aria-hidden="true">
</span>

## About Zelle {#about-zelle}

Zelle allows users to easily send and receive money using only the recipient’s email address or U.S. mobile number, provided both parties are enrolled. Money is usually available within minutes. Zelle itself does not charge fees for transfers, though your bank might have standard account fees. Account details and transaction activity remain private between the user and their bank.

- **Availability:** Zelle is available **only in the United States** and facilitates transfers in **USD**. It is integrated into over 2,200 bank and credit union apps.
- **Standalone App Discontinued:** The separate Zelle mobile app (for users whose banks didn\'t offer Zelle directly) was **discontinued on April 1, 2025**. Users who relied on the standalone app must now access Zelle through a participating bank or credit union\'s online/mobile banking services.
- **More Information:** Visit the official Zelle website FAQ for more details: [https://www.zellepay.com/faq/top-zelle-questions](https://www.zellepay.com/faq/top-zelle-questions)

<span class="wiki-legacy-anchor" id="Using_Zelle_on_Bisq_v1" aria-hidden="true">
</span>

## Using Zelle on Bisq v1 {#using-zelle-on-bisq-v1}

<span class="wiki-legacy-anchor" id="Limits_and_Requirements" aria-hidden="true">
</span>

### Limits and Requirements {#limits-and-requirements}

- **Spending Limits:** Zelle limits (daily, weekly, monthly) vary significantly between banks and credit unions. **Buyers are responsible for checking their own Zelle sending limits** (usually visible within their banking app) before starting a trade.
- **Maximum Trade Duration:** 4 days.
- **Maximum BTC per Trade:** <span class="wiki-template-gap" role="note"><strong>[Unresolved template: MaxTradeSizeBisq1]</strong> <code>{{MaxTradeSizeBisq1}}</code></span> (This is the standard [Bisq v1](../bisq-1/) limit).
- **Account Signing:** Yes, Zelle accounts **require [signing](../account-limits/)** in [Bisq v1](../bisq-1/). In Bisq 1 v1.10.11, the unsigned BTC-buying allowance is 0.002 BTC; higher buying limits phase in after eligible signing. Selling is governed by the method\'s applicable maximum.

<span class="wiki-legacy-anchor" id="Setting_Up_Your_Zelle_Account_in_Bisq" aria-hidden="true">
</span>

### Setting Up Your Zelle Account in Bisq {#setting-up-your-zelle-account-in-bisq}

Before adding Zelle to Bisq, ensure you have enrolled with Zelle through your participating bank or credit union\'s app or website. This usually involves verifying your U.S. mobile number or email address.

To add your Zelle account to Bisq:

1. Go to the **Account** tab in Bisq.
2. Click **Add New Account**.
3. Select **Zelle (ClearXchange)** from the payment method dropdown list.
4. Enter the **Full Name** associated with your bank account.

<aside class="wiki-admonition" role="note">

**Warning**

Use your real name exactly as registered with your bank. Sellers cannot confirm payment receipt if the sender\'s name doesn\'t match the name provided in Bisq, per trade rules.

</aside>

1. Enter the **Email Address or U.S. Mobile Number** that you have registered with Zelle.
2. (Optional) Add a custom **Account Name** visible only to you (useful if you add multiple Zelle methods).
3. Click **Save New Account**.

<span class="wiki-legacy-anchor" id="Trading_with_Zelle_on_Bisq_v1" aria-hidden="true">
</span>

## Trading with Zelle on Bisq v1 {#trading-with-zelle-on-bisq-v1}

<span class="wiki-legacy-anchor" id="Buying_BTC_with_Zelle" aria-hidden="true">
</span>

### Buying BTC with Zelle {#buying-btc-with-zelle}

1\. Find an offer to buy BTC (or create your own) in the USD market using Zelle. 2. Once the trade starts and the initial deposit transaction confirms, you\'ll see the seller\'s Zelle details (Full Name and registered Email/Phone Number). 3. Log in to your bank/credit union\'s mobile app or website and initiate the Zelle payment **exactly** as instructed on the Bisq trade screen.

<aside class="wiki-admonition" role="note">

**Warning**

Only use the payment details provided in the Bisq trade. Do not send to different details if requested by the peer outside of Bisq.

</aside>

4\. After sending the payment, click the **Payment started** button in Bisq.

<span class="wiki-legacy-anchor" id="Selling_BTC_with_Zelle" aria-hidden="true">
</span>

### Selling BTC with Zelle {#selling-btc-with-zelle}

1\. Find an offer to sell BTC (or create your own) in the USD market using Zelle. 2. Once the trade starts and the initial deposit transaction confirms, the buyer will see your Zelle details (from the account you added in Bisq) and will send the payment. 3. Wait for the buyer to click \"Payment started\" in Bisq. 4. **Verify** in your bank account that you have received the correct USD amount **from a sender whose name matches** the buyer\'s name shown in the Bisq trade details.

<aside class="wiki-admonition" role="note">

**Warning**

Only confirm payment receipt if the sender\'s name matches the details in Bisq, per trade rules.

</aside>

5\. Once verified, click the button in Bisq to **Confirm payment receipt**, which releases the BTC to the buyer.

<span class="wiki-legacy-anchor" id="Potential_Issues" aria-hidden="true">
</span>

## Potential Issues {#potential-issues}

<span class="wiki-legacy-anchor" id="Dispute_Resolution" aria-hidden="true">
</span>

### Dispute Resolution {#dispute-resolution}

If a problem occurs (e.g., payment not received, wrong amount sent, sender name mismatch), a [dispute resolution](../dispute-resolution-in-bisq-1/) process involving a [Mediator](../mediator/) may be initiated.

- The **buyer** might need to provide proof of payment (screenshot, bank statement showing correct amount, recipient, and timestamp).
- The **seller** might need to provide information to verify their account details or confirm non-receipt.

<span class="wiki-legacy-anchor" id="Bank_Blocking_Payment" aria-hidden="true">
</span>

### Bank Blocking Payment {#bank-blocking-payment}

Banks or credit unions may sometimes block Zelle payments based on their own risk algorithms or policies. If you (as the buyer) are unable to send the Zelle payment for reasons beyond your control: 1. Do **not** try to send payment from a different Zelle account or a friend/family member\'s account. 2. Immediately open a support ticket with a [Mediator](../mediator/): select the trade in Bisq and press **Alt + O** (Option + O on macOS; Ctrl + O is also accepted). 3. Explain the situation clearly to the [Mediator](../mediator/).

</div>
