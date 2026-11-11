---
title: "Restoring application data"
slug: "wiki/restoring-application-data"
tableOfContents: false
---

<nav data-pagefind-ignore class="wiki-source-toc" aria-label="Article sections"><details open><summary>On this page</summary><ul><li><a href="#restore-an-entire-data-directory">Restore an entire data directory</a></li><li><a href="#restore-payment-accounts">Restore payment accounts</a></li><li><a href="#restore-payment-account-metadata">Restore payment account metadata</a></li><li><a href="#restore-payment-account-aging-and-signing-status">Restore payment account aging and signing status</a></li><li><a href="#restore-onion-address">Restore onion address</a></li><li><a href="#restore-trade-history">Restore trade history</a></li><li><a href="#restore-wallet">Restore wallet</a></li></ul></details></nav>

<div class="wiki-recovered-article" lang="en">

**Restoring application data** can be useful to bring back payment accounts, onion addresses, and other items from a [backup](../backing-up-application-data/)—or to move your Bisq instance to an entirely new machine.

You can restore an entire data directory at once, or just the parts you want.

<span class="wiki-legacy-anchor" id="Restore_an_entire_data_directory" aria-hidden="true">
</span>

## Restore an entire data directory {#restore-an-entire-data-directory}

First make sure Bisq is closed. Then copy the entire <code class="wiki-source-code" id="source-code-1">Bisq</code> directory from your backup and paste it in your machine\'s [default data directory location](../data-directory/#default-locations). If there already is a directory called <code class="wiki-source-code" id="source-code-2">Bisq</code> there, remove it (or rename it) and replace it with your backup.

Data directories work across operating systems, so you can copy a data directory created on a Mac to the appropriate location on Linux or Windows, and it will work.

Please **do not** run the same data directory on 2 machines at the same time, even if you don\'t run both instances at the same time, as data may get corrupted in strange ways.

<span class="wiki-legacy-anchor" id="Restore_payment_accounts" aria-hidden="true">
</span>

## Restore payment accounts {#restore-payment-accounts}

