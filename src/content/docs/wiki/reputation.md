---
title: "Reputation"
slug: "wiki/reputation"
tableOfContents: false
---

<nav data-pagefind-ignore class="wiki-source-toc" aria-label="Article sections"><details><summary>On this page</summary><ul><li><a href="#reputation-in-bisq-easy">Reputation in Bisq Easy</a></li><li><a href="#why-reputation-matters">Why Reputation Matters</a></li><li><a href="#reputation-trade-rules-version-2-1-1-and-later">Reputation &amp; Trade Rules (Version 2.1.1 and Later)</a></li><li><a href="#understanding-reputation-stars">Understanding Reputation Stars</a></li><li><a href="#how-to-build-reputation">How to Build Reputation</a></li><li><a href="#method-1-burning-bsq">Method 1: Burning BSQ</a></li><li><a href="#method-2-bonding-bsq">Method 2: Bonding BSQ</a></li><li><a href="#method-3-importing-bisq-1-account-age">Method 3: Importing Bisq 1 Account Age</a></li><li><a href="#method-4-importing-bisq-1-signed-account-age">Method 4: Importing Bisq 1 Signed Account Age</a></li><li><a href="#reputation-simulation-tool">Reputation Simulation Tool</a></li><li><a href="#what-happens-if-a-profile-is-banned">What Happens if a Profile is Banned?</a></li></ul></details></nav>

<div class="wiki-recovered-article" lang="en">

<span class="wiki-legacy-anchor" id="Reputation_in_Bisq_Easy" aria-hidden="true">
</span>

## Reputation in Bisq Easy {#reputation-in-bisq-easy}

Reputation is a cornerstone of the security model in **[Bisq Easy](../bisq-easy/)**, a [Bisq 2](../bisq-2/) trade protocol. As buyers send their fiat payment *before* receiving Bitcoin, the seller\'s reputation provides the trust needed for the buyer to proceed confidently.

<aside class="wiki-admonition" role="note">

**Warning**

**Important Version Requirement:** Please note that due to security updates, active trading on the Bisq network requires using software **version 2.1.6 or higher**. The reputation system described here applies to users on compatible versions participating in the [Bisq Easy](../bisq-easy/) protocol.

</aside>

<figure class="wiki-source-image" id="source-image-1"><a href="../../media/wiki/bc9d43f3ea31feccaece81b71a83d09bae88a4c99c08bc11b6b5be24ff1ee3ea.png"><img alt="The 'Build reputation' screen in Bisq 2 (accessed via 'Reputation' on the left menu), showing the four methods available." decoding="async" height="2560" loading="lazy" src="../../media/wiki/bc9d43f3ea31feccaece81b71a83d09bae88a4c99c08bc11b6b5be24ff1ee3ea.png" width="4096"></a><figcaption>The 'Build reputation' screen in Bisq 2 (accessed via 'Reputation' on the left menu), showing the four methods available.<br><small>Historical full-size recovered source. <a href="../../recovered-media/">Provenance catalogue</a>.</small></figcaption></figure>
<p><br>
</p>

<span class="wiki-legacy-anchor" id="Why_Reputation_Matters" aria-hidden="true">
</span>

### Why Reputation Matters {#why-reputation-matters}

- **For Buyers:** Carefully review a seller\'s reputation (shown as stars) before accepting an offer. Choosing sellers with a higher reputation is crucial for minimizing trade risks.
- **For Sellers:** Building and maintaining a high reputation is essential. It increases buyer trust, makes your offers more attractive, helps you get more trades, and allows you to offer larger trade amounts. Maximizing reputation is key to success as a seller on [Bisq Easy](../bisq-easy/). There is expected to be competition among sellers to achieve higher reputation scores.

<span class="wiki-legacy-anchor" id="Reputation_&amp;_Trade_Rules_(Version_2.1.1_and_Later)" aria-hidden="true">
</span>

### Reputation & Trade Rules (Version 2.1.1 and Later) {#reputation-trade-rules-version-2-1-1-and-later}

