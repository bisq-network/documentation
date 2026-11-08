---
title: "Build and understand Bisq Easy reputation"
description: "Understand score, fixed star bands, BSQ burns/bonds and account-age imports."
---

*Checked 7 November 2026 · Bisq 2 v2.1.15.*

Bisq Easy buyers pay before receiving BTC, so the seller's reputation is an important risk signal. **Reputation is not a guarantee, insurance or a security deposit that can be paid to the buyer.** Buyers should inspect the score's sources and choose an appropriate small amount.

## Score, ranking and stars

The current seller allowance is based on **score ÷ 200, expressed in USD**, capped by Easy's 600 USD protocol maximum. A score of 1,200 covers the 6 USD minimum; 30,000 corresponds to 150 USD before conversion/validation. The old 10,000/30,000 universal minimum settings are obsolete.

The **rank** compares a seller with other scored profiles. The **stars** use fixed score bands in v2.1.15; they are not the relative-ranking formula described in both older wiki versions:

| Score at least | Stars |
| --- | --- |
| 1,200 | 0.5 |
| 5,000 | 1 |
| 15,000 | 1.5 |
| 20,000 | 2 |
| 25,000 | 2.5 |
| 30,000 | 3 |
| 35,000 | 3.5 |
| 40,000 | 4 |
| 60,000 | 4.5 |
| 100,000 | 5 |

Below 1,200 the star value is 0. Rank can change when other profiles change; do not mistake that for a change in your score's underlying proof.

## Four active ways to build reputation

Select the correct profile first and copy **its Profile ID**. Attaching a burn or bond to the wrong profile is not a harmless display mistake. The service also tracks profile age, but its score contribution is currently 0.

### Burn BSQ

In Bisq 1, use **DAO → Proof of Burn**, put the Bisq 2 Profile ID in the pre-image field, check the amount and publish. Burning permanently destroys BSQ; do not send a burn merely to test a screen.

Each BSQ initially contributes 100 points, with a time boost rising linearly to 2× during the first year. Separate valid burns can accumulate. Authorized oracle data bridges the burn proof to the profile. Banning the profile makes the reputation unusable; it does not refund the burn.

<figure><a href="../../media/wiki/9a32933305126ddcb0b9f53b2d74b681c3b434bb9d707930f73b17315e38e130.png"><img src="../../media/wiki/9a32933305126ddcb0b9f53b2d74b681c3b434bb9d707930f73b17315e38e130.png" alt="BSQ proof-of-burn form using the Profile ID" loading="lazy" /></a><figcaption>BSQ proof-of-burn form using the Profile ID. Historical illustration; current screens and values may differ.</figcaption></figure>

### Bond BSQ

In Bisq 1, use **DAO → Bonding → Bonded Reputation**, put the Profile ID in the salt field, check the amount and lock time, and publish the lockup. The minimum reputation lock time is **50,000 blocks**, approximately a year rather than a guaranteed calendar deadline.

Each BSQ initially contributes 10 points, with the same first-year boost to 2×. The contribution becomes 0 when the bond is unlocked. Multiple valid bonds can contribute. Locked funds are unavailable, and DAO confiscation is a risk; this bond is not dedicated compensation collateral for one Easy buyer.

<figure><a href="../../media/wiki/6e8ca2d1433888fd629fda4cefbd424c457f469368701baf5034a6fe3f4f9679.png"><img src="../../media/wiki/6e8ca2d1433888fd629fda4cefbd424c457f469368701baf5034a6fe3f4f9679.png" alt="Bonded-reputation form using Profile ID as salt" loading="lazy" /></a><figcaption>Bonded-reputation form using Profile ID as salt. Historical illustration; current screens and values may differ.</figcaption></figure>

### Import Bisq 1 account age

In Bisq 2's reputation flow, select the profile and copy its ID. In Bisq 1's National Currency Accounts, select the intended old account and use the export for Bisq 2. Paste the signed JSON/proof into Bisq 2 and request authorization. Do not paste private keys or a wallet seed.

The current score is **4 points per account-age day**, capped at 2,000 days: at most 8,000 points. Older imported proof can replace a younger one; importing several accounts does not simply sum their ages.

<figure><a href="../../media/wiki/80e4d249850288f1032f7ebdb76bbab9c2ee2c7664a488783e836d4357904490.png"><img src="../../media/wiki/80e4d249850288f1032f7ebdb76bbab9c2ee2c7664a488783e836d4357904490.png" alt="Account-age export/import flow" loading="lazy" /></a><figcaption>Account-age export/import flow. Historical illustration; current screens and values may differ.</figcaption></figure>

### Import signed account age

