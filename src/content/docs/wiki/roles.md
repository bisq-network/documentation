---
title: "Roles"
slug: "wiki/roles"
tableOfContents: false
---

<nav data-pagefind-ignore class="wiki-source-toc" aria-label="Article sections"><details><summary>On this page</summary><ul><li><a href="#background">Background</a></li><li><a href="#properties">Properties</a></li><li><a href="#duties">Duties</a></li><li><a href="#rights">Rights</a></li><li><a href="#owners">Owners</a></li><li><a href="#infrastructure">Infrastructure</a></li><li><a href="#wiki">Wiki</a></li><li><a href="#team">Team</a></li><li><a href="#issue">Issue</a></li><li><a href="#types">Types</a></li><li><a href="#maintainer">Maintainer</a></li><li><a href="#maintainer-duties">Maintainer duties</a></li><li><a href="#maintainer-rights">Maintainer rights</a></li><li><a href="#operator">Operator</a></li><li><a href="#operator-duties">Operator duties</a></li><li><a href="#operator-rights">Operator rights</a></li><li><a href="#administrator">Administrator</a></li><li><a href="#admin-duties">Admin duties</a></li><li><a href="#admin-rights">Admin rights</a></li><li><a href="#common-duties">Common duties</a></li><li><a href="#reporting">Reporting</a></li><li><a href="#bonding">Bonding</a></li><li><a href="#processes">Processes</a></li><li><a href="#proposing-a-new-role">Proposing a new role</a></li><li><a href="#adding-a-secondary-role-owner">Adding a secondary role owner</a></li><li><a href="#transferring-role-ownership">Transferring role ownership</a></li></ul></details></nav>

