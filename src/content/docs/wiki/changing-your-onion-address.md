---
title: "Changing your onion address"
slug: "wiki/changing-your-onion-address"
tableOfContents: false
---

<nav data-pagefind-ignore class="wiki-source-toc" aria-label="Article sections"><details open><summary>On this page</summary><ul><li><a href="#important-considerations-before-changing">Important Considerations Before Changing</a></li><li><a href="#checking-your-current-onion-address">Checking Your Current Onion Address</a></li><li><a href="#step-1-back-up-your-hiddenservice-directory">Step 1: Back Up Your `hiddenservice` Directory</a></li><li><a href="#step-2-generate-the-new-onion-address">Step 2: Generate the New Onion Address</a></li></ul></details></nav>

<div class="wiki-recovered-article" lang="en"><p>You may want to <strong>generate a new Tor onion address</strong> for your Bisq instance from time to time, primarily as a privacy-enhancing measure. Bisq automatically uses modern Tor v3 addresses (long, 56-character strings). This guide explains the process for forcing Bisq to create a new one.</p>
<p><strong>Note:</strong> This process changes the onion address your specific Bisq application uses to connect to the Bisq network (peers). It is different from, and does not affect, the Tor addresses of external services Bisq might connect to (like public <a href="../connecting-to-your-own-bitcoin-node/">Bitcoin nodes</a>).</p>
<span class="wiki-legacy-anchor" id="Important_Considerations_Before_Changing" aria-hidden="true"></span><h2 id="important-considerations-before-changing"> Important Considerations Before Changing </h2>
<p><strong>CRITICAL WARNING: Do NOT change your onion address if you have any open trades or <a href="../dispute-resolution-in-bisq-1/">open disputes</a>.</strong> Doing so will make your Bisq instance unreachable by your peers in those specific contexts. You will be unable to complete those trades or disputes, likely resulting in loss of funds (security deposits or trade amounts).</p>
<ul>
<li><strong>Open offers are OK:</strong> If you only have open *offers* (not accepted trades), it is safe to proceed. Bisq will automatically update your offers with the new onion address when it restarts.</li>
<li><strong>Backup Importance:</strong> This procedure involves deleting a folder. <a href="../backing-up-application-data/">Backing up</a> your <strong>entire Bisq <a href="../data-directory/">data directory</a></strong> beforehand is strongly recommended. At a minimum, ensure the `hiddenservice` folder within the Tor directory is backed up (see steps below). This <a href="../backing-up-application-data/">backup</a> allows you to revert to your old address if absolutely necessary (e.g., an unexpected issue arises with a recently completed trade requiring dispute).</li>
<li><strong>Local Reputation Reset:</strong></li>
</ul>
<aside class="wiki-admonition" role="note"><p><strong>Note</strong></p><p>Changing your onion address will clear your <a href="../local-reputation/">local reputation</a>, as this reputation is tied to your address.</p>
</aside>
<span class="wiki-legacy-anchor" id="Checking_Your_Current_Onion_Address" aria-hidden="true"></span><h2 id="checking-your-current-onion-address"> Checking Your Current Onion Address </h2>
<p>You can verify your current Bisq onion address type: 1. Go to `Settings` &gt; `Network Info`. 2. Scroll down to the "Bisq network" section. 3. Your address will be displayed. A modern Tor v3 address is a 56-character string. (Older, now deprecated, v2 addresses were 16 characters).</p>
<figure class="wiki-source-image" id="source-image-1"><a href="../../media/wiki/f8e17d7fdcf3e12da16e8c884e663e9b04fb0bd482ba7a614501f626e27629be.png"><img alt="Check your current onion address under Settings &gt; Network Info." decoding="async" height="694" loading="lazy" src="../../media/wiki/f8e17d7fdcf3e12da16e8c884e663e9b04fb0bd482ba7a614501f626e27629be.png" width="1200"></a><figcaption>Check your current onion address under Settings &gt; Network Info.<br><small>Historical thumbnail; original resolution not recovered. <a href="../../recovered-media/">Provenance catalogue</a>.</small></figcaption></figure>
<div>
</div>
<span class="wiki-legacy-anchor" id="Step_1:_Back_Up_Your_`hiddenservice`_Directory" aria-hidden="true"></span><h2 id="step-1-back-up-your-hiddenservice-directory"> Step 1: Back Up Your `hiddenservice` Directory </h2>
<p><strong>Before proceeding, ensure Bisq is completely closed.</strong></p>
<p>Navigate to your <a href="../data-directory/">data directory</a>. Find the Tor folder within it, relevant to your operating system and network (e.g., `btc_mainnet/tor/`).</p>
<p><strong>Create a safe <a href="../backing-up-application-data/">backup copy</a></strong> of the entire `hiddenservice` folder found inside that Tor directory. This folder contains the private keys for your current onion address.</p>
<span class="wiki-legacy-anchor" id="Step_2:_Generate_the_New_Onion_Address" aria-hidden="true"></span><h2 id="step-2-generate-the-new-onion-address"> Step 2: Generate the New Onion Address </h2>
<p>With Bisq still closed and the `hiddenservice` folder safely backed up:</p>
<p>1. <strong>Delete</strong> the original `hiddenservice` folder from your Bisq <a href="../data-directory/">data directory</a> (the one inside `btc_mainnet/tor/` or similar). 2. <strong>Restart Bisq.</strong> 3. <strong>Be Patient:</strong> When Bisq restarts after the `hiddenservice` folder is deleted, it needs to generate new Tor keys and register the new v3 address.</p>
<p><code>   * This process can take </code><strong><code>up to 10 minutes</code></strong><code>.</code><br>
<code>   * It is </code><strong><code>resource-intensive</code></strong><code> (uses significant RAM). Close other demanding applications beforehand.</code><br>
<code>   * Bisq </code><strong><code>may appear unresponsive</code></strong><code> during this time. Do not force quit; let it run.</code></p>
<p>4. Once the process completes, Bisq will start normally, and you will have a new Tor v3 onion address. You can verify it under `Settings &gt; Network Info`.</p>
<p>Remember to create new <a href="../backing-up-application-data/">backups</a> that include your new `hiddenservice` folder.</p>
</div>
