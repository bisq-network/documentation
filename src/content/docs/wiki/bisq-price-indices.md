---
title: "Bisq Price Indices"
slug: "wiki/bisq-price-indices"
tableOfContents: false
---

<nav data-pagefind-ignore class="wiki-source-toc" aria-label="Article sections"><details open><summary>On this page</summary><ul><li><a href="#asset-table">Asset Table</a></li><li><a href="#altcoins">Altcoins:</a></li></ul></details></nav>

<div class="wiki-recovered-article" lang="en">

The **Bisq Price Indices** are the weighted average asset prices calculated by each of the <span class="wiki-link-gap">Bisq Pricenodes <small>[unrecovered article: Bisq pricenode]</small></span>. It was implemented in Bisq v1.3.8 as part of [Project 35](https://github.com/bisq-network/projects/issues/35) in order to gain independence from Bitcoin Average as a price oracle, decentralizing data sources from 35+ different data providers around the world.

Bisq Pricenodes fetch the latest price data, once per minute, from various providers for each asset. At the checked pricenode commit, a single available rate is used directly. With multiple rates, the node averages retained inliers and falls back to a plain average if filtering leaves none; this is an equal average of retained rates, not a volume-weighted average. For example, two retained rates contribute 50% each and four contribute 25% each.

Providers are selected considering for each asset reliability of the data and trading volume. The following tables are from the recovered wiki snapshot; providers and weights may have changed.

In the checked Bisq 1 v1.10.11 code, a market-based offer compares the taker’s calculated trade price with the maker’s calculated offer price and rejects a deviation greater than 1%. This is a take-offer calculation check, not a general guarantee about the difference between independently observed nodes.

<span class="wiki-legacy-anchor" id="Asset_Table" aria-hidden="true">
</span>

## Asset Table {#asset-table}

<table>
<thead>
<tr>
<th>Currency</th>
<th>HUOBI</th>
<th>Coingecko</th>
<th>Binance</th>
<th>CoinbasePro</th>
<th>Kraken</th>
<th>Quoine</th>
<th>BTCmarkets</th>
<th>Independent<br>
Reserve</th>
<th>Mercado<br>
Bitcoin</th>
</tr>
</thead>
<tbody>
<tr>
<td><strong>AED</strong></td>
<td></td>
<td>100%</td>
<td></td>
<td></td>
<td></td>
<td></td>
<td></td>
<td></td>
<td></td>
</tr>
<tr>
<td><strong>AUD</strong></td>
<td></td>
<td>20%</td>
<td>20%</td>
<td></td>
<td>20%</td>
<td></td>
<td>20%</td>
<td>20%</td>
<td></td>
</tr>
<tr>
<td><strong>BDT</strong></td>
<td></td>
<td>100%</td>
<td></td>
<td></td>
<td></td>
<td></td>
<td></td>
<td></td>
<td></td>
</tr>
<tr>
<td><strong>BHD</strong></td>
<td></td>
<td>100%</td>
<td></td>
<td></td>
<td></td>
<td></td>
<td></td>
<td></td>
<td></td>
</tr>
<tr>
<td><strong>BMD</strong></td>
<td></td>
<td>100%</td>
<td></td>
<td></td>
<td></td>
<td></td>
<td></td>
<td></td>
<td></td>
</tr>
<tr>
<td><strong>BRL</strong></td>
<td>25%</td>
<td>25%</td>
<td>25%</td>
<td></td>
<td></td>
<td></td>
<td></td>
<td></td>
<td>25%</td>
</tr>
<tr>
<td><strong>BTM</strong></td>
<td>100%</td>
<td></td>
<td></td>
<td></td>
<td></td>
<td></td>
<td></td>
<td></td>
<td></td>
</tr>
<tr>
<td><strong>CAD</strong></td>
<td></td>
<td>50%</td>
<td></td>
<td></td>
<td>50%</td>
<td></td>
<td></td>
<td></td>
<td></td>
</tr>
</tbody>
</table>
<details class="wiki-table-source"><summary>Original table source</summary><pre><code>{| class="wikitable"
! Currency || HUOBI || Coingecko || Binance || CoinbasePro || Kraken || Quoine || BTCmarkets || Independent&lt;/BR&gt;Reserve || Mercado&lt;/BR&gt;Bitcoin
|-
| '''AED''' ||  || 100% ||  ||  ||  ||  ||  ||  || &#10;|- style="background-color: #ECECF0"
| '''AUD''' ||  || 20% || 20% ||  || 20% ||  || 20% || 20% || &#10;|-
| '''BDT''' ||  || 100% ||  ||  ||  ||  ||  ||  || &#10;|- style="background-color: #ECECF0"
| '''BHD''' ||  || 100% ||  ||  ||  ||  ||  ||  || &#10;|-
| '''BMD''' ||  || 100% ||  ||  ||  ||  ||  ||  || &#10;|- style="background-color: #ECECF0"
| '''BRL''' || 25% || 25% || 25% ||  ||  ||  ||  ||  || 25%
|-
| '''BTM''' || 100% ||  ||  ||  ||  ||  ||  ||  || &#10;|- style="background-color: #ECECF0"
| '''CAD''' ||  || 50% ||  ||  || 50% ||  ||  ||  || &#10;|}</code></pre></details>

| Currency | HUOBI | Coingecko | Binance | CoinbasePro | Kraken | Bitstamp | Exmo | Bitfinex | Quoine | Coinmate | Bitbay |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| **CHF** | | 50% | | | 50% | | | | | | |
| **CLP** | | 100% | | | | | | | | | |
| **CNY** | | 100% | | | | | | | | | |
| **CZK** | | 100% | | | | | | | | | |
| **EUR** | | 20% | 20% | 20% | 20% | 20% | | | | | |
| **GBP** | | 20% | 20% | 20% | 20% | 20% | | | | | |
| | | | | | | | | | | | |

<details class="wiki-table-source"><summary>Original table source</summary><pre><code>{| class="wikitable"
! Currency || HUOBI || Coingecko || Binance || CoinbasePro || Kraken || Bitstamp || Exmo || Bitfinex || Quoine || Coinmate || Bitbay
|-
| '''CHF''' ||  || 50% ||  ||  || 50% ||  ||  ||  ||  ||  || &#10;|- style="background-color: #ECECF0"
| '''CLP''' ||  || 100% ||  ||  ||  ||  ||  ||  ||  ||  || &#10;|-
| '''CNY''' ||  || 100% ||  ||  ||  ||  ||  ||  ||  ||  || &#10;|- style="background-color: #ECECF0"
| '''CZK''' ||  || 100% ||  ||  ||  ||  ||  ||  ||  ||  || &#10;|-
| '''EUR''' ||  || 20% || 20% || 20% || 20% || 20% ||  ||  ||  ||  || &#10;|- style="background-color: #ECECF0"
| '''GBP''' ||  || 20% || 20% || 20% || 20% || 20% ||  ||  ||  ||  || &#10;|-
|}</code></pre></details>

| Currency | Luno | Coingecko | CoinbasePro | Bitfinex | Quoine | Bitflyer | Coinone | Kranken |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| **HKD** | | 100% | | | | | | |
| **HUF** | | 100% | | | | | | |
| **IDR** | 50% | 50% | | | | | | |
| **ILS** | | 100% | | | | | | |
| **INR** | | 100% | | | | | | |
| **JPY** | | 33% | | | | 33% | | 33% |
| **KRW** | | 50% | | | | | 50% | |
| **KWD** | | 100% | | | | | | |

<details class="wiki-table-source"><summary>Original table source</summary><pre><code>{| class="wikitable"
! Currency || Luno || Coingecko || CoinbasePro || Bitfinex || Quoine || Bitflyer || Coinone || Kranken
|-
| '''HKD''' ||  || 100% ||  ||  ||  ||  ||  ||
|- style="background-color: #ECECF0"
| '''HUF''' ||  || 100% ||  ||  ||  ||  ||  ||
|-
| '''IDR''' || 50% || 50% ||  ||  ||  ||  ||  ||
|- style="background-color: #ECECF0"
| '''ILS''' ||  || 100% ||  ||  ||  ||  ||  ||
|-
| '''INR''' ||  || 100% ||  ||  ||  ||  ||  ||
|- style="background-color: #ECECF0"
| '''JPY''' ||  || 33% ||  ||  ||  || 33% ||  || 33%
|-
| '''KRW''' ||  || 50% ||  ||  ||  ||  || 50% ||
|- style="background-color: #ECECF0"
| '''KWD''' ||  || 100% ||  ||  ||  ||  ||  || &#10;|}</code></pre></details>
<table>
<thead>
<tr>
<th>Currency</th>
<th>Cingecko</th>
<th>Binance</th>
<th>CoinbasePro</th>
<th>Independent<br>
Reserve</th>
<th>Luno</th>
</tr>
</thead>
<tbody>
<tr>
<td><strong>LKR</strong></td>
<td>100%</td>
<td></td>
<td></td>
<td></td>
<td></td>
</tr>
<tr>
<td><strong>MMK</strong></td>
<td>100%</td>
<td></td>
<td></td>
<td></td>
<td></td>
</tr>
<tr>
<td><strong>MXN</strong></td>
<td>100%</td>
<td></td>
<td></td>
<td></td>
<td></td>
</tr>
<tr>
<td><strong>MYR</strong></td>
<td>50%</td>
<td></td>
<td></td>
<td></td>
<td>50%</td>
</tr>
<tr>
<td><strong>NGN</strong></td>
<td>50%</td>
<td></td>
<td></td>
<td></td>
<td>50%</td>
</tr>
<tr>
<td><strong>NOK</strong></td>
<td>100%</td>
<td></td>
<td></td>
<td></td>
<td></td>
</tr>
<tr>
<td><strong>NZD</strong></td>
<td>50%</td>
<td></td>
<td></td>
<td>50%</td>
<td></td>
</tr>
</tbody>
</table>
<details class="wiki-table-source"><summary>Original table source</summary><pre><code>{| class="wikitable"
! Currency || Cingecko || Binance || CoinbasePro || Independent&lt;/br&gt;Reserve || Luno
|-
| '''LKR''' || 100% ||  ||  ||  || &#10;|- style="background-color: #ECECF0"
| '''MMK''' || 100% ||  ||  ||  || &#10;|-
| '''MXN''' || 100% ||  ||  ||  || &#10;|- style="background-color: #ECECF0"
| '''MYR''' || 50% ||  ||  ||  || 50%
|-
| '''NGN''' || 50% ||  ||  ||  || 50%
|- style="background-color: #ECECF0"
| '''NOK''' || 100% ||  ||  ||  || &#10;|-
| '''NZD''' || 50% ||  ||  || 50% || &#10;|}</code></pre></details>

| Currency | Huobi | Coingecko | Binance | CoinbasePro | Exmo | Quoine | Bitbay |
| --- | --- | --- | --- | --- | --- | --- | --- |
| **PHP** | | 100% | | | | | |
| **PKR** | | 100% | | | | | |
| **PLN** | | 100% | | | | | |
| **RUB** | 33% | 33% | 33% | | | | |
| **SAR** | | 100% | | | | | |
| **SEK** | | 100% | | | | | |
| **SGD** | | 100% | | | | | |

<details class="wiki-table-source"><summary>Original table source</summary><pre><code>{| class="wikitable"
! Currency || Huobi || Coingecko || Binance || CoinbasePro || Exmo || Quoine || Bitbay
|-
| '''PHP''' ||  || 100% ||  ||  ||  || &#10;|- style="background-color: #ECECF0"
| '''PKR''' ||  || 100% ||  ||  ||  ||  || &#10;|-
| '''PLN''' ||  || 100% ||  ||  ||  ||  || &#10;|- style="background-color: #ECECF0"
| '''RUB''' || 33% || 33% || 33% ||  ||  ||  || &#10;|- &#10;| '''SAR''' ||  || 100% ||  ||  ||  ||  || &#10;|- style="background-color: #ECECF0"
| '''SEK''' ||  || 100% ||  ||  ||  ||  || &#10;|-
| '''SGD''' ||  || 100% ||  ||  ||  ||  || &#10;|}</code></pre></details>
<table>
<thead>
<tr>
<th>Currency</th>
<th>Huobi</th>
<th>Coingecko</th>
<th>Binance</th>
<th>CoinbasePro</th>
<th>Kraken</th>
<th>Bitstamp</th>
<th>Exmo</th>
<th>Bitfinex</th>
<th>Independent<br>
Reserve</th>
<th>Bitbay</th>
<th>Luno</th>
<th>Paribu</th>
<th>Quoine</th>
</tr>
</thead>
<tbody>
<tr>
<td><strong>THB</strong></td>
<td></td>
<td>100%</td>
<td></td>
<td></td>
<td></td>
<td></td>
<td></td>
<td></td>
<td></td>
<td></td>
<td></td>
<td></td>
<td></td>
</tr>
<tr>
<td><strong>TRY</strong></td>
<td>25%</td>
<td>25%</td>
<td>25%</td>
<td></td>
<td></td>
<td></td>
<td></td>
<td></td>
<td></td>
<td></td>
<td></td>
<td>25%</td>
<td></td>
</tr>
<tr>
<td><strong>TWD</strong></td>
<td></td>
<td>100%</td>
<td></td>
<td></td>
<td></td>
<td></td>
<td></td>
<td></td>
<td></td>
<td></td>
<td></td>
<td></td>
<td></td>
</tr>
<tr>
<td><strong>UAH</strong></td>
<td>33%</td>
<td>33%</td>
<td>33%</td>
<td></td>
<td></td>
<td></td>
<td></td>
<td></td>
<td></td>
<td></td>
<td></td>
<td></td>
<td></td>
</tr>
<tr>
<td><strong>USD</strong></td>
<td></td>
<td>20%</td>
<td></td>
<td>20%</td>
<td>20%</td>
<td>20%</td>
<td></td>
<td></td>
<td>20%</td>
<td></td>
<td></td>
<td></td>
<td></td>
</tr>
<tr>
<td><strong>VND</strong></td>
<td></td>
<td>100%</td>
<td></td>
<td></td>
<td></td>
<td></td>
<td></td>
<td></td>
<td></td>
<td></td>
<td></td>
<td></td>
<td></td>
</tr>
<tr>
<td><strong>ZAR</strong></td>
<td></td>
<td>50%</td>
<td></td>
<td></td>
<td></td>
<td></td>
<td></td>
<td></td>
<td></td>
<td></td>
<td>50%</td>
<td></td>
<td></td>
</tr>
</tbody>
</table>
<details class="wiki-table-source"><summary>Original table source</summary><pre><code>{| class="wikitable"
! Currency || Huobi || Coingecko || Binance || CoinbasePro || Kraken || Bitstamp || Exmo || Bitfinex || Independent&lt;/br&gt;Reserve || Bitbay || Luno || Paribu || Quoine
|-
| '''THB''' ||  || 100% ||  ||  ||  ||  ||  ||  ||  ||  ||  ||  || &#10;|- style="background-color: #ECECF0"
| '''TRY''' || 25% || 25% || 25% ||  ||  ||  ||  ||  ||  ||  ||  || 25% || &#10;|-
| '''TWD''' ||  || 100% ||  ||  ||  ||  ||  ||  ||  ||  ||  ||  || &#10;|- style="background-color: #ECECF0"
| '''UAH''' || 33% || 33% || 33% ||  ||  ||  ||  ||  ||  ||  ||  ||  || &#10;|-
| '''USD''' ||  || 20% ||  || 20% || 20% || 20% ||  ||  || 20% ||  ||  ||  ||  &#10;|- style="background-color: #ECECF0"
| '''VND''' ||  || 100% ||  ||  ||  ||  ||  ||  ||  ||  ||  ||  || &#10;|-
| '''ZAR''' ||  || 50% ||  ||  ||  ||  ||  ||  ||  ||  || 50% ||  || &#10;|}</code></pre></details>

<span class="wiki-legacy-anchor" id="Altcoins:" aria-hidden="true">
</span>

#### Altcoins: {#altcoins}

<small>A:Binance B:Huobi C:Kraken D:Poloniex E:Exmo F:Bitstamp G:Bitfinex H:CoinbasePro I:BTCmarkets J:Coingecko K:Bitbay LːBitflyer M:Quoine</small>

<table>
<tbody>
<tr>
<td></td>
<td>A</td>
<td>B</td>
<td>C</td>
<td>D</td>
<td>E</td>
<td>F</td>
<td>G</td>
<td>H</td>
<td>I</td>
<td>J</td>
<td>K</td>
<td>L</td>
<td>M</td>
</tr>
<tr>
<td>BTM</td>
<td></td>
<td>100%</td>
<td></td>
<td></td>
<td></td>
<td></td>
<td></td>
<td></td>
<td></td>
<td></td>
<td></td>
<td></td>
<td></td>
</tr>
<tr>
<td>DASH</td>
<td>20%</td>
<td>20%</td>
<td>20%</td>
<td>20%</td>
<td></td>
<td></td>
<td></td>
<td>20%</td>
<td></td>
<td></td>
<td></td>
<td></td>
<td></td>
</tr>
<tr>
<td>DCR</td>
<td>33%</td>
<td>33%</td>
<td></td>
<td>33%</td>
<td></td>
<td></td>
<td></td>
<td></td>
<td></td>
<td></td>
<td></td>
<td></td>
<td></td>
</tr>
<tr>
<td>DOGE</td>
<td>33%</td>
<td>33%</td>
<td></td>
<td>33%</td>
<td></td>
<td></td>
<td></td>
<td></td>
<td></td>
<td></td>
<td></td>
<td></td>
<td></td>
</tr>
<tr>
<td>ETC</td>
<td>20%</td>
<td>20%</td>
<td>20%</td>
<td>20%</td>
<td></td>
<td></td>
<td></td>
<td>20%</td>
<td></td>
<td></td>
<td></td>
<td></td>
<td></td>
</tr>
<tr>
<td>ETH</td>
<td>12%</td>
<td>12%</td>
<td>12%</td>
<td>12%</td>
<td></td>
<td>12%</td>
<td></td>
<td>12%</td>
<td>12%</td>
<td>12%</td>
<td></td>
<td>12%</td>
<td></td>
</tr>
<tr>
<td>FAIR</td>
<td></td>
<td>100%</td>
<td></td>
<td></td>
<td></td>
<td></td>
<td></td>
<td></td>
<td></td>
<td></td>
<td></td>
<td></td>
<td></td>
</tr>
<tr>
<td>LTC</td>
<td>12%</td>
<td>12%</td>
<td>12%</td>
<td>12%</td>
<td></td>
<td>12%</td>
<td></td>
<td>12%</td>
<td>12%</td>
<td>12%</td>
<td></td>
<td></td>
<td></td>
</tr>
<tr>
<td>XMR</td>
<td>25%</td>
<td>25%</td>
<td>25%</td>
<td>25%</td>
<td></td>
<td></td>
<td></td>
<td></td>
<td></td>
<td></td>
<td></td>
<td></td>
<td></td>
</tr>
<tr>
<td>ZEC</td>
<td>20%</td>
<td>20%</td>
<td>20%</td>
<td>20%</td>
<td></td>
<td></td>
<td></td>
<td>20%</td>
<td></td>
<td></td>
<td></td>
<td></td>
<td></td>
</tr>
<tr>
<td>ZEN</td>
<td>33%</td>
<td>33%</td>
<td></td>
<td></td>
<td></td>
<td></td>
<td></td>
<td>33%</td>
<td></td>
<td></td>
<td></td>
<td></td>
<td></td>
</tr>
<tr>
<td></td>
<td>A</td>
<td>B</td>
<td>C</td>
<td>D</td>
<td>E</td>
<td>F</td>
<td>G</td>
<td>H</td>
<td>I</td>
<td>J</td>
<td>K</td>
<td>L</td>
<td>M</td>
</tr>
</tbody>
</table>
<details class="wiki-table-source"><summary>Original table source</summary><pre><code>{| class="wikitable"
|  || A || B || C || D || E || F || G || H || I || J || K || L || M
|- style="background-color: #ECECF0"
| BTM ||  || 100% ||  ||  ||  ||  ||  ||  ||  ||  ||  ||  || &#10;|-
| DASH || 20% || 20% || 20% || 20% ||  ||  ||  || 20% ||  ||  ||  ||  || &#10;|- style="background-color: #ECECF0"
| DCR || 33% || 33% ||  || 33% ||  ||  ||  ||  ||  ||  ||  ||  || &#10;|-
| DOGE || 33% || 33% ||  || 33% ||  ||  ||  ||  ||  ||  ||  ||  || &#10;|- style="background-color: #ECECF0"
| ETC || 20% || 20% || 20% || 20% ||  ||  ||  || 20% ||  ||  ||  ||  || &#10;|-
| ETH || 12% || 12% || 12% || 12% ||  || 12% ||  || 12% || 12% || 12% ||  || 12% || &#10;|- style="background-color: #ECECF0"
| FAIR ||  || 100% ||  ||  ||  ||  ||  ||  ||  ||  ||  ||  || &#10;|-
| LTC || 12% || 12% || 12% || 12% ||  || 12% ||  || 12% || 12% || 12% ||  ||  || &#10;|- style="background-color: #ECECF0"
| XMR || 25% || 25% || 25% || 25% ||  ||  ||  ||  ||  ||  ||  ||  || &#10;|- &#10;| ZEC || 20% || 20% || 20% || 20% ||  ||  ||  || 20% ||  ||  ||  ||  || &#10;|- style="background-color: #ECECF0"
| ZEN || 33% || 33% ||  ||  ||  ||  ||  || 33% ||  ||  ||  ||  || &#10;|-
|  || A || B || C || D || E || F || G || H || I || J || K || L || M
|}</code></pre></details>

<small>A:Binance B:Huobi C:Kraken D:Poloniex E:Exmo F:Bitstamp G:Bitfinex H:Bitpay I:BTCmarkets J:Coingecko K:Bitbay LːBitflyer M:Quobi</small>

</div>
