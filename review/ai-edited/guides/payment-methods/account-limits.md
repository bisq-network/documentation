---
title: "Account limits, signing and account-age evidence"
description: "Understand current BTC limits, signing stages, account-age proof and identity backup."
---

*Checked 7 November 2026 · Bisq 1 v1.10.11.*

Bisq 1 uses account limits to reduce stolen-account and chargeback risk. **An old account or a signing badge is not proof of honesty.** Limits are also separate from your bank's sending allowance and from an offer's minimum/maximum amount.

## Which limits apply

The current implementation grants the method's available maximum for crypto trades, BTC selling, and fiat methods without the signing-risk classification. For BTC buying using a signing-sensitive method/currency, the signed-account schedule below applies. Runtime limits are calculated from DAO/protocol parameters and risk factors, then clamped to the release's **0.25 BTC** ceiling. That ceiling is not the allowance for every method/account; old method-specific BTC tables are not authoritative.

Signing-sensitive IDs include SEPA, SEPA Instant, Interac e-Transfer, Zelle/ClearXchange, Revolut, National Bank, Same Bank, Specific Banks, legacy Chase QuickPay, Popmoney, MoneyBeam and Uphold **in EUR, USD, GBP, CAD, AUD or BRL**, the checked mature-market set. The 0.002 BTC small-trade amount applies after the code's 17 February 2025 activation date; the older 0.01 BTC value is superseded. The current account/trade screen is the reliable place to see your actual allowed amount.

## Account signing

| Time since eligible signing | BTC buying allowance |
| --- | --- |
| Unsigned or under 30 days | 0.002 BTC (current tolerated-small-trade amount) |
| 30–under 60 days | Half of the method's applicable maximum |
| 60 days or more | Full applicable method maximum |

Creating an account and waiting does not sign it. A qualifying completed BTC purchase from an eligible signed seller can do so. Before taking an offer, inspect the signing badge and the actual amount required by the client. Making an offer cannot ensure the eventual taker will be eligible to sign you.

The source also describes self-signing a new account from an eligible mature signed account with an **exact matching holder name**. Methods without the necessary holder-name data cannot use that shortcut. Do not recreate accounts casually; use the current form's signing status and seek help if it differs.

<figure><a href="../../media/wiki/be63e50c9318adf644108e184bd7c0f9b62ce6670037ae1b39a6b9df7ef0fb29.png"><img src="../../media/wiki/be63e50c9318adf644108e184bd7c0f9b62ce6670037ae1b39a6b9df7ef0fb29.png" alt="Offer signing indicators" loading="lazy" /></a><figcaption>Offer signing indicators. Historical illustration; current screens and values may differ.</figcaption></figure>

## Account age and preservation

Account age records when the payment identity was witnessed in Bisq; it is not the age of the bank account. Protect the original account details, salt and application signing identity. A wallet seed alone does not preserve these. Make a [full application backup](../../bisq-1/backup-and-recovery/).

<figure><a href="../../media/wiki/2dfd8690c9302008f5ee6b2738b1150f373b145fe67663822d018d669f4f7cc0.png"><img src="../../media/wiki/2dfd8690c9302008f5ee6b2738b1150f373b145fe67663822d018d669f4f7cc0.png" alt="Payment-account age, limit and signing status" loading="lazy" /></a><figcaption>Payment-account age, limit and signing status. Historical illustration; current screens and values may differ.</figcaption></figure>

## Personal risk limits

A client preference can impose an additional user-selected trade ceiling. It does not disable protocol signing restrictions or the bank's limits. Learn backups, trade rules, disputes and penalties before increasing it; a higher permitted amount is not a recommendation to trade that amount.

## How the account-age witness works

The original design publishes a hash and first-observed date, rather than the complete bank details. The hash is **RIPEMD-160(SHA-256(account witness data + salt + public signing key))**; it combines method-specific account data, a random salt and the public signing key. During a trade, the peer can recompute the hash and verify a signature tied to trade-specific data. This binds the proof to the payment identity and private signing key without publishing the bank information to everyone.

