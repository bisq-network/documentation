---
title: "Receive Bisq 1 mobile notifications"
description: "Pair the Bisq 1 notification companion and understand alert delivery and privacy limits."
---

Bisq 1 can send optional alerts to a companion notifications app while the desktop application remains running. This is different from a mobile trading application; a notification is not proof of payment and cannot replace checking the trade on desktop.

## Pair the companion app

The historical companion projects are [Android](https://github.com/bisq-network/bisqremote_Android) and [iOS](https://github.com/bisq-network/bisqremote_iOS). Store availability, current OS compatibility and end-to-end delivery have not been confirmed here. The source article reports a degraded state in which token pairing and generic notifications work, but tapping an alert returns to pairing rather than showing details.

On the phone, generate a pairing token. In desktop Bisq, open **Account → Notifications**, then scan the QR code or choose the manual/no-webcam option and paste the token. Transfer it privately: it contains the notification encryption key and device token. Check the desktop's pairing result and test delivery before relying on alerts.

## Choose useful alerts

- **Trade messages:** action needed, an offer taken, or a dispute message. Dispute alerts do not carry the full dispute conversation; open desktop Bisq.
- **Offer alerts:** choose a payment account, buy/sell direction and distance from market price. If buying BTC, watch other traders' sell offers; if selling, watch their buy offers. Review or remove rules under **Manage offer alerts**.
- **Price alerts:** choose currency plus upper/lower thresholds. The historical behavior removes an alert once triggered to avoid repeated notifications; check and recreate it when needed.

Keep the desktop online and respond to trade/dispute obligations even if no push arrives. Do not interpret a buyer's “payment started” alert as actual bank receipt.

## How notification delivery affects privacy

<figure><a href="../../media/wiki/effae240a60f2b48ef944e277dc3adbbf51a1af713d5ec3c4f5dc3ef0f437bfb.png"><img src="../../media/wiki/effae240a60f2b48ef944e277dc3adbbf51a1af713d5ec3c4f5dc3ef0f437bfb.png" alt="Mobile-notifications-architecture" loading="lazy" /></a><figcaption>Historical illustration from Mobile notifications; current controls may differ.</figcaption></figure>

The phone supplies a device token and encryption key. Desktop encrypts the payload and sends it over Tor to a relay, which forwards it through Apple or Google's push service. Current desktop code still implements this relay/encryption model. The pairing token includes platform and phone descriptors as well as the sensitive key/token values.

Push providers can associate a device with receipt of Bisq notifications even though the application encrypts the content. The historical assertion that the relay stores nothing is not an independently verified current server-retention policy. Treat metadata exposure and delivery availability separately from message encryption. Notifications remain optional; disabling them does not disable desktop trading.

<details>
<summary>Sources and scope</summary>

- [Mobile notifications — source revision 2022-09-29](../../wiki-source/mobile-notifications.wiki.txt).
- [Current desktop notification service](https://github.com/bisq-network/bisq/blob/ea9d5dff90c99ac462f2b0a7bf9ef92683956619/core/src/main/java/bisq/core/notifications/MobileNotificationService.java).
- [Companion protocol specification](https://github.com/bisq-network/bisqremote/wiki/Specification).

Sources reviewed 7 November 2026. Current Bisq 1 code references are pinned to v1.10.11.

</details>
