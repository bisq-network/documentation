---
title: "Templates as macros"
slug: "wiki/templates-as-macros"
tableOfContents: false
---

<div class="wiki-recovered-article" lang="en">

MediaWiki, the software platform that powers the Bisq Wiki, includes a built-in feature that allows the content of a template page to be displayed inline on any other page using a markup command. This can be very useful, for example, when mentioning a maximum trade amount that might change over time on multiple pages. You won\'t have to worry about those pages becoming outdated if the amount changes.

To create a template page, you can do so like any other wiki page, but you need to add the prefix \"Template:\" at the beginning. It\'s recommended that template pages used as macros have a more simplified name for ease of recall. The newly created template page should only contain the content that will be displayed inline when referenced.

To display the content of a template page inline, use the following command: \"<code class="wiki-source-code" id="source-code-1">{{name_of_template}}</code>\". For instance, to display the content of the template page \"<code class="wiki-source-code" id="source-code-2">Template:MaxTradeSizeUnsigned</code>\", you would use \"<code class="wiki-source-code" id="source-code-3">{{MaxTradeSizeUnsigned}}</code>\".

List of current Templates being used as macros, for reference and quick access:

| Page | Description | Current value |
| --- | --- | --- |
| <span class="wiki-link-gap">Template:MinTradeSizeToBeSigned <small>[unrecovered article: Template:MinTradeSizeToBeSigned]</small></span> | Displays the min trade amount for an account to be signed | <span class="wiki-template-gap" role="note"><strong>[Unresolved template: MinTradeSizeToBeSigned]</strong> <code>{{MinTradeSizeToBeSigned}}</code></span> |
| <span class="wiki-link-gap">Template:MaxTradeSizeUnsigned <small>[unrecovered article: Template:MaxTradeSizeUnsigned]</small></span> | Displays the max trade amount for an unsigned buyer. | <span class="wiki-template-gap" role="note"><strong>[Unresolved template: MaxTradeSizeUnsigned]</strong> <code>{{MaxTradeSizeUnsigned}}</code></span> |
| <span class="wiki-link-gap">Template:MaxTradeSizeBisq1 <small>[unrecovered article: Template:MaxTradeSizeBisq1]</small></span> | Displays the max trade size for Bisq 1 trade (keeping separate for more flexibility with Bisq 2 protocols) | <span class="wiki-template-gap" role="note"><strong>[Unresolved template: MaxTradeSizeBisq1]</strong> <code>{{MaxTradeSizeBisq1}}</code></span> |
| <span class="wiki-link-gap">Template:MaxTradeSizeAltcoin <small>[unrecovered article: Template:MaxTradeSizeAltcoin]</small></span> | Displays the max trade size for altcoin trades in Bisq 1 | <span class="wiki-template-gap" role="note"><strong>[Unresolved template: MaxTradeSizeAltcoin]</strong> <code>{{MaxTradeSizeAltcoin}}</code></span> |
| <span class="wiki-link-gap">Template:MaxBisqEasyTrade <small>[unrecovered article: Template:MaxBisqEasyTrade]</small></span> | Displays the max trade amount for a Bisq Easy trade | \| <span class="wiki-template-gap" role="note"><strong>[Unresolved template: MaxBisqEasyTrade]</strong> <code>{{MaxBisqEasyTrade}}</code></span> |

<details class="wiki-table-source"><summary>Original table source</summary><pre><code>{| class="wikitable"&#10;|-&#10;! Page !! Description !! Current value&#10;|-&#10;| [[Template:MinTradeSizeToBeSigned]] || Displays the min trade amount for an account to be signed || {{MinTradeSizeToBeSigned}}&#10;|-&#10;| [[Template:MaxTradeSizeUnsigned]] || Displays the max trade amount for an unsigned buyer. || {{MaxTradeSizeUnsigned}}&#10;|-&#10;| [[Template:MaxTradeSizeBisq1]] || Displays the max trade size for Bisq 1 trade (keeping separate for more flexibility with Bisq 2 protocols) || {{MaxTradeSizeBisq1}}&#10;|-&#10;| [[Template:MaxTradeSizeAltcoin]] || Displays the max trade size for altcoin trades in Bisq 1 || {{MaxTradeSizeAltcoin}}&#10;|-&#10;| [[Template:MaxBisqEasyTrade]] || Displays the max trade amount for a Bisq Easy trade&#10; || {{MaxBisqEasyTrade}}&#10;|}</code></pre></details>

</div>
