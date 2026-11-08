---
title: "Find your data directory and protect your identity"
description: "Locate wallet, account and identity files and understand the consequences of changing an onion address."
---

Bisq 1 stores its wallet, payment accounts, trade state and settings locally. The installer directory and the **data directory** are different. Reinstalling the application is not a substitute for backing up its data.

## Find the active directory

Open **Account → Backup → Open directory**. This is safer than guessing when you use a custom location or instance name.

<figure><a href="../../media/wiki/fae5ef7e526b9c28081cfb4c30b9df56f1c75b39f5edbaf3512aec689ecacfc5.png"><img src="../../media/wiki/fae5ef7e526b9c28081cfb4c30b9df56f1c75b39f5edbaf3512aec689ecacfc5.png" alt="Bisq-account-backup-open-directory-button" loading="lazy" /></a><figcaption>Historical illustration from Data directory; current controls may differ.</figcaption></figure>

Conventional default locations are `~/.local/share/Bisq` on Linux, `~/Library/Application Support/Bisq` on macOS, and `%APPDATA%\Bisq` on Windows. `--appName` or `--appDataDir` can select another location. Check the actual active path before touching files; Bisq 2 has a separate directory and different stores.

## What the files contain

| Path within the directory | Purpose and handling |
| --- | --- |
| `bisq.log` | Diagnostic activity; review/redact before sharing. |
| `bisq.properties` | Persistent application options, one `option=value` per line. |
| `btc_mainnet/keys` | P2P signing identity; `sig.key` also matters for payment-account age/signing. |
| `btc_mainnet/db` | Trade, account, preference and DAO stores; do not edit them as text. |
| `btc_mainnet/tor/hiddenservice` | Private keys for your Bisq onion identity. |
| `btc_mainnet/wallet` | BTC and BSQ wallets, rolling backups and `bisq.spvchain`. |

A wallet password encrypts wallet material, not all these files. Keep full backups confidential and encrypted. See [backup and recovery](../backup-and-recovery/) and [selective restoration](../restoring-data/).

## Change your onion address

Your onion address identifies this Bisq instance to peers; it is separate from any Bitcoin node you connect to. Changing it affects recognition by past counterparties. **Do not rotate it while you have open trades or disputes:** peers may be unable to reach you and funds may be at risk.

The recovered guide permits existing open offers and says they update after restart. That behavior has not been exercised here; remove or finish offers before a deliberate identity migration if you cannot verify their update. Removing an offer loses its maker fee.

1. Check the current address in **Settings → Network info → Bisq network**.
2. Close Bisq fully and back up the complete data directory, including `btc_mainnet/tor/hiddenservice`.
3. To deliberately generate a new identity, move that `hiddenservice` directory to a safe location outside the active Tor directory. Do not erase the only copy.
4. Start Bisq, allow Tor to initialize, then verify the changed address and network connectivity. No fixed completion time is guaranteed.
5. Keep a new backup. Keep the previous identity offline in case an old trade needs investigation.

Routine connection troubleshooting should preserve this directory. The current release also uses `external_tor.config` for external Tor; deleting every Tor file except `hiddenservice`, as an old article suggested, can discard other necessary configuration.



<details>
<summary>Earlier interface illustrations</summary>

These recovered screenshots show the controls discussed in this section. Prices, balances, limits, account identities and software versions in them are historical examples; follow the current instructions above.

<figure><a href="../../media/wiki/f8e17d7fdcf3e12da16e8c884e663e9b04fb0bd482ba7a614501f626e27629be.png"><img src="../../media/wiki/f8e17d7fdcf3e12da16e8c884e663e9b04fb0bd482ba7a614501f626e27629be.png" alt="Tor-which-version" loading="lazy" /></a><figcaption>Historical Changing your onion address illustration.</figcaption></figure>

</details>

<details>
<summary>Sources and scope</summary>

- [Data directory — source revision 2025-05-01](../../wiki-source/data-directory.wiki.txt).
- [Changing your onion address — source revision 2025-04-15](../../wiki-source/changing-your-onion-address.wiki.txt).
- [Current directory options](https://github.com/bisq-network/bisq/blob/ea9d5dff90c99ac462f2b0a7bf9ef92683956619/common/src/main/java/bisq/common/config/Config.java).
- [Current Tor paths and reset exclusions](https://github.com/bisq-network/bisq/blob/ea9d5dff90c99ac462f2b0a7bf9ef92683956619/p2p/src/main/java/bisq/network/p2p/network/TorMode.java).

Sources reviewed 7 November 2026. Current Bisq 1 code references are pinned to v1.10.11.

</details>
