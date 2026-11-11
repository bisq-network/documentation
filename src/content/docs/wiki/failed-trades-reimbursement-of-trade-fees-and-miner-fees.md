---
title: "Failed Trades - Reimbursement of Trade Fees and Miner Fees"
slug: "wiki/failed-trades-reimbursement-of-trade-fees-and-miner-fees"
tableOfContents: false
---

<nav data-pagefind-ignore class="wiki-source-toc" aria-label="Article sections"><details open><summary>On this page</summary><ul><li><a href="#common-reasons-for-trades-to-fail">Common reasons for trades to fail</a></li><li><a href="#less-common-reasons-for-trades-to-fail">Less common reasons for trades to fail</a></li><li><a href="#what-failed-trades-are-eligible-for-reimbursement">What failed trades are eligible for reimbursement?</a></li><li><a href="#when-to-consider-reimbursement">When to consider reimbursement?</a></li><li><a href="#what-should-i-do-before-requesting-reimbursement-request-for-lost-miner-and-trade-fees">What should I do before requesting reimbursement request for lost miner and trade fees?</a></li><li><a href="#how-do-i-know-what-my-miner-fees-were">How do I know what my miner fees were?</a></li><li><a href="#how-do-i-know-what-my-trader-fees-were">How do I know what my trader fees were?</a></li><li><a href="#how-to-make-reimbursement-request-for-lost-miner-and-trade-fees-from-a-failed-trade">How to make reimbursement request for lost miner and trade fees from a failed trade?</a></li></ul></details></nav>

<div class="wiki-recovered-article" lang="en">

Sometimes trades on Bisq fail because of bugs or edge situations, that lead to an invalid deposit transaction: either no deposit txid exists, or the txid is missing from the blockchain (as can be verified on a blockchain explorer).

Usually failed trades will also have an issue with the maker and/or taker txid, caused by an out-of-sync internal Bisq wallet on the party with the failed tx.

- if miner and trade fees were lost for the BTC buyer and/or seller, a reimbursement can be considered if the lost fees are significant enough, e.g. above $10 of value
- if no fees were lost, no reimbursement is obviously needed
- **no other losses will be caused by a failed trade**, as the deposit tx never happens, so no additional funds will have left your wallet in the first place

<span class="wiki-legacy-anchor" id="Common_reasons_for_trades_to_fail" aria-hidden="true">
</span>

## Common reasons for trades to fail {#common-reasons-for-trades-to-fail}

The most common reason for a trade to fail is either the maker or taker is trading with an out-of-sync bitcoin wallet.

When the maker is trading with an out-of-sync Bisq wallet they will often be able to \'make\' a trade of their choosing. Normally one of two things happen:

1. 1\. When the maker is trading with an out-of-sync Bisq wallet most often the trade will end up not being displayed on the Bisq Markets for someone to take as the software checks to make sure an offer is valid before propagating it to the peer to peer network. When a trade fails in this way the maker will not have lost any trade fees or miner fees as there was never any maker transaction ID. In this instance the fix is for the maker of the trade to do an [SPV resync](../resyncing-spv-file/). Once this is completed they can delete the trade they made by goin to Portfolio > Open Offers and pressing the delete icon next to the trade.
2. 2\. Sometimes an invalid maker offer can be shown in a users Bisq instance. If this happens when the taker takes the offer they will lose both mining and trade fees as they will incur costs for the taker transaction ID even though a deposit transaction will not be created. In this case reimbursement can be considered by the taker if the lost fees are significant enough to warrant making a reimbursement request, eg above $10 of value.). In this instance the fix is for the maker of the trade to do an [SPV resync](../resyncing-spv-file/).

When the taker is trading with an out-of-sync Bisq wallet they will often be able to \'take\' a trade of their choosing. Normally one of two things happen:

1. 1\. The trade remains in the offer book, the taker transaction and the deposit transaction fails, the trade can be seen on both the buyer\'s and seller\'s Bisq instance. The deposit transaction confirmation will show as N/A. This is because the deposit transaction could not be created because the taker transaction failed. In this instance neither the maker or taker will have lost any trade or miner fees. The offer will still be able to be taken in the offer book, and the taker transaction did not confirm so no fees were spent from the takers wallet. In this instance the fix is for the taker of the trade to do an [SPV resync](../resyncing-spv-file/).
2. 2\. The trade is removed from the offer book, the taker transaction and the deposit transaction fails, the trade can be seen on both the buyer\'s and seller\'s Bisq instance. The deposit transaction confirmation will show as being present but a check on a blockchain explorer will show it as an invalid transaction. This is because the deposit transaction could not be created because the taker transaction failed. In this instance the maker will have lost trade and miner fees, but the taker will not have lost any fees. In this case reimbursement can be considered by the maker if the lost fees are significant enough to warrant making a reimbursement request, eg above $10 of value.). In this instance the fix is for the taker of the trade to do an [SPV resync](../resyncing-spv-file/).

<span class="wiki-legacy-anchor" id="Less_common_reasons_for_trades_to_fail" aria-hidden="true">
</span>

## Less common reasons for trades to fail {#less-common-reasons-for-trades-to-fail}

Less common reasons for trades to fail are:

- Bugs in the software
- Tor network issues
- A user trading with an out of space hard drive, corrupted wallet, or poor connection to the Bisq network

In these cases the maker and taker can check their respective transaction IDs.

