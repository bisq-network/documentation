---
title: "Payment methods/es"
slug: "wiki/payment-methods-es"
tableOfContents: false
---

<nav data-pagefind-ignore class="wiki-source-toc" aria-label="Article sections"><details open><summary>On this page</summary><ul><li><a href="#metodos-de-pago-fiat">Métodos de pago fiat</a></li><li><a href="#guias-de-metodos-de-pago">Guías de métodos de pago</a></li><li><a href="#metodos-de-pago-altcoin">Métodos de pago altcoin</a></li></ul></details></nav>

<div class="wiki-recovered-article" lang="es">

<span class="wiki-markup-gap" role="note"><strong>[Unsupported MediaWiki markup: languages]</strong> <code class="wiki-source-markup">&lt;languages/&gt;</code></span> Bisq ofrece unos cuantos **métodos de pago** para comprar y vender bitcoin a cambio de monedas fiat u otras criptomonedas.

Cada oferta en Bisq designa un método de liquidar los pagos para los comerciantes. El software de Bisq en realidad no se integra con esos métodos de pago -**todas las transferencias de fondos no-bitcoin se hacen fuera del sotware de Bisq**.

Al contrario que las transferencias de criptomonedas, las transferencias de fiat están plagadas de defectos y limitaciones que requieren que Bisq dedique diversas medidas para favorecer intercambios justos y honestos.

Entre estas medidas están:

- **Envejecimiento de la cuenta** con periodos de límite de intercambio máximo a través de 60 días; los tamaños de intercambio varían según el perfil de riesgo para cada método de pago.
- **Firmado de cuentas** como una comprobación adicional del envejecimiento de la cuenta para métodos de pago con riesgo de devolución de fondos (chargeback).

Ver más detalles acerca de estos mecanismos en [ límites de cuenta](../account-limits/)

<span class="wiki-legacy-anchor" id="Métodos_de_pago_fiat" aria-hidden="true">
</span>

## Métodos de pago fiat {#metodos-de-pago-fiat}

Los métodos de pago varían según el riesgo de reversión de cargos, disponibilidad regional, tamaño de transacción, tasas, privacidad, verificabilidad y otras características. Lo principal para permitir los métodos de pago es el riesgo de reversión de cargos. Por este motivo PayPal, Venmo y Cash App no están soportados en Bisq; las reversiones de cargo en estos servicios son relativamente fáciles.

