---
title: BSQ and BSQ swaps
description: Understand the DAO token, its wallet, and the Bisq 1 swap protocol.
---

*Bisq 1 · Source checked 7 November 2026 · Maintainer review pending.*

## BSQ

BSQ is bitcoin tracked under additional rules by Bisq's DAO software. One BSQ is represented by 100 satoshis. Bisq recognizes the transaction history that gives those satoshis their BSQ meaning; an ordinary Bitcoin wallet does not. The same transaction can be inspected in a [Bitcoin explorer](https://mempool.space/tx/0243f99c848de4f53cb29157d10bf1cdbfcf4219f84e9997dd3cac9244ab7242) and a [BSQ-aware explorer](https://mempool.space/bisq/tx/0243f99c848de4f53cb29157d10bf1cdbfcf4219f84e9997dd3cac9244ab7242).

The genesis distribution recognized earlier contributions. Later compensation and reimbursement issuance follows accepted DAO requests; BSQ can be burned through eligible fees and other DAO functions. BSQ is not a fixed-value claim on bitcoin or a guarantee of compensation. The [DAO overview](../overview/) explains the funding cycle.

## BSQ wallet

Use Bisq's BSQ-aware wallet to hold and send BSQ. Sending it to an ordinary Bitcoin wallet or constructing transactions by hand can make the BSQ value unrecognizable or destroy it. The software distinguishes BTC and BSQ balances and displays a `B` prefix on BSQ addresses. Protect the shared recovery seed **and** the application data; see [backup and recovery](../../bisq-1/backup-and-recovery/). A seed alone does not reconstruct every trade or account record.

## BSQ swaps

A Bisq 1 BSQ swap exchanges BSQ and BTC in one Bitcoin transaction. The offer maker needs the asset offered in the corresponding wallet, and the offer can deactivate when the balance falls below its required amount. Manage offers in `Portfolio` > `My Open Offers`; taken swaps appear in the BSQ swap trade view. Both peers need to be online for the swap. Mining and trading fees still apply, and an atomic transaction is not a promise of profit or immunity from software or network problems.

<a href="../../media/wiki/aefa4d4628aa6a64f584c10f48d27bc8a82a2ad2c017859ea728581e42af8009.png"><img src="../../media/wiki/aefa4d4628aa6a64f584c10f48d27bc8a82a2ad2c017859ea728581e42af8009.png" alt="Historical Bisq 1 screen for creating a BSQ swap offer" loading="lazy" /></a>

*Historical partial capture; the current interface may differ.*

The protocol combines the peers' inputs and outputs in one transaction. The recovered example had Alice buying 1 BTC with 50,000 BSQ and Bob selling BTC. It assumed a 0.5 BSQ maker fee, a 1.5 BSQ taker fee, and mining-fee shares of 2,000 and 2,500 satoshis respectively. In that example Alice contributed at least 50,000.5 BSQ and received BTC less her mining-fee share plus the BTC value of her BSQ fee; Bob contributed BTC including his mining-fee share less the BTC value of his BSQ fee and received 49,998.5 BSQ. Either side could receive change. This illustrates how fees and inputs relate in that historical example, not a current fee quote or hand-construction recipe. Unlike a conventional maker-fee transaction, swap offers use proof of work as a spam deterrent. If the difficulty changes, the offer may need to be republished with fresh proof.

## Sources and review

Checked against the [DAO user reference](https://docs.bisq.network/dao-user-reference.html), [DAO technical overview](https://docs.bisq.network/dao-technical-overview.html), and [Bisq 1 v1.10.11 BSQ swap code](https://github.com/bisq-network/bisq/tree/ea9d5dff90c99ac462f2b0a7bf9ef92683956619/core/src/main/java/bisq/core/trade/protocol/bsq_swap). The historical [BSQ](../../wiki-source/bsq.wiki.txt) and [swap](../../wiki-source/bsq-swaps.wiki.txt) sources supply the example and screenshot. Confirm current UI and fees in the application. No trade or recovery was performed.
