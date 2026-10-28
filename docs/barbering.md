# Barbería

`/barbering` is the seventh portfolio area. Christian confirmed haircutting as a practical skill and **Baltra Barbería, Guadalajara, Jalisco**, as the school. No course title, dates, completion status, certification, school URL, haircut photographs or equipment models have been inferred.

The page reuses `ProfileHero`, the responsive workspace viewer, `ProfileSectionNav`, `SectionHeading` and the compact unpublished collection. It exposes three stable destinations: `#training`, `#cuts` and `#tools`. On phones, one section is visible at a time; the hero's cuts link and dropdown links select and reveal their destinations immediately. The session guide is a general outline for documenting future cuts, not evidence of a completed exercise.

The haircut and personal-tool photo collections live in `src/data/barbering.ts`. They accept original `GalleryItem` photographs, captions and categories. Empty cuts render one compact pending row; an original gallery appears automatically once records exist. Equipment cards describe common barbering tools without claiming brands or ownership. No barbering CV is published until enough confirmed education and work detail is available; all existing CVs remain unchanged.

Visual identity uses rose and warm metal accents, scissors navigation, static polished lettering with a barber pole, and automatically matching Culichi lettering in the header and Home previews. The mascot wears a barber apron and holds a clipper and comb inside a complete barbershop illustration. A separate transparent cutout supports the Home outfit, header, footer and tool-section illustration. An independent macro equipment atmosphere continues across the profile and footer. Artwork is illustration, distinct from personal haircut evidence.

Generated image originals, retained outside the repository:

- Workspace: `/workspace/generated_images/exec-bdb8d8a4-fa46-4e98-9183-52a6f2b5fa76.png`.
- Transparent character: `/workspace/generated_images/exec-d25abef3-1623-4931-b1da-ebc5ba624adc.png`.
- Materials atmosphere: `/workspace/generated_images/exec-c9451555-cc3f-4481-bc3f-c81e478e7ab7.png`.

Local WebP derivatives preserve the originals. Workspace variants are 1536×1024 and 768×512; the character is 1024×1536 with transparency. The artwork maps are separate from the character's identity, so a future animal change does not require replacing the page or its content.

Home, desktop/mobile menus and footer include all seven areas. Orbit positions derive from profile count; the seventh phone control sits below the character, with a shorter stage for small screens. Original six decorative scenes stay distributed in Home without adding another row. Spanish remains the default; English uses the existing single flag toggle. Browser tab text remains `Christian Velasco`.

## Realistic tools and lighter rendering — 28 October 2026

The four barbering kit cards and the Home clipper/scissors props now use a local generated product-image atlas, with a visible reference-image caption. It is not presented as a photograph of Christian's own equipment. Original: `/workspace/generated_images/exec-d7bdacb3-1eb8-4884-8237-b2bcc942bb52.png`; WebP derivative: `src/assets/barber-tools-realistic.webp` (77,518 bytes). The shared tool-prop PNG remains preserved; active rendering uses its WebP derivative (318,610 bytes instead of 1,663,151, approximately 81% smaller). Reveal wrappers paint content immediately without intersection observers, scroll-triggered React updates or entrance transforms. Translucent blur layers and repeating decorative float/pulse/blink effects are disabled. Profile backgrounds and the manual outfit selector remain available.

The tool sheet now has true alpha transparency, removing the visible square image backgrounds. The edit preserves the realistic tools and their four positions; source `/workspace/generated_images/exec-20a35d1d-f5d6-45ca-a072-972e4a0c6898.png` is retained, and the local WebP preserves alpha. Navigation no longer waits for an outfit animation. Profile loading keeps the header/footer mounted, with a local content fallback and selected-route preloading on pointer/focus intent. About is removed only from the top menus and remains in the footer. Home's original active-link styling and grid are preserved, following the owner's clarification.

The tool cards also drop their panel backgrounds and borders, leaving unframed cutouts with labels. On desktop the decorative fox beside the tools heading is limited to 8rem wide, avoiding a tall empty heading block.
