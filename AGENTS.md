# Architecture rules

- Import the selected homepage logo as a local image asset and derive the public favicon from it so both work without external image services.
- Render contact previews from uploaded screenshot assets or a local email composition preview, never embedded external pages, to avoid blocked frames and third-party requests.
- Keep electrical practice entries data-driven with optional user-controlled video in shared work details; this preserves existing project cards and distinguishes each work context without separate page implementations.
- Keep uploaded CV PDFs and faithful first-page previews local. Use the shared explicit preview dialog and preserve original uploads when creating branded copies.
- Give each professional profile its own top-level Lucide icon and named dropdown links, and render other navigation destinations as translated text; this keeps disciplines distinct and avoids tooltips overlapping dropdowns.

# Owner presentation preferences

- Keep «Sobre mí» / About out of the top desktop and mobile menus; the About page remains accessible from the footer.
- Keep each Home outfit's three tools floating around the character on hover/focus, clear of the area buttons. Use the section's single accent for all its tools; do not replace them with a rail or individually colored cards.

- Keep unpublished collections compact in every area: use one brief pending row, never grids of empty image cards or large blank panels. Preserve existing anchors and automatically show the real collection when data is published.
- Review Spanish spelling and technical meaning across all profiles, menus and dialogs. Render plain Unicode text rather than HTML entities; preserve commands, case identifiers, filenames, domains and evidence values exactly. Keep user-facing empty-state copy about the portfolio, not data-file editing instructions.
- Give each profile title a readable visual identity related to its discipline and synchronize the Culichi header lettering automatically with that profile, including Home hover/focus previews. Keep navigation position stable and avoid continuous costly effects.
- Keep the browser tab title exactly `Christian Velasco` on every route and in both languages; profile-specific headings and sharing metadata can retain their section names.
