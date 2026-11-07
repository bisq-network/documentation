---
title: "CelPay"
description: "Recognize the closed Celsius service and preserve evidence for old CelPay records."
---

*Checked 7 November 2026 · Bisq 1 v1.10.11.*

**Current client:** `CELPAY` is registered in Bisq 1 v1.10.11 with a **1-day** trade period. This method is not in the client's chargeback-signing schedule; other protocol and personal limits still apply. Provider access, fees and account allowances must be checked separately.

**CelPay is a legacy reference, not an onboarding recommendation.** Bisq 1 still contains the CelPay payment-method entry, but the Celsius distribution administrator states that Celsius's mobile and web apps shut down on **29 February 2024** as part of its wind-down.

## What the old method did

CelPay was a custodial transfer feature inside Celsius, using contacts or payment links to move balances between users. The guide described USD, CAD, GBP, HKD and AUD stablecoin balances, rather than ordinary bank transfers. It also advertised interest and a $2,500 daily transfer limit; those are obsolete service claims, not advice to deposit funds.

## Existing records and disputes

Keep original payment links, receipts, dates, currencies and account evidence for an old trade. Do not make a new deposit or replacement payment based on the presence of the CelPay entry in Bisq. Use the official distribution process for Celsius claims and Bisq dispute help for a Bisq trade; neither process automatically settles the other.

The retained one-day client trade period describes software metadata only. It does not make the closed service operational.

For shared setup and payment checks, use [payment accounts](../../bisq-1/payment-accounts/), [limits and signing](../account-limits/) and [fiat payment problems](../fiat-problems/).

<details>
<summary>Sources and checks</summary>

[PaymentMethod.java (pinned source)](https://github.com/bisq-network/bisq/blob/ea9d5dff90c99ac462f2b0a7bf9ef92683956619/core/src/main/java/bisq/core/payment/payload/PaymentMethod.java#L210-L300) · [AccountAgeWitnessService.java (pinned source)](https://github.com/bisq-network/bisq/blob/ea9d5dff90c99ac462f2b0a7bf9ef92683956619/core/src/main/java/bisq/core/account/witness/AccountAgeWitnessService.java#L475-L515) · [displayStrings.properties (pinned source)](https://github.com/bisq-network/bisq/blob/ea9d5dff90c99ac462f2b0a7bf9ef92683956619/core/src/main/resources/i18n/displayStrings.properties#L345-L368) · [Celsius official wind-down notice](https://celsiusdistribution.stretto.com/support/solutions/articles/153000147019-celsius-network-dissolution-and-distribution).

Client registration and trade period checked against the pinned release. Provider-specific historical numbers and instructions are qualified above; a live transfer or complete provider onboarding was not tested.

Adapted from **CelPay**, revision 3910 (2025-02-12). [Exact source](../../wiki-source/celpay.wiki.txt) · [Attribution and revision metadata](../../wiki-source/celpay.json).

</details>
