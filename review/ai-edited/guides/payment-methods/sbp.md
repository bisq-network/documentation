---
title: "Faster Payments System SBP"
description: "Use Russian RUB phone-and-bank transfers without confusing them with UK Faster Payments."
---

*Checked 7 November 2026 · Bisq 1 v1.10.11.*

**Current client:** `SBP` is registered in Bisq 1 v1.10.11 with a **1-day** trade period. This method is not in the client's chargeback-signing schedule; other protocol and personal limits still apply. Provider access, fees and account allowances must be checked separately.

SBP (Система быстрых платежей) uses a recipient phone number and participating Russian bank for RUB transfers. It is **not** the UK's Faster Payments service.

## Select the right receiving bank

The same phone number can be linked to more than one bank. Check the actual bank and account specified by your peer, not just the phone number. Enable SBP through your own participating institution before taking an offer.

## Limits, fees and delays

The original guide described continuous operation and usually quick payments. Banks can still apply fraud checks, transaction ceilings and fees. The old daily RUB thresholds and 100,000 RUB monthly free allowance are not verified current terms; check your bank's current conditions and the Bank of Russia's system information.

Confirm that your transfer is to the intended person, in RUB, and within the bank's permitted route. Payment reference, receipt and payer-identity checks remain necessary. Do not assume the one-day software window makes an unavailable bank route usable.

For shared setup and payment checks, use [payment accounts](../../bisq-1/payment-accounts/), [limits and signing](../account-limits/) and [fiat payment problems](../fiat-problems/).

<details>
<summary>Sources and checks</summary>

[PaymentMethod.java (pinned source)](https://github.com/bisq-network/bisq/blob/ea9d5dff90c99ac462f2b0a7bf9ef92683956619/core/src/main/java/bisq/core/payment/payload/PaymentMethod.java#L210-L300) · [AccountAgeWitnessService.java (pinned source)](https://github.com/bisq-network/bisq/blob/ea9d5dff90c99ac462f2b0a7bf9ef92683956619/core/src/main/java/bisq/core/account/witness/AccountAgeWitnessService.java#L475-L515) · [displayStrings.properties (pinned source)](https://github.com/bisq-network/bisq/blob/ea9d5dff90c99ac462f2b0a7bf9ef92683956619/core/src/main/resources/i18n/displayStrings.properties#L345-L368).

Client registration and trade period checked against the pinned release. Provider-specific historical numbers and instructions are qualified above; a live transfer or complete provider onboarding was not tested.

Adapted from **Faster Payments System SBP**, revision 3915 (2025-02-12). [Exact source](../../wiki-source/faster-payments-system-sbp.wiki.txt) · [Attribution and revision metadata](../../wiki-source/faster-payments-system-sbp.json).

</details>
