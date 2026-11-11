---
title: "DAO user reference"
slug: "wiki/dao-user-reference"
tableOfContents: false
---

<nav data-pagefind-ignore class="wiki-source-toc" aria-label="Article sections"><details><summary>On this page</summary><ul><li><a href="#bsq-token">BSQ Token</a></li><li><a href="#bsq-genesis-distribution">BSQ Genesis Distribution</a></li><li><a href="#bisq-dao">Bisq DAO</a></li><li><a href="#technical-overview">Technical Overview</a></li><li><a href="#voting-cycle">Voting Cycle</a></li><li><a href="#proposal-phase">Proposal Phase</a></li><li><a href="#other-details">Other Details</a></li><li><a href="#blind-voting-phase">Blind Voting Phase</a></li><li><a href="#voting-stake">Voting Stake</a></li><li><a href="#other-details-2">Other Details</a></li><li><a href="#vote-reveal-phase">Vote Reveal Phase</a></li><li><a href="#other-details-3">Other Details</a></li><li><a href="#vote-result-phase">Vote Result Phase</a></li><li><a href="#determining-consensus">Determining Consensus</a></li><li><a href="#note-on-unexpected-situations">Note on Unexpected Situations</a></li></ul></details></nav>

<div class="wiki-recovered-article" lang="en">

This **DAO user reference** covers practical details on the workings of the Bisq DAO for traders and contributors.

Some basic DAO functions like paying trading fees, making proposals, and voting may not seem complex, but implementing these functions on peer-to-peer networks (Bitcoin and Bisq’s own P2P network) adds extensive technical complexity.

Immense technical challenges aside, the practical constraints of the Bisq DAO are not trivial. One requirement is complete decentralization of decision-making (no persons with special powers) and funding (no central wallets or accounts to store and distribute funds). Another is that incentives must be so well-aligned that stakeholders are naturally motivated to grow and support the DAO merely by acting rationally—there are no managers to promote you (or fire you).

And perhaps most critically, the DAO needs to be secure: safe from hackers and scammers trying to take advantage of the DAO and its users.

<span class="wiki-legacy-anchor" id="BSQ_Token" aria-hidden="true">
</span>

## BSQ Token {#bsq-token}

