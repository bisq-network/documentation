---
title: "Bizum"
description: "Check the linked bank, phone recipient and account allowances before a EUR trade."
---

*Checked 7 November 2026 · Bisq 1 v1.10.11.*

**Current client:** `BIZUM` is registered in Bisq 1 v1.10.11 with a **1-day** trade period. This method is not in the client's chargeback-signing schedule; other protocol and personal limits still apply. Provider access, fees and account allowances must be checked separately.

Bizum identifies a recipient by a mobile number linked to a participating bank account. The source guide describes Spanish EUR accounts; a foreign phone number alone does not establish eligibility.

## Check the linked bank account

Confirm that your bank enables person-to-person Bizum payments and that the number in Bisq points to the correct account. Follow the bank's enrolment procedure. Do not replace the agreed destination with a different phone number during a trade.

## Check both amount and transaction-count limits

The snapshot listed €0.50–€1,000 per payment, €2,000 received daily, monthly transaction counts and expiry periods for requests. These are **old provider figures, not current allowances**. Your bank can impose tighter per-payment, daily, monthly or recipient limits; check all of them before accepting an offer. A request to pay is not proof that money was sent.

Confirm receipt in the linked bank account, including the sender and full EUR amount. Do not treat the intended instant delivery as guaranteed or assume all transfers are fee-free.

For shared setup and payment checks, use [payment accounts](../../bisq-1/payment-accounts/), [limits and signing](../account-limits/) and [fiat payment problems](../fiat-problems/).

<details>
<summary>Sources and checks</summary>

[PaymentMethod.java (pinned source)](https://github.com/bisq-network/bisq/blob/ea9d5dff90c99ac462f2b0a7bf9ef92683956619/core/src/main/java/bisq/core/payment/payload/PaymentMethod.java#L210-L300) · [AccountAgeWitnessService.java (pinned source)](https://github.com/bisq-network/bisq/blob/ea9d5dff90c99ac462f2b0a7bf9ef92683956619/core/src/main/java/bisq/core/account/witness/AccountAgeWitnessService.java#L475-L515) · [displayStrings.properties (pinned source)](https://github.com/bisq-network/bisq/blob/ea9d5dff90c99ac462f2b0a7bf9ef92683956619/core/src/main/resources/i18n/displayStrings.properties#L345-L368).

Client registration and trade period checked against the pinned release. Provider-specific historical numbers and instructions are qualified above; a live transfer or complete provider onboarding was not tested.

Adapted from **Bizum**, revision 3907 (2025-02-12). [Exact source](../../wiki-source/bizum.wiki.txt) · [Attribution and revision metadata](../../wiki-source/bizum.json).

</details>
