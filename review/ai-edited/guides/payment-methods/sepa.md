---
title: "SEPA"
description: "Set up EUR bank details and understand the six-day period and signing requirements."
---

*Checked 7 November 2026 · Bisq 1 v1.10.11.*

**Current client:** `SEPA` is registered in Bisq 1 v1.10.11 with a **6-day** trade period. The signing-based buying schedule applies in the client's relevant mature-market currencies. Provider access, fees and account allowances must be checked separately.

SEPA is the EUR bank-transfer method. It is separate from [SEPA Instant](../sepa-instant/): the Bisq client assigns ordinary SEPA a longer **six-day** trade period.

## Set up the account

In **Account → National currency accounts → Add new account**, select SEPA. Enter the real account holder, IBAN, BIC and required country information exactly. Check the list of accepted counterparty countries and currencies in the form. Save the account and make a full application backup; a wallet seed does not preserve payment-account age or signing.

## Allow for bank processing

Confirm your bank can send and receive the particular EUR transfer. Account eligibility, cut-offs, holidays, fees and limits belong to the bank/provider; the old guide's universal free-transfer/€50,000 examples are not current guarantees.

Do not use an unrelated payer, fake name or initials. Pay only to the destination in the trade. Keep the transfer receipt and verify full receipt and matching payer before releasing bitcoin.

## Signing and account recovery

SEPA is among the risk-sensitive methods for which higher BTC buying limits can depend on signing and elapsed time. Waiting after creating an unsigned account does not sign it. See [account limits](../account-limits/) for the verified current calculation and preservation of the original account salt and signing identity.

For shared setup and payment checks, use [payment accounts](../../bisq-1/payment-accounts/), [limits and signing](../account-limits/) and [fiat payment problems](../fiat-problems/).

<details>
<summary>Sources and checks</summary>

[PaymentMethod.java (pinned source)](https://github.com/bisq-network/bisq/blob/ea9d5dff90c99ac462f2b0a7bf9ef92683956619/core/src/main/java/bisq/core/payment/payload/PaymentMethod.java#L210-L300) · [AccountAgeWitnessService.java (pinned source)](https://github.com/bisq-network/bisq/blob/ea9d5dff90c99ac462f2b0a7bf9ef92683956619/core/src/main/java/bisq/core/account/witness/AccountAgeWitnessService.java#L475-L515) · [displayStrings.properties (pinned source)](https://github.com/bisq-network/bisq/blob/ea9d5dff90c99ac462f2b0a7bf9ef92683956619/core/src/main/resources/i18n/displayStrings.properties#L345-L368).

Client registration and trade period checked against the pinned release. Provider-specific historical numbers and instructions are qualified above; a live transfer or complete provider onboarding was not tested.

Adapted from **SEPA**, revision 4072 (2025-09-04). [Exact source](../../wiki-source/sepa-p551.wiki.txt) · [Attribution and revision metadata](../../wiki-source/sepa-p551.json).

Adapted from **Sepa**, revision 3057 (2022-12-04). [Exact source](../../wiki-source/sepa-p550.wiki.txt) · [Attribution and revision metadata](../../wiki-source/sepa-p550.json).

Adapted from **Set up a SEPA payment account**, revision 2893 (2022-02-22). [Exact source](../../wiki-source/set-up-a-sepa-payment-account.wiki.txt) · [Attribution and revision metadata](../../wiki-source/set-up-a-sepa-payment-account.json).

</details>
