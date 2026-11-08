---
title: "Find your mediator"
description: "Identify your assigned mediator and match public contact names without assuming live availability."
---

Use the mediator assigned to **your trade**, preferably through **Support → Mediation** in Bisq. A familiar name in a chat room is not proof that the person contacting you is that mediator.

## Find the assigned mediator

1. Open the trade in **Portfolio → Open trades**, **History**, or **Failed trades**.
2. Click the information **i** beside its trade ID, then **Detail data**.
3. Find the singular `mediatorNodeAddress` and its `hostName`. The plural `mediatorNodeAddresses`, if present, is a list of candidates, not your selection. Current detail data also includes a **Selected mediator** name when the application knows the address.
4. Once mediation is open, check the system message and support-agent entry in **Support → Mediation**.

Do not post the entire contract JSON publicly: it contains private trade and payment information.

<figure><a href="../../media/wiki/76ca6ed050ec023117c2114497a18c81b404cb2678136f2e6939d4631e2b1a98.png"><img src="../../media/wiki/76ca6ed050ec023117c2114497a18c81b404cb2678136f2e6939d4631e2b1a98.png" alt="Finding mediator message system" loading="lazy" /></a><figcaption>Historical illustration from Finding your mediator; current controls may differ.</figcaption></figure>

## Public mediator names and contact evidence

**Roster checked 7 November 2026.** The entries distinguish names encoded in v1.10.11 from dated public activity reports. Neither proves that an agent is online now or assigned to a particular trade.

### luis3672

Matrix: `@luis3672:matrix.org`

Mapped in the current Bisq 1 application; its address is marked as starting in cycle 79. This is a software identity mapping; current availability is unconfirmed.

### suddenwhipvapor

Matrix: `@suddenwhipvapor:matrix.org`

Current Bisq 1 mapping; the [cycle 86 report, 19 October 2026](https://github.com/bisq-network/roles/issues/83#issuecomment-6263354109) records Bisq 1 and Bisq Easy mediation.

### pazza83

Matrix: `@pazza83:matrix.org`

Current Bisq 1 mapping; the [cycle 86 report, 25 October 2026](https://github.com/bisq-network/roles/issues/83#issuecomment-6398395997) records mediation work.

### solomon1923

Matrix: `@solomon1923:matrix.org`

Included in the recovered mixed-product roster. The [26 October 2026 report](https://github.com/bisq-network/roles/issues/83#issuecomment-6422498404) explicitly concerns **Bisq 2**, not a Bisq 1 assignment.

### Match the public onion address

These public agent endpoints are preserved to compare with a trade contract, not as wallet destinations. Match the complete address and port. The current Bisq 1 source maps:

- **luis3672:** `ivxrrbvtzsr7tpp22x6lcoo2fkxyzvq2efjvwv5fhnzcjhrzdz63srid.onion:9999`
- **suddenwhipvapor:** `5wmuzi76l4ogbdh6ahvdafzlebk4c3sp3q5njhz5h5qa5fwbalexa7id.onion:9999`
- **pazza83:** `e2whe6q34o5mnta7b2rai4uspmj5wxhnhvipjjohicx6sgekw47apjqd.onion:9999`

Old trades can reference earlier endpoints. The source also maps luis3672's discontinued `aguejpkhhl67nbtifvekfjvlcyagudi6d2apalcwxw7fl5n7qm2ll5id.onion:9999`, and pazza83's cycle 50–71 address `d7m3j3u4jo2yuymgvxisklpitd3n5xbsnnpyz2mjh6bl6gmj5rjdxead.onion:9999`. An old endpoint does not mean the current agent is reachable there.

## If mediation chat is unavailable

Use [Bisq's public support entry point](https://bisq.chat/) to ask how to reach your assigned agent. The recovered guide recommends escalating after 48 hours without an in-app reply, or sooner for urgent access failures; this is not a guaranteed response time. Check the room's current topic and compare the full Matrix identity, not just its display name.

For Bisq Easy, use the trade details in **My open trades** and [Bisq 2 dispute help](../../bisq-2/get-help/#for-a-trade-problem); the Bisq 1 contract instructions above do not apply.

## What a mediator does

A mediator investigates both accounts of a dispute, checks the maker, taker and deposit transactions, and may request relevant payment evidence. They can propose a payout but cannot sign it for the traders. Both traders must accept for a mediated payout to complete. Cooperate and reply within 48 hours. Keep evidence in the dispute channel and redact unrelated personal information.

The historical role description also covers availability, bug reporting and DAO bonding. Those duties are not proof of live assignment. Never send a wallet seed or private key: the old mediation stub's suggestion to collect traders' private keys is superseded here by [local signing in the manual payout workflow](../manual-payout/).

<details>
<summary>Sources and scope</summary>

- [Finding your mediator — source revision 2026-06-30](../../wiki-source/finding-your-mediator.wiki.txt).
- [Mediator — source revision 2025-02-22](../../wiki-source/mediator.wiki.txt).
- [Mediation — source revision 2025-01-26](../../wiki-source/mediation.wiki.txt).
- [Current agent/address mapping](https://github.com/bisq-network/bisq/blob/ea9d5dff90c99ac462f2b0a7bf9ef92683956619/core/src/main/java/bisq/core/support/dispute/agent/DisputeAgentLookupMap.java).
- [Trade detail data](https://github.com/bisq-network/bisq/blob/ea9d5dff90c99ac462f2b0a7bf9ef92683956619/desktop/src/main/java/bisq/desktop/main/overlays/windows/TradeDetailsWindow.java).
- [Mediator role and dated reports](https://github.com/bisq-network/roles/issues/83).
- [Current trade rules](https://github.com/bisq-network/bisq/blob/ea9d5dff90c99ac462f2b0a7bf9ef92683956619/core/src/main/resources/i18n/displayStrings.properties#L347-L371).

Sources reviewed 7 November 2026. Current Bisq 1 code references are pinned to v1.10.11.

</details>
