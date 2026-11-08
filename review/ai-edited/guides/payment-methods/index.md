---
title: "Payment methods"
description: "Compare payment methods, current client trade periods and signing requirements."
---

*Checked 7 November 2026 · Bisq 1 v1.10.11.*

Choose a payment method you and your peer can actually use. Bisq records the agreed method; **fiat and altcoin transfers take place outside the Bisq application**. A method name in an offer is not an integration with your bank and is not a promise of provider access.

## Choose by risk and practical constraints

Compare chargeback risk, country/currency access, privacy, verifiable receipts, available balance, fees and the bank's sending limits. Some methods can reverse funds after BTC has been released. Do not assume “instant” means irreversible or that an old account cannot be compromised.

[Create the payment account](../bisq-1/payment-accounts/) before taking an offer. For chargeback-sensitive methods, read [account limits and signing](account-limits/). For bank holds, returns and evidence, use [fiat payment problems](fiat-problems/).

## Bisq 1 payment-method reference

The periods below are **current client trade periods**, not guaranteed bank settlement times. Higher BTC buying limits for signing-sensitive methods depend on currency and signing age. Amounts are calculated using current protocol/DAO limits and account state; fixed BTC caps from older wiki tables have been removed.

| Method | Client trade period | Signing schedule |
| --- | --- | --- |
| [ACH Transfer](ach/) | 5 days | No signing schedule for this method |
| [Amazon eGift card](amazon-egift-card/) | 1 day | No signing schedule for this method |
| [Bizum](bizum/) | 1 day | No signing schedule for this method |
| [Capitual](capitual/) | 1 day | No signing schedule for this method |
| [CelPay](celpay/) | 1 day | No signing schedule for this method |
| [Domestic Wire Transfer](domestic-wire/) | 3 days | No signing schedule for this method |
| [Face-to-face (payment method)](face-to-face/) | 4 days | No signing schedule for this method |
| [Faster Payments](faster-payments/) | 1 day | No signing schedule for this method |
| [Faster Payments System SBP](sbp/) | 1 day | No signing schedule for this method |
| [IMPS](imps/) | 1 day | No signing schedule for this method |
| [Monese](monese/) | 1 day | No signing schedule for this method |
| [NEFT](neft/) | 1 day | No signing schedule for this method |
| [Nequi](nequi/) | 1 day | No signing schedule for this method |
| [Paxum](paxum/) | 1 day | No signing schedule for this method |
| [PayTM](paytm/) | 1 day | No signing schedule for this method |
| [Paysera](paysera/) | 1 day | No signing schedule for this method |
| [Pix](pix/) | 1 day | No signing schedule for this method |
| [RTGS](rtgs/) | 1 day | No signing schedule for this method |
| [Satispay](satispay/) | 1 day | No signing schedule for this method |
| [SEPA](sepa/) | 6 days | Signing-sensitive |
| [SEPA Instant](sepa-instant/) | 1 day | Signing-sensitive |
| [Revolut](revolut/) | 1 day | Signing-sensitive |
| [SWIFT](swift/) | 7 days | No signing schedule for this method |
| [Strike](strike/) | 1 day | No signing schedule for this method |
| [Tikkie](tikkie/) | 1 day | No signing schedule for this method |
| [UPI](upi/) | 1 day | No signing schedule for this method |
| [US Postal Money Order](us-postal-money-order/) | 8 days | No signing schedule for this method |
| [Wise](wise/) | 4 days | No signing schedule for this method |
| [Wise-USD](wise-usd/) | 4 days | No signing schedule for this method |
| [Zelle](zelle/) | 4 days | Signing-sensitive |
| [Cash by mail](cash-by-mail/) | 8 days | No signing schedule for this method |

The client also registers Advanced Cash, Alipay, Australian PayID, Cash Deposit, HalCash, Interac e-Transfer, Japan Bank, MercadoPago, MoneyBeam, MoneyGram, National Bank Transfer, Perfect Money, Popmoney, PromptPay, Same Bank, Specific Banks, Swish, Uphold, WeChat Pay and Western Union. Registration is distinct from whether the provider is still operating or admitting your account. Use the current form and check provider usability before offering one of these methods.

