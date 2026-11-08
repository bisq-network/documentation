---
title: Proposals and voting
\ndescription: Follow a DAO cycle from a proposal through vote reveal and results.
---

*Bisq 1 · Source checked 7 November 2026 · Maintainer review pending.*

## Before proposing

A proposal gives stakeholders a way to discuss a change and, when necessary, vote on it. Research the issue, describe the problem, alternatives, costs and expected outcome, and open the appropriate [proposals issue](https://github.com/bisq-network/proposals/issues). Engage with review before submitting an on-chain proposal. Agreement on an issue and a DAO vote are distinct steps; use the current process and proposal type rather than assuming every discussion needs a vote.

The recovered proposals process asked authors to search open and closed issues, discuss narrowly scoped ideas with the relevant area first, and take ownership of a concrete, well-researched proposal. It described a two-week discussion period, reactions indicating agreement, uncertainty or disagreement, and a maintainer assessment of rough consensus. Old labels included `was:approved`, `was:rejected`, `was:stalled` and `was:ignored`. These are historical process details; verify the current issue template, labels and review timing. Parameter changes, bonded-role proposals and unresolved contentious proposals were examples of matters that could require DAO voting after discussion.

Anyone holding BSQ can participate as a stakeholder. Contributors, users and other BSQ holders can review a proposal; being a stakeholder does not require a specific role. Review only matters you understand. Compensation and reimbursement requests have their own [preparation guidance](../requests/).

## Proposal phase

Open `DAO` > `Governance` > `Dashboard` to see the active cycle, its block-based phase and estimated timing. Dates are estimates: blockchain progress and DAO parameters can change. Proposals are submitted during the proposal phase; budget sufficient BSQ and BTC for the fees and any transaction requirements shown by the app.

<a href="../../media/wiki/5b4a9220e56d85177e0429b00809a856b99596b7ca68717429ddac6a6c5d4d16.png"><img src="../../media/wiki/5b4a9220e56d85177e0429b00809a856b99596b7ca68717429ddac6a6c5d4d16.png" alt="Historical DAO dashboard showing block phases" loading="lazy" /></a>

*Historical partial capture; labels and dates may differ.*

In `Make Proposal`, select the appropriate type, fill in the required fields and link the corresponding issue. Check the handle and proposal URL. Published proposals cannot simply be edited: while the phase allows it, remove an incorrect proposal and submit a corrected one, paying any new fee shown. After the phase closes, wait for the next cycle.

<a href="../../media/wiki/3b2d88889e9ce2e02a2bbfda0c272d116204049d656a30e5aff090ce078e9c55.png"><img src="../../media/wiki/3b2d88889e9ce2e02a2bbfda0c272d116204049d656a30e5aff090ce078e9c55.png" alt="Historical generic proposal form" loading="lazy" /></a>

*Historical partial capture of the proposal form.*

## Blind vote and stake

During blind voting, inspect open proposals and select accept, reject or abstain. Submit the selections together with a BSQ stake. The stake is locked until the reveal transaction; spending it prematurely invalidates the vote. Voting weight combines committed stake with merit from qualifying earned BSQ, which decays over time. The application calculates merit; bought BSQ can be staked but is not itself earned contribution merit.

<a href="../../media/wiki/aedc2d277b0573b0f6c253a7f440f64358facffd16b1ef7f80a87f125b170c1f.png"><img src="../../media/wiki/aedc2d277b0573b0f6c253a7f440f64358facffd16b1ef7f80a87f125b170c1f.png" alt="Historical proposal voting screen" loading="lazy" /></a>

<a href="../../media/wiki/121d495dc99f76bf055473c89a6175b58dac4dca88298f0dccef2697a50cac43.png"><img src="../../media/wiki/121d495dc99f76bf055473c89a6175b58dac4dca88298f0dccef2697a50cac43.png" alt="Historical screen for submitting votes and stake" loading="lazy" /></a>

*Historical screens; check current fees and controls in Bisq.*

## Reveal and results

Bring Bisq online during the reveal phase so it can publish the reveal transaction. A vote that is not revealed cannot be counted. The reveal publishes the decryption key and a hash representing the voter's observed blind-vote list. When competing vote-list views exist, the checked consensus code requires the leading view to represent at least 80% of their stake; otherwise it raises a consensus error. The network uses the agreed list to calculate results; a proposal must meet its applicable quorum and threshold. Inspect `Vote Results` after the result phase. A Bitcoin explorer shows the underlying transaction; a BSQ-aware explorer interprets DAO-specific information.

<a href="../../media/wiki/153abbc447ab34ed713dbdffb3324a59bfbf67ee82e28f190cddd58ddf4cc2cb.png"><img src="../../media/wiki/153abbc447ab34ed713dbdffb3324a59bfbf67ee82e28f190cddd58ddf4cc2cb.png" alt="Historical DAO vote result screen" loading="lazy" /></a>

<a href="../../media/wiki/51f1696fa51645f3527349521205a00a0171c2c2de4977adbabdf9cf8c325c8f.png"><img src="../../media/wiki/51f1696fa51645f3527349521205a00a0171c2c2de4977adbabdf9cf8c325c8f.png" alt="Historical BSQ-aware explorer listing DAO transactions" loading="lazy" /></a>

*Historical screens; the explorer image is a partial capture.*

## Sources and review

Checked against the [DAO user reference](https://docs.bisq.network/dao-user-reference.html), [proposal process](https://docs.bisq.network/proposals.html), and [Bisq 1 v1.10.11 DAO UI strings](https://github.com/bisq-network/bisq/blob/ea9d5dff90c99ac462f2b0a7bf9ef92683956619/core/src/main/resources/i18n/displayStrings.properties). Historical images are retained from the recovered voting guide. Parameters and deadlines must be checked in the running app; no proposal or vote was submitted.
