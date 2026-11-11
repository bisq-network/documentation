---
title: "How to do remittance on Bisq"
slug: "wiki/how-to-do-remittance-on-bisq"
tableOfContents: false
---

<div class="wiki-recovered-article" lang="en">

**International remittance** is the transfer of money from one country to another. Bitcoin of course makes it trivial and fast to send value anywhere in the world, but not everyone is on the Bitcoin standard yet and some people still want to be paid in [fiat](../fiat/). Bisq can help you create a remittance channel to facilitate fast, cheap international transfers while at the same time earning some profit for your services.

By using Bisq you can turn an expensive, slow international transfer into two fast, local transfers.

The role of remittance channel operator is similar to that of market maker (see [How to be a market maker on Bisq](../how-to-be-a-market-maker-on-bisq/)) the difference being that you operate on two markets at the same time and you need to have fiat accounts for both markets.

1\. **Create an offer** to SELL Bitcoin on market 1 (eg: USD) at 1% above market price using a fast payment method.

2\. **Create an offer** to BUY Bitcoin on market 2 (eg: CNY) at 1% below market price using a fast payment method.

3\. Tell your client in market 1 (the \"sender\") to **take** your first offer (buying Bitcoin from you for USD) -\-> you receive fiat in market 1.

4\. Tell your client in market 2 (the \"receiver\") to **take** your second offer (selling you Bitcoin for CNY) -\-> your receive Bitcoin.

5\. The client in market 1 pays fiat and receives Bitcoin. The client in market 2 pays Bitcoin and receives fiat.

6\. Repeat!

Both fiat transactions are local. The example uses two 1% price margins, not a guaranteed profit. Fees, exchange-rate and price changes, payment issues, settlement delays and other risks can affect the result; completion time and costs are not guaranteed.

This business model is perfect for someone who has a physical shop as you can even make the offers **F2F (in person)** cash deals and avoid financial institutions altogether.

- For more short guides see [Howto](../howto/). You can also find support on **[Matrix](https://bisq.chat)**.

</div>
