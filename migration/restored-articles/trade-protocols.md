---
title: "Trade Protocols"
slug: "wiki/trade-protocols"
tableOfContents: false
---

<nav data-pagefind-ignore class="wiki-source-toc" aria-label="Article sections"><details><summary>On this page</summary><ul><li><a href="#bisq-easy">Bisq Easy</a></li><li><a href="#future-trade-protocols">Future Trade Protocols</a></li><li><a href="#bisq-lightning">Bisq Lightning</a></li><li><a href="#bisq-musig">Bisq MuSig</a></li><li><a href="#bsq-swaps">BSQ swaps</a></li><li><a href="#liquid-swaps">Liquid Swaps</a></li><li><a href="#monero-swaps">Monero Swaps</a></li><li><a href="#liquid-musig">Liquid MuSig</a></li><li><a href="#submarine-swaps">Submarine Swaps</a></li><li><a href="#stablecoin-swaps">Stablecoin Swaps</a></li><li><a href="#multisig-options">Multisig Options</a></li><li><a href="#multisig-open-contracts">Multisig open contracts</a></li><li><a href="#adding-trade-protocols-to-bisq-2">Adding Trade Protocols to Bisq 2</a></li></ul></details></nav>

<div class="wiki-recovered-article" lang="en"><p><a href="../bisq-2/">Bisq 2</a> will offer users the choice of multiple trade protocols.</p>
<p>A trade protocol serves as the fundamental framework for trading Bitcoin in a secure way. Each trade protocol presents its own set of advantages and trade-offs including:</p>
<ul>
<li>Trade fees</li>
<li>Mining fees</li>
<li>Security mechanisms</li>
<li>Dispute mechanisms</li>
<li>Security deposit requirements</li>
<li>Privacy benefits / trade-offs</li>
<li>Convenience</li>
</ul>
<p>Bisq 2 offers users the flexibility to select the optimal protocol aligning with their requirements and preferences.</p>
<p>All trade protocols will be able to be accessed from the Bisq 2 application independently. Users will be able to switch between trade protocols for different trades should they wish.</p>
<p>As of now, Bisq Easy stands as the sole implemented protocol, tailored for novice Bitcoin users and suitable for smaller trade amounts.</p>
<span class="wiki-legacy-anchor" id="Bisq_Easy" aria-hidden="true"></span><h2 id="bisq-easy"> Bisq Easy </h2>
<p>Bisq Easy will be the first trade protocol for Bisq 2. It will be accessible on the launch of Bisq 2. It is an easy to use chat based trade protocol for buying and selling bitcoin for fiat. The security is based on reputation of the sellers.</p>
<p>See here for more information about <a href="../bisq-easy/">Bisq Easy</a>.</p>
<span class="wiki-legacy-anchor" id="Future_Trade_Protocols" aria-hidden="true"></span><h2 id="future-trade-protocols"> Future Trade Protocols </h2>
<p>Bisq is planning on adding more trade protocols available on Bisq 2. Explore the upcoming trade protocols. Keep an eye out for updates if any of the upcoming protocols catch your interest.</p>
<span class="wiki-legacy-anchor" id="Bisq_Lightning" aria-hidden="true"></span><h3 id="bisq-lightning"> Bisq Lightning </h3>
<p>Escrow based trade protocol on the Lightning network using multi-party computation cryptography.</p>
<span class="wiki-legacy-anchor" id="Bisq_MuSig" aria-hidden="true"></span><h3 id="bisq-musig"> Bisq MuSig</h3>
<p>Bisq 1 currently uses a 2-of-2 multisig as its main trade protocol. This involves the buyer and seller putting down a <a href="../security-deposit/">security deposit</a> that is locked in a multisig until the trade completes. At some point this protocol will be moved over to Bisq 2.</p>
<span class="wiki-legacy-anchor" id="BSQ_swaps" aria-hidden="true"></span><h3 id="bsq-swaps"> BSQ swaps </h3>
<p>This allows users to swap from BSQ to BTC and vice versa via atomic swaps, instantaneously and secure.</p>
<span class="wiki-legacy-anchor" id="Liquid_Swaps" aria-hidden="true"></span><h3 id="liquid-swaps"> Liquid Swaps </h3>
<p>Trade any Liquid based assets like USDT and BTC-L with an atomic swap on the Liquid network.</p>
<span class="wiki-legacy-anchor" id="Monero_Swaps" aria-hidden="true"></span><h3 id="monero-swaps"> Monero Swaps </h3>
<p>Trade Bitcoin and Monero using an atomic cross chain swap.</p>
<span class="wiki-legacy-anchor" id="Liquid_MuSig" aria-hidden="true"></span><h3 id="liquid-musig"> Liquid MuSig</h3>
<p>This trade protocol will use the same trade protocol as the 2-of-2 multisig but it will replace Bitcoin (BTC) with Liquid Bitcoin (L-BTC). The advantage to this is fees will be lower, and users will get more privacy with their trades. The disadvantage is that users will not be trading native bitcoin so will have to be comfortable holding LBTC and consider the costs of converting BTC to LBTC and back again.</p>
<span class="wiki-legacy-anchor" id="Submarine_Swaps" aria-hidden="true"></span><h3 id="submarine-swaps"> Submarine Swaps </h3>
<p>This trade protocol allows users to swap between Bitcoin on Lightning network to on-chain Bitcoin.</p>
<span class="wiki-legacy-anchor" id="Stablecoin_Swaps" aria-hidden="true"></span><h3 id="stablecoin-swaps"> Stablecoin Swaps </h3>
<p>Atomic swaps between Bitcoin and USD stablecoin. Just the same as BSQ swaps, but with a Bitcoin coloured coin built on the same tech.</p>
<span class="wiki-legacy-anchor" id="Multisig_Options" aria-hidden="true"></span><h3 id="multisig-options"> Multisig Options </h3>
<p>This trade protocol would allow the creation of P2P put and call options with the buyer and seller blocking BTC in a multisig on-chain transaction. 2 PSBT would be created sending the BTC to the buyer or seller depending on the result of a binary event. On expiry a blind oracle would trigger the correct transaction to be broadcast to the Bitcoin network.</p>
<span class="wiki-legacy-anchor" id="Multisig_open_contracts" aria-hidden="true"></span><h3 id="multisig-open-contracts"> Multisig open contracts</h3>
<p>This trade protocol will allow user defined conditional payments. Any simple contract can be created by locking funds in a multisig 2-of-3 transaction with an arbitrator holding the third key and deciding if the condition was met in case of dispute. This is similar to the old Bisq 1 2-of-3 multisig model, but open to any type of contract than can be easily verified.</p>
<span class="wiki-legacy-anchor" id="Adding_Trade_Protocols_to_Bisq_2" aria-hidden="true"></span><h2 id="adding-trade-protocols-to-bisq-2"> Adding Trade Protocols to Bisq 2 </h2>
<p>Trade protocols are designed to be modular so more trade protocols can be added in the future. Anyone with ideas for new trade protocols should join the discussion on <a href="../matrix-bisq-chat/">Bisq's Matrix chat</a>.</p>
</div>
