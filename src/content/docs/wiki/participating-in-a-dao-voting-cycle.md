---
title: "Participating in a DAO voting cycle"
slug: "wiki/participating-in-a-dao-voting-cycle"
tableOfContents: false
---

<nav data-pagefind-ignore class="wiki-source-toc" aria-label="Article sections"><details open><summary>On this page</summary><ul><li><a href="#background">Background</a></li><li><a href="#acquire-bsq">Acquire BSQ</a></li><li><a href="#make-a-proposal">Make a proposal</a></li><li><a href="#vote-on-proposals">Vote on proposals</a></li><li><a href="#submit-votes">Submit votes</a></li><li><a href="#reveal-your-vote">Reveal your vote</a></li><li><a href="#get-vote-results">Get vote results</a></li><li><a href="#see-dao-transactions-on-a-block-explorer">See DAO transactions on a block explorer</a></li></ul></details></nav>

<div class="wiki-recovered-article" lang="en">

**Participating in a DAO voting cycle** is something any stakeholder can do—Bisq trader, contributor, or anyone else who wants to help the project succeed.

This article covers how to make a proposal and vote on other proposals, as well as how the BSQ token enables this process to be handled in a decentralized and trustless but meritocratic way.

For a brief overview of how the Bisq DAO works at a high level, see the [DAO introduction article](../introduction-to-the-dao/).

<span class="wiki-legacy-anchor" id="Background" aria-hidden="true">
</span>

## Background {#background}

As covered in the [Introduction to the DAO](../introduction-to-the-dao/) article, the Bisq DAO\'s governance model helps achieve several functions for the Bisq project.

This governance model is composed of voting cycles: periods of 4,679 blocks (approximately 1 month) made of 4 phases:

1. **Proposal phase**, in which stakeholders submit compensation requests and other proposals requesting reimbursements for trading fees, changes in trading parameters, or changes in some other aspect of the Bisq project. After the proposal phase is over, there is a break of 150 blocks (about 1 day) to review and discuss proposals before voting begins.
2. **Blind voting phase**, in which stakeholders cast their votes on submitted proposals. Votes are encrypted in this phase to prevent later voters from being influenced by earlier voters. Following the end of the blind voting phase, there is a break of 10 blocks to protect against reorgs.
3. **Vote reveal phase**, in which each stakeholder sends the decryption key for their vote. Again, for protection against reorgs, there is a break of 10 blocks after this phase is over.
4. **Vote result phase**, in which vote results are calculated and BSQ is issued accordingly.

You can see approximate start and end dates for the current voting cycle at <code class="wiki-source-code" id="source-code-1">DAO</code> > <code class="wiki-source-code" id="source-code-2">Governance</code> > <code class="wiki-source-code" id="source-code-3">Dashboard</code>.

<figure class="wiki-source-image" id="source-image-1"><a href="../../media/wiki/5b4a9220e56d85177e0429b00809a856b99596b7ca68717429ddac6a6c5d4d16.png"><img alt="DAO blocks and estimated calendar times." decoding="async" height="810" loading="lazy" src="../../media/wiki/5b4a9220e56d85177e0429b00809a856b99596b7ca68717429ddac6a6c5d4d16.png" width="1400"></a><figcaption>DAO blocks and estimated calendar times.<br><small>Historical thumbnail; original resolution not recovered. <a href="../../recovered-media/">Provenance catalogue</a>.</small></figcaption></figure>
<div>
</div>

<span class="wiki-legacy-anchor" id="Acquire_BSQ" aria-hidden="true">
</span>

## Acquire BSQ {#acquire-bsq}

