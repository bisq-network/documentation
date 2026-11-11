---
title: "Wiki style guidelines"
slug: "wiki/wiki-style-guidelines"
tableOfContents: false
---

<nav data-pagefind-ignore class="wiki-source-toc" aria-label="Article sections"><details><summary>On this page</summary><ul><li><a href="#structure-of-the-wiki">Structure of the wiki</a></li><li><a href="#conventions">Conventions</a></li><li><a href="#add-a-table-of-contents-wherever-possible">Add a table of contents wherever possible</a></li><li><a href="#avoid-repetition">Avoid repetition</a></li><li><a href="#avoid-using-abbreviations-in-page-titles">Avoid using abbreviations in page titles</a></li><li><a href="#prefer-wiki-headings-over-plain-bold-text">Prefer wiki headings over plain bold text</a></li><li><a href="#use-code-blocks-for-ui-elements">Use code blocks for UI elements</a></li><li><a href="#make-software-screenshots-aesthetically-consistent">Make software screenshots aesthetically consistent</a></li><li><a href="#use-consistent-markup-for-images">Use consistent markup for images</a></li><li><a href="#use-admonition-blocks-for-stand-out-warnings-and-notes">Use admonition blocks for stand-out warnings and notes</a></li><li><a href="#use-gerunds-for-page-titles">Use gerunds for page titles</a></li><li><a href="#avoid-commercial-links">Avoid commercial links</a></li></ul></details></nav>

<div class="wiki-recovered-article" lang="en">

Generally the Bisq wiki follows the [Wikipedia Manual of Style](https://en.wikipedia.org/wiki/Wikipedia:Manual_of_Style) and conventions from other established wikis like the [Bitcoin Wiki](https://en.bitcoin.it/wiki/Main_Page).

See exceptions and additions below.

<span class="wiki-legacy-anchor" id="Structure_of_the_wiki" aria-hidden="true">
</span>

## Structure of the wiki {#structure-of-the-wiki}

There are three general categories that can be applied to almost every article:

- Concepts
- Procedures/Use Cases
- References

Please keep articles in one of these distinct categories. For example, there\'s the *concept* of a [data directory](../data-directory/) and a *use-case* of [switching to a new data directory](../switching-to-a-new-data-directory/). Each item should have its own article.

<span class="wiki-legacy-anchor" id="Conventions" aria-hidden="true">
</span>

## Conventions {#conventions}

<span class="wiki-legacy-anchor" id="Add_a_table_of_contents_wherever_possible" aria-hidden="true">
</span>

### Add a table of contents wherever possible {#add-a-table-of-contents-wherever-possible}

In case an article doesn\'t automatically include a table of contents, please add one after the introductory text with <code class="wiki-source-code" id="source-code-1">\_\_TOC\_\_</code>.

<span class="wiki-legacy-anchor" id="Avoid_repetition" aria-hidden="true">
</span>

### Avoid repetition {#avoid-repetition}

The wiki is a huge, growing repository of knowledge that will require much time to maintain. Please avoid replicating content in more than one place—it makes keeping the wiki up-to-date harder.

If you do find the need to repeat something, use a [transclusion](https://www.mediawiki.org/wiki/Transclusion).

Practically, this is how it works:

- Create a new page titled <code class="wiki-source-code" id="source-code-2">Template:Content_to_be_replicated</code>.
- Include <code class="wiki-source-code" id="source-code-3">{{Content_to_be_replicated}}</code> anywhere you need it.

<span class="wiki-legacy-anchor" id="Avoid_using_abbreviations_in_page_titles" aria-hidden="true">
</span>

### Avoid using abbreviations in page titles {#avoid-using-abbreviations-in-page-titles}

Prefer \"Deposit transaction\" over \"Deposit tx\".

<span class="wiki-legacy-anchor" id="Prefer_wiki_headings_over_plain_bold_text" aria-hidden="true">
</span>

### Prefer wiki headings over plain bold text {#prefer-wiki-headings-over-plain-bold-text}

Wiki headings appear in the table of contents, but other text doesn\'t, so it\'s better to use headings for big ideas. Furthermore, wiki headings have their own anchor links, making it possible to link directly to particular sections of a page.

<span class="wiki-legacy-anchor" id="Use_code_blocks_for_UI_elements" aria-hidden="true">
</span>

### Use code blocks for UI elements {#use-code-blocks-for-ui-elements}

Denote user interface (UI) elements like tabs and buttons with literal markup (e.g., Click <code class="wiki-source-code" id="source-code-4">Start</code>). Markup for this styling is <code class="wiki-source-code" id="source-code-5">\<code>\</code></code>.

<span class="wiki-legacy-anchor" id="Make_software_screenshots_aesthetically_consistent" aria-hidden="true">
</span>

### Make software screenshots aesthetically consistent {#make-software-screenshots-aesthetically-consistent}

For full screenshots of Bisq, please try to make sure:

- Bisq is at the original window size
- Bisq is in light mode
- Don\'t include your operating system\'s window border

These conventions will help screenshots appear more aesthetically consistent across the wiki.

<span class="wiki-legacy-anchor" id="Use_consistent_markup_for_images" aria-hidden="true">
</span>

### Use consistent markup for images {#use-consistent-markup-for-images}

Please try to use the following conventions where appropriate:

- Use <code class="wiki-source-code" id="source-code-6">thumb</code> format
- Align left
- Make 600px wide
- Add a concise caption

<p>Example:</p>&#10;<code class="wiki-source-code" id="source-code-7">[[File:Find-wallet-seed-words.png|thumb|left|600px|Location of wallet seed words and date.]]</code>

It would be extra nice (but not required) to use the following conventions for **marking** images:

- Use <span class="wiki-link-gap">this arrow <small>[unrecovered article: images/9/99/Arrow-screenshot.png]</small></span>
- Make any markup 6px wide in the <code class="wiki-source-code" id="source-code-8">#ff0000</code> color

<span class="wiki-legacy-anchor" id="Use_admonition_blocks_for_stand-out_warnings_and_notes" aria-hidden="true">
</span>

### Use admonition blocks for stand-out warnings and notes {#use-admonition-blocks-for-stand-out-warnings-and-notes}

Use <code class="wiki-source-code" id="source-code-9">Template:Admonition_Warn</code> for warnings and <code class="wiki-source-code" id="source-code-10">Template:Admonition_Note</code> for notes. Both templates take arguments.

So this markup:

<code><code class="wiki-source-code" id="source-code-11">{{Admonition_Warn|Avoid this! It might cause an explosion.}}</code></code>

Results in this output:

<aside class="wiki-admonition" role="note">

**Warning**

Avoid this! It might cause an explosion.

</aside>

<span class="wiki-legacy-anchor" id="Use_gerunds_for_page_titles" aria-hidden="true">
</span>

### Use gerunds for page titles {#use-gerunds-for-page-titles}

Use gerunds for page titles (e.g., \"Switch**ing** data directories\" instead of \"Switch data directory\" and \"Updat**ing** trade fees\" instead of \"Update trade fees\").

<span class="wiki-legacy-anchor" id="Avoid_commercial_links" aria-hidden="true">
</span>

### Avoid commercial links {#avoid-commercial-links}

Links to promote other businesses or products should be avoided. Exceptions may be made on a case-by-case basis upon discussion with other contributors.

</div>
