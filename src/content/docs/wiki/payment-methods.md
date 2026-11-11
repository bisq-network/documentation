---
title: "Payment methods"
slug: "wiki/payment-methods"
tableOfContents: false
---

<nav data-pagefind-ignore class="wiki-source-toc" aria-label="Article sections"><details open><summary>On this page</summary><ul><li><a href="#fiat-payment-methods">Fiat payment methods</a></li><li><a href="#payment-method-guides">Payment method guides</a></li><li><a href="#altcoin-payment-methods">Altcoin payment methods</a></li></ul></details></nav>

<div class="wiki-recovered-article" lang="en">

<span class="wiki-markup-gap" role="note"><strong>[Unsupported MediaWiki markup: languages]</strong> <code class="wiki-source-markup">&lt;languages/&gt;</code></span> Bisq offers several **payment methods** to buy and sell bitcoin for fiat currencies or other cryptocurrencies.

<aside class="wiki-admonition" role="note">

**Note**

**Version Context:** The details on this page, particularly regarding trade limits and account signing, primarily apply to trading on **[Bisq v1](../bisq-1/)**.

</aside>

Every offer on Bisq designates a payment method for traders to settle payments. The Bisq software does not actually integrate with any payment methods—**all non-bitcoin fund transfers are made outside of Bisq software**.

