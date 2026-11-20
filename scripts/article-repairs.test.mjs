import test from "node:test";
import assert from "node:assert/strict";
import { breakPoints, lightness, looksLikeProse, ownNumbers } from "../src/scripts/article-repairs-helpers.mjs";

const nbsp = (text) => text.replaceAll(" ", "\u00a0");

test("preformatted prose reads as text, preformatted code stays code", () => {
  // Restored articles: donation-address-owner, trading-bsq, faq, changing-your-onion-address, reputation2.
  for (const prose of [
    nbsp(' (sometimes referred to as the "burning man") is a now retired Bisq role. The Donation address owner controlled the BTC address.'),
    `${nbsp("   * Trustless: No counterparty risk during the exchange.")}\n${nbsp("   * Simpler: Does not require setting up a specific \"BSQ payment account\".")}`,
    "If you encounter persistent issues, please seek help in the `#support` room on Matrix or open an issue on GitHub.",
    `${nbsp("   * Bisq may appear unresponsive during this time. Do not force quit; let it run.")}`,
    "\n\nBurning BSQ has the highest impact on the reputation score.\n\nFor every BSQ burnt the user receives a reputation score of 100.\n",
  ]) assert.equal(looksLikeProse(prose), true, prose);
  // command-line-options, how-to-run-pricenode, payment-account-age-witness, restoring-application-data,
  // running-bisq-in-china, roles, support-agent-knowledge-base, trading-grin.
  for (const code of [
    `#!/bin/bash\n\n${nbsp("/Applications/Bisq.app/Contents/MacOS/Bisq --appDataDir=/external/hard/drive/path")}`,
    nbsp("curl -s https://raw.githubusercontent.com/bisq-network/bisq-pricenode/main/scripts/install_pricenode_debian.sh | sudo bash"),
    nbsp("$ cd ~/Library/Application\\ Support/\n$ mkdir Bisq\n$ chmod 000 Bisq"),
    nbsp("// Ripemd160(Sha256(ageWitnessInputData, salt and pubKey)) - 20 bytes\nprivate final byte[] hash;"),
    "SEPA\nAlice Liddell\nDE89370400440532013000\nDEUTDE5X*\nSKzH\nsalt",
    nbsp("ControlPort auto\nCookieAuthentication 1\nDisableNetwork 1\nAvoidDiskWrites 1"),
    nbsp("## Cycle 21 Report\n\nDescription and/or list of contributions, accomplishments, or other notable occurrences since the last role report was posted.\n\n/cc bisq-network/compensation#421"),
    nbsp("* DaoStateStore\n* SignedWitnessStore\n* AccountAgeWitnessStore"),
    nbsp('   {\n     "amount": "10123456789",'),
    "git clone --recursive https://github.com/bisq-network/bisq-pricenode.git\ncd bisq-pricenode",
  ]) assert.equal(looksLikeProse(code), false, code);
  assert.equal(looksLikeProse("Too short to tell"), false);
  // Shell commands and a shell comment are code even when their words are plain (bisq-2, xpra guide).
  assert.equal(looksLikeProse("cd ~/Downloads\n\nmkdir tmp\n\ncd tmp\n\nar x ../Bisq-64bit-2.1.2.deb\n\nsudo tar Jxvf data.tar.xz"), false);
  assert.equal(looksLikeProse("sudo apt install default-jre default-jdk git"), false);
  assert.equal(looksLikeProse('deb https://xpra.org/ bullseye main # edit "bullseye" with your version'), false);
  // A preformatted block needs several sentences: program output (trading-grin) stays code.
  const output = "Payment proof's signatures are valid.\nNeither the proof's sender nor recipient address belongs to this wallet.\nCommand 'verify_proof' completed successfully";
  assert.equal(looksLikeProse(output, 3), false);
  assert.equal(looksLikeProse("Bonding BSQ has a high impact on the reputation score.\n\nFor every BSQ bonded the user receives a reputation score of 10.\n\nOnce the bond is unlocked the reputation score attributed to that bond is lost.", 3), true);
});

test("long URLs and tokens wrap after separators, never inside words", () => {
  const split = (text) => {
    const parts = [];
    let from = 0;
    for (const at of breakPoints(text)) { parts.push(text.slice(from, at)); from = at; }
    return [...parts, text.slice(from)];
  };
  assert.deepEqual(split("https://docs.bisq.network/exchange/howto/run-seednode.html"), ["https://", "docs", ".bisq", ".network/", "exchange/", "howto/", "run", "-seednode", ".html"]);
  assert.deepEqual(split("see https://github.com/bisq-network/bisq/issues/2547#issuecomment-1016787843."), ["see https://", "github", ".com/", "bisq", "-network/", "bisq/", "issues/", "2547", "#issuecomment", "-1016787843."]);
  assert.deepEqual(split("-btcNodes=devinbtctu7uctl7hly2juu3thbgeivfnvw3ckj3phy6nyvpnx66yeyd.onion:8333"), ["-btcNodes=", "devinbtctu7uctl7hly2juu3thbgeivfnvw3ckj3phy6nyvpnx66yeyd", ".onion:8333"]);
  assert.deepEqual(split("--torControlCookieFile=/var/run/tor/control.authcookie"), ["--torControlCookieFile=/", "var/", "run/", "tor/", "control", ".authcookie"]);
  // Ordinary words and short tokens get no break points; a hash has none to offer.
  assert.deepEqual(breakPoints("a well-known, decentralized multi-signature e.g. escrow"), []);
  assert.deepEqual(breakPoints("ca636152863a9cc587d8d2b00476abd6fab854ae0b3513950d001f23cb0a1a53"), []);
});

test("list items that carry their own numbers are recognised", () => {
  assert.equal(ownNumbers(["1. When the maker is trading", " 2. Sometimes an invalid maker offer"]), true);
  assert.equal(ownNumbers(["3) Third", "4) Fourth"], 3), true);
  assert.equal(ownNumbers(["1. One", "3. Three"]), false);
  assert.equal(ownNumbers(["1990 was a year", "2. Two"]), false);
  assert.equal(ownNumbers([]), false);
});

test("light screenshots are told apart from dark ones", () => {
  // `share` of the pixels in the first colour, the rest in the second.
  const image = (first, second, share) => {
    const data = new Uint8ClampedArray(100 * 4);
    for (let at = 0; at < 100; at++) data.set(at < share * 100 ? first : second, at * 4);
    return data;
  };
  const white = [255, 255, 255, 255];
  const panel = [36, 40, 38, 255];
  assert.ok(lightness(image(white, white, 1)) > 0.999);
  // A light settings screen with a green header bar and some dark text still reads as light.
  assert.ok(lightness(image([241, 241, 241, 255], [37, 177, 53, 255], 0.85)) >= 0.7);
  // Dark interfaces (Bisq 2), even with a white dialog in them, stay below the line.
  assert.ok(lightness(image(panel, white, 0.7)) < 0.7);
  // Transparent pixels count as dark: the page shows through them.
  assert.equal(lightness(image([255, 255, 255, 0], [255, 255, 255, 0], 1)), 0);
  assert.equal(lightness([]), 0);
});
