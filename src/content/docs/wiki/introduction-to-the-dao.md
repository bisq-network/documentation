---
title: "Introduction to the DAO"
slug: "wiki/introduction-to-the-dao"
tableOfContents: false
---

<nav data-pagefind-ignore class="wiki-source-toc" aria-label="Article sections"><details open><summary>On this page</summary><ul><li><a href="#introduction">Introduction</a></li><li><a href="#what-is-a-dao">What is a DAO?</a></li><li><a href="#the-bisq-dao">The Bisq DAO</a></li><li><a href="#bsq-token">BSQ token</a></li><li><a href="#overview">Overview</a></li><li><a href="#earn-and-distribute-revenue">Earn and distribute revenue</a></li><li><a href="#determine-strategy">Determine strategy</a></li><li><a href="#ensure-honesty-in-high-trust-roles">Ensure honesty in high-trust roles</a></li><li><a href="#learn-more">Learn more</a></li></ul></details></nav>

<div class="wiki-recovered-article" lang="en">

The Bisq network is governed by a **decentralized autonomous organization (DAO)** built on the Bitcoin blockchain.

<span class="wiki-legacy-anchor" id="Introduction" aria-hidden="true">
</span>

## Introduction {#introduction}

<span class="wiki-legacy-anchor" id="What_is_a_DAO?" aria-hidden="true">
</span>

### What is a DAO? {#what-is-a-dao}

Conventional entities such as for-profit and non-profit corporations must be sanctioned by the state: they are legal entities registered in particular jurisdictions. No matter how big or small or virtuous or innovative they are, they cannot operate without state approval. In return for this approval, the entity is endowed with rights (e.g., limited liability) and responsibilities (e.g., taxes).

A **decentralized autonomous organization (DAO)** is just a generic term for a governance model sanctioned by software: code defines conventions for governing the project irrespective of the stance of the state.

<aside class="wiki-admonition" role="note">

**Note**

We say a DAO’s governance model must be sanctioned by software, not necessarily controlled by software. The Bisq DAO, for example, is not controlled by software: software merely provides a framework for the people involved with the Bisq project to (collectively) manage the software itself. The Bisq DAO operates on the idea that **code is not law**. Code is written by humans to provide a service to other humans, so it should be accountable to humans too.

</aside>

The universe of DAOs is diverse. Just as companies come in many shapes and sizes, and some companies are scammy, fraudulent, or just poorly managed—that’s no reason to assume all companies are the same way. It’s the same with DAOs: some DAOs haven’t worked out so well, but others might turn out differently.

<span class="wiki-legacy-anchor" id="The_Bisq_DAO" aria-hidden="true">
</span>

## The Bisq DAO {#the-bisq-dao}

The Bisq DAO forgoes a system where governance is dictated by the rigid rules of software in favor of a self-contained economy where governance is guided by software but ultimately determined by the collective, subjective judgments of its community.

It achieves this by introducing a unit of value called the **BSQ token** that enables Bisq stakeholders—contributors, traders, or anyone who owns BSQ—to make subjective value judgments. This token underlies all actions in the DAO.

<a href="https://www.youtube.com/watch?v=pNvOZlIDYEQ&amp;feature=emb_logo" rel="noopener noreferrer">
Click here for a quick introductory video on the what &amp; why of the Bisq DAO</a>&#10;<span class="wiki-legacy-anchor" id="BSQ_token" aria-hidden="true"></span><h3 id="bsq-token"> BSQ token </h3>&#10;<span class="wiki-template-gap" role="note"><strong>[Unresolved template: BSQ_Token_Intro]</strong> <code>{{BSQ_Token_Intro}}</code></span>

<span class="wiki-legacy-anchor" id="Overview" aria-hidden="true">
</span>

### Overview {#overview}

Here’s a graphical overview of how the DAO works at a high level:

<figure class="wiki-source-image" id="source-image-1"><a href="../../media/wiki/b1906f5e8c57f45db45f25f538f261e6762283f6d7e9ab581bd34b35d2c0af89.png"><img alt="User-dao-diagram.png" decoding="async" height="1790" loading="lazy" src="../../media/wiki/b1906f5e8c57f45db45f25f538f261e6762283f6d7e9ab581bd34b35d2c0af89.png" width="3400"></a><figcaption>User-dao-diagram.png<br><small>Historical full-size recovered source. <a href="../../recovered-media/">Provenance catalogue</a>.</small></figcaption></figure>&#10;<div>&#10;</div>

Let’s observe some of the dynamics of this system:\
<br>

- Contributors *maintain* Bisq through valuable work
- Traders *use* Bisq to buy and sell bitcoin and other cryptocurrencies
- Contributors *earn* BSQ tokens when their compensation requests are approved through voting
- Traders *buy* BSQ tokens in order to pay lower trading fees
- Stakeholders *vote* on compensation requests
- Contributors can *lock* a bond in BSQ to ensure integrity in high-trust roles\
  <br>

Now let’s see how these dynamics enable the Bisq DAO to provide 3 core governance functions without any central points of authority.

<span class="wiki-legacy-anchor" id="Earn_and_distribute_revenue" aria-hidden="true">
</span>

### Earn and distribute revenue {#earn-and-distribute-revenue}

Every project needs to be financially sustainable to fund ongoing operations and development. But traditional means of handling revenue and revenue distribution are necessarily centralized—any receiving address or account must be owned by one person, or a small group; determining how much a person should be paid must be determined by one person, or a small group; etc.

**Contributors produce, creating BSQ**