Agradecemos sugerencias de nuevos métodos de pago en Bisq, especialmente para habilitar nuevos mercados. La documentación sobre los criterios y proceso de adición de nuevos métodos de pago se encuentra en [forthcoming](https://github.com/bisq-network/bisq-docs/issues/172). Por ahora, realiza sugerencias contactando en el canal [#Growth](https://matrix.to/#/#bisq.growth:bitcoin.kyoto) de [bisq.chat](../matrix-bisq-chat/).

A continuación mostramos una lista de métodos de pago soportados actualmente por Bisq.

*Ten en cuenta: Los tamaños máximos de intercambio listados abajo no están disponibles para la mayoría de cuentas de pago recientemente creadas. Por favor consulta [Account signing](https://bisq.wiki/Account_signing) para obtener detalles acerca de cómo habilitar tamaños mayores para tus métodos de pago.*

| Méotodo de pago | Región | Periodo de intercambio | Límite por intercambio | Notas |
| --- | --- | --- | --- | --- |
| Advanced Cash\* | Global | 1 día | 2.00 BTC | No aplica en los USA |
| Alipay\* | China | 1 día | 1.00 BTC | |
| Cash Deposit\* | No aplica | 4 días | 0.25 BTC | Algunos bancos no aceptan depósitos de efectivo de no-clientes. |
| Chase QuickPay | USA | 1 día | 0.25 BTC | |
| Cara a cara (F2F)\* | Global | 4 días | 1.00 BTC | |
| [Faster Payments](../faster-payments/)\* | UK | 1 día | 0.25 BTC | [Ver artículo](../faster-payments/) con cambios recientes para evitar complicaciones. |
| HalCash\* | España | 1 día | 1.00 BTC | |
| Interac e-Transfer | Canadá | 1 día | 0.25 BTC | |
| Japan Zengin Furikomi\* | Japón | 1 día | 1.00 BTC | |
| MoneyBeam (N26) | Europa | 1 día | 0.25 BTC | |
| MoneyGram\* | Global | 4 días | 0.50 BTC | |
| National Bank Transfer | No aplica | 4 días | 0.25 BTC | |
| Perfect Money\* | Europa y USA | 1 día | 1.00 BTC | |
| Popmoney | USA | 1 día | 0.25 BTC | |
| PromptPay\* | Tailandia | 1 día | 1.00 BTC | |
| [Revolut](../revolut/) | Global | 1 día | 0.25 BTC | [ver artículo](../revolut/) con cambios recientes para evitar complicaciones. |
| SEPA | Europa | 6 días | 0.25 BTC | |
| SEPA Instant | Europa | 1 día | 0.25 BTC | |
| Swish\* | Suecia | 1 día | 1.00 BTC | |
| Transferencia con el mismo banco | No aplica | 2 días | 0.25 BTC | |
| Transferencia desde bancos específicos | No aplica | 4 días | 0.25 BTC | |
| US Postal Money Order\* | USA | 8 días | 0.25 BTC | Máximo 1.000USD por orden dentro de los USA |
| Uphold | Global | 1 día | 0.25 BTC | |
| WeChat Pay\* | China | 1 día | 1.00 BTC | |
| Western Union | Global | 4 días | 0.50 BTC | |
| Zelle | USA | 4 días | 0.25 BTC | |

<details class="wiki-table-source"><summary>Original table source</summary><pre><code>{| class="wikitable sortable"
|-
! Méotodo de pago !! Región !! Periodo de intercambio !! Límite por intercambio !! Notas
|-
| Advanced Cash* || Global || 1 día || 2.00 BTC || No aplica en los USA
|-
| Alipay* || China || 1 día || 1.00 BTC || &#10;|-
| Cash Deposit* || No aplica || 4 días || 0.25 BTC || Algunos bancos no aceptan depósitos de efectivo de no-clientes.
|-
| Chase QuickPay || USA || 1 día || 0.25 BTC || &#10;|-
| Cara a cara (F2F)* || Global || 4 días  || 1.00 BTC || &#10;|-
| [[Faster Payments]]* || UK || 1 día || 0.25 BTC || [[Faster_Payments|Ver artículo]] con cambios recientes para evitar complicaciones.
|-
| HalCash* || España || 1 día || 1.00 BTC || &#10;|-
| Interac e-Transfer || Canadá || 1 día || 0.25 BTC || &#10;|-
| Japan Zengin Furikomi* || Japón || 1 día || 1.00 BTC || &#10;|-
| MoneyBeam (N26) || Europa || 1 día || 0.25 BTC || &#10;|-
| MoneyGram* || Global || 4 días  || 0.50 BTC || &#10;|-
| National Bank Transfer || No aplica || 4 días  || 0.25 BTC || &#10;|-
| Perfect Money* || Europa y USA || 1 día || 1.00 BTC || &#10;|-
| Popmoney || USA || 1 día || 0.25 BTC || &#10;|-
| PromptPay* || Tailandia || 1 día || 1.00 BTC || &#10;|-
| [[Revolut]] || Global || 1 día || 0.25 BTC || [[Revolut|ver artículo]] con cambios recientes para evitar complicaciones.
|-
| SEPA || Europa || 6 días || 0.25 BTC || &#10;|-
| SEPA Instant || Europa || 1 día || 0.25 BTC || &#10;|-
| Swish* || Suecia || 1 día || 1.00 BTC || &#10;|-
| Transferencia con el mismo banco || No aplica || 2 días || 0.25 BTC || &#10;|-
| Transferencia desde bancos específicos  || No aplica || 4 días  || 0.25 BTC || &#10;|-
| US Postal Money Order* || USA || 8 días || 0.25 BTC || Máximo 1.000USD por orden dentro de los USA
|-
| Uphold || Global || 1 día || 0.25 BTC || &#10;|-
| WeChat Pay* || China || 1 día || 1.00 BTC || &#10;|-
| Western Union || Global || 4 días  || 0.50 BTC || &#10;|-
| Zelle || USA || 4 días  || 0.25 BTC || &#10;|}</code></pre></details>

<code class="wiki-source-code" id="source-code-1">\*</code> Estos métodos de pago no tienen que estar firmados para elevear el límite de compra de 0.01 BTC (ver [account signing](https://bisq.wiki/Account_signing) para más detalles).

<span class="wiki-legacy-anchor" id="Guías_de_métodos_de_pago" aria-hidden="true">
</span>

### Guías de métodos de pago {#guias-de-metodos-de-pago}

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

<span class="wiki-legacy-anchor" id="Métodos_de_pago_altcoin" aria-hidden="true">
</span>

## Métodos de pago altcoin {#metodos-de-pago-altcoin}

Bisq también sporta una [variedad (eng)](https://bisq.network/markets/) de criptomonedas para comprar y vender bitcoin, como <span class="wiki-link-gap">XMR <small>[unrecovered article: XMR]</small></span>, <span class="wiki-link-gap">ETH <small>[unrecovered article: ETH]</small></span>, <span class="wiki-link-gap">ZEC <small>[unrecovered article: ZEC]</small></span>, <span class="wiki-link-gap">L-BTC <small>[unrecovered article: L-BTC]</small></span> or <span class="wiki-link-gap">LTC <small>[unrecovered article: LTC]</small></span>.

Debido a que las transferencias altcoin son reversibles y relativamente rápidas, los intercambios de altcoin pueden ser hasta de 2BTC desde el inicio (no es necesario esperar al envejecimiento o firmado de la cuenta).

| Método de pago | Periodo de intercambio | Límite por intercambio |
| --- | --- | --- |
| Altcoins | 1 día | 2.00 BTC |
| Altcoins Instant | 1 hora | 2.00 BTC |

<details class="wiki-table-source"><summary>Original table source</summary><pre><code>{| class="wikitable"
|-
! Método de pago !! Periodo de intercambio !! Límite por intercambio
|-
| Altcoins || 1 día || 2.00 BTC
|-
| Altcoins Instant || 1 hora || 2.00 BTC
|}</code></pre></details>

Los intercambios de altcoins instant osn rápidos! Por favor recuerda deshabilitar las ofertas instantáneas en <code class="wiki-source-code" id="source-code-2">Portafolio</code> > <code class="wiki-source-code" id="source-code-3">Mis ofertas abiertas</code> si no estarás disponible para liquidar un intercambio Instant.

Mira más detalles acerca de cómo crear cuentas altcoin [aquí (eng)](https://bisq.wiki/Create_an_altcoin_account).

</div>
