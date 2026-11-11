---
title: "Bisq 2 Roles"
slug: "wiki/bisq-2-roles"
tableOfContents: false
---

<nav data-pagefind-ignore class="wiki-source-toc" aria-label="Article sections"><details><summary>On this page</summary><ul><li><a href="#system-roles">System Roles</a></li><li><a href="#mediator">Mediator</a></li><li><a href="#moderator">Moderator</a></li><li><a href="#security-manager">Security Manager</a></li><li><a href="#update-manager">Update Manager</a></li><li><a href="#delegable-roles">Delegable Roles</a></li><li><a href="#seed-node">Seed Node</a></li><li><a href="#oracle-node">Oracle Node</a></li><li><a href="#dao-bridge-service">DAO Bridge Service</a></li><li><a href="#reputation-service">Reputation Service</a></li><li><a href="#time-stamping-service">Time-Stamping Service</a></li><li><a href="#explorer-nodes">Explorer Nodes</a></li><li><a href="#market-price-node">Market Price Node</a></li><li><a href="#becoming-a-bonded-role-holder-in-bisq-2">Becoming a Bonded Role Holder in Bisq 2</a></li><li><a href="#bsq-bonding-for-roles-nodes">BSQ Bonding for Roles/Nodes</a></li><li><a href="#confiscation-of-bsq-bonds">Confiscation of BSQ Bonds</a></li></ul></details></nav>

<div class="wiki-recovered-article" lang="en">

In [Bisq 2](../bisq-2/), certain network functions and processes rely on contributors who take responsibility for specific **bonded roles**. These roles require locking [BSQ](../introduction-to-the-dao/) as a bond, approved by the [DAO](../introduction-to-the-dao/), ensuring accountability and security for the network\'s decentralized infrastructure.

There are two main types of bonded roles in Bisq 2: System Roles and Delegable Roles.

<span class="wiki-legacy-anchor" id="System_Roles" aria-hidden="true">
</span>

## System Roles {#system-roles}

System roles must be performed by the specifically authorized contributor approved by the DAO. For security reasons, these roles cannot be delegated to others.

<span class="wiki-legacy-anchor" id="Mediator" aria-hidden="true">
</span>

### Mediator {#mediator}

[Mediators](../mediator/) in Bisq 2 primarily assist users of the [Bisq Easy](../bisq-easy/) trade protocol if they encounter issues during a trade. Mediators cannot control user funds and have no direct enforcement powers. However, if a trader is behaving poorly (e.g., attempting scams), mediators can provide information to Moderators, who may then ban users for severe or repeated violations of trade rules.

<span class="wiki-legacy-anchor" id="Moderator" aria-hidden="true">
</span>

### Moderator {#moderator}

Moderators help ensure the smooth operation of the [Bisq Easy](../bisq-easy/) trade protocol in [Bisq 2](../bisq-2/). Their responsibilities include:

- Monitoring offers to remove spam.
- Handling reports from users or mediators regarding violations of [Bisq Easy](../bisq-easy/) rules.
- Investigating potential violations.
- Banning user profile IDs found to be in violation.
- Flagging chat messages that violate communication rules.

Note: Due to [Bisq 2](../bisq-2/)\'s support for multiple identities, banning a profile ID may have limited effect, as users can potentially create new profiles.

<span class="wiki-legacy-anchor" id="Security_Manager" aria-hidden="true">
</span>

### Security Manager {#security-manager}

The Security Manager role is similar to the \"filter operator\" role in Bisq 1. Key functions include:

- Publishing data to block malicious or malfunctioning roles/nodes.
- Halting trading for specific protocols during critical security incidents.
- Broadcasting alert messages to the network or specific users.

Users retain control, as they can choose to deactivate the security manager\'s filtering influence or ignore alerts if they wish. Alert types include:

- **INFO:** Informational popup message.
- **WARN:** Warning popup message.
- **HALT_TRADE:** Custom emergency popup message that disables trade operations for a specified protocol.
- **BAN:** Broadcasts data about a banned role (no text message).

<span class="wiki-legacy-anchor" id="Update_Manager" aria-hidden="true">
</span>

### Update Manager {#update-manager}

The Update Manager (or Release Manager) broadcasts notifications about new software versions to the network. Notification types include:

- **PRE_RELEASE:** Notifies users about new pre-releases (users can opt-in via settings; default is off).
- **RELEASE:** Notifies users about a new official release.
- **FORCED_UPDATE:** Displays a warning popup about a mandatory update to a minimum required version. Trade operations may be halted until the user updates.

<span class="wiki-legacy-anchor" id="Delegable_Roles" aria-hidden="true">
</span>

## Delegable Roles {#delegable-roles}

Delegable roles perform tasks based on publicly available data and do not need to maintain consensus with other peers. Any user can potentially operate these roles themselves, often configured via JVM arguments.

<span class="wiki-legacy-anchor" id="Seed_Node" aria-hidden="true">
</span>

### Seed Node {#seed-node}

Seed nodes serve as initial contact points for the P2P network. They provide network routing information and filtered Bitcoin blockchain data to new nodes joining the network or light clients. When a Bisq node starts, it contacts several seed nodes to sync network data. At least one hardcoded (root) seed node is necessary for bootstrapping the network.

<span class="wiki-legacy-anchor" id="Oracle_Node" aria-hidden="true">
</span>

### Oracle Node {#oracle-node}

[Oracle nodes](../bisq-2-roles/) provide essential data services bridging Bisq 1 information and Bisq 2 functions. There must always be at least one operational oracle node. Services include:

<span class="wiki-legacy-anchor" id="DAO_Bridge_Service" aria-hidden="true">
</span>

