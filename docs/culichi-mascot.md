# Culichi mascot

The owner requested a new fox mascot inspired by the existing local fox logo, related to electricity, electronics, repair, AI and cybersecurity, with a different outfit for each professional area. Artwork was generated with the image generation tool using the existing fox as reference. It is branding artwork, not photographic work evidence.

`src/assets/culichi-mascot-atlas.webp` is a locally stored transparent 3×3 atlas. It was converted to WebP for delivery (about 508 KiB, down from 2.3 MiB PNG). CSS chooses a cell without separate image downloads per costume. `CulichiMascot` shares the artwork across the home hero, profile heroes and header. The header selects the outfit by the actual route. Small bottom viewport masks prevent adjacent atlas rows bleeding into the visible costume.

Row-major order: universal technology fox; SOC; software; electricity; electronics; repair; customer service; AI; fox head emblem. Cyan circuitry, shields, lightning and tools identify the disciplines. The three-wave chest emblem is a stylized reference to Culiacán's rivers, not an official civic logo. No employer or qualification is implied.

`public/favicon.svg` selects the last atlas cell with an SVG viewport. Its embedded image makes it self-contained for favicon restrictions. The original fox asset and original favicon PNG remain available, but are no longer the active logo/favicon.

Future illustration changes should use the image generation tool, preserving the same identity and cell order. No external image service or live AI request is needed when visiting the site.
