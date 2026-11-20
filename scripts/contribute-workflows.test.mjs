import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
// yaml comes with Astro and Starlight.
import { parse } from "yaml";

const workflow = (name) => parse(readFileSync(`.github/workflows/${name}`, "utf8"));
const steps = (file) => Object.values(file.jobs).flatMap((job) => job.steps ?? []);

test("actions are GitHub's own, pinned to a full commit with the version alongside", () => {
  for (const name of ["label-pr.yml", "pages.yml", "check.yml"]) {
    const text = readFileSync(`.github/workflows/${name}`, "utf8");
    const uses = [...text.matchAll(/^\s*(?:-\s+)?uses:\s*(\S+)(.*)$/gm)];
    assert.ok(uses.length, name);
    for (const [, action, rest] of uses) {
      assert.match(action, /^actions\/[\w-]+@[0-9a-f]{40}$/, `${name}: ${action}`);
      assert.match(rest, /^ # v\d+\.\d+\.\d+$/, `${name}: ${action} names its version`);
    }
  }
});

test("the label workflow runs no code from the pull request", () => {
  const file = workflow("label-pr.yml");
  assert.deepEqual(Object.keys(file.on), ["pull_request_target"]);
  assert.deepEqual(file.on.pull_request_target.types, ["opened", "reopened", "synchronize"]);
  assert.deepEqual(file.permissions, { contents: "read", "pull-requests": "write" });
  for (const job of Object.values(file.jobs)) assert.equal(job.permissions, undefined, "no job widens the permissions");
  for (const step of steps(file)) {
    assert.equal(step.run, undefined, "no shell step");
    assert.doesNotMatch(step.uses ?? "", /checkout/, "no checkout");
    assert.match(step.uses, /^actions\/github-script@/);
  }
});

/** Run the label workflow's script against a pull request with these files. */
async function labelsFor(files, present = []) {
  const script = steps(workflow("label-pr.yml"))[0].with.script;
  const added = [];
  const github = {
    paginate: async (_endpoint, options) => { assert.equal(options.pull_number, 7); return files; },
    rest: { pulls: { listFiles: {} }, issues: { addLabels: async ({ issue_number, labels }) => { assert.equal(issue_number, 7); added.push(...labels); } } },
  };
  const context = { repo: { owner: "bisq-network", repo: "documentation" }, payload: { pull_request: { number: 7, labels: present.map((name) => ({ name })) } } };
  const core = { info() {} };
  await new (Object.getPrototypeOf(async () => {}).constructor)("github", "context", "core", script)(github, context, core);
  return added;
}

test("a changed article is a wording proposal, an added one a new article", async () => {
  const wiki = (name) => `src/content/docs/wiki/${name}.md`;
  assert.deepEqual(await labelsFor([{ filename: wiki("wallet"), status: "modified" }]), ["wording-proposal"]);
  assert.deepEqual(await labelsFor([{ filename: wiki("stablecoins"), status: "added" }]), ["new-article"]);
  assert.deepEqual(await labelsFor([{ filename: wiki("wallet"), status: "modified" }, { filename: wiki("stablecoins"), status: "added" }]), ["wording-proposal", "new-article"]);
  assert.deepEqual(await labelsFor([{ filename: wiki("wallet-2"), previous_filename: wiki("wallet"), status: "renamed" }]), ["wording-proposal"]);
  assert.deepEqual(await labelsFor([{ filename: wiki("new"), previous_filename: "drafts/new.md", status: "renamed" }]), ["new-article"]);
  assert.deepEqual(await labelsFor([{ filename: wiki("wallet"), status: "removed" }]), []);
  assert.deepEqual(await labelsFor([{ filename: "migration/accepted-edits/wallet.pr-7.json", status: "added" }, { filename: "src/content/docs/review.md", status: "modified" }, { filename: "src/content/docs/wiki/sub/page.md", status: "added" }]), []);
  assert.deepEqual(await labelsFor([{ filename: wiki("wallet"), status: "modified" }], ["wording-proposal"]), [], "a label already there is not added again");
});

test("merging to main publishes the site; a manual run still does", () => {
  const file = workflow("pages.yml");
  assert.deepEqual(file.on.push, { branches: ["main"] });
  assert.ok("workflow_dispatch" in file.on);
  assert.deepEqual(file.permissions, { contents: "read" });
  assert.deepEqual(file.jobs.deploy.permissions, { pages: "write", "id-token": "write" }, "only the deploy job can publish");
  assert.equal(file.jobs.deploy.environment.name, "github-pages");
  assert.equal(file.concurrency["cancel-in-progress"], false, "a running deployment finishes");
  assert.match(file.jobs.build.if, /github\.repository == 'bisq-network\/documentation'/);
  const run = steps(file).map((step) => step.run).filter(Boolean);
  assert.ok(run.includes("npm test") && run.includes("npm run build"), "the deployment tests and builds again");
});
