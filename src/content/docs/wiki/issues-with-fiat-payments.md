---
title: "Issues with fiat payments"
slug: "wiki/issues-with-fiat-payments"
tableOfContents: false
---

<nav data-pagefind-ignore class="wiki-source-toc" aria-label="Article sections"><details open><summary>On this page</summary><ul><li><a href="#issues-with-fiat-payments-and-accounts">Issues with fiat payments and accounts</a></li><li><a href="#possible-outcomes-of-bank-intervention">Possible outcomes of bank intervention</a></li><li><a href="#interaction-with-bisq-settlement">Interaction with Bisq settlement</a></li><li><a href="#evidence-requirements-in-disputes">Evidence requirements in disputes</a></li><li><a href="#limits-of-bisq-intervention">Limits of Bisq intervention</a></li><li><a href="#due-diligence">Due diligence</a></li></ul></details></nav>

<div class="wiki-recovered-article" lang="en">

<span class="wiki-legacy-anchor" id="Issues_with_fiat_payments_and_accounts" aria-hidden="true">
</span>

## Issues with fiat payments and accounts {#issues-with-fiat-payments-and-accounts}

Banks and fiat institutions (from now on, \"banks\") are third parties required to process payments, receive incoming payments into your account, and maintain your account active.

A bank may, at any time, adopt the following measures:

- close an account
- freeze an account
- refuse to allow a payment
- refuse to accept a payment
- hold an outgoing or incoming payment for an undisclosed amount of time
- reverse a payment back to the sender\'s account out of the receiver\'s account
- require detailed information about an outgoing payment and/or the receiver
- require detailed information about an incoming payment and/or the sender

The reason for any of the above events is often undisclosed, but all the above may interfere with fiat trades on Bisq.

<span class="wiki-legacy-anchor" id="Possible_outcomes_of_bank_intervention" aria-hidden="true">
</span>

### Possible outcomes of bank intervention {#possible-outcomes-of-bank-intervention}

The following general outcomes may consequently take place, usually after a dispute is opened:

1. fiat settlement takes place, even if after an increased delay, and the trade completes normally
2. fiat payment is returned to the sender, usually after a delay, and the trade is canceled
3. the transaction is held for an extended period of time, during which both traders must wait for a settlement on either side
4. one or both bank accounts are closed, and likewise traders must wait for a settlement
5. the payment is held midway and neither bank may be able to recover the fiat, leaving both traders out of that amount
6. the receiving bank reverses the incoming fiat payment (possibly together with those of other traders) after the trade was settled

<span class="wiki-legacy-anchor" id="Interaction_with_Bisq_settlement" aria-hidden="true">
</span>

### Interaction with Bisq settlement {#interaction-with-bisq-settlement}

The dispute resolution of the multisig protocol of Bisq1 can adjust the bitcoin payout from the security deposit based on the outcome of the bank\'s intervention, but once the trade payout transaction has been published, the bitcoin settlement is final and any bank intervention happening after this point cannot be compensated from the security deposit. For example, if a trade settles with the bitcoin being released to the buyer, and at a later time the bitcoin seller\'s bank reverses incoming payments, the seller would be left without both the bitcoin and the fiat.

In Bisq Easy there is no security deposit, so the seller will send the bitcoin amount only after the incoming payment is received in his account. In this case, it could also happen that the buyer\'s payment is held indefinitely without reaching the seller. The seller will not send the bitcoin, and the buyer will not receive the fiat payment back until the banking system settles the original payment.

<span class="wiki-legacy-anchor" id="Evidence_requirements_in_disputes" aria-hidden="true">
</span>

### Evidence requirements in disputes {#evidence-requirements-in-disputes}

It is worth noting that, once a mediator is involved, traders are required to provide quality evidence for their claims, usually in the form of PDF bank statements, emails from the bank, or video recordings of the bank account website, proving for example that a fiat transaction was reversed.

<span class="wiki-legacy-anchor" id="Limits_of_Bisq_intervention" aria-hidden="true">
</span>

### Limits of Bisq intervention {#limits-of-bisq-intervention}

Bisq cannot refund either trader when bank intervention takes place after bitcoin settlement, nor especially can Bisq take action to release the bitcoin to a buyer whose fiat is indefinitely held or otherwise unreturned by banks, if the seller didn\'t receive the expected payment.

<span class="wiki-legacy-anchor" id="Due_diligence" aria-hidden="true">
</span>

### Due diligence {#due-diligence}

It is appropriate to verify with one\'s bank whether the aforementioned issues can occur, and what local laws apply.

</div>
