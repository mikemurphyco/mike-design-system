---
version: alpha
name: Mike Murphy · AI Handyman
description: Design system for mikemurphy.co — clean, calm, technical, warm, lightly handmade, never corporate. v2026.5.

colors:
  primary:     "#FF6434"
  cream:       "#F1ECE2"
  chalk:       "#FCFAF6"
  navy:        "#001E3A"
  orange:      "#FF6434"
  orange-deep: "#E8501C"
  yellow:      "#F5C842"
  teal:        "#1ECEBE"
  navy-raised: "#06263F"

typography:
  display:
    fontFamily: IBM Plex Mono
    fontSize: 88px
    fontWeight: 700
    lineHeight: 0.92
    letterSpacing: -0.03em
  h1:
    fontFamily: IBM Plex Mono
    fontSize: 56px
    fontWeight: 700
    lineHeight: 1.0
    letterSpacing: -0.03em
  h2:
    fontFamily: IBM Plex Mono
    fontSize: 36px
    fontWeight: 700
    lineHeight: 1.05
    letterSpacing: -0.02em
  h3:
    fontFamily: IBM Plex Mono
    fontSize: 22px
    fontWeight: 700
    lineHeight: 1.1
    letterSpacing: -0.02em
  eyebrow:
    fontFamily: IBM Plex Mono
    fontSize: 13px
    fontWeight: 700
    lineHeight: 1.0
    letterSpacing: 0.18em
  lede:
    fontFamily: IBM Plex Sans
    fontSize: 20px
    fontWeight: 400
    lineHeight: 1.25
  body:
    fontFamily: IBM Plex Sans
    fontSize: 16px
    fontWeight: 400
    lineHeight: 1.55
  mono-label:
    fontFamily: IBM Plex Mono
    fontSize: 12px
    fontWeight: 700
    lineHeight: 1.0
    letterSpacing: 0.14em
  code:
    fontFamily: IBM Plex Mono
    fontSize: 14px
    fontWeight: 400
    lineHeight: 1.5
  hand:
    fontFamily: Murphydoodle
    fontSize: 44px
    fontWeight: 400
    lineHeight: 1.0

rounded:
  sm:   2px
  md:   4px
  lg:   8px
  pill: 999px

spacing:
  1:  4px
  2:  8px
  3:  12px
  4:  16px
  6:  24px
  8:  32px
  12: 48px
  16: 64px
  24: 96px
  32: 128px

components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor:       "{colors.chalk}"
    typography:      "{typography.mono-label}"
    rounded:         "{rounded.md}"
    padding:         12px 20px
  button-primary-hover:
    backgroundColor: "{colors.orange-deep}"
  button-primary-active:
    backgroundColor: "{colors.orange-deep}"

  button-secondary:
    backgroundColor: "{colors.chalk}"
    textColor:       "{colors.navy}"
    typography:      "{typography.mono-label}"
    rounded:         "{rounded.md}"
    padding:         12px 20px
  button-secondary-hover:
    backgroundColor: "{colors.cream}"

  badge-ai-handyman:
    backgroundColor: "{colors.orange}"
    textColor:       "{colors.navy}"
    typography:      "{typography.mono-label}"
    rounded:         "{rounded.md}"
    padding:         8px 14px
  badge-status:
    backgroundColor: "{colors.chalk}"
    textColor:       "{colors.navy}"
    typography:      "{typography.mono-label}"
    rounded:         "{rounded.md}"
    padding:         6px 10px

  pill-topic:
    backgroundColor: transparent
    textColor:       "{colors.navy}"
    typography:      "{typography.mono-label}"
    rounded:         "{rounded.pill}"
    padding:         6px 12px
  pill-topic-active:
    backgroundColor: "{colors.navy}"
    textColor:       "{colors.chalk}"

  tutorial-card:
    backgroundColor: "{colors.chalk}"
    textColor:       "{colors.navy}"
    rounded:         "{rounded.md}"
    padding:         24px

  polaroid:
    backgroundColor: "{colors.chalk}"
    textColor:       "{colors.navy}"
    padding:         14px 14px 28px 14px

  nav-header:
    backgroundColor: "{colors.cream}"
    textColor:       "{colors.navy}"
    height:          84px
    heightMobile:    64px

  nav-dropdown:
    backgroundColor: "{colors.chalk}"
    textColor:       "{colors.navy}"
    rounded:         "{rounded.md}"
    padding:         8px
    width:           300px

  newsletter-form:
    backgroundColor: "{colors.chalk}"
    textColor:       "{colors.navy}"
    rounded:         "{rounded.md}"
    padding:         24px

  code-block:
    backgroundColor: "{colors.navy}"
    textColor:       "{colors.chalk}"
    typography:      "{typography.code}"
    rounded:         "{rounded.md}"
    padding:         16px
  code-block-cursor:
    backgroundColor: "{colors.teal}"

  footer:
    backgroundColor: "{colors.cream}"
    textColor:       "{colors.navy}"
