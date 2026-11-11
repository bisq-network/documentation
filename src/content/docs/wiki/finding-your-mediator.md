---
title: "Finding your mediator"
slug: "wiki/finding-your-mediator"
tableOfContents: false
---

<nav data-pagefind-ignore class="wiki-source-toc" aria-label="Article sections"><details open><summary>On this page</summary><ul><li><a href="#get-in-touch-with-your-mediator">Get in touch with your mediator</a></li><li><a href="#how-to-find-the-mediator-for-a-trade">How to find the mediator for a trade</a></li><li><a href="#in-bisq-1">In Bisq 1</a></li><li><a href="#system-message">System message</a></li><li><a href="#view-contract-in-json">View contract in JSON</a></li><li><a href="#in-bisq-2">In Bisq 2</a></li><li><a href="#bisq-easy">Bisq Easy</a></li><li><a href="#matrix-and-onion-addresses">Matrix and onion addresses</a></li></ul></details></nav>

<div class="wiki-recovered-article" lang="en">

Here is a list of current Bisq mediators and their onion addresses, as well as how you can find the mediator for a specific Bisq trade.

If you need to find your arbitrator see [here](../finding-your-arbitrator/).

<span class="wiki-legacy-anchor" id="Get_in_touch_with_your_mediator" aria-hidden="true">
</span>

## Get in touch with your mediator {#get-in-touch-with-your-mediator}

For open trades, you should be able to get in touch with your mediator through Bisq mediation chat itself.

If you cannot get in touch with your mediator on Bisq for 48 hours (sometimes Bisq message system fails), or the issue needs urgent attention, you can get in touch with them on the [Matrix bisq.chat](../matrix-bisq-chat/) group. Their Matrix handles and onion addresses are displayed in the headline for the #support channel as well.

<span class="wiki-legacy-anchor" id="How_to_find_the_mediator_for_a_trade" aria-hidden="true">
</span>

## How to find the mediator for a trade {#how-to-find-the-mediator-for-a-trade}

<span class="wiki-legacy-anchor" id="In_Bisq_1" aria-hidden="true">
</span>

### In Bisq 1 {#in-bisq-1}

<span class="wiki-legacy-anchor" id="System_message" aria-hidden="true">
</span>

#### System message {#system-message}

Go to \'Support > Mediation\' tab since mediation begins.

<figure class="wiki-source-image" id="source-image-1"><a href="../../media/wiki/76ca6ed050ec023117c2114497a18c81b404cb2678136f2e6939d4631e2b1a98.png"><img alt="Finding mediator message system.png" decoding="async" height="674" loading="lazy" src="../../media/wiki/76ca6ed050ec023117c2114497a18c81b404cb2678136f2e6939d4631e2b1a98.png" width="727"></a><figcaption>Finding mediator message system.png<br><small>Historical full-size recovered source. <a href="../../recovered-media/">Provenance catalogue</a>.</small></figcaption></figure>

<span class="wiki-legacy-anchor" id="View_contract_in_JSON" aria-hidden="true">
</span>

#### View contract in JSON {#view-contract-in-json}

Alternatively, you can look for your mediator since the trade starts:

