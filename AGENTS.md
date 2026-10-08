# Architecture rules

- Import the selected homepage logo as a local image asset and derive the public favicon from it so both work without external image services.
- Render contact previews from uploaded screenshot assets or a local email composition preview, never embedded external pages, to avoid blocked frames and third-party requests.