Starting with **[Bisq 2](../bisq-2/) version 2.1.1**, several important rules link reputation directly to trading activity (within the currently required software version):

- **Seller\'s Maximum Trade Amount:** The maximum amount a seller can offer in a single trade now directly depends on their reputation score. Higher reputation allows sellers to create offers for larger amounts.
- **System Trade Limits:** While a seller\'s maximum depends on their reputation, the overall limits for *any* [Bisq Easy](../bisq-easy/) trade are fixed between the fiat equivalent of **6 USD** (minimum) and **600 USD** (maximum). This avoids issues with Bitcoin price swings. (Note: Before v2.1.1, limits were 0.0001 - 0.01 BTC).
- **Enhanced BSQ Value:** To reward commitment and long-term participation, [BSQ](../introduction-to-the-dao/) that is **burned** or **bonded** for reputation now contributes **double its initial value** to the score over the course of the first year (the score increases linearly during that year). This allows sellers to increase their eligible trade limits more quickly.
- **Minimum Score Setting Removed:** The previous option for buyers to set a specific minimum required reputation score for sellers (formerly defaulted to 30000) was removed in v2.1.1. The system now relies on the direct link between reputation and the allowed trade amount as a better way to handle risk.

<figure class="wiki-source-image" id="source-image-2"><a href="../../media/wiki/874ce21a59286f634d28b4917da11e9aa40fc159122654178590bbd7b18870da.png"><img alt="General Bisq Easy trade limits are 6 USD to 600 USD (or fiat equivalent). A seller's specific maximum offer size within this range depends on their reputation." decoding="async" height="1596" loading="lazy" src="../../media/wiki/874ce21a59286f634d28b4917da11e9aa40fc159122654178590bbd7b18870da.png" width="2136"></a><figcaption><p>General <a href="../bisq-easy/">Bisq Easy</a> trade limits are 6 USD to 600 USD (or fiat equivalent). A seller's specific maximum offer size within this range depends on their reputation.</p>
<br><small>Historical full-size recovered source. <a href="../../recovered-media/">Provenance catalogue</a>.</small></figcaption></figure>
<figure class="wiki-source-image" id="source-image-3"><a href="../../media/wiki/aba76dfb345273634505845f61e2f1cc7f91adac7962130de89e2398ad6ce590.png"><img alt="Previously, Bisq warned if trading below a set minimum score; this setting was removed in v2.1.1." decoding="async" height="1596" loading="lazy" src="../../media/wiki/aba76dfb345273634505845f61e2f1cc7f91adac7962130de89e2398ad6ce590.png" width="2136"></a><figcaption>Previously, Bisq warned if trading below a set minimum score; this setting was removed in v2.1.1.<br><small>Historical full-size recovered source. <a href="../../recovered-media/">Provenance catalogue</a>.</small></figcaption></figure>
<p><br>
</p>

<span class="wiki-legacy-anchor" id="Understanding_Reputation_Stars" aria-hidden="true">
</span>

### Understanding Reputation Stars {#understanding-reputation-stars}

To make reputation easy to compare quickly, [Bisq Easy](../bisq-easy/) displays scores using a simple **0 to 5 star system**.

<figure class="wiki-source-image" id="source-image-4"><a href="../../media/wiki/487b180fd114aa377eff356e141ed66650ea58235b1d56ac356054fcabfc3900.png"><img alt="Historical star display. In v2.1.15, stars correspond to fixed score bands, while rank is relative to other scored users." decoding="async" height="598" loading="lazy" src="../../media/wiki/487b180fd114aa377eff356e141ed66650ea58235b1d56ac356054fcabfc3900.png" width="1601"></a><figcaption>Historical star display. In v2.1.15, stars correspond to fixed score bands, while rank is relative to other scored users.<br><small>Historical full-size recovered source. <a href="../../recovered-media/">Provenance catalogue</a>.</small></figcaption></figure>

