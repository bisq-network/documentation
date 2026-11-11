---
title: "Roles"
slug: "wiki/roles"
tableOfContents: false
---

<nav data-pagefind-ignore class="wiki-source-toc" aria-label="Article sections"><details><summary>On this page</summary><ul><li><a href="#background">Background</a></li><li><a href="#properties">Properties</a></li><li><a href="#duties">Duties</a></li><li><a href="#rights">Rights</a></li><li><a href="#owners">Owners</a></li><li><a href="#infrastructure">Infrastructure</a></li><li><a href="#wiki">Wiki</a></li><li><a href="#team">Team</a></li><li><a href="#issue">Issue</a></li><li><a href="#types">Types</a></li><li><a href="#maintainer">Maintainer</a></li><li><a href="#maintainer-duties">Maintainer duties</a></li><li><a href="#maintainer-rights">Maintainer rights</a></li><li><a href="#operator">Operator</a></li><li><a href="#operator-duties">Operator duties</a></li><li><a href="#operator-rights">Operator rights</a></li><li><a href="#administrator">Administrator</a></li><li><a href="#admin-duties">Admin duties</a></li><li><a href="#admin-rights">Admin rights</a></li><li><a href="#common-duties">Common duties</a></li><li><a href="#reporting">Reporting</a></li><li><a href="#bonding">Bonding</a></li><li><a href="#processes">Processes</a></li><li><a href="#proposing-a-new-role">Proposing a new role</a></li><li><a href="#adding-a-secondary-role-owner">Adding a secondary role owner</a></li><li><a href="#transferring-role-ownership">Transferring role ownership</a></li></ul></details></nav>

<div class="wiki-recovered-article" lang="en">

**Roles** are the way contributors take responsibility for Bisq network resources and processes.

<span class="wiki-legacy-anchor" id="Background" aria-hidden="true">
</span>

## Background {#background}

There are many resources and processes vital to the operation of the Bisq Network that require ownership by individual contributors. For example, someone must merge pull requests into the <code class="wiki-source-code" id="source-code-1">bisq</code> repository, someone must manage DNS for the <code class="wiki-source-code" id="source-code-2">bisq.network</code> domain, a group of people must maintain critical infrastructure such as seed nodes and price nodes, etc.

This document defines the system of roles used within the Bisq DAO to enumerate, define and track each of these responsibilities. The system is designed with two major goals in mind:

1. To maximize role owner autonomy in order to achieve Bisq\'s [decentralization goals](../decentralized-autonomous-organization/)
2. To maximize transparency so that DAO stakeholders can effectively review and vote on role owner compensation requests

<span class="wiki-legacy-anchor" id="Properties" aria-hidden="true">
</span>

## Properties {#properties}

The following are properties common to all roles.

<span class="wiki-legacy-anchor" id="Duties" aria-hidden="true">
</span>

### Duties {#duties}

*Duties* are actions that must be performed for a certain resource or process to function normally.

For example, a repository maintainer’s duties include merging pull requests in a timely fashion, and a website operator’s duties include keeping the site available at all times.

<span class="wiki-legacy-anchor" id="Rights" aria-hidden="true">
</span>

### Rights {#rights}

*Rights* are special permissions or other access required to perform the Duties of a role.

For example, a repository maintainer’s rights include write permissions to their repository, and a website operator’s rights include administrative access to site hosting infrastructure.

<span class="wiki-legacy-anchor" id="Owners" aria-hidden="true">
</span>

### Owners {#owners}

*Owners* are contributors who have the Rights required to perform the Duties of a role.

