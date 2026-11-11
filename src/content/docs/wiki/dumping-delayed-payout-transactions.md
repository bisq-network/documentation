---
title: "Dumping delayed payout transactions"
slug: "wiki/dumping-delayed-payout-transactions"
tableOfContents: false
---

<nav data-pagefind-ignore class="wiki-source-toc" aria-label="Article sections"><details open><summary>On this page</summary><ul><li><a href="#commands-to-dump-delayed-payout-transactions">Commands to dump delayed payout transactions</a></li><li><a href="#where-to-find-the-delayed-payout-files">Where to find the delayed payout files</a></li><li><a href="#next-steps">Next steps</a></li></ul></details></nav>

<div class="wiki-recovered-article" lang="en">

If you or a mediator require additional information on failed, pending, or closed transactions, run Bisq with the <code class="wiki-source-code" id="source-code-1">-\-dumpDelayedPayoutTxs=true</code> command line argument.

The instructions below contain specific commands for each of the major desktop operating systems you can copy and paste into a terminal.

<span class="wiki-legacy-anchor" id="Commands_to_dump_delayed_payout_transactions" aria-hidden="true">
</span><h2 id="commands-to-dump-delayed-payout-transactions"> Commands to dump delayed payout transactions </h2>
<span class="wiki-template-gap" role="note"><strong>[Unresolved template: Run_with_command_line_options]</strong> <code>{{Run_with_command_line_options|&lt;nowiki&gt;--dumpDelayedPayoutTxs=true&lt;/nowiki&gt;}}</code></span>

<span class="wiki-legacy-anchor" id="Where_to_find_the_delayed_payout_files" aria-hidden="true">
</span>

## Where to find the delayed payout files {#where-to-find-the-delayed-payout-files}

Shortly after running one of the commands above, you will find 3 newly-created files in your Bisq data directory:

1. <code class="wiki-source-code" id="source-code-3">delayed_payout_txs_closed.json</code>
2. <code class="wiki-source-code" id="source-code-4">delayed_payout_txs_pending.json</code>
3. <code class="wiki-source-code" id="source-code-5">delayed_payout_txs_failed.json</code>

<p>The location of your data directory depends on what operating system you're using:</p>
<span class="wiki-template-gap" role="note"><strong>[Unresolved template: Default_data_directory_locations]</strong> <code>{{Default_data_directory_locations}}</code></span>

<span class="wiki-legacy-anchor" id="Next_steps" aria-hidden="true">
</span>

## Next steps {#next-steps}

You can broadcast the DPT through any online tx broadcaster service, like that of [mempool.space](https://mempool.space/tx/push).

Publishing the DPT will enable the arbitration process, where communication with RefundAgent will be necessary in order to manage the dispute. Chances are that if you need to manually broadcast the DPT, you cannot communicate with RefundAgent through the normal arbitration chat, so you will have to contact him through matrix, [Finding your arbitrator](../finding-your-arbitrator/)

</div>
