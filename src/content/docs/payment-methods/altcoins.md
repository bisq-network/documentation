---
title: "Altcoin payment accounts"
description: "Create crypto payment accounts and understand ordinary versus one-hour Instant trades."
---

*Checked 7 November 2026 · Bisq 1 v1.10.11.*

An altcoin payment account settles the non-BTC side of a Bisq 1 trade using another cryptocurrency. Use only a coin, wallet and market supported by the current client; the old claim that any altcoin could be added was theoretical, not an instruction to bypass supported assets.

## Create an altcoin account

Open **Account → Altcoin accounts → Add new account**, choose the asset and enter its required receiving information. Read the coin-specific pop-ups before saving. The wallet must support the proof needed if a payment is disputed.

## Ordinary versus Instant

Current client registration gives ordinary Altcoins a **one-day** trade period and Altcoins Instant **one hour**. Instant means the sender must pay and the recipient must check/acknowledge promptly. Stay at the computer while an Instant offer is available; disable offers under **Portfolio → My Open Offers** before going away.

<figure><a href="../../media/wiki/56845df3c24c031a28167b2cf01a160b540066e8800cbdbc3b094b256f2c24da.png"><img src="../../media/wiki/56845df3c24c031a28167b2cf01a160b540066e8800cbdbc3b094b256f2c24da.png" alt="Altcoins Instant account option" loading="lazy" /></a><figcaption>Altcoins Instant account option. Historical illustration; current screens and values may differ.</figcaption></figure>

The shorter period is not a different asset or wallet. Do not use it if confirmation times, wallet interaction or your availability make an hour unrealistic. Crypto/non-chargeback trades do not use the fiat signing schedule, but protocol and user-selected limits still apply. The release clamps protocol amounts at **0.25 BTC**, but the actual client allowance and your personal limit can be lower. The old 0.5/2 BTC values are superseded.

## Confidential-transaction proof

- [Monero](../monero/): retain transaction ID, transaction key and destination address.
- [L-BTC](../liquid-bitcoin/): the receiver needs access to the relevant blinding key.
- [GRIN](../grin/): choose a wallet capable of creating/verifying the required payment proof.

Do not delete or restore the external wallet until the trade and any dispute are complete. A blockchain transaction ID alone may not reveal a confidential asset's recipient or amount.

## New assets and atomic swaps

The source links a proposal placing new-asset additions on hold; that old policy discussion is not proof of the present supported-asset list. Check the current client's market list and contribution process.

Ordinary altcoin trades are not atomic swaps. [BSQ swaps](../../bisq-1/bsq-trading/#receive-bsq-and-keep-it-colored) exchange BTC and BSQ through their separate Bitcoin transaction protocol; a future XMR/Liquid swap proposal does not change the current payment workflow.

<details>
<summary>Sources and checks</summary>

[PaymentMethod.java (pinned source)](https://github.com/bisq-network/bisq/blob/ea9d5dff90c99ac462f2b0a7bf9ef92683956619/core/src/main/java/bisq/core/payment/payload/PaymentMethod.java#L290-L300) · [AccountAgeWitnessService.java (pinned source)](https://github.com/bisq-network/bisq/blob/ea9d5dff90c99ac462f2b0a7bf9ef92683956619/core/src/main/java/bisq/core/account/witness/AccountAgeWitnessService.java#L475-L493).

Current client periods and crypto-limit classification checked. Specific external-wallet proof procedures are covered separately.

Adapted from **Altcoins**, revision 2164 (2021-04-16). [Exact source](../../wiki-source/altcoins.wiki.txt) · [Attribution and revision metadata](../../wiki-source/altcoins.json).

Adapted from **Altcoins Instant**, revision 2163 (2021-04-16). [Exact source](../../wiki-source/altcoins-instant.wiki.txt) · [Attribution and revision metadata](../../wiki-source/altcoins-instant.json).

</details>
