---
title: "Backing up application data"
slug: "wiki/backing-up-application-data"
tableOfContents: false
---

<nav data-pagefind-ignore class="wiki-source-toc" aria-label="Article sections"><details open><summary>On this page</summary><ul><li><a href="#back-up-the-entire-bisq-data-directory">Back up the entire Bisq data directory</a></li><li><a href="#while-bisq-is-running">While Bisq is running</a></li><li><a href="#while-bisq-is-closed">While Bisq is closed</a></li><li><a href="#encrypt-your-backup">Encrypt your backup</a></li><li><a href="#back-up-payment-accounts">Back up payment accounts</a></li><li><a href="#back-up-your-wallet-seed">Back up your wallet seed</a></li><li><a href="#export-tor-state">Export Tor state</a></li><li><a href="#export-trade-history">Export trade history</a></li><li><a href="#export-transaction-history">Export transaction history</a></li><li><a href="#automatic-backup-with-cyclic-redundancy">Automatic backup with cyclic redundancy</a></li></ul></details></nav>

<div class="wiki-recovered-article" lang="en">

**Backing up** your Bisq data is crucial to ensure you can retain control over trades, disputes, payment accounts, and funds in case of issues with your machine (e.g., drive failure) or Bisq itself (e.g., critical bugs).

All Bisq data is stored right on your computer—it\'s never stored (or even sent) to a central server, so backing it up is your job.

To see how to *restore* data to Bisq, see [Restoring application data](../restoring-application-data/).

<span class="wiki-legacy-anchor" id="Back_up_the_entire_Bisq_data_directory" aria-hidden="true">
</span>

## Back up the entire Bisq data directory {#back-up-the-entire-bisq-data-directory}

