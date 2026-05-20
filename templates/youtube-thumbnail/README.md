# YouTube thumbnail template

A working 1280×720 thumbnail template that consumes the AI Handyman brand system. Edit the fields, render the PNG, ship.

`v2026.3`

## Export workflow

Run from the repo root:

```bash
cd ~/Code/Projects/mike-design-system
npm run thumbnail
```

The script will prompt you for each field, with sensible defaults shown in `[brackets]` — just hit Enter to keep a default, or type a new value:

```
Mike Murphy · YouTube thumbnail render
────────────────────────────────────
  Eyebrow [TUTORIAL · 04 OF 09]: HOSTINGER VPS · AI CHAT
  Headline line 1 [Your first MCP,]: TAILSCALE
  Headline line 2 (or blank) [made simple.]: OLLAMA · OPEN WEB UI
  Lede [12 minutes. One file. A working server.]: Private & Free AI on all of your devices 24/7.
  Output filename [tailscale]: tailscale-ollama

Rendering @ 2560×1440...

✓ outputs/tailscale-ollama.png
  2560×1440, scale=2
  open: open "/Users/mikemurphy/Code/Projects/mike-design-system/outputs/tailscale-ollama.png"
```

The PNG is written to `outputs/<slug>.png` (gitignored — outputs don't live in the repo, see `SYSTEM.md` factory model). Copy that path with the `open` command shown to view the file.

### Output sizes

| `--scale` | Output dimensions | Use for |
|---|---|---|
| `1` | 1280×720 | Standard YouTube — smaller file, fine for most uploads |
| `2` *(default)* | 2560×1440 | Retina-crisp upload — recommended for production |
| `3` | 3840×2160 | Overkill, but available if you want maximum resolution |

To use a non-default scale, pass `--scale` as a flag — even with the interactive prompt:

```bash
npm run thumbnail -- --scale 1
```

### One-shot mode (for scripts / repeat exports)

Skip the prompt and pass every value as a flag. Useful when you're scripting a batch or re-running an export with known content:

```bash
npm run thumbnail -- \
  --eyebrow   "HOSTINGER VPS · AI CHAT" \
  --headline1 "TAILSCALE" \
  --headline2 "OLLAMA · OPEN WEB UI" \
  --lede      "Private & Free AI on all of your devices 24/7." \
  --out       "tailscale-ollama" \
  --scale     2
```

Any flag you omit will fall back to the interactive prompt.

## Live preview in the browser

For iteration and design tweaks, open `templates/youtube-thumbnail/index.html` in Chrome and edit the fields in the editor panel at the top. The canvas updates as you type.

Browser is for **previewing only** right now — use `npm run thumbnail` for the production PNG. Chrome's "Capture node screenshot" is producing soft/muddy colors for this template (open question, not a template problem; track separately). CleanShot X works for ad-hoc grabs but is not a production pipeline.

## What's in the template

- **AI Handyman badge** — top-left. Locked navy text on orange ground, 1px navy border, navy cut-shadow. Required on every thumbnail.
- **Eyebrow** — orange mono caps. Use for "Tutorial · 04 of 09" or similar content marker.
- **Headline** — large mono bold, navy. Up to two lines. Sentence case reads warmer than ALL CAPS at this size.
- **Lede** — sans-serif, navy at 70%. One short line. The "what you'll actually get" promise.
- **Tagline** — `LEARN · BUILD · MOVE FORWARD` at the bottom-left. Locked.
- **Mike polaroid** — right side, tilted, cut-shadow. The personal anchor.
- **No version stamp.** YouTube thumbnails are shipped outputs, not canon docs. Per `BRAND-CANON.md` ("Stamp"), version stamps live on canon docs only. The AI Handyman badge and Mike's face already identify the work.

## Customizing

- **Swap Mike asset**: edit the `<img src=...>` inside `.polaroid-photo`. When the illustrated character library exists, this is the slot to swap into.
- **Tweak layout**: the canvas uses CSS grid. Edit `#thumbnail` in the `<style>` block.
- **Add a topic pill / extra element**: lift the relevant component from `design-system.html` (Section 08) and drop it into the canvas.

## What not to change

- The 1280×720 canvas size (YouTube standard).
- The badge colors (locked: navy text on orange ground).
- The tagline wording or mid-dot separators.
- The polaroid orange photo background or Murphydoodle "Mike" caption.

If any of those need to change, the canon (`BRAND-CANON.md`) needs to change first.

## Next templates to build

- Podcast cover art (1400×1400)
- Newsletter header (600×200 or 1200×400)
- X/LinkedIn link card (1200×630)
- Tutorial end screen (1920×1080, video aspect)

Each one is a new folder next to this one, same pattern: one HTML file, locked layout, editable text slots, render via a sibling `npm run thumbnail`-style script. The Playwright render pipeline is reusable — copy `scripts/render-thumbnail.mjs` as a starting point and point it at the new template.
