---
title: "Amazon eGift card"
description: "Match the Amazon storefront, recipient and currency, then preserve delivery proof."
---

*Checked 7 November 2026 · Bisq 1 v1.10.11.*

**Current client:** `AMAZON_GIFT_CARD` is registered in Bisq 1 v1.10.11 with a **1-day** trade period. This method is not in the client's chargeback-signing schedule; other protocol and personal limits still apply. Provider access, fees and account allowances must be checked separately.

Use an **electronically delivered Amazon eGift card bought for this trade**, not a paper voucher or an existing code purchased from someone else. A previously used code is hard to prove in a dispute, and illicit codes can put the recipient's Amazon balance at risk.

## Agree on the Amazon storefront

Gift-card balances are tied to the storefront where they were bought. Agree in trade chat on the exact Amazon site, particularly for EUR, where several national sites use the same currency. Do not assume a card for one site can be redeemed on another.

The receiving email or phone number controls notification delivery; it need not be the seller's Amazon login. Confirm the destination in the Bisq trade. Check Amazon's current region, denomination, purchase and redemption restrictions before committing.

## Buy, deliver and retain proof

Enter the exact amount and agreed recipient. Leave the message blank; do not mention bitcoin or Bisq. Do not split a payment into several cards without agreement and checking provider rules. The old wiki's suggested $100 chunks were not a verified current limit.

Keep Amazon's order and payment emails, then mark payment started in Bisq. If notification is missing, use the original order's resend function rather than buying a second card. The seller should verify the correct value can be redeemed on the agreed storefront before releasing bitcoin.

## Account setup illustration

Create an Amazon eGift Card payment account with the receiving email or phone and the intended currency. Check the actual supported-country list in the current client.

<figure><a href="../../media/wiki/fd78831e0e63f779e81e88b2f792d3c4cfce44d92358cbecd78e19fa3d16bc6b.png"><img src="../../media/wiki/fd78831e0e63f779e81e88b2f792d3c4cfce44d92358cbecd78e19fa3d16bc6b.png" alt="Amazon receiving-account form" loading="lazy" /></a><figcaption>Amazon receiving-account form. Historical illustration; current screens and values may differ.</figcaption></figure>

<figure><a href="../../media/wiki/fbd6ff92660396a436d835b364a58dfea7914b2256e0d994daa700634358c846.png"><img src="../../media/wiki/fbd6ff92660396a436d835b364a58dfea7914b2256e0d994daa700634358c846.png" alt="Amazon card amount and delivery fields" loading="lazy" /></a><figcaption>Amazon card amount and delivery fields. Historical illustration; current screens and values may differ.</figcaption></figure>

For shared setup and payment checks, use [payment accounts](../../bisq-1/payment-accounts/), [limits and signing](../account-limits/) and [fiat payment problems](../fiat-problems/).

<details>
<summary>Sources and checks</summary>

[PaymentMethod.java (pinned source)](https://github.com/bisq-network/bisq/blob/ea9d5dff90c99ac462f2b0a7bf9ef92683956619/core/src/main/java/bisq/core/payment/payload/PaymentMethod.java#L210-L300) · [AccountAgeWitnessService.java (pinned source)](https://github.com/bisq-network/bisq/blob/ea9d5dff90c99ac462f2b0a7bf9ef92683956619/core/src/main/java/bisq/core/account/witness/AccountAgeWitnessService.java#L475-L515) · [displayStrings.properties (pinned source)](https://github.com/bisq-network/bisq/blob/ea9d5dff90c99ac462f2b0a7bf9ef92683956619/core/src/main/resources/i18n/displayStrings.properties#L345-L368).

Client registration and trade period checked against the pinned release. Provider-specific historical numbers and instructions are qualified above; a live transfer or complete provider onboarding was not tested.

Adapted from **Amazon eGift card**, revision 3343 (2023-11-10). [Exact source](../../wiki-source/amazon-egift-card.wiki.txt) · [Attribution and revision metadata](../../wiki-source/amazon-egift-card.json).

</details>
