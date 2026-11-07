---
title: "Tikkie"
description: "Separate the verified client entry from an unfinished historical provider guide."
---

*Checked 7 November 2026 · Bisq 1 v1.10.11.*

**Current client:** `TIKKIE` is registered in Bisq 1 v1.10.11 with a **1-day** trade period. This method is not in the client's chargeback-signing schedule; other protocol and personal limits still apply. Provider access, fees and account allowances must be checked separately.

The old Tikkie article was largely an unfinished template, including empty country, currency, setup and fee sections. It is not a usable provider-onboarding guide.

## What is verified

The current Bisq 1 release registers TIKKIE and sets a **one-day** trade period. This confirms the client entry; it does not verify your provider eligibility, current limits, fees or a particular payment-request workflow.

## Before using an offer

Open the current account form, read the method-specific instructions and confirm with the provider that your account can complete the exact requested transfer. Make sure a payment request is genuinely from the intended recipient and that the amount/currency match the offer. Do not treat receipt of a request or a screenshot as receipt of funds.

Check your provider's per-payment and daily limits first. If the method is unclear, choose an understood supported method rather than filling the historical article's blanks with assumptions. Keep receipts and use mediation if the actual transfer does not match the agreed account.

For shared setup and payment checks, use [payment accounts](../../bisq-1/payment-accounts/), [limits and signing](../account-limits/) and [fiat payment problems](../fiat-problems/).

<details>
<summary>Sources and checks</summary>

[PaymentMethod.java (pinned source)](https://github.com/bisq-network/bisq/blob/ea9d5dff90c99ac462f2b0a7bf9ef92683956619/core/src/main/java/bisq/core/payment/payload/PaymentMethod.java#L210-L300) · [AccountAgeWitnessService.java (pinned source)](https://github.com/bisq-network/bisq/blob/ea9d5dff90c99ac462f2b0a7bf9ef92683956619/core/src/main/java/bisq/core/account/witness/AccountAgeWitnessService.java#L475-L515) · [displayStrings.properties (pinned source)](https://github.com/bisq-network/bisq/blob/ea9d5dff90c99ac462f2b0a7bf9ef92683956619/core/src/main/resources/i18n/displayStrings.properties#L345-L368).

Client registration and trade period checked against the pinned release. Provider-specific historical numbers and instructions are qualified above; a live transfer or complete provider onboarding was not tested.

Adapted from **Tikkie**, revision 3903 (2025-01-31). [Exact source](../../wiki-source/tikkie.wiki.txt) · [Attribution and revision metadata](../../wiki-source/tikkie.json).

</details>
