---
title: "Downloading and installing"
slug: "wiki/downloading-and-installing"
tableOfContents: false
---

<nav data-pagefind-ignore class="wiki-source-toc" aria-label="Article sections"><details><summary>On this page</summary><ul><li><a href="#download-bisq">Download Bisq</a></li><li><a href="#verify-installer-file">Verify installer file</a></li><li><a href="#bisq2-specific-instructions">Bisq2 specific instructions</a></li><li><a href="#bisq-1-obtain-signature-files-for-installer-files-2">Bisq 1: Obtain signature files for installer files</a></li><li><a href="#windows-2">Windows</a></li><li><a href="#download-and-install-gpg4win-2">Download and install Gpg4win</a></li><li><a href="#import-signing-keys">Import Signing Keys</a></li><li><a href="#verify-the-signature-of-the-binary-you-downloaded-2">Verify the signature of the binary you downloaded</a></li><li><a href="#mac-and-linux-2">Mac and Linux</a></li><li><a href="#import-signing-keys-2">Import Signing Keys</a></li><li><a href="#verify-the-signature-of-the-binary-you-downloaded-3">Verify the signature of the binary you downloaded</a></li><li><a href="#build-from-source">Build from source</a></li><li><a href="#os-specific-install-notes">OS-specific install notes</a></li><li><a href="#macos">macOS</a></li><li><a href="#windows-3">Windows</a></li><li><a href="#linux-general">Linux (General)</a></li><li><a href="#arch-linux">Arch Linux</a></li><li><a href="#gentoo">Gentoo</a></li><li><a href="#tails">Tails</a></li><li><a href="#qubes">Qubes</a></li><li><a href="#update-bisq">Update Bisq</a></li></ul></details></nav>

<div class="wiki-recovered-article" lang="en">

