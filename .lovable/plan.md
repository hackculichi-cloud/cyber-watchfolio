## Goal

Expand only the Electrical profile into a more informative, evidence-based portfolio while preserving the current navigation, typography, dark engineering aesthetic, spacing, and responsive behavior.

## Implementation

### 1. Data-driven electrical content
- Expand `src/data/electrical.ts` with the RED CONOCER course summary, all 8 curriculum modules, a clearly labeled practical-skills list, and editable tool/equipment groups.
- Add `src/data/electricalProjects.ts` as the source of truth for electrical work. Each object supports title, summary, skills, tools, work performed, date, status, cover image, and multiple evidence photos.
- Publish the four supplied photographs as one real training-board practice project, without inventing a date or unsupported claims. Captions will describe only what is visibly documented.

### 2. Training and skills presentation
- Add an `ElectricalCurriculum` component with a concise course summary and accessible expandable module rows.
- Add compact skill and equipment displays using existing tags, panels, tokens, and profile styling.
- Present measurements, circuit analysis, diagrams, diagnostics, and multimeter use as studied/practiced skills—not certifications or advanced expertise.

### 3. Reusable projects and detail view
- Reuse the existing image-first `WorkGrid`, `WorkCard`, `WorkDetail`, and `DetailModal` architecture rather than duplicating it.
- Feed Electrical projects from `electricalProjects.ts`; a future project will require only a new data object and its photos.
- Map skills, tools, performed work, optional date/status, and multiple photos into the existing card and modal system.

### 4. Practical evidence gallery
- Add a reusable evidence gallery sourced from the same project image data, so photos are not maintained twice.
- Preserve each image’s natural aspect ratio, include concise captions, open images in a larger accessible preview, and use a mobile-friendly grid.
- Keep the gallery honest: only uploaded photographs render; no generated images or fake project claims.

### 5. Electrical page integration
- Update only the Electrical page sections and content order needed to add Training, Skills, Projects, Practical Work / Evidence, and Tools & Equipment.
- Preserve all existing Electrical content, cross-profile links, navigation, CV block, and current profile atmosphere.

## Validation

- Check expandable curriculum behavior, project modal, image preview, captions, and keyboard-accessible controls.
- Verify the Electrical page at desktop and mobile sizes and confirm no overlap or aspect-ratio distortion.
- Confirm the preview build has no errors and that SOC pages/files remain untouched.

## Out of Scope

- No site-wide redesign, navigation change, typography change, or new visual language.
- No edits to SOC investigations, playbooks, or cybersecurity content.
- No invented credentials, project dates, equipment ownership, or professional-expertise claims.
