import test from "node:test";
import assert from "node:assert/strict";
import { annotation } from "./lib/actions-output.mjs";
import { changedReceiptItems, checkReceiptApprovals, fetchPullRequest, githubGraphql, latestReviews, receiptItems, runApprovalCheck } from "./lib/receipt-approvals.mjs";

// Recorded GitHub responses in the shape of reviewsQuery; no network access.
const repository = "bisq-network/documentation";
const url = `https://github.com/${repository}/pull/200`;
const head = "a".repeat(40);
const older = "b".repeat(40);
const pullRequest = { url, author: "contributor-a", headSha: head };

let clock = 0;
function review(login, state = "APPROVED", { commit = head, canPush = true } = {}) {
  clock += 1;
  return { author: { login }, state, submittedAt: new Date(Date.UTC(2026, 10, 10, 10, 0, clock)).toISOString(), commit: { oid: commit }, authorCanPushToRepository: canPush };
}

function item(fields = {}) {
  return {
    slug: "trading-monero",
    pull_request: url,
    author: "contributor-a",
    approvals: [{ login: "maintainer-a", role: "maintainer" }, { login: "reviewer-b", role: "support agent" }],
    ...fields,
  };
}

const reviewers = [{ login: "maintainer-a", role: "maintainer" }, { login: "reviewer-b", role: "support agent" }];
const receipts = (items, required = 2) => ({ schema_version: 2, required_approvals: required, reviewers, items });
const base = receipts([]);
const check = (items, reviews, options = {}) => checkReceiptApprovals({ data: receipts(items, options.required), baseData: options.baseData ?? base, pullRequest: options.pullRequest ?? pullRequest, reviews });

test("approvals by two writers at the head commit pass", () => {
  const result = check([item()], [review("maintainer-a"), review("reviewer-b")]);
  assert.deepEqual(result.problems, []);
  assert.deepEqual(result.checked.map(({ slug, approvers }) => [slug, approvers]), [["trading-monero", ["maintainer-a", "reviewer-b"]]]);
  // Login case does not matter, and a later comment keeps the approval.
  const mixed = check([item({ approvals: [{ login: "Maintainer-A", role: "maintainer" }, { login: "reviewer-b", role: "support" }] })], [review("maintainer-a"), review("reviewer-b"), review("reviewer-b", "COMMENTED")]);
  assert.deepEqual(mixed.problems, []);
});

test("an approval from before the last push does not count", () => {
  const result = check([item()], [review("maintainer-a"), review("reviewer-b", "APPROVED", { commit: older })]);
  assert.deepEqual(result.problems, [
    `receipt 1 (trading-monero): reviewer-b approved commit ${older.slice(0, 12)}, not the head commit ${head.slice(0, 12)}; approve again after the last push`,
    "receipt 1 (trading-monero): 1 valid approval; required_approvals is 2",
  ]);
  assert.deepEqual(check([item()], [review("maintainer-a"), review("reviewer-b", "APPROVED", { commit: older }), review("reviewer-b")]).problems, []);
});

test("the pull request author cannot approve their own change", () => {
  const self = item({ author: "receipt-writer", approvals: [{ login: "contributor-a", role: "author" }, { login: "maintainer-a", role: "maintainer" }] });
  const result = check([self], [review("contributor-a"), review("maintainer-a")]);
  assert.match(result.problems.join("\n"), /contributor-a is the pull request author, who cannot approve their own change/);
  assert.match(result.problems.join("\n"), /1 valid approval; required_approvals is 2/);
});

test("the receipt author cannot approve their own receipt", () => {
  const own = item({ author: "receipt-writer", approvals: [{ login: "receipt-writer", role: "maintainer" }, { login: "maintainer-a", role: "maintainer" }] });
  const result = check([own], [review("receipt-writer"), review("maintainer-a")]);
  assert.match(result.problems.join("\n"), /receipt-writer is the receipt author, who cannot approve their own receipt/);
});

test("a recorded approver without an approving review fails", () => {
  const result = check([item()], [review("maintainer-a")]);
  assert.match(result.problems.join("\n"), /reviewer-b has not approved this pull request$/m);
  const changed = check([item()], [review("maintainer-a"), review("reviewer-b"), review("reviewer-b", "CHANGES_REQUESTED")]);
  assert.match(changed.problems.join("\n"), /reviewer-b has not approved this pull request \(latest review: changes requested\)/);
  const dismissed = check([item()], [review("maintainer-a"), review("reviewer-b", "DISMISSED")]);
  assert.match(dismissed.problems.join("\n"), /reviewer-b has not approved this pull request \(latest review: dismissed\)/);
  const typed = check([item({ approvals: [{ login: "@maintainer-a", role: "maintainer" }, { login: "reviewer-b", role: "support" }] })], [review("maintainer-a"), review("reviewer-b")]);
  assert.match(typed.problems.join("\n"), /"@maintainer-a" is not a plain GitHub login/);
});

