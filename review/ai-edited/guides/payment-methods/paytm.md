---
title: "PayTM"
description: "Distinguish restricted Paytm Payments Bank wallets from other Paytm payment rails."
---

*Checked 7 November 2026 · Bisq 1 v1.10.11.*

**Current client:** `PAYTM` is registered in Bisq 1 v1.10.11 with a **1-day** trade period. This method is not in the client's chargeback-signing schedule; other protocol and personal limits still apply. Provider access, fees and account allowances must be checked separately.

**Do not use the old PayTM wallet instructions as current setup guidance.** Bisq still registers PAYTM, but the Reserve Bank of India states that Paytm Payments Bank could not accept further credits or top-ups into its accounts/wallets after 15 March 2024. This is distinct from using the Paytm app as a UPI interface to a different bank.

## What the source described

The original method moved INR between PayTM wallet users. It listed different KYC/non-KYC balance and transaction caps and described free personal transfers. Those figures do not establish that a wallet can receive a new Bisq payment today.

## Choose a working payment rail

Check the provider and underlying bank, not only the app branding. A working UPI account is not automatically compatible with an offer explicitly requiring PAYTM wallet settlement. Do not take that offer unless the agreed route can actually send and receive the amount.

If an existing payment is affected by a provider restriction, preserve the receipt and balance evidence and contact the bank/provider and Bisq mediation. Do not send a second payment or substitute a friend's account to work around the restriction.

For shared setup and payment checks, use [payment accounts](../../bisq-1/payment-accounts/), [limits and signing](../account-limits/) and [fiat payment problems](../fiat-problems/).

<details>
<summary>Sources and checks</summary>

[PaymentMethod.java (pinned source)](https://github.com/bisq-network/bisq/blob/ea9d5dff90c99ac462f2b0a7bf9ef92683956619/core/src/main/java/bisq/core/payment/payload/PaymentMethod.java#L210-L300) · [AccountAgeWitnessService.java (pinned source)](https://github.com/bisq-network/bisq/blob/ea9d5dff90c99ac462f2b0a7bf9ef92683956619/core/src/main/java/bisq/core/account/witness/AccountAgeWitnessService.java#L475-L515) · [displayStrings.properties (pinned source)](https://github.com/bisq-network/bisq/blob/ea9d5dff90c99ac462f2b0a7bf9ef92683956619/core/src/main/resources/i18n/displayStrings.properties#L345-L368) · [Reserve Bank of India notice](https://rbi.org.in/scripts/BS_PressReleaseDisplay.aspx?prid=57376).

Client registration and trade period checked against the pinned release. Provider-specific historical numbers and instructions are qualified above; a live transfer or complete provider onboarding was not tested.

Adapted from **PayTM**, revision 3623 (2024-06-16). [Exact source](../../wiki-source/paytm.wiki.txt) · [Attribution and revision metadata](../../wiki-source/paytm.json).

</details>
