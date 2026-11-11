---
title: "ACH Transfer"
slug: "wiki/ach-transfer"
tableOfContents: false
---

<nav data-pagefind-ignore class="wiki-source-toc" aria-label="Article sections"><details open><summary>On this page</summary><ul><li><a href="#quick-facts">Quick Facts</a></li><li><a href="#account-setup-limits">Account Setup &amp; Limits</a></li><li><a href="#is-my-bank-compatible">Is my bank compatible?</a></li><li><a href="#fees-and-limits">Fees and Limits</a></li><li><a href="#adding-ach-transfer-to-bisq">Adding ACH Transfer to Bisq</a></li><li><a href="#how-to-trade-with-ach">How to Trade with ACH</a></li><li><a href="#buying-btc">Buying BTC</a></li><li><a href="#selling-btc">Selling BTC</a></li><li><a href="#dispute-resolution">Dispute Resolution</a></li></ul></details></nav>

<div class="wiki-recovered-article" lang="en"><p><strong>ACH Transfer</strong>, or Automated Clearing House transfer, is a payment method introduced in Bisq v1.8.0. It is primarily used for domestic, low-value payments between participating financial institutions in the United States. Along with <a href="../domestic-wire-transfer/">domestic wire transfers</a>, ACH is one of the two primary bank transfer methods used in the US.</p>
<span class="wiki-legacy-anchor" id="Quick_Facts" aria-hidden="true"></span><h2 id="quick-facts"> Quick Facts </h2>
<ul>
<li><strong>Supported Countries:</strong> United States only.</li>
<li><strong>Supported Currencies:</strong> USD only.</li>
<li><strong>Maximum Trade Duration:</strong> 5 days (though most complete within 1–2 business days).</li>
<li><strong>Trade Limits:</strong> <span class="wiki-template-gap" role="note"><strong>[Unresolved template: MaxTradeSizeBisq1]</strong> <code>{{MaxTradeSizeBisq1}}</code></span>.</li>
<li><strong>Account Signing:</strong> Not required.</li>
</ul>
<div>
<p><strong>SECURITY WARNING: Never confirm micro-deposits for a Bisq trade.</strong></p>
<p>Some banks verify external accounts using micro-deposits (small transfers of a few cents). If a trade partner initiates micro-deposits, they are likely attempting to "link" your account to theirs. In the ACH system, a linked account may allow the other party to <strong>debit (withdraw)</strong> funds from your account without further authorization.</p>
<ul>
<li><strong>Sellers:</strong> If you receive micro-deposits, do not verify the amounts for the buyer.</li>
<li><strong>Buyers:</strong> Do not use "Direct Deposit" setup methods; use standard "Third-Party Transfer" or "Bill Pay" features.</li>
</ul>
</div>
<span class="wiki-legacy-anchor" id="Account_Setup_&amp;_Limits" aria-hidden="true"></span><h2 id="account-setup-limits"> Account Setup &amp; Limits </h2>
<span class="wiki-legacy-anchor" id="Is_my_bank_compatible?" aria-hidden="true"></span><h3 id="is-my-bank-compatible"> Is my bank compatible? </h3>
<p>Not all banks offer third-party ACH transfers. Many banks only allow ACH transfers to other accounts <strong>you own</strong>. Before trading, verify that your bank supports "Third-Party ACH Transfers" or "External Transfers" to individuals. If your bank insists on micro-deposit verification, it is likely not a true third-party transfer service.</p>
<span class="wiki-legacy-anchor" id="Fees_and_Limits" aria-hidden="true"></span><h3 id="fees-and-limits"> Fees and Limits </h3>
<ul>
<li><strong>Fees:</strong> Usually low-cost or free, but some banks charge for "Same Day ACH" or expedited delivery. Always check your bank's fee schedule.</li>
<li><strong>Transfer Limits:</strong> Your bank likely has daily or monthly "External Transfer" limits. Ensure these limits accommodate your Bisq trade size before opening an offer.</li>
</ul>
<span class="wiki-legacy-anchor" id="Adding_ACH_Transfer_to_Bisq" aria-hidden="true"></span><h2 id="adding-ach-transfer-to-bisq"> Adding ACH Transfer to Bisq </h2>
<p>To add your ACH account to Bisq:</p>
<ol>
<li>Head to the top menu and select <strong>Account</strong>.</li>
<li>Choose <strong>National Currency Accounts</strong>.</li>
<li>Click on <strong>Add new account</strong>.</li>
<li>Select <strong>ACH</strong>.</li>
<li>Fill in the necessary details (Routing Number, Account Number, etc.).</li>
<li><strong>Account Name:</strong> You can set a custom name (e.g., "ACH - Chase - Jane Doe") to help you stay organized. This name is only visible to you.</li>
<li>Click <strong>Save new account</strong>.</li>
</ol>
<p><strong>Note:</strong> Ensure all details are accurate. Sellers can only confirm payment if the name associated with the incoming ACH transfer matches the account name listed in Bisq.</p>
<span class="wiki-legacy-anchor" id="How_to_Trade_with_ACH" aria-hidden="true"></span><h2 id="how-to-trade-with-ach"> How to Trade with ACH </h2>
<span class="wiki-legacy-anchor" id="Buying_BTC" aria-hidden="true"></span><h3 id="buying-btc"> Buying BTC </h3>
<ol>
<li>Make or take an offer on the USD market.</li>
<li>Once the trade is confirmed, Bisq will provide the seller's ACH details.</li>
<li>Send the payment through your bank's portal immediately.</li>
<li><strong>Payment Reference:</strong> Leave this <strong>blank</strong>. If your bank requires one, only use your name. Never mention "Bisq," "Bitcoin," or "Crypto."</li>
<li>Click <strong>Payment Started</strong> in Bisq.</li>
</ol>
<span class="wiki-legacy-anchor" id="Selling_BTC" aria-hidden="true"></span><h3 id="selling-btc"> Selling BTC </h3>
<ol>
<li>Make or take an offer to sell BTC on the USD market.</li>
<li>After confirmation, Bisq will provide the buyer with your ACH details.</li>
<li>Wait for the buyer to send the payment and click "Payment Started."</li>
<li><strong>Verify the funds:</strong> Once the funds arrive in your bank account, click <strong>Confirm Payment Received</strong> to release the BTC.</li>
<li><strong>Security Note:</strong> If you receive small "micro-deposits" instead of the full trade amount, <strong>do not</strong> communicate those amounts to the buyer.</li>
</ol>
<span class="wiki-legacy-anchor" id="Dispute_Resolution" aria-hidden="true"></span><h2 id="dispute-resolution"> Dispute Resolution </h2>
<p>If a dispute occurs, the mediator may ask the buyer to provide proof of payment (e.g., a PDF receipt) showing the correct amount and recipient details. The mediator may also ask the seller for a redacted statement to prove their account details or to show that a payment was not received.</p>
<p>For more information, see <span class="wiki-link-gap">dispute resolution <small>[unrecovered article: dispute resolution]</small></span>.</p>
</div>
