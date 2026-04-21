# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- Dev: `npm run dev` (port 4321)
- Build: `npm run build`
- Preview: `npm run preview`
- Requires Node >= 22.12.0

No test suite, linter, or CI configured.

## Stack

- **Framework:** Astro 6 (single-page site, no client-side framework)
- **Styling:** Tailwind CSS 4 via `@tailwindcss/vite` plugin — all theme config uses `@theme` in `src/styles/global.css`, no separate tailwind config file
- **Fonts:** Anton (display/headings) and DM Sans (body) — self-hosted from `src/fonts/`, loaded via `@font-face` in global.css
- **Images:** Astro `<Image>` component for optimized images in `src/assets/img/`; static files (favicon, OG image) in `public/img/`
- **Sitemap:** `@astrojs/sitemap` integration, filters out `/og` route
- **Site URL:** `https://sanderjanssen.nl`

## Design Direction

Professional portfolio targeting clients (cultural & social organizations), not developers. Warm and approachable.

- **Background:** Dark (neutral-950) with grain texture overlay
- **Accent color:** Warm coral — `brand-accent` at `hsl(25, 100%, 55%)`, `brand-accent-light` at `hsl(15, 100%, 58%)`
- **Additional brand colors:** `brand-blue`, `brand-pink`, `brand-yellow` (used in shader and gradients)
- **Headings:** Anton uppercase, used sparingly for section titles and hero
- **Body:** DM Sans, neutral-300 primary / neutral-400 secondary / neutral-500 tertiary
- **Accent usage:** Restrained — eyebrow text, CTA buttons, list bullets, link hover states. Never as large background fills
- **Section pattern:** `border-t border-white/10` dividers, `max-w-7xl` container, `px-6 lg:px-8` padding
- **Interactions:** Subtle — scale on hover, `link-underline` animation, no glow effects or rotations

## Architecture

**Single-page site:** `index.astro` is the only public route. `og.astro` generates a standalone OG image page (excluded from sitemap).

**Layout:** `Layout.astro` provides the HTML shell with meta tags, OG/Twitter cards, JSON-LD structured data, and all client-side JavaScript (inline `<script>` in `<head>`).

**Animation system (all JS lives in Layout.astro):**
- `[data-animate]` elements get scroll-triggered `in-view` class via IntersectionObserver (rootMargin `-15%`)
- `[data-animate-parent]` containers trigger their children collectively
- `--stagger` CSS variable controls sequential delay (75ms increments)
- `[data-testimonial]` / `[data-testimonial-group]` have a separate observer with staggered `setTimeout` reveal (120ms per item)
- `[data-sticky-header]` toggles `is-visible` based on `[data-hero-header]` intersection
- All animations respect `prefers-reduced-motion` and `scripting: none`

**PaintFlowShader:** WebGL simplex-noise shader in `PaintFlowShader.astro`. Used as hero background and OG image background. Pauses when off-screen or tab is hidden. Uses `low-power` GPU preference.

**Custom CSS utilities** (defined in `global.css` with `@utility`):
- `grain` — fractal noise texture overlay (fixed position, opacity 0.05)
- `pattern-dots`, `pattern-crosshatch`, `pattern-diagonal`, `pattern-grid` — decorative SVG patterns
- `gradient-warm-number`, `gradient-warm-dot` — oklch gradients with `--steps`/`--i` CSS variables for per-item color shifting
- `gradient-cta-warm` — CTA button gradient (pink to red)
- `btn-3d-bevel` — 3D button shadow with hover/active states (uses `@variant`)
- `link-underline` — animated underline via `background-size` transition, also triggers on `.group:hover`
- Custom easing: `--ease-out-strong`, `--ease-in-out-strong` defined in `@theme`

## Component Props

- `ProjectCard` — `href`, `image` (ImageMetadata), `tags`, `title`, `description`, `domain`, `reverse?` (flips image/text layout)
- `Testimonial` — `image`, `quote`, `author`, `company`, `align?` ("right")
- `NumberedListItem` — `number`, `delay?` (stagger index), `color?` (gradient class), `muted?`
- Most components accept `class?` for external styling
