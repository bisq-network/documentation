---
title: "Monese"
description: "Distinguish internal Monese payments from bank transfers and verify currency access."
---

*Checked 7 November 2026 · Bisq 1 v1.10.11.*

**Current client:** `MONESE` is registered in Bisq 1 v1.10.11 with a **1-day** trade period. This method is not in the client's chargeback-signing schedule; other protocol and personal limits still apply. Provider access, fees and account allowances must be checked separately.

The Bisq Monese method represents a **Monese-to-Monese** transfer. The source describes GBP, EUR and RON balances, distinct from using an external bank-transfer route.

## Confirm eligibility and currency

The original guide listed European residents aged 18 or older and particular Romanian identity requirements for RON. It is not a current country-eligibility checklist. Verify what accounts and currencies Monese offers to your own residence and verification status before taking an offer.

Use the Monese account details required by Bisq and ensure that the currency you can receive matches the offer. Having a GBP account does not automatically make EUR or RON receipts available, and a conversion can introduce a shortfall.

## Limits and fees

Check the provider's current plan-specific fees, balance ceilings, transfer allowances and any incoming/outgoing restrictions. Do not rely on the old assertion that all peer transfers are instant and free. The one-day Bisq trade period is software metadata, not a delivery or provider-access guarantee.

Keep a receipt and verify actual credit and payer before releasing bitcoin.

For shared setup and payment checks, use [payment accounts](../../bisq-1/payment-accounts/), [limits and signing](../account-limits/) and [fiat payment problems](../fiat-problems/).

<details>
<summary>Sources and checks</summary>

[PaymentMethod.java (pinned source)](https://github.com/bisq-network/bisq/blob/ea9d5dff90c99ac462f2b0a7bf9ef92683956619/core/src/main/java/bisq/core/payment/payload/PaymentMethod.java#L210-L300) · [AccountAgeWitnessService.java (pinned source)](https://github.com/bisq-network/bisq/blob/ea9d5dff90c99ac462f2b0a7bf9ef92683956619/core/src/main/java/bisq/core/account/witness/AccountAgeWitnessService.java#L475-L515) · [displayStrings.properties (pinned source)](https://github.com/bisq-network/bisq/blob/ea9d5dff90c99ac462f2b0a7bf9ef92683956619/core/src/main/resources/i18n/displayStrings.properties#L345-L368).

Client registration and trade period checked against the pinned release. Provider-specific historical numbers and instructions are qualified above; a live transfer or complete provider onboarding was not tested.

Adapted from **Monese**, revision 3914 (2025-02-12). [Exact source](../../wiki-source/monese.wiki.txt) · [Attribution and revision metadata](../../wiki-source/monese.json).

</details>
