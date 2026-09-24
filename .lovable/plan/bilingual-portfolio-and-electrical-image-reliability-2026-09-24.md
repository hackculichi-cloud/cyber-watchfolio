# Bilingual portfolio and Electrical image reliability

## Goal
Add a complete English/Spanish experience and make the existing real Electrical photographs reliable in Vite and production deployments, without changing the portfolio’s design, routes, animations, navigation structure, or technical identity.

## Implementation

### 1. Centralized language system
- Add a lightweight language provider and translation helpers under `src/i18n/`, with typed English and Spanish dictionaries.
- Keep English complete and add equivalent Spanish copy; preserve established security terms such as SOC Analyst, SIEM, MITRE ATT&CK, IOC, TTP, Threat Hunting, Incident Response, Playbook, Phishing, Malware, Splunk, Wireshark, and VirusTotal where appropriate.
- Store the selected language in browser storage, update the document language, and switch content without reloads or route changes.
- Keep stable internal values unchanged: route paths, profile slugs, IDs, severity keys, filters, and visual-theme selectors remain language-independent.

### 2. Header language selector
- Add a reusable `LanguageSwitcher` to the existing header with two controls: `🇲🇽 Español` and `🇬🇧 English`, plus compact `ES`/`EN` treatment where space requires it.
- Show the active language clearly using the existing button, border, and color tokens.
- Include the selector in desktop navigation and the mobile menu without changing either layout structure.
- Translate menu controls and accessibility labels, including open/close menu and skip-to-content text.

### 3. Full UI and content translation
- Translate all page-level headings, descriptions, buttons, labels, empty states, SEO copy, footer text, tooltips, image descriptions, and accessibility text.
- Translate reusable shared views once: project cards/details, galleries, before/after views, profile navigation, CV blocks, forms/contact states, modals, tables, and empty states.
- Localize data-driven content in the existing data layer instead of duplicating pages or components: site/profile data, skills, experience, CV, journal, software work, Electrical training/projects, repair content, Investigations, and Playbooks.
- Preserve the exact technical meaning of Investigations and Playbooks while translating explanatory prose and interface labels.
- Keep English URL paths and current-page/modal/section state intact when switching language.

### 4. Recover and serve the real Electrical photos
- Recover the four existing optimized JPEGs from their valid project asset records; no stock, generated, placeholder, or invented images will be introduced.
- Store production-safe copies under `public/images/electrical/` and reference them with root-relative paths such as `/images/electrical/...jpg`, which work in Vite and Vercel builds.
- Keep `src/data/electricalProjects.ts` as the single data source for project title, description, skills, tools, optional date/status, image paths, captions, and bilingual text.
- Remove the Electrical project’s runtime dependency on the current `__l5e` relative asset URLs. Those URLs return valid JPEGs on Lovable hosting but resolve to the app HTML on plain Vite hosting, which explains the broken images outside that environment.

### 5. Reliable, non-distorted image presentation
- Add a reusable image component with a fixed responsive frame, loading skeleton, `onLoad`/`onError` handling, and a designed fallback that never exposes browser broken-image alt text as the main visual.
- Use `object-contain` for Electrical technical evidence and enlarged views so conduit, wiring, devices, and board details remain visible; use cover only where the existing card frame can crop safely.
- Preserve aspect ratio, rounded corners, lazy loading, and asynchronous decoding.
- Make project cover/evidence images clickable and retain the existing large dialog preview with caption and accessible controls.

## Technical details
- No translated route prefixes and no page duplication.
- Translation dictionaries live under `src/i18n/`; localized data uses one reusable typed value/resolver pattern.
- Existing `WorkGrid`/`WorkCard`/`WorkDetail`, Investigation, Playbook, Electrical gallery, Dialog, Button, and design-token components remain the presentation foundation.
- The four currently published Electrical practice photos are: training-board work, group photo, wiring/overhead work, and installation/fan detail. The separate Electrical hero image also remains unchanged.
- No currently referenced Electrical practice photo is missing; all four remote files were verified as valid JPEG responses in preview and published Lovable hosting.

## Validation
- Test English/Spanish switching on desktop and mobile, active styling, persistence across navigation, unchanged route, unchanged section position, and open-modal stability.
- Check all major pages and shared UI for untranslated visible copy and accessibility labels.
- Verify all four Electrical photos return image content from their new local production paths, preserve aspect ratio, show loading/fallback states correctly, and open in large previews.
- Verify an Electrical project detail, an Investigation detail, and a Playbook detail in both languages.
- Check desktop and mobile layouts for overflow or navigation regression.
- Confirm the latest preview build has no errors and run focused automated tests for language state and image fallback behavior.

## Completion report
Report the exact modified files, translation-data location, Electrical image directory, available image count, and whether any images still require manual upload.
