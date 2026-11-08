---
title: "Finding your arbitrator"
slug: "wiki/finding-your-arbitrator"
tableOfContents: false
---

<nav data-pagefind-ignore class="wiki-source-toc" aria-label="Article sections"><details open><summary>On this page</summary><ul><li><a href="#get-in-touch-with-your-arbitrator">Get in touch with your arbitrator</a></li><li><a href="#how-to-find-the-arbitrator-for-a-trade">How to find the arbitrator for a trade</a></li><li><a href="#in-bisq-1">In Bisq 1</a></li><li><a href="#system-message">System message</a></li><li><a href="#view-contract-in-json">View contract in JSON</a></li><li><a href="#matrix-and-onion-addresses">Matrix and onion addresses</a></li></ul></details></nav>

<div class="wiki-recovered-article" lang="en"><p>This article lists public arbitrator/refund-agent identity mappings and explains how to find the agent assigned to a specific trade. The table is a source snapshot, not a guarantee of current availability; use the trade's assigned in-app arbitration channel first.</p>
<p>If you need to find your mediator see <a href="../finding-your-mediator/">here</a>.</p>
<span class="wiki-legacy-anchor" id="Get_in_touch_with_your_arbitrator" aria-hidden="true"></span><h2 id="get-in-touch-with-your-arbitrator"> Get in touch with your arbitrator </h2>
<p>For open trades, you should be able to get in touch with your arbitrator through Bisq arbitration chat itself.</p>
<p>If you cannot get in touch with your arbitrator on Bisq for 72 hours (sometimes Bisq message system fails), or the issue needs urgent attention, you can get in touch with them on the <a href="../matrix-bisq-chat/">Matrix bisq.chat</a> group. Their Matrix handles and onion addresses are displayed in the headline for the #support channel as well.</p>
<span class="wiki-legacy-anchor" id="How_to_find_the_arbitrator_for_a_trade" aria-hidden="true"></span><h2 id="how-to-find-the-arbitrator-for-a-trade"> How to find the arbitrator for a trade </h2>
<span class="wiki-legacy-anchor" id="In_Bisq_1" aria-hidden="true"></span><h3 id="in-bisq-1"> In Bisq 1 </h3>
<span class="wiki-legacy-anchor" id="System_message" aria-hidden="true"></span><h4 id="system-message"> System message </h4>
<p>Go to 'Support &gt; Arbitration' tab since arbitration begins.</p>
<span class="wiki-legacy-anchor" id="View_contract_in_JSON" aria-hidden="true"></span><h4 id="view-contract-in-json"> View contract in JSON </h4>
<p>Alternatively, you can look for your arbitrator since the trade starts:</p>
<ol>
<li>Go to <code class="wiki-source-code" id="source-code-1">Portfolio &gt; Open Trades</code>, <code class="wiki-source-code" id="source-code-2">Portfolio &gt; History</code>, or <code class="wiki-source-code" id="source-code-3">Portfolio &gt; Failed Trades</code> (depending on the status of your trade)</li>
<li>Click the <code class="wiki-source-code" id="source-code-4">i</code> icon next to the trade ID of the trade in question (it's on the very left in the first column)</li>
<li>In the pop-up that appears, toward the bottom, click <code class="wiki-source-code" id="source-code-5">View Contract in JSON Format</code>.</li>
<li>Scroll down and you'll find <code class="wiki-source-code" id="source-code-6">"refundAgentNodeAddress"</code> it is just below <code class="wiki-source-code" id="source-code-7">"lockTime"</code> after the refundAgentNodeAddress you will see your arbitrators's onion address.</li>
</ol>
<p>This is the onion address of the arbitrator for your trade.</p>
<span class="wiki-legacy-anchor" id="Matrix_and_onion_addresses" aria-hidden="true"></span><h2 id="matrix-and-onion-addresses"> Matrix and onion addresses </h2>
<table>
<thead>
<tr>
<th>Arbitrator</th>
<th>TorV3 Address</th>
<th>GitHub Handle</th>
<th>Matrix Handle</th>
</tr>
</thead>
<tbody>
<tr>
<td>﻿refundagent2</td>
<td>3z5jnirlccgxzoxc6zwkcgwj66bugvqplzf6z2iyd5oxifiaorhnanqd.onion:9999</td>
<td><a href="https://github.com/refund-agent2" rel="noopener noreferrer">refund-agent2</a></td>
<td><a href="../matrix-bisq-chat/">  @refund-agent2:unredacted.org</a></td>
</tr>
<tr>
<td>refundagent3</td>
<td>yjlcxr6rho6zkpecwdp3vlpduzcl7i6cbgaquvxqmvsbw3dnheus6qad.onion:9999</td>
<td><a href="https://github.com/refundagent3" rel="noopener noreferrer">refundagent3</a></td>
<td><a href="../matrix-bisq-chat/">  @refundagent3:imagisphe.re</a></td>
</tr>
</tbody>
</table>
<details class="wiki-table-source"><summary>Original table source</summary><pre><code>{| class="wikitable"
! Arbitrator &#10;! TorV3 Address
! GitHub Handle
! Matrix Handle
|-
| ﻿refundagent2
| 3z5jnirlccgxzoxc6zwkcgwj66bugvqplzf6z2iyd5oxifiaorhnanqd.onion:9999
| [https://github.com/refund-agent2 refund-agent2]
| [[Matrix bisq.chat |  @refund-agent2:unredacted.org]]
|-
| refundagent3
| yjlcxr6rho6zkpecwdp3vlpduzcl7i6cbgaquvxqmvsbw3dnheus6qad.onion:9999
| [https://github.com/refundagent3 refundagent3]
| [[Matrix bisq.chat |  @refundagent3:imagisphe.re]]
|}</code></pre></details>
</div>
