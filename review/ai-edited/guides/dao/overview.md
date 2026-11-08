---
title: Understand the Bisq DAO
description: How BSQ, proposals and voting support Bisq's funding and governance.
---

*Bisq 1 v1.10.11 · Checked 7 November 2026.*

The Bisq DAO coordinates project funding and governance using Bitcoin and the **BSQ** token. Contributors propose work and funding; stakeholders vote on proposals. Participation does not guarantee compensation.

## Why a DAO

The Bisq DAO coordinates funding and decisions through software and stakeholders rather than a single project owner. It uses Bitcoin transactions and Bisq's peer-to-peer network for different parts of the governance data. The network's design is decentralized, but participants still make judgments and software can fail; code is maintained by people. Participation in the DAO is separate from simply using Bisq to trade.

<a href="../../media/wiki/b1906f5e8c57f45db45f25f538f261e6762283f6d7e9ab581bd34b35d2c0af89.png"><img src="../../media/wiki/b1906f5e8c57f45db45f25f538f261e6762283f6d7e9ab581bd34b35d2c0af89.png" alt="Historical overview of the Bisq DAO" loading="lazy" /></a>

*Historical source diagram; roles and interfaces may have changed.*

## The early plan

[Phase Zero](https://docs.bisq.network/dao/phase-zero.html) describes an early bootstrapping plan before the on-chain DAO. It is useful history, not a current operating procedure. The genesis distribution recognized prior contributors; later issuance and voting use the DAO rules described in the [technical reference](../technical/).

## How BSQ funds the project

BSQ is bitcoin tracked under additional rules understood by Bisq. Contributors can request BSQ for eligible completed work. An accepted compensation request can lead to new BSQ issuance. When traders pay eligible fees in BSQ, those BSQ are burned, reducing the circulating supply.

That is a funding mechanism, not a fixed exchange rate or a promise of income. [Bisq Easy](../../bisq-2/bisq-easy-safety/) has its own fee model; do not apply Bisq 1's fee instructions to it.

## What participants vote on

The DAO interface includes compensation and reimbursement requests, parameter changes and other proposals. Voting weight includes both **stake** committed to the vote and **merit** from earned BSQ. It is not one vote per person.

Use the current DAO interface in Bisq 1 to check the cycle, deadlines, fees and proposal requirements. Vote only on proposals you have enough information to assess. This overview deliberately leaves changing parameter values to the app.

Some trusted roles also use BSQ bonds. Confiscation proposals concern serious misconduct and can put that bond at risk; they should not be treated as an ordinary support or dispute shortcut.

## Get started

- **Want to contribute?** Read [how to coordinate a contribution](../../contribute/getting-started/) before assuming work is funded. Current development participation restrictions apply.
- **Want to inspect or participate in the DAO?** [Install Bisq 1](../../bisq-1/install-and-verify/), allow synchronization to complete, and explore its DAO section before committing funds or publishing a proposal.
- **Already holding BSQ?** Keep the [wallet and application backups](../../bisq-1/backup-and-recovery/). Use Bisq's BSQ-aware wallet; an ordinary Bitcoin wallet does not preserve BSQ's transaction rules.

Read [proposals and voting](../governance/), [BSQ and swaps](../bsq/), and the [technical reference](../technical/) for more detail. The [DAO user reference](https://docs.bisq.network/dao-user-reference.html) also explains the process in more depth. Some examples are historical, so check dates and values against the current application.

<details>
<summary>Sources and review</summary>

Checked **7 November 2026** against the [official DAO explanation](https://bisq.network/dao/), [DAO user reference](https://docs.bisq.network/dao-user-reference.html), and [Bisq 1 v1.10.11 DAO interface text](https://github.com/bisq-network/bisq/blob/ea9d5dff90c99ac462f2b0a7bf9ef92683956619/core/src/main/resources/i18n/displayStrings.properties#L2603-L2656). Issuance and burn descriptions are also present in the [current supply labels](https://github.com/bisq-network/bisq/blob/ea9d5dff90c99ac462f2b0a7bf9ef92683956619/core/src/main/resources/i18n/displayStrings.properties#L2874-L2924). Consolidates the historical [DAO introduction](../../wiki-source/introduction-to-the-dao.wiki.txt). Contributor review is pending; no vote or funded action was tested.

</details>
