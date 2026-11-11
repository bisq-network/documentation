---
title: "Create a new wallet for your data directory"
slug: "wiki/create-a-new-wallet-for-your-data-directory"
tableOfContents: false
---

<nav data-pagefind-ignore class="wiki-source-toc" aria-label="Article sections"><details open><summary>On this page</summary><ul><li><a href="#why-creating-a-new-wallet">Why creating a new wallet?</a></li><li><a href="#preparations">Preparations</a></li><li><a href="#caveats">Caveats</a></li><li><a href="#instructions">Instructions</a></li><li><a href="#create-a-new-wallet-when-the-old-one-is-empty">Create a new wallet when the old one is empty</a></li><li><a href="#disaster-recovery">Disaster recovery</a></li><li><a href="#cleanup">Cleanup</a></li></ul></details></nav>

<div class="wiki-recovered-article" lang="en">

When you just need a fresh new wallet, but wish to keep everything else (accounts, signing status, onion address, trade history, notifications app association, and other custom settings), it is easier and faster to only generate a new wallet for Bisq, rather than [switching to a new data directory](../switching-to-a-new-data-directory/).

<span class="wiki-legacy-anchor" id="Why_creating_a_new_wallet?" aria-hidden="true">
</span>

## Why creating a new wallet? {#why-creating-a-new-wallet}

