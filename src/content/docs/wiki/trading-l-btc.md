---
title: "Trading L-BTC"
slug: "wiki/trading-l-btc"
tableOfContents: false
---

<nav data-pagefind-ignore class="wiki-source-toc" aria-label="Article sections"><details open><summary>On this page</summary><ul><li><a href="#selling-l-btc">Selling L-BTC</a></li><li><a href="#buying-l-btc">Buying L-BTC</a></li><li><a href="#generate-blinding-key">Generate blinding key</a></li><li><a href="#faq">FAQ</a></li><li><a href="#guidance-for-dispute-agents">Guidance for dispute agents</a></li><li><a href="#verifying-a-transaction">Verifying a transaction</a></li></ul></details></nav>

<div class="wiki-recovered-article" lang="en">

**L-BTC**, or Liquid Bitcoin, is a Confidential Asset, fully verifiable, and 1:1 backed BTC token created by [Liquid](https://liquid.net/), a federated sidechain pegged to the Bitcoin blockchain. Liquid is implemented by Elements, an open source, sidechain-capable blockchain platform based on the Bitcoin codebase created by Blockstream.

A sidechain is a mechanism that allows tokens from one blockchain to be used securely in an independent blockchain which runs in parallel and uses a different set of rules, performance requirements, and security mechanisms. On a sidechain, one can move tokens back to the original chain through a two-way peg. Sidechains enable new functionality that may have security trade-offs or as a way to test new features that may not be ready to use on the parent blockchain.

These are some new functionalities that Liquid enables:

- Confidential Transactions: hides the amount from the information displayed at the blockchain -\- the most important feature for most Bisq users
- Issued Assets: allows issuing tokenized fiat, securities, altcoins or digital collectibles
- Federated consensus mechanism: allows 2- or 3-minute settlement times in normal conditions
- In development: Schnorr signatures, which will improve network privacy and capacity

All addresses in Liquid are blinded by default using Confidential Transactions. The asset and amount of a transaction is hidden to those watching the Liquid sidechain. Bisq users can mix their coins with all of Liquid federation BTC holdings just trading both assets.

<span class="wiki-legacy-anchor" id="Selling_L-BTC" aria-hidden="true">
</span>

## Selling L-BTC {#selling-l-btc}

Selling L-BTC is like selling any other <span class="wiki-link-gap">altcoin <small>[unrecovered article: altcoin]</small></span>. It just requires an [L-BTC payment account](../creating-a-payment-account/#creating-an-altcoin-account) in Bisq.

<span class="wiki-legacy-anchor" id="Buying_L-BTC" aria-hidden="true">
</span>

## Buying L-BTC {#buying-l-btc}

The trader *receiving* L-BTC (L-BTC buyer) must be able to generate proof of payment in case of a dispute. Otherwise, Confidential Transactions make it impossible for a third party to verify if a payment was made—so L-BTC buyers must be able to generate a transaction\'s blinding key for mediators or arbitrators in case of disputes.

<aside class="wiki-admonition" role="note">

**Warning**

Failing to provide the blinding key to a dispute agent will likely result in losing the dispute case.

</aside>

<span class="wiki-legacy-anchor" id="Generate_blinding_key" aria-hidden="true">
</span>

### Generate blinding key {#generate-blinding-key}

**Green Wallet and other custodial wallets can\'t generate blinding keys, so you must use Elements Core to receive L-BTC for Bisq trades.**

Install the [Elements Core full node software](https://github.com/ElementsProject/elements) (note that this does *not* require running a Bitcoin Core full node) and follow these steps:

1. Get the receiving L-BTC address
2. Open the GUI console window of your Elements Core full node, or use <code class="wiki-source-code" id="source-code-1">elements-cli</code>
3. Type the command <code class="wiki-source-code" id="source-code-2">dumpblindingkey \<address></code>, where <code class="wiki-source-code" id="source-code-3">\<address></code> is the receiving L-BTC address from step 1

The Elements console will return the [blinding key](https://elementsproject.org/elements-code-tutorial/confidential-transactions#blindingkey) in hex. This blinding key is what dispute agents will ask for in case an L-BTC trade ends up in dispute.

<span class="wiki-legacy-anchor" id="FAQ" aria-hidden="true">
</span>

## FAQ {#faq}

**How is the price of L-BTC determined?**

L-BTC is a 1:1 BTC pegged token to Bitcoin, so high volatility is not expected. Buyers and sellers make their fixed price orders close to parity. There\'s no price feed with market % based prices for this market.

**Why not just use the peg-in and peg-out mechanism to exchange L-BTC and BTC?**

A peg-in transaction (BTC to L-BTC) requires 102 confirmations on the Bitcoin network (17 hours) before funds can be claimed on the Liquid Network. Peg-out requires approval from two-thirds 2/3 Liquid functionaries approval and it takes about 17-35 minutes to complete. Bisq offers private, easy and secure L-BTC on and off-ramp.

<span class="wiki-legacy-anchor" id="Guidance_for_dispute_agents" aria-hidden="true">
</span>

## Guidance for dispute agents {#guidance-for-dispute-agents}

In order to verify L-BTC trades, install the Elements Core software on your computer from [https://github.com/ElementsProject/elements/releases](https://github.com/ElementsProject/elements/releases), and then:

- Set <code class="wiki-source-code" id="source-code-4">txindex=1</code> in <code class="wiki-source-code" id="source-code-5">elements.conf</code> (neither L-BTC sender nor receiver need this setting)
- Wait until Elements fully syncs to the Liquid blockchain

<span class="wiki-legacy-anchor" id="Verifying_a_transaction" aria-hidden="true">
</span>

### Verifying a transaction {#verifying-a-transaction}

Obtain information from trading peers:

1. Obtain the TXID for the L-BTC transaction (either trading peer can provide this information)
2. Obtain the Blinding Key for the receiving L-BTC address from the L-BTC buyer/receiver
3. Verify that both the L-BTC address and TXID are visible on [https://blockstream.info/liquid](https://blockstream.info/liquid)

Verify the transaction:

1. Open the GUI console window of your Elements Core full node, or use <code class="wiki-source-code" id="source-code-6">elements-cli</code>
2. Type <code class="wiki-source-code" id="source-code-7">importaddress \<address></code>, where <code class="wiki-source-code" id="source-code-8">\<address></code> is the L-BTC address of the L-BTC buyer/receiver. This will add the address to your wallet as “watch only” and rescan the entire Liquid blockchain. It might take an hour or longer to complete depending on your computer\'s power.
3. After scanning is complete, get details for the L-BTC transaction with <code class="wiki-source-code" id="source-code-9">gettransaction \<TXID> true</code>, where <code class="wiki-source-code" id="source-code-10">\<TXID></code> is the L-BTC transaction ID. You should see a transaction object, but \"details\" will be empty since the blinding key is needed to reveal that information.
4. Import the blinding key with <code class="wiki-source-code" id="source-code-11">importblindingkey \<address> \<blinding key></code>
5. Request transaction details again, and this time they should be visible: <code class="wiki-source-code" id="source-code-12">gettransaction \<TXID> true</code>

</div>
