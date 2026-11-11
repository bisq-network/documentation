---
title: "ACH Transfer"
slug: "wiki/ach-transfer"
tableOfContents: false
---

<nav data-pagefind-ignore class="wiki-source-toc" aria-label="Article sections"><details open><summary>On this page</summary><ul><li><a href="#quick-facts">Quick Facts</a></li><li><a href="#account-setup-limits">Account Setup &amp; Limits</a></li><li><a href="#is-my-bank-compatible">Is my bank compatible?</a></li><li><a href="#fees-and-limits">Fees and Limits</a></li><li><a href="#adding-ach-transfer-to-bisq">Adding ACH Transfer to Bisq</a></li><li><a href="#how-to-trade-with-ach">How to Trade with ACH</a></li><li><a href="#buying-btc">Buying BTC</a></li><li><a href="#selling-btc">Selling BTC</a></li><li><a href="#dispute-resolution">Dispute Resolution</a></li></ul></details></nav>

<div class="wiki-recovered-article" lang="en">

**ACH Transfer**, or Automated Clearing House transfer, is a payment method introduced in Bisq v1.8.0. It is primarily used for domestic, low-value payments between participating financial institutions in the United States. Along with [domestic wire transfers](../domestic-wire-transfer/), ACH is one of the two primary bank transfer methods used in the US.

<span class="wiki-legacy-anchor" id="Quick_Facts" aria-hidden="true">
</span>

## Quick Facts {#quick-facts}

- **Supported Countries:** United States only.
- **Supported Currencies:** USD only.
- **Maximum Trade Duration:** 5 days (though most complete within 1–2 business days).
- **Trade Limits:** <span class="wiki-template-gap" role="note"><strong>[Unresolved template: MaxTradeSizeBisq1]</strong> <code>{{MaxTradeSizeBisq1}}</code></span>.
- **Account Signing:** Not required.

<div>

**SECURITY WARNING: Never confirm micro-deposits for a Bisq trade.**

Some banks verify external accounts using micro-deposits (small transfers of a few cents). If a trade partner initiates micro-deposits, they are likely attempting to \"link\" your account to theirs. In the ACH system, a linked account may allow the other party to **debit (withdraw)** funds from your account without further authorization.

- **Sellers:** If you receive micro-deposits, do not verify the amounts for the buyer.
- **Buyers:** Do not use \"Direct Deposit\" setup methods; use standard \"Third-Party Transfer\" or \"Bill Pay\" features.

</div>

<span class="wiki-legacy-anchor" id="Account_Setup_&amp;_Limits" aria-hidden="true">
</span>

## Account Setup & Limits {#account-setup-limits}

<span class="wiki-legacy-anchor" id="Is_my_bank_compatible?" aria-hidden="true">
</span>

### Is my bank compatible? {#is-my-bank-compatible}

Not all banks offer third-party ACH transfers. Many banks only allow ACH transfers to other accounts **you own**. Before trading, verify that your bank supports \"Third-Party ACH Transfers\" or \"External Transfers\" to individuals. If your bank insists on micro-deposit verification, it is likely not a true third-party transfer service.

<span class="wiki-legacy-anchor" id="Fees_and_Limits" aria-hidden="true">
</span>

### Fees and Limits {#fees-and-limits}

- **Fees:** Usually low-cost or free, but some banks charge for \"Same Day ACH\" or expedited delivery. Always check your bank\'s fee schedule.
- **Transfer Limits:** Your bank likely has daily or monthly \"External Transfer\" limits. Ensure these limits accommodate your Bisq trade size before opening an offer.

<span class="wiki-legacy-anchor" id="Adding_ACH_Transfer_to_Bisq" aria-hidden="true">
</span>

## Adding ACH Transfer to Bisq {#adding-ach-transfer-to-bisq}

To add your ACH account to Bisq:

1. Head to the top menu and select **Account**.
2. Choose **National Currency Accounts**.
3. Click on **Add new account**.
4. Select **ACH**.
5. Fill in the necessary details (Routing Number, Account Number, etc.).
6. **Account Name:** You can set a custom name (e.g., \"ACH - Chase - Jane Doe\") to help you stay organized. This name is only visible to you.
7. Click **Save new account**.

**Note:** Ensure all details are accurate. Sellers can only confirm payment if the name associated with the incoming ACH transfer matches the account name listed in Bisq.

<span class="wiki-legacy-anchor" id="How_to_Trade_with_ACH" aria-hidden="true">
</span>

## How to Trade with ACH {#how-to-trade-with-ach}

<span class="wiki-legacy-anchor" id="Buying_BTC" aria-hidden="true">
</span>

### Buying BTC {#buying-btc}

1. Make or take an offer on the USD market.
2. Once the trade is confirmed, Bisq will provide the seller\'s ACH details.
3. Send the payment through your bank\'s portal immediately.
4. **Payment Reference:** Leave this **blank**. If your bank requires one, only use your name. Never mention \"Bisq,\" \"Bitcoin,\" or \"Crypto.\"
5. Click **Payment Started** in Bisq.

<span class="wiki-legacy-anchor" id="Selling_BTC" aria-hidden="true">
</span>

### Selling BTC {#selling-btc}

1. Make or take an offer to sell BTC on the USD market.
2. After confirmation, Bisq will provide the buyer with your ACH details.
3. Wait for the buyer to send the payment and click \"Payment Started.\"
4. **Verify the funds:** Once the funds arrive in your bank account, click **Confirm Payment Received** to release the BTC.
5. **Security Note:** If you receive small \"micro-deposits\" instead of the full trade amount, **do not** communicate those amounts to the buyer.

<span class="wiki-legacy-anchor" id="Dispute_Resolution" aria-hidden="true">
</span>

## Dispute Resolution {#dispute-resolution}

If a dispute occurs, the mediator may ask the buyer to provide proof of payment (e.g., a PDF receipt) showing the correct amount and recipient details. The mediator may also ask the seller for a redacted statement to prove their account details or to show that a payment was not received.

For more information, see <span class="wiki-link-gap">dispute resolution <small>[unrecovered article: dispute resolution]</small></span>.

</div>
