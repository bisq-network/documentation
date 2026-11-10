# Review original wording before proposing edits

The documentation baseline preserves the wording of the 209 recovered wiki articles. Wording and cleanup proposals belong in a **separate GitHub pull request marked ready for review**, for human review before merging. The earlier AI-edited guides are preserved here as comparison material; they are not accepted replacements for the originals.

This directory does not authorize a merge, publication, deployment, transaction, recovery operation or message to another person. Ready-for-review status allows CodeRabbit (CRAI) to review the PR; its feedback supplements human review. Potential human reviewers include sudden, pazza83 and mwithm; listing them does not claim that they have reviewed, approved or accepted responsibility for any change.

The [proposal review index](PROPOSAL-INDEX.md) links the small PRs and records retained, rejected and unresolved changes from the complete comparison.

## Comparison material

| Material | Location | How to use it |
| --- | --- | --- |
| Exact recovered original text | `public/wiki-source/<slug>.wiki.txt` | Read the complete source, including warnings, commands, templates and surrounding context. |
| Source revision and attribution | `public/wiki-source/<slug>.json` and `migration/articles.json` | Identify the page, revision, date and original hash. A revision date does not establish current accuracy. |
| Restored article rendering | `src/content/docs/wiki/<slug>.md` | Compare with raw text. Inspect the corresponding built page when assessing displayed wording, code, tables, images or anchors. |
| Previous AI edits | `review/ai-edited/guides/` | Read every relevant target, including sections reached by a consolidation or cross-link. These files are immutable review evidence. |
| Previous integration decisions | `review/ai-edited/migration/` | Find intended mappings, deduplication claims and image dispositions. Those claims are leads to verify, not proof of preservation. |
| Snapshot checksums | `review/ai-edited/snapshot.json` | Verify the preserved comparison bytes. Snapshot commit: `f0cd22c54d1e4b6b39c8380004b79356e6c3f3a3`; content commit: `19615901275aa94f8fa840d724b676249b661462`. |
| Source-to-edit comparison index | `review/comparison-index.json` | Use the generated 209-record index for complete coverage, following its actual field names and checksums. |
| Separate source checks | `migration/source-review-notes.json` | Treat each note as an added, dated check with its own evidence and limits, separate from original author wording. |

The snapshot contains **98 prior guide files**. Several originals were merged into one guide, and some originals had several destinations. Reading only the first target or only one original per merged guide is insufficient.

## Review a PR in bounded article batches

1. Record the baseline and proposed PR commit hashes. Identify every original article and prior guide affected by the proposed change. For a proposal covering the complete prior rewrite, account for **all 209 originals and all 98 prior guides**; do not present a smaller reviewed sample as full coverage.
2. Read each affected original wikitext and restored rendering in full, then all mapped prior/proposed sections. Check paragraphs, warnings, lists, tables, code, captions and links together. A short summary or a retained filename list does not establish that a procedure survived.
3. Separate formatting and navigation changes from semantic changes. Record omissions, additions, changed prerequisites, changed outcomes, reordered steps and changes in the apparent authority or scope of a statement.
4. Independently verify proposed factual corrections. Use official application source or official provider documentation, pin the release/commit and exact lines, and state the date checked. The original wiki is not assumed current, and the AI edit, a passing build, an evidence ledger or a source-check note is not independent confirmation.
5. Leave findings and suggested wording as review proposals for people. Do not silently repair an original during review or rewrite the immutable snapshot. Record unresolved claims as unresolved rather than filling missing templates or provider details from inference.

For a full comparison, start with recovery, payouts, dispute roles, payment instructions and limits, then continue through every remaining record. Parallel review can split bounded, non-overlapping article batches; one person must reconcile shared targets and the final coverage ledger. Neither delegation nor a prior acceptance report substitutes for the actual comparisons.

## High-risk comparisons

