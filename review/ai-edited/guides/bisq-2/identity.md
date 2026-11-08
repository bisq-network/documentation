---
title: "Profiles and identities"
description: "Separate profiles safely and protect the identity behind trades and reputation."
---

*Checked 7 November 2026 · Bisq 2 v2.1.15.*

An identity combines a user profile with its cryptographic/network identity. Bisq 2 can keep multiple identities in one installation. A username/avatar is a recognizable presentation, not a verified legal identity or a guarantee of honesty.

## Decide what to separate

You might use different profiles for buying and selling or for different currencies. This can reduce accidental mixing of interactions, but it does not create perfect unlinkability: repeated bank details, writing, timing or other shared information can connect profiles.

The source suggested personal/business/spouse accounts as examples. A new profile does **not** authorize using another person's payment account or changing the payer after a trade starts. Follow the account and payment rules for the actual trade.

## Create and switch carefully

Use the application's user-profile controls to create/select the desired profile and check the active avatar before publishing an offer, chatting, copying a Profile ID or requesting a reputation import. Current labels may differ from old “User options” menu screenshots.

Each profile's identity has its own network keys/address and Profile ID. The profile owns its reputation; burns, bonds and signed proofs must refer to that exact ID. An easy-to-change display name is not a safe substitute for checking the identifier.

## Deleting is consequential

The checked identity service forbids deleting the only remaining profile and retires the deleted identity. Its implementation explicitly warns deletion is unsafe while private chats/messages remain. Do not delete a profile needed for open offers, trades, support or reputation. Preserve a [full application backup](../backup-and-recovery/) and ask for help first.

Creating a replacement profile does not recreate the old conversation history, keys or reputation. A wallet seed cannot restore these application records.

<details>
<summary>Sources and checks</summary>

[UserIdentityService.java (pinned source)](https://github.com/bisq-network/bisq2/blob/cfe8ab251f2b6579f29e9955036afc33ba36861e/user/src/main/java/bisq/user/identity/UserIdentityService.java#L190-L225) · [reputation.properties (pinned source)](https://github.com/bisq-network/bisq2/blob/cfe8ab251f2b6579f29e9955036afc33ba36861e/i18n/src/main/resources/reputation.properties#L96-L195).

Identity edit/delete implementation and reputation association checked. Exact user-interface path is described by function rather than asserting old menu labels.

Adapted from **Identity**, revision 3528 (2024-03-13). [Exact source](../../wiki-source/identity.wiki.txt) · [Attribution and revision metadata](../../wiki-source/identity.json).

</details>
