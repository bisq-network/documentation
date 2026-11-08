import { readFileSync } from "node:fs";

const taxonomyByTitle = new Map(JSON.parse(readFileSync("migration/taxonomy.json", "utf8")).items.map((item) => [item.title, item]));
const products = [
  { label: "Bisq 1", pattern: /Bisq ?1\b/, topic: "bisq-1" },
  { label: "Bisq 2", pattern: /Bisq ?2\b|Bisq Easy|MuSig/, topic: "bisq-2" },
];

// These labels describe explicit source evidence, not a review of applicability.
export function productEvidence(article) {
  return products.flatMap(({ label, pattern, topic }) => {
    const basis = pattern.test(article.title) ? "Named in the article title"
      : article.headings.some((heading) => pattern.test(heading.text)) ? "Named in section headings"
      : taxonomyByTitle.get(article.title)?.topics.includes(topic) ? "Named in migration grouping"
      : undefined;
    return basis ? [{ label, basis }] : [];
  });
}
