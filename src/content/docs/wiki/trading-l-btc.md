---
title: "Trading L-BTC"
slug: "wiki/trading-l-btc"
tableOfContents: false
---

<nav data-pagefind-ignore class="wiki-source-toc" aria-label="Article sections"><details open><summary>On this page</summary><ul><li><a href="#selling-l-btc">Selling L-BTC</a></li><li><a href="#buying-l-btc">Buying L-BTC</a></li><li><a href="#generate-blinding-key">Generate blinding key</a></li><li><a href="#faq">FAQ</a></li><li><a href="#guidance-for-dispute-agents">Guidance for dispute agents</a></li><li><a href="#verifying-a-transaction">Verifying a transaction</a></li></ul></details></nav>

<div class="wiki-recovered-article" lang="en"><p><strong>L-BTC</strong>, or Liquid Bitcoin, is a Confidential Asset, fully verifiable, and 1:1 backed BTC token created by <a href="https://liquid.net/" rel="noopener noreferrer">Liquid</a>, a federated sidechain pegged to the Bitcoin blockchain. Liquid is implemented by Elements, an open source, sidechain-capable blockchain platform based on the Bitcoin codebase created by Blockstream.</p>
<p>A sidechain is a mechanism that allows tokens from one blockchain to be used securely in an independent blockchain which runs in parallel and uses a different set of rules, performance requirements, and security mechanisms. On a sidechain, one can move tokens back to the original chain through a two-way peg. Sidechains enable new functionality that may have security trade-offs or as a way to test new features that may not be ready to use on the parent blockchain.</p>
<p>These are some new functionalities that Liquid enables:</p>
<ul>
<li>Confidential Transactions: hides the amount from the information displayed at the blockchain -- the most important feature for most Bisq users</li>
<li>Issued Assets: allows issuing tokenized fiat, securities, altcoins or digital collectibles</li>
<li>Federated consensus mechanism: allows 2- or 3-minute settlement times in normal conditions</li>
<li>In development: Schnorr signatures, which will improve network privacy and capacity</li>
</ul>
<p>All addresses in Liquid are blinded by default using Confidential Transactions. The asset and amount of a transaction is hidden to those watching the Liquid sidechain. Bisq users can mix their coins with all of Liquid federation BTC holdings just trading both assets.</p>
<span class="wiki-legacy-anchor" id="Selling_L-BTC" aria-hidden="true"></span><h2 id="selling-l-btc"> Selling L-BTC </h2>
<p>Selling L-BTC is like selling any other <span class="wiki-link-gap">altcoin <small>[unrecovered article: altcoin]</small></span>. It just requires an <a href="../creating-a-payment-account/#creating-an-altcoin-account">L-BTC payment account</a> in Bisq.</p>
<span class="wiki-legacy-anchor" id="Buying_L-BTC" aria-hidden="true"></span><h2 id="buying-l-btc"> Buying L-BTC </h2>
<p>The trader <em>receiving</em> L-BTC (L-BTC buyer) must be able to generate proof of payment in case of a dispute. Otherwise, Confidential Transactions make it impossible for a third party to verify if a payment was made—so L-BTC buyers must be able to generate a transaction's blinding key for mediators or arbitrators in case of disputes.</p>
<aside class="wiki-admonition" role="note"><p><strong>Warning</strong></p><p>Failing to provide the blinding key to a dispute agent will likely result in losing the dispute case.</p>
</aside>
<span class="wiki-legacy-anchor" id="Generate_blinding_key" aria-hidden="true"></span><h3 id="generate-blinding-key"> Generate blinding key </h3>
<p><strong>Green Wallet and other custodial wallets can't generate blinding keys, so you must use Elements Core to receive L-BTC for Bisq trades.</strong></p>
<p>Install the <a href="https://github.com/ElementsProject/elements" rel="noopener noreferrer">Elements Core full node software</a> (note that this does <em>not</em> require running a Bitcoin Core full node) and follow these steps:</p>
<ol>
<li>Get the receiving L-BTC address</li>
<li>Open the GUI console window of your Elements Core full node, or use <code class="wiki-source-code" id="source-code-1">elements-cli</code></li>
<li>Type the command <code class="wiki-source-code" id="source-code-2">dumpblindingkey &lt;address&gt;</code>, where <code class="wiki-source-code" id="source-code-3">&lt;address&gt;</code> is the receiving L-BTC address from step 1</li>
</ol>
<p>The Elements console will return the <a href="https://elementsproject.org/elements-code-tutorial/confidential-transactions#blindingkey" rel="noopener noreferrer">blinding key</a> in hex. This blinding key is what dispute agents will ask for in case an L-BTC trade ends up in dispute.</p>
<span class="wiki-legacy-anchor" id="FAQ" aria-hidden="true"></span><h2 id="faq"> FAQ </h2>
<p><strong>How is the price of L-BTC determined?</strong></p>
<p>L-BTC is a 1:1 BTC pegged token to Bitcoin, so high volatility is not expected. Buyers and sellers make their fixed price orders close to parity. There's no price feed with market % based prices for this market.</p>
<p><strong>Why not just use the peg-in and peg-out mechanism to exchange L-BTC and BTC?</strong></p>
<p>A peg-in transaction (BTC to L-BTC) requires 102 confirmations on the Bitcoin network (17 hours) before funds can be claimed on the Liquid Network. Peg-out requires approval from two-thirds 2/3 Liquid functionaries approval and it takes about 17-35 minutes to complete. Bisq offers private, easy and secure L-BTC on and off-ramp.</p>
<span class="wiki-legacy-anchor" id="Guidance_for_dispute_agents" aria-hidden="true"></span><h2 id="guidance-for-dispute-agents"> Guidance for dispute agents </h2>
<p>In order to verify L-BTC trades, install the Elements Core software on your computer from <a href="https://github.com/ElementsProject/elements/releases" rel="noopener noreferrer">https://github.com/ElementsProject/elements/releases</a>, and then:</p>
<ul>
<li>Set <code class="wiki-source-code" id="source-code-4">txindex=1</code> in <code class="wiki-source-code" id="source-code-5">elements.conf</code> (neither L-BTC sender nor receiver need this setting)</li>
<li>Wait until Elements fully syncs to the Liquid blockchain</li>
</ul>
<span class="wiki-legacy-anchor" id="Verifying_a_transaction" aria-hidden="true"></span><h3 id="verifying-a-transaction"> Verifying a transaction </h3>
<p>Obtain information from trading peers:</p>
<ol>
<li>Obtain the TXID for the L-BTC transaction (either trading peer can provide this information)</li>
<li>Obtain the Blinding Key for the receiving L-BTC address from the L-BTC buyer/receiver</li>
<li>Verify that both the L-BTC address and TXID are visible on <a href="https://blockstream.info/liquid" rel="noopener noreferrer">https://blockstream.info/liquid</a></li>
</ol>
<p>Verify the transaction:</p>
<ol>
<li>Open the GUI console window of your Elements Core full node, or use <code class="wiki-source-code" id="source-code-6">elements-cli</code></li>
<li>Type <code class="wiki-source-code" id="source-code-7">importaddress &lt;address&gt;</code>, where <code class="wiki-source-code" id="source-code-8">&lt;address&gt;</code> is the L-BTC address of the L-BTC buyer/receiver. This will add the address to your wallet as “watch only” and rescan the entire Liquid blockchain. It might take an hour or longer to complete depending on your computer's power.</li>
<li>After scanning is complete, get details for the L-BTC transaction with <code class="wiki-source-code" id="source-code-9">gettransaction &lt;TXID&gt; true</code>, where <code class="wiki-source-code" id="source-code-10">&lt;TXID&gt;</code> is the L-BTC transaction ID. You should see a transaction object, but "details" will be empty since the blinding key is needed to reveal that information.</li>
<li>Import the blinding key with <code class="wiki-source-code" id="source-code-11">importblindingkey &lt;address&gt; &lt;blinding key&gt;</code></li>
<li>Request transaction details again, and this time they should be visible: <code class="wiki-source-code" id="source-code-12">gettransaction &lt;TXID&gt; true</code></li>
</ol>
</div>
