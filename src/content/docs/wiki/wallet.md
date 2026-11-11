---
title: "Wallet"
slug: "wiki/wallet"
tableOfContents: false
---

<nav data-pagefind-ignore class="wiki-source-toc" aria-label="Article sections"><details open><summary>On this page</summary><ul><li><a href="#what-is-a-wallet">What is a wallet?</a></li><li><a href="#the-bisq-wallet">The Bisq Wallet</a></li><li><a href="#understanding-the-bisq-wallet">Understanding the Bisq Wallet</a></li><li><a href="#spv-file">SPV file</a></li><li><a href="#important">Important</a></li></ul></details></nav>

<div class="wiki-recovered-article" lang="en">

As many other apps in the Bitcoin space, Bisq has a wallet embedded in it. Prefunding it is optional: you can fund a trade from an external wallet, but Bisq still uses its embedded wallet and trade keys, which must be backed up. This article explains the differences between the Bisq wallet and a generic wallet and answers a few common wallet-related questions.

See [backing up your wallet seed](../backing-up-your-wallet-seed/) if you haven\'t already backed up your Bisq wallet.

<span class="wiki-legacy-anchor" id="What_is_a_wallet?" aria-hidden="true">
</span>

## What is a wallet?{#what-is-a-wallet}

In simple words a wallet is a piece of software that helps you manage private keys, public keys, and thus generate addresses, generate and sign transactions and keep track of the funds that belong to the private keys mentioned above by scanning the blockchain.

Most wallets do just that and have a few advanced options on how to generate a transaction as, for example, a SegWit transaction does not have the exact same structure as a non-segwit transaction, a segwit-compatibility transaction and a multsig transaction, for example.

<span class="wiki-legacy-anchor" id="The_Bisq_Wallet" aria-hidden="true">
</span>

## The Bisq Wallet{#the-bisq-wallet}

The Bisq wallet is particularly different than others because it allows you to interact with yet another type of transaction: a Bisq trading protocol transaction.

Bisq\'s trading protocol happens (today) all on-chain, which means it uses the Bitcoin blockchain to perform it\'s logic (which is very thin and simply logic).

Just to have an idea, the transactions that are markedly different because they originate from a Bisq trade are:

- The Maker fee transaction

* The Taker fee transaction

- The multisig transaction (which happens when an offer is taken from the Bisq order book)

The purpose here is not to detail how these transactions work or are structured, if you want to go deeper in this topic, look at this article about <span class="wiki-link-gap">the anatomy of a bisq trade <small>[unrecovered article: the anatomy of a bisq trade]</small></span>.

<span class="wiki-legacy-anchor" id="Understanding_the_Bisq_Wallet" aria-hidden="true">
</span>

## Understanding the Bisq Wallet{#understanding-the-bisq-wallet}

If you navigate to the tab called Funds in the Bisq wallet you will notice that you have 3 states for your balance:

<ul>
<li>Available - normal balance that you can use to send BTC to any other address at will</li>
<li>Reserved - balance that is under your full control, but that was marked as not spendable by the wallet (for your convenience, so for example, you don't start a sell trade and transfer all the funds out, which would cause you to pay more mining fees to fulfill what you initially intended)</li>
<li>Locked - This is outside of your full control. It can relate to balance that you have locked in a trade either because you're selling that BTC or because it is related to the <a href="../security-deposit/">security deposit</a> (which in most cases will simply go back to your wallet after the trade is done)</li>
</ul>
<span class="wiki-template-gap" role="note"><strong>[Unresolved template: Wallet_derivation_paths]</strong> <code>{{Wallet_derivation_paths}}</code></span>

[Watch keys](../watch-keys/) can be used to see balance from an external wallet.

<span class="wiki-legacy-anchor" id="SPV_file" aria-hidden="true">
</span>

## SPV file{#spv-file}

Most mobile wallets and in-application wallets are what is called a SPV wallet (Simple Payment Verification). Bisq is no different, for most cases.

If you have a full node in the local network, Bisq will try to connect through it to scan the blockchain and to validate and broadcast that Bisq related transactions. The downside here is that you need to always be connected and on the tip of the blockchain for Bisq to work properly.

For all other cases, where there is no full node in the machine, Bisq will run in SPV mode. That means it will ping other Full nodes in the network to derive its state and store it in this SPV file that we mention so often.

Because Bisq uses the Bitcoin Timechain/blockchain to determine the state of trades this file is especially important for your local instance of Bisq to run smoothly. See more here

<span class="wiki-legacy-anchor" id="Important" aria-hidden="true">
</span>

## Important{#important}

Avoid using Bisq’s seeds in other Bitcoin wallets. Not all wallets support the handling of Bisq’s multisig as well as the BSQ token itself, which is based on Bitcoin UTXOs. By using your seed in other wallets you risk:

- Messing with your own trades in Bisq - Exactly because bisq labels transactions internally (not something a lot of wallets do) it can get your open offers/trades into unexpected states.
- Burning your BSQ balance - BSQ is colored Bitcoin, which means the token uses Bitcoin UTXOs to “move” around. If you spend these UTXOs for their Satoshi nominal values, you may encounter problems with your BSQ.

</div>
