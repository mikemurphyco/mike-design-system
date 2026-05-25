// render-thumbnail.mjs
//
// Renders a thumbnail variant from the gallery (index.html) as a PNG.
// All variants live in templates/youtube-thumbnails/index.html.
//
// Usage:
//   npm run thumbnail                   ← V1 Classic Light (default)
//   npm run thumbnail:dark              ← V2 Classic Dark
//   npm run thumbnail:terminal -- \
//     --eyebrow "CLAUDE CODE" \
//     --headline1 "Pair-program" \
//     --headline2 "with Claude." \
//     --lede "12 minutes to your first commit." \
//     --out "claude-code-intro"
//
// Any value not passed via flag is asked at the prompt.

import { chromium } from 'playwright';
import { promises as fs } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import readline from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = path.resolve(__dirname, '../../..');
const GALLERY = path.join(REPO_ROOT, 'templates', 'youtube-thumbnails', 'index.html');

// Map npm script --template flag → gallery variant key + thumb element ID
const VARIANTS = {
  'youtube-thumbnail':          { key: 'classic',  thumbId: 'thumb-classic',  hasTopic: false },
  'youtube-thumbnail-dark':     { key: 'dark',     thumbId: 'thumb-dark',     hasTopic: false },
  'youtube-thumbnail-split':    { key: 'split',    thumbId: 'thumb-split',    hasTopic: false },
  'youtube-thumbnail-cutout':   { key: 'cutout',   thumbId: 'thumb-cutout',   hasTopic: false },
  'youtube-thumbnail-orange':   { key: 'orange',   thumbId: 'thumb-orange',   hasTopic: false },
  'youtube-thumbnail-tile':     { key: 'tile',     thumbId: 'thumb-tile',     hasTopic: true  },
  'youtube-thumbnail-terminal': { key: 'terminal', thumbId: 'thumb-terminal', hasTopic: false },
};

// ── arg parsing ───────────────────────────────────────────────────────────────
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

const templateName = argv.template || 'youtube-thumbnail';
const variant = VARIANTS[templateName];

if (!variant) {
  console.error(`✗ Unknown variant: ${templateName}`);
  console.error(`  Available: ${Object.keys(VARIANTS).join(', ')}`);
  process.exit(1);
}

// ── defaults — read from the gallery's editor inputs for this variant ─────────
const galleryHtml = await fs.readFile(GALLERY, 'utf8');

// Each variant's editor panel is wrapped in data-variant="<key>".
// Extract just that panel's HTML to pull default input values from.
const panelMatch = galleryHtml.match(
  new RegExp(`data-variant="${variant.key}"[^>]*>([\\s\\S]*?)</div>\\s*(?=<!--)`)
);
const panelHtml = panelMatch ? panelMatch[1] : galleryHtml;

function defaultFor(cls) {
  const m = panelHtml.match(new RegExp(`class="${cls}"[^>]*value="([^"]*)"`));
  return m ? m[1] : '';
}

// ── prompt loop ───────────────────────────────────────────────────────────────
const rl = readline.createInterface({ input, output });
async function ask(label, key, def) {
  if (argv[key] !== undefined) return String(argv[key]);
  const ans = await rl.question(`  ${label} [${def}]: `);
  return ans.trim() === '' ? def : ans;
}

console.log(`\nMike Murphy · YouTube thumbnail render`);
console.log(`──────────────────────────────────────`);
console.log(`  variant: ${templateName}`);

const eyebrow   = await ask('Eyebrow',                    'eyebrow',   defaultFor('ed-eyebrow'));
const headline1 = await ask('Headline line 1',            'headline1', defaultFor('ed-hl1'));
const headline2 = await ask('Headline line 2 (or blank)', 'headline2', defaultFor('ed-hl2'));
const lede      = await ask('Lede',                       'lede',      defaultFor('ed-lede'));

let topicLetter = null;
if (variant.hasTopic) {
  topicLetter = await ask('Topic letter (1 char)', 'topic', defaultFor('ed-topic'));
}

const defaultOut = templateName.replace(/^youtube-thumbnail-?/, '') || 'thumbnail';
const outName = await ask('Output filename (no extension)', 'out', defaultOut);
const scale = Number(argv.scale ?? 2);
rl.close();

// ── render via Playwright ─────────────────────────────────────────────────────
console.log(`\nRendering @ ${1280 * scale}×${720 * scale}...`);

const PREFIX = { classic:'cl', dark:'dk', split:'sp', cutout:'co', orange:'or', tile:'ti', terminal:'tm' };
const p = PREFIX[variant.key];

const browser = await chromium.launch();
const ctx = await browser.newContext({
  viewport: { width: 1920, height: 1080 },
  deviceScaleFactor: scale,
});
const page = await ctx.newPage();
await page.goto('file://' + GALLERY);

// Switch to the right variant tab, then inject copy values.
await page.evaluate(({ key, p, eyebrow, headline1, headline2, lede, topicLetter }) => {
  // Activate the correct tab
  document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
  document.querySelectorAll('.thumb-target').forEach(t => t.style.display = 'none');
  const tab = document.querySelector(`.tab[data-variant="${key}"]`);
  if (tab) tab.classList.add('active');
  const thumb = document.getElementById(`thumb-${key}`);
  if (thumb) thumb.style.display = '';

  // Inject copy
  const set = (id, val) => { const el = document.getElementById(id); if (el) el.textContent = val; };
  set(`${p}-eyebrow`, eyebrow);
  set(`${p}-hl1`,     headline1);
  set(`${p}-hl2`,     headline2);
  set(`${p}-lede`,    lede);
  if (topicLetter !== null) set(`${p}-topic`, topicLetter);
}, { key: variant.key, p, eyebrow, headline1, headline2, lede, topicLetter });

await page.waitForLoadState('networkidle');
await page.waitForTimeout(150);

const outDir = path.join(REPO_ROOT, 'outputs');
await fs.mkdir(outDir, { recursive: true });
const outPath = path.join(outDir, `${outName}.png`);

const thumb = await page.locator(`#thumb-${variant.key}`);
await thumb.screenshot({ path: outPath, omitBackground: false });

await browser.close();

console.log(`\n✓ ${path.relative(REPO_ROOT, outPath)}`);
console.log(`  ${1280 * scale}×${720 * scale}, scale=${scale}`);
console.log(`  open: open "${outPath}"\n`);
