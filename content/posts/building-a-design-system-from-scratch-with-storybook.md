---
title: "Building a Design System From Scratch: Starting With Storybook"
description: "Part 1 of 3 — How I used Storybook as the foundation for a production design system. Not a showcase tool, but an actual development environment where components are built, documented, and tested in isolation."
date: 2026-04-08T09:00:00-06:00
lastmod: 2026-04-08T09:00:00-06:00
draft: false
tags:
  - design-systems
  - storybook
  - component-library
  - frontend
  - tooling
categories:
  - design
series:
  - design-system-series
seriesOrder: 1
---

I've worked on design systems that were born as Figma libraries and never escaped into code. I've
worked on component libraries that lived in a repo but had no documentation anyone could find. I've
also inherited a "system" that was just a shared CSS file with 900 lines of overrides and a Slack
channel where you asked Tom if you could use a new button variant.

The common failure mode isn't a lack of tooling. It's a lack of a single source of truth that
designers and developers can both trust.

When I started the design system for this portfolio's component architecture, I made one early
decision that shaped everything else: I would build in Storybook first, not after.

---

## Why Storybook First

The conventional workflow starts in Figma. You design components, hand them off, developers build
them, and then — if the team is diligent — someone documents them in Storybook as an afterthought.

The problem with this order is that the documentation is always trailing the component. By the time
a new variant gets added, the story is already out of date. By the time a prop API gets refactored,
nobody has updated the args table. Storybook-as-afterthought means Storybook-as-archive.

Building in Storybook first flips that relationship. The story *is* the component spec. If you
can't write a story that demonstrates the component's behavior, you don't fully understand the
component's API yet. The constraint forces clarity.

---

## The Initial Structure

I started with three categories of components:

- **Primitives** — tokens, typography, spacing scale, color palette
- **Base components** — Button, Badge, Input, Card
- **Composite components** — Navigation, Hero, CTA strip

Storybook's folder structure mirrors this:

```
stories/
  primitives/
    Colors.stories.js
    Typography.stories.js
    Spacing.stories.js
  components/
    Button.stories.js
    Badge.stories.js
    Card.stories.js
  pages/
    HomePage.stories.js
    PortfolioList.stories.js
```

This isn't just organizational hygiene. The folder structure communicates the dependency graph:
pages depend on components, components depend on primitives. If a primitive changes and a page
breaks, the structure surfaces where to look.

---

## Tokens as Stories

The thing Storybook gets wrong out of the box — and most teams never fix — is treating stories as
exclusively about interactive component states. Stories can document anything renderable.

Design tokens are renderable. A color swatch is just a `<div>` with a background color. A
typographic scale is just `<p>` elements with different font sizes. Documenting tokens in Storybook
means they live in the same system as the components that consume them.

Here's the `Colors.stories.js` pattern I use:

```js
// stories/primitives/Colors.stories.js
export default {
  title: 'Primitives/Colors',
  tags: ['autodocs'],
};

const tokenGroups = [
  {
    label: 'Background',
    tokens: [
      { name: '--color-bg',               value: 'var(--color-bg)',               hex: '#f8f9fc' },
      { name: '--color-surface',          value: 'var(--color-surface)',          hex: '#ffffff' },
      { name: '--color-surface-raised',   value: 'var(--color-surface-raised)',   hex: '#ffffff' },
      { name: '--color-surface-subtle',   value: 'var(--color-surface-subtle)',   hex: '#f1f5f9' },
    ],
  },
  {
    label: 'Text',
    tokens: [
      { name: '--color-text-primary',   value: 'var(--color-text-primary)',   hex: '#0f172a' },
      { name: '--color-text-secondary', value: 'var(--color-text-secondary)', hex: '#475569' },
      { name: '--color-text-muted',     value: 'var(--color-text-muted)',     hex: '#94a3b8' },
    ],
  },
  {
    label: 'Accent',
    tokens: [
      { name: '--color-accent',       value: 'var(--color-accent)',       hex: '#0051e0' },
      { name: '--color-accent-hover', value: 'var(--color-accent-hover)', hex: '#003eb0' },
      { name: '--color-accent-soft',  value: 'var(--color-accent-soft)',  hex: '#eff6ff' },
    ],
  },
];

function renderSwatch({ name, value, hex }) {
  return `
    <div style="display:flex;align-items:center;gap:1rem;padding:0.75rem 0;border-bottom:1px solid #e2e8f0;">
      <div style="width:48px;height:48px;border-radius:8px;background:${value};border:1px solid #e2e8f0;flex-shrink:0;"></div>
      <div>
        <code style="font-size:0.8125rem;font-weight:600;">${name}</code><br>
        <span style="font-size:0.75rem;color:#64748b;">${hex}</span>
      </div>
    </div>
  `;
}

export const AllColors = {
  render: () => {
    const html = tokenGroups.map(group => `
      <div style="margin-bottom:2rem;">
        <h3 style="font-size:0.75rem;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;color:#94a3b8;margin-bottom:0.5rem;">${group.label}</h3>
        ${group.tokens.map(renderSwatch).join('')}
      </div>
    `).join('');
    const el = document.createElement('div');
    el.style.maxWidth = '480px';
    el.innerHTML = html;
    return el;
  },
};
```

