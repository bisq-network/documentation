---
title: "Proposals"
slug: "wiki/proposals"
tableOfContents: false
---

<nav data-pagefind-ignore class="wiki-source-toc" aria-label="Article sections"><details open><summary>On this page</summary><ul><li><a href="#roles">Roles</a></li><li><a href="#processes">Processes</a></li><li><a href="#submission-and-review">Submission and Review</a></li><li><a href="#research-and-evaluate">Research and Evaluate</a></li><li><a href="#create-github-issue">Create GitHub Issue</a></li><li><a href="#review">Review</a></li><li><a href="#evaluate">Evaluate</a></li><li><a href="#enact">Enact</a></li><li><a href="#submit-to-the-dao-if-needed">Submit to the DAO (if needed)</a></li></ul></details></nav>

<div class="wiki-recovered-article" lang="en">

**Proposals** are a way to suggest significant *project-wide* changes or new initiatives where a broad consensus of contributors, users, and stakeholders is desired. Smaller changes to existing components, infrastructure, or processes are generally best discussed in other channels (on Matrix, other GitHub repositories, etc).

This article covers the roles, processes, and conventions for proposals.

<span class="wiki-legacy-anchor" id="Roles" aria-hidden="true">
</span>

## Roles {#roles}

- [Proposals Maintainer](../proposals-maintainer/)

<span class="wiki-legacy-anchor" id="Processes" aria-hidden="true">
</span>

## Processes {#processes}

Anyone may submit new proposals and/or review other proposals. But there are things you can do to make it more likely your ideas are received well.

<span class="wiki-legacy-anchor" id="Submission_and_Review" aria-hidden="true">
</span>

### Submission and Review {#submission-and-review}

<span class="wiki-legacy-anchor" id="Research_and_Evaluate" aria-hidden="true">
</span>

#### Research and Evaluate {#research-and-evaluate}

Proposals are supposed to be significant items with enough weight to draw attention from core contributors, users, and stakeholders from across functions.

<aside class="wiki-admonition" role="note">

**Note**

If your idea is focused on a particular area of Bisq, it would be best to first float your idea in the channels for that area. For example, development-related ideas can be discussed in #dev on Matrix or in [the main GitHub repository](https://github.com/bisq-network/bisq). Growth-related ideas can be discussed in #growth on Matrix or the [growth GitHub repository](https://github.com/bisq-network/growth/).

</aside>

Accordingly, proposals should be well-considered, well-researched, and well-articulated.

As a result, before submitting a proposal, please:

