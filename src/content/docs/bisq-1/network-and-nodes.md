---
title: "Troubleshoot connections and use your Bitcoin node"
description: "Diagnose Bisq and Bitcoin connections, configure a personal node and understand Tor compatibility."
---

Bisq has two networks to inspect: the Bisq peer-to-peer network carries offers and trade messages, while Bitcoin peers provide blockchain data. A working web browser alone does not establish that either connection works.

## Read the network indicator

Hover over or click the footer connection icon for details. The recovered indicator guide distinguishes **red** (no P2P peers), **yellow** (outbound connections but no inbound peers) and **green** (both). Yellow can be normal during startup; persistent yellow can mean offers are unreachable even though some outgoing connections work. Historical self-ping/blinking behavior is diagnostic context, not a guarantee that every release uses the same timer.

Check the current release, local clock, internet stability and available disk space first. Allow startup and DAO synchronization to finish. Avoid rapid repeated restarts. Review security software's quarantine/network records; do not routinely disable antivirus protection.

## Tor, bridges and stalled startup

A historical “3/4” startup stall often indicated slow or failed initial data transfer from seed nodes. That label alone does not identify the cause. Preserve `hiddenservice` and external-Tor configuration during diagnosis. Prefer the application's Tor reset control, with a backup, over deleting an entire Tor directory.

For Tor blocking, use the application's bridge settings and official [Tor bridge information](https://bridges.torproject.org/). **v1.10.11 changed the requirements:** pluggable transports need **Allow pluggable transports in the Tor sandbox**; on Windows the release notes require the sandbox off for them. This is a specific bridge compatibility tradeoff, not a blanket recommendation to disable isolation.

The old manual seed-node page contained only a notice that its monitoring service was unavailable. There is no recovered working node-selection recipe to promote. Use current network controls and the release's provided peers, not an unexplained stale endpoint from a tutorial.

## Connect your own Bitcoin node

A synchronized personal node can improve privacy and reliability of Bisq's chain queries. Bisq remains a lightweight wallet and still scans its history. Install and verify Bitcoin Core using its [official download instructions](https://bitcoincore.org/en/download/). Allow adequate disk space and initial-sync time based on the current chain and your hardware; old “570 GB”, “1 TB minimum” and “2–10 days” estimates are not current guarantees. A pruned node still fully validates Bitcoin, but may not retain the historical blocks needed by this Bisq workflow.

The historical compatibility configuration was:

```ini
prune=0
peerbloomfilters=1
```

It keeps old blocks and enables the Bloom-filter queries used by this wallet. Check support in your installed Bitcoin Core version and restrict access appropriately. The old block also included `server=1` and `mempoolexpiry=24`: `server=1` enables RPC, **not** Bitcoin P2P serving, and the 24-hour expiry was a troubleshooting suggestion, not a universal requirement. Bisq's normal node connection uses the P2P port, not RPC credentials.

### Same machine, LAN or Tor

- **Same machine:** start and synchronize the node first. Bisq checks a local Bitcoin node on port 8333. If an altcoin node is incorrectly detected, stop it during diagnosis or select the intended Bitcoin node explicitly.
- **Trusted LAN:** make the Bitcoin P2P listener reachable on the chosen LAN interface and allow port 8333 only from the required network. In **Settings → Network info**, set the node's actual `IP:8333` and deliberately disable **Use Tor for Bitcoin network** for this local connection. This changes privacy for that connection.
- **Remote node:** use its verified Tor v3 hostname under custom Bitcoin nodes. Discover your own node's configured address using its node-management tools; do not copy a stranger's public endpoint as though it were yours.

A historical firewall example was `sudo ufw allow from 10.0.0.0/24 to any port 8333`; adapt the subnet/interface to your actual network. Binding Bitcoin to `0.0.0.0` exposes all interfaces, so use a narrower binding where practical and never open RPC to the internet for this task.

After restarting, inspect **Settings → Network info → Bitcoin network** to verify the intended peer. If it fails, return to **Use provided Bitcoin Core nodes** and remove conflicting persistent custom-node settings. The source contains old public fallback onion addresses; their current availability has not been verified, so they are not hardcoded here.

## China and other restricted networks

The recovered China guide assumes an already working local proxy or VPN and describes adding `Socks5Proxy IP:port` to Tor configuration. Its Bisq 1 method modifies a `torrc` inside the application JAR; that predates the v1.10.11 Tor library and sandbox and is **not a current installation procedure**. The distinction remains useful: a proxy can carry Tor's connection to entry nodes; it does not replace the Bisq protocol or authenticate peers. Review current bridge/external-Tor settings and the security of the proxy before use. Bisq 2 has different configuration and should use its own guide.

<details>
<summary>Sources and scope</summary>

- [Network status indicator — source revision 2022-08-23](../../wiki-source/network-status-indicator.wiki.txt).
- [Troubleshooting network issues — source revision 2022-08-17](../../wiki-source/troubleshooting-network-issues.wiki.txt).
- [Manually select seednodes — source revision 2024-06-22](../../wiki-source/manually-select-seednodes.wiki.txt).
- [Connecting to your own Bitcoin node — source revision 2026-09-19](../../wiki-source/connecting-to-your-own-bitcoin-node.wiki.txt).
- [Installing your own Bitcoin node — source revision 2026-09-19](../../wiki-source/installing-your-own-bitcoin-node.wiki.txt).
- [Running Bisq in China — source revision 2025-01-14](../../wiki-source/running-bisq-in-china.wiki.txt).
- [Current network settings](https://github.com/bisq-network/bisq/blob/ea9d5dff90c99ac462f2b0a7bf9ef92683956619/desktop/src/main/java/bisq/desktop/main/settings/network/NetworkSettingsView.java).
- [Provided node definitions](https://github.com/bisq-network/bisq/blob/ea9d5dff90c99ac462f2b0a7bf9ef92683956619/core/src/main/java/bisq/core/btc/nodes/BtcNodes.java).
- [Current Tor compatibility changes](https://github.com/bisq-network/bisq/releases/tag/v1.10.11).

- [Bitcoin Core v30 option meanings](https://github.com/bitcoin/bitcoin/blob/v30.0/src/init.cpp#L507-L695).

Sources reviewed 7 November 2026. Current Bisq 1 code references are pinned to v1.10.11.

</details>
