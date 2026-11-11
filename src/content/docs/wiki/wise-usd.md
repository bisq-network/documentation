---
title: "Wise-USD"
slug: "wiki/wise-usd"
tableOfContents: false
---

<nav data-pagefind-ignore class="wiki-source-toc" aria-label="Article sections"><details open><summary>On this page</summary><ul><li><a href="#wise-usd-characteristics">Wise-USD Characteristics</a></li><li><a href="#setup">Setup</a></li><li><a href="#1-set-up-wise-account-external">1. Set up Wise Account (External)</a></li><li><a href="#2-add-wise-usd-to-bisq">2. Add Wise-USD to Bisq</a></li><li><a href="#trading-process-bisq-v1">Trading Process (Bisq v1)</a></li><li><a href="#buying-btc-with-wise-usd">Buying BTC with Wise-USD</a></li><li><a href="#selling-btc-with-wise-usd">Selling BTC with Wise-USD</a></li><li><a href="#dispute-resolution">Dispute Resolution</a></li></ul></details></nav>

<div class="wiki-recovered-article" lang="en">

**Wise-USD** (formerly TransferWise-USD) is a payment method available on Bisq, primarily for trading USD. It was added in Bisq v1.8.0.

Wise itself is a web- and app-based money transfer service supporting multiple currencies, allowing Wise-to-Wise transfers between users globally (see [Wise](../wise/) payment method page, added in v1.5.4). However, due to specific US banking regulations and restrictions on USD transfers documented by Wise, a separate **Wise-USD** payment method is used within Bisq exclusively for USD trades.

<aside class="wiki-admonition" role="note">

**Note**

**Version Context:** The details on this page, particularly regarding trade limits, apply to trading on **[Bisq v1](../bisq-1/)**.

</aside>

<span class="wiki-legacy-anchor" id="Wise-USD_Characteristics" aria-hidden="true">
</span>

## Wise-USD Characteristics {#wise-usd-characteristics}

