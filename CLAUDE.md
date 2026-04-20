# Sander Janssen — Portfolio

Personal portfolio site for a freelance front-end developer based in Haarlem, NL.

## Commands

- Dev: `npm run dev`
- Build: `npm run build`
- Preview: `npm run preview`

## Stack

- **Framework:** Astro 6
- **Styling:** Tailwind CSS 4 (v4 `@theme` config in `src/styles/global.css`)
- **Fonts:** Anton (display/headings), DM Sans (body) — loaded from Google Fonts in `src/layouts/Layout.astro`
- **No separate Tailwind config file** — all theme customization lives in `src/styles/global.css` via `@theme`

## Design Direction

Professional front-end developer portfolio. Warm and approachable — not overly technical or sterile. The site targets clients (cultural & social organizations), not other developers.

- **Background:** Dark (neutral-950) with a subtle grain texture overlay
- **Accent color:** Warm coral — `brand-accent` at `hsl(15, 75%, 60%)`, `brand-accent-light` at `hsl(15, 75%, 70%)`
- **Headings:** Anton uppercase (display font), used sparingly for section titles and the hero headline
- **Body:** DM Sans, neutral-300 for primary text, neutral-400 for secondary, neutral-500 for tertiary
- **Accent usage:** Restrained — eyebrow text, CTA buttons, availability dot, list bullets, link hover states. Never as large background fills.
- **Section pattern:** Consistent `border-t border-white/10` dividers, `max-w-7xl` container, `px-6 lg:px-8` padding
- **Interactions:** Subtle — scale on hover (photos, buttons), link-underline animation, no glow effects or rotations

## Project Structure

```
src/
  components/    — Astro components (Header, Footer, Hero, ProjectCard, etc.)
  layouts/       — Layout.astro (HTML shell, font loading)
  pages/         — index.astro (single-page site)
  styles/        — global.css (Tailwind theme, custom utilities)
public/
  img/           — Project screenshots, profile photo, favicon
```

## Custom Utilities (global.css)

- `grain` — fractal noise texture overlay (opacity 0.05)
- `pattern-dots`, `pattern-crosshatch`, `pattern-diagonal`, `pattern-grid` — decorative background patterns
- `link-underline` — animated underline on hover using background-size transition