- If the maker or taker ID failed then the respective user will not have lost any miner or trade fees.
- If the maker transition ID was successful on the blockchain then the maker will not have lost any trade or miner fees IF the deposit transaction shows as N/A
- If the maker transition ID was successful on the blockchain then the maker will have lost trade and mine fees IF the deposit transaction shows as being present but is invalid when checked on the blockchain.
- If the taker transition ID was successful on the blockchain then the taker will have lost trade and miner fees if the trade failed.

In instances like the above ideally the trade would end up in mediation and the mediator will request your logs to understand what the issue was that caused the trade to fail and make recommendations for what, if anything, you need to do to avoid future instances of failed trades.

<span class="wiki-legacy-anchor" id="What_failed_trades_are_eligible_for_reimbursement?" aria-hidden="true">
</span>

## What failed trades are eligible for reimbursement? {#what-failed-trades-are-eligible-for-reimbursement}

Any user that has lost trade and miner fees is eligible for reimbursement.

Trades are also only eligible for reimbursement if submitted within 3 months from the date of the trade.

<span class="wiki-legacy-anchor" id="When_to_consider_reimbursement?" aria-hidden="true">
</span>

## When to consider reimbursement? {#when-to-consider-reimbursement}

It is important to remember no trade or deposit funds are lost with failed trades. Most of the time if you see your Bisq wallet is missing funds from a failed trade it means your wallet it out-of-sync, which is why the trade failed! Do an [SPV resync](../resyncing-spv-file/) to fix the issue and your wallet will show the correct balance.

Reimbursement of a filed trade requires some work to do in gathering the information and posting it online, it also have some privacy implications as you are having to post maker, taker, and deposit transaction IDs. As a result of this it is often not making reimbursement requests for MOST failed trades as miner and trade fees are usually small (less than a few dollars, local currency equivalent, of value). Therefore, it is recommended traders ONLY request reimbursement for trades where they feel their trade fee and miner fee losses are significant enough to warrant the time to do so. Most of the time this will be for takers with lost trade fees where the trade that failed was a large amount of BTC. For example the maximum trade fee loss on a 1 BTC trade would be 0.0044 BTC. This would be worth requesting reimbursement for.

<span class="wiki-legacy-anchor" id="What_should_I_do_before_requesting_reimbursement_request_for_lost_miner_and_trade_fees?" aria-hidden="true">
</span>

## What should I do before requesting reimbursement request for lost miner and trade fees? {#what-should-i-do-before-requesting-reimbursement-request-for-lost-miner-and-trade-fees}

Before requesting reimbursement for a filed trade you should make sure you are eligible for reimbursement ie you have lost both trade fees and miner fees.

You should also be aware of what miner fees and reimbursement fees you have lost on the trade. This is important as it means traders are aware of what fees they are claiming before they make a reimbursement request and prevents any misunderstanding of users with failed trades assuming they have lost the trade or deposit amounts when that is not the case, and in most cases can be quickly solved with an [SPV Resync](../resyncing-spv-file/).

<span class="wiki-legacy-anchor" id="How_do_I_know_what_my_miner_fees_were?" aria-hidden="true">
</span>

#### How do I know what my miner fees were? {#how-do-i-know-what-my-miner-fees-were}

Please also make sure you know how much miner fees you lost for a trade. This can be checked on blockchain explorer.

<figure class="wiki-image-gap" id="source-image-1"><p><strong>Image not recovered: Miner fees.png</strong></p><figcaption>This shows where you can find your miner fees on a blockchain explorer such as mempool.space</figcaption><p>The original file is unavailable in this local recovery.</p></figure>

<span class="wiki-legacy-anchor" id="How_do_I_know_what_my_trader_fees_were?" aria-hidden="true">
</span>

#### How do I know what my trader fees were? {#how-do-i-know-what-my-trader-fees-were}

Please also make sure you know how much trade fees you lost for a trade. This will be a percentage of the trade amount and differs depending on whether you were the maker or taker or chose BTC or BSQ to pay the trade fees.

- BTC trade fees are 0.15% of the trade amount for the maker and 1.15% of the trade amount for the taker.
- BSQ trade fees are 0.075% of the trade amount for the maker and 0.575% of the trade amount for the taker.

You can check the latest trading fees [here](../trading-fees/).

You can verify your BTC fees on any blockchain explorer.

You can verify your BSQ fees on a BSQ explorer such as [https://bisq.markets/](https://bisq.markets/) or [https://bisq.mempool.emzy.de/](https://bisq.mempool.emzy.de/)

<span class="wiki-legacy-anchor" id="How_to_make_reimbursement_request_for_lost_miner_and_trade_fees_from_a_failed_trade?" aria-hidden="true">
</span>

## How to make reimbursement request for lost miner and trade fees from a failed trade? {#how-to-make-reimbursement-request-for-lost-miner-and-trade-fees-from-a-failed-trade}

You can make a reimbursement request for lost miner and trade fees from a failed trade by creating a new issue on the [Bisq GitHub Support repository](https://github.com/bisq-network/support/issues).

You will need a GitHub account, to maintain privacy feel free to create on just for the purpose of the reimbursement. There is a [template here](https://github.com/bisq-network/support/issues/new?assignees=&labels=&template=reimbursement-template.md&title=Fee+reimbursement+for+trade+XXXXX)\* that you should follow to create your reimbursement request.

- This link will only work when you are logged into a GitHub account.

Once your issue is posted a support agent might ask you some more questions if they need any extra info to what you have provided.

If your request is a valid one for reimbursement then the [Fee Reimbursement Agent](../fee-reimbursement-agent/) will add you to their list of reimbursement cases to payout. They usually process reimbursements every 4-8 weeks in batches so please be prepared to wait a little time before reimbursement. You can follow the process on the issue you created to see the status of your reimbursement.

</div>
