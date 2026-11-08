---
title: "Manual payout"
slug: "wiki/manual-payout"
tableOfContents: false
---

<nav data-pagefind-ignore class="wiki-source-toc" aria-label="Article sections"><details open><summary>On this page</summary><ul><li><a href="#overview">Overview</a></li><li><a href="#using-bisq-s-manual-payout-tool">Using Bisq&#x27;s Manual Payout tool</a></li><li><a href="#fill-in-inputs">Fill in inputs</a></li><li><a href="#import-export-to-trade-participants">Import/Export to trade participants</a></li><li><a href="#sign">Sign</a></li><li><a href="#build-broadcast">Build &amp; Broadcast</a></li></ul></details></nav>

<div class="wiki-recovered-article" lang="en"><span class="wiki-legacy-anchor" id="Overview" aria-hidden="true"></span><h2 id="overview"> Overview </h2>
<p>Funds for a Bisq trade are locked in a 2-of-2 multisig that is controlled only by the two parties involved. Bisq normally does all the work to sign and publish the payout at trade completion. However sometimes a trade can fail due to unforseen circumstances, leaving the funds stranded in the 2-of-2 multisig. When this happens, a Manual Payout may be necessary.</p>
<span class="wiki-legacy-anchor" id="Using_Bisq&#x27;s_Manual_Payout_tool" aria-hidden="true"></span><h2 id="using-bisq-s-manual-payout-tool"> Using Bisq's Manual Payout tool </h2>
<p>The emergency payout tool is in Bisq, if you do a CTRL-G it will open.</p>
<p>The purpose of the tool is to allow owners of a 2of2 multisig to issue a transaction which pays out the funds to their addresses. The tool is designed to be used in collaboration with mediators but it could conceivably be used by the multisig key holders alone.</p>
<p>The tool operates in 4 steps:</p>
<ol>
<li>Fill input information;</li>
<li>Import/export details to trade participants;</li>
<li>Sign using each holder's private key;</li>
<li>Build and broadcast the payout.</li>
</ol>
<span class="wiki-legacy-anchor" id="Fill_in_inputs" aria-hidden="true"></span><h3 id="fill-in-inputs"> Fill in inputs </h3>
<p>Input information can be either filled in manually using information from the Bisq trade's Json contract, or for ease of use the same information can be imported from the Mediation ticket.</p>
<ul>
<li>If filling in manually, all fields on the "Inputs" tab must be entered.</li>
<li>If importing from Mediation, choose the Import menu option then pick your mediation ticket from the drop down list and press "Import from mediation ticket".</li>
</ul>
<p>One important thing which the tool prompts you for is the "amountInMultisig" field. This value is not known in Bisq, so the user (or Mediator) has to look it up on a Blockchain explorer and enter it completely accurately into the tool. If it is incorrect in any way the resultant transaction will fail. (Reason for this is that Segwit includes the amount as part of the signature inputs).</p>
<span class="wiki-legacy-anchor" id="Import/Export_to_trade_participants" aria-hidden="true"></span><h3 id="import-export-to-trade-participants"> Import/Export to trade participants </h3>
<p>Once accurate input information has been entered, the same information needs to be passed to both owners of the multisig keys (the two traders). This is what the "Export" menu item is for. It translates the input field data into a code which can be DM'd or emailed to the participants, which they can enter via the "Import" menu (&amp; "Import from String" option).</p>
<p>The important thing is that each participant have EXACTLY the same information entered into the Inputs section of the tool. If there is any discrepancy between the inputs that each participant signs, then the transaction will be invalid.</p>
<p>Note that if the two traders have access to the mediation ticket they can Import from the ticket themselves. But it is generally best for Mediator to Export their filled in fields to both traders (via DM).</p>
<span class="wiki-legacy-anchor" id="Sign" aria-hidden="true"></span><h3 id="sign"> Sign </h3>
<p>Both participants have to sign the inputs. This is done from the Sign menu, for convenience there is a "Locate key in wallet" button which will scan the user's wallet for a key which matches the inputs. "Generate signature" will sign the inputs using the key at the top of the screen. Users could alternatively choose to locate the key themselves, and paste it into the "privateKeyHex" field before doing "Generate signature".</p>
<p>Once the signature has been generated each participant should send it to the person who will build and broadcast the transaction (usually the Mediator).</p>
<span class="wiki-legacy-anchor" id="Build_&amp;_Broadcast" aria-hidden="true"></span><h3 id="build-broadcast"> Build &amp; Broadcast </h3>
<p>Once both signatures have been provided, they can be pasted into the Build screen at which time the "Build" button at the bottom of that screen should be pressed. It will generate the TxID and transaction hex into the text area. The transaction hex can be verified using your own tools* or simply broadcast to the network using the "Broadcast" button (or alternatively send it yourself using your Bitcoin node).</p>
<ul>
<li>NB: "<a href="https://bitaps.com/broadcast" rel="noopener noreferrer">https://bitaps.com/broadcast</a>" has a "Preview" feature that tests if the transaction is acceptable to the mempool before actually sending it. Any errors in the transaction will be listed, or if it is good it will say "Test mempool transaction accepted" and give the option to broadcast it at that point.</li>
</ul>
</div>
