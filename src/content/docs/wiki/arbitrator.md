---
title: "Arbitrator"
slug: "wiki/arbitrator"
tableOfContents: false
---

<nav data-pagefind-ignore class="wiki-source-toc" aria-label="Article sections"><details open><summary>On this page</summary><ul><li><a href="#role-notes">Role Notes</a></li><li><a href="#arbitrator-s-role-in-dispute-resolution">Arbitrator&#x27;s Role in Dispute Resolution</a></li><li><a href="#arbitrator-versus-legacy-arbitrator">Arbitrator versus Legacy Arbitrator</a></li><li><a href="#issue">Issue</a></li><li><a href="#team">Team</a></li><li><a href="#duties">Duties</a></li><li><a href="#rights">Rights</a></li><li><a href="#bonding">Bonding</a></li><li><a href="#finding-your-arbitrator">Finding your arbitrator</a></li></ul></details></nav>

<div class="wiki-recovered-article" lang="en">

An **arbitrator** resolves disputes that could not be resolved by traders on their own or with a [mediator](../mediator/)\'s help.

<p>Arbitrators investigate disputes, just like mediators. But unlike mediators, whose suggestions encourage traders to make payouts from their own escrowed funds, an arbitrator's findings determine proposed refund amounts; a refund agent may advance a separate payment, but it is not guaranteed.</p>
<span class="wiki-template-gap" role="note"><strong>[Unresolved template: ArbitrationCompensationTable]</strong> <code>{{ArbitrationCompensationTable}}</code></span>

<span class="wiki-legacy-anchor" id="Role_Notes" aria-hidden="true">
</span>

## Role Notes {#role-notes}

<span class="wiki-legacy-anchor" id="Arbitrator&#x27;s_Role_in_Dispute_Resolution" aria-hidden="true">
</span>

### Arbitrator\'s Role in Dispute Resolution {#arbitrator-s-role-in-dispute-resolution}

A refund agent may make BTC payouts to aggrieved traders out of their own pocket and then request reimbursement from the Bisq DAO (hence the term *refund agent* used sometimes). But this arrangement is intended as a convenience so that traders can avoid making a reimbursement request to the DAO on their own.

The arbitrator role is one element of Bisq\'s decentralized dispute resolution process. Please see more details at [arbitration](../arbitration/).

<span class="wiki-legacy-anchor" id="Arbitrator_versus_Legacy_Arbitrator" aria-hidden="true">
</span>

### Arbitrator versus Legacy Arbitrator {#arbitrator-versus-legacy-arbitrator}

Although arbitrators have been a component of dispute resolution on Bisq since its early days, the v1.2 update wholly changed the nature of the role.

Before the update, trade funds were secured in a 2-of-3 multisig escrow, in which arbitrators held the third key. They would evaluate disputes and then sign funds to traders as they saw fit. Since these arbitrators (which we now refer to as *legacy arbitrators*) had some element of control over users\' funds, those who filled the role had to be *very* highly trusted.

The v1.2 update enabled trade funds to be secured in a 2-of-2 multisig escrow, in which arbitrators have **no involvement**. Mediators handle most disputes, but if an arbitrator does get involved, payouts either come from the arbitrator\'s own pocket or from the Bisq DAO. Arbitrators are still trusted to conduct their role with integrity and consistency, but this is a wholly different kind of trust, one that is unrelated to the handling of users\' funds, and thus one that doesn\'t even require a bond.

<span class="wiki-legacy-anchor" id="Issue" aria-hidden="true">
</span>

## Issue {#issue}

<a href="https://github.com/bisq-network/roles/issues/93" rel="noopener noreferrer">
https://github.com/bisq-network/roles/issues/93</a>

<span class="wiki-legacy-anchor" id="Team" aria-hidden="true">
</span>

## Team {#team}

<a href="https://github.com/orgs/bisq-network/teams/refund-agents" rel="noopener noreferrer">
@bisq-network/refund-agents</a>

<span class="wiki-legacy-anchor" id="Duties" aria-hidden="true">
</span>

## Duties {#duties}

- Investigate trader disputes and determine how payout should be made (must respond to traders within 5 days)
- Do payouts to traders as appropriate with BTC
- Request BSQ reimbursement from the Bisq DAO

<span class="wiki-legacy-anchor" id="Rights" aria-hidden="true">
</span>

## Rights {#rights}

- Write access to the <code class="wiki-source-code" id="source-code-1">Support - Private</code> Matrix room

<span class="wiki-legacy-anchor" id="Bonding" aria-hidden="true">
</span>

## Bonding {#bonding}

Not required.

<span class="wiki-legacy-anchor" id="Finding_your_arbitrator" aria-hidden="true">
</span>

## Finding your arbitrator {#finding-your-arbitrator}

To find your arbitrator see [here](../finding-your-arbitrator/).

</div>
