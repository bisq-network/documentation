---
title: "MuSig-tradelimits"
slug: "wiki/musig-tradelimits"
tableOfContents: false
---

<nav data-pagefind-ignore class="wiki-source-toc" aria-label="Article sections"><details open><summary>On this page</summary><ul><li><a href="#why-are-trade-limits-necessary">Why are trade limits necessary?</a></li><li><a href="#fiat-trades-bitcoin-buyers">Fiat trades – Bitcoin buyers</a></li><li><a href="#fiat-trades-bitcoin-sellers">Fiat trades – Bitcoin sellers</a></li><li><a href="#cryptocurrency-trades">Cryptocurrency trades</a></li><li><a href="#how-are-trade-limits-applied">How are trade limits applied?</a></li><li><a href="#trade-rate-limit">Trade rate limit</a></li><li><a href="#trade-limit-calculator">Trade limit calculator</a></li></ul></details></nav>

<div class="wiki-recovered-article" lang="en">

<span class="wiki-legacy-anchor" id="Why_are_trade_limits_necessary?" aria-hidden="true">
</span>

## Why are trade limits necessary? {#why-are-trade-limits-necessary}

Most fiat payment methods carry a risk of bank chargebacks. To reduce this risk, Bisq applies both trade amount limits and trade rate limits to Bitcoin buyers, since buyers are the ones who could initiate a chargeback.

<span class="wiki-legacy-anchor" id="Fiat_trades_–_Bitcoin_buyers" aria-hidden="true">
</span>

### Fiat trades – Bitcoin buyers {#fiat-trades-bitcoin-buyers}

Trade limits depend on:

- The chargeback risk of the selected payment method
- Whether the buyer has imported a signed account age witness from Bisq 1
- The age of the payment account

<span class="wiki-legacy-anchor" id="Fiat_trades_–_Bitcoin_sellers" aria-hidden="true">
</span>

### Fiat trades – Bitcoin sellers {#fiat-trades-bitcoin-sellers}

For sellers, trade limits depend only on the selected payment method.

<span class="wiki-legacy-anchor" id="Cryptocurrency_trades" aria-hidden="true">
</span>

### Cryptocurrency trades {#cryptocurrency-trades}

A maximum trade amount limit equivalent to 10,000 USD applies.

<span class="wiki-legacy-anchor" id="How_are_trade_limits_applied?" aria-hidden="true">
</span>

## How are trade limits applied? {#how-are-trade-limits-applied}

Trade limits are calculated based on these rules:

- Each fiat payment method has a chargeback risk level. Depending on that level, the maximum trade amount of 10,000 USD can be reduced by up to 50%.
- If a user imports a previously signed Bisq 1 account, all limits are removed.
- If a payment account is older than 90 days, limits are removed. For newer accounts, limits increase gradually until reaching that age.

<span class="wiki-legacy-anchor" id="Trade_rate_limit" aria-hidden="true">
</span>

### Trade rate limit {#trade-rate-limit}

The trade rate limit (number of trades allowed per day) is based on the trade amount limit:

- It is calculated as: trade amount limit ÷ 1,000
- The minimum value is 1 trade per day
- Once the maximum trade amount limit is reached, the trade rate limit no longer applies

You can import accounts from Bisq 1 and keep their account age.

<span class="wiki-legacy-anchor" id="Trade_limit_calculator" aria-hidden="true">
</span>

## Trade limit calculator {#trade-limit-calculator}

Use the simulator to see which limits apply to you based on:

- Your selected payment method
- The age of your payment account
- Whether you have imported a signed Bisq 1 account

</div>
