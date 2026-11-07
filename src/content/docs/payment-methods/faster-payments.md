---
title: "Faster Payments"
description: "Check UK GBP account details, sending limits and actual receipt."
---

*Checked 7 November 2026 · Bisq 1 v1.10.11.*

**Current client:** `FASTER_PAYMENTS` is registered in Bisq 1 v1.10.11 with a **1-day** trade period. This method is not in the client's chargeback-signing schedule; other protocol and personal limits still apply. Provider access, fees and account allowances must be checked separately.

Faster Payments is the UK GBP transfer method. Use the bank's sort code, account number and exact holder details in the trade. A provider offering a GBP balance does not necessarily support the same transfer route.

## Before starting

Confirm your bank supports a third-party Faster Payment, your sending allowance covers the amount, and the recipient details are correct. Bank fraud checks or outages can delay a normally quick payment. Check fees and limits in your own bank; the old £20,000/free-transfer examples are not universal current terms.

## During the trade

Send promptly once the trade permits it. Leave the reference blank where possible; if required, follow the current [Bisq 1 reference rule](../../bisq-1/first-trade/). Do not add a trade ID, Bisq or bitcoin. Do not change payer accounts to bypass a blocked payment.

Keep the bank receipt, and inspect actual incoming funds and sender details before releasing BTC. For a failed, delayed, reversed or held transfer, use [fiat payment help](../fiat-problems/) rather than resending blindly.

For shared setup and payment checks, use [payment accounts](../../bisq-1/payment-accounts/), [limits and signing](../account-limits/) and [fiat payment problems](../fiat-problems/).

<details>
<summary>Sources and checks</summary>

[PaymentMethod.java (pinned source)](https://github.com/bisq-network/bisq/blob/ea9d5dff90c99ac462f2b0a7bf9ef92683956619/core/src/main/java/bisq/core/payment/payload/PaymentMethod.java#L210-L300) · [AccountAgeWitnessService.java (pinned source)](https://github.com/bisq-network/bisq/blob/ea9d5dff90c99ac462f2b0a7bf9ef92683956619/core/src/main/java/bisq/core/account/witness/AccountAgeWitnessService.java#L475-L515) · [displayStrings.properties (pinned source)](https://github.com/bisq-network/bisq/blob/ea9d5dff90c99ac462f2b0a7bf9ef92683956619/core/src/main/resources/i18n/displayStrings.properties#L345-L368).

Client registration and trade period checked against the pinned release. Provider-specific historical numbers and instructions are qualified above; a live transfer or complete provider onboarding was not tested.

Adapted from **Faster Payments**, revision 3912 (2025-02-12). [Exact source](../../wiki-source/faster-payments.wiki.txt) · [Attribution and revision metadata](../../wiki-source/faster-payments.json).

</details>