#### DAO Bridge Service {#dao-bridge-service}

This service retrieves [DAO](../introduction-to-the-dao/) data (like bond status and reputation events - BSQ burns/bonds) from a Bisq 1 API and broadcasts it reliably to the [Bisq 2](../bisq-2/) network.

- **Verification:** Users can independently verify the integrity of this data by querying a Bisq 1 API node themselves. If discrepancies suggesting intentionally incorrect data are found and reported, a DAO proposal can be made to confiscate the offending oracle operator\'s bond.

<span class="wiki-legacy-anchor" id="Reputation_Service" aria-hidden="true">
</span>

#### Reputation Service {#reputation-service}

This service retrieves data relevant to reputation sources like Bisq 1 [account age and signed account age](../account-limits/) via a Bisq 1 API and broadcasts it to the [Bisq 2](../bisq-2/) network.

<span class="wiki-legacy-anchor" id="Time-Stamping_Service" aria-hidden="true">
</span>

#### Time-Stamping Service {#time-stamping-service}

This service provides timestamps used for calculating the age of [Bisq 2](../bisq-2/) user profiles.

<span class="wiki-legacy-anchor" id="Explorer_Nodes" aria-hidden="true">
</span>

### Explorer Nodes {#explorer-nodes}

Explorer nodes provide information about blockchain transaction states, used during the trade process. For example, they might inform users when a Bitcoin payment transaction receives sufficient confirmations.

<span class="wiki-legacy-anchor" id="Market_Price_Node" aria-hidden="true">
</span>

### Market Price Node {#market-price-node}

Market Price Nodes supply current market price information (e.g., BTC/USD, BTC/EUR) used for setting offer prices relative to the market. Because trades rely on this data, operators of these nodes are required to be bonded.

<span class="wiki-legacy-anchor" id="Becoming_a_Bonded_Role_Holder_in_Bisq_2" aria-hidden="true">
</span>

## Becoming a Bonded Role Holder in Bisq 2 {#becoming-a-bonded-role-holder-in-bisq-2}

Contributors performing bonded roles are typically established Bisq contributors who have been formally approved by the [DAO](../introduction-to-the-dao/) through a voting process. This ensures accountability for these critical network functions.

The general process is:

1\. A potential contributor creates a proposal outlining their intention and qualifications for a specific role on the [Bisq GitHub Proposals Repository](https://github.com/bisq-network/proposals/issues). 2. The proposal is discussed publicly within the community on the GitHub issue. 3. If there is rough consensus, the contributor then creates a formal \"Bonded Role Proposal\" within the Bisq (v1) application. They must have sufficient [BSQ](../introduction-to-the-dao/) available to cover the required bond amount for the role. 4. The proposal is submitted to the [DAO](../introduction-to-the-dao/) for stakeholder voting. 5. If the vote passes, the specified [BSQ](../introduction-to-the-dao/) bond is automatically locked, the contributor\'s role is registered, and they can begin performing their duties. If rejected, the [BSQ](../introduction-to-the-dao/) is returned.

For more general information on contributing to Bisq, see the [Contributor Checklist](../contributor-checklist/). Note that not all contribution tasks require bonding, providing an easier path for new contributors to get involved and build reputation.

<span class="wiki-legacy-anchor" id="BSQ_Bonding_for_Roles/Nodes" aria-hidden="true">
</span>

## BSQ Bonding for Roles/Nodes {#bsq-bonding-for-roles-nodes}

All System and Delegable roles described here require the contributor to lock a [BSQ](../introduction-to-the-dao/) bond via a successful [DAO](../introduction-to-the-dao/) vote.

The [oracle node](../bisq-2-roles/) plays a key role in verifying that other bonded roles have a valid, active BSQ bond setup. However, the oracle cannot verify itself or the root seed node (due to a \"chicken and egg\" problem). These root nodes are still required to set up their own BSQ bonds independently.

The bonding process is transparent. Any user can manually verify the status of bonds for roles/nodes through the [DAO](../introduction-to-the-dao/) section of the Bisq 1 application.

<span class="wiki-legacy-anchor" id="Confiscation_of_BSQ_Bonds" aria-hidden="true">
</span>

## Confiscation of BSQ Bonds {#confiscation-of-bsq-bonds}

If a contributor operating a bonded role acts maliciously or harmfully, any community member can propose the confiscation of their [BSQ](../introduction-to-the-dao/) bond.

The confiscation process is as follows:

1\. A user posts a proposal on the [Bisq GitHub Proposals Repository](https://github.com/bisq-network/proposals/issues), detailing the harmful behavior and rationale for confiscation. 2. The proposal is discussed publicly, allowing the bondholder an opportunity to respond. 3. If rough consensus for confiscation is reached, the user requesting confiscation creates a formal \"Confiscate Bond Proposal\" in the Bisq 1 application. 4. The proposal is submitted to the [DAO](../introduction-to-the-dao/) for stakeholder voting. 5. If the vote passes (meeting high thresholds detailed below), the bond is burned (destroyed), the role is unregistered, and the contributor loses their bond and ceases performing the role. If rejected, no action is taken.

Confiscating a bond is a significant penalty reserved for serious offenses. To prevent misuse, the [DAO](../introduction-to-the-dao/) requires exceptionally high support for confiscation proposals:

- Minimum Quorum: 200,000 BSQ participating in the vote.
- Minimum Acceptance: 85% approval (compared to >50% for typical proposals).

This system minimizes the risk of misbehavior in high-trust roles while providing a community-driven mechanism for accountability. For more background, see [Ensuring honesty in high-trust roles](../introduction-to-the-dao/#ensure-honesty-in-high-trust-roles).

</div>
