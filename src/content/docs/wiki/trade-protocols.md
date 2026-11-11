---
title: "Trade Protocols"
slug: "wiki/trade-protocols"
tableOfContents: false
---

<nav data-pagefind-ignore class="wiki-source-toc" aria-label="Article sections"><details><summary>On this page</summary><ul><li><a href="#bisq-easy">Bisq Easy</a></li><li><a href="#future-trade-protocols">Future Trade Protocols</a></li><li><a href="#bisq-lightning">Bisq Lightning</a></li><li><a href="#bisq-musig">Bisq MuSig</a></li><li><a href="#bsq-swaps">BSQ swaps</a></li><li><a href="#liquid-swaps">Liquid Swaps</a></li><li><a href="#monero-swaps">Monero Swaps</a></li><li><a href="#liquid-musig">Liquid MuSig</a></li><li><a href="#submarine-swaps">Submarine Swaps</a></li><li><a href="#stablecoin-swaps">Stablecoin Swaps</a></li><li><a href="#multisig-options">Multisig Options</a></li><li><a href="#multisig-open-contracts">Multisig open contracts</a></li><li><a href="#adding-trade-protocols-to-bisq-2">Adding Trade Protocols to Bisq 2</a></li></ul></details></nav>

<div class="wiki-recovered-article" lang="en">

[Bisq 2](../bisq-2/) will offer users the choice of multiple trade protocols.

A trade protocol serves as the fundamental framework for trading Bitcoin in a secure way. Each trade protocol presents its own set of advantages and trade-offs including:

- Trade fees
- Mining fees
- Security mechanisms
- Dispute mechanisms
- Security deposit requirements
- Privacy benefits / trade-offs
- Convenience

Bisq 2 offers users the flexibility to select the optimal protocol aligning with their requirements and preferences.

All trade protocols will be able to be accessed from the Bisq 2 application independently. Users will be able to switch between trade protocols for different trades should they wish.

As of now, Bisq Easy stands as the sole implemented protocol, tailored for novice Bitcoin users and suitable for smaller trade amounts.

<span class="wiki-legacy-anchor" id="Bisq_Easy" aria-hidden="true">
</span>

## Bisq Easy {#bisq-easy}

Bisq Easy will be the first trade protocol for Bisq 2. It will be accessible on the launch of Bisq 2. It is an easy to use chat based trade protocol for buying and selling bitcoin for fiat. The security is based on reputation of the sellers.

See here for more information about [Bisq Easy](../bisq-easy/).

<span class="wiki-legacy-anchor" id="Future_Trade_Protocols" aria-hidden="true">
</span>

## Future Trade Protocols {#future-trade-protocols}

Bisq is planning on adding more trade protocols available on Bisq 2. Explore the upcoming trade protocols. Keep an eye out for updates if any of the upcoming protocols catch your interest.

<span class="wiki-legacy-anchor" id="Bisq_Lightning" aria-hidden="true">
</span>

### Bisq Lightning {#bisq-lightning}

Escrow based trade protocol on the Lightning network using multi-party computation cryptography.

<span class="wiki-legacy-anchor" id="Bisq_MuSig" aria-hidden="true">
</span>

### Bisq MuSig{#bisq-musig}

Bisq 1 currently uses a 2-of-2 multisig as its main trade protocol. This involves the buyer and seller putting down a [security deposit](../security-deposit/) that is locked in a multisig until the trade completes. At some point this protocol will be moved over to Bisq 2.

<span class="wiki-legacy-anchor" id="BSQ_swaps" aria-hidden="true">
</span>

### BSQ swaps {#bsq-swaps}

This allows users to swap from BSQ to BTC and vice versa via atomic swaps, instantaneously and secure.

<span class="wiki-legacy-anchor" id="Liquid_Swaps" aria-hidden="true">
</span>

### Liquid Swaps {#liquid-swaps}

Trade any Liquid based assets like USDT and BTC-L with an atomic swap on the Liquid network.

<span class="wiki-legacy-anchor" id="Monero_Swaps" aria-hidden="true">
</span>

### Monero Swaps {#monero-swaps}

Trade Bitcoin and Monero using an atomic cross chain swap.

<span class="wiki-legacy-anchor" id="Liquid_MuSig" aria-hidden="true">
</span>

### Liquid MuSig{#liquid-musig}

This trade protocol will use the same trade protocol as the 2-of-2 multisig but it will replace Bitcoin (BTC) with Liquid Bitcoin (L-BTC). The advantage to this is fees will be lower, and users will get more privacy with their trades. The disadvantage is that users will not be trading native bitcoin so will have to be comfortable holding LBTC and consider the costs of converting BTC to LBTC and back again.

<span class="wiki-legacy-anchor" id="Submarine_Swaps" aria-hidden="true">
</span>

### Submarine Swaps {#submarine-swaps}

This trade protocol allows users to swap between Bitcoin on Lightning network to on-chain Bitcoin.

<span class="wiki-legacy-anchor" id="Stablecoin_Swaps" aria-hidden="true">
</span>

### Stablecoin Swaps {#stablecoin-swaps}

Atomic swaps between Bitcoin and USD stablecoin. Just the same as BSQ swaps, but with a Bitcoin coloured coin built on the same tech.

<span class="wiki-legacy-anchor" id="Multisig_Options" aria-hidden="true">
</span>

### Multisig Options {#multisig-options}

This trade protocol would allow the creation of P2P put and call options with the buyer and seller blocking BTC in a multisig on-chain transaction. 2 PSBT would be created sending the BTC to the buyer or seller depending on the result of a binary event. On expiry a blind oracle would trigger the correct transaction to be broadcast to the Bitcoin network.

<span class="wiki-legacy-anchor" id="Multisig_open_contracts" aria-hidden="true">
</span>

### Multisig open contracts{#multisig-open-contracts}

This trade protocol will allow user defined conditional payments. Any simple contract can be created by locking funds in a multisig 2-of-3 transaction with an arbitrator holding the third key and deciding if the condition was met in case of dispute. This is similar to the old Bisq 1 2-of-3 multisig model, but open to any type of contract than can be easily verified.

<span class="wiki-legacy-anchor" id="Adding_Trade_Protocols_to_Bisq_2" aria-hidden="true">
</span>

## Adding Trade Protocols to Bisq 2 {#adding-trade-protocols-to-bisq-2}

Trade protocols are designed to be modular so more trade protocols can be added in the future. Anyone with ideas for new trade protocols should join the discussion on [Bisq\'s Matrix chat](../matrix-bisq-chat/).

</div>