---

## Overview

Mike Murphy is the AI Handyman — the guy who already wrestled with the hard part and now shows you the shortcut. The brand is **clean, calm, technical, warm, lightly handmade, never corporate.**

Four colors on warm neutral paper. Two type families (monospace-first). One hand font locked to one use. The vocabulary is precise and sparse. Every asset earns its place.

If a design looks like a SaaS landing page, it's wrong. If it feels like a calm, slightly handmade workbook from someone who actually used the tool yesterday, it's right.

The tagline is locked: **LEARN · BUILD · MOVE FORWARD** — IBM Plex Mono Bold, ALL CAPS, mid-dot separators (U+00B7). Dots are `{colors.orange}` on light surfaces, `{colors.navy}` on orange surfaces. No periods. No "create." No "ship." No alternatives.

## Colors

The palette is four named values and three functional extensions. All components consume semantic aliases; never hardcode hex values.

- **Cream (`#F1ECE2`):** Page background. The warm neutral that everything sits on. Never pure white.
- **Chalk (`#FCFAF6`):** Brightest surface. Cards, modals, code-block frames, polaroid paper. Slightly brighter than cream.
- **Navy (`#001E3A`):** All body text, borders, and the offset cut-shadow ink. Never pure black.
- **Orange (`#FF6434`):** The only primary action color. CTAs, eyebrows, active states, the AI Handyman badge background. One dominant orange per screen.
- **Orange-deep (`#E8501C`):** Hover and pressed state for orange. Never used at rest.
- **Navy-raised (`#06263F`):** Dark-mode only. Navy lifted one step for surfaces that must read as elevated *above* the dark card surface — dropdowns, menus, popovers. In light mode there is no counterpart: chalk already is the lift, so `--color-bg-raised` aliases chalk and components consume it unconditionally. Never a page or card background in light mode, never a text or border color.
- **Yellow (`#F5C842`):** Reserved for success-state chips such as `✓ You're in.`. Do not use as badge ink, hero color, body type, or button color.
- **Teal (`#1ECEBE`):** The "AI pop." Rationed to exactly one element per screen: a terminal cursor, a `live` status dot, a teal-ring on the M-mark. Never on two things at once.

Semantic mapping consumed by components:

| Semantic role | Value |
|---|---|
| `--color-bg-page` | `{colors.cream}` |
| `--color-bg-surface` | `{colors.chalk}` |
| `--color-bg-raised` | `{colors.chalk}` (dark: `{colors.navy-raised}`) |
| `--color-text-primary` | `{colors.navy}` |
| `--color-text-muted` | navy @ 62% opacity |
| `--color-action-primary` | `{colors.orange}` |
| `--color-action-primary-hover` | `{colors.orange-deep}` |
| `--color-border-default` | navy @ 18% opacity |
| `--color-border-strong` | `{colors.navy}` |
| `--color-accent-ai` | `{colors.teal}` |

## Typography

Three families. Each has exactly one job.

**IBM Plex Mono** (700 and 400) — display, headings, eyebrows, UI labels, code, logo wordmark, M-mark. All display and UI label usage is ALL CAPS with wide or tight tracking. Body and editorial use of Mono does not exist.

**IBM Plex Sans** (variable, 400 and 600) — paragraph copy, lede, UI prose, long-form reading. Sentence case only.