1. Discuss your idea with other contributors to see if a proposal is worth submitting at all
2. Search through existing proposals (both [open and closed](https://github.com/bisq-network/proposals/issues)) to see whether something similar has already been proposed
3. Notice which among those proposals have been accepted and rejected, and why
4. Read this article to fully understand the proposal process and guidelines

Look through past proposals that succeeded to get a feel for how they were structured.

<span class="wiki-legacy-anchor" id="Create_GitHub_Issue" aria-hidden="true">
</span>

#### Create GitHub Issue {#create-github-issue}

Once you\'ve done research, floated your idea in the community in other channels, and think your idea might garner broader support, create a new GitHub issue in the [bisq-network/proposals repository on GitHub](https://github.com/bisq-network/proposals/issues), written and formatted according to the following guidelines:

- Write your proposal in a way that makes it as easy as possible to achieve rough consensus. This means that proposals should be as simple, focused, concrete and well-defined as possible. Your goal should be to make it as easy as possible for your fellow contributors to understand and agree with you.
- Take full responsibility for your proposal. It is not the maintainers\' job, nor anyone else’s, to see your proposal succeed. If people aren’t responding or reacting to your proposal, it’s your job to solicit that feedback more actively.
- Never assume that anyone other than yourself is going to do the work described in your proposal. If your proposal does place expectations on other contributors, or requires them to change their behavior in any way, be explicit about that.
- Provide context. Make a strong case for your proposal. Link to prior discussions. Do not make your reader do any more work than they have to to understand your proposal.
- Format your proposal well. Make it a pleasure to read.

In general, good proposals take time to research and write. Every minute you spend clearly and logically articulating your proposal is a minute that you save other contributors in understanding it. This diligence on your part will be appreciated and rewarded by others\' attention.

<aside class="wiki-admonition" role="note">

**Warning**

Cheaply-written, \"drive by\" proposals that waste others\' time will be closed immediately as <code class="wiki-source-code" id="source-code-1">was:incorrect</code>.

</aside>

A [maintainer](../proposals-maintainer/) will quickly review your proposal and will either (a) assign it to you to indicate your ownership and responsibility over it, or (b) close it and label it as <code class="wiki-source-code" id="source-code-2">was:incorrect</code> if it does not follow the guidelines listed above.

<span class="wiki-legacy-anchor" id="Review" aria-hidden="true">
</span>

#### Review {#review}

Once a proposal is submitted, a two-week review period follows.

During this period, interested reviewers should read, discuss and ultimately [react](https://docs.github.com/en/github/collaborating-with-issues-and-pull-requests/about-conversations-on-github#reacting-to-ideas-in-comments) to the proposal as follows:

- 👍: I agree with the proposal and want to see it enacted.
- 😕: I am uncertain about the proposal and I need more information.
- 👎: I disagree with the proposal and do not want to see it enacted.

Try to provide an explanation of your reaction, especially when reacting with a 😕 or 👎. If you don’t, then don’t expect your opinion to have much weight or get addressed.

If you do not understand or care about a given proposal, ignore it.

Use comments on the proposal issue to discuss, ask questions, and get clarifications. Take lengthy discussions offline to Matrix or elsewhere and then summarize them back on the issue.

<span class="wiki-legacy-anchor" id="Evaluate" aria-hidden="true">
</span>

#### Evaluate {#evaluate}

The proposal review process is all about reaching a rough consensus, meaning that there is a broad agreement that the proposal should be enacted, and that any dissenting opinions have been addressed, though not necessarily fully resolved.

After the two-week review period is over, a maintainer will evaluate reactions to and discussions about the proposal and will close the issue with a comment explaining that it is approved or rejected based on whether a rough consensus was achieved.

Approved proposals will be labeled with <code class="wiki-source-code" id="source-code-3">was:approved</code>. Rejected proposals will be labeled with <code class="wiki-source-code" id="source-code-4">was:rejected</code>.

If rough consensus has not been achieved, e.g. because discussion is still ongoing, dissenting concerns have not been addressed, or the proposal has turned out to be contentious, the maintainer will indicate that they cannot close the proposal, and that it is up to the submitter to take next steps to move the proposal forward. One option is to <a href="../proposals/">submit the proposal to the DAO</a> <small class="wiki-link-gap">[section not recovered: Submit to the DAO]</small> for voting. If the proposal does not move forward after another two weeks, the maintainer will close and label it <code class="wiki-source-code" id="source-code-5">was:stalled</code>.

If there have been no or very few reactions to a proposal after the two-week period, the maintainer will close it and label it as <code class="wiki-source-code" id="source-code-6">was:ignored</code>.

<span class="wiki-legacy-anchor" id="Enact" aria-hidden="true">
</span>

#### Enact {#enact}

Assuming your proposal was approved, the next step is to actually enact the changes described in that proposal, perhaps by [creating a project](../project-management/) or simply getting to work.

<span class="wiki-legacy-anchor" id="Submit_to_the_DAO_(if_needed)" aria-hidden="true">
</span>

### Submit to the DAO (if needed) {#submit-to-the-dao-if-needed}

Sometimes it is necessary to submit proposals to the DAO for voting:

- DAO parameter changes
- proposal for bonded roles
- contentious proposals for which there is strong interest but no clear consensus

For most general proposals this should not be necessary—general proposals that have clear consensus (or clear lack of consensus) don\'t need to be voted upon in the DAO. In any case, a DAO submission should only be considered after considerable discussion on GitHub so that voters have context and reason to vote one way or another. Do not submit a DAO proposal before such discussion is established.

See [how to submit a proposal for DAO voting](../participating-in-a-dao-voting-cycle/).

</div>
