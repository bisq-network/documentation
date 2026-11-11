---
title: "Deposit transaction pending in mempool and CPFP"
slug: "wiki/deposit-transaction-pending-in-mempool-and-cpfp"
tableOfContents: false
---

<nav data-pagefind-ignore class="wiki-source-toc" aria-label="Article sections"><details open><summary>On this page</summary><ul><li><a href="#basic-fee-considerations">Basic fee considerations</a></li><li><a href="#what-happens-when-fee-is-too-low">What happens when fee is too low</a></li><li><a href="#what-can-be-done-to-speed-things-up">What can be done to speed things up</a></li><li><a href="#inapplicable-cases">Inapplicable cases</a></li><li><a href="#final-considerations">Final considerations</a></li><li><a href="#external-acceleration-services">External acceleration services</a></li><li><a href="#fee-bumping-a-dpt">Fee-bumping a DPT</a></li></ul></details></nav>

<div class="wiki-recovered-article" lang="en">

The following article is directed at users who have at least intermediate knowledge of Bitcoin, and the suggested technique is not officially supported, meaning that if you lose funds because of mistakes, you are the only accountable party.

<span class="wiki-legacy-anchor" id="Basic_fee_considerations" aria-hidden="true">
</span>

## Basic fee considerations {#basic-fee-considerations}

A trade on Bisq can only start after the deposit transaction has been mined into a block (one confirmation is enough), so the application will choose the optimal miner fee based on how mempool is busy at the moment the taker accepts the maker\'s offer. There are two different edge cases which Bisq is not able to account for, and that will delay the first confirmation, if not prevent it entirely from happening:

- sudden spikes of transactions in mempool (think about a bull run, or central exchanges flooding the blockchain with consolidation txs, or a new hype like inscriptions)
- traders funding Bisq wallet at a fee which is too low to be confirmed in current mempool, and then using the unconfirmed utxo to fund the deposit tx (this will cause a Child Pays For Parent -more on this below- on the original funding tx and possible unconfirmed precursors, that will decrease the effective fee rate of the actual deposit transaction)

Commonly, it is a combination of the two that happens: mempool becomes progressively busier, and at the same time one of the traders (or even worse, both) send funds from an external wallet to be used for the deposit transaction, selecting an inadequate fee that will bring down the effective fee rate.

<span class="wiki-legacy-anchor" id="What_happens_when_fee_is_too_low" aria-hidden="true">
</span>

## What happens when fee is too low {#what-happens-when-fee-is-too-low}

Bitcoin transactions can either be confirmed, or not, so the deposit transaction will be pending in mempool until one of two outcomes occurs:

- it is finally included in a block (trade will start normally, even with a large delay)
- it will be purged out of mempool by all nodes on the network (no solid expiration time on this, but if it happens both traders will need to do an [SPV resync](../resyncing-spv-file/) to let Bisq acknowledge the deposit tx never took place)

<span class="wiki-legacy-anchor" id="What_can_be_done_to_speed_things_up" aria-hidden="true">
</span>

## What can be done to speed things up {#what-can-be-done-to-speed-things-up}

A common strategy to accelerate a Bitcoin transaction is called Child Pays For Parent (CPFP), and consists of spending one of the outputs (child) of an unconfirmed transaction (parent) at a high fee, so those miners who want to collect said high fee, will necessarily have to confirm both child and parent transactions in the same block (and that\'s why child pays for parent).

Calculate the child fee from the total virtual size of the child and its unconfirmed ancestors, and their existing absolute fees: required child fee = target package fee rate × total package virtual size − existing ancestor fees. A fixed multiplier of the parent\'s fee is not reliable, and a higher fee does not guarantee confirmation; the transaction must also meet node and miner policy.

CPFP can only be done by the owner of the unconfirmed UTXO that will act as a child, so when a deposit tx is stuck in mempool after Bisq wallet was funded at a low fee, these are the possible cases:

- trader sent funds to Bisq wallet at low fee, but has a change output of this funding that went back to his external wallet: trader has to send this change output to another address of the same external wallet, using a very high fee
- trader sent a whole UTXO to Bisq wallet, and used part of it to fund a deposit tx: he will have to do CPFP within Bisq, by going to *Funds > Receive Funds*, copy the first unused receive address, then go to *Funds > Send Funds* and, after selecting the unconfirmed UTXO(s), send the full amount to the Bisq address taken from the clipboard, enabling *Use custom value* at the bottom to manually choose a very high fee

The trader who needs to do this is the one who used a low fee in the external wallet while funding Bisq.

When the CPFP transaction is published, you will notice that the effective fee rate of the deposit tx was increased, and if you chose a high enough fee for the child transaction, it should be confirmed in the next few blocks.

<span class="wiki-legacy-anchor" id="Inapplicable_cases" aria-hidden="true">
</span>

## Inapplicable cases {#inapplicable-cases}

The above strategy is only possible when there is a change output owned by one of the traders, that can be used to bump the parent\'s fee.

When the trade was funded from internal Bisq funds, and the reserved balance had already confirmed, but the deposit didn\'t, because of a sudden and very high spike in mempool traffic, this strategy will not be possible, because there is no change output that can be spent in order to raise the effective fee rate.

<span class="wiki-legacy-anchor" id="Final_considerations" aria-hidden="true">
</span>

## Final considerations {#final-considerations}

If you find yourself in one of the scenarios where you can apply the aforementioned strategy, remember you are responsible for your own funds, and expected to know what you are doing. It is unlikely to actually lose funds unless you send the UTXO to a wrong address, but you could waste the mining fees if you didn\'t choose a high enough fee for the CPFP, as then you would need to either RBF the CPFP (not covered in this article), or do an additional CPFP at a much higher cost.

<span class="wiki-legacy-anchor" id="External_acceleration_services" aria-hidden="true">
</span>

## External acceleration services {#external-acceleration-services}

[mempool.space](https://mempool.space) has now the option to accelerate transactions that are in mempool: open the transaction detail page, and right next to the ETA field you will find an *Accelerate* button that will give you access to a paid service which will increase the fee of the transaction by paying miners off-band.

<span class="wiki-legacy-anchor" id="Fee-bumping_a_DPT" aria-hidden="true">
</span>

## Fee-bumping a DPT {#fee-bumping-a-dpt}

Same considerations apply to delayed payout transactions needed to start [arbitration](../arbitration/), but only a Burning Men recipient willing and able to spend a suitable, still-unspent output can [CPFP a DPT](../delayed-payout-transaction-pending-in-mempool-and-cpfp/).

</div>
