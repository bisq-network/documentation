---
title: "Installing your own Bitcoin node"
slug: "wiki/installing-your-own-bitcoin-node"
tableOfContents: false
---

<nav data-pagefind-ignore class="wiki-source-toc" aria-label="Article sections"><details><summary>On this page</summary><ul><li><a href="#hardware-requirements">Hardware requirements</a></li><li><a href="#installing-the-software">Installing the software</a></li><li><a href="#systems-with-graphical-interface">Systems with graphical interface</a></li><li><a href="#systems-with-command-line-interface">Systems with command line interface</a></li><li><a href="#caveats">Caveats</a></li><li><a href="#common-steps">Common steps</a></li><li><a href="#setup-the-node-to-accept-connections-from-bisq">Setup the node to accept connections from Bisq</a></li><li><a href="#setup-the-connection-from-bisq-to-the-node">Setup the connection from Bisq to the node</a></li><li><a href="#connecting-to-a-node-on-the-same-pc">Connecting to a node on the same PC</a></li><li><a href="#connecting-to-a-bitcoin-node-on-the-same-local-network">Connecting to a Bitcoin node on the same local network</a></li><li><a href="#connecting-to-a-remote-node-through-the-tor-network">Connecting to a remote node through the Tor Network</a></li><li><a href="#verify-the-connection">Verify the connection</a></li><li><a href="#troubleshooting">Troubleshooting</a></li></ul></details></nav>

<div class="wiki-recovered-article" lang="en">

It is best practice that any Bitcoin user installs his own node, to send and verify his own transactions; moreover, if you use Bisq consistently, you are strongly encouraged to do so, as it will make the bitcoin network connection much more stable, and especially reduce the risk of needing [SPV resync](../resyncing-spv-file/) on a wallet that contains many transactions. Even when a SPV resync is needed, it will be much painless if done while connected to your own node.

<span class="wiki-legacy-anchor" id="Hardware_requirements" aria-hidden="true">
</span>

## Hardware requirements {#hardware-requirements}

The most demanding part of a full Bitcoin node is disk space: 1TB is considered the bare minimum (2TB is better for future proofing your node), and a SSD is recommended, as the constant write operations would risk damaging the average mechanical disk. There are pruned nodes that will only keep the very last blocks of the blockchain in order to save on disk space, but as Bisq needs a fully verifying node, we will only be examining this case in the present guide.

The following are viable hardware options to host the node:

- refurbished laptop with at least 8GB of RAM
  - pros: comes with display, keyboard, and basic storage (existing storage will need to be replaced or expanded), can run multiple services and act as a full fledged home server, has builtin UPS
  - cons: drains more power and is more expensive than a Raspberry Pi 3, takes up more space on your shelf
- dedicated Raspberry Pi 3
  - pros: very small, low power, completely silent
  - cons: no builtin display, keyboard nor storage, very low performance, needs more initial maintenance
