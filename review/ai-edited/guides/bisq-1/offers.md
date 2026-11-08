---
title: "Make, take and clone offers"
description: "Make, take and clone offers, with EUR, CAD and USDT examples and the correct payment order."
---

Choose whether you want to buy or sell **bitcoin**, then select the counter-currency and a compatible [payment account](../payment-accounts/). Making an offer lets you set its terms and wait for a taker; taking accepts an existing maker's terms. Neither guarantees a willing counterparty or instant confirmation.

## Take an offer in EUR or CAD

Select **EUR — Euro** or **CAD — Canadian dollar** in the market, then **Buy BTC**. Choose an offer compatible with your real payment method and account limits. Check minimum/maximum amount, price, premium, deposit, fees, trade period and any additional payment terms before funding.

<figure><a href="../../media/wiki/b438c0e73f171e2e1c5cfe2bdb92e4c166f8b1dd0bdd67c718662d3a64a75510.png"><img src="../../media/wiki/b438c0e73f171e2e1c5cfe2bdb92e4c166f8b1dd0bdd67c718662d3a64a75510.png" alt="BuyBTC-accountenabled" loading="lazy" /></a><figcaption>Historical illustration from Taking an offer; current controls may differ.</figcaption></figure>

Fund the amount shown by the review screen from the Bisq wallet or the displayed trade-wallet address. The former avoids a new external transfer; the latter requires checking the address, network and funding confirmation. Review again before **Confirm: take offer**. An accepted trade is a commitment, not an offer you can cancel casually without dispute consequences.

Wait for the deposit confirmation and the application's payment prompt. Send the agreed currency using the exact agreed account, then click **Payment started** once. The button reports your action; it does not initiate a bank transfer. Keep proof of payment, follow the trade timer, and wait for the seller to verify receipt. Use [the first-trade guide](../first-trade/) for the complete buyer/seller sequence.



<details>
<summary>Earlier interface illustrations</summary>

These recovered screenshots show the controls discussed in this section. Prices, balances, limits, account identities and software versions in them are historical examples; follow the current instructions above.

<figure><a href="../../media/wiki/9ad522ef3a057a46bb7ea8a73927724bc778ee222ae7c60566fd84b4966c6d93.png"><img src="../../media/wiki/9ad522ef3a057a46bb7ea8a73927724bc778ee222ae7c60566fd84b4966c6d93.png" alt="ConfirmOffer" loading="lazy" /></a><figcaption>Historical Taking an offer illustration.</figcaption></figure>

<figure><a href="../../media/wiki/810809702e5d6cac26766f0d55987126164e34a314637f3620fe0b6d161ca338.png"><img src="../../media/wiki/810809702e5d6cac26766f0d55987126164e34a314637f3620fe0b6d161ca338.png" alt="SellersPaymentDetails" loading="lazy" /></a><figcaption>Historical Taking an offer illustration.</figcaption></figure>

<figure><a href="../../media/wiki/f5c57d36da319f0cacff06df8a6d9a52f1e1778ff7e8b60d50a1030fce0c7fb2.png"><img src="../../media/wiki/f5c57d36da319f0cacff06df8a6d9a52f1e1778ff7e8b60d50a1030fce0c7fb2.png" alt="Trade-remainingtime" loading="lazy" /></a><figcaption>Historical Taking an offer illustration.</figcaption></figure>

<figure><a href="../../media/wiki/a6373dd5b22be21a1452b0cb4704477bda86d94a8520df613947b586a612d017.png"><img src="../../media/wiki/a6373dd5b22be21a1452b0cb4704477bda86d94a8520df613947b586a612d017.png" alt="PaymentStarted" loading="lazy" /></a><figcaption>Historical Taking an offer illustration.</figcaption></figure>

<figure><a href="../../media/wiki/b497349c15a78678d7480d1467170443c255f116d14ab1939ab8c951fcb24ee9.png"><img src="../../media/wiki/b497349c15a78678d7480d1467170443c255f116d14ab1939ab8c951fcb24ee9.png" alt="Movefundsaftertrade" loading="lazy" /></a><figcaption>Historical Taking an offer illustration.</figcaption></figure>

</details>

## Make an offer to buy BTC with EUR

