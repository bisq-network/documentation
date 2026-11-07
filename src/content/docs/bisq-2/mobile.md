---
title: "Choose a Bisq mobile application"
description: "Choose between an Android node and a thin client controlling a trusted Bisq node."
---

*Checked 7 November 2026 · Bisq 2 v2.1.15.*

The official mobile project offers two architectures. Choose by **where the Bisq node and application state run**, not just by the phone's operating system.

## Bisq Easy Node for Android

The Android node app runs Bisq's core/P 2 P node on the phone. It does not require your desktop to remain running. The fresh official release check found **Bisq Easy 0.17.0**, tag `anode_0.17.0`, published 6 November 2026.

The phone is responsible for connectivity, resources and its own application data. Background restrictions can interrupt availability, so check messages and node state while trading. Do not assume the phone is synchronized with a separate desktop installation or that a desktop backup includes it.

## Bisq Connect for Android and iOS

Connect is a thin client controlling a **trusted Bisq 2 node** running elsewhere: your desktop, a headless node or an operator you trust. The node must remain running and compatible; closing the phone app does not make the backend stop.

The official README links Android distribution and iOS TestFlight. Channels and platform minimums can change; use its current official download links rather than an old third-party package. The trusted-node release notes for 2.1.15.0 state that nodes need 2.1.15 for current trading and describe compatibility with Connect 0.12.0. The phone and backend have separate version numbers.

## Pairing and backup safety

**The pairing QR/token is a credential granting control of trades.** Keep it private. Do not expose the pairing interface/API to an untrusted or public network; use the documented LAN/Tor route.

When self-hosted, the backend owns the trade state and needs a [protected application backup](../backup-and-recovery/). A thin client does not remove that requirement. Using a third-party backend places account/trade data and operational control with that operator; trust is part of that choice.

## Protocol availability

These apps provide Bisq Easy access. Do not infer public MuSig support from an old “future mobile platform” paragraph. The standard desktop MuSig activation remains developer-gated in the checked release. Review actual app/backend release compatibility before pairing or trading.

<details>
<summary>Sources and checks</summary>

[README.md (pinned source)](https://github.com/bisq-network/bisq-mobile/blob/9b2a6edb90703ed996239b7335efbbd166637844/README.md) · [anode_0.17.0 release](https://github.com/bisq-network/bisq-mobile/releases/tag/anode_0.17.0) · [trusted-node_2.1.15.0 release](https://github.com/bisq-network/bisq-mobile/releases/tag/trusted-node_2.1.15.0).

Fresh official release API and pinned mobile README checked. Mobile installation/pairing and app-store availability were not exercised.

Adapted from **Bisq 2 mobile applications**, revision 4117 (2026-04-11). [Exact source](../../wiki-source/bisq-2-mobile-applications.wiki.txt) · [Attribution and revision metadata](../../wiki-source/bisq-2-mobile-applications.json).

</details>
