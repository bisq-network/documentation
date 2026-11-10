---
title: "Payment methods/en"
slug: "wiki/payment-methods-en"
tableOfContents: false
---

<nav data-pagefind-ignore class="wiki-source-toc" aria-label="Article sections"><details open><summary>On this page</summary><ul><li><a href="#fiat-payment-methods">Fiat payment methods</a></li><li><a href="#payment-method-guides">Payment method guides</a></li><li><a href="#altcoin-payment-methods">Altcoin payment methods</a></li></ul></details></nav>

<div class="wiki-recovered-article" lang="en"><p><span class="wiki-markup-gap" role="note"><strong>[Unsupported MediaWiki markup: languages]</strong> <code class="wiki-source-markup">&lt;languages/&gt;</code></span> Bisq offers several <strong>payment methods</strong> to buy and sell bitcoin for fiat currencies or other cryptocurrencies.</p>
<p>Every offer on Bisq designates a payment method for traders to settle payments. The Bisq software does not actually integrate with any payment methods—<strong>all non-bitcoin fund transfers are made outside of Bisq software</strong>.</p>
<p>Unlike cryptocurrency transfers, fiat payment transfers are riddled with flaws and limitations that require Bisq to employ several measures to encourage fair and honest trades.</p>
<p>Among these measures are:</p>
<ul>
<li><strong>Account aging</strong> that phases in maximum trade sizes over 60 days; trade sizes vary by the risk profile of each payment method.</li>
<li><strong>Account signing</strong> as an additional check on account aging for payment methods with chargeback risk.</li>
</ul>
<p>See more details on these mechanisms at <a href="../account-limits/">account limits</a>.</p>
<span class="wiki-legacy-anchor" id="Fiat_payment_methods" aria-hidden="true"></span><h2 id="fiat-payment-methods"> Fiat payment methods </h2>
<p>The payment methods vary in chargeback risk, regional availability, transaction size, fees, privacy, verifiability, and other characteristics. The top consideration for maintaining payment methods is chargeback risk. PayPal, Venmo, and Cash App are not supported on Bisq because chargebacks for payments made with those services are relatively easy.</p>
<p>We welcome suggestions for new payment methods on Bisq, especially for those that enable new markets. Documentation on the criteria and process for adding new payment methods is <a href="https://github.com/bisq-network/bisq-docs/issues/172" rel="noopener noreferrer">forthcoming</a>. For now, feel free to make suggestions by reaching out on <a href="https://keybase.io/team/bisq" rel="noopener noreferrer">Keybase</a>.</p>
<p>Below is a list of fiat payment methods Bisq currently supports.</p>
<p><em>Note: The maximum trade sizes listed below are not available for most newly-created payment accounts. Please refer to <a href="https://bisq.wiki/Account_signing" rel="noopener noreferrer">Account signing</a> for details on how to enable larger trade sizes for your payment accounts.</em></p>
<table>
<thead>
<tr>
<th>Payment Method</th>
<th>Region</th>
<th>Trading Period</th>
<th>Per-Trade Limit</th>
<th>Notes</th>
</tr>
</thead>
<tbody>
<tr>
<td>Advanced Cash*</td>
<td>Global</td>
<td>1 day</td>
<td>2.00 BTC</td>
<td>Not available in the USA</td>
</tr>
<tr>
<td>Alipay*</td>
<td>China</td>
<td>1 day</td>
<td>1.00 BTC</td>
<td></td>
</tr>
<tr>
<td>Cash Deposit*</td>
<td>N/A</td>
<td>4 days</td>
<td>0.25 BTC</td>
<td>Some banks don't accept cash deposits from non-customers</td>
</tr>
<tr>
<td>Chase QuickPay</td>
<td>USA</td>
<td>1 day</td>
<td>0.25 BTC</td>
<td></td>
</tr>
<tr>
<td>Face-to-Face (F2F)*</td>
<td>Global</td>
<td>4 days</td>
<td>1.00 BTC</td>
<td></td>
</tr>
<tr>
<td><a href="../faster-payments/">Faster Payments</a>*</td>
<td>UK</td>
<td>1 day</td>
<td>0.25 BTC</td>
<td><a href="../faster-payments/">See article</a> for recent changes to avoid issues.</td>
</tr>
<tr>
<td>HalCash*</td>
<td>Spain</td>
<td>1 day</td>
<td>1.00 BTC</td>
<td></td>
</tr>
<tr>
<td>Interac e-Transfer</td>
<td>Canada</td>
<td>1 day</td>
<td>0.25 BTC</td>
<td></td>
</tr>
<tr>
<td>Japan Zengin Furikomi*</td>
<td>Japan</td>
<td>1 day</td>
<td>1.00 BTC</td>
<td></td>
</tr>
<tr>
<td>MoneyBeam (N26)</td>
<td>Europe</td>
<td>1 day</td>
<td>0.25 BTC</td>
<td></td>
</tr>
<tr>
<td>MoneyGram*</td>
<td>Global</td>
<td>4 days</td>
<td>0.50 BTC</td>
<td></td>
</tr>
<tr>
<td>National Bank Transfer</td>
<td>N/A</td>
<td>4 days</td>
<td>0.25 BTC</td>
<td></td>
</tr>
<tr>
<td>Perfect Money*</td>
<td>Europe and USA</td>
<td>1 day</td>
<td>1.00 BTC</td>
<td></td>
</tr>
<tr>
<td>Popmoney</td>
<td>USA</td>
<td>1 day</td>
<td>0.25 BTC</td>
<td></td>
</tr>
<tr>
<td>PromptPay*</td>
<td>Thailand</td>
<td>1 day</td>
<td>1.00 BTC</td>
<td></td>
</tr>
<tr>
<td><a href="../revolut/">Revolut</a></td>
<td>Global</td>
<td>1 day</td>
<td>0.25 BTC</td>
<td><a href="../revolut/">See article</a> for recent changes to avoid issues.</td>
</tr>
<tr>
<td>SEPA</td>
<td>Europe</td>
<td>6 days</td>
<td>0.25 BTC</td>
<td></td>
</tr>
<tr>
<td>SEPA Instant</td>
<td>Europe</td>
<td>1 day</td>
<td>0.25 BTC</td>
<td></td>
</tr>
<tr>
<td>Swish*</td>
<td>Sweden</td>
<td>1 day</td>
<td>1.00 BTC</td>
<td></td>
</tr>
<tr>
<td>Transfer with Same Bank</td>
<td>N/A</td>
<td>2 days</td>
<td>0.25 BTC</td>
<td></td>
</tr>
<tr>
<td>Transfer from Specific Banks</td>
<td>N/A</td>
<td>4 days</td>
<td>0.25 BTC</td>
<td></td>
</tr>
<tr>
<td>US Postal Money Order*</td>
<td>USA</td>
<td>8 days</td>
<td>0.25 BTC</td>
<td>Maximum is $1,000 per money order within the USA</td>
</tr>
<tr>
<td>Uphold</td>
<td>Global</td>
<td>1 day</td>
<td>0.25 BTC</td>
<td></td>
</tr>
<tr>
<td>WeChat Pay*</td>
<td>China</td>
<td>1 day</td>
<td>1.00 BTC</td>
<td></td>
</tr>
<tr>
<td>Western Union</td>
<td>Global</td>
<td>4 days</td>
<td>0.50 BTC</td>
<td></td>
</tr>
<tr>
<td>Zelle</td>
<td>USA</td>
<td>4 days</td>
<td>0.25 BTC</td>
<td></td>
</tr>
</tbody>
</table>
<details class="wiki-table-source"><summary>Original table source</summary><pre><code>{| class="wikitable sortable"
|-
! Payment Method !! Region !! Trading Period !! Per-Trade Limit !! Notes
|-
| Advanced Cash* || Global || 1 day || 2.00 BTC || Not available in the USA
|-
| Alipay* || China || 1 day || 1.00 BTC || &#10;|-
| Cash Deposit* || N/A || 4 days || 0.25 BTC || Some banks don't accept cash deposits from non-customers
|-
| Chase QuickPay || USA || 1 day || 0.25 BTC || &#10;|-
| Face-to-Face (F2F)* || Global || 4 days  || 1.00 BTC || &#10;|-
| [[Faster Payments]]* || UK || 1 day || 0.25 BTC || [[Faster_Payments|See article]] for recent changes to avoid issues.
|-
| HalCash* || Spain || 1 day || 1.00 BTC || &#10;|-
| Interac e-Transfer || Canada || 1 day || 0.25 BTC || &#10;|-
| Japan Zengin Furikomi* || Japan || 1 day || 1.00 BTC || &#10;|-
| MoneyBeam (N26) || Europe || 1 day || 0.25 BTC || &#10;|-
| MoneyGram* || Global || 4 days  || 0.50 BTC || &#10;|-
| National Bank Transfer || N/A || 4 days  || 0.25 BTC || &#10;|-
| Perfect Money* || Europe and USA || 1 day || 1.00 BTC || &#10;|-
| Popmoney || USA || 1 day || 0.25 BTC || &#10;|-
| PromptPay* || Thailand || 1 day || 1.00 BTC || &#10;|-
| [[Revolut]] || Global || 1 day || 0.25 BTC || [[Revolut|See article]] for recent changes to avoid issues.
|-
| SEPA || Europe || 6 days || 0.25 BTC || &#10;|-
| SEPA Instant || Europe || 1 day || 0.25 BTC || &#10;|-
| Swish* || Sweden || 1 day || 1.00 BTC || &#10;|-
| Transfer with Same Bank || N/A || 2 days || 0.25 BTC || &#10;|-
| Transfer from Specific Banks  || N/A || 4 days  || 0.25 BTC || &#10;|-
| US Postal Money Order* || USA || 8 days || 0.25 BTC || Maximum is $1,000 per money order within the USA
|-
| Uphold || Global || 1 day || 0.25 BTC || &#10;|-
| WeChat Pay* || China || 1 day || 1.00 BTC || &#10;|-
| Western Union || Global || 4 days  || 0.50 BTC || &#10;|-
| Zelle || USA || 4 days  || 0.25 BTC || &#10;|}</code></pre></details>
<p><code class="wiki-source-code" id="source-code-1">*</code> These payment methods do not need to be signed to lift the 0.01 BTC buying limit (see <a href="https://bisq.wiki/Account_signing" rel="noopener noreferrer">account signing</a> for more details).</p>
<span class="wiki-legacy-anchor" id="Payment_method_guides" aria-hidden="true"></span><h3 id="payment-method-guides"> Payment method guides </h3>
<div>
<li>
<figure class="wiki-source-image" id="source-image-1"><a href="../../media/wiki/2200cb7e4e0e0b35eb276a25047fee62559487ee2c8deedf35458c186bc9adcb.png"><img alt="EUR payment methods overview." decoding="async" height="1958" loading="lazy" src="../../media/wiki/2200cb7e4e0e0b35eb276a25047fee62559487ee2c8deedf35458c186bc9adcb.png" width="1046"></a><figcaption>EUR payment methods overview.<br><small>Historical full-size recovered source. <a href="../../recovered-media/">Provenance catalogue</a>.</small></figcaption></figure>
</li>
<li>
<figure class="wiki-source-image" id="source-image-2"><a href="../../media/wiki/88410f93192e7e3b20e5f65179f304332e8e8728b7431b14700fe7cfd6c9b5ef.png"><img alt="USD payment methods overview." decoding="async" height="1956" loading="lazy" src="../../media/wiki/88410f93192e7e3b20e5f65179f304332e8e8728b7431b14700fe7cfd6c9b5ef.png" width="1046"></a><figcaption>USD payment methods overview.<br><small>Historical full-size recovered source. <a href="../../recovered-media/">Provenance catalogue</a>.</small></figcaption></figure>
</li>
</div>
<div>
</div>
<span class="wiki-legacy-anchor" id="Altcoin_payment_methods" aria-hidden="true"></span><h2 id="altcoin-payment-methods"> Altcoin payment methods </h2>
<p>Bisq also supports a <a href="https://bisq.network/markets/" rel="noopener noreferrer">variety</a> of cryptocurrencies for buying and selling bitcoin, like <span class="wiki-link-gap">XMR <small>[unrecovered article: XMR]</small></span>, <span class="wiki-link-gap">ETH <small>[unrecovered article: ETH]</small></span>, <span class="wiki-link-gap">ZEC <small>[unrecovered article: ZEC]</small></span>, <span class="wiki-link-gap">L-BTC <small>[unrecovered article: L-BTC]</small></span> or <span class="wiki-link-gap">LTC <small>[unrecovered article: LTC]</small></span>.</p>
<p>Because altcoin transfers are irreversible and relatively quick, altcoin trades can be up to 2 BTC in size right away (no need to wait for account aging or account signing).</p>
<table>
<thead>
<tr>
<th>Payment Method</th>
<th>Trading Period</th>
<th>Per-Trade Limit</th>
</tr>
</thead>
<tbody>
<tr>
<td>Altcoins</td>
<td>1 day</td>
<td>2.00 BTC</td>
</tr>
<tr>
<td>Altcoins Instant</td>
<td>1 hour</td>
<td>2.00 BTC</td>
</tr>
</tbody>
</table>
<details class="wiki-table-source"><summary>Original table source</summary><pre><code>{| class="wikitable"
|-
! Payment Method !! Trading Period !! Per-Trade Limit
|-
| Altcoins || 1 day || 2.00 BTC
|-
| Altcoins Instant || 1 hour || 2.00 BTC
|}</code></pre></details>
<p>Altcoins Instant trades go by fast! Please remember to disable Instant offers in <code class="wiki-source-code" id="source-code-2">Portfolio</code> &gt; <code class="wiki-source-code" id="source-code-3">My Open Offers</code> if you might not be around to settle an Instant trade.</p>
<p>See more details about creating altcoin accounts <a href="https://bisq.wiki/Create_an_altcoin_account" rel="noopener noreferrer">here</a>.</p>
</div>
