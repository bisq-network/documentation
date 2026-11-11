---
title: "How to do arbitrage on Bisq"
slug: "wiki/how-to-do-arbitrage-on-bisq"
tableOfContents: false
---

<nav data-pagefind-ignore class="wiki-source-toc" aria-label="Article sections"><details open><summary>On this page</summary><ul><li><a href="#types-of-arbitrage-on-bisq">Types of Arbitrage on Bisq</a></li><li><a href="#inter-exchange-arbitrage">Inter-Exchange Arbitrage</a></li><li><a href="#intra-exchange-arbitrage">Intra-Exchange Arbitrage</a></li><li><a href="#cross-currency-arbitrage">Cross-Currency Arbitrage</a></li><li><a href="#payment-method-arbitrage">Payment Method Arbitrage</a></li><li><a href="#risks-and-considerations">Risks and Considerations</a></li></ul></details></nav>

<div class="wiki-recovered-article" lang="en">

**Arbitrage** is the practice of simultaneously buying and selling an asset in different markets (or in different forms within the same market) to profit from a temporary price difference. In inefficient or less liquid markets, like many peer-to-peer environments, arbitrage opportunities can arise more frequently.

[Arbitrageurs](../how-to-be-a-market-maker-on-bisq/) play a necessary role by taking advantage of these inefficiencies. In doing so, they not only profit but also help improve market liquidity and price discovery, making the market more efficient for everyone. Bisq currently provides many arbitrage opportunities.

<aside class="wiki-admonition" role="note">

**Note**

**Version Context:** The examples and considerations on this page primarily relate to arbitrage involving the classic **[Bisq v1](../bisq-1/)** trading protocol. Arbitrage mechanics may differ significantly with the newer **[Bisq Easy](../bisq-2/)** protocol (detailed on the [Bisq 2](../bisq-2/) page), which is not the focus of this guide.

</aside>

<aside class="wiki-admonition" role="note">

**Warning**

**Disclaimer:** The price examples below are purely illustrative using hypothetical market conditions (approx. €80,000-€90,000 BTC/EUR) and plausible spreads. Real prices and spreads fluctuate constantly. Successful arbitrage requires accounting for all fees (trading, mining, payment method) and risks.

</aside>

<span class="wiki-legacy-anchor" id="Types_of_Arbitrage_on_Bisq" aria-hidden="true">
</span>

## Types of Arbitrage on Bisq {#types-of-arbitrage-on-bisq}

You can perform two main types of arbitrage involving Bisq:

<span class="wiki-legacy-anchor" id="Inter-Exchange_Arbitrage" aria-hidden="true">
</span>

### Inter-Exchange Arbitrage {#inter-exchange-arbitrage}

This involves finding price differences between Bisq and another exchange or market (Market X).

**Example:**

1. You observe that the lowest price to **SELL** Bitcoin on Bisq\'s EUR/BTC market is currently **€86,000**.
2. Simultaneously, you find you can **BUY** Bitcoin on Market X (e.g., a centralized exchange) for **€85,000**.
3. You execute both trades at roughly the same time: **Buy** 1 BTC on Market X for €85,000 and **Sell** 1 BTC on Bisq for €86,000.
4. Assuming successful execution, this yields a potential profit of **€1000** per BTC, **before** accounting for any fees (trading, withdrawal, mining, payment method).

(The reverse is also possible: buying cheaper on Bisq and selling higher elsewhere).

<span class="wiki-legacy-anchor" id="Intra-Exchange_Arbitrage" aria-hidden="true">
</span>

### Intra-Exchange Arbitrage {#intra-exchange-arbitrage}

This involves exploiting price differences \*within\* the Bisq platform itself. This can happen between different currency markets or different payment methods within the same currency market.

<span class="wiki-legacy-anchor" id="Cross-Currency_Arbitrage" aria-hidden="true">
</span>

#### Cross-Currency Arbitrage {#cross-currency-arbitrage}

If the implied cross-rate between two fiat currencies (e.g., USD and EUR) differs from the prevailing market rate, an opportunity might exist.

**Example:**

1. You notice the relative price in Bisq\'s USD/BTC market (e.g., equivalent to €86,000) is higher than in Bisq\'s EUR/BTC market (e.g., €85,000).
2. You simultaneously **SELL** BTC for USD (at the higher relative price) and **BUY** BTC for EUR (at the lower relative price) on Bisq.
3. If done correctly with sufficient volume, you can lock in a profit based on the temporary price discrepancy between the two Bisq markets (factoring in fees and the actual EUR/USD exchange rate).
4. Repeat as long as the profitable spread exists.

<span class="wiki-legacy-anchor" id="Payment_Method_Arbitrage" aria-hidden="true">
</span>

#### Payment Method Arbitrage {#payment-method-arbitrage}

Different payment methods within the same currency market (e.g., EUR) might have different prices due to varying user preferences, risks, or settlement times associated with those methods.

**Example:**

1. You see offers available to **BUY** Bitcoin using [SEPA](../sepa-p551/) priced relatively low (e.g., at €85,000).
2. At the same time, you see offers available to **SELL** Bitcoin receiving payment via Revolut priced higher (e.g., at €86,000).
3. You simultaneously execute both: **BUY** 1 BTC using [SEPA](../sepa-p551/) for €85,000 and **SELL** 1 BTC receiving Revolut for €86,000.
4. This yields a potential profit of **€1000** per BTC arbitraged between the two payment methods on Bisq, **before** accounting for fees.
5. Repeat as long as the profitable spread exists.

<span class="wiki-legacy-anchor" id="Risks_and_Considerations" aria-hidden="true">
</span>

## Risks and Considerations {#risks-and-considerations}

While arbitrage aims to be low-risk by locking in profits from existing price differences, several practical factors introduce risk and complexity, especially on a P2P platform like Bisq:

- **Execution Risk:** Prices can change quickly. Delay in executing one leg of the arbitrage (e.g., your external market buy fills but your Bisq sell offer gets taken by someone else before you can place it, or vice-versa) can erase the profit or lead to a loss. Getting both sides filled simultaneously at the desired prices can be challenging.
- **Fees:** Remember to account for all fees:

<code>   \* Bisq [trading fees](../trading-fees/) (maker/taker, paid in BTC or BSQ).</code>\
<code>   \* Bitcoin [mining fees](../mining-fees/) (for deposit and payout transactions in Bisq v1).</code>\
<code>   \* Fees associated with the specific [payment methods](../payment-methods/) used (both on Bisq and external exchanges).</code>\
`   * Fees on the external exchange (Market X).`

- **Capital Requirements:** You need sufficient capital available on both platforms/payment methods simultaneously to execute both legs of the trade (BTC and/or fiat).
- **Counterparty Risk (Bisq v1):** While [security deposits](../security-deposit/) mitigate risk, trades can still go to [dispute resolution](../dispute-resolution-in-bisq-1/), potentially tying up your funds (including deposits) for some time. Ensure you understand the risks associated with the specific payment methods and trade protocol.
- **Settlement Times:** Fiat payment methods have varying settlement times. An arbitrage might require managing cash flow across methods that settle at different speeds.

Successful arbitrage requires careful calculation, quick execution, and a good understanding of the platforms and payment methods involved.

- For more short guides see [Howto](../howto/). You can also find support on **[Matrix](https://bisq.chat)**.

</div>
