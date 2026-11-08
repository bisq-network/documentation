---
title: "Get help with a Bisq 1 trade"
description: "Use trade chat, mediation and arbitration while preserving your funds and evidence."
---

*Bisq 1 v1.10.11 · Checked 7 November 2026.*

Open the affected trade in **Portfolio → Open trades**. Keep the trade ID, transaction IDs, payment status and relevant receipts ready. Do not start a second payment or replace your wallet/data directory to make a stalled trade disappear.

## Start with the trade chat

Use the chat on that trade to explain the problem: a payment delay, incorrect account details, an unconfirmed transaction or another specific issue. Check your own bank or wallet for the actual transaction status.

Keep discussion focused on the trade. Do not follow unsolicited links or move the trade outside Bisq. Never share seed words, private keys, passwords or a full application backup. The current chat rules explicitly prohibit sending sensitive credentials.

## Ask a mediator for help

Use **Open support ticket** when offered by the trade screen. If you need help before that control appears, select the trade and use **Alt+O** (**Option+O** on macOS) to open the support-ticket prompt.

Explain what happened, what you have already checked, and whether money actually left or reached your payment account. Provide relevant evidence through the dispute, keeping unrelated personal information private. Follow the conversation in **Support**. Current rules require cooperating with the mediator and responding within 48 hours.

<figure><a href="../../media/wiki/e9caae88518b826efe3c4a9a7487bd7e324d79ccab5066aabecb448d91d7265d.png"><img src="../../media/wiki/e9caae88518b826efe3c4a9a7487bd7e324d79ccab5066aabecb448d91d7265d.png" alt="Open trade screen with a mediation support control" loading="lazy" /></a><figcaption>Historical mediation screen; current controls may differ.</figcaption></figure>

A mediator proposes a payout; the proposal is not an automatic transfer. Read the amounts and explanation before accepting. Acceptance signs the proposed payout, and completion requires the other trader's acceptance too. If you disagree, explain why to the mediator. Do not confirm that you received a payment when you have not.



<details>
<summary>Earlier interface illustrations</summary>

These recovered screenshots show the controls discussed in this section. Prices, balances, limits, account identities and software versions in them are historical examples; follow the current instructions above.

<figure><a href="../../media/wiki/4b388855b0cbd743d056d4f27e4bd4f75e3b57b1d636557ef170201d951096d2.png"><img src="../../media/wiki/4b388855b0cbd743d056d4f27e4bd4f75e3b57b1d636557ef170201d951096d2.png" alt="Start-trader-chat" loading="lazy" /></a><figcaption>Historical Dispute Resolution in Bisq 1 illustration.</figcaption></figure>

<figure><a href="../../media/wiki/2caebcdeac6af275a59fadaec67e8a89bcb055e1df579d7a1098b6ecafff5693.png"><img src="../../media/wiki/2caebcdeac6af275a59fadaec67e8a89bcb055e1df579d7a1098b6ecafff5693.png" alt="Engage-arbitrator-v116" loading="lazy" /></a><figcaption>Historical Dispute Resolution in Bisq 1 illustration.</figcaption></figure>

</details>

## Escalate only when needed

If mediation cannot resolve the trade, the application shows when **Send to arbitration** becomes available. Use the trade's displayed eligibility date and block height rather than counting days from a tutorial.

**Opening arbitration publishes the delayed payout transaction and moves the locked funds to Bisq Burning Men recipients.** An arbitrator investigates the case and determines proposed refund amounts. Direct reimbursement by a refund agent is discretionary and **not guaranteed**; arbitration is not an instant or guaranteed release of your deposit.

The current rules allow a trader to submit a DAO reimbursement request if they disagree with the arbitration result or are not reimbursed directly. Obtain help with that process rather than assuming that opening a request guarantees payment.

Mediation and trader-chat messages are not automatically shared with the arbitrator. Supply the relevant history and evidence again when escalating.

## When the application itself is broken

Preserve a [backup](../backup-and-recovery/) before changing files. Use the [Bisq Matrix community](https://bisq.chat) for application-access problems, but keep private trade evidence in the appropriate dispute channel. A support request never requires revealing wallet secrets or accepting remote instructions to send funds elsewhere.

## Find the person and understand the policy

Use [Find your mediator](../finding-your-mediator/) for the singular contract address and public identity lookup, or [Find your arbitrator](../finding-your-arbitrator/) for `refundAgentNodeAddress`. Familiar public handles do not establish who is assigned to your trade.

[Trading rules and the historical penalty schedule](../trade-rules/) explain the conduct expected of each peer and the difference between a maximum guideline and an assured payout. [The arbitration protocol](../arbitration-protocol/) explains why the escrow is spent before a separate reimbursement. If the regular payout machinery is broken, [manual payout tools](../manual-payout/) retain the exact-input and local-signature workflow.

Trader chat is optional, unlike responding to a dispute agent. Respect a peer's choice not to chat, remain courteous and avoid clickable links: describe a transaction ID for the peer to inspect in their own explorer. Support response times in old role pages varied; they are not a guarantee of a live reply.


<details>
<summary>Sources and review notes</summary>

- [Current trade/dispute rules](https://github.com/bisq-network/bisq/blob/ea9d5dff90c99ac462f2b0a7bf9ef92683956619/core/src/main/resources/i18n/displayStrings.properties#L347-L371).
- [Support shortcut implementation](https://github.com/bisq-network/bisq/blob/ea9d5dff90c99ac462f2b0a7bf9ef92683956619/desktop/src/main/java/bisq/desktop/main/portfolio/pendingtrades/PendingTradesView.java#L266-L277).
- [Mediation acceptance flow](https://github.com/bisq-network/bisq/blob/ea9d5dff90c99ac462f2b0a7bf9ef92683956619/core/src/main/resources/i18n/displayStrings.properties#L1078-L1105) and [arbitration evidence guidance](https://github.com/bisq-network/bisq/blob/ea9d5dff90c99ac462f2b0a7bf9ef92683956619/core/src/main/resources/i18n/displayStrings.properties#L1384-L1386).
- [Historical dispute-resolution article](../../wiki-source/dispute-resolution-in-bisq-1.wiki.txt).

The newer explicit trade rules take precedence here over an older popup that implies an assured arbitration payout. Penalty calculations and reimbursement eligibility are intentionally left to the case-specific process.

</details>
