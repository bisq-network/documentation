---
title: "ACH Transfer"
description: "Use third-party US ACH safely; avoid micro-deposit account-linking scams."
---

*Checked 7 November 2026 · Bisq 1 v1.10.11.*

**Current client:** `ACH_TRANSFER` is registered in Bisq 1 v1.10.11 with a **5-day** trade period. This method is not in the client's chargeback-signing schedule; other protocol and personal limits still apply. Provider access, fees and account allowances must be checked separately.

ACH settles USD transfers between US financial institutions. Check that your bank can send a genuine **third-party** transfer; an external-account feature restricted to accounts you own is unsuitable.

## Avoid account-linking scams

Never tell a trader the amounts of micro-deposits received in your account. This can verify a linked account and enable debits. If small test payments arrive instead of the trade amount, stop and request mediation. Do not set up direct-deposit or account-linking access for a stranger.

## Prepare the transfer

Confirm routing and account numbers, account type, holder name and your bank's sending limits before taking an offer. Check standard versus expedited ACH fees and processing days. The Bisq trade window is not a bank delivery promise.

Send only to the account shown in the trade, mark payment started after sending, and keep the transfer receipt. Sellers must inspect their own account for the full amount and matching payer; micro-deposits, screenshots and pending notices are not payment.

For shared setup and payment checks, use [payment accounts](../../bisq-1/payment-accounts/), [limits and signing](../account-limits/) and [fiat payment problems](../fiat-problems/).

<details>
<summary>Sources and checks</summary>

[PaymentMethod.java (pinned source)](https://github.com/bisq-network/bisq/blob/ea9d5dff90c99ac462f2b0a7bf9ef92683956619/core/src/main/java/bisq/core/payment/payload/PaymentMethod.java#L210-L300) · [AccountAgeWitnessService.java (pinned source)](https://github.com/bisq-network/bisq/blob/ea9d5dff90c99ac462f2b0a7bf9ef92683956619/core/src/main/java/bisq/core/account/witness/AccountAgeWitnessService.java#L475-L515) · [displayStrings.properties (pinned source)](https://github.com/bisq-network/bisq/blob/ea9d5dff90c99ac462f2b0a7bf9ef92683956619/core/src/main/resources/i18n/displayStrings.properties#L345-L368).

Client registration and trade period checked against the pinned release. Provider-specific historical numbers and instructions are qualified above; a live transfer or complete provider onboarding was not tested.

Adapted from **ACH Transfer**, revision 4133 (2026-05-03). [Exact source](../../wiki-source/ach-transfer.wiki.txt) · [Attribution and revision metadata](../../wiki-source/ach-transfer.json).

</details>