test("only reviewers listed in the base's settings count", () => {
  const outsider = item({ approvals: [{ login: "maintainer-a", role: "maintainer" }, { login: "outsider", role: "admin" }] });
  assert.deepEqual(check([outsider], [review("maintainer-a"), review("outsider")]).problems, [
    "receipt 1 (trading-monero): outsider is not one of the reviewers in the base's migration/accepted-edits.json",
    "receipt 1 (trading-monero): 1 valid approval; required_approvals is 2",
  ]);
  // A pull request cannot add its own reviewer: the base's list decides.
  const added = { ...receipts([outsider]), reviewers: [...reviewers, { login: "outsider", role: "admin" }] };
  assert.match(checkReceiptApprovals({ data: added, baseData: base, pullRequest, reviews: [review("maintainer-a"), review("outsider")] }).problems.join("\n"), /outsider is not one of the reviewers/);
  // A base without a reviewer list accepts no approval.
  const listless = { schema_version: 1, required_approvals: 2, items: [] };
  assert.match(check([item()], [review("maintainer-a"), review("reviewer-b")], { baseData: listless }).problems.join("\n"), /maintainer-a is not one of the reviewers/);
});

test("receipt files become items labelled by their path", () => {
  const files = [
    { path: "migration/accepted-edits/trading-monero.pr-200.json", text: JSON.stringify(item()) },
    { path: "migration/accepted-edits/broken.pr-1.json", text: "{" },
  ];
  const data = receiptItems({ settings: { schema_version: 2, required_approvals: 1, reviewers }, files });
  assert.equal(data.items[0].path, files[0].path);
  assert.deepEqual(data.items[1], { path: files[1].path });
  const result = checkReceiptApprovals({ data, baseData: base, pullRequest, reviews: [review("maintainer-a"), review("reviewer-b")] });
  assert.match(result.problems.join("\n"), /^migration\/accepted-edits\/broken\.pr-1\.json names no pull request/m);
  assert.deepEqual(result.checked.map(({ label, approvers }) => [label, approvers]), [[files[0].path, ["maintainer-a", "reviewer-b"]]]);
});

test("an approver without write access does not count", () => {
  const result = check([item()], [review("maintainer-a"), review("reviewer-b", "APPROVED", { canPush: false })]);
  assert.deepEqual(result.problems, [
    "receipt 1 (trading-monero): reviewer-b has no write access to the repository",
    "receipt 1 (trading-monero): 1 valid approval; required_approvals is 2",
  ]);
});

test("too few distinct valid approvals fail, and a pull request cannot lower the requirement", () => {
  const one = item({ approvals: [{ login: "maintainer-a", role: "maintainer" }] });
  assert.deepEqual(check([one], [review("maintainer-a")]).problems, ["receipt 1 (trading-monero): 1 valid approval; required_approvals is 2"]);
  assert.deepEqual(check([one], [review("maintainer-a")], { required: 1, baseData: receipts([], 1) }).problems, []);
  const lowered = check([one], [review("maintainer-a")], { required: 1, baseData: receipts([], 2) });
  assert.equal(lowered.required, 2);
  assert.deepEqual(lowered.problems, ["receipt 1 (trading-monero): 1 valid approval; required_approvals is 2"]);
  const twice = item({ approvals: [{ login: "maintainer-a", role: "maintainer" }, { login: "MAINTAINER-A", role: "maintainer" }] });
  assert.match(check([twice], [review("maintainer-a")]).problems.join("\n"), /1 valid approval; required_approvals is 2/);
});

test("only receipt items this pull request adds or changes are checked, and they must name it", () => {
  const merged = item({ pull_request: `https://github.com/${repository}/pull/150`, slug: "reputation" });
  assert.deepEqual(changedReceiptItems(receipts([merged]), receipts([merged, item()])).map(({ index }) => index), [1]);
  // An unchanged receipt from an earlier pull request is not checked again.
  assert.deepEqual(check([merged, item()], [review("maintainer-a"), review("reviewer-b")], { baseData: receipts([merged]) }).problems, []);
  // Adding or editing a receipt that names another pull request fails.
  const edited = { ...merged, summary: "changed later" };
  assert.match(check([edited], [], { baseData: receipts([merged]) }).problems.join("\n"), /receipt 1 \(reputation\) names https:\/\/github\.com\/bisq-network\/documentation\/pull\/150, but this pull request .* adds or changes it/);
  const legacy = item({ pull_request: "https://github.com/hiciefte/bisq-docs/pull/200" });
  assert.match(check([legacy], [review("maintainer-a"), review("reviewer-b")]).problems.join("\n"), /names https:\/\/github\.com\/hiciefte\/bisq-docs\/pull\/200/);
});

