# Specialties and role-specific CVs

The six existing profiles share `src/data/specialties.ts`. Each entry defines a stable hash, icon, short preview, training status and related existing content. Header dropdowns and profile pages use the same data. `ProfileSectionPreview` provides explicit eye-button, keyboard and touch access on Home without putting a button inside a link.

Confirmed learning states:

- Linux diploma in progress. Institution not inferred.
- Frontend, backend and full-stack studies at Academlo, incomplete (confirmed by owner).
- Basic electronics at Escuela Tecnológica de Occidente, in progress.
- Television; radio reception and amplifiers; digital systems; microcontrollers; microcomputers; industrial electronics: upcoming. Basic electronics at ETO remains in progress.
- Residential training and documented client work; industrial training in progress; START/STOP practical control exercise planned.
- SOC and Windows evidence comes from educational LetsDefend cases, not professional SOC employment.

## CV source and generation

`src/data/resumes.json` contains the six tailored documents in English and Spanish. They use the existing portfolio and owner-confirmed training; employer names, employment dates, degree names, grades, proficiency scores and performance metrics are not inferred.

Run `npm run generate:cvs` with an installed Playwright Chromium and Poppler (`pdfinfo` and `pdftoppm`). In this cloud workspace:

```sh
PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH=/usr/bin/chromium npm run generate:cvs
```

The generator renders offline, creates twelve one-page tagged A4 PDFs (six areas × two languages), rejects multi-page outputs, rasterizes each actual first page to PNG, and writes the lightweight `cvManifest.json` used by the app. The complete source documents are not bundled into client JavaScript. Generated PDFs/previews are committed so deployment does not require Poppler or regeneration.

`CvActions` shares downloads and an explicit preview dialog that works by touch. Each profile references its own CV id. The electrical mascot copy is primary; the unmodified original remains downloadable. The extra updated electrical entry has been removed from `/cv` as requested.

No new dependencies. The existing chunk-size warning remains visible.

## Explicit previews and themed documents

Area previews are momentary: hold the eye button (mouse, touch, Enter/Space) to show a read-only overview; release, cancellation, focus loss, Escape or window blur closes it. Pointer capture ensures releasing outside the eye also closes it. Hover and focus alone do not open it. Enter the card normally to navigate. CV download links do not open hover previews. The shared CV dialog provides width fit and 100–200% zoom with a scrollable image of the actual PDF.

The original user-provided electrical PDF remains unchanged in public/cv. Its separately stamped mascot copy is the primary electrical CV. Its original claims are preserved, including the RED CONOCER accreditation statement; the user has previously confirmed this training is in progress. The additional updated electrical card was removed; previously generated files are retained as historical assets without a download entry. The other CVs follow the original dark header and section-panel design, with cyan/green/amber/orange/violet/teal accents by area. Generated previews are 1600 pixels tall and all generated PDFs remain one page.

ETO basic electronics now includes the owner's supplied course objectives and eight modules inside the expanded basic-electronics detail, with a collapsed syllabus control. Instruments and diagnostic topics are described as learning objectives, not completed competencies. Expected completion is February; no year or graduation is inferred. The electronics CV includes the same expected month and a compact summary of the syllabus.