- **How it Works (Fixed Score Bands):** In Bisq 2 v2.1.15, stars use fixed score bands: 0 below 1,200 points, then 0.5/1/1.5/2/2.5/3/3.5/4/4.5/5 stars at 1,200/5,000/15,000/20,000/25,000/30,000/35,000/40,000/60,000/100,000 points. The separate rank compares the profile with other scored users.
- **Why Rank Changes:** Changes to the set of active users can affect relative rank. They do not move the fixed star-score thresholds in v2.1.15.

<dl>
<dt></dt>
<dd>
<strong>User Inactivity:</strong> The source described roughly two-week inactive-profile exclusion. In Bisq 2 v2.1.15, UserProfile declares a 15-day record TTL; that metadata alone does not guarantee an exact inactivity, refresh or removal time. If a profile leaves the observed set, other users' relative ranks may change; the fixed star-score thresholds do not change.
</dd>
<dd>
<strong>User Reactivation:</strong> When an inactive user returns, their reputation is factored back in, potentially changing relative ranks again.
</dd>
</dl>

**In short:** Stars summarize the score band; rank compares the seller with other users. A changed rank is not by itself a changed star score.<br>

<span class="wiki-legacy-anchor" id="How_to_Build_Reputation" aria-hidden="true">
</span>

## How to Build Reputation {#how-to-build-reputation}

