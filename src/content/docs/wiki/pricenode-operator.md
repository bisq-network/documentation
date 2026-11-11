---
title: "Pricenode Operator"
slug: "wiki/pricenode-operator"
tableOfContents: false
---

<nav data-pagefind-ignore class="wiki-source-toc" aria-label="Article sections"><details open><summary>On this page</summary><ul><li><a href="#issue">Issue</a></li><li><a href="#team">Team</a></li><li><a href="#duties">Duties</a></li><li><a href="#rights">Rights</a></li><li><a href="#bonding">Bonding</a></li></ul></details></nav>

<div class="wiki-recovered-article" lang="en">

A **Pricenode Operator** runs one or more [pricenode](../pricenode/) instance and keeps them updated.

<span class="wiki-legacy-anchor" id="Issue" aria-hidden="true">
</span>

## Issue {#issue}

<a href="https://github.com/bisq-network/roles/issues/14" rel="noopener noreferrer">
https://github.com/bisq-network/roles/issues/14</a>

<span class="wiki-legacy-anchor" id="Team" aria-hidden="true">
</span>

## Team {#team}

<a href="https://github.com/orgs/bisq-network/teams/pricenode-operators/members" rel="noopener noreferrer">
@bisq-network/pricenode-operators</a>

<span class="wiki-legacy-anchor" id="Duties" aria-hidden="true">
</span>

## Duties {#duties}

- Setup and maintain a suitable hosting environment for the pricenode
- Operate your pricenode using the [current pricenode documentation](https://github.com/bisq-network/bisq/tree/master/pricenode#how-to-deploy-for-production)
- Run collectd with the [current monitoring documentation](https://github.com/bisq-network/bisq/tree/master/pricenode#Monitoring) from bisq-monitoring operator
- Maintain your Tor onion hostname in the [Bisq pricenode provider repository](https://github.com/bisq-network/bisq/blob/master/core/src/main/java/bisq/core/provider/ProvidersRepository.java#L38)

<span class="wiki-legacy-anchor" id="Rights" aria-hidden="true">
</span>

## Rights {#rights}

- Claim 130 USD compensation each cycle

<span class="wiki-legacy-anchor" id="Bonding" aria-hidden="true">
</span>

## Bonding {#bonding}

Required. See [https://github.com/bisq-network/bisq/blob/42a037e/core/src/main/java/bisq/core/dao/state/model/governance/BondedRoleType.java#L59](https://github.com/bisq-network/bisq/blob/42a037e/core/src/main/java/bisq/core/dao/state/model/governance/BondedRoleType.java#L59)

</div>
