---
title: "Table of penalties"
slug: "wiki/table-of-penalties"
tableOfContents: false
---

<nav data-pagefind-ignore class="wiki-source-toc" aria-label="Article sections"><details open><summary>On this page</summary><ul><li><a href="#trade-penalties">Trade Penalties</a></li><li><a href="#penalties-applicable-to-either-trader">Penalties Applicable to Either Trader</a></li><li><a href="#penalties-applicable-specifically-to-the-btc-buyer">Penalties Applicable Specifically to the BTC Buyer</a></li><li><a href="#penalties-applicable-specifically-to-the-btc-seller">Penalties Applicable Specifically to the BTC Seller</a></li></ul></details></nav>

<div class="wiki-recovered-article" lang="en"><p><strong>Penalties</strong> help enforce the <a href="../trading-rules/">Bisq Trading Rules</a>, ensuring the process is as safe and fair as possible. The penalties detailed on this page apply specifically to trading protocols that utilize <strong><a href="../security-deposit/">security deposits</a></strong> as their primary security mechanism. Protocols that do not use security deposits, like <a href="../bisq-2/">Bisq Easy</a> which relies on <a href="../reputation/">Reputation</a>, will have different consequences or mechanisms for handling rule violations.</p>
<p>Penalties are calculated as a percentage of the trade amount and are deducted <strong>primarily</strong> from the offending peer's <a href="../security-deposit/">security deposit</a>. During the <a href="../dispute-resolution-in-bisq-1/">dispute resolution process</a>, this amount may be offered as compensation to the counterparty. <em>(Note: See below regarding 100% penalties potentially affecting the trade amount as well).</em></p>
<p><strong>Important Notes:</strong></p>
<ul>
<li>The actual penalty applied is <strong>up to</strong> the maximum percentage listed below, considering the <a href="../security-deposit/">security deposit</a> size and the <a href="../mediator/">Mediator</a>'s discretion.</li>
<li>100% penalties represent serious violations and usually mean losing the entire <a href="../security-deposit/">security deposit</a> <strong>and potentially the trade amount itself</strong>.</li>
<li>Penalties are <strong>not cumulative</strong>; if multiple violations occur, the single highest applicable penalty percentage is typically used.</li>
<li>Peers experiencing issues are encouraged to communicate via <a href="../dispute-resolution-in-bisq-1/">trader chat</a>. If mutually agreed, they can suggest a specific penalty amount to the <a href="../mediator/">Mediator</a>.</li>
<li>To incentivize resolution via mediation, any penalty proposal will generally leave the penalized peer with at least 5% of the trade amount (deducted from the deposit), encouraging acceptance over costly <a href="../arbitration/">arbitration</a>.</li>
</ul>
<span class="wiki-legacy-anchor" id="Trade_Penalties" aria-hidden="true"></span><h2 id="trade-penalties"> Trade Penalties </h2>
<span class="wiki-legacy-anchor" id="Penalties_Applicable_to_Either_Trader" aria-hidden="true"></span><h3 id="penalties-applicable-to-either-trader"> Penalties Applicable to Either Trader </h3>
<p>These penalties can apply to either the BTC Buyer or the BTC Seller, depending on who commits the violation in a protocol using security deposits.</p>
<table>
<thead>
<tr>
<th>Max Penalty (%)</th>
<th>Violation Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>100</td>
<td>Fraud attempt (e.g., unauthorized debiting of peer's account, malicious code tampering).</td>
</tr>
<tr>
<td>50</td>
<td>Attempting to solicit off-platform communication by including contact information in offer details (e.g., in 'additional information' field for <a href="../cash-by-mail/">Cash by Mail</a> or <a href="../face-to-face-payment-method/">Face-to-Face</a> offers).</td>
</tr>
<tr>
<td>25</td>
<td>Not responding to <a href="../mediator/">Mediator</a> inquiries within 48 hours during an active dispute resolution process.</td>
</tr>
<tr>
<td>25</td>
<td>Contacting trading peer outside of Bisq <a href="../dispute-resolution-in-bisq-1/">trader chat</a> without prior consent or a clear, necessary reason related to completing the payment.</td>
</tr>
<tr>
<td>20</td>
<td>Cancelling an accepted trade without a valid reason according to <a href="../trading-rules/">Trading Rules</a>.</td>
</tr>
<tr>
<td>20</td>
<td>Requesting payment be sent to, or insisting on paying from, a different account/name than agreed in the trade details, without <a href="../mediator/">Mediator</a> approval.</td>
</tr>
<tr>
<td>10</td>
<td>Requiring excessive personal data from the counterparty beyond what is strictly necessary for the chosen payment method (e.g., demanding ID copies, proof of address unless intrinsic to the method like <a href="../cash-by-mail/">Cash by Mail</a>).</td>
</tr>
<tr>
<td>10</td>
<td>Abusive or disrespectful behavior towards the trading peer, <a href="../mediator/">Mediator</a>, or <a href="../arbitration/">Arbitrator</a> during the dispute process.</td>
</tr>
</tbody>
</table>
<details class="wiki-table-source"><summary>Original table source</summary><pre><code>{| class="wikitable" style="width: 100%;"
|-
! style="width: 15%;" | Max Penalty (%) !! style="width: 85%;" | Violation Description
|-
| style="text-align:center;" | 100 || Fraud attempt (e.g., unauthorized debiting of peer's account, malicious code tampering).
|-
| style="text-align:center;" | 50 || Attempting to solicit off-platform communication by including contact information in offer details (e.g., in 'additional information' field for [[Cash by mail|Cash by Mail]] or [[Face-to-face (payment method)|Face-to-Face]] offers).
|-
| style="text-align:center;" | 25 || Not responding to [[Mediator]] inquiries within 48 hours during an active dispute resolution process.
|-
| style="text-align:center;" | 25 || Contacting trading peer outside of Bisq [[Dispute_Resolution_in_Bisq_1|trader chat]] without prior consent or a clear, necessary reason related to completing the payment.
|-
| style="text-align:center;" | 20 || Cancelling an accepted trade without a valid reason according to [[Trading_rules|Trading Rules]].
|-
| style="text-align:center;" | 20 || Requesting payment be sent to, or insisting on paying from, a different account/name than agreed in the trade details, without [[Mediator]] approval.
|-
| style="text-align:center;" | 10 || Requiring excessive personal data from the counterparty beyond what is strictly necessary for the chosen payment method (e.g., demanding ID copies, proof of address unless intrinsic to the method like [[Cash by mail|Cash by Mail]]).
|-
| style="text-align:center;" | 10 || Abusive or disrespectful behavior towards the trading peer, [[Mediator]], or [[Arbitration|Arbitrator]] during the dispute process.
|}</code></pre></details>
<span class="wiki-legacy-anchor" id="Penalties_Applicable_Specifically_to_the_BTC_Buyer" aria-hidden="true"></span><h3 id="penalties-applicable-specifically-to-the-btc-buyer"> Penalties Applicable Specifically to the BTC Buyer </h3>
<p>These penalties apply only to the trader buying BTC (sending fiat or altcoins) in a protocol using security deposits.</p>
<table>
<thead>
<tr>
<th>Max Penalty (%)</th>
<th>Violation Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>100</td>
<td>Payment chargeback after trade completion.</td>
</tr>
<tr>
<td>25</td>
<td>Using Bitcoin-related terms (e.g., "BTC", "Bisq", "Bitcoin") in payment references/notes.</td>
</tr>
<tr>
<td>25</td>
<td>Paying from an account with a significantly different name (indicating a likely third party). <em>Note: Seller may cancel trade without penalty.</em></td>
</tr>
<tr>
<td>20</td>
<td>Payment sent is 72+ hours late (beyond the trade period).</td>
</tr>
<tr>
<td>15</td>
<td>Payment sent is 48-72 hours late.</td>
</tr>
<tr>
<td>15</td>
<td>Paying from an account with the correct name but different account details (e.g., wrong bank/account number) than specified for the payment method. <em>Note: Seller may cancel trade without penalty.</em></td>
</tr>
<tr>
<td>10</td>
<td>Payment sent is 24-48 hours late.</td>
</tr>
<tr>
<td>10</td>
<td>Using a similar but incorrect payment method that causes issues (e.g., sending via standard SWIFT when SEPA was agreed).</td>
</tr>
<tr>
<td>10</td>
<td>Paying the wrong fiat amount. <em>Note: Buyer usually has the option to correct the amount within the trade window. Seller may cancel trade without penalty if not corrected promptly.</em></td>
</tr>
<tr>
<td>10</td>
<td>Using an unagreed payment reference/memo, including potentially problematic neutral terms or the Trade ID itself.</td>
</tr>
<tr>
<td>10</td>
<td>Delayed altcoin payment due to Buyer choosing an extremely low network fee. <em>Note: Penalty may be reduced if Buyer uses transaction acceleration techniques (RBF, CPFP).</em></td>
</tr>
<tr>
<td>5</td>
<td>Payment sent is up to 24 hours late.</td>
</tr>
</tbody>
</table>
<details class="wiki-table-source"><summary>Original table source</summary><pre><code>{| class="wikitable" style="width: 100%;"
|-
! style="width: 15%;" | Max Penalty (%) !! style="width: 85%;" | Violation Description
|-
| style="text-align:center;" | 100 || Payment chargeback after trade completion.
|-
| style="text-align:center;" | 25 || Using Bitcoin-related terms (e.g., "BTC", "Bisq", "Bitcoin") in payment references/notes.
|-
| style="text-align:center;" | 25 || Paying from an account with a significantly different name (indicating a likely third party). ''Note: Seller may cancel trade without penalty.''
|-
| style="text-align:center;" | 20 || Payment sent is 72+ hours late (beyond the trade period).
|-
| style="text-align:center;" | 15 || Payment sent is 48-72 hours late.
|-
| style="text-align:center;" | 15 || Paying from an account with the correct name but different account details (e.g., wrong bank/account number) than specified for the payment method. ''Note: Seller may cancel trade without penalty.''
|-
| style="text-align:center;" | 10 || Payment sent is 24-48 hours late.
|-
| style="text-align:center;" | 10 || Using a similar but incorrect payment method that causes issues (e.g., sending via standard SWIFT when SEPA was agreed).
|-
| style="text-align:center;" | 10 || Paying the wrong fiat amount. ''Note: Buyer usually has the option to correct the amount within the trade window. Seller may cancel trade without penalty if not corrected promptly.''
|-
| style="text-align:center;" | 10 || Using an unagreed payment reference/memo, including potentially problematic neutral terms or the Trade ID itself.
|-
| style="text-align:center;" | 10 || Delayed altcoin payment due to Buyer choosing an extremely low network fee. ''Note: Penalty may be reduced if Buyer uses transaction acceleration techniques (RBF, CPFP).''
|-
| style="text-align:center;" | 5 || Payment sent is up to 24 hours late.
|}</code></pre></details>
<span class="wiki-legacy-anchor" id="Penalties_Applicable_Specifically_to_the_BTC_Seller" aria-hidden="true"></span><h3 id="penalties-applicable-specifically-to-the-btc-seller"> Penalties Applicable Specifically to the BTC Seller </h3>
<p>These penalties apply only to the trader selling BTC (receiving fiat or altcoins) in a protocol using security deposits.</p>
<table>
<thead>
<tr>
<th>Max Penalty (%)</th>
<th>Violation Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>25</td>
<td>Incorrect data in fiat account setup, used as-is by the buyer, causes buyer's bank to intervene (penalty amount depends on the nature of the bank's intervention)</td>
</tr>
<tr>
<td>15</td>
<td>BTC is released significantly outside the expected timeframe after payment confirmation, without valid reason.</td>
</tr>
</tbody>
</table>
<details class="wiki-table-source"><summary>Original table source</summary><pre><code>{| class="wikitable" style="width: 100%;"
|-
! style="width: 15%;" | Max Penalty (%) !! style="width: 85%;" | Violation Description
|-
| style="text-align:center;" | 25 || Incorrect data in fiat account setup, used as-is by the buyer, causes buyer's bank to intervene (penalty amount depends on the nature of the bank's intervention)
|-
| style="text-align:center;" | 15 || BTC is released significantly outside the expected timeframe after payment confirmation, without valid reason.
|}</code></pre></details>
</div>
