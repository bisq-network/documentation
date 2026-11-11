---
title: "Reputation2"
slug: "wiki/reputation2"
tableOfContents: false
---

<nav data-pagefind-ignore class="wiki-source-toc" aria-label="Article sections"><details open><summary>On this page</summary><ul><li><a href="#minimum-reputation-score">Minimum Reputation Score</a></li><li><a href="#reputation-score-star-system">Reputation score star system</a></li><li><a href="#why-is-reputation-important-for-sellers">Why is Reputation important for sellers</a></li><li><a href="#how-to-build-reputation">How to build reputation</a></li><li><a href="#burning-bsq">Burning BSQ</a></li><li><a href="#setting-up-a-bsq-bond">Setting up a BSQ bond</a></li><li><a href="#importing-the-account-age-from-bisq-1">Importing the Account Age from Bisq 1</a></li><li><a href="#importing-the-signed-account-age-from-bisq-1">Importing the Signed Account Age from Bisq 1</a></li><li><a href="#reputation-simulation-tool">Reputation Simulation Tool</a></li><li><a href="#what-happens-when-a-user-profile-id-is-banned">What happens when a user profile ID is banned?</a></li></ul></details></nav>

<div class="wiki-recovered-article" lang="en">

Reputation is the security mechanism used for [Bisq Easy](../bisq-easy/), a [Bisq 2](../bisq-2/) trade protocol.

Bisq Easy does not use security deposits to ensure that trades go smoothly, instead buyers rely on the reputation of the sellers to ensure the trade goes smoothly.

Generally the higher the sellers reputation on Bisq Easy the higher the likelihood is of the trade being successful, and conversely, the lower the sellers reputation is on Bisq Easy the less the likelihood is of the trade being successful.

Buyers should look to choose sellers with a high reputation for their trades.

Sellers should look at how to maximize their reputation to ensure they get more trades.

<span class="wiki-legacy-anchor" id="Minimum_Reputation_Score" aria-hidden="true">
</span>

## Minimum Reputation Score {#minimum-reputation-score}

In Bisq 2 v2.1.15, seller reputation determines the allowed trade amount at 200 points per USD, within the 6–600 USD-equivalent protocol range.

A seller needs at least 1,200 points for the minimum 6 USD-equivalent amount. A score of 30,000 corresponds to 150 USD before the current currency conversion and validation.

The old configurable minimum-score setting is not the current amount-coverage rule; use the limit shown by v2.1.15.

Sellers seeking larger trades need a score that covers the proposed amount; more reputation does not guarantee buyers or a successful trade.

<span class="wiki-legacy-anchor" id="Reputation_score_star_system" aria-hidden="true">
</span>

## Reputation score star system {#reputation-score-star-system}

To make it easier for user\'s to compare the reputation scores of different traders, Bisq displays reputation scores as stars (0-5 stars).

To achieve this users\' total reputation scores are compared to other scores in the network and ranked and normalized to a value between 0 and 1.

The user with the highest ranking will have a value of 5 stars. The user with the lowest ranking will have a value of 0 stars.

The user profiles only stay for 2 weeks in the network in case a user is not active. Thus their associated reputation will disappear with their profile if being inactive for 2 weeks. This has an impact on the relative reputation score of all other users. For instance if the user with the highest reputation is inactive and gets removed from the network the next user with the highest reputation will become the highest ranked with 5 star. Once a inactive user becomes active again their reputation score will be taken into account in the relative ranking.

One could phrase it as: The reputation score star system is the relative ranking compared to the reputation of the active users in the network.

<figure class="wiki-source-image" id="source-image-1"><a href="../../media/wiki/4a74e12672e9e100563425b1b93eb5454b96cd63d8dfabbf5c52728b5bac4263.png"><img alt="Bisq converts a seller's reputation score into am easy to view star system. This makes it easy for buyers to see at a glance which are the most reputable sellers. The sellers with the highest reputation have 5 stars and the sellers with the lowest reputation will have 0 stars." decoding="async" height="300" loading="lazy" src="../../media/wiki/4a74e12672e9e100563425b1b93eb5454b96cd63d8dfabbf5c52728b5bac4263.png" width="815"></a><figcaption>Bisq converts a seller's reputation score into am easy to view star system. This makes it easy for buyers to see at a glance which are the most reputable sellers. The sellers with the highest reputation have 5 stars and the sellers with the lowest reputation will have 0 stars.<br><small>Historical full-size recovered source. <a href="../../recovered-media/">Provenance catalogue</a>.</small></figcaption></figure>

\
\
\
\
\
\
\
\
\
\
\
\
\
<br>

<span class="wiki-legacy-anchor" id="Why_is_Reputation_important_for_sellers" aria-hidden="true">
</span>

## Why is Reputation important for sellers {#why-is-reputation-important-for-sellers}