You can build your reputation score in [Bisq Easy](../bisq-easy/) using four methods, accessed via the **\`Reputation\`** section on the main left-hand menu in Bisq 2. Your **total reputation score** is calculated as the **sum** of the points gained from all methods you use. This total score determines your reputation rank, fixed star band and maximum trade offer size.

Reputation scores can change over time: points from [BSQ](../introduction-to-the-dao/) Bonds are lost when unlocked, but you can burn or bond [BSQ](../introduction-to-the-dao/) repeatedly. You can also import account age or signed account age, potentially replacing previous imported scores if the new import source is older.

<p><br>
</p>

<span class="wiki-legacy-anchor" id="Method_1:_Burning_BSQ" aria-hidden="true">
</span>

### Method 1: Burning BSQ {#method-1-burning-bsq}

You permanently **burn** [BSQ](../introduction-to-the-dao/) tokens to gain reputation. This represents a strong, long-term commitment to the network, akin to a proof of work. Follow the process displayed in the Bisq 2 Reputation section:

1. **Step 1:** Select the user profile in Bisq 2 for which you want to attach the reputation.
2. **Step 2:** Copy the **Profile ID** displayed. You will paste this into Bisq 1.
3. **Step 3:** Open **[Bisq 1](../bisq-1/)** and go to \`DAO\` > \`PROOF OF BURN\`. Paste the copied Profile ID into the **\`pre-image\`** field.
4. **Step 4:** Enter the amount of [BSQ](../introduction-to-the-dao/) you want to burn.
5. **Step 5:** Publish the Burn [BSQ](../bsq/) transaction.
6. **Step 6:** After blockchain confirmation your reputation will become visible in your Bisq 2 profile.

**Scoring Details:**

- **Initial Score:** **100 points** per [BSQ](../introduction-to-the-dao/) burned (Weight = 100).
- **12-Month Bonus:** The score **doubles** over the first year (increasing linearly from 100 to 200 points per [BSQ](../introduction-to-the-dao/) burned). This rewards long-term sellers.
- **Persistence:** Reputation from burning [BSQ](../introduction-to-the-dao/) is permanent for that profile (unless the profile is banned).
- **Cumulative:** You can burn [BSQ](../introduction-to-the-dao/) multiple times; scores add up.
- **Minimum Burn:** 5.46 [BSQ](../introduction-to-the-dao/) (dust limit).
- **Oracle Publishing:** Data about burned [BSQ](../introduction-to-the-dao/) is automatically published by the [oracle](../bisq-2-roles/).

<figure class="wiki-source-image" id="source-image-5"><a href="../../media/wiki/9a32933305126ddcb0b9f53b2d74b681c3b434bb9d707930f73b17315e38e130.png"><img alt="Burning BSQ in Bisq 1 requires your Bisq 2 Profile ID as the 'pre-image'." decoding="async" height="377" loading="lazy" src="../../media/wiki/9a32933305126ddcb0b9f53b2d74b681c3b434bb9d707930f73b17315e38e130.png" width="568"></a><figcaption><p>Burning <a href="../introduction-to-the-dao/">BSQ</a> in <a href="../bisq-1/">Bisq 1</a> requires your <a href="../bisq-2/">Bisq 2</a> Profile ID as the 'pre-image'.</p>
<br><small>Historical full-size recovered source. <a href="../../recovered-media/">Provenance catalogue</a>.</small></figcaption></figure>
<p><br>
</p>

<span class="wiki-legacy-anchor" id="Method_2:_Bonding_BSQ" aria-hidden="true">
</span>

### Method 2: Bonding BSQ {#method-2-bonding-bsq}

You lock up [BSQ](../introduction-to-the-dao/) tokens for a set period (minimum \~1 year) to gain reputation. This is refundable, but shows commitment for the lock duration. Like burning, regular bonding can represent user activity. Follow the process displayed in the Bisq 2 Reputation section:

1. **Step 1:** Select the user profile in Bisq 2 for which you want to attach the reputation.
2. **Step 2:** Copy the **Profile ID** displayed. You will paste this into Bisq 1.
3. **Step 3:** Open **[Bisq 1](../bisq-1/)** and go to \`DAO\` > \`BONDING\` > \`BONDED REPUTATION\`. Paste the copied Profile ID into the **\`salt\`** field.
4. **Step 4:** Enter the amount of [BSQ](../introduction-to-the-dao/) you want to lock up and the lock time (minimum **\`50000\`** blocks).
5. **Step 5:** Publish the lockup transaction.
6. **Step 6:** After blockchain confirmation your reputation will become visible in your Bisq 2 profile.

**Scoring Details:**

- **Initial Score:** **10 points** per [BSQ](../introduction-to-the-dao/) bonded (Weight = 10).
- **12-Month Bonus:** The score **doubles** over the first year (increasing linearly from 10 to 20 points per [BSQ](../introduction-to-the-dao/) bonded during the lock period).
- **Persistence:** Reputation lasts only **while the [BSQ](../introduction-to-the-dao/) remains bonded**. You lose these points when you unlock the bond.
- **Cumulative:** You can create multiple bonds; scores add up while active.
- **Minimum Lock Time:** 50,000 Bitcoin blocks (approximately 1 year).
- **Confiscation Risk:** In severe cases (like proven scamming), the Bisq [DAO](../introduction-to-the-dao/) can vote to confiscate (destroy) a user\'s bond. Confiscating requires high voter turnout (quorum) in the [DAO](../introduction-to-the-dao/), making it somewhat difficult but possible.
- **Oracle Publishing:** Data about bonded [BSQ](../introduction-to-the-dao/) is automatically published by the [oracle](../bisq-2-roles/).

<figure class="wiki-source-image" id="source-image-6"><a href="../../media/wiki/6e8ca2d1433888fd629fda4cefbd424c457f469368701baf5034a6fe3f4f9679.png"><img alt="Bonding BSQ in Bisq 1 uses your Bisq 2 Profile ID as the 'salt'." decoding="async" height="386" loading="lazy" src="../../media/wiki/6e8ca2d1433888fd629fda4cefbd424c457f469368701baf5034a6fe3f4f9679.png" width="567"></a><figcaption><p>Bonding <a href="../introduction-to-the-dao/">BSQ</a> in <a href="../bisq-1/">Bisq 1</a> uses your <a href="../bisq-2/">Bisq 2</a> Profile ID as the 'salt'.</p>
<br><small>Historical full-size recovered source. <a href="../../recovered-media/">Provenance catalogue</a>.</small></figcaption></figure>
<p><br>
</p>

<span class="wiki-legacy-anchor" id="Method_3:_Importing_Bisq_1_Account_Age" aria-hidden="true">
</span>

### Method 3: Importing Bisq 1 Account Age {#method-3-importing-bisq-1-account-age}

Leverage the history of your fiat accounts from [Bisq 1](../bisq-1/). The older the account, the more trustworthy the user is assumed to be (though this is considered a weaker form of reputation). Follow the process displayed in the Bisq 2 Reputation section:

1. **Step 1:** Select the user profile in Bisq 2 for which you want to attach the reputation.
2. **Step 2:** Copy the **Profile ID** displayed. You will paste this into Bisq 1.
3. **Step 3:** Open **[Bisq 1](../bisq-1/)** and go to \`ACCOUNT\` > \`NATIONAL CURRENCY ACCOUNTS\`.
   1. Select the oldest account you wish to use.
   2. Click the button **\`EXPORT ACCOUNT AGE FOR BISQ 2\`**.
   3. This copies the required JSON data (containing the proof signed with your Bisq 2 Profile ID) to your clipboard.
4. **Step 4:** Return to Bisq 2 and paste the JSON data from your clipboard into the text area provided (\'Json data from Bisq 1\').
5. **Step 5:** Click the **\`Request authorization\`** button.

**Scoring Details:**

- **Score:** **4 points** per day of the account\'s age (Weight = 4).
- **Maximum Age Counted:** 2000 days.
- **Maximum Score:** Capped at **8,000 points** (4 points/day \* 2000 days).
- **Which Account:** Uses the age of your single **oldest** [Bisq 1](../bisq-1/) fiat account. Scores from multiple accounts are **not** added together. Importing from an older account later can replace a previous score from this method.
- **Limitation:** Account age alone is usually **not enough** for significant reputation; combine with other methods.

<figure class="wiki-source-image" id="source-image-7"><a href="../../media/wiki/80e4d249850288f1032f7ebdb76bbab9c2ee2c7664a488783e836d4357904490.png"><img alt="Importing account age involves exporting proof from Bisq 1." decoding="async" height="427" loading="lazy" src="../../media/wiki/80e4d249850288f1032f7ebdb76bbab9c2ee2c7664a488783e836d4357904490.png" width="560"></a><figcaption><p>Importing account age involves exporting proof from <a href="../bisq-1/">Bisq 1</a>.</p>
<br><small>Historical full-size recovered source. <a href="../../recovered-media/">Provenance catalogue</a>.</small></figcaption></figure>
<p><br>
</p>

<span class="wiki-legacy-anchor" id="Method_4:_Importing_Bisq_1_Signed_Account_Age" aria-hidden="true">
</span>

### Method 4: Importing Bisq 1 Signed Account Age {#method-4-importing-bisq-1-signed-account-age}

Leverage the history of fiat accounts that completed the older signing process in [Bisq 1](../bisq-1/). The older the signed account, the more trustworthy the user is assumed to be (though still considered a weaker form of reputation than BSQ burn/bond). Follow the process displayed in the Bisq 2 Reputation section:

1. **Step 1:** Select the user profile in Bisq 2 for which you want to attach the reputation.
2. **Step 2:** Copy the **Profile ID** displayed. You will paste this into Bisq 1.
3. **Step 3:** Open **[Bisq 1](../bisq-1/)** and go to \`ACCOUNT\` > \`NATIONAL CURRENCY ACCOUNTS\`.
   1. Select the oldest *signed* account you wish to use.
   2. Click the button **\`EXPORT SIGNED WITNESS FOR BISQ 2\`**.
   3. This copies the required JSON data (containing the proof signed with your Bisq 2 Profile ID) to your clipboard.
4. **Step 4:** Return to Bisq 2 and paste the JSON data from your clipboard into the text area provided (\'Json data from Bisq 1\').
5. **Step 5:** Click the **\`Request authorization\`** button.

**Scoring Details:**

- **Minimum Age Required:** Signed account must be at least **61 days** old.
- **Score:** **10 points** per day of the signed account\'s age (Weight = 10).
- **Maximum Age Counted:** 2000 days.
- **Maximum Score:** Capped at **20,000 points** (10 points/day \* 2000 days).
- **Which Account:** Uses the age of your single **oldest** [Bisq 1](../bisq-1/) *signed* fiat account. Scores are **not** cumulative across multiple signed accounts for this method. Importing from an older signed account later can replace a previous score from this method.
- **Limitation:** Signed account age alone may **not be enough** for higher reputation tiers; combine with other methods.

<figure class="wiki-source-image" id="source-image-8"><a href="../../media/wiki/78698c9a25c9567a9d4149ae4b02fb46e383726530c4810e31ecd798b027a64d.png"><img alt="Importing signed account age involves exporting proof from a signed Bisq 1 account." decoding="async" height="399" loading="lazy" src="../../media/wiki/78698c9a25c9567a9d4149ae4b02fb46e383726530c4810e31ecd798b027a64d.png" width="565"></a><figcaption><p>Importing signed account age involves exporting proof from a signed <a href="../bisq-1/">Bisq 1</a> account.</p>
<br><small>Historical full-size recovered source. <a href="../../recovered-media/">Provenance catalogue</a>.</small></figcaption></figure>
<p><br>
</p>

<span class="wiki-legacy-anchor" id="Reputation_Simulation_Tool" aria-hidden="true">
</span>

## Reputation Simulation Tool {#reputation-simulation-tool}

Deciding how much [BSQ](../introduction-to-the-dao/) to burn or bond can be complex. [Bisq 2](../bisq-2/) provides a simulation tool (visible on the \'SCORE\' tab for Burning/Bonding/Import methods) to help sellers estimate the reputation score impact of these actions.

Find this tool within the **\`Reputation\`** section (accessible from the main left-hand menu). It helps visualize the immediate score increase and the potential score after the first year\'s doubling effect (for BSQ methods) or based on account age.

<figure class="wiki-source-image" id="source-image-9"><a href="../../media/wiki/be25fd666501baad767340bb00772d8ba76d6ccb6fc5ff59e3045b1af3419f43.png"><img alt="Simulating the reputation gained from burning BSQ." decoding="async" height="1348" loading="lazy" src="../../media/wiki/be25fd666501baad767340bb00772d8ba76d6ccb6fc5ff59e3045b1af3419f43.png" width="1924"></a><figcaption><p>Simulating the reputation gained from burning <a href="../introduction-to-the-dao/">BSQ</a>.</p>
<br><small>Historical full-size recovered source. <a href="../../recovered-media/">Provenance catalogue</a>.</small></figcaption></figure>
<figure class="wiki-source-image" id="source-image-10"><a href="../../media/wiki/6dbd80620dc007b503fea291e4c92125c216b1045dadea66df2fc5da4c5156b4.png"><img alt="Simulating the reputation gained from bonding BSQ." decoding="async" height="1348" loading="lazy" src="../../media/wiki/6dbd80620dc007b503fea291e4c92125c216b1045dadea66df2fc5da4c5156b4.png" width="1912"></a><figcaption><p>Simulating the reputation gained from bonding <a href="../introduction-to-the-dao/">BSQ</a>.</p>
<br><small>Historical full-size recovered source. <a href="../../recovered-media/">Provenance catalogue</a>.</small></figcaption></figure>
<p><br>
</p>

<span class="wiki-legacy-anchor" id="What_Happens_if_a_Profile_is_Banned?" aria-hidden="true">
</span>

## What Happens if a Profile is Banned? {#what-happens-if-a-profile-is-banned}

If a user\'s profile ID (which contains a public key hash tied to reputation) is banned by [moderators](../bisq-2-roles/) for severe or repeated violations of Bisq trade protocols, **all reputation associated with that specific profile ID is permanently lost** and becomes unusable. The reputation score will no longer be visible or count towards rankings. Banning may also trigger consequences in [Bisq 1](../bisq-1/) (e.g., [onion address](../changing-your-onion-address/) ban, [BSQ](../introduction-to-the-dao/) bond confiscation proposal via the [DAO](../introduction-to-the-dao/)).

</div>
