# BeeHiiv newsletter banner

1200×630 banner template for the **AI Unplugged** newsletter on BeeHiiv. The same PNG works as the in-email header *and* the Open Graph share card.

## Layout

- **Background:** `--mm-chalk` (`#FCFAF6`).
- **Loop mark:** `--mm-navy` (`#001E3A`), stroke 7, centered above the title.
- **Title:** IBM Plex Mono Bold, 88 px, ALL CAPS, tight tracking (`-0.02em`).
- **Subtitle:** IBM Plex Mono Bold, 24 px, ALL CAPS, wide tracking (`+0.32em`).

Single centered column, generous whitespace. Matches the layout vocabulary of the original banner — Loop replaces the scribble, navy replaces black.

## Use

1. Open `index.html` in a browser.
2. Edit the title / subtitle / loop size in the editor panel.
3. Right-click the canvas → *Save image as…*, or screenshot the `#banner` element at 1200×630.
4. Upload to BeeHiiv as the newsletter header image. The same file works as the social-share card.

## Customizing

- **Recolor:** edit the `.loop path` stroke and `.title` / `.subtitle` colors — all reference semantic tokens from `tokens/colors_and_type.css`.
- **Different newsletter:** swap "AI UNPLUGGED" / "NEWSLETTER" in the editor. The layout holds for short titles up to ~13 characters per line.
- **Different mark:** swap the inline `<svg>` path with `assets/nodes/floating/node-floating-orange-128.svg` for the Node mark instead of the Loop (would suggest only for AI-content-specific newsletters, since the canon assigns Node to system/content surfaces and Loop to brand/social — the newsletter sits closer to brand).

## Brand notes

- The newsletter banner is one of the surfaces the canon explicitly assigns to the **Loop** (not the Node). Don't swap them without a reason.
- The **AI Handyman badge** is allowed on newsletter banner art but is intentionally omitted here — the Loop + the AI UNPLUGGED title are already doing the identity work, and a third badge would be noise.
- Version stamp (`v2026.x`) does **not** belong on this surface. This is a shipped output, not a canon doc.
