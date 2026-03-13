---
title: "Why I Reach for Vanilla JS First (and When I Don't)"
description: "A framework-agnostic developer isn't a framework-averse developer. Here's the decision framework I use to choose between vanilla JS and a framework on any given project — and why the default answer has changed."
date: 2026-03-08T09:00:00-06:00
lastmod: 2026-03-08T09:00:00-06:00
draft: false
tags:
  - javascript
  - frontend
  - architecture
  - performance
  - opinion
categories:
  - engineering
---

I've shipped production JavaScript in vanilla ES modules, React, TypeScript, and Node.js. I've
built a zero-dependency component library that survived four years of enterprise use without a
single breaking dependency update. I've also shipped a React app that needed to be, and was better
for it.

The "vanilla vs. framework" debate is usually conducted as religion. I find it more useful to treat
it as an engineering decision with a small number of inputs.

---

## The Default Has Changed

In 2018, the case for defaulting to vanilla JS was weaker than it is now. CSS custom properties
had limited adoption. ES modules weren't in baseline. Intersection Observer, ResizeObserver, and
native `<dialog>` didn't exist or didn't work reliably. You reached for a framework partly because
the platform hadn't caught up.

As of 2026, the platform has largely caught up. A significant majority of frontend interaction
patterns — animations, state-driven UI, focus management, progressive enhancement — are achievable
with specification-compliant platform APIs and no build tool in the dependency chain.

That changes the default. The question is no longer *why vanilla?* as if vanilla is the quirky
choice. It's *why a framework?* — as in, what does this specific project need that the platform
doesn't provide?

---

## The Decision Framework I Actually Use

Three questions, in order:

**1. Will multiple developers maintain this codebase over time, and does the team already know a
framework?**

If yes: framework. Not because vanilla JS can't scale — it can — but because a team that already
has a shared React mental model will ship faster and review code more effectively in React. The
ecosystem familiarity dividend is real. Don't spend it.

**2. Does the UI have deeply nested, frequently re-rendered state that depends on fetched data
across multiple components?**

If yes: framework. The cases where I most feel the absence of a virtual DOM or a reactive state
system are not "we need 47 interactive things on the page." They're "user action in component A
causes a cascade of updates through components B, C, and D, and the data is async." Vanilla JS
managing that relationship across a large component tree is not inherently impossible — it's just
a problem the framework solved and you'll solve worse.

**3. Are there security, compliance, or dependency constraints that would require review of every
npm package added to the project?**

If yes: vanilla. This was the constraint at S&C Electric, and it wasn't unusual — enterprise IT
environments, government contracting, healthcare compliance, financial services. When every
dependency is a security ticket, the lightest possible dependency surface is the correct
architectural choice. The framework decision isn't a technical choice there; it's a procurement
process.

If none of those apply: I default to vanilla until there's a specific reason not to.

---

## What Vanilla Buys You (When It Applies)

**Zero version drift.** A component built on CSS custom properties and DOM APIs from 2021 works
identically in 2026 without a single npm update. Framework components from 2021 have often
accumulated breaking changes, deprecated lifecycle methods, or ecosystem dependencies that no
longer compile cleanly. The maintenance cost of vanilla is front-loaded into authoring; the
maintenance cost of framework dependencies is ongoing.

**Bundle-size floors are lower.** You cannot ship React's runtime at zero kilobytes. You can
ship a vanilla ES module at whatever size the actual logic requires. For sites where load
performance is critical — and it almost always is — that floor matters.

**The platform is the documentation.** A developer unfamiliar with your specific framework version
can still read your vanilla JS, MDN, and the spec. This sounds abstract until you're debugging a
five-year-old component late on a Friday and the framework version in your lockfile doesn't match
any currently indexed documentation.

---

## What Frameworks Buy You (When They Apply)

**Shared mental model at team scale.** The React component model — props in, view out, effects for
side cases — is a low-friction shared language for teams. You can onboard a React developer onto a
React codebase faster than onto a well-written vanilla codebase, because the patterns are
transferable.

**Async data + reactive UI at scale.** React Server Components, SWR, Suspense boundaries, the
emerging React 19 model — these solve coordination problems in async, data-driven UIs that vanilla
solutions require significant custom architecture to address. That architecture is payable in
vanilla JS; it's just work you're now maintaining.

**Ecosystem depth.** The React ecosystem's utility components — headless UI libraries, form
validation integration, animation libraries, testing utilities — represent accumulated engineering
hours you don't pay for. Picking up a vanilla alternative for some of those is straightforward.
For others, the ecosystem tool is genuinely better than what you'd build.

---

## The Component Library I'm Actually Proud Of

The zero-dependency component library I built for S&C Electric used:

- CSS custom properties for all visual state (open/closed, active/inactive, theme tokens)
- Vanilla ES modules — one file per component, no bundler required in isolation
- `MutationObserver` for dynamic content accommodation
- Native `<dialog>` for modal focus trapping (with polyfill for the one browser that needed it)

It's still in production. Four years later. No dependency update has ever broken it. No framework
migration has forced a rewrite. The team has extended it with zero framework knowledge required.

That's not a proof that vanilla is always better. It's a proof that vanilla can produce a durable,
maintainable outcome when the context fits. The context fit here because the constraints demanded
it and the interaction patterns stayed well within what the platform provides.

---

## The Version of This Argument That's Actually Useful

The useful version isn't "vanilla is better" or "frameworks are better." It's: stop defaulting.

Defaulting to React because React is what you know is the same mistake as defaulting to vanilla
because you distrust dependencies. The right answer comes from looking at the specific project with
clear eyes: who will maintain this, what does the UI actually do, what constraints does the
environment impose?

Those three questions almost always produce an answer. The answer might be boring. That's fine.
Boring infrastructure decisions free up interesting product decisions. Every hour you don't spend
debugging a dependency conflict is an hour you spend building something that matters to users.

---

*Want to talk through a framework choice for your specific context? [I'm available for
consulting engagements](/contact/) — happy to work through the trade-offs.*
