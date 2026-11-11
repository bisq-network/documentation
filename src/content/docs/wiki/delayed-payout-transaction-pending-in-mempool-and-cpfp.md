---
title: "Delayed payout transaction pending in mempool and CPFP"
slug: "wiki/delayed-payout-transaction-pending-in-mempool-and-cpfp"
tableOfContents: false
---

<div class="wiki-recovered-article" lang="en">

When mempool fees spike suddenly, the [deposit transaction](../deposit-transaction-pending-in-mempool-and-cpfp/) is not the only one that can be held back because of a low fee rate.\
[Arbitration](../arbitration/) could be prevented from starting for the same reason, if the trade was started during a lower fee period, and consequently the delayed payout transaction was built at a lower fee rate than the going mempool rate.

Since the new trade protocol was rolled out, the sum of trade amount and both security deposits will be paid to all burningmen, based on their receiver shares, so, when a DPT is held back in mempool due to a low fee, the responsive trader can speed up its confirmation by finding a burningman on [matrix](../matrix-bisq-chat/), and asking him to CPFP his own share. If a Bisq contributor is available to facilitate the process, the trader will pay back the CPFP costs through an on-chain transaction, or via lightning, or any of the payment methods that are supported by Bisq.

</div>
