---
title: "Troubleshooting network issues"
slug: "wiki/troubleshooting-network-issues"
tableOfContents: false
---

<nav data-pagefind-ignore class="wiki-source-toc" aria-label="Article sections"><details open><summary>On this page</summary><ul><li><a href="#weak-internet-connection">Weak internet connection</a></li><li><a href="#3-4-connection-problem">3/4 connection problem</a></li><li><a href="#windows-antivirus-software">Windows antivirus software</a></li><li><a href="#being-temporarily-banned-by-the-tor-network">Being temporarily banned by the Tor network</a></li><li><a href="#tor-censorship">Tor censorship</a></li><li><a href="#tor-bridges-that-don-t-work">Tor bridges that don&#x27;t work</a></li><li><a href="#altcoin-nodes-running-on-the-same-computer">Altcoin nodes running on the same computer</a></li></ul></details></nav>

<div class="wiki-recovered-article" lang="en">

You may be experiencing **network issues** if you\'re stuck on Bisq\'s initial loading screen for a while. Often this results in a screen mentioning outdated Tor files and other Tor settings. This could occur for a number of reasons.

<span class="wiki-legacy-anchor" id="Weak_internet_connection" aria-hidden="true">
</span>

## Weak internet connection {#weak-internet-connection}

Bisq generally needs a strong, fast connection to work properly. Tethering on mobile connections can work but is known to cause issues.

<span class="wiki-legacy-anchor" id="3/4_connection_problem" aria-hidden="true">
</span>

## 3/4 connection problem {#3-4-connection-problem}

If Bisq stalls at step 3/4 of the startup sequence for more than 5 minutes it means the initial data download from seednodes has failed, or is taking too long. This can happen on weak or slow internet connections, or if Tor is having issues relaying the large data download to your node. Proposed mitigation is to clear the Tor cachefiles. (Close Bisq first). All files except <code class="wiki-source-code" id="source-code-1">hiddenservice</code> can be deleted from <code class="wiki-source-code" id="source-code-2">btc_mainnet/tor</code> beneath the \[[data directory](../data-directory/#default-locations)\], they will be re-created as necessary at startup. <code class="wiki-source-code" id="source-code-3">hiddenservice</code> should be kept as it defines your onion address.

See [https://github.com/bisq-network/bisq/issues/2547#issuecomment-1016787843](https://github.com/bisq-network/bisq/issues/2547#issuecomment-1016787843)

For a geekier approach, you can also try [manually choosing seednodes to connect to](../manually-select-seednodes/)

<span class="wiki-legacy-anchor" id="Windows_antivirus_software" aria-hidden="true">
</span>

## Windows antivirus software {#windows-antivirus-software}

Antivirus software is known to cause connection issues. Try turning it off to see if it helps Bisq to connect, and if it does, consider switching antivirus software or running Bisq on another operating system on which you don\'t need to run antivirus.

<span class="wiki-legacy-anchor" id="Being_temporarily_banned_by_the_Tor_network" aria-hidden="true">
</span>

## Being temporarily banned by the Tor network {#being-temporarily-banned-by-the-tor-network}

Trying to open Bisq too many times in a short timeframe can result in failing to connect to the Tor network. Simple wait 30-60 minutes and then try opening Bisq again.

<span class="wiki-legacy-anchor" id="Tor_censorship" aria-hidden="true">
</span>

## Tor censorship {#tor-censorship}

In certain situations, Bisq may fail to start because your ISP or network provider is actively blocking Tor.

Tor is tries to fight such obstacles by providing *bridges*. Bridges help you connect to the Tor network through a less well-known node. If you know someone who runs a bridge, you can ask to use their bridge, or you can go to [https://bridges.torproject.org/bridges](https://bridges.torproject.org/bridges) to pick a bridge listed by the Tor Project.

If you\'re in China, <span class="wiki-link-gap">this method using SStap <small>[unrecovered article: 在中国运行Bisq (Running Bisq in China)]</small></span> has worked to get around the Great Firewall.

<span class="wiki-legacy-anchor" id="Tor_bridges_that_don&#x27;t_work" aria-hidden="true">
</span>

## Tor bridges that don\'t work {#tor-bridges-that-don-t-work}

Some network administrators try really hard to block all Tor activity on their network (universities are infamous for this) and will even sometimes block specific types of SSL traffic and handshakes.

In these scenarios, consider using a VPN and then running Bisq from within the VPN tunnel.

<span class="wiki-legacy-anchor" id="Altcoin_nodes_running_on_the_same_computer" aria-hidden="true">
</span>

## Altcoin nodes running on the same computer {#altcoin-nodes-running-on-the-same-computer}

Some forks of the Bitcoin repository (e.g., Litecoin, Dogecoin, etc) are known to cause issues with Bisq starting up. Bisq can sometimes recognize altcoin nodes as Bitcoin nodes, causing Bisq to try connecting to them and then failing when it finds no Bitcoin blocks.

To solve this, switch altcoin nodes off, turn Bisq on and let it load completely. Then, turn the altcoin nodes back on.

</div>
