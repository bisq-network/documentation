---
title: "Bank holds, returns and fiat payment problems"
description: "Handle bank holds, reversals, missing payments and the limits of dispute support."
---

*Checked 7 November 2026 · Bisq 1 v1.10.11.*

A bank or payment provider can hold, refuse, reverse or investigate a transfer, freeze or close an account, or ask for information about the sender and recipient. This can happen even when both Bisq traders acted honestly.

## Stop the trade from getting worse

Keep the peer informed in trade chat. Do not send a duplicate payment, substitute a different payer, refund to a new destination or release BTC solely because someone says the bank will resolve it. [Request Bisq 1 dispute help](../../bisq-1/dispute-help/) or [Bisq Easy mediation](../../bisq-2/get-help/), as appropriate.

Contact your bank/provider through its official channel to determine whether the transfer was sent, held, returned or credited. Record dates, amount, currency, recipient, status and any case/trace number.

## Possible outcomes

- The transfer eventually arrives and the trade completes.
- Funds return to the sender and the traders arrange cancellation through the applicable protocol.
- One or both accounts remain frozen while the institution investigates.
- Funds remain in transit or are unrecoverable through either institution.
- A bank reverses an already received payment **after** bitcoin settlement.

## What Bisq can and cannot change

In Bisq 1, the escrow payout and security deposit may still be relevant while funds remain locked. Once the payout transaction is published, a later bank reversal cannot be undone by reallocating that already-spent deposit. Do not assume an arbitrary later chargeback will be refunded.

In Bisq Easy there is no escrow/security deposit. The seller must wait for actual payment receipt before sending BTC. If the buyer's transfer is held without reaching the seller, a mediator cannot make the bank release it or force the seller to send bitcoin without payment.

## Evidence for mediation

Keep original payment receipts, bank statements, written bank responses and any return/reversal record. A mediator may ask for a PDF statement or a recording of the account website to verify a disputed claim. Share only what is requested through the agreed private support channel; never share passwords, seed words or private keys. Preserve unredacted originals privately and discuss appropriate redaction with the mediator.

Provider fees, legal rights and recovery mechanisms vary. The trading protocol cannot override them. Verify the account's transfer rules before accepting a new offer.

<details>
<summary>Sources and checks</summary>

[displayStrings.properties (pinned source)](https://github.com/bisq-network/bisq/blob/ea9d5dff90c99ac462f2b0a7bf9ef92683956619/core/src/main/resources/i18n/displayStrings.properties#L345-L368) · [bisq_easy.properties (pinned source)](https://github.com/bisq-network/bisq2/blob/cfe8ab251f2b6579f29e9955036afc33ba36861e/i18n/src/main/resources/bisq_easy.properties#L428-L436).

Current protocol limitations cross-checked against both release rule sets. Individual bank/legal outcomes remain provider-specific.

Adapted from **Issues with fiat payments**, revision 4168 (2026-09-28). [Exact source](../../wiki-source/issues-with-fiat-payments.wiki.txt) · [Attribution and revision metadata](../../wiki-source/issues-with-fiat-payments.json).

</details>
