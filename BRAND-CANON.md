# BRAND CANON
**Mike Murphy · AI Handyman · v2026.5**

> Clean, calm, technical, warm, lightly handmade, never corporate.

This is the locked brand. Every decision below has been made. If something on the website, in a deck, on YouTube, or in a PDF disagrees with what's on this page, this page wins.

---

## What changed in v2026.5

Navigation redesign, shipped to mikemurphy.ai. The header grows from 60px to **84px**, the Loop mark in the lockup from 36px to **42px**, and the flat nav is replaced by a CONTENT dropdown with a full-screen navy sheet on mobile. Search stops being a nav link and becomes an icon button.

- **New color: `--mm-navy-raised` (`#06263F`).** Dark-mode elevated surfaces only — dropdowns, menus, popovers that must sit above `--color-bg-surface`. Light mode has no counterpart; chalk is already the lift. This is a *surface* value, not a fifth brand color: it never becomes text, border, or a light-mode background, and it doesn't change the four-colors-on-warm-paper rule.
- **Chrome vs. card, clarified.** "No cut-shadow on nav/header/footer" stands, but a dropdown anchored to the nav is a **card**, not chrome, and keeps the cut-shadow. The rule is about the persistent bar, not everything attached to it.
- **Hover fills over navy are neutral, never orange.** Translucent orange on a navy ground muddies to brown. Hover washes use `--color-text-primary` at 5–7%. A lightened orange variant was tried for small text on navy and rejected — the single orange stays single.
- **Menus open on click, never hover.** Hover menus fail on trackpads and are unreachable on touch.
- The Loop mark stays `--mm-orange` in the header in both themes — the lockup rule from the previous version, unchanged. The mobile sheet's navy ground is the one place the cream Loop variant is correct.
- Header height and mark size are a matched pair — the 84px bar is balanced for a 42px mark. Change them together.
- **Content width corrected to 1152px (72rem) with a 16px gutter.** This doc and `DESIGN.md` had long quoted 1160px + 32px padding, but the site never implemented it. Building the new header to the quoted numbers left it sitting 28px inside the content below it, which is how the drift surfaced. The header now shares the page container, so both edges align.
- **Nav collapses at 1024px, not 820px.** The desktop header needs ~881px to lay out; the original breakpoint left it overflowing and scrolling the page horizontally between roughly 820px and 1010px. The breakpoint follows the measurement — re-measure if the nav gains links.
- **Removed `figma-builder/`** and its `npm run sync-figma` script. The plugin mirrored the canon into Figma, but Figma isn't part of this workflow — in its lifetime it was never the reason for a commit, only ever updated as collateral when something else changed. The earlier changelog entry below still describes it; that's a historical record, not a live pointer.
- `design-system.html` and `ui_kits/website/` were updated to the new desktop header and dropdown. They stop there **on purpose**: these are visual references, and the mobile sheet, focus trap, and keyboard navigation live only in the shipped Astro component. This is a scoping decision, not an unfinished task — don't "fix" it later.

## What changed in v2026.4

The horizontal lockup (site nav, doc headers) swaps its mark from the navy M-disc to the orange Loop mark, matching what's live on mikemurphy.ai. This also resolves a standing inconsistency: `SYSTEM.md`'s avatar-ladder rule already said "header, social profiles → Loop," while this canon's element table still said the horizontal lockup used the M-mark.

- `scripts/generate-assets.mjs`'s `lockupSvg()` now draws the Loop spiral (always `--mm-orange`, regardless of light/dark scheme) instead of the M-disc + divider. Regenerated `assets/logos/lockup/lockup-horizontal-{navy,cream}.svg` and their PNG exports.
- Dropped the `·` bullet before `AI HANDYMAN` in the eyebrow line — it now reads as a plain second line, matching the live site.
- `design-system.html`'s "Horizontal lockup" and "Nav header" previews (section 06 and the components gallery) now render the Loop mark inline instead of `.m-disc`.
- `ui_kits/website/Header.jsx` and `site.css` updated the same way — the live site nav lockup was already ahead of this repo.
- The M-mark itself is unchanged and still owns favicon / app icon / footer chrome / ≤32px contexts — this was a lockup-only swap.

## What changed in v2026.3

System consolidation pass. No visual changes to the brand itself — every commit in this version is about making the canon impossible to drift from in the future.

