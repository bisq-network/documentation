---
title: "Making a compensation request"
slug: "wiki/making-a-compensation-request"
tableOfContents: false
---

<nav data-pagefind-ignore class="wiki-source-toc" aria-label="Article sections"><details><summary>On this page</summary><ul><li><a href="#preliminary-considerations">Preliminary considerations</a></li><li><a href="#conventions">Conventions</a></li><li><a href="#eligible-work">Eligible work</a></li><li><a href="#create-your-compensation-request">Create your compensation request</a></li><li><a href="#1-open-a-new-issue">1. Open a new issue</a></li><li><a href="#2-list-your-work-in-the-issue">2. List your work in the issue</a></li><li><a href="#tips-on-making-a-convincing-request">Tips on making a convincing request</a></li><li><a href="#tips-on-valuing-your-work">Tips on valuing your work</a></li><li><a href="#3-submit-your-github-issue-and-address-feedback">3. Submit your GitHub issue and address feedback</a></li><li><a href="#4-submit-your-request-as-a-dao-proposal">4. Submit your request as a DAO proposal</a></li><li><a href="#5-add-a-comment-to-your-github-compensation-request-with-your-bsq-transaction-id">5. Add a comment to your GitHub compensation request with your BSQ transaction ID</a></li><li><a href="#fees-and-other-costs">Fees and other costs</a></li></ul></details></nav>

