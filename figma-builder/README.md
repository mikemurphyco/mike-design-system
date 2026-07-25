# MM Design System Builder

A one-shot local Figma plugin that builds the entire Mike Murphy / AI Handyman v2026.5 design system into your current Figma file — variables, text styles, and all 16 reference frames. No Figma MCP calls, no quota.

## How to run it (one time, ~2 minutes)

1. Open the Figma desktop app (Plugins > Development requires desktop).
2. Open the design system file: https://www.figma.com/design/Si7oPqgaLSnPY8oITl4hiY
3. From the menu: **Plugins → Development → Import plugin from manifest…**
4. Select `figma-builder/manifest.json` in this repo.
5. From the menu: **Plugins → Development → MM Design System Builder**.
6. Wait a few seconds. You'll see a "Design system built ✓" toast and the viewport zooms to the new content.

## What it does

- Ensures the variable collection `Mike Murphy v2026.5` exists with all primitive colors, semantic aliases, spacing, radii, font-size, line-height, and letter-spacing tokens.
- Ensures all 11 text styles exist (Display, H1–H3, Lede, Body, Eyebrow, Mono Label, Code, Tagline, Handwritten).
- Creates (or replaces) the page **Foundations & Components** containing 16 reference frames stacked vertically — cover, palettes, typography specimens, tagline, spacing, radii, shadows, motion, marks, badge, polaroid, components, brand rules, NOT list, footer. The reference frames use resolved paint values so they render visibly even if Figma variable binding acts up in a local file.

It's idempotent. Run it again and it'll wipe just the outer frame and rebuild — variables and text styles are reused.

## Fonts

Plex Mono and Plex Sans are preferred (free on Google Fonts — install once, restart Figma). If Figma can't render them, the builder falls back to available fonts such as Inter/Roboto Mono so the reference frames are still visible. Murphydoodle is custom — if Figma can't find it, the builder falls back to Caveat, then Inter.

## After it runs

- Drop the real AI Handyman badge SVG into frame 11 from `assets/logos/badge/badge-ai-handyman.svg`. The builder uses a placeholder.
- Drop a real photo into the polaroid frame.
- That's it. Use the variables and text styles for any new design work in this file.

## When to re-run

Re-run the plugin any time the brand canon changes. It rebuilds the frames; existing variables and text styles get updated property values where applicable.
