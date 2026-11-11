---
title: "Updating BSQ trading fees"
slug: "wiki/updating-bsq-trading-fees"
tableOfContents: false
---

<nav data-pagefind-ignore class="wiki-source-toc" aria-label="Article sections"><details open><summary>On this page</summary><ul><li><a href="#determine-new-bsq-fees">Determine new BSQ fees</a></li><li><a href="#submit-dao-parameter-proposals">Submit DAO parameter proposals</a></li><li><a href="#communicate-changes">Communicate changes</a></li><li><a href="#reference">Reference</a></li></ul></details></nav>

<div class="wiki-recovered-article" lang="en">

**Updating BSQ fees** takes place every cycle to keep the BSQ [trading fees](../trading-fees/) at a 50% discount to BTC trading fees.

The [Compensation Maintainer](../compensation-maintainer/) takes the following steps to update BSQ trading fees.

<span class="wiki-legacy-anchor" id="Determine_new_BSQ_fees" aria-hidden="true">
</span>

## Determine new BSQ fees {#determine-new-bsq-fees}

Three days before the end of proposal phase, the [Compensation Maintainer](../compensation-maintainer/) shall:

- Calculate BSQ trading fee discount [on this spreadsheet](https://cryptpad.fr/sheet/#/2/sheet/view/khBDMTPxN9GkLPNYaLtyWFDmdXTnDygFeYZ--qngS1o/) using the 30-day weighted average USD/BSQ price and live USD/BTC price at the time.
  - If existing BSQ discount is under 40% or over 60%, calculate new BSQ trading fees to restore a 50% discount.
  - Update spreadsheet with new proposed fees. If there is no need for an update, leave the \"New Fees\" section blank.

<span class="wiki-legacy-anchor" id="Submit_DAO_parameter_proposals" aria-hidden="true">
</span>

## Submit DAO parameter proposals {#submit-dao-parameter-proposals}

Upon calculating the new BSQ fees, the [Compensation Maintainer](../compensation-maintainer/) shall:

- Create a new post on [github proposals](https://github.com/bisq-network/proposals/) with the title <code class="wiki-source-code" id="source-code-1">BSQ trading fee update for Cycle X</code> indicating the new proposed trading fees and close the old post (or indicate in a comment at the already opened post if there will be no changes).
- Submit DAO change parameter proposals for new BSQ trading fees and comment the corresponding TXIDs (if necessary).

<span class="wiki-legacy-anchor" id="Communicate_changes" aria-hidden="true">
</span>

## Communicate changes {#communicate-changes}

Once DAO results are available, the [Compensation Maintainer](../compensation-maintainer/) shall:

- Update the [trading fees](../trading-fees/) page with new BSQ trading fees.

<span class="wiki-legacy-anchor" id="Reference" aria-hidden="true">
</span>

## Reference {#reference}

Proposals [#173](https://github.com/bisq-network/proposals/issues/173) and [#365](https://github.com/bisq-network/proposals/issues/365) led to the development of this procedure.

</div>
