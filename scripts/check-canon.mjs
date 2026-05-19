#!/usr/bin/env node
// check-canon — Drift detector for the Mike Murphy / AI Handyman design system.
//
// Reads canonical token hex values from tokens/colors_and_type.css.
// Scans every tracked text file in the repo for hex codes.
// Reports:
//   • DRIFT — hex codes that match a previously-canonical value that is no
//     longer current (e.g. the old navy #0D1B2A after the v2026.2 update).
//   • WARN  — hex codes that are close to a current canon value but not exact
//     (within 30 channel-units total, i.e. probably a typo or stale paste).
//   • OK    — hex codes that match a canon value exactly. Counted per token.
//
// Hexes that are far from any canon value are ignored — those are intentional
// design colors (illustrations, screenshots, third-party logos), not drift.
//
// Exit code is 1 if any DRIFT is found, otherwise 0. WARNs don't fail the run.
//
// Usage:
//   node scripts/check-canon.mjs           # full report
//   node scripts/check-canon.mjs --quiet   # suppress WARNs, only show DRIFT

import { readFileSync } from "node:fs";
import { join, extname, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { execSync } from "node:child_process";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");
const QUIET = process.argv.includes("--quiet");

// ── 1. Parse the canonical token file ───────────────────────────────────────
const CANON_FILE = "tokens/colors_and_type.css";
const tokenSrc = readFileSync(join(ROOT, CANON_FILE), "utf8");
const canon = {};
for (const m of tokenSrc.matchAll(/--mm-([a-z-]+)\s*:\s*(#[0-9a-fA-F]{6})/g)) {
  canon[m[1]] = m[2].toUpperCase();
}
const canonHexes = new Set(Object.values(canon));

// ── 2. Previously-canonical values that must NOT appear anywhere ────────────
// Add to this set when a canon value changes — old navy, old orange, etc.
const stale = new Set([
  "#0D1B2A", // pre-v2026.2 navy (replaced by #001E3A)
  "#E8622A", // pre-v2026.2 orange (corrected to #FF6434 in v2026.2)
]);
// Defensive: if a "stale" hex is actually still canonical, drop it.
for (const h of canonHexes) stale.delete(h);

// ── 3. List tracked text files via git ──────────────────────────────────────
const TEXT_EXTS = new Set([
  ".css", ".html", ".svg", ".jsx", ".tsx", ".js", ".mjs", ".ts",
  ".md", ".json", ".yaml", ".yml",
]);
const tracked = execSync("git ls-files", { cwd: ROOT, encoding: "utf8" })
  .split("\n").filter(Boolean);
const files = tracked.filter((f) => TEXT_EXTS.has(extname(f).toLowerCase()));

// ── 4. Scan ─────────────────────────────────────────────────────────────────
const HEX_RE = /#([0-9a-fA-F]{6})\b/g;

const drift = [];       // {file, line, hex, ctx}
const warn = [];        // {file, line, hex, ctx, near}
const perCanon = Object.fromEntries(Object.keys(canon).map((k) => [k, 0]));

const channelDistance = (a, b) => {
  const pa = a.slice(1).match(/.{2}/g).map((x) => parseInt(x, 16));
  const pb = b.slice(1).match(/.{2}/g).map((x) => parseInt(x, 16));
  return Math.abs(pa[0] - pb[0]) + Math.abs(pa[1] - pb[1]) + Math.abs(pa[2] - pb[2]);
};
const nearestCanon = (hex) => {
  let best = null, bestD = Infinity;
  for (const [tok, h] of Object.entries(canon)) {
    const d = channelDistance(hex, h);
    if (d < bestD) { bestD = d; best = { token: tok, hex: h, distance: d }; }
  }
  return best;
};

for (const f of files) {
  const content = readFileSync(join(ROOT, f), "utf8");
  const lines = content.split("\n");
  lines.forEach((line, i) => {
    for (const m of line.matchAll(HEX_RE)) {
      const hex = "#" + m[1].toUpperCase();
      const ctx = line.trim().slice(0, 100);

      if (canonHexes.has(hex)) {
        for (const [tok, h] of Object.entries(canon)) {
          if (h === hex) perCanon[tok]++;
        }
        continue;
      }
      if (stale.has(hex)) {
        drift.push({ file: f, line: i + 1, hex, ctx });
        continue;
      }
      const near = nearestCanon(hex);
      if (near && near.distance <= 30) {
        warn.push({ file: f, line: i + 1, hex, ctx, near });
      }
    }
  });
}

// ── 5. Report ───────────────────────────────────────────────────────────────
const reset = "\x1b[0m",
  red = "\x1b[31m", yellow = "\x1b[33m", green = "\x1b[32m",
  dim = "\x1b[2m", bold = "\x1b[1m";

console.log(`\n${bold}Mike Murphy · canon check${reset}`);
console.log(dim + "─".repeat(56) + reset);
console.log(`Canon: ${CANON_FILE}`);
for (const [tok, hex] of Object.entries(canon)) {
  const count = perCanon[tok];
  console.log(`  ${dim}mm-${tok.padEnd(12)}${reset} ${hex}  ${dim}(${count} refs)${reset}`);
}

if (drift.length) {
  console.log(`\n${red}${bold}DRIFT — stale canon values found:${reset}`);
  for (const d of drift) {
    console.log(`  ${d.file}:${d.line}  ${red}${d.hex}${reset}  ${dim}${d.ctx}${reset}`);
  }
}

if (warn.length && !QUIET) {
  console.log(`\n${yellow}${bold}WARN — hexes close to canon but not exact:${reset}`);
  for (const w of warn) {
    console.log(
      `  ${w.file}:${w.line}  ${yellow}${w.hex}${reset}  ` +
      `${dim}~ mm-${w.near.token} ${w.near.hex} (Δ${w.near.distance})${reset}  ${dim}${w.ctx}${reset}`
    );
  }
}

if (!drift.length && !warn.length) {
  console.log(`\n${green}✓ Canon clean.${reset}\n`);
} else if (!drift.length) {
  console.log(`\n${green}✓ No drift.${reset} ${dim}${warn.length} warning(s).${reset}\n`);
} else {
  console.log(`\n${red}✗ ${drift.length} drift, ${warn.length} warning(s).${reset}\n`);
}

process.exit(drift.length ? 1 : 0);
