# Electrical welcome mascot artwork

These new images are decorative animation artwork for the Home welcome scene, generated with OpenAI image generation on 2026-11-05. They are not photographs, repair evidence, measurements or certificates.

The character references are the existing local electrical Culichi illustrations:

- `public/images/mascot-scenes/electrical-leaning.webp`
- `public/images/mascot-scenes/electrical-kneeling.webp`

The source generation is retained outside the repository at `/workspace/generated_images/exec-faedb744-8093-470e-8af4-d2115d6fddcc.png` (1774 × 887 px, RGBA). It requested a consistent 4-column × 2-row transparent full-body animation sheet, the same orange-and-white fox with blue eyes and yellow electrician outfit, no text, blank multimeter screen, successive measuring/probe positions followed by a friendly hand-raise/wave.

Only whole-image resizing and WebP encoding were used to produce the two local delivery files; the poses were not reconstructed from real work pictures:

| File | Dimensions | Cell size | Bytes |
| --- | --- | --- | --- |
| `public/images/welcome/culichi-electrical-sprite.webp` | 1536 × 768 | 384 × 384 | 433808 |
| `public/images/welcome/culichi-electrical-sprite-mobile.webp` | 1024 × 512 | 256 × 256 | 212582 |

Both files use the same atlas geometry. With a square viewport and `background-size: 400% 200%`, columns are at horizontal background positions 0%, 33.333333%, 66.666667% and 100%. The top row (`background-position-y: 0%`) contains four measuring frames, with a changing elbow/wrist/probe position and a downward-looking face. The bottom row (`background-position-y: 100%`) contains four greeting frames with a raised waving glove and a face turned toward the visitor. The foot baseline is approximately 97% down each cell. Greeting column four is suitable as a static reduced-motion pose.

The measuring probe tip moves roughly from (84%, 52%) to (89%, 81%) within a cell. The welcome scene's practice board and reading are separate illustrative UI elements; any displayed electrical value belongs to that animation and does not assert a recorded measurement from the owner's work.
