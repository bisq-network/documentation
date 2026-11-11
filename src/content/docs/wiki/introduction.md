---
title: "Introduction"
slug: "wiki/introduction"
tableOfContents: false
---

<nav data-pagefind-ignore class="wiki-source-toc" aria-label="Article sections"><details open><summary>On this page</summary><ul><li><a href="#why-bisq-exists">Why Bisq exists</a></li><li><a href="#how-bisq-works">How Bisq works</a></li><li><a href="#in-a-nutshell-v1-trade-example">In a nutshell (v1 Trade Example)</a></li><li><a href="#how-trading-with-bisq-is-different">How trading with Bisq is different</a></li><li><a href="#how-bisq-keeps-funds-secure">How Bisq keeps funds secure</a></li><li><a href="#how-bisq-keeps-data-private">How Bisq keeps data private</a></li><li><a href="#how-bisq-resists-censorship">How Bisq resists censorship</a></li></ul></details></nav>

<div class="wiki-recovered-article" lang="en">

Bisq is a decentralized bitcoin exchange network best understood through its major components:

1. Bisq is primarily a cross-platform **desktop application** (currently [Bisq 2](../bisq-2/)) that allows anyone to buy and sell bitcoin for national currencies or other cryptocurrencies, supporting multiple trading protocols.
2. Bisq provides **trading protocols** (like the classic v1 protocol and [Bisq Easy](../bisq-easy/)) that enable individuals to exchange directly with one another over the internet, eliminating the need for trusted third-party exchange services.
3. Bisq operates on a **<span class="wiki-link-gap">peer-to-peer network <small>[unrecovered article: P2P Network]</small></span>** formed by Bisq applications discovering, connecting to, and working with one another. The Bisq network is fully peer-to-peer, requires no centrally-controlled servers, and has no single points of failure.

Bisq is not a company—it is **free/libre software** released under version 3 of the GNU Affero General Public License (AGPLv3). Bisq is built by individuals around the world who choose to work together, organized as a [decentralized autonomous organization](../decentralized-autonomous-organization/) (DAO). It is used by individuals globally who prefer trading directly with peers instead of using centralized bitcoin exchanges.

<span class="wiki-legacy-anchor" id="Why_Bisq_exists" aria-hidden="true">
</span>

## Why Bisq exists {#why-bisq-exists}

Bisq’s mission is to provide a **secure**, **private**, and **censorship-resistant** way of exchanging bitcoin for national currencies or other cryptocurrencies over the internet.

- When we say **secure**, we are referring to the safety of users\' funds. Centralized exchanges often require users to deposit funds onto exchange servers, creating large targets for hackers and thieves. Bisq avoids this custodial risk.
- When we say **private**, we are referring to users\' ability to control their own information. Most centralized exchanges require extensive personal identification (KYC) to open an account, linking trading activity to real-world identities and creating risks of data leaks or misuse. Bisq requires no registration or KYC.
- When we say **censorship-resistant**, we are referring to the freedom to trade voluntarily without third-party interference. Centralized exchanges operate within specific legal jurisdictions and can be shut down or forced to comply with regulations that restrict trading or mandate surveillance. Bisq\'s decentralized nature resists such external control.

Bisq was built to fulfill this mission: providing an exchange mechanism where users keep control of their funds, privacy is the default, and the freedom to transact is defended.

<aside class="wiki-admonition" role="note">

**Note**

If Bitcoin’s motto is \"be your own bank,\" Bisq’s motto is \"be your own exchange.\"

</aside>

<span class="wiki-legacy-anchor" id="How_Bisq_works" aria-hidden="true">
</span>

## How Bisq works {#how-bisq-works}

<span class="wiki-legacy-anchor" id="In_a_nutshell_(v1_Trade_Example)" aria-hidden="true">
</span>

### In a nutshell (v1 Trade Example) {#in-a-nutshell-v1-trade-example}

Imagine you want to buy bitcoin (BTC) in exchange for Euros (EUR). Using Bisq\'s classic [v1](../bisq-1/) trading protocol (which involves security deposits), you are a *buyer* of BTC looking for a *seller* of BTC who accepts EUR.

The basic steps would be:

