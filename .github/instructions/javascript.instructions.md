---
description: "Use when editing first-party JavaScript in the Hugo theme. Covers progressive enhancement, accessible interaction, and generated bundle handling."
name: "Portfolio JavaScript Guidelines"
applyTo:
  - "themes/myPortfolio/assets/js/**/*.js"
---

# Portfolio JavaScript Guidelines

- Follow existing module and browser-support patterns. Prefer progressive
  enhancement and native browser APIs already used by the project.
- Keep controls keyboard-operable and synchronized with appropriate accessible
  state; respect reduced-motion preferences for motion behavior.
- Handle invalid states and failures explicitly. Avoid silent fallbacks that
  make an interaction appear successful when it failed.
- Do not hand-edit generated bundles such as `static/js/main.js`; use the
  project build script after source changes.
- Run the relevant lint/build checks and verify changed interactions in context.
