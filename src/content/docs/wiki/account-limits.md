---
title: "Account limits"
slug: "wiki/account-limits"
tableOfContents: false
---

<nav data-pagefind-ignore class="wiki-source-toc" aria-label="Article sections"><details open><summary>On this page</summary><ul><li><a href="#which-payment-accounts-are-affected">Which payment accounts are affected</a></li><li><a href="#account-aging">Account aging</a></li><li><a href="#account-signing">Account signing</a></li><li><a href="#how-to-get-an-account-signed">How to get an account signed</a></li><li><a href="#buying-btc">Buying BTC</a></li><li><a href="#with-your-own-signed-account">With your own signed account</a></li><li><a href="#backing-up-and-restoring-payment-accounts">Backing up and restoring payment accounts</a></li><li><a href="#user-opt-out-limits">User opt-out limits</a></li></ul></details></nav>

<div class="wiki-recovered-article" lang="en"><p>Elevated <strong>account limits</strong> apply to fiat payment accounts in order to limit damage a malicious user can do while allowing honest users to start trading immediately with no KYC and utmost privacy.</p>
<p>Altcoin accounts can trade 0.25 BTC right away (reduced from 0.5 BTC for security reasons), but all fiat payment account types have limits lower than 0.25 BTC to match their particular risk profiles (see <a href="../payment-methods/#fiat-payment-methods">this table</a> for details). Some payment methods with chargeback risk implement a mechanism called <em>account signing</em> that restricts trading activity until a trader proves their integrity to further secure against foul play.</p>
<p>To reduce the size of trades entering arbitration Bisq also sets new users trade limits to be 0.1 BTC. This is an additional limit to account limits but users can opt out of this limit at any time.</p>
<span class="wiki-legacy-anchor" id="Which_payment_accounts_are_affected" aria-hidden="true"></span><h2 id="which-payment-accounts-are-affected"> Which payment accounts are affected </h2>
<p>Only fiat payment methods are affected by elevated account limits. Altcoin accounts are only affected by the new user limits which can be opted out if necessary for allow every altcoin account to trade up to 0.25 BTC right away upon creating a payment account in Bisq.</p>
<p>All fiat payment methods in all markets limit total trade size depending on the payment method's risk profile (see <a href="../payment-methods/#fiat-payment-methods">this table</a> for details).</p>
<p>Despite these limitations, chargebacks can still be possible for certain payment methods. Bisq reduces this risk with a mechanism called <strong>account signing</strong>.</p>
<p>Account signing only applies to payment accounts that meet <em>both</em> of the following conditions:</p>
<ul>
<li>used in the following markets: USD, EUR, CAD, GBP, AUD, or BRL</li>
<li>is subject to chargeback risk: SEPA, SEPA Instant, Interac e-Transfer, Zelle, Revolut, Chase QuickPay, Popmoney, MoneyBeam, Uphold, and any kind of bank transfer</li>
</ul>
<p>This means that all payment accounts that deal in currencies not listed above do <em>not</em> require account signing, even if they are subject to chargeback risk.</p>
<span class="wiki-legacy-anchor" id="Account_aging" aria-hidden="true"></span><h2 id="account-aging"> Account aging </h2>
<figure class="wiki-source-image" id="source-image-1"><a href="../../media/wiki/25f04503efcdd64391a303b87743e84351e627547fcb43c334cba05a65f70e1b.png"><img alt="See account age in the offer book." decoding="async" height="341" loading="lazy" src="../../media/wiki/25f04503efcdd64391a303b87743e84351e627547fcb43c334cba05a65f70e1b.png" width="800"></a><figcaption>See account age in the offer book.<br><small>Historical thumbnail; original resolution not recovered. <a href="../../recovered-media/">Provenance catalogue</a>.</small></figcaption></figure>
<p>Account age is no longer used to determine trade size limits for most payment methods. It is still measured, however, and you can see a payment account's age in the offer book before taking an offer, but we caution against using it as a measure of integrity. Older accounts are not <em>necessarily</em> safer.</p>
<p><strong>Practically, this means that all payment methods on Bisq have full selling capability from the moment they are created.</strong> Selling limits no longer phase in over time.</p>
<p>Some payment methods implement a variation of account aging called account signing whereby limits are increased in stages over a period of 60 days after signing. More about this below.</p>
<p>If you're interested, details on the <code class="wiki-source-code" id="source-code-1">AccountAgeWitness</code> object that enables this aging mechanism are <a href="https://docs.bisq.network/payment-account-age-witness.html" rel="noopener noreferrer">here</a>.</p>
<span class="wiki-legacy-anchor" id="Account_signing" aria-hidden="true"></span><h2 id="account-signing"> Account signing </h2>
<figure class="wiki-source-image" id="source-image-2"><a href="../../media/wiki/1be765ad80e6dae205db776fcb67830b4135a48c2a6f5ff73dee0802ea36220b.png"><img alt="A graphical overview of account signing." decoding="async" height="2150" loading="lazy" src="../../media/wiki/1be765ad80e6dae205db776fcb67830b4135a48c2a6f5ff73dee0802ea36220b.png" width="854"></a><figcaption>A graphical overview of account signing.<br><small>Historical full-size recovered source. <a href="../../recovered-media/">Provenance catalogue</a>.</small></figcaption></figure>
<p>Account signing limits <em>buying</em> limits of risky fiat payment methods to <span class="wiki-template-gap" role="note"><strong>[Unresolved template: MaxTradeSizeUnsigned]</strong> <code>{{MaxTradeSizeUnsigned}}</code></span> until the trader has bought bitcoin from a seller with a signed payment account, and then gradually phases in full buying limits. Selling limits are unaffected.</p>
<p>In a nutshell, this is how it works:</p>
<ul>
<li>Payment account is created in Bisq for risky payment method
<ul>
<li>Buying is limited to <span class="wiki-template-gap" role="note"><strong>[Unresolved template: MaxTradeSizeUnsigned]</strong> <code>{{MaxTradeSizeUnsigned}}</code></span> BTC per trade until account is signed (see how <a href="../account-limits/#how-to-get-an-account-signed">below</a>)</li>
</ul></li>
<li>30 days after signing, buying limits are increased to 50% of maximum</li>
<li>60 days after signing, maximum trade size is allowed</li>
</ul>
<p>Let's see how this works in practice by looking at an example. SEPA has a maximum trade size of 0.0624 BTC, and it requires account signing in order for to enable full trade limits.</p>
<p>First let's observe what happens if a new SEPA account is never signed. Notice how buying limits never increase beyond <span class="wiki-template-gap" role="note"><strong>[Unresolved template: MaxTradeSizeUnsigned]</strong> <code>{{MaxTradeSizeUnsigned}}</code></span>, but selling 0.0624 BTC is allowed from day 0.</p>
<table>
<thead>
<tr>
<th>Time Since Creating SEPA Payment Account (Never Signed)</th>
<th>Maximum Trade Size (Buy)</th>
<th>Maximum Trade Size (Sell)</th>
</tr>
</thead>
<tbody>
<tr>
<td>Day 0</td>
<td><span class="wiki-template-gap" role="note"><strong>[Unresolved template: MaxTradeSizeUnsigned]</strong> <code>{{MaxTradeSizeUnsigned}}</code></span></td>
<td>0.0624 BTC</td>
</tr>
<tr>
<td>Day 30</td>
<td><span class="wiki-template-gap" role="note"><strong>[Unresolved template: MaxTradeSizeUnsigned]</strong> <code>{{MaxTradeSizeUnsigned}}</code></span></td>
<td>0.0624 BTC</td>
</tr>
<tr>
<td>Day 60</td>
<td><span class="wiki-template-gap" role="note"><strong>[Unresolved template: MaxTradeSizeUnsigned]</strong> <code>{{MaxTradeSizeUnsigned}}</code></span></td>
<td>0.0624 BTC</td>
</tr>
<tr>
<td>Day 90</td>
<td><span class="wiki-template-gap" role="note"><strong>[Unresolved template: MaxTradeSizeUnsigned]</strong> <code>{{MaxTradeSizeUnsigned}}</code></span></td>
<td>0.0624 BTC</td>
</tr>
</tbody>
</table>
<details class="wiki-table-source"><summary>Original table source</summary><pre><code>{| class="wikitable"
! Time Since Creating SEPA Payment Account (Never Signed)
! Maximum Trade Size (Buy) &#10;! Maximum Trade Size (Sell) &#10;|-
| Day 0 &#10;| {{MaxTradeSizeUnsigned}} &#10;| 0.0624 BTC &#10;|-
| Day 30 &#10;| {{MaxTradeSizeUnsigned}} &#10;| 0.0624 BTC &#10;|-
| Day 60 &#10;| {{MaxTradeSizeUnsigned}} &#10;| 0.0624 BTC &#10;|-
| Day 90 &#10;| {{MaxTradeSizeUnsigned}} &#10;| 0.0624 BTC &#10;|}</code></pre></details>
<p>If that SEPA account manages to get signed on the same day it's created, it will see its <span class="wiki-template-gap" role="note"><strong>[Unresolved template: MaxTradeSizeUnsigned]</strong> <code>{{MaxTradeSizeUnsigned}}</code></span> limit increased on Day 30. Selling limits are unaffected.</p>
<table>
<thead>
<tr>
<th>Time Since Creating SEPA Payment Account</th>
<th>Maximum Trade Size (Buy)</th>
<th>Maximum Trade Size (Sell)</th>
</tr>
</thead>
<tbody>
<tr>
<td>Day 0 - Account Signed</td>
<td><span class="wiki-template-gap" role="note"><strong>[Unresolved template: MaxTradeSizeUnsigned]</strong> <code>{{MaxTradeSizeUnsigned}}</code></span></td>
<td>0.0624 BTC</td>
</tr>
<tr>
<td>Day 30</td>
<td>0.0312 BTC</td>
<td>0.0624 BTC</td>
</tr>
<tr>
<td>Day 60</td>
<td>0.0624 BTC</td>
<td>0.0624 BTC</td>
</tr>
<tr>
<td>Day 90</td>
<td>0.0624 BTC</td>
<td>0.0624 BTC</td>
</tr>
</tbody>
</table>
<details class="wiki-table-source"><summary>Original table source</summary><pre><code>{| class="wikitable"
! Time Since Creating SEPA Payment Account &#10;! Maximum Trade Size (Buy) &#10;! Maximum Trade Size (Sell) &#10;|-
| Day 0 - Account Signed &#10;| {{MaxTradeSizeUnsigned}} &#10;| 0.0624 BTC &#10;|-
| Day 30 &#10;| 0.03125 BTC &#10;| 0.0624 BTC &#10;|-
| Day 60 &#10;| 0.0624 BTC &#10;| 0.0624 BTC &#10;|-
| Day 90 &#10;| 0.0624 BTC &#10;| 0.0624 BTC &#10;|}</code></pre></details>
<p>But if that SEPA account isn't signed until Day 30, it won't see its limits lifted until Day 60. Again, selling limits are unaffected.</p>
<table>
<thead>
<tr>
<th>Time Since Creating SEPA Payment Account</th>
<th>Maximum Trade Size (Buy)</th>
<th>Maximum Trade Size (Sell)</th>
</tr>
</thead>
<tbody>
<tr>
<td>Day 0</td>
<td><span class="wiki-template-gap" role="note"><strong>[Unresolved template: MaxTradeSizeUnsigned]</strong> <code>{{MaxTradeSizeUnsigned}}</code></span></td>
<td>0.0624 BTC</td>
</tr>
<tr>
<td>Day 30 - Account Signed</td>
<td><span class="wiki-template-gap" role="note"><strong>[Unresolved template: MaxTradeSizeUnsigned]</strong> <code>{{MaxTradeSizeUnsigned}}</code></span></td>
<td>0.0624 BTC</td>
</tr>
<tr>
<td>Day 60</td>
<td>0.0312 BTC</td>
<td>0.0624 BTC</td>
</tr>
<tr>
<td>Day 90</td>
<td>0.0624 BTC</td>
<td>0.0624 BTC</td>
</tr>
</tbody>
</table>
<details class="wiki-table-source"><summary>Original table source</summary><pre><code>{| class="wikitable"
! Time Since Creating SEPA Payment Account &#10;! Maximum Trade Size (Buy) &#10;! Maximum Trade Size (Sell) &#10;|-
| Day 0 &#10;| {{MaxTradeSizeUnsigned}} &#10;| 0.0624 BTC &#10;|-
| Day 30 - Account Signed &#10;| {{MaxTradeSizeUnsigned}}
| 0.0624 BTC &#10;|-
| Day 60 &#10;| 0.0325 BTC &#10;| 0.0624 BTC &#10;|-
| Day 90 &#10;| 0.0624 BTC &#10;| 0.0624 BTC &#10;|}</code></pre></details>
<span class="wiki-legacy-anchor" id="How_to_get_an_account_signed" aria-hidden="true"></span><h3 id="how-to-get-an-account-signed"> How to get an account signed </h3>
<p>Payment accounts that require signing cannot buy more than <span class="wiki-template-gap" role="note"><strong>[Unresolved template: MaxTradeSizeUnsigned]</strong> <code>{{MaxTradeSizeUnsigned}}</code></span> until 30 days <em>after</em> they are signed. Accounts can be signed with the following two methods.</p>
<span class="wiki-legacy-anchor" id="Buying_BTC" aria-hidden="true"></span><h4 id="buying-btc"> Buying BTC </h4>
<p>To sign your account you have to buy BTC following these requirements:</p>
<ul>
<li>trade amount is greater than or equal to <span class="wiki-template-gap" role="note"><strong>[Unresolved template: MinTradeSizeToBeSigned]</strong> <code>{{MinTradeSizeToBeSigned}}</code></span> BTC and lesser than or equal to <span class="wiki-template-gap" role="note"><strong>[Unresolved template: MaxTradeSizeUnsigned]</strong> <code>{{MaxTradeSizeUnsigned}}</code></span></li>
<li>offer must be in a market that requires signing (USD, EUR, CAD, GBP, AUD, BRL)</li>
<li>seller's account must have been signed for over 30 days at the time of the signing trade</li>
</ul>
<p>Through taking an offer you can make sure that the offer fulfills the requirements to sign your account. Making an offer could not sign your account, because taker could be unable to sign your account (signed since less than 30 days, or unsigned).</p>
<p>The Bisq interface makes it easy to determine if an offer can help you get signed: simply <strong>look for buy offers with a check mark badge</strong>:</p>
<figure class="wiki-source-image" id="source-image-3"><a href="../../media/wiki/be63e50c9318adf644108e184bd7c0f9b62ce6670037ae1b39a6b9df7ef0fb29.png"><img alt="Top offer won't get you signed. Bottom offer will get you signed." decoding="async" height="88" loading="lazy" src="../../media/wiki/be63e50c9318adf644108e184bd7c0f9b62ce6670037ae1b39a6b9df7ef0fb29.png" width="904"></a><figcaption>Top offer won't get you signed. Bottom offer will get you signed.<br><small>Historical full-size recovered source. <a href="../../recovered-media/">Provenance catalogue</a>.</small></figcaption></figure>
<div>
</div>
<p>In the image above, the offer on top does not have a check mark, but the offer on the bottom does. And it's a valid size (i.e., between <span class="wiki-template-gap" role="note"><strong>[Unresolved template: MinTradeSizeToBeSigned]</strong> <code>{{MinTradeSizeToBeSigned}}</code></span> BTC and <span class="wiki-template-gap" role="note"><strong>[Unresolved template: MaxTradeSizeUnsigned]</strong> <code>{{MaxTradeSizeUnsigned}}</code></span>), so taking that offer and successfully completing the trade will result in a signed account.</p>
<p>You can see your payment account's limits and signing status at <code class="wiki-source-code" id="source-code-2">Accounts</code> &gt; <code class="wiki-source-code" id="source-code-3">National Currency Accounts</code>. Pick an account and look toward the bottom:</p>
<figure class="wiki-source-image" id="source-image-4"><a href="../../media/wiki/2dfd8690c9302008f5ee6b2738b1150f373b145fe67663822d018d669f4f7cc0.png"><img alt="Where to see your payment account's limits and signing status." decoding="async" height="93" loading="lazy" src="../../media/wiki/2dfd8690c9302008f5ee6b2738b1150f373b145fe67663822d018d669f4f7cc0.png" width="611"></a><figcaption>Where to see your payment account's limits and signing status.<br><small>Historical full-size recovered source. <a href="../../recovered-media/">Provenance catalogue</a>.</small></figcaption></figure>
<div>
</div>
<span class="wiki-legacy-anchor" id="With_your_own_signed_account" aria-hidden="true"></span><h4 id="with-your-own-signed-account"> With your own signed account </h4>
<p>Once you have a signed and fully matured payment account, any new payment account you create after it, that requires signing, will be self-signed as long as it uses the <strong>exact same name</strong> as your previously signed account. The payment account can be of a different type (e.g. a signed SEPA account can self-sign a SEPA Instant account), but a payment account created with a name that is even slightly different will not be self-signed.</p>
<p>Payment account types that don't require your full name cannot be self-signed (e.g. Revolut, which only requires an email address) and they cannot self-sign other payment accounts.</p>
<p>Self-signed accounts are immediately signed, but limits are not immediately lifted. This is because they have an age of 0 days, so 30 days must pass for the <span class="wiki-template-gap" role="note"><strong>[Unresolved template: MaxTradeSizeUnsigned]</strong> <code>{{MaxTradeSizeUnsigned}}</code></span> limit to be lifted, and another 30 days must pass for full trading ability to take effect (see tables above).</p>
<span class="wiki-legacy-anchor" id="Backing_up_and_restoring_payment_accounts" aria-hidden="true"></span><h2 id="backing-up-and-restoring-payment-accounts"> Backing up and restoring payment accounts </h2>
<p>Once your payment accounts have accrued age and been signed, you won't want to give them up. With <a href="../backing-up-application-data/">proper backups</a>, you won't have to—payment accounts can be restored if you ever have to remove/reinstall Bisq, move to another machine, etc.</p>
<span class="wiki-legacy-anchor" id="User_opt-out_limits" aria-hidden="true"></span><h2 id="user-opt-out-limits"> User opt-out limits </h2>
<p>To reduce trades into arbitration for new users unfamiliar with Bisq, new users have a 0.1 BTC limit by default that can be opt-out of at any time.</p>
<p>To access this limit go to Settings &gt; Preferences</p>
<figure class="wiki-source-image" id="source-image-5"><a href="../../media/wiki/e038ab3456091cd92c043d43c5dee7aaacbe4edaf5f5a6d20d58bc7c3252ae4e.png"><img alt="Trade limit setting in Bisq that can opted out of or changed at any time" decoding="async" height="109" loading="lazy" src="../../media/wiki/e038ab3456091cd92c043d43c5dee7aaacbe4edaf5f5a6d20d58bc7c3252ae4e.png" width="550"></a><figcaption>Trade limit setting in Bisq that can opted out of or changed at any time<br><small>Historical full-size recovered source. <a href="../../recovered-media/">Provenance catalogue</a>.</small></figcaption></figure>
<p>Shown above is the trade limit setting in Bisq that can opted out of or edited higher or lower at any time.</p>
<p>If you opt of of this limit you will be given a pop up message informing you...</p>
<aside class="wiki-admonition" role="note"><p><strong>Warning</strong></p><p>Trading limits are set to reduce risk of costly disputes and losing funds for new users. Raise trading limits at your own risk. Every trader has their own pace, but it's recommended to complete at least 5 trades before raising trade limits.</p>
<p>By raising trading limits you acknowledge to be familiar with the basic use of Bisq, like <a href="../backing-up-application-data/">backing up your data</a>, <span class="wiki-link-gap">trading rules <small>[unrecovered article: rading rules]</small></span>, <span class="wiki-link-gap">dispute resolution <small>[unrecovered article: Dispute resolution]</small></span>, <a href="../table-of-penalties/">penalties</a> and <a href="../user-support/">where to find support</a>.</p>
</aside>
<p>Account signing limits are still applied to buy BTC with most National Account payment methods to reduce chargeback risk.</p>
</div>
