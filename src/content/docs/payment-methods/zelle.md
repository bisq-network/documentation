---
title: "Zelle"
description: "Check the enrolled US account, bank sending limits and matching payer."
---

*Checked 7 November 2026 · Bisq 1 v1.10.11.*

**Current client:** `CLEAR_X_CHANGE` is registered in Bisq 1 v1.10.11 with a **4-day** trade period. The signing-based buying schedule applies in the client's relevant mature-market currencies. Provider access, fees and account allowances must be checked separately.

Zelle in Bisq is a US **USD** method, historically labelled ClearXchange. Confirm that your bank or credit union supports the intended transfer; possession of a phone number or email alone is not enough.

## Enrol the right account

Enter the real bank-account holder and enrolled email or US mobile number in the Bisq form. Verify the recipient the bank resolves before paying. The snapshot reports that the standalone Zelle app stopped transfers in 2025; use the provider's current participating-bank guidance rather than relying on old standalone-app instructions.

## Check the bank's sending limits

Daily, weekly and monthly allowances can differ by bank and account. Ensure that the full offer amount fits before taking the trade. Fees, fraud checks and delayed transfers are bank-specific; quick normal processing is not a guarantee.

Zelle is a signing-sensitive method for higher BTC buying limits. Check the [current limit shown in Bisq](../account-limits/), rather than the snapshot's fixed 0.01 BTC/universal maximum claims.

## If the bank blocks payment

Do not use a friend's account or switch payer to bypass the block. Contact the peer and request mediation using the [current dispute-help instructions](../../bisq-1/dispute-help/); the old Ctrl+O/Cmd+O shortcut is superseded there. Sellers must verify actual credit and matching payer before releasing BTC.

For shared setup and payment checks, use [payment accounts](../../bisq-1/payment-accounts/), [limits and signing](../account-limits/) and [fiat payment problems](../fiat-problems/).

<details>
<summary>Sources and checks</summary>

[PaymentMethod.java (pinned source)](https://github.com/bisq-network/bisq/blob/ea9d5dff90c99ac462f2b0a7bf9ef92683956619/core/src/main/java/bisq/core/payment/payload/PaymentMethod.java#L210-L300) · [AccountAgeWitnessService.java (pinned source)](https://github.com/bisq-network/bisq/blob/ea9d5dff90c99ac462f2b0a7bf9ef92683956619/core/src/main/java/bisq/core/account/witness/AccountAgeWitnessService.java#L475-L515) · [displayStrings.properties (pinned source)](https://github.com/bisq-network/bisq/blob/ea9d5dff90c99ac462f2b0a7bf9ef92683956619/core/src/main/resources/i18n/displayStrings.properties#L345-L368).

Client registration and trade period checked against the pinned release. Provider-specific historical numbers and instructions are qualified above; a live transfer or complete provider onboarding was not tested.

Adapted from **Zelle**, revision 3952 (2025-04-05). [Exact source](../../wiki-source/zelle.wiki.txt) · [Attribution and revision metadata](../../wiki-source/zelle.json).

</details>
