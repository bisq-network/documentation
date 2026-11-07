---
title: "Back up and recover Bisq 2"
description: "Protect Bisq 2 application data separately from the wallet used for your bitcoin."
---

*Bisq 2 v2.1.15 · Checked 7 November 2026.*

Keep **two distinct backups**: your Bisq 2 application data and the backup required by the Bitcoin wallet used for your trades. A wallet seed cannot recreate Bisq 2's application identity, conversations, or trade records.

These steps cover the standard **Bisq 2 v2.1.15 Bisq Easy** setup. Do not apply Bisq 1's `btc_mainnet` paths or **Account → Wallet seed** instructions to Bisq 2.

## Make an application backup

1. Open **Support → Resources**.
2. In **Backup**, choose **Set backup location** and select an existing destination folder.
3. Select **Backup Bisq data directory** and wait for the success message. It gives the dated backup folder's location.
4. Protect a copy against loss of your computer, for example on a separate encrypted drive. Keep older usable backups until you have checked the new copy.

The application requests saving its data before making this copy. It intentionally omits logs, the instance lock, and regenerable Tor cache and program files. This is a backup of application state, not a forensic copy of every file.

**The backup is not encrypted.** Treat it as sensitive key and account material. It can include external Tor credentials in plaintext. Use your storage tool's encryption, restrict access, and do not upload the folder as an ordinary support attachment.

## Keep the wallet backup separate

For a normal Bisq Easy trade, bitcoin is received in the wallet you chose. Record and protect that wallet's recovery information using its own instructions. Never send seed words or private keys to support.

If you use an experimental built-in wallet instead, obtain build-specific recovery guidance before replacing any data. Do not assume its recovery procedure matches the separate wallet used in this guide.

## Understand automatic snapshots

Bisq 2 also keeps rolling backups when stored application data changes. **Support → Resources** lists the available snapshots, and older copies are thinned over time.

These snapshots can help recover readable application stores, but remain local and subject to retention limits. They do not replace the independent backup above or protect against losing the device.

## If data must be restored

Preserve the current state before making changes. Close Bisq before manually moving its files, retain the original directory under another name, and do not run competing copies against the same data directory.

If trades are open, the application will not start, or you are unsure which backup contains the right state, [get help](../get-help/) before replacing files. Use **Open Bisq data directory** under Resources to identify the actual location when the app still runs. Get help choosing the correct backup or snapshot; do not assume a wallet seed restores application state.

<details>
<summary>Sources</summary>

[Backup UI and unencrypted warning](https://github.com/bisq-network/bisq2/blob/cfe8ab251f2b6579f29e9955036afc33ba36861e/i18n/src/main/resources/support.properties#L15-L37) · [Manual copy implementation](https://github.com/bisq-network/bisq2/blob/cfe8ab251f2b6579f29e9955036afc33ba36861e/apps/desktop/desktop/src/main/java/bisq/desktop/main/content/support/resources/ResourcesController.java#L145-L175) · [Excluded files and credential warning](https://github.com/bisq-network/bisq2/blob/cfe8ab251f2b6579f29e9955036afc33ba36861e/apps/desktop/desktop/src/main/java/bisq/desktop/main/content/support/resources/ResourcesController.java#L224-L250) · [Wallet availability](https://github.com/bisq-network/bisq2/blob/cfe8ab251f2b6579f29e9955036afc33ba36861e/mu-sig/src/main/java/bisq/mu_sig/MuSigService.java#L163-L168) · [Wallet restore callback](https://github.com/bisq-network/bisq2/blob/cfe8ab251f2b6579f29e9955036afc33ba36861e/apps/desktop/desktop/src/main/java/bisq/desktop/main/content/wallet/WalletController.java#L80-L86)

</details>
