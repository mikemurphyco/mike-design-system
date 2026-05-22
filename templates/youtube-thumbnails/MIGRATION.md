# Migration — adding the 6 new thumbnail variants to your design-system repo

This folder contains everything you need to drop into `~/Code/Projects/mike-design-system`. After the steps below, you'll have 7 templates (your original + 6 new) and 7 `npm run` commands for them.

## What's here

```
handoff/
├─ MIGRATION.md                                    ← this file
├─ scripts/
│   └─ render-thumbnail.mjs                        ← reference render script (diff & merge into yours)
├─ package-scripts-snippet.json                    ← the 7 npm script entries
└─ templates/
    ├─ youtube-thumbnail-dark/index.html           ← V2
    ├─ youtube-thumbnail-split/index.html          ← V3
    ├─ youtube-thumbnail-cutout/index.html         ← V4
    ├─ youtube-thumbnail-orange/index.html         ← V5
    ├─ youtube-thumbnail-tile/index.html           ← V6 (has extra "Topic letter" field)
    └─ youtube-thumbnail-terminal/index.html       ← V7
```

Each new template references the same `../../tokens/colors_and_type.css` and `../../assets/avatars/avatar-mike-transparent-1200.png` your existing template uses — no new assets required.

## Drop-in steps

> All paths assume your design-system repo at `~/Code/Projects/mike-design-system`. Adjust if yours is elsewhere.

### 1. Copy the 6 new template folders

```bash
cd ~/Code/Projects/mike-design-system

# from this project's handoff/ folder, copy each variant folder
cp -R /path/to/handoff/templates/youtube-thumbnail-dark     templates/
cp -R /path/to/handoff/templates/youtube-thumbnail-split    templates/
cp -R /path/to/handoff/templates/youtube-thumbnail-cutout   templates/
cp -R /path/to/handoff/templates/youtube-thumbnail-orange   templates/
cp -R /path/to/handoff/templates/youtube-thumbnail-tile     templates/
cp -R /path/to/handoff/templates/youtube-thumbnail-terminal templates/
```

After this you should see:

```
templates/
  youtube-thumbnail/                    (your existing V1, untouched)
  youtube-thumbnail-dark/               (new V2)
  youtube-thumbnail-split/              (new V3)
  youtube-thumbnail-cutout/             (new V4)
  youtube-thumbnail-orange/             (new V5)
  youtube-thumbnail-tile/               (new V6)
  youtube-thumbnail-terminal/           (new V7)
```

### 2. Quick browser sanity-check

Open any new template in Chrome — for example:

```bash
open templates/youtube-thumbnail-dark/index.html
```

You should see the dark grey editor panel at the top and the navy thumbnail rendered below it. Type in the fields to confirm the live binding still works.

### 3. Update `scripts/render-thumbnail.mjs`

The render script needs to accept a `--template <folder>` flag so it knows which template to load.

**Two options:**

**Option A — replace it.** If you don't have heavy custom logic in your current script, just replace it with `handoff/scripts/render-thumbnail.mjs`:

```bash
cp /path/to/handoff/scripts/render-thumbnail.mjs scripts/render-thumbnail.mjs
```

**Option B — merge.** If your existing script does something non-trivial (custom flags, font preloading, anything not in the reference version), diff them and pull in just the new bits:

- The `--template` flag (and the `templateDir`/`templatePath` derivation)
- The `defaultFor()` helper that reads default values from the template's `<input>` tags
- The optional `topicLetter` prompt that triggers only when the template has an `#in-topic-letter` input

The reference script writes to `outputs/<filename>.png` at 2× scale by default, the same as your existing one.

### 4. Add the new `npm` scripts

Open your `package.json`, find the `"scripts"` block, and merge in the entries from `handoff/package-scripts-snippet.json`:

```json
"scripts": {
  "thumbnail":          "node scripts/render-thumbnail.mjs --template youtube-thumbnail",
  "thumbnail:dark":     "node scripts/render-thumbnail.mjs --template youtube-thumbnail-dark",
  "thumbnail:split":    "node scripts/render-thumbnail.mjs --template youtube-thumbnail-split",
  "thumbnail:cutout":   "node scripts/render-thumbnail.mjs --template youtube-thumbnail-cutout",
  "thumbnail:orange":   "node scripts/render-thumbnail.mjs --template youtube-thumbnail-orange",
  "thumbnail:tile":     "node scripts/render-thumbnail.mjs --template youtube-thumbnail-tile",
  "thumbnail:terminal": "node scripts/render-thumbnail.mjs --template youtube-thumbnail-terminal"
}
```

The first line keeps your old `npm run thumbnail` command working — it now just passes the original template explicitly.

### 5. Render-test one of each

```bash
npm run thumbnail:dark
npm run thumbnail:split
npm run thumbnail:cutout
npm run thumbnail:orange
npm run thumbnail:tile        # ← also prompts for "Topic letter"
npm run thumbnail:terminal
```

Each one should walk you through the same prompts as the original and write a PNG to `outputs/`. Open them and confirm they match the variants on the design canvas in this project.

### 6. (Optional) Update the canon

Once you're happy:

- Bump the version in `BRAND-CANON.md` / `DESIGN.md` / `SKILL.md` (e.g. v2026.3 → v2026.4).
- Add a short note to `SYSTEM.md` describing the 7 variants and when each is the right pick.
- Commit. The new templates are now part of the canon.

## Usage cheat-sheet

```bash
# Interactive (prompts for every field)
npm run thumbnail              # V1 Classic Light  (cream + polaroid right)
npm run thumbnail:dark         # V2 Classic Dark   (navy bg, cream text)
npm run thumbnail:split        # V3 Vertical Split (navy left / cream right)
npm run thumbnail:cutout       # V4 Mike Cutout    (no polaroid, full-height Mike)
npm run thumbnail:orange       # V5 Orange Bleed   (orange canvas, chalk badge)
npm run thumbnail:tile         # V6 Topic Tile     (giant letter + small polaroid)
npm run thumbnail:terminal     # V7 Terminal       (chalk code-block hero)

# One-shot mode (skip all prompts)
npm run thumbnail:tile -- \
  --eyebrow   "VPS HOSTING" \
  --headline1 "$5 servers," \
  --headline2 "fully yours." \
  --lede      "One command. Your own private cloud." \
  --topic     "$" \
  --out       "hostinger-vps"
```

## Per-variant cheat sheet

| Variant | Best for | Notes |
|---|---|---|
| **V1 Classic Light** | Default / general tutorials | The baseline. Reach for it when nothing else fits. |
| **V2 Classic Dark** | Heavier topics, "dive deep" videos | Navy canvas reads serious. Same polaroid energy. |
| **V3 Vertical Split** | Comparison / "before & after" tutorials | The seam visually divides "old way / new way." |
| **V4 Mike Cutout** | Personality videos, opinion pieces | Mike-forward. Less type, more face. |
| **V5 Orange Full-Bleed** | Launch announcements, hype moments | Loudest variant. Use sparingly so it stays loud. |
| **V6 Topic Tile** | Tutorials about a specific tool with a clean letter | The tile is a topic anchor (M for MCP, C for Claude, etc.). |
| **V7 Terminal** | CLI / dev-focused tutorials | The code block is the visual story. |

## Questions / changes

If a variant needs tweaking — different layout, different copy field, an extra slot — the file you edit is `templates/<variant>/index.html`. Each is fully self-contained: edit the `<style>` block to change the layout, edit the `#thumbnail` markup to change the content. The same render script handles all of them.

If you want to retire a variant later, delete its folder and remove its `package.json` script entry. No other cleanup needed.
