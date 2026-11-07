---
title: "Network roles, bonds and accountability"
description: "Understand mediators, security roles, infrastructure nodes, bonds and authorization."
---

*Checked 7 November 2026 · Bisq 2 v2.1.15.*

Bisq 2 depends on contributors running authorized roles and data services. A role badge identifies a network responsibility; it does not give its holder custody of an Easy trade's money or an ability to guarantee recovery.

## User-facing and security roles

| Role | Purpose and limits |
| --- | --- |
| Mediator | Helps the traders cooperate and gathers evidence; cannot force an Easy payout |
| Moderator | Reviews spam, reports and serious rule violations; profile bans are not the same as confiscating funds |
| Security manager | Publishes authorized security/ban/alert information and protocol halt data |
| Release manager | Publishes release/update notifications; notification alone does not replace installer verification |

The current role enum also contains ARBITRATOR. That code entry is not evidence that Bisq 1 arbitration payouts apply to standard Bisq Easy. Read the [protocol distinction](../protocols/) and [Easy help](../get-help/).

## Infrastructure nodes

- **Seed nodes** help new peers discover/synchronize network data.
- **Oracle nodes** bridge authorized DAO/reputation information and timestamps into Bisq 2. They connect proof such as burns, bonds and Bisq 1 account witnesses with Bisq 2 identities.
- **Explorer nodes** provide blockchain transaction information used by the application.
- **Market-price nodes** provide quotes used for offer pricing and conversions. A price feed is not the final settlement amount; review the offer.

These roles differ from a seller's reputation bond. Running a local verification service may reduce dependence on a third party, but becoming a recognized authorized publisher has a registration and proof process.

## Becoming a role holder

Discuss the proposed role, responsibilities, operational capacity and bond with contributors through the public proposal process. DAO role approval, the actual BSQ lockup and Bisq 2 registration are distinct steps. The checked registration request includes the profile, role, bond username, signature/proof and lockup transaction ID. **A successful vote does not itself magically create a wallet lockup transaction.** Follow the role-specific current instructions and verify the bond on the DAO chain.

Current authorization code has a temporary restriction requiring static oracle keys for oracle authorization. The old claim that all roles are freely delegable or entirely bootstrapped from dynamic bonds is therefore too broad.

## Misconduct and confiscation

Preserve evidence and report the issue publicly through the appropriate proposal/support channel without posting secrets. A DAO confiscation proposal has its own voting rules and chain state; neither a moderator ban nor a mediator's recommendation automatically confiscates a bond or pays a victim. Check the current [DAO governance guidance](../../dao/overview/#why-a-dao) for the actual process and parameters rather than assuming the old 200,000 BSQ/85% numbers never change.

<details>
<summary>Sources and checks</summary>

[BondedRoleType.java (pinned source)](https://github.com/bisq-network/bisq2/blob/cfe8ab251f2b6579f29e9955036afc33ba36861e/bonded-roles/src/main/java/bisq/bonded_roles/BondedRoleType.java#L30-L42) · [BondedRoleRegistrationService.java (pinned source)](https://github.com/bisq-network/bisq2/blob/cfe8ab251f2b6579f29e9955036afc33ba36861e/bonded-roles/src/main/java/bisq/bonded_roles/registration/BondedRoleRegistrationService.java#L53-L89) · [AuthorizedBondedRolesService.java (pinned source)](https://github.com/bisq-network/bisq2/blob/cfe8ab251f2b6579f29e9955036afc33ba36861e/bonded-roles/src/main/java/bisq/bonded_roles/bonded_role/AuthorizedBondedRolesService.java#L78-L80) · [bisq_easy.properties (pinned source)](https://github.com/bisq-network/bisq2/blob/cfe8ab251f2b6579f29e9955036afc33ba36861e/i18n/src/main/resources/bisq_easy.properties#L428-L436).

Current enum, registration proof and static-oracle restriction checked. Governance quorum/acceptance parameters left to current DAO documentation; no timeless historic threshold claim.

Adapted from **Bisq 2 Roles**, revision 3957 (2025-04-15). [Exact source](../../wiki-source/bisq-2-roles.wiki.txt) · [Attribution and revision metadata](../../wiki-source/bisq-2-roles.json).

</details>
