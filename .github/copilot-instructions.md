# Portfolio Project Guidelines

## Architecture

- This is a Hugo site. Site-specific templates live in `layouts/`; reusable theme
  templates live in `themes/myPortfolio/layouts/`.
- Author site styles in `src/css/` and compile them to `static/css/` with the
  existing PostCSS scripts. Do not hand-edit generated CSS.
- Preserve the established 26-track grid defined by `--grid-template` and the
  24 content tracks. Use the existing grid utilities and `.container` patterns.
- Keep the blue accent and the restrained, personal editorial art direction:
  clear typography, fine rules, considered negative space, useful imagery, and
  mostly flat surfaces rather than layers of rounded cards.

## Specialized Skills

- Skills in `.github/skills/` contain focused procedures. Load and follow the
  relevant skill for the task; do not copy all skill instructions into every
  task or create a new skill when an existing one covers it.
- For visual direction, layout, typography, or responsive styling, use
  [Editorial Portfolio Design](./skills/editorial-portfolio/SKILL.md).
- For Hugo templates, content wiring, CSS generation, or builds, use
  [Hugo Site Development](./skills/hugo-site-development/SKILL.md).
- Before reporting validation results, use
  [Site Build Verification](./skills/site-build-verification/SKILL.md).
- For accessibility reviews or interface behavior, use
  [Frontend Accessibility](./skills/frontend-accessibility/SKILL.md).
- When creating or revising agent customizations, use
  [Skill and Instruction Authoring](./skills/skill-authoring/SKILL.md).
- For token counts or other usage statistics, use
  [Usage Reporting](./skills/usage-reporting/SKILL.md).

## Usage Reporting Preference

- Append a compact **Usage** section to every response with per-prompt token
  counts and any other meaningful runtime-provided usage metrics.
- Report exact prompt/response counts only when the runtime exposes them for
  that turn. Otherwise say they are not exposed; never infer them from session
  totals or estimates.
- Label aggregates as session-to-date and identify their scope.

## Validation

- Run the narrowest relevant existing checks. Common commands:
  `npm run lint:css`, `npm run build:css`, and `npm run build:all`.
- Report commands actually run and whether they passed. Mention unrelated
  pre-existing failures separately.
- Do not commit, reset, or discard user changes unless explicitly asked.
