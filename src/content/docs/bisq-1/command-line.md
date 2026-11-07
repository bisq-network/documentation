---
title: "Run Bisq from the command line"
description: "Choose an instance, set persistent options and export diagnostic data using current option names."
---

A command-line option applies to the instance launched with it. Persistent settings belong in that instance's `bisq.properties`. Before launching, close the existing instance or deliberately select a different data directory; never run two processes on one directory.

## Launch and options

Use the executable installed on your system. Typical packaged locations are:

```sh
# Linux package
/opt/bisq/bin/Bisq --appName=Bisq-test

# macOS application bundle
/Applications/Bisq.app/Contents/MacOS/Bisq --appName=Bisq-test
```

On Windows, locate the actual `Bisq.exe` from its shortcut; packaging/location can differ. A PowerShell invocation of an executable path containing spaces uses `& "C:\actual\path\Bisq.exe" --appName=Bisq-test`.

`Bisq-test` is a **new identity and wallet**, not a copy of your existing instance. Verify the active directory and back up its new seed before using it. The old article's `--appData=BisqTest` is corrected to the current `--appName`.

| Option | Purpose |
| --- | --- |
| `--appName=Bisq-test` | A named directory under the default parent. |
| `--appDataDir=/absolute/path/to/Bisq-data` | The complete data-directory path, not just its parent. |
| `--btcNodes=NODE:8333` | A deliberately selected Bitcoin P2P node; replace `NODE`. |
| `--useTorForBtc=true` | Use Tor for the Bitcoin connection; a trusted LAN connection may deliberately use `false`. |
| `--dumpDelayedPayoutTxs=true` | Export delayed payout data for recovery investigation. |
| `--dumpStatistics=true` | Export the node's trade statistics. |

A shell placeholder such as `NODE` must be replaced; angle-bracket placeholders must not be pasted into a shell. Consult the [pinned option definitions](https://github.com/bisq-network/bisq/blob/ea9d5dff90c99ac462f2b0a7bf9ef92683956619/common/src/main/java/bisq/common/config/Config.java) for types and defaults.

## Persistent settings

Back up `bisq.properties`, then add one `option=value` per line without the leading `--`. For example:

```properties
dumpStatistics=true
```

A wrapper script can instead call the exact executable with a custom directory. Keep it recognizable so you do not accidentally start the default wallet. The old permission-denied dummy-directory trick (`chmod 000 Bisq`) is not needed for ordinary use and can lock you out of the wrong directory if misapplied.

## Diagnostic exports

Delayed payout exports use `delayed_payout_txs_closed.json`, `delayed_payout_txs_pending.json`, and `delayed_payout_txs_failed.json`. Current `DumpDelayedPayoutTx` code writes them under `btc_mainnet/db` in the selected data directory; this resolves the conflicting location in the old dedicated guide. [Read the consequences before broadcasting](../manual-payout/#export-the-delayed-payout-transaction).

Statistics exports are analytical data, not your payment-account backup or the authority for transaction status. The historical guide names `btc_mainnet/db/trade_statistics.json`; output names can change with the statistics format. Inspect the selected instance's generated files and log rather than creating or overwriting an assumed file.

## Tor option changes in v1.10.11

The current release switched Tor libraries and starts its bundled Tor in a sandbox. Old `torControlPort`, `torControlPassword`, `torControlCookieFile`, and safe-cookie flags are no longer a general external-Tor setup method. Current code rejects them outside special Whonix handling and directs external-Tor configuration to `btc_mainnet/tor/external_tor.config`. Do not disable the sandbox or edit the application JAR merely to make an old tutorial launch.

<details>
<summary>Sources and scope</summary>

- [Command line options — source revision 2023-01-26](../../wiki-source/command-line-options.wiki.txt).
- [Running from the command line — source revision 2025-05-02](../../wiki-source/running-from-the-command-line.wiki.txt).
- [Current option parser and legacy Tor rejection](https://github.com/bisq-network/bisq/blob/ea9d5dff90c99ac462f2b0a7bf9ef92683956619/common/src/main/java/bisq/common/config/Config.java).
- [Current release notes](https://github.com/bisq-network/bisq/releases/tag/v1.10.11).

Sources reviewed 7 November 2026. Current Bisq 1 code references are pinned to v1.10.11.

</details>
