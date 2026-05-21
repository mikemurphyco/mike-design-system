/**
 * Mike Murphy · AI Handyman — Brand Asset Generator
 * Generates SVG source files + PNG exports for the full brand kit.
 *
 * Usage: node scripts/generate-assets.mjs
 */

import { readFileSync, writeFileSync, mkdirSync, readdirSync } from 'fs';
import { join, dirname, basename } from 'path';
import { fileURLToPath } from 'url';
import { Resvg } from '@resvg/resvg-js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');

// ── Brand tokens (parsed from canon at runtime — single source of truth) ─────
// Reads tokens/colors_and_type.css and pulls out every --mm-* hex declaration.
// No hex literals live in this file. Update the canon CSS, re-run generate.
const CANON_CSS = readFileSync(join(ROOT, 'tokens/colors_and_type.css'), 'utf8');
const T = (() => {
  const out = {};
  for (const m of CANON_CSS.matchAll(/--mm-([a-z-]+)\s*:\s*(#[0-9a-fA-F]{6})/g)) {
    // Convert kebab-case key to camelCase: "orange-deep" → "orangeDeep"
    const key = m[1].replace(/-([a-z])/g, (_, c) => c.toUpperCase());
    out[key] = m[2].toUpperCase();
  }
  const required = ['cream', 'chalk', 'navy', 'orange', 'orangeDeep', 'yellow', 'teal'];
  const missing = required.filter((k) => !out[k]);
  if (missing.length) throw new Error(`Canon missing tokens: ${missing.join(', ')}`);
  return out;
})();

// ── Load fonts ────────────────────────────────────────────────────────────────
const fontBold    = readFileSync(join(ROOT, 'assets/fonts/IBMPlexMono-Bold.ttf'));
const fontBoldB64 = fontBold.toString('base64');

// ── Helpers ───────────────────────────────────────────────────────────────────

/** Build the @font-face block embedded in an SVG <defs> */
function fontDefs() {
  return `<defs><style>@font-face{font-family:"IBM Plex Mono";font-weight:700;src:url("data:font/truetype;base64,${fontBoldB64}") format("truetype");}</style></defs>`;
}

/** Inject explicit width/height into an SVG string based on its viewBox and a target width */
function sizeSvg(svgStr, targetWidth) {
  const vb = svgStr.match(/viewBox="0 0 ([\d.]+) ([\d.]+)"/);
  if (!vb) return svgStr;
  const [, vw, vh] = vb;
  const h = Math.round(targetWidth * (parseFloat(vh) / parseFloat(vw)));
  return svgStr.replace('<svg ', `<svg width="${targetWidth}" height="${h}" `);
}

/** Render an SVG string to PNG at `targetWidth` px wide and write to `dest` */
function renderPng(svgStr, dest, targetWidth) {
  const sized = sizeSvg(svgStr, targetWidth);
  const resvg = new Resvg(sized, {
    font: { loadSystemFonts: false, fontBuffers: [fontBold] },
  });
  const png = resvg.render().asPng();
  mkdirSync(dirname(dest), { recursive: true });
  writeFileSync(dest, png);
}

/** Write an SVG file and render it to PNGs at each size in `sizes` */
function emit(svgStr, svgDest, pngBaseName, sizes) {
  mkdirSync(dirname(svgDest), { recursive: true });
  writeFileSync(svgDest, svgStr);
  console.log(`  svg  ${svgDest.replace(ROOT + '/', '')}`);
  for (const size of sizes) {
    const pngDest = join(dirname(svgDest), 'png', `${pngBaseName}-${size}.png`);
    renderPng(svgStr, pngDest, size);
    console.log(`  png  ${pngDest.replace(ROOT + '/', '')}`);
  }
}

// ── 1. M-mark ─────────────────────────────────────────────────────────────────

function mMarkSvg({ disc, ink, outline }) {
  const border = outline ? `<circle cx="100" cy="100" r="98" fill="none" stroke="${T.navy}" stroke-width="2"/>` : '';
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" role="img" aria-label="Mike Murphy M-mark">
  ${fontDefs()}
  <circle cx="100" cy="100" r="100" fill="${disc}"/>
  ${border}
  <text x="100" y="100" text-anchor="middle" dominant-baseline="central"
    font-family="IBM Plex Mono,monospace" font-weight="700" font-size="116"
    letter-spacing="-0.03em" fill="${ink}">M</text>
</svg>`;
}

const mMarkSizes = [32, 64, 180, 400, 800];

console.log('\nM-mark');
emit(
  mMarkSvg({ disc: T.navy,   ink: T.cream,  outline: false }),
  join(ROOT, 'assets/logos/m-mark/m-mark-navy.svg'),
  'm-mark-navy', mMarkSizes
);
emit(
  mMarkSvg({ disc: T.orange, ink: T.yellow, outline: false }),
  join(ROOT, 'assets/logos/m-mark/m-mark-orange.svg'),
  'm-mark-orange', mMarkSizes
);
emit(
  mMarkSvg({ disc: T.cream,  ink: T.navy,   outline: true }),
  join(ROOT, 'assets/logos/m-mark/m-mark-cream.svg'),
  'm-mark-cream', mMarkSizes
);

// ── 2. Favicon set (from navy M-mark) ─────────────────────────────────────────

console.log('\nFavicon');
const faviconSvg = mMarkSvg({ disc: T.navy, ink: T.cream, outline: false });
for (const [size, name] of [
  [16,  'favicon-16'],
  [32,  'favicon-32'],
  [48,  'favicon-48'],
  [180, 'apple-touch-icon'],
  [192, 'icon-192'],
  [512, 'icon-512'],
]) {
  const dest = join(ROOT, `assets/favicon/${name}.png`);
  renderPng(faviconSvg, dest, size);
  console.log(`  png  assets/favicon/${name}.png`);
}

// ── 3. Wordmark (stacked) ─────────────────────────────────────────────────────

function wordmarkSvg(ink) {
  // Two lines: MIKE (top) MURPHY (bottom), tight line-height 0.92
  // viewBox sized to content: ~360px wide, ~160px tall
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 360 168" role="img" aria-label="Mike Murphy wordmark">
  ${fontDefs()}
  <text x="0" y="80" font-family="IBM Plex Mono,monospace" font-weight="700" font-size="88"
    letter-spacing="-0.03em" fill="${ink}">MIKE</text>
  <text x="0" y="160" font-family="IBM Plex Mono,monospace" font-weight="700" font-size="88"
    letter-spacing="-0.03em" fill="${ink}">MURPHY</text>
</svg>`;
}

console.log('\nWordmark');
emit(
  wordmarkSvg(T.navy),
  join(ROOT, 'assets/logos/wordmark/wordmark-navy.svg'),
  'wordmark-navy', [400, 800]
);
emit(
  wordmarkSvg(T.cream),
  join(ROOT, 'assets/logos/wordmark/wordmark-cream.svg'),
  'wordmark-cream', [400, 800]
);

// ── 4. Horizontal lockup ──────────────────────────────────────────────────────
// M-disc (60px) + divider + MIKE MURPHY + · AI HANDYMAN eyebrow

function lockupSvg(scheme) {
  // scheme: 'navy' (on light) or 'cream' (on dark)
  const nameInk   = scheme === 'navy' ? T.navy  : T.cream;
  const discInk   = scheme === 'navy' ? T.cream : T.navy;
  const discFill  = scheme === 'navy' ? T.navy  : T.cream;
  const divider   = scheme === 'navy' ? 'rgba(0,30,58,0.2)' : 'rgba(241,236,226,0.3)';
  const eyebrow   = T.orange;

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 560 72" role="img" aria-label="Mike Murphy horizontal lockup">
  ${fontDefs()}
  <!-- M disc -->
  <circle cx="36" cy="36" r="36" fill="${discFill}"/>
  <text x="36" y="36" text-anchor="middle" dominant-baseline="central"
    font-family="IBM Plex Mono,monospace" font-weight="700" font-size="40"
    letter-spacing="-0.02em" fill="${discInk}">M</text>
  <!-- Divider -->
  <rect x="84" y="12" width="1" height="48" fill="${divider}"/>
  <!-- MIKE MURPHY name -->
  <text x="100" y="30" font-family="IBM Plex Mono,monospace" font-weight="700"
    font-size="26" letter-spacing="-0.02em" fill="${nameInk}">MIKE MURPHY</text>
  <!-- · AI HANDYMAN eyebrow -->
  <text x="100" y="56" font-family="IBM Plex Mono,monospace" font-weight="700"
    font-size="12" letter-spacing="0.14em" fill="${eyebrow}">· AI HANDYMAN</text>
</svg>`;
}

console.log('\nHorizontal lockup');
emit(
  lockupSvg('navy'),
  join(ROOT, 'assets/logos/lockup/lockup-horizontal-navy.svg'),
  'lockup-horizontal-navy', [600, 1200]
);
emit(
  lockupSvg('cream'),
  join(ROOT, 'assets/logos/lockup/lockup-horizontal-cream.svg'),
  'lockup-horizontal-cream', [600, 1200]
);

// ── 5. AI Handyman badge ──────────────────────────────────────────────────────
// Orange rect + navy text + navy border + cut-shadow rect

function badgeSvg() {
  // Sized to content: padding 10px/18px, font 14px mono-label
  // viewBox: 200×46 — we'll make it generously sized
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 208 50" role="img" aria-label="AI Handyman badge">
  ${fontDefs()}
  <!-- Cut shadow (offset 4,4) -->
  <rect x="4" y="4" width="200" height="42" fill="${T.navy}"/>
  <!-- Badge body -->
  <rect x="0" y="0" width="200" height="42" fill="${T.orange}" stroke="${T.navy}" stroke-width="1"/>
  <!-- AI HANDYMAN label -->
  <text x="100" y="21" text-anchor="middle" dominant-baseline="central"
    font-family="IBM Plex Mono,monospace" font-weight="700" font-size="14"
    letter-spacing="0.14em" fill="${T.navy}">AI HANDYMAN</text>
</svg>`;
}

console.log('\nAI Handyman badge');
emit(
  badgeSvg(),
  join(ROOT, 'assets/logos/badge/badge-ai-handyman.svg'),
  'badge-ai-handyman', [200, 400]
);

// ── 6. Tagline lockup ─────────────────────────────────────────────────────────
// LEARN · BUILD · MOVE FORWARD — mid-dots in orange

function taglineSvg(textInk) {
  // Three text spans with different fill for the dots
  // viewBox: 720×52
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 720 52" role="img" aria-label="Learn · Build · Move Forward">
  ${fontDefs()}
  <text y="38" font-family="IBM Plex Mono,monospace" font-weight="700" font-size="32"
    letter-spacing="0.14em" fill="${textInk}">
    <tspan>LEARN</tspan><tspan fill="${T.orange}"> · </tspan><tspan>BUILD</tspan><tspan fill="${T.orange}"> · </tspan><tspan>MOVE FORWARD</tspan>
  </text>
</svg>`;
}

console.log('\nTagline');
emit(
  taglineSvg(T.navy),
  join(ROOT, 'assets/logos/tagline/tagline-navy.svg'),
  'tagline-navy', [400, 800]
);
emit(
  taglineSvg(T.cream),
  join(ROOT, 'assets/logos/tagline/tagline-cream.svg'),
  'tagline-cream', [400, 800]
);

// ── 7. Loops & Nodes — re-render PNGs from hand-authored SVGs ─────────────────
// The SVGs in assets/loops-nodes/ are hand-authored, not generated by this
// script. But their PNG exports need to stay in sync with the SVG sources
// (e.g. when a token color changes inside an SVG). This pass walks every SVG
// in that directory and writes a fresh PNG next to it under png/.

/** Render an SVG string to PNG without modifying the SVG (works for files
 *  that already have width/height attributes set). Uses Resvg's fitTo. */
function renderPngFromSvgFile(svgStr, dest, outputWidth) {
  const resvg = new Resvg(svgStr, {
    font: { loadSystemFonts: false, fontBuffers: [fontBold] },
    fitTo: { mode: 'width', value: outputWidth },
  });
  const png = resvg.render().asPng();
  mkdirSync(dirname(dest), { recursive: true });
  writeFileSync(dest, png);
}

function renderLoopsNodesPngs() {
  const dir = join(ROOT, 'assets/loops-nodes');
  const files = readdirSync(dir).filter((f) => f.endsWith('.svg'));
  for (const f of files) {
    const svgStr = readFileSync(join(dir, f), 'utf8');
    const widthAttr = svgStr.match(/<svg[^>]*\bwidth="(\d+)"/);
    const viewBox = svgStr.match(/viewBox="0 0 ([\d.]+)/);
    const native = widthAttr
      ? parseInt(widthAttr[1], 10)
      : viewBox
        ? Math.round(parseFloat(viewBox[1]))
        : 512;
    // Render at 2× native for retina-quality PNG.
    const pngDest = join(dir, 'png', basename(f, '.svg') + '.png');
    renderPngFromSvgFile(svgStr, pngDest, native * 2);
    console.log(`  png  ${pngDest.replace(ROOT + '/', '')}`);
  }
}

console.log('\nLoops & Nodes (re-rendered PNGs from hand-authored SVGs)');
renderLoopsNodesPngs();

console.log('\n✓ All assets generated.\n');
