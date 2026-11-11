---
title: "Resyncing SPV file"
slug: "wiki/resyncing-spv-file"
tableOfContents: false
---

<nav data-pagefind-ignore class="wiki-source-toc" aria-label="Article sections"><details open><summary>On this page</summary><ul><li><a href="#how-to-resync-the-spv-file">How to Resync the SPV File</a></li><li><a href="#from-the-bisq-interface">From the Bisq Interface</a></li><li><a href="#from-the-file-system">From the File System</a></li><li><a href="#fix-an-incomplete-spv-resync">Fix an Incomplete SPV Resync</a></li><li><a href="#preventing-frequent-or-slow-resyncs-connect-to-your-own-node">Preventing Frequent or Slow Resyncs: Connect to Your Own Node</a></li></ul></details></nav>

<div class="wiki-recovered-article" lang="en">

**Resyncing the SPV file** (Simplified Payment Verification file, \`bisq.spvchain\`) can often solve wallet issues within Bisq, such as an incorrect balance showing, missing transactions, or other synchronization problems.

<span class="wiki-legacy-anchor" id="How_to_Resync_the_SPV_File" aria-hidden="true">
</span>

## How to Resync the SPV File {#how-to-resync-the-spv-file}

It is generally best to initiate an SPV file resync using the button within the Bisq application interface. However, if Bisq cannot start properly, you may need to initiate it manually via the file system.

<span class="wiki-legacy-anchor" id="From_the_Bisq_Interface" aria-hidden="true">
</span>

### From the Bisq Interface {#from-the-bisq-interface}

This is the recommended method if Bisq is operational.

1. Go to \`Settings\` > \`Network Info\`.
2. Click the \`RESYNC SPV WALLET\` button.
3. Bisq will prompt you to restart the application **twice**. Follow the prompts carefully.

<aside class="wiki-admonition" role="note">

**Warning**

**Sync Time & Performance:**

- Resyncing can take a significant amount of time\*, depending on the age of your wallet and the number of transactions it contains.
- It is normal for your computer to experience **high CPU usage** during the resync process.
- Bisq **may become unresponsive** while syncing. Please be patient and let the process complete.

</aside>

<figure class="wiki-source-image" id="source-image-1"><a href="../../media/wiki/74616f229fc23aca32ca8f2be50e9ee646cf0cc884f1df4da64965c936477ca6.png"><img alt="Click the 'RESYNC SPV WALLET' button under Settings &gt; Network Info." decoding="async" height="2306" loading="lazy" src="../../media/wiki/74616f229fc23aca32ca8f2be50e9ee646cf0cc884f1df4da64965c936477ca6.png" width="4096"></a><figcaption>Click the 'RESYNC SPV WALLET' button under Settings &gt; Network Info.<br><small>Historical full-size recovered source. <a href="../../recovered-media/">Provenance catalogue</a>.</small></figcaption></figure>&#10;<div>&#10;</div>

<span class="wiki-legacy-anchor" id="From_the_File_System" aria-hidden="true">
</span>

### From the File System {#from-the-file-system}

Use this method if you cannot access the button within Bisq (e.g., if Bisq fails to start fully).

1. Ensure Bisq is completely **closed**.
2. Navigate to your [Bisq data directory](../data-directory/).
3. Locate and **delete** the SPV chain file: \`btc_mainnet/wallet/bisq.spvchain\`
4. Start Bisq and wait for it to fully load (it will begin the resync process).
5. **Crucially, close Bisq completely and restart it a second time.** Bisq will *not* prompt you for this second restart when using the manual method, but it is required for the wallet state to initialize correctly after the sync.

<aside class="wiki-admonition" role="note">

**Warning**

**Sync Time & Performance:**

- As with the interface method, resyncing manually can take a **significant amount of time**, depending on wallet age and transaction count.
- Expect **high CPU usage** and potential Bisq **unresponsiveness** during the sync process. Be patient.

</aside>

<span class="wiki-legacy-anchor" id="Fix_an_Incomplete_SPV_Resync" aria-hidden="true">
</span>

### Fix an Incomplete SPV Resync {#fix-an-incomplete-spv-resync}

Sometimes, especially on older or larger wallets, the SPV resync might hang or get interrupted. If restarting Bisq causes the resync to start over from 0% instead of resuming, you can try this:

1. Ensure Bisq is completely **closed**.
2. Navigate to the root folder of your [Bisq data directory](../data-directory/#default-locations).
3. Locate and **delete** the file named \`resyncSpv\`. (This file typically only exists if a previous resync was interrupted).
4. **Restart Bisq**.

It should now attempt to resume the SPV sync from where it previously left off.

<aside class="wiki-admonition" role="note">

**Note**

When resuming an incomplete sync this way, the Bisq UI might load and show balances *before* the background sync is fully complete. Your balance may appear incorrect until the process finishes. You can repeat steps 1-4 if the sync gets interrupted again, allowing it to complete in stages.

</aside>

<span class="wiki-legacy-anchor" id="Preventing_Frequent_or_Slow_Resyncs:_Connect_to_Your_Own_Node" aria-hidden="true">
</span>

## Preventing Frequent or Slow Resyncs: Connect to Your Own Node {#preventing-frequent-or-slow-resyncs-connect-to-your-own-node}

If you find that Bisq frequently requires SPV file resyncs, or if the process consistently takes an extremely long time (especially with an older or high-transaction wallet), the most robust solution is to connect Bisq to your own Bitcoin full node.

When connected to your local node, Bisq gets blockchain information directly and reliably, bypassing the need for the SPV synchronization process over the Tor network. This typically results in faster startups and eliminates most common sync-related issues and errors.

For details on setting up a node and configuring Bisq to use it, please see:

- [Installing your own Bitcoin node](../installing-your-own-bitcoin-node/)
- [Connecting to your own Bitcoin node](../connecting-to-your-own-bitcoin-node/)

While running a full node requires more resources (disk space, bandwidth), it offers the best performance, privacy, and stability when using Bisq.

</div>
