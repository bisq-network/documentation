---
title: "Stablecoin payment methods"
slug: "wiki/stablecoin-payment-methods"
description: Pay for bitcoin with a USD stablecoin in Bisq 1's BTC/USD market, peer to peer. How it works, what you need, the steps for buyers and sellers, and the risks.
---

<div class="wiki-recovered-article" lang="en">

Since Bisq 1 v1.10.12, you can pay for bitcoin with a USD stablecoin such as USDT, USDC or DAI. The stablecoin is a **payment method** in the BTC/USD market, like [Zelle](../zelle/) or a bank transfer: you trade bitcoin, and the BTC buyer pays the seller in the stablecoin, from wallet to wallet.

<aside class="wiki-admonition" role="note">

**Note**

**Version context:** This page applies to **[Bisq 1](../bisq-1/)** v1.10.12 and newer. Older versions show these offers as USD offers with an unknown payment method and cannot take them. Update before you trade.

</aside>

## How it works {#how-it-works}

- Each payment method is **one coin on one network**, for example USDT on Tron. Only that coin on that network counts as payment.
- The price is in **USD per BTC**, as for every USD offer. 100 USD are paid with 100 units of the coin, whatever the coin trades at elsewhere. Trade amounts are whole USD.
- The BTC is held in a 2-of-2 multisig of the two traders, and both traders lock a BTC [security deposit](../security-deposit/), as in every Bisq 1 trade.
- The BTC buyer sends the stablecoin from their own wallet straight to the seller's address. Bisq never holds the stablecoin.
- The buyer pays the network fee. The seller must receive the full amount.
- A transfer from any address counts, as long as it is the right coin, on the right network, for the full amount.
- The trade period is 24 hours.

