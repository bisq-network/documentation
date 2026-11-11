---
title: "Translation"
slug: "wiki/translation"
tableOfContents: false
---

<nav data-pagefind-ignore class="wiki-source-toc" aria-label="Article sections"><details open><summary>On this page</summary><ul><li><a href="#how-to-contribute">How to contribute</a></li><li><a href="#objectives">Objectives</a></li><li><a href="#keep-core-languages-for-bisq-desktop-up-to-date">Keep core languages for bisq-desktop up-to-date</a></li><li><a href="#guidelines">Guidelines</a></li><li><a href="#compensation">Compensation</a></li></ul></details></nav>

<div class="wiki-recovered-article" lang="en"><p>Bisq can be used all over the world, so it needs to be <strong>translated</strong> into various languages.</p>
<p>Feel free to contribute voluntary translations for any language, but only translations for languages in current target markets will be compensated. Such languages currently include the following:</p>
<ul>
<li>French (fr)</li>
<li>Chinese (zh_CN, zh_TW) (on hold until mobile app is available)</li>
<li>German (de)</li>
<li>Italian (it)</li>
<li>Japanese (jp)</li>
<li>Portuguese (pt)</li>
<li>Russian (ru)</li>
<li>Spanish (es)</li>
</ul>
<span class="wiki-legacy-anchor" id="How_to_contribute" aria-hidden="true"></span><h2 id="how-to-contribute"> How to contribute </h2>
<p>Bisq uses <a href="https://explore.transifex.com/bisq/" rel="noopener noreferrer">Transifex</a> to translate the three projects it currently has:</p>
<ul>
<li>bisq-desktop</li>
<li>bisq-website</li>
<li>bisq-subtitles</li>
</ul>
<p>Tasks are coordinated on the <a href="../matrix-bisq-chat/">bisq.chat</a> <a href="https://matrix.to/#/#bisq.growth:bitcoin.kyoto" rel="noopener noreferrer">#Growth</a> channel.</p>
<p>To contribute, please register on Transifex and request to be included as translator for a language. Transifex will send corresponding notifications to <a href="https://docs.transifex.com/teams/understanding-user-roles" rel="noopener noreferrer">managers and coordinators</a>, but it's better to also introduce yourself and what you'd like to do on Matrix.</p>
<span class="wiki-legacy-anchor" id="Objectives" aria-hidden="true"></span><h2 id="objectives"> Objectives </h2>
<span class="wiki-legacy-anchor" id="Keep_core_languages_for_bisq-desktop_up-to-date" aria-hidden="true"></span><h3 id="keep-core-languages-for-bisq-desktop-up-to-date"> Keep core languages for bisq-desktop up-to-date </h3>
<p>There's no budget to update all core languages in every DAO cycle. Languages will be updated one-by-one, starting with the markets which offer more trading volume for Bisq.</p>
<span class="wiki-legacy-anchor" id="Guidelines" aria-hidden="true"></span><h2 id="guidelines"> Guidelines </h2>
<ul>
<li>Strings labeled as <code class="wiki-source-code" id="source-code-1">no_translate</code> are strings referring to unused altcoins and region specific strings that should be left untranslated or translated using the original English version. If left translated with the original source, don't submit them for compensation.</li>
</ul>
<ul>
<li>There's no budget for reviews: translated strings will be uploaded and used in the next version release. If a string is confusing, ask for help or leave it for later.</li>
</ul>
<ul>
<li><strong>All translations work should be done on Transifex!</strong> Please don't open pull requests to modify non-English text. The Bisq software and website repositories include scripts to automatically integrate all changes on Transifex.</li>
</ul>
<ul>
<li>Propose any changes to English text on GitHub (<a href="https://github.com/bisq-network/bisq/blob/master/core/src/main/resources/i18n/displayStrings.properties" rel="noopener noreferrer">here</a> for Bisq software and <a href="https://github.com/bisq-network/bisq-website/blob/master/_data/en.yml" rel="noopener noreferrer">here</a> for the website).</li>
</ul>
<span class="wiki-legacy-anchor" id="Compensation" aria-hidden="true"></span><h2 id="compensation"> Compensation </h2>
<p>As with all Bisq contributions, contributors who want to be compensated for their work should make a <a href="https://docs.bisq.network/compensation.html" rel="noopener noreferrer">compensation request</a>.</p>
<p><strong>Only work designated as high-priority by the Transifex Admin will be compensated.</strong> Before you begin, make sure your work has been designated as high-priority by the Transifex Admin. Upon making a compensation request, the Transifex Admin will acknowledge your work to reaffirm your work's priority before voting begins.</p>
<ul>
<li>A rate of 0.07 USD/word translated to the cycle's BSQ equivalent will be used-</li>
</ul>
<ul>
<li>Compensation requests for translations are submitted with screenshots of the Transifex translation panel. The filters used to create a valid screenshot are: <code class="wiki-source-code" id="source-code-2">translator:&lt;your_username&gt; translated_after:&lt;date_since_last_request&gt;</code>. Be careful, as this query returns every string the specified user last edited, even if the edit is a tiny change from a review instead of a translation. There is no budget for reviews, but if you want to do a review anyway, make sure the original translator has already has been compensated, or that they know how many words they translated (and that they have the requisite proof for their compensation request).</li>
</ul>
<p>See <a href="https://github.com/bisq-network/compensation/issues/415" rel="noopener noreferrer">this compensation request</a> as an example.</p>
</div>
