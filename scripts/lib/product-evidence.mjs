import { readFileSync } from "node:fs";

const taxonomyByTitle = new Map(JSON.parse(readFileSync("migration/taxonomy.json", "utf8")).items.map((item) => [item.title, item]));
const products = [
  { label: "Bisq 1", pattern: /Bisq ?1\b/, topic: "bisq-1" },
  { label: "Bisq 2", pattern: /Bisq ?2\b|Bisq Easy|MuSig/, topic: "bisq-2" },
];

/**
 * Return product labels with their first explicit source: title, headings, then
 * migration taxonomy. Unverified product hints are deliberately excluded; an
 * empty result means no product was named, not that the article applies to all.
 * These labels do not certify the instructions' current applicability.
 */
export function productEvidence(article) {
  return products.flatMap(({ label, pattern, topic }) => {
    const basis = pattern.test(article.title) ? "Named in the article title"
      : article.headings.some((heading) => pattern.test(heading.text)) ? "Named in section headings"
      : taxonomyByTitle.get(article.title)?.topics.includes(topic) ? "Named in migration grouping"
      : undefined;
    return basis ? [{ label, basis }] : [];
  });
}
