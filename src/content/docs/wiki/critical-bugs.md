---
title: "Critical bugs"
slug: "wiki/critical-bugs"
tableOfContents: false
---

<nav data-pagefind-ignore class="wiki-source-toc" aria-label="Article sections"><details open><summary>On this page</summary><ul><li><a href="#what-is-a-critical-bug">What is a critical bug?</a></li><li><a href="#infrastructure">Infrastructure</a></li><li><a href="#board">Board</a></li><li><a href="#process">Process</a></li><li><a href="#identification">Identification</a></li><li><a href="#notification">Notification</a></li><li><a href="#assignment">Assignment</a></li><li><a href="#compensation">Compensation</a></li></ul></details></nav>

<div class="wiki-recovered-article" lang="en"><p>This article explains what <strong>critical bugs</strong> are and covers the process for identifying and fixing them.</p>
<span class="wiki-legacy-anchor" id="What_is_a_critical_bug?" aria-hidden="true"></span><h2 id="what-is-a-critical-bug"> What is a critical bug? </h2>
<p>A <a href="../glossary/#critical-bug">critical bug</a> is any bug or other issue that:</p>
<ul>
<li>impedes users from completing a <a href="../glossary/#core-use-case">core use case</a> in Bisq, and/or</li>
<li>repeatedly lands users in support, and/or</li>
<li>puts user funds or privacy at risk</li>
</ul>
<p>Critical bugs are by definition among the most important and highest priority tasks that can be worked on. The goal is to have zero outstanding critical bugs at any given time. Bisq developers should therefore consider working on critical bugs ahead of anything else.</p>
<span class="wiki-legacy-anchor" id="Infrastructure" aria-hidden="true"></span><h2 id="infrastructure"> Infrastructure </h2>
<span class="wiki-legacy-anchor" id="Board" aria-hidden="true"></span><h3 id="board"> Board </h3>
<p>The critical bugs board can be found at <a href="https://github.com/orgs/bisq-network/projects/7" rel="noopener noreferrer">https://github.com/orgs/bisq-network/projects/7</a>.</p>
<figure class="wiki-source-image" id="source-image-1"><a href="../../media/wiki/ba2dc83fbd94ad0723cf34ae7189030922931d73d27c19440ed8e488e3c3a3a8.png"><img alt="Critical bugs board" decoding="async" height="470" loading="lazy" src="../../media/wiki/ba2dc83fbd94ad0723cf34ae7189030922931d73d27c19440ed8e488e3c3a3a8.png" width="800"></a><figcaption>Critical bugs board<br><small>Historical thumbnail; original resolution not recovered. <a href="../../recovered-media/">Provenance catalogue</a>.</small></figcaption></figure>
<span class="wiki-legacy-anchor" id="Process" aria-hidden="true"></span><h2 id="process"> Process </h2>
<span class="wiki-legacy-anchor" id="Identification" aria-hidden="true"></span><h3 id="identification"> Identification </h3>
<p>Bisq maintainers are notified of new issues as they arrive in the <a href="https://github.com/bisq-network/bisq/issues" rel="noopener noreferrer">Bisq repository</a> and should apply the <code class="wiki-source-code" id="source-code-1">[https://github.com/bisq-network/bisq/labels/is%3Acritical is:critical]</code> label to any issue that fits the definition above.</p>
<p>Immediately after labeling a critical bug, the Bisq maintainer should add that issue to the <code class="wiki-source-code" id="source-code-2">To do</code> column of the board, sorting the issue according to its priority relative to the other issues in that column.</p>
<span class="wiki-legacy-anchor" id="Notification" aria-hidden="true"></span><h3 id="notification"> Notification </h3>
<p><em>Note (@cbeams): We may want to have maintainers add a comment to newly-indentified critical bugs mentioning <code class="wiki-source-code" id="source-code-3">@bisq-network/bisq-devs</code> and <code class="wiki-source-code" id="source-code-4">@bisq-network/support</code> so that those groups are made aware of the issue and are automatically subscribed to any updates on it. @ripcurlx to decide and update this section accordingly.</em></p>
<span class="wiki-legacy-anchor" id="Assignment" aria-hidden="true"></span><h3 id="assignment"> Assignment </h3>
<p>If you are a developer interested in working on a given critical bug, you should add a comment to the issue asking to be assigned to it. A Bisq maintainer will follow up with you and make the assignment as appropriate and will transition the issue to the <code class="wiki-source-code" id="source-code-5">In progress</code> column of the board. You should then proceed to put together a pull request that fixes the bug as per the usual <a href="../development-process/">Development Process</a>.</p>
<p>Once assigned to a critical bug, you should post comments on the issue indicating your progress and post <a href="../standup/">standup</a> updates about it each day you work on it. This allows other developers to help out if need be and keeps everyone in the loop. These updates also serve as documentation when you submit a compensation request for your work.</p>
<p>If you stop working on a critical bug before it has been fixed, you should indicate that explicitly via comment on the issue so the maintainer can remove your assignment and transition the issue back to <code class="wiki-source-code" id="source-code-6">To do</code> as appropriate.</p>
<span class="wiki-legacy-anchor" id="Compensation" aria-hidden="true"></span><h3 id="compensation"> Compensation </h3>
<p><a href="../glossary/">Delivered</a> <small class="wiki-link-gap">[section not recovered: Delivered]</small> work on critical bugs is eligible for <a href="../compensation/">compensation</a> under the Bisq DAO. In this case, delivered work could mean one of the following:</p>
<ul>
<li>the bug was fixed and the associated pull request has been merged into master</li>
<li>the bug was investigated and a fix has been documented, but cannot be implemented due to an external dependency e.g.: a JDK / OpenJFX update is required.</li>
</ul>
</div>