One owner is designated as primary and any other owners are designated as [secondary](https://github.com/bisq-network/proposals/issues/12). The primary is responsible for performing the Duties of the role, while secondaries stand by, ready to take over for the primary at any time.

<span class="wiki-legacy-anchor" id="Infrastructure" aria-hidden="true">
</span>

## Infrastructure {#infrastructure}

The following infrastructure is used to define and manage each role.

<span class="wiki-legacy-anchor" id="Wiki" aria-hidden="true">
</span>

### Wiki {#wiki}

Each role should be documented here on [https://bisq.wiki](https://bisq.wiki) in a document of its own, ideally linked to the larger resource or process it\'s related to.

For example, there is a [proposals wiki article](../proposals/) covering the concept and process of proposals for users, and a [proposals maintainer article](../proposals-maintainer/) covering the role\'s rights, duties, and other details.

Each role’s documentation should specify the role\'s:

- duties
- rights
- GitHub team
- GitHub issue
- bonding requirement (if any)

<span class="wiki-legacy-anchor" id="Team" aria-hidden="true">
</span>

### Team {#team}

Each role has a dedicated GitHub team where each of the role’s Owners are members. The team is used to manage access to GitHub repositories that the role is responsible for and to send notifications to role owners with @mentions in GitHub issues and pull requests.

For example, the [@bisq-network/bisq-maintainers](https://github.com/orgs/bisq-network/teams/bisq-maintainers) team has write access to the [bisq-network/bisq](https://github.com/bisq-network/bisq) repository.

<aside class="wiki-admonition" role="note">

**Note**

GitHub teams are visible only to GitHub organization members. To join the [@bisq-network org](https://github.com/bisq-network), see the [contributor checklist](../contributor-checklist/#get-connected).

</aside>

The primary role owner is also assigned as the *maintainer* of their role’s GitHub team, such that they may manage the team without requiring the intervention of a GitHub admin.

<span class="wiki-legacy-anchor" id="Issue" aria-hidden="true">
</span>

### Issue {#issue}

Each role has a dedicated GitHub issue in the [bisq-network/roles](https://github.com/bisq-network/roles/issues) repository, wherein:

- The **Assignees** field is used to track role ownership.
- The **Description** field is used to link to the role’s wiki article, team, and primary owner.
- **Comments** are used for reporting and feedback.

See the \[Compensation Maintainer [https://github.com/bisq-network/roles/issues/86](https://github.com/bisq-network/roles/issues/86)\] role issue for an example.

<span class="wiki-legacy-anchor" id="Types" aria-hidden="true">
</span>

## Types {#types}

Most roles fit into one of the types below.

<span class="wiki-legacy-anchor" id="Maintainer" aria-hidden="true">
</span>

### Maintainer {#maintainer}

A *Maintainer* is a contributor responsible for enforcing process in a given GitHub repository.

Examples: [Bisq Maintainer](https://github.com/bisq-network/roles/issues/63), [Proposals Maintainer](https://github.com/bisq-network/roles/issues/30)

<span class="wiki-legacy-anchor" id="Maintainer_duties" aria-hidden="true">
</span>

#### Maintainer duties {#maintainer-duties}

- Merging or closing pull requests after sufficient review
- Tagging releases
- Triaging incoming issues and keeping them organized over time

**A maintainer is not a developer or reviewer.**

Submitting and reviewing pull requests is something any contributor can do; neither are maintainer duties per se.

This is particularly important from a [compensation](../compensation/) perspective. If you are a maintainer, do NOT group your development and review activities together with your maintainer role in your compensation requests. Rather, account for them separately like any other contributor would.

The goal is to have as many competent contributors developing and reviewing as possible, not to load everything on the maintainer. [C4](https://rfc.unprotocols.org/spec:1/C4/#21-preliminaries) is the inspiration here—it’s worth (re-)reading.

<span class="wiki-legacy-anchor" id="Maintainer_rights" aria-hidden="true">
</span>

#### Maintainer rights {#maintainer-rights}

- Write access to the repository they are responsible for

<span class="wiki-legacy-anchor" id="Operator" aria-hidden="true">
</span>

### Operator {#operator}

An *Operator* is a contributor responsible for keeping a given resource running and functioning normally.

Examples: [Seednode Operator](https://github.com/bisq-network/roles/issues/15), [Forum Operator](https://github.com/bisq-network/roles/issues/19)

<span class="wiki-legacy-anchor" id="Operator_duties" aria-hidden="true">
</span>

#### Operator duties {#operator-duties}

- Keep the given resource online and functioning normally
- Keep the resource up to date with latest version
- Maintain backups as appropriate
- Report on any incidents

<span class="wiki-legacy-anchor" id="Operator_rights" aria-hidden="true">
</span>

#### Operator rights {#operator-rights}

- Administrative access to hosting infrastructure
- Ownership of any domain name used

<span class="wiki-legacy-anchor" id="Administrator" aria-hidden="true">
</span>

### Administrator {#administrator}

An *Administrator* (often referred to as \'Admin\') is a contributor responsible for managing a given resource.

Examples: [GitHub Admin](https://github.com/bisq-network/roles/issues/16)

<span class="wiki-legacy-anchor" id="Admin_duties" aria-hidden="true">
</span>

#### Admin duties {#admin-duties}

- Respond to change requests

<span class="wiki-legacy-anchor" id="Admin_rights" aria-hidden="true">
</span>

#### Admin rights {#admin-rights}

- Access to the administrative interface of the resource in question

<span class="wiki-legacy-anchor" id="Common_duties" aria-hidden="true">
</span>

## Common duties {#common-duties}

The following duties are common to all roles.

<span class="wiki-legacy-anchor" id="Reporting" aria-hidden="true">
</span>

### Reporting {#reporting}

Primary role owners should report once a cycle in the form of a comment [on their issue](https://github.com/bisq-network/proposals/issues/13). The report should contain whatever information the role owner believes would be valuable to other users, contributors, and stakeholders.

The comment should be formatted in Markdown as follows:

`## Cycle 21 Report`\
\
`Description and/or list of contributions, accomplishments, or other notable occurrences since the last role report was posted.`\
\
`/cc bisq-network/compensation#421`

The <code class="wiki-source-code" id="source-code-3">/cc</code> part should reference the GitHub issue for the contributor\'s compensation request for the cycle corresponding to the role report.

<span class="wiki-legacy-anchor" id="Bonding" aria-hidden="true">
</span>

## Bonding {#bonding}

Most roles involve special rights that, if abused, could cause damage to the Bisq Network. For this reason, [role owners must put up a bond in BSQ](../introduction-to-the-dao/#ensure-honesty-in-high-trust-roles) [commensurate with the amount of damage that could be caused](https://github.com/bisq-network/bisq/blob/master/core/src/main/java/bisq/core/dao/state/model/governance/BondedRoleType.java). In the event of a role owner turning into a bad actor or being grossly negligent, this bond can be confiscated through a Bisq DAO proposal for confiscating a bond.

<span class="wiki-legacy-anchor" id="Processes" aria-hidden="true">
</span>

## Processes {#processes}

The following are some common roles-related processes.

<span class="wiki-legacy-anchor" id="Proposing_a_new_role" aria-hidden="true">
</span>

### Proposing a new role {#proposing-a-new-role}

Typically, proposing a new role is one part of a larger proposal to introduce some new resource or process.

1. Discuss the idea informally with other contributors, e.g. via [Matrix](https://bisq.chat)
2. Follow the [proposals](../proposals/) process to formally suggest the new resource or process
3. Draft documentation for the new resource or process, including an article about the new role as a wiki article

<span class="wiki-legacy-anchor" id="Adding_a_secondary_role_owner" aria-hidden="true">
</span>

### Adding a secondary role owner {#adding-a-secondary-role-owner}

A primary role owner may add a secondary owner with the following steps:

1. Add them as a member of the role’s GitHub Team.
2. Add them as an assignee to role’s GitHub Issue.
3. Announce the change via a comment on the role’s GitHub Issue.

<span class="wiki-legacy-anchor" id="Transferring_role_ownership" aria-hidden="true">
</span>

### Transferring role ownership {#transferring-role-ownership}

A role owner may transfer ownership to another with the following steps:

1. Get the new contributor added to the role’s GitHub team.
2. Get the old contributor removed from the role\'s GitHub team.
3. Have the role’s GitHub issue updated to reflect the new primary owner.
4. Announce the change in a comment on the role’s GitHub Issue.

</div>