- **Availability:** Generally available to users with a Wise account who are permitted by Wise to send/receive USD according to Wise\'s policies. Users should consult Wise for specific eligibility.
- **Currency:** **USD** only.
- **Fees:** Wise itself may charge small fees for sending USD or for currency conversion if funding the payment from a non-USD balance. Users should check Wise\'s current fee schedule.
- **Limits & Restrictions:** While Bisq sets the BTC trade size limit (see below), **Wise imposes its own sending/receiving limits and restrictions** based on account verification, region, and other factors. Users **must** check their own Wise account limits and USD transfer eligibility before trading. See Wise help pages for details:
  - [Can I get USD account details?](https://wise.com/help/articles/2810318/why-cant-i-get-usd-account-details)
  - [Sending US dollars to countries outside the US](https://wise.com/help/articles/2946451/sending-usd-to-countries-outside-the-us)
  - [What countries can I send USD to?](https://wise.com/help/articles/2974947/what-countries-can-i-send-usd-to)
- **Maximum Trade Duration:** 4 days.
- **Maximum BTC Limit (Bisq v1):** <span class="wiki-template-gap" role="note"><strong>[Unresolved template: MaxTradeSizeBisq1]</strong> <code>{{MaxTradeSizeBisq1}}</code></span>.
- **[Account Signing](../account-limits/) Required:** No.

<span class="wiki-legacy-anchor" id="Setup" aria-hidden="true">
</span>

## Setup {#setup}

<span class="wiki-legacy-anchor" id="1._Set_up_Wise_Account_(External)" aria-hidden="true">
</span>

### 1. Set up Wise Account (External) {#1-set-up-wise-account-external}

You must first have an active account with [Wise](https://wise.com/). Ensure your account is verified and eligible for sending/receiving USD payments according to Wise\'s terms and regional availability.

<span class="wiki-legacy-anchor" id="2._Add_Wise-USD_to_Bisq" aria-hidden="true">
</span>

### 2. Add Wise-USD to Bisq {#2-add-wise-usd-to-bisq}

Once your external Wise account is ready:

1. Go to the **Account** tab in Bisq.
2. Select **National Currency Accounts**.
3. Click **Add New Account**.
4. Select **Wise-USD** from the payment method dropdown list.
5. Fill in the required details accurately (e.g., your registered Wise email address).
6. (Optional) Add a custom **Account Name** visible only to you (e.g., \"Wise-USD - John Doe\") for easier management if you have multiple accounts.
7. Click **Save New Account**.

<figure class="wiki-source-image" id="source-image-1"><a href="../../media/wiki/29b8fc57907033c260aed21aa820f83a5caf08fda9f4dd6a0d80e6353549e588.png"><img alt="Selecting 'Wise-USD' when adding a new National Currency Account in Bisq v1." decoding="async" height="2590" loading="lazy" src="../../media/wiki/29b8fc57907033c260aed21aa820f83a5caf08fda9f4dd6a0d80e6353549e588.png" width="4320"></a><figcaption>Selecting 'Wise-USD' when adding a new National Currency Account in Bisq v1.<br><small>Historical full-size recovered source. <a href="../../recovered-media/">Provenance catalogue</a>.</small></figcaption></figure>&#10;<div>&#10;</div>

<aside class="wiki-admonition" role="note">

**Warning**

Ensure the details entered in Bisq exactly match your Wise account information. Mismatches can lead to failed trades or disputes.

</aside>

<span class="wiki-legacy-anchor" id="Trading_Process_(Bisq_v1)" aria-hidden="true">
</span>

## Trading Process (Bisq v1) {#trading-process-bisq-v1}

<span class="wiki-legacy-anchor" id="Buying_BTC_with_Wise-USD" aria-hidden="true">
</span>

### Buying BTC with Wise-USD {#buying-btc-with-wise-usd}

Follow these steps carefully when buying BTC:

1. Make or take an offer to buy BTC on the USD market using Wise-USD.
2. Once the trade starts and the deposit confirms, view the seller\'s Wise-USD details (usually their registered email address) in the Bisq trade screen.
3. Log in to your Wise account (app or website) and send the exact USD payment amount to the seller\'s details **only as provided in Bisq**.
4. **Important - Payment Reference:** When sending via Wise, leave the payment reference/description field **blank**. If Wise requires an entry, use **only** your exact name as registered on your Wise account. Do **not** add any other text (e.g., \"Bisq\", \"BTC\", trade IDs, order details, etc.).
5. After successfully sending the payment via Wise, click the **Payment started** button in Bisq.

<span class="wiki-legacy-anchor" id="Selling_BTC_with_Wise-USD" aria-hidden="true">
</span>

### Selling BTC with Wise-USD {#selling-btc-with-wise-usd}

Follow these steps carefully when selling BTC:

1. Make or take an offer to sell BTC on the USD market using Wise-USD.
2. Once the trade starts and the deposit confirms, the buyer will see your Wise-USD details (from the account you added in Bisq).
3. Wait for the buyer to send the payment via Wise and click \"Payment started\" in Bisq.
4. Log in to your Wise account and **verify** you have received the **correct USD amount**.
5. **Verify Sender Name:** Check that the payment came from a sender whose name **exactly matches** the BTC Buyer\'s name shown in the Bisq trade details.

<aside class="wiki-admonition" role="note">

**Warning**

If the names do **not** match, do **not** confirm the payment. Open [dispute resolution](../dispute-resolution-in-bisq-1/) immediately.

</aside>

1. Once **both** the payment amount and sender name are verified correct, click **Confirm payment receipt** in Bisq to release the BTC.

<span class="wiki-legacy-anchor" id="Dispute_Resolution" aria-hidden="true">
</span>

## Dispute Resolution {#dispute-resolution}

If a dispute arises (e.g., payment not received, wrong amount, sender name mismatch), follow the [dispute resolution](../dispute-resolution-in-bisq-1/) process.

- A [Mediator](../mediator/) may ask the buyer for proof of payment (screenshot from Wise showing recipient details, amount, date).
- The [Mediator](../mediator/) may ask the seller for information to verify their account details or confirm non-receipt/incorrect receipt.

</div>
