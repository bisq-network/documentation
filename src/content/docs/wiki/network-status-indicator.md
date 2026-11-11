---
title: "Network status indicator"
slug: "wiki/network-status-indicator"
tableOfContents: false
---

<div class="wiki-recovered-article" lang="en">

There is an icon in the bottom right footer bar to indicate the the status of the P2P network connection. It will be either red, yellow or green depending on the count and type of connections your node has. Hover over it with the mouse to see the connections detail, or click on it to get a popup description of the state.

**Red** - An error situation- there are no P2P network connections. This would usually indicate that your internet connection has broken. Check other network applications such as a web browser. Bisq cannot function properly in this state. To resolve the issue, see [Troubleshooting network issues](../troubleshooting-network-issues/)

**Yellow** - there are outbound but no inbound connections. Bisq can operate in this state, but it is sub-optimal. This is a normal state at application startup, until peers discover and connect to your node. However if it persists for several hours it could mean that inbound connections are blocked, the result being your offers would not be reachable. (Peers would be frustrated with the response \"Maker_Offline\" as a result of trying to take your offer). If this condition persists for more than a few hours, clear the Tor cache and restart Bisq after clicking on: Settings -> Network Info -> Open Tor Settings -> <code class="wiki-source-code" id="source-code-1">\[Delete outdated Tor files and shut down\]</code>.

**Green** - the P2P connection is healthy, as you have a mix of outbound and inbound connections.

This indicator has been created because some Bisq nodes get unknowingly stuck in a state of not accepting inbound connections, and therefore never getting any takers for their offers. If the status remains yellow for more than an hour, the Bisq node will do a self-ping test over Tor in order to check incoming connectivity. The yellow status indicator will start blinking to attract your attention if the issue does not get resolved.

</div>
