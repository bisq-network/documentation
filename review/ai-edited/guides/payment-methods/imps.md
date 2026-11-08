---
title: "IMPS"
description: "Prepare an INR IMPS beneficiary and check bank limits before accepting an offer."
---

*Checked 7 November 2026 · Bisq 1 v1.10.11.*

**Current client:** `IMPS` is registered in Bisq 1 v1.10.11 with a **1-day** trade period. This method is not in the client's chargeback-signing schedule; other protocol and personal limits still apply. Provider access, fees and account allowances must be checked separately.

IMPS is India's Immediate Payment Service for INR inter-bank transfers. It is a separate Bisq method from NEFT, RTGS and UPI; select the actual route you will use.

## Prepare a compatible account

Check the beneficiary details, account and bank identifiers required by your bank. Verify that third-party transfers are enabled and that your account's per-transfer and daily limits cover the trade. Do this before accepting an offer, not after money is locked in escrow.

The old guide described ₹200,000 per transfer, ₹1,000,000 daily and ₹5–₹15 fees. Those are historical examples; bank and network policies can change. Check the fee and available limit shown by your bank when scheduling the transfer.

## Complete the payment

Send the exact INR amount to the recorded trade account, keep the receipt and mark payment started only after sending. A normally instant transfer can be held. The seller must check credited funds, amount and payer in their own account before confirming.

For shared setup and payment checks, use [payment accounts](../../bisq-1/payment-accounts/), [limits and signing](../account-limits/) and [fiat payment problems](../fiat-problems/).

<details>
<summary>Sources and checks</summary>

[PaymentMethod.java (pinned source)](https://github.com/bisq-network/bisq/blob/ea9d5dff90c99ac462f2b0a7bf9ef92683956619/core/src/main/java/bisq/core/payment/payload/PaymentMethod.java#L210-L300) · [AccountAgeWitnessService.java (pinned source)](https://github.com/bisq-network/bisq/blob/ea9d5dff90c99ac462f2b0a7bf9ef92683956619/core/src/main/java/bisq/core/account/witness/AccountAgeWitnessService.java#L475-L515) · [displayStrings.properties (pinned source)](https://github.com/bisq-network/bisq/blob/ea9d5dff90c99ac462f2b0a7bf9ef92683956619/core/src/main/resources/i18n/displayStrings.properties#L345-L368).

Client registration and trade period checked against the pinned release. Provider-specific historical numbers and instructions are qualified above; a live transfer or complete provider onboarding was not tested.

Adapted from **IMPS**, revision 3913 (2025-02-12). [Exact source](../../wiki-source/imps.wiki.txt) · [Attribution and revision metadata](../../wiki-source/imps.json).

</details>
