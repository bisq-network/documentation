---
title: "BSQ"
slug: "wiki/bsq"
tableOfContents: false
---

<nav data-pagefind-ignore class="wiki-source-toc" aria-label="Article sections"><details open><summary>On this page</summary><ul><li><a href="#bsq-token">BSQ Token</a></li><li><a href="#bsq-vs-btc">BSQ vs BTC</a></li><li><a href="#bsq-trading">BSQ Trading</a></li><li><a href="#bsq-issuance">BSQ Issuance</a></li><li><a href="#bsq-wallet">BSQ Wallet</a></li></ul></details></nav>

<div class="wiki-recovered-article" lang="en">

**BSQ** is the utility token of the Bisq [DAO](../introduction-to-the-dao/), used for governance participation and optionally paying [trading fees](../trading-fees/) at a discount. Technically, it is implemented as **colored** bitcoin tokens. This means BSQ functions as a token layer on the Bitcoin blockchain, where specific satoshis represent BSQ units recognized as distinct from regular bitcoin **only within the Bisq software wallet**. The easiest way to obtain BSQ via trade is through [BSQ swaps](../bsq-swaps/).

<span class="wiki-legacy-anchor" id="BSQ_Token" aria-hidden="true">
</span><h2 id="bsq-token"> BSQ Token </h2>&#10;<span class="wiki-template-gap" role="note"><strong>[Unresolved template: BSQ_Token_Intro]</strong> <code>{{BSQ_Token_Intro}}</code></span>

<span class="wiki-legacy-anchor" id="BSQ_vs_BTC" aria-hidden="true">
</span>

### BSQ vs BTC {#bsq-vs-btc}

You can observe the difference between a standard BTC transaction and a BSQ transaction (which is also a BTC transaction but interpreted differently by Bisq) using block explorers:

- Example: [View sample TX on a standard BTC block explorer](https://mempool.space/tx/0243f99c848de4f53cb29157d10bf1cdbfcf4219f84e9997dd3cac9244ab7242)
- Example: [View the same sample TX on Bisq\'s BSQ explorer](https://mempool.space/bisq/tx/0243f99c848de4f53cb29157d10bf1cdbfcf4219f84e9997dd3cac9244ab7242)

<span class="wiki-legacy-anchor" id="BSQ_Trading" aria-hidden="true">
</span>

### BSQ Trading {#bsq-trading}

Because BSQ tokens are only recognized as having special properties by Bisq software, BSQ trading primarily takes place **within the Bisq application** using [BSQ swaps](../bsq-swaps/).

While BSQ fundamentally consists of bitcoin satoshis, it requires special handling. It should **only be stored in and sent from the built-in Bisq wallet**.

<aside class="wiki-admonition" role="note">

**Warning**

**Do not attempt to send BSQ to a non-Bisq wallet** (e.g., another Bitcoin wallet or an exchange) or create custom BSQ transactions manually. The rules for valid BSQ transactions are complex and enforced by the Bisq software. Errors can lead to the BSQ value being unrecognized or lost (becoming plain satoshis). The [technical overview](../dao-technical-overview/) provides details, but the source code is the ultimate reference. Future software updates may also break custom implementations. **Bisq cannot provide support for recovering BSQ sent outside the Bisq wallet ecosystem.**

</aside>

<span class="wiki-legacy-anchor" id="BSQ_Issuance" aria-hidden="true">
</span>

### BSQ Issuance {#bsq-issuance}

BSQ was initially created in a genesis transaction in April 2019. Since then, new BSQ is **only created through the Bisq DAO** via approved compensation or reimbursement requests submitted by contributors. BSQ is \'burned\' (destroyed) when used to pay trading fees. Learn more about the [BSQ issuance and burn dynamic](../introduction-to-the-dao/#overview).

<aside class="wiki-admonition" role="note">

**Note**

**BSQ is not an ICO token.** It was never sold to raise capital. It functions purely as a utility token to enable decentralized governance and funding for the Bisq network, which has been operational since 2016.

</aside>

<span class="wiki-legacy-anchor" id="BSQ_Wallet" aria-hidden="true">
</span>

## BSQ Wallet {#bsq-wallet}

BSQ is stored within the user\'s standard Bisq Bitcoin wallet file but is managed separately by the software to prevent accidental mixing with regular BTC.

- **Separate Balances:** The UI shows distinct BTC and BSQ balances.
- **Separate Files (Internal):** Wallet data for BTC and BSQ are stored in separate internal files within the [Data directory](../data-directory/).
- **Address Prefix:** BSQ addresses displayed in the UI are prefixed with a \'B\' to distinguish them visually from standard BTC addresses.
- **Derivation Path:** Bisq uses a unique BIP-44 [derivation path](../restoring-your-wallet-from-seed/#restoring-to-a-non-bisq-wallet) for its wallets, making them generally incompatible with external wallet software for direct recovery (though BTC funds can be recovered using the seed phrase with specific steps).

For user convenience, the BTC and BSQ wallets within Bisq share the same seed phrase.

More technical details can be found in the [DAO user reference](../dao-user-reference/) and [DAO technical overview](../dao-technical-overview/). See also [how to buy BSQ](../how-to-buy-bsq-on-bisq/) using swaps.

</div>