A [payment account export](../backing-up-application-data/#back-up-payment-accounts) only contains metadata (name, bank information, etc). For fiat accounts, this means that restoring payment accounts is a 2-step process.

<span class="wiki-legacy-anchor" id="Restore_payment_account_metadata" aria-hidden="true">
</span>

### Restore payment account metadata {#restore-payment-account-metadata}

If you have a payment accounts export file, import it in <code class="wiki-source-code" id="source-code-3">Account</code> > <code class="wiki-source-code" id="source-code-4">National Currency Accounts</code>.

If you don\'t have an export file, but you do have a full backup, you can salvage your payment account metadata from <code class="wiki-source-code" id="source-code-5">btc_mainnet/db/UserPayload</code> by running the <code class="wiki-source-code" id="source-code-6">strings</code> utility on the <code class="wiki-source-code" id="source-code-7">UserPayload</code> file (e.g., run <code class="wiki-source-code" id="source-code-8">strings /path/to/backup/btc_mainnet/db/UserPayload</code> in a terminal window). The command will output a simplified version of the <code class="wiki-source-code" id="source-code-9">UserPayload</code> file to your terminal. Scroll up a bit and you should see your payment account information.

Use the output to copy and paste the details into new payment accounts in Bisq, paying special attention to make sure each field is copied over with 100% accuracy (including the salt): even a 1 character difference in any field will cause the hash of the payment account to be different, which means aging and signing status will not be restored in the following step.

There are quirks. Here\'s an example of output from a <code class="wiki-source-code" id="source-code-10">strings</code> command:

`SEPA`\
`Alice Liddell`\
`DE89370400440532013000`\
`DEUTDE5X*`\
`SKzH`\
`salt`\
`@56655c3738ea9dea3b20f482fff048985a2757e57dff206fbd9e8c4f267f7781`

From the output above:

- Be wary of extra characters at the beginning or end of a line. In the example above, the <code class="wiki-source-code" id="source-code-11">\*</code> character is not part of the BIC \"DEUTDE5X\".
- Salts are alphanumeric, so the <code class="wiki-source-code" id="source-code-12">@</code> is not part of the salt \"56655c3738ea9dea3b20f482fff048985a2757e57dff206fbd9e8c4f267f7781\".

If you\'re on Windows, or cannot use the <code class="wiki-source-code" id="source-code-13">strings</code> utility for some other reason, you can just open <code class="wiki-source-code" id="source-code-14">UserPayload</code> directly in a text editor, but there will be more cruft to sift through since the file isn\'t meant to be human-readable.

It may be tempting to just replace the entire <code class="wiki-source-code" id="source-code-15">UserPayload</code> file from a backup, but this is **not recommended**, as it may contain other data that could result in data corruption in your new instance.

<span class="wiki-legacy-anchor" id="Restore_payment_account_aging_and_signing_status" aria-hidden="true">
</span>

### Restore payment account aging and signing status {#restore-payment-account-aging-and-signing-status}

Once you\'ve restored your payment account metadata, you\'ll see the accounts in Bisq, but they\'ll have no aging or signing status.

You can get aging and signing status back by replacing <code class="wiki-source-code" id="source-code-16">btc_mainnet/keys/sig.key</code> from your backup.

1. Make sure you have no active offers, trades or disputes; once you change <code class="wiki-source-code" id="source-code-17">sig.key</code>, you will become unreachable.
2. Close Bisq. Also make sure you\'ve made a [backup of your data directory](../backing-up-application-data/) (just in case).
3. Replace <code class="wiki-source-code" id="source-code-18">/path/to/data/directory/btc_mainnet/keys/sig.key</code> with the <code class="wiki-source-code" id="source-code-19">sig.key</code> from your backup.

Upon opening Bisq, you should see account aging and signing status restored for your fiat payment accounts.

If you don\'t, double-check:

- You copied account metadata and salt correctly [in the previous step](../restoring-application-data/#restore-payment-account-metadata).
- The <code class="wiki-source-code" id="source-code-20">sig.key</code> you copied is the correct one (i.e., the one you were using when your accounts accrued aging and/or got signed)

<span class="wiki-legacy-anchor" id="Restore_onion_address" aria-hidden="true">
</span>

## Restore onion address {#restore-onion-address}

Your onion address determines your [local reputation](../local-reputation/), so depending on your preferences, you may want to reset it or restore it over time.

If you want to restore it:

- Close Bisq. Also make sure you\'ve made a [backup of your data directory](../backing-up-application-data/) (just in case).
- Replace the <code class="wiki-source-code" id="source-code-21">/path/to/data/directory/btc_mainnet/tor/hiddenservice/</code> folder with the <code class="wiki-source-code" id="source-code-22">btc_mainnet/tor/hiddenservice/</code> folder from your backup.

When you open Bisq, your onion address will be restored.

This means that the peers that have traded with you will see [bubbles with trade counts](../local-reputation/) in their offer books for *your* offers.

<span class="wiki-legacy-anchor" id="Restore_trade_history" aria-hidden="true">
</span>

## Restore trade history {#restore-trade-history}

You may want to keep your trade history despite changing wallets. You can do so by:

- Closing Bisq.
- Replacing the <code class="wiki-source-code" id="source-code-23">/path/to/data/directory/btc_mainnet/db/ClosedTrades</code> file on your new directory with the file from backup with the same name.

You will see [bubbles with trade counts](../local-reputation/) in the offer books for any any peers you traded with.

<span class="wiki-legacy-anchor" id="Restore_wallet" aria-hidden="true">
</span>

## Restore wallet {#restore-wallet}

It\'s good to start with a [clean wallet](../create-a-new-wallet-for-your-data-directory/) every so often, because Bisq wallets use the bitcoinj library, which causes wallet files to get increasingly larger with every transaction. Wallet corruption becomes increasingly likely and performance suffers (e.g. long startup times). If starting a new data directory, it\'s generally best to just send funds from one Bisq instance to another with an on-chain transaction.

</div>
