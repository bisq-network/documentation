---
title: "Fix wallet synchronization and recover funds"
description: "Diagnose wallet sync problems and choose a backed-up recovery method with the right safeguards."
---

An incorrect displayed balance does not by itself prove that funds are lost. Record the transaction IDs and compare their chain status. Back up the whole data directory before changing files. If a trade is open, keep its messages and keys intact and coordinate with its mediator.

## Resync the SPV wallet

Bisq 1 uses a lightweight Bitcoin wallet. Its `bisq.spvchain` file contains chain information used to reconstruct wallet state; it is different from the wallet keys and payment accounts.

If the application opens, use **Settings → Network info → Resync SPV wallet**. Follow the restart prompts. The recovered procedure requires two restarts: allow the rescan to complete, then complete the final restart. Large old wallets can take a long time and use substantial CPU; repeated forced restarts can prevent completion.

<figure><a href="../../media/wiki/74616f229fc23aca32ca8f2be50e9ee646cf0cc884f1df4da64965c936477ca6.png"><img src="../../media/wiki/74616f229fc23aca32ca8f2be50e9ee646cf0cc884f1df4da64965c936477ca6.png" alt="Resync-spv-file" loading="lazy" /></a><figcaption>Historical illustration from Resyncing SPV file; current controls may differ.</figcaption></figure>

If the interface is inaccessible, close Bisq completely and preserve a backup. Move `btc_mainnet/wallet/bisq.spvchain` aside, then start Bisq and wait for synchronization. Close and restart it again after that first full scan. Move only the chain file, not the entire wallet directory.

### Interrupted resync

The historical workaround for a scan restarting at zero is to close Bisq and move the root-level `resyncSpv` marker aside before restarting. This removes a pending reset request; it does not prove the wallet has synchronized. The UI can open before the background scan finishes, so do not trust a temporary balance or begin trading prematurely. Use this only after identifying a repeated reset, not as a universal startup fix.

A [personal Bitcoin node](../network-and-nodes/#connect-your-own-bitcoin-node) can improve access to chain data. It does **not** eliminate Bisq's wallet scanning or make an incomplete wallet immediately usable.

## Restore a recent wallet file

If resyncing does not resolve the issue, the historical rolling BTC backups are under:

```text
btc_mainnet/wallet/backup/backups_bisq_BTC_wallet/
```

With Bisq closed and the complete current state backed up, preserve the existing `btc_mainnet/wallet/bisq_BTC.wallet`, copy an appropriate recent backup into its place, and name the copy `bisq_BTC.wallet`. Move the SPV chain file aside and resync as above. Do not mix an unrelated wallet's keys with live trade data. If you try another backup, retain the previous attempt so the process remains reversible.

This is a BTC-wallet-file repair, not a complete account restore. For deeper corruption, review [wallet replacement and full data recovery](../restoring-data/) rather than deleting the application directory.

## Emergency wallet

The emergency withdrawal tools are intended for corrupted-wallet situations where normal sending does not work. The recovered shortcuts are Ctrl/Alt/Cmd+E for BTC and Ctrl/Alt/Cmd+B for BSQ; confirm the tool and currency shown before continuing. Make a full backup and discuss the specific transaction with support first. A sweep can interfere with active trading and is not a way to release funds from a 2-of-2 trade without the required signatures.

> The source illustration “Emergency Wallet.png” has not been recovered. The steps below do not depend on it.

Verify the destination and amount, keep BTC available for BSQ transaction fees, and check **Funds → Transactions** for broadcast status. A generated transaction that did not broadcast is not a successful withdrawal. Avoid repeatedly creating conflicting attempts.

## Restore from seed as a last resort

Try a wallet backup first. Only restore into a **new, empty Bisq wallet** after finishing or resolving active offers, trades and disputes. In **Account → Wallet seed**, enter the saved seed words and wallet creation date and select **Restore wallets**. Do not guess a date later than the wallet's first use: it can omit older transactions from the scan. A missing date requires a longer scan.

Wait for Bitcoin and DAO synchronization. A temporary zero balance is not the final result. Seed restoration removes wallet encryption; set a new password after restoration. The seed covers BTC and BSQ funds but does not recreate payment accounts, trade messages, open disputes, Tor/signing identity or contributor reputation records.

<figure><a href="../../media/wiki/d078ae4a42402145bcd8aa7cd3a8bc96b24ef4049b31825edfb1730017c177b0.png"><img src="../../media/wiki/d078ae4a42402145bcd8aa7cd3a8bc96b24ef4049b31825edfb1730017c177b0.png" alt="Restore-from-seed" loading="lazy" /></a><figcaption>Historical illustration from Restoring your wallet from seed; current controls may differ.</figcaption></figure>

External Bitcoin wallets need the correct script type and derivation path for the addresses being recovered. **External BSQ recovery is unsupported and can destroy the BSQ coloring by spending it incorrectly.** Keep BSQ recovery in Bisq. Use [watch-only export](../wallet-and-watch-only/#watch-only-wallets) for observation without exposing spending keys; it is a different task from recovery.

<details>
<summary>Sources and scope</summary>

- [Troubleshooting wallet issues — source revision 2023-11-17](../../wiki-source/troubleshooting-wallet-issues.wiki.txt).
- [Resyncing SPV file — source revision 2025-04-23](../../wiki-source/resyncing-spv-file.wiki.txt).
- [Emergency wallet — source revision 2022-01-22](../../wiki-source/emergency-wallet.wiki.txt).
- [Restoring your wallet from seed — source revision 2020-06-19](../../wiki-source/restoring-your-wallet-from-seed.wiki.txt).
- [Current wallet restoration warnings](https://github.com/bisq-network/bisq/blob/ea9d5dff90c99ac462f2b0a7bf9ef92683956619/core/src/main/resources/i18n/displayStrings.properties#L3864-L3882).
- [Current seed workflow](https://github.com/bisq-network/bisq/blob/ea9d5dff90c99ac462f2b0a7bf9ef92683956619/desktop/src/main/java/bisq/desktop/main/account/content/seedwords/SeedWordsView.java).

Sources reviewed 7 November 2026. Current Bisq 1 code references are pinned to v1.10.11.

</details>
