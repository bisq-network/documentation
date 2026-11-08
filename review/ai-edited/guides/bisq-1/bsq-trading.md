---
title: "Buy and sell BSQ and pay trading fees"
description: "Exchange BTC and BSQ through swaps, protect colored outputs and choose a fee currency."
---

BSQ is used for DAO governance and can pay Bisq 1 trading fees. It is optional for ordinary BTC trades when you choose BTC fees. Its colored-coin rules mean it must be handled differently from ordinary bitcoin.

## Buy BSQ with BTC

Open the **BSQ/BTC** market, choose **Buy BSQ**, then select a BSQ swap offer. Review the amount, exchange rate, available wallet funds and fees. Fund the BTC side if needed, then confirm only after checking the direction and amounts. Wait for the Bitcoin transaction's confirmation and verify the BSQ receipt in the wallet.

<figure><a href="../../media/wiki/f526f0ba331b39aa39e0cf1d9e32968094da3afb68fefb2a575cb0e511689ac8.png"><img src="../../media/wiki/f526f0ba331b39aa39e0cf1d9e32968094da3afb68fefb2a575cb0e511689ac8.png" alt="Bisq-v1-buy-bsq-offer-book" loading="lazy" /></a><figcaption>Historical illustration from Trading BSQ; current controls may differ.</figcaption></figure>

A BSQ swap exchanges both assets in one Bitcoin transaction. Atomicity prevents one asset leg settling by itself; it does not mean that broadcasting or confirmation can never be delayed or fail. A submitted swap is not complete simply because a tutorial says “instant.”

## Sell BSQ for BTC

Choose **Sell BSQ** in the same market, review a matching offer, and confirm the amount and price. When the transaction confirms, verify the **BTC** received and BSQ spent. The old short sell guide incorrectly said to check for received BSQ; that would reverse the result of this trade.

<figure><a href="../../media/wiki/cff1f2ee8b422b0734b5e3ae81336fa94bf9a5aec9e24c028ed1ab7e9eae516e.png"><img src="../../media/wiki/cff1f2ee8b422b0734b5e3ae81336fa94bf9a5aec9e24c028ed1ab7e9eae516e.png" alt="Bisq-v1-sell-bsq-offer-book" loading="lazy" /></a><figcaption>Historical illustration from Trading BSQ; current controls may differ.</figcaption></figure>

## Receive BSQ and keep it colored

Find your address under **DAO → BSQ wallet → Receive**. Use the BSQ address and wallet controls; do not send BSQ to an ordinary Bitcoin exchange/deposit address. Importing its seed into a generic wallet and spending the underlying satoshis can destroy the BSQ value.

<figure><a href="../../media/wiki/cd2f8d5041301a65e4af02606e65d5e66a63a55d84031b386b4f19bbfe7a55bd.png"><img src="../../media/wiki/cd2f8d5041301a65e4af02606e65d5e66a63a55d84031b386b4f19bbfe7a55bd.png" alt="Get-bsq-address" loading="lazy" /></a><figcaption>Historical illustration from Trading BSQ; current controls may differ.</figcaption></figure>

BSQ swaps replaced the older manual altcoin-style BSQ payment-account flow introduced before v1.8.0. The old “create BSQ payment account, then transfer BSQ manually” screenshots explain earlier interfaces, not the preferred current swap procedure.

## Choose BSQ for trading fees

When making or taking a classic BTC offer, compare the **BTC/BSQ trading-fee** choices and select BSQ if it suits you and the wallet has sufficient spendable BSQ. You still need BTC for mining fees and any security deposit. Paying a trading fee in BSQ is not the same as trading BSQ itself.

<figure><a href="../../media/wiki/725d165a579ccd71c133d9f77f6e4e00f005af29387ae352f6a1de4ff7cbe85c.png"><img src="../../media/wiki/725d165a579ccd71c133d9f77f6e4e00f005af29387ae352f6a1de4ff7cbe85c.png" alt="trading-fee-toggle" loading="lazy" /></a><figcaption>Historical illustration from Paying trading fees with BSQ; current controls may differ.</figcaption></figure>

