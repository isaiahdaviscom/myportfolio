---
title: "Conference Websites Are Conversion Funnels — Design Them That Way"
description: "How reframing a conference website redesign as a conversion problem — not a visual refresh — drove a 27% increase in early-bird registrations and a 35% drop in speaker info support emails."
date: 2026-03-03T09:00:00-06:00
lastmod: 2026-03-03T09:00:00-06:00
draft: false
tags:
  - ux
  - information-architecture
  - conversion
  - case-study
  - design-systems
categories:
  - design
---

The brief was framed as a redesign. *The site looks dated. Can you make it look more modern?* This
is how most event website projects start — as a visual problem in need of a visual solution.

The outcome we were chasing told a different story. The Spark Conference organizers wanted a **20%
increase in early-bird ticket registrations** within the first 30 days of launch. That's a business
problem. Business problems have business solutions. Changing the typeface is not one of them.

The reframe that shaped everything: a conference website isn't a brochure. It's a conversion
funnel. Every page is either moving a visitor toward buying a ticket or it isn't. Visual modernity
is a distraction until you've answered the question of *why the current funnel isn't converting.*

---

## Start With the Funnel, Not the Visual Audit

The first thing I did was trace the existing registration path on the live site:

1. Homepage → finds out about conference
2. Clicks "Speakers" (most popular nav item, per analytics)
3. Hits a speaker page — no registration CTA anywhere in view
4. Navigates back, finds "Register"
5. Clicks through to a third-party ticketing page with a different visual identity
6. Abandons (or doesn't)

Every step after step one was a potential drop-off point. And steps 2 and 3 were *where most people
were spending their time* — browsing speakers before committing to a ticket — with zero conversion
action available to them.

The most valuable real estate on a conference site is the speaker profile page, because that's where
purchase intent is forming. The old site treated it as a dead end.

---

## The Information Architecture Redesign

Restructuring the site map was the highest-leverage work in the project. The old structure was
organized by *what the conference had* (agenda, speakers, sponsors, venue, FAQ). The new structure
was organized by *what visitors came to decide* (should I attend? who is speaking? how do I
register?).

This isn't a semantic distinction. It changed which pages got linked from where and what actions
were surfaced at each decision point.

**Clicks to register: reduced from 4 to 2.** The registration path became Homepage → Register, with
a persistent CTA visible on every speaker profile, schedule view, and session detail. A visitor on
any speaker page could complete registration without navigating away.

That single IA change — registering as a persistent option rather than a destination — was worth
more than any visual work that followed.

---

## The Design System Was Built for Content Editors, Not Designers

Conference sites have a specific operational reality: they're updated by events teams under intense
time pressure in the weeks before the event — speaker bios added, session times changed, sponsor
tiers updated. A design system that requires a Figma-literate editor to make these changes is a
design system that creates support tickets.

I built the component library with content editors as the primary consumer. Every component was
designed to degrade gracefully when content was missing — a speaker card without a headshot
renders correctly; a sponsor tile with no description renders correctly; a session with only a
title and time renders correctly.

The result: the Spark events team updated the site independently through launch week with zero
design support requests. That's the test of a good system — not the component count or the token
documentation, but whether the people who use it can actually use it without you.

---

## What Drove the 35% Drop in Speaker Support Emails

This metric caught even the organizers off guard. Before the redesign, a meaningful share of
attendee support emails were variations of *"Who exactly is [Speaker Name]? Where can I find out
more about their background?"* These weren't emails about registration or venue. They were failing
information tasks.

The root cause: speaker profiles existed but were buried in the navigation and didn't surface the
information people actually wanted — context for why this person was worth seeing in person. Bio,
social links, talk description, and topic areas were all present but poorly structured.

The redesign restructured speaker profiles around **the decision attendees were making**: *is this
someone I want to see?* Bio length was capped to a scannable paragraph. A "What you'll take away"
summary was added above the full description. Talk topics were surfaced as chips at the top of the
card, not buried in paragraph text.

Fewer emails about speakers wasn't a marketing outcome. It was an IA outcome: the site answered the
question before it became a question.

---

## The Numbers

- Early-bird registrations: **+27%** in first 30 days (target was 20%)
- Speaker info support emails: **down ~35%** post-launch
- Lighthouse mobile score: **54 → 89** after design-led asset optimization
- Full design system delivered in **4 weeks**, enabling content editor independence through launch

---

## The Mental Model Transfer

The lesson from this project applies beyond conference sites. It applies to any marketing site, any
product landing page, any B2B "solutions" page:

**Every page on a goal-oriented site is either advancing a user toward their decision or it isn't.**
Visual design choices that don't serve that goal are aesthetic preferences, not product decisions.

The most useful question to ask at the start of any redesign brief is not *what should this look
like?* but *what should this cause people to do?* The visual answer follows from the behavioral
answer, not the other way around.

---

*This work is documented in my [Spark Conference case study](/portfolio/spark/). If you're
planning a conference or event site redesign and want to approach it as a conversion problem,
[I'd love to talk](/contact/).*
