---
title: "Special platforms and remote desktops"
description: "Understand Qubes, Tails, community-package and remote-desktop setups with their version limits."
---

The standard [verified installer](../install-and-verify/) is the starting point. The recipes below preserve useful platform-specific design details from older guides, with their original version limits. They are not tested current deployment recipes for a wallet holding funds.

## Qubes OS

The recovered guide was tested on **Qubes 4.0.3 with a Debian 10 template**. Its important distinction is persistence: installing into a template-based AppVM needs selected application paths bound into its private storage.

The example creates a dedicated `bisq-vm`, then in that qube prepares `/rw/bind-dirs/opt/bisq` and `/rw/bind-dirs/usr/share/desktop-directories`. A file under `/rw/config/qubes-bind-dirs.d/50_user.conf` contains:

```sh
binds+=( '/opt/bisq' )
binds+=( '/usr/share/desktop-directories' )
```

Restart the qube after configuring bind directories. Download and verify the correct Debian installer **inside the intended qube**, then install that exact file; avoid wildcard signature verification when unrelated downloads are present. The launcher is `/opt/bisq/bin/Bisq`; an example dom0 shortcut invokes `qvm-run -q -a bisq-vm /opt/bisq/bin/Bisq`.

The source's 5000 MiB private-storage, 6000 MB initial-memory and four-vCPU settings describe that old test, not current minimums. Running out of writable storage can corrupt state. Review current [Qubes bind-directory documentation](https://www.qubes-os.org/doc/bind-dirs/) and test persistence across a reboot before funding. Whonix is a separate integration: v1.10.11 detects a Workstation and uses its Gateway's Tor; it refuses to run on the Gateway itself.

## Tails persistence and the obsolete Tor script

Tails discards ordinary session changes at shutdown. Wallet data must be in unlocked Persistent Storage, and a verified installer must be available for reinstalling the application. The recovered layout uses:

```text
/home/amnesia/Persistent/bisq/             installers and scripts
/home/amnesia/Persistent/bisq/Bisq/        application data
/home/amnesia/Persistent/bisq/Bisq/btc_mainnet/
```

Import only into an **empty** target; do not merge unrelated sessions' database files. Back up the real persistent directory, not a nonpersistent default path or merely a symbolic link. Keep versions of backups and verify the wallet survives restart before using it.

The original script installs a Debian package, changes permissions on Tor's control cookie, writes an onion-grater allowlist, modifies the desktop launcher and symlinks the data directory. Its launch flags (`--torControlPort`, `--torControlCookieFile`, `--torControlUseSafeCookieAuth`) are **rejected by current Bisq outside its special Whonix handling**. Therefore the old script must not be run unchanged on v1.10.11. The complete source remains accessible below for maintainers porting it; the sensitive cookie-permission and allowlist changes need a current Tails integration review. Do not downgrade an existing wallet simply to make the old script work.

## Arch and other community packages

The old AUR repair was specifically an update from Bisq 1.8.0 to 1.8.2: edit `PKGBUILD`'s version and source checksum, then run `makepkg -si`. Those version numbers and hashes are obsolete. A current package review must verify both the source archive and build recipe; changing only a version string does not establish integrity.

The alternate historical method extracted the Debian package's data archive and ran `opt/bisq/bin/Bisq` from it. Archive member names and dependencies can change, so this is a packaging technique, not a promise of compatibility with any future release. Check the [current official release assets](https://github.com/bisq-network/bisq/releases/tag/v1.10.11) and signature before running extracted code.

## Remote GUI with xpra or VNC

A remote host holds your wallet keys and payment data. A hosted VPS adds trust in its operator. Protect access as carefully as the wallet itself; no remote desktop should be exposed without strong authentication and an encrypted transport.

The recovered **xpra** recipe runs a persistent virtual display `:100`, starts `bisq-desktop` inside it and accesses it with an HTML client. It was based on Debian Bullseye and a v1.9.10 source checkout. Its `apt-key` repository installation, old Java requirements, `--appData` spelling and public unauthenticated `--bind-tcp=0.0.0.0:9876` example are **not current safe defaults**. Keep the useful model—dedicated unprivileged user, persistent data, explicit display and graceful shutdown—but use current xpra authentication/transport documentation. Close Bisq normally before stopping the display server; forcing it down can interrupt writes.

The **VNC** recipe used Debian 10, TightVNC, Awesome and autocutsel, a systemd service, and `-localhost` binding with an SSH tunnel. Its seed-node installer and hardcoded remote Bitcoin IP addresses are obsolete application setup choices. Preserve the isolation pattern:

```sh
# Replace the SSH host with your own; the remote VNC server must bind locally.
ssh -L 5901:127.0.0.1:5901 user@your-host
```

Then connect a local viewer to `127.0.0.1:5901`. The original eight-character VNC-password guidance is not a sufficient security model by itself. Verify the SSH host and current remote-desktop configuration. A systemd service must use the dedicated user's real paths and stop Bisq cleanly; do not paste the old root-level service/install script unchanged.

## Restricted-network setup

For China and other Tor-blocked networks, see [bridges and proxy context](../network-and-nodes/#china-and-other-restricted-networks). The old JAR-edit workaround and the new Tor sandbox have different assumptions; keep product and release versions explicit.

<details>
<summary>Sources and scope</summary>

- [Running Bisq on Qubes — source revision 2023-01-25](../../wiki-source/running-bisq-on-qubes.wiki.txt).
- [Running Bisq on Tails — source revision 2024-06-02](../../wiki-source/running-bisq-on-tails.wiki.txt).
- [Fix Arch release — source revision 2022-02-11](../../wiki-source/fix-arch-release.wiki.txt).
- [Remote control via web browser using xpra — source revision 2023-05-12](../../wiki-source/remote-control-via-web-browser-using-xpra.wiki.txt).
- [Running Bisq on Linux using VNC — source revision 2020-11-25](../../wiki-source/running-bisq-on-linux-using-vnc.wiki.txt).
- [Current external-Tor compatibility checks](https://github.com/bisq-network/bisq/blob/ea9d5dff90c99ac462f2b0a7bf9ef92683956619/common/src/main/java/bisq/common/config/Config.java#L1145-L1175).
- [Current supported release assets](https://github.com/bisq-network/bisq/releases/tag/v1.10.11).

Sources reviewed 7 November 2026. Current Bisq 1 code references are pinned to v1.10.11.

</details>
