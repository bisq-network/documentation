---
title: "Buy your first bitcoin with Bisq Easy"
description: "Prepare your wallet, choose an offer, pay safely, and confirm bitcoin receipt."
---

*Bisq 2 v2.1.15 · Checked 7 November 2026.*

Use this guide to **buy bitcoin through Bisq Easy** in the standard Bisq 2 desktop application. Read [the safety guide](../bisq-easy-safety/) before committing money.

## Prepare before accepting an offer

1. [Install and verify Bisq 2](../install-and-verify/), then let it connect to the network.
2. Prepare a Bitcoin wallet you control and back it up using that wallet's own instructions. You will need a receiving address for an on-chain trade, or a Lightning invoice if you agree to use Lightning. Bisq Easy's **Wallet guide** explains receiving bitcoin in a separate wallet.
3. Choose a payment method and account you can actually use. Allow for the transfer's timing and any bank fees.
4. [Back up Bisq 2](../backup-and-recovery/) so your local application identity and trade data are protected separately from the wallet.

This guide uses a separate receiving wallet. If you use an experimental integrated wallet instead, obtain build-specific guidance before trading or restoring it.

## Choose and review an offer

Open **Bisq Easy** and use its buying wizard or offerbook. Choose your currency, payment method, and amount, then examine the available sellers and their reputation. Check the total price and terms; a cheaper offer is not automatically a safer one.

<figure><a href="../../media/wiki/bdebeca02d79b212618f0236d5484a77d7db6e3c6d1f3dc275008f80c4ff5d6b.png"><img src="../../media/wiki/bdebeca02d79b212618f0236d5484a77d7db6e3c6d1f3dc275008f80c4ff5d6b.png" alt="Bisq Easy currency selection with EUR selected" width="920" height="550" loading="lazy"></a><figcaption>Historical currency-selection screen; current wording may differ.</figcaption></figure>

Read the final review screen before taking an offer. If no seller has sufficient reputation for your amount, choose a smaller trade or wait; do not bypass the protection. Confirm that the seller is available in the trade chat before sending money.

## Exchange details and pay

The seller sends payment-account details through the trade chat. Provide your wallet's receiving address or the agreed Lightning invoice. Check that you supplied the correct destination and payment network.

Send the agreed payment from the account identified in the trade, then use Bisq's payment confirmation only after you have actually initiated it. Follow the [payment-reference rule and account checks](../bisq-easy-safety/#check-payment-details-carefully). Stop if details change or the application warns that an account is banned.

## Confirm bitcoin receipt

After checking that your payment arrived, the seller sends bitcoin and shares the transaction information. Check receipt in **your own wallet** as well as the trade screen.

For an on-chain trade, the v2.1.15 interface treats payment as complete after **one blockchain confirmation**. For Lightning, confirm that your wallet received the payment; if it has not arrived, contact the seller in the trade chat instead of marking it received.

Keep the trade record and respond to messages until completion. If payment or bitcoin is delayed, [request mediation](../get-help/). Do not make a second payment merely because the first is taking time.

<details>
<summary>Sources</summary>

[Trade process and settlement](https://github.com/bisq-network/bisq2/blob/cfe8ab251f2b6579f29e9955036afc33ba36861e/i18n/src/main/resources/bisq_easy.properties#L418-L436) · [Wallet guide](https://github.com/bisq-network/bisq2/blob/cfe8ab251f2b6579f29e9955036afc33ba36861e/i18n/src/main/resources/bisq_easy.properties#L458-L481) · [Receiving UI](https://github.com/bisq-network/bisq2/blob/cfe8ab251f2b6579f29e9955036afc33ba36861e/apps/desktop/desktop/src/main/java/bisq/desktop/main/content/bisq_easy/open_trades/trade_state/states/BuyerState1a.java) · [Release configuration](https://github.com/bisq-network/bisq2/blob/cfe8ab251f2b6579f29e9955036afc33ba36861e/apps/desktop/desktop-app/src/main/resources/desktop.conf#L1-L5)

</details>
