# Specialties and role-specific CVs

The six existing profiles share `src/data/specialties.ts`. Each entry defines a stable hash, icon, short preview, training status and related existing content. Header dropdowns and profile pages use the same data. `ProfileSectionPreview` provides hover, keyboard and touch access on Home without putting a button inside a link.

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

`CvActions` and `CvPreview` share language-specific downloads, focus/hover previews and an explicit preview dialog that works by touch. Each profile references its own CV id. The previous user-provided electrical CV remains an additional reference on `/cv`.

No new dependencies. The existing chunk-size warning remains visible.
