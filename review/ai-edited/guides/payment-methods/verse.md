---
title: "Verse: discontinued payment-method reference"
description: "Understand discontinued Verse entries without starting a new trade."
---

*Checked 7 November 2026 · Bisq 1 v1.10.11.*

**Do not create a new Verse trade.** The checked Bisq 1 source explicitly marks Verse as shut down and filters it out of the new fiat-account selector.

## Understand an old trade record

Verse was a European mobile balance-transfer service using a username and several currencies, including EUR, SEK, HUF, DKK and PLN. The source distinguished instant internal transfers from later withdrawals to a bank and described an annual transfer allowance. These are historical descriptions, not live service instructions or a current fee/limit quote.

Keep receipts, usernames, currency and dates for an old trade. Do not send funds to a replacement website or someone offering to “reactivate” a closed-service account. Use [dispute help](../../bisq-1/dispute-help/) for an unresolved Bisq trade and the provider's authentic official channels for provider-side claims.

The legacy method object remains in code for compatibility with stored data. Its presence is not current availability.

<details>
<summary>Sources and checks</summary>

[PaymentMethod.java (pinned source)](https://github.com/bisq-network/bisq/blob/ea9d5dff90c99ac462f2b0a7bf9ef92683956619/core/src/main/java/bisq/core/payment/payload/PaymentMethod.java#L270-L284) · [FiatAccountsView.java (pinned source)](https://github.com/bisq-network/bisq/blob/ea9d5dff90c99ac462f2b0a7bf9ef92683956619/desktop/src/main/java/bisq/desktop/main/account/content/fiataccounts/FiatAccountsView.java#L458-L460).

Shutdown comment and new-account filter directly checked. Old provider marketing and onboarding steps removed.

Adapted from **Verse**, revision 4108 (2026-02-17). [Exact source](../../wiki-source/verse.wiki.txt) · [Attribution and revision metadata](../../wiki-source/verse.json).

</details>
