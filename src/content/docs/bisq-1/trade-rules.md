---
title: "Trading rules and penalty guidance"
description: "Follow buyer and seller obligations and interpret the dated penalty schedule without assuming a payout."
---

Read the offer terms before committing. In a Bisq 1 trade you are either the **BTC buyer**, who sends the external payment, or the **BTC seller**, who receives it and releases bitcoin. The role does not change merely because you made rather than took the offer.

## Rules for both traders

Use real, matching payment-account details. Check the provider's current limits and ability to make/receive the payment before accepting. Once the deposit is published, neither peer can unilaterally change the agreed account, method, amount or terms. Discuss exceptional bank problems in trade chat or mediation; your peer need not accept a substitute arrangement.

Trader chat is helpful but optional. Keep it courteous and limited to the trade; do not pressure a peer who does not chat. **Responding to mediation/arbitration is different:** cooperate and reply within 48 hours. Do not send links, solicit off-platform trading, disclose credentials, or use payment details to contact a peer without consent or a necessary payment-related reason. A transaction ID can be described without sending a clickable link.

## BTC buyer: pay correctly, then report it

Wait for the required deposit confirmation and the payment prompt. Use the exact method and sender account agreed in the contract. Send early enough for the seller to receive and verify payment within the trade period. Cover sending/intermediary payment charges so the agreed amount reaches the seller; a receiving institution's own incoming charge is the historical exception borne by the seller.

Leave the payment reference **blank**. Never put the trade ID, Bitcoin, BTC or Bisq there. If the provider requires a value, current Bisq 1 text permits your account name or a non-descriptive dash; discuss any different wording first. The pre-v1.5.5 instruction to use a trade ID is obsolete.

Only after actually initiating payment, click **Payment started**. Do not send again merely because the notification is delayed. Do not cancel a reversible payment without agreement from the seller or mediator.

## BTC seller: verify actual receipt

Check your own bank/provider account for receipt and matching sender, amount and account details. A screenshot or the buyer's notification is not proof. If details differ, open mediation before confirming; confirmation may also sign an eligible buyer's payment account. Once you confirm, the payout releases BTC and cannot simply be reversed through Bisq.

Account signing and a security deposit reduce some risks but do not make fiat irreversible. If a later chargeback occurs after BTC release, Bisq cannot undo the bank transfer or retrieve already-spent BTC automatically. Preserve evidence and contact support promptly.

## Historical penalty schedule

The following consolidates the recovered **Table of penalties** revision. It is a **guideline snapshot, not a current entitlement calculator or automatic fine**. The current app's rules support the behavioral obligations above; these exact percentages have not been independently ratified as current policy. A mediator evaluates the evidence, available deposit and actual case.

The source expresses percentages of the trade amount, principally taken from the offender's deposit; serious 100% cases may involve the trade amount too. It says penalties are not cumulative, generally uses the highest applicable violation, and generally leaves a penalized peer an incentive to accept mediation (described there as 5% of trade amount). These conditions must not be dropped when reading the table.

| Applies to | Historical maximum | Conduct |
| --- | ---: | --- |
| Either trader | 100% | Fraud attempt, including unauthorized debiting or malicious code manipulation. |
| Either trader | 50% | Soliciting off-platform contact in offer details. |
| Either trader | 25% | Not responding to a mediator within 48 hours. |
| Either trader | 25% | Contacting a peer outside Bisq without consent or a necessary payment reason. |
| Either trader | 20% | Cancelling an accepted trade without a valid reason. |
| Either trader | 20% | Insisting on another payment account/name without mediator approval. |
| Either trader | 10% | Demanding personal data beyond the payment method's actual requirements. |
| Either trader | 10% | Abusive conduct toward peer or dispute agent. |
| BTC buyer | 100% | Chargeback after completion. |
| BTC buyer | 25% | Bitcoin-related words in the payment reference. |
| BTC buyer | 25% | Paying from a materially different/third-party name. |
| BTC buyer | 20% | Payment more than 72 hours late. |
| BTC buyer | 15% | Payment 48–72 hours late. |
| BTC buyer | 15% | Correct name but wrong agreed account details. |
| BTC buyer | 10% | Payment 24–48 hours late. |
| BTC buyer | 10% | A similar but unagreed method causing problems. |
| BTC buyer | 10% | Wrong payment amount not corrected promptly. |
| BTC buyer | 10% | Unagreed reference, including a trade ID. |
| BTC buyer | 10% | Altcoin delay caused by an excessively low fee; acceleration efforts may mitigate it. |
| BTC buyer | 5% | Payment up to 24 hours late. |
| BTC seller | 25% | Incorrect account data causes bank intervention. |
| BTC seller | 15% | Unjustified late BTC release after receipt. |

The source allows the seller to cancel without penalty for certain sender/account mismatches and uncorrected amounts. That does not authorize a unilateral refund to an arbitrary new account: coordinate the resolution. These security-deposit penalties do not transfer to Bisq Easy's different protocol.

<details>
<summary>Sources and scope</summary>

- [Trading rules — source revision 2026-04-15](../../wiki-source/trading-rules.wiki.txt).
- [Table of penalties — source revision 2025-08-29](../../wiki-source/table-of-penalties.wiki.txt).
- [Current rules](https://github.com/bisq-network/bisq/blob/ea9d5dff90c99ac462f2b0a7bf9ef92683956619/core/src/main/resources/i18n/displayStrings.properties#L347-L371).
- [Current payment reference](https://github.com/bisq-network/bisq/blob/ea9d5dff90c99ac462f2b0a7bf9ef92683956619/core/src/main/resources/i18n/displayStrings.properties#L811-L814).
- [Current seller verification](https://github.com/bisq-network/bisq/blob/ea9d5dff90c99ac462f2b0a7bf9ef92683956619/core/src/main/resources/i18n/displayStrings.properties#L938-L996).

Sources reviewed 7 November 2026. Current Bisq 1 code references are pinned to v1.10.11.

</details>
