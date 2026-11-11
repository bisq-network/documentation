---
title: "BuyerVerifiesPreparedDelayedPayoutTx Exception error"
slug: "wiki/buyerverifiesprepareddelayedpayouttx-exception-error"
tableOfContents: false
---

<div class="wiki-recovered-article" lang="en">

Bisq trade protocol discontinued [the legacy Burningman role](../donation-address-owner/), and distributes the output of the [Delayed Payout Transaction (DPT)](../arbitration/) to all the [contributors who burnt BSQ](https://github.com/bisq-network/proposals/issues/390), each with his own share depending on the burnt amount.

Bisq obtains the up-to-date shares for each burningman via the [DAO](../introduction-to-the-dao/), and when a trade is started, both peers create the DPT that will be published in case arbitration is started, using as input the [trade deposit address](../deposit-transaction/) (containing the sum of the trade amount and both deposits), and the burningmen addresses as outputs. Since the DPT will be created with the same rules and the same receiver shares, as long as peers are in agreement with their DAO state, both will present to each other the same identical DPT.

If the above doesn\'t happen, an error like this will appear:

`An error occurred at task: BuyerVerifiesPreparedDelayedPayoutTx Exception message: TxIds of buyersPreparedDelayedPayoutTx and sellersPreparedDelayedPayoutTx must be the same.`

which is a clue about one, or rarely both, of the peers running with a wrong DAO state, this being usually shown under *DAO* > *Network Monitor* > *DAO state*, where your node should be \"*in consensus with the seed nodes*\" (doesn\'t matter if *some of your peers are not in consensus*). It is still a good idea to resync your DAO by going to *Settings* > *Preferences* and click on the button *Rebuild DAO state from resources* at the bottom so you make sure your DAO state is regenerated to a valid one.\
This will not work if the problem lies with your peer, because the resync will be needed on the other side, and your only option at this stage is to trade with a different peer.

</div>
