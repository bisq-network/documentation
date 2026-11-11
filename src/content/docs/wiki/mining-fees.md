---
title: "Mining fees"
slug: "wiki/mining-fees"
tableOfContents: false
---

<nav data-pagefind-ignore class="wiki-source-toc" aria-label="Article sections"><details open><summary>On this page</summary><ul><li><a href="#mining-fees-to-trade">Mining fees to trade</a></li><li><a href="#mining-fees-to-withdraw">Mining fees to withdraw</a></li></ul></details></nav>

<div class="wiki-recovered-article" lang="en">

**Mining fees** are BTC paid to miners to include a BTC transaction into a block. The amount of BTC to be paid depends on a mining fee market driven by the amount of blocks produced by miners and demand for block space, and also the size of the transaction. This price is expressed in sat/vB or satoshis per byte. BTC transactions waiting to be included into a BTC block wait at the mempools of BTC nodes, and only those offering a higher sats/vB to miners will be included for every block. Mempool state can be seen at most blockchain explorers, like [mempool.space](http://www.mempool.space). Bisq use segwit addresses by default to save space on the blockchain and hence, mining fees.

<figure class="wiki-source-image" id="source-image-1"><a href="../../media/wiki/da2c84903ae48fda0d4858674428146cb1d4470864055a160a0bb43e807d65dd.png"><img alt="Mining fees 1.png" decoding="async" height="343" loading="lazy" src="../../media/wiki/da2c84903ae48fda0d4858674428146cb1d4470864055a160a0bb43e807d65dd.png" width="555"></a><figcaption>Mining fees 1.png<br><small>Historical full-size recovered source. <a href="../../recovered-media/">Provenance catalogue</a>.</small></figcaption></figure>

<span class="wiki-legacy-anchor" id="Mining_fees_to_trade" aria-hidden="true">
</span>

## Mining fees to trade {#mining-fees-to-trade}

Required mining fees for trading are estimated by Bisq. Traders can\'t decide how much to pay because underpaying mining fees would cause delays or even make trades fail. Fee rate to be used is fed by seednodes and displayed at the bottom left of the window. The total BTC to be paid is displayed before making or taking any offer. As makers only publish a single transaction to create an offer (maker trading fee transaction) and takers have to publish three (taker trading fee, deposit and payout transactions), taking an offer pays approximately 3 times more in mining fees than making an offer. This is because offer makers cannot know what mining fees will be at the time their offer is taken. Unlike [trading fees](../trading-fees/), mining fees to pay are independent to the trade amount. A higher trade will relatively pay less mining fees than a small trade.

<span class="wiki-legacy-anchor" id="Mining_fees_to_withdraw" aria-hidden="true">
</span>

## Mining fees to withdraw {#mining-fees-to-withdraw}

When sending BTC from Bisq wallet to other BTC addresses, you can use the mining fee recommended by Bisq or set your own at the <code class="wiki-source-code" id="source-code-1">Funds / Send funds</code> tab. If you have used very small fees, it could not be included. If you still can find your tx on blockchain explorers but want to accelerate the process, you can try a manual [CPFP](https://bitcoin.stackexchange.com/questions/49723/replace-by-fee-vs-child-pays-for-parent) (Child Pays For Parent) transaction. If the transaction is not anymore on the block explorers, do a [SPV resync](../resyncing-spv-file/) to make your wallet \"forget\" that transaction.

</div>
