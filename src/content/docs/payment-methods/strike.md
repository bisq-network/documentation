---
title: "Strike"
description: "Check the provider transfer route without confusing it with Bitcoin Lightning settlement."
---

*Checked 7 November 2026 · Bisq 1 v1.10.11.*

**Current client:** `STRIKE` is registered in Bisq 1 v1.10.11 with a **1-day** trade period. This method is not in the client's chargeback-signing schedule; other protocol and personal limits still apply. Provider access, fees and account allowances must be checked separately.

The Bisq 1 STRIKE payment account represents the provider payment route defined by the offer. Do not confuse that with choosing Lightning as the bitcoin settlement network in Bisq Easy.

## Check your current provider account

The source described US USD peer transfers and older verification tiers. Those country restrictions and $100/$1,000 caps are not a current global Strike eligibility guide. Check the provider's country, currency, verification and send/receive rules for your own account.

Confirm the exact recipient identifier and that both parties can use the agreed transfer route. A service supporting Bitcoin or Lightning does not automatically make all fiat, app-to-app and on-chain routes equivalent.

## Cost and receipt

Check the fee and conversion quote in the current app instead of relying on old “USD-to-USD free” wording. Keep the actual payment record. The seller must verify the full credited amount and intended payer in their own account before releasing BTC, even when the provider uses Lightning internally.

For shared setup and payment checks, use [payment accounts](../../bisq-1/payment-accounts/), [limits and signing](../account-limits/) and [fiat payment problems](../fiat-problems/).

<details>
<summary>Sources and checks</summary>

[PaymentMethod.java (pinned source)](https://github.com/bisq-network/bisq/blob/ea9d5dff90c99ac462f2b0a7bf9ef92683956619/core/src/main/java/bisq/core/payment/payload/PaymentMethod.java#L210-L300) · [AccountAgeWitnessService.java (pinned source)](https://github.com/bisq-network/bisq/blob/ea9d5dff90c99ac462f2b0a7bf9ef92683956619/core/src/main/java/bisq/core/account/witness/AccountAgeWitnessService.java#L475-L515) · [displayStrings.properties (pinned source)](https://github.com/bisq-network/bisq/blob/ea9d5dff90c99ac462f2b0a7bf9ef92683956619/core/src/main/resources/i18n/displayStrings.properties#L345-L368).

Client registration and trade period checked against the pinned release. Provider-specific historical numbers and instructions are qualified above; a live transfer or complete provider onboarding was not tested.

Adapted from **Strike**, revision 3923 (2025-02-12). [Exact source](../../wiki-source/strike.wiki.txt) · [Attribution and revision metadata](../../wiki-source/strike.json).

</details>
