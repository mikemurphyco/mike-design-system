import { Resvg } from '@resvg/resvg-js';
import { readFileSync, writeFileSync } from 'node:fs';
const svg = readFileSync('./outputs/_banner-001E3A.svg', 'utf-8');
const r = new Resvg(svg, {
  fitTo: { mode: 'width', value: 1500 },
  font: { fontDirs: ['./assets/fonts'], loadSystemFonts: false, defaultFontFamily: 'IBM Plex Mono' },
  background: '#F1ECE2'
});
writeFileSync('./outputs/_banner-001E3A.png', r.render().asPng());
console.log('done');