- One source of truth for token hex values: `tokens/colors_and_type.css`. Every HTML page now links it. The duplicate `ui_kits/website/colors_and_type.css` was deleted. Inline `:root { --mm-* }` blocks in `design-system.html`, `ui_kits/website/index.html`, and `templates/youtube-thumbnail/index.html` were removed in favor of the link.
- `scripts/generate-assets.mjs` no longer hand-types brand color constants — it parses them from the canon CSS at runtime.
- `scripts/check-canon.mjs` reports any hex in the repo that doesn't match the canon. Wired up as `npm run check`.
- Pre-commit hook at `.githooks/pre-commit` runs `npm run check`; commits that introduce drift are rejected.
- `scripts/sync-figma-builder.mjs` propagates canon hex values into the Figma plugin's `HEX = {...}` object. Wired up as `npm run sync-figma`.
- `assets/loops/png/`, `assets/nodes/png/`, and hand-authored loop/node lockup PNGs are regenerated alongside the rest of the assets when `npm run generate` runs.
- `#FAF7F2` (the unnamed dark-surface chalk variant) was eliminated and collapsed into canonical `#FCFAF6` chalk. <!-- check-canon-ignore — historical reference to a retired value -->

- Stale `yellow on orange` badge styling in `templates/youtube-thumbnail/` corrected to canonical navy on orange.

## What changed in v2026.2

Navy ink revised from `#0D1B2A` to `#001E3A`. The previous navy carried a faint green lean (R 13 / G 27 / B 42, G:B ratio 0.64) that read muddy against cream and competed subtly with the teal AI pop. The new navy zeroes the red channel and pulls the G:B ratio down to 0.52 — same ~209° hue, but a cleaner, more ink-like pure blue. Pairs more decisively with `#FF6434` orange on the warm/cool axis, and gives `#1ECEBE` teal more room to read as a distinct accent. All references, tokens, and SVG assets propagated. <!-- check-canon-ignore -->


---

## Voice and personality

Mike speaks in first person: "I", "me". The reader is "you". Never corporate language, never "our team", never startup-speak.

The tone is calm, clear, practical, and encouraging. Mike is the guy who already wrestled with the confusing part and is now showing you the shortcut. Teacher, troubleshooter, systems clarifier — not guru, futurist, or hype man.

Writing should feel human and conversational:

- short-to-medium sentences
- contractions
- straightforward explanations
- specific examples instead of vague claims
- honest about friction and workarounds
- occasionally funny or self-aware in a subtle way

Avoid:

- corporate tone
- overexplaining
- motivational speaker energy
- buzzwords
- excessive polish that removes personality



**Prefer:**
"Here's what this actually does."
"This is where people get stuck."
"This part is a little janky, but it works."

- Use actual tool names, actual workflows, actual examples. 
- Em dashes should be used sparingly, not stylistically. 
- Parentheses are often preferred for quick side thoughts. 
- Exclamation marks are used sparingly and only when they feel genuinely human or enthusiastic.
- Emojis are allowed when they add tone or clarity, but should feel tasteful and intentional, never loud or spammy.

**The overall feeling:**
clean, calm, technical, warm, lightly handmade, never corporate.

---

## Tagline

`LEARN · BUILD · MOVE FORWARD`

Mid-dot separators, ALL CAPS, IBM Plex Mono Bold. The mid-dots are colored `--mm-orange` on light surfaces and `--mm-navy` on orange surfaces. No periods. No alternative wording — "create" and "ship" are not on the list.

---

## Stamp

Stamp only when there's a reason to. Don't stamp by default.

**Version stamps (`v2026.N`)** — canon docs only. The header of this file, `SYSTEM.md`, `DESIGN.md`, `README.md`, and the footer of `design-system.html`. These are the surfaces where "which version of the canon is this" is the load-bearing question. Never on shipped outputs (thumbnails, banners, social posts, decks, marketing graphics).

**`Mike Murphy AI` identity stamp** — optional, context-dependent. Use where attribution earns a place:

- About page
- Formal client or partner deck
- Podcast cover or end screen
- Sign-off slide on a long-form presentation
- PDF meta row when there's no other identifier

Skip where the AI Handyman badge or Mike's face is already doing the identity work — YouTube thumbnails, social posts, channel art, anywhere the brand is already legible. Double-stamping just adds noise.

