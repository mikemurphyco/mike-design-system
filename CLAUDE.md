# CLAUDE.md — Working in this brand

Read this before generating anything for Mike Murphy / AI Handyman.

## The North Star

Mike is the AI Handyman. He's the guy who already wrestled with the hard part and now shows you the shortcut. The brand is **clean, calm, technical, warm, lightly handmade, never corporate.**

If a design feels like a SaaS landing page, it's wrong.
If it feels like a guru funnel, it's wrong.
If it feels like a calm, slightly handmade workbook from someone who actually used the tool yesterday — it's right.

## Hard rules (do not break)

1. **Read `BRAND-CANON.md` first, then `SYSTEM.md`.** The canon is the locked brand bible — it overrides anything in this file or any prior chat. `SYSTEM.md` is the operational guide: file map, component decision tree, layout recipes. Together they get you started on any task.
2. **Consume semantic tokens only.** Never hardcode hex values in components. `var(--color-action-primary)`, not `#FF6434`.
3. **The tagline is locked:** `LEARN · BUILD · MOVE FORWARD`. Mid-dots, ALL CAPS, IBM Plex Mono Bold. No periods, no commas, no "create," no "ship."
4. **One AI pop per screen.** Teal `#1ECEBE` shows up on exactly one element — the cursor in a code block, a "live" status dot, the teal satellite in the Node mark. Never on two things at once.
5. **Cut-shadow stamps go on content, not chrome.** Cards, code blocks, inputs, primary buttons get the 4×4 navy offset shadow. Nav, header, and footer do not.
6. **Yellow is reserved for success-state chips only** (e.g., `✓ You're in.` newsletter confirmation). It is no longer the badge's primary ink — the badge is navy text on orange ground. Don't free yellow onto hero surfaces, body type, or buttons.
7. **Murphydoodle is locked to the polaroid caption.** It says "Mike" on the polaroid. It does not say anything else, anywhere else.
8. **Two marks, two jobs.** Loop mark = primary brand mark (header, social, personal surfaces). Node mark = system/content mark (tutorial cards, technical surfaces). Never swap their roles.

## Voice rules

- First person. "I" and "you." Mike is talking to one curious human, not "users."
- Calm and technical. Real tool names, real workflows. No "unleash," "unlock," "supercharge."
- Em dashes sparingly. Parentheses for quick side thoughts.
- Exclamation marks rarely, only when genuinely human.
- Phrases that are on-brand: "Here's what this actually does." "This is where people get stuck." "This part is a little janky, but it works."
- Phrases that are off-brand: "wire up," "ship it," "level up," "10x," "game-changer," anything from the toolshed metaphor era.

## The NOT list

Never bring these back, no matter how nostalgic they look:

- Cartoon Mike (illustrated character)
- The toolshed / workshop metaphor in copy or visuals
- Washi tape, hand-drawn arrows, deco illustrations, lighthouse, cloud
- Unplugged Sans (the previous display font)
- `LEARN. CREATE. MOVE FORWARD.` — old tagline with periods
- "AI Unplugged" as a sub-brand name (the newsletter is just "the newsletter")

## Working pattern

When asked to design something new for the brand:

1. **Start from the system, not from scratch.** Open `design-system.html` and `ui_kits/website/index.html` and lift components and patterns. Don't reinvent the card, the badge, the polaroid. `SYSTEM.md` has the decision tree from "user asked for X" to "here's the component to lift."
2. **Pick layouts from the locked vocabulary:** cut-shadow card grid, polaroid + headline + lede, eyebrow + display + body, badge row + headline + meta. Full list in `SYSTEM.md`.
3. **Audit against the NOT list before you ship.** If anything in your draft would have to be deleted on review, delete it now.

## Stamping & Versioning

Stamp every shipped surface with `Mike Murphy AI` in the footer or meta row. IBM Plex Mono where the surface supports type choice. The stamp is brand identity, not a version tag — it tells you whose work this is, not which release it's from.

Version tracking still matters, but it lives inside `BRAND-CANON.md`'s own header (currently `v2026.3`), not on shipped surfaces. When the canon changes, bump that header version and update `BRAND-CANON.md` first, then propagate the canon change through every surface.
