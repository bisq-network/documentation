---
title: "Request reimbursement for a failed trade"
description: "Document actual lost fees, protect private evidence and use the correct reimbursement request."
---

First determine what actually happened on chain. A failed offer attempt can lose trading/mining fees without creating a funded trade deposit; a valid deposit stuck in escrow is a different recovery case. Do not infer the amount lost from a temporarily incorrect wallet balance.

## Establish the loss

Open the trade's details and record its **Maker**, **Taker** and **Deposit** transaction IDs. Check each transaction separately with your node or an explorer. Distinguish nonexistent/unpublished, mempool-pending and confirmed transactions. A txid absent from one explorer alone is not conclusive.

The recovered failure patterns include a maker's out-of-sync wallet advertising an invalid offer, a taker transaction that fails while the offer remains, and an invalid deposit after one participant's fee transaction was already paid. Tor failures, disk exhaustion and software bugs can also interrupt the flow. These patterns explain why one party can lose fees while the other does not; they are not a universal decision table that replaces chain inspection.

If there was no valid deposit, the trade amount and security deposits were not all paid into that nonexistent transaction. But do not apply the source's blanket “no other losses” statement to every trade labeled failed: verify whether a real deposit exists. If funds are locked, use [dispute help](../dispute-help/). If the display is wrong, preserve a backup and use [wallet diagnosis](../wallet-troubleshooting/).

## Gather the request

The current support-repository template asks for:

- A screenshot showing trade ID and available Maker/Taker/Deposit txids, with names, accounts and other private information covered.
- Those same transaction IDs **as text**, keeping the exact field labels `Maker:`, `Taker:` and `Deposit:`.
- BTC mining fees actually lost, and trading fees actually lost with their currency stated (**BTC or BSQ**).
- Bisq version, a BTC reimbursement address you control, and relevant explanatory notes.

> The source illustration “Miner fees.png” has not been recovered. The steps below do not depend on it.

Read miner fees from the actual transaction and trading fees from the trade details/chain evidence. Do not reuse a historical percentage table or claim the whole deposit as a fee. A public request links these transactions to the reimbursement address and GitHub identity; decide what to disclose and redact unrelated details before posting.

## Submit and follow the case

Use the [Bisq support repository's issue chooser](https://github.com/bisq-network/support/issues/new/choose) and its fee-reimbursement template. This guide does not submit a request for you. Keep replies on the case and provide requested evidence without wallet secrets.

The recovered policy limits fee-agent requests to three months. Its cited proposal measures that from the **latest** of trade completion, failure, mediation summary or arbitration summary—not necessarily the initial trade date as one old paragraph says. It describes older cases going directly to the DAO with an explanation and trader-prepared evidence. Confirm current applicability with the agent rather than assuming an automatic entitlement. The historical “4–8 weeks” batching interval and “$10” practical threshold are not current service guarantees or fixed eligibility rules.

## Fee-reimbursement agent workflow

The agent role checks evidence and actual fee losses, stages eligible cases and pays BTC in batches. The historical project-board sequence was ready → in progress → staged → paid/closed. Its support-repository helper `helpers/automate.sh` still exists at the reviewed commit, but it changes files, commits, pushes and comments publicly. It is an operator tool, not a command a trader should run to recover funds.

Fee reimbursement is separate from an arbitrator's direct trade refund and from a DAO reimbursement proposal. Matching evidence and avoiding duplicate claims matter in all three.

<details>
<summary>Sources and scope</summary>

- [Failed Trades - Reimbursement of Trade Fees and Miner Fees — source revision 2024-06-16](../../wiki-source/failed-trades-reimbursement-of-trade-fees-and-miner-fees.wiki.txt).
- [Fee Reimbursement Agent — source revision 2023-01-21](../../wiki-source/fee-reimbursement-agent.wiki.txt).
- [Current fee-request template](https://github.com/bisq-network/support/blob/0023af5a064a4091451e648dd702aa10b256799a/.github/ISSUE_TEMPLATE/reimbursement-template.md).
- [Reviewed operator helper](https://github.com/bisq-network/support/blob/0023af5a064a4091451e648dd702aa10b256799a/helpers/automate.sh).
- [Historical three-month policy proposal](https://github.com/bisq-network/proposals/issues/369).

Sources reviewed 7 November 2026. Current Bisq 1 code references are pinned to v1.10.11.

</details>
