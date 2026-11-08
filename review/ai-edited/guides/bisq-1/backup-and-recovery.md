---
title: "Back up and recover Bisq 1"
description: "Protect application state and wallet funds, then choose the right recovery method."
---

*Bisq 1 v1.10.11 · Checked 7 November 2026.*

Keep **both an application-data backup and a written wallet seed**. They solve different problems: the seed recovers wallet funds, while the application backup preserves the accounts, keys and trade state needed to keep using Bisq.

## Make an application backup

1. Open **Account → Backup**, choose a destination, and select **Backup now**.
2. Read the result. In v1.10.11, the backup excludes selected Tor runtime data and does not follow links or copy special files. If Bisq lists skipped entries, preserve any needed linked data separately; do not assume the backup contains it.
3. Protect the backup with encryption and keep a copy away from the computer. The application explicitly warns that the backup itself is not encrypted. A wallet password does not protect all payment-account and identity data.
4. Repeat after important account or trading changes and before an update or recovery operation.

Use **Open directory** on the same screen to locate your actual application data. If making a manual copy, close Bisq first and copy the directory without changing the original.

<figure><a href="../../media/wiki/26782ecb73f26760dab0f720c3d9eb40fc2f8c1112e55c8bd1360d3ecf153449.png"><img src="../../media/wiki/26782ecb73f26760dab0f720c3d9eb40fc2f8c1112e55c8bd1360d3ecf153449.png" alt="Bisq backup screen showing a backup destination and backup button" loading="lazy" /></a><figcaption>Historical backup screen; labels and layout may differ.</figcaption></figure>

Never post a backup publicly or send it as an ordinary support attachment. It can contain private keys and personal payment details.



<details>
<summary>Earlier interface illustrations</summary>

These recovered screenshots show the controls discussed in this section. Prices, balances, limits, account identities and software versions in them are historical examples; follow the current instructions above.

<figure><a href="../../media/wiki/b159a14c41bd5d2a2ac88fcc2add65d497bfe93310ca2f9c7f5246c6f6321d36.png"><img src="../../media/wiki/b159a14c41bd5d2a2ac88fcc2add65d497bfe93310ca2f9c7f5246c6f6321d36.png" alt="Export-payment-accounts" loading="lazy" /></a><figcaption>Historical Backing up application data illustration.</figcaption></figure>

</details>

## Record the seed separately

Open **Account → Wallet seed** and enter your wallet password if prompted. Write the seed words and displayed wallet date on paper and store them securely. The same seed is used for the BTC and BSQ wallets.

Do not share seed words, private keys or passwords with a trader or support agent. A seed does **not** restore payment accounts, signing identity, trade history or disputes. An account export or trade-history CSV also does not replace the application backup.



<details>
<summary>Earlier interface illustrations</summary>

These recovered screenshots show the controls discussed in this section. Prices, balances, limits, account identities and software versions in them are historical examples; follow the current instructions above.

<figure><a href="../../media/wiki/d2ea84b7c6e2a35395099a9afe80611c07d3b159ab64954ffacf6787f9d76d42.png"><img src="../../media/wiki/d2ea84b7c6e2a35395099a9afe80611c07d3b159ab64954ffacf6787f9d76d42.png" alt="Find-wallet-seed-words" loading="lazy" /></a><figcaption>Historical Backing up your wallet seed illustration.</figcaption></figure>

</details>

## Restore application data when you have it

Prefer a usable application backup when you need your previous Bisq state.

1. Close Bisq and preserve a separate copy of the current directory, even if it appears damaged.
2. Restore the backed-up application directory to the correct location. Rename and retain the existing directory instead of deleting your only copy. Ask [support](../dispute-help/) for help if the backup layout, skipped files or destination is unclear.
3. Start Bisq and check accounts, balances and trade state before taking further action.

When moving to another computer, use the restored copy as your active installation. Do not alternate trading between two copies of the same data directory: their state can diverge even if they are not running simultaneously.

