# Mike Murphy · AI Handyman — Design System v2026.5

The locked design system for [mikemurphy.co](https://mikemurphy.co) and the AI Handyman content brand.

## What's in this project

| File | What it is |
|---|---|
| `START-HERE.md` | Human operating guide — what is safe to touch, what scripts do, and how to recover when things feel confusing. |
| `BRAND-CANON.md` | The locked brand canon. Source of truth — values, copy patterns, tagline, NOT list. |
| `CLAUDE.md` | Working pattern, hard rules, and NOT list for anyone (or anything) generating in the brand. Loaded automatically in Claude sessions. |
| `SYSTEM.md` | Operational guide: read order, file map, component decision tree, layout vocabulary. Start here for any brand task. |
| `DESIGN.md` | Full spec — every token in YAML, every component in prose. The reference manual. |
| `tokens/colors_and_type.css` | Token layer: brand + semantic + scales. All components consume only the semantic layer. |
| `design-system.html` | The system itself, end-to-end: foundations, identity, components, applications, dark mode, footer. |
| `ui_kits/website/` | Clickable UI kit for the marketing site. Home → Tutorials list → Tutorial detail → Newsletter → About. |
| `fonts/` | Self-hosted IBM Plex Mono, IBM Plex Sans, and Murphydoodle. |
| `assets/loops/` | Loop mark SVGs and PNGs — primary logo symbol in brand color variants. |
| `assets/nodes/` | Node mark SVGs and PNGs — system/motion asset variants. |
| `assets/logos/` | Wordmark, horizontal lockup, M-mark, AI Handyman badge, tagline lockups. |
| `assets/avatars/` | Mike avatars — orange-bg, transparent cutout. |
| `assets/favicon/` | Favicon and app icon set. |
| `z_legacy/` | Archived previous-version files. Reference only — not part of the live system. |

## How to use it

1. Read `START-HERE.md` if you want the human map: what is safe to touch, what scripts do, and how to recover.
2. Read `BRAND-CANON.md` when you need the locked rules.
3. Read `SYSTEM.md` for the operational guide — file map, decision tree, layout vocabulary.
4. Open `design-system.html` to see the rendered system.
5. Open `ui_kits/website/index.html` to see the system applied to a real product surface.
6. To build something new on the brand: start with `<link rel="stylesheet" href="tokens/colors_and_type.css">` and consume only semantic tokens (`--color-*`, `--font-*`, `--space-*`, `--radius-*`, `--shadow-*`).

## Locked decisions (canon)

- **Cream** `#F1ECE2` · **Chalk** `#FCFAF6` · **Navy** `#001E3A` · **Orange** `#FF6434` · **Orange-deep** `#E8501C` (hover only) · **Yellow** `#F5C842` (success chips only) · **Teal** `#1ECEBE` (AI accent only)
- **Type:** IBM Plex Mono Bold (display, UI, code) · IBM Plex Sans (body) · Murphydoodle (polaroid caption only)
- **Tagline:** `LEARN · BUILD · MOVE FORWARD` — mid-dots in orange on light, navy on orange. No periods. No alternative wording.
- **AI Handyman badge** tags content (cards, intro/end screens, hero), never chrome (nav, footer).
- **Cut-shadow stamp** (4×4 navy offset) lives on cards, code blocks, inputs, and primary buttons. Never on chrome.
- **Teal is rationed** to one element per screen — the "AI pop."

## What's deliberately out

Cartoon Mike. Toolshed metaphors. Washi tape and hand-drawn arrows. Unplugged Sans. `LEARN. CREATE. MOVE FORWARD.` — none of these come back, regardless of how charming they look in old screenshots.

## Versioning

Current: **v2026.5**. Stamped in the design-system footer and on every tutorial detail page.

## Portable use and design sandbox

This repository remains canonical. Use `mike-design-sandbox/projects/` for editable graphics and experiments, and `mike-design-sandbox/exports/` for finished files. See the [sandbox guide](../mike-design-sandbox/README.md).

With Node.js installed (verified with Node 26), open Terminal in this repository and run:

```bash
npm run portable -- --to /Users/mikemurphy/Code/Projects/mike-design-sandbox
```

No dependency installation is needed. The command creates or refreshes only the destination's `design-system/` folder. It bundles generated `tokens.json`, canonical CSS, local fonts, runtime assets, brand docs, visual references, and a file-hash manifest. PSD source files, templates, dependencies, and rendered outputs stay in canon.

Use the same command after changing the canonical system. Refresh stops if the previous bundle contains local edits, missing files, or extra files; move custom work outside it or restore the affected file before retrying. Projects and exports are never refreshed or deleted. Existing projects that link the shared CSS will use the updated tokens on their next render; already-exported images stay unchanged.

### Use it in another directory

Choose either method below. Portable copies are snapshots: they do not update automatically when canon changes.

**Generate the latest copy directly in another project (recommended).** From this repository, run the following, replacing `/path/to/another-project` with your destination:

```bash
npm run portable -- --to /path/to/another-project
```

This creates or refreshes `another-project/design-system/` from the current canonical source. It does not use the existing `dist/portable/` copy.

**Copy the local bundle.** A generated copy lives at `mike-design-system/dist/portable/`. To create or refresh that local copy, run from this repository:

```bash
npm run portable
```

Then copy the whole `dist/portable/` folder into another project and rename the copied folder `design-system/`. Its relative paths work without access to this repository. The local bundle is gitignored, so a fresh clone needs `npm run portable` before there is a bundle to copy.

Refreshing the local bundle does not refresh copies already placed elsewhere. Run the destination command again for each copy you want to update.

Read the generated `README.md` for the JSON interface. To remove a portable copy, remove only its `design-system/` folder after checking that no projects still need it.
