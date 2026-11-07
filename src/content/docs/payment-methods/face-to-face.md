---
title: "Face-to-face (payment method)"
description: "Arrange an in-person cash trade with safe meeting terms and both Bisq clients ready."
---

*Checked 7 November 2026 · Bisq 1 v1.10.11.*

**Current client:** `F2F` is registered in Bisq 1 v1.10.11 with a **4-day** trade period. This method is not in the client's chargeback-signing schedule; other protocol and personal limits still apply. Provider access, fees and account allowances must be checked separately.

A face-to-face trade follows the Bisq 1 escrow workflow, with cash exchanged in person instead of a bank transfer. It exposes both traders to physical risk and payment-proof disputes; anonymity and successful recovery are not guaranteed.

## Set terms before taking an offer

The account specifies country, currency, city and additional information. Use one currency per account and consider separate buying/selling accounts. The city is public with the offer; the additional-information field can be inspected before taking it. Put meeting conditions there, **not off-platform advertising or direct contact details**.

Read the maker's terms before accepting. Arrange a neutral public meeting place and bring only what is needed. Consider a trusted companion and a venue where cash can be checked. Protect contact information that could expose your home or other identities.

## Complete both sides on the spot

Both traders need a working Bisq client and connectivity at the meeting. The BTC buyer marks payment sent only after handing over payment; the seller validates the cash and marks it received to release BTC. Do not leave after paying without completing the agreed protocol and checking the result.

Learn the currency's genuine security features. Counterfeit pens are not conclusive. Meeting at a bank may help validate cash, but confirm the bank will provide the service.

## Disputes are difficult

A mediator cannot observe a cash handover retrospectively. Agree on lawful, privacy-conscious evidence and keep trade chat. Arbitration or a DAO request is not an assured reimbursement route. Avoid a trade whose loss you cannot tolerate.

For shared setup and payment checks, use [payment accounts](../../bisq-1/payment-accounts/), [limits and signing](../account-limits/) and [fiat payment problems](../fiat-problems/).

<details>
<summary>Sources and checks</summary>

[PaymentMethod.java (pinned source)](https://github.com/bisq-network/bisq/blob/ea9d5dff90c99ac462f2b0a7bf9ef92683956619/core/src/main/java/bisq/core/payment/payload/PaymentMethod.java#L210-L300) · [AccountAgeWitnessService.java (pinned source)](https://github.com/bisq-network/bisq/blob/ea9d5dff90c99ac462f2b0a7bf9ef92683956619/core/src/main/java/bisq/core/account/witness/AccountAgeWitnessService.java#L475-L515) · [displayStrings.properties (pinned source)](https://github.com/bisq-network/bisq/blob/ea9d5dff90c99ac462f2b0a7bf9ef92683956619/core/src/main/resources/i18n/displayStrings.properties#L345-L368).

Client registration and trade period checked against the pinned release. Provider-specific historical numbers and instructions are qualified above; a live transfer or complete provider onboarding was not tested.

Adapted from **Face-to-face (payment method)**, revision 3691 (2024-08-25). [Exact source](../../wiki-source/face-to-face-payment-method.wiki.txt) · [Attribution and revision metadata](../../wiki-source/face-to-face-payment-method.json).

</details>