- **Last resort restore is a known fidelity concern.** Compare the complete `last-resort-restore.wiki.txt` with `review/ai-edited/guides/bisq-1/restoring-data.md#last-resort-reconstruction`. Check the fresh-directory test, shutdown sequence, most-recent/same-day file selection, full file list, overwrite/copy directions, the three matching identity directories, rollback and SPV-resync directions individually. Determine what was omitted or changed. Separately assess whether the original workaround itself is safe for the pinned version. Do not assume that added “preserve the original” advice proves the edited procedure retained all steps, or that preserving original wording endorses executing it.
- **Manual payout and mediation:** distinguish sharing signatures from sharing private keys; confirm the exact unspent output amount, two-signature requirement, addresses, fee and broadcast consequences. A mediator's proposal is not custody or an enforceable payout. A delayed payout is not an ordinary payment to the traders.
- **Backups and seeds:** distinguish wallet funds, BTC/BSQ scope, application databases, account salt, signing keys, onion identity and open-trade state. Check shutdown, encryption, password, restoration-date and no-active-trade conditions. Selective file reconstruction is not equivalent to a complete consistent backup.
- **Product and role boundaries:** distinguish Bisq 1 from Bisq Easy, desktop from a remote/mobile node, seller reputation from escrow, moderator from mediator/refund agent, and implementation code from publicly available product features. Verify named contacts and exact public URLs against the cited evidence; an encoded identity or dated report does not prove live availability or assignment.
- **Amounts and payment instructions:** check direction, units, currency conversion, minimum versus maximum, protocol versus provider versus account limits, effective dates, fee responsibility and contradictory payment-reference advice. Do not convert a screenshot, risk factor, example or proposal into a current allowance or guaranteed outcome.
- **Images and code:** compare each source occurrence, caption and surrounding instruction. Record whether a missing image was unresolved, deliberately omitted, duplicated or moved. Historical screenshots must not silently become current UI proof. Check literal placeholders, ASCII quotes, line breaks, commands, tables, gallery-only images, anchors and language-specific content in the actual rendering.

## Page-by-page review record

Keep a ledger in PR attachments/comments or a separate report location. Each original needs its own record, even when several share a target:

```json
{
  "source_slug": "last-resort-restore",
  "source_revision": "3195",
  "original_sha256": "<verified original hash>",
  "restored_path": "src/content/docs/wiki/last-resort-restore.md",
  "compared_targets": ["review/ai-edited/guides/bisq-1/restoring-data.md#last-resort-reconstruction"],
  "baseline_commit": "<full hash>",
  "proposal_commit": "<full hash or null>",
  "raw_read": true,
  "restored_rendering_read": true,
  "all_targets_read": true,
  "status": "reviewed-with-findings",
  "finding_ids": ["RECOVERY-001"],
  "unresolved_checks": ["<specific remaining question>"],
  "reviewer": "<actual reviewer>"
}
```

Use explicit states such as `not-reviewed`, `blocked`, `reviewed-no-material-finding` and `reviewed-with-findings`. A missing target, unavailable official source or unavailable current build must not be counted as a completed comparison. Report coverage counts and outstanding rows without converting unknowns into passes.

For each finding provide:

- A severity and concrete consequence, separated from uncertainty.
- Exact original and proposed/AI quotations, file paths, line numbers and section anchors. Include the relevant surrounding condition rather than an isolated phrase.
- The semantic change: lost step, narrowed/broadened scope, changed number/unit, altered role, invented fact, missing evidence, misleading caption/link, or formatting-only change.
- Any current factual check, with the official URL, immutable revision and exact supporting lines; describe conflicts or limits.
- A suggested correction or question for humans, separately labelled. Do not claim a maintainer approved it.

Check the source-check notes themselves using the same standard. `verified-against-pinned-source` means the narrow note was checked against the cited historical release, **not** that the entire article or procedure is current, safe, product-tested or support-approved. `needs-maintainer-review` is a pending issue. All current notes retain their original **7 November 2026** check date; they are not a fresh check of whatever release exists later.

## Read-only integrity check

From the repository root, this standard-library check verifies the 209 raw-source hashes and preserved snapshot bytes without changing repository files:

```sh
python3 - <<'PY'
import hashlib
import json
from pathlib import Path

articles = json.loads(Path("migration/articles.json").read_text())["items"]
assert len(articles) == 209
assert len({article["slug"] for article in articles}) == 209
for article in articles:
    raw = Path("public/wiki-source") / (article["slug"] + ".wiki.txt")
    assert hashlib.sha256(raw.read_bytes()).hexdigest() == article["wikitext_sha256"], raw
snapshot = json.loads(Path("review/ai-edited/snapshot.json").read_text())
for relative, expected in snapshot["files"].items():
    saved = Path("review/ai-edited") / relative
    assert hashlib.sha256(saved.read_bytes()).hexdigest() == expected, saved
assert sum(path.startswith("guides/") for path in snapshot["files"]) == 98
print("Raw-source and snapshot integrity verified; semantic review remains separate.")
PY
```

Checksum agreement proves byte identity only. It does not establish faithful rendering, preservation of meaning or present-day correctness. Human review of a PR is a separate step from publishing the original-wording baseline.
