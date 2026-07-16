# Consulting Invoice Template

A data-driven HTML invoice using the Mike Murphy design system tokens. Import an Airtable CSV, fill in a few fields, print to PDF.

> **Bookmark this file in your browser** — `file:///Users/mikemurphy/Code/Projects/mike-design-system/templates/consulting-invoice/index.html`

---

## Each billing period workflow

### 1. Export from Airtable

Open your **Unsubmitted Time** view → Download CSV. No other view or configuration needed.

### 2. Drop the CSV

Open `index.html` in a browser. Drag the CSV file onto the page (or click **Import CSV**).

The template auto-populates:
- All line items, grouped by week with subtotals
- **Period** and **Issued** dates (derived from the first and last entry dates)
- Rate changes are detected automatically and annotated inline

### 3. Edit the header fields

Click any field to edit it in place — no code required:

| Field | Default | Notes |
|---|---|---|
| Invoice number | `#2026-002` | Increment each period |
| Client name | placeholder | Inception Point AI |
| Description | placeholder | AI Workflow Automation Consulting |
| Period | auto-filled | From CSV dates |
| Issued | auto-filled | From last CSV entry date |
| Due | `Upon Receipt` | Edit if different |
| Payment | `ACH` | Edit if different |

### 4. Save as PDF

`Cmd+P` → Save as PDF. Under **More settings**, use:

- Margins: default
- Background graphics: on
- Headers and footers: off (this removes the local file path from the PDF footer)

The import bar disappears automatically in print/PDF output.

---

## Airtable CSV columns used

The template reads these exact column headers from the Airtable export:

| Column | Used for |
|---|---|
| `Description` | Line item description |
| `Phase` | Phase column |
| `Date` | Entry date (M/D/YYYY format) |
| `Duration Hours` | Hours worked |
| `Hourly Rate` | Rate (e.g. `$30.00`) |

All other columns in the export are ignored.

---

## How it calculates

- **Per-entry amount**: `Math.round(hours × rate × 100) / 100` (integer cents, no float drift)
- **Week grouping**: automatic, based on the Sunday that starts each entry's calendar week
- **Week subtotals**: summed in cents, displayed as dollars
- **Grand total**: sum of all week subtotals in cents
- **Rate change annotation**: if consecutive entries have different rates, a note is added automatically

---

## Where the design comes from

All visual tokens (`--mm-navy`, `--color-action-primary`, `--shadow-cut`, etc.) are consumed from `tokens/colors_and_type.css`. If brand token values ever change, this template picks them up automatically.

---

## Where to save the rendered PDF

`outputs/` — that directory is gitignored. The template lives here in `templates/`, the rendered invoice lives there.

Suggested filename: `inception-point-ai-invoice-2026-002.pdf`
