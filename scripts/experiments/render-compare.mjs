import { Resvg } from '@resvg/resvg-js';
import { readFileSync, writeFileSync } from 'node:fs';
const svg = readFileSync('./outputs/_navy-comparison.svg', 'utf-8');
const resvg = new Resvg(svg, {
  fitTo: { mode: 'width', value: 1500 },
  font: { fontDirs: ['./assets/fonts'], loadSystemFonts: false, defaultFontFamily: 'IBM Plex Mono' },
  background: '#F1ECE2'
});
writeFileSync('./outputs/_navy-comparison.png', resvg.render().asPng());
console.log('done');
