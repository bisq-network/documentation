// Shortcuts shown on several pages (home page, search before typing, page not found). One list each,
// so the pages stay the same. Each task names what the reader wants to do and the article it opens.
import { collectGuides } from "../../scripts/lib/documentation.mjs";

/** Queries offered before the reader types. */
export const tryQueries = ["Last resort restore", "Zelle", "verify signature", "mediator"];

const tasks = (rows, group) => {
  const guides = collectGuides();
  return rows.map(([label, slug]) => {
    const guide = guides.find((item) => item.slug === slug);
    if (!guide) throw new Error(`${group} task "${label}" points at a missing article: ${slug}`);
    return { label, guide };
  });
};

/** Something is wrong right now. */
export const urgentTasks = () => tasks([
  ["Contact the mediator for a trade", "finding-your-mediator"],
  ["Recover data when Bisq won’t start", "last-resort-restore"],
  ["A deposit transaction is stuck", "deposit-transaction-pending-in-mempool-and-cpfp"],
  ["Restore funds from seed words", "restoring-your-wallet-from-seed"],
  ["Fix connection problems", "troubleshooting-network-issues"],
], "Urgent");

/** Set up and trade. */
export const setupTasks = () => tasks([
  ["Install Bisq and verify the download", "downloading-and-installing"],
  ["Start trading with Bisq Easy", "bisq-easy"],
  ["Choose and set up a payment method", "payment-methods"],
  ["Back up your wallet seed", "backing-up-your-wallet-seed"],
], "Setup");
