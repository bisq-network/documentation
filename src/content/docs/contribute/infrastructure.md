---
title: Infrastructure and price nodes
description: Understand price-node responsibilities and find maintained setup instructions.
---

*Source checked 7 November 2026 · Maintainer review pending.*

## How to run pricenode

The [Bisq pricenode](https://github.com/bisq-network/bisq-pricenode) fetches, transforms and relays third-party market-price and Bitcoin fee information to clients. Its documented endpoints include `/getAllMarketPrices` and `/getFees`. Production nodes can be exposed as Tor onion services, allowing clients to request data without leaving Tor. Availability, updates, provider configuration and monitoring are operator responsibilities.

The checked upstream commit is `c1576ab976b2403b7858c84e6396962ad84ba467`. Its Gradle build specifies a Java 21 toolchain. Its README still says JDK 8 and its Debian installer installs OpenJDK 11, so those instructions conflict; do not assume either older prerequisite satisfies the checked build. Resolve the discrepancy with maintainers before deployment. The source includes a Bisq Git submodule and uses Git LFS in its installation flow.

For a controlled source checkout, review the commit and submodules before building:

```sh
git clone --recursive https://github.com/bisq-network/bisq-pricenode.git
cd bisq-pricenode
git checkout --detach c1576ab976b2403b7858c84e6396962ad84ba467
git submodule update --init --recursive
./gradlew clean build
```

These are the repository's source-build steps with the checked commit made explicit; they were not executed in this review. Review any Gradle downloads and configuration first. The upstream README also documents a Debian installer, but the checked script upgrades packages, adds a Git LFS repository, changes Tor configuration, creates a user, installs and starts a systemd service, and restarts Tor. Read and reconcile it with your environment rather than piping an unreviewed remote script into a privileged shell.

For a deliberately configured local service, the README documents these read-only endpoint probes on its default port:

```sh
curl http://localhost:8080/getAllMarketPrices
curl http://localhost:8080/getFees
curl http://localhost:8080/getParams
curl http://localhost:8080/info
```

The checked sample service uses `bisq-pricenode.service`, an environment file, a `bisq` user and an application under `/bisq/bisq-pricenode`; verify the installed unit before using `systemctl status bisq-pricenode` or `journalctl -u bisq-pricenode -f`. Its sample Tor configuration points an onion-service port to `127.0.0.1:8080`. Protect and back up the hidden-service keys, and do not expose them in logs. Production operators must agree monitoring, provider discovery and update procedures with maintainers; simply running a node does not enlist it in clients' default provider list.

## Pricenode

Running a personal pricenode does not make it discoverable as a default provider. The upstream README explains provider discovery and the client `--providers` option. Default operator selection, monitoring, bonding and compensation are governance and maintenance matters; consult the current [role issue](https://github.com/bisq-network/roles/issues/14), not the recovered page's old figures. A historical setup guide referred to `systemctl` and `journalctl` for a service named `bisq-pricenode`; confirm your actual service definition before using them.

## How to run seednode

A seed node helps distribute Bisq network data. The recovered page was a pointer to the [seed-node guide](https://docs.bisq.network/exchange/howto/run-seednode.html), not a complete setup procedure. Consult current release and operator instructions, capacity requirements and monitoring guidance before deployment.

## Events calendar

The recovered project used an [events calendar](https://bisq.network/calendar) to coordinate community calls and events. Verify that any listed meeting is current and public before joining or sharing details.

## Sources and review

The pinned [README](https://github.com/bisq-network/bisq-pricenode/blob/c1576ab976b2403b7858c84e6396962ad84ba467/README.md), [Gradle toolchain](https://github.com/bisq-network/bisq-pricenode/blob/c1576ab976b2403b7858c84e6396962ad84ba467/build.gradle), [installer](https://github.com/bisq-network/bisq-pricenode/blob/c1576ab976b2403b7858c84e6396962ad84ba467/scripts/install_pricenode_debian.sh), [service unit](https://github.com/bisq-network/bisq-pricenode/blob/c1576ab976b2403b7858c84e6396962ad84ba467/scripts/bisq-pricenode.service), [role issue](https://github.com/bisq-network/roles/issues/14) and [seed-node guide](https://docs.bisq.network/exchange/howto/run-seednode.html) were checked 7 November 2026. The historical wiki supplied the command and operational context. No node, installer or infrastructure command was run; test setup against the current repository before production use.
