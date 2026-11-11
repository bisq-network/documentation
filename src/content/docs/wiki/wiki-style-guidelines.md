---
title: "Wiki style guidelines"
slug: "wiki/wiki-style-guidelines"
tableOfContents: false
---

<nav data-pagefind-ignore class="wiki-source-toc" aria-label="Article sections"><details><summary>On this page</summary><ul><li><a href="#structure-of-the-wiki">Structure of the wiki</a></li><li><a href="#conventions">Conventions</a></li><li><a href="#add-a-table-of-contents-wherever-possible">Add a table of contents wherever possible</a></li><li><a href="#avoid-repetition">Avoid repetition</a></li><li><a href="#avoid-using-abbreviations-in-page-titles">Avoid using abbreviations in page titles</a></li><li><a href="#prefer-wiki-headings-over-plain-bold-text">Prefer wiki headings over plain bold text</a></li><li><a href="#use-code-blocks-for-ui-elements">Use code blocks for UI elements</a></li><li><a href="#make-software-screenshots-aesthetically-consistent">Make software screenshots aesthetically consistent</a></li><li><a href="#use-consistent-markup-for-images">Use consistent markup for images</a></li><li><a href="#use-admonition-blocks-for-stand-out-warnings-and-notes">Use admonition blocks for stand-out warnings and notes</a></li><li><a href="#use-gerunds-for-page-titles">Use gerunds for page titles</a></li><li><a href="#avoid-commercial-links">Avoid commercial links</a></li></ul></details></nav>

