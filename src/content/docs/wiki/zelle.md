---
title: "Zelle"
slug: "wiki/zelle"
tableOfContents: false
---

<nav data-pagefind-ignore class="wiki-source-toc" aria-label="Article sections"><details open><summary>On this page</summary><ul><li><a href="#about-zelle">About Zelle</a></li><li><a href="#using-zelle-on-bisq-v1">Using Zelle on Bisq v1</a></li><li><a href="#limits-and-requirements">Limits and Requirements</a></li><li><a href="#setting-up-your-zelle-account-in-bisq">Setting Up Your Zelle Account in Bisq</a></li><li><a href="#trading-with-zelle-on-bisq-v1">Trading with Zelle on Bisq v1</a></li><li><a href="#buying-btc-with-zelle">Buying BTC with Zelle</a></li><li><a href="#selling-btc-with-zelle">Selling BTC with Zelle</a></li><li><a href="#potential-issues">Potential Issues</a></li><li><a href="#dispute-resolution">Dispute Resolution</a></li><li><a href="#bank-blocking-payment">Bank Blocking Payment</a></li></ul></details></nav>

<div class="wiki-recovered-article" lang="en"><p><strong>Zelle</strong> is a popular payment method within the United States (US) for buying and selling bitcoin for USD on Bisq. It is offered directly through the mobile apps or online banking of many US banks and credit unions. Zelle payments are typically instant, but users should be aware they can occasionally take longer (Bisq allows up to 4 days for the trade window).</p>
<aside class="wiki-admonition" role="note"><p><strong>Note</strong></p><p><strong>Version Context:</strong> The details on this page, particularly regarding trade limits and account signing, primarily apply to trading on <strong><a href="../bisq-1/">Bisq v1</a></strong>.</p>
</aside>
<span class="wiki-legacy-anchor" id="About_Zelle" aria-hidden="true"></span><h2 id="about-zelle"> About Zelle </h2>
<p>Zelle allows users to easily send and receive money using only the recipient’s email address or U.S. mobile number, provided both parties are enrolled. Money is usually available within minutes. Zelle itself does not charge fees for transfers, though your bank might have standard account fees. Account details and transaction activity remain private between the user and their bank.</p>
<ul>
<li><strong>Availability:</strong> Zelle is available <strong>only in the United States</strong> and facilitates transfers in <strong>USD</strong>. It is integrated into over 2,200 bank and credit union apps.</li>
<li><strong>Standalone App Discontinued:</strong> The separate Zelle mobile app (for users whose banks didn't offer Zelle directly) was <strong>discontinued on April 1, 2025</strong>. Users who relied on the standalone app must now access Zelle through a participating bank or credit union's online/mobile banking services.</li>
<li><strong>More Information:</strong> Visit the official Zelle website FAQ for more details: <a href="https://www.zellepay.com/faq/top-zelle-questions" rel="noopener noreferrer">https://www.zellepay.com/faq/top-zelle-questions</a></li>
</ul>
<span class="wiki-legacy-anchor" id="Using_Zelle_on_Bisq_v1" aria-hidden="true"></span><h2 id="using-zelle-on-bisq-v1"> Using Zelle on Bisq v1 </h2>
<span class="wiki-legacy-anchor" id="Limits_and_Requirements" aria-hidden="true"></span><h3 id="limits-and-requirements"> Limits and Requirements </h3>
<ul>
<li><strong>Spending Limits:</strong> Zelle limits (daily, weekly, monthly) vary significantly between banks and credit unions. <strong>Buyers are responsible for checking their own Zelle sending limits</strong> (usually visible within their banking app) before starting a trade.</li>
<li><strong>Maximum Trade Duration:</strong> 4 days.</li>
<li><strong>Maximum BTC per Trade:</strong> <span class="wiki-template-gap" role="note"><strong>[Unresolved template: MaxTradeSizeBisq1]</strong> <code>{{MaxTradeSizeBisq1}}</code></span> (This is the standard <a href="../bisq-1/">Bisq v1</a> limit).</li>
<li><strong>Account Signing:</strong> Yes, Zelle accounts <strong>require <a href="../account-limits/">signing</a></strong> in <a href="../bisq-1/">Bisq v1</a>. In Bisq 1 v1.10.11, the unsigned BTC-buying allowance is 0.002 BTC; higher buying limits phase in after eligible signing. Selling is governed by the method's applicable maximum.</li>
</ul>
<span class="wiki-legacy-anchor" id="Setting_Up_Your_Zelle_Account_in_Bisq" aria-hidden="true"></span><h3 id="setting-up-your-zelle-account-in-bisq"> Setting Up Your Zelle Account in Bisq </h3>
<p>Before adding Zelle to Bisq, ensure you have enrolled with Zelle through your participating bank or credit union's app or website. This usually involves verifying your U.S. mobile number or email address.</p>
<p>To add your Zelle account to Bisq:</p>
<ol>
<li>Go to the <strong>Account</strong> tab in Bisq.</li>
<li>Click <strong>Add New Account</strong>.</li>
<li>Select <strong>Zelle (ClearXchange)</strong> from the payment method dropdown list.</li>
<li>Enter the <strong>Full Name</strong> associated with your bank account.</li>
</ol>
<aside class="wiki-admonition" role="note"><p><strong>Warning</strong></p><p>Use your real name exactly as registered with your bank. Sellers cannot confirm payment receipt if the sender's name doesn't match the name provided in Bisq, per trade rules.</p>
</aside>
<ol>
<li>Enter the <strong>Email Address or U.S. Mobile Number</strong> that you have registered with Zelle.</li>
<li>(Optional) Add a custom <strong>Account Name</strong> visible only to you (useful if you add multiple Zelle methods).</li>
<li>Click <strong>Save New Account</strong>.</li>
</ol>
<span class="wiki-legacy-anchor" id="Trading_with_Zelle_on_Bisq_v1" aria-hidden="true"></span><h2 id="trading-with-zelle-on-bisq-v1"> Trading with Zelle on Bisq v1 </h2>
<span class="wiki-legacy-anchor" id="Buying_BTC_with_Zelle" aria-hidden="true"></span><h3 id="buying-btc-with-zelle"> Buying BTC with Zelle </h3>
<p>1. Find an offer to buy BTC (or create your own) in the USD market using Zelle. 2. Once the trade starts and the initial deposit transaction confirms, you'll see the seller's Zelle details (Full Name and registered Email/Phone Number). 3. Log in to your bank/credit union's mobile app or website and initiate the Zelle payment <strong>exactly</strong> as instructed on the Bisq trade screen.</p>
<aside class="wiki-admonition" role="note"><p><strong>Warning</strong></p><p>Only use the payment details provided in the Bisq trade. Do not send to different details if requested by the peer outside of Bisq.</p>
</aside>
<p>4. After sending the payment, click the <strong>Payment started</strong> button in Bisq.</p>
<span class="wiki-legacy-anchor" id="Selling_BTC_with_Zelle" aria-hidden="true"></span><h3 id="selling-btc-with-zelle"> Selling BTC with Zelle </h3>
<p>1. Find an offer to sell BTC (or create your own) in the USD market using Zelle. 2. Once the trade starts and the initial deposit transaction confirms, the buyer will see your Zelle details (from the account you added in Bisq) and will send the payment. 3. Wait for the buyer to click "Payment started" in Bisq. 4. <strong>Verify</strong> in your bank account that you have received the correct USD amount <strong>from a sender whose name matches</strong> the buyer's name shown in the Bisq trade details.</p>
<aside class="wiki-admonition" role="note"><p><strong>Warning</strong></p><p>Only confirm payment receipt if the sender's name matches the details in Bisq, per trade rules.</p>
</aside>
<p>5. Once verified, click the button in Bisq to <strong>Confirm payment receipt</strong>, which releases the BTC to the buyer.</p>
<span class="wiki-legacy-anchor" id="Potential_Issues" aria-hidden="true"></span><h2 id="potential-issues"> Potential Issues </h2>
<span class="wiki-legacy-anchor" id="Dispute_Resolution" aria-hidden="true"></span><h3 id="dispute-resolution"> Dispute Resolution </h3>
<p>If a problem occurs (e.g., payment not received, wrong amount sent, sender name mismatch), a <a href="../dispute-resolution-in-bisq-1/">dispute resolution</a> process involving a <a href="../mediator/">Mediator</a> may be initiated.</p>
<ul>
<li>The <strong>buyer</strong> might need to provide proof of payment (screenshot, bank statement showing correct amount, recipient, and timestamp).</li>
<li>The <strong>seller</strong> might need to provide information to verify their account details or confirm non-receipt.</li>
</ul>
<span class="wiki-legacy-anchor" id="Bank_Blocking_Payment" aria-hidden="true"></span><h3 id="bank-blocking-payment"> Bank Blocking Payment </h3>
<p>Banks or credit unions may sometimes block Zelle payments based on their own risk algorithms or policies. If you (as the buyer) are unable to send the Zelle payment for reasons beyond your control: 1. Do <strong>not</strong> try to send payment from a different Zelle account or a friend/family member's account. 2. Immediately open a support ticket with a <a href="../mediator/">Mediator</a>: select the trade in Bisq and press <strong>Alt + O</strong> (Option + O on macOS; Ctrl + O is also accepted). 3. Explain the situation clearly to the <a href="../mediator/">Mediator</a>.</p>
</div>
