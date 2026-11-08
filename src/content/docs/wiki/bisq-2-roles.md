---
title: "Bisq 2 Roles"
slug: "wiki/bisq-2-roles"
tableOfContents: false
---

<nav data-pagefind-ignore class="wiki-source-toc" aria-label="Article sections"><details><summary>On this page</summary><ul><li><a href="#system-roles">System Roles</a></li><li><a href="#mediator">Mediator</a></li><li><a href="#moderator">Moderator</a></li><li><a href="#security-manager">Security Manager</a></li><li><a href="#update-manager">Update Manager</a></li><li><a href="#delegable-roles">Delegable Roles</a></li><li><a href="#seed-node">Seed Node</a></li><li><a href="#oracle-node">Oracle Node</a></li><li><a href="#dao-bridge-service">DAO Bridge Service</a></li><li><a href="#reputation-service">Reputation Service</a></li><li><a href="#time-stamping-service">Time-Stamping Service</a></li><li><a href="#explorer-nodes">Explorer Nodes</a></li><li><a href="#market-price-node">Market Price Node</a></li><li><a href="#becoming-a-bonded-role-holder-in-bisq-2">Becoming a Bonded Role Holder in Bisq 2</a></li><li><a href="#bsq-bonding-for-roles-nodes">BSQ Bonding for Roles/Nodes</a></li><li><a href="#confiscation-of-bsq-bonds">Confiscation of BSQ Bonds</a></li></ul></details></nav>