<div class="wiki-recovered-article" lang="en"><p>Generally the Bisq wiki follows the <a href="https://en.wikipedia.org/wiki/Wikipedia:Manual_of_Style" rel="noopener noreferrer">Wikipedia Manual of Style</a> and conventions from other established wikis like the <a href="https://en.bitcoin.it/wiki/Main_Page" rel="noopener noreferrer">Bitcoin Wiki</a>.</p>
<p>See exceptions and additions below.</p>
<span class="wiki-legacy-anchor" id="Structure_of_the_wiki" aria-hidden="true"></span><h2 id="structure-of-the-wiki"> Structure of the wiki </h2>
<p>There are three general categories that can be applied to almost every article:</p>
<ul>
<li>Concepts</li>
<li>Procedures/Use Cases</li>
<li>References</li>
</ul>
<p>Please keep articles in one of these distinct categories. For example, there's the <em>concept</em> of a <a href="../data-directory/">data directory</a> and a <em>use-case</em> of <a href="../switching-to-a-new-data-directory/">switching to a new data directory</a>. Each item should have its own article.</p>
<span class="wiki-legacy-anchor" id="Conventions" aria-hidden="true"></span><h2 id="conventions"> Conventions </h2>
<span class="wiki-legacy-anchor" id="Add_a_table_of_contents_wherever_possible" aria-hidden="true"></span><h3 id="add-a-table-of-contents-wherever-possible"> Add a table of contents wherever possible </h3>
<p>In case an article doesn't automatically include a table of contents, please add one after the introductory text with <code class="wiki-source-code" id="source-code-1">__TOC__</code>.</p>
<span class="wiki-legacy-anchor" id="Avoid_repetition" aria-hidden="true"></span><h3 id="avoid-repetition"> Avoid repetition </h3>
<p>The wiki is a huge, growing repository of knowledge that will require much time to maintain. Please avoid replicating content in more than one place—it makes keeping the wiki up-to-date harder.</p>
<p>If you do find the need to repeat something, use a <a href="https://www.mediawiki.org/wiki/Transclusion" rel="noopener noreferrer">transclusion</a>.</p>
<p>Practically, this is how it works:</p>
<ul>
<li>Create a new page titled <code class="wiki-source-code" id="source-code-2">Template:Content_to_be_replicated</code>.</li>
<li>Include <code class="wiki-source-code" id="source-code-3">{{Content_to_be_replicated}}</code> anywhere you need it.</li>
</ul>
<span class="wiki-legacy-anchor" id="Avoid_using_abbreviations_in_page_titles" aria-hidden="true"></span><h3 id="avoid-using-abbreviations-in-page-titles"> Avoid using abbreviations in page titles </h3>
<p>Prefer "Deposit transaction" over "Deposit tx".</p>
<span class="wiki-legacy-anchor" id="Prefer_wiki_headings_over_plain_bold_text" aria-hidden="true"></span><h3 id="prefer-wiki-headings-over-plain-bold-text"> Prefer wiki headings over plain bold text </h3>
<p>Wiki headings appear in the table of contents, but other text doesn't, so it's better to use headings for big ideas. Furthermore, wiki headings have their own anchor links, making it possible to link directly to particular sections of a page.</p>
<span class="wiki-legacy-anchor" id="Use_code_blocks_for_UI_elements" aria-hidden="true"></span><h3 id="use-code-blocks-for-ui-elements"> Use code blocks for UI elements </h3>
<p>Denote user interface (UI) elements like tabs and buttons with literal markup (e.g., Click <code class="wiki-source-code" id="source-code-4">Start</code>). Markup for this styling is <code class="wiki-source-code" id="source-code-5">&lt;code&gt;&lt;/code&gt;</code>.</p>
<span class="wiki-legacy-anchor" id="Make_software_screenshots_aesthetically_consistent" aria-hidden="true"></span><h3 id="make-software-screenshots-aesthetically-consistent"> Make software screenshots aesthetically consistent </h3>
<p>For full screenshots of Bisq, please try to make sure:</p>
<ul>
<li>Bisq is at the original window size</li>
<li>Bisq is in light mode</li>
<li>Don't include your operating system's window border</li>
</ul>
<p>These conventions will help screenshots appear more aesthetically consistent across the wiki.</p>
<span class="wiki-legacy-anchor" id="Use_consistent_markup_for_images" aria-hidden="true"></span><h3 id="use-consistent-markup-for-images"> Use consistent markup for images </h3>
<p>Please try to use the following conventions where appropriate:</p>
<ul>
<li>Use <code class="wiki-source-code" id="source-code-6">thumb</code> format</li>
<li>Align left</li>
<li>Make 600px wide</li>
<li>Add a concise caption</li>
</ul>
<p>Example:</p>
<code class="wiki-source-code" id="source-code-7">[[File:Find-wallet-seed-words.png|thumb|left|600px|Location of wallet seed words and date.]]</code>
<p>It would be extra nice (but not required) to use the following conventions for <strong>marking</strong> images:</p>
<ul>
<li>Use <span class="wiki-link-gap">this arrow <small>[unrecovered article: images/9/99/Arrow-screenshot.png]</small></span></li>
<li>Make any markup 6px wide in the <code class="wiki-source-code" id="source-code-8">#ff0000</code> color</li>
</ul>
<span class="wiki-legacy-anchor" id="Use_admonition_blocks_for_stand-out_warnings_and_notes" aria-hidden="true"></span><h3 id="use-admonition-blocks-for-stand-out-warnings-and-notes"> Use admonition blocks for stand-out warnings and notes </h3>
<p>Use <code class="wiki-source-code" id="source-code-9">Template:Admonition_Warn</code> for warnings and <code class="wiki-source-code" id="source-code-10">Template:Admonition_Note</code> for notes. Both templates take arguments.</p>
<p>So this markup:</p>
<p><code><code class="wiki-source-code" id="source-code-11">{{Admonition_Warn|Avoid this! It might cause an explosion.}}</code></code></p>
<p>Results in this output:</p>
<aside class="wiki-admonition" role="note"><p><strong>Warning</strong></p><p>Avoid this! It might cause an explosion.</p>
</aside>
<span class="wiki-legacy-anchor" id="Use_gerunds_for_page_titles" aria-hidden="true"></span><h3 id="use-gerunds-for-page-titles"> Use gerunds for page titles </h3>
<p>Use gerunds for page titles (e.g., "Switch<strong>ing</strong> data directories" instead of "Switch data directory" and "Updat<strong>ing</strong> trade fees" instead of "Update trade fees").</p>
<span class="wiki-legacy-anchor" id="Avoid_commercial_links" aria-hidden="true"></span><h3 id="avoid-commercial-links"> Avoid commercial links </h3>
<p>Links to promote other businesses or products should be avoided. Exceptions may be made on a case-by-case basis upon discussion with other contributors.</p>
</div>
