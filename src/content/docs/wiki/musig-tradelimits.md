---
title: "MuSig-tradelimits"
slug: "wiki/musig-tradelimits"
tableOfContents: false
---

<nav data-pagefind-ignore class="wiki-source-toc" aria-label="Article sections"><details open><summary>On this page</summary><ul><li><a href="#why-are-trade-limits-necessary">Why are trade limits necessary?</a></li><li><a href="#fiat-trades-bitcoin-buyers">Fiat trades – Bitcoin buyers</a></li><li><a href="#fiat-trades-bitcoin-sellers">Fiat trades – Bitcoin sellers</a></li><li><a href="#cryptocurrency-trades">Cryptocurrency trades</a></li><li><a href="#how-are-trade-limits-applied">How are trade limits applied?</a></li><li><a href="#trade-rate-limit">Trade rate limit</a></li><li><a href="#trade-limit-calculator">Trade limit calculator</a></li></ul></details></nav>

<div class="wiki-recovered-article" lang="en"><span class="wiki-legacy-anchor" id="Why_are_trade_limits_necessary?" aria-hidden="true"></span><h2 id="why-are-trade-limits-necessary"> Why are trade limits necessary? </h2>
<p>This article describes MuSig design and implementation limits, not Bisq Easy. In Bisq 2 v2.1.15, MuSig activation requires developer mode. Most fiat payment methods carry a risk of bank chargebacks. To reduce this risk, Bisq applies both trade amount limits and trade rate limits to Bitcoin buyers, since buyers are the ones who could initiate a chargeback.</p>
<span class="wiki-legacy-anchor" id="Fiat_trades_–_Bitcoin_buyers" aria-hidden="true"></span><h3 id="fiat-trades-bitcoin-buyers"> Fiat trades – Bitcoin buyers </h3>
<p>Trade limits depend on:</p>
<ul>
<li>The chargeback risk of the selected payment method</li>
<li>Whether the buyer has imported a signed account age witness from Bisq 1</li>
<li>The age of the payment account</li>
</ul>
<span class="wiki-legacy-anchor" id="Fiat_trades_–_Bitcoin_sellers" aria-hidden="true"></span><h3 id="fiat-trades-bitcoin-sellers"> Fiat trades – Bitcoin sellers </h3>
<p>For sellers, trade limits depend only on the selected payment method.</p>
<span class="wiki-legacy-anchor" id="Cryptocurrency_trades" aria-hidden="true"></span><h3 id="cryptocurrency-trades"> Cryptocurrency trades </h3>
<p>A maximum trade amount limit equivalent to 10,000 USD applies.</p>
<span class="wiki-legacy-anchor" id="How_are_trade_limits_applied?" aria-hidden="true"></span><h2 id="how-are-trade-limits-applied"> How are trade limits applied? </h2>
<p>Trade limits are calculated based on these rules:</p>
<ul>
<li>Each fiat payment method has a chargeback risk level. Depending on that level, the maximum trade amount of 10,000 USD can be reduced by up to 50%.</li>
<li>If a user imports a previously signed Bisq 1 account, all limits are removed.</li>
<li>If a payment account is older than 90 days, limits are removed. For newer accounts, limits increase gradually until reaching that age.</li>
</ul>
<span class="wiki-legacy-anchor" id="Trade_rate_limit" aria-hidden="true"></span><h3 id="trade-rate-limit"> Trade rate limit </h3>
<p>The trade rate limit (number of trades allowed per day) is based on the trade amount limit:</p>
<ul>
<li>It is calculated as: trade amount limit ÷ 1,000</li>
<li>The minimum value is 1 trade per day</li>
<li>Once the maximum trade amount limit is reached, the trade rate limit no longer applies</li>
</ul>
<p>You can import accounts from Bisq 1 and keep their account age.</p>
<span class="wiki-legacy-anchor" id="Trade_limit_calculator" aria-hidden="true"></span><h2 id="trade-limit-calculator"> Trade limit calculator </h2>
<p>Use the simulator to see which limits apply to you based on:</p>
<ul>
<li>Your selected payment method</li>
<li>The age of your payment account</li>
<li>Whether you have imported a signed Bisq 1 account</li>
</ul>
</div>
