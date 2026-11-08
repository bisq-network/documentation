---
title: "Payment methods/es"
slug: "wiki/payment-methods-es"
tableOfContents: false
---

<nav data-pagefind-ignore class="wiki-source-toc" aria-label="Article sections"><details open><summary>On this page</summary><ul><li><a href="#metodos-de-pago-fiat">Métodos de pago fiat</a></li><li><a href="#guias-de-metodos-de-pago">Guías de métodos de pago</a></li><li><a href="#metodos-de-pago-altcoin">Métodos de pago altcoin</a></li></ul></details></nav>

<div class="wiki-recovered-article" lang="es"><p><span class="wiki-markup-gap" role="note"><strong>[Unsupported MediaWiki markup: languages]</strong> <code class="wiki-source-markup">&lt;languages/&gt;</code></span> Bisq ofrece unos cuantos <strong>métodos de pago</strong> para comprar y vender bitcoin a cambio de monedas fiat u otras criptomonedas.</p>
<p>Cada oferta en Bisq designa un método de liquidar los pagos para los comerciantes. El software de Bisq en realidad no se integra con esos métodos de pago -<strong>todas las transferencias de fondos no-bitcoin se hacen fuera del sotware de Bisq</strong>.</p>
<p>Al contrario que las transferencias de criptomonedas, las transferencias de fiat están plagadas de defectos y limitaciones que requieren que Bisq dedique diversas medidas para favorecer intercambios justos y honestos.</p>
<p>Entre estas medidas están:</p>
<ul>
<li><strong>Envejecimiento de la cuenta</strong> con periodos de límite de intercambio máximo a través de 60 días; los tamaños de intercambio varían según el perfil de riesgo para cada método de pago.</li>
<li><strong>Firmado de cuentas</strong> como una comprobación adicional del envejecimiento de la cuenta para métodos de pago con riesgo de devolución de fondos (chargeback).</li>
</ul>
<p>Ver más detalles acerca de estos mecanismos en <a href="../account-limits/"> límites de cuenta</a></p>
<span class="wiki-legacy-anchor" id="Métodos_de_pago_fiat" aria-hidden="true"></span><h2 id="metodos-de-pago-fiat"> Métodos de pago fiat </h2>
<p>Los métodos de pago varían según el riesgo de reversión de cargos, disponibilidad regional, tamaño de transacción, tasas, privacidad, verificabilidad y otras características. Lo principal para permitir los métodos de pago es el riesgo de reversión de cargos. Por este motivo PayPal, Venmo y Cash App no están soportados en Bisq; las reversiones de cargo en estos servicios son relativamente fáciles.</p>
<p>Agradecemos sugerencias de nuevos métodos de pago en Bisq, especialmente para habilitar nuevos mercados. La documentación sobre los criterios y proceso de adición de nuevos métodos de pago se encuentra en <a href="https://github.com/bisq-network/bisq-docs/issues/172" rel="noopener noreferrer">forthcoming</a>. Por ahora, realiza sugerencias contactando en el canal <a href="https://matrix.to/#/#bisq.growth:bitcoin.kyoto" rel="noopener noreferrer">#Growth</a> de <a href="../matrix-bisq-chat/">bisq.chat</a>.</p>
<p>A continuación mostramos una lista de métodos de pago soportados actualmente por Bisq. Los importes BTC de esta tabla son valores históricos de referencia. En Bisq 1 v1.10.11, el límite efectivo depende del método y del estado de la cuenta; el cálculo del protocolo aplica un máximo de 0,25 BTC. Comprueba el importe permitido en el cliente.</p>
<p><em>Ten en cuenta: Los tamaños máximos de intercambio listados abajo no están disponibles para la mayoría de cuentas de pago recientemente creadas. Por favor consulta <a href="https://bisq.wiki/Account_signing" rel="noopener noreferrer">Account signing</a> para obtener detalles acerca de cómo habilitar tamaños mayores para tus métodos de pago.</em></p>
<table>
<thead>
<tr>
<th>Méotodo de pago</th>
<th>Región</th>
<th>Periodo de intercambio</th>
<th>Límite por intercambio</th>
<th>Notas</th>
</tr>
</thead>
<tbody>
<tr>
<td>Advanced Cash*</td>
<td>Global</td>
<td>1 día</td>
<td>2.00 BTC</td>
<td>No aplica en los USA</td>
</tr>
<tr>
<td>Alipay*</td>
<td>China</td>
<td>1 día</td>
<td>1.00 BTC</td>
<td></td>
</tr>
<tr>
<td>Cash Deposit*</td>
<td>No aplica</td>
<td>4 días</td>
<td>0.25 BTC</td>
<td>Algunos bancos no aceptan depósitos de efectivo de no-clientes.</td>
</tr>
<tr>
<td>Chase QuickPay</td>
<td>USA</td>
<td>1 día</td>
<td>0.25 BTC</td>
<td></td>
</tr>
<tr>
<td>Cara a cara (F2F)*</td>
<td>Global</td>
<td>4 días</td>
<td>1.00 BTC</td>
<td></td>
</tr>
<tr>
<td><a href="../faster-payments/">Faster Payments</a>*</td>
<td>UK</td>
<td>1 día</td>
<td>0.25 BTC</td>
<td><a href="../faster-payments/">Ver artículo</a> con cambios recientes para evitar complicaciones.</td>
</tr>
<tr>
<td>HalCash*</td>
<td>España</td>
<td>1 día</td>
<td>1.00 BTC</td>
<td></td>
</tr>
<tr>
<td>Interac e-Transfer</td>
<td>Canadá</td>
<td>1 día</td>
<td>0.25 BTC</td>
<td></td>
</tr>
<tr>
<td>Japan Zengin Furikomi*</td>
<td>Japón</td>
<td>1 día</td>
<td>1.00 BTC</td>
<td></td>
</tr>
<tr>
<td>MoneyBeam (N26)</td>
<td>Europa</td>
<td>1 día</td>
<td>0.25 BTC</td>
<td></td>
</tr>
<tr>
<td>MoneyGram*</td>
<td>Global</td>
<td>4 días</td>
<td>0.50 BTC</td>
<td></td>
</tr>
<tr>
<td>National Bank Transfer</td>
<td>No aplica</td>
<td>4 días</td>
<td>0.25 BTC</td>
<td></td>
</tr>
<tr>
<td>Perfect Money*</td>
<td>Europa y USA</td>
<td>1 día</td>
<td>1.00 BTC</td>
<td></td>
</tr>
<tr>
<td>Popmoney</td>
<td>USA</td>
<td>1 día</td>
<td>0.25 BTC</td>
<td></td>
</tr>
<tr>
<td>PromptPay*</td>
<td>Tailandia</td>
<td>1 día</td>
<td>1.00 BTC</td>
<td></td>
</tr>
<tr>
<td><a href="../revolut/">Revolut</a></td>
<td>Global</td>
<td>1 día</td>
<td>0.25 BTC</td>
<td><a href="../revolut/">ver artículo</a> con cambios recientes para evitar complicaciones.</td>
</tr>
<tr>
<td>SEPA</td>
<td>Europa</td>
<td>6 días</td>
<td>0.25 BTC</td>
<td></td>
</tr>
<tr>
<td>SEPA Instant</td>
<td>Europa</td>
<td>1 día</td>
<td>0.25 BTC</td>
<td></td>
</tr>
<tr>
<td>Swish*</td>
<td>Suecia</td>
<td>1 día</td>
<td>1.00 BTC</td>
<td></td>
</tr>
<tr>
<td>Transferencia con el mismo banco</td>
<td>No aplica</td>
<td>2 días</td>
<td>0.25 BTC</td>
<td></td>
</tr>
<tr>
<td>Transferencia desde bancos específicos</td>
<td>No aplica</td>
<td>4 días</td>
<td>0.25 BTC</td>
<td></td>
</tr>
<tr>
<td>US Postal Money Order*</td>
<td>USA</td>
<td>8 días</td>
<td>0.25 BTC</td>
<td>Máximo 1.000USD por orden dentro de los USA</td>
</tr>
<tr>
<td>Uphold</td>
<td>Global</td>
<td>1 día</td>
<td>0.25 BTC</td>
<td></td>
</tr>
<tr>
<td>WeChat Pay*</td>
<td>China</td>
<td>1 día</td>
<td>1.00 BTC</td>
<td></td>
</tr>
<tr>
<td>Western Union</td>
<td>Global</td>
<td>4 días</td>
<td>0.50 BTC</td>
<td></td>
</tr>
<tr>
<td>Zelle</td>
<td>USA</td>
<td>4 días</td>
<td>0.25 BTC</td>
<td></td>
</tr>
</tbody>
</table>
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
<p><code class="wiki-source-code" id="source-code-1">*</code> Estos métodos de pago no tienen que estar firmados para elevear el límite de compra de 0.01 BTC (ver <a href="https://bisq.wiki/Account_signing" rel="noopener noreferrer">account signing</a> para más detalles).</p>
<span class="wiki-legacy-anchor" id="Guías_de_métodos_de_pago" aria-hidden="true"></span><h3 id="guias-de-metodos-de-pago"> Guías de métodos de pago </h3>
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
<span class="wiki-legacy-anchor" id="Métodos_de_pago_altcoin" aria-hidden="true"></span><h2 id="metodos-de-pago-altcoin"> Métodos de pago altcoin </h2>
<p>Bisq también sporta una <a href="https://bisq.network/markets/" rel="noopener noreferrer">variedad (eng)</a> de criptomonedas para comprar y vender bitcoin, como <span class="wiki-link-gap">XMR <small>[unrecovered article: XMR]</small></span>, <span class="wiki-link-gap">ETH <small>[unrecovered article: ETH]</small></span>, <span class="wiki-link-gap">ZEC <small>[unrecovered article: ZEC]</small></span>, <span class="wiki-link-gap">L-BTC <small>[unrecovered article: L-BTC]</small></span> or <span class="wiki-link-gap">LTC <small>[unrecovered article: LTC]</small></span>.</p>
<p>Debido a que las transferencias altcoin son reversibles y relativamente rápidas, los intercambios de altcoin pueden ser hasta de 2BTC desde el inicio (no es necesario esperar al envejecimiento o firmado de la cuenta).</p>
<table>
<thead>
<tr>
<th>Método de pago</th>
<th>Periodo de intercambio</th>
<th>Límite por intercambio</th>
</tr>
</thead>
<tbody>
<tr>
<td>Altcoins</td>
<td>1 día</td>
<td>2.00 BTC</td>
</tr>
<tr>
<td>Altcoins Instant</td>
<td>1 hora</td>
<td>2.00 BTC</td>
</tr>
</tbody>
</table>
<details class="wiki-table-source"><summary>Original table source</summary><pre><code>{| class="wikitable"
|-
! Método de pago !! Periodo de intercambio !! Límite por intercambio
|-
| Altcoins || 1 día || 2.00 BTC
|-
| Altcoins Instant || 1 hora || 2.00 BTC
|}</code></pre></details>
<p>Los intercambios de altcoins instant osn rápidos! Por favor recuerda deshabilitar las ofertas instantáneas en <code class="wiki-source-code" id="source-code-2">Portafolio</code> &gt; <code class="wiki-source-code" id="source-code-3">Mis ofertas abiertas</code> si no estarás disponible para liquidar un intercambio Instant.</p>
<p>Mira más detalles acerca de cómo crear cuentas altcoin <a href="https://bisq.wiki/Create_an_altcoin_account" rel="noopener noreferrer">aquí (eng)</a>.</p>
</div>