The design checks date tolerances to frustrate backdating, uses a unique witness hash to prevent later replacement, and requires signatures to prevent reuse of someone else's public witness. A thief cannot simply copy the hash and pretend to own the original key. Preserving the salt alone is therefore insufficient after losing the signing identity.

The 2017 design article also documents propagation, seed-node bootstrap data, hashing/protobuf examples, the offer nonce/signature checks and the 2017–2018 rollout. Those old rollout dates and illustrative 25%/50%/100% account-creation schedule are design history, superseded by the current signing-based buying calculation above. The [complete technical source](../../wiki-source/payment-account-age-witness.wiki.txt) remains available for protocol study.

## Local reputation is different

Bisq 1's avatar trade count records prior trades with a peer's onion identity. It is local experience, not a global integrity score, account signing or Bisq 2 reputation. Changing onion identity can reset recognizability. **Never delete or replace onion/key data with offers, trades or disputes open**; doing so can make you unreachable.

<figure><a href="../../media/wiki/82bbd0f2e26e4c5ef66aca73762ebe2548c76c874f298d0d37549e77afdc6eb3.png"><img src="../../media/wiki/82bbd0f2e26e4c5ef66aca73762ebe2548c76c874f298d0d37549e77afdc6eb3.png" alt="Bisq 1 prior-peer trade count" loading="lazy" /></a><figcaption>Bisq 1 prior-peer trade count. Historical illustration; current screens and values may differ.</figcaption></figure>

<details>
<summary>Sources and checks</summary>

[Current 0.002 BTC small-trade constant](https://github.com/bisq-network/bisq/blob/ea9d5dff90c99ac462f2b0a7bf9ef92683956619/core/src/main/java/bisq/core/offer/OfferRestrictions.java#L35-L47) · [0.25 BTC clamp](https://github.com/bisq-network/bisq/blob/ea9d5dff90c99ac462f2b0a7bf9ef92683956619/core/src/main/java/bisq/core/payment/TradeLimits.java#L39-L93) · [Mature-market currencies](https://github.com/bisq-network/bisq/blob/ea9d5dff90c99ac462f2b0a7bf9ef92683956619/core/src/main/java/bisq/core/locale/CurrencyUtil.java#L190-L198).

[AccountAgeWitnessService.java (pinned source)](https://github.com/bisq-network/bisq/blob/ea9d5dff90c99ac462f2b0a7bf9ef92683956619/core/src/main/java/bisq/core/account/witness/AccountAgeWitnessService.java#L475-L515) · [PaymentMethod.java (pinned source)](https://github.com/bisq-network/bisq/blob/ea9d5dff90c99ac462f2b0a7bf9ef92683956619/core/src/main/java/bisq/core/payment/payload/PaymentMethod.java#L490-L507) · [PaymentMethod.java (pinned source)](https://github.com/bisq-network/bisq/blob/ea9d5dff90c99ac462f2b0a7bf9ef92683956619/core/src/main/java/bisq/core/payment/payload/PaymentMethod.java#L329-L438).

Current factor schedule and risk classification checked against release code. Exact signing amount, dynamic maxima, current mature-currency set and self-signing eligibility must match the client. Original 2017 algorithm examples/rollout retained as technical source rather than current limits.

Adapted from **Account limits**, revision 4145 (2026-05-29). [Exact source](../../wiki-source/account-limits.wiki.txt) · [Attribution and revision metadata](../../wiki-source/account-limits.json).

Adapted from **Payment account age witness**, revision 2205 (2021-04-27). [Exact source](../../wiki-source/payment-account-age-witness.wiki.txt) · [Attribution and revision metadata](../../wiki-source/payment-account-age-witness.json).

Adapted from **Local reputation**, revision 1288 (2020-06-01). [Exact source](../../wiki-source/local-reputation.wiki.txt) · [Attribution and revision metadata](../../wiki-source/local-reputation.json).

</details>
