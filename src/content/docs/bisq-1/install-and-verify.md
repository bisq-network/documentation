---
title: "Install and verify Bisq 1"
description: "Get the official installer, verify its signature, and prepare to trade."
---

*Bisq 1 v1.10.11 · Checked 7 November 2026.*

Install Bisq 1 for its multisig trading protocol and DAO tools. For Bisq Easy, use the [Bisq 2 installation guide](../../bisq-2/install-and-verify/).

Already using Bisq 1? [Back up your application data and seed](../backup-and-recovery/) before updating. Keep your existing data directory.

## 1. Download the installer and signature

Open the official [v1.10.11 release](https://github.com/bisq-network/bisq/releases/tag/v1.10.11). This was the latest stable release when checked; its notes describe a security update required to continue trading. For a later version, read that version's release notes and signing-key information again.

Choose the installer for your operating system and processor, plus the matching `.asc` signature. macOS has separate Apple Silicon (`aarch64`) and Intel (`x86_64`) packages. Keep the installer and signature together.

## 2. Check the signing key

For **v1.10.11**, [signingkey.asc](https://github.com/bisq-network/bisq/releases/download/v1.10.11/signingkey.asc) identifies `E222AA02`. Download its [release public key](https://github.com/bisq-network/bisq/releases/download/v1.10.11/E222AA02.asc) and compare the full fingerprint with the [key published on bisq.network](https://bisq.network/pubkey/E222AA02.asc):

```text
B493 3191 06CC 3D1F 252E 19CB F806 F422 E222 AA02
```

With a trusted GnuPG installation, inspect and then import the key:

```sh
gpg --show-keys --with-fingerprint E222AA02.asc
gpg --import E222AA02.asc
```

A matching short key ID alone is insufficient. The fingerprint above is specific to the checked release; do not assume future releases use the same signer.

## 3. Verify your downloaded file

Replace the placeholders with your actual filenames, keeping the signature first:

```sh
gpg --verify INSTALLER.asc INSTALLER
```

On Windows, Kleopatra can verify the detached signature with its matching installer. Inspect both the result and the signer fingerprint.

Proceed only when the signature is valid and belongs to the expected key. Stop for a bad signature, an unexpected signer, a missing key, or an unresolved expiry error. An uncertified-key warning concerns identity trust; it does not automatically mean the file changed. Check the fingerprint instead of assigning ultimate trust simply to hide a warning.

This guide identifies the published key; **you must verify your own installer**.

## 4. Install the verified package

- **Linux:** install the appropriate `.deb` or `.rpm` package using your system's package installer.
- **Windows:** run the verified installer. If SmartScreen appears, the release notes describe **More info → Run anyway**.
- **macOS:** install the verified application as `/Applications/Bisq.app`. Bisq is not Apple-notarized. If quarantine prevents opening it, the release documents:

  ```sh
  sudo xattr -rd com.apple.quarantine /Applications/Bisq.app
  ```

  Then open Bisq again. This removes quarantine from that application; it does not verify authenticity.

Once Bisq opens, [make a backup](../backup-and-recovery/), [add a payment account](../payment-accounts/), and follow [your first trade](../first-trade/).

<details>
<summary>Sources and review notes</summary>

- [Release notes and installer assets](https://github.com/bisq-network/bisq/releases/tag/v1.10.11).
- [GnuPG signature verification](https://www.gnupg.org/download/integrity_check.html).
- [Historical installation article](../../wiki/downloading-and-installing/), revised 12 June 2026.
- Release source pinned to [commit `ea9d5dff90c9`](https://github.com/bisq-network/bisq/commit/ea9d5dff90c99ac462f2b0a7bf9ef92683956619).

Published key metadata was cross-checked; no installer binary was downloaded or cryptographically verified for this draft.

</details>
