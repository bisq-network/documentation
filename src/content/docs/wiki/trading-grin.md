---
title: "Trading GRIN"
slug: "wiki/trading-grin"
tableOfContents: false
---

<nav data-pagefind-ignore class="wiki-source-toc" aria-label="Article sections"><details open><summary>On this page</summary><ul><li><a href="#buying-grin">Buying GRIN</a></li><li><a href="#selling-grin">Selling GRIN</a></li><li><a href="#generate-payment-proof">Generate payment proof</a></li><li><a href="#guidance-for-dispute-agents">Guidance for dispute agents</a></li><li><a href="#faq">FAQ</a></li></ul></details></nav>

<div class="wiki-recovered-article" lang="en"><p><strong><a href="https://github.com/mimblewimble/grin/blob/master/doc/grin4bitcoiners.md" rel="noopener noreferrer">GRIN</a></strong> is a minimalistic, lightweight cryptocurrency, implementing the Mimblewimble protocol for a unique balance of privacy and scalability.</p>
<span class="wiki-legacy-anchor" id="Buying_GRIN" aria-hidden="true"></span><h2 id="buying-grin"> Buying GRIN </h2>
<p>Buying GRIN is like buying any other <span class="wiki-link-gap">altcoin <small>[unrecovered article: altcoin]</small></span>. It requires a GRIN <a href="../creating-a-payment-account/#creating-an-altcoin-account">payment account</a> in Bisq. The GRIN slatepack address to be used is issued by your GRIN wallet.</p>
<p>When buying, you should keep your GRIN wallet open to receive the payment. If that is not feasible, you can also receive GRIN by exchanging slatepack messages with the seller in trader chat. More information about GRIN transactions can be found <a href="https://docs.grin.mw/about-grin/transactions" rel="noopener noreferrer">here</a>.</p>
<p>Once you have received the GRIN, you should confirm the receipt on Bisq so that escrowed BTC funds can be released to you and your peer.</p>
<span class="wiki-legacy-anchor" id="Selling_GRIN" aria-hidden="true"></span><h2 id="selling-grin"> Selling GRIN </h2>
<p>The trader <em>selling</em> GRIN (BTC buyer) will send GRIN to the counterparty's slatepack address using their wallet of choice once the Bisq trade deposit is confirmed.</p>
<p>The amount and recipient address is displayed on-screen when you are prompted to do the transfer.</p>
<p>Example of sending using grin-wallet:</p>
<pre><code class="wiki-source-code" id="source-code-1">./grin-wallet -r "https://grinnode.live:3413" send -d grin1dxnzk3gfnqz69va64ut7jafs7u72dtyswpzxekdgmlurkng9ctfqf9yqu5 10.123456789</code></pre>
<p>The GRIN <em>buyer</em> will confirm the trade in Bisq once they are satisfied that they received the correct amount of GRIN.</p>
<p>You must be able to generate <a href="https://docs.grin.mw/getting-started/wallet-handbook/#proof" rel="noopener noreferrer">proof of payment</a> in case of a dispute. Otherwise, Confidential Transactions make it impossible for a third party to verify if a payment was made. GRIN sellers must be able to generate a transaction's proof for mediators or arbitrators in case of disputes.</p>
<p><strong>At this moment the only wallet capable of generating and verifying payment proofs is the <a href="https://github.com/mimblewimble/grin-wallet/releases" rel="noopener noreferrer">CLI wallet</a> developed by the GRIN core team.</strong></p>
<aside class="wiki-admonition" role="note"><p><strong>Warning</strong></p><p>Failing to provide the proof to a dispute agent will likely result in losing the dispute case.</p>
</aside>
<p>See how to generate payment proof below.</p>
<span class="wiki-legacy-anchor" id="Generate_payment_proof" aria-hidden="true"></span><h2 id="generate-payment-proof"> Generate payment proof </h2>
<p>Only the person sending the GRIN funds can create payment proof.</p>
<p>First, list your transactions using <code class="wiki-source-code" id="source-code-2">txs</code>, and look for the one you want to issue proof on.</p>
<p>The command <code class="wiki-source-code" id="source-code-3">export_proof</code> will generate a file containing information to prove the details to the recipient or a mediator.</p>
<p>For the purpose of these examples, a public node provided by <a href="https://grinnode.live" rel="noopener noreferrer">https://grinnode.live</a> is used. If you have access to your own node running locally, you can remove the -r option completely or change it to a different http endpoint.</p>
<p>Example:</p>
<pre><code class="wiki-source-code" id="source-code-4">
    ./grin-wallet -r "https://grinnode.live:3413" txs
