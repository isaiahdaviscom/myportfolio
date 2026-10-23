---
name: editorial-portfolio
description: "Use when designing or revising this portfolio's visual identity, page layouts, typography, responsive behavior, imagery, or CSS. Apply the owner's editorial direction while preserving the established grid and blue accent."
---

# Editorial Portfolio Design

Use this skill for visual design changes to the portfolio, including the home,
About, work, writing, and contact pages.

## Design direction

- Keep the existing 26-track layout grid and 24-track content area. Use
  `--grid-template`, `.layout-section`, `.layout-subgrid`, `.container`, and
  existing `gc-*`/`col-*` helpers instead of introducing a parallel grid.
- Preserve the owner's blue brand accent. Use warm, quiet neutrals, strong
  editorial typography, fine dividers, open space, and intentional asymmetry.
- Make the experience personal: favor real portfolio work and approved profile
  imagery over abstract placeholder graphics or generic decoration.
- Prefer flat editorial groupings and clear rules to repetitive floating cards,
  excessive pill shapes, gradients, glass effects, and decorative motion.
- Maintain responsive behavior, legible contrast in light and dark themes,
  keyboard focus visibility, and reduced-motion support.

## Established patterns (reuse, do not reinvent)

- **Grouped grids:** no gaps; 1px borders (top/left on the container, right/
  bottom on items) like About "How I Work", `.blog-card` and `.lk-grid`. Square
  corners (2px max), no shadows.
- **Labels:** mono, uppercase, wide tracking (`--font-mono`).
- **Active/hover/focus:** one 2px accent underline (`::after`, `scaleX`) shared
  by `.inline-menu a` and `.jumplinks__link`; focus adds a square 2px outline.
  Do not overwrite the active state with focus styles.
- **Hero dial** (`.hero-dial*`, home and `/links/`): sliced portrait, rotating
  ring text, reduced-motion safe. Reuse the classes; give the SVG path a unique
  `id` per page.
- **Image-led lists:** prefer real cover images (64px thumbs, ruled rows, ↗
  arrow) over icons; avoid decorative SVG icons. Thumbnail info (type · year,
  title, role) is always visible on a bottom scrim, never hover-only.
- **Stories overlay** and header ring: flat, solid accent, square controls.
- **Forms:** transparent fields with strong borders and an accent focus
  border; a custom select re-declares its chevron `background-image` per state.
- **Print:** `/portfolio/` "Print as résumé" uses `print-cv.html` and
  `utilities/print.css`; it must work through the real browser print path.

## Workflow

1. Inspect the target template, its CSS module, shared tokens, and relevant
   breakpoints before changing presentation.
2. Reuse the existing page structure and design tokens. Do not create a second
   design system or change the core grid.
3. Keep styles in the relevant `src/css/` module. Add a shared component only
   when the same treatment is needed across multiple pages.
4. Check representative desktop and narrow mobile layouts; watch for horizontal
   overflow and content hidden behind sticky navigation.
5. Run the relevant CSS lint/build checks and report the actual result.

## Reference

The owner cited GitHub Universe as an editorial-layout reference, not a request
to copy its branding. Use its grid clarity, strong type hierarchy, thin rules,
and varied image/text compositions as inspiration while keeping this portfolio
recognizably personal and blue-accented.
