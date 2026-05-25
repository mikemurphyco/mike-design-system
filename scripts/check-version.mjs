#!/usr/bin/env node
// check-version — Ensures every version reference in the repo matches the
// canonical version declared in BRAND-CANON.md.
//
// The brand version moves as one unit. If any file lags (a stale stamp
// in a JSX footer, a README header, a CSS comment), this check fails.
//
// Add files that should carry the current version to VERSIONED_FILES.
// Each entry has a regex describing where the version appears; the script
// reads the file, extracts every match, and verifies they all match canon.
//
// To bump the version across the whole repo, run:
//   node scripts/bump-version.mjs <new-version>
//
// Exit 1 on any mismatch. Wired into the pre-commit hook.

import { readFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");

// ── 1. Canonical version from BRAND-CANON.md header ─────────────────────────
const CANON_MD = readFileSync(join(ROOT, "BRAND-CANON.md"), "utf8");
const headerMatch = CANON_MD.match(/^\*\*Mike Murphy · AI Handyman · (v\d{4}\.\d+)\*\*/m);
if (!headerMatch) {
  console.error("check-version: could not extract version from BRAND-CANON.md header.");
  console.error('Expected header: **Mike Murphy · AI Handyman · v2026.N**');
  process.exit(1);
}
const CANON_VERSION = headerMatch[1];                       // e.g. "v2026.3"
const CANON_NPM_VERSION = CANON_VERSION.slice(1) + ".0";    // e.g. "2026.3.0"

// ── 2. Files that must carry the current version ───────────────────────────
// Each file lists every place a version string can legitimately appear, as
// a regex. The script extracts the version from each match and compares.
// `ignoreHistorical: true` means matches inside lines containing the
// literal phrase "What changed in" are skipped (those are historical
// section headings, not current-version stamps).
const VERSIONED_FILES = [
  { path: "BRAND-CANON.md",                          re: /v\d{4}\.\d+/g, ignoreHistorical: true },
  { path: "CLAUDE.md",                               re: /v\d{4}\.\d+/g },
  { path: "DESIGN.md",                               re: /v\d{4}\.\d+/g },
  { path: "README.md",                               re: /v\d{4}\.\d+/g },
  { path: "SYSTEM.md",                               re: /v\d{4}\.\d+/g },
  { path: "tokens/colors_and_type.css",              re: /v\d{4}\.\d+/g },
  { path: "design-system.html",                      re: /v\d{4}\.\d+/g },
  { path: "figma-builder/README.md",                 re: /v\d{4}\.\d+/g },
  { path: "figma-builder/code.js",                   re: /v\d{4}\.\d+/g },
  { path: "templates/youtube-thumbnails/README.md",     re: /v\d{4}\.\d+/g },
  { path: "templates/youtube-thumbnails/index.html",    re: /v\d{4}\.\d+/g },
  { path: "ui_kits/website/Footer.jsx",              re: /v\d{4}\.\d+/g },
  { path: "ui_kits/website/Hero.jsx",                re: /v\d{4}\.\d+/g },
  { path: "ui_kits/website/TutorialDetail.jsx",      re: /v\d{4}\.\d+/g },
];

// npm-style version files (different format: "2026.3.0" not "v2026.3")
const NPM_FILES = [
  { path: "package.json",       re: /"version":\s*"(\d{4}\.\d+\.\d+)"/g },
  { path: "package-lock.json",  re: /"version":\s*"(\d{4}\.\d+\.\d+)"/g },
];

// ── 3. Scan ────────────────────────────────────────────────────────────────
const mismatches = [];
const counts = {};

for (const f of VERSIONED_FILES) {
  let content;
  try { content = readFileSync(join(ROOT, f.path), "utf8"); }
  catch { mismatches.push({ file: f.path, found: "<missing>", expected: CANON_VERSION }); continue; }
  const lines = content.split("\n");
  lines.forEach((line, i) => {
    if (f.ignoreHistorical && /What changed in/.test(line)) return;
    if (line.includes("check-canon-ignore")) return; // also respect ignore pragmas
    for (const m of line.matchAll(f.re)) {
      counts[f.path] = (counts[f.path] || 0) + 1;
      if (m[0] !== CANON_VERSION) {
        mismatches.push({
          file: f.path, line: i + 1, found: m[0], expected: CANON_VERSION,
          ctx: line.trim().slice(0, 80),
        });
      }
    }
  });
}

for (const f of NPM_FILES) {
  let content;
  try { content = readFileSync(join(ROOT, f.path), "utf8"); }
  catch { continue; }
  const lines = content.split("\n");
  lines.forEach((line, i) => {
    for (const m of line.matchAll(f.re)) {
      counts[f.path] = (counts[f.path] || 0) + 1;
      if (m[1] !== CANON_NPM_VERSION) {
        mismatches.push({
          file: f.path, line: i + 1, found: m[1], expected: CANON_NPM_VERSION,
          ctx: line.trim().slice(0, 80),
        });
      }
    }
  });
}

// ── 4. Report ──────────────────────────────────────────────────────────────
const reset = "\x1b[0m",
  red = "\x1b[31m", green = "\x1b[32m", dim = "\x1b[2m", bold = "\x1b[1m";

console.log(`\n${bold}Mike Murphy · version check${reset}`);
console.log(dim + "─".repeat(56) + reset);
console.log(`Canon: BRAND-CANON.md → ${bold}${CANON_VERSION}${reset}  ${dim}(npm: ${CANON_NPM_VERSION})${reset}`);

if (mismatches.length === 0) {
  const total = Object.values(counts).reduce((a, b) => a + b, 0);
  console.log(`\n${green}✓ All ${total} version refs match canon.${reset}\n`);
  process.exit(0);
}

console.log(`\n${red}${bold}MISMATCH — files lagging the canon version:${reset}`);
for (const m of mismatches) {
  const loc = m.line ? `${m.file}:${m.line}` : m.file;
  console.log(`  ${loc}  ${red}${m.found}${reset} → expected ${green}${m.expected}${reset}  ${dim}${m.ctx || ""}${reset}`);
}
console.log(`\n${red}✗ ${mismatches.length} version mismatch(es).${reset}`);
console.log(`${dim}Run \`npm run bump <new-version>\` to sync all files atomically.${reset}\n`);
process.exit(1);
