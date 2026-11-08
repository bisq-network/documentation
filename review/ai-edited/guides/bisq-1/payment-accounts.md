---
title: "Set up a payment account"
description: "Choose a supported payment method and understand signing, limits and backup requirements."
---

*Bisq 1 v1.10.11 · Checked 7 November 2026.*

A Bisq payment account records how you will pay or receive the other side of a bitcoin trade. Your bank or payment provider handles that transfer outside Bisq. This guide covers **national-currency accounts in Bisq 1**; altcoin accounts have a separate screen and requirements.

## Add the account you will use

1. Open **Account → National currency accounts** and choose **Add new account**.
2. Select the payment method. Confirm that it supports your country and currency and that you can use it within the trade period.
3. Enter the required details exactly as they appear at your bank or provider. Use an account you are entitled to trade from; do not substitute a friend's account or a different payer during a trade.
4. Read any method-specific warnings, give the account a recognizable local name, and save it.
5. [Back up your application data](../backup-and-recovery/) after creating or changing accounts.

<figure><a href="../../media/wiki/e9337d10a4354a502d789e2310f0c3e78dc24c5c83adbf078f5b186070ecf489.png"><img src="../../media/wiki/e9337d10a4354a502d789e2310f0c3e78dc24c5c83adbf078f5b186070ecf489.png" alt="National currency payment-account setup form" loading="lazy" /></a><figcaption>Historical account setup; available methods and required fields may differ.</figcaption></figure>

Return to **Buy BTC** or **Sell BTC** and select the account. An offer is usable only when its method, currency, amount and account restrictions are compatible. Review the actual offer instead of assuming that two similarly named payment services are interchangeable.

## Account fields and offer availability

The account name is a local organizational label. The bank/provider holder name and payment details must still be accurate. Do not change the generated salt casually: it participates in the account-age witness. Saved payment details generally require creating a new account to change; keep the old backup and understand the effect on age/signing first.

<figure><a href="../../media/wiki/ac4951d4e10bd9ad03dd284a8b475e00018ff41ed51bea312de8989925d765b7.png"><img src="../../media/wiki/ac4951d4e10bd9ad03dd284a8b475e00018ff41ed51bea312de8989925d765b7.png" alt="Offers disabled before adding a compatible payment account" loading="lazy" /></a><figcaption>Offers disabled before adding a compatible payment account. Historical illustration; current screens and values may differ.</figcaption></figure>

<figure><a href="../../media/wiki/b438c0e73f171e2e1c5cfe2bdb92e4c166f8b1dd0bdd67c718662d3a64a75510.png"><img src="../../media/wiki/b438c0e73f171e2e1c5cfe2bdb92e4c166f8b1dd0bdd67c718662d3a64a75510.png" alt="Compatible offers available after account setup" loading="lazy" /></a><figcaption>Compatible offers available after account setup. Historical illustration; current screens and values may differ.</figcaption></figure>

## Read the limit shown in Bisq

There is no single limit that applies to every account and trade. The payment method, currency, buying/selling direction, account-signing state and the offer can affect what is available. Use the amount allowed by your current client; older wiki tables may contain superseded values.

Some payment methods with chargeback risk require account signing for higher **buying** limits. Merely waiting after creating an unsigned account does not make it signed. A qualifying completed purchase from an eligible signed seller can sign it; the client's signing indicator explains the remaining restrictions.

An older account or a signed account is not a guarantee against fraud. Keep the payment and receipt checks in the [first-trade guide](../first-trade/) even when a peer has a signing badge.

## Keep account details and identity together

Use the account export as an additional record, and keep the full application backup. Restoring age/signing status depends on matching account details and the original signing identity; copying only the visible account fields may not restore it.

Do not replace identity-key files while offers, trades or disputes are active. If you have only an account export, follow the [recovery guide](../backup-and-recovery/) and get help before combining it with another installation.

For method-specific conditions, see the [payment-method reference](../../payment-methods/) and [limits and signing](../../payment-methods/account-limits/). For crypto settlement, use [altcoin accounts](../../payment-methods/altcoins/).

For a trade already in progress, use the account recorded in that trade. If the requested destination, account holder or payment method changes unexpectedly, pause and seek [dispute help](../dispute-help/) before sending or releasing funds.

<details>
<summary>Sources and review notes</summary>

- [Current account screens and labels](https://github.com/bisq-network/bisq/blob/ea9d5dff90c99ac462f2b0a7bf9ef92683956619/core/src/main/resources/i18n/displayStrings.properties#L1725-L1732); [account creation implementation](https://github.com/bisq-network/bisq/blob/ea9d5dff90c99ac462f2b0a7bf9ef92683956619/desktop/src/main/java/bisq/desktop/main/account/content/fiataccounts/FiatAccountsView.java).
- [Current trade-limit calculation](https://github.com/bisq-network/bisq/blob/ea9d5dff90c99ac462f2b0a7bf9ef92683956619/core/src/main/java/bisq/core/account/witness/AccountAgeWitnessService.java#L475-L493) and [signing UI](https://github.com/bisq-network/bisq/blob/ea9d5dff90c99ac462f2b0a7bf9ef92683956619/core/src/main/resources/i18n/displayStrings.properties#L404-L438).
- [Historical account creation](../../wiki-source/creating-a-payment-account.wiki.txt), [account limits](../../payment-methods/account-limits/) and [restoring application data](../../wiki-source/restoring-application-data.wiki.txt).

These instructions were checked against release sources; a full desktop walkthrough remains pending.

</details>
