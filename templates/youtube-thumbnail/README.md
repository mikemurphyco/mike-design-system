# YouTube thumbnail template

A working 1280×720 thumbnail template that consumes the AI Handyman brand system. Edit the fields, screenshot the canvas, ship the PNG.

`v2026.2`

## Workflow

1. Open `index.html` in Chrome (double-click works).
2. Edit the eyebrow, headline, and lede in the editor panel at the top of the page.
3. Open DevTools (`Cmd-Opt-I`), find the `#thumbnail` node in the Elements panel, right-click → **Capture node screenshot**.
4. PNG saves to your Downloads. Upload to YouTube.

The export is exactly 1280×720 (or 2560×1440 on Retina — both fine for YouTube).

## What's in the template

- **AI Handyman badge** — top-left. Locked yellow on orange, navy cut-shadow. Required on every thumbnail.
- **Eyebrow** — orange mono caps. Use for "Tutorial · 04 of 09" or similar content marker.
- **Headline** — large mono bold, navy. Up to two lines. Sentence case reads warmer than ALL CAPS at this size.
- **Lede** — sans-serif, navy at 70%. One short line. The "what you'll actually get" promise.
- **Tagline** — `LEARN · BUILD · MOVE FORWARD` at the bottom-left. Locked.
- **Mike polaroid** — right side, tilted, cut-shadow. The personal anchor.
- **Version stamp** — `v2026.2` bottom-right. Easy to delete if it crowds the duration badge.

## Customizing

- **Swap Mike asset**: edit the `<img src=...>` inside `.polaroid-photo`. When the illustrated character library exists, this is the slot to swap into.
- **Tweak layout**: the canvas uses CSS grid. Edit `#thumbnail` in the `<style>` block.
- **Add a topic pill / extra element**: lift the relevant component from `design-system.html` (Section 08) and drop it into the canvas.

## What not to change

- The 1280×720 canvas size (YouTube standard).
- The badge colors (locked: yellow on orange).
- The tagline wording or mid-dot separators.
- The polaroid orange photo background or Murphydoodle "Mike" caption.

If any of those need to change, the canon (`BRAND-CANON.md`) needs to change first.

## Known wrinkles

- `tokens/colors_and_type.css` has broken `@font-face` paths (looks for fonts at `tokens/fonts/`, which doesn't exist). This template sidesteps that by inlining its own `@font-face` declarations pointing at the root `fonts/` folder.
- Chrome's "Capture node screenshot" respects the node's CSS dimensions regardless of browser zoom level — you don't need to zoom to 100% before exporting.

## Next templates to build

- Podcast cover art (1400×1400)
- Newsletter header (600×200 or 1200×400)
- X/LinkedIn link card (1200×630)
- Tutorial end screen (1920×1080, video aspect)

Each one is a new folder next to this one, same pattern: one HTML file, locked layout, editable text slots, screenshot to export.
