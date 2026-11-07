---
title: "Capitual"
description: "Understand legacy CapCode transfers and verify current redemption and provider access."
---

*Checked 7 November 2026 · Bisq 1 v1.10.11.*

**Current client:** `CAPITUAL` is registered in Bisq 1 v1.10.11 with a **1-day** trade period. This method is not in the client's chargeback-signing schedule; other protocol and personal limits still apply. Provider access, fees and account allowances must be checked separately.

The current Bisq 1 client retains a Capitual entry. This does **not** establish that a new personal account, a particular country, or the old CapCode service is currently usable. Confirm provider access and a working transfer route before creating an offer; do not fund an account solely because it appears in Bisq.

## How the source described CapCodes

The original method used a redeemable code containing a locked value. Creating a code deducted the amount from the sender's available balance; redemption required a Capitual account. The account could show whether it had been redeemed, and an unused code could be redeemed by its creator.

Treat a live code like money: share it only in the intended trade and retain issuance/redemption records. Verify the correct currency and amount before releasing BTC.

## Currency and access distinctions

The source described BRL and EUR bank deposits/withdrawals using TED and SEPA, while GBP and USD balances were obtained by conversion. It also listed crypto/stablecoin balances. These were different transfer routes, not interchangeable promises that every currency had bank details.

The old 48-country claim, US exclusion, $9,999 unverified-account cap and September 2021 fee table are not verified current terms. Ask the provider about present eligibility, redemption, withdrawal, conversion and crypto-withdrawal fees. A balance that cannot be redeemed or withdrawn is not equivalent to usable bank money.

For shared setup and payment checks, use [payment accounts](../../bisq-1/payment-accounts/), [limits and signing](../account-limits/) and [fiat payment problems](../fiat-problems/).

<details>
<summary>Sources and checks</summary>

[PaymentMethod.java (pinned source)](https://github.com/bisq-network/bisq/blob/ea9d5dff90c99ac462f2b0a7bf9ef92683956619/core/src/main/java/bisq/core/payment/payload/PaymentMethod.java#L210-L300) · [AccountAgeWitnessService.java (pinned source)](https://github.com/bisq-network/bisq/blob/ea9d5dff90c99ac462f2b0a7bf9ef92683956619/core/src/main/java/bisq/core/account/witness/AccountAgeWitnessService.java#L475-L515) · [displayStrings.properties (pinned source)](https://github.com/bisq-network/bisq/blob/ea9d5dff90c99ac462f2b0a7bf9ef92683956619/core/src/main/resources/i18n/displayStrings.properties#L345-L368).

Client registration and trade period checked against the pinned release. Provider-specific historical numbers and instructions are qualified above; a live transfer or complete provider onboarding was not tested.

Adapted from **Capitual**, revision 3909 (2025-02-12). [Exact source](../../wiki-source/capitual.wiki.txt) · [Attribution and revision metadata](../../wiki-source/capitual.json).

</details>
