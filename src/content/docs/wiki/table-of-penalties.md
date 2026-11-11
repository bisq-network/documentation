---
title: "Table of penalties"
slug: "wiki/table-of-penalties"
tableOfContents: false
---

<nav data-pagefind-ignore class="wiki-source-toc" aria-label="Article sections"><details open><summary>On this page</summary><ul><li><a href="#trade-penalties">Trade Penalties</a></li><li><a href="#penalties-applicable-to-either-trader">Penalties Applicable to Either Trader</a></li><li><a href="#penalties-applicable-specifically-to-the-btc-buyer">Penalties Applicable Specifically to the BTC Buyer</a></li><li><a href="#penalties-applicable-specifically-to-the-btc-seller">Penalties Applicable Specifically to the BTC Seller</a></li></ul></details></nav>

<div class="wiki-recovered-article" lang="en">

**Penalties** help enforce the [Bisq Trading Rules](../trading-rules/), ensuring the process is as safe and fair as possible. The penalties detailed on this page apply specifically to trading protocols that utilize **[security deposits](../security-deposit/)** as their primary security mechanism. Protocols that do not use security deposits, like [Bisq Easy](../bisq-2/) which relies on [Reputation](../reputation/), will have different consequences or mechanisms for handling rule violations.

Penalties are calculated as a percentage of the trade amount and are deducted **primarily** from the offending peer\'s [security deposit](../security-deposit/). During the [dispute resolution process](../dispute-resolution-in-bisq-1/), this amount may be offered as compensation to the counterparty. *(Note: See below regarding 100% penalties potentially affecting the trade amount as well).*

**Important Notes:**

- The actual penalty applied is **up to** the maximum percentage listed below, considering the [security deposit](../security-deposit/) size and the [Mediator](../mediator/)\'s discretion.
- 100% penalties represent serious violations and usually mean losing the entire [security deposit](../security-deposit/) **and potentially the trade amount itself**.
- Penalties are **not cumulative**; if multiple violations occur, the single highest applicable penalty percentage is typically used.
- Peers experiencing issues are encouraged to communicate via [trader chat](../dispute-resolution-in-bisq-1/). If mutually agreed, they can suggest a specific penalty amount to the [Mediator](../mediator/).
- To incentivize resolution via mediation, any penalty proposal will generally leave the penalized peer with at least 5% of the trade amount (deducted from the deposit), encouraging acceptance over costly [arbitration](../arbitration/).

<span class="wiki-legacy-anchor" id="Trade_Penalties" aria-hidden="true">
</span>

## Trade Penalties {#trade-penalties}

<span class="wiki-legacy-anchor" id="Penalties_Applicable_to_Either_Trader" aria-hidden="true">
</span>

### Penalties Applicable to Either Trader {#penalties-applicable-to-either-trader}

These penalties can apply to either the BTC Buyer or the BTC Seller, depending on who commits the violation in a protocol using security deposits.

