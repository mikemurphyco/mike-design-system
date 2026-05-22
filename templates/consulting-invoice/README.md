# Consulting Invoice Template

A data-driven HTML invoice using the Mike Murphy design system tokens. Open in a browser, print to PDF.

---

## How to use it each billing period

Open `index.html` and scroll to the `<script>` block. Everything above the `// RENDERING` comment is yours to edit. Everything below it is hands-off.

### 1. Update the `INVOICE` object

```js
const INVOICE = {
  number:       "#2026-002",          // increment each invoice
  period:       "May 25 – Jun 20, 2026",
  issued:       "Jun 21, 2026",
  due:          "Upon Receipt",
  client:       "Inception Point AI",
  clientDetail: "AI Workflow Automation Consulting",
  payment:      "Zelle / ACH / Check",
};
```

### 2. Swap out the `entries` array

Each row in your time log becomes one object:

```js
{ date: "2026-05-28", desc: "Standup", phase: "Phase 2", hours: 1.25, rate: 30 },
```

| Field   | Format                        | Required |
|---------|-------------------------------|----------|
| `date`  | `YYYY-MM-DD`                  | Yes      |
| `desc`  | Plain text                    | Yes      |
| `phase` | e.g. `"Phase 2"`              | Yes      |
| `hours` | Decimal (copy from time log)  | Yes      |
| `rate`  | Hourly rate as a number       | Yes      |
| `note`  | Short string                  | No       |

The `note` field renders as a small orange line under the description — use it for things like rate change callouts.

### 3. Save as PDF

`Cmd+P` → Save as PDF. Margins: default. Background graphics: on.

---

## How it calculates

- **Per-entry amount**: `Math.round(hours × rate × 100) / 100` (integer cents, no float drift)
- **Week grouping**: automatic, based on the Sunday that starts each entry's calendar week
- **Week subtotals**: summed in cents, displayed as dollars
- **Grand total**: sum of all week subtotals in cents

You never touch the totals manually. Add or remove rows in `entries` and everything recalculates on reload.

---

## Where the design comes from

All visual tokens (`--mm-navy`, `--color-action-primary`, `--shadow-cut`, etc.) are consumed from `tokens/colors_and_type.css`. If the brand token values ever change, this template picks them up automatically — nothing to update here.

---

## Where to save the rendered PDF

`outputs/` — that directory is gitignored. The template lives here in `templates/`, the rendered invoice lives there.

Suggested filename convention: `inception-point-ai-invoice-2026-001.pdf`