1. You download, install, and run the [Bisq 1](../bisq-1/) desktop application.
2. You add your EUR payment method details (e.g., [SEPA](../sepa-p551/) bank account) to your Bisq client.
3. You browse Bisq’s offer book for existing offers to sell BTC for EUR.
4. You take an existing offer, agreeing to the seller\'s price and terms. This initiates the trade process, including locking BTC from both parties into escrow.
5. You send the EUR payment using your chosen method (outside of Bisq) and confirm \"Payment sent\" in the Bisq application.
6. You and the seller wait for the EUR payment to arrive in the seller\'s account.
7. The seller receives the EUR payment and confirms receipt in Bisq.
8. The trade completes, and the bitcoin (trade amount + your security deposit) is released to your Bisq wallet. The seller also receives their security deposit back.

<aside class="wiki-admonition" role="note">

**Note**

This example describes the classic Bisq v1 trading protocol. Other protocols available in [Bisq 2](../bisq-2/), like [Bisq Easy](../bisq-easy/), may have different flows (e.g., no [security deposit](../security-deposit/), reliance on seller [reputation](../reputation/)).

</aside>

For complete setup instructions, see the [Getting Started](https://bisq.network/getting-started/) guide.

The exact steps can vary depending on whether you buy or sell, act as the offer [maker](../how-to-be-a-market-maker-on-bisq/) or taker, and the specific payment methods involved. Regardless of the protocol, the process differs significantly from centralized exchanges.

<span class="wiki-legacy-anchor" id="How_trading_with_Bisq_is_different" aria-hidden="true">
</span>

### How trading with Bisq is different {#how-trading-with-bisq-is-different}

Key characteristics distinguish Bisq trading:

- **Desktop Application:** Bisq runs locally on your computer, not in a web browser.
- **Manual Offer Taking:** There is no automatic order matching. Users manually browse the offer book and choose specific offers from peers. This enables direct P2P settlement and user control over counterparties.
- **Out-of-Band Fiat Payments:** Bisq orchestrates, but does not directly process, fiat (or altcoin) payments. These transfers happen directly between users via their chosen payment methods outside the Bisq application itself.

These differences lead to a fundamental trade-off: Bisq trades may take longer to settle than on centralized platforms, but they offer significantly enhanced security, privacy, and censorship resistance.

<span class="wiki-legacy-anchor" id="How_Bisq_keeps_funds_secure" aria-hidden="true">
</span>

### How Bisq keeps funds secure {#how-bisq-keeps-funds-secure}

Mechanisms vary by protocol, but core principles include:

- **Non-Custodial:** Users always retain control of their fiat and cryptocurrency funds. Bisq never holds user funds.
- **Incentives/Collateral:** Trading protocols use mechanisms to ensure fair play. The classic [v1](../bisq-1/) protocol uses [security deposits](../security-deposit/) locked from both buyer and seller alongside the trade amount in a **2-of-2 multisig escrow**. Other protocols like [Bisq Easy](../bisq-easy/) rely on [seller reputation](../reputation/).
- **Dispute Resolution:** If issues arise, a decentralized human [dispute resolution](../dispute-resolution-in-bisq-1/) system (including trader chat, mediation, and potentially arbitration) is available.

<span class="wiki-legacy-anchor" id="How_Bisq_keeps_data_private" aria-hidden="true">
</span>

### How Bisq keeps data private {#how-bisq-keeps-data-private}

- **No Registration/KYC:** Using Bisq requires no identity verification or account registration with a central entity.
- **Tor Network:** All peer-to-peer network communication runs over the <span class="wiki-link-gap">Tor <small>[unrecovered article: Tor]</small></span> network by default, masking IP addresses.
- **No Central Servers:** Bisq has no central databases storing user or trade data.
- **Encrypted Communication:** Trade details are end-to-end encrypted between the trading counterparties.

<span class="wiki-legacy-anchor" id="How_Bisq_resists_censorship" aria-hidden="true">
</span>

### How Bisq resists censorship {#how-bisq-resists-censorship}

- **Distributed P2P Network:** The network consists of users running the software globally, making it difficult for any single entity to shut down.
- **Built on Tor:** Inherits <span class="wiki-link-gap">Tor <small>[unrecovered article: Tor]</small></span>\'s own censorship resistance properties.
- **Code, Not a Company:** Bisq is open-source software developed by a DAO, not a legal corporate entity that can be easily targeted or shut down by regulators.

</div>