The safest, quickest, easiest, and most comprehensive thing you can do to safeguard your data is to back up the whole data directory at regular intervals. See the various elements of the data directory detailed [here](../data-directory/#data-directory-structure).

In addition, to make restoring payment accounts easier, you may want to back up an [export of your payment accounts](../backing-up-application-data/#back-up-payment-accounts).

<span class="wiki-legacy-anchor" id="While_Bisq_is_running" aria-hidden="true">
</span>

### While Bisq is running {#while-bisq-is-running}

Go to <code class="wiki-source-code" id="source-code-1">Account</code> > <code class="wiki-source-code" id="source-code-2">Backup</code> and put in a location for your backup to be exported to (note that this section is titled \"Backup wallet\" in the software but it actually exports the entire data directory).

In Bisq 1 v1.10.11, the backup omits selected Tor runtime entries and does not follow links or copy special files. Read the backup result: if it lists skipped entries, preserve any needed linked data separately and verify the result before relying on it.

<figure class="wiki-source-image" id="source-image-1"><a href="../../media/wiki/26782ecb73f26760dab0f720c3d9eb40fc2f8c1112e55c8bd1360d3ecf153449.png"><img alt="Data directory backup screen." decoding="async" height="710" loading="lazy" src="../../media/wiki/26782ecb73f26760dab0f720c3d9eb40fc2f8c1112e55c8bd1360d3ecf153449.png" width="1200"></a><figcaption>Data directory backup screen.<br><small>Historical full-size recovered source. <a href="../../recovered-media/">Provenance catalogue</a>.</small></figcaption></figure>
<div>
</div>

<span class="wiki-legacy-anchor" id="While_Bisq_is_closed" aria-hidden="true">
</span>

### While Bisq is closed {#while-bisq-is-closed}

When Bisq is closed, you can simply copy the entire data directory and paste it somewhere safe. Find the location of your data directory by clicking on the <code class="wiki-source-code" id="source-code-3">Open Directory</code> button (see screenshot above) or see [data directory locations here](../data-directory/#default-locations).

<span class="wiki-legacy-anchor" id="Encrypt_your_backup" aria-hidden="true">
</span>

### Encrypt your backup {#encrypt-your-backup}

**Backup files are not encrypted.** If you’ve set a wallet password, your wallet files will be encrypted, but all your other data will *not* be encrypted.

We recommend encrypting the whole backup folder with something like gpg, 7-Zip, Cryptomator, etc.

<span class="wiki-legacy-anchor" id="Back_up_payment_accounts" aria-hidden="true">
</span>

## Back up payment accounts {#back-up-payment-accounts}

If you just want to back up your payment accounts, export them from <code class="wiki-source-code" id="source-code-4">Account</code> > <code class="wiki-source-code" id="source-code-5">National Currency Accounts</code>.

Be advised: exporting your accounts this way only exports metadata. **Aging and signing status are not included**. To include [account aging and signing status](../account-limits/), you also need to save the <code class="wiki-source-code" id="source-code-6">btc_mainnet/keys/sig.key</code> file from your [data directory](../data-directory/).

Because of the way [restoring payment accounts](../restoring-application-data/#restore-payment-accounts) works, it\'s best for most users to back up the whole data directory *and* back up a payment account export.

<figure class="wiki-source-image" id="source-image-2"><a href="../../media/wiki/b159a14c41bd5d2a2ac88fcc2add65d497bfe93310ca2f9c7f5246c6f6321d36.png"><img alt="Export fiat payment accounts here. You can export altcoin accounts from the Altcoin Accounts tab." decoding="async" height="710" loading="lazy" src="../../media/wiki/b159a14c41bd5d2a2ac88fcc2add65d497bfe93310ca2f9c7f5246c6f6321d36.png" width="1200"></a><figcaption>Export fiat payment accounts here. You can export altcoin accounts from the Altcoin Accounts tab.<br><small>Historical full-size recovered source. <a href="../../recovered-media/">Provenance catalogue</a>.</small></figcaption></figure>
<div>
</div>

<span class="wiki-legacy-anchor" id="Back_up_your_wallet_seed" aria-hidden="true">
</span>

## Back up your wallet seed {#back-up-your-wallet-seed}

Please be sure to [properly back up your wallet seed](../backing-up-your-wallet-seed/).

<span class="wiki-legacy-anchor" id="Export_Tor_state" aria-hidden="true">
</span>

## Export Tor state {#export-tor-state}

If you want to carry over a particular onion address (and keep your local reputation), you can replace the <code class="wiki-source-code" id="source-code-7">btc_mainnet/tor/hiddenservice</code> folder in your data directory with the one from your backup.

<span class="wiki-legacy-anchor" id="Export_trade_history" aria-hidden="true">
</span>

## Export trade history {#export-trade-history}

In <code class="wiki-source-code" id="source-code-8">Portfolio</code> > <code class="wiki-source-code" id="source-code-9">History</code> you\'ll find an <code class="wiki-source-code" id="source-code-10">Export to CSV</code> button to export your trade history.

There\'s no way to import this data back into Bisq, but it can be useful to have a copy of this data for yourself for record-keeping, analysis, etc.

<span class="wiki-legacy-anchor" id="Export_transaction_history" aria-hidden="true">
</span>

## Export transaction history {#export-transaction-history}

In <code class="wiki-source-code" id="source-code-11">Funds</code> > <code class="wiki-source-code" id="source-code-12">Transactions</code> you\'ll find an <code class="wiki-source-code" id="source-code-13">Export to CSV</code> button to export your trade history.

There\'s no way to import this data back into Bisq, but it can be useful to have a copy of this data for yourself for record-keeping, analysis, etc.

<span class="wiki-legacy-anchor" id="Automatic_backup_with_cyclic_redundancy" aria-hidden="true">
</span>

## Automatic backup with cyclic redundancy {#automatic-backup-with-cyclic-redundancy}

Bisq doesn\'t directly implement a scheduled backup feature, but you can set up an [automatic backup routine](../automatic-backup-script/) to store a versioned history of your data directory in a compact way.

</div>
