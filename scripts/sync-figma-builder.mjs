#!/usr/bin/env node
// sync-figma-builder — Rewrites the HEX block in figma-builder/code.js
// from the canonical token values in tokens/colors_and_type.css.
//
// Why this exists: the Figma plugin sandbox can't read the local file
// system, so the plugin source has to carry an inline HEX object. This
// script keeps that block in sync with the canon so a token change in
// tokens/colors_and_type.css can be propagated to the plugin with one
// command: `npm run sync-figma`.
//
// Run any time you change a brand color. The pre-commit hook will catch
// drift if you forget.

import { readFileSync, writeFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");

const CANON = readFileSync(join(ROOT, "tokens/colors_and_type.css"), "utf8");
const PLUGIN = join(ROOT, "figma-builder/code.js");
const src = readFileSync(PLUGIN, "utf8");

// Parse canon
const canon = {};
for (const m of CANON.matchAll(/--mm-([a-z-]+)\s*:\s*(#[0-9a-fA-F]{6})/g)) {
  const key = m[1].replace(/-([a-z])/g, (_, c) => c.toUpperCase());
  canon[key] = m[2].toUpperCase();
}
const required = ["cream", "chalk", "navy", "orange", "orangeDeep", "yellow", "teal"];
for (const k of required) {
  if (!canon[k]) throw new Error(`Canon missing required token: mm-${k}`);
}

// Rebuild the HEX block, matching the existing indentation/formatting.
const next =
  `const HEX = {\n` +
  `      cream:       "${canon.cream}",\n` +
  `      chalk:       "${canon.chalk}",\n` +
  `      navy:        "${canon.navy}",\n` +
  `      orange:      "${canon.orange}",\n` +
  `      orangeDeep:  "${canon.orangeDeep}",\n` +
  `      yellow:      "${canon.yellow}",\n` +
  `      teal:        "${canon.teal}",\n` +
  `    };`;

let matched = false;
const updated = src.replace(/const HEX = \{[\s\S]*?\};/, () => {
  matched = true;
  return next;
});

if (!matched) {
  console.error("sync-figma-builder: HEX block not found in figma-builder/code.js.");
  console.error("Expected pattern: `const HEX = { ... };`");
  process.exit(1);
}

if (updated === src) {
  console.log("sync-figma-builder: HEX block already matches canon. No changes.");
  process.exit(0);
}

writeFileSync(PLUGIN, updated);
console.log("sync-figma-builder: HEX block synced from tokens/colors_and_type.css.");
for (const k of required) console.log(`  ${k.padEnd(10)} ${canon[k]}`);
console.log("\nNote: rgba/SVG hex literals elsewhere in code.js are NOT auto-updated.");
console.log("The pre-commit hook (npm run check) will fail if they drift from canon.");
