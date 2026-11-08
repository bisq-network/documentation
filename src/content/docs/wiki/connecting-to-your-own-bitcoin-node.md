---
title: "Connecting to your own Bitcoin node"
slug: "wiki/connecting-to-your-own-bitcoin-node"
tableOfContents: false
---

<nav data-pagefind-ignore class="wiki-source-toc" aria-label="Article sections"><details open><summary>On this page</summary><ul><li><a href="#general-node-settings">General node settings</a></li><li><a href="#connecting-to-a-local-bitcoin-node">Connecting to a local Bitcoin node</a></li><li><a href="#connecting-to-another-bitcoin-node">Connecting to another Bitcoin node</a></li><li><a href="#troubleshooting">Troubleshooting</a></li></ul></details></nav>

<div class="wiki-recovered-article" lang="en"><p>Bisq will <strong>connect to <a href="../installing-your-own-bitcoin-node/">your local Bitcoin node</a></strong> if it finds it upon starting up. This article contains the requirements for this to work correctly.</p>
<p>You can also specify the addresses of particular Bitcoin nodes in <code class="wiki-source-code" id="source-code-1">Settings</code> &gt; <code class="wiki-source-code" id="source-code-2">Network Info</code>.</p>
<span class="wiki-legacy-anchor" id="General_node_settings" aria-hidden="true"></span><h2 id="general-node-settings"> General node settings </h2>
<p>The <code class="wiki-source-code" id="source-code-3">bitcoin.conf</code> file needs to contain the following settings. You can copy and paste this block directly into your configuration file:</p>
<pre><code class="wiki-source-code" id="source-code-4">
server=1
prune=0
peerbloomfilters=1
mempoolexpiry=24
</code></pre>
<p>which in turn:</p>
<ul>
<li>enables Bitcoin Core's JSON-RPC server (<code>server=1</code>); Bisq's normal Bitcoin connection uses the P2P port, not RPC</li>
<li>disables pruning so historical blocks remain available; pruning changes retained data, not whether the node fully validates blocks</li>
<li>allows Bisq to run its SPV wallet</li>
<li>prevents Bisq from repeatedly losing connection to your node in case your wallet history has many transactions, by limiting the tx retention in the local mempool to 24hrs</li>
</ul>
<p>Multiple reports have been received, where any declination of the Ronin node just won't work, or will work once, only to stop working after the next reboot, requiring a restore to network provided nodes. We are not able to suggest a workaround, except involving Ronin support.</p>
<span class="wiki-legacy-anchor" id="Connecting_to_a_local_Bitcoin_node" aria-hidden="true"></span><h2 id="connecting-to-a-local-bitcoin-node"> Connecting to a local Bitcoin node </h2>
<p>If you're running a Bitcoin full node on the same machine as Bisq, Bisq should connect to your node on startup—it will look for Bitcoin Core or <code class="wiki-source-code" id="source-code-5">bitcoind</code> running on <code class="wiki-source-code" id="source-code-6">localhost</code> on port 8333.</p>
<p>Just make sure to not be running any other Bitcoin-based altcoin nodes (like LTC) while starting Bisq.</p>
<span class="wiki-legacy-anchor" id="Connecting_to_another_Bitcoin_node" aria-hidden="true"></span><h2 id="connecting-to-another-bitcoin-node"> Connecting to another Bitcoin node </h2>
<p>By default, Bisq maximizes your privacy by connecting to nodes run by trusted Bisq contributors.</p>
<p>If you'd like to connect to another node, you can specify its address in <code class="wiki-source-code" id="source-code-7">Settings</code> &gt; <code class="wiki-source-code" id="source-code-8">Network Info</code>. Bisq will validate the address and connect to the specified node the next time it starts.</p>
<p>Bisq supports connecting to Bitcoin nodes with Tor v3 addresses: this is the easiest path to take, since you only have to fill in your node's onion address in settings.<br>
If your node is on your local network, connecting directly to it rather than using Tor would reduce latency by a sensible degree. In order to do this:</p>
<ul>
<li>make sure the node's firewall allows incoming connections on port 8333 from the local network</li>
<li>have Bitcoin daemon listen to <code class="wiki-source-code" id="source-code-9">0.0.0.0</code> rather than <code class="wiki-source-code" id="source-code-10">127.0.0.1</code> (add this line in bitcoin.conf: <code class="wiki-source-code" id="source-code-11">bind=0.0.0.0</code>)</li>
<li>uncheck "Use Tor for Bitcoin network" under Settings&gt;Network in Bisq application</li>
<li>fill in your node's local network <code class="wiki-source-code" id="source-code-12">ipaddress:8333</code> in "Use custom bitcoin Core nodes" field</li>
</ul>
<span class="wiki-legacy-anchor" id="Troubleshooting" aria-hidden="true"></span><h2 id="troubleshooting"> Troubleshooting </h2>
<p>If you get into a state where Bisq is unable to connect, or stuck at SPV resync on the loading screen, you can revert to a provided node as follows.</p>
<p>For MacOS:</p>
<pre><code class="wiki-source-code" id="source-code-13">
/Applications/Bisq.app/Contents/MacOs/Bisq -btcNodes=ybryiy2k4p4pery4qseap4iu2rxput2akuvpvczwvg4eyfafcdsvyqid.onion:8333 -useTorForBtc=true
</code></pre>
<p>For Linux:</p>
<pre><code class="wiki-source-code" id="source-code-14">
/opt/bisq/bin/Bisq -btcNodes=ybryiy2k4p4pery4qseap4iu2rxput2akuvpvczwvg4eyfafcdsvyqid.onion:8333 -useTorForBtc=true
</code></pre>
<p>For Windows:</p>
<pre><code class="wiki-source-code" id="source-code-15">
%localappdata%\Bisq\Bisq.exe -btcNodes=ybryiy2k4p4pery4qseap4iu2rxput2akuvpvczwvg4eyfafcdsvyqid.onion:8333 -useTorForBtc=true
</code></pre>
<p>After Bisq successfully started and synchronized by running it with that command, you should then go to Settings &gt; Network info, and select again "Use provided Bitcoin Core nodes".</p>
<p>Contributor nodes can be seen <a href="https://github.com/bisq-network/bisq/blob/8d345000ee22350ff6d203d4dee8c52285b6d302/core/src/main/java/bisq/core/btc/nodes/BtcNodes.java#L51-L67" rel="noopener noreferrer">here in the Bisq code</a>.</p>
<p><a href="../running-from-the-command-line/">More info on running from the command line</a>.</p>
<p><a href="../command-line-options/">More info on command line options</a>.</p>
</div>
