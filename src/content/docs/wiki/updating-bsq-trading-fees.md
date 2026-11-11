---
title: "Updating BSQ trading fees"
slug: "wiki/updating-bsq-trading-fees"
tableOfContents: false
---

<nav data-pagefind-ignore class="wiki-source-toc" aria-label="Article sections"><details open><summary>On this page</summary><ul><li><a href="#determine-new-bsq-fees">Determine new BSQ fees</a></li><li><a href="#submit-dao-parameter-proposals">Submit DAO parameter proposals</a></li><li><a href="#communicate-changes">Communicate changes</a></li><li><a href="#reference">Reference</a></li></ul></details></nav>

<div class="wiki-recovered-article" lang="en"><p><strong>Updating BSQ fees</strong> takes place every cycle to keep the BSQ <a href="../trading-fees/">trading fees</a> at a 50% discount to BTC trading fees.</p>
<p>The <a href="../compensation-maintainer/">Compensation Maintainer</a> takes the following steps to update BSQ trading fees.</p>
<span class="wiki-legacy-anchor" id="Determine_new_BSQ_fees" aria-hidden="true"></span><h2 id="determine-new-bsq-fees"> Determine new BSQ fees </h2>
<p>Three days before the end of proposal phase, the <a href="../compensation-maintainer/">Compensation Maintainer</a> shall:</p>
<ul>
<li>Calculate BSQ trading fee discount <a href="https://cryptpad.fr/sheet/#/2/sheet/view/khBDMTPxN9GkLPNYaLtyWFDmdXTnDygFeYZ--qngS1o/" rel="noopener noreferrer">on this spreadsheet</a> using the 30-day weighted average USD/BSQ price and live USD/BTC price at the time.
<ul>
<li>If existing BSQ discount is under 40% or over 60%, calculate new BSQ trading fees to restore a 50% discount.</li>
<li>Update spreadsheet with new proposed fees. If there is no need for an update, leave the "New Fees" section blank.</li>
</ul></li>
</ul>
<span class="wiki-legacy-anchor" id="Submit_DAO_parameter_proposals" aria-hidden="true"></span><h2 id="submit-dao-parameter-proposals"> Submit DAO parameter proposals </h2>
<p>Upon calculating the new BSQ fees, the <a href="../compensation-maintainer/">Compensation Maintainer</a> shall:</p>
<ul>
<li>Create a new post on <a href="https://github.com/bisq-network/proposals/" rel="noopener noreferrer">github proposals</a> with the title <code class="wiki-source-code" id="source-code-1">BSQ trading fee update for Cycle X</code> indicating the new proposed trading fees and close the old post (or indicate in a comment at the already opened post if there will be no changes).</li>
<li>Submit DAO change parameter proposals for new BSQ trading fees and comment the corresponding TXIDs (if necessary).</li>
</ul>
<span class="wiki-legacy-anchor" id="Communicate_changes" aria-hidden="true"></span><h2 id="communicate-changes"> Communicate changes </h2>
<p>Once DAO results are available, the <a href="../compensation-maintainer/">Compensation Maintainer</a> shall:</p>
<ul>
<li>Update the <a href="../trading-fees/">trading fees</a> page with new BSQ trading fees.</li>
</ul>
<span class="wiki-legacy-anchor" id="Reference" aria-hidden="true"></span><h2 id="reference"> Reference </h2>
<p>Proposals <a href="https://github.com/bisq-network/proposals/issues/173" rel="noopener noreferrer">#173</a> and <a href="https://github.com/bisq-network/proposals/issues/365" rel="noopener noreferrer">#365</a> led to the development of this procedure.</p>
</div>