1. Go to <code class="wiki-source-code" id="source-code-1">Portfolio > Open Trades</code>, <code class="wiki-source-code" id="source-code-2">Portfolio > History</code>, or <code class="wiki-source-code" id="source-code-3">Portfolio > Failed Trades</code> (depending on the status of your trade)
2. Click the <code class="wiki-source-code" id="source-code-4">i</code> icon next to the trade ID of the trade in question (it\'s on the very left in the first column)
3. In the pop-up that appears, toward the bottom, click <code class="wiki-source-code" id="source-code-5">DETAIL DATA</code>.
4. Ignore the <code class="wiki-source-code" id="source-code-6">\"mediatorNodeAddresses\"</code> field, as this is the list of all active mediators when the trade started.
5. Scroll down and you\'ll find <code class="wiki-source-code" id="source-code-7">\"mediatorNodeAddress\"</code> field with a single <code class="wiki-source-code" id="source-code-8">\"hostName\"</code> for the onion address.

This is the onion address of the mediator for your trade.

<span class="wiki-legacy-anchor" id="In_Bisq_2" aria-hidden="true">
</span>

### In Bisq 2 {#in-bisq-2}

<span class="wiki-legacy-anchor" id="Bisq_Easy" aria-hidden="true">
</span>

#### Bisq Easy {#bisq-easy}

The mediator for a Bisq Easy trade can be found by going to the \"My Open Trades\" tab. Trade details, including the assigned mediator, are displayed for each open trade.

<span class="wiki-legacy-anchor" id="Matrix_and_onion_addresses" aria-hidden="true">
</span>

## Matrix and onion addresses {#matrix-and-onion-addresses}

<table>
<thead>
<tr>
<th>Mediator</th>
<th>TorV3 Address</th>
<th>GitHub Handle</th>
<th>Matrix Handle</th>
</tr>
</thead>
<tbody>
<tr>
<td>luis3672</td>
<td>ivxrrbvtzsr7tpp22x6lcoo2fkxyzvq2efjvwv5fhnzcjhrzdz63srid.onion:9999</td>
<td><a href="https://github.com/luis3672" rel="noopener noreferrer">luis3672</a></td>
<td><a href="../matrix-bisq-chat/">  @luis3672:matrix.org</a></td>
</tr>
<tr>
<td>pazza83</td>
<td>e2whe6q34o5mnta7b2rai4uspmj5wxhnhvipjjohicx6sgekw47apjqd.onion:9999</td>
<td><a href="https://github.com/pazza83" rel="noopener noreferrer">pazza83</a></td>
<td><a href="../matrix-bisq-chat/">  @pazza83:matrix.org</a></td>
</tr>
<tr>
<td>solomon1923</td>
<td>3fatfssmx5h4tx4vqoty6t3skqqg33djkibs3jmyf6fqlsmwzjjhluqd.onion:19610</td>
<td><a href="https://github.com/solomon1923" rel="noopener noreferrer">solomon1923</a></td>
<td><a href="../matrix-bisq-chat/">  @solomon1923:matrix.org</a></td>
</tr>
<tr>
<td>suddenwhipvapor</td>
<td>5wmuzi76l4ogbdh6ahvdafzlebk4c3sp3q5njhz5h5qa5fwbalexa7id.onion:9999 (Bisq 1)<br>
3rpfdd5z3mem4ucmk7ada3fgzn2escdxcg4cqp5ailvpz3yeht3gacyd.onion:27368 (Bisq 2)</td>
<td><a href="https://github.com/suddenwhipvapor" rel="noopener noreferrer">suddenwhipvapor</a></td>
<td><a href="../matrix-bisq-chat/"> @suddenwhipvapor:matrix.org</a></td>
</tr>
</tbody>
</table>
<details class="wiki-table-source"><summary>Original table source</summary><pre><code>{| class="wikitable"
! Mediator
! TorV3 Address
! GitHub Handle
! Matrix Handle
|-
| luis3672
| ivxrrbvtzsr7tpp22x6lcoo2fkxyzvq2efjvwv5fhnzcjhrzdz63srid.onion:9999
| [https://github.com/luis3672 luis3672]
| [[Matrix bisq.chat |  @luis3672:matrix.org]]
|-
| pazza83
| e2whe6q34o5mnta7b2rai4uspmj5wxhnhvipjjohicx6sgekw47apjqd.onion:9999
| [https://github.com/pazza83 pazza83]
| [[Matrix bisq.chat |  @pazza83:matrix.org]]
|-
| solomon1923
| 3fatfssmx5h4tx4vqoty6t3skqqg33djkibs3jmyf6fqlsmwzjjhluqd.onion:19610
| [https://github.com/solomon1923 solomon1923]
| [[Matrix bisq.chat |  @solomon1923:matrix.org]]
|-
| suddenwhipvapor
| 5wmuzi76l4ogbdh6ahvdafzlebk4c3sp3q5njhz5h5qa5fwbalexa7id.onion:9999 (Bisq 1)&lt;br&gt;3rpfdd5z3mem4ucmk7ada3fgzn2escdxcg4cqp5ailvpz3yeht3gacyd.onion:27368 (Bisq 2)
| [https://github.com/suddenwhipvapor suddenwhipvapor]
| [[Matrix bisq.chat | @suddenwhipvapor:matrix.org]]
|}</code></pre></details>

</div>
