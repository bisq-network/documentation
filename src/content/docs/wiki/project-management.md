---
title: "Project management"
slug: "wiki/project-management"
tableOfContents: false
---

<nav data-pagefind-ignore class="wiki-source-toc" aria-label="Article sections"><details><summary>On this page</summary><ul><li><a href="#purpose">Purpose</a></li><li><a href="#philosophy">Philosophy</a></li><li><a href="#most-work-is-project-work">Most work is project work</a></li><li><a href="#identifying-candidate-projects">Identifying candidate projects</a></li><li><a href="#good-project-management-scales">Good project management scales</a></li><li><a href="#roles-and-teams">Roles and teams</a></li><li><a href="#project-owner">Project owner</a></li><li><a href="#stakeholders-and-users">Stakeholders and users</a></li><li><a href="#project-management-committee">Project management committee</a></li><li><a href="#team-leads">Team leads</a></li><li><a href="#contributors">Contributors</a></li><li><a href="#resources">Resources</a></li><li><a href="#projects-repository">Projects repository</a></li><li><a href="#project-boards">Project boards</a></li><li><a href="#master-projects-board">Master projects board</a></li><li><a href="#process">Process</a></li><li><a href="#overview">Overview</a></li><li><a href="#proposal">Proposal</a></li><li><a href="#triage">Triage</a></li><li><a href="#approval">Approval</a></li><li><a href="#budgeting">Budgeting</a></li><li><a href="#work">Work</a></li><li><a href="#starting-work">Starting work</a></li><li><a href="#stopping-work">Stopping work</a></li><li><a href="#requesting-help">Requesting help</a></li><li><a href="#review">Review</a></li><li><a href="#closure">Closure</a></li><li><a href="#closing-as-delivered">Closing as delivered</a></li><li><a href="#closing-as-aborted">Closing as aborted</a></li><li><a href="#closing-as-deferred">Closing as deferred</a></li><li><a href="#closing-as-superseded">Closing as superseded</a></li><li><a href="#compensation">Compensation</a></li></ul></details></nav>

<div class="wiki-recovered-article" lang="en">

This article documents the project management process used within the Bisq DAO.

<span class="wiki-legacy-anchor" id="Purpose" aria-hidden="true">
</span>

## Purpose {#purpose}

The purpose of the project management process is to ensure we:

- work on what\'s most important,
- finish what we start,
- stay within our budget, and
- don\'t spread ourselves too thin.

<span class="wiki-legacy-anchor" id="Philosophy" aria-hidden="true">
</span>

## Philosophy {#philosophy}

<span class="wiki-legacy-anchor" id="Most_work_is_project_work" aria-hidden="true">
</span>

### Most work is project work {#most-work-is-project-work}

Many efforts under the Bisq DAO require multiple tasks to be carried out by multiple contributors, possibly across multiple <span class="wiki-link-gap">teams <small>[unrecovered article: :Category:Teams]</small></span> and a span of time. Such efforts are best managed as *projects* having a beginning and an end, with clear criteria for delivery and a strong owner who takes responsibility for its success.

<span class="wiki-legacy-anchor" id="Identifying_candidate_projects" aria-hidden="true">
</span>

### Identifying candidate projects {#identifying-candidate-projects}

Good examples of candidate projects include:

- Adding a new feature or making a major enhancement to the Bisq client
- Introducing a new process within the Bisq DAO or significantly changing an existing one

Non-examples include:

- Typo fixes
- Minor enhancements and bug fixes
- Carrying out the regular duties of a given [role](../roles/)

It is ultimately a judgement call whether a given effort should be managed as a project. Here are a few rules of thumb:

- Does it require multiple tasks? It\'s probably a project.
- Does it require people other than yourself to take action? It\'s probably a project.
- Does it require documentation and/or promotion to make sure people know about it? It\'s probably a project.

