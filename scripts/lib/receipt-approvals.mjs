// Compare the approvals recorded in accepted-edit receipts with the pull
// request's actual reviews. Used only by the receipts job
// (scripts/check-receipt-approvals.mjs); the offline fidelity gate and npm test
// never call GitHub. See CONTRIBUTING.md ("Accepted editorial changes").
//
// A receipt item that this pull request adds or changes must name this pull
// request, and every login in its approvals must belong to someone who
//  - approved this pull request at its current head commit (an approval from
//    before the last push does not count, nor one followed by a change request
//    or a dismissal),
//  - is neither the pull request author nor the receipt author, and
//  - has push (write, maintain or admin) access to the repository.
// Distinct valid approvers must number at least required_approvals (the higher
// of the base and the pull request value, so a pull request cannot lower its own
// bar). Receipt items the pull request leaves unchanged were checked in their own
// pull request and are not checked again.
//
// Write access comes from GraphQL's PullRequestReview.authorCanPushToRepository.
// The REST collaborator-permission endpoint needs push access itself, so a fork
// pull request's read-only token cannot use it.

const githubLogin = /^[A-Za-z0-9](?:[A-Za-z0-9]|-(?=[A-Za-z0-9])){0,38}$/;
const short = (sha) => (typeof sha === "string" ? sha.slice(0, 12) : "an unknown commit");
const plural = (count, noun) => `${count} ${noun}${count === 1 ? "" : "s"}`;

/** Untrusted text on one log line, so it cannot start a workflow command. */
export const oneLine = (value) => String(value).replace(/[\r\n\u0085\u2028\u2029]+/g, " ");
/** A login for messages: as is when it is a plain GitHub login, JSON-quoted otherwise. */
const shown = (login) => (githubLogin.test(login) ? login : JSON.stringify(String(login)));

/** A GitHub Actions annotation with escaped properties and message. */
export function annotation(level, properties, message) {
  const data = (value) => String(value).replaceAll("%", "%25").replaceAll("\r", "%0D").replaceAll("\n", "%0A");
  const property = (value) => data(value).replaceAll(":", "%3A").replaceAll(",", "%2C");
  const list = Object.entries(properties).map(([key, value]) => `${key}=${property(value)}`).join(",");
  return `::${level}${list ? ` ${list}` : ""}::${data(message)}`;
}

export const reviewsQuery = `query($owner: String!, $name: String!, $number: Int!, $after: String) {
  repository(owner: $owner, name: $name) {
    pullRequest(number: $number) {
      author { login }
      headRefOid
      reviews(first: 100, after: $after) {
        pageInfo { hasNextPage endCursor }
        nodes { author { login } state submittedAt commit { oid } authorCanPushToRepository }
      }
    }
  }
}`;

/** A GraphQL client for api.github.com; fetch is injectable for tests. */
export function githubGraphql({ token, url = "https://api.github.com/graphql", fetch = globalThis.fetch }) {
  return async (query, variables) => {
    const response = await fetch(url, {
      method: "POST",
      headers: { authorization: `bearer ${token}`, "content-type": "application/json", "user-agent": "bisq-documentation-receipt-approvals" },
      body: JSON.stringify({ query, variables }),
    });
    if (!response.ok) throw new Error(`GitHub GraphQL request failed with HTTP ${response.status}`);
    const body = await response.json();
    if (body.errors?.length) throw new Error(`GitHub GraphQL error: ${body.errors.map((error) => oneLine(error.message)).join("; ")}`);
    return body.data;
  };
}

/** The pull request's author, head commit and all reviews, oldest first. */
export async function fetchPullRequest(graphql, { owner, name, number }) {
  const reviews = [];
  let after = null;
  let pullRequest;
  do {
    const data = await graphql(reviewsQuery, { owner, name, number, after });
    pullRequest = data?.repository?.pullRequest;
    if (!pullRequest) throw new Error(`pull request #${number} was not found`);
    reviews.push(...pullRequest.reviews.nodes);
    after = pullRequest.reviews.pageInfo.hasNextPage ? pullRequest.reviews.pageInfo.endCursor : null;
  } while (after);
  return { author: pullRequest.author?.login ?? "", headSha: pullRequest.headRefOid, reviews };
}

/** Receipt items (with their position) that are new or different from the base receipts file. */
export function changedReceiptItems(baseData, data) {
  const before = new Set((Array.isArray(baseData?.items) ? baseData.items : []).map((item) => JSON.stringify(item)));
  return (Array.isArray(data?.items) ? data.items : [])
    .map((item, index) => ({ item, index }))
    .filter(({ item }) => !before.has(JSON.stringify(item)));
}

/** Each reviewer's latest approval, change request or dismissed review; comments change nothing. */
export function latestReviews(reviews) {
  const decisive = reviews
    .filter((review) => review?.author?.login && ["APPROVED", "CHANGES_REQUESTED", "DISMISSED"].includes(review.state))
    .map((review, order) => ({ review, order }))
    .sort((a, b) => String(a.review.submittedAt).localeCompare(String(b.review.submittedAt)) || a.order - b.order);
  const latest = new Map();
  for (const { review } of decisive) latest.set(review.author.login.toLowerCase(), review);
  return latest;
}

/**
 * Check the receipt items this pull request adds or changes against its reviews.
 * pullRequest is { url, author, headSha }; reviews are reviewsQuery nodes.
 */
