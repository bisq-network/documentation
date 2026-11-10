# Security Policy

This repository holds the Bisq documentation site (an Astro/Starlight site
published at https://bisq-network.github.io/documentation/), its build scripts,
and its GitHub Actions workflows. It does not contain the Bisq software itself.
Where to report depends on which of the two is affected.

## Supported Versions

Only the `main` branch is maintained. Fixes land there through pull requests.

## Reporting a Vulnerability in This Site, Its Build, or Its Workflows

Please do **not** report security vulnerabilities through public GitHub issues,
pull requests, Discussions, chat rooms, forums, or social media.

Report suspected vulnerabilities privately through GitHub's **Report a
vulnerability** flow on this repository's Security page:
https://github.com/bisq-network/documentation/security/advisories/new. If that
option is not available, open a minimal public issue asking maintainers to
enable a private security reporting channel, but do not include exploit
details.

Include as much detail as possible:

- the affected page, file, commit, or workflow;
- the impact, for example script injection in a page, altered links, addresses,
  or downloads, a vulnerable or compromised build dependency, or a workflow that
  exposes secrets or token permissions;
- reproduction steps, with proof-of-concept code only when needed to
  demonstrate impact;
- whether the issue is already exploited or time-sensitive.

Bisq is an open-source project maintained by contributors, so response times
may vary. If the report is accepted, maintainers may coordinate a fix in a
private fork or security advisory and publish an advisory afterwards. If the
report is declined, maintainers will explain the reason when possible.

Please give maintainers reasonable time to investigate and fix the issue before
public disclosure.

## Vulnerabilities in Bisq Itself

The documentation describes Bisq, but the software is developed elsewhere. Do
not report vulnerabilities in Bisq, such as in the trade protocol, wallet, P2P
networking, DAO, seednodes, price feeds, updater, or release infrastructure,
in this repository.

Bisq 1 and Bisq 2 each have their own security policy. Report to the repository
of the affected version, privately through GitHub's **Report a vulnerability**
flow on that repository's Security page:

- Bisq 1: [bisq-network/bisq](https://github.com/bisq-network/bisq/blob/master/SECURITY.md),
  report at https://github.com/bisq-network/bisq/security/advisories/new;
- Bisq 2: [bisq-network/bisq2](https://github.com/bisq-network/bisq2/blob/main/SECURITY.md),
  report at https://github.com/bisq-network/bisq2/security/advisories/new.

## CI Supply-Chain Pinning

Workflows in this repository should pin GitHub Actions to full commit SHAs
instead of mutable tags, with a trailing version comment such as `# v1.2.3`.
When bumping an action, verify that the new upstream tag resolves to the
committed SHA and update both the SHA and the version comment together.
