# SYSTEM.md — Operational guide for working in this brand

This is the working manual. It is the file to read at the start of any brand task — before opening the design system HTML, before grepping for tokens, before generating anything.

It does not duplicate the canon or the spec. It points at them and tells you which one is load-bearing for the task in front of you.

`v2026.3`

---

## The factory model — what lives in this repo, what doesn't

This repo is a **factory**, not a **warehouse**. Think of it as the place where the brand is defined and where reusable machines that produce brand-aligned output live. It is not the place where every rendered output ever made gets stored.

### Belongs in this repo

- **The canon** — `BRAND-CANON.md`, `CLAUDE.md`, `SYSTEM.md`, `DESIGN.md`, `README.md`, `tokens/colors_and_type.css`. The rules and the source of truth.
- **Canonical brand artifacts** — the things that *are* the brand: official logos, marks, favicons, fonts, avatars. These live under `assets/`. They are generated from canon and committed because they are referenced by everything downstream.
- **Reusable templates** — scaffolding that *can produce* an output but isn't itself the output. The current example is `templates/youtube-thumbnail/`. Any new recurring format (X header, LinkedIn cover, webinar banner, podcast art) becomes a new directory under `templates/`. Each template links the canon CSS so it always renders with current tokens.
- **Reference implementations** — `ui_kits/website/` shows how the brand looks applied in real product code. Reference, not deliverable.
- **The Figma plugin** — `figma-builder/` mirrors the canon into Figma. It carries an inline copy of the canon hex values that is kept in sync via `npm run sync-figma`.
- **Tools** — `scripts/` and `.githooks/`: the things that maintain the factory itself (generate assets, check for drift, bump version, enforce on commit).

### Does NOT belong in this repo

- **One-off rendered outputs.** An X banner for this week's launch. A LinkedIn cover for a specific webinar. A campaign graphic with custom copy. Render it from a template in this repo, save the file outside (in `outputs/` which is gitignored, or in cloud storage), and distribute from there. The factory builds it; the warehouse stores it.
- **Anything regenerable from canon + template.** If `npm run generate` plus a template can recreate it, it doesn't need git history.
- **Personal-workspace files** — IDE settings, scratch notes, exploratory scripts that aren't reusable. These either get gitignored or moved to `scripts/experiments/` if they might be useful again.

### When in doubt — three questions

