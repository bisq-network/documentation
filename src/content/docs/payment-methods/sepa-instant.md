---
title: "SEPA Instant"
description: "Check both banks support the instant route and retain evidence if payment falls back."
---

*Checked 7 November 2026 · Bisq 1 v1.10.11.*

**Current client:** `SEPA_INSTANT` is registered in Bisq 1 v1.10.11 with a **1-day** trade period. The signing-based buying schedule applies in the client's relevant mature-market currencies. Provider access, fees and account allowances must be checked separately.

SEPA Instant is a separate EUR payment method from ordinary [SEPA](../sepa/). The current Bisq client uses a **one-day** trade period, not SEPA's six days.

## Confirm both banks support the route

Before taking an offer, verify the sending and receiving banks can process the intended instant transfer for your account and amount. Use the European Payments Council's participant information and your bank's current terms. A bank supporting ordinary SEPA is not sufficient proof of instant capability.

The source reports cases where a supposedly instant payment was handled as ordinary SEPA. Keep the sending timestamp, chosen transfer type and provider confirmation. If delayed, notify the peer and request mediation rather than paying twice.

## Do not assume an automatic waiver

The old guide promised no penalty if both banks supported instant and payment was initiated within 24 hours. That is not a current entitlement verified here. A mediator needs the circumstances and evidence; do not promise an outcome in advance.

Check the actual bank fee and amount limit. The source's €50,000/free-transfer examples are not universal terms. Signing and BTC buying restrictions may also apply; see [account limits](../account-limits/).

For shared setup and payment checks, use [payment accounts](../../bisq-1/payment-accounts/), [limits and signing](../account-limits/) and [fiat payment problems](../fiat-problems/).

<details>
<summary>Sources and checks</summary>

[PaymentMethod.java (pinned source)](https://github.com/bisq-network/bisq/blob/ea9d5dff90c99ac462f2b0a7bf9ef92683956619/core/src/main/java/bisq/core/payment/payload/PaymentMethod.java#L210-L300) · [AccountAgeWitnessService.java (pinned source)](https://github.com/bisq-network/bisq/blob/ea9d5dff90c99ac462f2b0a7bf9ef92683956619/core/src/main/java/bisq/core/account/witness/AccountAgeWitnessService.java#L475-L515) · [displayStrings.properties (pinned source)](https://github.com/bisq-network/bisq/blob/ea9d5dff90c99ac462f2b0a7bf9ef92683956619/core/src/main/resources/i18n/displayStrings.properties#L345-L368).

Client registration and trade period checked against the pinned release. Provider-specific historical numbers and instructions are qualified above; a live transfer or complete provider onboarding was not tested.

Adapted from **SEPA Instant**, revision 3925 (2025-02-16). [Exact source](../../wiki-source/sepa-instant.wiki.txt) · [Attribution and revision metadata](../../wiki-source/sepa-instant.json).

</details>
