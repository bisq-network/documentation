---
title: "Diagnose deposit and payout transactions"
description: "Distinguish missing, pending and completed deposit or payout transactions before attempting recovery."
---

Keep the trade ID and each transaction ID separate: maker fee, taker fee, deposit and payout are different transactions. A missing UI confirmation, an unconfirmed mempool transaction and an invalid transaction require different responses.

## Verify the deposit

Open the trade's **i** details under **Portfolio → Open trades** or **Failed trades**, and copy its deposit transaction ID. Check it using your own node or a Bitcoin explorer. An explorer learns the transaction you query; do not post the entire private trade contract publicly.

<figure><a href="../../media/wiki/bb6ac4d1c8f82f7031fa5686f59d3a7664b04f4052b20fe72e64dcd90b018755.png"><img src="../../media/wiki/bb6ac4d1c8f82f7031fa5686f59d3a7664b04f4052b20fe72e64dcd90b018755.png" alt="Trade details" loading="lazy" /></a><figcaption>Historical illustration from Deposit transaction; current controls may differ.</figcaption></figure>

The deposit locks the seller's bitcoin and both security deposits in a 2-of-2 output. The historical illustration shows a multisig output and an `OP_RETURN`; that visual pattern alone is not proof that a transaction belongs to your trade. Verify the exact txid, outputs and confirmations. Do not send the counterpayment until the application has recognized the required deposit confirmation.



<details>
<summary>Earlier interface illustrations</summary>

These recovered screenshots show the controls discussed in this section. Prices, balances, limits, account identities and software versions in them are historical examples; follow the current instructions above.

<figure><a href="../../media/wiki/c80ebc03c1277058e9b8ed9b22cb22136ed3dbd1874567e795f4353e36b9778c.png"><img src="../../media/wiki/c80ebc03c1277058e9b8ed9b22cb22136ed3dbd1874567e795f4353e36b9778c.png" alt="failed trade tab" loading="lazy" /></a><figcaption>Historical Deposit transaction illustration.</figcaption></figure>

<figure><a href="../../media/wiki/35ef33efa5b30c5333068444a64eeeb1d6075410f6dc0b4f3e14efdb4b14bf6e.png"><img src="../../media/wiki/35ef33efa5b30c5333068444a64eeeb1d6075410f6dc0b4f3e14efdb4b14bf6e.png" alt="Deposittx" loading="lazy" /></a><figcaption>Historical Deposit transaction illustration.</figcaption></figure>

</details>

## Deposit pending and CPFP

A sudden fee-rate increase can leave a previously adequate deposit fee below the current market. Funding Bisq from an **unconfirmed low-fee parent** can also hold up its child deposit. Check the full ancestor chain, not just the deposit's own fee rate. A transaction missing from one explorer is not proof that all nodes have discarded it, and there is no guaranteed network-wide expiry time.

**Child pays for parent (CPFP)** spends an available output at a fee high enough to make the combined package attractive to miners. Only the owner of a spendable output can do it. This is an advanced, historically documented recovery technique, not an automatic Bisq refund or a guaranteed confirmation.

- If an external funding transaction has change back to your external wallet, that wallet can spend the change to another address it controls.
- If relevant unconfirmed change is spendable inside Bisq, the historical procedure chooses an unused **Receive funds** address, selects the correct output under **Send funds**, and sends it to that verified address with a custom fee.
- If all the funding was already confirmed and the only spendable deposit output is the 2-of-2 escrow, an individual trader cannot arbitrarily spend it to bump the fee.

Calculate the package fee from all relevant transaction virtual sizes and existing absolute fees. The old article's “3–4 times the fee” shortcut is not reliable for arbitrary packages. Check the destination, output ownership and available value before signing; an inadequate child may waste fees without achieving the desired confirmation. Paid acceleration services are separate third-party arrangements, not a Bisq guarantee.

## Delayed payout pending

The delayed payout transaction may also have an old low fee. Its outputs belong to the Burning Men recipients, so a trader cannot spend those outputs. The recovered procedure asks a recipient to CPFP their own output and agrees reimbursement of the additional cost. Availability, output value and transaction-policy constraints matter: the old statement that this is “always possible” is too strong.

Coordinate through the assigned refund agent and verified support channels. Do not send an unsolicited helper money or secrets. [Delayed payout export and broadcast](../manual-payout/#export-the-delayed-payout-transaction) has irreversible arbitration consequences.

## Prepared delayed payouts disagree

The error `BuyerVerifiesPreparedDelayedPayoutTx` with `TxIds of buyersPreparedDelayedPayoutTx and sellersPreparedDelayedPayoutTx must be the same` means the peers did not agree on the prepared transaction. The recovered diagnosis links this to differing DAO state and Burning Men receiver shares.

Check **DAO → Network monitor → DAO state** and the seed-node consensus status. A historical recovery control is **Settings → Preferences → Rebuild DAO state from resources**. Back up first and finish the rebuild before retrying. Repairing your own DAO state cannot repair the peer's. Do not retry indiscriminately if a transaction already exists; establish the failed trade's state first.

## Trade says completed but BTC is missing

Compare **Funds → Transactions** with the expected payout and actual deposit spend. The historical payout-address-reuse bug could make a buyer's instance recognize an earlier payment to a reused address and close the new trade prematurely. Rapid completion alone does not prove that bug, and its current incidence has not been established here.

The seller may still be able to complete the normal payout after verifying payment. Notify the assigned mediator promptly if your completed-trade view removes chat access: otherwise you might miss a dispute that the seller can still see. Share the trade ID and a verified contact route privately, preserve logs, and avoid sending another counterpayment. If normal payout fails, a coordinated manual payout or delayed-payout/arbitration route may be needed; neither follows merely from the UI's “completed” label.

<details>
<summary>Sources and scope</summary>

- [Deposit transaction — source revision 2020-06-19](../../wiki-source/deposit-transaction.wiki.txt).
- [Deposit transaction pending in mempool and CPFP — source revision 2023-12-26](../../wiki-source/deposit-transaction-pending-in-mempool-and-cpfp.wiki.txt).
- [Delayed payout transaction pending in mempool and CPFP — source revision 2023-12-26](../../wiki-source/delayed-payout-transaction-pending-in-mempool-and-cpfp.wiki.txt).
- [BuyerVerifiesPreparedDelayedPayoutTx Exception error — source revision 2023-11-28](../../wiki-source/buyerverifiesprepareddelayedpayouttx-exception-error.wiki.txt).
- [Trade payout address reuse issue — source revision 2023-08-16](../../wiki-source/trade-payout-address-reuse-issue.wiki.txt).
- [Current payment and deposit flow](https://github.com/bisq-network/bisq/blob/ea9d5dff90c99ac462f2b0a7bf9ef92683956619/core/src/main/resources/i18n/displayStrings.properties#L802-L850).
- [Current arbitration boundary](https://github.com/bisq-network/bisq/blob/ea9d5dff90c99ac462f2b0a7bf9ef92683956619/core/src/main/resources/i18n/displayStrings.properties#L358-L371).

Sources reviewed 7 November 2026. Current Bisq 1 code references are pinned to v1.10.11.

</details>
