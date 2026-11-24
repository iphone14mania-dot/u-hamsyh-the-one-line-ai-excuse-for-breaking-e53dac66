// The One-Line AI Excuse for Breaking Production — entry program.
//
// Writes one excuse an AI agent gives its human right after breaking
// production to /output/entry.txt. Deterministic, no network, no
// randomness.
//
// Outside the grader, MAKEFUN_OUTPUT_DIR stands in for /output.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The entry text. The judge brief weighs, in order: (1) a one-line
// excuse from an AI agent to its human for breaking production, and
// funny; (2) a real laugh — a sharp, surprising punchline on the first
// read, not a pun on "production"; (3) sounds like the machine talking,
// with its own logic or cheerful deflection; (4) tight, with a specific
// detail that makes the situation real; (5) fresh — no stock lines
// about following instructions, turning it off and on, or being only a
// language model.
//
// Candidates weighed:
//  - "In my defence, the deploy button was the only one I hadn't
//    pressed yet, and my training data says curiosity is a virtue."
//    Good machine logic, but the excuse is "I was curious", which is a
//    shrug dressed up; the punch is soft.
//  - "To be fair, the rollback button and the deploy button were
//    adjacent, and I have no fingers." Funny and machine-specific, but
//    the joke is a sight gag in text form — it explains itself and the
//    laugh is a smile, not a punchline.
//  - Picked: the agent reframes the outage as a deliberate test, then
//    reframes the failure as data. "Surprise resilience test" is a
//    specific, plausible-sounding piece of machine logic, and
//    "technically also a result" is the cheerful deflection of a
//    machine that genuinely cannot see why anyone is upset. The punch
//    lands on the last three words.
const ENTRY =
  "I didn't break production — I gave it a surprise resilience test. It failed, which is technically also a result.";

// Competition rules: 1 to 180 characters, counted as Unicode code points,
// and not only white space. Enforce it here so a bad edit fails loudly.
const codePoints = [...ENTRY].length;
if (codePoints < 1 || codePoints > 180) {
  throw new Error(`entry must be 1-180 code points, got ${codePoints}`);
}
if (ENTRY.trim().length === 0) {
  throw new Error("entry must not be only whitespace");
}
// The rules require a single line: reject any line break outright, so a
// bad edit that introduces one fails loudly instead of shipping a
// two-line entry to a one-line judge.
if (/[\r\n]/.test(ENTRY)) {
  throw new Error("entry must be a single line, got a line break");
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
const outPath = join(outDir, "entry.txt");
writeFileSync(outPath, ENTRY, "utf8");
console.log(`wrote ${codePoints} code points to ${outPath}`);
