---
title: "Nequi"
description: "Check COP account tiers, transfer allowances and credited funds."
---

*Checked 7 November 2026 · Bisq 1 v1.10.11.*

**Current client:** `NEQUI` is registered in Bisq 1 v1.10.11 with a **1-day** trade period. This method is not in the client's chargeback-signing schedule; other protocol and personal limits still apply. Provider access, fees and account allowances must be checked separately.

The Nequi method is for COP transfers through the Colombian service. Check your own registration and verification status, the recipient identifier and available balance before trading.

## Check account tier and taxes

The snapshot tied higher limits to a Bancolombia verification step and quoted 7,000,000 COP, a roughly 15,000 COP fee and a 0.4% tax. These are not verified current allowances or personal tax advice. Check Nequi's current account-tier restrictions, transaction allowances and applicable charges for your own account.

Do not take an offer larger than the amount you can send or receive. A small account/balance cap can prevent an otherwise valid trade, and paying in instalments can exceed the trade window or complicate proof.

## Confirm the real transfer

Use the exact COP amount and details in Bisq. Keep the provider receipt privately. The seller must verify actual funds and sender, rather than relying on a push notification or image sent by the buyer. Ask for help if the amount, account or payer differs.

For shared setup and payment checks, use [payment accounts](../../bisq-1/payment-accounts/), [limits and signing](../account-limits/) and [fiat payment problems](../fiat-problems/).

<details>
<summary>Sources and checks</summary>

[PaymentMethod.java (pinned source)](https://github.com/bisq-network/bisq/blob/ea9d5dff90c99ac462f2b0a7bf9ef92683956619/core/src/main/java/bisq/core/payment/payload/PaymentMethod.java#L210-L300) · [AccountAgeWitnessService.java (pinned source)](https://github.com/bisq-network/bisq/blob/ea9d5dff90c99ac462f2b0a7bf9ef92683956619/core/src/main/java/bisq/core/account/witness/AccountAgeWitnessService.java#L475-L515) · [displayStrings.properties (pinned source)](https://github.com/bisq-network/bisq/blob/ea9d5dff90c99ac462f2b0a7bf9ef92683956619/core/src/main/resources/i18n/displayStrings.properties#L345-L368).

Client registration and trade period checked against the pinned release. Provider-specific historical numbers and instructions are qualified above; a live transfer or complete provider onboarding was not tested.

Adapted from **Nequi**, revision 3917 (2025-02-12). [Exact source](../../wiki-source/nequi.wiki.txt) · [Attribution and revision metadata](../../wiki-source/nequi.json).

</details>