Work that starts out as a single task may evolve to become a project, and that\'s fine. But by thinking ahead a little, we can often identify projects up front and better manage them as a result.

<span class="wiki-legacy-anchor" id="Good_project_management_scales" aria-hidden="true">
</span>

### Good project management scales {#good-project-management-scales}

A primary goal of the project management process is to help the DAO scale. We want many contributors collaborating on many efforts in parallel with minimal management. To achieve this, the process must have a bottom-up aspect in which any contributor can propose a project and any stakeholder can participate in approving it, and it must also have a top-down aspect for allocating budget to the most important projects. The approach laid out here is designed to strike that balance.

<span class="wiki-legacy-anchor" id="Roles_and_teams" aria-hidden="true">
</span>

## Roles and teams {#roles-and-teams}

<span class="wiki-legacy-anchor" id="Project_owner" aria-hidden="true">
</span>

### Project owner {#project-owner}

A project owner:

- is responsible for the delivery of a given project
- is usually the same contributor that proposes the project
- attends review meetings and reports on the project(s) they are responsible for

<span class="wiki-legacy-anchor" id="Stakeholders_and_users" aria-hidden="true">
</span>

### Stakeholders and users {#stakeholders-and-users}

<p>DAO <a href="../stakeholder/">stakeholders</a> and Bisq users are responsible for providing approval feedback on project proposals.</p>
<span id="Committee" class="wiki-legacy-anchor" aria-hidden="true"></span>

<span class="wiki-legacy-anchor" id="Project_management_committee" aria-hidden="true">
</span>

### Project management committee {#project-management-committee}

