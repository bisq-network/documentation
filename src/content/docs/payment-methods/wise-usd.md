---
title: "Wise-USD"
description: "Check USD eligibility, choose the separate method and verify full receipt."
---

*Checked 7 November 2026 · Bisq 1 v1.10.11.*

**Current client:** `TRANSFERWISE_USD` is registered in Bisq 1 v1.10.11 with a **4-day** trade period. This method is not in the client's chargeback-signing schedule; other protocol and personal limits still apply. Provider access, fees and account allowances must be checked separately.

Wise-USD is a distinct **USD** payment method in Bisq 1. It is separate from the multi-currency Wise method and from a conventional US bank transfer using Wise-provided bank details.

## Confirm USD eligibility first

Wise's USD sending/receiving availability depends on country, verification and the actual route. Check your own account and the provider's USD restrictions before accepting an offer. A Wise account alone does not establish that it can receive the proposed transfer.

## Add the correct account

Choose Wise-USD in **Account → National currency accounts → Add new account**. Enter the details the current form requests, accurately matching your provider account. A custom Bisq account name is a local label, not a substitute for the real payment identity.

## Pay and check the full USD amount

Use only the destination supplied in the trade, send the exact USD amount and retain the receipt. Account for funding and conversion fees. Leave the payment reference blank where possible and follow the current [payment-reference rule](../../bisq-1/first-trade/).

The seller checks actual credited USD and matching payer details before releasing BTC. If a sender name, account, currency or amount differs, request mediation instead of confirming. The four-day software window does not guarantee provider processing.

<figure><a href="../../media/wiki/29b8fc57907033c260aed21aa820f83a5caf08fda9f4dd6a0d80e6353549e588.png"><img src="../../media/wiki/29b8fc57907033c260aed21aa820f83a5caf08fda9f4dd6a0d80e6353549e588.png" alt="Wise-USD account selection" loading="lazy" /></a><figcaption>Wise-USD account selection. Historical illustration; current screens and values may differ.</figcaption></figure>

For shared setup and payment checks, use [payment accounts](../../bisq-1/payment-accounts/), [limits and signing](../account-limits/) and [fiat payment problems](../fiat-problems/).

<details>
<summary>Sources and checks</summary>

[PaymentMethod.java (pinned source)](https://github.com/bisq-network/bisq/blob/ea9d5dff90c99ac462f2b0a7bf9ef92683956619/core/src/main/java/bisq/core/payment/payload/PaymentMethod.java#L210-L300) · [AccountAgeWitnessService.java (pinned source)](https://github.com/bisq-network/bisq/blob/ea9d5dff90c99ac462f2b0a7bf9ef92683956619/core/src/main/java/bisq/core/account/witness/AccountAgeWitnessService.java#L475-L515) · [displayStrings.properties (pinned source)](https://github.com/bisq-network/bisq/blob/ea9d5dff90c99ac462f2b0a7bf9ef92683956619/core/src/main/resources/i18n/displayStrings.properties#L345-L368).

Client registration and trade period checked against the pinned release. Provider-specific historical numbers and instructions are qualified above; a live transfer or complete provider onboarding was not tested.

Adapted from **Wise-USD**, revision 3987 (2025-04-23). [Exact source](../../wiki-source/wise-usd.wiki.txt) · [Attribution and revision metadata](../../wiki-source/wise-usd.json).

</details>
