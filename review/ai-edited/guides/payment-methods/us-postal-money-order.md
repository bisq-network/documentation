---
title: "US Postal Money Order"
description: "Prepare postal evidence, inspect security features and check current USPS fees."
---

*Checked 7 November 2026 · Bisq 1 v1.10.11.*

**Current client:** `US_POSTAL_MONEY_ORDER` is registered in Bisq 1 v1.10.11 with a **8-day** trade period. This method is not in the client's chargeback-signing schedule; other protocol and personal limits still apply. Provider access, fees and account allowances must be checked separately.

US Postal Money Orders are physical USD instruments sent through the mail. They carry delivery, counterfeit, identity and evidence risks. Prepare the documents and shipping method before taking an offer; ordinary electronic-transfer assumptions do not apply.

## Agree on recipient and mailing details

Distinguish the Bisq account label from the actual payee and mailing information. A seller needs an address where the envelope can be received and a payee name suitable for cashing. A buyer needs a valid return address. Do not put fabricated information on a financial instrument; follow USPS and the cashing institution's current completion requirements rather than the old article's unsupported legal claims or advice to leave fields blank.

USPS's domestic money-order limit is $1,000 per instrument; confirm current purchase requirements and fees with USPS. Keep the purchase receipt. Multiple instruments create additional evidence requirements; agree the full amount and shipment before paying.

## Record the handover to the mail

The source strongly recommends a continuous video showing the completed instrument, purchase receipt, packing, sealed envelope and tracking label. Use delivery tracking and retain proof of mailing. Do not expose personal documents publicly. Evidence improves a dispute record but does not guarantee reimbursement.

## Inspect before releasing bitcoin

Check USPS's official security features and status tool, not only a historical image. New and legacy designs can coexist. Verify the payee, amount and authenticity, then follow your bank/Post Office's current cashing requirements. A delivered envelope alone does not prove a valid payment.

USPS's checked current domestic issuing fees are **$2.65** for $0.01–$500 and **$3.75** for $500.01–$1,000; the postal military money-order fee is **$0.85**. These replace the source's January 2026 table; recheck USPS before purchase. See [cash-by-mail risks](../cash-by-mail/) and [dispute help](../../bisq-1/dispute-help/) if evidence or delivery is disputed.

<figure><a href="../../media/wiki/8d17b34c242625740ec4cbd1a317d366940fd097105716fad6fb5e6c0b79d0ff.jpg"><img src="../../media/wiki/8d17b34c242625740ec4cbd1a317d366940fd097105716fad6fb5e6c0b79d0ff.jpg" alt="Newer postal money-order design, for comparison with USPS guidance" loading="lazy" /></a><figcaption>Newer postal money-order design, for comparison with USPS guidance. Historical illustration; current screens and values may differ.</figcaption></figure>

<figure><a href="../../media/wiki/d058835625e80b3770ce938e2c1c8a0e80b6d3aee35e9b84303f441083622678.jpg"><img src="../../media/wiki/d058835625e80b3770ce938e2c1c8a0e80b6d3aee35e9b84303f441083622678.jpg" alt="Legacy postal money-order design, for comparison with USPS guidance" loading="lazy" /></a><figcaption>Legacy postal money-order design, for comparison with USPS guidance. Historical illustration; current screens and values may differ.</figcaption></figure>

For shared setup and payment checks, use [payment accounts](../../bisq-1/payment-accounts/), [limits and signing](../account-limits/) and [fiat payment problems](../fiat-problems/).

<details>
<summary>Sources and checks</summary>

[PaymentMethod.java (pinned source)](https://github.com/bisq-network/bisq/blob/ea9d5dff90c99ac462f2b0a7bf9ef92683956619/core/src/main/java/bisq/core/payment/payload/PaymentMethod.java#L210-L300) · [AccountAgeWitnessService.java (pinned source)](https://github.com/bisq-network/bisq/blob/ea9d5dff90c99ac462f2b0a7bf9ef92683956619/core/src/main/java/bisq/core/account/witness/AccountAgeWitnessService.java#L475-L515) · [displayStrings.properties (pinned source)](https://github.com/bisq-network/bisq/blob/ea9d5dff90c99ac462f2b0a7bf9ef92683956619/core/src/main/resources/i18n/displayStrings.properties#L345-L368) · [USPS official money-order guidance](https://www.usps.com/shop/money-orders.htm) · [USPS official money-order guidance](https://about.usps.com/postal-bulletin/2026/pb22696/html/frd_003.htm).

Client registration and trade period checked against the pinned release. Provider-specific historical numbers and instructions are qualified above; a live transfer or complete provider onboarding was not tested.

Adapted from **US Postal Money Order**, revision 4149 (2026-05-29). [Exact source](../../wiki-source/us-postal-money-order.wiki.txt) · [Attribution and revision metadata](../../wiki-source/us-postal-money-order.json).

</details>
