# Start Here

This is the human operating guide for the Mike Murphy design system.

The system is allowed to be powerful. You are also allowed to touch it.

If you are unsure where to start, start here. This file is not canon. It is a map for working without feeling like every small design move might break the machine.

---

## The Three Layers

### 1. Design layer

This is the part you already know how to use.

- colors
- type
- marks
- layout
- hierarchy
- voice
- templates
- finished visual judgment

Most normal design work happens here.

### 2. Canon layer

These files explain the rules.

- `BRAND-CANON.md`
- `SYSTEM.md`
- `DESIGN.md`
- `README.md`
- `tokens/colors_and_type.css`

Edit these when the system itself changes, not when you are just making a one-off thing.

### 3. Automation layer

These files keep the system synced.

- `scripts/`
- `.githooks/`
- `package.json` scripts

You do not need to understand all of these to use the design system. They are guardrails and maintenance tools. When in doubt, ask Codex before editing them.

---

## What You Can Safely Do

### Use existing assets

Safe:

- grab SVGs or PNGs from `assets/`
- use Loop marks from `assets/loops/`
- use Node marks from `assets/nodes/`
- use logo lockups from `assets/logos/`
- use avatars from `assets/avatars/`

You are not changing the system by using an asset.

### Make work from a template

Safe:

- open a template in `templates/`
- change visible text
- swap an approved asset
- export a PNG or screenshot
- save one-off outputs outside the repo or in `outputs/`

You are using the factory, not rewriting it.

### Experiment visually

Safe:

- duplicate an HTML template
- sketch a new layout
- try a different Loop color
- test Node animation ideas
- create a scratch review page

Best home for experiments:

```text
outputs/
scripts/experiments/
templates/[new-template-name]/
```

If the experiment becomes reusable, then promote it into the system.

---

## When to Be Careful

Be more deliberate when touching:

- `tokens/colors_and_type.css`
- `BRAND-CANON.md`
- `DESIGN.md`
- `scripts/`
- `.githooks/`
- generated PNG folders

These files either define rules or keep assets synced.

Careful does not mean forbidden. It just means: make the change intentionally, then run the checks.

---

## Common Things You Might Want To Do

### I want to use the Loop as a logo

Go to:

```text
assets/loops/
```

Use:

- `loop-orange-128.svg` on light surfaces
- `loop-navy-128.svg` on light surfaces when orange is too loud
- `loop-cream-128.svg` or `loop-chalk-128.svg` on dark surfaces
- `loop-teal-128.svg` only when teal is the intentional AI accent

For smaller UI contexts, use the 64, 40, or 24 px orange versions.

### I want to use the Node

Go to:

```text
assets/nodes/
```

Use `floating/` first. That is the current preferred direction for system and animation work.

Use `badged/` when the node needs to sit inside a contained icon shape.

Use `legacy/` only when you need the older disc treatment or are comparing past versions.

### I changed an SVG

Run:

```bash
npm run generate
npm run check
```

`generate` refreshes PNGs from source SVGs.

`check` looks for brand drift, version drift, and obvious token mistakes.

### I changed a color token

This is a system-level change.

Run:

```bash
npm run generate
npm run check
```

Also update the canon if the meaning of the color changed.

### I want to make a new recurring design format

Create a new folder under:

```text
templates/
```

Good examples:

- `templates/youtube-thumbnails/`
- `templates/beehiiv-newsletter-banner/`
- `templates/consulting-invoice/`

Templates are for things you will make more than once.

### I want to make a one-off graphic

Use a template, export the result, and save the output outside the repo or in:

```text
outputs/
```

One-off graphics do not need to become canon.

### I want to change the rules

Start with:

```text
BRAND-CANON.md
```

Then update:

```text
SYSTEM.md
DESIGN.md
README.md
```

Only update the docs that actually need to know about the change.

---

## The Safe Commands

These are normal maintenance commands.

```bash
npm run generate
```

Regenerates canonical SVG/PNG assets.

```bash
npm run check
```

Checks canon colors and version consistency.

```bash
npm run bump v2026.N
```

Bumps the design system version across the repo. Use only when intentionally releasing a new canon version.

---

## What the Checks Mean

### No drift

Good. The repo is internally consistent.

### Warnings

Usually okay. A warning means a color is close to a canon value but not exact. Sometimes that is intentional; sometimes it is a stale paste.

Warnings are worth reading, but they do not block work.

### Drift

Needs fixing. Drift means a retired or incorrect brand value has appeared somewhere.

### Version mismatch

Needs fixing. Version files disagree about which canon version this is.

---

## The Plain-English Rule

If you are designing, use:

```text
assets/
templates/
design-system.html
ui_kits/
```

If you are changing the system rules, edit:

```text
BRAND-CANON.md
SYSTEM.md
DESIGN.md
tokens/colors_and_type.css
```

If you are changing automation, ask Codex:

```text
scripts/
.githooks/
package.json scripts
```

---

## Recovery

If something feels off:

```bash
npm run check
```

If assets look stale:

```bash
npm run generate
```

If you do not understand the output, paste it into Codex and ask what matters.

The system is not fragile. It is inspectable. The checks are there so you can see what changed instead of guessing.

