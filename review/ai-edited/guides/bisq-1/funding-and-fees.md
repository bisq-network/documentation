---
title: "Fund a trade and understand its costs"
description: "Separate deposits, trading fees, mining fees and premiums, and fund the amount your offer requires."
---

Read the offer's funding breakdown before sending bitcoin. Separate **trade amount**, **refundable security deposit**, **trading fee**, **mining fee** and **price premium**: they are not all fees, and they do not all return at completion.

## Security deposits and funds needed

In the classic Bisq 1 protocol both traders lock BTC deposits in the 2-of-2 escrow. The seller also supplies the BTC being sold. A successful cooperative payout returns each deposit and pays the purchased BTC to the buyer. Dispute outcomes can differ; [arbitration is not a guaranteed deposit refund](../arbitration-protocol/).

Open the offer's **i** details and review the deposit line and the final funding screen. The maker chooses permitted terms; account/method restrictions and the accepted amount matter. A range offer can reserve funds based on its maximum amount. Do not calculate the exact requirement from an old percentage example when the application provides the actual amount.

<figure><a href="../../media/wiki/466e439c3c5dd9053960ac93166bb6776e2e7ad0678c7bf796f28f1873452c6e.png"><img src="../../media/wiki/466e439c3c5dd9053960ac93166bb6776e2e7ad0678c7bf796f28f1873452c6e.png" alt="See-offer-details" loading="lazy" /></a><figcaption>Historical illustration from Funding your wallet; current controls may differ.</figcaption></figure>

Older pages disagree: one fixes the seller at 15% while another says both deposits match, and their “0.002 BTC is enough” examples cannot cover changing fees or larger offers. Those are not current universal minimums. The current review screen is the authority for the offer you are accepting.



<details>
<summary>Earlier interface illustrations</summary>

These recovered screenshots show the controls discussed in this section. Prices, balances, limits, account identities and software versions in them are historical examples; follow the current instructions above.

<figure><a href="../../media/wiki/8b19642bc2a45ce9ac0ffc715b7b6c17e87d7adb406d7bde969b45dce1d37a32.png"><img src="../../media/wiki/8b19642bc2a45ce9ac0ffc715b7b6c17e87d7adb406d7bde969b45dce1d37a32.png" alt="Security deposit 1" loading="lazy" /></a><figcaption>Historical Security deposit illustration.</figcaption></figure>

<figure><a href="../../media/wiki/55b2bcaf905268ebeff3aff3be83219cfb7fce5a3ef122068a995dd1931035c4.png"><img src="../../media/wiki/55b2bcaf905268ebeff3aff3be83219cfb7fce5a3ef122068a995dd1931035c4.png" alt="Security deposit 2" loading="lazy" /></a><figcaption>Historical Security deposit illustration.</figcaption></figure>

</details>

## Trading fees, mining fees and price

Trading fees fund Bisq's operation through its DAO mechanisms. You can choose BTC or BSQ when the offer screen provides that choice. Compare the displayed amount and fiat equivalent; the BSQ discount depends on current parameters and exchange rates. Recovered pages claim both 25% and 50%, and contain different BTC/BSQ rates, so none of those snapshots is presented as today's rate.

Mining fees pay for Bitcoin transactions and depend on virtual size and fee market conditions, not simply the traded amount. In the classic flow, the maker funds its fee transaction and the taker bears the fee-transaction/deposit/payout bundle. The historical “three times” comparison is approximate, not a quote. The deposit and trade amount are separate from those nonrefundable costs.

The maker's offered price may differ from the market reference. Compare the **total amount you pay or receive**, including spread, provider charges and Bitcoin fees. A larger trade can spread transaction costs over more BTC but also increases the amount exposed to trading risk; it is not automatically the right choice.



<details>
<summary>Earlier interface illustrations</summary>

These recovered screenshots show the controls discussed in this section. Prices, balances, limits, account identities and software versions in them are historical examples; follow the current instructions above.

<figure><a href="../../media/wiki/47c712c2701a0c712b2c1edd8a22a906e9f47e560cf2d81c255774ae959ae50b.png"><img src="../../media/wiki/47c712c2701a0c712b2c1edd8a22a906e9f47e560cf2d81c255774ae959ae50b.png" alt="Pick-trade-fee-currency" loading="lazy" /></a><figcaption>Historical Trading fees illustration.</figcaption></figure>

</details>

## Receive bitcoin into Bisq

Use **Funds → Receive funds**, copy an unused BTC address and verify it on both ends. You can also fund the trade-specific address shown while making/taking an offer. Wait for the appropriate chain state; using low-fee unconfirmed funding can delay the deposit through its ancestor transaction.

