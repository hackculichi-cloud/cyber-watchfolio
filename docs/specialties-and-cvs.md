# Specialties and role-specific CVs

The six existing profiles share `src/data/specialties.ts`. Each entry defines a stable hash, icon, short preview, training status and related existing content. Header dropdowns and profile pages use the same data. `ProfileSectionPreview` provides explicit eye-button, keyboard and touch access on Home without putting a button inside a link.

Confirmed learning states:

- Linux diploma in progress. Institution not inferred.
- Frontend, backend and full-stack university studies at UNISITE, in progress.
- Basic electronics at Escuela Tecnológica de Occidente, in progress.
- Audio/radio, television/video and digital systems: planned.
- Residential training and documented client work; industrial training in progress; START/STOP practical control exercise planned.
- SOC and Windows evidence comes from educational LetsDefend cases, not professional SOC employment.

## CV source and generation

`src/data/resumes.json` contains the six tailored documents in English and Spanish. They use the existing portfolio and owner-confirmed training; employer names, employment dates, degree names, grades, proficiency scores and performance metrics are not inferred.

Run `npm run generate:cvs` with an installed Playwright Chromium and Poppler (`pdfinfo` and `pdftoppm`). In this cloud workspace:

```sh
PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH=/usr/bin/chromium npm run generate:cvs
```

The generator renders offline, creates twelve one-page tagged A4 PDFs (six areas × two languages), rejects multi-page outputs, rasterizes each actual first page to PNG, and writes the lightweight `cvManifest.json` used by the app. The complete source documents are not bundled into client JavaScript. Generated PDFs/previews are committed so deployment does not require Poppler or regeneration.

`CvActions` shares downloads and an explicit preview dialog that works by touch. Each profile references its own CV id. The original electrical CV is primary; its updated ES/EN alternative remains on `/cv`.

No new dependencies. The existing chunk-size warning remains visible.

## Explicit previews and themed documents

Area previews open only by activating the eye button (click, touch, Enter/Space); hover and focus alone do not open them. CV download links do not open hover previews. The shared CV dialog provides width fit and 100–200% zoom with a scrollable image of the actual PDF.

The original user-provided electrical PDF is the primary electrical CV, copied byte-for-byte into public/cv with a freshly rasterized first page. Its original claims are preserved, including the RED CONOCER accreditation statement; the user has previously confirmed this training is in progress. The updated ES/EN electrical alternative remains on /cv with the confirmed training status. The other CVs follow the original dark header and section-panel design, with cyan/green/amber/orange/violet/teal accents by area. Generated previews are 1600 pixels tall and all generated PDFs remain one page.