<div class="wiki-recovered-article" lang="en"><p>In <a href="../bisq-2/">Bisq 2</a>, certain network functions and processes rely on contributors who take responsibility for specific <strong>bonded roles</strong>. These roles require locking <a href="../introduction-to-the-dao/">BSQ</a> as a bond, approved by the <a href="../introduction-to-the-dao/">DAO</a>, ensuring accountability and security for the network's decentralized infrastructure.</p>
<p>There are two main types of bonded roles in Bisq 2: System Roles and Delegable Roles.</p>
<span class="wiki-legacy-anchor" id="System_Roles" aria-hidden="true"></span><h2 id="system-roles"> System Roles </h2>
<p>System roles must be performed by the specifically authorized contributor approved by the DAO. For security reasons, these roles cannot be delegated to others.</p>
<span class="wiki-legacy-anchor" id="Mediator" aria-hidden="true"></span><h3 id="mediator"> Mediator </h3>
<p><a href="../mediator/">Mediators</a> in Bisq 2 primarily assist users of the <a href="../bisq-easy/">Bisq Easy</a> trade protocol if they encounter issues during a trade. Mediators cannot control user funds and have no direct enforcement powers. However, if a trader is behaving poorly (e.g., attempting scams), mediators can provide information to Moderators, who may then ban users for severe or repeated violations of trade rules.</p>
<span class="wiki-legacy-anchor" id="Moderator" aria-hidden="true"></span><h3 id="moderator"> Moderator </h3>
<p>Moderators help ensure the smooth operation of the <a href="../bisq-easy/">Bisq Easy</a> trade protocol in <a href="../bisq-2/">Bisq 2</a>. Their responsibilities include:</p>
<ul>
<li>Monitoring offers to remove spam.</li>
<li>Handling reports from users or mediators regarding violations of <a href="../bisq-easy/">Bisq Easy</a> rules.</li>
<li>Investigating potential violations.</li>
<li>Banning user profile IDs found to be in violation.</li>
<li>Flagging chat messages that violate communication rules.</li>
</ul>
<p>Note: Due to <a href="../bisq-2/">Bisq 2</a>'s support for multiple identities, banning a profile ID may have limited effect, as users can potentially create new profiles.</p>
<span class="wiki-legacy-anchor" id="Security_Manager" aria-hidden="true"></span><h3 id="security-manager"> Security Manager </h3>
<p>The Security Manager role is similar to the "filter operator" role in Bisq 1. Key functions include:</p>
<ul>
<li>Publishing data to block malicious or malfunctioning roles/nodes.</li>
<li>Halting trading for specific protocols during critical security incidents.</li>
<li>Broadcasting alert messages to the network or specific users.</li>
</ul>
<p>Users retain control, as they can choose to deactivate the security manager's filtering influence or ignore alerts if they wish. Alert types include:</p>
<ul>
<li><strong>INFO:</strong> Informational popup message.</li>
<li><strong>WARN:</strong> Warning popup message.</li>
<li><strong>HALT_TRADE:</strong> Custom emergency popup message that disables trade operations for a specified protocol.</li>
<li><strong>BAN:</strong> Broadcasts data about a banned role (no text message).</li>
</ul>
<span class="wiki-legacy-anchor" id="Update_Manager" aria-hidden="true"></span><h3 id="update-manager"> Update Manager </h3>
<p>The Update Manager (or Release Manager) broadcasts notifications about new software versions to the network. Notification types include:</p>
<ul>
<li><strong>PRE_RELEASE:</strong> Notifies users about new pre-releases (users can opt-in via settings; default is off).</li>
<li><strong>RELEASE:</strong> Notifies users about a new official release.</li>
<li><strong>FORCED_UPDATE:</strong> Displays a warning popup about a mandatory update to a minimum required version. Trade operations may be halted until the user updates.</li>
</ul>
<span class="wiki-legacy-anchor" id="Delegable_Roles" aria-hidden="true"></span><h2 id="delegable-roles"> Delegable Roles </h2>
<p>Delegable roles perform tasks based on publicly available data and do not need to maintain consensus with other peers. Any user can potentially operate these roles themselves, often configured via JVM arguments.</p>
<span class="wiki-legacy-anchor" id="Seed_Node" aria-hidden="true"></span><h3 id="seed-node"> Seed Node </h3>
<p>Seed nodes serve as initial contact points for the P2P network. They provide network routing information and filtered Bitcoin blockchain data to new nodes joining the network or light clients. When a Bisq node starts, it contacts several seed nodes to sync network data. At least one hardcoded (root) seed node is necessary for bootstrapping the network.</p>
<span class="wiki-legacy-anchor" id="Oracle_Node" aria-hidden="true"></span><h3 id="oracle-node"> Oracle Node </h3>
<p><a href="../bisq-2-roles/">Oracle nodes</a> provide essential data services bridging Bisq 1 information and Bisq 2 functions. There must always be at least one operational oracle node. Services include:</p>
<span class="wiki-legacy-anchor" id="DAO_Bridge_Service" aria-hidden="true"></span><h4 id="dao-bridge-service"> DAO Bridge Service </h4>
<p>This service retrieves <a href="../introduction-to-the-dao/">DAO</a> data (like bond status and reputation events - BSQ burns/bonds) from a Bisq 1 API and broadcasts it reliably to the <a href="../bisq-2/">Bisq 2</a> network.</p>
<ul>
<li><strong>Verification:</strong> Users can independently verify the integrity of this data by querying a Bisq 1 API node themselves. If discrepancies suggesting intentionally incorrect data are found and reported, a DAO proposal can be made to confiscate the offending oracle operator's bond.</li>
</ul>
<span class="wiki-legacy-anchor" id="Reputation_Service" aria-hidden="true"></span><h4 id="reputation-service"> Reputation Service </h4>
<p>This service retrieves data relevant to reputation sources like Bisq 1 <a href="../account-limits/">account age and signed account age</a> via a Bisq 1 API and broadcasts it to the <a href="../bisq-2/">Bisq 2</a> network.</p>
<span class="wiki-legacy-anchor" id="Time-Stamping_Service" aria-hidden="true"></span><h4 id="time-stamping-service"> Time-Stamping Service </h4>
<p>This service provides timestamps used for calculating the age of <a href="../bisq-2/">Bisq 2</a> user profiles.</p>
<span class="wiki-legacy-anchor" id="Explorer_Nodes" aria-hidden="true"></span><h3 id="explorer-nodes"> Explorer Nodes </h3>
<p>Explorer nodes provide information about blockchain transaction states, used during the trade process. For example, they might inform users when a Bitcoin payment transaction receives sufficient confirmations.</p>
<span class="wiki-legacy-anchor" id="Market_Price_Node" aria-hidden="true"></span><h3 id="market-price-node"> Market Price Node </h3>
<p>Market Price Nodes supply current market price information (e.g., BTC/USD, BTC/EUR) used for setting offer prices relative to the market. Because trades rely on this data, operators of these nodes are required to be bonded.</p>
<span class="wiki-legacy-anchor" id="Becoming_a_Bonded_Role_Holder_in_Bisq_2" aria-hidden="true"></span><h2 id="becoming-a-bonded-role-holder-in-bisq-2"> Becoming a Bonded Role Holder in Bisq 2 </h2>
<p>Contributors performing bonded roles are typically established Bisq contributors who have been formally approved by the <a href="../introduction-to-the-dao/">DAO</a> through a voting process. This ensures accountability for these critical network functions.</p>
<p>The general process is:</p>
<p>1. A potential contributor creates a proposal outlining their intention and qualifications for a specific role on the <a href="https://github.com/bisq-network/proposals/issues" rel="noopener noreferrer">Bisq GitHub Proposals Repository</a>. 2. The proposal is discussed publicly within the community on the GitHub issue. 3. If there is rough consensus, the contributor then creates a formal "Bonded Role Proposal" within the Bisq (v1) application. They must have sufficient <a href="../introduction-to-the-dao/">BSQ</a> available to cover the required bond amount for the role. 4. The proposal is submitted to the <a href="../introduction-to-the-dao/">DAO</a> for stakeholder voting. 5. If the vote passes, the role proposal is approved; the contributor must also publish the required <a href="../introduction-to-the-dao/">BSQ</a> lockup transaction and complete Bisq 2 role registration. Approval, the wallet lockup and registration are distinct steps, not an automatic transfer or return of <a href="../introduction-to-the-dao/">BSQ</a> by the vote itself.</p>
<p>For more general information on contributing to Bisq, see the <a href="../contributor-checklist/">Contributor Checklist</a>. Note that not all contribution tasks require bonding, providing an easier path for new contributors to get involved and build reputation.</p>
<span class="wiki-legacy-anchor" id="BSQ_Bonding_for_Roles/Nodes" aria-hidden="true"></span><h2 id="bsq-bonding-for-roles-nodes"> BSQ Bonding for Roles/Nodes </h2>
<p>All System and Delegable roles described here require the contributor to lock a <a href="../introduction-to-the-dao/">BSQ</a> bond via a successful <a href="../introduction-to-the-dao/">DAO</a> vote.</p>
<p>The <a href="../bisq-2-roles/">oracle node</a> plays a key role in verifying that other bonded roles have a valid, active BSQ bond setup. However, the oracle cannot verify itself or the root seed node (due to a "chicken and egg" problem). These root nodes are still required to set up their own BSQ bonds independently.</p>
<p>The bonding process is transparent. Any user can manually verify the status of bonds for roles/nodes through the <a href="../introduction-to-the-dao/">DAO</a> section of the Bisq 1 application.</p>
<span class="wiki-legacy-anchor" id="Confiscation_of_BSQ_Bonds" aria-hidden="true"></span><h2 id="confiscation-of-bsq-bonds"> Confiscation of BSQ Bonds </h2>
<p>If a contributor operating a bonded role acts maliciously or harmfully, any community member can propose the confiscation of their <a href="../introduction-to-the-dao/">BSQ</a> bond.</p>
<p>The confiscation process is as follows:</p>
<p>1. A user posts a proposal on the <a href="https://github.com/bisq-network/proposals/issues" rel="noopener noreferrer">Bisq GitHub Proposals Repository</a>, detailing the harmful behavior and rationale for confiscation. 2. The proposal is discussed publicly, allowing the bondholder an opportunity to respond. 3. If rough consensus for confiscation is reached, the user requesting confiscation creates a formal "Confiscate Bond Proposal" in the Bisq 1 application. 4. The proposal is submitted to the <a href="../introduction-to-the-dao/">DAO</a> for stakeholder voting. 5. If the vote passes (meeting high thresholds detailed below), the bond is burned (destroyed), the role is unregistered, and the contributor loses their bond and ceases performing the role. If rejected, no action is taken.</p>
<p>Confiscating a bond is a significant penalty reserved for serious offenses. To prevent misuse, the <a href="../introduction-to-the-dao/">DAO</a> requires exceptionally high support for confiscation proposals:</p>
<ul>
<li>Minimum Quorum: 200,000 BSQ participating in the vote.</li>
<li>Minimum Acceptance: 85% approval (compared to &gt;50% for typical proposals).</li>
</ul>
<p>This system minimizes the risk of misbehavior in high-trust roles while providing a community-driven mechanism for accountability. For more background, see <a href="../introduction-to-the-dao/#ensure-honesty-in-high-trust-roles">Ensuring honesty in high-trust roles</a>.</p>
</div>
