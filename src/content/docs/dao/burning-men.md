---
title: Burning Men protocol
\ndescription: Historical context and mechanics of Bisq's distributed fee recipients.
---

*Historical protocol context · Checked against public proposal 7 November 2026 · Maintainer review pending.*

## Why the protocol exists

The Burning Men design distributes receipt of eligible BTC trading fees and delayed payout funds among eligible contributors, replacing the earlier single Donation Address Owner role. It is distinct from burning BSQ to build Bisq Easy reputation. The [adopted proposal and discussion](https://github.com/bisq-network/proposals/issues/390) are the primary record. The recovered wiki marked the former Donation Address Owner role retired, but its [role issue](https://github.com/bisq-network/roles/issues/80) was still open when checked on 7 November 2026. This discrepancy does not establish who currently performs any duties; ask maintainers. Its historical compensation and bond figures must not be assumed current.

## Eligibility and risk

The recovered description identifies contributors with qualifying recent compensation and recipients of the genesis distribution as eligible groups. The share and cap depend on contribution history and protocol rules. Burning BSQ is irreversible and future BTC receipts are uncertain: trade volume, fees, competing burns, protocol changes and the BSQ/BTC rate can all change. Past returns do not predict future results, and the interface's targets are estimates, not investment advice.

A contributor can designate a BTC receiving address in an approved compensation request; the source describes a wallet fallback when none is provided. Genesis recipients use a separate documented address process. Verify the current UI and [proposal details](https://github.com/bisq-network/proposals/issues/390#issuecomment-1306075295) before taking any action.

## Reading the interface

The historical guide locates the view under `DAO` > `Proof of Burn` > `Burning Men`. It distinguishes **receiver share** (distribution share), **issuance share** (contribution history), burned and issued totals, and their decayed values. Its example described a 24-cycle contribution window, decaying burns, a 10-times issuance-share limit and an 11% maximum receiver share. Those are versioned source examples, not verified current parameters. Check the running code and DAO parameters rather than using them as a calculation rule.

The profit view can filter distributions and burn events over time and export CSV. The DAO view aggregates burned BSQ and distributed BTC; neither view guarantees that a future burn will be profitable.

## Sources and review

The [Burning Men proposal](https://github.com/bisq-network/proposals/issues/390) and the recovered [protocol guide](../../wiki-source/burning-men.wiki.txt) describe the design and historical UI. The [DAO source at Bisq 1 v1.10.11](https://github.com/bisq-network/bisq/tree/ea9d5dff90c99ac462f2b0a7bf9ef92683956619/core/src/main/java/bisq/core/dao) is the implementation reference. No burn or payout was executed; current eligibility, caps and return calculations were not independently verified.