1. **Is it the brand itself, or made with the brand?** (Logo: itself. Banner with this week's copy: made with.)
2. **Will Claude / a teammate / future-you need to regenerate it from canon?** (Yes → it's an output, not canon. No → it's part of the brand.)
3. **Does it change on the same cadence as the canon?** (Tokens change yearly; outputs change weekly. Different cadence = different home.)

---

## Folder map

```
mike-design-system/
├── BRAND-CANON.md            # the locked brand bible
├── CLAUDE.md                 # working rules for Claude sessions
├── SYSTEM.md                 # this file — operational guide
├── DESIGN.md                 # full spec (tokens, components in detail)
├── README.md                 # project readme
│
├── tokens/                   # SOURCE OF TRUTH for token values
│   └── colors_and_type.css   # every hex/font/space declared here, once
│
├── assets/                   # canonical brand artifacts (the brand itself)
│   ├── avatars/              # Mike avatars (orange-bg, transparent)
│   ├── favicon/              # browser/app icons
│   ├── fonts/                # IBM Plex Mono/Sans, Murphydoodle
│   ├── logos/                # wordmark, lockup, m-mark, badge, tagline
│   └── loops-nodes/          # Loop and Node marks (primary + system)
│
├── design-system.html        # living canon reference (the index page)
│
├── templates/                # reusable factory machines
│   └── youtube-thumbnail/    # one template per recurring format
│
├── ui_kits/                  # reference UI implementations
│   └── website/              # the brand applied to a real product
│
├── figma-builder/            # Figma plugin (mirrors canon into Figma)
│
├── scripts/                  # tools that maintain the factory
│   ├── generate-assets.mjs   # regenerate canonical SVGs + PNGs
│   ├── check-canon.mjs       # detect hex drift
│   ├── check-version.mjs     # detect version drift
│   ├── bump-version.mjs      # atomic version bump
│   ├── sync-figma-builder.mjs# propagate canon to Figma plugin
│   └── experiments/          # one-off / scratch renderers (may be useful again)
│
├── .githooks/                # pre-commit enforcement
│
├── outputs/                  # (gitignored) local rendered outputs
│
├── package.json              # version is mirrored from BRAND-CANON.md
└── package-lock.json
```

### Commands

| Run when | Command |
|---|---|
| You changed a token in `tokens/colors_and_type.css` | `npm run generate && npm run sync-figma && npm run check` |
| You're bumping the brand version | `npm run bump v2026.N` |
| You want to verify nothing has drifted (also runs on commit) | `npm run check` |

---

## Read order

When a task touches the Mike Murphy / AI Handyman brand, read in this order:

1. **`CLAUDE.md`** — the working pattern, the hard rules, and the NOT list. Loaded automatically. The shortest path to "don't ship the wrong thing."
2. **`BRAND-CANON.md`** — the locked brand bible. Voice, palette, type roles, marks, badge rules, avatar ladder, the rubric. Source of truth for *what the brand is*.
3. **`SYSTEM.md`** — this file. The decision tree from "user asked for X" to "here is the component, layout, and file to lift from."
4. **`DESIGN.md`** — the full spec. Every token in YAML, every component in prose. Reach for it when you need an exact value, a component recipe, or a padding number.
5. **`design-system.html`** — the rendered system. Reach for it when you need to *see* the component or copy structural HTML.
6. **`ui_kits/website/`** — the system applied to a real product. Reach for it when building site surfaces or wanting a working pattern in JSX.

For most tasks, steps 1–3 are enough to start. Open 4 and 5 when you need a value or a structure.

---

## File map — who owns what

| Question | Read this |
|---|---|
| What is the brand voice? What words are off-limits? | `BRAND-CANON.md` (Voice section), `CLAUDE.md` (Voice rules) |
| What hex value is "orange"? What's the spacing scale? | `DESIGN.md` (YAML frontmatter), `tokens/colors_and_type.css` (CSS source) |
| What does a tutorial card look like? What padding? | `DESIGN.md` (Components section), `design-system.html` (rendered) |
| How do I lay out a hero / a tutorial grid / an end screen? | `design-system.html` Section 09 (Page templates), `ui_kits/website/Hero.jsx` etc. |
| Which mark goes where? | `BRAND-CANON.md` (Brand marks — locked, "How they divide the work") |
| Where does the AI Handyman badge belong? | `BRAND-CANON.md` (AI Handyman badge — usage rule), `DESIGN.md` (badge component) |
| What's in dark mode? | `design-system.html` Section 10, `DESIGN.md` (color tokens) |
| What's been deliberately killed? | `BRAND-CANON.md` (What is no longer in the brand), `CLAUDE.md` (NOT list) |

If a question isn't answered here, default to `BRAND-CANON.md`. Canon wins.

---

## The decision tree

When a request comes in, map it to a known pattern. Do not invent a new one.

### "Write a tutorial card / blog card / content card"
Reach for `card-stamp` in `design-system.html` Section 08. Structure: thumb + AI Handyman badge → eyebrow ("Tutorial · 04 of 09") → H3 title (Mono 700 UPPER) → body (Sans) → footer row (topic pill, "Read" link). Cut-shadow on chalk. **Badge required.**

### "Build a hero / landing section / home top"
Reach for `home-hero` in `design-system.html` Section 09. Two columns at ≥768px: copy left (eyebrow → H1 → lede → `btn-primary` + `link-text`), polaroid right. The hero H1 can be sentence case when it reads as a sentence ("AI tools, explained clearly."). One primary CTA only.

### "Make an intro / end screen / 16:9 art"
Reach for `screen-16x9` patterns in `design-system.html` Section 09.
- **Intro:** badge row top, H1 + lede center-left, episode/tutorial stamp top-right.
- **End:** polaroid left, badge + "Thanks for hanging out" + tagline right.

### "Write a callout / aside / tip"
Reach for `.callout` in Section 08. One style. Two columns: 32px left with orange `→` mark, right column with body prose. Cut-shadow on chalk. Used sparingly — if there are two callouts on a page, one of them is wrong.

### "Show code / terminal / a command"
Reach for `.code-block` in Section 08. Navy ground, chalk ink, cut-shadow, 4px radius. Mono 14px. Prompt character (`$`) in muted color. Cursor is the teal block — **and that is where the one-teal-per-screen rule cashes in**, so nothing else on the page can be teal.

**Cursor placement rule.** The teal block cursor is a chunky rectangle, not a thin caret, so it only reads as a cursor when context grounds it. Place it inline with a `$ ` prompt, either at the end of an active command (`$ pnpm dev▊`) or alone on a fresh prompt line (`$ ▊` — terminal awaiting input). Never at the end of an output or status line, never floating without a prompt directly before it. Margin from preceding text is ~2px (basically butted against it); a wider gap makes the cursor read as a stray rectangle. See `.cursor` styles in `design-system.html` lines 917–924.

### "Newsletter signup / email capture"
Reach for the orange-section newsletter form in `design-system.html`. Orange section background. Left column: eyebrow + H2 + lede. Right column: chalk form card with cut-shadow, single email input + full-width `btn-primary`. Success state: yellow "✓ You're in." chip.

### "Section heading anywhere on a page"
Eyebrow (numbered: `04 · Color`) → H2 (Mono 700 UPPER) → optional `section-meta` right-aligned tag. The eyebrow numbering is a system signal — sections of a system or a doc get numbers; arbitrary content does not.

### "Logo / mark / favicon / social avatar"
Walk the avatar ladder from `BRAND-CANON.md`:
- Favicon / footer / chrome → **M-mark** (small contexts) or **Loop** (header, social profiles).
- Tutorial card thumb → orange-bg avatar.
- Hero / About → transparent avatar or polaroid.
- Tutorial / system surfaces → **Node** mark.
- The **Loop** is the primary brand mark. The **Node** is the system / content mark. Do not swap their roles.

### "Make this dark / on navy"
Read `design-system.html` Section 10. Cream becomes navy, navy becomes chalk, the cut-shadow flips from navy ink to chalk ink. Orange and teal stay exactly where they are. Components do not get redesigned — only the inks invert.

---

## Layout vocabulary (locked)

These are the layouts that exist. New surfaces compose from this list.

| Recipe | Use |
|---|---|
| **Eyebrow + display + body** | Section openers, simple article tops, About page |
| **Polaroid + headline + lede** | Hero, end screens, About hero, intimate moments |
| **Badge row + headline + meta** | Intro screens, tutorial detail headers, podcast/newsletter banners |
| **Cut-shadow card grid (3 cols → 2 → 1)** | Tutorial list, blog index, anything browseable |
| **Two-column copy / art** | Hero, dark-mode demo, About, newsletter section |
| **Code block + prose** | Tutorial step-by-step, technical walkthroughs |

If a draft introduces a new layout shape, stop and ask whether it can be expressed as one of these instead. Almost always, yes.

---

## Working pattern

The pattern, every time:

1. **Start from the system, not from scratch.** Open `design-system.html` and `ui_kits/website/index.html`. Lift existing components and HTML structure. Do not reinvent the card, the badge, the polaroid, the hero.
2. **Consume semantic tokens only.** `var(--color-action-primary)`, never `#FF6434`. Tokens live in `tokens/colors_and_type.css` and the `:root` block of `design-system.html`.
3. **Pick a layout from the locked vocabulary.** If your draft requires a new layout, that's the signal to back up.
4. **Audit against the NOT list before you ship.** If anything in your draft would have to be deleted on review — cartoon Mike, washi tape, toolshed copy, the old tagline, free yellow, two teals — delete it now.
5. **Stamp only when there's a reason to.** Version stamps (`v2026.3`) belong on canon docs (this file, `BRAND-CANON.md`, `design-system.html` footer), never on shipped outputs. The `Mike Murphy AI` identity stamp is optional — use it where attribution earns its place (about, formal decks, end screens), skip it where the AI Handyman badge or Mike's face is already identifying the work (YouTube thumbnails, social posts, channel art). Full rule: `BRAND-CANON.md` ("Stamp" section).

---

## Easy-to-forget reminders

The things that get re-broken every time:

- **Tagline is locked:** `LEARN · BUILD · MOVE FORWARD`. Mid-dots (U+00B7), ALL CAPS, IBM Plex Mono Bold. No periods. No "create." No "ship." Mid-dots are orange on light surfaces, navy on orange surfaces.
- **One teal per screen.** Pick the cursor, the live dot, or the Node satellite — never two at once.
- **The teal cursor needs a `$ ` prompt.** The block cursor (▊) only reads as a cursor when it sits inline with a prompt — `$ ▊` (awaiting input) or `$ command▊` (active command). Never at the end of an output line, never floating.
- **Yellow is reserved for success-state chips.** `✓ You're in.` and similar confirmations. Not the badge ink (the badge is navy on orange), not hero surfaces, not buttons.
- **Murphydoodle says "Mike" on the polaroid.** Nothing else, anywhere.
- **Cut-shadow is for content (cards, code, inputs, primary buttons), not chrome (nav, header, footer).**
- **AI Handyman badge tags content, not chrome.** It belongs on tutorial cards, intro/end screens, the home hero. It does not belong in the nav or footer.
- **Page background is cream, not white.** Body text is navy, not black.
- **Mono in display contexts is ALL CAPS.** Except when the H1 is a sentence on the hero — then it reads naturally.
- **The Loop is primary. The Node is system.** Header, social, podcast art → Loop. Tutorial cards, technical surfaces → Node.

---

## Voice — the short version

Calm, technical, first person. "I" and "you." Mike is talking to one curious human. Short-to-medium sentences. Contractions. Real tool names, real workflows. Em dashes sparingly. Parentheses for quick side thoughts. Exclamation marks rarely.

On-brand phrases:
- "Here's what this actually does."
- "This is where people get stuck."
- "This part is a little janky, but it works."

Off-brand phrases (instant rewrite):
- "wire up," "ship it," "level up," "10x," "supercharge," "unlock," "unleash"
- "game-changer," "leverage," "synergy," anything from corporate land
- "in the toolshed," "under the hood," "rough draft / blueprint" — the toolshed metaphor era is over

Full voice rules: `BRAND-CANON.md` (Voice and personality).

---

## When this file is wrong

The canon (`BRAND-CANON.md`) wins. If anything in this file disagrees with the canon, treat the canon as right and update this file. Bump the version in the footer when you do.
