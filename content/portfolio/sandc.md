---
title: "S&C Electric Company"
cover: "/images/514/sandc-cover.jpg"
role: "Frontend Developer"
dates: "June 2021 — Present"
heading: "Frontend Modernization & Systems Ownership at S&C Electric"
bgcolor: "bg-gray-900"
figma_embed: ""
figma_title: "S&C Electric — Component Library Reference"
feature: true
weight: 10
employment_type: "Full-time"
location: "Chicago, IL · Hybrid"
subtitle: "Modernized three VPN-dependent internal dashboards into a governed frontend platform that improved speed, accessibility, and maintainability under strict enterprise constraints."
problem_summary: "The original dashboard ecosystem had performance bottlenecks, duplicated UI patterns, and inconsistent accessibility behavior. Every release demanded manual fixes across separate implementations, slowing delivery and increasing support overhead."
problem_points:
  - "Dashboard pages averaged 6-8 second load times over corporate VPN"
  - "No shared component contracts across teams or views"
  - "Accessibility defects were addressed as isolated fixes"
  - "Limited analytics visibility into user behavior and friction"
constraints:
  - "VPN-dependent usage across multiple facilities"
  - "No framework dependencies due to IT review overhead"
  - "Security and deployment governance requirements"
architecture_flow:
  - "CMS (Optimizely)"
  - "Component System (Vanilla JS + CSS Tokens)"
  - "Frontend UI (Dashboards)"
  - "Analytics (GTM + GA4)"
  - "Marketing / Business Insights"
component_system:
  - title: "Design Tokens"
    copy: "Centralized spacing, typography, and color primitives to enforce visual consistency and reduce one-off styling across dashboards."
  - title: "Reusable UI Components"
    copy: "Built repeatable UI patterns in vanilla JS and CSS custom properties so new features could be assembled faster with less regression risk."
  - title: "Accessibility Contracts"
    copy: "Embedded WCAG 2.1 AA interaction and semantic requirements into component behavior to scale compliance by default."
  - title: "Instrumentation Layer"
    copy: "Standardized GTM/GA4 event mapping at the component level so analytics remained consistent as pages evolved."
spotlight_cards:
  - icon: "⚡"
    title: "Situation"
    headline: "Three critical dashboards were slow and fragmented"
    copy: "Teams were navigating inconsistent patterns and VPN-heavy load times that slowed daily decisions."
    href: "#cs-problem-heading"
    label: "See Problem"
  - icon: "🏗"
    title: "Decision"
    headline: "Build a governed component system, not one-off fixes"
    copy: "A dependency-light architecture in vanilla JS and CSS tokens fit enterprise constraints and improved maintainability."
    href: "#cs-architecture-heading"
    label: "See Architecture"
  - icon: "📈"
    title: "Outcome"
    headline: "Performance and stability improved across the platform"
    copy: "Load times dropped, support tickets decreased, and teams gained a reusable foundation for future dashboard growth."
    href: "#cs-story-heading"
    label: "See Outcomes"
skills:
  - Optimizely CMS
  - TypeScript
  - Vanilla JS
  - HTML / CSS
  - Usercentrics
  - Accessibility (WCAG 2.1)
  - Performance Optimization
  - Analytics & Reporting

# ── Design-system data ────────────────────────────────────────────────────────
# Displayed as metric tiles in the case study hero section.
metrics:
  - value: "72%"
    label: "Faster page loads"
    detail: "6 s → 1.7 s on all three dashboards"
  - value: "41%"
    label: "Smaller assets"
    detail: "Uncompressed weight reduction"
  - value: "30%"
    label: "Fewer UI tickets"
    detail: "Quarter following component launch"
  - value: "AA"
    label: "WCAG 2.1"
    detail: "Full compliance, every updated view"

# Displayed as accent chips in the hero (separate from skill tags).
stack:
  - Optimizely CMS
  - TypeScript
  - CSS Custom Properties
  - Vanilla JS
  - Usercentrics
  - Git / CI

# Rendered as a vertical timeline under the prose body.
timeline:
  - phase: "Audit"
    desc: "Full codebase, dependency, and performance audit across all three dashboards — identified the heaviest rendering bottlenecks and catalogued accessibility gaps before writing a single line of new code."
  - phase: "Architecture"
    desc: "Designed a token-driven component library in vanilla JS and CSS custom properties. Zero framework dependencies was a hard requirement — every third-party addition triggered IT security review."
  - phase: "Build"
    desc: "Six-month iterative delivery with zero-downtime deploys over the corporate VPN. Each sprint shipped a measurable performance delta reviewed by engineering and business stakeholders."
  - phase: "Accessibility"
    desc: "Systematically addressed WCAG 2.1 AA requirements across all updated views — focus management, color contrast, ARIA labeling, keyboard navigation — treated as design constraints from day one, not post-launch fixes."
  - phase: "CMS & Workflow"
    desc: "Structured Optimizely CMS around reusable component blocks and standardized templates so marketing could publish new dashboard content without engineering intervention for routine updates."
  - phase: "Launch & Handoff"
    desc: "All three dashboards shipped on schedule with full engineering and stakeholder sign-off. Delivered team training, written component documentation, and a handoff kit the team continues to build from."

