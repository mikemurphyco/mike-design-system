#!/usr/bin/env node
// Portable snapshots are derived from canon. No dependencies or network access.
import { readFileSync, readdirSync, lstatSync, mkdirSync, writeFileSync, existsSync, realpathSync, mkdtempSync, renameSync, rmSync } from 'node:fs';
import { resolve, dirname, join, relative, extname, sep } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createHash } from 'node:crypto';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const hash = data => createHash('sha256').update(data).digest('hex');
const json = value => Buffer.from(JSON.stringify(value, null, 2) + '\n');
const args = process.argv.slice(2);
if (args.includes('--help')) {
  console.log('Usage: node scripts/export-portable.mjs [--to <project-directory>]\nDefault: dist/portable. --to writes only <project-directory>/design-system.');
  process.exit(0);
}
if (args.length && (args.length !== 2 || args[0] !== '--to' || !args[1])) throw new Error('Use --help for usage.');
const target = args.length ? join(resolve(args[1]), 'design-system') : join(root, 'dist/portable');
// Resolve existing ancestors so a symlink cannot route a refresh into canon.
function physical(path) {
  return existsSync(path) ? realpathSync(path) : join(physical(dirname(path)), path.slice(dirname(path).length + 1));
}
const actual = physical(target);
if (actual === root || root.startsWith(actual + sep) || (actual.startsWith(root + sep) && actual !== join(root, 'dist/portable'))) {
  throw new Error('Destination must be outside canon (except dist/portable).');
}
if (existsSync(target) && lstatSync(target).isSymbolicLink()) throw new Error('Destination cannot be a symlink.');

const files = new Map();
const copy = name => files.set(name, readFileSync(join(root, name)));
const css = readFileSync(join(root, 'tokens/colors_and_type.css'), 'utf8');
const clean = css.replace(/\/\*[\s\S]*?\*\//g, '');
const blocks = [...clean.matchAll(/:root\s*\{([^}]+)\}/g)];
if (blocks.length !== 1) throw new Error('Expected one canonical :root token block; review exporter for new CSS structure.');
const values = {};
for (const [, name, value] of blocks[0][1].matchAll(/(--[\w-]+)\s*:\s*([^;]+);/g)) {
  if (name in values) throw new Error(`Duplicate token: ${name}`);
  values[name] = value.trim();
}
if (!Object.keys(values).length) throw new Error('No tokens found.');
function resolved(name, stack = []) {
  if (!(name in values) || stack.includes(name)) throw new Error(`Missing or cyclic token: ${name}`);
  return values[name].replace(/var\((--[\w-]+)\)/g, (_, ref) => resolved(ref, [...stack, name]));
}
const version = JSON.parse(readFileSync(join(root, 'package.json'), 'utf8')).version;
files.set('tokens.json', json({
  schemaVersion: 1, name: 'mike-design-system', version,
  source: 'tokens/colors_and_type.css',
  description: 'CSS custom-property names with raw and resolved CSS string values. Default light theme; not DTCG format. Numeric dimensions retain units.',
  tokens: Object.fromEntries(Object.keys(values).map(name => [name, { value: values[name], resolved: resolved(name) }]))
}));
copy('tokens/colors_and_type.css');
for (const doc of ['BRAND-CANON.md', 'DESIGN.md', 'SYSTEM.md', 'CLAUDE.md', 'design-system.html']) copy(doc);
// Runtime assets only; large editable PSDs, scratch HTML and hidden files stay in canon.
const extensions = new Set(['.svg', '.png', '.jpg', '.jpeg', '.webp', '.ttf', '.otf', '.woff', '.woff2', '.txt', '.md']);
function collect(directory, filter) {
  for (const entry of readdirSync(join(root, directory), { withFileTypes: true })) {
    if (entry.name.startsWith('.')) continue;
    const name = directory + '/' + entry.name;
    if (entry.isSymbolicLink()) throw new Error(`Source symlink is not portable: ${name}`);
    if (entry.isDirectory()) collect(name, filter);
    else if (filter(name)) copy(name);
  }
}
collect('assets', name => extensions.has(extname(name).toLowerCase()));
collect('ui_kits', () => true);
files.set('README.md', Buffer.from(`# Portable Mike Murphy design system

Generated snapshot of the canonical mike-design-system repository. Edit the original system and export again; do not edit this folder.

- Link \`tokens/colors_and_type.css\` for styles and bundled local fonts.
- Read \`tokens.json\` for tools that need token values without CSS. Keys match CSS names; \`value\` preserves aliases and \`resolved\` expands them. Values are strings with their CSS units. This is a small custom JSON interface, not DTCG.
- Use relative paths into \`assets/\` for logos, fonts, avatars and Agent Evergreen artwork.
- Read \`BRAND-CANON.md\` for brand rules and \`DESIGN.md\` for component specifications. \`design-system.html\` and \`ui_kits/\` are visual references.
- \`SYSTEM.md\` and \`CLAUDE.md\` describe the source repository: maintenance scripts and templates mentioned there remain in canon. Reusable templates are intentionally not bundled.
- The CSS defines the default light theme. This bundle does not add a dark-theme implementation.
- \`manifest.json\` records the version and SHA-256 of every bundled file. Refresh refuses local changes or unrecognized files; move custom work into your project's projects folder first.

The whole folder can be copied elsewhere without npm, symlinks, or the canonical repository. Keep its internal paths together. No refresh process touches sibling projects or exports folders.
`));
const manifest = { schemaVersion: 1, name: 'mike-design-system-portable', version, files: Object.fromEntries([...files].sort(([a], [b]) => a.localeCompare(b)).map(([name, data]) => [name, hash(data)])) };

