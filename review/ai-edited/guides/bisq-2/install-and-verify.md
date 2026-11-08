---
title: "Install and verify Bisq 2"
description: "Download the correct installer, authenticate its signature, and open Bisq 2 safely."
---

*Bisq 2 v2.1.15 · Checked 7 November 2026.*

Download Bisq 2 from the official release, verify the file, then install it. If you already use Bisq 2, [make a backup](../backup-and-recovery/) first. Keep your existing application data when updating.

## Choose the release and installer

The latest release checked for this guide is [v2.1.15](https://github.com/bisq-network/bisq2/releases/tag/v2.1.15). Its security update is required to continue trading. The separate **25 November 2026** network deadline requires v2.1.14 or later; installing v2.1.15 also meets that version requirement.

From that release's **Assets**, download the installer matching your operating system and processor, together with its matching `.asc` detached signature. Keep both files in one folder. A signature for another file or version will not verify your download.

## Authenticate the signing key

For **v2.1.15**, [signingkey.asc](https://github.com/bisq-network/bisq2/releases/download/v2.1.15/signingkey.asc) identifies `E222AA02`. Its [release public key](https://github.com/bisq-network/bisq2/releases/download/v2.1.15/E222AA02.asc) matches the [Bisq website key](https://bisq.network/pubkey/E222AA02.asc), with primary fingerprint:

```text
B493 3191 06CC 3D1F 252E 19CB F806 F422 E222 AA02
```

Compare the **full fingerprint** through an independently obtained official source before trusting the key. A name or short key ID is insufficient. Check the signing-key information anew for a later release.

Import the authenticated key using an existing, trusted GnuPG installation, or Kleopatra on Windows.

## Verify your downloaded file

On macOS or Linux, run this in the folder containing the files, replacing both placeholders with their exact names:

```sh
gpg --verify INSTALLER.asc INSTALLER
```

Require a **good signature from the expected key**. Stop for a bad signature, wrong signer, missing key, or unresolved expiry error. Refresh key information from the official source and repeat verification if necessary.

An uncertified-key warning can accompany a valid signature: it does not authenticate the signer's identity. Do not grant ultimate ownertrust merely to hide a warning. On Windows, inspect Kleopatra's signature result and full fingerprint; a generic “could not be verified” message is not permission to continue.

## Install and open

After successful verification, install the package.

On **macOS**, Bisq 2 is not notarized by Apple. If macOS blocks the verified application installed at `/Applications/Bisq2.app`, the release documents:

```sh
sudo xattr -rd com.apple.quarantine /Applications/Bisq2.app
```

Then open Bisq 2 again. This removes quarantine attributes; it does not verify authenticity.

On **Windows**, the release describes **More info → Run anyway** for the verified installer. This operating-system warning is separate from GPG verification.

On **Linux**, use the matching supported package. v2.1.15 bundles Tor; a distribution Tor package is not required. If startup fails, use [Get help](../get-help/) rather than deleting application data or disabling security protections broadly.

Continue with [your first Bisq Easy trade](../first-trade/).

<details>
<summary>Sources</summary>

[Release notes](https://github.com/bisq-network/bisq2/releases/tag/v2.1.15) · [GnuPG verification](https://www.gnupg.org/download/integrity_check.html) · [Key-metadata evidence](https://github.com/bisq-network/bisq2/releases/download/v2.1.15/signingkey.asc)

</details>
