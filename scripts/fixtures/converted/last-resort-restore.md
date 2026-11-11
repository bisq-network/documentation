---
title: "Last resort restore"
slug: "wiki/last-resort-restore"
tableOfContents: false
---

<nav data-pagefind-ignore class="wiki-source-toc" aria-label="Article sections"><details open><summary>On this page</summary><ul><li><a href="#test-with-a-fresh-data-directory">Test with a fresh data directory</a></li><li><a href="#import-raw-data-from-backup">Import raw data from backup</a></li></ul></details></nav>

<div class="wiki-recovered-article" lang="en">

Sometimes it will happen that your Bisq instance won\'t start, and you don\'t have backups, or your backups do not start as well, or are too old to be useful. The following is to be intended as a hacky-workaround-last-resort-attempt to have Bisq start while retaining as much data as possible from the previous installation. In practical terms, it means that if something goes wrong with this guide and your machine explodes, you were warned and are the sole responsible for the event.

<span class="wiki-legacy-anchor" id="Test_with_a_fresh_data_directory" aria-hidden="true">
</span>

## Test with a fresh data directory {#test-with-a-fresh-data-directory}

First of all, make sure you have the latest version installed, and Bisq is closed (terminate orphan existing processes if any), then rename your [data directory](../data-directory/#default-locations) by changing <code class="wiki-source-code" id="source-code-1">Bisq</code> to, for example, <code class="wiki-source-code" id="source-code-2">Bisq.old</code>.\
Start Bisq again: it should start into a 100% new instance, creating a brand new <code class="wiki-source-code" id="source-code-3">Bisq</code> folder (if it doesn\'t, try uninstalling and then reinstalling Bisq).\
Close Bisq again: we are going to use the freshly created Data Directory as a stump to populate with our old data.

<span class="wiki-legacy-anchor" id="Import_raw_data_from_backup" aria-hidden="true">
</span>

## Import raw data from backup {#import-raw-data-from-backup}

Open your renamed folder, get into the <code class="wiki-source-code" id="source-code-4">btc_mainnet/db</code> folder, and sort files by \"last modified\" descending, you are looking for those files that were modified most recently, all of them in the same day (presumably the last day your Bisq was operational).\
The list should include:<br>

<pre><code class="wiki-source-code" id="source-code-5">&#10;BsqSwapTrades&#10;&#10;DisputeList&#10;&#10;RefundDisputeList&#10;&#10;SequenceNumberMap&#10;&#10;MyVoteList&#10;&#10;OpenOffers&#10;&#10;MyBlindVoteList&#10;&#10;ClosedTrades&#10;&#10;MediationDisputeList&#10;&#10;MyProposalList&#10;&#10;MailboxMessageList&#10;&#10;AccountAgeWitnessStore&#10;&#10;PendingTrades&#10;&#10;MyProofOfBurnList&#10;&#10;PreferencesPayload&#10;&#10;UserPayload&#10;&#10;AddressEntryList&#10;&#10;FailedTrades&#10;&#10;MyReputationList&#10;&#10;TempProposalStore&#10;&#10;NavigationPath&#10;&#10;UnconfirmedBsqChangeOutputList&#10;&#10;IgnoredMailboxMap&#10;&#10;PeerList&#10;&#10;RemovedPayloadsMap&#10;&#10;TradeStatistics3Store&#10;&#10;SignedWitnessStore&#10;&#10;</code></pre>

Copy all the above files in the corresponding <code class="wiki-source-code" id="source-code-6">btc_mainnet/db</code> folder of your fresh data directory, overwriting the existing ones.

Then, delete from the fresh data directory, and replace with copies from the old directory, the following folders:<br>

<pre><code class="wiki-source-code" id="source-code-7">btc_mainnet/keys&#10;&#10;btc_mainnet/wallet&#10;&#10;btc_mainnet/tor/hiddenservice&#10;&#10;</code></pre>

Cross your fingers, and start Bisq again hoping that everything, including the state of trades and disputes, has been restored; if not, this is a reversible step as you can simply restore the existing old folder after deleting the fresh one you created.

If anything is off with the wallet balances shown by Bisq after this restore, you can try a SPV resync (or more)

</div>
