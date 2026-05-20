import { Resvg } from '@resvg/resvg-js';
import { readFileSync, writeFileSync, existsSync } from 'fs';
import { basename } from 'path';

const files = [
  './outputs/GumRoad-audit/gumroad-website-health-audit-header.svg',
  './outputs/GumRoad-audit/gumroad-website-health-audit-thumbnail.svg',
];
for (const svgPath of files) {
  if (!existsSync(svgPath)) { console.log(`skip ${svgPath}`); continue; }
  const svg = readFileSync(svgPath, 'utf-8');
  const vbMatch = svg.match(/viewBox="0 0 ([\d.]+) ([\d.]+)"/);
  if (!vbMatch) { console.log(`no viewBox: ${svgPath}`); continue; }
  const [, vw] = vbMatch;
  const r = new Resvg(svg, {
    fitTo: { mode: 'width', value: parseFloat(vw) },
    font: { fontDirs: ['./assets/fonts'], loadSystemFonts: false, defaultFontFamily: 'IBM Plex Mono' },
    background: '#F1ECE2'
  });
  const pngPath = svgPath.replace(/\.svg$/, '.png');
  writeFileSync(pngPath, r.render().asPng());
  console.log(`  ✓ ${pngPath}`);
}
