---
title: "Skrill: unsupported draft reference"
description: "Recognize an unfinished wiki draft that does not establish current Bisq support."
---

*Checked 7 November 2026 · Bisq 1 v1.10.11.*

Skrill is **not registered as a payment method in the checked Bisq 1 v1.10.11 release**. The recovered wiki page was an unfinished template: its supposed service name was “XXXXXXX,” its version was “vX.X.X,” and country, currency and timing sections were blank.

## What to do instead

Do not treat that draft as proof of support or invent the missing account fields. Choose a method actually offered by your client and understood by both peers. Do not take an offer under another method and privately substitute Skrill.

The draft's generic account creation, payment reference, buyer/seller and mediation instructions duplicated the [payment-account](../../bisq-1/payment-accounts/) and [first-trade](../../bisq-1/first-trade/) guides. Those verified guides replace the template; no distinct Skrill transfer requirement could be recovered.

<details>
<summary>Sources and checks</summary>

[PaymentMethod.java (pinned source)](https://github.com/bisq-network/bisq/blob/ea9d5dff90c99ac462f2b0a7bf9ef92683956619/core/src/main/java/bisq/core/payment/payload/PaymentMethod.java#L210-L300).

Complete current method registry inspected; absence is an app-registration fact, not a claim that the unrelated provider ceased operating.

Adapted from **Skrill**, revision 2498 (2021-11-21). [Exact source](../../wiki-source/skrill.wiki.txt) · [Attribution and revision metadata](../../wiki-source/skrill.json).

</details>
