---
name: skill-authoring
description: "Use when creating, reviewing, or revising Copilot agent skills, custom instructions, prompts, or other repository agent customizations. Covers discovery, scope, front matter, progressive loading, and validation."
---

# Skill and Instruction Authoring

Create small, discoverable customizations that are automatically useful without
duplicating repository documentation or overwhelming every coding task.

## Select the right primitive

- Use `.github/copilot-instructions.md` for a few concise rules that apply to
  nearly all work in this repository.
- Use `.github/instructions/*.instructions.md` for file-specific guidance.
  Give each file a narrow `applyTo` glob and a keyword-rich `description`.
- Use `.github/skills/<kebab-case-name>/SKILL.md` for an on-demand, repeatable
  workflow that benefits from specialized procedures or bundled resources.
- Use `.github/prompts/*.prompt.md` for a single reusable task template with
  inputs, not for general standing guidance.
- Add custom agents or hooks only for a real need for tool restrictions,
  isolated multi-stage work, or deterministic enforcement. Do not add them just
  to duplicate a skill.

## Authoring standards

- Keep always-on instructions minimal and actionable; link to focused skills
  instead of embedding their full procedures.
- Make each skill folder and front-matter `name` match exactly. Use lowercase
  letters, numbers, and hyphens.
- Write a quoted, keyword-rich `description` that says when to invoke the skill.
  Descriptions are the discovery mechanism; include likely user phrases.
- Keep each skill self-contained enough to complete its workflow. Use
  progressive disclosure and relative `./` links for supporting resources.
- Prefer verifiable steps, repository-specific commands, and accurate
  limitations over generic advice or claims of automatic enforcement.
- Avoid duplicating the same rule across project instructions, file
  instructions, skills, README files, and scripts. Link to a single source of
  truth where possible.
- Do not introduce telemetry, hooks, or scripts that claim to measure data the
  runtime does not expose. Never fabricate token or model usage values.

## Workflow

1. Inspect existing customizations and project documentation before creating
   new files.
2. State the scope and choose the smallest suitable primitive.
3. Add only the focused files needed; use valid YAML front matter and links
   relative to the customization file.
4. Check descriptions, names, globs, and references for accuracy and overlap.
5. Run the existing Markdown lint/check if available and verify every referenced
   path exists. Report that file validation does not guarantee the editor has
   loaded the customization; it must be reopened/reloaded if necessary.