If trades, offers or disputes are active, obtain recovery help before replacing wallets or identity keys. A payment-account-only import is not a substitute for restoring the matching keys and application state.

## Use seed recovery only for an emergency

Preserve the current data and investigate a usable wallet/application backup first. Seed restoration is a last resort for funds, not a routine reset.

**Do not merge an old seed into a funded wallet.** Use a new, empty wallet for the recovery, with no active offers, trades or disputes. If moving funds first, send BSQ before emptying BTC so BTC remains available for its mining fee.

The restoration screen is under **Account → Wallet seed**. Use your recorded seed and creation date. A missing date means a longer blockchain scan; do not invent a recent date to make it faster. After restoration, restart Bisq and let synchronization finish without interruption. **Restore removes wallet encryption: set a new wallet password afterward.**

Keep BSQ recovery inside Bisq. Sending BSQ through a wallet that does not follow BSQ rules can destroy its BSQ value. For external BTC recovery, obtain help with the exact wallet paths rather than guessing. Never delete the retained backups simply because the application starts.

## Encrypt the wallet

Under **Account → Wallet password**, set a strong password you can retain securely. There is no central password-reset service. Keep your seed/date backup independently; wallet encryption is not a replacement for it, and it does not encrypt all account/trade data or backups.

<figure><a href="../../media/wiki/4789e4687c4082eb78a1e14fb22c4603ccb9ca877852a7083d8eae34591590d9.png"><img src="../../media/wiki/4789e4687c4082eb78a1e14fb22c4603ccb9ca877852a7083d8eae34591590d9.png" alt="Set-wallet-password" loading="lazy" /></a><figcaption>Historical illustration from Encrypting your wallet; current controls may differ.</figcaption></figure>

## Preserve account and record exports

In addition to the complete backup, export payment accounts from **Account → National currency accounts** (or the altcoin account tab). Aging/signing also needs the original `btc_mainnet/keys/sig.key`; the export alone contains metadata. See [restoring payment accounts](../restoring-data/#restore-payment-accounts-and-signing-identity) before moving keys.

**Portfolio → History → Export to CSV** and **Funds → Transactions → Export to CSV** provide records for analysis. They cannot be imported to reconstruct application state. Onion identity is separately stored under `btc_mainnet/tor/hiddenservice` and should remain part of the complete backup.

For [scheduled copies and retention](../backup-automation/), check consistency and restore tests as well as whether a file was created. For [detailed recovery](../restoring-data/) or [seed restoration](../wallet-troubleshooting/#restore-from-seed-as-a-last-resort), follow the specific preconditions rather than repeating a generic reset.


<details>
<summary>Sources and review notes</summary>

- [Current backup implementation](https://github.com/bisq-network/bisq/blob/ea9d5dff90c99ac462f2b0a7bf9ef92683956619/desktop/src/main/java/bisq/desktop/main/account/content/backup/BackupView.java#L94-L180).
- [Current seed warnings](https://github.com/bisq-network/bisq/blob/ea9d5dff90c99ac462f2b0a7bf9ef92683956619/core/src/main/resources/i18n/displayStrings.properties#L2021-L2044) and [restore safeguards](https://github.com/bisq-network/bisq/blob/ea9d5dff90c99ac462f2b0a7bf9ef92683956619/core/src/main/resources/i18n/displayStrings.properties#L3864-L3882).
- Historical sources: [application backup](../../wiki-source/backing-up-application-data.wiki.txt), [application restoration](../../wiki-source/restoring-application-data.wiki.txt), [seed restoration](../../wiki-source/restoring-your-wallet-from-seed.wiki.txt) and [new-wallet safeguards](../../wiki-source/create-a-new-wallet-for-your-data-directory.wiki.txt).

Backup/seed behavior was checked in current source. Cross-machine restoration and exceptional recovery procedures still need a supervised desktop walkthrough; the older recovery sources remain available for that review.

</details>
