---
title: "Wise"
description: "Prepare email-based Wise transfers and the correct receiving currency."
---

*Checked 7 November 2026 · Bisq 1 v1.10.11.*

**Current client:** `TRANSFERWISE` is registered in Bisq 1 v1.10.11 with a **4-day** trade period. This method is not in the client's chargeback-signing schedule; other protocol and personal limits still apply. Provider access, fees and account allowances must be checked separately.

This method is for **Wise-to-Wise transfers**, normally outside USD; use the separate [Wise-USD](../wise-usd/) method for an offer requiring it. A Wise bank-transfer account used through another rail is a different case.

## Prepare the receiving currency

The original guide used a registered email address and selected currencies in Bisq. Check the current form and make sure the recipient can actually receive the offer's currency. If Wise requires a balance, receiving account or primary recipient for that currency, configure it before taking an offer.

The old list of AUD/EUR/GBP/NZD/RON/SGD/USD local details was location-dependent and is not a current eligibility list. Check available receiving details and transfer routes in your own verified account.

## Send to the intended recipient

If using Wise's email-discovery transfer, follow current Wise instructions and verify the resulting recipient name/account before sending. Do not rely on an old app screen or send a test refund to identify a stranger.

Check funding, conversion and transfer fees. The snapshot's suggestion to use a credit card is not a guarantee that Wise permits it or that it fits the trade. Keep the receipt and verify real credit before releasing BTC. Seek mediation for mismatched payer or destination details.

For shared setup and payment checks, use [payment accounts](../../bisq-1/payment-accounts/), [limits and signing](../account-limits/) and [fiat payment problems](../fiat-problems/).

<details>
<summary>Sources and checks</summary>

[PaymentMethod.java (pinned source)](https://github.com/bisq-network/bisq/blob/ea9d5dff90c99ac462f2b0a7bf9ef92683956619/core/src/main/java/bisq/core/payment/payload/PaymentMethod.java#L210-L300) · [AccountAgeWitnessService.java (pinned source)](https://github.com/bisq-network/bisq/blob/ea9d5dff90c99ac462f2b0a7bf9ef92683956619/core/src/main/java/bisq/core/account/witness/AccountAgeWitnessService.java#L475-L515) · [displayStrings.properties (pinned source)](https://github.com/bisq-network/bisq/blob/ea9d5dff90c99ac462f2b0a7bf9ef92683956619/core/src/main/resources/i18n/displayStrings.properties#L345-L368).

Client registration and trade period checked against the pinned release. Provider-specific historical numbers and instructions are qualified above; a live transfer or complete provider onboarding was not tested.

Adapted from **Wise**, revision 3808 (2024-12-19). [Exact source](../../wiki-source/wise.wiki.txt) · [Attribution and revision metadata](../../wiki-source/wise.json).

</details>
