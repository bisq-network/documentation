---
title: "Trade GRIN and preserve payment proof"
description: "Prepare interactive GRIN payments and retain a verifiable proof file."
---

*Checked 7 November 2026 · Bisq 1 v1.10.11.*

GRIN uses Mimblewimble confidential transactions and interactive/slatepack wallet communication. Agree the actual wallet route and preserve proof before using a Bisq 1 altcoin offer. The trader sending GRIN is buying BTC; the trader receiving GRIN releases the escrowed BTC after verification.

## Receive through a compatible wallet

Use the receiving wallet's slatepack address in the Bisq payment account. Keep the wallet available for the transfer, or follow the wallet's supported slatepack-message exchange through private trade chat. A public transaction record alone may not reveal the recipient and amount.

## Preserve and export proof

The sender must use a wallet capable of exporting a verifiable payment proof. The old guide said only the core CLI wallet could do so; that is not a current exhaustive wallet survey. Confirm the feature in your installed wallet before committing a trade.

The recovered CLI workflow lists transactions and exports the selected transaction's proof:

```text
./grin-wallet txs
./grin-wallet export_proof -i TRANSACTION_NUMBER proof.txt
```

Replace the transaction number after inspecting the real transaction. The source used a public node with `-r`; that old endpoint is not recommended here as a verified current service. Use a node you trust and the current wallet's documented connection settings.

## Verify the proof against the contract

The original proof object includes amount, excess, sender/recipient addresses and signatures. Match **amount and recipient first**; valid signatures on an unrelated payment do not settle this trade. Amounts in the example have 9 decimal places: `10123456789` atomic units represents 10.123456789 GRIN.

The versioned CLI verification example is:

```text
./grin-wallet verify_proof ./proof.txt
```

Use a current compatible wallet/node and interpret its actual result. The historical output said the proof signatures were valid; do not confuse that text alone with all chain/confirmation and contract checks being complete. Ask the dispute agent what evidence is required and retain the original proof file privately.

## Understand price and support

The offer maker chooses the GRIN/BTC price; the latest trade price is market history, not a guaranteed current quote. Confidential transfers can be hard to adjudicate without proof, and failure to provide it can leave your case unprovable. Do not rely on the old blanket “will lose” outcome as a substitute for the current dispute process.

<details>
<summary>Sources and checks</summary>

[PaymentMethod.java (pinned source)](https://github.com/bisq-network/bisq/blob/ea9d5dff90c99ac462f2b0a7bf9ef92683956619/core/src/main/java/bisq/core/payment/payload/PaymentMethod.java#L290-L300) · [mimblewimble/grin-wallet repository](https://github.com/mimblewimble/grin-wallet) · [GRIN documentation](https://docs.grin.mw/).

Bisq altcoin timing checked. Original GRIN proof workflow preserved as versioned reference; current upstream documentation path was unavailable and commands were not executed. No claim of current exclusive wallet capability.

Adapted from **Trading GRIN**, revision 2424 (2021-11-10). [Exact source](../../wiki-source/trading-grin.wiki.txt) · [Attribution and revision metadata](../../wiki-source/trading-grin.json).

</details>