When the stamp is used, it's `Mike Murphy AI`, IBM Plex Mono, navy on light surfaces, cream on dark or orange surfaces. Brand identity, not a version tag — it signs the work, it doesn't date it.

When the canon changes, bump the version in this file's header first, then run `npm run bump v2026.N` to propagate.

---

## Color palette

Four colors on warm neutral paper. Locked hex values, no alternatives.

| Token              | Hex       | Role                                                         |
| ------------------ | --------- | ------------------------------------------------------------ |
| `--mm-cream`       | `#F1ECE2` | Page background. Default surface. Never pure white.          |
| `--mm-chalk`       | `#FCFAF6` | Brightest surface. Cards, modals, code-block frames.         |
| `--mm-navy`        | `#001E3A` | All body text, borders, the offset shadow stamp. Never pure black. |
| `--mm-orange`      | `#FF6434` | Primary action / CTA accent.                                 |
| `--mm-orange-deep` | `#E8501C` | Hover / pressed state for orange.                            |
| `--mm-yellow`      | `#F5C842` | Reserved for success-state chips (e.g., `✓ You're in.` newsletter confirmation). Small surface area, narrow semantic role. Almost never sits on cream directly; never as primary text ink. |
| `--mm-teal`        | `#1ECEBE` | "AI pop." Reserve for: terminal cursors, code accents, "live/new" status indicators. **One use per screen.** |
| `--mm-navy-raised` | `#06263F` | Dark-mode elevated surfaces only (dropdowns, menus, popovers). A surface lift above `--color-bg-surface`, not a brand color — never text, never a border, never a light-mode background. |

---

## Type roles

Three families. Each has one job.

| Role                         | Family                              | Use                                                                                                                                                                         |
| ---------------------------- | ----------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Display + UI + code + logo   | **IBM Plex Mono** (700 / 400)       | Hero, H1–H2, eyebrows, mono labels, code, terminal, logo wordmark, M-mark. Display is ALL CAPS, tight tracking (-0.02 to -0.03em). UI labels are ALL CAPS, wide tracking (0.14–0.18em). |
| Body                         | **IBM Plex Sans** (400 / 600)       | Paragraph copy, lede, UI prose, long-form reading. Sentence case.                                                                                                            |
| Hand                         | **Murphydoodle**                    | The word "Mike" under polaroid frames. Occasional small human touches. *This is Mike's actual handwriting. Don't use it for headlines, navigation, body, or anywhere it could be mistaken for system type.* |

Unplugged Sans is not in the system. Don't add it.

---

## Logo and mark

| Element              | What it is                                                                                              | Where it lives                                            |
| -------------------- | ------------------------------------------------------------------------------------------------------- | --------------------------------------------------------- |
| Wordmark             | `MIKE MURPHY` set in IBM Plex Mono Bold, stacked two lines, line-height 0.92, letter-spacing -0.03em    | Hero, end screens, primary logo lockups                   |
| Horizontal lockup    | Loop mark + `MIKE MURPHY` + `AI HANDYMAN` orange eyebrow                                                 | Site navigation, document headers                         |
| M-mark               | IBM Plex Mono "M" centered in a navy disc                                                                | Favicon, app icon, footer chrome, ≤32px contexts          |
| AI Handyman badge    | `AI HANDYMAN` in IBM Plex Mono Bold, `--mm-navy` text on `--mm-orange` ground, 1px navy border, 4px navy cut-shadow | Tutorial cards, intro/end screens, home hero, sprinkled where it earns its place |

---

## Avatar ladder

As the context gets more personal, you move down the ladder. As it gets more system or chrome, you move up.

| Treatment                                                                                          | When to use                                                                                                                |
| -------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------- |
| **M-mark**                                                                                         | Favicon, app icon, footer, generic system contexts, ≤32px                                                                  |
| **Orange-bg avatar** (Mike on `#FF6434`)                                                            | Social profile pictures, YouTube/podcast end-screen badges, tutorial card thumbnails                                       |
| **Transparent avatar** (Mike, cutout, no bg)                                                       | Hero compositions where the page bg shows through, About page, flexible marketing layouts                                   |
| **Polaroid** (orange-bg photo, cream paper frame, Murphydoodle "Mike" caption, tilt, cut shadow)   | Hero feature moments, tutorial end screens, About page, podcast art, anywhere the brand gets intimate                      |

