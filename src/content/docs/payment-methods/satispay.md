---
title: "Satispay"
description: "Prepare the available payment budget and verify the recipient and EUR receipt."
---

*Checked 7 November 2026 · Bisq 1 v1.10.11.*

**Current client:** `SATISPAY` is registered in Bisq 1 v1.10.11 with a **1-day** trade period. This method is not in the client's chargeback-signing schedule; other protocol and personal limits still apply. Provider access, fees and account allowances must be checked separately.

Satispay is a mobile payment method using a linked bank account and phone-based transfers. The original guide focused on Italy and EUR; do not use it as a complete current country or identity-eligibility list.

## Prepare the available budget

Check that the provider supports your residence, bank and intended payment, and that your current balance/budget can cover the full trade. A linked IBAN alone does not guarantee an immediate increase in spending capacity.

The source highlighted individually set account budgets and the need to contact Satispay for a higher allowance. Resolve that before accepting an offer. Do not assume old claims of instant and free personal transfers apply to every account or payment type.

## Settle the correct transfer

Confirm the recipient's phone/account identity and EUR amount. Use only the details recorded for the trade. Keep the receipt and check actual credit in your own provider account before releasing BTC. If the budget or bank funding is insufficient, request help instead of changing payer accounts.

For shared setup and payment checks, use [payment accounts](../../bisq-1/payment-accounts/), [limits and signing](../account-limits/) and [fiat payment problems](../fiat-problems/).

<details>
<summary>Sources and checks</summary>

[PaymentMethod.java (pinned source)](https://github.com/bisq-network/bisq/blob/ea9d5dff90c99ac462f2b0a7bf9ef92683956619/core/src/main/java/bisq/core/payment/payload/PaymentMethod.java#L210-L300) · [AccountAgeWitnessService.java (pinned source)](https://github.com/bisq-network/bisq/blob/ea9d5dff90c99ac462f2b0a7bf9ef92683956619/core/src/main/java/bisq/core/account/witness/AccountAgeWitnessService.java#L475-L515) · [displayStrings.properties (pinned source)](https://github.com/bisq-network/bisq/blob/ea9d5dff90c99ac462f2b0a7bf9ef92683956619/core/src/main/resources/i18n/displayStrings.properties#L345-L368).

Client registration and trade period checked against the pinned release. Provider-specific historical numbers and instructions are qualified above; a live transfer or complete provider onboarding was not tested.

Adapted from **Satispay**, revision 3922 (2025-02-12). [Exact source](../../wiki-source/satispay.wiki.txt) · [Attribution and revision metadata](../../wiki-source/satispay.json).

</details>
