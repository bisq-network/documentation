---
title: "Local reputation"
slug: "wiki/local-reputation"
tableOfContents: false
---

<div class="wiki-recovered-article" lang="en">

**Local reputation** is a count of how many trades you\'ve done with a peer at a particular onion address.

The idea is that if a trade with a peer went well, it\'s reasonable to expect your next trade with that peer to go well too, creating a sort of rudimentary reputation indicator while maintaining anonymity.

As you trade on Bisq, you will see a count appear on the avatars of users you\'ve traded with.

<figure class="wiki-source-image" id="source-image-1"><a href="../../media/wiki/82bbd0f2e26e4c5ef66aca73762ebe2548c76c874f298d0d37549e77afdc6eb3.png"><img alt="Local reputation on the offer book." decoding="async" height="78" loading="lazy" src="../../media/wiki/82bbd0f2e26e4c5ef66aca73762ebe2548c76c874f298d0d37549e77afdc6eb3.png" width="96"></a><figcaption>Local reputation on the offer book.<br><small>Historical full-size recovered source. <a href="../../recovered-media/">Provenance catalogue</a>.</small></figcaption></figure>

You can reset your local reputation by deleting the <code class="wiki-source-code" id="source-code-1">btc_mainnet/tor/hiddenservice</code> folder in your [data directory](../data-directory/). Bisq will then generate a new onion address the next time it starts, causing you to look like a new trader to all peers on the network.

**Do not delete this directory if you have any open offers, trades, or disputes—or you will become unreachable and unable to respond.**

See details on restoring your onion address (and thus, your local reputation) [here](../restoring-application-data/#restore-onion-address).

</div>
