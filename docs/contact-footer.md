# Centered contact and footer

The contact section presents four equal actions with visible names and short descriptions: Email, LinkedIn, GitHub and WhatsApp. Cards form a centered two-by-two grid on phones and one row from 640 px. Equal grid rows preserve symmetry when translated labels wrap. Existing local email/social hover previews and actual link destinations remain available.

WhatsApp uses the owner's supplied number `3317522176`, formatted with Mexico's country code as `+52 33 1752 2176`, and opens `https://wa.me/523317522176`. The Contact page uses the same site data and displays the full number. External links retain `noopener noreferrer`.

Area icons now have visible translated labels: three, three and one centered on phones; seven across from 768 px. About, CV and Contact also have visible names. The contact copy, decorative character, navigation, portrait, name, description, copyright and back-to-top control all share the center axis. Decorative characters stay above the contact controls, with existing reduced-motion behavior preserved.

The owner plans five more certificates (three Udemy and two LinkedIn). None are added, counted or shown as placeholders. Existing certificates, CVs and tool pictures are unchanged; additional tool photos are pending from the owner.

## Verification

- Production build and TypeScript checks pass.
- ESLint: zero errors; eight existing Fast Refresh warnings.
- Unit suite: 32 tests pass.
- Browser coverage: all 25 relevant cases pass across the initial run and the focused rerun after correcting the contact character's responsive width. Checks include 320, 390, 768, 1024 and 1440 px; contact names, real destinations, equal sizes, centered navigation, translated actions, overflow, keyboard behavior and reduced motion.
- Visual review: Home and Electricity footers at 320, 390, 768 and 1440 px, plus the Contact page.
- Public artifact scan and whitespace checks pass.