Select EUR and **Create new offer to buy BTC with EUR**. Set the amount/range, fixed or market-relative price, payment account and security deposit. Review the displayed funding requirement and maker fee, fund it, and place the offer. Keep Bisq running and reachable while waiting for a taker.

When the offer is taken, the same deposit-confirmation and counterpayment workflow applies. Send EUR only when prompted; confirm **Payment started** after the transfer. The seller must verify actual receipt before releasing BTC.

## Make an offer to sell BTC for EUR

Select **Create new offer to sell BTC for EUR**, choose your receiving account and terms, and fund both the bitcoin for sale and the required deposit/fees. Keep the offer online. When taken, wait for deposit confirmation and the buyer's payment notification.

Check your own bank/payment-provider account for actual receipt, the amount and matching sender/account details. Do not release BTC based on a screenshot or notification. Resolve mismatches through mediation before confirming. After a successful payout, check your deposit return and final transaction.

## Clone an offer across payment methods

Cloning reuses an existing offer's maker-fee/funding arrangement; it is different from **duplicating**, which creates a separately funded offer and new fees. No trade deposit transaction exists until an offer is taken—the old cloning article's phrase “original deposit transaction” is misleading here.

In **Portfolio → Open offers**, use the clone icon or the offer's context menu. Choose another compatible payment account with a different payment-method/currency combination. Clones keep the BTC amount and share the maker-fee identifier; edit only fields the application allows. BSQ swaps are excluded.

A useful example is one BTC sale offered with several supported payment methods in the same currency, or one multi-currency method offered in different currencies. Several clones for the same method **and** currency are not the intended use. When one member is taken, its siblings sharing the maker fee are removed; these are alternative ways to take one funded offer, not independent inventory you can sell simultaneously. The historical guide describes a ten-clone cap and manual recreation after a trade; let the current UI enforce its actual cap rather than relying on a fixed number here.

## Buy USDT by selling BTC

The recovered USDT walkthrough uses **USDT-E — Tether USD (ERC20)**. Verify the exact asset/network in the current offer and your receiving wallet; a matching ticker on another network is not equivalent. This transaction makes you the **BTC seller**. After the deposit confirms, the counterparty sends the agreed token payment to your configured address. Confirm receipt in your own compatible wallet before releasing BTC. Never mark payment received because the sender says it was sent.

Account setup and supported network details belong in [payment accounts](../payment-accounts/). The original one-page EUR, CAD and USDT tutorials shared setup/funding steps; they are consolidated here while preserving these currency and role differences.

<details>
<summary>Sources and scope</summary>

- [Taking an offer — source revision 2021-03-14](../../wiki-source/taking-an-offer.wiki.txt).
- [How to buy BTC on Bisq with CAD — source revision 2025-10-31](../../wiki-source/how-to-buy-btc-on-bisq-with-cad.wiki.txt).
- [How to buy BTC on Bisq with EUR — source revision 2022-02-25](../../wiki-source/how-to-buy-btc-on-bisq-with-eur.wiki.txt).
- [How to create an offer to buy BTC with EUR — source revision 2022-02-22](../../wiki-source/how-to-create-an-offer-to-buy-btc-with-eur.wiki.txt).
- [How to create an offer to sell BTC with EUR — source revision 2022-02-22](../../wiki-source/how-to-create-an-offer-to-sell-btc-with-eur.wiki.txt).
- [Cloning an offer — source revision 2023-07-02](../../wiki-source/cloning-an-offer.wiki.txt).
- [How to buy USDT on Bisq — source revision 2022-03-03](../../wiki-source/how-to-buy-usdt-on-bisq.wiki.txt).
- [Current trade flow](https://github.com/bisq-network/bisq/blob/ea9d5dff90c99ac462f2b0a7bf9ef92683956619/core/src/main/resources/i18n/displayStrings.properties#L618-L996).
- [Current cloning implementation](https://github.com/bisq-network/bisq/blob/ea9d5dff90c99ac462f2b0a7bf9ef92683956619/desktop/src/main/java/bisq/desktop/main/portfolio/cloneoffer/CloneOfferDataModel.java).

Sources reviewed 7 November 2026. Current Bisq 1 code references are pinned to v1.10.11.

</details>