// Verify the entire destination before any writes. Never discard unknown work.
if (existsSync(target)) {
  const names = readdirSync(target).filter(name => name !== '.DS_Store');
  if (names.length) {
    const path = join(target, 'manifest.json');
    if (!existsSync(path)) throw new Error('Destination is not an exported bundle; refusing to replace it.');
    const prior = JSON.parse(readFileSync(path, 'utf8'));
    if (prior.name !== manifest.name || prior.schemaVersion !== 1 || !prior.files) throw new Error('Unrecognized destination manifest.');
    const seen = new Set();
    function verify(directory) {
      for (const entry of readdirSync(directory, { withFileTypes: true })) {
        const path = join(directory, entry.name);
        const name = relative(target, path).split(sep).join('/');
        if (entry.isSymbolicLink()) throw new Error(`Local symlink: ${name}`);
        if (entry.isDirectory()) verify(path);
        else if (name !== 'manifest.json' && entry.name !== '.DS_Store') {
          if (prior.files[name] !== hash(readFileSync(path))) throw new Error(`Local change or extra file: ${name}. Move it out before refreshing.`);
          seen.add(name);
        }
      }
    }
    verify(target);
    for (const name of Object.keys(prior.files)) if (!seen.has(name)) throw new Error(`Locally deleted file: ${name}. Restore it before refreshing.`);
  }
}
mkdirSync(dirname(target), { recursive: true });
const stage = mkdtempSync(join(dirname(target), '.portable-stage-'));
let backup;
try {
  for (const [name, data] of files) {
    mkdirSync(dirname(join(stage, name)), { recursive: true });
    writeFileSync(join(stage, name), data);
  }
  writeFileSync(join(stage, 'manifest.json'), json(manifest));
  if (existsSync(target)) {
    backup = mkdtempSync(join(dirname(target), '.portable-backup-'));
    renameSync(target, join(backup, 'previous'));
  }
  try { renameSync(stage, target); }
  catch (error) {
    if (backup) renameSync(join(backup, 'previous'), target);
    throw error;
  }
  if (backup) rmSync(backup, { recursive: true });
} finally {
  rmSync(stage, { recursive: true, force: true });
}
console.log(`Exported ${files.size} files, ${Object.keys(values).length} tokens (${version}) to ${target}`);