Being a project built in Java, Bisq uses [bitcoinj](https://bitcoinj.org/), which is a Java library to manage a bitcoin wallet, among other things. This comes with some known limitations, among which is the heavy performance hit when the wallet is old, and contains many transactions, this being especially aggravating when a user needs to do a [SPV resync](../resyncing-spv-file/), as it will take a significant amount of time during which the PC will suffer from high load. With old-time and very active traders, who have many past transactions built up in their wallet, this is even more at risk of happening, and causes a forced interruption in trading, as SPV resync must be completed before the application can resume its operativity.

Recreating a completely new Bisq wallet will eliminate the issue, at least for the near future ([running your personal Bitcoin node](../installing-your-own-bitcoin-node/) also helps a lot with stability), at the same time preserving all the accrued reputation of your payment accounts, your full trading history, and your existing onion address, by which your previous trading peers will be able to recognize you.

<span class="wiki-legacy-anchor" id="Preparations" aria-hidden="true">
</span>

## Preparations {#preparations}

Make sure the following checklist is observed:

- No existing open offers (delete them -this will make you lose the fees- or wait until they are taken, and their respective trades are completed).
- No existing open trades (wait until they are completed).
- No existing disputes (wait until their resolution).
- Consistent wallet state (go to Funds > Send Funds, and for each btc address containing funds, verify its balance actually exists by searching the address on [mempool.space](https://mempool.space), otherwise do a [SPV resync](../resyncing-spv-file/) and repeat).

<span class="wiki-legacy-anchor" id="Caveats" aria-hidden="true">
</span>

## Caveats {#caveats}

The provided instructions are safe as long as you don\'t make mistakes, which could amount to:

- Deleting a folder instead of renaming it.
- Using a wrong address to send funds to.

The above mistakes can easily lead to loss of funds, which we obviously are not liable for.

<span class="wiki-legacy-anchor" id="Instructions" aria-hidden="true">
</span>

## Instructions {#instructions}

If the above requirements are met, and you understood the caveats, assuming you have BTC (and probably BSQ as well) in your old wallet, you can follow the procedure outlined below:

1. Close Bisq.
2. Rename the [data directory](../data-directory/#default-locations) from <code class="wiki-source-code" id="source-code-1">Bisq</code> to <code class="wiki-source-code" id="source-code-2">Bisq.old</code>. Copy this file to an external device, it will be used as a backup in case of data loss.
3. Start Bisq.
4. A new Bisq instance called Bisq will be created (including a new wallet, which is the one we will soon be using to replace the old one).
5. Go to *Account* > *Wallet seed* and write down the seed of the new wallet. Set the password for the wallet at *Account* > *Wallet password*.
6. Go to *Funds* > *Receive Funds* and copy the first btc receive address, pasting it into a separate text file for later use.
7. Go to *DAO* > *BSQ Wallet* > *Receive* and copy the BSQ receive address of the new wallet, pasting it into your notes.
8. Close Bisq.
9. Rename the newly created data directory, from <code class="wiki-source-code" id="source-code-3">Bisq</code> to <code class="wiki-source-code" id="source-code-4">Bisq.new</code>, and rename the previous directory from <code class="wiki-source-code" id="source-code-5">Bisq.old</code> to <code class="wiki-source-code" id="source-code-6">Bisq</code>.
10. Start Bisq
11. You will be back into your old Bisq instance
12. Go to *DAO* > *BSQ Wallet* > *Send* and send all your BSQ balance to the BSQ receive address of the new wallet (this needs to be done first! if you moved out all of your BTC now, there would be none left to pay for the mining fees to move the BSQ!)
13. Go to *Funds* > *Send Funds* and move all your BTC balance to the BTC receive address of the new wallet.
14. Close Bisq
15. Within the data directory, navigate to the contents of <code class="wiki-source-code" id="source-code-7">btc_mainnet</code> and rename the <code class="wiki-source-code" id="source-code-8">wallet</code> folder to <code class="wiki-source-code" id="source-code-9">wallet.old</code>.
16. Copy the <code class="wiki-source-code" id="source-code-10">wallet</code> folder from the same location in <code class="wiki-source-code" id="source-code-11">Bisq.new</code>, into the <code class="wiki-source-code" id="source-code-12">btc_mainnet</code> folder of the \"old\" data directory, so that now there will be <code class="wiki-source-code" id="source-code-13">wallet</code> and <code class="wiki-source-code" id="source-code-14">wallet.old</code> folders under <code class="wiki-source-code" id="source-code-15">btc_mainnet</code>.
17. Start Bisq, wait until wallet is synchronized with the blockchain, and verify that all your funds were correctly moved, checking the contents of *Funds* > *Send Funds*, and *DAO* > *BSQ Wallet*.
18. You can now operate normally with Bisq. The brand new wallet will be used instead of the old one.

<span class="wiki-legacy-anchor" id="Create_a_new_wallet_when_the_old_one_is_empty" aria-hidden="true">
</span>

## Create a new wallet when the old one is empty {#create-a-new-wallet-when-the-old-one-is-empty}

If you wish to switch to a brand new wallet, and there are no funds (anymore) in the previous one, the procedure is much simpler:

1. Close Bisq.
2. Navigate to your [data directory](../data-directory/#default-locations) and into the <code class="wiki-source-code" id="source-code-16">btc_mainnet</code> folder.
3. Rename the <code class="wiki-source-code" id="source-code-17">wallet</code> folder to <code class="wiki-source-code" id="source-code-18">wallet.old</code>.
4. Start Bisq, notice a new wallet was created, write down the new seed and set the password.

<span class="wiki-legacy-anchor" id="Disaster_recovery" aria-hidden="true">
</span>

## Disaster recovery {#disaster-recovery}

In case you made some mistakes along the way and things don\'t work as they should, and provided you never deleted anything, but rather renamed the folders as suggested above, you can go back to the starting point by simply making sure, after closing Bisq, that the data directory gets back to its original state, that is, <code class="wiki-source-code" id="source-code-19">Bisq.old</code> is renamed to <code class="wiki-source-code" id="source-code-20">Bisq</code>, and, if you got to that point, <code class="wiki-source-code" id="source-code-21">wallet.old</code> to <code class="wiki-source-code" id="source-code-22">wallet</code>.

Having a copy of <code class="wiki-source-code" id="source-code-23">wallet.old</code> at an external device (like a usb memory) is also recommended, in case of the unlikely event of permanent data loss.

<span class="wiki-legacy-anchor" id="Cleanup" aria-hidden="true">
</span>

## Cleanup {#cleanup}

Only after you are absolutely sure everything is in order, and if you need to free up as much disk space as possible, you can delete the <code class="wiki-source-code" id="source-code-24">Bisq.new</code> and <code class="wiki-source-code" id="source-code-25">wallet.old</code> folders.

</div>