Bitcoin buyers send the fiat payment to the sellers prior to receiving the bitcoin. Therefore it is important for bitcoin sellers to have a good reputation to help establish trust with their potential trade partners.

It is expected that users that want to gain reputation to be bitcoin sellers on Bisq Easy will be experienced Bisq users that can provide buyers with a positive experience.

Selling bitcoin on Bisq Easy is expected to be profitable for the sellers in that they will likely choose to sell bitcoin over market price.

<span class="wiki-legacy-anchor" id="How_to_build_reputation" aria-hidden="true">
</span>

## How to build reputation {#how-to-build-reputation}

There are currently 4 options for creating reputation:

- Burning BSQ
- Setting up a BSQ bond
- Importing the Account Age from Bisq 1
- Importing the Signed Account Age from Bisq 1

The total score is calculated as sum of the individual reputation sources/events. The reputation scores of users\' will change over time due to:

- Reputation gained from bonding BSQ is lost when the bond is unlocked.
- Users can burn or bond BSQ repeatedly.
- Users can import signed accounts or aged accounts to replace previous gained reputation scores.

Also the representation of the reputation as stars next to the user profile will also change over time in respect of the score of other users profile IDs.

It is expected that there will be some competition between sellers to achieve higher reputation scores to get more trades from bitcoin buyers interested in trading with account with the most reputation.

You can access all 4 methods of increasing your reputation from the Bisq 2 reputation section found in \'User Options\' > \'Reputation\'

<figure class="wiki-source-image" id="source-image-2"><a href="../../media/wiki/f39e709da8d6b076fb62dabb768d7f217e27593c80220678447a2380cf22f717.png"><img alt="Reputation-section.png" decoding="async" height="315" loading="lazy" src="../../media/wiki/f39e709da8d6b076fb62dabb768d7f217e27593c80220678447a2380cf22f717.png" width="806"></a><figcaption>Reputation-section.png<br><small>Historical full-size recovered source. <a href="../../recovered-media/">Provenance catalogue</a>.</small></figcaption></figure>

\
\
\
\
\
\
\
\
\
\
\
\
<br>

<span class="wiki-legacy-anchor" id="Burning_BSQ" aria-hidden="true">
</span>

### Burning BSQ {#burning-bsq}

A user who wants to improve their reputation on the Bisq Easy trade protocol can can burn BSQ.

The more BSQ that is burned the better the reputation score the user would get.

The minimum amount of BSQ that can be burnt is 5.46 BSQ (dust limit).

The value gained by burning BSQ persists over time. Reputation scores achieved from burning BSQ is cumulative. It can be assumed that regular burning (e.g. each week or month) is a form of work and represents activity by the user resulting in a higher reputation score.

Data about the burned BSQ gets published automatically by the oracle node.

If a user gets banned by a moderator they will lose the reputation value that they gained from burning the BSQ as the reputation is linked to their profile and a banned profile cannot be used anymore.

**Follow these steps to burn BSQ for reputation:**

1. Select the user profile for which you want to attach the reputation
2. Copy the \"profile ID\"
3. Open Bisq 1 and go to \"DAO/PROOF OF BURN\" and paste the copied value into the \"pre-image\" field
4. Enter the amount of BSQ you want to burn
5. Publish the Burn BSQ transaction
6. After blockchain confirmation your reputation will become visible in your profile

On the bisq 2 app you will find this same information under \'User Options\' > \'Reputation\'

<figure class="wiki-source-image" id="source-image-3"><a href="../../media/wiki/9a32933305126ddcb0b9f53b2d74b681c3b434bb9d707930f73b17315e38e130.png"><img alt="Burning-bsq-reputation.png" decoding="async" height="377" loading="lazy" src="../../media/wiki/9a32933305126ddcb0b9f53b2d74b681c3b434bb9d707930f73b17315e38e130.png" width="568"></a><figcaption>Burning-bsq-reputation.png<br><small>Historical full-size recovered source. <a href="../../recovered-media/">Provenance catalogue</a>.</small></figcaption></figure>

\
\
\
\
\
\
\
\
\
\
\
\
\
\
<br>

<pre><code class="wiki-source-code" id="source-code-1">
&#10;Burning BSQ has the highest impact on the reputation score.
&#10;For every BSQ burnt the user receives a reputation score of 100. For example if a user burns 100 BSQ their reputation score will be increased by 10,000. Reputation obtained by burning will persist with that users profile.
&#10;To increase their reputation further a user can burn multiple times. The scores received are cumulative.
&#10;</code></pre>

<span class="wiki-legacy-anchor" id="Setting_up_a_BSQ_bond" aria-hidden="true">
</span>

### Setting up a BSQ bond {#setting-up-a-bsq-bond}

Similar to Burn BSQ but using refundable BSQ bonds.

