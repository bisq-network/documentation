---
title: "SWIFT"
description: "Understand transfer currency, intermediary banks, conversion and BEN/OUR/SHA fees."
---

*Checked 7 November 2026 · Bisq 1 v1.10.11.*

**Current client:** `SWIFT` is registered in Bisq 1 v1.10.11 with a **7-day** trade period. This method is not in the client's chargeback-signing schedule; other protocol and personal limits still apply. Provider access, fees and account allowances must be checked separately.

SWIFT is an international bank-transfer network, not a single bank or guaranteed irreversible payment. Check recipient, intermediary-bank, currency and fee instructions before taking a trade. Bisq's SWIFT accounts can expose offers across currencies; accept only currencies your receiving account can handle.

## Fill all required details

Provide complete and accurate bank/account information, including BIC/SWIFT and IBAN or other account identifiers as required. Ask the bank which address fields are required; do not substitute the bank's address for a personal address unless the form and bank permit it.

## Send the offer's currency

The trade currency controls what must be delivered. A USD offer requires USD, even if your bank funds it from another currency. Intermediary conversion and fees can create a shortfall. Agree the supported route before sending, retain bank instructions and budget conversion charges.

The old guide quoted a fixed 5% wrong-currency penalty. That figure is not verified as a current entitlement; dispute decisions depend on current rules and evidence.

## Understand fee options

**BEN** charges fees to the recipient, **OUR** to the sender, and **SHA** splits sending-bank and receiving-bank charges between the parties. The source's Bisq-specific convention was SHA; check the instructions displayed for the actual trade and clarify with mediation before sending if they conflict. Do not assume the full amount arrives under any option.

Leave the payment reference blank where possible and follow the current [reference rule](../../bisq-1/first-trade/). The old “DO NOT CONVERT” comment is not a universal override of bank processing; seek bank guidance and discuss required wording before paying. Keep receipts and trace information for a delayed or short payment.

For shared setup and payment checks, use [payment accounts](../../bisq-1/payment-accounts/), [limits and signing](../account-limits/) and [fiat payment problems](../fiat-problems/).

<details>
<summary>Sources and checks</summary>

[PaymentMethod.java (pinned source)](https://github.com/bisq-network/bisq/blob/ea9d5dff90c99ac462f2b0a7bf9ef92683956619/core/src/main/java/bisq/core/payment/payload/PaymentMethod.java#L210-L300) · [AccountAgeWitnessService.java (pinned source)](https://github.com/bisq-network/bisq/blob/ea9d5dff90c99ac462f2b0a7bf9ef92683956619/core/src/main/java/bisq/core/account/witness/AccountAgeWitnessService.java#L475-L515) · [displayStrings.properties (pinned source)](https://github.com/bisq-network/bisq/blob/ea9d5dff90c99ac462f2b0a7bf9ef92683956619/core/src/main/resources/i18n/displayStrings.properties#L345-L368).

Client registration and trade period checked against the pinned release. Provider-specific historical numbers and instructions are qualified above; a live transfer or complete provider onboarding was not tested.

Adapted from **SWIFT**, revision 2387 (2021-09-08). [Exact source](../../wiki-source/swift.wiki.txt) · [Attribution and revision metadata](../../wiki-source/swift.json).

</details>