The [@bisq-network/pmc](https://github.com/orgs/bisq-network/teams/pmc) is responsible for the overall project management process, including:

- triaging new project proposals
- accepting or rejecting proposals per stakeholder approval
- leading project review calls

<span class="wiki-legacy-anchor" id="Team_leads" aria-hidden="true">
</span>

### Team leads {#team-leads}

[@bisq-network/team-leads](https://github.com/orgs/bisq-network/teams/team-leads) are responsible for prioritizing accepted projects by allocating budget to them.

<span class="wiki-legacy-anchor" id="Contributors" aria-hidden="true">
</span>

### Contributors {#contributors}

Contributors are responsible for performing the tasks necessary to deliver a project.

<span class="wiki-legacy-anchor" id="Resources" aria-hidden="true">
</span>

## Resources {#resources}

<span class="wiki-legacy-anchor" id="Projects_repository" aria-hidden="true">
</span>

### Projects repository {#projects-repository}

Projects are managed as GitHub Issues at [https://github.com/bisq-network/projects/issues](https://github.com/bisq-network/projects/issues). The [issue template](https://github.com/bisq-network/projects/blob/master/.github/ISSUE_TEMPLATE/project-proposal.md) there defines what a well-formed project proposal should include.

<span class="wiki-legacy-anchor" id="Project_boards" aria-hidden="true">
</span>

### Project boards {#project-boards}

An approved project may have its own dedicated project board at [https://github.com/orgs/bisq-network/projects](https://github.com/orgs/bisq-network/projects) for the purpose of tracking individual tasks. Otherwise, tasks may be tracked as simple checkboxes in the project issue description or by whatever means the project owner sees fit (e.g. an external kanban board); in general, however, it is preferred that everything is managed within GitHub Issues.

<span class="wiki-legacy-anchor" id="Master_projects_board" aria-hidden="true">
</span>

### Master projects board {#master-projects-board}

The master projects board is available at [https://github.com/orgs/bisq-network/projects/3](https://github.com/orgs/bisq-network/projects/3) and provides an overview of all projects and their status.

<span class="wiki-legacy-anchor" id="Process" aria-hidden="true">
</span>

## Process {#process}

<span class="wiki-legacy-anchor" id="Overview" aria-hidden="true">
</span>

### Overview {#overview}

Anyone may **propose** a project so long as they are prepared to *own* it. Each new proposal goes through **triage** and, if *well-formed*, moves on to stakeholder **approval** where it is *accepted* or *rejected* on its merits. An accepted project is allocated **budget** according to its priority and is subject to regular **review** until the project is **closed** as *delivered* or *aborted*.

<span class="wiki-legacy-anchor" id="Proposal" aria-hidden="true">
</span>

### Proposal {#proposal}

To create a well-formed project proposal:

1. Create a [new issue in the projects repository](https://github.com/bisq-network/projects/issues/new/choose)
2. Choose the <code class="wiki-source-code" id="source-code-1">Project proposal</code> issue template
3. Adhere to the format of the template and fill out its content according to the instructions within

New project proposal issues are automatically labeled as <code class="wiki-source-code" id="source-code-2">a:proposal</code> and <code class="wiki-source-code" id="source-code-3">needs:triage</code>.

<span class="wiki-legacy-anchor" id="Triage" aria-hidden="true">
</span>

### Triage {#triage}

A member of the project management committee will add each new project proposal to the <code class="wiki-source-code" id="source-code-4">Backlog</code> column of the master projects board and assess whether it is well-formed according to the issue template.

If a proposal is well-formed, the triager will:

- remove the <code class="wiki-source-code" id="source-code-5">needs:triage</code> label,
- add the <code class="wiki-source-code" id="source-code-6">needs:approval</code> label and
- add a corresponding comment.

If a proposal is not well-formed, the triager will:

- add the <code class="wiki-source-code" id="source-code-7">needs:info</code> label and a comment asking the submitter to provide the missing information, or
- add the <code class="wiki-source-code" id="source-code-8">was:invalid</code> label and close the issue immediately with a corresponding comment.

<span class="wiki-legacy-anchor" id="Approval" aria-hidden="true">
</span>

### Approval {#approval}

Like any DAO [proposal](../proposals/), anyone may add comments providing feedback on a project proposal and may react to the proposal issue description with thumbs-up, thumbs-down or confused face emoji to indicate whether they believe the project should be approved. The goal is to arrive at a [rough consensus](https://en.wikipedia.org/wiki/Rough_consensus) whether to approve the project.

Taking a project proposal through formal stakeholder [voting](../proposals/#submit-to-the-dao-if-needed) should be avoided unless there is significant contention.

Once consensus has been achieved, a member of the project management committee will:

- remove the <code class="wiki-source-code" id="source-code-9">a:proposal</code> and <code class="wiki-source-code" id="source-code-10">needs:approval</code> labels
- add the <code class="wiki-source-code" id="source-code-11">has:approval</code> or <code class="wiki-source-code" id="source-code-12">was:rejected</code> label as appropriate
- add a comment indicating the status change
- close the issue if rejected

<span class="wiki-legacy-anchor" id="Budgeting" aria-hidden="true">
</span>

### Budgeting {#budgeting}

Acceptance of a project is distinct from allocating budget to it. Acceptance indicates that a project is worth doing; allocating budget indicates that a project *has priority.* Team leads are responsible for reviewing accepted projects and adding the <code class="wiki-source-code" id="source-code-13">has:budget</code> label when budget has been allocated.

<span class="wiki-legacy-anchor" id="Work" aria-hidden="true">
</span>

### Work {#work}

<span class="wiki-legacy-anchor" id="Starting_work" aria-hidden="true">
</span>

#### Starting work {#starting-work}

Work may be started at any time on a project, even prior to approval and budgeting, but contributors should have no expectation of cooperation or compensation until the project has both.

In any case, when work starts, the project owner should move the project to the <code class="wiki-source-code" id="source-code-14">In progress</code> column of the master projects board and add a corresponding comment.

If work is being resumed after a period of inactivity, the project owner should also remove any labels such as <code class="wiki-source-code" id="source-code-15">is:blocked</code> or <code class="wiki-source-code" id="source-code-16">is:stalled</code>.

<span class="wiki-legacy-anchor" id="Stopping_work" aria-hidden="true">
</span>

#### Stopping work {#stopping-work}

When work stops for an extended period the project owner should move the project issue to the <code class="wiki-source-code" id="source-code-17">Backlog</code> column with a corresponding comment. If the project is blocked in some way, the <code class="wiki-source-code" id="source-code-18">is:blocked</code> label should be applied. If work has stalled due to inactivity, the <code class="wiki-source-code" id="source-code-19">is:stalled</code> label should be applied.

<span class="wiki-legacy-anchor" id="Requesting_help" aria-hidden="true">
</span>

#### Requesting help {#requesting-help}

If a project cannot progress because a certain skill set is not available within the current team of contributors, the project owner should add the <code class="wiki-source-code" id="source-code-20">needs:help</code> label with a corresponding comment that explains what kind of help is needed.

<span class="wiki-legacy-anchor" id="Review" aria-hidden="true">
</span>

### Review {#review}

***UPDATE:** These bi-weekly calls may not be the way to go. We might end up doing things more asynchronously through issue comments and perhaps a once-a-month project review call. See [https://github.com/bisq-network/proposals/issues/182#issuecomment-621167017](https://github.com/bisq-network/proposals/issues/182#issuecomment-621167017) for ongoing discussion.*

Approved projects are subject to a bi-weekly (once every two weeks) review call in which each project owner provides a brief summary of their project, including whether it is on or off track, blocked for any reason, at risk of exceeding its scope or budget, etc. See the [events calendar](../events-calendar/) for details.

<span class="wiki-legacy-anchor" id="Closure" aria-hidden="true">
</span>

### Closure {#closure}

<span class="wiki-legacy-anchor" id="Closing_as_delivered" aria-hidden="true">
</span>

#### Closing as delivered {#closing-as-delivered}

Projects that meet their criteria for delivery will be closed with the <code class="wiki-source-code" id="source-code-21">was:delivered</code> label and a corresponding comment.

<span class="wiki-legacy-anchor" id="Closing_as_aborted" aria-hidden="true">
</span>

#### Closing as aborted {#closing-as-aborted}

Projects may be aborted prior to delivery for a variety of reasons, including abandonment by project owner, consensus that the effort is no longer worth pursuing, exceeding allocated budget, being blocked by external factors, and so forth. Such projects will be closed with the <code class="wiki-source-code" id="source-code-22">was:aborted</code> label and a corresponding comment.

<span class="wiki-legacy-anchor" id="Closing_as_deferred" aria-hidden="true">
</span>

#### Closing as deferred {#closing-as-deferred}

Projects that are blocked or stalled for an extended period of time may be closed with the <code class="wiki-source-code" id="source-code-23">was:deferred</code> label and a corresponding comment. Deferral is appropriate if the project is something that we\'d still like to do, but see no near-term path to actually working on. A deferred project may be reopened when it becomes feasible to work on it, but any prior budget allocation should be assumed invalid.

<span class="wiki-legacy-anchor" id="Closing_as_superseded" aria-hidden="true">
</span>

#### Closing as superseded {#closing-as-superseded}

Projects may be closed with the <code class="wiki-source-code" id="source-code-24">was:superseded</code> label when another project becomes a more appropriate vehicle for getting the same or similar work done. When closing, a comment should be added providing a link to the superseding project.

<span class="wiki-legacy-anchor" id="Compensation" aria-hidden="true">
</span>

### Compensation {#compensation}

Ideally, compensation should be requested after a project has been closed, but this is not always practical. A contributor may request compensation for work on a given project prior to that project\'s closure assuming that the work in question has itself been meaningfully delivered. For example, if a [Growth Team](../growth-team/) project involves creating and publishing an instructional video, the video creator may request compensation for their work assuming the video has been published and promoted to its intended audience even if the larger growth project is still in progress.

</div>