<div class="wiki-recovered-article" lang="en"><p><strong>Roles</strong> are the way contributors take responsibility for Bisq network resources and processes.</p>
<span class="wiki-legacy-anchor" id="Background" aria-hidden="true"></span><h2 id="background"> Background </h2>
<p>There are many resources and processes vital to the operation of the Bisq Network that require ownership by individual contributors. For example, someone must merge pull requests into the <code class="wiki-source-code" id="source-code-1">bisq</code> repository, someone must manage DNS for the <code class="wiki-source-code" id="source-code-2">bisq.network</code> domain, a group of people must maintain critical infrastructure such as seed nodes and price nodes, etc.</p>
<p>This document defines the system of roles used within the Bisq DAO to enumerate, define and track each of these responsibilities. The system is designed with two major goals in mind:</p>
<ol>
<li>To maximize role owner autonomy in order to achieve Bisq's <a href="../decentralized-autonomous-organization/">decentralization goals</a></li>
<li>To maximize transparency so that DAO stakeholders can effectively review and vote on role owner compensation requests</li>
</ol>
<span class="wiki-legacy-anchor" id="Properties" aria-hidden="true"></span><h2 id="properties"> Properties </h2>
<p>The following are properties common to all roles.</p>
<span class="wiki-legacy-anchor" id="Duties" aria-hidden="true"></span><h3 id="duties"> Duties </h3>
<p><em>Duties</em> are actions that must be performed for a certain resource or process to function normally.</p>
<p>For example, a repository maintainer’s duties include merging pull requests in a timely fashion, and a website operator’s duties include keeping the site available at all times.</p>
<span class="wiki-legacy-anchor" id="Rights" aria-hidden="true"></span><h3 id="rights"> Rights </h3>
<p><em>Rights</em> are special permissions or other access required to perform the Duties of a role.</p>
<p>For example, a repository maintainer’s rights include write permissions to their repository, and a website operator’s rights include administrative access to site hosting infrastructure.</p>
<span class="wiki-legacy-anchor" id="Owners" aria-hidden="true"></span><h3 id="owners"> Owners </h3>
<p><em>Owners</em> are contributors who have the Rights required to perform the Duties of a role.</p>
<p>One owner is designated as primary and any other owners are designated as <a href="https://github.com/bisq-network/proposals/issues/12" rel="noopener noreferrer">secondary</a>. The primary is responsible for performing the Duties of the role, while secondaries stand by, ready to take over for the primary at any time.</p>
<span class="wiki-legacy-anchor" id="Infrastructure" aria-hidden="true"></span><h2 id="infrastructure"> Infrastructure </h2>
<p>The following infrastructure is used to define and manage each role.</p>
<span class="wiki-legacy-anchor" id="Wiki" aria-hidden="true"></span><h3 id="wiki"> Wiki </h3>
<p>Each role should be documented here on <a href="https://bisq.wiki" rel="noopener noreferrer">https://bisq.wiki</a> in a document of its own, ideally linked to the larger resource or process it's related to.</p>
<p>For example, there is a <a href="../proposals/">proposals wiki article</a> covering the concept and process of proposals for users, and a <a href="../proposals-maintainer/">proposals maintainer article</a> covering the role's rights, duties, and other details.</p>
<p>Each role’s documentation should specify the role's:</p>
<ul>
<li>duties</li>
<li>rights</li>
<li>GitHub team</li>
<li>GitHub issue</li>
<li>bonding requirement (if any)</li>
</ul>
<span class="wiki-legacy-anchor" id="Team" aria-hidden="true"></span><h3 id="team"> Team </h3>
<p>Each role has a dedicated GitHub team where each of the role’s Owners are members. The team is used to manage access to GitHub repositories that the role is responsible for and to send notifications to role owners with @mentions in GitHub issues and pull requests.</p>
<p>For example, the <a href="https://github.com/orgs/bisq-network/teams/bisq-maintainers" rel="noopener noreferrer">@bisq-network/bisq-maintainers</a> team has write access to the <a href="https://github.com/bisq-network/bisq" rel="noopener noreferrer">bisq-network/bisq</a> repository.</p>
<aside class="wiki-admonition" role="note"><p><strong>Note</strong></p><p>GitHub teams are visible only to GitHub organization members. To join the <a href="https://github.com/bisq-network" rel="noopener noreferrer">@bisq-network org</a>, see the <a href="../contributor-checklist/#get-connected">contributor checklist</a>.</p>
</aside>
<p>The primary role owner is also assigned as the <em>maintainer</em> of their role’s GitHub team, such that they may manage the team without requiring the intervention of a GitHub admin.</p>
<span class="wiki-legacy-anchor" id="Issue" aria-hidden="true"></span><h3 id="issue"> Issue </h3>
<p>Each role has a dedicated GitHub issue in the <a href="https://github.com/bisq-network/roles/issues" rel="noopener noreferrer">bisq-network/roles</a> repository, wherein:</p>
<ul>
<li>The <strong>Assignees</strong> field is used to track role ownership.</li>
<li>The <strong>Description</strong> field is used to link to the role’s wiki article, team, and primary owner.</li>
<li><strong>Comments</strong> are used for reporting and feedback.</li>
</ul>
<p>See the [Compensation Maintainer <a href="https://github.com/bisq-network/roles/issues/86" rel="noopener noreferrer">https://github.com/bisq-network/roles/issues/86</a>] role issue for an example.</p>
<span class="wiki-legacy-anchor" id="Types" aria-hidden="true"></span><h2 id="types"> Types </h2>
<p>Most roles fit into one of the types below.</p>
<span class="wiki-legacy-anchor" id="Maintainer" aria-hidden="true"></span><h3 id="maintainer"> Maintainer </h3>
<p>A <em>Maintainer</em> is a contributor responsible for enforcing process in a given GitHub repository.</p>
<p>Examples: <a href="https://github.com/bisq-network/roles/issues/63" rel="noopener noreferrer">Bisq Maintainer</a>, <a href="https://github.com/bisq-network/roles/issues/30" rel="noopener noreferrer">Proposals Maintainer</a></p>
<span class="wiki-legacy-anchor" id="Maintainer_duties" aria-hidden="true"></span><h4 id="maintainer-duties"> Maintainer duties </h4>
<ul>
<li>Merging or closing pull requests after sufficient review</li>
<li>Tagging releases</li>
<li>Triaging incoming issues and keeping them organized over time</li>
</ul>
<p><strong>A maintainer is not a developer or reviewer.</strong></p>
<p>Submitting and reviewing pull requests is something any contributor can do; neither are maintainer duties per se.</p>
<p>This is particularly important from a <a href="../compensation/">compensation</a> perspective. If you are a maintainer, do NOT group your development and review activities together with your maintainer role in your compensation requests. Rather, account for them separately like any other contributor would.</p>
<p>The goal is to have as many competent contributors developing and reviewing as possible, not to load everything on the maintainer. <a href="https://rfc.unprotocols.org/spec:1/C4/#21-preliminaries" rel="noopener noreferrer">C4</a> is the inspiration here—it’s worth (re-)reading.</p>
<span class="wiki-legacy-anchor" id="Maintainer_rights" aria-hidden="true"></span><h4 id="maintainer-rights"> Maintainer rights </h4>
<ul>
<li>Write access to the repository they are responsible for</li>
</ul>
<span class="wiki-legacy-anchor" id="Operator" aria-hidden="true"></span><h3 id="operator"> Operator </h3>
<p>An <em>Operator</em> is a contributor responsible for keeping a given resource running and functioning normally.</p>
<p>Examples: <a href="https://github.com/bisq-network/roles/issues/15" rel="noopener noreferrer">Seednode Operator</a>, <a href="https://github.com/bisq-network/roles/issues/19" rel="noopener noreferrer">Forum Operator</a></p>
<span class="wiki-legacy-anchor" id="Operator_duties" aria-hidden="true"></span><h4 id="operator-duties"> Operator duties </h4>
<ul>
<li>Keep the given resource online and functioning normally</li>
<li>Keep the resource up to date with latest version</li>
<li>Maintain backups as appropriate</li>
<li>Report on any incidents</li>
</ul>
<span class="wiki-legacy-anchor" id="Operator_rights" aria-hidden="true"></span><h4 id="operator-rights"> Operator rights </h4>
<ul>
<li>Administrative access to hosting infrastructure</li>
<li>Ownership of any domain name used</li>
</ul>
<span class="wiki-legacy-anchor" id="Administrator" aria-hidden="true"></span><h3 id="administrator"> Administrator </h3>
<p>An <em>Administrator</em> (often referred to as 'Admin') is a contributor responsible for managing a given resource.</p>
<p>Examples: <a href="https://github.com/bisq-network/roles/issues/16" rel="noopener noreferrer">GitHub Admin</a></p>
<span class="wiki-legacy-anchor" id="Admin_duties" aria-hidden="true"></span><h4 id="admin-duties"> Admin duties </h4>
<ul>
<li>Respond to change requests</li>
</ul>
<span class="wiki-legacy-anchor" id="Admin_rights" aria-hidden="true"></span><h4 id="admin-rights"> Admin rights </h4>
<ul>
<li>Access to the administrative interface of the resource in question</li>
</ul>
<span class="wiki-legacy-anchor" id="Common_duties" aria-hidden="true"></span><h2 id="common-duties"> Common duties </h2>
<p>The following duties are common to all roles.</p>
<span class="wiki-legacy-anchor" id="Reporting" aria-hidden="true"></span><h3 id="reporting"> Reporting </h3>
<p>Primary role owners should report once a cycle in the form of a comment <a href="https://github.com/bisq-network/proposals/issues/13" rel="noopener noreferrer">on their issue</a>. The report should contain whatever information the role owner believes would be valuable to other users, contributors, and stakeholders.</p>
<p>The comment should be formatted in Markdown as follows:</p>
<p><code>## Cycle 21 Report</code><br>
<br>
<code>Description and/or list of contributions, accomplishments, or other notable occurrences since the last role report was posted.</code><br>
<br>
<code>/cc bisq-network/compensation#421</code></p>
<p>The <code class="wiki-source-code" id="source-code-3">/cc</code> part should reference the GitHub issue for the contributor's compensation request for the cycle corresponding to the role report.</p>
<span class="wiki-legacy-anchor" id="Bonding" aria-hidden="true"></span><h2 id="bonding"> Bonding </h2>
<p>Most roles involve special rights that, if abused, could cause damage to the Bisq Network. For this reason, <a href="../introduction-to-the-dao/#ensure-honesty-in-high-trust-roles">role owners must put up a bond in BSQ</a> <a href="https://github.com/bisq-network/bisq/blob/master/core/src/main/java/bisq/core/dao/state/model/governance/BondedRoleType.java" rel="noopener noreferrer">commensurate with the amount of damage that could be caused</a>. In the event of a role owner turning into a bad actor or being grossly negligent, this bond can be confiscated through a Bisq DAO proposal for confiscating a bond.</p>
<span class="wiki-legacy-anchor" id="Processes" aria-hidden="true"></span><h2 id="processes"> Processes </h2>
<p>The following are some common roles-related processes.</p>
<span class="wiki-legacy-anchor" id="Proposing_a_new_role" aria-hidden="true"></span><h3 id="proposing-a-new-role"> Proposing a new role </h3>
<p>Typically, proposing a new role is one part of a larger proposal to introduce some new resource or process.</p>
<ol>
<li>Discuss the idea informally with other contributors, e.g. via <a href="https://bisq.chat" rel="noopener noreferrer">Matrix</a></li>
<li>Follow the <a href="../proposals/">proposals</a> process to formally suggest the new resource or process</li>
<li>Draft documentation for the new resource or process, including an article about the new role as a wiki article</li>
</ol>
<span class="wiki-legacy-anchor" id="Adding_a_secondary_role_owner" aria-hidden="true"></span><h3 id="adding-a-secondary-role-owner"> Adding a secondary role owner </h3>
<p>A primary role owner may add a secondary owner with the following steps:</p>
<ol>
<li>Add them as a member of the role’s GitHub Team.</li>
<li>Add them as an assignee to role’s GitHub Issue.</li>
<li>Announce the change via a comment on the role’s GitHub Issue.</li>
</ol>
<span class="wiki-legacy-anchor" id="Transferring_role_ownership" aria-hidden="true"></span><h3 id="transferring-role-ownership"> Transferring role ownership </h3>
<p>A role owner may transfer ownership to another with the following steps:</p>
<ol>
<li>Get the new contributor added to the role’s GitHub team.</li>
<li>Get the old contributor removed from the role's GitHub team.</li>
<li>Have the role’s GitHub issue updated to reflect the new primary owner.</li>
<li>Announce the change in a comment on the role’s GitHub Issue.</li>
</ol>
</div>
