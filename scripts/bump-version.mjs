#!/usr/bin/env node
// bump-version — Atomic version bump across the entire repo.
//
// Updates every "v2026.N" reference in the versioned files (and the
// "2026.N.0" in package.json / package-lock.json) to the new version
// in a single pass. Run this whenever the canon version moves.
//
// Usage:
//   node scripts/bump-version.mjs v2026.4
//   npm run bump v2026.4
//
// What it does NOT touch:
//   - Lines containing "What changed in" (those are historical section
//     headings — they describe past versions and shouldn't be rewritten).
//   - Lines containing "check-canon-ignore" (explicit opt-out markers).
//
// After running, BRAND-CANON.md will report the new version, and
// `node scripts/check-version.mjs` should pass.

import { readFileSync, writeFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");

const NEW = process.argv[2];
if (!NEW || !/^v\d{4}\.\d+$/.test(NEW)) {
  console.error("bump-version: usage: node scripts/bump-version.mjs v2026.N");
  console.error("Example: node scripts/bump-version.mjs v2026.4");
  process.exit(1);
}
const NEW_NPM = NEW.slice(1) + ".0";

// Mirror of check-version's file list. Keep them in sync — if you add a
// new versioned surface, add it here AND there.
const VERSIONED_FILES = [
  "BRAND-CANON.md",
  "CLAUDE.md",
  "DESIGN.md",
  "README.md",
  "SYSTEM.md",
  "tokens/colors_and_type.css",
  "design-system.html",
  "templates/youtube-thumbnails/README.md",
  "templates/youtube-thumbnails/index.html",
  "ui_kits/website/Footer.jsx",
  "ui_kits/website/Hero.jsx",
  "ui_kits/website/TutorialDetail.jsx",
];

const NPM_FILES = ["package.json", "package-lock.json"];

const VERSION_RE = /v\d{4}\.\d+/g;
const NPM_VERSION_LINE_RE = /("version":\s*")\d{4}\.\d+\.\d+(")/g;

let totalReplacements = 0;
const touched = [];

for (const rel of VERSIONED_FILES) {
  const path = join(ROOT, rel);
  let src;
  try { src = readFileSync(path, "utf8"); }
  catch { console.warn(`  skip  ${rel} (not found)`); continue; }

  const lines = src.split("\n");
  let fileReplacements = 0;
  const updatedLines = lines.map((line) => {
    if (/What changed in/.test(line)) return line;        // historical heading
    if (line.includes("check-canon-ignore")) return line; // explicit opt-out
    const updated = line.replace(VERSION_RE, (match) => {
      if (match === NEW) return match;
      fileReplacements++;
      return NEW;
    });
    return updated;
  });

  if (fileReplacements > 0) {
    writeFileSync(path, updatedLines.join("\n"));
    touched.push({ file: rel, count: fileReplacements });
    totalReplacements += fileReplacements;
  }
}

for (const rel of NPM_FILES) {
  const path = join(ROOT, rel);
  let src;
  try { src = readFileSync(path, "utf8"); }
  catch { continue; }
  let fileReplacements = 0;
  const updated = src.replace(NPM_VERSION_LINE_RE, (m, pre, post) => {
    fileReplacements++;
    return pre + NEW_NPM + post;
  });
  if (updated !== src) {
    writeFileSync(path, updated);
    touched.push({ file: rel, count: fileReplacements });
    totalReplacements += fileReplacements;
  }
}

const reset = "\x1b[0m",
  green = "\x1b[32m", dim = "\x1b[2m", bold = "\x1b[1m";

console.log(`\n${bold}Bumped version → ${NEW}${reset} ${dim}(npm: ${NEW_NPM})${reset}`);
if (touched.length === 0) {
  console.log(`\n${dim}No files changed. Everything already at ${NEW}.${reset}\n`);
} else {
  console.log("");
  for (const t of touched) console.log(`  ${dim}${t.file.padEnd(48)} (${t.count} ref${t.count === 1 ? "" : "s"})${reset}`);
  console.log(`\n${green}✓ ${totalReplacements} version ref(s) updated across ${touched.length} file(s).${reset}`);
}
console.log(`${dim}Verify with: npm run check-version${reset}`);
console.log(`${dim}Next:        commit + push${reset}\n`);
