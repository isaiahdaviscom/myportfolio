---
title: "How to Present Frontend Performance Work to People Who Don't Write Code"
description: "Technical wins disappear in a vacuum. Here's the stakeholder communication framework I use to make performance improvements visible, credible, and decision-ready — without turning every update into a lecture."
date: 2026-03-05T09:00:00-06:00
lastmod: 2026-03-05T09:00:00-06:00
draft: false
tags:
  - performance
  - communication
  - leadership
  - frontend
  - process
categories:
  - process
---

A 72% reduction in page load time is a striking number. Inside an engineering team, it leads
the sprint retro. In a stakeholder review, it leads to a blank stare and the follow-up question:
*"What does that mean for us?"*

Technical excellence is only half the job. The other half is making the work legible to the people
who fund it, prioritize it, and ultimately decide whether you get to keep doing it. After several
years of performance-focused frontend work — including a project that cut load times by 72%, reduced
asset weight by 41%, and dropped support ticket volume by 30% — I've developed a communication
framework that bridges the gap.

---

## The Mistake: Reporting Technical Metrics Lead

The reflex is to open the update with the metrics you're most proud of. *"Lighthouse score
increased from 43 to 91. Time to Interactive is down 4.2 seconds. LCP went from 6.1 s to 1.8 s."*

To a frontend engineer, that's a sentence worth celebrating. To a product manager or an operations
director, it's a technical vocabulary test that immediately signals: *this update is not for me.*

Technical metrics are evidence. They are not the story. Lead with the story.

---

## Lead With the User Experience, Not the Number

Before-and-after performance work is inherently visual and concrete. Use that.

A filmstrip from WebPageTest — two side-by-side page loads, one old, one new — communicates a 72%
load-time improvement more viscerally than any benchmark number. A stakeholder watching the old
version show a white screen for five seconds while the new version renders fully at 1.7 seconds
doesn't need to know what LCP means. They've already felt the difference.

The story structure that works:

1. **Here's what it felt like before** — concrete, user-experience-first, no jargon
2. **Here's what it feels like now** — same frame of reference
3. **Here's the number that proves it** — the metric becomes *supporting evidence* for what they
   already experienced, not the primary claim

The metric gains credibility because the audience has already agreed with the premise. They just
watched it load fast.

---

## Translate Technical Metrics Into Business Outcomes

Every performance metric has a business translation. Use the translation, not the original.

| Technical metric | Business language |
|---|---|
| Time to Interactive: -4 s | Users wait 4 fewer seconds before they can act |
| Support tickets: -30% | Fewer interruptions per quarter — roughly X hours of support time |
| Lighthouse score: 43 → 91 | Pages now meet Google's recommendations for search ranking |
| WCAG 2.1 AA compliance | Usable by employees across all four facilities, including accessibility users |

The last one matters more than it looks. At S&C Electric, the compliance number translated directly
to: *shift workers on older terminals and employees with visual impairments could now use the
dashboards effectively.* That's a workforce productivity claim. It lands differently in a review
meeting than "we passed the accessibility audit."

---

## Tie the Work to a Previous Commitment

Stakeholders are most receptive to performance updates when the improvement connects back to a
target they already agreed to. *"In Q2 we committed to getting dashboard load times under 2
seconds. We're at 1.7 s. Here's what changed."*

This sounds obvious. In practice it requires setting a measurable target at the *start* of the
work — not just "we'll improve performance" but "we'll measure average load time on the VPN
connection and get it to X seconds." Vague commitments produce vague updates. Specific commitments
produce specific evidence of delivery.

Before any performance project, I document:

- The current baseline (with a permalink to the Lighthouse report or WebPageTest run)
- The defined success metric (what number, measured how, by when)
- The agreed scope (which pages, which user network conditions)

When the project is done, the update writes itself: here's the baseline, here's the outcome,
here's the measurement methodology.

---

## The One Thing That Changes How Every Review Goes

Brief the right person before the meeting.

In any organization with more than a few stakeholders, there's usually one person in the room whose
opinion carries the most weight. Briefing them before the meeting — a 10-minute conversation, a
shared doc the day before, a quick async Loom — means the most important person in the room isn't
encountering your work cold.

When that person asks a question in the meeting, it's usually the question you already answered one-
on-one: *"So this is the dashboard the operations team uses every day?"* Yes. *"And it used to take
six seconds to load?"* Yes. *"And now it's under two?"* Yes. *"Good."*

The technical explanation, the methodology, the caveats — all of that becomes background noise
behind a pre-sold outcome.

---

## What "Good" Communication Looks Like in Practice

After delivering the S&C dashboards, the stakeholder review looked like this:

1. Filmstrip comparison — 30 seconds, no narration needed
2. Three numbers on one slide: **72% faster, 41% lighter, 30% fewer tickets**
3. One user story: a shift worker who had complained about the dashboard for two years sent an
   unsolicited email saying the update was "night and day"
4. Timeline showing what was shipped each sprint and when each dashboard went live

The technical detail — the CSS architecture, the bundle strategy, the focus management approach —
was all available as backup slides. We didn't open one of them. We didn't need to.

---

## The Underlying Principle

Technical work earns its place in an organization by making the organization's problems smaller.
The communication job is to make that connection visible — to translate what happened at the
engineer's desk into something meaningful at the business decision level.

You don't need to dumb it down. You need to plug it into the context your audience already cares
about. The technical depth is what makes the outcome credible. The business framing is what makes
it legible.

Both halves matter.

---

*Have a performance project that needs a stakeholder story? Or just want to compare notes on what's
worked in your org? [Let's talk](/contact/).*
