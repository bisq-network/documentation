---
title: "Compensation Maintainer"
slug: "wiki/compensation-maintainer"
tableOfContents: false
---

<nav data-pagefind-ignore class="wiki-source-toc" aria-label="Article sections"><details open><summary>On this page</summary><ul><li><a href="#issue">Issue</a></li><li><a href="#team">Team</a></li><li><a href="#duties">Duties</a></li><li><a href="#announce-bsq-usd-exchange-rate">Announce BSQ-USD exchange rate</a></li><li><a href="#announce-request-submission-deadline">Announce request submission deadline</a></li><li><a href="#triage-incoming-requests">Triage incoming requests</a></li><li><a href="#archive-previous-cycle-requests-at-the-end-of-the-proposal-phase">Archive previous cycle requests at the end of the proposal phase</a></li><li><a href="#close-current-cycle-requests-after-the-vote-reveal-phase">Close current cycle requests after the vote reveal phase</a></li><li><a href="#rights">Rights</a></li><li><a href="#bonding">Bonding</a></li></ul></details></nav>

<div class="wiki-recovered-article" lang="en">

The **Compensation Maintainer** handles announcements and issue triaging for compensation requests.

<span class="wiki-legacy-anchor" id="Issue" aria-hidden="true">
</span>

## Issue {#issue}

<a href="https://github.com/bisq-network/roles/issues/86" rel="noopener noreferrer">
https://github.com/bisq-network/roles/issues/86</a>

<span class="wiki-legacy-anchor" id="Team" aria-hidden="true">
</span>

## Team {#team}

<a href="https://github.com/orgs/bisq-network/teams/compensation-maintainers" rel="noopener noreferrer">
@bisq-network/compensation-maintainers</a>

<span class="wiki-legacy-anchor" id="Duties" aria-hidden="true">
</span>

## Duties {#duties}

<span class="wiki-legacy-anchor" id="Announce_BSQ-USD_exchange_rate" aria-hidden="true">
</span>

### Announce BSQ-USD exchange rate {#announce-bsq-usd-exchange-rate}

Compensation requests use a [30-day volume-weighted average](https://github.com/bisq-network/proposals/issues/313) to determine a BSQ/USD rate that discounts outliers. At the beginning of the cycle, the Compensation Maintainer should create a pinned issue with the title \"BSQ rate for Cycle X is Y.YY USD per 1 BSQ\".

<span class="wiki-legacy-anchor" id="Announce_request_submission_deadline" aria-hidden="true">
</span>

### Announce request submission deadline {#announce-request-submission-deadline}

To allow time for team leads to discuss and review compensation requests, requests need to be ready for review 1 week before the end of current cycle\'s proposal phase.

<figure class="wiki-source-image" id="source-image-1"><a href="../../media/wiki/cff1be21338b53a6055edeaf828bfa02c99f41120504c367ed247c0f91a1f5ce.png"><img alt="Compensation board" decoding="async" height="352" loading="lazy" src="../../media/wiki/cff1be21338b53a6055edeaf828bfa02c99f41120504c367ed247c0f91a1f5ce.png" width="800"></a><figcaption>Compensation board<br><small>Historical thumbnail; original resolution not recovered. <a href="../../recovered-media/">Provenance catalogue</a>.</small></figcaption></figure>

Dates and reminders will be announced on a pinned issue at github [compensation repository](https://github.com/bisq-network/compensation/issues), the [compensation board](https://github.com/orgs/bisq-network/projects/20/), and the [events calendar](../events-calendar/).

<span class="wiki-legacy-anchor" id="Triage_incoming_requests" aria-hidden="true">
</span>

### Triage incoming requests {#triage-incoming-requests}

The Compensation Maintainer watches the [compensation repository](https://github.com/bisq-network/compensation/issues) and proceeds to triage:

Incoming issues are categorized as <code class="wiki-source-code" id="source-code-1">In Progress</code> if they have <code class="wiki-source-code" id="source-code-2">\[WIP\]</code> at the beginning of the title or as <code class="wiki-source-code" id="source-code-3">In Review</code> if they don\'t. The Compensation Maintainer assigns <code class="wiki-source-code" id="source-code-4">In Review</code> issues to the appropriate team leads (or determine which team leads are responsible if it isn\'t obvious).

As requests are submitted to the DAO (with txid posted in corresponding issues), the Compensation Maintainer should classify requests as <code class="wiki-source-code" id="source-code-5">Proposal Submitted</code>.

This triage can be controlled from the Compensation board by:

- using the \"Add cards\" button on the board to triage new issues
- dragging and dropping existing issues to categories
- using the \"Projects\" section in the right sidebar of an issue\'s page

<span class="wiki-legacy-anchor" id="Archive_previous_cycle_requests_at_the_end_of_the_proposal_phase" aria-hidden="true">
</span>

### Archive previous cycle requests at the end of the proposal phase {#archive-previous-cycle-requests-at-the-end-of-the-proposal-phase}

Once a cycle\'s proposal phase is over, the Compensation Maintainer should [archive](https://help.github.com/en/github/managing-your-work-on-github/archiving-cards-on-a-project-board) all issues in the <code class="wiki-source-code" id="source-code-6">Done</code> column from the previous phase.

The reason for waiting to archive these issues is so that contributors can easily see how many requests were made in the last cycle, quickly find their own request, and easily review which ones were accepted and rejected. Requests are archived in order to keep the board clean and make room for requests in the next cycle.

<span class="wiki-legacy-anchor" id="Close_current_cycle_requests_after_the_vote_reveal_phase" aria-hidden="true">
</span>

### Close current cycle requests after the vote reveal phase {#close-current-cycle-requests-after-the-vote-reveal-phase}

When the reveal vote phase is complete, the Compensation Maintainer should take the following steps:

1. Label each compensation request issue as <code class="wiki-source-code" id="source-code-7">was:accepted</code> or <code class="wiki-source-code" id="source-code-8">was:rejected</code> according to the vote result
2. Close the issue with a comment indicating the request\'s outcome (e.g., \"Closing as accepted\" or \"Closing as rejected\")

Once closed, the issues will automatically move to the <code class="wiki-source-code" id="source-code-9">Done</code> column of the board, where they remain for reference until they are archived at the end of the next cycle\'s proposal phase (see above).

<span class="wiki-legacy-anchor" id="Rights" aria-hidden="true">
</span>

## Rights {#rights}

- \"Triage\" access to the [compensation repository](https://github.com/bisq-network/compensation/)

<span class="wiki-legacy-anchor" id="Bonding" aria-hidden="true">
</span>

## Bonding {#bonding}

N/A

</div>