| Max Penalty (%) | Violation Description |
| --- | --- |
| 100 | Fraud attempt (e.g., unauthorized debiting of peer\'s account, malicious code tampering). |
| 50 | Attempting to solicit off-platform communication by including contact information in offer details (e.g., in \'additional information\' field for [Cash by Mail](../cash-by-mail/) or [Face-to-Face](../face-to-face-payment-method/) offers). |
| 25 | Not responding to [Mediator](../mediator/) inquiries within 48 hours during an active dispute resolution process. |
| 25 | Contacting trading peer outside of Bisq [trader chat](../dispute-resolution-in-bisq-1/) without prior consent or a clear, necessary reason related to completing the payment. |
| 20 | Cancelling an accepted trade without a valid reason according to [Trading Rules](../trading-rules/). |
| 20 | Requesting payment be sent to, or insisting on paying from, a different account/name than agreed in the trade details, without [Mediator](../mediator/) approval. |
| 10 | Requiring excessive personal data from the counterparty beyond what is strictly necessary for the chosen payment method (e.g., demanding ID copies, proof of address unless intrinsic to the method like [Cash by Mail](../cash-by-mail/)). |
| 10 | Abusive or disrespectful behavior towards the trading peer, [Mediator](../mediator/), or [Arbitrator](../arbitration/) during the dispute process. |

<details class="wiki-table-source"><summary>Original table source</summary><pre><code>{| class="wikitable" style="width: 100%;"&#10;|-&#10;! style="width: 15%;" | Max Penalty (%) !! style="width: 85%;" | Violation Description&#10;|-&#10;| style="text-align:center;" | 100 || Fraud attempt (e.g., unauthorized debiting of peer's account, malicious code tampering).&#10;|-&#10;| style="text-align:center;" | 50 || Attempting to solicit off-platform communication by including contact information in offer details (e.g., in 'additional information' field for [[Cash by mail|Cash by Mail]] or [[Face-to-face (payment method)|Face-to-Face]] offers).&#10;|-&#10;| style="text-align:center;" | 25 || Not responding to [[Mediator]] inquiries within 48 hours during an active dispute resolution process.&#10;|-&#10;| style="text-align:center;" | 25 || Contacting trading peer outside of Bisq [[Dispute_Resolution_in_Bisq_1|trader chat]] without prior consent or a clear, necessary reason related to completing the payment.&#10;|-&#10;| style="text-align:center;" | 20 || Cancelling an accepted trade without a valid reason according to [[Trading_rules|Trading Rules]].&#10;|-&#10;| style="text-align:center;" | 20 || Requesting payment be sent to, or insisting on paying from, a different account/name than agreed in the trade details, without [[Mediator]] approval.&#10;|-&#10;| style="text-align:center;" | 10 || Requiring excessive personal data from the counterparty beyond what is strictly necessary for the chosen payment method (e.g., demanding ID copies, proof of address unless intrinsic to the method like [[Cash by mail|Cash by Mail]]).&#10;|-&#10;| style="text-align:center;" | 10 || Abusive or disrespectful behavior towards the trading peer, [[Mediator]], or [[Arbitration|Arbitrator]] during the dispute process.&#10;|}</code></pre></details>

<span class="wiki-legacy-anchor" id="Penalties_Applicable_Specifically_to_the_BTC_Buyer" aria-hidden="true">
</span>

### Penalties Applicable Specifically to the BTC Buyer {#penalties-applicable-specifically-to-the-btc-buyer}

These penalties apply only to the trader buying BTC (sending fiat or altcoins) in a protocol using security deposits.

| Max Penalty (%) | Violation Description |
| --- | --- |
| 100 | Payment chargeback after trade completion. |
| 25 | Using Bitcoin-related terms (e.g., \"BTC\", \"Bisq\", \"Bitcoin\") in payment references/notes. |
| 25 | Paying from an account with a significantly different name (indicating a likely third party). *Note: Seller may cancel trade without penalty.* |
| 20 | Payment sent is 72+ hours late (beyond the trade period). |
| 15 | Payment sent is 48-72 hours late. |
| 15 | Paying from an account with the correct name but different account details (e.g., wrong bank/account number) than specified for the payment method. *Note: Seller may cancel trade without penalty.* |
| 10 | Payment sent is 24-48 hours late. |
| 10 | Using a similar but incorrect payment method that causes issues (e.g., sending via standard SWIFT when SEPA was agreed). |
| 10 | Paying the wrong fiat amount. *Note: Buyer usually has the option to correct the amount within the trade window. Seller may cancel trade without penalty if not corrected promptly.* |
| 10 | Using an unagreed payment reference/memo, including potentially problematic neutral terms or the Trade ID itself. |
| 10 | Delayed altcoin payment due to Buyer choosing an extremely low network fee. *Note: Penalty may be reduced if Buyer uses transaction acceleration techniques (RBF, CPFP).* |
| 5 | Payment sent is up to 24 hours late. |

<details class="wiki-table-source"><summary>Original table source</summary><pre><code>{| class="wikitable" style="width: 100%;"&#10;|-&#10;! style="width: 15%;" | Max Penalty (%) !! style="width: 85%;" | Violation Description&#10;|-&#10;| style="text-align:center;" | 100 || Payment chargeback after trade completion.&#10;|-&#10;| style="text-align:center;" | 25 || Using Bitcoin-related terms (e.g., "BTC", "Bisq", "Bitcoin") in payment references/notes.&#10;|-&#10;| style="text-align:center;" | 25 || Paying from an account with a significantly different name (indicating a likely third party). ''Note: Seller may cancel trade without penalty.''&#10;|-&#10;| style="text-align:center;" | 20 || Payment sent is 72+ hours late (beyond the trade period).&#10;|-&#10;| style="text-align:center;" | 15 || Payment sent is 48-72 hours late.&#10;|-&#10;| style="text-align:center;" | 15 || Paying from an account with the correct name but different account details (e.g., wrong bank/account number) than specified for the payment method. ''Note: Seller may cancel trade without penalty.''&#10;|-&#10;| style="text-align:center;" | 10 || Payment sent is 24-48 hours late.&#10;|-&#10;| style="text-align:center;" | 10 || Using a similar but incorrect payment method that causes issues (e.g., sending via standard SWIFT when SEPA was agreed).&#10;|-&#10;| style="text-align:center;" | 10 || Paying the wrong fiat amount. ''Note: Buyer usually has the option to correct the amount within the trade window. Seller may cancel trade without penalty if not corrected promptly.''&#10;|-&#10;| style="text-align:center;" | 10 || Using an unagreed payment reference/memo, including potentially problematic neutral terms or the Trade ID itself.&#10;|-&#10;| style="text-align:center;" | 10 || Delayed altcoin payment due to Buyer choosing an extremely low network fee. ''Note: Penalty may be reduced if Buyer uses transaction acceleration techniques (RBF, CPFP).''&#10;|-&#10;| style="text-align:center;" | 5 || Payment sent is up to 24 hours late.&#10;|}</code></pre></details>

<span class="wiki-legacy-anchor" id="Penalties_Applicable_Specifically_to_the_BTC_Seller" aria-hidden="true">
</span>

### Penalties Applicable Specifically to the BTC Seller {#penalties-applicable-specifically-to-the-btc-seller}

These penalties apply only to the trader selling BTC (receiving fiat or altcoins) in a protocol using security deposits.

| Max Penalty (%) | Violation Description |
| --- | --- |
| 25 | Incorrect data in fiat account setup, used as-is by the buyer, causes buyer\'s bank to intervene (penalty amount depends on the nature of the bank\'s intervention) |
| 15 | BTC is released significantly outside the expected timeframe after payment confirmation, without valid reason. |

<details class="wiki-table-source"><summary>Original table source</summary><pre><code>{| class="wikitable" style="width: 100%;"&#10;|-&#10;! style="width: 15%;" | Max Penalty (%) !! style="width: 85%;" | Violation Description&#10;|-&#10;| style="text-align:center;" | 25 || Incorrect data in fiat account setup, used as-is by the buyer, causes buyer's bank to intervene (penalty amount depends on the nature of the bank's intervention)&#10;|-&#10;| style="text-align:center;" | 15 || BTC is released significantly outside the expected timeframe after payment confirmation, without valid reason.&#10;|}</code></pre></details>

</div>