# Displayed as insight cards in the Lessons Learned section.
lessons:
  - insight: "Constrained enterprise environments reward dependency discipline"
    detail: "When each new dependency triggers security review, a vanilla-first architecture can outperform framework-heavy approaches in both delivery speed and long-term maintainability."
  - insight: "Architecture decisions are easier to align when outcomes are measurable"
    detail: "Quantified improvements in load time, asset weight, and support volume created cross-functional alignment faster than implementation detail alone."
  - insight: "Accessibility must be a system-level requirement"
    detail: "Embedding WCAG 2.1 AA standards into component contracts eliminated costly rework and improved consistency across all new dashboard experiences."
  - insight: "Cross-functional governance is part of frontend ownership"
    detail: "Sustainable platform delivery required continuous coordination across IT security, marketing, analytics, and business stakeholders, not isolated implementation work."
---

## Introduction

S&C Electric Company builds technology used in critical power infrastructure. I led the frontend modernization of three internal dashboards into one cohesive platform used daily across four facilities.

The work spanned UI architecture, component standards, Optimizely CMS structure, and analytics instrumentation. Under strict enterprise constraints (VPN usage, security review overhead, controlled releases), we moved from fragmented screens to a faster, governed, and extensible system.

## The Challenge

At the start, the dashboards were slow, inconsistent, and expensive to evolve. Teams were seeing around **6-second loads** on VPN, and each new feature repeated work that should have been shared.

The mandate was clear: get below 2 seconds, enforce WCAG 2.1 AA, and establish a maintainable architecture without introducing dependency overhead that would slow IT review.

At the same time, stakeholders needed better analytics visibility and marketing needed a CMS workflow that reduced engineering handoffs.

## System Ownership & Responsibilities

I owned the system from audit through handoff, including:

- Component-system architecture in vanilla JS + CSS custom properties
- Optimizely structures using reusable blocks and templates
- GTM + GA4 instrumentation aligned to reporting goals
- WCAG 2.1 AA enforcement as a build-time requirement
- Cross-functional delivery with IT, marketing, analytics, and business
- Zero-downtime release coordination and handoff documentation

## What We Achieved

| Metric | Before | After |
| ------ | ------ | ----- |
| Load Time | 6-8 s | ~1.7 s |
| Asset Weight | Baseline | ↓ 41% |
| Support Tickets | Baseline | ↓ 30% |

- Achieved **WCAG 2.1 AA** compliance across all updated views and navigation patterns
- Delivered all three dashboards on schedule within a six-month window
- Shipped zero unplanned downtime across production deployments
- Established a reusable component system the team continues to extend

## Business Impact

These outcomes changed day-to-day operations:

- Less engineering time spent on repetitive UI fixes
- Faster marketing iteration through reusable CMS patterns
- Better employee experience through faster, more consistent dashboards
- Lower operational risk through dependency discipline and early accessibility integration

## Engineering Decisions & Tradeoffs

Choosing vanilla JS was intentional. In this environment, framework adoption would have increased security-review and governance overhead.

Key tradeoffs:

- **Speed vs compliance:** faster delivery required designs that passed IT review cleanly
- **Flexibility vs maintainability:** shared contracts reduced one-off freedom but improved long-term stability
- **Tooling trend vs operational fit:** platform-native primitives proved more reliable in this context

## Data, Analytics & Automation

Analytics was treated as part of the product, not an afterthought:

- GTM + GA4 instrumentation for high-value interactions
- Standardized event taxonomy across dashboard surfaces
- Looker Studio views for stakeholder visibility
- Repeatable reporting workflows for imports and query refresh

This made prioritization more objective by connecting product decisions to usage patterns and trends.

## Marketing & CMS Integration

Optimizely was organized around reusable blocks and templates instead of page-level customization.

That shift enabled:

- More autonomous publishing by marketing
- Cleaner separation between content work and engineering releases
- Better consistency in UI, accessibility, and analytics standards

## Accessibility as a System-Level Constraint

Accessibility was a system rule, not a final QA step.

WCAG 2.1 AA requirements were built directly into shared components, including focus management, semantic structure, ARIA, keyboard navigation, and color contrast. This prevented late-stage remediation and allowed accessibility quality to scale with every release.

The rollout unfolded in six phases: audit, architecture, build, accessibility integration, CMS workflow alignment, and launch handoff. Each phase shipped measurable progress and reduced downstream operational risk.

Key lessons from the engagement are summarized in the lesson cards below, focused on dependency discipline, system contracts, accessibility-first architecture, and cross-functional alignment.

## Scalability & Future State

The platform now scales in three directions:

- New components: token-driven patterns enable additional UI modules without re-architecting the system
- New dashboards: shared architecture and standards accelerate rollout of future dashboard experiences
- New teams: CMS and analytics standards support broader adoption beyond the original delivery scope

Next-stage expansion includes deeper event modeling, expanded dashboard templates, and broader self-service publishing capabilities while preserving governance standards.
