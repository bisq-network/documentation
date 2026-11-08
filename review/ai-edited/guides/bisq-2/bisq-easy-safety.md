---
title: "Trade safely with Bisq Easy"
description: "Understand reputation, payment checks, cancellation, and what mediation can do."
---

*Bisq 2 v2.1.15 · Checked 7 November 2026.*

Bisq Easy relies on the **seller's reputation**, rather than a Bitcoin security deposit. The buyer sends payment before receiving bitcoin. Start with a small amount and choose a seller whose reputation adequately covers the trade; reputation reduces risk but does not guarantee a successful trade.

For the step-by-step workflow, use [your first trade](../first-trade/). These precautions apply to Bisq Easy, not Bisq 1's multisig trading protocol.

## Review the offer before committing

Compare the seller's reputation, price, payment method, and final amount. The application checks reputation against the trade amount; do not work around insufficient-reputation warnings to obtain a better price.

There is no Bisq Easy trading fee, but costs can still include the seller's price premium, bank fees, and Bitcoin miner or Lightning routing fees paid by the seller. The sender covers fees charged by their own bank.

Keep trade communication inside Bisq 2. Off-platform deals and private messages in another messenger make the trade harder to verify and support.

## Check payment details carefully

Use the account identified in the trade. Do not substitute a friend's, partner's, or unrelated business account to work around a payment problem. If account details change unexpectedly or do not match, stop and [request help](../get-help/) before paying or arranging a refund.

**Payment reason:** leave it **blank** when possible; if a value is required, use **your own name**. Never include **Bisq** or **Bitcoin**. Do not insert the trade ID based on older wiki tips. This guide follows the explicit v2.1.15 payment-screen rule; another guide paragraph upstream still contains conflicting trade-ID wording.

If Bisq displays a banned-payment-account warning, do not send money to that account.

**Selling bitcoin:** check your own bank account or payment-provider app for actual receipt before sending bitcoin. A buyer's message, screenshot, or payment notification alone does not establish that funds arrived. Consider chargeback risk when choosing a payment method.

## Stay available and understand cancellation

Either party can cancel before account details are exchanged. After that, failing to meet the agreed obligations can breach the contract and result in a ban. The current rules include an exception for an unresponsive peer; involve a mediator rather than guessing how to settle an incomplete trade.

Check trade messages regularly and respond within **24 hours**. For a slower bank transfer, both traders must come online at least daily.

## Know the limits of support

A mediator can help the traders find a cooperative resolution, but **cannot enforce an outcome or guarantee recovery**. Bisq 1 arbitration and multisig escrow payouts do not apply to Bisq Easy.

Never share seed words, private keys, or passwords with a trader or someone claiming to provide support. Keep necessary payment evidence private and preserve your [application backup](../backup-and-recovery/).

<details>
<summary>Sources</summary>

[Current trade rules](https://github.com/bisq-network/bisq2/blob/cfe8ab251f2b6579f29e9955036afc33ba36861e/i18n/src/main/resources/bisq_easy.properties#L428-L436) · [Buyer payment screen](https://github.com/bisq-network/bisq2/blob/cfe8ab251f2b6579f29e9955036afc33ba36861e/apps/desktop/desktop/src/main/java/bisq/desktop/main/content/bisq_easy/open_trades/trade_state/states/BuyerState2a.java#L145-L158) · [Seller receipt check](https://github.com/bisq-network/bisq2/blob/cfe8ab251f2b6579f29e9955036afc33ba36861e/i18n/src/main/resources/bisq_easy.properties#L954-L955) · [Historical source](../../wiki-source/bisq-easy.wiki.txt)

</details>
