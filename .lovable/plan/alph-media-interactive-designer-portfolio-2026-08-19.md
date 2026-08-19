# Alph@ Media — Interactive Designer Portfolio

A bold, high-contrast portfolio site for a graphics designer, built as a multi-page
site with heavy interaction: cursor-reactive hero, hover-reveal project tiles, and
scroll-driven motion throughout.

## Look and feel

- Palette: white / near-black with a burnt-orange (#ff5722) and yellow (#ffeb3b) accent — brutalist pop, sharp corners, thick rules.
- Type: Instrument Serif for headings (huge, tight), Work Sans for body.
- Layout: masonry work grid with mixed tile sizes.
- Motion: restrained but present — magnetic buttons, marquee strip, reveal-on-scroll, hover video/color swaps on tiles.

## Pages

- `/` — Home: oversized animated name lockup, short intro, marquee of services, featured masonry work, awards/stats strip, CTA band.
- `/work` — Full masonry portfolio with filter chips (Branding, Logos, Posters, Packaging, Social, Motion, Illustration, Web/UI).
- `/work/$slug` — Case study: hero image, brief, role, process gallery, next-project link.
- `/services` — Service cards with pricing tiers and process timeline.
- `/about` — Bio, toolkit (Adobe suite, Figma, Blender), timeline, client logos.
- `/contact` — Project inquiry form (name, email, budget, service, message) + social links.

## Interactions

- Custom cursor that scales and inverts over interactive elements.
- Masonry tiles: image zoom, accent overlay, project title slide-in on hover.
- Filter chips animate the grid re-layout.
- Sticky header that shrinks; full-screen overlay nav on mobile.
- Marquee text strip and scroll-progress bar.

## Content and images

Placeholder case-study content for 9–12 projects, with generated cover and process
images in the brutalist-pop style. Copy written for a real designer brand, no lorem.

## Technical notes

- TanStack Start file routes under `src/routes/` (`index`, `work`, `work.$slug`, `services`, `about`, `contact`), each with its own `head()` metadata.
- Design tokens (colors, radius 0, fonts) defined in `src/styles.css` via `@theme inline`; fonts loaded with `<link>` in `__root.tsx`.
- Motion via `motion` (Framer Motion for React) for reveals and layout animation; masonry via CSS columns/grid.
- Project data in a typed local module (`src/data/projects.ts`) — no backend.
- Contact form is client-side validated; submissions are not stored yet. If you want inquiries saved or emailed, we can add Lovable Cloud in a follow-up.
