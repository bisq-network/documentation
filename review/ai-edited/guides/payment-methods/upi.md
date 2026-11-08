---
title: "UPI"
description: "Verify the underlying bank, recipient identifier and actual INR payment."
---

*Checked 7 November 2026 · Bisq 1 v1.10.11.*

**Current client:** `UPI` is registered in Bisq 1 v1.10.11 with a **1-day** trade period. This method is not in the client's chargeback-signing schedule; other protocol and personal limits still apply. Provider access, fees and account allowances must be checked separately.

UPI is an INR inter-bank payment route in India. The payment app is an interface; the underlying bank account, recipient identifier and route must match the Bisq trade.

## Prepare the transfer

Confirm that your bank and chosen app permit the intended person-to-person transfer. Check that the recipient identifier resolves to the expected account and name before authorizing payment. Do not change to a different payer or third-party account after taking an offer.

The source quoted ₹1–₹100,000 per transaction and low/free fees. These are historical examples, not a universal current UPI ceiling. Banks, transaction categories and account restrictions can differ. Check the actual available allowance and fee, and do not take an offer that would require unagreed splitting.

## Verify completion

Keep the provider/bank confirmation and mark payment started only after initiating payment. Sellers inspect their own account for the correct INR credit and payer before releasing BTC. A collect request, scheduled instruction or screenshot is not proof that the money arrived.

For shared setup and payment checks, use [payment accounts](../../bisq-1/payment-accounts/), [limits and signing](../account-limits/) and [fiat payment problems](../fiat-problems/).

<details>
<summary>Sources and checks</summary>

[PaymentMethod.java (pinned source)](https://github.com/bisq-network/bisq/blob/ea9d5dff90c99ac462f2b0a7bf9ef92683956619/core/src/main/java/bisq/core/payment/payload/PaymentMethod.java#L210-L300) · [AccountAgeWitnessService.java (pinned source)](https://github.com/bisq-network/bisq/blob/ea9d5dff90c99ac462f2b0a7bf9ef92683956619/core/src/main/java/bisq/core/account/witness/AccountAgeWitnessService.java#L475-L515) · [displayStrings.properties (pinned source)](https://github.com/bisq-network/bisq/blob/ea9d5dff90c99ac462f2b0a7bf9ef92683956619/core/src/main/resources/i18n/displayStrings.properties#L345-L368).

Client registration and trade period checked against the pinned release. Provider-specific historical numbers and instructions are qualified above; a live transfer or complete provider onboarding was not tested.

Adapted from **UPI**, revision 3614 (2024-06-16). [Exact source](../../wiki-source/upi.wiki.txt) · [Attribution and revision metadata](../../wiki-source/upi.json).

</details>
