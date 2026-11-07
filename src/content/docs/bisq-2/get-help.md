---
title: "Get help with Bisq 2"
description: "Use the right support channel, request mediation, and share useful evidence safely."
---

*Bisq 2 v2.1.15 · Checked 7 November 2026.*

Use Bisq 2's **Support** area for general questions and the trade's **Request mediation** action for a problem with a specific Bisq Easy trade. Bisq 1 has a [different dispute process](../../bisq-1/dispute-help/).

## For a trade problem

1. Open the affected trade in **Bisq Easy → Open trades**. Explain the problem in its trade chat and preserve the relevant payment or transaction evidence.
2. If you cannot resolve it with the other trader, select **Request mediation** and confirm the request.
3. Wait for a mediator to join the trade chat. Continue communicating there and answer requests for relevant evidence.

The request may wait until a mediator is online. If none is available, or the application says mediation cannot be opened for that trade, use the support chat rather than repeatedly sending money or starting a replacement trade.

A mediator helps the parties reach a cooperative resolution; **they cannot enforce an outcome or guarantee recovery**. Bisq Easy has no Bisq 1 multisig arbitration payout. Follow [the trading safety rules](../bisq-easy-safety/) while the case is open, including checking messages and responding within 24 hours.

## For installation or general questions

Open **Support** and choose the relevant chat room. If Bisq cannot start, use the [Bisq community on Matrix](https://bisq.chat). Obtain the community link from a trusted official source and be cautious of unsolicited private messages claiming to be support.

Describe the problem with enough detail to reproduce it:

- Your Bisq version and operating system; **Support → Resources → Local version info** shows the application version and build commit.
- What you tried, what you expected, and the exact error message.
- Whether money was already sent, which payment network was used, and what the application currently shows. Keep private banking details out of public chat.

## Share evidence safely

Never provide seed words, private keys, passwords, or a full application backup. The backup can contain sensitive account material and external Tor credentials. If logs are requested, review them for private information and use an appropriate private channel agreed with the assigned helper.

Do not delete application data, replace identity files, or attempt wallet resets as a first troubleshooting step. [Make a backup](../backup-and-recovery/) and obtain guidance for your exact situation. Keep trade communication in the app whenever possible so the mediator can follow its history.

<details>
<summary>Sources</summary>

[Mediation request UI](https://github.com/bisq-network/bisq2/blob/cfe8ab251f2b6579f29e9955036afc33ba36861e/apps/desktop/desktop/src/main/java/bisq/desktop/main/content/bisq_easy/open_trades/trade_state/TradeStateController.java#L320-L350) · [Current mediation messages](https://github.com/bisq-network/bisq2/blob/cfe8ab251f2b6579f29e9955036afc33ba36861e/i18n/src/main/resources/bisq_easy.properties#L1047-L1055) · [Support resources](https://github.com/bisq-network/bisq2/blob/cfe8ab251f2b6579f29e9955036afc33ba36861e/i18n/src/main/resources/support.properties#L37-L70) · [Mediator limits](https://github.com/bisq-network/bisq2/blob/cfe8ab251f2b6579f29e9955036afc33ba36861e/i18n/src/main/resources/bisq_easy.properties#L436)

</details>