&#10;    ./grin-wallet -r "https://grinnode.live:3413" export_proof -i 2 proof2.txt
</code></pre>
<p>Contents of <code class="wiki-source-code" id="source-code-5">proof2.txt</code>:</p>
<p><code>   {</code><br>
<code>     "amount": "10123456789",</code><br>
<code>     "excess": "0924ca1b69531aa9abcf85ff7a2bf0d494bc1d85440339332fb62374aabaddf1d6",</code><br>
<code>     "recipient_address": "grin1dxnzk3gfnqz69va64ut7jafs7u72dtyswpzxekdgmlurkng9ctfqf9yqu5",</code><br>
<code>     "recipient_sig": "710d58fe9e728077dad9494c0d0e15ba5e883e863477aa471c753282a838d9c45966bc57d21f078c226576b6189b293eed3534b755674284a90bb99a128a7d02",</code><br>
<code>     "sender_address": "grin1ephxt0u33rz9zpl7exer2awfr9s9ae28qsx7908q2zq03uv3sj7suqdule",</code><br>
<code>     "sender_sig": "f054a71d5791532364b3267d44601531cdd6730e1eb487142ae798aa3de6e3551c4f756caec09d17901c5e6e08946f04d9d03d04af525567b6df14e25158160c"</code><br>
<code>   }</code></p>
<p>Send this proof file to a mediator in case of a dispute (e.g. payment not received, incorrect amount, etc).</p>
<span class="wiki-legacy-anchor" id="Guidance_for_dispute_agents" aria-hidden="true"></span><h2 id="guidance-for-dispute-agents"> Guidance for dispute agents </h2>
<p>There are two steps for verifying the correct payment was made. Note that there is no reason to verify a proof if the amount or recipient is wrong.</p>
<ol>
<li>Check that the proof file supplied by the GRIN seller matches the details you have for the Bisq trade.
<p>This is just basic fact checking: did the sender proof show the correct recipient address and amount?</p>
<p>Note that amounts are shown without a decimal place, and there are 9 digits after the decimal (e.g. <code class="wiki-source-code" id="source-code-6">"amount": "10123456789"</code> means 10.123456789 GRIN).</p></li>
<li>Run the <code class="wiki-source-code" id="source-code-7">verify_proof</code> command to check that the transaction is recorded on the blockchain.
<p>In order to do this, you'll need grin-wallet installed on your PC.</p>
<p>Install the grin wallet software from <a href="https://github.com/mimblewimble/grin-wallet/releases" rel="noopener noreferrer">https://github.com/mimblewimble/grin-wallet/releases</a>, and then:</p>
<pre><code class="wiki-source-code" id="source-code-8">./grin-wallet -r "https://grinnode.live:3413" init</code></pre>
<p>The wallet is just used as a tool to verify transactions. You do not need a node, Tor, or a seedphrase for this.</p>
<p>To verify, use the command <code class="wiki-source-code" id="source-code-9">verify_proof</code> with the details provided by the GRIN seller, e.g.</p>
<pre><code class="wiki-source-code" id="source-code-10">./grin-wallet -r "https://grinnode.live:3413" verify_proof ./proof2.txt</code></pre>
<p>Output:</p>
<pre><code class="wiki-source-code" id="source-code-11">Payment proof's signatures are valid.
Neither the proof's sender nor recipient address belongs to this wallet.
Command 'verify_proof' completed successfully</code></pre>
<p>This proves that the amount was sent to the recipient address shown in the proof and recorded in the GRIN ledger.</p></li>
</ol>
<span class="wiki-legacy-anchor" id="FAQ" aria-hidden="true"></span><h2 id="faq"> FAQ </h2>
<p><strong>How is the price of GRIN determined?</strong></p>
<p>The price of GRIN is determined by the marketplace within Bisq.</p>
<p>Trade price is chosen by offer maker (which can be the buyer or seller). Offers are by default arranged in the marketplace with the best prices shown at the top of the list.</p>
<p>The last traded price is shown in at the top right of the screen as "Price of latest Bisq trade".</p>
</div>
