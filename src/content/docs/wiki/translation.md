---
title: "Translation"
slug: "wiki/translation"
tableOfContents: false
---

<nav data-pagefind-ignore class="wiki-source-toc" aria-label="Article sections"><details open><summary>On this page</summary><ul><li><a href="#how-to-contribute">How to contribute</a></li><li><a href="#objectives">Objectives</a></li><li><a href="#keep-core-languages-for-bisq-desktop-up-to-date">Keep core languages for bisq-desktop up-to-date</a></li><li><a href="#guidelines">Guidelines</a></li><li><a href="#compensation">Compensation</a></li></ul></details></nav>

<div class="wiki-recovered-article" lang="en">

Bisq can be used all over the world, so it needs to be **translated** into various languages.

Feel free to contribute voluntary translations for any language, but only translations for languages in current target markets will be compensated. Such languages currently include the following:

- French (fr)
- Chinese (zh_CN, zh_TW) (on hold until mobile app is available)
- German (de)
- Italian (it)
- Japanese (jp)
- Portuguese (pt)
- Russian (ru)
- Spanish (es)

<span class="wiki-legacy-anchor" id="How_to_contribute" aria-hidden="true">
</span>

## How to contribute {#how-to-contribute}

Bisq uses [Transifex](https://explore.transifex.com/bisq/) to translate the three projects it currently has:

- bisq-desktop
- bisq-website
- bisq-subtitles

Tasks are coordinated on the [bisq.chat](../matrix-bisq-chat/) [#Growth](https://matrix.to/#/#bisq.growth:bitcoin.kyoto) channel.

To contribute, please register on Transifex and request to be included as translator for a language. Transifex will send corresponding notifications to [managers and coordinators](https://docs.transifex.com/teams/understanding-user-roles), but it\'s better to also introduce yourself and what you\'d like to do on Matrix.

<span class="wiki-legacy-anchor" id="Objectives" aria-hidden="true">
</span>

## Objectives {#objectives}

<span class="wiki-legacy-anchor" id="Keep_core_languages_for_bisq-desktop_up-to-date" aria-hidden="true">
</span>

### Keep core languages for bisq-desktop up-to-date {#keep-core-languages-for-bisq-desktop-up-to-date}

There\'s no budget to update all core languages in every DAO cycle. Languages will be updated one-by-one, starting with the markets which offer more trading volume for Bisq.

<span class="wiki-legacy-anchor" id="Guidelines" aria-hidden="true">
</span>

## Guidelines {#guidelines}

- Strings labeled as <code class="wiki-source-code" id="source-code-1">no_translate</code> are strings referring to unused altcoins and region specific strings that should be left untranslated or translated using the original English version. If left translated with the original source, don\'t submit them for compensation.

* There\'s no budget for reviews: translated strings will be uploaded and used in the next version release. If a string is confusing, ask for help or leave it for later.

- **All translations work should be done on Transifex!** Please don\'t open pull requests to modify non-English text. The Bisq software and website repositories include scripts to automatically integrate all changes on Transifex.

* Propose any changes to English text on GitHub ([here](https://github.com/bisq-network/bisq/blob/master/core/src/main/resources/i18n/displayStrings.properties) for Bisq software and [here](https://github.com/bisq-network/bisq-website/blob/master/_data/en.yml) for the website).

<span class="wiki-legacy-anchor" id="Compensation" aria-hidden="true">
</span>

## Compensation {#compensation}

As with all Bisq contributions, contributors who want to be compensated for their work should make a [compensation request](https://docs.bisq.network/compensation.html).

**Only work designated as high-priority by the Transifex Admin will be compensated.** Before you begin, make sure your work has been designated as high-priority by the Transifex Admin. Upon making a compensation request, the Transifex Admin will acknowledge your work to reaffirm your work\'s priority before voting begins.

- A rate of 0.07 USD/word translated to the cycle\'s BSQ equivalent will be used-

* Compensation requests for translations are submitted with screenshots of the Transifex translation panel. The filters used to create a valid screenshot are: <code class="wiki-source-code" id="source-code-2">translator:\<your_username> translated_after:\<date_since_last_request></code>. Be careful, as this query returns every string the specified user last edited, even if the edit is a tiny change from a review instead of a translation. There is no budget for reviews, but if you want to do a review anyway, make sure the original translator has already has been compensated, or that they know how many words they translated (and that they have the requisite proof for their compensation request).

See [this compensation request](https://github.com/bisq-network/compensation/issues/415) as an example.

</div>
