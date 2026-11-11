---
title: "Switching to a new data directory"
slug: "wiki/switching-to-a-new-data-directory"
tableOfContents: false
---

<nav data-pagefind-ignore class="wiki-source-toc" aria-label="Article sections"><details open><summary>On this page</summary><ul><li><a href="#why-switch-to-a-new-data-directory">Why switch to a new data directory?</a></li><li><a href="#make-sure-you-re-ready-to-switch">Make sure you&#x27;re ready to switch</a></li><li><a href="#ensure-your-existing-data-directory-is-backed-up">Ensure your existing data directory is backed up</a></li><li><a href="#ensure-you-have-no-open-offers-trade-or-disputes">Ensure you have no open offers, trade, or disputes</a></li><li><a href="#send-funds">Send funds</a></li><li><a href="#create-new-data-directory">Create new data directory</a></li><li><a href="#migrate-data-from-backup">Migrate data from backup</a></li></ul></details></nav>

<div class="wiki-recovered-article" lang="en">

**Switching to a new data directory** can help you start with Bisq anew: fresh wallet, new onion address, new keys, etc. It\'s a sort of \"factory reset\" that makes it like you\'re starting Bisq for the first time.

Upon creating a new data directory, you can restore various parts of a previous data directory (e.g., aged and signed payment accounts).

If you instead wish to only obtain a new wallet, while preserving every other element of your data directory, you can [create a fresh wallet in the same data directory](../create-a-new-wallet-for-your-data-directory/).

<span class="wiki-legacy-anchor" id="Why_switch_to_a_new_data_directory?" aria-hidden="true">
</span>

## Why switch to a new data directory? {#why-switch-to-a-new-data-directory}

It\'s a good idea to switch to a new data directory every so often.

- **Performance** - Bisq uses bitcoinj, an SPV library that is not built for high performance, so wallets get increasingly large with every transaction. Over time, wallet corruption becomes increasingly likely and overall performance deteriorates (e.g., longer startup times).
- **Stability** - The internal wallet database can get corrupted in certain situations, leading to failed take-offer attempts or failed payouts.
- **Privacy** - Active traders using the same onion address for extended periods of time can leak quite a bit of information, since that same onion address is connected to each subsequent offer (see [local reputation](../local-reputation/)).

In addition, switching to a new data directory can sometimes be the only way to work around [unusual wallet corruption issues](../troubleshooting-wallet-issues/).

<span class="wiki-legacy-anchor" id="Make_sure_you&#x27;re_ready_to_switch" aria-hidden="true">
</span>

## Make sure you\'re ready to switch {#make-sure-you-re-ready-to-switch}

<span class="wiki-legacy-anchor" id="Ensure_your_existing_data_directory_is_backed_up" aria-hidden="true">
</span>

#### Ensure your existing data directory is backed up {#ensure-your-existing-data-directory-is-backed-up}

[See how here](../backing-up-application-data/#back-up-the-entire-bisq-data-directory). Be sure to also do a [payment account export](../backing-up-application-data/#back-up-payment-accounts) to make importing payment accounts easier.

<span class="wiki-legacy-anchor" id="Ensure_you_have_no_open_offers,_trade,_or_disputes" aria-hidden="true">
</span>

#### Ensure you have no open offers, trade, or disputes {#ensure-you-have-no-open-offers-trade-or-disputes}

This is paramount because **you will become unreachable and unable to respond after switching to a new data directory.** If you don\'t want to wait for an open offer to be taken, you can delete it, but you will lose the maker fee.

<span class="wiki-legacy-anchor" id="Send_funds" aria-hidden="true">
</span>

## Send funds {#send-funds}

You will need to get your funds to the new Bisq instance somehow.

There are a handful of methods to do this, depending on your situation.

1. Send funds to an external wallet with a withdrawal from <code class="wiki-source-code" id="source-code-1">Funds</code> > <code class="wiki-source-code" id="source-code-2">Send Funds</code>, and then send those funds to the new Bisq instance once you\'ve created it (note: you can set withdrawal transaction fees in <code class="wiki-source-code" id="source-code-3">Settings</code> > <code class="wiki-source-code" id="source-code-4">Preferences</code>).
   - Variation: Use the [Emergency Wallet Tool](../emergency-wallet/) (<code class="wiki-source-code" id="source-code-5">Cmd/Ctrl</code> + <code class="wiki-source-code" id="source-code-6">E</code>) to withdraw funds if standard withdrawal isn\'t working.
2. Restore your wallet from seed in another bitcoin wallet like Electrum, and send funds to the new Bisq instance once you\'ve created it. This method is **not** recommended if you have any BSQ funds in your wallet. See [derivation path and other details here](../restoring-your-wallet-from-seed/#restoring-to-a-non-bisq-wallet).
3. Send funds directly from old Bisq instance to new Bisq instance (advanced).
   1. Start Bisq.
   2. Start another instance of Bisq from the command line, specifying a new data directory with the <code class="wiki-source-code" id="source-code-7">appName</code> option. See [how to run Bisq from the command line here](../running-from-the-command-line/).
      - macOS example command: <code class="wiki-source-code" id="source-code-8">/Applications/Bisq.app/Contents/MacOS/Bisq -\-appName=Bisq-new</code>
      - Name of the new directory doesn\'t matter. <code class="wiki-source-code" id="source-code-9">Bisq-new</code> was used above as an example, but you can call it whatever you like, since it\'s just a temporary placeholder. You\'ll be changing it back to \"Bisq\" anyway.
   3. Wait for this new instance of Bisq to start and finish loading and syncing.
   4. Once it has, send your funds from your old Bisq instance to your new one.

<span class="wiki-legacy-anchor" id="Create_new_data_directory" aria-hidden="true">
</span>

## Create new data directory {#create-new-data-directory}

If you used methods 1 or 2 in the previous step:

1. Close Bisq.
2. Delete (or rename) the <code class="wiki-source-code" id="source-code-10">Bisq</code> data directory (see [default locations for your operating system here](../data-directory/) <small class="wiki-link-gap">[section not recovered: Operating system defaults]</small>).
3. Start Bisq again. Bisq will create a new data directory with a new wallet, new Tor state, etc.
4. Send funds from external wallet into Bisq.

If you used method 3 in the previous step:

1. Make sure *both* Bisq instances are closed.
2. Delete (or rename) the original <code class="wiki-source-code" id="source-code-11">Bisq</code> data directory.
3. Rename the newer data directory to <code class="wiki-source-code" id="source-code-12">Bisq</code>.
4. Start Bisq normally. Your balance should reflect the BTC you sent to it previously.

<span class="wiki-legacy-anchor" id="Migrate_data_from_backup" aria-hidden="true">
</span>

## Migrate data from backup {#migrate-data-from-backup}

If you\'d like to restore payment accounts and/or your onion address (e.g., [local reputation](../local-reputation/)), [see how in this article](../restoring-application-data/).

</div>
