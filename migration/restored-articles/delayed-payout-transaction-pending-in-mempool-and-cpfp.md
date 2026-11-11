---
title: "Delayed payout transaction pending in mempool and CPFP"
slug: "wiki/delayed-payout-transaction-pending-in-mempool-and-cpfp"
tableOfContents: false
---

<div class="wiki-recovered-article" lang="en"><p>When mempool fees spike suddenly, the <a href="../deposit-transaction-pending-in-mempool-and-cpfp/">deposit transaction</a> is not the only one that can be held back because of a low fee rate.<br>&#10;<a href="../arbitration/">Arbitration</a> could be prevented from starting for the same reason, if the trade was started during a lower fee period, and consequently the delayed payout transaction was built at a lower fee rate than the going mempool rate.</p>&#10;<p>Since the new trade protocol was rolled out, the sum of trade amount and both security deposits will be paid to all burningmen, based on their receiver shares, so, when a DPT is held back in mempool due to a low fee, the responsive trader can speed up its confirmation by finding a burningman on <a href="../matrix-bisq-chat/">matrix</a>, and asking him to CPFP his own share. If a Bisq contributor is available to facilitate the process, the trader will pay back the CPFP costs through an on-chain transaction, or via lightning, or any of the payment methods that are supported by Bisq.</p>&#10;</div>
