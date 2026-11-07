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



<details>
<summary>Earlier interface illustrations</summary>

These recovered screenshots show the controls discussed in this section. Prices, balances, limits, account identities and software versions in them are historical examples; follow the current instructions above.

<figure><a href="../../media/wiki/14ac38b9d82ae0c749167e6122813f0a2c1d9018e373b88580bad9edfa500d78.png"><img src="../../media/wiki/14ac38b9d82ae0c749167e6122813f0a2c1d9018e373b88580bad9edfa500d78.png" alt="Image 1.cleaned" loading="lazy" /></a><figcaption>Historical Downloading and installing illustration. Do not treat an identity or key in this screenshot as the expected signer for another release; compare the current full fingerprint.</figcaption></figure>

<figure><a href="../../media/wiki/bb9e8beb6c9e78248b404e7abf121478ef9e249f5e1d084bd895f65d22a8875b.png"><img src="../../media/wiki/bb9e8beb6c9e78248b404e7abf121478ef9e249f5e1d084bd895f65d22a8875b.png" alt="Image 2.cleaned" loading="lazy" /></a><figcaption>Historical Downloading and installing illustration. Do not treat an identity or key in this screenshot as the expected signer for another release; compare the current full fingerprint.</figcaption></figure>

<figure><a href="../../media/wiki/8be1c0cef4d7135bed78f94b86768259719c681ecf5db149c1700f89b03f2fc9.png"><img src="../../media/wiki/8be1c0cef4d7135bed78f94b86768259719c681ecf5db149c1700f89b03f2fc9.png" alt="Image 3.cleaned" loading="lazy" /></a><figcaption>Historical Downloading and installing illustration. Do not treat an identity or key in this screenshot as the expected signer for another release; compare the current full fingerprint.</figcaption></figure>

</details>

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

## Updates and alternative installations

Install a verified new release over the existing application after backing up. **Do not downgrade an existing data directory** to fit an old tutorial: older software may not understand newer stored state. A trusted installed Bisq can offer **Download installer and verify signature** when an update is available; inspect its result rather than ignoring a verification error.

<figure><a href="../../media/wiki/a9e16d42dc98e43f2bd804d78815c69fc969d7b029c5b61ce08beaffa6c6059a.png"><img src="../../media/wiki/a9e16d42dc98e43f2bd804d78815c69fc969d7b029c5b61ce08beaffa6c6059a.png" alt="Updating bisq popup" loading="lazy" /></a><figcaption>Historical illustration from Updating Bisq; current controls may differ.</figcaption></figure>

The historical **Receive pre-release notifications** setting is for testing releases, not a reason to use a prerelease for an ordinary funded trade. Current release notes and compatibility requirements take precedence over old monthly-release estimates.

For a source build, follow the [build instructions at the checked release commit](https://github.com/bisq-network/bisq/blob/ea9d5dff90c99ac462f2b0a7bf9ef92683956619/docs/build.md), including its JDK requirements; do not assume a distribution's default Java is correct. Source builds have a different trust/reproducibility workflow from checking a release installer.

Community Linux packages require reviewing their packaging recipe as well as the Bisq source. Historical AUR, Snap and Gentoo-overlay references do not establish current maintenance or compatibility. The old Gentoo instruction enabled a `booboo` overlay; no current support claim for that overlay is made here. See [Arch, Qubes, Tails and remote-desktop notes](../platform-guides/) for the preserved platform-specific details and limitations.


<details>
<summary>Sources and review notes</summary>

- [Release notes and installer assets](https://github.com/bisq-network/bisq/releases/tag/v1.10.11).
- [GnuPG signature verification](https://www.gnupg.org/download/integrity_check.html).
- [Historical installation article](../../wiki-source/downloading-and-installing.wiki.txt), revised 12 June 2026.
- Release source pinned to [commit `ea9d5dff90c9`](https://github.com/bisq-network/bisq/commit/ea9d5dff90c99ac462f2b0a7bf9ef92683956619).

Published key metadata was cross-checked; no installer binary was downloaded or cryptographically verified for this draft.

</details>
