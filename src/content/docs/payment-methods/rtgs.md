---
title: "RTGS"
description: "Check whether the INR amount, bank minimum and Bisq allowance fit an RTGS trade."
---

*Checked 7 November 2026 · Bisq 1 v1.10.11.*

**Current client:** `RTGS` is registered in Bisq 1 v1.10.11 with a **1-day** trade period. This method is not in the client's chargeback-signing schedule; other protocol and personal limits still apply. Provider access, fees and account allowances must be checked separately.

RTGS is India's INR real-time gross settlement bank-transfer route. It is intended for larger amounts and is distinct from NEFT, IMPS and UPI.

## Check whether the amount fits

The source described a ₹200,000 minimum and a ₹1,000,000 daily ceiling, but included an unfinished “X days” transfer time. The current Bisq registration specifies **one day**. Confirm the bank/network's current minimum, maximum, processing availability and beneficiary activation delay before taking an offer; the software period cannot override bank restrictions.

The minimum permitted by the bank may exceed the trade amount available under Bisq's account limits. If so, choose another compatible method rather than overpaying or combining unrelated trades.

## Fees and evidence

Check your bank's present fee schedule instead of relying on the old ₹25–₹50 example. Send the exact INR amount, retain the receipt and inspect actual credited funds before confirming receipt in Bisq.

For shared setup and payment checks, use [payment accounts](../../bisq-1/payment-accounts/), [limits and signing](../account-limits/) and [fiat payment problems](../fiat-problems/).

<details>
<summary>Sources and checks</summary>

[PaymentMethod.java (pinned source)](https://github.com/bisq-network/bisq/blob/ea9d5dff90c99ac462f2b0a7bf9ef92683956619/core/src/main/java/bisq/core/payment/payload/PaymentMethod.java#L210-L300) · [AccountAgeWitnessService.java (pinned source)](https://github.com/bisq-network/bisq/blob/ea9d5dff90c99ac462f2b0a7bf9ef92683956619/core/src/main/java/bisq/core/account/witness/AccountAgeWitnessService.java#L475-L515) · [displayStrings.properties (pinned source)](https://github.com/bisq-network/bisq/blob/ea9d5dff90c99ac462f2b0a7bf9ef92683956619/core/src/main/resources/i18n/displayStrings.properties#L345-L368).

Client registration and trade period checked against the pinned release. Provider-specific historical numbers and instructions are qualified above; a live transfer or complete provider onboarding was not tested.

Adapted from **RTGS**, revision 3921 (2025-02-12). [Exact source](../../wiki-source/rtgs.wiki.txt) · [Attribution and revision metadata](../../wiki-source/rtgs.json).

</details>