In order to participate in DAO voting, you will need BSQ. See how to acquire BSQ [in this article](../paying-trading-fees-with-bsq/#acquire-bsq).

As of this writing, making a proposal costs 2 BSQ and casting a ballot (voting) costs 2 BSQ. You\'ll also need some plain BTC for transaction fees (each DAO action is a bitcoin transaction which requires mining fees to be paid), and if you will be [asking for compensation](../making-a-compensation-request/) or reimbursement, you\'ll need to include some plain BTC to be colored into BTC (precise amount is 100 satoshis × \[requested BSQ amount\]).

Keep this in mind when buying BSQ to get started for the first time, and make sure you have a BTC balance in your Bisq wallet that\'s sufficient for what you want to do.

<span class="wiki-legacy-anchor" id="Make_a_proposal" aria-hidden="true">
</span>

## Make a proposal {#make-a-proposal}

<aside class="wiki-admonition" role="note">

**Note**

Proposals can only be made during the proposal phase. If the voting cycle is in any other phase, you’ll need to wait for the proposal phase of the next voting cycle to make your proposal.

</aside>

<aside class="wiki-admonition" role="note">

**Note**

The process for making a compensation request is largely the same as the process outlined here, but see [this article](../making-a-compensation-request/) for additional considerations.

</aside>

**Please read [this article on proposals](../proposals/) before submitting a proposal for voting.** Bisq proposals tend to be for significant items, and proposals submitted to the DAO are typically for <a href="../proposals/#submit-to-the-dao-if-needed"></a>

[*controversial* significant items](../proposals/#submit-to-the-dao-if-needed)

<a href="../proposals/#submit-to-the-dao-if-needed">
</a>.<p></p>

In <code class="wiki-source-code" id="source-code-4">DAO</code> > <code class="wiki-source-code" id="source-code-5">Governance</code> > <code class="wiki-source-code" id="source-code-6">Make Proposal</code>, you’ll find the form to make a new proposal. Pick the type of proposal you want to make from the dropdown, fill the form, and hit <code class="wiki-source-code" id="source-code-7">Make Proposal</code>.

- Make sure the GitHub handle you put in Bisq matches the GitHub handle on the issue.
- Also make sure to replace <code class="wiki-source-code" id="source-code-8">#</code> with the GitHub proposal number. For example, if submitting proposal #999 with URL [https://github.com/bisq-network/proposals/issues/999](https://github.com/bisq-network/proposals/issues/999), the DAO proposal URL should be [https://bisq.network/dao-proposals/999](https://bisq.network/dao-proposals/999).

<aside class="wiki-admonition" role="note">

**Warning**

Beware that proposals cannot be edited after being submitted. If you need to make a change, you can delete the proposal and make a new one while the proposal phase is still active, but you’ll need to pay the proposal fee again. Once the proposal phase is over, proposals cannot be added or removed until the next proposal phase.

</aside>

Here\'s how making a generic proposal can look:

<figure class="wiki-source-image" id="source-image-2"><a href="../../media/wiki/3b2d88889e9ce2e02a2bbfda0c272d116204049d656a30e5aff090ce078e9c55.png"><img alt="Submit a generic proposal for DAO voting." decoding="async" height="825" loading="lazy" src="../../media/wiki/3b2d88889e9ce2e02a2bbfda0c272d116204049d656a30e5aff090ce078e9c55.png" width="1400"></a><figcaption>Submit a generic proposal for DAO voting.<br><small>Historical thumbnail; original resolution not recovered. <a href="../../recovered-media/">Provenance catalogue</a>.</small></figcaption></figure>
<div>
</div>

<span class="wiki-legacy-anchor" id="Vote_on_proposals" aria-hidden="true">
</span>

## Vote on proposals {#vote-on-proposals}

Once the proposal phase is over, after a short break, the voting phase starts.

You can see all proposals in the current voting cycle in <code class="wiki-source-code" id="source-code-9">DAO</code> > <code class="wiki-source-code" id="source-code-10">Governance</code> > <code class="wiki-source-code" id="source-code-11">Browse Open Proposals</code>.

Click through each proposal to see more details, and then vote—it’s strongly recommended that you only accept or reject proposals you know well and have a strong opinion about.

<figure class="wiki-source-image" id="source-image-3"><a href="../../media/wiki/aedc2d277b0573b0f6c253a7f440f64358facffd16b1ef7f80a87f125b170c1f.png"><img alt="Cast votes for proposals during the blind voting phase." decoding="async" height="640" loading="lazy" src="../../media/wiki/aedc2d277b0573b0f6c253a7f440f64358facffd16b1ef7f80a87f125b170c1f.png" width="888"></a><figcaption>Cast votes for proposals during the blind voting phase.<br><small>Historical full-size recovered source. <a href="../../recovered-media/">Provenance catalogue</a>.</small></figcaption></figure>
<div>
</div>

<span class="wiki-legacy-anchor" id="Submit_votes" aria-hidden="true">
</span>

## Submit votes {#submit-votes}

When you’re done selecting your votes, you will need to submit your votes.

<figure class="wiki-source-image" id="source-image-4"><a href="../../media/wiki/121d495dc99f76bf055473c89a6175b58dac4dca88298f0dccef2697a50cac43.png"><img alt="Select voting weight and submit all votes." decoding="async" height="512" loading="lazy" src="../../media/wiki/121d495dc99f76bf055473c89a6175b58dac4dca88298f0dccef2697a50cac43.png" width="809"></a><figcaption>Select voting weight and submit all votes.<br><small>Historical full-size recovered source. <a href="../../recovered-media/">Provenance catalogue</a>.</small></figcaption></figure>

All votes are submitted in a single ballot. Casting a ballot currently costs 2 BSQ + mining fees.

In addition, to submit your votes, you need to specify a BSQ amount to use for **voting stake**. The more BSQ you stake for your vote, the more weight it will carry. This staked BSQ cannot be traded or otherwise transferred until your vote reveal transaction is published.

The software has checks to prevent such BSQ from being spent, but if BSQ staked for voting is somehow spent, the corresponding vote will be rendered invalid.

This is why, as you see in the screenshot to the left, it\'s advisable to use most (but not all) of your BSQ for the voting stake—we left some BSQ available for spending in case we need it for other purposes during the remainder of the voting cycle.

<code class="wiki-source-code" id="source-code-12">Vote weight from earned BSQ</code> is BSQ earned from contributing to Bisq: this BSQ is treated slightly differently from BSQ bought on the open market when determining a stakeholder’s voting weight.

<aside class="wiki-admonition" role="note">

**Note**

For more details on how voting weight is determined, see the [DAO user reference](../dao-user-reference/#voting-stake).

</aside>

Once you’ve entered a voting stake, go ahead and click <code class="wiki-source-code" id="source-code-13">Vote on all proposals</code>.

<span class="wiki-legacy-anchor" id="Reveal_your_vote" aria-hidden="true">
</span>

## Reveal your vote {#reveal-your-vote}

After the blind voting phase is over, you must make sure Bisq goes back online at some point during the vote reveal phase to publish your vote reveal transaction.

Bisq will publish the transaction automatically when it’s online, so you don’t have to actually do anything, and you’ll see a pop-up when the transaction is published.

This transaction includes the key to decrypt your vote from the blind voting phase. It also includes a representation of all votes you’ve received from the network, which is used to determine a consensus of all votes cast on the network. See more details [here](../dao-user-reference/#vote-reveal-phase).

**Don’t forget this step! If your vote reveal transaction is not published, your vote cannot be decrypted, and so it cannot be counted.**

<span class="wiki-legacy-anchor" id="Get_vote_results" aria-hidden="true">
</span>

## Get vote results {#get-vote-results}

Once the vote reveal phase is over, results are calculated and the next voting cycle starts.

You can see results of the last voting cycle in <code class="wiki-source-code" id="source-code-14">DAO</code> > <code class="wiki-source-code" id="source-code-15">Governance</code> > <code class="wiki-source-code" id="source-code-16">Vote Results</code>.

<figure class="wiki-source-image" id="source-image-5"><a href="../../media/wiki/153abbc447ab34ed713dbdffb3324a59bfbf67ee82e28f190cddd58ddf4cc2cb.png"><img alt="Submit a generic proposal for DAO voting." decoding="async" height="708" loading="lazy" src="../../media/wiki/153abbc447ab34ed713dbdffb3324a59bfbf67ee82e28f190cddd58ddf4cc2cb.png" width="1196"></a><figcaption>Submit a generic proposal for DAO voting.<br><small>Historical full-size recovered source. <a href="../../recovered-media/">Provenance catalogue</a>.</small></figcaption></figure>
<div>
</div>

<span class="wiki-legacy-anchor" id="See_DAO_transactions_on_a_block_explorer" aria-hidden="true">
</span>

## See DAO transactions on a block explorer {#see-dao-transactions-on-a-block-explorer}

Since DAO transactions are bitcoin transactions, you can see them on any bitcoin block explorer. But because transactions use BSQ (bitcoin colored in a way that only Bisq understands), ordinary bitcoin block explorers can’t recognize which bitcoin transactions are also BSQ transactions.

Hence [BSQ block explorers](https://explorer.bisq.network). Whenever you do a Bisq DAO transaction, including paying trading fees with BSQ, you can see it on a BSQ block explorer.

Here’s a screenshot of the past few BSQ transactions that took place at the end of Cycle 23:

<figure class="wiki-source-image" id="source-image-6"><a href="../../media/wiki/51f1696fa51645f3527349521205a00a0171c2c2de4977adbabdf9cf8c325c8f.png"><img alt="A listing of Bisq DAO transactions on mempool.space." decoding="async" height="961" loading="lazy" src="../../media/wiki/51f1696fa51645f3527349521205a00a0171c2c2de4977adbabdf9cf8c325c8f.png" width="1400"></a><figcaption>A listing of Bisq DAO transactions on mempool.space.<br><small>Historical thumbnail; original resolution not recovered. <a href="../../recovered-media/">Provenance catalogue</a>.</small></figcaption></figure>
<div>
</div>

</div>
