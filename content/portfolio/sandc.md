---
title: "S&C Electric Company"
cover: "/images/514/sandc-cover.jpg"
role: "Frontend Developer"
dates: "June 2021 — Present"
heading: "Modernizing Internal Web Tools at S&C Electric Company"
bgcolor: "bg-gray-900"
feature: true
weight: 10
employment_type: "Full-time"
location: "Chicago, IL · Hybrid"
skills:
  - TypeScript
  - Hugo
  - Tailwind CSS
  - Google Tag Manager
  - Git
  - Accessibility
  - CI/CD
  - Performance Optimization

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
    detail: "Quarter following launch"
  - value: "AA"
    label: "WCAG 2.1"
    detail: "Full compliance, every updated view"

# Displayed as accent chips in the hero (separate from skill tags).
stack:
  - TypeScript
  - Hugo
  - Tailwind CSS
  - CSS Custom Properties
  - Vanilla JS
  - Git / CI

# Rendered as a vertical timeline under the prose body.
timeline:
  - phase: "Audit"
    desc: "Full codebase, dependency, and performance audit across all three dashboards — identified the heaviest rendering bottlenecks before writing a single line of new code."
  - phase: "Architecture"
    desc: "Designed a token-driven component library in vanilla JS and CSS custom properties. Zero framework dependencies kept the build inside IT's security review window."
  - phase: "Build"
    desc: "Six-month iterative delivery with zero-downtime deploys over the corporate VPN. Each sprint shipped a measurable performance delta reviewable by stakeholders."
  - phase: "Launch"
    desc: "All three dashboards shipped on schedule with full engineering and stakeholder sign-off. Load times measured at 1.7 s against a 2 s target."
  - phase: "Adoption"
    desc: "Team training sessions, written documentation, and a component library handoff that the team continues to extend independently."

# Displayed as insight cards in the Lessons Learned section.
lessons:
  - insight: "Vanilla-first pays off in constrained environments"
    detail: "Every framework dependency is a security review. Building on CSS custom properties and vanilla JS shipped faster and with fewer blockers than any scaffolded framework would have."
  - insight: "Performance numbers win stakeholder buy-in"
    detail: "A 72% load-time improvement communicated value instantly. Measured outcomes spoke louder than any prototype or design demo in every review meeting."
  - insight: "Accessibility is a design constraint, not a checklist"
    detail: "Baking WCAG 2.1 AA compliance in from day one prevented costly late-stage refactors and meaningfully improved the daily experience for shift workers across four sites."
---

## The Challenge

Three internal dashboards used by employees across four facilities were averaging **6-second page loads** on the corporate VPN. The mandate was clear: cut that to under 2 seconds within six months — a 65%+ improvement — without introducing any framework dependencies that would stall IT's security review.

## My Role

As sole **Frontend Developer on this initiative**, I owned everything from the initial audit to final handoff. That meant identifying rendering bottlenecks, designing the component architecture, writing accessibility-compliant navigation patterns, and delivering all three dashboards on schedule.

The component library I built — vanilla JS and CSS custom properties, zero framework dependencies — is still the foundation the team builds on today.

## What We Achieved

- Reduced average page-load from **~6 s → 1.7 s** on all three dashboards (72% improvement, exceeding the 65% goal)
- Cut uncompressed asset weight by **~41%** through a systematic audit and cleanup pass
- Delivered all three dashboards **on schedule** within the six-month window
- Reduced reported UI-related support tickets by approximately **30%** in the quarter following launch
- Established a reusable component library that the team continues to extend independently
- Achieved **WCAG 2.1 AA** compliance across all updated views and navigation patterns