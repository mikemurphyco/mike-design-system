// scripts/render-thumbnail.mjs
//
// Renders any thumbnail template in templates/<name>/index.html as a PNG.
//
// Usage:
//   node scripts/render-thumbnail.mjs --template youtube-thumbnail-dark
//   node scripts/render-thumbnail.mjs --template youtube-thumbnail-split --scale 2
//   node scripts/render-thumbnail.mjs --template youtube-thumbnail \
//     --eyebrow "HOSTINGER VPS" --headline1 "Tailscale" --headline2 "Ollama" \
//     --lede "Private AI chat on all devices" --out "tailscale-ollama"
//
// Any value not passed via flag is asked for at the prompt.
//
// Reference implementation — diff this against your existing
// render-thumbnail.mjs and pull in the parts you don't already have.
// The two material additions over the old single-template version are:
//   1. --template <folder> flag (required, with sensible default)
//   2. The "Topic letter" prompt for the V6 tile variant
//      (auto-detected by the presence of an #in-topic-letter input).

import { chromium } from 'playwright';
import { promises as fs } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import readline from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = path.resolve(__dirname, '..');

// ── arg parsing ──────────────────────────────────────────────────────────────
const argv = (() => {
  const out = {};
  const a = process.argv.slice(2);
  for (let i = 0; i < a.length; i++) {
    if (a[i].startsWith('--')) {
      const key = a[i].slice(2);
      const val = a[i + 1] && !a[i + 1].startsWith('--') ? a[++i] : true;
      out[key] = val;
    }
  }
  return out;
})();

const templateFolder = argv.template || 'youtube-thumbnail';
const templateDir = path.join(REPO_ROOT, 'templates', templateFolder);
const templatePath = path.join(templateDir, 'index.html');

try {
  await fs.access(templatePath);
} catch {
  console.error(`✗ Template not found: ${templatePath}`);
  console.error(`  Available templates:`);
  const dirs = await fs.readdir(path.join(REPO_ROOT, 'templates'), { withFileTypes: true });
  for (const d of dirs) if (d.isDirectory()) console.error(`    - ${d.name}`);
  process.exit(1);
}

// ── prompt loop (only asks for values not already passed as flags) ───────────
const rl = readline.createInterface({ input, output });
async function ask(label, key, def) {
  if (argv[key] !== undefined) return String(argv[key]);
  const ans = await rl.question(`  ${label} [${def}]: `);
  return ans.trim() === '' ? def : ans;
}

console.log(`\nMike Murphy · YouTube thumbnail render`);
console.log(`──────────────────────────────────────`);
console.log(`  template: ${templateFolder}`);

// Read the template once to extract the default values from its <input> tags
// — that way the prompt defaults stay in sync with the per-variant defaults.
const templateHtml = await fs.readFile(templatePath, 'utf8');
function defaultFor(id) {
  const m = templateHtml.match(new RegExp(`id="${id}"[^>]*value="([^"]*)"`));
  return m ? m[1] : '';
}

const eyebrow   = await ask('Eyebrow',                 'eyebrow',   defaultFor('in-eyebrow'));
const headline1 = await ask('Headline line 1',         'headline1', defaultFor('in-headline-1'));
const headline2 = await ask('Headline line 2 (or blank)', 'headline2', defaultFor('in-headline-2'));
const lede      = await ask('Lede',                    'lede',      defaultFor('in-lede'));

// Only the V6 tile variant has a topic-letter field — ask only if present.
let topicLetter = null;
if (templateHtml.includes('id="in-topic-letter"')) {
  topicLetter = await ask('Topic letter (1 char)', 'topic', defaultFor('in-topic-letter'));
}

const defaultOut = templateFolder.replace(/^youtube-thumbnail-?/, '') || 'thumbnail';
const outName = await ask('Output filename (no extension)', 'out', defaultOut);
const scale = Number(argv.scale ?? 2);
rl.close();

// ── render via Playwright ────────────────────────────────────────────────────
console.log(`\nRendering @ ${1280 * scale}×${720 * scale}...`);

const browser = await chromium.launch();
const ctx = await browser.newContext({
  viewport: { width: 1280 + 64, height: 720 + 220 },
  deviceScaleFactor: scale,
});
const page = await ctx.newPage();
await page.goto('file://' + templatePath);

// Inject the values directly so we don't depend on the in-page editor JS.
await page.evaluate(({ eyebrow, headline1, headline2, lede, topicLetter }) => {
  const set = (id, val) => { const el = document.getElementById(id); if (el) el.textContent = val; };
  set('eyebrow', eyebrow);
  set('headline-1', headline1);
  set('headline-2', headline2);
  set('lede', lede);
  if (topicLetter !== null) set('topic-letter', topicLetter);
}, { eyebrow, headline1, headline2, lede, topicLetter });

// Give the browser a tick to settle (fonts, layout).
await page.waitForLoadState('networkidle');
await page.waitForTimeout(120);

const outDir = path.join(REPO_ROOT, 'outputs');
await fs.mkdir(outDir, { recursive: true });
const outPath = path.join(outDir, `${outName}.png`);

const thumb = await page.locator('#thumbnail');
await thumb.screenshot({ path: outPath, omitBackground: false });

await browser.close();

console.log(`\n✓ ${path.relative(REPO_ROOT, outPath)}`);
console.log(`  ${1280 * scale}×${720 * scale}, scale=${scale}`);
console.log(`  open: open "${outPath}"\n`);