**Murphydoodle** — locked to the polaroid caption. It says "Mike" beneath the photo. It does not appear anywhere else, at any size, for any other word. This is Mike's actual handwriting.

Type roles and their use cases:

| Role | Family | Size | Weight | Tracking | Case | Use |
|---|---|---|---|---|---|---|
| Display | IBM Plex Mono | 88px | 700 | −0.03em | UPPER | Hero wordmark ("MIKE MURPHY") |
| H1 | IBM Plex Mono | 56px | 700 | −0.03em | UPPER | Page titles |
| H2 | IBM Plex Mono | 36px | 700 | −0.02em | UPPER | Section headings |
| H3 | IBM Plex Mono | 22px | 700 | −0.02em | UPPER | Tutorial card titles |
| Eyebrow | IBM Plex Mono | 13px | 700 | +0.18em | UPPER | Category labels, section labels |
| Lede | IBM Plex Sans | 20px | 400 | normal | Sentence | Hero sub-headline |
| Body | IBM Plex Sans | 16px | 400 | normal | Sentence | All paragraph copy |
| Mono Label | IBM Plex Mono | 12px | 700 | +0.14em | UPPER | Badges, pills, nav, footer |
| Code | IBM Plex Mono | 14px | 400 | normal | — | Code blocks, terminal |
| Hand | Murphydoodle | 44px | 400 | normal | — | Polaroid caption only |

## Layout

Maximum content width: 1160px, centered. Page padding: 32px horizontal.

Spacing uses a 4px base grid. Prefer named steps (`space-4` = 16px, `space-6` = 24px, `space-8` = 32px) over arbitrary values. Full scale: 4 · 8 · 12 · 16 · 24 · 32 · 48 · 64 · 96 · 128px.

Page grid: the hero uses a 1.1fr / 0.9fr two-column grid at ≥ 768px (copy left, art right). Tutorial grid: 3 columns at desktop, 2 at tablet, 1 at mobile. Tutorial detail: 1fr / 280px sidebar grid.

The hero always has the polaroid in the right column. The polaroid is never centered alone without the copy column beside it.

## Elevation & Depth

Two shadow styles are in the system. No others.

**Cut-shadow stamp** (`4px 4px 0 {colors.navy}`): The signature aesthetic. Applied to: primary buttons, secondary buttons, tutorial cards, code blocks, callouts, newsletter form, input fields. This shadow does not appear on nav, footer, or any chrome element.

**Polaroid shadow** (`6px 12px 0 rgba(0,30,58, 0.55)`): Applied only to the polaroid frame. Combined with a `rotate(-2deg)` tilt (range: -3° to +2°). Never applied to other surfaces.

Soft shadow (`0 4px 12px rgba(0,30,58, 0.10)`) is available for elevated modals or overlays only.

On hover, cut-shadow elements translate `−1px, −1px` and the shadow grows to `5px 5px 0`. On active/press, they translate `+2px, +2px` and the shadow shrinks to `2px 2px 0`. Transition: 120ms `cubic-bezier(0.2, 0.7, 0.2, 1)`.

## Shapes

Corner radii:

- **2px (sm):** Inline code chips. Minor inline elements.
- **4px (md):** Buttons, badges, cards, code blocks, callouts, inputs, nav active indicator, polaroid photo frame.
- **8px (lg):** Modals, larger surface containers. Used sparingly.
- **999px (pill):** Topic filter pills, status badges with live dot, M-mark disc.

No element in this system uses a radius larger than 8px except the M-mark and pill shapes.

## Components

### Navigation Header

Sticky, **84px** tall (64px below the 820px breakpoint). Background: `{colors.cream}` at 88% opacity — dark: navy at 88% — with `backdrop-filter: saturate(140%) blur(8px)`. This is the one sanctioned blur surface in the system. Bottom border: `--color-border-default`. No cut-shadow on the header.

Inner container: max-width 1160px, centered, 32px horizontal padding (20px mobile).

