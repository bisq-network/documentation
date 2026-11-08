---
title: "Introduction"
slug: "wiki/introduction"
tableOfContents: false
---

<nav data-pagefind-ignore class="wiki-source-toc" aria-label="Article sections"><details open><summary>On this page</summary><ul><li><a href="#why-bisq-exists">Why Bisq exists</a></li><li><a href="#how-bisq-works">How Bisq works</a></li><li><a href="#in-a-nutshell-v1-trade-example">In a nutshell (v1 Trade Example)</a></li><li><a href="#how-trading-with-bisq-is-different">How trading with Bisq is different</a></li><li><a href="#how-bisq-keeps-funds-secure">How Bisq keeps funds secure</a></li><li><a href="#how-bisq-keeps-data-private">How Bisq keeps data private</a></li><li><a href="#how-bisq-resists-censorship">How Bisq resists censorship</a></li></ul></details></nav>

<div class="wiki-recovered-article" lang="en"><p>Bisq is a decentralized bitcoin exchange network best understood through its major components:</p>
<ol>
<li>Bisq is primarily a cross-platform <strong>desktop application</strong> (currently <a href="../bisq-2/">Bisq 2</a>) that allows anyone to buy and sell bitcoin for national currencies or other cryptocurrencies, supporting multiple trading protocols.</li>
<li>Bisq provides <strong>trading protocols</strong> (like the classic v1 protocol and <a href="../bisq-easy/">Bisq Easy</a>) that enable individuals to exchange directly with one another over the internet, eliminating the need for trusted third-party exchange services.</li>
<li>Bisq operates on a <strong><span class="wiki-link-gap">peer-to-peer network <small>[unrecovered article: P2P Network]</small></span></strong> formed by Bisq applications discovering, connecting to, and working with one another. The Bisq network is fully peer-to-peer, requires no centrally-controlled servers, and has no single points of failure.</li>
</ol>
<p>Bisq is not a company—it is <strong>free/libre software</strong> released under version 3 of the GNU Affero General Public License (AGPLv3). Bisq is built by individuals around the world who choose to work together, organized as a <a href="../decentralized-autonomous-organization/">decentralized autonomous organization</a> (DAO). It is used by individuals globally who prefer trading directly with peers instead of using centralized bitcoin exchanges.</p>
<span class="wiki-legacy-anchor" id="Why_Bisq_exists" aria-hidden="true"></span><h2 id="why-bisq-exists"> Why Bisq exists </h2>
<p>Bisq’s mission is to provide a <strong>secure</strong>, <strong>private</strong>, and <strong>censorship-resistant</strong> way of exchanging bitcoin for national currencies or other cryptocurrencies over the internet.</p>
<ul>
<li>When we say <strong>secure</strong>, we are referring to the safety of users' funds. Centralized exchanges often require users to deposit funds onto exchange servers, creating large targets for hackers and thieves. Bisq avoids this custodial risk.</li>
<li>When we say <strong>private</strong>, we are referring to users' ability to control their own information. Most centralized exchanges require extensive personal identification (KYC) to open an account, linking trading activity to real-world identities and creating risks of data leaks or misuse. Bisq requires no registration or KYC.</li>
<li>When we say <strong>censorship-resistant</strong>, we are referring to the freedom to trade voluntarily without third-party interference. Centralized exchanges operate within specific legal jurisdictions and can be shut down or forced to comply with regulations that restrict trading or mandate surveillance. Bisq's decentralized nature resists such external control.</li>
</ul>
<p>Bisq was built to fulfill this mission: providing an exchange mechanism where users keep control of their funds, privacy is the default, and the freedom to transact is defended.</p>
<aside class="wiki-admonition" role="note"><p><strong>Note</strong></p><p>If Bitcoin’s motto is "be your own bank," Bisq’s motto is "be your own exchange."</p>
</aside>
<span class="wiki-legacy-anchor" id="How_Bisq_works" aria-hidden="true"></span><h2 id="how-bisq-works"> How Bisq works </h2>
<span class="wiki-legacy-anchor" id="In_a_nutshell_(v1_Trade_Example)" aria-hidden="true"></span><h3 id="in-a-nutshell-v1-trade-example"> In a nutshell (v1 Trade Example) </h3>
<p>Imagine you want to buy bitcoin (BTC) in exchange for Euros (EUR). Using Bisq's classic <a href="../bisq-1/">v1</a> trading protocol (which involves security deposits), you are a <em>buyer</em> of BTC looking for a <em>seller</em> of BTC who accepts EUR.</p>
<p>The basic steps would be:</p>
<ol>
<li>You download, install, and run the <a href="../bisq-1/">Bisq 1</a> desktop application.</li>
<li>You add your EUR payment method details (e.g., <a href="../sepa-p551/">SEPA</a> bank account) to your Bisq client.</li>
<li>You browse Bisq’s offer book for existing offers to sell BTC for EUR.</li>
<li>You take an existing offer, agreeing to the seller's price and terms. This initiates the trade process, including locking BTC from both parties into escrow.</li>
<li>You send the EUR payment using your chosen method (outside of Bisq) and confirm "Payment sent" in the Bisq application.</li>
<li>You and the seller wait for the EUR payment to arrive in the seller's account.</li>
<li>The seller receives the EUR payment and confirms receipt in Bisq.</li>
<li>The trade completes, and the bitcoin (trade amount + your security deposit) is released to your Bisq wallet. The seller also receives their security deposit back.</li>
</ol>
<aside class="wiki-admonition" role="note"><p><strong>Note</strong></p><p>This example describes the classic Bisq v1 trading protocol. Other protocols available in <a href="../bisq-2/">Bisq 2</a>, like <a href="../bisq-easy/">Bisq Easy</a>, may have different flows (e.g., no <a href="../security-deposit/">security deposit</a>, reliance on seller <a href="../reputation/">reputation</a>).</p>
</aside>
<p>For complete setup instructions, see the <a href="https://bisq.network/getting-started/" rel="noopener noreferrer">Getting Started</a> guide.</p>
<p>The exact steps can vary depending on whether you buy or sell, act as the offer <a href="../how-to-be-a-market-maker-on-bisq/">maker</a> or taker, and the specific payment methods involved. Regardless of the protocol, the process differs significantly from centralized exchanges.</p>
<span class="wiki-legacy-anchor" id="How_trading_with_Bisq_is_different" aria-hidden="true"></span><h3 id="how-trading-with-bisq-is-different"> How trading with Bisq is different </h3>
<p>Key characteristics distinguish Bisq trading:</p>
<ul>
<li><strong>Desktop Application:</strong> Bisq runs locally on your computer, not in a web browser.</li>
<li><strong>Manual Offer Taking:</strong> There is no automatic order matching. Users manually browse the offer book and choose specific offers from peers. This enables direct P2P settlement and user control over counterparties.</li>
<li><strong>Out-of-Band Fiat Payments:</strong> Bisq orchestrates, but does not directly process, fiat (or altcoin) payments. These transfers happen directly between users via their chosen payment methods outside the Bisq application itself.</li>
</ul>
<p>These differences lead to a fundamental trade-off: Bisq trades may take longer to settle than on centralized platforms, but they offer significantly enhanced security, privacy, and censorship resistance.</p>
<span class="wiki-legacy-anchor" id="How_Bisq_keeps_funds_secure" aria-hidden="true"></span><h3 id="how-bisq-keeps-funds-secure"> How Bisq keeps funds secure </h3>
<p>Mechanisms vary by protocol, but core principles include:</p>
<ul>
<li><strong>Non-Custodial:</strong> Users always retain control of their fiat and cryptocurrency funds. Bisq never holds user funds.</li>
<li><strong>Incentives/Collateral:</strong> Trading protocols use mechanisms to ensure fair play. The classic <a href="../bisq-1/">v1</a> protocol uses <a href="../security-deposit/">security deposits</a> locked from both buyer and seller alongside the trade amount in a <strong>2-of-2 multisig escrow</strong>. Other protocols like <a href="../bisq-easy/">Bisq Easy</a> rely on <a href="../reputation/">seller reputation</a>.</li>
<li><strong>Dispute Resolution:</strong> If issues arise, a decentralized human <a href="../dispute-resolution-in-bisq-1/">dispute resolution</a> system (including trader chat, mediation, and potentially arbitration) is available.</li>
</ul>
<span class="wiki-legacy-anchor" id="How_Bisq_keeps_data_private" aria-hidden="true"></span><h3 id="how-bisq-keeps-data-private"> How Bisq keeps data private </h3>
<ul>
<li><strong>No Registration/KYC:</strong> Using Bisq requires no identity verification or account registration with a central entity.</li>
<li><strong>Tor Network:</strong> All peer-to-peer network communication runs over the <span class="wiki-link-gap">Tor <small>[unrecovered article: Tor]</small></span> network by default, masking IP addresses.</li>
<li><strong>No Central Servers:</strong> Bisq has no central databases storing user or trade data.</li>
<li><strong>Encrypted Communication:</strong> Trade details are end-to-end encrypted between the trading counterparties.</li>
</ul>
<span class="wiki-legacy-anchor" id="How_Bisq_resists_censorship" aria-hidden="true"></span><h3 id="how-bisq-resists-censorship"> How Bisq resists censorship </h3>
<ul>
<li><strong>Distributed P2P Network:</strong> The network consists of users running the software globally, making it difficult for any single entity to shut down.</li>
<li><strong>Built on Tor:</strong> Inherits <span class="wiki-link-gap">Tor <small>[unrecovered article: Tor]</small></span>'s own censorship resistance properties.</li>
<li><strong>Code, Not a Company:</strong> Bisq is open-source software developed by a DAO, not a legal corporate entity that can be easily targeted or shut down by regulators.</li>
</ul>
</div>
