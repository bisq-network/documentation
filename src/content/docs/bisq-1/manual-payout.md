---
title: "Manual payout and delayed payout tools"
description: "Understand exact-input local signing and the distinct consequences of delayed-payout broadcast."
---

These are advanced recovery tools for a specific failed trade. Preserve a complete backup, identify the correct trade and unspent deposit output, and agree the intended outcome with the assigned mediator before signing or broadcasting anything. A transaction cannot be undone after confirmation.

## Cooperatively spend the deposit

A normal Bisq 1 payout spends the 2-of-2 deposit with both traders' signatures. A manual payout reproduces that process when the normal workflow fails; it cannot bypass the other signature.

The current application opens **Support Tool** with **Alt+G** (Option+G on macOS; Ctrl+G and the platform shortcut modifier are also accepted). It requires the BTC wallet to be ready. Confirm the window title before entering data. The workflow is:

1. **Inputs:** import the mediation ticket or enter every field from the correct trade contract. Look up `amountInMultisig` from the actual unspent deposit output. It must be exact because the amount participates in a SegWit signature.
2. **Agree the transaction:** export the input data and have both traders import exactly the same values. Independently check the deposit transaction/output, each payout address, each amount, and the mining fee. Importing a string is not verification of its contents.
3. **Sign locally:** use **Locate key in wallet**, then **Generate signature**, on your own computer. Send the resulting signature to the person assembling the transaction. Do not send your seed or private key; the historical stub's private-key collection advice is unnecessary for this workflow.
4. **Build and inspect:** combine both signatures and build the transaction. Inspect its decoded outputs and fee before broadcasting. If available, a Bitcoin node's `testmempoolaccept` can test acceptance without broadcasting; a passing test does not prove the payout addresses are correct.
5. **Broadcast and record:** publish only the agreed transaction and retain its txid. Confirm its chain status before treating the trade as paid.

The source described public transaction preview/broadcast services. Using them reveals transaction data to the provider; no particular service or fee is guaranteed here. Current product-flow testing of this exceptional tool is still pending.

## Export the delayed payout transaction

A delayed payout is **not** a normal payout to the traders. Broadcasting it sends the escrow to Burning Men recipients and starts the arbitration path, with no guaranteed reimbursement. Do not broadcast it merely to repair a display error.

When support needs the stored transaction, close Bisq and start the same instance with:

```text
--dumpDelayedPayoutTxs=true
```

See [command-line launch examples](../command-line/#launch-and-options). In the selected data directory’s `btc_mainnet/db` folder, inspect:

```text
delayed_payout_txs_closed.json
delayed_payout_txs_pending.json
delayed_payout_txs_failed.json
```

Choose by the exact trade ID. Check its locktime, input and current chain status before any broadcast. Keep the dumps private. If the application's arbitration channel is inaccessible, coordinate with [your refund agent](../finding-your-arbitrator/) before using a node or transaction broadcaster.

<details>
<summary>Sources and scope</summary>

- [Manual payout — source revision 2023-11-11](../../wiki-source/manual-payout.wiki.txt).
- [Dumping delayed payout transactions — source revision 2025-06-26](../../wiki-source/dumping-delayed-payout-transactions.wiki.txt).
- [Current support shortcut](https://github.com/bisq-network/bisq/blob/ea9d5dff90c99ac462f2b0a7bf9ef92683956619/desktop/src/main/java/bisq/desktop/app/BisqApp.java#L358-L362).
- [Current local signing](https://github.com/bisq-network/bisq/blob/ea9d5dff90c99ac462f2b0a7bf9ef92683956619/desktop/src/main/java/bisq/desktop/main/overlays/windows/supporttool/SignPane.java).
- [Current build/broadcast implementation](https://github.com/bisq-network/bisq/blob/ea9d5dff90c99ac462f2b0a7bf9ef92683956619/desktop/src/main/java/bisq/desktop/main/overlays/windows/supporttool/BuildPane.java).
- [Current command option](https://github.com/bisq-network/bisq/blob/ea9d5dff90c99ac462f2b0a7bf9ef92683956619/common/src/main/java/bisq/common/config/Config.java).
- [Bitcoin Core transaction acceptance test](https://bitcoincore.org/en/doc/30.0.0/rpc/rawtransactions/testmempoolaccept/).
- [Current arbitration consequences](https://github.com/bisq-network/bisq/blob/ea9d5dff90c99ac462f2b0a7bf9ef92683956619/core/src/main/resources/i18n/displayStrings.properties#L358-L371).

- [Current delayed-payout export directory](https://github.com/bisq-network/bisq/blob/ea9d5dff90c99ac462f2b0a7bf9ef92683956619/core/src/main/java/bisq/core/trade/bisq_v1/DumpDelayedPayoutTx.java).

Sources reviewed 7 November 2026. Current Bisq 1 code references are pinned to v1.10.11.

</details>