- your daily driver machine
  - pros: no need to source additional hardware (except the additional storage if it\'s not enough), will likely not suffer from the limited additional overhead of a Bitcoin node while you use it normally
  - cons: you either have to leave it always running, to keep updated with blocks as soon as they are mined, or will have to wait a variable amount of time for it to catch up to the current block height each time you turn it on, before you can use Bisq

<span class="wiki-legacy-anchor" id="Installing_the_software" aria-hidden="true">
</span>

## Installing the software {#installing-the-software}

When installing the Bitcoin node software, you will be either working on a graphical user interface, or on a system that only operates via command line (most likely the Raspberry).

<span class="wiki-legacy-anchor" id="Systems_with_graphical_interface" aria-hidden="true">
</span>

### Systems with graphical interface {#systems-with-graphical-interface}

Unless you want to install a leaner daemon setup and follow the command-line steps below, installing directly on a graphical interface is the easier path, as you can download and verify the files as per the instructions on [https://bitcoincore.org/en/download/](https://bitcoincore.org/en/download/) and then install the software as you normally would on your operating system, making sure you point it to the 1TB drive to save the blockchain.

<span class="wiki-legacy-anchor" id="Systems_with_command_line_interface" aria-hidden="true">
</span>

### Systems with command line interface {#systems-with-command-line-interface}

You may choose to run a dedicated refurbished laptop on Linux and without a desktop environment, and it would be a wise choice; regarding a Raspberry, while you could install a graphical desktop environment on a Pi 3, it is absolutely not recommended to do so, because it will be a self-contained system that will only cater to the task of running the node software, and any additional load, like keeping the graphical interface in memory, will degrade its performance.

There is a well known step-by-step guide that will illustrate how to install a full Bitcoin Node on a Raspberry, called the [RaspiBolt Guide](https://raspibolt.org/), plus its amd64/desktop counterpart, directed at laptops/PCs, called [MiniBolt](https://minibolt.info). They both include a section dedicated to installing software for a Lightning Network node, but you will only need to follow the guide for your system up to the configuration of the Bitcoin client.

<span class="wiki-legacy-anchor" id="Caveats" aria-hidden="true">
</span>

### Caveats {#caveats}

There have been multiple reports about the Ronin node package not allowing Bisq to connect (after the first time), and we know no tested solution for this issue, so it is recommended using the steps above to obtain the Bitcoin node software.

<span class="wiki-legacy-anchor" id="Common_steps" aria-hidden="true">
</span>

### Common steps {#common-steps}

No matter the path you chose above, you will have to wait a considerable amount of time after installing the node.

The initial block download will have your Bitcoin client fetch from the p2p network, and verify one by one, all the blocks since the genesis, which at the time of writing amounts to 570GB of data, so expect from 2 to 10 days of uninterrupted CPU and network activity, depending on the connection (whether clearnet or Tor) and the performance of the hardware (a faster machine will complete the block verification and writing to disk in less time)

<span class="wiki-legacy-anchor" id="Setup_the_node_to_accept_connections_from_Bisq" aria-hidden="true">
</span>

## Setup the node to accept connections from Bisq {#setup-the-node-to-accept-connections-from-bisq}

For the bitcoin connection on Bisq to be effective, you will need to make sure the node\'s configuration is correct. If you installed the client via command line interface following the guides linked above, you will probably have a working config file already, but in case you installed the GUI client, you will have to manually edit the <code class="wiki-source-code" id="source-code-1">bitcoin.conf</code> file from within the settings, and make sure it contains the following:

<pre><code class="wiki-source-code" id="source-code-2">&#10;server=1&#10;prune=0&#10;peerbloomfilters=1&#10;mempoolexpiry=24&#10;</code></pre>

which in turn:

- enables the block server mode
- disables the pruning of old blocks
- allows Bisq to run SPV queries on the node
- prevents Bisq from repeatedly losing connection to your node in case your wallet history has many transactions, by limiting the tx retention in the local mempool to 24hrs

<p>If the node is running on a separate machine, but on the same local network, it needs to listen for connections from external clients as well, and the easiest way of doing this is to add the following to the config file:</p>&#10;<code class="wiki-source-code" id="source-code-3">bind=0.0.0.0</code>

No need for the above if the node runs on a different network, and you will connect to it via Tor.

After any change to the <code class="wiki-source-code" id="source-code-4">bitcoin.conf</code> file, the bitcoin client needs to be restarted.

<p>If, on the same remote machine running the node, you installed <code class="wiki-source-code" id="source-code-5">ufw</code> as the Bolt guides suggest, you have to allow incoming connections on port 8333 (edit the local network base address as needed):</p>&#10;<code class="wiki-source-code" id="source-code-6">sudo ufw allow from 10.0.0.0/24 to any port 8333 comment 'Bitcoin p2p'</code>

<span class="wiki-legacy-anchor" id="Setup_the_connection_from_Bisq_to_the_node" aria-hidden="true">
</span>

## Setup the connection from Bisq to the node {#setup-the-connection-from-bisq-to-the-node}

The following will change depending on where the node is located respectively to Bisq.

<span class="wiki-legacy-anchor" id="Connecting_to_a_node_on_the_same_PC" aria-hidden="true">
</span>

### Connecting to a node on the same PC {#connecting-to-a-node-on-the-same-pc}

If the Bitcoin node is installed on the same machine as Bisq, the latter will automatically connect to it without the need to edit anything. Considering how Bisq will only run on amd64 architecture, you can achieve this with either your daily driver, or a dedicated laptop/desktop through direct or remote access (for example via [xpra](../remote-control-via-web-browser-using-xpra/)).

Make sure no other Bitcoin-based altcoin nodes (like LTC) are running while starting Bisq.

<span class="wiki-legacy-anchor" id="Connecting_to_a_Bitcoin_node_on_the_same_local_network" aria-hidden="true">
</span>

### Connecting to a Bitcoin node on the same local network {#connecting-to-a-bitcoin-node-on-the-same-local-network}

<p>After setting the config file to accept connections from external machines, as explained above, you will have to setup Bisq to connect to the remote node. This should be achieved by launching Bisq with the following command-line parameters (as an example, the node on the local network is at 10.0.0.21, edit the command to match your situation):</p>&#10;<code class="wiki-source-code" id="source-code-7">Bisq -btcNodes=10.0.0.21:8333 -useTorForBtc=false</code>

Once Bisq has started, you should verify under Settings > Network, that these settings are replicated, in particular you should see that the node\'s IP:port is filled in the address field, and the \"Use Tor for Bitcoin Network\" checkbox is disabled.

<span class="wiki-legacy-anchor" id="Connecting_to_a_remote_node_through_the_Tor_Network" aria-hidden="true">
</span>

### Connecting to a remote node through the Tor Network {#connecting-to-a-remote-node-through-the-tor-network}

If you installed the node software on a machine that is geographically separate from your local network, and you followed the Bolt guides, it will be already connecting to the internet through Tor, so you can point Bisq to its onion address.

<p>On the node's machine's shell, run</p>&#10;<code class="wiki-source-code" id="source-code-8">bitcoin-cli getnetworkinfo | grep address.*onion</code>

to obtain your onion address, copy it to the clipboard and paste it in Bisq under Settings > Network > Use Custom Bitcoin Core nodes

Bisq will offer to restart, thus connecting to the custom remote node.

<span class="wiki-legacy-anchor" id="Verify_the_connection" aria-hidden="true">
</span>

## Verify the connection {#verify-the-connection}

Once you connect to your own node, Bisq will show <code class="wiki-source-code" id="source-code-9">Bitcoin network peers: 1</code> in the bottom right corner, and under Settings > Network you will notice the node is the only one listed under \"Bitcoin network\".

<span class="wiki-legacy-anchor" id="Troubleshooting" aria-hidden="true">
</span>

## Troubleshooting {#troubleshooting}

If you get into a state where Bisq is unable to connect, you can revert to a provided node as follows.

For MacOS:

<code><code class="wiki-source-code" id="source-code-10">Bisq -btcNodes=devinbtctu7uctl7hly2juu3thbgeivfnvw3ckj3phy6nyvpnx66yeyd.onion:8333 -useTorForBtc=true </code></code><br>

For Linux:

<code><code class="wiki-source-code" id="source-code-11">/opt/bisq/bin/Bisq -btcNodes=devinbtctu7uctl7hly2juu3thbgeivfnvw3ckj3phy6nyvpnx66yeyd.onion:8333 -useTorForBtc=true </code></code>

For Windows:

<code><code class="wiki-source-code" id="source-code-12">C:\\Users\\your-username-here\\AppData\\Local\\Bisq\\Bisq.exe -btcNodes=devinbtctu7uctl7hly2juu3thbgeivfnvw3ckj3phy6nyvpnx66yeyd.onion:8333 -useTorForBtc=true </code></code>

Contributor nodes can be seen [in the Bisq code](https://github.com/bisq-network/bisq/blob/7c07cdb6ff60ad1186dea33acdfb688668c2aae6/core/src/main/java/bisq/core/btc/nodes/BtcNodes.java#L51-L76).

[More info on running from the command line](../running-from-the-command-line/).

[More info on command line options](../command-line-options/).

</div>
