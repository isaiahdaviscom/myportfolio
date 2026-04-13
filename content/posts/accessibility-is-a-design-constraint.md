---
title: "Accessibility Is a Design Constraint, Not a Checklist"
description: "After achieving WCAG 2.1 AA compliance across three enterprise dashboards, I changed how I think about accessibility — not as a remediation task but as a structural design constraint that produces better products for everyone."
date: 2026-02-24T09:00:00-06:00
lastmod: 2026-02-24T09:00:00-06:00
draft: false
tags:
  - accessibility
  - wcag
  - ux
  - frontend
  - design-systems
categories:
  - engineering
---

There's a version of accessibility work that happens at the end of a project. The design is
finalized, the component library is built, the feature has shipped — and then someone files a
ticket: *"Color contrast is failing on the secondary button."* An engineer opens the hex value in a
picker, nudges it three shades darker, closes the ticket. Done.

That version of accessibility is a checklist. It is also, in my experience, the most expensive way
to do it.

The alternative — treating accessibility as a structural constraint from the first design decision —
is how the work I did at S&C Electric went. WCAG 2.1 AA compliance wasn't a phase at the end of
the project. It was a load-bearing wall from day one. That decision changed the architecture, the
component API, the design tokens, and ultimately the quality of what shipped.

---

## What Changes When You Start With Constraints

When color is a design constraint rather than a decoration choice, your token system looks
different. Instead of `brand-blue: #4a90e2` as a single value, you have:

```css
--color-interactive:      #2563EB; /* AA on white — 4.7:1 */
--color-interactive-dark: #1D4ED8; /* AA on light gray — 5.2:1 */
--color-interactive-text: #FFFFFF; /* used on top of both */
```

The contrast ratios are *in the token names and comments*, not discovered in a post-launch audit.
Your team can't accidentally ship a 2.1:1 button if the design system doesn't contain a 2.1:1 value.

This is a different category of thing from checking a contrast ratio at the end. It's encoding the
constraint into the building blocks so that conformance is the path of least resistance, not the
path that requires extra work.

---

## Focus Management Is an Interaction Design Problem

The accessibility issue that trips up the most teams isn't contrast — it's focus management. And
it's almost always because the problem is discovered in QA rather than designed for in the
component architecture.

Consider a modal dialog. The checklist version:
- Add `role="dialog"` ✓
- Add `aria-modal="true"` ✓
- Add `aria-labelledby` pointing to the title ✓

The constraint version asks: *what happens to keyboard focus when this modal opens? Where does focus
return when it closes? What happens if the user presses Escape on a modal triggered from inside
another interactive region?*

Those questions don't have answers in the WCAG spec. They have answers in how you design the
component's interaction model. A focus trap needs to know its boundaries. A disclosure widget needs
to return focus to the exact trigger element that opened it — not just "somewhere near there." These
are interaction design decisions, not compliance checkboxes, and they need to be made when the
component is being designed, not when a screenreader user reports a bug.

For the S&C dashboards, I designed focus management into every interactive component's API before
writing a single line of JavaScript. The modal component received a `returnFocusTo` parameter. The
navigation component managed its own focus state as a state machine, not an afterthought. This
produced more code — but it produced code that couldn't ship a broken focus experience, because the
broken states weren't accessible in the API.

---

## The Shift Worker Argument

Here is the business case that resonated most with stakeholders at S&C: the dashboards were used by
shift workers across four facilities, many of whom worked under industrial lighting conditions that
made standard-contrast interfaces genuinely difficult to read.

Accessibility isn't a legal compliance requirement with a population of edge-case users. It's a
product quality dimension that affects everyone on a spectrum of situational and permanent
conditions. A high-contrast token system improves readability for a color-blind engineer on a
second monitor and for a shift worker checking a status display on an aging industrial terminal
under fluorescent lights.

That argument landed in a way that "WCAG requires" never would have. When accessibility is framed
as product quality for the actual user population — not as legal risk mitigation — the conversation
changes.

---

## Three Practices That Made the Biggest Difference

**Design token contracts.** Every interactive color in the system carried a documented contrast
ratio as a property, not as a comment in a separate doc. Designers couldn't create a new button
variant with a failing ratio without explicitly overriding a documented value — which created a
natural friction point that surfaced problems early.

**Semantic HTML as architecture.** Using a `<button>` instead of a `<div role="button">` isn't just
correct — it's cheaper. The browser handles the keyboard interaction, the implicit ARIA role, and
the activation event for free. Every time a team builds an interactive component on a non-semantic
element, they're paying a maintenance tax for something the platform provides natively.

**Automated + manual testing pairing.** Tools like axe-core catch roughly 30–40% of accessibility
failures automatically. The rest — focus management problems, logical reading order failures,
cognitive clarity issues — require a human with a keyboard and, periodically, a screen reader.
I ran keyboard-only sessions on every new component and documented the keyboard interaction model
before calling it done. That documentation became part of the component's test cases.

---

## What WCAG 2.1 AA Compliance Actually Looks Like in Production

It looks like a design system where the conformant choice is always easier than the non-conformant
choice. It looks like keyboard interaction tests in the CI pipeline. It looks like HTML that a
browser, an assistive technology, and a future developer can all read and understand independently.

What it doesn't look like: a spreadsheet of checkboxes run the week before launch.

The late-stage checklist approach produces compliant screenshots and non-compliant products. The
constraint approach produces products that work — for the shift worker, the screenreader user, the
person on a high-brightness outdoor screen, and the engineer who inherits your codebase in two years.

---

*WCAG 2.1 AA compliance was a core deliverable in my [S&C Electric case study](/portfolio/sandc/).
If you're working through an accessibility retrofit or want to build compliant from the start, I'm
available to consult — [get in touch](/contact/).*
