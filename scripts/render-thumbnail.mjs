#!/usr/bin/env node
// render-thumbnail — pixel-perfect 1280×720 PNG export of the YouTube
// thumbnail template, rendered headless via Playwright.
//
// Two ways to use it:
//
//   1. Interactive (just run it, it'll ask):
//        npm run thumbnail
//        > Eyebrow: HOSTINGER VPS · AI CHAT
//        > Headline line 1: TAILSCALE
//        > Headline line 2: OLLAMA · OPEN WEB UI
//        > Lede: Private & Free AI on all of your devices 24/7.
//        > Output filename [tailscale]: tailscale-ollama
//
//   2. One-shot (every value as a flag — useful for scripts):
//        npm run thumbnail -- --eyebrow "..." --headline1 "..." --out "slug"
//
// Output: outputs/<slug>.png at 2560×1440 by default (--scale 1|2|3).

import { chromium } from "playwright";
import { fileURLToPath, pathToFileURL } from "node:url";
import { dirname, join } from "node:path";
import { mkdirSync, existsSync } from "node:fs";
import { createInterface } from "node:readline/promises";
import { stdin, stdout } from "node:process";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");
const TEMPLATE = join(ROOT, "templates/youtube-thumbnail/index.html");
const OUT_DIR = join(ROOT, "outputs");

// ── 1. Parse CLI flags (one-shot mode) ──────────────────────────────────────
const argv = process.argv.slice(2);
const flags = {};
for (let i = 0; i < argv.length; i++) {
  const f = argv[i];
  if (f.startsWith("--")) {
    const k = f.slice(2);
    const v = argv[i + 1];
    if (v === undefined || v.startsWith("--")) flags[k] = true;
    else { flags[k] = v; i++; }
  }
}

if (flags.help) {
  console.log(`
render-thumbnail — render the YouTube thumbnail template to PNG

Run interactively (recommended):
  npm run thumbnail

Or one-shot with flags:
  npm run thumbnail -- \\
    --eyebrow   "HOSTINGER VPS · AI CHAT" \\
    --headline1 "TAILSCALE" \\
    --headline2 "OLLAMA · OPEN WEB UI" \\
    --lede      "Private & Free AI on all of your devices 24/7." \\
    --out       "tailscale-ollama"

Flags:
  --out <slug>       filename (no extension) — saved to outputs/<slug>.png
  --eyebrow "..."    uppercase eyebrow line
  --headline1 "..."  first headline line
  --headline2 "..."  second headline (optional — pass --headline2 "" to omit)
  --lede "..."       single-line lede under the headlines
  --scale 1|2|3      output multiplier (default 2 → 2560×1440)
`);
  process.exit(0);
}

// ── 2. Helpers ──────────────────────────────────────────────────────────────
function slugify(s) {
  return String(s || "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 60) || `thumbnail-${Date.now()}`;
}

async function prompt(rl, label, fallback) {
  const hint = fallback ? ` [${fallback}]` : "";
  const answer = (await rl.question(`  ${label}${hint}: `)).trim();
  return answer || fallback || "";
}

// ── 3. Collect values (flags first, prompt for whatever's missing) ──────────
let eyebrow   = flags.eyebrow   !== true ? flags.eyebrow   : undefined;
let headline1 = flags.headline1 !== true ? flags.headline1 : undefined;
let headline2 = flags.headline2 !== true ? flags.headline2 : undefined;
let lede      = flags.lede      !== true ? flags.lede      : undefined;
let outSlug   = flags.out       !== true ? flags.out       : undefined;
const scale   = Math.max(1, Math.min(3, parseInt(flags.scale, 10) || 2));

const needsPrompt = !outSlug || eyebrow === undefined || headline1 === undefined;

if (needsPrompt) {
  console.log("\nMike Murphy · YouTube thumbnail render\n────────────────────────────────────");
  const rl = createInterface({ input: stdin, output: stdout });
  try {
    if (eyebrow   === undefined) eyebrow   = await prompt(rl, "Eyebrow",        "TUTORIAL · 04 OF 09");
    if (headline1 === undefined) headline1 = await prompt(rl, "Headline line 1","Your first MCP,");
    if (headline2 === undefined) headline2 = await prompt(rl, "Headline line 2 (or blank)", "made simple.");
    if (lede      === undefined) lede      = await prompt(rl, "Lede",           "12 minutes. One file. A working server.");
    if (!outSlug)                outSlug   = await prompt(rl, "Output filename", slugify(headline1));
  } finally {
    rl.close();
  }
}

outSlug = slugify(outSlug);
mkdirSync(OUT_DIR, { recursive: true });
const outputPath = join(OUT_DIR, `${outSlug}.png`);

if (!existsSync(TEMPLATE)) {
  console.error(`render-thumbnail: template not found at ${TEMPLATE}`);
  process.exit(1);
}

// ── 4. Render via headless Chromium ─────────────────────────────────────────
console.log(`\nRendering @ ${1280 * scale}×${720 * scale}...`);

const browser = await chromium.launch();
const context = await browser.newContext({
  viewport: { width: 1500, height: 900 },
  deviceScaleFactor: scale,
  colorScheme: "light",
});
const page = await context.newPage();

await page.goto(pathToFileURL(TEMPLATE).href, { waitUntil: "networkidle" });
await page.evaluate(() => document.fonts.ready);

const fills = {
  "#in-eyebrow":    eyebrow,
  "#in-headline-1": headline1,
  "#in-headline-2": headline2,
  "#in-lede":       lede,
};
for (const [selector, value] of Object.entries(fills)) {
  if (value === undefined) continue;
  await page.fill(selector, String(value));
}

await page.waitForTimeout(150);
await page.locator("#thumbnail").screenshot({ path: outputPath, omitBackground: false });
await browser.close();

// ── 5. Report ───────────────────────────────────────────────────────────────
const reset = "\x1b[0m", green = "\x1b[32m", dim = "\x1b[2m", bold = "\x1b[1m";
console.log(`\n${green}✓${reset} ${bold}${outputPath.replace(ROOT + "/", "")}${reset}`);
console.log(`${dim}  ${1280 * scale}×${720 * scale}, scale=${scale}${reset}`);
console.log(`${dim}  open: open "${outputPath}"${reset}\n`);
