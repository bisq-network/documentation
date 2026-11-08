---
title: DAO technical reference
description: BSQ validation, nodes, transaction types and governance data.
---

*Bisq 1 · Technical source checked 7 November 2026 · Maintainer review pending.*

This is a navigation and conceptual reference, not a transaction-building specification. The [v1.10.11 source](https://github.com/bisq-network/bisq/tree/ea9d5dff90c99ac462f2b0a7bf9ef92683956619/core/src/main/java/bisq/core/dao) and current application rules are authoritative. Manually creating BSQ transactions or sending BSQ through an unaware wallet can destroy its BSQ value.

## Token and validation

BSQ is a Bitcoin colored-coin interpretation: one BSQ represents 100 satoshis, and valid outputs trace to the genesis transaction or valid issuance. Bitcoin rules still apply; Bisq nodes apply additional DAO rules. Transaction outputs, ordering and payload types matter. `OP_RETURN` is used for particular DAO actions, not as a substitute for validating the transaction graph.

## Nodes, wallets and snapshots

A DAO full node derives state from Bitcoin blocks; lite nodes obtain the data needed to follow DAO state through Bisq's network. Seed nodes help peers exchange network data. The external DAO monitor, BSQ-aware explorer and application-internal monitor provide different views of state; an ordinary block explorer only sees Bitcoin transactions. Bisq maintains BTC and BSQ wallet views and checks parsed DAO state. Snapshots can reduce replay work, and releases may ship snapshots, but their height and integrity must be verified against the running version.

The historical implementation description says full DAO nodes use a Bitcoin Core node with RPC and scan new blocks; lite nodes request filtered DAO blocks, validate locally and compare state hashes from peers. Seed nodes provide P2P data and filtered blocks. Conflicting state warrants investigation and confirmations, not a guarantee that a single node is correct. The internal monitor describes chained state hashes and compares peer/seed hashes. In the checked v1.10.11 snapshot service, `SNAPSHOT_GRID` is a 20-block constant: it creates a candidate and persists an earlier candidate at a trigger. Startup/batch processing and reorganization recovery have special handling, so do not assume every observed snapshot is exactly 20 blocks old. Releases can include a snapshot; node counts and network conditions in the older prose are not current operational settings. A rebuild from genesis can be used to independently recompute state where supported.

## Transaction families

The following summarizes the documented design. Exact serialization, validation and supported transaction forms are defined by the running version's code; the examples are not instructions for constructing transactions. Output ordering matters: the documented parser interprets outputs as BSQ while sufficient valid BSQ inputs remain, so an incorrect order can invalidate BSQ. An unconfirmed transaction can be **unverified**; an **invalid** transaction violates BSQ rules and can destroy BSQ; an **irregular** transaction can fail its intended DAO use without necessarily destroying its BSQ (for example, a proposal confirmed outside its phase).

| Family | Inputs, outputs and checks in the documented design |
| --- | --- |
| Genesis | Initial valid BSQ outputs originated in the genesis transaction. The historical distribution was 3,657,480 BSQ, representing 3.65748 BTC, with no change output in the documented construction. |
| BSQ transfer | BSQ input funds the recipient and optional BSQ change; a separate BTC input can pay mining fees, with optional BTC change. A plain transfer does not require `OP_RETURN`. |
| Trade fee | The BSQ-input amount not returned as BSQ is burned and contributes to the mining fee. A historical 10 BSQ input and 9.5 BSQ BSQ-change example burns 0.5 BSQ. |
| Proposal | BSQ inputs fund the proposal fee, BTC inputs fund mining, and an `OP_RETURN` identifies the type and commits a 20-byte proposal payload hash. |
| Compensation or reimbursement | Adds a BTC issuance output to proposal-like structure. It is treated as BSQ issuance only if the relevant request is accepted at the result phase. |
| Blind vote | Locks stake in a BSQ output, pays a voting fee, and commits the encrypted vote payload hash. Spending the stake before reveal invalidates the vote. |
| Vote reveal | Spends the stake output; its payload includes the decryption key and a hash of the observed blind-vote list. The design describes a mining fee but no separate BSQ reveal fee. |
| Lockup and unlock | Lockup commits BSQ to a role or reputation bond. Unlock consumes that output and starts the encoded block-based waiting period; a locked or unlocking bond can be subject to governance confiscation. |
| Asset listing fee | Associates a BSQ fee with an asset ticker in the payload. Trial periods and volume criteria depend on DAO parameters. |
| Proof of burn | Burns BSQ and can commit a hash of a preimage; the source describes proving origin with that preimage and a signature. This is not the same thing as every other reputation mechanism. |

For example, the historical reference describes a 10 BSQ transfer using a 30 BSQ input, a 10 BSQ recipient output and 20 BSQ change, alongside BTC input and change for the miner fee. Its proposal example describes a 2 BSQ fee from a 10 BSQ input, returning 8 BSQ, plus BTC change and the commitment output. Amounts are illustrative, not current fees. The original examples and full payload byte layouts remain available as [exact source text](../../wiki-source/dao-technical-overview.wiki.txt).

## On-chain and peer-to-peer data

DAO-related transactions live on Bitcoin. Proposal and encrypted blind-vote payloads travel over the Bisq P2P network, with hashes and transaction IDs linking the two representations. The proposal payload is hashed without the later transaction ID, avoiding a circular dependency. A later verifier clears that ID before hashing again. The historical proposal layout described a one-byte type (`0x10`), one-byte version (`0x01`) and a 20-byte payload hash, produced by SHA-256 followed by RIPEMD-160 over serialized data. These bytes describe the historical source example, not a recipe for constructing a transaction. Temporary proposal payloads can be removed by their authorized publisher during the proposal phase; the historical design described verifying a signature against the publishing key and a 60-day payload time-to-live. Finalized payloads and blind-vote data are handled as append-only records. A hash proves a payload matches, not that every peer has received it.

<a href="../../media/wiki/9621cd36d07652bd96d99429862fd87d4072f2485af49f0fb1a284869c2d5aee.png"><img src="../../media/wiki/9621cd36d07652bd96d99429862fd87d4072f2485af49f0fb1a284869c2d5aee.png" alt="Historical diagram of the Bisq DAO data model" loading="lazy" /></a>

*Historical source diagram; see the current source and documentation for implementation details.*

## Cycle and consensus

A cycle moves through proposal, blind vote, reveal and result phases separated by breaks. The historical design describes phases in blocks rather than fixed wall-clock days. Voters select a stake; earned contribution merit can add weight and decays. The reveal makes the ballot decryptable. Nodes compare hashes of the blind-vote lists observed by revealers. In the checked v1.10.11 consensus code, when multiple data views conflict, the leading view must represent at least 80% of their total stake; the checked code sorts by stake and uses the hash as a deterministic tie-breaker; a zero total or a share below 0.8 raises a consensus error. This code constant concerns agreement on the vote list, distinct from each proposal’s quorum and approval threshold. Individual proposal types have quorum and threshold parameters, which can change through governance. Consult the current software for values.

The recovered reference recorded a genesis distribution of 3,657,480 BSQ to earlier contributors. In the checked v1.10.11 `Param.java`, mainnet defaults are 3,601 proposal blocks, 149 for the first break, 451 blind-vote blocks, 9 for the second break, 451 reveal blocks, 9 for the third break and 10 result blocks. The source explains that a boundary block is displayed in the following break, yielding historical UI descriptions of 3,600/150, 450/10 and 450/10. These phase durations are governance parameters, not fixed present-cycle values; inspect the application for the current cycle.

The pinned merit code defines 50,000 blocks per year and a linear two-year maximum age of 100,000 blocks. It also selects consensus rules by activation height: the checked code sets merit V2 at mainnet height 954,200 and a later cycle-wide issuance-uniqueness rule at hard-fork-3 height 963,350. The latter prevents the same issuance backing merit more than once per cycle after activation. These are code rules and activation heights, not a claim about the current chain tip; do not treat the simplified historical explanation as a complete implementation specification.

## Roles, reputation and fees

DAO parameters control aspects of the protocol. Bonded roles use lockup and unlock rules; confiscation is a separate governance action. Bonded reputation, asset-listing fees, and proof of burn have distinct transaction types and purposes. The former reference described an asset trial period in exchange for a BSQ listing fee, with minimum volume and fee parameters subject to voting. Its initial example was 1 BSQ per day with a 30-day minimum; that is historical, not a current fee quote. It also described a preimage and signature as a way to demonstrate the origin of a proof-of-burn transaction. The exact source text above records the older examples and byte layouts; do not infer that a particular role, fee, threshold or implementation remains unchanged.

## Sources and review

The [official technical overview](https://docs.bisq.network/dao-technical-overview.html) documents node types, all transaction families, P2P payloads, cycle phases and examples. The [DAO user reference](https://docs.bisq.network/dao-user-reference.html) describes the data model and voting process. Pinned Bisq 1 v1.10.11 implementation checks: [vote-list consensus](https://github.com/bisq-network/bisq/blob/ea9d5dff90c99ac462f2b0a7bf9ef92683956619/core/src/main/java/bisq/core/dao/governance/voteresult/VoteResultConsensus.java), [merit rule selection](https://github.com/bisq-network/bisq/blob/ea9d5dff90c99ac462f2b0a7bf9ef92683956619/core/src/main/java/bisq/core/dao/governance/merit/MeritConsensus.java), [merit decay](https://github.com/bisq-network/bisq/blob/ea9d5dff90c99ac462f2b0a7bf9ef92683956619/core/src/main/java/bisq/core/dao/governance/merit/MeritConsensusV2.java), [hard-fork heights](https://github.com/bisq-network/bisq/blob/ea9d5dff90c99ac462f2b0a7bf9ef92683956619/core/src/main/java/bisq/core/dao/DaoHardFork.java), [phase parameters](https://github.com/bisq-network/bisq/blob/ea9d5dff90c99ac462f2b0a7bf9ef92683956619/core/src/main/java/bisq/core/dao/governance/param/Param.java), [snapshot service](https://github.com/bisq-network/bisq/blob/ea9d5dff90c99ac462f2b0a7bf9ef92683956619/core/src/main/java/bisq/core/dao/state/DaoStateSnapshotService.java), [full node](https://github.com/bisq-network/bisq/blob/ea9d5dff90c99ac462f2b0a7bf9ef92683956619/core/src/main/java/bisq/core/dao/node/full/FullNode.java), and [lite node](https://github.com/bisq-network/bisq/blob/ea9d5dff90c99ac462f2b0a7bf9ef92683956619/core/src/main/java/bisq/core/dao/node/lite/LiteNode.java). Source material also includes the recovered [technical overview](../../wiki-source/dao-technical-overview.wiki.txt) and [user reference](../../wiki-source/dao-user-reference.wiki.txt). No live node or DAO transaction was operated.
