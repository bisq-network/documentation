---
title: "How Bisq 1 arbitration protects the trade protocol"
description: "Understand two-key escrow, delayed payouts, Burning Men and discretionary reimbursement."
---

Arbitration is the final path after a trade cannot be resolved cooperatively or through mediation. Start with [dispute help](../dispute-help/) for the user steps. The important consequence is that arbitration spends the original escrow to Burning Men recipients; any later direct refund is a separate transaction.

## Two keys, mediation and delayed payout

Since v1.2, the classic deposit is **2-of-2**, controlled by the two traders. A mediator holds no third signing key and only proposes a payout. If both traders accept, they sign the cooperative payout from that escrow.

<figure><a href="../../media/wiki/4371f5c907f59bf17f133e9503a393f51ab06d189d34c0a4cf599f3570658a9b.png"><img src="../../media/wiki/4371f5c907f59bf17f133e9503a393f51ab06d189d34c0a4cf599f3570658a9b.png" alt="Ntp-v12" loading="lazy" /></a><figcaption>Historical illustration from Arbitration; current controls may differ.</figcaption></figure>

During trade setup, the peers also prepare a time-locked delayed payout transaction. Its locktime gives them time to resolve the trade first. Historical/current trade rules describe the standard 10-day altcoin and 20-day fiat windows, but use the **actual trade's displayed eligibility date and block height**, not a calendar calculation copied from a guide.

If mediation fails and arbitration is opened when eligible, the delayed payout spends the trade amount and deposits to the protocol's designated recipients. Do not publish it as a general wallet-repair operation. [Export and manual tools](../manual-payout/) preserve the distinction between this and a trader payout.

## Why spend escrow before reimbursement?

Without that requirement, someone controlling both sides of a self-trade could request reimbursement for supposedly inaccessible escrow and then pay that same escrow to themselves. Requiring a verified deposit and its spending delayed payout prevents that simple double claim.

The current release additionally checks authenticated DAO proposal inputs, negotiated receiver-list versions and allowed recipient addresses. A readable old contract does not automatically authorize a new payout operation: unsupported legacy receiver versions fail closed. For direct refunds, current specifications reserve each funding receipt before publication and reject reuse of either the deposit or delayed-payout txid. A timeout or restored ticket is not permission to issue a second refund.

## Burning Men and refund agents have different jobs

Since the distributed Burning Men design introduced in v1.9.8, eligible contributors burn BSQ in advance to compete for shares of BTC fee/delayed-payout receipts, subject to protocol limits. A refund agent instead investigates a dispute and may advance BTC to a trader, then seek DAO reimbursement in BSQ.

Separating those roles limits the concentration of recipient control and allows dispute work to scale independently. It does not remove all trust, operational or fraud risks. DAO approval of reimbursement is a governance decision, not automatic settlement, and burning/issuance do not guarantee a fixed exchange rate or exact supply neutrality in every cycle.

**Direct refund-agent reimbursement is discretionary and not guaranteed.** Older prose promised payment or cited a fixed 0.5 BTC ceiling; those statements are not used as a current payout promise. The approved amount and process depend on the case and current rules. Traders can submit their own DAO reimbursement request where appropriate, but acceptance is not guaranteed either.

## Earlier protocol and design proposals

Before v1.2, an arbitrator held the third key in a 2-of-3 escrow. That made collusion with a trader more dangerous and constrained who could fill the role. The modern refund agent is not that third-key holder.

The recovered article also discusses possible future direct trader reimbursements, a market of refund services, and alternate uses for donation-address receipts. These are design possibilities, not implemented user options. Its numerical burn/refund example is illustrative and mixes assumed exchange rates with security-policy discussion; it is not a formula for calculating your entitlement. The exact original remains in Sources for governance review.

<details>
<summary>Sources and scope</summary>

- [Arbitration — source revision 2026-10-15](../../wiki-source/arbitration.wiki.txt).
- [Current arbitration rules](https://github.com/bisq-network/bisq/blob/ea9d5dff90c99ac462f2b0a7bf9ef92683956619/core/src/main/resources/i18n/displayStrings.properties#L358-L371).
- [Receiver-integrity specification](https://github.com/bisq-network/bisq/blob/ea9d5dff90c99ac462f2b0a7bf9ef92683956619/docs/specifications/trade/delayed-payout-receivers.md).
- [Direct-refund authorization](https://github.com/bisq-network/bisq/blob/ea9d5dff90c99ac462f2b0a7bf9ef92683956619/docs/specifications/dispute/refund-direct-payout.md).

Sources reviewed 7 November 2026. Current Bisq 1 code references are pinned to v1.10.11.

</details>