Use the signed-witness export for the selected Bisq 1 account and the intended Bisq 2 Profile ID, then request authorization in Bisq 2. The signed witness must be at least **61 days** old to score. The score is **10 points per day**, capped at 2,000 days: at most 20,000 points.

This is different from importing ordinary account age. The old 2.5/5 point multipliers in Reputation 2 are superseded by current 4/10 weights.

<figure><a href="../../media/wiki/78698c9a25c9567a9d4149ae4b02fb46e383726530c4810e31ecd798b027a64d.png"><img src="../../media/wiki/78698c9a25c9567a9d4149ae4b02fb46e383726530c4810e31ecd798b027a64d.png" alt="Signed-account-age proof flow" loading="lazy" /></a><figcaption>Signed-account-age proof flow. Historical illustration; current screens and values may differ.</figcaption></figure>

## Simulate before committing funds

Use the application's score/simulation views to compare amount, lock time and age before a burn or bond. A simulation estimates reputation; it does not guarantee buyers, profits, a fixed premium or future protocol limits.

<figure><a href="../../media/wiki/be25fd666501baad767340bb00772d8ba76d6ccb6fc5ff59e3045b1af3419f43.png"><img src="../../media/wiki/be25fd666501baad767340bb00772d8ba76d6ccb6fc5ff59e3045b1af3419f43.png" alt="Burn score simulation" loading="lazy" /></a><figcaption>Burn score simulation. Historical illustration; current screens and values may differ.</figcaption></figure>

<figure><a href="../../media/wiki/6dbd80620dc007b503fea291e4c92125c216b1045dadea66df2fc5da4c5156b4.png"><img src="../../media/wiki/6dbd80620dc007b503fea291e4c92125c216b1045dadea66df2fc5da4c5156b4.png" alt="Bond score simulation" loading="lazy" /></a><figcaption>Bond score simulation. Historical illustration; current screens and values may differ.</figcaption></figure>

## Protect the identity behind the score

Keep a [full application backup](../backup-and-recovery/). Reputation is attached to the profile identity; creating another profile is not a way to transfer its score. Bans and deletion can make established reputation unusable. Report misconduct through [support](../get-help/); confiscation requires the applicable DAO process, not an instant mediator action.

<details>
<summary>Sources and checks</summary>

[ReputationService.java (pinned source)](https://github.com/bisq-network/bisq2/blob/cfe8ab251f2b6579f29e9955036afc33ba36861e/user/src/main/java/bisq/user/reputation/ReputationService.java#L170-L204) · [ProofOfBurnService.java (pinned source)](https://github.com/bisq-network/bisq2/blob/cfe8ab251f2b6579f29e9955036afc33ba36861e/user/src/main/java/bisq/user/reputation/ProofOfBurnService.java#L41-L96) · [BondedReputationService.java (pinned source)](https://github.com/bisq-network/bisq2/blob/cfe8ab251f2b6579f29e9955036afc33ba36861e/user/src/main/java/bisq/user/reputation/BondedReputationService.java#L42-L130) · [AccountAgeService.java (pinned source)](https://github.com/bisq-network/bisq2/blob/cfe8ab251f2b6579f29e9955036afc33ba36861e/user/src/main/java/bisq/user/reputation/AccountAgeService.java#L187-L196) · [SignedWitnessService.java (pinned source)](https://github.com/bisq-network/bisq2/blob/cfe8ab251f2b6579f29e9955036afc33ba36861e/user/src/main/java/bisq/user/reputation/SignedWitnessService.java#L197-L209) · [ProfileAgeService.java (pinned source)](https://github.com/bisq-network/bisq2/blob/cfe8ab251f2b6579f29e9955036afc33ba36861e/user/src/main/java/bisq/user/reputation/ProfileAgeService.java#L155-L158) · [reputation.properties (pinned source)](https://github.com/bisq-network/bisq2/blob/cfe8ab251f2b6579f29e9955036afc33ba36861e/i18n/src/main/resources/reputation.properties#L9-L32) · [reputation.properties (pinned source)](https://github.com/bisq-network/bisq2/blob/cfe8ab251f2b6579f29e9955036afc33ba36861e/i18n/src/main/resources/reputation.properties#L96-L195).

All formulas, fixed star thresholds, zero profile-age contribution and current import flows checked against pinned release source. Live burn/bond/import not executed. Old relative-stars and 10 k/30 k minimum claims corrected.

Adapted from **Reputation**, revision 4017 (2025-05-06). [Exact source](../../wiki-source/reputation.wiki.txt) · [Attribution and revision metadata](../../wiki-source/reputation.json).

Adapted from **Reputation 2**, revision 3730 (2024-10-03). [Exact source](../../wiki-source/reputation2.wiki.txt) · [Attribution and revision metadata](../../wiki-source/reputation2.json).

</details>
