---
title: "Trading protocols and current availability"
description: "Separate standard Bisq Easy, developer-gated MuSig and historical protocol proposals."
---

*Checked 7 November 2026 · Bisq 2 v2.1.15.*

A protocol defines how payment, security, fees and disputes work. A feature listed in old design material is not necessarily available for trading in your installed release.

## Bisq Easy: standard trading

Easy uses seller reputation and external fiat payment, followed by BTC delivery on the agreed Bitcoin network. Neither peer posts an escrow security deposit. The current code sets a **6–600 USD equivalent** overall amount range; a seller's score must also cover the amount at **200 points per USD**. The offer screen converts those values and applies validation/tolerances. See [reputation](../reputation/) and [first trade](../first-trade/).

## MuSig: developer-gated implementation

The v2.1.15 activation code requires **DevMode** as well as activation. Standard desktop configuration sets devMode=false. MuSig's presence in the source tree is therefore not a recommendation to enable it with real funds.

### Experimental trade limits

The checked MuSig amount-policy code defines a **10 USD minimum** and **10,000 USD maximum**, with fiat chargeback-risk multipliers of 1.0 (very low), 0.8 (low), 0.65 (medium) and 0.5 (moderate); other/unrecognized risk categories return 0. These are implementation reference values for the gated protocol, not Easy limits or instructions for activating it.

The old MuSig-tradelimits article also describes imported signed witnesses, account age, a 90-day schedule and a daily rate formula. Those details were not fully traced through the release's complete account-policy implementation here. Do not treat its “all limits removed” statements or simulator output as a verified entitlement. Use build-specific developer documentation and testing before any experimental use.

## Atomic swaps and BSQ

An atomic swap links both assets' exchange in one protocol so one side cannot independently complete while the other fails to pay. BTC/BSQ swaps exist in Bisq 1; their outcome is final only after the relevant Bitcoin confirmation, not merely after an “instant” screen event. An ordinary altcoin payment is not atomic.

The old wiki's statement that only BTC/BSQ was implemented belongs to that source's scope and date. It does not prove all later proposals shipped in Bisq 2.

## Historical protocol proposals

The source set discussed:

| Proposal | Intended distinction |
| --- | --- |
| Bisq Lightning | Escrow using Lightning/multiparty cryptography |
| Liquid MuSig | Multisig settlement using L-BTC; different federation/peg risks |
| Liquid swaps | Atomic exchange of Liquid assets |
| Monero swaps | Cross-chain BTC/XMR atomic exchange |
| Submarine swaps | On-chain BTC ↔ Lightning BTC |
| Stablecoin/coloured-coin swaps | Atomic exchange with suitable Bitcoin assets |
| Multisig options | Conditional payout, expiry and an oracle |
| Multisig open contracts | User-defined conditional payments with dispute arbitration |

These are retained as design context, not current product promises. Supporting a new protocol requires implementation, security review, support and actual release availability; a roadmap label alone supplies none of those.

<details>
<summary>Sources and checks</summary>

[MuSigService.java (pinned source)](https://github.com/bisq-network/bisq2/blob/cfe8ab251f2b6579f29e9955036afc33ba36861e/mu-sig/src/main/java/bisq/mu_sig/MuSigService.java#L163-L168) · [desktop.conf (pinned source)](https://github.com/bisq-network/bisq2/blob/cfe8ab251f2b6579f29e9955036afc33ba36861e/apps/desktop/desktop-app/src/main/resources/desktop.conf#L1-L5) · [BisqEasyTradeAmountLimits.java (pinned source)](https://github.com/bisq-network/bisq2/blob/cfe8ab251f2b6579f29e9955036afc33ba36861e/trade/src/main/java/bisq/trade/bisq_easy/BisqEasyTradeAmountLimits.java#L52-L69) · [MuSigTradeAmountLimitsPolicy.java (pinned source)](https://github.com/bisq-network/bisq2/blob/cfe8ab251f2b6579f29e9955036afc33ba36861e/offer/src/main/java/bisq/offer/mu_sig/MuSigTradeAmountLimitsPolicy.java#L30-L60).

Standard/dev availability and amount-policy constants verified in immutable code. Full gated MuSig rate/age/account-import policy was not validated, so historical formulas are qualified.

Adapted from **Trade Protocols**, revision 3659 (2024-07-23). [Exact source](../../wiki-source/trade-protocols.wiki.txt) · [Attribution and revision metadata](../../wiki-source/trade-protocols.json).

Adapted from **MuSig-tradelimits**, revision 4115 (2026-04-09). [Exact source](../../wiki-source/musig-tradelimits.wiki.txt) · [Attribution and revision metadata](../../wiki-source/musig-tradelimits.json).

Adapted from **Atomic swap**, revision 3188 (2023-04-17). [Exact source](../../wiki-source/atomic-swap.wiki.txt) · [Attribution and revision metadata](../../wiki-source/atomic-swap.json).

</details>
