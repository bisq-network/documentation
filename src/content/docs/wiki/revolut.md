---
title: "Revolut"
slug: "wiki/revolut"
tableOfContents: false
---

<nav data-pagefind-ignore class="wiki-source-toc" aria-label="Article sections"><details open><summary>On this page</summary><ul><li><a href="#revolut-characteristics">Revolut Characteristics</a></li><li><a href="#trading-limits">Trading Limits</a></li><li><a href="#setup">Setup</a></li><li><a href="#1-find-your-revolut-username-revtag">1. Find Your Revolut Username (Revtag)</a></li><li><a href="#2-create-the-account-in-bisq">2. Create the Account in Bisq</a></li><li><a href="#trading-process">Trading Process</a></li><li><a href="#buying-btc-with-revolut">Buying BTC with Revolut</a></li><li><a href="#selling-btc-with-revolut">Selling BTC with Revolut</a></li><li><a href="#troubleshooting-disputes">Troubleshooting &amp; Disputes</a></li></ul></details></nav>

<div class="wiki-recovered-article" lang="en">

**Revolut** is a payment method that offers banking services, including instant Revolut-to-Revolut transfers. It is available in [various countries](https://www.revolut.com/help/getting-started/verifying-identity/what-countries-are-supported) with [various currencies](https://www.revolut.com/help/getting-started/adding-money-to-revolut), making it a popular option for EUR trades on Bisq and a good possibility for other international payments.

<aside class="wiki-admonition" role="note">

**Warning**

**Revolut-to-Revolut ONLY:** Due to recurring issues with traditional bank transfers, you **cannot** use a Revolut IBAN for a SEPA trade or Revolut\'s bank details for a Faster Payments trade on Bisq. This payment method is strictly for instant transfers between two Revolut users.

</aside>

<aside class="wiki-admonition" role="note">

**Note**

**Version Context:** The details on this page, particularly regarding account signing, apply to trading on **[Bisq v1](../bisq-1/)**.

</aside>

<span class="wiki-legacy-anchor" id="Revolut_Characteristics" aria-hidden="true">
</span>

## Revolut Characteristics {#revolut-characteristics}

- **Availability:** Global (supports various currencies, heavily used in EUR market).
- **Maximum Trade Duration:** 1 day.
- **Maximum BTC Limit (for a fully-signed account):** 0.0624 BTC.
- **[Account Signing](../account-limits/) Required:** Yes.

<span class="wiki-legacy-anchor" id="Trading_Limits" aria-hidden="true">
</span>

## Trading Limits {#trading-limits}

Because Revolut is a higher-risk payment method, it is subject to **[account signing](../account-limits/)** to raise trade limits. Your selling limit is unaffected and is always the maximum for the payment method.

- **Unsigned Accounts:** When you first create a Revolut account in Bisq, your buy limit is restricted to **0.002 BTC**. This limit remains until the account is signed.
- **Signed Accounts:** To get your account signed, you must successfully complete a trade with a peer whose own account has been signed for at least 30 days. After your account is signed, your buy limit increases over time:
  - **First 30 days after signing:** Your buy limit remains at **0.002 BTC**.
  - **30-60 days after signing:** Your buy limit increases to 50% of the maximum (**0.0312 BTC**).
  - **After 60 days of signing:** Your buy limit increases to the full 100% (**0.0624 BTC**).

<span class="wiki-legacy-anchor" id="Setup" aria-hidden="true">
</span>

## Setup {#setup}

<span class="wiki-legacy-anchor" id="1._Find_Your_Revolut_Username_(Revtag)" aria-hidden="true">
</span>

### 1. Find Your Revolut Username (Revtag) {#1-find-your-revolut-username-revtag}

First, you need to find your Revolut username, which Revolut calls a **Revtag**. This is what your trading peer will use to pay you.

To find your Revtag in the current Revolut app:

1. Open the Revolut app to the main **Home** screen.
2. Tap on your **profile icon or initials** in the **top-left corner**.
3. On your Profile screen, your Revtag is displayed under your name, formatted like \`<code class="wiki-source-code" id="source-code-1">@username</code>\`.
4. **Revtags are case-sensitive.** Note it down exactly as it appears in the Revolut app, **including the \`@\` symbol**.

<span class="wiki-legacy-anchor" id="2._Create_the_Account_in_Bisq" aria-hidden="true">
</span>

### 2. Create the Account in Bisq {#2-create-the-account-in-bisq}

<table>&#10;<tbody>&#10;<tr>&#10;<td><p>To create a Revolut <span class="wiki-link-gap">payment account <small>[unrecovered article: Create a payment account]</small></span> in Bisq, you primarily need to input your <strong>Revolut username (Revtag)</strong> into the "User name" field. Be sure to enter the full Revtag exactly as it appears in your Revolut app, <strong>including the `@` symbol</strong>. You may also need to select the currencies you wish to trade.</p>&#10;<p>Remember that <em>none</em> of this information can be modified after an account is created. <a href="../account-limits/#account-signing">Account signing</a> data is tied to these details and can be lost if your data directory is not <a href="../backing-up-application-data/#back-up-payment-accounts">properly backed up</a>.</p></td>&#10;<td><figure class="wiki-source-image" id="source-image-1"><a href="../../media/wiki/ca99b9ff26a98ba0a00921d4f65b50f104e8b8a7f740fa4b07d9d959386756d2.png"><img alt="Setting up a Revolut account in Bisq v1." decoding="async" height="750" loading="lazy" src="../../media/wiki/ca99b9ff26a98ba0a00921d4f65b50f104e8b8a7f740fa4b07d9d959386756d2.png" width="2012"></a><figcaption>Setting up a Revolut account in Bisq v1.<br><small>Historical full-size recovered source. <a href="../../recovered-media/">Provenance catalogue</a>.</small></figcaption></figure></td>&#10;</tr>&#10;</tbody>&#10;</table>&#10;<details class="wiki-table-source"><summary>Original table source</summary><pre><code>{| class="wikitable" style="background-color: transparent; border: none;"&#10;| style="vertical-align:top; border: none; padding: 0 1em 0 0;" |&#10;To create a Revolut [[Create_a_payment_account|payment account]] in Bisq, you primarily need to input your '''Revolut username (Revtag)''' into the "User name" field. Be sure to enter the full Revtag exactly as it appears in your Revolut app, '''including the `@` symbol'''. You may also need to select the currencies you wish to trade.&#10;&#10;Remember that ''none'' of this information can be modified after an account is created. [[Account_limits#Account_signing|Account signing]] data is tied to these details and can be lost if your data directory is not [[Backing_up_application_data#Back_up_payment_accounts|properly backed up]].&#10;| style="vertical-align:top; border: none; padding: 0;" |&#10;[[File:Revolut create account.png|thumb|400px|right|Setting up a Revolut account in Bisq v1.]]&#10;|}</code></pre></details>

<span class="wiki-legacy-anchor" id="Trading_Process" aria-hidden="true">
</span>

## Trading Process {#trading-process}

<span class="wiki-legacy-anchor" id="Buying_BTC_with_Revolut" aria-hidden="true">
</span>

### Buying BTC with Revolut {#buying-btc-with-revolut}

1. Make or take an offer to buy BTC using Revolut. If your account is unsigned, look for offers from sellers with a signed-account badge to get your account signed.
2. Once the trade starts and the deposit confirms, view the seller\'s Revolut details (their Revtag) in the Bisq trade screen.
3. Log in to your Revolut app and send the exact payment amount to the seller\'s Revtag. Revolut\'s help center explains [how to pay other Revolut users](https://www.revolut.com/help/transfers/outbound-transfers/sending-money-to-another-revolut-user/how-do-i-pay-other-revolut-users/).
4. After sending the payment, click the **Payment started** button in Bisq.

<span class="wiki-legacy-anchor" id="Selling_BTC_with_Revolut" aria-hidden="true">
</span>

### Selling BTC with Revolut {#selling-btc-with-revolut}

1. Make or take an offer to sell BTC using Revolut.
2. Once the trade starts and the deposit confirms, the buyer will see your Revolut Revtag.
3. Wait for the buyer to send the payment and click \"Payment started\" in Bisq.
4. Log in to your Revolut account and **verify** you have received the correct amount.
5. **Verify** the payment came from a sender whose name **matches** the BTC Buyer\'s name shown in the Bisq trade details. *(Note: If the names do not match, do not confirm the payment. Open [dispute resolution](../dispute-resolution-in-bisq-1/) immediately.)*
6. Once payment is fully verified, click **Confirm payment receipt** in Bisq to release the BTC.

<span class="wiki-legacy-anchor" id="Troubleshooting_&amp;_Disputes" aria-hidden="true">
</span>

## Troubleshooting & Disputes {#troubleshooting-disputes}

If you have trouble finding your trading peer by their Revtag, check Revolut\'s troubleshooting article: [I can\'t find my friend on Revolut](https://www.revolut.com/help/transfers/outbound-transfers/sending-money-to-another-revolut-user/i-cant-find-my-friend-on-revolut/). A common reason is that you or your peer may need to enable the \"Payments with friends\" option in privacy settings.

For any other trade issues (e.g., payment not received, wrong amount), follow the [dispute resolution](../dispute-resolution-in-bisq-1/) process, which may involve a [Mediator](../mediator/).

</div>
