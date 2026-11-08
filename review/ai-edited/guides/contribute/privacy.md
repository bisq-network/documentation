---
title: Contributor privacy and operational security
description: Plan identity separation and information sharing around your own threat model.
---

*Source checked 7 November 2026 · Maintainer review pending.*

## Contributor privacy and opsec

Decide what you want to protect, from whom, and what a mistake would cost. Privacy, anonymity and pseudonymity are different: a pseudonym can accumulate a recognizable public history without intentionally revealing a legal identity. Account reuse, writing style, browser characteristics, payment activity, time patterns and accidental disclosure can connect identities. No browser setting guarantees anonymity.

Use separate accounts and devices or profiles where appropriate, protect access credentials and recovery material, and avoid transferring identifying details between contexts. Before posting, consider that public issues, commits and chat messages may be retained indefinitely. Tor can reduce network-origin exposure, but changes to browser defaults can increase fingerprintability. The recovered guide suggested disabling protective browser defaults and retaining logins; do not follow that configuration as a current anonymity recipe. Use [Tor Browser's current guidance](https://support.torproject.org/) and evaluate the usability/security tradeoff yourself.

Separate online anonymity from physical-device security. Someone with access to an unlocked computer or unencrypted backups may see identities, session data and files regardless of network routing. Plan secure backups and access recovery without putting secrets in public repositories.

## Accounts and DAO activity

A contribution may involve GitHub, email, Matrix or the forum; service registration requirements and privacy policies can change. Choose services based on current requirements rather than an old claim about identity verification. BSQ issuance, votes and proof-of-burn transactions can connect activity to public proposals or addresses. The [Burning Men guide](../../dao/burning-men/) explains that its payout addresses and burns can reveal relationships. Do not assume a pseudonym makes those on-chain links private.

## Sources and review

The recovered [contributor privacy guide](../../wiki-source/contributor-privacy-and-opsec.wiki.txt) supplies the compartmentalization and DAO-linkability discussion. [Tor Project support](https://support.torproject.org/) and the [Bisq contribution policy](https://bisq.network/blog/open-source-development-in-the-age-of-ai/) were checked 7 November 2026. Privacy depends on the threat model and changing software; no anonymity guarantee or live security assessment is implied.
