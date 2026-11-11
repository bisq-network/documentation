---
title: "BSQ"
slug: "wiki/bsq"
tableOfContents: false
---

<nav data-pagefind-ignore class="wiki-source-toc" aria-label="Article sections"><details open><summary>On this page</summary><ul><li><a href="#bsq-token">BSQ Token</a></li><li><a href="#bsq-vs-btc">BSQ vs BTC</a></li><li><a href="#bsq-trading">BSQ Trading</a></li><li><a href="#bsq-issuance">BSQ Issuance</a></li><li><a href="#bsq-wallet">BSQ Wallet</a></li></ul></details></nav>

<div class="wiki-recovered-article" lang="en"><p><strong>BSQ</strong> is the utility token of the Bisq <a href="../introduction-to-the-dao/">DAO</a>, used for governance participation and optionally paying <a href="../trading-fees/">trading fees</a> at a discount. Technically, it is implemented as <strong>colored</strong> bitcoin tokens. This means BSQ functions as a token layer on the Bitcoin blockchain, where specific satoshis represent BSQ units recognized as distinct from regular bitcoin <strong>only within the Bisq software wallet</strong>. The easiest way to obtain BSQ via trade is through <a href="../bsq-swaps/">BSQ swaps</a>.</p>
<span class="wiki-legacy-anchor" id="BSQ_Token" aria-hidden="true"></span><h2 id="bsq-token"> BSQ Token </h2>
<span class="wiki-template-gap" role="note"><strong>[Unresolved template: BSQ_Token_Intro]</strong> <code>{{BSQ_Token_Intro}}</code></span>
<span class="wiki-legacy-anchor" id="BSQ_vs_BTC" aria-hidden="true"></span><h3 id="bsq-vs-btc"> BSQ vs BTC </h3>
<p>You can observe the difference between a standard BTC transaction and a BSQ transaction (which is also a BTC transaction but interpreted differently by Bisq) using block explorers:</p>
<ul>
<li>Example: <a href="https://mempool.space/tx/0243f99c848de4f53cb29157d10bf1cdbfcf4219f84e9997dd3cac9244ab7242" rel="noopener noreferrer">View sample TX on a standard BTC block explorer</a></li>
<li>Example: <a href="https://mempool.space/bisq/tx/0243f99c848de4f53cb29157d10bf1cdbfcf4219f84e9997dd3cac9244ab7242" rel="noopener noreferrer">View the same sample TX on Bisq's BSQ explorer</a></li>
</ul>
<span class="wiki-legacy-anchor" id="BSQ_Trading" aria-hidden="true"></span><h3 id="bsq-trading"> BSQ Trading </h3>
<p>Because BSQ tokens are only recognized as having special properties by Bisq software, BSQ trading primarily takes place <strong>within the Bisq application</strong> using <a href="../bsq-swaps/">BSQ swaps</a>.</p>
<p>While BSQ fundamentally consists of bitcoin satoshis, it requires special handling. It should <strong>only be stored in and sent from the built-in Bisq wallet</strong>.</p>
<aside class="wiki-admonition" role="note"><p><strong>Warning</strong></p><p><strong>Do not attempt to send BSQ to a non-Bisq wallet</strong> (e.g., another Bitcoin wallet or an exchange) or create custom BSQ transactions manually. The rules for valid BSQ transactions are complex and enforced by the Bisq software. Errors can lead to the BSQ value being unrecognized or lost (becoming plain satoshis). The <a href="../dao-technical-overview/">technical overview</a> provides details, but the source code is the ultimate reference. Future software updates may also break custom implementations. <strong>Bisq cannot provide support for recovering BSQ sent outside the Bisq wallet ecosystem.</strong></p>
</aside>
<span class="wiki-legacy-anchor" id="BSQ_Issuance" aria-hidden="true"></span><h3 id="bsq-issuance"> BSQ Issuance </h3>
<p>BSQ was initially created in a genesis transaction in April 2019. Since then, new BSQ is <strong>only created through the Bisq DAO</strong> via approved compensation or reimbursement requests submitted by contributors. BSQ is 'burned' (destroyed) when used to pay trading fees. Learn more about the <a href="../introduction-to-the-dao/#overview">BSQ issuance and burn dynamic</a>.</p>
<aside class="wiki-admonition" role="note"><p><strong>Note</strong></p><p><strong>BSQ is not an ICO token.</strong> It was never sold to raise capital. It functions purely as a utility token to enable decentralized governance and funding for the Bisq network, which has been operational since 2016.</p>
</aside>
<span class="wiki-legacy-anchor" id="BSQ_Wallet" aria-hidden="true"></span><h2 id="bsq-wallet"> BSQ Wallet </h2>
<p>BSQ is stored within the user's standard Bisq Bitcoin wallet file but is managed separately by the software to prevent accidental mixing with regular BTC.</p>
<ul>
<li><strong>Separate Balances:</strong> The UI shows distinct BTC and BSQ balances.</li>
<li><strong>Separate Files (Internal):</strong> Wallet data for BTC and BSQ are stored in separate internal files within the <a href="../data-directory/">Data directory</a>.</li>
<li><strong>Address Prefix:</strong> BSQ addresses displayed in the UI are prefixed with a 'B' to distinguish them visually from standard BTC addresses.</li>
<li><strong>Derivation Path:</strong> Bisq uses a unique BIP-44 <a href="../restoring-your-wallet-from-seed/#restoring-to-a-non-bisq-wallet">derivation path</a> for its wallets, making them generally incompatible with external wallet software for direct recovery (though BTC funds can be recovered using the seed phrase with specific steps).</li>
</ul>
<p>For user convenience, the BTC and BSQ wallets within Bisq share the same seed phrase.</p>
<p>More technical details can be found in the <a href="../dao-user-reference/">DAO user reference</a> and <a href="../dao-technical-overview/">DAO technical overview</a>. See also <a href="../how-to-buy-bsq-on-bisq/">how to buy BSQ</a> using swaps.</p>
</div>