<figure><a href="../../media/wiki/19fc8857a9c53082d01b92c6da7dbd1284e37561a6f2226206f57a18efd5ce08.png"><img src="../../media/wiki/19fc8857a9c53082d01b92c6da7dbd1284e37561a6f2226206f57a18efd5ce08.png" alt="ReceiveFunds" loading="lazy" /></a><figcaption>Historical illustration from Funding your wallet; current controls may differ.</figcaption></figure>

External funding and withdrawals remain on-chain transactions. Public Bitcoin history can link your source wallet to later activity; using Bisq does not erase that history. BSQ uses its separate receiving view and should not be sent to an ordinary external BTC wallet.



<details>
<summary>Earlier interface illustrations</summary>

These recovered screenshots show the controls discussed in this section. Prices, balances, limits, account identities and software versions in them are historical examples; follow the current instructions above.

<figure><a href="../../media/wiki/3e147b0a1c06f39791ed7aee92f729c100b22e340abe11f3f4a1fad12aa5dcf6.png"><img src="../../media/wiki/3e147b0a1c06f39791ed7aee92f729c100b22e340abe11f3f4a1fad12aa5dcf6.png" alt="Get-first-bitcoin" loading="lazy" /></a><figcaption>Historical Funding your wallet illustration.</figcaption></figure>

</details>

## Withdrawal fees

Under **Funds → Send funds**, review the suggested fee or deliberately choose a custom value. A low fee may leave the transaction pending. Check the txid and ancestor state before [considering CPFP](../transaction-troubleshooting/#deposit-pending-and-cpfp). An explorer not showing a transaction is not by itself permission to spend the same funds again.



<details>
<summary>Earlier interface illustrations</summary>

These recovered screenshots show the controls discussed in this section. Prices, balances, limits, account identities and software versions in them are historical examples; follow the current instructions above.

<figure><a href="../../media/wiki/da2c84903ae48fda0d4858674428146cb1d4470864055a160a0bb43e807d65dd.png"><img src="../../media/wiki/da2c84903ae48fda0d4858674428146cb1d4470864055a160a0bb43e807d65dd.png" alt="Mining fees 1" loading="lazy" /></a><figcaption>Historical Mining fees illustration.</figcaption></figure>

</details>

## Get your first BTC

Bisq 1 needs BTC for deposits and fees before you can buy more. [Bisq Easy](../../bisq-2/first-trade/) has a different reputation-based model without the Bisq 1 security deposit. Other possibilities include earning BTC, buying from someone you already trust, or a local service; availability, privacy and costs differ and no provider is endorsed here.

The historical **Get your first BTC** Matrix room was an informal small-trade market, largely replaced by Bisq Easy by 2024. Its source rules capped a trade at 0.007 BTC and required direct negotiation, but those are historical room rules—not a current supported Bisq workflow. Such chat trades lack Bisq escrow, mediation, arbitration and DAO reimbursement. A Matrix username may become linked to payment details; dividing payments does not eliminate fraud or bank risk. Do not assume a room moderator or familiar handle provides software protection.

## Fiat is sent to your peer, not to Bisq

There is no Bisq fiat deposit account or credit-card checkout. The buyer uses the agreed external payment service to pay the seller directly. Funding a payment-provider account with a card is separate from the Bisq trade and subject to that provider's current rules; old examples naming services do not establish that card funding is permitted or appropriate today.

<details>
<summary>Sources and scope</summary>

- [Funding your wallet — source revision 2024-12-23](../../wiki-source/funding-your-wallet.wiki.txt).
- [Security deposit — source revision 2024-12-23](../../wiki-source/security-deposit.wiki.txt).
- [Trading costs — source revision 2026-10-15](../../wiki-source/trading-costs.wiki.txt).
- [Trading fees — source revision 2026-10-15](../../wiki-source/trading-fees.wiki.txt).
- [Mining fees — source revision 2021-12-20](../../wiki-source/mining-fees.wiki.txt).
- [Getting your first BTC — source revision 2024-06-27](../../wiki-source/getting-your-first-btc.wiki.txt).
- [How do I send fiat to Bisq — source revision 2022-03-11](../../wiki-source/how-do-i-send-fiat-to-bisq.wiki.txt).
- [Current offer funding and fee UI](https://github.com/bisq-network/bisq/blob/ea9d5dff90c99ac462f2b0a7bf9ef92683956619/core/src/main/resources/i18n/displayStrings.properties#L618-L668).
- [Current trade rules](https://github.com/bisq-network/bisq/blob/ea9d5dff90c99ac462f2b0a7bf9ef92683956619/core/src/main/resources/i18n/displayStrings.properties#L347-L371).

Sources reviewed 7 November 2026. Current Bisq 1 code references are pinned to v1.10.11.

</details>