<div class="wiki-recovered-article" lang="en"><p>Once you've done some work on the Bisq project, you may want to <strong>make a compensation request</strong> for BSQ.</p>
<span class="wiki-legacy-anchor" id="Preliminary_considerations" aria-hidden="true"></span><h2 id="preliminary-considerations"> Preliminary considerations </h2>
<span class="wiki-legacy-anchor" id="Conventions" aria-hidden="true"></span><h3 id="conventions"> Conventions </h3>
<p>Compensation requests are generally made for work done in the current DAO cycle—work delivered after the last proposal phase and before the end of the current one—but you can make a request for work done any time in the past as long as you have records of it.</p>
<p>Keep in mind that compensation requests will need to garner a simple majority approval in DAO voting, and before that, team leads will do an initial review of your request. For this to go well, you won't want your compensation request to be the first interaction you have with other Bisq contributors.</p>
<p>Ideally, you will have already had conversations with team leads and other contributors to:</p>
<ul>
<li>make them aware of what you want to do</li>
<li>get others' feedback on your plans</li>
<li>get an idea of how valuable your contribution is to the project(so your compensation request is reasonable to you <em>and</em> to stakeholders)
<ul>
<li>don't hesitate to suggest a ballpark cost before getting started, if one is not already suggested by other contributors; this helps avoid surprises and hurt feelings at compensation request time</li>
</ul></li>
</ul>
<p>It would be even better to have public threads (issues, pull requests, other discussion threads) tracking your work, progress, and outcomes to help stakeholders put your compensation request into perspective. This is somewhat intuitive for development-related tasks, but non-development contributors should strongly consider making issues in the appropriate repositories or forums too.</p>
<p>For more guidance on how you can get started contributing to Bisq, check out the <a href="../contributor-checklist/">contributor checklist</a>.</p>
<aside class="wiki-admonition" role="note"><p><strong>Warning</strong></p><p>Please try not to nickel-and-dime in your compensation request. Charging top dollar for fly-by-night code reviews and minor text corrections are usually seen as red flags, and will probably not be received very well by reviewers and voters.</p>
</aside>
<span class="wiki-legacy-anchor" id="Eligible_work" aria-hidden="true"></span><h3 id="eligible-work"> Eligible work </h3>
<p>Compensation requests can only be made for <strong>delivered work</strong>: work that has been available to users at the time compensation for it is being requested (see <a href="https://github.com/bisq-network/proposals/issues/19" rel="noopener noreferrer">a more elaborate explanation of this notion here</a>). Work that’s planned or in-progress is not eligible for compensation.</p>
<p>Generally, work merged to the master branch of a repository can be considered delivered (if applicable).</p>
<p>Reporting bugs and/or opening issues generally does not qualify as delivered work since, strictly speaking, opening an issue does not usually <em>deliver</em> anything. With that said, there are occasional exceptions to this, so as suggested above, please keep other contributors informed about what you're up to in order to minimize misunderstandings.</p>
<span class="wiki-legacy-anchor" id="Create_your_compensation_request" aria-hidden="true"></span><h2 id="create-your-compensation-request"> Create your compensation request </h2>
<p>Making a compensation request requires 2 steps:</p>
<ol>
<li>opening an issue on GitHub</li>
<li>submitting the compensation request to the Bisq DAO</li>
</ol>
<p>Issuance and voting takes place on Bisq, but metadata (e.g. compensation request details) is stored on GitHub to decrease the data storage burden on the Bisq and Bitcoin networks.</p>
<p>If you wish to request compensation for the current cycle, please make a compensation request issue no later than one week prior to the end of the current cycle's proposal phase. This allows time for team leads to do an initial review and offer feedback. Reminders about this deadline are sent in the [<a href="https://github.com/bisq-network/bisq/discussions" rel="noopener noreferrer">discussions area on GitHub</a>] and on [<a href="https://bisq.chat" rel="noopener noreferrer">Matrix</a>] in the #compensation channel.</p>
<span class="wiki-legacy-anchor" id="1._Open_a_new_issue" aria-hidden="true"></span><h3 id="1-open-a-new-issue"> 1. Open a new issue </h3>
<figure class="wiki-source-image" id="source-image-1"><a href="../../media/wiki/b179d88e3a2e3a92baa24039f745b889f23823c7c33c7b0d61143d0ae88bc60e.png"><img alt="Opening a new compensation request issue on GitHub." decoding="async" height="749" loading="lazy" src="../../media/wiki/b179d88e3a2e3a92baa24039f745b889f23823c7c33c7b0d61143d0ae88bc60e.png" width="800"></a><figcaption>Opening a new compensation request issue on GitHub.<br><small>Historical thumbnail; original resolution not recovered. <a href="../../recovered-media/">Provenance catalogue</a>.</small></figcaption></figure>
<p>The issue should go in the <a href="https://github.com/bisq-network/compensation/issues" rel="noopener noreferrer">bisq-network/compensation repository</a>, and it should be titled in the following format:</p>
<p><code class="wiki-source-code" id="source-code-1">For Cycle N</code>, where N is the number of the current cycle</p>
<p>You must stick to this convention in order for the compensation request parsing bot to properly parse your request.</p>
<aside class="wiki-admonition" role="note"><p><strong>Note</strong></p><p>Compensation requests are assumed to be ready for review as soon as they're created. If you would prefer to delay review of your request, preface your issue's title with <code class="wiki-source-code" id="source-code-2">[WIP]</code> so that people (and bots) know to ignore it. Then, when your request is ready for review, just remove <code class="wiki-source-code" id="source-code-3">[WIP]</code> from the issue title.</p>
</aside>
<span class="wiki-legacy-anchor" id="2._List_your_work_in_the_issue" aria-hidden="true"></span><h3 id="2-list-your-work-in-the-issue"> 2. List your work in the issue </h3>
<p>Compensation requests must be made in a very particular format in order for them to be valid. This is because a bot is used to parse requests to automatically aggregate work done for reporting and budgeting.</p>
<p>The placeholder text of the issue you just opened tells you everything you need to know.</p>
<ul>
<li>In the "Summary" section, fill out all the numbers in brackets (<strong>required</strong>)</li>
<li>In the "Contributions Delivered" section, list your contributions as rows in the table (<strong>required</strong>)</li>
<li>In the "Contributions in Progress" section, list contributions you're expecting to deliver in future cycles</li>
</ul>
<span class="wiki-legacy-anchor" id="Tips_on_making_a_convincing_request" aria-hidden="true"></span><h4 id="tips-on-making-a-convincing-request"> Tips on making a convincing request </h4>
<p>The onus is on <strong>you</strong> to convince Bisq stakeholders what you did, how much it’s worth, and why it’s valuable. Voters will be evaluating what you put in this GitHub issue to determine whether or not you should be issued the BSQ you're asking for.</p>
<p>In order to make your case as strong as possible, make sure to:</p>
<ul>
<li>Include as many links to issues, pull requests, and other "evidence" for any work you want to be compensated for</li>
<li>Comments that help explain what the work is, why it is valuable, etc.</li>
<li>Links to role reports, if you hold any roles in the Bisq network</li>
</ul>
<p>As mentioned above, this is a big reason that it’s important that everything you do for Bisq be as public, documented, and verifiable as possible, and that everything you do has positive consensus with multiple stakeholders so you know you’re not wasting your time.</p>
<p>Even then, not all stakeholders will be familiar with your work, so it’s important to be as thorough as you can when making a compensation request so there’s enough context for those unfamiliar with your work to make an informed vote.</p>
<p>Feel free to check out <a href="https://github.com/bisq-network/compensation/issues?q=is%3Aissue+is%3Aclosed" rel="noopener noreferrer">old compensation requests</a> if you're unsure about anything.</p>
<span class="wiki-legacy-anchor" id="Tips_on_valuing_your_work" aria-hidden="true"></span><h4 id="tips-on-valuing-your-work"> Tips on valuing your work </h4>
<p>Valuing work is a judgment call. There's no precise way to go about valuing your work, but here are some pointers:</p>
<ul>
<li>work should be valued based on the value of the contribution you made, not on the raw time you spent on it</li>
<li>if you are unsure about the value of your contribution, consider what you would charge for your work if you did it as a freelancer</li>
</ul>
<p>Ideally, especially if you're a new contributor, consider discussing compensation for particular tasks you're working on with another contributor who's been around longer to see if your expectations align with theirs. You can also browse older requests for examples of what people in the past were paid for similar work.</p>
<div>
</div>
<span class="wiki-legacy-anchor" id="3._Submit_your_GitHub_issue_and_address_feedback" aria-hidden="true"></span><h2 id="3-submit-your-github-issue-and-address-feedback"> 3. Submit your GitHub issue and address feedback </h2>
<p>Upon submitting your compensation request issue (or removing <code class="wiki-source-code" id="source-code-4">[WIP]</code> from the title), a bot will parse it to evaluate formatting. If it's not valid, the bot will add a <code class="wiki-source-code" id="source-code-5">parsed:invalid</code> label to the issue and leave a comment with a reason. Please edit your issue until the bot adds a <code class="wiki-source-code" id="source-code-6">parsed:valid</code> label. If the bot does not work and it does not produce any label, continue normally.</p>
<p>You may receive feedback from other contributors that needs to be addressed. After waiting for a prudential time, you can submit your request to the Bisq DAO.</p>
<span class="wiki-legacy-anchor" id="4._Submit_your_request_as_a_DAO_proposal" aria-hidden="true"></span><h2 id="4-submit-your-request-as-a-dao-proposal"> 4. Submit your request as a DAO proposal </h2>
<p>Once a team lead has given you the go-ahead, it's time to submit your request to the DAO.</p>
<p>In Bisq, go to <code class="wiki-source-code" id="source-code-7">DAO</code> &gt; <code class="wiki-source-code" id="source-code-8">Governance</code> &gt; <code class="wiki-source-code" id="source-code-9">Make Proposal</code>.</p>
<figure class="wiki-source-image" id="source-image-2"><a href="../../media/wiki/2ae656a8695472129edacf8f164a95447d526b7cfc61235ac0dada9daffede8c.png"><img alt="Submitting a compensation request to the DAO." decoding="async" height="707" loading="lazy" src="../../media/wiki/2ae656a8695472129edacf8f164a95447d526b7cfc61235ac0dada9daffede8c.png" width="1200"></a><figcaption>Submitting a compensation request to the DAO.<br><small>Historical thumbnail; original resolution not recovered. <a href="../../recovered-media/">Provenance catalogue</a>.</small></figcaption></figure>
<ol>
<li>Select "Compensation request" in the dropdown menu</li>
<li>Specify your GitHub handle, exactly like it is on GitHub</li>
<li>Replace the <code class="wiki-source-code" id="source-code-10">#</code> with the number of your GitHub issue (for example, if your compensation request’s GitHub URL is <a href="https://github.com/bisq-network/compensation/issues/999" rel="noopener noreferrer">https://github.com/bisq-network/compensation/issues/999</a>, the URL in your DAO compensation request should be <a href="https://bisq.network/dao-compensation/999" rel="noopener noreferrer">https://bisq.network/dao-compensation/999</a>. Don’t copy the GitHub link directly—it won’t work!)</li>
<li>Specify the amount of BSQ you're requesting</li>
</ol>
<div>
</div>
<aside class="wiki-admonition" role="note"><p><strong>Note</strong></p><p>Bisq may not use GitHub forever. But the Bitcoin blockchain is forever, and proposal URLs cannot be changed—the Bitcoin transaction corresponding to a Bisq DAO proposal includes a hash of the proposal’s data object, which includes the proposal URL. This is why Bisq proposals require a URL with a domain name that Bisq controls: if proposal data ever needs to be migrated, the links can remain the same.</p>
</aside>
<p>When you’re ready, click <code class="wiki-source-code" id="source-code-11">Make proposal</code> to confirm your proposal for voting in the current cycle. <strong>Proposal data cannot be edited, so make sure everything is correct.</strong></p>
<span class="wiki-legacy-anchor" id="5._Add_a_comment_to_your_GitHub_compensation_request_with_your_BSQ_transaction_ID" aria-hidden="true"></span><h2 id="5-add-a-comment-to-your-github-compensation-request-with-your-bsq-transaction-id"> 5. Add a comment to your GitHub compensation request with your BSQ transaction ID </h2>
<p>To ensure that someone else is not claiming for your contributions we ask that you post your BSQ transaction ID as a comment on the GitHub issue.</p>
<p>You can access your BSQ transaction ID for the compensation request in the Bisq application by visiting DAO &gt; BSQ Wallet &gt; Transactions</p>
<p>Please copy your transaction ID and paste it as comment on your GitHub issue thus linking Bisq compensation request with the GitHub issue.</p>
<span class="wiki-legacy-anchor" id="Fees_and_other_costs" aria-hidden="true"></span><h3 id="fees-and-other-costs"> Fees and other costs </h3>
<p>A compensation request is a type of proposal, and proposals cost a fee to make in the Bisq DAO. The Bisq 1 v1.10.11 source sets a default proposal fee of 2 BSQ; DAO parameters can change, so check the current fee shown in the application before submitting. Since a compensation request is intended to issue new BSQ, you’ll also need to include a small amount of bitcoin to be colored into BSQ if your proposal is accepted—100 satoshis × [requested BSQ amount]. See more details in the <a href="../dao-user-reference/#proposal-phase">User Reference</a>.</p>
<p>Also remember that Bisq DAO proposals are Bitcoin transactions, so it costs mining fees and takes time for them to be confirmed. Consider watching mining fees to broadcast your proposal at a reasonable cost. Waiting until late in the proposal phase to submit may cause it to not be confirmed in time.</p>
<aside class="wiki-admonition" role="note"><p><strong>Note</strong></p><p>If you need to make a change, you can delete the proposal and make a new one while the proposal phase is still active, but you’ll need to pay the proposal fee again. Once the proposal phase is over, proposals cannot be added or removed until the next proposal phase.</p>
</aside>
<p>The BSQ and BTC is automatically added to your proposal transaction by Bisq, but the BTC needs to be in your Bisq BTC wallet at the time you submit your proposal. Keep in mind that you’ll also need some BSQ and BTC for the other phases (vote &amp; vote reveal).</p>
<p>When you successfully submit your proposal in the DAO, it’ll propagate across the Bisq peer-to-peer network and be ready for stakeholders to vote on in the voting phase. If your request is approved, you will see the BSQ you requested in your wallet after the voting phase is over.</p>
</div>