Brand lockup (left): **42px** orange Loop mark + two-line wordmark — "MIKE MURPHY" (Mono 700, 16px/1.15, +0.06em) over the orange "AI HANDYMAN" eyebrow (Mono 700, 11px/1.3, +0.16em). The Loop is orange in **both** themes, per the canon lockup rule. The AI Handyman badge does **not** appear in the header — only the eyebrow text does.

The mark size and header height are tuned together: at 84px the 42px mark balances the taller bar without crowding the wordmark. Changing one without the other unbalances the top-left corner.

Nav links: `{typography.mono-label}` at 12px/+0.15em, navy (dark: chalk), uppercase, 28px gap. Hover and active: `{colors.orange}`.

Utility cluster (far right, separated by a 1px hairline with 28px padding): a 38px square bordered **search icon button**, the theme toggle in the same button style, and the Subscribe `button-primary`. Search is an icon, not a nav link and not an inline field — the header holds no text input.

Below 820px the nav collapses: lockup shrinks to a 30px mark, and the right side is a 44px search button plus a 44px hamburger opening the mobile sheet.

### Navigation Dropdown

Anchored below its trigger, 300px wide. `--color-bg-raised` ground, 1px strong border, 4px radius, cut-shadow — the dropdown is a **card**, not chrome, so the cut-shadow applies here even though the header itself never carries one.

Each row (11px/14px padding, 4px radius): a mono-label title with a trailing orange `→` that appears on hover, and an optional IBM Plex Sans 13px description beneath in `--color-text-muted`. A footer row above a hairline carries an orange "BROWSE ALL TOPICS →" link.

**Hover is a neutral wash** — `--color-text-primary` at 5% (7% in dark) — with the label turning orange. Do **not** use a translucent orange fill: orange over navy muddies to brown. This was tested and rejected.

The trigger is a nav link with a 9px chevron that rotates 180° over 120ms while open, and it takes a 2px orange bottom border in the open state. **Click to open, never hover** — hover menus fail on trackpads and touch. Outside click and Escape both close.

### Mobile Menu Sheet

Full-screen fixed overlay on solid `{colors.navy}` — not translucent, not a slide-in drawer. Top bar mirrors the header at 64px with the **cream** Loop variant (the one place the mark is not orange) and a 44px bordered close button.

Body: section labels ("CONTENT", "MORE") in orange Mono 700 10px/+0.18em; items in IBM Plex Sans 600 17px chalk with chalk-@10% hairline dividers and a trailing muted `→`. Action row: full-width Subscribe (chalk border, chalk cut-shadow) beside a 46px theme toggle. Footer: the locked tagline with orange mid-dots.

All hit targets are ≥ 44px. Body scroll locks while open.

**Where the nav actually lives.** `design-system.html` and `ui_kits/website/` show the **desktop** header only — they are visual references, not implementations. The mobile sheet, the focus trap, arrow-key menu navigation, the theme toggle, and the 820px breakpoint exist only in `SiteHeader.astro` on mikemurphy.ai, which is authoritative for all nav behavior. Don't read the kit's omissions as the spec; this document is the spec.

### Hero

Two-column grid (copy / art). Left: eyebrow → H1 → lede → button row. Right: polaroid.

The H1 in the hero reads naturally ("AI tools, explained clearly.") — it is set in IBM Plex Mono 700 but does not have to be ALL CAPS on the hero when it is a sentence. Eyebrow and other labels remain ALL CAPS.

Lede max-width: 56ch. Button row: `button-primary` + `button-secondary`.

### Polaroid

Chalk paper frame, 14px padding on three sides, 28px on bottom. Photo area: square, orange background, Mike's transparent-cutout avatar positioned to fill the frame. Caption below: Murphydoodle "Mike" in `{colors.navy}`, 44px, centered. Tilt: `rotate(-2deg)`. Shadow: polaroid shadow. Width: 248px at desktop.

The photo background is always `{colors.orange}`. The avatar image is always `avatar-mike-transparent.png` (transparent cutout, so the orange bg shows through).

### AI Handyman Badge

Navy text on orange ground. IBM Plex Mono Bold, 12px, 0.14em tracking, ALL CAPS. 8px/14px padding. 4px radius. 1px navy border. Cut-shadow stamp. Text: "AI HANDYMAN" — no other text.

