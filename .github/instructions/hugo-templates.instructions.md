---
description: "Use when editing Hugo templates, partials, shortcodes, page layouts, or navigation. Covers root/theme overrides, semantic markup, and anchor behavior."
name: "Hugo Template Guidelines"
applyTo:
  - "layouts/**/*.html"
  - "themes/myPortfolio/layouts/**/*.html"
---

# Hugo Template Guidelines

- Check both root `layouts/` and `themes/myPortfolio/layouts/`; root files may
  override the corresponding theme template.
- Follow existing Hugo template and partial patterns. Use data/content values
  where appropriate rather than duplicating hard-coded content.
- Keep markup semantic and accessible; ensure IDs are unique and every internal
  jump link resolves to its intended section.
- Preserve front matter and existing page behavior. Verify rendered output with
  the Hugo build after meaningful template changes.
- For broader implementation workflow, follow
  [Hugo Site Development](../skills/hugo-site-development/SKILL.md).
