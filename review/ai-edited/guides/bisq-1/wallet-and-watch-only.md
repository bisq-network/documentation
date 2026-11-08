---
title: "Understand balances, watch-only wallets and privacy"
description: "Understand balance states, export public watch keys and limit exposure of trade data."
---

Bisq 1's wallet manages Bitcoin and BSQ keys and the transactions used by its trading protocol. Funding a trade from an external wallet does not remove Bisq's internal wallet or its need for backups.

## Available, reserved and locked

- **Available** funds can ordinarily be sent to another address.
- **Reserved** funds remain under your key control but are earmarked for an offer. Spending them elsewhere can break the offer's funding assumptions.
- **Locked** funds are in the trade's multisig deposit and require its payout protocol, not a normal unilateral wallet send.

Maker-fee, taker-fee, deposit and payout transactions have different roles. The SPV chain file helps reconstruct wallet state from Bitcoin; it is not the seed or a complete trade backup. A personal node changes where chain data comes from, not the ownership of the locked output.

## Watch-only wallets

Use **Account → Wallet info** to view each chain's **Watch keys** and **HD keychain paths**. The current application derives these labels from the actual wallet chain and script type. Copy the key and path from the **same** BTC legacy or SegWit entry. The old watch-key article reverses xpub/zpub descriptions; do not use its prefix sentence to choose the script type.

<figure><a href="../../media/wiki/e8f75ef328faf25bc96165933a2cc2fe2af7ddc3a7ccfc9b3dbd24bee6ffe050.png"><img src="../../media/wiki/e8f75ef328faf25bc96165933a2cc2fe2af7ddc3a7ccfc9b3dbd24bee6ffe050.png" alt="Wallet - watchkeys" loading="lazy" /></a><figcaption>Historical illustration from Watch keys; current controls may differ.</figcaption></figure>

A watch-only wallet can show derived addresses and transactions without spending keys. It is useful for reconciliation and external labels, but an extended public key still reveals substantial wallet history to the wallet software and any server it queries. Do not publish it. It also does not recreate Bisq's trade-state labels or independently spend a 2-of-2 escrow.

### Sparrow reference workflow

The recovered Sparrow guide creates **New wallet → xPub / Watch only wallet**, pastes the public key from Bisq, and sets the derivation to the corresponding path displayed by Bisq. Its historical examples are `44'/0'/1'` for the BTC SegWit chain and `44'/0'/0'` for legacy. Read your current wallet's values rather than assuming those examples cover every chain.

That guide disables **Validate derivations** because Bisq's SegWit path is nonstandard. This is a validation exception for an understood import, not a reason to ignore an unexpected path. Check several derived receive addresses against Bisq before relying on the balance, and restore normal validation for unrelated imports. Sparrow's current UI has not been exercised here.

For Electrum, the historical equivalent is a new **Standard wallet → Use a master key** with the matching public key and correct script interpretation. Do not paste seed words or private keys into a watch-only import. External wallet spending can disrupt active Bisq trades or spend BSQ-colored outputs as ordinary satoshis.

## Protect trade data

Payment details are exchanged with the counterparty and, when a dispute is opened, its support agent. Local storage reduces central collection but does not make data anonymous or protect it from a stolen computer. Encrypt the disk/backups and minimize unnecessary copies.

**Settings → Preferences → Clear sensitive data after (days)** controls removal of sensitive fields from old closed trades and related disputes. The recovered guide describes payment payloads and trader chats being cleared after the configured age, measured from the trade date rather than completion. Check the setting in your release before depending on it; old backups and counterparties' copies are not retroactively erased. Retain evidence needed for an unresolved dispute before changing retention.

<details>
<summary>Sources and scope</summary>

- [Wallet — source revision 2021-04-06](../../wiki-source/wallet.wiki.txt).
- [Watch keys — source revision 2021-05-26](../../wiki-source/watch-keys.wiki.txt).
- [Import Bisq wallet as watch only wallet in Sparrow — source revision 2023-12-11](../../wiki-source/import-bisq-wallet-as-watch-only-wallet-in-sparrow.wiki.txt).
- [Data Privacy — source revision 2022-03-15](../../wiki-source/data-privacy.wiki.txt).
- [Current watch-key and derivation display](https://github.com/bisq-network/bisq/blob/ea9d5dff90c99ac462f2b0a7bf9ef92683956619/desktop/src/main/java/bisq/desktop/main/account/content/walletinfo/WalletInfoView.java#L151-L177).
- [Current contract data-clearing implementation](https://github.com/bisq-network/bisq/blob/ea9d5dff90c99ac462f2b0a7bf9ef92683956619/core/src/main/java/bisq/core/trade/model/bisq_v1/Contract.java).

Sources reviewed 7 November 2026. Current Bisq 1 code references are pinned to v1.10.11.

</details>