BSQ needs to be bonded for a minimum of 50,000 blocks (about 1 year). During this time the BSQ is unavailable to the user. After 50,000 blocks the bond can be unlocked and the BSQ is available again to the user.

The value gained by bonding BSQ persists until the time the bond is unlocked. Reputation scores achieved from bonding BSQ is cumulative. It can be assumed that regular bonding (e.g. each week or month) is a form of work and represents activity by the user resulting in a higher reputation score.

A bond can be confiscated (destroyed by a Bisq DAO vote). This would only be done if a bond holder was scamming users. To confiscate a scammers bond requires high quorum at DAO voting, thus its more risky that the confiscation might fail.

Data about bonded BSQ gets published automatically by the oracle node.

**Follow these steps to bond BSQ for reputation:**

1. Select the user profile for which you want to attach the reputation
2. Copy the \"profile ID\"
3. Open Bisq 1 and go to \"DAO/BONDING/BONDED REPUTATION\" and paste the copied value into the \"salt\" field
4. Enter the amount of BSQ you want to lockup and the lock time (50000 blocks)
5. Publish the lockup transaction
6. After blockchain confirmation your reputation will become visible in your profile

On the bisq 2 app you will find this same information under \'User Options\' > \'Reputation\'

<figure class="wiki-source-image" id="source-image-4"><a href="../../media/wiki/6e8ca2d1433888fd629fda4cefbd424c457f469368701baf5034a6fe3f4f9679.png"><img alt="Bonding-bsq-reputation.png" decoding="async" height="386" loading="lazy" src="../../media/wiki/6e8ca2d1433888fd629fda4cefbd424c457f469368701baf5034a6fe3f4f9679.png" width="567"></a><figcaption>Bonding-bsq-reputation.png<br><small>Historical full-size recovered source. <a href="../../recovered-media/">Provenance catalogue</a>.</small></figcaption></figure>

\
\
\
\
\
\
\
\
\
\
\
\
\
\
<br>

<pre><code class="wiki-source-code" id="source-code-2">
Bonding BSQ has a high impact on the reputation score.
&#10;For every BSQ bonded the user receives a reputation score of 10. For example if a user bonds 1,000 BSQ their reputation score will be increased by 10,000. Reputation obtained by burning will persist with that users profile.
&#10;To increase their reputation further a user can bond multiple times. The scores received are cumulative. &#10;
Once the bond is unlocked the reputation score attributed to that bond is lost. &#10;</code></pre>

<span class="wiki-legacy-anchor" id="Importing_the_Account_Age_from_Bisq_1" aria-hidden="true">
</span>

### Importing the Account Age from Bisq 1 {#importing-the-account-age-from-bisq-1}

Users of Bisq 1 can gain reputation by importing their account age from Bisq 1 into Bisq 2.

Accounts ages from Bisq 1 could include any of the following account types:

Any Fiat account can be used.

The older the user\'s account age the more trustworthy the user will be assumed to be.

In case of repeated registrations the oldest account will be used (as it has the highest value). Multiple accounts do not get accumulated.

**Follow these steps to import your account age from Bisq 1 for reputation:**

1. Open the account age reputation section on Bisq 2
2. Select the user profile for which you want to attach the reputation
3. Copy the \"profile ID\" to paste on Bisq 1
4. Open Bisq 1 and go to \"ACCOUNT/NATIONAL CURRENCY ACCOUNTS\"
5. Select the oldest account and click \'Export Account\'
6. This will add a signed message with the Bisq 2 profile ID
7. Paste the signature from Bisq 1 in the account age reputation section on Bisq 2
8. Press \'Request authorization\' button

On the bisq 2 app you will find this same information under \'User Options\' > \'Reputation\'

<figure class="wiki-source-image" id="source-image-5"><a href="../../media/wiki/80e4d249850288f1032f7ebdb76bbab9c2ee2c7664a488783e836d4357904490.png"><img alt="Age-bsq-reputation.png" decoding="async" height="427" loading="lazy" src="../../media/wiki/80e4d249850288f1032f7ebdb76bbab9c2ee2c7664a488783e836d4357904490.png" width="560"></a><figcaption>Age-bsq-reputation.png<br><small>Historical full-size recovered source. <a href="../../recovered-media/">Provenance catalogue</a>.</small></figcaption></figure>

\
\
\
\
\
\
\
\
\
\
\
\
\
\
\
\
<br>

<pre><code class="wiki-source-code" id="source-code-3">
Importing an account age from Bisq 1 the lowest impact on the reputation score.
&#10;In Bisq 2 v2.1.15, each day of imported account age contributes 4 points. A 300-day-old account therefore contributes 1,200 points. Reputation obtained from importing their account age will be cumulative with all other reputation scores the user obtains.
&#10;Imported account age can cover a small trade, but its 8,000-point cap does not cover the maximum Bisq Easy trade amount.
&#10;The maximum reputation score from imported account age is 8,000 in v2.1.15. This can be achieved when importing accounts of 2,000 days old, or older. &#10;</code></pre>

