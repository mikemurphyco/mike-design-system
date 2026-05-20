# BRAND CANON
**Mike Murphy · AI Handyman · v2026.2**

> Clean, calm, technical, warm, lightly handmade, never corporate.

This is the locked brand. Every decision below has been made. If something on the website, in a deck, on YouTube, or in a PDF disagrees with what's on this page, this page wins.

---

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

Every shipped surface — site footers, deck end-slides, PDF meta rows, tutorial outlines, social templates — carries this stamp:

`Mike Murphy AI`

IBM Plex Mono, navy on light surfaces, cream on dark or orange surfaces. The stamp is brand identity, not a version tag — it signs the work, it doesn't date it.

Version tracking lives in this document's own header (`v2026.2`), not on shipped surfaces. When the canon changes, bump the header version here first, then propagate the change through the system.

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
| Horizontal lockup    | M-mark + `MIKE MURPHY` + `· AI HANDYMAN` orange eyebrow                                                  | Site navigation, document headers                         |
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

Two marks are now part of the system. Both are production SVGs in `assets/loops-nodes/`.

### The Loop
A single continuous spiral path. One stroke, uniform weight, no fill, no disc container.
The Loop is the **primary mark** — the face of the brand. Warm, human, a drawn gesture.

- **Stroke:** `#FF6434` (orange) on light surfaces, `#FCFAF6` (chalk) on dark surfaces — same chalk token, no separate variant
- Transparent background — works on any surface
- Animates by drawing the path (stroke-dashoffset)

Use on: site header, social profiles, podcast art, newsletter header, hero moments.

### The Node
An asymmetric constellation in a cream disc. Central orange node, three satellites at different weights and positions, connected by clean lines.

- **Disc fill:** `#FCFAF6` (chalk) with 4px navy cut-shadow offset
- **Central node:** `#FF6434` (orange)
- **Upper-left satellite:** `#001E3A` (navy, full opacity — largest, pushed out)
- **Right satellite:** `#1ECEBE` (teal — the one AI pop per screen rule applies)
- **Lower-left satellite:** `#001E3A` at 35% opacity (intentional ghost)
- Navy disc alternate available for dark surfaces
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
