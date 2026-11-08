---
title: "Make your first Bisq 1 trade"
description: "Buy bitcoin through the multisig protocol, from selecting an offer to confirming completion."
---

*Bisq 1 v1.10.11 · Checked 7 November 2026.*

This walkthrough is for **buying bitcoin with a national-currency payment account in Bisq 1**. BSQ swaps and Bisq Easy use different flows.

You need an existing BTC balance for the security deposit and mining fees, plus the trading fee shown by the application. If you need a way to buy your first bitcoin without a security deposit, [compare Bisq 1 and Bisq 2](../../start/choose-bisq/).

## Prepare before accepting an offer

[Install the current release](../install-and-verify/), [back up](../backup-and-recovery/), and [add the payment account](../payment-accounts/) you will actually use. Choose an amount you can comfortably fund and complete within the displayed trade period.

Open **Buy BTC** and select your currency and payment account. Review an available offer's price, amount range, payment method, account restrictions and any conditions. An offer can disappear before you take it; viewing or funding it is not a guarantee that it remains available.

## Fund and confirm the trade

1. Select the amount within the offer's permitted range.
2. Read the funding breakdown: security deposit, trading fee and mining fees. Use the amounts in the application rather than a fixed amount from an old tutorial.
3. Fund using your Bisq wallet or the external-wallet option shown. Reusing wallet funds can link transactions; choose with that privacy trade-off in mind.
4. Review the final trade details and accept only if you can meet them. After success, follow the trade under **Portfolio → Open trades**.

<figure><a href="../../media/wiki/b2782501f26f46cb3c7cd5b5c07b391a8c7188c94733ab6e886de65c98ca5d15.png"><img src="../../media/wiki/b2782501f26f46cb3c7cd5b5c07b391a8c7188c94733ab6e886de65c98ca5d15.png" alt="Trade funding screen with deposit and fee breakdown" loading="lazy" /></a><figcaption>Historical funding screen; use the amounts in your current application.</figcaption></figure>

## Pay only when the trade is ready

Wait for the deposit confirmation and the application's payment step. **Do not pay before that step or while the seller's payment details are missing.** Contact the peer through the trade chat if information is unclear.

Send the exact amount using the agreed payment account and method. Follow its specific instructions and cover the sender-side fees. Bisq does not send the bank payment for you.

Leave the payment-reference field blank when possible. **Never enter the trade ID, “Bitcoin,” “BTC” or “Bisq.”** If a reference is compulsory, the current application permits your account name or a non-descriptive dash; discuss any alternative in the trade chat before paying.

Once you have actually initiated the payment, select **Payment started** in Bisq. Do not press it in advance, and do not send the payment again just because the seller has not yet confirmed it. Check your bank's status and communicate through the trade.

## Check completion

The seller checks receipt and confirms in Bisq. When the payout completes, review the trade summary and balances. Completed trades appear under **Portfolio → History**; wallet transactions are under **Funds → Transactions**. Funds can stay in the Bisq wallet or be withdrawn with the applicable network fee.

If you later **sell** bitcoin, confirm receipt only after checking your own bank/payment account for the correct amount and matching sender identity. A screenshot or the buyer's “Payment started” message is not proof that you received money. Confirmation releases the locked bitcoin.

For a delay, mismatch or failed transaction, use [dispute help](../dispute-help/). Keep seed words, passwords and private keys out of every trade chat.

<details>
<summary>Sources and review notes</summary>

- [Funding and offer-taking UI](https://github.com/bisq-network/bisq/blob/ea9d5dff90c99ac462f2b0a7bf9ef92683956619/core/src/main/resources/i18n/displayStrings.properties#L618-L668).
- [Deposit/payment sequence and reference rules](https://github.com/bisq-network/bisq/blob/ea9d5dff90c99ac462f2b0a7bf9ef92683956619/core/src/main/resources/i18n/displayStrings.properties#L802-L850).
- [Seller receipt checks](https://github.com/bisq-network/bisq/blob/ea9d5dff90c99ac462f2b0a7bf9ef92683956619/core/src/main/resources/i18n/displayStrings.properties#L938-L996) and [completed-trade locations](https://github.com/bisq-network/bisq/blob/ea9d5dff90c99ac462f2b0a7bf9ef92683956619/core/src/main/resources/i18n/displayStrings.properties#L1061-L1063).
- [Historical taking-an-offer article](../../wiki-source/taking-an-offer.wiki.txt).

These instructions were checked against release sources; a full desktop walkthrough remains pending.

</details>
