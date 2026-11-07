---
title: "Trade L-BTC and verify confidential payments"
description: "Preserve confidential-payment evidence and understand blinding-key verification."
---

*Checked 7 November 2026 · Bisq 1 v1.10.11.*

L-BTC is the Liquid network's BTC-pegged asset. Liquid uses a federation and confidential transactions; it is not the same security model or network as Bitcoin main-chain BTC. Confirm that both traders intend L-BTC, the correct asset and receiving address.

## Plan for confidential-payment disputes

The **L-BTC receiver** (BTC seller) must be able to supply the relevant receiving address's **private blinding key** if a dispute requires revealing the confidential amount/asset. A transaction ID alone does not reveal those fields.

Elements Core documents this RPC:

```text
elements-cli dumpblindingkey "ADDRESS"
```

It returns the private blinding key in hex. Substitute the actual receiving address. This is sensitive transaction-privacy information; disclose it only through the necessary private dispute process, not in public chat. It is not a request to give someone your seed or spending keys.

The old article categorically excluded Green/other wallets. That is not a current wallet-capability survey. Before using any wallet, verify you can obtain the proof required for this trade; if not, choose a compatible wallet or do not accept the offer.

## Verification reference for dispute agents

The source's Elements Core workflow requires a synchronized Liquid node and an appropriate wallet. It uses transaction indexing for the verifier, watches the receiving address, inspects the transaction, imports the blinding key, then inspects again:

```text
importaddress ADDRESS
gettransaction TXID true
importblindingkey ADDRESS BLINDING_KEY
gettransaction TXID true
```

These commands are a **versioned technical reference**, not an instruction to modify your primary wallet blindly. Address import/rescanning can take substantial time; wallet/RPC support depends on the installed Elements version and wallet type. Compare the revealed asset, amount and recipient with the actual contract. Do not consider a matching transaction ID sufficient.

## Price and peg trade-offs

Offer makers choose the trade price; 1:1 peg design does not guarantee an available 1:1 peer offer, zero fees or immediate redemption. The source contrasted peer trading with peg-in/peg-out delays. Its 102-confirmation and 17–35 minute timing examples are not a verified current redemption guarantee.

The old roadmap phrase “Schnorr signatures in development” is not carried forward as current state. Use current Liquid/Elements documentation for federation, peg and software behavior, and the [altcoin account guide](../altcoins/) for Bisq timing.

<details>
<summary>Sources and checks</summary>

[PaymentMethod.java (pinned source)](https://github.com/bisq-network/bisq/blob/ea9d5dff90c99ac462f2b0a7bf9ef92683956619/core/src/main/java/bisq/core/payment/payload/PaymentMethod.java#L290-L300) · [Elements 0.21 RPC reference](https://elementsproject.org/en/doc/0.21.0.0/rpc/wallet/dumpblindingkey/) · [ElementsProject/elements repository](https://github.com/ElementsProject/elements).

Official versioned Elements dumpblindingkey RPC checked. Full import/rescan workflow and current wallet compatibility not executed; explicitly retained as versioned technical reference.

Adapted from **Trading L-BTC**, revision 2161 (2021-04-16). [Exact source](../../wiki-source/trading-l-btc.wiki.txt) · [Attribution and revision metadata](../../wiki-source/trading-l-btc.json).

</details>
