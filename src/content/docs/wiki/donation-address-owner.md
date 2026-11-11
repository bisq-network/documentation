---
title: "Donation Address Owner"
slug: "wiki/donation-address-owner"
tableOfContents: false
---

<nav data-pagefind-ignore class="wiki-source-toc" aria-label="Article sections"><details open><summary>On this page</summary><ul><li><a href="#issue">Issue</a></li><li><a href="#team">Team</a></li><li><a href="#duties">Duties</a></li><li><a href="#rights">Rights</a></li><li><a href="#compensation">Compensation</a></li><li><a href="#bonding">Bonding</a></li></ul></details></nav>

<div class="wiki-recovered-article" lang="en"><aside class="wiki-admonition" role="note"><p><strong>Warning</strong></p><p><code>The </code><strong><code>Donation Address Owner</code></strong><code> (sometimes referred to as the "burning man") is a now retired Bisq role. The Donation address owner controlled the BTC address where BTC trade fees and funds from time-locked payout transactions where sent. The Donation Address Owner role was replaced by the new <a href="../burning-men/">Burning Men Protocol</a> that went live in January 2023. As a result of this change the Donation Address Owner is now largely redundant. Rarely bitcoin from trade fees and some delayed payout transactions will go to the donation address owner, these are the result of edge cases and, therefore, the donation address role has now been retired from Bisq.</code></p>
<p>Please see <a href="../arbitration/">arbitration</a> for more details on how the new burning men protocol works with other elements of Bisq's decentralized dispute resolution process. The below information is kept for prosperity.</p>
</aside>
<span class="wiki-legacy-anchor" id="Issue" aria-hidden="true"></span><h2 id="issue"> Issue </h2>
<a href="https://github.com/bisq-network/roles/issues/80" rel="noopener noreferrer">https://github.com/bisq-network/roles/issues/80</a>
<span class="wiki-legacy-anchor" id="Team" aria-hidden="true"></span><h2 id="team"> Team </h2>
<a href="https://github.com/orgs/bisq-network/teams/donation-address-owners/" rel="noopener noreferrer">https://github.com/orgs/bisq-network/teams/donation-address-owners/</a>
<span class="wiki-legacy-anchor" id="Duties" aria-hidden="true"></span><h2 id="duties"> Duties </h2>
<ul>
<li><a href="https://github.com/bisq-network/proposals/issues/294" rel="noopener noreferrer">Trade directly</a> with <a href="../arbitrator/">Refund Agent</a> to buy BSQ with the BTC that has collected in the donation address wallet / trade fee address wallet. The trade should take place at the BSQ/BTC rate they proposed in the Arbitrator's accepted github issue if is is within one cycle of their reimbursement proposal being accepted.</li>
<li><a href="https://github.com/bisq-network/proposals/issues/366" rel="noopener noreferrer">Trade directly</a> with <a href="https://github.com/bisq-network/proposals/issues/296" rel="noopener noreferrer">partially reimbursed traders</a> to buy BSQ with the BTC that has collected in the donation address wallet / trade fee address wallet. The trade should take place at the BSQ/BTC rate partially reimbursed traders propose in their accepted github issue if is is within one cycle of their reimbursement proposal being accepted.</li>
<li>Approximately 4 times a month buy BSQ with BTC that has collected in the donation address wallet / trade fee address wallet.
<ul>
<li>Buy BSQ with the lowest priced offers first</li>
<li>Take offers to sell BSQ regardless of size (small or large)</li>
<li>Avoid taking any offer with a price 20% above the rolling weighted 30 day BSQ/BTC average</li>
<li>Announce at least 2 trading sessions per month in the <a href="https://github.com/bisq-network/roles/issues/80" rel="noopener noreferrer">role issue</a> a few days in advance</li>
</ul></li>
<li>Occasionally make offers in Bisq to buy BSQ with BTC that has collected in the donation address wallet / trade fee address wallet.</li>
<li>Burn the purchased BSQ and post trades taken, and proof of burn on the <a href="https://github.com/bisq-network/roles/issues/80" rel="noopener noreferrer">role issue</a></li>
<li>At least once per cycle, when taking offers, Burning Man should use all BTC funds up to the point where sell BSQ offers are 20% above the weighted 30 day BSQ/BTC average.</li>
</ul>
<span class="wiki-legacy-anchor" id="Rights" aria-hidden="true"></span><h2 id="rights"> Rights </h2>
<ul>
<li>Ownership of the Bisq donation addresses for <a href="https://mempool.space/address/38bZBj5peYS3Husdz7AH3gEUiUbYRD951t" rel="noopener noreferrer">fees</a> and <a href="https://mempool.space/address/34VLFgtFKAtwTdZ5rengTT2g2zC99sWQLC" rel="noopener noreferrer">delayed payouts</a>. Deprecated address is <a href="https://mempool.space/address/3A8Zc1XioE2HRzYfbb5P8iemCS72M6vRJV" rel="noopener noreferrer">3A8Zc1XioE2HRzYfbb5P8iemCS72M6vRJV</a>.</li>
</ul>
<span class="wiki-legacy-anchor" id="Compensation" aria-hidden="true"></span><h2 id="compensation"> Compensation </h2>
<p>The Donation Address Owner's role is compensated $1,000 USD in BSQ equivalent every Bisq cycle (approximately every month).</p>
<span class="wiki-legacy-anchor" id="Bonding" aria-hidden="true"></span><h2 id="bonding"> Bonding </h2>
<p>A <a href="https://github.com/bisq-network/bisq/blob/42a037e/core/src/main/java/bisq/core/dao/state/model/governance/BondedRoleType.java#L70" rel="noopener noreferrer">50,000 BSQ bond</a> is required.</p>
</div>
