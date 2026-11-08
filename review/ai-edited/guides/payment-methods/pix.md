---
title: "Pix"
description: "Verify the Pix key, recipient and real BRL credit before releasing BTC."
---

*Checked 7 November 2026 · Bisq 1 v1.10.11.*

**Current client:** `PIX` is registered in Bisq 1 v1.10.11 with a **1-day** trade period. This method is not in the client's chargeback-signing schedule; other protocol and personal limits still apply. Provider access, fees and account allowances must be checked separately.

Pix settles BRL payments through participating Brazilian institutions. The recipient can supply an appropriate Pix key, such as a phone number or email; use the exact identifier shown in the trade and verify the resulting recipient before authorizing payment.

## Check limits before taking an offer

Pix can operate around the clock, but the source's “no limits” and generally free claims are not universal account terms. Your institution can apply transaction limits, time-of-day restrictions, fraud checks or charges. Check what your own account can send and receive for the trade amount.

## Verify payment, not a notification

Send the exact BRL amount and retain the confirmation. Sellers should inspect their own account for a completed credit and matching payer before releasing bitcoin. A scheduled payment, payment request or screenshot does not prove receipt.

If a Pix key resolves to an unexpected account, stop before sending and discuss it in Bisq trade chat. Do not substitute a different recipient or payer to get around a warning.

For shared setup and payment checks, use [payment accounts](../../bisq-1/payment-accounts/), [limits and signing](../account-limits/) and [fiat payment problems](../fiat-problems/).

<details>
<summary>Sources and checks</summary>

[PaymentMethod.java (pinned source)](https://github.com/bisq-network/bisq/blob/ea9d5dff90c99ac462f2b0a7bf9ef92683956619/core/src/main/java/bisq/core/payment/payload/PaymentMethod.java#L210-L300) · [AccountAgeWitnessService.java (pinned source)](https://github.com/bisq-network/bisq/blob/ea9d5dff90c99ac462f2b0a7bf9ef92683956619/core/src/main/java/bisq/core/account/witness/AccountAgeWitnessService.java#L475-L515) · [displayStrings.properties (pinned source)](https://github.com/bisq-network/bisq/blob/ea9d5dff90c99ac462f2b0a7bf9ef92683956619/core/src/main/resources/i18n/displayStrings.properties#L345-L368).

Client registration and trade period checked against the pinned release. Provider-specific historical numbers and instructions are qualified above; a live transfer or complete provider onboarding was not tested.

Adapted from **Pix**, revision 3920 (2025-02-12). [Exact source](../../wiki-source/pix.wiki.txt) · [Attribution and revision metadata](../../wiki-source/pix.json).

</details>