The recovered articles disagree on the intended discount (25% versus 50%) and include stale fixed fee tables. Use the actual review screen; a discount's fiat value moves with BSQ/BTC prices. BSQ used for fees is burned, while approved DAO compensation/reimbursement can issue BSQ; see [the DAO overview](../../dao/overview/).



<details>
<summary>Earlier interface illustrations</summary>

These recovered screenshots show the controls discussed in this section. Prices, balances, limits, account identities and software versions in them are historical examples; follow the current instructions above.

<figure><a href="../../media/wiki/947a0fc1f1ebf1fbad5f08358488c1d090e15be59280f19f642b66fd1f39bed4.png"><img src="../../media/wiki/947a0fc1f1ebf1fbad5f08358488c1d090e15be59280f19f642b66fd1f39bed4.png" alt="Bsq-wallet-address" loading="lazy" /></a><figcaption>Historical Paying trading fees with BSQ illustration.</figcaption></figure>

<figure><a href="../../media/wiki/9f7c07914e1b088185664e869acafd502dbfbcd77804a648bbddecaaf2653e84.png"><img src="../../media/wiki/9f7c07914e1b088185664e869acafd502dbfbcd77804a648bbddecaaf2653e84.png" alt="Add-new-bsq-account" loading="lazy" /></a><figcaption>Historical Paying trading fees with BSQ illustration. This is the superseded manual BSQ payment-account workflow, retained to explain old instructions; use BSQ swaps now.</figcaption></figure>

<figure><a href="../../media/wiki/74ae511539a1abbd019a7ebc8a6465e0146d97548784831a2c9ac5706b1a07eb.png"><img src="../../media/wiki/74ae511539a1abbd019a7ebc8a6465e0146d97548784831a2c9ac5706b1a07eb.png" alt="Bsq-buy-offers" loading="lazy" /></a><figcaption>Historical Paying trading fees with BSQ illustration. This is the superseded manual BSQ payment-account workflow, retained to explain old instructions; use BSQ swaps now.</figcaption></figure>

</details>

## How fee parameters are updated

Fee changes require DAO parameter proposals and accepted voting results, not an edit to a wiki table. The historical maintainer procedure checks a 30-day weighted BSQ/USD price and a current BTC/USD price before the proposal deadline, records proposed fees publicly, submits the matching DAO parameter transactions, then communicates the accepted result.

Its specific 40–60% tolerance band around a 50% target and “three days before the proposal phase ends” timing describe that documented policy, not a newly verified current policy. A maintainer must check the current proposal discussion and DAO parameters before reusing those numbers. Keep the calculation, public proposal, transaction IDs and final result consistent; a proposed fee is not an enacted fee.

<details>
<summary>Sources and scope</summary>

- [Trading BSQ — source revision 2025-04-23](../../wiki-source/trading-bsq.wiki.txt).
- [How to buy BSQ on Bisq — source revision 2022-02-24](../../wiki-source/how-to-buy-bsq-on-bisq.wiki.txt).
- [How to sell BSQ on Bisq — source revision 2022-02-24](../../wiki-source/how-to-sell-bsq-on-bisq.wiki.txt).
- [Paying trading fees with BSQ — source revision 2021-04-23](../../wiki-source/paying-trading-fees-with-bsq.wiki.txt).
- [Updating BSQ trading fees — source revision 2025-08-26](../../wiki-source/updating-bsq-trading-fees.wiki.txt).
- [Current BSQ swap interface strings](https://github.com/bisq-network/bisq/blob/ea9d5dff90c99ac462f2b0a7bf9ef92683956619/core/src/main/resources/i18n/displayStrings.properties).
- [Historical fee policy proposal](https://github.com/bisq-network/proposals/issues/365).

Sources reviewed 7 November 2026. Current Bisq 1 code references are pinned to v1.10.11.

</details>
