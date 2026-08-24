## Goal

Refactor Investigations (`ProjectsSection`) and Playbooks (`LabsSection`) into reusable, data-driven components. Each card opens a detailed modal following a strict template. Adding a new investigation/playbook = adding one object to a data file. Visual style, matrix background, neon-green terminal aesthetic all preserved.

## Architecture

```text
src/
  data/
    investigations.ts     ← array of Investigation objects (source of truth)
    playbooks.ts          ← array of Playbook objects
  types/
    soc.ts                ← Investigation + Playbook TypeScript interfaces
  components/
    investigations/
      InvestigationCard.tsx     ← compact card (grid item)
      InvestigationDetail.tsx   ← full template rendered inside modal
    playbooks/
      PlaybookCard.tsx
      PlaybookDetail.tsx
    shared/
      DetailModal.tsx           ← shadcn Dialog wrapper w/ terminal styling
      SectionBlock.tsx          ← "> section_title" header + content slot
      DataTable.tsx             ← small terminal-styled table (IOCs, MITRE, Timeline)
  components/
    ProjectsSection.tsx   ← now just maps investigations → InvestigationCard grid
    LabsSection.tsx       ← now just maps playbooks → PlaybookCard grid
```

## Data Model

**Investigation** fields (all optional except caseInfo + executiveSummary + verdict so partial entries render cleanly):
`caseInfo, executiveSummary, alertInfo, triage, steps[], evidence, iocs[], mitre[], timeline[], analysis, responseActions, additionalDataRequested[], lessonsLearned, verdict, severity, tools[]`

**Playbook** fields:
`id, name, objective, scope, prerequisites, tools[], steps[], decisionTree, containment, eradication, recovery, escalation, mitre[], detectionOpportunities, lessonsLearned, tags[]`

**Shared optional metadata (both types, backward compatible):**
- `difficulty?: "Beginner" | "Intermediate" | "Advanced"`
- `estimatedTime?: string` (e.g. `"30 min"`)
- `references?: { label: string; url?: string }[]`
- `analystNotes?: string`

All four fields are optional. Rendering rule: **the corresponding UI block is only mounted when the field has a truthy/non-empty value.** Existing data objects without these fields render exactly as before.

Where they appear (only when present):
- `difficulty` + `estimatedTime` → small chips in the card header and detail header, next to severity/tags.
- `references[]` → "References" section at the bottom of the detail modal (links open in new tab; plain text if no url).
- `analystNotes` → "Analyst Notes" callout block near the end of the detail modal, above References.

Both existing entries (VPN unauth access, RDP brute force + 2 playbooks) migrated into the new data files with the fuller template. Empty sections auto-hide.

## UI Behavior

- Cards keep current `panel-glow` styling, severity chip, tool tags, short description; new difficulty/time chips appear only if provided.
- Click card → opens `DetailModal` (shadcn Dialog, `max-w-4xl`, scrollable body, neon border, matrix-tinted backdrop).
- Detail view = vertical stack of `SectionBlock`s in the required template order. Sections with no data are skipped.
- Tables (IOCs, MITRE, Timeline) render via `DataTable` with monospace + neon header row.
- Fully responsive: single column on mobile, 2-col grid ≥ md.
- No changes to Navbar, Hero, Matrix background, colors, fonts.

## Adding a New Investigation Later

1. Append an object to `src/data/investigations.ts` (include any of the optional fields as needed).
2. Done — card + detail view render automatically, hiding any blocks you leave out.

Same for playbooks in `src/data/playbooks.ts`.

## Out of Scope

- No routing changes (modal, not dedicated pages — faster + preserves single-page terminal feel; can switch to routes later without touching data).
- No visual redesign, no new colors, no new fonts.
- Existing content preserved; empty template fields left blank until you fill them.