export function checkReceiptApprovals({ data, baseData, pullRequest, reviews }) {
  const required = Math.max(...[data?.required_approvals, baseData?.required_approvals].filter(Number.isSafeInteger), 1);
  const latest = latestReviews(reviews);
  const author = String(pullRequest.author).toLowerCase();
  const problems = [];
  const checked = [];
  for (const { item, index } of changedReceiptItems(baseData, data)) {
    const label = `receipt ${index + 1} (${oneLine(item?.slug ?? "no slug")})`;
    if (item?.pull_request !== pullRequest.url) {
      problems.push(`${label} names ${oneLine(item?.pull_request ?? "no pull request")}, but this pull request (${pullRequest.url}) adds or changes it. A receipt is recorded in the pull request that makes the edit, and an accepted receipt is not changed later.`);
      continue;
    }
    const valid = new Set();
    for (const approval of Array.isArray(item.approvals) ? item.approvals : []) {
      const login = String(approval?.login ?? "");
      const key = login.toLowerCase();
      const review = latest.get(key);
      const reason = !githubLogin.test(login) ? "is not a plain GitHub login"
        : key === author ? "is the pull request author, who cannot approve their own change"
        : key === String(item.author).toLowerCase() ? "is the receipt author, who cannot approve their own receipt"
        : !review ? "has not approved this pull request"
        : review.state !== "APPROVED" ? `has not approved this pull request (latest review: ${review.state.toLowerCase().replace("_", " ")})`
        : review.commit?.oid !== pullRequest.headSha ? `approved commit ${short(review.commit?.oid)}, not the head commit ${short(pullRequest.headSha)}; approve again after the last push`
        : review.authorCanPushToRepository !== true ? "has no write access to the repository"
        : "";
      if (reason) problems.push(`${label}: ${shown(login)} ${reason}`);
      else valid.add(key);
    }
    if (valid.size < required) problems.push(`${label}: ${plural(valid.size, "valid approval")}; required_approvals is ${required}`);
    checked.push({ label, slug: item.slug, approvers: [...valid] });
  }
  return { required, checked, problems };
}

/**
 * The receipts job's approval check for one workflow event. Returns
 * { status: "skipped" | "passed" | "failed", lines, summary }.
 * repository is "owner/name"; data and baseData are the pull request's and the
 * base's migration/accepted-edits.json.
 */
export async function runApprovalCheck({ event, repository, data, baseData, graphql }) {
  const pr = event?.pull_request;
  if (!pr) {
    return { status: "skipped", lines: [annotation("notice", { title: "Receipt approvals" }, "Not a pull request event; recorded approvals are compared with reviews on pull requests only.")], summary: ["Not a pull request event; approvals were not checked."] };
  }
  const [owner, name] = repository.split("/");
  const url = `https://github.com/${repository}/pull/${pr.number}`;
  const items = changedReceiptItems(baseData, data);
  let fetched;
  try {
    fetched = await fetchPullRequest(graphql, { owner, name, number: pr.number });
  } catch (error) {
    if (!items.length) {
      return { status: "passed", lines: [annotation("warning", { title: "Receipt approvals" }, `No receipt item to check, but the reviews could not be read: ${error.message}`)], summary: ["No receipt item added or changed; reviews could not be read."] };
    }
    return { status: "failed", lines: [`Could not read the pull request's reviews: ${oneLine(error.message)}`], summary: ["Reviews could not be read, so the recorded approvals were not checked."] };
  }
  const head = pr.head?.sha;
  const approvedAtHead = [...latestReviews(fetched.reviews).values()].filter((review) => review.state === "APPROVED" && review.commit?.oid === fetched.headSha);
  const context = `Read ${plural(fetched.reviews.length, "review")}; ${plural(approvedAtHead.length, "reviewer")} approved head ${short(fetched.headSha)} (${approvedAtHead.filter((review) => review.authorCanPushToRepository === true).length} with write access).`;
  if (!items.length) return { status: "passed", lines: ["No receipt item is added or changed in this pull request.", context], summary: ["No receipt item added or changed; nothing to compare."] };
  if (fetched.headSha !== head) {
    return { status: "failed", lines: [`The pull request head is now ${short(fetched.headSha)}, but this run checked ${short(head)}; the run for the new head decides.`], summary: ["The pull request changed during this run."] };
  }
  const result = checkReceiptApprovals({ data, baseData, pullRequest: { url, author: fetched.author, headSha: fetched.headSha }, reviews: fetched.reviews });
  const lines = [context, ...result.checked.filter(({ label }) => !result.problems.some((problem) => problem.startsWith(`${label}:`)))
    .map(({ label, approvers }) => `${label}: approved at the head commit by ${approvers.join(", ")}`)];
  const summary = [`${plural(result.checked.length, "receipt item")} compared with the reviews at head \`${short(fetched.headSha)}\` (${result.required} distinct approvals required).`];
  if (result.problems.length) {
    lines.push(`Recorded approvals do not match the pull request's reviews (${plural(result.problems.length, "problem")}):`, ...result.problems.map((problem) => `- ${problem}`));
    summary.push("", `**${plural(result.problems.length, "problem")}**; see the job log.`);
    return { status: "failed", lines, summary };
  }
  return { status: "passed", lines, summary };
}
