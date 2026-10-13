# Architecture rules

- Import the selected homepage logo as a local image asset and derive the public favicon from it so both work without external image services.
- Render contact previews from uploaded screenshot assets or a local email composition preview, never embedded external pages, to avoid blocked frames and third-party requests.
- Keep electrical practice entries data-driven with optional user-controlled video in shared work details; this preserves existing project cards and distinguishes each work context without separate page implementations.
- Store uploaded CV PDFs and first-page image previews as asset pointers, sharing one hover-preview wrapper across CV download links; this keeps previews faithful without embedding PDF viewers.
- Give each professional profile its own top-level Lucide navigation icon while preserving named child links and translated accessible labels/tooltips; this keeps distinct disciplines discoverable without overlapping dropdown labels.
