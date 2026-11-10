---
title: "Emergency Multisig payout tool"
slug: "wiki/emergency-multisig-payout-tool"
description: "Additional historical source, wiki revision 2011"
tableOfContents: false
---

<aside class="additional-source-notice" role="note" data-pagefind-ignore><p>Additional historical source recovered from the Internet Archive dump labelled 14 October 2026. Original wiki revision 2021-01-20T07:11:12Z. This is restored source text, not current operating advice.</p></aside>

<nav class="wiki-source-toc" data-pagefind-ignore aria-label="Article sections"><details open><summary>On this page</summary><ul><li><a href="#summary">Summary</a></li><li><a href="#warning">Warning</a></li><li><a href="#precautions">Precautions</a></li><li><a href="#what-you-need">What you need</a></li><li><a href="#get-multisig-public-keys">Get multisig public keys</a></li><li><a href="#get-private-keys">Get private keys</a></li><li><a href="#get-payout-addresses">Get payout addresses</a></li><li><a href="#create-transaction">Create Transaction</a></li><li><a href="#sign-transaction">Sign Transaction</a></li><li><a href="#broadcast-the-transaction">Broadcast The Transaction</a></li></ul></details></nav>

<div class="wiki-recovered-article" lang="en"><h2 id="summary"> Summary </h2>
<p>This tool allows for a Mediator to create an unsigned transaction releasing the funds in the 2-of-2 multisig controlled by the traders and send it to each of them, have them sign it and return the signatures and have the the Mediator combine the three pieces (unsigned transaction and both signatures from the traders) to broadcast the transaction.</p>
<h2 id="warning"> Warning </h2>
<p>In this process traders copy and paste their private keys from the Bisq software into a notepad. As a precaution it is advised they remove all of their funds from this wallet before starting this procedure and consider <a href="../switching-to-a-new-data-directory/">switching to a new data directory</a> to get a new wallet.</p>
<h2 id="precautions"> Precautions </h2>
<p>The traders need to make sure the transaction details match the correct resolution before signing.</p>
<h2 id="what-you-need"> What you need </h2>
<p>As Mediator</p>
<table>
<thead>
<tr>
<th>fields</th>
<th>description</th>
</tr>
</thead>
<tbody>
<tr>
<td>depositTxId</td>
<td>ID for the transaction that sent both trader’s funds into the 2-of-2 multisig</td>
</tr>
<tr>
<td>amountInMultisig</td>
<td>Amount locked in the 2-of-2 multisig</td>
</tr>
<tr>
<td>buyerPayoutAmount</td>
<td>Amount to be released to the BTC buyer</td>
</tr>
<tr>
<td>sellerPayoutAmount</td>
<td>Amount to be released to the BTC seller</td>
</tr>
<tr>
<td>buyerPayoutAddress</td>
<td>Address onto which the BTC buyer should be paid</td>
</tr>
<tr>
<td>sellerPayoutAddress</td>
<td>Address onto which the BTC seller should be paid</td>
</tr>
<tr>
<td>buyerPubKeyAsHex</td>
<td>BTC buyer’s public key</td>
</tr>
<tr>
<td>sellerPubKeyAsHex</td>
<td>BTC seller’s public key</td>
</tr>
</tbody>
</table>
<details class="wiki-table-source"><summary>Original table source</summary><pre><code>{| class="wikitable"
|-
! fields !! description
|-
| depositTxId || ID for the transaction that sent both trader’s funds into the 2-of-2 multisig
|-
| amountInMultisig || Amount locked in the 2-of-2 multisig
|-
| buyerPayoutAmount || Amount to be released to the BTC buyer
|-
| sellerPayoutAmount || Amount to be released to the BTC seller
|-
| buyerPayoutAddress || Address onto which the BTC buyer should be paid
|-
| sellerPayoutAddress || Address onto which the BTC seller should be paid
|-
| buyerPubKeyAsHex || BTC buyer’s public key
|-
| sellerPubKeyAsHex || BTC seller’s public key
|}</code></pre></details>
<p>As a trader (each one only needs their own private key)</p>
<table>
<thead>
<tr>
<th>fields</th>
<th>description</th>
</tr>
</thead>
<tbody>
<tr>
<td>privatekeyHex</td>
<td>your private key for this trade</td>
</tr>
</tbody>
</table>
<details class="wiki-table-source"><summary>Original table source</summary><pre><code>{| class="wikitable"
|-
! fields !! description
|-
| privatekeyHex || your private key for this trade
|}</code></pre></details>
<p>Open a text editor where you can gather all this information.</p>
<h2 id="get-multisig-public-keys"> Get multisig public keys </h2>
<p>Each trader involved can get their public keys and the other trader's in their trade JSON contract.</p>
<ol>
<li>Find your trade under PORTFOLIO.</li>
<li>Click the i icon next to the trade ID, and at the bottom click VIEW CONTRACT IN JSON FORMAT. At the end, you see the Buyer and Seller public keys:</li>
</ol>
<pre><code class="wiki-source-code" id="source-code-1">
BuyerMultiSigPubKeyHex: &lt;hex value&gt;
SellerMultiSigPubKeyHex: &lt;hex value&gt;</code></pre>
<h2 id="get-private-keys"> Get private keys </h2>
<p>To access your Bisq wallet private key</p>
<ol>
<li>Press ctrl + j, alt +j or cmd + j.</li>
<li>Check Include private keys and click COPY TO CLIPBOARD and paste it to a text editor.</li>
<li>In the text editor, search for the public key value. You are looking for an entry that reads DeterministicKey{pub HEX=&lt;hex value&gt; where &lt;hex value&gt; is the public key.</li>
<li>When you've found this entry, select and copy the priv HEX=&lt;hex value&gt;. This value is the private key.</li>
<li>Copy, paste and save that information in a bisqWallet.txt file.</li>
</ol>
<p>Note: If your wallet uses a password, you will need to remove the password to view the private keys in wallet data.</p>
<h2 id="get-payout-addresses"> Get payout addresses </h2>
<p>Open the trade details and click on VIEW CONTRACT IN JSON FORMAT. At the end of the JSON contract file you can also find the intended payout address for each trader:</p>
<pre><code class="wiki-source-code" id="source-code-2">
makerPayoutAddressString: &lt;address value&gt;
takerPayoutAddressString: &lt;address value&gt; </code></pre>
<h2 id="create-transaction"> Create Transaction </h2>
<ol>
<li>Press ctrl+g. Click INPUTS and fill in the fields.</li>
<li>Once finished click EXPORT and copy the string you get, save it and share it with each trader. This is the unsigned transaction</li>
</ol>
<h2 id="sign-transaction"> Sign Transaction </h2>
<ol>
<li>Press ctrl+g and click IMPORT. Copy the string you got on step 2, paste it in the first field and press IMPORT FROM STRING. It should populate the view with the information about the payout transaction.</li>
<li>Go to SIGN and paste your private key for this trade (priv HEX=) and click GENERATE SIGNATURE.</li>
<li>Copy the signature hex that you get and share it with the mediator</li>
</ol>
<h2 id="broadcast-the-transaction"> Broadcast The Transaction </h2>
<ol>
<li>Press ctrl+g and click IMPORT. Copy the string you got on step 2, paste it in the first field and press IMPORT FROM STRING. It should populate the view with the info about the payout transaction.</li>
<li>Click BUILD (to the let). Paste the Buyer's signature on the first field and the Seller's on the second field.</li>
<li>Click the BUILD button bellow the field where you pasted the signatures and it should populate with the signed transaction. Save the resulting text just to be safe.</li>
<li>Click BROADCAST.</li>
<li>Verify on a block explorer that the transaction was indeed broadcast.</li>
</ol>
</div>
