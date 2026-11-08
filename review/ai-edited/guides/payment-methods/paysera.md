---
title: "Paysera"
description: "Check verification tiers, currency access and transfer or conversion costs."
---

*Checked 7 November 2026 · Bisq 1 v1.10.11.*

**Current client:** `PAYSERA` is registered in Bisq 1 v1.10.11 with a **1-day** trade period. This method is not in the client's chargeback-signing schedule; other protocol and personal limits still apply. Provider access, fees and account allowances must be checked separately.

Paysera is a multi-currency payment service; the Bisq method represents the agreed provider transfer, rather than automatically authorizing every bank route attached to a Paysera account.

## Confirm access and identification tier

Check country eligibility, currency support and your identification status with Paysera. The source's statement that a Spanish bank account was required conflicts with its own global-service description and is not retained as a prerequisite.

The original four-level table illustrated how verification could affect daily, monthly and annual limits. Do not reuse its €30/€370/€1,480 thresholds or “unlimited” top tier as current terms. Check the actual send, receive and withdrawal limits in your account before taking an offer.

## Account for conversion and bank charges

An internal transfer, currency exchange, bank withdrawal and SWIFT payment can have different prices. Old “free” or “about €7 SWIFT” claims are not a current quote. Ensure the intended currency and net received amount meet the trade, and retain the receipt.

Verify actual receipt and sender before releasing BTC. A multi-currency balance does not guarantee that every offered currency can be received without conversion.

For shared setup and payment checks, use [payment accounts](../../bisq-1/payment-accounts/), [limits and signing](../account-limits/) and [fiat payment problems](../fiat-problems/).

<details>
<summary>Sources and checks</summary>

[PaymentMethod.java (pinned source)](https://github.com/bisq-network/bisq/blob/ea9d5dff90c99ac462f2b0a7bf9ef92683956619/core/src/main/java/bisq/core/payment/payload/PaymentMethod.java#L210-L300) · [AccountAgeWitnessService.java (pinned source)](https://github.com/bisq-network/bisq/blob/ea9d5dff90c99ac462f2b0a7bf9ef92683956619/core/src/main/java/bisq/core/account/witness/AccountAgeWitnessService.java#L475-L515) · [displayStrings.properties (pinned source)](https://github.com/bisq-network/bisq/blob/ea9d5dff90c99ac462f2b0a7bf9ef92683956619/core/src/main/resources/i18n/displayStrings.properties#L345-L368).

Client registration and trade period checked against the pinned release. Provider-specific historical numbers and instructions are qualified above; a live transfer or complete provider onboarding was not tested.

Adapted from **Paysera**, revision 3919 (2025-02-12). [Exact source](../../wiki-source/paysera.wiki.txt) · [Attribution and revision metadata](../../wiki-source/paysera.json).

</details>
