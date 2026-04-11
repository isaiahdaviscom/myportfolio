---
title: "S&C Electric — The Story"
description: "A deep-dive into the S&C Electric dashboard modernization project. 72% faster. 41% smaller. Built to last."
cover: "/images/514/sandc-cover.jpg"
role: "Frontend Developer"
dates: "June 2021 — Present"
heading: "The S&C Electric Story: 72% Faster, Built to Last"
feature: false
weight: 15
employment_type: "Full-time"
location: "Chicago, IL · Hybrid"
draft: false

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

stack:
  - TypeScript
  - Hugo
  - Tailwind CSS
  - CSS Custom Properties
  - Vanilla JS
  - Git / CI

timeline:
  - phase: "Discovery"
    desc: "Pulled three years of performance logs and support tickets. Six-second load times on a corporate VPN weren't an edge case — they were the daily experience for shift workers across four facilities."
  - phase: "Constraint Mapping"
    desc: "No framework dependencies. Every third-party library is a security review cycle. The architecture had to be framework-free from day one — CSS custom properties and vanilla JS were the only viable path."
  - phase: "Build"
    desc: "Six months of iterative, zero-downtime deploys over the VPN. Each sprint shipped a measurable performance delta. Stakeholders reviewed real numbers every two weeks, not mockups."
  - phase: "Launch"
    desc: "All three dashboards shipped on schedule. 1.7 s measured load time against a 2 s target — and the constraint that made it real was deciding not to reach for a framework."
  - phase: "Handoff"
    desc: "Documentation, component library handoff, and a team training session. The system the team inherited was simple enough that they extended it independently from week one."

lessons:
  - insight: "Constraints make better systems"
    detail: "The framework restriction felt like a limitation at the start. By the end it was the reason the project shipped on time, passed security review on the first attempt, and runs without a build step in production."
  - insight: "Measured outcomes change the conversation"
    detail: "Every stakeholder meeting started with a number. Not a design demo — a delta. 72% improvement ended debates before they started."
  - insight: "Simplicity is the architecture decision"
    detail: "A component library built on CSS custom properties and vanilla JS is still live and actively extended two years later. That would not be true of a React app maintained by a team that doesn't use React."

sitemap:
  priority: 0.6
---

## The Setup

Three internal dashboards. Four facilities. Six-second page loads over a corporate VPN. The IT security policy said no new framework dependencies without a full review cycle. The project timeline said six months.

That combination of constraints is exactly where this project started — and exactly why it ended up being the most instructive work I've done.

## Why It Mattered

The dashboards weren't internal tooling in the "nobody uses these" sense. Shift workers checked them every day. Supervisors pulled reports from them mid-floor. A six-second load on a slow VPN connection wasn't a performance metric — it was friction that compounded across hundreds of people, dozens of times a day.

The 65% load-time target came from observability data, not a stakeholder wishlist. We knew what fast enough looked like because we measured what slow looked like first.

## The Architecture Call

No frameworks. That decision came from the security constraint, not a preference. But it turned out to be the right call even outside that constraint.

A token-driven component library in vanilla JS and CSS custom properties:
- Passes IT security review without a dependency audit
- Runs without a build step in production
- Is readable and extensible by a team that may not have React or Vue experience
- Has no deprecation surface — CSS custom properties do not have breaking releases

Two years later the system is still in production and actively extended by the team. That would not be true of a scaffolded React app.

## What We Achieved

- Reduced average page-load from **~6 s → 1.7 s** across all three dashboards — a **72% improvement**, exceeding the 65% target
- Cut uncompressed asset weight by **~41%** through a systematic audit and cleanup pass
- Delivered all three dashboards **on schedule** within the six-month window
- Reduced reported UI-related support tickets by approximately **30%** in the quarter following launch
- Achieved **WCAG 2.1 AA** compliance across all updated views and navigation patterns
- Built a component library that the team extends independently to this day
