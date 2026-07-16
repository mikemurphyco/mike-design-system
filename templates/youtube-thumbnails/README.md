# YouTube Thumbnails

Seven brand-consistent thumbnail variants for Mike Murphy · AI Handyman. One gallery file to rule them all.

`v2026.4`

## How to open

Open `index.html` with Live Server in VS Code. The `.vscode/settings.json` at the repo root sets Live Server's root to `/` so fonts and images load correctly.

Do not open individual `youtube-thumbnail-*/index.html` files directly — they depend on external CSS and font paths that only work when served from the repo root.

## Making a thumbnail

1. Open `index.html` in Live Server
2. Click the variant tab that fits the video
3. Type into the sidebar fields — the preview updates live
4. Hit **Export PNG** for a quick browser-rendered PNG at 1280×720

For a production-crisp render (Playwright, 2× scale, fonts guaranteed):

```
npm run thumbnail:<variant>
```

Output lands in `outputs/` at the repo root (gitignored).

## Variants

| Tab | npm script | Best for |
|-----|-----------|----------|
| V1 · Classic Light | `npm run thumbnail` | Default — general tutorials, reach for this first |
| V2 · Classic Dark | `npm run thumbnail:dark` | Heavier topics, "deep dive" videos |
| V3 · Vertical Split | `npm run thumbnail:split` | Before/after, comparisons |
| V4 · Mike Cutout | `npm run thumbnail:cutout` | Personality videos, opinion pieces |
| V5 · Orange Full-Bleed | `npm run thumbnail:orange` | Launches, announcements — use sparingly |
| V6 · Topic Tile | `npm run thumbnail:tile` | Tool-specific tutorials with a clean 1-char icon (M, C, $, etc.) |
| V7 · Terminal | `npm run thumbnail:terminal` | CLI and dev-focused tutorials |

## One-shot render (skip all prompts)

Pass every field as a flag:

```bash
npm run thumbnail:tile -- \
  --eyebrow "VPS HOSTING" \
  --headline1 "$5 servers," \
  --headline2 "fully yours." \
  --lede "One command. Your own private cloud." \
  --topic "$" \
  --out "hostinger-vps"
```

Any flag you omit will be asked at the prompt, defaulting to the template's example values.

## Editing a variant's layout

All variant markup and styles live in `index.html`. Edit the relevant `#thumb-<name>` block for structure, the matching CSS block for layout, and the sidebar panel with the same `data-variant` value for defaults.

## Adding a new variant

1. In `index.html`: add a tab to the tab strip, a sidebar editor panel, and a `#thumb-<name>` canvas block — follow the pattern of any existing variant
2. In `scripts/render-thumbnail.mjs`: add an entry to the `VARIANTS` map and the `PREFIX` map
3. Add `"thumbnail:<name>": "node templates/youtube-thumbnails/scripts/render-thumbnail.mjs --template youtube-thumbnail-<name>"` to `package.json`

## Why Live Server stopped working (before the fix)

Live Server defaults its root to the folder of the open file. Opening `youtube-thumbnail-terminal/index.html` directly made `../../tokens/colors_and_type.css` resolve outside the server scope — 404 on the CSS and all fonts. The `.vscode/settings.json` at the repo root fixes this permanently by setting `"liveServer.settings.root": "/"`.

## File map

```
templates/youtube-thumbnails/
├── index.html                        ← all 7 variants — open this in Live Server
├── README.md                         ← you are here
└── scripts/
    └── render-thumbnail.mjs          ← Playwright render script (reads index.html)
```

Outputs go to `outputs/` at the repo root — gitignored, regenerate anytime.
