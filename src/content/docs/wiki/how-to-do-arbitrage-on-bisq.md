---
title: "How to do arbitrage on Bisq"
slug: "wiki/how-to-do-arbitrage-on-bisq"
tableOfContents: false
---

<nav data-pagefind-ignore class="wiki-source-toc" aria-label="Article sections"><details open><summary>On this page</summary><ul><li><a href="#types-of-arbitrage-on-bisq">Types of Arbitrage on Bisq</a></li><li><a href="#inter-exchange-arbitrage">Inter-Exchange Arbitrage</a></li><li><a href="#intra-exchange-arbitrage">Intra-Exchange Arbitrage</a></li><li><a href="#cross-currency-arbitrage">Cross-Currency Arbitrage</a></li><li><a href="#payment-method-arbitrage">Payment Method Arbitrage</a></li><li><a href="#risks-and-considerations">Risks and Considerations</a></li></ul></details></nav>

<div class="wiki-recovered-article" lang="en"><p><strong>Arbitrage</strong> is the practice of simultaneously buying and selling an asset in different markets (or in different forms within the same market) to profit from a temporary price difference. In inefficient or less liquid markets, like many peer-to-peer environments, arbitrage opportunities can arise more frequently.</p>
<p><a href="../how-to-be-a-market-maker-on-bisq/">Arbitrageurs</a> play a necessary role by taking advantage of these inefficiencies. In doing so, they not only profit but also help improve market liquidity and price discovery, making the market more efficient for everyone. Bisq currently provides many arbitrage opportunities.</p>
<aside class="wiki-admonition" role="note"><p><strong>Note</strong></p><p><strong>Version Context:</strong> The examples and considerations on this page primarily relate to arbitrage involving the classic <strong><a href="../bisq-1/">Bisq v1</a></strong> trading protocol. Arbitrage mechanics may differ significantly with the newer <strong><a href="../bisq-2/">Bisq Easy</a></strong> protocol (detailed on the <a href="../bisq-2/">Bisq 2</a> page), which is not the focus of this guide.</p>
</aside>
<aside class="wiki-admonition" role="note"><p><strong>Warning</strong></p><p><strong>Disclaimer:</strong> The price examples below are purely illustrative using hypothetical market conditions (approx. €80,000-€90,000 BTC/EUR) and plausible spreads. Real prices and spreads fluctuate constantly. Successful arbitrage requires accounting for all fees (trading, mining, payment method) and risks.</p>
</aside>
<span class="wiki-legacy-anchor" id="Types_of_Arbitrage_on_Bisq" aria-hidden="true"></span><h2 id="types-of-arbitrage-on-bisq"> Types of Arbitrage on Bisq </h2>
<p>You can perform two main types of arbitrage involving Bisq:</p>
<span class="wiki-legacy-anchor" id="Inter-Exchange_Arbitrage" aria-hidden="true"></span><h3 id="inter-exchange-arbitrage"> Inter-Exchange Arbitrage </h3>
<p>This involves finding price differences between Bisq and another exchange or market (Market X).</p>
<p><strong>Example:</strong></p>
<ol>
<li>You observe that the lowest price to <strong>SELL</strong> Bitcoin on Bisq's EUR/BTC market is currently <strong>€86,000</strong>.</li>
<li>Simultaneously, you find you can <strong>BUY</strong> Bitcoin on Market X (e.g., a centralized exchange) for <strong>€85,000</strong>.</li>
<li>You execute both trades at roughly the same time: <strong>Buy</strong> 1 BTC on Market X for €85,000 and <strong>Sell</strong> 1 BTC on Bisq for €86,000.</li>
<li>Assuming successful execution, this yields a potential profit of <strong>€1000</strong> per BTC, <strong>before</strong> accounting for any fees (trading, withdrawal, mining, payment method).</li>
</ol>
<p>(The reverse is also possible: buying cheaper on Bisq and selling higher elsewhere).</p>
<span class="wiki-legacy-anchor" id="Intra-Exchange_Arbitrage" aria-hidden="true"></span><h3 id="intra-exchange-arbitrage"> Intra-Exchange Arbitrage </h3>
<p>This involves exploiting price differences *within* the Bisq platform itself. This can happen between different currency markets or different payment methods within the same currency market.</p>
<span class="wiki-legacy-anchor" id="Cross-Currency_Arbitrage" aria-hidden="true"></span><h4 id="cross-currency-arbitrage"> Cross-Currency Arbitrage </h4>
<p>If the implied cross-rate between two fiat currencies (e.g., USD and EUR) differs from the prevailing market rate, an opportunity might exist.</p>
<p><strong>Example:</strong></p>
<ol>
<li>You notice the relative price in Bisq's USD/BTC market (e.g., equivalent to €86,000) is higher than in Bisq's EUR/BTC market (e.g., €85,000).</li>
<li>You simultaneously <strong>SELL</strong> BTC for USD (at the higher relative price) and <strong>BUY</strong> BTC for EUR (at the lower relative price) on Bisq.</li>
<li>If done correctly with sufficient volume, you can lock in a profit based on the temporary price discrepancy between the two Bisq markets (factoring in fees and the actual EUR/USD exchange rate).</li>
<li>Repeat as long as the profitable spread exists.</li>
</ol>
<span class="wiki-legacy-anchor" id="Payment_Method_Arbitrage" aria-hidden="true"></span><h4 id="payment-method-arbitrage"> Payment Method Arbitrage </h4>
<p>Different payment methods within the same currency market (e.g., EUR) might have different prices due to varying user preferences, risks, or settlement times associated with those methods.</p>
<p><strong>Example:</strong></p>
<ol>
<li>You see offers available to <strong>BUY</strong> Bitcoin using <a href="../sepa-p551/">SEPA</a> priced relatively low (e.g., at €85,000).</li>
<li>At the same time, you see offers available to <strong>SELL</strong> Bitcoin receiving payment via Revolut priced higher (e.g., at €86,000).</li>
<li>You simultaneously execute both: <strong>BUY</strong> 1 BTC using <a href="../sepa-p551/">SEPA</a> for €85,000 and <strong>SELL</strong> 1 BTC receiving Revolut for €86,000.</li>
<li>This yields a potential profit of <strong>€1000</strong> per BTC arbitraged between the two payment methods on Bisq, <strong>before</strong> accounting for fees.</li>
<li>Repeat as long as the profitable spread exists.</li>
</ol>
<span class="wiki-legacy-anchor" id="Risks_and_Considerations" aria-hidden="true"></span><h2 id="risks-and-considerations"> Risks and Considerations </h2>
<p>While arbitrage aims to be low-risk by locking in profits from existing price differences, several practical factors introduce risk and complexity, especially on a P2P platform like Bisq:</p>
<ul>
<li><strong>Execution Risk:</strong> Prices can change quickly. Delay in executing one leg of the arbitrage (e.g., your external market buy fills but your Bisq sell offer gets taken by someone else before you can place it, or vice-versa) can erase the profit or lead to a loss. Getting both sides filled simultaneously at the desired prices can be challenging.</li>
<li><strong>Fees:</strong> Remember to account for all fees:</li>
</ul>
<p><code>   * Bisq <a href="../trading-fees/">trading fees</a> (maker/taker, paid in BTC or BSQ).</code><br>
<code>   * Bitcoin <a href="../mining-fees/">mining fees</a> (for deposit and payout transactions in Bisq v1).</code><br>
<code>   * Fees associated with the specific <a href="../payment-methods/">payment methods</a> used (both on Bisq and external exchanges).</code><br>
<code>   * Fees on the external exchange (Market X).</code></p>
<ul>
<li><strong>Capital Requirements:</strong> You need sufficient capital available on both platforms/payment methods simultaneously to execute both legs of the trade (BTC and/or fiat).</li>
<li><strong>Counterparty Risk (Bisq v1):</strong> While <a href="../security-deposit/">security deposits</a> mitigate risk, trades can still go to <a href="../dispute-resolution-in-bisq-1/">dispute resolution</a>, potentially tying up your funds (including deposits) for some time. Ensure you understand the risks associated with the specific payment methods and trade protocol.</li>
<li><strong>Settlement Times:</strong> Fiat payment methods have varying settlement times. An arbitrage might require managing cash flow across methods that settle at different speeds.</li>
</ul>
<p>Successful arbitrage requires careful calculation, quick execution, and a good understanding of the platforms and payment methods involved.</p>
<ul>
<li>For more short guides see <a href="../howto/">Howto</a>. You can also find support on <strong><a href="https://bisq.chat" rel="noopener noreferrer">Matrix</a></strong>.</li>
</ul>
</div>
