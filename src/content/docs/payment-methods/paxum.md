---
title: "Paxum"
description: "Check internal transfer currency, provider fees and actual receipt."
---

*Checked 7 November 2026 · Bisq 1 v1.10.11.*

**Current client:** `PAXUM` is registered in Bisq 1 v1.10.11 with a **1-day** trade period. This method is not in the client's chargeback-signing schedule; other protocol and personal limits still apply. Provider access, fees and account allowances must be checked separately.

Paxum-to-Paxum is a distinct transfer method. The source also described virtual SEPA, ACH and Faster Payments account details, but those bank routes are not interchangeable with a Paxum internal payment.

## Confirm the currency and recipient

The snapshot listed many currencies, including USD, CAD, EUR and GBP. Select only currencies actually available to your current account and accepted by the peer. Check residence eligibility, verification, incoming transfers and withdrawal access before committing funds.

## Read the current fee schedule

The old guide claimed no limits and quoted about $0.25 for an internal transfer and $5 for deposits/withdrawals. Do not use those as current terms: check per-transfer, balance and daily limits, both sides' fees, currency conversion and withdrawal charges.

A fast internal transfer may still be held or reversed under provider policy. Verify the full credited amount and payer in your own account before confirming payment in Bisq.

<figure><a href="../../media/wiki/f3b4567c655e134f3019e3762b92c0739148e221c60f99ce440bbeac16ea5e52.png"><img src="../../media/wiki/f3b4567c655e134f3019e3762b92c0739148e221c60f99ce440bbeac16ea5e52.png" alt="Paxum currency illustration from the source" loading="lazy" /></a><figcaption>Paxum currency illustration from the source. Historical illustration; current screens and values may differ.</figcaption></figure>

For shared setup and payment checks, use [payment accounts](../../bisq-1/payment-accounts/), [limits and signing](../account-limits/) and [fiat payment problems](../fiat-problems/).

<details>
<summary>Sources and checks</summary>

[PaymentMethod.java (pinned source)](https://github.com/bisq-network/bisq/blob/ea9d5dff90c99ac462f2b0a7bf9ef92683956619/core/src/main/java/bisq/core/payment/payload/PaymentMethod.java#L210-L300) · [AccountAgeWitnessService.java (pinned source)](https://github.com/bisq-network/bisq/blob/ea9d5dff90c99ac462f2b0a7bf9ef92683956619/core/src/main/java/bisq/core/account/witness/AccountAgeWitnessService.java#L475-L515) · [displayStrings.properties (pinned source)](https://github.com/bisq-network/bisq/blob/ea9d5dff90c99ac462f2b0a7bf9ef92683956619/core/src/main/resources/i18n/displayStrings.properties#L345-L368).

Client registration and trade period checked against the pinned release. Provider-specific historical numbers and instructions are qualified above; a live transfer or complete provider onboarding was not tested.

Adapted from **Paxum**, revision 3918 (2025-02-12). [Exact source](../../wiki-source/paxum.wiki.txt) · [Attribution and revision metadata](../../wiki-source/paxum.json).

</details>
