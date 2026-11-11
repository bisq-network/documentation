---
title: "Troubleshooting wallet issues"
slug: "wiki/troubleshooting-wallet-issues"
tableOfContents: false
---

<nav data-pagefind-ignore class="wiki-source-toc" aria-label="Article sections"><details open><summary>On this page</summary><ul><li><a href="#re-sync-spv-chain">Re-sync SPV chain</a></li><li><a href="#restore-a-wallet-backup">Restore a wallet backup</a></li><li><a href="#switch-to-a-new-data-directory">Switch to a new data directory</a></li></ul></details></nav>

<div class="wiki-recovered-article" lang="en">

This article covers some tactics for **troubleshooting wallet issues** to address incorrect balance showing, missing transactions, and other strange inconsistencies.

<span class="wiki-legacy-anchor" id="Re-sync_SPV_chain" aria-hidden="true">
</span>

## Re-sync SPV chain {#re-sync-spv-chain}

The SPV file is a collection of data from the Bitcoin blockchain that tells Bisq your wallet’s balances. All data in the file is available on the Bitcoin network. Resyncing this file just forces Bisq to resync with the Bitcoin network and fetch the data it needs to determine your wallet state again.

See how to initiate an SPV resync [here](../resyncing-spv-file/).

<span class="wiki-legacy-anchor" id="Restore_a_wallet_backup" aria-hidden="true">
</span>

## Restore a wallet backup {#restore-a-wallet-backup}

If issues persist, you can try to restore a wallet backup file from the <code class="wiki-source-code" id="source-code-1">btc_mainnet/wallet/backup/backups_bisq_BTC_wallet/</code> folder of your [data directory](../data-directory/).

This folder holds your most recent wallet backups made on a rolling basis. Replace the <code class="wiki-source-code" id="source-code-2">bisq_BTC.wallet</code> file in <code class="wiki-source-code" id="source-code-3">btc_mainnet/wallet/</code> with a recent wallet backup file and rename it to <code class="wiki-source-code" id="source-code-4">bisq_BTC.wallet</code>. You will also need to resync the SPV chain when restoring a backup, so be sure to also delete <code class="wiki-source-code" id="source-code-5">bisq.spvchain</code>.

Start Bisq and see if your issue is fixed. If not, repeat with another wallet backup file.

<span class="wiki-legacy-anchor" id="Switch_to_a_new_data_directory" aria-hidden="true">
</span>

## Switch to a new data directory {#switch-to-a-new-data-directory}

If neither re-syncing the SPV chain nor restoring a wallet backup solves the issue, you might have a corrupted wallet.

In this case, it’s best to [create a new wallet](../create-a-new-wallet-for-your-data-directory/).

</div>