The discipline here: every token in the story is the *actual* CSS custom property. Not a hardcoded
hex value. If the token changes, the story reflects the change automatically.

{{< storybook-link
    story="components-badge--default"
    title="Badge Component"
    description="See the Badge primitive in Storybook — token-driven color and semantic naming. A starting point for understanding the component API design pattern used throughout this system."
    section="Components"
>}}

---

## The Button Component: Where API Design Happens

The Button component is where most design systems make their first significant architectural
mistake. The mistake is overloading variant semantics.

I see this pattern constantly:

```js
// ❌ Vague variant names that mix visual and semantic concerns
<Button variant="blue" />
<Button variant="blue-outline" />
<Button variant="ghost" />
<Button variant="danger-outline" />
<Button variant="link" />
```

Five variants. But *why* blue? What decision does the consumer make when choosing ghost vs.
blue-outline? The names encode visual properties, not semantic intent.

The pattern I use instead:

```js
// ✅ Variants encode intent, not appearance
<Button variant="primary" />    // highest-priority action on the page
<Button variant="secondary" />  // important but supporting action
<Button variant="ghost" />      // low-emphasis action, often in toolbars
<Button variant="danger" />     // destructive action, requires confirmation
```

Now the developer's decision is clear: how important is this action in context? The design system
controls how "primary" looks. The developer declares intent.

Writing the Storybook stories for Button before writing the component implementation forced me to
define this API explicitly:

```js
// stories/components/Button.stories.js
export default {
  title: 'Components/Button',
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'ghost', 'danger'],
      description: 'Semantic intent of the action. Controls visual weight.',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Spatial size scale. Defaults to md.',
    },
    disabled: {
      control: 'boolean',
      description: 'Prevents interaction. Always pair with a visible explanation.',
    },
    loading: {
      control: 'boolean',
      description: 'Shows spinner and prevents double-submit. Label remains visible for screen readers.',
    },
  },
};

export const Primary = { args: { variant: 'primary', children: 'Save changes' } };
export const Secondary = { args: { variant: 'secondary', children: 'Cancel' } };
export const Ghost = { args: { variant: 'ghost', children: 'Learn more' } };
export const Danger = { args: { variant: 'danger', children: 'Delete project' } };
export const Loading = { args: { variant: 'primary', children: 'Saving…', loading: true } };
export const Disabled = { args: { variant: 'primary', children: 'Submit', disabled: true } };
```

I wrote all of these stories before writing a single line of Button CSS. The stories became the
acceptance criteria.

{{< storybook-link
    story="components-button--primary"
    title="Button Component"
    description="All four semantic Button variants — Primary, Secondary, Ghost, Danger — with interactive controls for size, disabled state, and loading spinner. Written before a single line of CSS."
    section="Components"
>}}

---

## Storybook as a Living Contract

The single most valuable thing Storybook does when used as a development environment — not a
documentation afterthought — is expose the contract between your design decisions and your code.

Every story is a promise: this component, given these props, renders in this state. If a refactor
breaks that promise, the story fails to render correctly. You know before you ship.

Every token documented in the `Primitives` section is a constraint every component must respect.
If a component hardcodes a hex value instead of consuming a token, the disconnect is visible. You
can see it in the story while simultaneously seeing the token palette that the story should be
using.

That visibility is what makes design systems work at scale — not the breadth of the component
library, but the legibility of the decisions that produced it.

---

## What's Next

This post covered the Storybook foundation: folder structure, token stories, and component API
design. In the next post, I'll connect this system to Figma — specifically, how to maintain a
single source of truth for design tokens without manually syncing values between tools.

The spoiler: the sync isn't manual. But getting there requires a specific setup in both Figma and
your token file structure. That setup is worth doing once and never again.

*Part 2: [Figma Tokens and the Single Source of Truth](/posts/design-system-figma-tokens-single-source-of-truth/)*
