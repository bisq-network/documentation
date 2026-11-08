---
title: "Bisq 1 questions and symptom guide"
description: "Find answers and specific diagnostics for common Bisq 1 trading, wallet and startup questions."
---

Bisq 1 is desktop peer-to-peer trading software with a local wallet, payment accounts and DAO tools. It is not a custodial exchange website. Its Bitcoin security deposits and dispute protocol differ from [Bisq Easy](../../start/choose-bisq/).

## Getting started and quiet markets

**Must I already own BTC?** Yes for classic Bisq 1 deposits and mining fees. See [funding and first BTC](../funding-and-fees/#get-your-first-btc). There is no fixed amount that fits every offer.

**Why are there no offers in my currency?** Check currency/payment filters, synchronization and account eligibility. Review **Market → Trades** for recent activity. A quiet book can contain people waiting for a maker; [making your own offer](../offers/) adds liquidity, but it requires staying online and does not guarantee a taker. Suitable payment methods and local awareness matter too.

**Must I use BSQ?** You can choose BTC trading fees for ordinary trades. BSQ fee payment and DAO participation are optional activities, while DAO state is part of the current application/protocol. Read [BSQ trading](../bsq-trading/) and [the DAO overview](../../dao/overview/).

**Must I keep funds in Bisq?** You can fund from and withdraw to an external wallet, but Bisq still uses its internal wallet and trade keys. Back them up. External funding does not bypass the deposit.

## Privacy and risk

Bisq does not hold fiat: payment goes to the peer using the agreed external service. Your counterparty still sees necessary payment details, a dispute agent may receive evidence, banks retain payment records, and Bitcoin transactions are public. Tor and local storage do not make every part of a trade anonymous. See [data privacy](../wallet-and-watch-only/#protect-trade-data).

A 2-of-2 escrow prevents a support agent from unilaterally taking its funds. Deposits and account signing create incentives and reduce some risks; they do not eliminate malware, noncooperation, chargebacks or loss of local keys. A reputation-only protocol has different identity/Sybil and trust tradeoffs; neither model is an unconditional safety guarantee.

The software is AGPLv3 open source. The current repository's license governs its code; it does not automatically settle every external image's attribution or reuse status.

## Payment started does not stick

If money was sent but Bisq asks to send confirmation again, check the actual payment first. **Do not send a second bank transfer.** Keep Bisq online, use trade chat to clarify receipt, and retry the application's payment notification if it offers that action. Network delays or an offline peer can prevent delivery. Preserve logs, try a normal restart if needed, and open mediation before the trade period expires if it remains unresolved. A broad Tor-file deletion is not the first step.

## Counterparty trade restrictions

“Offer cannot be taken due to counterparty trade restrictions” can concern account-limit/signing information or its propagation. Check your [payment-account limits](../payment-accounts/) and the offer requirements. A normal restart may refresh network information; it does not bypass a legitimate limit. The maker may also need to diagnose their state. Do not create new accounts merely to evade the restriction.

## DAO state and snapshot errors

`heightOfLastBlock must match chainHeight` and a snapshot-height mismatch indicate that local/peer DAO state needs investigation. Preserve the data directory, then use **Settings → Preferences → Rebuild DAO state from resources** when available and let synchronization finish. A mismatch can be on the peer's side; repeatedly rebuilding your own state will not fix theirs.

The older filesystem fallback moves `DaoStateStore` and `BsqBlocks` out of `btc_mainnet/db` while closed so they can be rebuilt. Treat this as an exceptional, backed-up repair after identifying those exact stores—not permission to delete `db`, signing keys or trade files. Retain the moved files and use current support guidance if the UI cannot start. The old promised ten-minute completion is not a guarantee.

A prepared delayed-payout mismatch also depends on agreeing recipient data; see [the specific diagnostic](../transaction-troubleshooting/#prepared-delayed-payouts-disagree).

## Installation, memory and remote use

For macOS opening/quarantine issues, use the [verified-install workflow](../install-and-verify/). An old Java issue produced an input-monitoring prompt; this is not a reason to grant new permissions without understanding the current request. The old `pmset` sleep-disable command changes system-wide power behavior and is not a routine Bisq repair; inspect sleep settings deliberately instead.

For high CPU, a large rescan, `Java heap space`, small HiDPI text or a blank Windows window, see [performance and display diagnosis](../performance/). Increasing `-Xmx` requires enough actual memory; copying an old 8 GB value onto a smaller machine can make things worse. For VPS/headless GUI approaches, see [platform and remote-desktop limits](../platform-guides/).

## Where to go next

- [First trade](../first-trade/), [offers](../offers/), [funding and fees](../funding-and-fees/) and [trading rules](../trade-rules/).
- [Backups](../backup-and-recovery/), [wallet recovery](../wallet-troubleshooting/) and [network diagnosis](../network-and-nodes/).
- [Dispute help](../dispute-help/) and [community support](../support/).
- [DAO](../../dao/overview/) and [contributing](../../contribute/getting-started/).

The old FAQ's fixed fee/limit numbers, guaranteed durations, broad “no data honeypots” claim and assurance that every dispute role is bonded have been replaced by the specific subject guides and their evidence. Protocol explanations remain separate from promises about an individual trade.

<details>
<summary>Sources and scope</summary>

- [Frequently asked questions — source revision 2026-10-07](../../wiki-source/frequently-asked-questions.wiki.txt).
- [Bisq 1 — source revision 2026-10-14](../../wiki-source/bisq-1.wiki.txt).
- [Current rules and UI](https://github.com/bisq-network/bisq/blob/ea9d5dff90c99ac462f2b0a7bf9ef92683956619/core/src/main/resources/i18n/displayStrings.properties).
- [Software license](https://github.com/bisq-network/bisq/blob/ea9d5dff90c99ac462f2b0a7bf9ef92683956619/LICENSE).

Sources reviewed 7 November 2026. Current Bisq 1 code references are pinned to v1.10.11.

</details>
