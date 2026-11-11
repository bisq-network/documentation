---
title: "Command line options"
slug: "wiki/command-line-options"
tableOfContents: false
---

<nav data-pagefind-ignore class="wiki-source-toc" aria-label="Article sections"><details open><summary>On this page</summary><ul><li><a href="#specify-a-different-data-directory">Specify a different data directory</a></li><li><a href="#specify-a-different-data-directory-path">Specify a different data directory path</a></li><li><a href="#dump-delayed-payout-transactions">Dump delayed payout transactions</a></li><li><a href="#specify-a-bitcoin-node">Specify a Bitcoin node</a></li><li><a href="#see-all-bisq-trades">See all Bisq trades</a></li><li><a href="#include-command-line-options-by-default">Include command-line options by default</a></li></ul></details></nav>

<div class="wiki-recovered-article" lang="en">

Specifying **command line options** can enable additional non-default settings when [running Bisq from the command line](../running-from-the-command-line/).

See a full list of available options [in the code](https://github.com/bisq-network/bisq/blob/master/common/src/main/java/bisq/common/config/Config.java#L57). This article covers more notable ones for typical use cases.

<span class="wiki-legacy-anchor" id="Specify_a_different_data_directory" aria-hidden="true">
</span>

## Specify a different data directory {#specify-a-different-data-directory}

The default data directory Bisq uses is called \"Bisq\". All Bisq data is fully contained in it. The [default path](../data-directory/#default-locations) of this data directory varies based on your operating system. To change the default path too, [see below](../command-line-options/#specify-a-different-data-directory-path).

You can specify a different data directory with <code class="wiki-source-code" id="source-code-1">-\-appName=BisqTest</code> (change \"BisqTest\" to whatever you want; \"Bisq\" is the default) and Bisq will create a brand new data directory in the [default path](../data-directory/#default-locations) with a new wallet, keys, onion address, etc (or use the existing data directory with that name if it\'s already there).

You can use this option to run more than one instance of Bisq at once, which can be helpful to send funds from one Bisq instance to another when [switching to a new data directory](../switching-to-a-new-data-directory/#send-funds).

[See below](../command-line-options/#include-command-line-options-by-default) for a suggestion on including this option automatically without having to specify it every time.

<span class="wiki-legacy-anchor" id="Specify_a_different_data_directory_path" aria-hidden="true">
</span>

## Specify a different data directory path {#specify-a-different-data-directory-path}

If you\'d like to change the default path for the data directory altogether (e.g. to store the data directory on another drive), run Bisq with <code class="wiki-source-code" id="source-code-2">-\-appDataDir=/external/hard/drive/path</code>.

[See below](../command-line-options/#include-command-line-options-by-default) for a suggestion on including this option automatically without having to specify it every time.

<span class="wiki-legacy-anchor" id="Dump_delayed_payout_transactions" aria-hidden="true">
</span>

## Dump delayed payout transactions {#dump-delayed-payout-transactions}

Add the <code class="wiki-source-code" id="source-code-3">-\-dumpDelayedPayoutTxs=true</code> option to dump delayed payout transactions in the following files in your data directory, inside the <code class="wiki-source-code" id="source-code-4">btc_mainnet/db</code> folder:

1. delayed_payout_txs_closed.json
2. delayed_payout_txs_pending.json
3. delayed_payout_txs_failed.json

<span class="wiki-legacy-anchor" id="Specify_a_Bitcoin_node" aria-hidden="true">
</span>

## Specify a Bitcoin node {#specify-a-bitcoin-node}

Sometimes Bisq cannot connect to the node specified in the interface at <code class="wiki-source-code" id="source-code-5">Settings</code> > <code class="wiki-source-code" id="source-code-6">Network Info</code>, so starting Bisq with <code class="wiki-source-code" id="source-code-7">-\-btcNodes=\<node address></code> can help.

[See below](../command-line-options/#include-command-line-options-by-default) for a suggestion on including this option automatically without having to specify it every time.

<span class="wiki-legacy-anchor" id="See_all_Bisq_trades" aria-hidden="true">
</span>

## See all Bisq trades {#see-all-bisq-trades}

See all Bisq trades by running the <code class="wiki-source-code" id="source-code-8">-\-dumpStatistics=true</code> option. Then check out <code class="wiki-source-code" id="source-code-9">btc_mainnet/db/trade_statistics.json</code>.

[See below](../command-line-options/#include-command-line-options-by-default) for a suggestion on including this option automatically without having to specify it every time.

<span class="wiki-legacy-anchor" id="Include_command-line_options_by_default" aria-hidden="true">
</span>

## Include command-line options by default {#include-command-line-options-by-default}

If there are certain options you\'d like to include every time you start Bisq, you can make a script that specifies them for you.

For example, this script specifies an alternative data directory path on macOS:

`#!/bin/bash`\
\
`/Applications/Bisq.app/Contents/MacOS/Bisq --appDataDir=/external/hard/drive/path`

Replace the Bisq executable path above with the [one for your operating system](../running-from-the-command-line/) and specify the options you want to include. Then put the script somewhere in your system path so you can easily call it.

Optionally, consider making a dummy directory in the default location to prevent Bisq from accidentally launching in its default mode. To do this, create a directory named \"Bisq\" in the default [data directory path](../data-directory/#default-locations) for your operating system without any permissions.

For example, on macOS:

`$ cd ~/Library/Application\ Support/`\
`$ mkdir Bisq`\
`$ chmod 000 Bisq`

In this way, since the system won\'t have write access in the default location, launching Bisq normally will fail, reminding you to launch Bisq with your script.

</div>
