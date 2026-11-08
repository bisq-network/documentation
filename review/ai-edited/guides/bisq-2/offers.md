---
title: "Create or take a Bisq Easy offer"
description: "Create or compare offers, check reputation and amount, and manage published offers."
---

*Checked 7 November 2026 · Bisq 2 v2.1.15.*

Use the offerbook when you want to set terms, or the trade wizard to find an existing match. Both lead to the same buyer-first Easy payment sequence. Read [safety](../bisq-easy-safety/) before committing funds.

## Create an offer

Choose the currency market and buy/sell direction, then select payment methods you can actually use. Several compatible methods can improve matching, but a custom method is not automatically safe or supported by your bank.

<figure><a href="../../media/wiki/affc9f65fdb03f4333dae4095871296f7d4531eeb602a38df70aba41cf24e8c5.png"><img src="../../media/wiki/affc9f65fdb03f4333dae4095871296f7d4531eeb602a38df70aba41cf24e8c5.png" alt="Selecting the market and creating an offer" loading="lazy" /></a><figcaption>Selecting the market and creating an offer. Historical illustration; current screens and values may differ.</figcaption></figure>

<figure><a href="../../media/wiki/46b4abbbb9cca752330ce928cca7578e65e6985d9d5d258d42e07f84fd3c012b.png"><img src="../../media/wiki/46b4abbbb9cca752330ce928cca7578e65e6985d9d5d258d42e07f84fd3c012b.png" alt="Selecting payment methods" loading="lazy" /></a><figcaption>Selecting payment methods. Historical illustration; current screens and values may differ.</figcaption></figure>

Set a fixed amount or an allowed range, review the price/premium and check whether seller reputation covers the maximum. Current overall limits are 6–600 USD equivalent, further constrained by the seller's score. An old screenshot slider is not the current allowance.

<figure><a href="../../media/wiki/48db6abd3849a53a1b1a431ef2f0aec5cf56a360422d9f116413151e76ad109b.png"><img src="../../media/wiki/48db6abd3849a53a1b1a431ef2f0aec5cf56a360422d9f116413151e76ad109b.png" alt="An offer amount range" loading="lazy" /></a><figcaption>An offer amount range. Historical illustration; current screens and values may differ.</figcaption></figure>

Read the final summary before publishing. An offer can remain available after someone responds; monitor and close unwanted offers rather than assuming one trade consumes the entire posting.

## Take an existing offer

In the wizard choose buy/sell direction, currency, methods and amount. Compare reputation as well as price. If no suitable seller covers the amount, reduce the amount or wait; do not bypass protection. A lower price is not a reason to accept lower security blindly.

<figure><a href="../../media/wiki/e1e42d2b3e439a040dfb05ea7b0a7108d5209a95ae08c03293cd6f81d478b0b1.png"><img src="../../media/wiki/e1e42d2b3e439a040dfb05ea7b0a7108d5209a95ae08c03293cd6f81d478b0b1.png" alt="Comparing matching offers and seller reputation" loading="lazy" /></a><figcaption>Comparing matching offers and seller reputation. Historical illustration; current screens and values may differ.</figcaption></figure>

<figure><a href="../../media/wiki/82bc28584d23c43b96be54157d79e5e6a9c88d3110fb83e51861e0ffc31922e5.png"><img src="../../media/wiki/82bc28584d23c43b96be54157d79e5e6a9c88d3110fb83e51861e0ffc31922e5.png" alt="Reviewing an offer before confirming" loading="lazy" /></a><figcaption>Reviewing an offer before confirming. Historical illustration; current screens and values may differ.</figcaption></figure>

If no offer matches, change only terms you can genuinely meet, or create your own offer. A lack of matches is not an application promise that someone will trade later.

<figure><a href="../../media/wiki/7b129356ddb6016f795313302e7e071937814c0db637663acc4b1e258c807429.png"><img src="../../media/wiki/7b129356ddb6016f795313302e7e071937814c0db637663acc4b1e258c807429.png" alt="No matching offers in the wizard" loading="lazy" /></a><figcaption>No matching offers in the wizard. Historical illustration; current screens and values may differ.</figcaption></figure>

## After a match

Check that the peer is available, exchange details within Bisq and follow [the payment/receipt sequence](../first-trade/). Either party can cancel before account details are exchanged; afterward the current rules impose obligations with an unresponsive-peer exception. Ask for [mediation](../get-help/) when the transaction cannot proceed safely.

Sellers should set a price that accounts for reputation costs, communication and settlement fees. The source's expected 10–15% premium is not a fixed fee or guaranteed profit.

<details>
<summary>Sources and checks</summary>

[bisq_easy.properties (pinned source)](https://github.com/bisq-network/bisq2/blob/cfe8ab251f2b6579f29e9955036afc33ba36861e/i18n/src/main/resources/bisq_easy.properties#L53-L291) · [bisq_easy.properties (pinned source)](https://github.com/bisq-network/bisq2/blob/cfe8ab251f2b6579f29e9955036afc33ba36861e/i18n/src/main/resources/bisq_easy.properties#L331-L436) · [BisqEasyTradeAmountLimits.java (pinned source)](https://github.com/bisq-network/bisq2/blob/cfe8ab251f2b6579f29e9955036afc33ba36861e/trade/src/main/java/bisq/trade/bisq_easy/BisqEasyTradeAmountLimits.java#L52-L69).

Current offer UI strings, limits and rules checked. Screenshots are historical illustrations; source trade-ID tip is superseded by current payment-screen blank/name rule.

Adapted from **Bisq Easy**, revision 4112 (2026-03-19). [Exact source](../../wiki-source/bisq-easy.wiki.txt) · [Attribution and revision metadata](../../wiki-source/bisq-easy.json).

</details>
