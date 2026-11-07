---
title: "Trade Monero and preserve payment proof"
description: "Keep XMR payment proof and understand current optional auto-confirm settings."
---

*Checked 7 November 2026 · Bisq 1 v1.10.11.*

Trading XMR through a Bisq 1 altcoin account requires more than a public transaction ID. Confidential transaction data must be retained so a disputed payment can be checked. Use the ordinary one-day or Instant one-hour trade period only when you can complete the wallet interaction in time.

## Preserve payment proof

The **XMR sender** (BTC buyer) must retain the transaction ID, transaction key and recipient address. Before trading, check that your wallet exposes them. Do not delete/restore the wallet before completion: the recipient address and transaction key may exist only in its local records.

The official Monero CLI commands are:

```text
get_tx_key TXID
set store-tx-info 1
check_tx_key TXID TXKEY ADDRESS
```

Enable storage before you need the proof. Replace the placeholders with the actual trade's data. A verifier must compare the address and amount with the Bisq contract, not merely accept a successful proof for some other recipient. Use the GUI's proof/check controls if preferred. Keep proofs private to the intended dispute process.

The source lists several third-party wallets, but their current support was not individually tested. Do not choose one based only on that old list; prove you can retrieve the required data before sending funds.

## Optional auto-confirmation

**Current defaults differ from the wiki:** v1.10.11 defaults XMR auto-confirm to **disabled**, a **0.125 BTC** auto-confirm ceiling and **5 confirmations**. The code enforces a minimum of 2 confirmations. Existing saved preferences may differ from new-account defaults; inspect your own configuration.

The XMR sender may provide the transaction ID/key when marking payment sent. Supplying it is optional for auto-confirm participation; retaining the information for a dispute remains essential. Without it, the receiving peer must verify manually.

<figure><a href="../../media/wiki/4cf4058b304d93bc429a0e4aa49656339f02fb3f5d8604a7ba0deff1485d5db6.png"><img src="../../media/wiki/4cf4058b304d93bc429a0e4aa49656339f02fb3f5d8604a7ba0deff1485d5db6.png" alt="Optional XMR transaction-proof input" loading="lazy" /></a><figcaption>Optional XMR transaction-proof input. Historical illustration; current screens and values may differ.</figcaption></figure>

The XMR receiver (BTC seller) must deliberately enable and configure auto-confirm. It queries configured proof services and checks the trade amount against the configured ceiling. If a service fails, the feature is disabled, a dispute opens, or the payout already exists, automatic processing can stop. **Failure of auto-confirm is not proof that the XMR transaction is invalid.** Check your wallet and proof before manually confirming.

<figure><a href="../../media/wiki/56f246754aec999f5cb6234b9754886b8c7ac8f42bd706f8af17fe1c569ceea5.png"><img src="../../media/wiki/56f246754aec999f5cb6234b9754886b8c7ac8f42bd706f8af17fe1c569ceea5.png" alt="Auto-confirm trade status" loading="lazy" /></a><figcaption>Auto-confirm trade status. Historical illustration; current screens and values may differ.</figcaption></figure>

## Configure the trust boundary

Check the enabled state, BTC ceiling, required confirmations and service addresses in preferences. Current code snapshots service addresses when requests start, while required confirmations are read during result parsing; some setting changes therefore affect an in-progress request differently. Do not assume an old screenshot is your current state.

<figure><a href="../../media/wiki/b75fd0e6e142b52742239c81d39b9cbd745acb10a54024fffcaf8480e971cdca.png"><img src="../../media/wiki/b75fd0e6e142b52742239c81d39b9cbd745acb10a54024fffcaf8480e971cdca.png" alt="XMR auto-confirm preference" loading="lazy" /></a><figcaption>XMR auto-confirm preference. Historical illustration; current screens and values may differ.</figcaption></figure>

<figure><a href="../../media/wiki/b97e0b293eaaa15e84b399dbe9a4a279010caccbd25ab133c323b0a21aef4d08.png"><img src="../../media/wiki/b97e0b293eaaa15e84b399dbe9a4a279010caccbd25ab133c323b0a21aef4d08.png" alt="Historical explorer and confirmation settings" loading="lazy" /></a><figcaption>Historical explorer and confirmation settings. Historical illustration; current screens and values may differ.</figcaption></figure>

## Running a proof service

The source describes a Monero node plus an onion-monero-blockchain-explorer with its JSON API enabled (`xmrblocks --enable-json-api`), then selecting that service address in Bisq. This reduces reliance on someone else's explorer only if operated and configured correctly. Follow the current upstream projects' build/network instructions; the old Ubuntu 18.04 recommendation and old public explorer availability checks are not current deployment instructions.

Public proof tools expose transaction data to their operators. Prefer a trusted/local verification path, and never supply a wallet seed, spend key or account password to “verify” a payment.

<details>
<summary>Sources and checks</summary>

[AutoConfirmSettings.java (pinned source)](https://github.com/bisq-network/bisq/blob/ea9d5dff90c99ac462f2b0a7bf9ef92683956619/core/src/main/java/bisq/core/user/AutoConfirmSettings.java#L49-L65) · [XmrTxProofRequestsPerTrade.java (pinned source)](https://github.com/bisq-network/bisq/blob/ea9d5dff90c99ac462f2b0a7bf9ef92683956619/core/src/main/java/bisq/core/trade/txproof/xmr/XmrTxProofRequestsPerTrade.java#L120-L175) · [Official Monero payment-proof guide](https://www.getmonero.org/resources/user-guides/prove-payment.html).

Fresh pinned current Bisq defaults and per-trade service code inspected; Monero proof commands cross-checked in official guide. Third-party wallets/explorers and full node deployment not tested.

Adapted from **Trading Monero**, revision 3453 (2023-11-26). [Exact source](../../wiki-source/trading-monero.wiki.txt) · [Attribution and revision metadata](../../wiki-source/trading-monero.json).

</details>
