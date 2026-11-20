---
title: Source recovery and migration
description: How the Bisq wiki was recovered, and what its full backup confirmed.
---

The source snapshot completed on **18 October 2026 at 01:01:19 UTC**. Its newest article revision is dated **15 October 2026 at 15:23:28 UTC**. It contains one exported revision for each recovered article. Those 209 original articles and three separately dated historical additions are available in the [main documentation](../browse/).

## Checked against the full backup

The wiki's operator provided a full database backup taken on 19 October 2026, one day after the snapshot: 583 pages and 3,806 revisions. It was converted to an XML export and compared with this site on 20 November 2026.

- Every one of the 209 original articles, and two of the three historical additions, is identical to its latest revision in the backup. No article was edited after the restored revision.
- The backup has no page that this site lacks.
- Its 63 redirects all agree with the links this site serves, and its 18 templates are the revisions the site renders.
- The links that remain unresolved point to pages the wiki never had.
- Emergency Multisig payout tool is not in the backup. It was recovered from another source and stays as a historical article.

The backup also holds user accounts, so it is kept privately and is not part of this repository. Each article's Source and history section shows its result.

The original wikitext and available revision metadata are preserved for comparison, and automated source checks verify their preservation. Contributors keep the articles current through reviewed corrections. An earlier AI-edited edition and its comparison index are retained separately for review, not served as the main articles or indexed in site search.

## Images

All **123 inventoried image filenames** now have full-size historical files, used in **133 inline occurrences**. The initial recovery contained 97 full-size files and 23 partial files; the remaining three were missing. A checksum-verified [WikiTeam archive dated 14 October 2026](https://archive.org/details/wiki-bisq.wiki-20261014) supplied full-size files for those 26 entries. The same archive provided the directly linked `Arrow-screenshot.png`, outside the 123-file inventory. The [media catalogue](../recovered-media/) records the sources. These historical files are not proof of the bytes present on 18 October; reuse terms remain unresolved.

## Saved links

All exported wiki title paths are retained with their capitalization and underscores, and all 98 previous AI-edited guide paths have compatibility pages. Recognized original section links lead to their recovered sections. Edited guides that drew on several sources offer links to the relevant original articles, including without JavaScript.

The 14 October archive also supplies redirect records; verified chains that end at a recovered article are available as compatibility links. Some targets and sections remain unresolved, and an older redirect does not establish a later state. Two archived redirect records also contain substantive text; their raw sources are preserved for [Bitcointalk Moderator](../wiki-source/archive-redirects/202.wiki.txt) and [Running Bisq in China](../wiki-source/archive-redirects/120.wiki.txt), rather than discarding that text. The site serves the old wiki's own domain, bisq.wiki, so its links keep working.

## Templates and remaining source gaps

The 14 October archive contains definitions for all **14 templates** required by the recovered article placeholders. The site renders **71 template occurrences** from those dated definitions and links each to its archived source. The full backup holds the same revision of each of these templates. Template values such as trade limits are the wiki's; migration checks note where the current application differs. The source definition, rendering and original invocation remain available.

The archive inventory contains **3,804 available revisions** for its included pages; the full backup holds 3,806. Some links and one section reference remain unresolved; the backup confirms that they point to pages the wiki never had. Content and media reuse terms remain to be settled, and the backup's complete editor lists are not published yet.
