---
title: "Find your arbitrator or refund agent"
description: "Find the refund agent assigned to your trade and verify its public contact identity."
---

Start in **Support → Arbitration** for the affected trade. Bisq's current protocol calls the arbitrator a **refund agent** in contract fields. This is different from the mediator who proposes a payout from the traders' locked funds.

## Identify the agent for your trade

1. Find the trade in **Portfolio → Open trades**, **History**, or **Failed trades**.
2. Click **i** next to its trade ID and open **Detail data** (older versions say **View contract in JSON format**).
3. Find `refundAgentNodeAddress` and compare the full hostname and port below. Do not publish the full contract.
4. Once arbitration has opened, use its system message and support-agent entry to confirm the assignment.

## Public lookup in v1.10.11

### refundagent2

Matrix: `@refund-agent2:unredacted.org`

Public onion address: `3z5jnirlccgxzoxc6zwkcgwj66bugvqplzf6z2iyd5oxifiaorhnanqd.onion:9999`

### refundagent3

Matrix: `@refundagent3:imagisphe.re`

Public onion address: `yjlcxr6rho6zkpecwdp3vlpduzcl7i6cbgaquvxqmvsbw3dnheus6qad.onion:9999`

These are source-checked identity mappings as of 7 November 2026, not a freshly confirmed availability roster. A display name or unsolicited message alone does not authenticate anyone. If in-app contact fails, enter through [bisq.chat](https://bisq.chat/) and verify the current support-room information. The recovered guide suggests checking there after 72 hours without a reply or for urgent access failures; the old role description separately allowed up to five days for a response. Neither is a service guarantee.

## What the role can do

An arbitrator investigates the dispute and determines a proposed reimbursement. Under the post-v1.2 protocol, the agent holds no third key to the traders' 2-of-2 escrow. Opening arbitration spends the locked funds to Burning Men recipients. An agent may advance a reimbursement and later request DAO reimbursement, but current rules explicitly make that direct payment discretionary, not guaranteed.

Read [the arbitration protocol](../arbitration-protocol/) before escalating. Mediation and trader-chat history are not automatically shared with the arbitrator: send the relevant evidence again. If you need a mediator instead, use [the mediator lookup](../finding-your-mediator/).

<details>
<summary>Sources and scope</summary>

- [Finding your arbitrator — source revision 2026-03-12](../../wiki-source/finding-your-arbitrator.wiki.txt).
- [Arbitrator — source revision 2026-05-10](../../wiki-source/arbitrator.wiki.txt).
- [Current public agent mapping](https://github.com/bisq-network/bisq/blob/ea9d5dff90c99ac462f2b0a7bf9ef92683956619/core/src/main/java/bisq/core/support/dispute/agent/DisputeAgentLookupMap.java).
- [Current contract fields](https://github.com/bisq-network/bisq/blob/ea9d5dff90c99ac462f2b0a7bf9ef92683956619/core/src/main/java/bisq/core/trade/model/bisq_v1/Contract.java).
- [Current arbitration rules](https://github.com/bisq-network/bisq/blob/ea9d5dff90c99ac462f2b0a7bf9ef92683956619/core/src/main/resources/i18n/displayStrings.properties#L358-L371).
- [Arbitrator role issue](https://github.com/bisq-network/roles/issues/93).

Sources reviewed 7 November 2026. Current Bisq 1 code references are pinned to v1.10.11.

</details>