Use on: tutorial cards, tutorial detail header, intro/end screens, home hero (inline in hero area, not as a nav element). Do not use on: header nav, footer, About page, generic content pages.

### Tutorial Card

Chalk background, 1px navy border, 4px radius, cut-shadow. 24px padding. Hover: `translate(-1px, -1px)` + shadow grows. Active: `translate(2px, 2px)` + shadow shrinks.

Structure (top to bottom): 56×56px thumb (colored square with glyph or avatar, 4px radius, navy border) + optional `badge-status` (for "New") · eyebrow (orange, uppercase) · H3 title (navy, uppercase, IBM Plex Mono 700 22px) · body text (IBM Plex Sans 14px) · footer row (meta timestamp left, → right) separated by 1px border-default top.

### Code Block

Chalk background, navy text, 1px strong border, 4px radius, cut-shadow — same paper-surface language as cards and callouts (matches `.code-block` in `ui_kits/website/site.css`). Top bar: filename in muted navy, teal "COPY" label far right. Code area: IBM Plex Mono 14px, line-height 1.5. Syntax accents on the light ground: keywords/links orange-deep, constants medium blue `#1D5FA0`, strings warm brown `#7A4A21`, comments navy at 55%. Prompt character (`$`) in muted color. Cursor: inline teal block — this is the one allowed teal use in the component context.

### Callout

Chalk background, 1px navy border, 4px radius, cut-shadow. Two-column layout: 32px left column with bold orange `→` mark, right column with body prose. Used for tips, warnings, "this is where people get stuck" moments.

### Newsletter Form

Orange section background. Left column: eyebrow + large H2 + lede prose. Right column: chalk form card with cut-shadow. Form contains: email input (cream bg, navy border, cut-shadow `2px 2px 0 navy`, orange focus outline) + `button-primary` spanning full width.

On success: yellow "✓ You're in." confirmation chip (yellow bg, navy text, navy border) + short follow-up prose.

### Footer

Cream background, 1px border-default top. Three columns: left = M-mark (28px) + tagline. Center = nav links. Right = version stamp (`© 2026 · v2026.5`). No cut-shadow. No AI Handyman badge.

Tagline format: `LEARN<dot>BUILD<dot>MOVE FORWARD` where `<dot>` = `·` (U+00B7) in `{colors.orange}`.

## Do's and Don'ts

**Contrast note:** Chalk-on-orange button text does not reach WCAG AA 4.5:1 for normal text. This is a deliberate brand decision — the button text is 14px bold and reads at large-text scale in context. The AI Handyman badge uses navy text on orange ground.

**Do:**
- Use `{colors.cream}` as the page background — never pure white.
- Use `{colors.navy}` for all text and borders — never pure black.
- Place one primary CTA per screen view. Orange must visually dominate.
- Apply the cut-shadow to cards, buttons, code blocks, and form inputs.
- Use Murphydoodle only for the polaroid caption.
- Apply teal to exactly one element per screen.
- Use `{colors.yellow}` only for success-state chips such as `✓ You're in.`.
- Use mid-dots (·) in the tagline, not bullets, periods, or slashes.

**Don't:**
- Use Unplugged Sans, Georgia, or any serif as a fallback for the polaroid caption.
- Bring back: cartoon Mike, washi tape, hand-drawn arrows, lighthouse, toolshed metaphor copy ("wire up," "under the hood," "blueprint"), `LEARN. CREATE. MOVE FORWARD.`
- Apply the cut-shadow to nav, header, or footer chrome. (Dropdowns and menus *are* cards, not chrome — those keep it.)
- Fill a hover state with translucent orange over navy. It muddies to brown. Use a neutral wash of `--color-text-primary` instead.
- Open a menu on hover. Click only.
- Use `{colors.yellow}` on cream, chalk, or any non-orange surface.
- Use teal on two elements in the same screen view.
- Place the AI Handyman badge in the header nav or footer.
- Write tagline variants ("Learn · Build · Ship," etc.) — the tagline is locked.
- Use `var(--mm-orange)` or any brand token directly in component CSS — always go through semantic tokens.
