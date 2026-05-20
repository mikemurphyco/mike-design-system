import { Resvg } from '@resvg/resvg-js';
import { readFileSync, writeFileSync } from 'fs';
const svg = readFileSync('./outputs/Medium-profile/medium-profile-banner.svg', 'utf-8');
const r = new Resvg(svg, {
  fitTo: { mode: 'width', value: 1500 },
  font: { fontDirs: ['./assets/fonts'], loadSystemFonts: false, defaultFontFamily: 'IBM Plex Mono' },
  background: '#F1ECE2'
});
writeFileSync('./outputs/Medium-profile/medium-profile-banner.png', r.render().asPng());
console.log('PNG rendered');
