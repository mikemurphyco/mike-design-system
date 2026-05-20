#!/usr/bin/env node
// render-thumbnail — pixel-perfect 1280×720 PNG export of the YouTube
// thumbnail template, rendered headless via Playwright.
//
// Bypasses Chrome's "Capture node screenshot" quirks at Retina/fractional
// scaling (edge bleed, color softening, dimension drift). The output is
// exactly what the template defines — no DevTools dance, no manual export.
//
// Usage:
//   node scripts/render-thumbnail.mjs \
//     --eyebrow   "HOSTINGER VPS · AI CHAT" \
//     --headline1 "TAILSCALE" \
//     --headline2 "OLLAMA · OPEN WEB UI" \
//     --lede      "Private & Free AI on all of your devices 24/7." \
//     --out       "tailscale-ollama"
//
//   # Output: outputs/tailscale-ollama.png  (2560×1440 by default)
//
// Optional flags:
//   --scale 1   # render at 1280×720 (standard)
//   --scale 2   # render at 2560×1440 (default — crisp YouTube upload)
//   --scale 3   # render at 3840×2160 (overkill, but available)
//
// Outputs always land in outputs/ (gitignored — this is the warehouse).

import { chromium } from "playwright";
import { fileURLToPath, pathToFileURL } from "node:url";
import { dirname, join, resolve } from "node:path";
import { mkdirSync, existsSync } from "node:fs";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");
const TEMPLATE = join(ROOT, "templates/youtube-thumbnail/index.html");
const OUT_DIR = join(ROOT, "outputs");

// ── 1. Parse CLI args ───────────────────────────────────────────────────────
const argv = process.argv.slice(2);
const args = {};
for (let i = 0; i < argv.length; i++) {
  const flag = argv[i];
  if (flag.startsWith("--")) {
    const key = flag.slice(2);
    const val = argv[i + 1];
    if (val === undefined || val.startsWith("--")) {
      args[key] = true;
    } else {
      args[key] = val;
      i++;
    }
  }
}

if (args.help || (!args.out && !args.eyebrow)) {
  console.log(`
render-thumbnail — render the YouTube thumbnail template to PNG

Required:
  --out <slug>         output filename (no extension), saved to outputs/<slug>.png

Content (all optional — template defaults apply when omitted):
  --eyebrow   "..."    uppercase row above headline
  --headline1 "..."    first headline line
  --headline2 "..."    second headline line (optional, can be empty)
  --lede      "..."    one-line lede below headlines

Render options:
  --scale 1|2|3        output multiplier (default 2 → 2560×1440)

Example:
  node scripts/render-thumbnail.mjs \\
    --eyebrow "HOSTINGER VPS · AI CHAT" \\
    --headline1 "TAILSCALE" \\
    --headline2 "OLLAMA · OPEN WEB UI" \\
    --lede "Private & Free AI on all of your devices 24/7." \\
    --out "tailscale-ollama"
`);
  process.exit(args.help ? 0 : 1);
}

const slug = String(args.out || `thumbnail-${Date.now()}`).replace(/[^a-zA-Z0-9_-]/g, "-");
const scale = Math.max(1, Math.min(3, parseInt(args.scale, 10) || 2));
const outputPath = join(OUT_DIR, `${slug}.png`);

if (!existsSync(TEMPLATE)) {
  console.error(`render-thumbnail: template not found at ${TEMPLATE}`);
  process.exit(1);
}
mkdirSync(OUT_DIR, { recursive: true });

// ── 2. Launch headless Chromium and render ──────────────────────────────────
console.log(`\nRendering thumbnail @ ${1280 * scale}×${720 * scale}...`);

const browser = await chromium.launch();
const context = await browser.newContext({
  viewport: { width: 1500, height: 900 },     // plenty of room for the editor + canvas
  deviceScaleFactor: scale,                   // controls output resolution
  colorScheme: "light",
});
const page = await context.newPage();

await page.goto(pathToFileURL(TEMPLATE).href, { waitUntil: "networkidle" });

// Wait for the canon CSS and all @font-face declarations to be ready.
await page.evaluate(() => document.fonts.ready);

// ── 3. Apply CLI content via the template's existing input bindings ─────────
const fills = {
  "#in-eyebrow":    args.eyebrow,
  "#in-headline-1": args.headline1,
  "#in-headline-2": args.headline2 === true ? "" : args.headline2,
  "#in-lede":       args.lede,
};
for (const [selector, value] of Object.entries(fills)) {
  if (value === undefined) continue;
  await page.fill(selector, String(value));
}

// The template's editor JS binds input events to live preview, so the canvas
// updates as we fill. Give one tick for fonts to relayout against the new text.
await page.waitForTimeout(150);

// ── 4. Screenshot the #thumbnail element only ───────────────────────────────
const target = page.locator("#thumbnail");
await target.screenshot({ path: outputPath, omitBackground: false });

await browser.close();

// ── 5. Report ───────────────────────────────────────────────────────────────
const reset = "\x1b[0m", green = "\x1b[32m", dim = "\x1b[2m", bold = "\x1b[1m";
console.log(`${green}✓${reset} Wrote ${bold}${outputPath.replace(ROOT + "/", "")}${reset}`);
console.log(`${dim}  dimensions  ${1280 * scale}×${720 * scale}  (scale=${scale})${reset}`);
console.log(`${dim}  template    templates/youtube-thumbnail/index.html${reset}`);
console.log("");
