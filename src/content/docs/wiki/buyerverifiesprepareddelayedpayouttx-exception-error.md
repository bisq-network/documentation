---
title: "BuyerVerifiesPreparedDelayedPayoutTx Exception error"
slug: "wiki/buyerverifiesprepareddelayedpayouttx-exception-error"
tableOfContents: false
---

<div class="wiki-recovered-article" lang="en"><p>Bisq trade protocol discontinued <a href="../donation-address-owner/">the legacy Burningman role</a>, and distributes the output of the <a href="../arbitration/">Delayed Payout Transaction (DPT)</a> to all the <a href="https://github.com/bisq-network/proposals/issues/390" rel="noopener noreferrer">contributors who burnt BSQ</a>, each with his own share depending on the burnt amount.</p>
<p>Bisq obtains the up-to-date shares for each burningman via the <a href="../introduction-to-the-dao/">DAO</a>, and when a trade is started, both peers create the DPT that will be published in case arbitration is started, using as input the <a href="../deposit-transaction/">trade deposit address</a> (containing the sum of the trade amount and both deposits), and the burningmen addresses as outputs. Since the DPT will be created with the same rules and the same receiver shares, as long as peers are in agreement with their DAO state, both will present to each other the same identical DPT.</p>
<p>If the above doesn't happen, an error like this will appear:</p>
<p><code>An error occurred at task: BuyerVerifiesPreparedDelayedPayoutTx Exception message: TxIds of buyersPreparedDelayedPayoutTx and sellersPreparedDelayedPayoutTx must be the same.</code></p>
<p>which is a clue about one, or rarely both, of the peers running with a wrong DAO state, this being usually shown under <em>DAO</em> &gt; <em>Network Monitor</em> &gt; <em>DAO state</em>, where your node should be "<em>in consensus with the seed nodes</em>" (doesn't matter if <em>some of your peers are not in consensus</em>). It is still a good idea to resync your DAO by going to <em>Settings</em> &gt; <em>Preferences</em> and click on the button <em>Rebuild DAO state from resources</em> at the bottom so you make sure your DAO state is regenerated to a valid one.<br>
This will not work if the problem lies with your peer, because the resync will be needed on the other side, and your only option at this stage is to trade with a different peer.</p>
</div>
