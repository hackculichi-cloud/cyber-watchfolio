# Electrical fox welcome

A first visitor to the bare Home route sees Culichi taking a measurement in a small electrical practice scene, followed by a friendly wave and “¡Bienvenidos!” in Spanish (“Welcome!” in English). The character uses eight distinct illustrated frames, including changing elbow, wrist and probe positions and a hand raise/wave. The displayed 9.02 V reading is part of the decorative 9 V training scene, not recorded project evidence.

The sequence starts after its artwork loads: 2.6 seconds of measuring, then 2.2 seconds of greeting before entering automatically. Skip welcome, Enter portfolio and Escape always dismiss it. Dismissal is remembered with `culichi-welcome-seen=1` in localStorage; returning visitors go straight to Home. Replay welcome remains available beside the Home contact link, including after following a Home section link. Professional routes and direct Home hashes never auto-open the intro.

Reduced-motion users see the final static greeting immediately and enter when ready. The dialog retains keyboard focus, has an accessible name and description, announces its changing greeting politely, and restores the replay control after an intentional replay. Timers and modal state clean up on navigation. There is no automatic sound, video playback, WebGL or new third-party dependency.

The scene uses local responsive WebP atlases: about 213 KB on phones and 434 KB on larger screens, fetched only when the intro is shown. Atlas geometry and image-generation provenance are recorded in [welcome-art.md](welcome-art.md). Existing mascot assets, portfolio evidence, PDFs and CVs are unchanged.

Validation: build and TypeScript pass; ESLint has zero errors and eight existing Fast Refresh warnings; the 32 unit tests pass. The 25 relevant browser cases pass across the complete selection and focused welcome rerun. Checks cover stage transitions and actual running sprite animation, 320/390/1440 px, readable controls, skip, persistence, replay and replay from a deep link, Escape and focus restoration, static reduced motion, route bypass, unmount/timer cleanup, existing Home controls and mobile navigation. Visual review covers measuring and greeting on phones and desktop; public artifact and whitespace checks pass.

Existing browser fixtures model returning visitors; fresh-visitor coverage explicitly clears the welcome flag. The older electrical mascot size assertion now recognizes the existing 384 px pose assets, and the mobile overview budget allows the new 44 px replay action without expanding the skill grid.
