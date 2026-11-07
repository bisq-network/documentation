---
title: "Local reputation"
slug: "wiki/local-reputation"
description: "Historical recovered Bisq Wiki article; source revision 1288"
tableOfContents: false
---

<aside class="wiki-recovery-status" role="note"><p><strong>Recovered historical wiki article.</strong> This source text has not been verified as current product guidance. Missing templates and images are marked in place. <a href="../../">Reviewed guides</a> are available separately.</p></aside>

<details class="wiki-source-provenance"><summary>Source, revision and attribution</summary><p>Source revision <a href="https://bisq.wiki/index.php?oldid=1288">1288</a>, dated 2020-06-01T03:05:13Z. Snapshot last successful ingest: 2026-10-18. Exported revision contributor: Plebeian9000; full author history and licensing remain unresolved.</p><p><a href="../../wiki-source/local-reputation.wiki.txt" download>Download exact snapshot wikitext</a> · <a href="../../wiki-source/local-reputation.json">Source metadata</a></p><p>SHA-256: <code>97813d05d0fefa01606156227ac060bfc6495283e2285f9ed69214d7587a2085</code>. Ingest-added product classification comments are not original author metadata.</p></details>



<div class="wiki-recovered-article" lang="en"><p><strong>Local reputation</strong> is a count of how many trades you've done with a peer at a particular onion address.</p>&#10;<p>The idea is that if a trade with a peer went well, it's reasonable to expect your next trade with that peer to go well too, creating a sort of rudimentary reputation indicator while maintaining anonymity.</p>&#10;<p>As you trade on Bisq, you will see a count appear on the avatars of users you've traded with.</p>&#10;<figure class="wiki-source-image" id="source-image-1"><a href="../../media/wiki/82bbd0f2e26e4c5ef66aca73762ebe2548c76c874f298d0d37549e77afdc6eb3.png"><img alt="Local reputation on the offer book." decoding="async" height="78" loading="lazy" src="../../media/wiki/82bbd0f2e26e4c5ef66aca73762ebe2548c76c874f298d0d37549e77afdc6eb3.png" width="96"></a><figcaption>Local reputation on the offer book.<br><small>Historical full-size recovered source. <a href="../../recovered-media/">Provenance catalogue</a>.</small></figcaption></figure>&#10;<p>You can reset your local reputation by deleting the <code class="wiki-source-code" id="source-code-1">btc_mainnet/tor/hiddenservice</code> folder in your <a href="../data-directory/">data directory</a>. Bisq will then generate a new onion address the next time it starts, causing you to look like a new trader to all peers on the network.</p>&#10;<p><strong>Do not delete this directory if you have any open offers, trades, or disputes—or you will become unreachable and unable to respond.</strong></p>&#10;<p>See details on restoring your onion address (and thus, your local reputation) <a href="../restoring-application-data/#restore-onion-address">here</a>.</p>&#10;</div>


