# Repair character poses

The owner asked for Repair's secondary foxes to match the taller, slimmer standalone technician and to interact with the content from different positions. The existing `src/assets/mascot-scenes/repair.webp` was inspected and supplied to the image-generation editing tool as the identity/proportion reference.

The generated transparent sheet is retained at `/workspace/generated_images/exec-f9c4a74b-bb0d-4738-a0a6-65300c198fe4.png`. Local WebP derivatives are `src/assets/mascot-scenes/repair-content-poses.webp` (1536 × 1024) and `src/assets/mascot-previews/repair-content-poses-768.webp` (768 × 512). CSS crops each complete figure without stretching its proportions: a document presenter, a phone/magnifier inspector and a seated clipboard companion. The blank illustrated board is decoration, not a credential or repair record.

Certificate introduction: document pose to the left, outside the full-width certificate card. Smartphone work: inspector to the right. Tools: original taller technician on the left of the content. CV: seated companion on the right. Mobile layouts reserve a separate heading space for the figures and leave the content full width beneath it. All figures remain decorative and cannot intercept pointer input. The footer keeps its previous practice artwork and stationary preview behavior.

`e2e/repair-mascot-presentation.spec.ts` checks the three body crops, tall aspect ratios, distinct docks, content separation, preserved footer artwork and page width at 320, 820 and 1440 px.