test("the latest approval, change request or dismissal decides, in submission order", () => {
  const reviews = [review("x", "APPROVED"), review("x", "COMMENTED"), review("y", "APPROVED"), review("y", "CHANGES_REQUESTED"), review("z", "PENDING")];
  const latest = latestReviews([...reviews].reverse());
  assert.deepEqual([...latest].map(([login, { state }]) => [login, state]), [["x", "APPROVED"], ["y", "CHANGES_REQUESTED"]]);
});

function fakeGraphql(pages) {
  const calls = [];
  const graphql = async (query, variables) => {
    calls.push(variables);
    const page = pages[calls.length - 1];
    if (page instanceof Error) throw page;
    return page;
  };
  return { graphql, calls };
}
const page = (nodes, { next = null, author = "contributor-a", headRefOid = head } = {}) => ({
  repository: { pullRequest: { author: { login: author }, headRefOid, reviews: { pageInfo: { hasNextPage: Boolean(next), endCursor: next }, nodes } } },
});

test("all review pages are read", async () => {
  const { graphql, calls } = fakeGraphql([page([review("maintainer-a")], { next: "cursor-1" }), page([review("reviewer-b")])]);
  const fetched = await fetchPullRequest(graphql, { owner: "bisq-network", name: "documentation", number: 200 });
  assert.deepEqual(fetched.reviews.map((node) => node.author.login), ["maintainer-a", "reviewer-b"]);
  assert.deepEqual(calls.map((variables) => variables.after), [null, "cursor-1"]);
  assert.equal(fetched.author, "contributor-a");
  assert.equal(fetched.headSha, head);
  await assert.rejects(fetchPullRequest(fakeGraphql([{ repository: { pullRequest: null } }]).graphql, { owner: "a", name: "b", number: 1 }), /pull request #1 was not found/);
});

test("the GraphQL client sends the token and reports HTTP and GraphQL errors", async () => {
  const requests = [];
  const respond = (status, body) => async (target, options) => {
    requests.push({ target, options });
    return { ok: status === 200, status, json: async () => body };
  };
  const ok = githubGraphql({ token: "test-token", fetch: respond(200, { data: { value: 1 } }) });
  assert.deepEqual(await ok("query", { a: 1 }), { value: 1 });
  assert.equal(requests[0].target, "https://api.github.com/graphql");
  assert.equal(requests[0].options.headers.authorization, "bearer test-token");
  assert.deepEqual(JSON.parse(requests[0].options.body), { query: "query", variables: { a: 1 } });
  await assert.rejects(githubGraphql({ token: "t", fetch: respond(403, {}) })("q", {}), /HTTP 403/);
  await assert.rejects(githubGraphql({ token: "t", fetch: respond(200, { errors: [{ message: "Resource not accessible\nby integration" }] }) })("q", {}), /GraphQL error: Resource not accessible by integration/);
});

test("the receipts job compares approvals only on pull request events", async () => {
  const event = { pull_request: { number: 200, head: { sha: head } } };
  const data = receipts([item()]);
  const run = (pages, fields = {}) => runApprovalCheck({ event, repository, data, baseData: base, graphql: fakeGraphql(pages).graphql, ...fields });

  assert.equal((await runApprovalCheck({ event: {}, repository, data, baseData: null, graphql: fakeGraphql([]).graphql })).status, "skipped");
  const passed = await run([page([review("maintainer-a"), review("reviewer-b")])]);
  assert.equal(passed.status, "passed", passed.lines.join("\n"));
  assert.match(passed.lines.join("\n"), /receipt 1 \(trading-monero\): approved at the head commit by maintainer-a, reviewer-b/);
  const failed = await run([page([review("maintainer-a")])]);
  assert.equal(failed.status, "failed");
  assert.match(failed.lines.join("\n"), /reviewer-b has not approved this pull request/);
  // The run that checked an older head does not decide.
  assert.equal((await run([page([review("maintainer-a"), review("reviewer-b")], { headRefOid: older })])).status, "failed");
  // Reviews that cannot be read fail the check when there is something to compare.
  assert.equal((await run([new Error("HTTP 502")])).status, "failed");
  const nothing = await run([new Error("HTTP 502")], { data: base });
  assert.equal(nothing.status, "passed");
  assert.match(nothing.lines[0], /^::warning title=Receipt approvals::No receipt item to check, but the reviews could not be read: HTTP 502/);
  const quiet = await run([page([review("someone")])], { data: base });
  assert.deepEqual(quiet.lines, ["No receipt item is added or changed in this pull request.", `Read 1 review; 1 reviewer approved head ${head.slice(0, 12)} (1 with write access).`]);
});

test("annotations escape their properties and message", () => {
  assert.equal(annotation("warning", { file: "a,b:c.md", title: "T" }, "50%\nnext"), "::warning file=a%2Cb%3Ac.md,title=T::50%25%0Anext");
});
