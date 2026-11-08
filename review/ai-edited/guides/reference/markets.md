---
title: Prices, liquidity and trading strategies
description: Understand reference prices, market making and multi-market risks.
---

*Concepts checked 7 November 2026 · Maintainer review pending.*

## Bisq Price Indices

Bisq's [pricenode](https://github.com/bisq-network/bisq-pricenode) fetches and relays third-party market data and fee information. In the checked pricenode commit `c1576ab976b2403b7858c84e6396962ad84ba467`, the exchange-rate service groups available rates by currency. A single provider supplies the aggregate alone; with multiple rates, the service computes an inlier range and averages the retained values, falling back to a plain average if filtering leaves none. The checked default outlier setting is `1.1` standard deviations. This is an equal average of the retained rates, not a volume-weighted average.

Refresh is provider-specific: the checked CoinGecko and Kraken implementations each schedule one-minute refreshes. The shared provider clears rates older than ten minutes, with a documented zero-timestamp exception. These observations describe that commit, not a promise about every provider or future version. The checked fee service averages eligible fee estimates, applies configured bounds, and the supplied configuration names multiple mempool endpoints. See [setup and endpoint checks](../../contribute/infrastructure/).

In [Bisq 1 v1.10.11 `Offer.java`](https://github.com/bisq-network/bisq/blob/ea9d5dff90c99ac462f2b0a7bf9ef92683956619/core/src/main/java/bisq/core/offer/Offer.java), a market-based offer compares the taker's calculated trade price with the maker's calculated offer price and rejects a deviation greater than `0.01` (1%). A nearby source comment says 2%; the constant and comparison implement 1%. Fixed-price offers instead require the exact fixed price. This is a take-offer calculation check, not a general promise that independently observed price nodes never diverge by more than 1%. Current provider lists and weights should be read from the deployed code and configuration; historical currency tables are not live data.

## How to be a market maker on Bisq

A maker publishes offers so others can take them, improving available liquidity. The historical example placed a buy offer below and a sell offer above a reference price, kept the maker online and replaced offers after trades. The illustrated 3% spread on either side was arithmetic, not a recommended price or assured return. An offer may not be taken; a trade can take time, encounter a dispute or lose money after fees and market movement. Check the applicable product, payment method and deposit requirements before creating an offer.

## How to do arbitrage on Bisq

Arbitrage compares prices across markets, but both sides must actually execute. An inter-exchange example buys an asset in one market and sells it in another. Intra-platform examples compare currency markets or different payment methods. The recovered example's €85,000 purchase and €86,000 sale gives €1,000 per BTC **before** costs, assuming both fill at those prices. It does not establish a profit.

Include trading and mining fees, exchange and payment charges, exchange rates, price movement, counterparty and dispute risk, settlement delays, and capital tied up on both sides. Offers and prices can disappear between legs. Bisq 1 and Bisq Easy use different trade protocols; an example for one is not a procedure for the other.

## How to do remittance on Bisq

The recovered example described linking two local fiat markets through Bitcoin: one participant buys and another sells, with an intermediary maintaining suitable balances and accounts in both markets. Direction matters: check exactly who sends and receives each asset before any trade. The old illustration assumed a 1% spread on each side; the spread is not guaranteed profit and excludes fees, settlement, counterparty, exchange-rate and legal risks. Payment-provider and local rules may apply. The source's claim of “little risk” is not a reliable assessment.

## Sources and review

Checked 7 November 2026 against pinned [exchange-rate aggregation](https://github.com/bisq-network/bisq-pricenode/blob/c1576ab976b2403b7858c84e6396962ad84ba467/src/main/java/bisq/price/spot/ExchangeRateService.java), [provider freshness](https://github.com/bisq-network/bisq-pricenode/blob/c1576ab976b2403b7858c84e6396962ad84ba467/src/main/java/bisq/price/spot/ExchangeRateProvider.java), [CoinGecko refresh](https://github.com/bisq-network/bisq-pricenode/blob/c1576ab976b2403b7858c84e6396962ad84ba467/src/main/java/bisq/price/spot/providers/CoinGecko.java), [fee aggregation](https://github.com/bisq-network/bisq-pricenode/blob/c1576ab976b2403b7858c84e6396962ad84ba467/src/main/java/bisq/price/mining/FeeRateService.java), and [Bisq 1 offer validation](https://github.com/bisq-network/bisq/blob/ea9d5dff90c99ac462f2b0a7bf9ef92683956619/core/src/main/java/bisq/core/offer/Offer.java). Historical [index](../../wiki-source/bisq-price-indices.wiki.txt), [market-making](../../wiki-source/how-to-be-a-market-maker-on-bisq.wiki.txt), [arbitrage](../../wiki-source/how-to-do-arbitrage-on-bisq.wiki.txt) and [remittance](../../wiki-source/how-to-do-remittance-on-bisq.wiki.txt) pages supply examples; provider lists and numerical assumptions are not current quotes. No trade was executed.