<span class="wiki-legacy-anchor" id="Importing_the_Signed_Account_Age_from_Bisq_1" aria-hidden="true">
</span>

### Importing the Signed Account Age from Bisq 1 {#importing-the-signed-account-age-from-bisq-1}

Users of Bisq 1 can gain reputation by importing their signed account age from Bisq 1 into Bisq 2.

Any signed account from Bisq 1 can be used.

The older the user\'s signed account age the more trustworthy the user will be assumed to be.

In case of repeated registrations the oldest signed account will be used (as it has the highest value). Multiple accounts do not get accumulated. account will be used (as it has the highest value). Multiple accounts do not get accumulated.

**Follow these steps to import your signed account age from Bisq 1 for reputation:**

1. Open the account signed account age witness reputation section on Bisq 2
2. Select the user profile for which you want to attach the reputation
3. Copy the \"profile ID\" to paste on Bisq 1
4. Open Bisq 1 and go to \"ACCOUNT/NATIONAL CURRENCY ACCOUNTS\"
5. Select the oldest signed account and click \'Export Account\'
6. This will add a signed message with the Bisq 2 profile ID
7. Paste the signature from Bisq 1 in the signed account age witness reputation section on Bisq 2
8. Press \'Request authorization\' button

On the bisq 2 app you will find this same information under \'User Options\' > \'Reputation\'

<figure class="wiki-source-image" id="source-image-6"><a href="../../media/wiki/78698c9a25c9567a9d4149ae4b02fb46e383726530c4810e31ecd798b027a64d.png"><img alt="Signed-bsq-reputation.png" decoding="async" height="399" loading="lazy" src="../../media/wiki/78698c9a25c9567a9d4149ae4b02fb46e383726530c4810e31ecd798b027a64d.png" width="565"></a><figcaption>Signed-bsq-reputation.png<br><small>Historical full-size recovered source. <a href="../../recovered-media/">Provenance catalogue</a>.</small></figcaption></figure>

\
\
\
\
\
\
\
\
\
\
\
\
\
\
<br>

<pre><code class="wiki-source-code" id="source-code-4">
Importing a signed account age from Bisq 1  has a low impact on the reputation score.
&#10;In Bisq 2 v2.1.15, a signed witness must be at least 61 days old to score and contributes 10 points per day. A 300-day-old signed witness therefore contributes 3,000 points. Reputation obtained from importing their signed account age will be cumulative with all other reputation scores the user obtains.
&#10;Imported signed-account age can cover a small trade, but its 20,000-point cap does not cover the maximum Bisq Easy trade amount. &#10;
The maximum reputation score from imported signed account age is 20,000 in v2.1.15. This can be achieved when importing accounts of 2,000 days old, or older.
</code></pre>

<span class="wiki-legacy-anchor" id="Reputation_Simulation_Tool" aria-hidden="true">
</span>

## Reputation Simulation Tool {#reputation-simulation-tool}

For bitcoin sellers it can get a little complicated to work out what the best way is to increase their reputation. To help make the decision process easier Bisq 2 provides a simulation tool for sellers to see what different actions they can take to increase their reputation.

The simulation tool can be access from the reputation system. It can be used for both burning and bonding BSQ. Here is an screenshot showing it in use for burning BSQ.

<figure class="wiki-source-image" id="source-image-7"><a href="../../media/wiki/0de69e86ff5a9e552b1e048b7afc6679cb053f0271545eaf47e28c0a77dcc8f8.png"><img alt="Simulation-tool.png" decoding="async" height="371" loading="lazy" src="../../media/wiki/0de69e86ff5a9e552b1e048b7afc6679cb053f0271545eaf47e28c0a77dcc8f8.png" width="566"></a><figcaption>Simulation-tool.png<br><small>Historical full-size recovered source. <a href="../../recovered-media/">Provenance catalogue</a>.</small></figcaption></figure>

\
\
\
\
\
\
\
\
\
\
\
\
\
\
<br>

<span class="wiki-legacy-anchor" id="What_happens_when_a_user_profile_ID_is_banned?" aria-hidden="true">
</span>

## What happens when a user profile ID is banned? {#what-happens-when-a-user-profile-id-is-banned}

When a user profile ID is banned they lose all reputation associated with that profile ID.

The profile ID contains a pub key hash that is tied to a corresponding reputation score.

Once a user profile ID is banned their corresponding reputation score will no longer be visible.

Moderators will ensure that they only ban profile IDs that have severely, or repeatedly, violated Bisq trade protocols. Banned users might be impacted in Bisq 1 as well (e.g. their onion address will be banned, or a BSQ bond confiscation proposal is made, if applicable).

</div>
