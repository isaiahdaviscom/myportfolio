---
description: "Use when editing source CSS for this portfolio. Covers CSS modules, tokens, cascade layers, responsive behavior, accessibility, and the established grid."
name: "Portfolio CSS Guidelines"
applyTo:
  - "src/css/**/*.css"
  - "themes/myPortfolio/assets/css/**/*.css"
---

# Portfolio CSS Guidelines

- Edit source styles only. `static/css/styles.css` and
  `static/css/styles.min.css` are generated; rebuild them with the existing
  PostCSS commands.
- Preserve the 26-track site grid and reuse its tokens/utilities; do not create
  a competing layout grid.
- Follow the existing CSS module, BEM, token, and `@layer` conventions. Prefer
  shared tokens and component styles over repeated one-off overrides.
- Unlayered CSS (`motion.css`, `contact*.css`, `links*.css`, `blog.css` dark
  rules, `print.css`) beats everything in `@layer components`; override it from
  an unlayered file imported later. Add overrides as a new `*-editorial.css`
  file imported after the base, because Stylelint rejects duplicate selectors.
- The `background:` shorthand resets image and repeat; re-declare a select's
  chevron per state (`:focus`, dark mode).
- Stylelint requires legacy `rgba(0, 0, 0, 0.5)` notation.
- Check narrow and wide layouts, light and dark themes, keyboard focus, and
  reduced motion when relevant.
- For visual decisions, follow
  [Editorial Portfolio Design](../skills/editorial-portfolio/SKILL.md).
