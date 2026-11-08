---
title: "Revolut"
description: "Set up the correct username and use the agreed Revolut-to-Revolut route."
---

*Checked 7 November 2026 · Bisq 1 v1.10.11.*

**Current client:** `REVOLUT` is registered in Bisq 1 v1.10.11 with a **1-day** trade period. The signing-based buying schedule applies in the client's relevant mature-market currencies. Provider access, fees and account allowances must be checked separately.

The Bisq Revolut method is for **Revolut-to-Revolut** transfers. Do not assume that Revolut's IBAN or GBP bank details make a Revolut offer interchangeable with SEPA or Faster Payments.

## Set up your payment account

Find the recipient identifier/Revtag in Revolut, then enter the username and currencies required by Bisq's Revolut form. Check the exact spelling and format using the current provider app; old screenshot positions can differ. Save and back up the Bisq account. Recreating it with different details can affect its age/signing witness.

## Check before sending

Verify the peer found by the username is the intended recipient. If discovery fails, check the provider's privacy/payment-discovery settings and ask the peer in trade chat. Do not use a substitute bank transfer or pay a different profile simply because a search fails.

Check your account's country eligibility, currency conversion, send/receive allowances and fee plan. The software's one-day period is not a guarantee of instant delivery.

## Signing and receipt checks

Revolut is a signing-sensitive method. Old pages disagree on fixed unsigned and maximum BTC limits; use the [current account-limit calculation](../account-limits/) and the amount shown by your client.

Sellers inspect the credited amount and payer details in their own Revolut app before releasing BTC. If the identity differs, stop and request mediation. Do not confirm on the strength of a screenshot.

<figure><a href="../../media/wiki/ca99b9ff26a98ba0a00921d4f65b50f104e8b8a7f740fa4b07d9d959386756d2.png"><img src="../../media/wiki/ca99b9ff26a98ba0a00921d4f65b50f104e8b8a7f740fa4b07d9d959386756d2.png" alt="Revolut account form" loading="lazy" /></a><figcaption>Revolut account form. Historical illustration; current screens and values may differ.</figcaption></figure>

For shared setup and payment checks, use [payment accounts](../../bisq-1/payment-accounts/), [limits and signing](../account-limits/) and [fiat payment problems](../fiat-problems/).

<details>
<summary>Sources and checks</summary>

[PaymentMethod.java (pinned source)](https://github.com/bisq-network/bisq/blob/ea9d5dff90c99ac462f2b0a7bf9ef92683956619/core/src/main/java/bisq/core/payment/payload/PaymentMethod.java#L210-L300) · [AccountAgeWitnessService.java (pinned source)](https://github.com/bisq-network/bisq/blob/ea9d5dff90c99ac462f2b0a7bf9ef92683956619/core/src/main/java/bisq/core/account/witness/AccountAgeWitnessService.java#L475-L515) · [displayStrings.properties (pinned source)](https://github.com/bisq-network/bisq/blob/ea9d5dff90c99ac462f2b0a7bf9ef92683956619/core/src/main/resources/i18n/displayStrings.properties#L345-L368).

Client registration and trade period checked against the pinned release. Provider-specific historical numbers and instructions are qualified above; a live transfer or complete provider onboarding was not tested.

Adapted from **Revolut**, revision 4148 (2026-05-29). [Exact source](../../wiki-source/revolut.wiki.txt) · [Attribution and revision metadata](../../wiki-source/revolut.json).

Adapted from **Set up a Revolut payment account**, revision 2894 (2022-02-22). [Exact source](../../wiki-source/set-up-a-revolut-payment-account.wiki.txt) · [Attribution and revision metadata](../../wiki-source/set-up-a-revolut-payment-account.json).

</details>
