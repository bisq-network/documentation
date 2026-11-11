---
title: "Payment methods/en"
slug: "wiki/payment-methods-en"
tableOfContents: false
---

<nav data-pagefind-ignore class="wiki-source-toc" aria-label="Article sections"><details open><summary>On this page</summary><ul><li><a href="#fiat-payment-methods">Fiat payment methods</a></li><li><a href="#payment-method-guides">Payment method guides</a></li><li><a href="#altcoin-payment-methods">Altcoin payment methods</a></li></ul></details></nav>

<div class="wiki-recovered-article" lang="en">

<span class="wiki-markup-gap" role="note"><strong>[Unsupported MediaWiki markup: languages]</strong> <code class="wiki-source-markup">&lt;languages/&gt;</code></span> Bisq offers several **payment methods** to buy and sell bitcoin for fiat currencies or other cryptocurrencies.

Every offer on Bisq designates a payment method for traders to settle payments. The Bisq software does not actually integrate with any payment methods—**all non-bitcoin fund transfers are made outside of Bisq software**.

Unlike cryptocurrency transfers, fiat payment transfers are riddled with flaws and limitations that require Bisq to employ several measures to encourage fair and honest trades.

Among these measures are:

- **Account aging** that phases in maximum trade sizes over 60 days; trade sizes vary by the risk profile of each payment method.
- **Account signing** as an additional check on account aging for payment methods with chargeback risk.

See more details on these mechanisms at [account limits](../account-limits/).

<span class="wiki-legacy-anchor" id="Fiat_payment_methods" aria-hidden="true">
</span>

## Fiat payment methods {#fiat-payment-methods}

The payment methods vary in chargeback risk, regional availability, transaction size, fees, privacy, verifiability, and other characteristics. The top consideration for maintaining payment methods is chargeback risk. PayPal, Venmo, and Cash App are not supported on Bisq because chargebacks for payments made with those services are relatively easy.

We welcome suggestions for new payment methods on Bisq, especially for those that enable new markets. Documentation on the criteria and process for adding new payment methods is [forthcoming](https://github.com/bisq-network/bisq-docs/issues/172). For now, feel free to make suggestions by reaching out on [Keybase](https://keybase.io/team/bisq).

Below is a list of fiat payment methods Bisq currently supports. The BTC amounts in this source table are historical reference figures, not a universal allowance for a current account. Bisq 1 v1.10.11 calculates method and account limits from protocol/DAO parameters and clamps its maximum at 0.25 BTC; confirm the amount shown by the client.

*Note: The maximum trade sizes listed below are not available for most newly-created payment accounts. Please refer to [Account signing](https://bisq.wiki/Account_signing) for details on how to enable larger trade sizes for your payment accounts.*

| Payment Method | Region | Trading Period | Per-Trade Limit | Notes |
| --- | --- | --- | --- | --- |
| Advanced Cash\* | Global | 1 day | 2.00 BTC | Not available in the USA |
| Alipay\* | China | 1 day | 1.00 BTC | |
| Cash Deposit\* | N/A | 4 days | 0.25 BTC | Some banks don\'t accept cash deposits from non-customers |
| Chase QuickPay | USA | 1 day | 0.25 BTC | |
| Face-to-Face (F2F)\* | Global | 4 days | 1.00 BTC | |
| [Faster Payments](../faster-payments/)\* | UK | 1 day | 0.25 BTC | [See article](../faster-payments/) for recent changes to avoid issues. |
| HalCash\* | Spain | 1 day | 1.00 BTC | |
| Interac e-Transfer | Canada | 1 day | 0.25 BTC | |
| Japan Zengin Furikomi\* | Japan | 1 day | 1.00 BTC | |
| MoneyBeam (N26) | Europe | 1 day | 0.25 BTC | |
| MoneyGram\* | Global | 4 days | 0.50 BTC | |
| National Bank Transfer | N/A | 4 days | 0.25 BTC | |
| Perfect Money\* | Europe and USA | 1 day | 1.00 BTC | |
| Popmoney | USA | 1 day | 0.25 BTC | |
| PromptPay\* | Thailand | 1 day | 1.00 BTC | |
| [Revolut](../revolut/) | Global | 1 day | 0.25 BTC | [See article](../revolut/) for recent changes to avoid issues. |
| SEPA | Europe | 6 days | 0.25 BTC | |
| SEPA Instant | Europe | 1 day | 0.25 BTC | |
| Swish\* | Sweden | 1 day | 1.00 BTC | |
| Transfer with Same Bank | N/A | 2 days | 0.25 BTC | |
| Transfer from Specific Banks | N/A | 4 days | 0.25 BTC | |
| US Postal Money Order\* | USA | 8 days | 0.25 BTC | Maximum is $1,000 per money order within the USA |
| Uphold | Global | 1 day | 0.25 BTC | |
| WeChat Pay\* | China | 1 day | 1.00 BTC | |
| Western Union | Global | 4 days | 0.50 BTC | |
| Zelle | USA | 4 days | 0.25 BTC | |

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

<code class="wiki-source-code" id="source-code-1">\*</code> These payment methods do not need to be signed to lift the 0.01 BTC buying limit (see [account signing](https://bisq.wiki/Account_signing) for more details).

<span class="wiki-legacy-anchor" id="Payment_method_guides" aria-hidden="true">
</span>

### Payment method guides {#payment-method-guides}

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

<span class="wiki-legacy-anchor" id="Altcoin_payment_methods" aria-hidden="true">
</span>

## Altcoin payment methods {#altcoin-payment-methods}

Bisq also supports a [variety](https://bisq.network/markets/) of cryptocurrencies for buying and selling bitcoin, like <span class="wiki-link-gap">XMR <small>[unrecovered article: XMR]</small></span>, <span class="wiki-link-gap">ETH <small>[unrecovered article: ETH]</small></span>, <span class="wiki-link-gap">ZEC <small>[unrecovered article: ZEC]</small></span>, <span class="wiki-link-gap">L-BTC <small>[unrecovered article: L-BTC]</small></span> or <span class="wiki-link-gap">LTC <small>[unrecovered article: LTC]</small></span>.

Because altcoin transfers are irreversible and relatively quick, altcoin trades can be up to 2 BTC in size right away (no need to wait for account aging or account signing).

| Payment Method | Trading Period | Per-Trade Limit |
| --- | --- | --- |
| Altcoins | 1 day | 2.00 BTC |
| Altcoins Instant | 1 hour | 2.00 BTC |

<details class="wiki-table-source"><summary>Original table source</summary><pre><code>{| class="wikitable"
|-
! Payment Method !! Trading Period !! Per-Trade Limit
|-
| Altcoins || 1 day || 2.00 BTC
|-
| Altcoins Instant || 1 hour || 2.00 BTC
|}</code></pre></details>

Altcoins Instant trades go by fast! Please remember to disable Instant offers in <code class="wiki-source-code" id="source-code-2">Portfolio</code> > <code class="wiki-source-code" id="source-code-3">My Open Offers</code> if you might not be around to settle an Instant trade.

See more details about creating altcoin accounts [here](https://bisq.wiki/Create_an_altcoin_account).

</div>
