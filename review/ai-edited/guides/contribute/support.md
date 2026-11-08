---
title: Support work and transaction context
description: Triage a Bisq 1 issue while protecting user data and preserving evidence.
---

*Source checked 7 November 2026 · Maintainer review pending.*

## Support Agent

Support contributors help users describe problems, identify the correct product and trade protocol, communicate reproducible issues to maintainers, and improve support material. Verify current staffing and procedures through the [support team](https://github.com/bisq-network/support) and [role issue](https://github.com/bisq-network/roles/issues/64); a recovered list of names, response times, internship rules and compensation rates is a historical snapshot, not a current roster or entitlement.

Collect only information needed for the question. A useful report states the app version, OS, approximate time, expected and observed behavior, and whether an offer or trade is open. Trade identifiers, transaction IDs, payment data, onion addresses, screenshots and logs can reveal sensitive information. Agree a private channel and recipient before sharing them; redact unnecessary account data and secrets. Never request seed words, wallet passwords or private keys. If developers need logs, preserve relevant context and ask what they need rather than posting full files publicly.

## Support Agent Knowledge Base

### Trace a Bisq 1 trade

The recovered support material describes a classic Bisq 1 trade as involving maker and taker fee transactions, a deposit transaction, and either a normal payout or delayed payout path. A support operator can inspect transaction inputs and outputs to see whether the expected chain is present. The older source described the second output of each maker/taker fee transaction leading to the same deposit, whose multisignature output is spent by either the normal payout or delayed payout. It described a delayed payout with a single deposit input and a recipient output, and stressed escalating a mismatch before a refund. These are versioned diagnostic details, not universal rules for every protocol or release. A normal payout and delayed payout are alternatives spending the deposit's multisignature output; do not treat a single explorer's view or an old diagram as conclusive evidence that a refund is due. Escalate mismatches and warnings to qualified maintainers.

The three figures below are historical attachments used to illustrate transaction flow. Their mapping to wiki filenames is inferred from the documented migration and image order; exact byte identity with the lost wiki files is not established.

<a href="../../media/wiki/fabea2a80e8989a713608343948381d7ac4cb38709e064601870d348d70b3403.png"><img src="../../media/wiki/fabea2a80e8989a713608343948381d7ac4cb38709e064601870d348d70b3403.png" alt="Historical support transaction-flow figure 1" loading="lazy" /></a>

<a href="../../media/wiki/0d7c159da59da6965b50f899470eba4a50a224eb34967206c5d4d8a7f6d862de.png"><img src="../../media/wiki/0d7c159da59da6965b50f899470eba4a50a224eb34967206c5d4d8a7f6d862de.png" alt="Historical support transaction-flow figure 2" loading="lazy" /></a>

<a href="../../media/wiki/af353bf861fcff52783689dbdc5a7cd232940fa4c494a98cae677fa2bcae44ba.png"><img src="../../media/wiki/af353bf861fcff52783689dbdc5a7cd232940fa4c494a98cae677fa2bcae44ba.png" alt="Historical support transaction-flow figure 3" loading="lazy" /></a>

### Missing transaction or connection

A transaction missing from one mempool may be unknown to that node, evicted, unbroadcast or otherwise unavailable; mempools differ. Compare evidence before deciding what happened. The old guide describes a case where a missing fee transaction can prevent the dependent deposit from confirming, and suggests deactivating open offers while investigating. It is not a universal reimbursement rule.

An SPV resync can be lengthy and should not be a routine answer to connection problems. First distinguish Bitcoin-node sync, configured nodes, network connectivity and Tor problems. Back up the application data before any recovery action and consult [current Bisq 1 backup guidance](../../bisq-1/backup-and-recovery/) and qualified support. Do not delete Tor identity keys or database files as a generic troubleshooting step; changing them can affect identity, reputation and open activity.

### Wallet and logs

The historical guide distinguished available, reserved and multisignature-locked funds and noted that wallet-inspection tools can expose private keys. Do not ask users to disclose their contents. It recorded historical derivation examples `M/44H/0H/1H` (BTC SegWit), `M/44H/0H/0H` (BTC legacy) and `M/44H/142H/0H` (BSQ). Paths are version-specific, not a substitute for a verified recovery procedure, and must not be used to move BSQ in an unaware wallet. Keep BSQ in a BSQ-aware wallet. A full data-directory backup preserves context that a seed alone does not; rolling logs and backups can age out. Interpret `ERROR` messages with surrounding context and developer help rather than treating every message as a critical fault.

## Sources and review

Sources: [Bisq 1 support repository](https://github.com/bisq-network/support), [Bisq 1 v1.10.11 source](https://github.com/bisq-network/bisq/tree/ea9d5dff90c99ac462f2b0a7bf9ef92683956619), and the recovered [support knowledge base](../../wiki-source/support-agent-knowledge-base.wiki.txt). The transaction illustrations are historical; protocol behavior and remedies must be checked for the affected release. No user data or live trade was accessed.
