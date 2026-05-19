import { Resvg } from '@resvg/resvg-js';
import { readFileSync, writeFileSync, existsSync, readdirSync, statSync } from 'fs';
import { join, dirname, basename, extname } from 'path';

const FONT_DIR = './assets/fonts';

function renderToPng(svgPath, pngPath, width) {
  const svg = readFileSync(svgPath, 'utf-8');
  // Inject explicit width into the svg root tag
  const vbMatch = svg.match(/viewBox="0 0 ([\d.]+) ([\d.]+)"/);
  if (!vbMatch) { console.log(`  skip (no viewBox): ${svgPath}`); return; }
  const [, vw, vh] = vbMatch;
  const h = Math.round(width * (parseFloat(vh) / parseFloat(vw)));
  const r = new Resvg(svg, {
    fitTo: { mode: 'width', value: width },
    font: { fontDirs: [FONT_DIR], loadSystemFonts: false, defaultFontFamily: 'IBM Plex Mono' }
  });
  writeFileSync(pngPath, r.render().asPng());
  console.log(`  ✓ ${pngPath} (${width}×${h})`);
}

// SVG → PNG map (path, [sizes])
const jobs = [
  // M-mark
  ['assets/logos/m-mark/m-mark-navy.svg',   [32, 64, 180, 400, 800]],
  ['assets/logos/m-mark/m-mark-cream.svg',  [32, 64, 180, 400, 800]],
  ['assets/logos/m-mark/m-mark-orange.svg', [32, 64, 180, 400, 800]],
  // Wordmark
  ['assets/logos/wordmark/wordmark-navy.svg',  [400, 800]],
  ['assets/logos/wordmark/wordmark-cream.svg', [400, 800]],
  // Lockup
  ['assets/logos/lockup/lockup-horizontal-navy.svg',  [600, 1200]],
  ['assets/logos/lockup/lockup-horizontal-cream.svg', [600, 1200]],
  // Tagline
  ['assets/logos/tagline/tagline-navy.svg',  [400, 800]],
  ['assets/logos/tagline/tagline-cream.svg', [400, 800]],
  // Badge
  ['assets/logos/badge/badge-ai-handyman.svg', [200, 400]],
  // Loops-nodes pre-existing combined art
  ['assets/loops-nodes/lockup-loop.svg',     [800]],
  ['assets/loops-nodes/lockup-loop-ai.svg',  [800]],
];

for (const [svgPath, sizes] of jobs) {
  if (!existsSync(svgPath)) { console.log(`  miss (no svg): ${svgPath}`); continue; }
  console.log(`\n${svgPath}`);
  const base = basename(svgPath, '.svg');
  const pngDir = join(dirname(svgPath), 'png');
  for (const size of sizes) {
    const pngPath = join(pngDir, `${base}-${size}.png`);
    if (!existsSync(pngPath)) {
      // also try the unsized name for files without size suffix
      const alt = join(pngDir, `${base}.png`);
      if (existsSync(alt) && sizes.length === 1) { renderToPng(svgPath, alt, size); continue; }
      console.log(`  skip (no existing png to replace): ${pngPath}`);
      continue;
    }
    renderToPng(svgPath, pngPath, size);
  }
}

// Favicon set — derived from m-mark-navy.svg
console.log('\nFavicon set');
const faviconSvg = 'assets/logos/m-mark/m-mark-navy.svg';
const faviconJobs = [
  [16,  'assets/favicon/favicon-16.png'],
  [32,  'assets/favicon/favicon-32.png'],
  [48,  'assets/favicon/favicon-48.png'],
  [180, 'assets/favicon/apple-touch-icon.png'],
  [192, 'assets/favicon/icon-192.png'],
  [512, 'assets/favicon/icon-512.png'],
];
for (const [size, path] of faviconJobs) {
  if (!existsSync(path)) { console.log(`  skip (no existing): ${path}`); continue; }
  renderToPng(faviconSvg, path, size);
}

console.log('\nDone.');
