---
title: "Bisq 2 mobile applications"
slug: "wiki/bisq-2-mobile-applications"
tableOfContents: false
---

<nav data-pagefind-ignore class="wiki-source-toc" aria-label="Article sections"><details open><summary>On this page</summary><ul><li><a href="#bisq-easy-mobile">Bisq Easy Mobile</a></li><li><a href="#bisq-connect">Bisq Connect</a></li><li><a href="#notes">Notes</a></li><li><a href="#future-development">Future Development</a></li></ul></details></nav>

<div class="wiki-recovered-article" lang="en">

The mobile ecosystem of Bisq 2 allows access to the [Bisq Easy](../bisq-easy/) protocol from a smartphone, via two applications:

- Bisq Easy Mobile (Android only)
- Bisq Connect (Android and iOS)

<span class="wiki-legacy-anchor" id="Bisq_Easy_Mobile" aria-hidden="true">
</span>

## Bisq Easy Mobile {#bisq-easy-mobile}

Bisq Easy Mobile is a full Bisq Easy node running on your Android device. It features the complete p2p network stack and connects with its own onion address.

It provides the same privacy and security as the Bisq 2 desktop application.

It is primarily suited for buyers who:

- want to buy their first sats
- prefer not to use a desktop computer

Pros:

- Runs a full Bisq Easy node
- Does not require a separate device

Cons:

- Available for Android only
- Higher battery, bandwidth, and resource usage
- App may lose connectivity when moved to background, and reconnection can take time
- No synchronization or interoperability with a desktop instance
- Users must manually manage backups

<span class="wiki-legacy-anchor" id="Bisq_Connect" aria-hidden="true">
</span>

## Bisq Connect {#bisq-connect}

Bisq Connect is a lightweight companion app that allows you to remotely access and control a Bisq 2 node running elsewhere.

It is available for both Android and iOS (via TestFlight).

Instead of running a node locally, the app connects to a backend node, which can be:

- your own Bisq 2 desktop application
- a Bisq 2 node running on a headless machine or VPS
- a node operated by a trusted third party

The mobile app acts as a remote interface, allowing you to monitor and manage your node from your phone.

Features:

- Pairing via QR code
- Real-time market data
- Push notifications
- Private P2P messaging
- Built-in Tor support
- Open-source and auditable

Pros:

- Available on both Android and iOS
- Low resource and battery usage
- Seamless access to the same data across devices when self-hosted
- No need for mobile backups (data is stored on the backend node)
- Mobile app can be closed without affecting node operation

Cons:

- Requires a running backend node
- Using a third-party node requires trust in the operator, as all data is hosted on that node

<span class="wiki-legacy-anchor" id="Notes" aria-hidden="true">
</span>

## Notes {#notes}

On iOS, Bisq Connect is currently distributed via Apple TestFlight and requires iOS 16.0 or higher.

TestFlight builds expire after 90 days, but updates are released regularly.

<span class="wiki-legacy-anchor" id="Future_Development" aria-hidden="true">
</span>

## Future Development {#future-development}

Bisq Easy Mobile will not support the upcoming MuSig protocol.

Bisq Connect is the likely platform for supporting new protocols, depending on development priorities and user demand.

</div>