A blockchain transfer cannot be charged back. That is why the trade limit for these payment methods does not depend on the age of your account or on account signing (see [Trade limits](#trade-limits)).

## Supported stablecoins and networks {#supported-stablecoins-and-networks}

There are 18 payment methods: 10 USD stablecoins on Ethereum, Tron, Solana and BNB Smart Chain.

| Stablecoin | Networks |
| --- | --- |
| USDT (Tether USD) | Ethereum, Tron, Solana, BNB Smart Chain |
| USDC (USD Coin) | Ethereum, Solana, BNB Smart Chain |
| USDG (Global Dollar) | Ethereum, Solana |
| PYUSD (PayPal USD) | Ethereum, Solana |
| U (United Stables) | Ethereum, BNB Smart Chain |
| USDS (Sky Dollar) | Ethereum |
| USDe (Ethena USDe) | Ethereum |
| DAI (Dai) | Ethereum |
| RLUSD (Ripple USD) | Ethereum |
| USDf (Falcon USD) | Ethereum |

In Bisq, a payment method is named with its coin and token standard, for example **USDT (TRC-20)** for USDT on Tron, **USDT (ERC-20)** on Ethereum, **USDT (SPL)** on Solana and **USDT (BEP-20)** on BNB Smart Chain.

USDT and USDC on BNB Smart Chain are tokens bridged by Binance, not issued by Tether or Circle.

Your payment account and the trade screen show the **token contract** of the coin. Anyone can create a token with the same name, so the contract is the only way to tell the real coin from a fake one.

## Using stablecoins on Bisq 1 {#using-stablecoins-on-bisq-1}

### What you need {#what-you-need}

- Bisq 1 v1.10.12 or newer, downloaded from [bisq.network](https://bisq.network/downloads/), with the signature checked (see [Downloading and installing](../downloading-and-installing/)).
- **BTC for the security deposit and fees.** Both traders lock a deposit of at least 15% of the trade amount, and at least 0.0003 BTC. If you hold only stablecoins, you need some BTC first (see [I have stablecoins but no BTC](#i-have-stablecoins-but-no-btc)).
- A wallet whose keys you control that holds the coin **on the network of the offer**.
- A little of that network's own coin for the network fee: ETH on Ethereum, TRX on Tron, SOL on Solana, BNB on BNB Smart Chain.

### Trade limits {#trade-limits}

- Stablecoin payment methods are in the highest trade limit class, the same as altcoins. The limit is the same from your first trade, whatever the age or signing of your account.
- Your default limit is **0.1 BTC** per trade. You can raise it up to the network maximum, currently **0.25 BTC**: go to **Settings → Preferences**, turn on **Increase Trade Limits** and set **Max. trade amount (BTC)**. Bisq recommends completing at least five trades first.

For comparison, a new, unsigned buyer paying with Zelle can buy at most 0.002 BTC per trade. See [Account limits](../account-limits/).

### Setting up your stablecoin account {#setting-up-your-stablecoin-account}

1. Go to **Account → National currency accounts** and click **Add new account**.
2. In the **Stablecoin** field, choose the coin and network, for example **Tether USD (USDT, Tron TRC-20)**.
3. Read the information about the coin, the network and the issuer.
4. Check the **Network** and **Token contract** shown, and enter your **Address** on that network. Use the address of a wallet whose keys you control, not an exchange deposit address.
5. Click **Save new account**.

Create one account for each coin and network you want to trade. An account for USDT on Tron does not match offers for USDT on Ethereum.

<aside class="wiki-admonition" role="note">

**Warning**

Addresses on Ethereum and BNB Smart Chain look the same. Only the payment method of the offer tells which network to use.

</aside>

## Trading with stablecoins on Bisq 1 {#trading-with-stablecoins-on-bisq-1}

### Buying BTC with a stablecoin {#buying-btc-with-a-stablecoin}

1. In the **Buy** tab, choose **USD** as the currency. In **Choose payment method**, pick the coin and network, or **Show stablecoins only**. Take an offer, or create your own.
2. Wait until the deposit transaction confirms. The trade screen then shows the coin, the network, the token contract, the amount in units of the coin and the seller's address.
3. **Copy the address from the trade screen.** Never copy it from your wallet history: scammers send tiny transfers from look-alike addresses so that a wrong address appears there.
4. Send exactly the trade amount of that coin, on that network, from your own wallet. Pay the network fee on top, so that the seller receives the full amount.
5. Keep the **transaction ID** of your transfer. You need it if there is a dispute. Posting it in the trader chat helps the seller find the transfer, as the trade steps have no field for it.
6. Click **Payment started**.

<aside class="wiki-admonition" role="note">

**Warning**

Send only the coin, on the network, to the address shown in the trade. A transfer of another token or on another network is not a payment, and the sender bears the loss. Neither the seller, a mediator nor anyone at Bisq can reverse it.

</aside>

### Selling BTC for a stablecoin {#selling-btc-for-a-stablecoin}

1. In the **Sell** tab, choose **USD** and the payment method. Take an offer, or create your own.
2. Wait until the buyer clicks **Payment started**.
3. Check the transfer in your own wallet or in a block explorer of the network:
   - the **token contract** shown in the trade, not only the coin's name;
   - the **network** of the payment method;
   - the **full amount**, arrived at your address;
   - the transfer is **final**.
4. Only then click **Confirm payment receipt**. This releases the BTC to the buyer.

<aside class="wiki-admonition" role="note">

**Warning**

Never confirm on a screenshot or a transaction ID alone. Confirm only when the right token has arrived at your address in full. A token with the same name but another token contract is not a payment.

</aside>

### Making offers {#making-offers}

- Keep the buyer's security deposit at the minimum if new traders should be able to take your offer.
- An offer priced as a percentage of the market price keeps following BTC/USD even when the coin loses its peg. Bisq does not deactivate it. Watch the coin and deactivate your offers if it trades away from 1 USD.

## Before you send or confirm {#before-you-send-or-confirm}

1. **Coin:** the one the offer names.
2. **Network:** the one the offer names.
3. **Token contract:** the one shown in the trade.
4. **Amount:** the seller receives the full amount; the buyer pays the fee.
5. **Address:** copied from the trade screen, never from your wallet history.

## Risks {#risks}

- **Wrong network or token.** A transfer on another network or of another token is not a payment, and the funds are usually lost.
- **Issuer freezes.** The issuer of a coin may be able to freeze the coins of an address, also after a trade. Bisq and the mediators cannot undo that.
- **Issuer failure.** A coin can lose its value if its issuer fails.
- **Bridged tokens.** USDT and USDC on BNB Smart Chain depend on Binance's bridge, not on Tether or Circle.
- **Loss of peg.** A trade counts units of the coin, not their market value. If a coin trades below 1 USD, the seller still receives the same number of units.
- **Privacy.** Stablecoin transfers are public on their blockchains. Bisq also publishes anonymous trade statistics with the amount, price, time and payment method of each trade. Someone who compares both can link a transfer to a trade.
- **Impostors.** There is no Bisq airdrop, no Bisq stablecoin and no support by direct message. Mediation happens inside the Bisq app.

## Potential issues {#potential-issues}

### Dispute resolution {#dispute-resolution}

If something goes wrong, open [mediation](../dispute-resolution-in-bisq-1/) in the trade. A [mediator](../mediator/) checks the payment on the blockchain, so have ready:

- the transaction ID;
- the coin, the network and the token contract;
- the sending and receiving addresses.

### The seller's details are not for this payment method {#the-sellers-details-are-not-for-this-payment-method}

If the trade screen says the seller's payment details are not for the payment method of the trade, do not send anything. Open mediation once the trade period has ended.

### Amounts shown in USD {#amounts-shown-in-usd}

Outside the trade steps, for example in the offer book and in your portfolio, amounts are shown in USD. In the trade steps they are shown in units of the coin. As 1 USD is paid with one unit, both are the same number.

## Stablecoin payment methods and the USDT-E market {#stablecoin-payment-methods-and-the-usdt-e-market}

Bisq 1 also lists some stablecoins as altcoins in their own markets: `USDT-E`, `USDC`, `DAI`, `TUSD` and `AEUR`. There you trade the token itself against BTC (see [How to buy USDT on Bisq](../how-to-buy-usdt-on-bisq/) and [Altcoins](../altcoins/)). Those markets still exist, with their own offers. The stablecoin payment methods on this page are in the **USD market**, with the price in USD per BTC.

## Frequently asked questions {#frequently-asked-questions}

### Can I pay from an exchange account? {#can-i-pay-from-an-exchange-account}

A transfer from any address counts. The exchange then knows where the coins went and may ask about the recipient. To receive, use a wallet whose keys you control.

### What if the coin trades below 1 USD? {#what-if-the-coin-trades-below-1-usd}

The trade counts units of the coin, not their market value. Set your price accordingly, or do not use that coin while it is off its peg.

### Is it private? {#is-it-private}

Bisq runs over Tor and needs no account. The stablecoin transfer, however, is public on its blockchain, and the trade statistics are public too. See [Risks](#risks).

### I have stablecoins but no BTC {#i-have-stablecoins-but-no-btc}

You need some BTC for the security deposit. Buyers in [Bisq Easy](../bisq-easy/) (Bisq 2) need no deposit, so you can get a small amount there first.

### Which stablecoin should I use? {#which-stablecoin-should-i-use}

Bisq does not recommend a coin. Coins differ in who issues them, whether the issuer can freeze balances and how their reserves are checked. Read the issuer's own documentation before you trade.

</div>
