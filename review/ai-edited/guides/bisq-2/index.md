---
title: "Bisq 2: start here"
description: "Start with Bisq Easy and understand profiles, reputation, mobile access and protocol limits."
---

*Checked 7 November 2026 · Bisq 2 v2.1.15.*

Bisq 2 is a peer-to-peer desktop application built to support distinct trading protocols. In the checked standard release, **Bisq Easy** is the normal public trading workflow. It uses seller reputation, not Bisq 1's Bitcoin security-deposit escrow.

## Choose your next task

- [Install and verify](install-and-verify/), then [buy your first bitcoin](first-trade/).
- [Create or take an offer](offers/) and read [payment safety](bisq-easy-safety/).
- [Understand reputation](reputation/) before selling.
- [Manage identities](identity/) and [back up application data](backup-and-recovery/).
- [Get trade help](get-help/) or choose a [mobile application](mobile/).

## What changes from Bisq 1

Easy does not require buyers or sellers to post a BTC security deposit and has no Bisq trading fee. The buyer pays first through the agreed external payment method; after actual receipt the seller sends BTC to the buyer's own wallet. The price premium and external payment/miner/routing fees still matter. Buyers do not need BTC for an escrow deposit to make their first purchase.

The convenience has a different trust model: reputation is an incentive, not collateral available to refund this trade. Mediation helps cooperation but cannot force payment. Use small amounts and do not import Bisq 1 arbitration expectations.

## Network, identities and privacy

The application uses a P 2 P network and Tor. It does not require a centralized exchange account, but payment providers may require identity information and each peer sees the payment details needed for the trade. Profiles and reputation are published network data; privacy does not mean every piece of application data is secret.

Multiple profiles can separate some interactions, but reusing bank details, chat content or other identifiers can link them. Protect local data and keys with a full application backup.

## Availability versus roadmap

The older wiki lists Liquid, Lightning, Monero, BSQ and other swap protocols, multiple privacy transports and wallet plans. Those lists describe architecture or proposals, not all released features. [Protocol availability](protocols/) separates standard Easy from developer-gated MuSig and historical proposals.

The desktop release contains Wallet code, but the standard Wallet navigation is gated by developer-only MuSig activation. Normal Easy guidance uses a separate wallet. Bisq 1 remains the relevant application for the DAO/BSQ operations used to build reputation.

For deployment-specific API, headless-node or custom configuration work, use the exact release's official instructions. Do not copy the wiki's old Linux 2.1.2 unpack commands or bypass OS protections without verifying the installer.

<details>
<summary>Sources and checks</summary>

[desktop.conf (pinned source)](https://github.com/bisq-network/bisq2/blob/cfe8ab251f2b6579f29e9955036afc33ba36861e/apps/desktop/desktop-app/src/main/resources/desktop.conf#L1-L5) · [MuSigService.java (pinned source)](https://github.com/bisq-network/bisq2/blob/cfe8ab251f2b6579f29e9955036afc33ba36861e/mu-sig/src/main/java/bisq/mu_sig/MuSigService.java#L163-L168) · [bisq_easy.properties (pinned source)](https://github.com/bisq-network/bisq2/blob/cfe8ab251f2b6579f29e9955036afc33ba36861e/i18n/src/main/resources/bisq_easy.properties#L410-L436).

Current desktop release and developer gates checked. Old roadmap promises and universal privacy claims narrowed; no unsupported new protocol availability asserted.

Adapted from **Bisq 2**, revision 4152 (2026-06-12). [Exact source](../wiki-source/bisq-2.wiki.txt) · [Attribution and revision metadata](../wiki-source/bisq-2.json).

</details>
