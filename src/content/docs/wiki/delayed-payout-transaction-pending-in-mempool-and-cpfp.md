---
title: "Delayed payout transaction pending in mempool and CPFP"
slug: "wiki/delayed-payout-transaction-pending-in-mempool-and-cpfp"
description: "Historical recovered Bisq Wiki article; source revision 3494"
tableOfContents: false
---

<aside class="wiki-recovery-status" role="note"><p><strong>Recovered historical wiki article.</strong> This source text has not been verified as current product guidance. Missing templates and images are marked in place. <a href="../../">Reviewed guides</a> are available separately.</p></aside>

<details class="wiki-source-provenance"><summary>Source, revision and attribution</summary><p>Source revision <a href="https://bisq.wiki/index.php?oldid=3494">3494</a>, dated 2023-12-26T21:35:28Z. Snapshot last successful ingest: 2026-10-18. Exported revision contributor: SuddenWhipVapor; full author history and licensing remain unresolved.</p><p><a href="../../wiki-source/delayed-payout-transaction-pending-in-mempool-and-cpfp.wiki.txt" download>Download exact snapshot wikitext</a> · <a href="../../wiki-source/delayed-payout-transaction-pending-in-mempool-and-cpfp.json">Source metadata</a></p><p>SHA-256: <code>caaceeb90a9a4e47faad0365a7ced9ec568454bb0fca73bb14c6489fdc6ae987</code>. Ingest-added product classification comments are not original author metadata.</p></details>



<div class="wiki-recovered-article" lang="en"><p>When mempool fees spike suddenly, the <a href="../deposit-transaction-pending-in-mempool-and-cpfp/">deposit transaction</a> is not the only one that can be held back because of a low fee rate.<br>&#10;<a href="../arbitration/">Arbitration</a> could be prevented from starting for the same reason, if the trade was started during a lower fee period, and consequently the delayed payout transaction was built at a lower fee rate than the going mempool rate.</p>&#10;<p>Since the new trade protocol was rolled out, the sum of trade amount and both security deposits will be paid to all burningmen, based on their receiver shares, so, when a DPT is held back in mempool due to a low fee, the responsive trader can speed up its confirmation by finding a burningman on <a href="../matrix-bisq-chat/">matrix</a>, and asking him to CPFP his own share. If a Bisq contributor is available to facilitate the process, the trader will pay back the CPFP costs through an on-chain transaction, or via lightning, or any of the payment methods that are supported by Bisq.</p>&#10;</div>