To use Bisq, you must first **[download and install](https://bisq.network/downloads/)** it. Most exchanges are centralized exchanges running on servers controlled by the exchange. Bisq is decentralized, running only on the desktops of Bisq users.

Bisq manages offers to trade using a peer-to-peer network. This is a global network made of users who are also running Bisq on their own computers.

Centralized services are easy to monitor, block, and shut down, while peer-to-peer networks like BitTorrent, Bitcoin and Bisq are difficult to surveil, censor, shut down or hack.

All of this means that if you want to use the Bisq network, you must download and run the software on your own machine.

<span class="wiki-legacy-anchor" id="Download_Bisq" aria-hidden="true">
</span>

### Download Bisq {#download-bisq}

The most convenient way to install Bisq on your machine is from a pre-built install file from the [Bisq website](https://bisq.network/downloads/) or [latest GitHub release](https://github.com/bisq-network/bisq/releases/latest).

There\'s also a community-maintained [Snap package](https://snapcraft.io/bisq-desktop) for various Linux distributions.

<aside class="wiki-admonition" role="note">

**Note**

See [install notes for various Linux distributions below](../downloading-and-installing/#os-specific-install-notes).

</aside>

You can download the installer for your operating system and install Bisq right away, but we strongly recommend that you [ verify the integrity ](../downloading-and-installing/#verify-installer-file) of your installer file first.

**If you have issues, please check the *Known issues with installation* section in [release notes](https://github.com/bisq-network/bisq/releases/latest).**

<span class="wiki-legacy-anchor" id="Verify_installer_file" aria-hidden="true">
</span>

### Verify installer file {#verify-installer-file}

<span class="wiki-legacy-anchor" id="Bisq2_specific_instructions" aria-hidden="true">
</span>

#### Bisq2 specific instructions {#bisq2-specific-instructions}

Bisq2 can be downloaded [here](https://bisq.network/downloads/). Before installing software that manages your funds, you should always verify the installer has not been tampered with, to avoid the risk of losing funds due to a compromised download.

Usually, installation binaries are signed by Alejandro García (key ID: E222AA02, primary release manager). However, since this key has expired — and the expired key was included in previous versions of the Bisq2 app — the in-app verification process would fail when attempting to download version 2.1.2. To prevent this issue, the secondary release manager assumed responsibility for signing that release. The signingkey.asc file specifies the key used for signing the binaries.

HenrikJannsen\'s signing key can be downloaded [here](https://bisq.network/pubkey/387C8307.asc) (full fingerprint: B8A5 D214 ADFA A387 A14C 8BCF 02AA 2BAE 387C 8307).

To import the key in Linux and MacOS:

<p><code><code class="wiki-source-code" id="source-code-1">curl https://bisq.network/pubkey/387C8307.asc | gpg --import </code></code></p>

GPG will return \"This key is not certified with a trusted signature!\", this is normal (see [https://serverfault.com/questions/569911/how-to-verify-an-imported-gpg-key](https://serverfault.com/questions/569911/how-to-verify-an-imported-gpg-key) for background information what it means)

To verify the installer against the signature:

<code><code class="wiki-source-code" id="source-code-2">gpg -\-digest-algo SHA256 -\-verify BINARY{.asc\*,}</code></code>

In case you receive an error for an expired key, you can refresh the keys on your system from an official keyserver:

<code><code class="wiki-source-code" id="source-code-3">gpg -\-keyserver hkps://keys.openpgp.org -\-refresh-keys</code></code>

Replace BINARY with the name of the file you downloaded.

In Windows. you can import the key, and subsequently verify the installer, by using [Kleopatra](https://www.gpg4win.org/download.html).

Any software that manages funds, signs transactions, and deals with highly sensitive data is a prime target for malware. Bisq does all three. Therefore, it is highly recommended that you verify the integrity of the installer file you use to install Bisq.

This verification is something that you should do for the initial Bisq install. After the initial install, you will be prompted to install updates through Bisq\'s interface. The Bisq software will verify the integrity of updates for you.

Bisq installer files are currently built and signed by Alejandro Garcia (alejandrogarcia83). His public key ID is <code class="wiki-source-code" id="source-code-4">E222AA02</code> and fingerprint is <code class="wiki-source-code" id="source-code-5">B493 3191 06CC 3D1F 252E  19CB F806 F422 E222 AA02</code>, which you can verify through [commits on GitHub](https://github.com/bisq-network/bisq/commits?author=alejandrogarcia83).

The full public key is available [here on the Bisq website](https://bisq.network/pubkey/E222AA02.asc).

<span id="bisq-1-obtain-signature-files-for-installer-files"></span>

<span class="wiki-legacy-anchor" id="Bisq_1:_Obtain_signature_files_for_installer_files" aria-hidden="true">
</span>

## Bisq 1: Obtain signature files for installer files {#bisq-1-obtain-signature-files-for-installer-files-2}

All Bisq releases are cryptographically signed by its maintainer. Users can ensure that nobody tampered with the release by verifying its signatures. It’s recommended to download the GPG key from an independent keyserver (such as [keys.openpgp.org](https://keys.openpgp.org/) or [keyserver.ubuntu.com](https://keyserver.ubuntu.com/)) to ensure that no adversary replaced the GPG keys and signatures on the release server.

Bisq 1 releases are signed by Alejandro García (alejandrogarcia83), Gabriel Bernard (gabernard), or Henrik Jannsen (HenrikJannsen). Here are the public key ids and fingerprints of the keys:

Alejandro García (public key id <code class="wiki-source-code" id="source-code-6">0xF806F422E222AA02</code>): <code class="wiki-source-code" id="source-code-7">B493 3191 06CC 3D1F 252E 19CB F806 F422 E222 AA02</code>\
Gabriel Bernard (public key id <code class="wiki-source-code" id="source-code-8">0x6C8D14D84A133008</code>): <code class="wiki-source-code" id="source-code-9">1655 3BA9 2694 95EE 53BB A33A 6C8D 14D8 4A13 3008</code>\
Henrik Jannsen (public key id <code class="wiki-source-code" id="source-code-10">0x02AA2BAE387C8307</code>): <code class="wiki-source-code" id="source-code-11">B8A5 D214 ADFA A387 A14C 8BCF 02AA 2BAE 387C 8307</code>

<span id="windows"></span>

<span class="wiki-legacy-anchor" id="Windows" aria-hidden="true">
</span>

### Windows {#windows-2}

<span id="download-and-install-gpg4win"></span>

<span class="wiki-legacy-anchor" id="Download_and_install_Gpg4win" aria-hidden="true">
</span>

#### Download and install Gpg4win {#download-and-install-gpg4win-2}

Windows does not come with GPG software installed by default, so you will need to install it in order to verify Bisq’s installer files. You can get Gpg4win [here](https://www.gpg4win.org/). Double-click the installer file and proceed to install with all default settings.

<span id="import-alejandro-garcías-key"></span>

<span class="wiki-legacy-anchor" id="Import_Signing_Keys" aria-hidden="true">
</span>

#### Import Signing Keys {#import-signing-keys}

Open Kleopatra (part of Gpg4win) and click on “Lookup on Server”.

<figure class="wiki-source-image" id="source-image-1"><a href="../../media/wiki/14ac38b9d82ae0c749167e6122813f0a2c1d9018e373b88580bad9edfa500d78.png"><img alt="Image_1.cleaned.png" decoding="async" height="278" loading="lazy" src="../../media/wiki/14ac38b9d82ae0c749167e6122813f0a2c1d9018e373b88580bad9edfa500d78.png" width="460"></a><figcaption>Image_1.cleaned.png<br><small>Historical full-size recovered source. <a href="../../recovered-media/">Provenance catalogue</a>.</small></figcaption></figure>
<p>Next type into the search field <code class="wiki-source-code" id="source-code-12">alejandro.garcia@disroot.org</code> (or <code class="wiki-source-code" id="source-code-13">0x387C8307</code> if verifying a release signed by Henrik Jannsen) and press on search. You’ll see the following output:</p>
<figure class="wiki-source-image" id="source-image-2"><a href="../../media/wiki/bb9e8beb6c9e78248b404e7abf121478ef9e249f5e1d084bd895f65d22a8875b.png"><img alt="Image 2.cleaned.png" decoding="async" height="846" loading="lazy" src="../../media/wiki/bb9e8beb6c9e78248b404e7abf121478ef9e249f5e1d084bd895f65d22a8875b.png" width="1186"></a><figcaption>Image 2.cleaned.png<br><small>Historical full-size recovered source. <a href="../../recovered-media/">Provenance catalogue</a>.</small></figcaption></figure>

Press on “Details…” to see the key’s fingerprint and confirm that it is correct based on the list above.

<figure class="wiki-source-image" id="source-image-3"><a href="../../media/wiki/8be1c0cef4d7135bed78f94b86768259719c681ecf5db149c1700f89b03f2fc9.png"><img alt="Image 3.cleaned.png" decoding="async" height="604" loading="lazy" src="../../media/wiki/8be1c0cef4d7135bed78f94b86768259719c681ecf5db149c1700f89b03f2fc9.png" width="1444"></a><figcaption>Image 3.cleaned.png<br><small>Historical full-size recovered source. <a href="../../recovered-media/">Provenance catalogue</a>.</small></figcaption></figure>

After verifying that the fingerprint is correct, press on “Close” and press on “Import” to import the key.

<span id="verify-the-signature-of-the-binary-you-downloaded"></span>

<span class="wiki-legacy-anchor" id="Verify_the_signature_of_the_binary_you_downloaded" aria-hidden="true">
</span>

#### Verify the signature of the binary you downloaded {#verify-the-signature-of-the-binary-you-downloaded-2}

With the <code class="wiki-source-code" id="source-code-14">install-file.exe</code> and <code class="wiki-source-code" id="source-code-15">signature-file.exe.asc</code> in the same directory, double-click on the <code class="wiki-source-code" id="source-code-16">.exe.asc</code> file.

You should see a Kleopatra window pop up with a green progress bar that says “Verified .exe with .exe.asc”. The program will continue to say “The data could not be verified” in bold but you can disregard that message.

This means the installer file we downloaded is intact and as intended. You can proceed to install Bisq by double-clicking the .exe file.

<span id="mac-and-linux"></span>

<span class="wiki-legacy-anchor" id="Mac_and_Linux" aria-hidden="true">
</span>

### Mac and Linux {#mac-and-linux-2}

<span id="import-alejandro-garcías-key-1"></span>

<span class="wiki-legacy-anchor" id="Import_Signing_Keys_2" aria-hidden="true">
</span>

#### Import Signing Keys {#import-signing-keys-2}

To import the signing keys for Alejandro García and Henrik Jannsen, open a terminal and run:

<pre><code class="wiki-source-code" id="source-code-17">gpg --receive-keys 0xF806F422E222AA02 0x02AA2BAE387C8307</code></pre>

Next you need to verify key’s fingerprint and tell GPG to trust the key. For example, to verify Alejandro\'s key, run:

<pre><code class="wiki-source-code" id="source-code-18">gpg --edit-key 0xF806F422E222AA02</code></pre>

Then type:

<pre><code class="wiki-source-code" id="source-code-19">fpr</code></pre>

Now ensure that you see the same output as here:

<pre><code class="wiki-source-code" id="source-code-20">gpg&gt; fpr
pub   rsa4096/0xF806F422E222AA02 2022-09-28 Alejandro García &lt;alejandro.garcia@disroot.org&gt;
 Primary key fingerprint: B493 3191 06CC 3D1F 252E  19CB F806 F422 E222 AA02</code></pre>

If the fingerprint matches you can trust the key. To trust the key type:

<pre><code class="wiki-source-code" id="source-code-21">trust</code></pre>

Now you’ll see following output:

<pre><code class="wiki-source-code" id="source-code-22">gpg&gt; trust
pub  rsa4096/0xF806F422E222AA02
      created: 2022-09-28  expires: 2026-10-03  usage: SC  &#10;      trust: unknown        validity: unknown
sub  rsa4096/0xE7F08D07C72561D0
      created: 2022-09-28  expires: 2026-10-03  usage: E   &#10;[ unknown] (1). Alejandro García &lt;alejandro.garcia@disroot.org&gt;
&#10;Please decide how far you trust this user to correctly verify other users' keys
(by looking at passports, checking fingerprints from different sources, etc.)
&#10;  1 = I don't know or won't say
  2 = I do NOT trust
  3 = I trust marginally
  4 = I trust fully
  5 = I trust ultimately
  m = back to the main menu
&#10;Your decision?</code></pre>

Type <code class="wiki-source-code" id="source-code-23">5</code> to trust to the key and you’ll see following output:

<pre><code class="wiki-source-code" id="source-code-24">Do you really want to set this key to ultimate trust? (y/N) </code></pre>

Now type <code class="wiki-source-code" id="source-code-25">y</code> to confirm. Now you can quit by typing <code class="wiki-source-code" id="source-code-26">quit</code>.

<span id="verify-the-signature-of-the-binary-you-downloaded-1"></span>

<span class="wiki-legacy-anchor" id="Verify_the_signature_of_the_binary_you_downloaded_2" aria-hidden="true">
</span>

#### Verify the signature of the binary you downloaded {#verify-the-signature-of-the-binary-you-downloaded-3}

With the installer file and installer signature file in the same directory, run:

<pre><code class="wiki-source-code" id="source-code-27">gpg --verify INSTALLER.asc INSTALLER</code></pre>

Where <code class="wiki-source-code" id="source-code-28">INSTALLER.asc</code> is the filename of the <code class="wiki-source-code" id="source-code-29">.asc</code> file you just downloaded.

You should see an output similar to this:

<pre><code class="wiki-source-code" id="source-code-30">gpg: Signature made Fri 22 Nov 2024 07:42:50 PM UTC
gpg:                 using RSA key B493319106CC3D1F252E19CBF806F422E222AA02
gpg: checking the trustdb
gpg: marginals needed: 3  completes needed: 1  trust model: pgp
gpg: depth: 0  valid:   1  signed:   0  trust: 0-, 0q, 0n, 0m, 0f, 1u
gpg: next trustdb check due at 2026-10-03
gpg: Good signature from "Alejandro García &lt;alejandro.garcia@disroot.org&gt;" [ultimate]</code></pre>

In case you receive an error for an expired key, you can refresh the keys on your system from an official keyserver:

<code><code class="wiki-source-code" id="source-code-31">gpg -\-keyserver hkps://keys.openpgp.org -\-refresh-keys</code></code>

<span class="wiki-legacy-anchor" id="Build_from_source" aria-hidden="true">
</span>

### Build from source {#build-from-source}

[Building Bisq from source](https://github.com/bisq-network/bisq/blob/master/docs/build.md) requires only a single command once you have the correct JDK installed on your machine.

Finding and installing the correct JDK can sometimes be frustrating, so Bisq\'s developers have written scripts to make it easier:

- [For Linux and macOS](https://github.com/bisq-network/bisq/blob/master/scripts/install_java.sh)
- [For Windows](https://github.com/bisq-network/bisq/blob/master/scripts/install_java.bat)

<span class="wiki-legacy-anchor" id="OS-specific_install_notes" aria-hidden="true">
</span>

### OS-specific install notes {#os-specific-install-notes}

<span class="wiki-legacy-anchor" id="macOS" aria-hidden="true">
</span>

#### macOS {#macos}

Starting with version v1.9.6, we remove notarization from our build pipeline because of of the risk of Apple certification revocation (see [https://github.com/bisq-network/bisq/discussions/6341](https://github.com/bisq-network/bisq/discussions/6341)). Unfortunately this will require extra steps when installing Bisq on macOS.

You will receive an error popup saying that Bisq *is damaged and can\'t be opened. You should move it to the Trash*.

Please follow the guide at [https://support.apple.com/en-us/HT202491](https://support.apple.com/en-us/HT202491) in the section *If you want to open an app that hasn’t been notarized or is from an unidentified developer*

If you are running already macOS Ventura (13.0+) you need to do following to be able to start Bisq:

- enter following command in Apple Terminal <code class="wiki-source-code" id="source-code-32">sudo xattr -d com.apple.quarantine /Applications/Bisq.app</code>
- hit enter and you will be prompted to enter your password to be able to execute the command as super user

After running this successfully you should be able to start Bisq as always.

If this procedure still does not allow you to install Bisq, a last resort workaround is to install Bisq in a Linux Virtual Machine running on your system.

<span class="wiki-legacy-anchor" id="Windows_2" aria-hidden="true">
</span>

#### Windows {#windows-3}

Starting with version v1.9.6, we remove the developer code signing because of the same reason as with Apple.

For Windows you just have to ignore the warning after you have verified the installation file yourself and proceed with the installation.

<span class="wiki-legacy-anchor" id="Linux_(General)" aria-hidden="true">
</span>

#### Linux (General) {#linux-general}

Bisq works with a number of Linux distros, but not all desktop environments are supported.

These are all known compatible desktop environments. This is a growing list. If you find another compatible desktop, please inform us so it can be added.

- GNOME
- Mate
- Xfce
- KDE Plasma
- Cinnamon

Bisq might not work properly if you switch from the original desktop environment of your Linux distribution to a different one.

Note: users with discrete GPUs may encounter issues launching Bisq in some desktop environments.

<span class="wiki-legacy-anchor" id="Arch_Linux" aria-hidden="true">
</span>

#### Arch Linux {#arch-linux}

The Bisq [downloads page](https://bisq.network/downloads/) includes a link to the Arch User Repository (AUR) page for the [bisq package](https://aur.archlinux.org/packages/bisq/).

1. From the command line, clone the repository from AUR.
2. Then from the cloned directory, run <code class="wiki-source-code" id="source-code-33">makepkg -si</code>. This will read the PKGBUILD file to download, verify, build, and install the various tools necessary to install Bisq.

If the version found on AUR is not up to date, you can read [Fix Arch release](../fix-arch-release/).

Please be advised: when you\'re using AUR, you\'re responsible for your own safety. Be sure to verify the PKGBUILD file.

<span class="wiki-legacy-anchor" id="Gentoo" aria-hidden="true">
</span>

#### Gentoo {#gentoo}

Use <code class="wiki-source-code" id="source-code-34">eselect repository enable booboo</code> to use the \'booboo\' overlay which carries the binaries, and then emerge <code class="wiki-source-code" id="source-code-35">bisq</code>

<span class="wiki-legacy-anchor" id="Tails" aria-hidden="true">
</span>

#### Tails {#tails}

Please see [Running Bisq on Tails](../running-bisq-on-tails/) for details on downloading, installing, and configuring Bisq on Tails.

<span class="wiki-legacy-anchor" id="Qubes" aria-hidden="true">
</span>

#### Qubes {#qubes}

Please see [Running Bisq on Qubes](../running-bisq-on-qubes/) for a detailed Qubes setup guide.

<span class="wiki-legacy-anchor" id="Update_Bisq" aria-hidden="true">
</span>

### Update Bisq {#update-bisq}

Installing a new Bisq version will update Bisq. More details at [Updating Bisq](../updating-bisq/).

</div>
