---
title: "Restore application data and replace a wallet"
description: "Restore accounts, signing keys and trade state, or carefully replace a wallet without losing the original."
---

Choose the smallest recovery that addresses the problem. A complete application backup preserves trade messages, payment accounts and identity; seed words restore wallet funds only. Keep the original directory and an independent backup throughout recovery.

## Restore a complete data directory

Close every Bisq process. Find the [actual data directory](../data-directory/), rename the current directory rather than deleting it, then copy the complete backup into the intended location. Start only that restored instance. Data can move between supported operating systems, but check file permissions and the installed release first.

**Do not run or alternate two copies of the same identity on different machines.** Even sequential use can leave the copies with incompatible trade state. Keep the older copy offline. Verify wallet synchronization, open trades, disputes and payment accounts before resuming activity.

## Restore payment accounts and signing identity

Import a payment-account export under **Account → National currency accounts** (or the corresponding altcoin tab). The export restores account metadata, not account-age/signing identity. Recovering that status requires the matching `btc_mainnet/keys/sig.key` and exactly matching account fields, including their salt.

If there is no export, work on a **copy** of the backup's `btc_mainnet/db/UserPayload`. On systems with `strings`:

```sh
strings '/path/to/backup/btc_mainnet/db/UserPayload'
```

The output may contain private banking information; keep it local. Recreate fields and salt exactly. The historical example warns that binary delimiters can appear as extra `*` or `@` characters beside a BIC or salt—do not copy those blindly. A text editor can inspect the file on Windows, but it contains binary data and must not be saved over the original. Replacing the whole `UserPayload` in an otherwise new instance can mix incompatible state and is not the recommended metadata import.

Before replacing `sig.key`, finish **all offers, trades and disputes**, back up both states and close Bisq. Changing the signing key makes the old trade identity unreachable. Copy the matching key into the new directory; then check account ages and signing status. A mismatch usually means the wrong key or a changed field/salt, not a reason to keep swapping files during a live trade.

## Restore onion identity or closed-trade history

With Bisq closed, the onion identity lives in `btc_mainnet/tor/hiddenservice` (singular). The old restore article's `hiddenservices` spelling is incorrect for the checked code. Restoring it preserves recognition by previous peers; rotating it changes that recognition. See [changing identity](../data-directory/#change-your-onion-address) for preconditions.

To retain completed-trade records, copy `btc_mainnet/db/ClosedTrades` from a compatible backup while closed. A CSV export is for records and analysis; it cannot be imported back as application state. Keep a complete backup before selective restoration.

## Replace only the wallet

A large, old wallet can make synchronization slow. Replacing it is an advanced maintenance option, not routine first aid for every error. Preconditions: no open offers, trades or disputes; a consistent wallet balance; saved seed/date; a full offline backup. Removing an offer loses its paid maker fee.

For an **empty BTC and BSQ wallet**, close Bisq, rename `btc_mainnet/wallet` to `wallet.old`, then start Bisq. Record the new seed/date and set a new wallet password. Keep the old folder until the replacement has been fully checked.

If funds remain:

1. Close Bisq; rename `Bisq` to `Bisq.old` and make an external copy.
2. Start a fresh `Bisq` instance. Save its seed/date, set its wallet password, and record its BTC receiving address and **BSQ** receiving address separately.
3. Close it and rename that new directory `Bisq.new`; restore `Bisq.old` to `Bisq`.
4. Start the old instance. Verify the destination addresses. **Send BSQ first**, retaining BTC for its mining fee; then send the remaining BTC.
5. Close Bisq. In the original data directory rename `btc_mainnet/wallet` to `wallet.old`. Copy the new instance's `wallet` folder into that location.
6. Start, finish synchronization, and verify both balances and the preserved account/trade data. Retain all backups until recovery is proven. Do not delete old files simply because the application opens.

This keeps the original accounts, signing keys, onion identity and settings while changing the wallet. It incurs real on-chain fees and needs careful address checks.

## Start with an entirely new identity

A fresh data directory also creates new signing keys, onion identity and settings. It has the same no-active-offers/trades/disputes precondition. Prefer moving funds by on-chain transactions into the fresh instance over seed restoration for routine migration. Send BSQ before exhausting BTC.

You can create a separate directory with `--appName=Bisq-new`; see [command-line options](../command-line/). Never point two processes at one directory. After transfer and synchronization, close both, retain the old directory under another name, and promote the new directory to the default name. Import only the data you deliberately intend to keep.

## Last-resort reconstruction

When the complete backup itself will not start, the recovered workaround builds a fresh directory and copies selected old stores into it. This is a **versioned recovery experiment**, not a guaranteed repair. Test only on copies; preserve the damaged original and do not transact while evaluating the result.

The original selected database files were:

```text
BsqSwapTrades DisputeList RefundDisputeList SequenceNumberMap MyVoteList
OpenOffers MyBlindVoteList ClosedTrades MediationDisputeList MyProposalList
MailboxMessageList AccountAgeWitnessStore PendingTrades MyProofOfBurnList
PreferencesPayload UserPayload AddressEntryList FailedTrades MyReputationList
TempProposalStore NavigationPath UnconfirmedBsqChangeOutputList IgnoredMailboxMap
PeerList RemovedPayloadsMap TradeStatistics3Store SignedWitnessStore
```

The matching `keys`, `wallet` and `tor/hiddenservice` directories must come from the same old identity. Copying individual recent files is not proof of a consistent snapshot. This procedure intentionally mixes state and is riskier than a complete restore; have support review the plan, especially if open trades exist. An application that starts with an incorrect balance is not a successful recovery. Check chain state and [wallet synchronization](../wallet-troubleshooting/) before any further action.

<details>
<summary>Sources and scope</summary>

- [Restoring application data — source revision 2025-04-10](../../wiki-source/restoring-application-data.wiki.txt).
- [Create a new wallet for your data directory — source revision 2024-04-04](../../wiki-source/create-a-new-wallet-for-your-data-directory.wiki.txt).
- [Switching to a new data directory — source revision 2024-12-10](../../wiki-source/switching-to-a-new-data-directory.wiki.txt).
- [Last resort restore — source revision 2023-04-28](../../wiki-source/last-resort-restore.wiki.txt).
- [Current Tor identity path](https://github.com/bisq-network/bisq/blob/ea9d5dff90c99ac462f2b0a7bf9ef92683956619/p2p/src/main/java/bisq/network/p2p/network/TorMode.java).
- [Current restore warnings](https://github.com/bisq-network/bisq/blob/ea9d5dff90c99ac462f2b0a7bf9ef92683956619/core/src/main/resources/i18n/displayStrings.properties#L3864-L3882).

Sources reviewed 7 November 2026. Current Bisq 1 code references are pinned to v1.10.11.

</details>
