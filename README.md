# Mike Murphy · AI Handyman — Design System v2026.2

The locked design system for [mikemurphy.co](https://mikemurphy.co) and the AI Handyman content brand.

## What's in this project

| File | What it is |
|---|---|
| `BRAND-CANON.md` | The locked brand canon. Source of truth — values, copy patterns, tagline, NOT list. |
| `CLAUDE.md` | Working pattern, hard rules, and NOT list for anyone (or anything) generating in the brand. Loaded automatically in Claude sessions. |
| `SYSTEM.md` | Operational guide: read order, file map, component decision tree, layout vocabulary. Start here for any brand task. |
| `DESIGN.md` | Full spec — every token in YAML, every component in prose. The reference manual. |
| `tokens/colors_and_type.css` | Token layer: brand + semantic + scales. All components consume only the semantic layer. |
| `design-system.html` | The system itself, end-to-end: foundations, identity, components, applications, dark mode, footer. |
| `ui_kits/website/` | Clickable UI kit for the marketing site. Home → Tutorials list → Tutorial detail → Newsletter → About. |
| `fonts/` | Self-hosted IBM Plex Mono, IBM Plex Sans, and Murphydoodle. |
| `assets/loops-nodes/` | Loop and Node SVGs — all sizes and surface variants. Production-ready. |
| `assets/logos/` | Wordmark, horizontal lockup, M-mark, AI Handyman badge, tagline lockups. |
| `assets/avatars/` | Mike avatars — orange-bg, transparent cutout. |
| `assets/favicon/` | Favicon and app icon set. |
| `z_legacy/` | Archived previous-version files. Reference only — not part of the live system. |

## How to use it

1. Read `BRAND-CANON.md` first. It's short and load-bearing.
2. Read `SYSTEM.md` for the operational guide — file map, decision tree, layout vocabulary.
3. Open `design-system.html` to see the rendered system.
4. Open `ui_kits/website/index.html` to see the system applied to a real product surface.
5. To build something new on the brand: start with `<link rel="stylesheet" href="tokens/colors_and_type.css">` and consume only semantic tokens (`--color-*`, `--font-*`, `--space-*`, `--radius-*`, `--shadow-*`).

## Locked decisions (canon)

- **Cream** `#F1ECE2` · **Chalk** `#FCFAF6` · **Navy** `#001E3A` · **Orange** `#FF6434` · **Orange-deep** `#E8501C` (hover only) · **Yellow** `#F5C842` (badge only) · **Teal** `#1ECEBE` (AI accent only)
- **Type:** IBM Plex Mono Bold (display, UI, code) · IBM Plex Sans (body) · Murphydoodle (polaroid caption only)
- **Tagline:** `LEARN · BUILD · MOVE FORWARD` — mid-dots in orange on light, navy on orange. No periods. No alternative wording.
- **AI Handyman badge** tags content (cards, intro/end screens, hero), never chrome (nav, footer).
- **Cut-shadow stamp** (4×4 navy offset) lives on cards, code blocks, inputs, and primary buttons. Never on chrome.
- **Teal is rationed** to one element per screen — the "AI pop."

## What's deliberately out

Cartoon Mike. Toolshed metaphors. Washi tape and hand-drawn arrows. Unplugged Sans. `LEARN. CREATE. MOVE FORWARD.` — none of these come back, regardless of how charming they look in old screenshots.

## Versioning

Current: **v2026.2**. Stamped in the design-system footer and on every tutorial detail page.
