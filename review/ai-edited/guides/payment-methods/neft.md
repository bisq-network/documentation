---
title: "NEFT"
description: "Understand INR NEFT beneficiary readiness, timing and bank-specific limits."
---

*Checked 7 November 2026 · Bisq 1 v1.10.11.*

**Current client:** `NEFT` is registered in Bisq 1 v1.10.11 with a **1-day** trade period. This method is not in the client's chargeback-signing schedule; other protocol and personal limits still apply. Provider access, fees and account allowances must be checked separately.

NEFT is India's National Electronic Funds Transfer bank-transfer route for INR. Choose NEFT only if both the bank account and intended transfer support it; do not silently replace it with IMPS, RTGS or UPI.

## Prepare the beneficiary

Use the bank's required account-holder, account-number and bank-identification details. Check beneficiary activation delays and the available sending allowance before taking an offer.

The source contained an unfinished “X days” duration and an unverified ₹50,000 per-transfer ceiling. The **current Bisq client sets a one-day trade period**; it does not establish a universal banking ceiling. Confirm present bank processing and fees directly rather than relying on those old placeholders or assuming every NEFT transfer is free.

## When payment is delayed

Retain the transaction record and notify the peer in trade chat. Do not mark receipt until the full INR amount is actually credited. A held transfer is a bank issue as well as a trade issue; involve mediation before sending a replacement or switching accounts.

For shared setup and payment checks, use [payment accounts](../../bisq-1/payment-accounts/), [limits and signing](../account-limits/) and [fiat payment problems](../fiat-problems/).

<details>
<summary>Sources and checks</summary>

[PaymentMethod.java (pinned source)](https://github.com/bisq-network/bisq/blob/ea9d5dff90c99ac462f2b0a7bf9ef92683956619/core/src/main/java/bisq/core/payment/payload/PaymentMethod.java#L210-L300) · [AccountAgeWitnessService.java (pinned source)](https://github.com/bisq-network/bisq/blob/ea9d5dff90c99ac462f2b0a7bf9ef92683956619/core/src/main/java/bisq/core/account/witness/AccountAgeWitnessService.java#L475-L515) · [displayStrings.properties (pinned source)](https://github.com/bisq-network/bisq/blob/ea9d5dff90c99ac462f2b0a7bf9ef92683956619/core/src/main/resources/i18n/displayStrings.properties#L345-L368).

Client registration and trade period checked against the pinned release. Provider-specific historical numbers and instructions are qualified above; a live transfer or complete provider onboarding was not tested.

Adapted from **NEFT**, revision 3916 (2025-02-12). [Exact source](../../wiki-source/neft.wiki.txt) · [Attribution and revision metadata](../../wiki-source/neft.json).

</details>