Unlike cryptocurrency transfers, many fiat payment transfers have limitations that require Bisq [v1](../bisq-1/) to employ special measures like lower per-trade limits and [account signing](../account-limits/#account-signing) to encourage fair trades.

<span class="wiki-legacy-anchor" id="Fiat_payment_methods" aria-hidden="true">
</span>

## Fiat payment methods {#fiat-payment-methods}

Fiat payment methods vary significantly in characteristics like chargeback risk, regional availability, transaction limits, fees, privacy, and verification speed. The primary consideration for supporting a method on Bisq is **chargeback risk**. Methods with easy chargebacks (like PayPal, Venmo, Cash App) are generally not supported.

Suggestions for new payment methods, especially those enabling new markets, are welcome. See the criteria and process for adding methods [here on GitHub](https://github.com/bisq-network/growth/issues/new?assignees=&labels=re%3Apayment-method&template=add_payment_method.md&title=), or discuss them on [Matrix](https://bisq.chat) in the #payment-methods channel.

Below is a list of fiat payment methods currently supported in Bisq v1. The BTC amounts in this source table are historical reference figures, not a universal allowance for a current account. Bisq 1 v1.10.11 calculates method and account limits from protocol/DAO parameters and clamps its maximum at 0.25 BTC; confirm the amount shown by the client.

**Note on Signing Requirement:** Methods marked with an asterisk (\*) **do not** require [account signing](../account-limits/#account-signing) to lift the initial low buying limit. All other listed fiat methods generally require signing.

**Note on Trade Limits:** The maximum trade sizes listed below may not be available immediately for new payment accounts. Please refer to [Account limits](../account-limits/) for details on account aging and signing required to enable larger trade sizes.

<table>
<caption>Supported Fiat Payment Methods (Bisq v1)</caption>
<thead>
<tr>
<th>Payment Method [* = Signing Not Required]</th>
<th>Region</th>
<th>Trading Period</th>
<th>Per-Trade Limit (BTC)</th>
<th>Notes</th>
</tr>
</thead>
<tbody>
<tr>
<td><span class="wiki-link-gap">ACH <small>[unrecovered article: ACH]</small></span>*</td>
<td>USA</td>
<td>5 days</td>
<td>0.0624</td>
<td></td>
</tr>
<tr>
<td>Advanced Cash*</td>
<td>Global (BRL, EUR, GBP, KZT, RUB, UAH, USD)</td>
<td>1 day</td>
<td>0.5</td>
<td>Not available in the USA.</td>
</tr>
<tr>
<td>Alipay*</td>
<td>China</td>
<td>1 day</td>
<td>0.1252</td>
<td></td>
</tr>
<tr>
<td><a href="../amazon-egift-card/">Amazon eGift Card</a>*</td>
<td>Global (AUD, CAD, EUR, GBP, INR, JPY, SAR, SEK, SGD, TRY, USD)</td>
<td>1 day</td>
<td>0.0624</td>
<td>Check supported markets in <a href="../amazon-egift-card/">article</a>.</td>
</tr>
<tr>
<td>Australian PayID*</td>
<td>Australia</td>
<td>1 day</td>
<td>0.1252</td>
<td></td>
</tr>
<tr>
<td><a href="../bizum/">Bizum</a>*</td>
<td>Spain</td>
<td>1 day</td>
<td>0.02</td>
<td>Bizum limits: ~1000 EUR/trade, ~2000 EUR/day.</td>
</tr>
<tr>
<td><a href="../capitual/">Capitual</a>*</td>
<td>Global (BRL, EUR, GBP, USD)</td>
<td>1 day</td>
<td>0.0624</td>
<td></td>
</tr>
<tr>
<td><a href="../cash-by-mail/">Cash by Mail</a>*</td>
<td>Global</td>
<td>8 days</td>
<td>0.0624</td>
<td>Follow <a href="../cash-by-mail/">instructions carefully</a>.</td>
</tr>
<tr>
<td>Cash Deposit*</td>
<td>Global</td>
<td>4 days</td>
<td>0.0624</td>
<td>Check if payee bank allows 3rd party deposits.</td>
</tr>
<tr>
<td><a href="../celpay/">CelPay</a>*</td>
<td>Global (AUD, CAD, GBP, HKD, USD)</td>
<td>1 day</td>
<td>0.0624</td>
<td>CelPay limit: ~$2,500/day.</td>
</tr>
<tr>
<td>Domestic Wire Transfer*</td>
<td>USA</td>
<td>3 days</td>
<td>0.0624</td>
<td></td>
</tr>
<tr>
<td><a href="../face-to-face-payment-method/">Face-to-Face (F2F)</a>*</td>
<td>Global</td>
<td>4 days</td>
<td>0.25</td>
<td>See <a href="../face-to-face-payment-method/">F2F article</a> for guidance.</td>
</tr>
<tr>
<td><a href="../faster-payments/">Faster Payments</a>*</td>
<td>UK</td>
<td>1 day</td>
<td>0.0624</td>
<td>See <a href="../faster-payments/">article</a> for usage notes.</td>
</tr>
<tr>
<td><a href="../faster-payments-system-sbp/">Faster Payments System (SBP)</a>*</td>
<td>Russia</td>
<td>1 day</td>
<td>0.05</td>
<td></td>
</tr>
<tr>
<td>HalCash*</td>
<td>Spain</td>
<td>1 day</td>
<td>0.25</td>
<td></td>
</tr>
<tr>
<td><a href="../imps/">IMPS</a>*</td>
<td>India</td>
<td>1 day</td>
<td>0.0624</td>
<td>IMPS limit: ~1,000,000 INR/day.</td>
</tr>
<tr>
<td>Interac-e-Transfer</td>
<td>Canada</td>
<td>1 day</td>
<td>0.0624</td>
<td>Interac Autodeposit is <strong>not</strong> supported.</td>
</tr>
<tr>
<td>Japan Zengin Furikomi*</td>
<td>Japan</td>
<td>1 day</td>
<td>0.25</td>
<td></td>
</tr>
<tr>
<td>MercadoPago</td>
<td>Argentina</td>
<td>1 day</td>
<td>0.0624</td>
<td></td>
</tr>
<tr>
<td><a href="../monese/">Monese</a>*</td>
<td>Europe (GBP, EUR, RON)</td>
<td>1 day</td>
<td>0.0624</td>
<td></td>
</tr>
<tr>
<td>MoneyBeam (N26)</td>
<td>Europe</td>
<td>1 day</td>
<td>0.0624</td>
<td></td>
</tr>
<tr>
<td>MoneyGram*</td>
<td>Global</td>
<td>4 days</td>
<td>0.0832</td>
<td></td>
</tr>
<tr>
<td>National Bank Transfer</td>
<td>Global</td>
<td>4 days</td>
<td>0.0624</td>
<td></td>
</tr>
<tr>
<td><a href="../nequi/">Nequi</a>*</td>
<td>Colombia</td>
<td>1 day</td>
<td>0.0624</td>
<td>Nequi limit: ~7,000,000 COP/month.</td>
</tr>
<tr>
<td><a href="../neft/">NEFT</a>*</td>
<td>India</td>
<td>1 day</td>
<td>0.10</td>
<td>NEFT limit: ~50,000 INR/transaction.</td>
</tr>
<tr>
<td><a href="../paxum/">Paxum</a>*</td>
<td>Global</td>
<td>1 day</td>
<td>0.0624</td>
<td></td>
</tr>
<tr>
<td><a href="../paysera/">Paysera</a>*</td>
<td>Global</td>
<td>1 day</td>
<td>0.0624</td>
<td></td>
</tr>
<tr>
<td><a href="../paytm/">PayTM</a>*</td>
<td>India</td>
<td>1 day</td>
<td>0.0250</td>
<td>PayTM limit: ~100,000 INR/transaction.</td>
</tr>
<tr>
<td>Perfect Money*</td>
<td>Global</td>
<td>1 day</td>
<td>0.25</td>
<td></td>
</tr>
<tr>
<td><a href="../pix/">Pix</a>*</td>
<td>Brazil</td>
<td>1 day</td>
<td>0.0624</td>
<td></td>
</tr>
<tr>
<td>Popmoney</td>
<td>USA</td>
<td>1 day</td>
<td>0.0624</td>
<td></td>
</tr>
<tr>
<td>PromptPay*</td>
<td>Thailand</td>
<td>1 day</td>
<td>0.0624</td>
<td></td>
</tr>
<tr>
<td><a href="../revolut/">Revolut</a></td>
<td>Global</td>
<td>1 day</td>
<td>0.0624</td>
<td>See <a href="../revolut/">article</a> for usage notes.</td>
</tr>
<tr>
<td><a href="../rtgs/">RTGS</a>*</td>
<td>India</td>
<td>1 day</td>
<td>0.10</td>
<td>RTGS limits: Min 200,000 INR, Max 1,000,000 INR/transaction.</td>
</tr>
<tr>
<td><a href="../satispay/">Satispay</a>*</td>
<td>Italy</td>
<td>1 day</td>
<td>0.0624</td>
<td></td>
</tr>
<tr>
<td><a href="../sepa-p551/">SEPA</a></td>
<td>Europe</td>
<td>6 days</td>
<td>0.0624</td>
<td></td>
</tr>
<tr>
<td><a href="../sepa-instant/">SEPA Instant</a></td>
<td>Europe</td>
<td>1 day</td>
<td>0.0624</td>
<td></td>
</tr>
<tr>
<td><a href="../strike/">Strike</a>*</td>
<td>USA</td>
<td>1 day</td>
<td>0.0624</td>
<td>Non-KYC Strike users have lower limits.</td>
</tr>
<tr>
<td><a href="../swift/">SWIFT</a>*</td>
<td>Global</td>
<td>7 days</td>
<td>0.0832</td>
<td></td>
</tr>
<tr>
<td>Swish*</td>
<td>Sweden</td>
<td>1 day</td>
<td>0.1252</td>
<td></td>
</tr>
<tr>
<td><a href="../tikkie/">Tikkie</a>*</td>
<td>The Netherlands</td>
<td>1 day</td>
<td>0.0250</td>
<td>Tikkie limit: ~2500 EUR/24 hours.</td>
</tr>
<tr>
<td>Transfer with Same Bank</td>
<td>Global</td>
<td>2 days</td>
<td>0.0624</td>
<td></td>
</tr>
<tr>
<td>Transfer from Specific Banks</td>
<td>Global</td>
<td>4 days</td>
<td>0.0624</td>
<td></td>
</tr>
<tr>
<td><a href="../us-postal-money-order/">US Postal Money Order</a>*</td>
<td>USA</td>
<td>8 days</td>
<td>0.0624</td>
<td>USPS limits: Max 1000 USD/order, check daily limits.</td>
</tr>
<tr>
<td>Uphold</td>
<td>Global</td>
<td>1 day</td>
<td>0.0624</td>
<td></td>
</tr>
<tr>
<td><a href="../upi/">UPI</a>*</td>
<td>India</td>
<td>1 day</td>
<td>0.0250</td>
<td>UPI limit: ~100,000 INR/transaction.</td>
</tr>
<tr>
<td>WeChat Pay*</td>
<td>China</td>
<td>1 day</td>
<td>0.0832</td>
<td></td>
</tr>
<tr>
<td>Western Union</td>
<td>Global</td>
<td>4 days</td>
<td>0.0832</td>
<td></td>
</tr>
<tr>
<td><a href="../wise/">Wise</a>*</td>
<td>Global (<strong>non-USD</strong> trades)</td>
<td>4 days</td>
<td>0.0624</td>
<td></td>
</tr>
<tr>
<td><a href="../wise-usd/">Wise-USD</a>*</td>
<td>Global (<strong>USD</strong> trades)</td>
<td>4 days</td>
<td>0.0624</td>
<td></td>
</tr>
<tr>
<td><a href="../zelle/">Zelle</a></td>
<td>USA</td>
<td>4 days</td>
<td>0.0624</td>
<td>Check your bank's Zelle support &amp; limits.</td>
</tr>
</tbody>
</table>
<details class="wiki-table-source"><summary>Original table source</summary><pre><code>{| class="wikitable sortable"
|+ Supported Fiat Payment Methods (Bisq v1)
|-
! Payment Method [* = Signing Not Required] !! Region !! Trading Period !! Per-Trade Limit (BTC) !! Notes
|-
| [[ACH]]* || USA || 5 days || 0.0624 || &#10;|-
| Advanced Cash* || Global (BRL, EUR, GBP, KZT, RUB, UAH, USD) || 1 day || 0.5 || Not available in the USA.
|-
| Alipay* || China || 1 day || 0.1252 || &#10;|-
| [[Amazon_eGift_card|Amazon eGift Card]]* || Global (AUD, CAD, EUR, GBP, INR, JPY, SAR, SEK, SGD, TRY, USD) || 1 day || 0.0624 || Check supported markets in [[Amazon_eGift_card|article]].
|-
| Australian PayID* || Australia || 1 day || 0.1252 || &#10;|-
| [[Bizum]]* || Spain|| 1 day || 0.02 || Bizum limits: ~1000 EUR/trade, ~2000 EUR/day.
|-
| [[Capitual]]* || Global (BRL, EUR, GBP, USD) || 1 day || 0.0624 || &#10;|-
| [[Cash by Mail]]* || Global || 8 days || 0.0624 || Follow [[Cash_by_Mail|instructions carefully]].
|-
| Cash Deposit* || Global || 4 days || 0.0624 || Check if payee bank allows 3rd party deposits.
|-
| [[CelPay]]* || Global (AUD, CAD, GBP, HKD, USD) || 1 day || 0.0624 || CelPay limit: ~$2,500/day.
|-
| Domestic Wire Transfer* || USA || 3 days || 0.0624 || &#10;|-
| [[Face-to-face_(payment_method)|Face-to-Face (F2F)]]* || Global || 4 days || 0.25 || See [[Face-to-face_(payment_method)|F2F article]] for guidance.
|-
| [[Faster Payments]]* || UK || 1 day || 0.0624 || See [[Faster_Payments|article]] for usage notes.
|-
| [[Faster_Payments_System_SBP|Faster Payments System (SBP)]]* || Russia || 1 day || 0.05 || &#10;|-
| HalCash* || Spain || 1 day || 0.25 || &#10;|-
| [[IMPS]]* || India || 1 day || 0.0624 || IMPS limit: ~1,000,000 INR/day.
|-
| Interac-e-Transfer || Canada || 1 day || 0.0624 || Interac Autodeposit is '''not''' supported.
|-
| Japan Zengin Furikomi* || Japan || 1 day || 0.25 || &#10;|-
| MercadoPago || Argentina || 1 day || 0.0624 || &#10;|-
| [[Monese]]* || Europe (GBP, EUR, RON) || 1 day || 0.0624 || &#10;|-
| MoneyBeam (N26) || Europe || 1 day || 0.0624 || &#10;|-
| MoneyGram* || Global || 4 days || 0.0832 ||
|-
| National Bank Transfer || Global || 4 days || 0.0624 || &#10;|-
| [[Nequi]]*|| Colombia || 1 day || 0.0624 || Nequi limit: ~7,000,000 COP/month.
|-
| [[NEFT]]* || India || 1 day || 0.10 || NEFT limit: ~50,000 INR/transaction.
|-
| [[Paxum]]* || Global || 1 day || 0.0624 || &#10;|-
| [[Paysera]]* || Global || 1 day || 0.0624 || &#10;|-
| [[PayTM]]* || India || 1 day || 0.0250 || PayTM limit: ~100,000 INR/transaction.
|-
| Perfect Money* || Global || 1 day || 0.25 || &#10;|-
| [[Pix]]*|| Brazil || 1 day || 0.0624 || &#10;|-
| Popmoney || USA || 1 day || 0.0624 || &#10;|-
| PromptPay* || Thailand || 1 day || 0.0624 || &#10;|-
| [[Revolut]] || Global || 1 day || 0.0624 || See [[Revolut|article]] for usage notes.
|-
| [[RTGS]]* || India || 1 day || 0.10 || RTGS limits: Min 200,000 INR, Max 1,000,000 INR/transaction.
|-
| [[Satispay]]* || Italy || 1 day || 0.0624 || &#10;|-
| [[SEPA]] || Europe || 6 days || 0.0624 || &#10;|-
| [[SEPA Instant]] || Europe || 1 day || 0.0624 || &#10;|-
| [[Strike]]* || USA || 1 day || 0.0624 || Non-KYC Strike users have lower limits.
|-
| [[SWIFT]]* || Global || 7 days || 0.0832 || &#10;|-
| Swish* || Sweden || 1 day || 0.1252 || &#10;|-
| [[Tikkie]]* || The Netherlands || 1 day || 0.0250 || Tikkie limit: ~2500 EUR/24 hours.
|-
| Transfer with Same Bank || Global || 2 days || 0.0624 || &#10;|-
| Transfer from Specific Banks || Global || 4 days || 0.0624 || &#10;|-
| [[US Postal Money Order]]* || USA || 8 days || 0.0624 || USPS limits: Max 1000 USD/order, check daily limits.
|-
| Uphold || Global || 1 day || 0.0624 || &#10;|-
| [[UPI]]* || India || 1 day || 0.0250 || UPI limit: ~100,000 INR/transaction.
|-
| WeChat Pay* || China || 1 day || 0.0832 || &#10;|-
| Western Union || Global || 4 days || 0.0832 || &#10;|-
| [[Wise]]* || Global ('''non-USD''' trades) || 4 days || 0.0624 || &#10;|-
| [[Wise-USD]]* || Global ('''USD''' trades) || 4 days || 0.0624 || &#10;|-
| [[Zelle]] || USA || 4 days || 0.0624 || Check your bank's Zelle support &amp; limits.
|}</code></pre></details>

<span class="wiki-legacy-anchor" id="Payment_method_guides" aria-hidden="true">
</span>

### Payment method guides {#payment-method-guides}

<div class="wiki-gallery"><figure class="wiki-source-image" id="source-image-1"><a href="../../media/wiki/2200cb7e4e0e0b35eb276a25047fee62559487ee2c8deedf35458c186bc9adcb.png"><img alt="EUR payment methods overview." decoding="async" height="1958" loading="lazy" src="../../media/wiki/2200cb7e4e0e0b35eb276a25047fee62559487ee2c8deedf35458c186bc9adcb.png" width="1046"></a><figcaption>EUR payment methods overview.<br><small>Historical full-size recovered source. <a href="../../recovered-media/">Provenance catalogue</a>.</small></figcaption></figure><figure class="wiki-source-image" id="source-image-2"><a href="../../media/wiki/88410f93192e7e3b20e5f65179f304332e8e8728b7431b14700fe7cfd6c9b5ef.png"><img alt="USD payment methods overview." decoding="async" height="1956" loading="lazy" src="../../media/wiki/88410f93192e7e3b20e5f65179f304332e8e8728b7431b14700fe7cfd6c9b5ef.png" width="1046"></a><figcaption>USD payment methods overview.<br><small>Historical full-size recovered source. <a href="../../recovered-media/">Provenance catalogue</a>.</small></figcaption></figure></div>

<span class="wiki-legacy-anchor" id="Altcoin_payment_methods" aria-hidden="true">
</span>

## Altcoin payment methods {#altcoin-payment-methods}

Bisq also supports trading Bitcoin against various cryptocurrencies, like XMR, ETH, ZEC, L-BTC or LTC. A full list is available on the [Bisq Network Markets page](https://bisq.network/markets/).

Because cryptocurrency transfers are generally irreversible and fast, altcoin trades usually have higher limits (up to 0.5 BTC) available immediately, without the need for account aging or signing required for many fiat methods.

<table>
<caption>Supported Altcoin Payment Methods (Bisq v1)</caption>
<thead>
<tr>
<th>Payment Method</th>
<th>Trading Period</th>
<th>Per-Trade Limit (BTC)</th>
</tr>
</thead>
<tbody>
<tr>
<td><a href="../altcoins/">Altcoins</a></td>
<td>1 day</td>
<td>0.5</td>
</tr>
<tr>
<td><a href="../altcoins-instant/">Altcoins Instant</a></td>
<td>1 hour</td>
<td>0.5</td>
</tr>
</tbody>
</table>
<details class="wiki-table-source"><summary>Original table source</summary><pre><code>{| class="wikitable"
|+ Supported Altcoin Payment Methods (Bisq v1)
|-
! Payment Method !! Trading Period !! Per-Trade Limit (BTC)
|-
| [[Altcoins]] || 1 day || 0.5
|-
| [[Altcoins Instant]] || 1 hour || 0.5
|}</code></pre></details>

**Warning for Instant Trades:** Altcoins Instant trades require quick confirmation (within 1 hour). Remember to disable any open Instant offers (via \`Portfolio\` > \`My Open Offers\`) if you might be unavailable to complete the trade promptly.

See the general Account setup process within Bisq for adding altcoin accounts.

</div>