Contributors earn BSQ for working on Bisq, and traders spend BSQ to trade on Bisq. This basic dynamic is covered in [the DAO introduction article](../introduction-to-the-dao/) and [in this video series](https://www.youtube.com/watch?v=pNvOZlIDYEQ&list=PLFH5SztL5cYPAXWFz-IMB4dBZ0MEZEG_e).

But what actually *is* BSQ, and where does it come from?

A single BSQ token is denominated as 100 satoshis (i.e., it\'s represented on the Bitcoin blockchain as 0.00000100 BTC). This bitcoin is \'colored\' with additional properties that causes Bisq software to recognize it as BSQ.

BSQ can only be created in one of two ways:

1. through the genesis distribution (detailed below)
2. through an issuance transaction (compensation request or reimbursement request)

<span class="wiki-legacy-anchor" id="BSQ_Genesis_Distribution" aria-hidden="true">
</span>

### BSQ Genesis Distribution {#bsq-genesis-distribution}

The Bisq DAO did not launch with a supply of zero BSQ tokens. An initial supply of BSQ tokens was created to account for all the contributions to the Bisq project before the mainnet launch of the Bisq DAO.

These contributions can be divided into 2 segments.

**1. Before October 2017**

In the early days of the project, before Bisq tracked compensation requests and voting results, Bisq collected donations. In October 2017, as part of the implementation of the Phase Zero plan, it was decided that 2.5 BTC of all donations would be distributed back to these patrons as BSQ where each person would receive an amount proportional to their prior contributions.

**2. After October 2017**

In October 2017, the plan outlined in the Phase Zero plan went into effect. Subsequent contributions to Bisq were [documented on GitHub](https://github.com/bisq-network/compensation/issues) and stakeholders voted to approve those contributions [on this spreadsheet](https://docs.google.com/spreadsheets/d/1xlXDswj3251BPCOcII-UyWlX7o7jMkfYBE-IZ5te5Ck).

The genesis BSQ distribution issued the sum of both these segments of past contributions.

Ultimately, the genesis transaction issued [3,657,480 BSQ to over 200 past contributors](https://mempool.space/bisq/tx/4b5417ec5ab6112bedf539c3b4f5a806ed539542d8b717e1c4470aa3180edce5). You can see [the corresponding Bitcoin transaction here](https://mempool.space/tx/4b5417ec5ab6112bedf539c3b4f5a806ed539542d8b717e1c4470aa3180edce5).

Addresses were confirmed over email, Slack, Twitter, and on these two GitHub threads: [one](https://github.com/bisq-network/compensation/issues/260), [two](https://github.com/bisq-network/compensation/issues/263).

<span class="wiki-legacy-anchor" id="Bisq_DAO" aria-hidden="true">
</span>

## Bisq DAO {#bisq-dao}

<span class="wiki-legacy-anchor" id="Technical_Overview" aria-hidden="true">
</span>

### Technical Overview {#technical-overview}

There are 2 key points to note about how the Bisq DAO works.

**1. Every DAO action is an on-chain Bitcoin transaction.**

Every DAO action requires BSQ, and since BSQ is bitcoin, every DAO action is also recorded on the Bitcoin blockchain. As noted above, this does NOT mean you should try to form your own BSQ transactions. But it does mean that every action you take on the Bisq DAO is immortalized on the Bitcoin blockchain, publicly verifiable, and virtually impossible to reverse.

**2. Bitcoin provides transaction integrity, and Bisq\'s own P2P network provides storage.**

DAO actions such as making proposals and voting include extra data such as text and links that don\'t belong on the Bitcoin blockchain. This extra data is stored on Bisq\'s own P2P network (literally, Bisq users\' hard drives). A hash of that extra data is included in the <code class="wiki-source-code" id="source-code-1">OP_RETURN</code> output of the corresponding Bitcoin transaction. Then, the Bitcoin transaction ID is added to the extra data and broadcast to peers on the Bisq network.

You can visualize it like this:

<figure class="wiki-source-image" id="source-image-1"><a href="../../media/wiki/9621cd36d07652bd96d99429862fd87d4072f2485af49f0fb1a284869c2d5aee.png"><img alt="How Bisq DAO data is stored" decoding="async" height="1389" loading="lazy" src="../../media/wiki/9621cd36d07652bd96d99429862fd87d4072f2485af49f0fb1a284869c2d5aee.png" width="2414"></a><figcaption>How Bisq DAO data is stored<br><small>Historical full-size recovered source. <a href="../../recovered-media/">Provenance catalogue</a>.</small></figcaption></figure>&#10;<div>&#10;</div>

Storing a hash of the extra data on the Bitcoin blockchain ensures any attempts to manipulate it will fail, since the hash of the manipulated data will change and then not match the hash recorded in the corresponding Bitcoin transaction.

<aside class="wiki-admonition" role="note">

**Note**

There\'s a bit of a chicken-and-egg problem here, since the Bitcoin transaction ID can only be known after the Bitcoin transaction is made, and the hash of a data object can only be made once the Bitcoin transaction ID is known.

To get around this, the data object is hashed with <code class="wiki-source-code" id="source-code-2">null</code> in place of the Bitcoin transaction ID, and the Bitcoin transaction ID is added afterward. Later, when the integrity of the data object needs to be validated, the Bitcoin transaction ID is replaced with <code class="wiki-source-code" id="source-code-3">null</code> before the data object is hashed.

</aside>

**For a more thorough treatment of the technical workings of the Bisq DAO, see the [technical overview article](../dao-technical-overview/).**

<span class="wiki-legacy-anchor" id="Voting_Cycle" aria-hidden="true">
</span>

### Voting Cycle {#voting-cycle}

Voting cycles are timed to last about 1 month. Duration is measured in blocks, so actual calendar/clock times may vary.

<span class="wiki-legacy-anchor" id="Proposal_Phase" aria-hidden="true">
</span>

#### Proposal Phase {#proposal-phase}

*3600 blocks, about 24 days*

During this time, Bisq stakeholders (contributors and traders) can make proposals. It is not possible to edit a proposal, but it is possible to remove a proposal and submit a corrected one (only during this phase).

There is a small fee to make proposals to discourage spam. Fees for proposals that are removed are not reimbursed.

Proposals requesting the issuance of new BSQ will also require a small amount of BTC to be included in the proposal transaction so there is BTC to \'color\' into BSQ. The spec requires 100 satoshis per BSQ token, so a request for 1000 BSQ will require 1000 × 100 = 100,000 satoshis.

Keep in mind that the actual BSQ you end up with will be net the proposal fee: if your request for 1000 BSQ is approved, and if the proposal fee is 2 BSQ, you will end up with 998 BSQ in your wallet.

For compensation requests, please make sure you follow [established conventions and recommendations](../compensation/#contributor).

If the proposal phase ends before you can make your proposal, simply wait and make your proposal in the next proposal phase.

<span class="wiki-legacy-anchor" id="Other_Details" aria-hidden="true">
</span>

##### Other Details {#other-details}

As illustrated in the image above, proposal transactions are published on the Bitcoin network and proposal data objects are broadcast on the Bisq P2P network. The Bitcoin transaction includes a hash of the proposal data object.

After the proposal phase is over, there is a break of 150 blocks (about 1 day) to review and discuss proposals before voting begins.

<span class="wiki-legacy-anchor" id="Blind_Voting_Phase" aria-hidden="true">
</span>

#### Blind Voting Phase {#blind-voting-phase}

*450 blocks, about 3 days*

You may approve, reject, or abstain from casting a vote on proposals. It is highly recommended that you only approve or reject proposals for which you can make a well-informed decision.

It is not necessary to have made a proposal to be able to vote—any stakeholder (anyone with BSQ) can participate in voting.

Once you have made your selections, you must specify a stake and publish your votes.

Votes cannot be changed once they are published.

<span class="wiki-legacy-anchor" id="Voting_Stake" aria-hidden="true">
</span>

##### Voting Stake {#voting-stake}

Your voting weight is determined by 2 factors: **reputation** (how much BSQ you\'ve earned), and **stake** (how much of your owned BSQ you allot to your vote) that you specify in your vote transaction.

*Reputation* is the amount of BSQ earned by doing work for the Bisq network, independent of the amount of BSQ spent or sold. So if Alice earns 10,000 BSQ by working on Bisq, and she sells 8,000 BSQ for BTC to pay her bills, her reputation value remains 10,000 BSQ. Caveat: reputation decays over time. BSQ earned decays linearly over a period of 2 years as soon as it\'s earned. So the reputation value of Alice\'s 10,000 BSQ is 5,000 BSQ one year after she earns it, and zero two years later.

Reputation cannot be specified when making a vote transaction—it\'s automatically calculated for the user from their past contributions.

*Stake* is the literal amount of BSQ specified for the vote transaction. This is BSQ you own that you would like to devote to your vote. The more BSQ you allot, the more weight your vote will hold. BSQ specified for stake is unspendable for the duration of the voting cycle.

**Total voting weight is the sum of reputation value and specified stake.**

BSQ earned is worth more than BSQ bought. The idea is that there is no better measure of good-will and dedication to the project than actually working on the project. The arrangement still allows people who buy into the project considerable influence, while hopefully minimizing the potential of whales with bad intentions from buying their way in and sabotaging the project.

<span class="wiki-legacy-anchor" id="Other_Details_2" aria-hidden="true">
</span>

##### Other Details {#other-details-2}

Votes are published on the Bitcoin network and *encrypted* vote data objects are broadcast on the Bisq P2P network (hence the term \'blind\' vote). The Bitcoin transaction includes a hash of the vote data object. BSQ specified for voting stake is also specified in this transaction, and cannot be spent until the vote reveal transaction is published.

Following the end of the blind voting phase, there is a break of 10 blocks to protect against reorgs.

<span class="wiki-legacy-anchor" id="Vote_Reveal_Phase" aria-hidden="true">
</span>

#### Vote Reveal Phase {#vote-reveal-phase}

*450 blocks, about 3 days*

No action is required of the user during this phase aside from having the Bisq software online at some point during the vote reveal phase so it can publish the vote reveal transaction.

You will see a pop-up in the UI when the transaction has been published.

<span class="wiki-legacy-anchor" id="Other_Details_3" aria-hidden="true">
</span>

##### Other Details {#other-details-3}

Only a Bitcoin transaction is made in this phase—no additional data is broadcast to the Bisq P2P network.

This transaction includes 2 items:

1. the key to decrypt the votes cast in the blind voting phase
2. a hash of the list of voting data objects received by the Bisq node making the transaction (ordered by transaction ID; details [below](../dao-user-reference/#determining-consensus)

One of the inputs to this transaction is the BSQ reserved for stake, so once this transaction is published, that BSQ becomes spendable again.

If a user fails to make their vote reveal transaction, their vote is rendered invalid.

Again, for protection against reorgs, there is a break of 10 blocks after this phase is over.

<span class="wiki-legacy-anchor" id="Vote_Result_Phase" aria-hidden="true">
</span>

#### Vote Result Phase {#vote-result-phase}

*10 blocks, about 100 minutes*

This phase is more of a trigger, so allotting 10 blocks is more for consistency than a hard requirement.

In this phase, Bisq nodes calculate vote results from proposals, voting stake, and votes (which can now be decrypted from the vote reveal transactions).

<span class="wiki-legacy-anchor" id="Determining_Consensus" aria-hidden="true">
</span>

##### Determining Consensus {#determining-consensus}

We can trust that all Bisq nodes will get the same data from the Bitcoin blockchain. However, we cannot be sure that all Bisq nodes have obtained all corresponding data from the Bisq P2P network. It is critical that any potential inconsistencies be handled before determining vote results, otherwise, vote results may differ.

This is why each Bisq node includes a hash of the list of the voting data objects it has received in its vote reveal transaction. While a hash of vote data objects is recorded on the Bitcoin blockchain for integrity, it\'s not guaranteed that every *voting data object itself* is actually delivered to every Bisq node.

So, when calculating vote results, the majority hash from the vote reveal transactions (majority by voting stake) is considered to be the authoritative representation of votes for the whole network. Vote result calculations are based on this uniform determination, ensuring consensus across the network.

<aside class="wiki-admonition" role="note">

**Note**

**This majority hash must have at least 80% of the vote stake**—otherwise the whole voting cycle is invalidated and all proposals are rejected. Such inconsistencies should be exceptional, as they would indicate a significant problem with P2P network stability.

This 80% threshold is also a security measure, as only an attacker with at least 80% of the total stake in a voting cycle could succeed.

</aside>

This threshold was tested in Cycle 20. The majority hash lacked the requisite 80% voting stake consensus because of Tor network issues, so results were invalidated, and there was zero issuance. See [more details here](https://bisq.network/blog/cycle-20-results/).

<span class="wiki-legacy-anchor" id="Note_on_Unexpected_Situations" aria-hidden="true">
</span>

## Note on Unexpected Situations {#note-on-unexpected-situations}

Great care has been taken to make sure that there are no opportunities for the Bisq DAO to be exploited by scammers, hackers, or others with bad intentions.

Much expertise and theory went into the Bisq DAO\'s conception, implementation was careful, and testing was thorough. The resulting software is the best expression of the intention of these collective efforts, but it may not be infallible.

**We say this to establish that Bisq DAO code is not law.** It has clear intentions, and every effort will be made to fix unintended results.

While we hope nothing will be catastrophic enough to require it, hard forks, confiscation, and new issuances are options to deal with extreme scenarios. BSQ trading and DAO operations can be halted through an alert message from the lead developer. Such messages may be ignored by users if they think the measure is being abused, but ignoring such messages in a situation where the measure *is* justified may exclude the user from reimbursement in case of losses.

</div>
