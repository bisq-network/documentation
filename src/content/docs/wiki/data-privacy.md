---
title: "Data Privacy"
slug: "wiki/data-privacy"
tableOfContents: false
---

<div class="wiki-recovered-article" lang="en">

As Bisq is a peer to peer trading system, there is no central server for storing account information. Only the two people involved in a P2P trade know the details of that trade. If mediation or arbitration is opened, the mediator or arbitrator are provided with the trade details too.

The trade parameters are stored on those participants\' computers. That is much better than having the data stored in centralized servers, but still is not ideal. Bisq users may trade with lots of people over time and those details can accumulate. If their computer were lost stolen or seized, unwelcome individuals might gain access to that information, which in the case of more popular trading methods would be account names and numbers.

To mitigate that risk, Bisq has introduced a [feature](https://github.com/bisq-network/bisq/pull/6001) to clear account related information from closed trades after a certain grace period has passed. As always, you are in charge of your own Bisq instance and so this grace period can be configured to best suit your preference. It is configured by the field \"Clear sensitive data after (days)\" in the Settings screen. Once a trade has finished, it is unlikely that you ever need to see your trading peer\'s payment account information, as it was only required to make and/or verify that payment. So a good rule of thumb would probably be the default setting of 60 days, or lower. After a closed trade has passed the grace period, Bisq clears maker/taker payment account payloads from the trade, as well as trader chats. The same applies to any Mediation/Arbitration dispute linked to the trade. (Note that the grace period is measured from the trade date, so for example if you did a trade on 1st January, and it completed on the 5th of January the account information would be cleared on the 1st March based on the default setting of 60 days.)

That\'s all there is to it, a privacy preserving effort we can all take part in to keep Bisq useful and safe for all, especially for your past trade peers whose details you might have the liability to protect.

</div>