The polaroid is the brand's most personal asset. Use it intentionally, not casually. Tilt range -3° to +2°. Drop shadow is a hard navy offset, approx. `6px 12px 0 rgba(0,30,58,0.55)`. Caption is always Murphydoodle, always in `--mm-navy`, always the word "Mike" — no other captions, no other words.

---

## AI Handyman badge — usage rule

The badge is used selectively, not formulaically.

- **Always** on: tutorial cards, tutorial intro and end screens, podcast and newsletter banner art, the home hero.
- **Never** on: header nav, footer chrome, About / contact / legal / generic content pages.
- **Optional** anywhere the content benefits from reinforcement or authorship.
- **Use intentionally**, not automatically.

The badge identifies a piece of *content* as Mike's. It is not a corporate lockup that has to repeat on every surface.



------------------------

## Orange usage rule

- Primary CTA should visually dominate the screen.
- Avoid multiple competing orange actions in the same view.

--------------------



## Brand marks — locked (Phase 2)

Two marks are now part of the system, with different jobs and different homes.

### The Loop
A single continuous spiral path. One stroke, uniform weight, no fill, no disc container.
The Loop is the **primary mark** — the face of the brand. Warm, human, a drawn gesture.

- **Files:** `assets/loops/`
- **Stroke variants:** `#FF6434` (orange), `#001E3A` (navy), `#F1ECE2` (cream), `#1ECEBE` (teal); chalk variants remain available for bright reversed use on dark or orange surfaces
- Transparent background — works on any surface
- Animates by drawing the path (stroke-dashoffset)

Use on: site header, social profiles, podcast art, newsletter header, hero moments.

### The Node
An asymmetric constellation for system surfaces and subtle motion. The preferred direction is the **floating** node: no disc, no shadow, all nodes opaque, connectors held back with restrained opacity. Badged/disc versions remain available for contained icon moments.

- **Files:** `assets/nodes/`
- **Primary direction:** `assets/nodes/floating/`
- **Contained alternates:** `assets/nodes/badged/`
- **Legacy disc set:** `assets/nodes/legacy/`
- **Central node:** `#FF6434` (orange)
- **Upper-left satellite:** `#001E3A` (navy, full opacity — largest, pushed out)
- **Right satellite:** `#1ECEBE` (teal — the one AI pop per screen rule applies)
- **Lower-left satellite:** `#001E3A` (full opacity in floating/badged variants; legacy disc assets retain the older ghost treatment)
- Animates by building outward — center appears, lines draw, satellites pop in

Use on: tutorial cards, AI Handyman content contexts, video intros, system/technical surfaces.

### How they divide the work

| Surface | Mark |
|---|---|
| Site header / favicon | Loop (no disc) |
| Social profiles | Loop (no disc) |
| Tutorial cards | Node (in disc) |
| Video intro sequence | Both — Node builds, transitions to Loop |
| Podcast art | Loop |
| Newsletter header | Loop |
| End screens | Both |

### Production asset templates (pending)
YouTube thumbnails, video intro/outro, social cards (YouTube channel art, Twitter/X header, LinkedIn banner), and email header are the next build priority. Both marks are now available as source SVGs.

---

## What is no longer in the brand

These were part of earlier versions. They are gone. Do not reintroduce them.

- Unplugged Sans as a display face.
- The hand-drawn vocabulary: lighthouse, cloud, arrows, washi tape, orange underline, paper texture, graph-paper "blueprint" overlays.
- Cartoon-Mike illustrations as mascot moments (tablet Mike, thumbs-up Mike).
- The "toolshed" copy metaphor — "in the toolshed", "under the hood", "wiring it up", "rough draft / blueprint".
- The tagline `LEARN. CREATE. MOVE FORWARD.` (with periods, with "CREATE").

These assets remain in the repository under `_legacy/` for archival reference only. They are not part of the live system. If a future contributor reaches for one of them, the answer is no.

---

## The rubric

Every design decision should pass this test:

> *Does it feel clean, calm, technical, warm, lightly handmade, and never corporate?*

If yes, ship it. If no, cut it.

---

*Mike Murphy · AI Handyman · 2026*