## Discontinued and incomplete entries

- [Verse](verse/): explicitly deprecated and excluded from the new-account selector in this release.
- [CelPay](celpay/): a client entry remains, but Celsius's app closed; retained for understanding old records.
- [PayTM](paytm/): distinguish the restricted Paytm Payments Bank wallet from the Paytm app's other payment rails.
- [Skrill](skrill/): the wiki was an unfinished template, and no Skrill method is registered in the checked release.

Venmo and Cash App have deprecated legacy IDs, with chargeback-risk comments in the code; they are not ordinary current selectable methods. PayPal is not in the checked registration list. Do not improvise unsupported off-platform settlement to bypass an offer's method.

## Altcoins and Bisq Easy

[Altcoin accounts](altcoins/) use a one-day window, or **one hour** for Altcoins Instant. Read the coin-specific proof requirements for [Monero](monero/), [Liquid Bitcoin](liquid-bitcoin/) and [GRIN](grin/).

Bisq Easy uses a different reputation-based protocol. Its payment-method negotiation does not import Bisq 1's signing or escrow rules. Read the [Bisq Easy safety guide](../bisq-2/bisq-easy-safety/).

## Regional overview illustrations

These recovered diagrams explain the kinds of EUR/USD payment choices the wiki discussed. Their providers and numerical limits are historical; use the release-checked table above and the actual account form for a trade.
<figure><a href="../media/wiki/2200cb7e4e0e0b35eb276a25047fee62559487ee2c8deedf35458c186bc9adcb.png"><img src="../media/wiki/2200cb7e4e0e0b35eb276a25047fee62559487ee2c8deedf35458c186bc9adcb.png" alt="EUR payment-method overview" loading="lazy" /></a><figcaption>EUR payment-method overview. Historical illustration; current screens and values may differ.</figcaption></figure>

<figure><a href="../media/wiki/88410f93192e7e3b20e5f65179f304332e8e8728b7431b14700fe7cfd6c9b5ef.png"><img src="../media/wiki/88410f93192e7e3b20e5f65179f304332e8e8728b7431b14700fe7cfd6c9b5ef.png" alt="USD payment-method overview" loading="lazy" /></a><figcaption>USD payment-method overview. Historical illustration; current screens and values may differ.</figcaption></figure>

<details>
<summary>Sources and checks</summary>

[PaymentMethod.java (pinned source)](https://github.com/bisq-network/bisq/blob/ea9d5dff90c99ac462f2b0a7bf9ef92683956619/core/src/main/java/bisq/core/payment/payload/PaymentMethod.java#L210-L300) · [PaymentMethod.java (pinned source)](https://github.com/bisq-network/bisq/blob/ea9d5dff90c99ac462f2b0a7bf9ef92683956619/core/src/main/java/bisq/core/payment/payload/PaymentMethod.java#L490-L507) · [AccountAgeWitnessService.java (pinned source)](https://github.com/bisq-network/bisq/blob/ea9d5dff90c99ac462f2b0a7bf9ef92683956619/core/src/main/java/bisq/core/account/witness/AccountAgeWitnessService.java#L475-L515) · [FiatAccountsView.java (pinned source)](https://github.com/bisq-network/bisq/blob/ea9d5dff90c99ac462f2b0a7bf9ef92683956619/desktop/src/main/java/bisq/desktop/main/account/content/fiataccounts/FiatAccountsView.java#L458-L460).

Fresh latest-release API check confirms v1.10.11. Registration, duration and signing classification checked in immutable release source. Provider admission and live transfers were not tested.

Adapted from **Payment methods**, revision 4146 (2026-05-29). [Exact source](../wiki-source/payment-methods.wiki.txt) · [Attribution and revision metadata](../wiki-source/payment-methods.json).

Adapted from **Payment methods/en**, revision 1634 (2020-07-12). [Exact source](../wiki-source/payment-methods-en.wiki.txt) · [Attribution and revision metadata](../wiki-source/payment-methods-en.json).

</details>
