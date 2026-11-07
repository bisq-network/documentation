---
title: "Domestic Wire Transfer"
description: "Prepare a US USD wire, including bank cutoffs, fees and payment evidence."
---

*Checked 7 November 2026 · Bisq 1 v1.10.11.*

**Current client:** `DOMESTIC_WIRE_TRANSFER` is registered in Bisq 1 v1.10.11 with a **3-day** trade period. This method is not in the client's chargeback-signing schedule; other protocol and personal limits still apply. Provider access, fees and account allowances must be checked separately.

Domestic Wire Transfer is the US **USD wire** method; it is distinct from ACH. Verify that the account supports outgoing third-party wires and that the recipient's details are for a domestic wire rather than an ACH-only route.

## Timing and cost

Check bank cut-off times, weekends, holidays and available funds before taking an offer. The three-day Bisq window does not guarantee the bank will process a wire in time. Banks can charge both sending and receiving fees; the old guide's $15–$40/$0–$15 ranges are examples, not a quote for your bank.

## Enter and verify the account

Use the bank's exact account-holder name, routing and account details in the appropriate Bisq form. Confirm the currency and any intermediary instructions before sending. Do not substitute a different payer or a wire account supplied outside the trade.

Keep the bank's wire confirmation and any trace/reference number privately for a dispute. A wire being initiated is not the same as it being credited. Sellers confirm actual receipt in their own bank account before releasing bitcoin.

For shared setup and payment checks, use [payment accounts](../../bisq-1/payment-accounts/), [limits and signing](../account-limits/) and [fiat payment problems](../fiat-problems/).

<details>
<summary>Sources and checks</summary>

[PaymentMethod.java (pinned source)](https://github.com/bisq-network/bisq/blob/ea9d5dff90c99ac462f2b0a7bf9ef92683956619/core/src/main/java/bisq/core/payment/payload/PaymentMethod.java#L210-L300) · [AccountAgeWitnessService.java (pinned source)](https://github.com/bisq-network/bisq/blob/ea9d5dff90c99ac462f2b0a7bf9ef92683956619/core/src/main/java/bisq/core/account/witness/AccountAgeWitnessService.java#L475-L515) · [displayStrings.properties (pinned source)](https://github.com/bisq-network/bisq/blob/ea9d5dff90c99ac462f2b0a7bf9ef92683956619/core/src/main/resources/i18n/displayStrings.properties#L345-L368).

Client registration and trade period checked against the pinned release. Provider-specific historical numbers and instructions are qualified above; a live transfer or complete provider onboarding was not tested.

Adapted from **Domestic Wire Transfer**, revision 3911 (2025-02-12). [Exact source](../../wiki-source/domestic-wire-transfer.wiki.txt) · [Attribution and revision metadata](../../wiki-source/domestic-wire-transfer.json).

</details>