In the Bisq DAO, trading fees are collected from traders and distributed to contributors, but there is no central authority to do this. Here’s how it works: after a Bisq contributor does work, they file a **compensation request** in the DAO with a description of what they did and how much BSQ they want in return. Then, stakeholders (who are other contributors, traders, and anyone else with BSQ) vote for/against the request. If the request is approved, the contributor is issued new BSQ in the amount they requested and **BSQ supply is increased**.

<aside class="wiki-admonition" role="note">

**Note**

**<big>Where does new BSQ actually come from?</big>**\
Recall that a BSQ token is merely colored bitcoin. When a contributor makes their compensation request in the DAO, they must also include the tiny amount of bitcoin to be **colored** as BSQ (the [spec](../dao-technical-overview/) requires 100 satoshis). So if a contributor requests 1,000 BSQ, they will need to include (100 \* 1,000 equals 100,000 satoshis) with their compensation request, just about 10 USD at a rate of (10,000 USD/BTC).\
\
If their request is approved, those satoshis are **colored** and recognized as 1,000 valid BSQ tokens on Bisq. Assuming a BSQ market value of 1 USD (exact value will fluctuate), the contributor will have been granted 1,000 USD worth of BSQ for a negligible cost of 10 USD.

</aside>

**Traders consume, burning BSQ**

Then, a trader looking for lower trading fees can buy those BSQ tokens from a contributor. When they buy BSQ tokens for BTC, the contributor is paid for their work, and the value transfer from producer to consumer is complete! When a trader pays trading fees with BSQ, those BSQ tokens are burned or \"decolored\" and **BSQ supply is decreased**. This process of creating and destroying BSQ tokens enables a sort of [monetary policy](https://docs.bisq.network/dao/phase-zero.html#how-bsq-decentralizes-compensation-and-enables-monetary-policy) controlled by Bisq stakeholders and traders.

In this way, there is no need for a central entity to collect and distribute revenue: the BSQ token enables a transfer of value from producer to consumer without any single entity controlling any aspect of the decision-making or distribution process. {{Admonition_Note|<big>**Note on BTC revenues**</big>\
In the past, before the Bisq DAO launch and before the integration of Bisq’s new trade protocol, trading fees were only collected in BTC and only went to arbitrators. There was no mechanism to distribute them to other contributors. The DAO solves this distribution problem with BSQ through the process outlined above.\
\
But since traders can still pay trading fees with BTC, where do those BTC fees go?\
\
BTC fees go to the [Burning Men](../burning-men/), contributors that burn BSQ to get the chance to receive platform fees.

<span class="wiki-legacy-anchor" id="Determine_strategy" aria-hidden="true">
</span>

### Determine strategy {#determine-strategy}

Another point of centralization in traditional organizations is with strategy. How can a project determine strategy without some form of designated leadership: an executive, manager, or leader to give direction and allocate resources?

The Bisq DAO beats this tradition with collective decision-making on strategy and other matters through **weighted voting** based on BSQ stake.

Here’s how it works: any stakeholder can make a proposal in the DAO. It can be anything: a change in a trading parameter, a new bonded role, or even something more generic like an adjustment of overall project strategy. Stakeholders vote on the proposal, and their voting weight is based on BSQ stake, through a combination of two metrics:\
<br>

1. amount of BSQ committed to a particular vote
2. amount of BSQ earned over time through contributions\
   <br>

Taking both metrics into account discourages deep-pocketed whales from suddenly seizing control of the project, while still valuing dedicated stakeholders with consistent contributions over time. It brings about a **strict meritocracy** in which people need to somehow buy in to the Bisq project in order to take part in its governance, and the more significant their stake, the stronger their voice.

In this way, there is no need to rely on a single leadership team for direction: the community collectively manages itself.

<span class="wiki-legacy-anchor" id="Ensure_honesty_in_high-trust_roles" aria-hidden="true">
</span>

### Ensure honesty in high-trust roles {#ensure-honesty-in-high-trust-roles}

Despite the Bisq project’s attempts to resist concentrating control as much as possible, it’s impossible to avoid in some places. Domain name owners, social account admins, mediators, various node operators: these are all roles that must exist, but necessarily retain significant control and require a high degree of trust.

Part of the benefit of a centralized team of thoroughly-vetted people reliant on a paycheck, as is the case in most companies, is that the risk of trusting people with significant responsibility is lower: they have a lot to lose if the company finds they have violated their integrity and engaged in foul play.

This dynamic can be reproduced—at least partly—in a project without a central authority through **bonding**. The concept is simple enough: create skin in the game. Require that a person interested in taking on a high-trust role post a bond that’s high enough to discourage them from engaging in foul play.

But what happens if that person goes rogue? In a project without central authority, who decides when they’ve crossed the line, and what their fate should be?

As with strategy and compensation, the community decides through voting. Anyone who suspects foul play can make a case for confiscating a bond with a new proposal, and stakeholders vote to determine an outcome.

<aside class="wiki-admonition" role="note">

**Warning**

Confiscating a bond is a harsh penalty which should not be taken lightly. Therefore, the Bisq DAO makes confiscation proposals especially hard to approve: they require a quorum of at least 200,000 BSQ and 85% acceptance to pass (instead of the typical >50%).

</aside>

In this way, the risk that people in high-trust roles misbehave is minimized, and the community has access to a responsible mechanism for handling such a scenario in cases that warrant it.

<span class="wiki-legacy-anchor" id="Learn_more" aria-hidden="true">
</span>

## Learn more {#learn-more}

For more information on how you can use the DAO to trade/contributor, how it works, its technical foundations, etc. please see the [this page](../decentralized-autonomous-organization/).

</div>
