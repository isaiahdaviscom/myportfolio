You are rebuilding a CSS design system for a Hugo-based portfolio site.
Recreate the following grid layout system and card component variants exactly as specified.
All code goes into plain CSS files. No Tailwind, no preprocessors, no build-step assumptions.

════════════════════════════════════════════════════════════════════════════════
1. DESIGN TOKENS  ·  src/css/theme/tokens.css
   Placed at :root, UNLAYERED (no @layer wrapper — beats all @layer rules)
════════════════════════════════════════════════════════════════════════════════

─── 1a. Grid system ────────────────────────────────────────────────────────────

The grid is a faithful port of the Squarespace 7.1 fluid-grid. Three "site
config" tokens drive everything — only edit these three to rebase the grid:

  --sqs-site-gutter:        8vw       /* desktop outer margin (~115px @ 1440px) */
  --sqs-mobile-site-gutter: 6vw       /* < 640px outer margin                   */
  --sqs-site-max-width:     1200px    /* max inner content width                */

Derived tokens (downstream — do NOT edit directly):

  --sqs-cell-max-width: calc(var(--sqs-site-max-width) / 24);  /* 50px @ 1200px */
  --row-baseline:       var(--sqs-cell-max-width);             /* 50px square cell */

  /* 26-track master grid template:
     fluid-gutter | 24 × minmax(0, 50px) | fluid-gutter
     27 grid lines → content window is lines 2 → 26  (-2 = line 26)             */
  --grid-template:
    minmax(var(--sqs-site-gutter), 1fr)
    repeat(24, minmax(0, var(--sqs-cell-max-width)))
    minmax(var(--sqs-site-gutter), 1fr);

  /* Stable column unit — vw-based. Use for padding / margin / width.
     NEVER use for gap (use --grid-gap-unit for that).
     Breakpoints: 375px → 12px floor · 768px → 26.9px · 1440px → 50px cap */
  --grid-col-unit: clamp(
    0.75rem,
    calc((100vw - 2 * var(--sqs-site-gutter)) / 24),
    var(--sqs-cell-max-width)
  );

  /* Container-relative gap atom — resolves to 1/24 of the ELEMENT where gap
     is applied, not the viewport. On a 1200px section → 50px. On a 600px
     child subgrid → 25px. On an 400px card grid → 16.7px.
     Use ONLY for the gap / column-gap / row-gap properties.                    */
  --grid-gap-unit: calc(100% / 24);

  /* Gap scale with minimum floors to prevent collapse in narrow containers:
     Name      Fraction   Full section  12-col child  8-col child
     xs         ¼ col       12.5 px       6.25 px      4.2 px (→ 6px floor)
     sm         ½ col       25 px         12.5 px      8.3 px (→ 12px floor)
     (base)     ¾ col       37.5 px       18.75 px     12.5 px (→ 16px floor)
     lg         1 col       50 px         25 px        16.7 px (→ 24px floor)
     xl         2 col       100 px        50 px        33.3 px (→ 32px floor) */
  --grid-gap-xs: max(0.375rem, calc(var(--grid-gap-unit) * 0.25));
  --grid-gap-sm: max(0.75rem,  calc(var(--grid-gap-unit) * 0.5));
  --grid-gap:    max(1rem,     calc(var(--grid-gap-unit) * 0.75));
  --grid-gap-lg: max(1.5rem,   var(--grid-gap-unit));
  --grid-gap-xl: max(2rem,     calc(var(--grid-gap-unit) * 2));

  /* Backward-compat alias — was 1.5rem fixed; now ½ column (~25px @ max) */
  --grid-gutter: var(--grid-gap-sm);

  /* Shorthand fr sets — for display:grid non-template contexts.
     Fr numerators map to 24-col counts (see §7 for the full convention). */
  --grid-split:         57fr 43fr;   /* feature split hero — left heavy  */
  --grid-split-reverse: 43fr 57fr;   /* right heavy variant              */
  --grid-cols-2:        repeat(2, minmax(0, 1fr));
  --grid-cols-3:        repeat(3, minmax(0, 1fr));
  --grid-cols-4:        repeat(4, minmax(0, 1fr));

─── 1b. Typography ─────────────────────────────────────────────────────────────

  /* Size scale */
  --text-xs:   0.6875rem;   --text-sm:   0.8125rem;   --text-base: 1rem;
  --text-lg:   1.125rem;    --text-xl:   1.25rem;     --text-2xl:  1.5rem;
  --text-3xl:  1.875rem;    --text-4xl:  2.25rem;     --text-5xl:  3rem;
  --text-6xl:  3.75rem;

  /* Weights */
  --font-normal: 400;  --font-medium: 500;  --font-semibold: 600;
  --font-bold: 700;    --font-extrabold: 800;

  /* Leading */
  --leading-none: 1;  --leading-tight: 1.2;  --leading-snug: 1.35;
  --leading-normal: 1.5;  --leading-relaxed: 1.65;
  --leading-comfort: 1.75;   /* prose, hero, bio */
  --leading-compact: 1.25;   /* cards, nav, metadata */

  /* Tracking */
  --tracking-tight: -0.025em;  --tracking-normal: 0em;
  --tracking-wide: 0.025em;    --tracking-widest: 0.1em;

  /* Comfort scale — wide reading contexts, scales with inline-size container (cqi) */
  --comfort-label: clamp(var(--text-xs),  1.2cqi, var(--text-sm));
  --comfort-body:  clamp(var(--text-base),1.8cqi, var(--text-lg));
  --comfort-h3:    clamp(var(--text-xl),  3cqi,   var(--text-2xl));
  --comfort-h2:    clamp(var(--text-2xl), 4.5cqi, var(--text-4xl));
  --comfort-h1:    clamp(var(--text-3xl), 5.5cqi, var(--text-5xl));

  /* Compact scale — card / UI containers, scales with component container (cqi) */
  --compact-label:   clamp(0.625rem,       1.2cqi, var(--text-xs));
  --compact-body:    clamp(0.75rem,        1.8cqi, var(--text-sm));
  --compact-title:   clamp(var(--text-sm), 3.5cqi, var(--text-xl));
  --compact-heading: clamp(var(--text-base),5cqi,  var(--text-3xl));

─── 1c. Spacing (4-pt base scale) ──────────────────────────────────────────────

  --space-px:   1px;       --space-0_5: 0.125rem;  --space-1:   0.25rem;
  --space-1_5:  0.375rem;  --space-2:   0.5rem;    --space-2_5: 0.625rem;
  --space-3:    0.75rem;   --space-4:   1rem;      --space-5:   1.25rem;
  --space-6:    1.5rem;    --space-8:   2rem;      --space-10:  2.5rem;
  --space-12:   3rem;      --space-14:  3.5rem;    --space-16:  4rem;
  --space-20:   5rem;      --space-24:  6rem;      --space-32:  8rem;

─── 1d. Radii ───────────────────────────────────────────────────────────────────

  --radius-none: 0;     --radius-sm: 4px;    --radius-md: 8px;
  --radius-lg: 12px;   --radius-xl: 16px;   --radius-2xl: 24px;
  --radius-full: 9999px;

─── 1e. Shadows & elevation ─────────────────────────────────────────────────────

  --shadow-xs: 0 1px 2px rgba(15,23,42,.04);
  --shadow-sm: 0 1px 4px rgba(15,23,42,.06), 0 1px 2px rgba(15,23,42,.04);
  --shadow-md: 0 4px 16px rgba(15,23,42,.08), 0 1px 4px rgba(15,23,42,.04);
  --shadow-lg: 0 8px 32px rgba(15,23,42,.1),  0 2px 8px rgba(15,23,42,.06);
  --shadow-xl: 0 16px 56px rgba(15,23,42,.14),0 4px 16px rgba(15,23,42,.08);
  --shadow-accent: 0 4px 24px rgba(0,81,224,.18);

─── 1f. Motion ──────────────────────────────────────────────────────────────────

  --duration-fast: 120ms;   --duration-base: 200ms;   --duration-slow: 360ms;
  --ease-out:    cubic-bezier(0.16,1,0.3,1);
  --ease-in-out: cubic-bezier(0.4,0,0.2,1);
  --ease-spring: cubic-bezier(0.34,1.56,0.64,1);

  /* Honour OS preference — zero all durations */
  @media (prefers-reduced-motion: reduce) {
    :root { --duration-fast:0ms; --duration-base:0ms; --duration-slow:0ms; }
  }

─── 1g. Colors ──────────────────────────────────────────────────────────────────

  Light mode (:root):
  --color-bg:#f8f9fc;                 --color-surface:#fff;
  --color-surface-raised:#fff;       --color-surface-subtle:#f1f5f9;
  --color-surface-invert:#0f172a;
  --color-border:#e2e8f0;            --color-border-strong:#cbd5e1;
  --color-text-primary:#0f172a;      --color-text-secondary:#475569;
  --color-text-muted:#94a3b8;        --color-text-invert:#f8fafc;
  --color-accent:#0051e0;            --color-accent-hover:#003eb0;
  --color-accent-soft:#eff6ff;       --color-accent-border:#bfdbfe;
  --color-success:#059669;           --color-success-soft:#ecfdf5;
  --color-error:#dc2626;             --color-error-soft:#fef2f2;

  Dark mode ([data-theme='dark']):
  --color-bg:#090e1a;                --color-surface:#111827;
  --color-surface-raised:#1a2233;    --color-surface-subtle:#141d2e;
  --color-border:#1e2d45;            --color-border-strong:#2d3f5e;
  --color-text-primary:#f0f6ff;      --color-text-secondary:#8da4be;
  --color-text-muted:#4d6480;        --color-accent:#4d8dff;
  --color-accent-hover:#3a7aee;      --color-accent-soft:#0c1e3a;
  --color-accent-border:#1e3a6a;
  /* Shadows deepen for dark: multiply all rgba alphas by ~3× */


════════════════════════════════════════════════════════════════════════════════
2. GRID UTILITIES  ·  src/css/layout/grid.css  ·  @layer utilities
════════════════════════════════════════════════════════════════════════════════

The 26-track grid has 27 grid lines.
  Line 1  = left viewport edge (gutter start)
  Line 2  = content start (left gutter end)
  Line 26 = content end  (right gutter start)  →  -2
  Line 27 = right viewport edge               →  -1

TWO NAMING CONTEXTS — important distinction:

  gc-*   Direct children of a 26-track .layout-section.
         Content starts at line 2, ends at -2.
         Gutter offset is built in to every class.

  col-*  Children of .layout-subgrid (which spans 2/-2, inheriting 24 tracks).
         Inside the subgrid the tracks are re-indexed 1-based.
         Line 1 = content start, -1 = content end (25 within subgrid).
         NO gutter offset — that is already handled by the subgrid parent.

─── 2a. Section setup ──────────────────────────────────────────────────────────

  /* Gives any element the full 26-track site grid + baseline row rhythm */
  .layout-section {
    display: grid;
    grid-template-columns: var(--grid-template);
    grid-auto-rows: minmax(var(--row-baseline), auto);
  }

  /* Subgrid passthrough — direct child of a 26-track section.
     Spans all 24 content tracks and re-exposes them to its own children.  */
  .layout-subgrid {
    grid-column: 2 / -2;
    display: grid;
    grid-template-columns: subgrid;
  }

─── 2b. gc-* placement (children of .layout-section) ──────────────────────────

  .gc-full  { grid-column: 2 / -2; }    /* all 24 content cols          */
  .gc-bleed { grid-column: 1 / -1; }    /* full viewport-width bleed    */

  /* Halves (12+12) */
  .gc-left-half   { grid-column: 2  / span 12; }
  .gc-right-half  { grid-column: 14 / -2;      }

  /* Thirds (8+8+8) */
  .gc-left-third   { grid-column: 2  / span 8;  }
  .gc-center-third { grid-column: 10 / span 8;  }
  .gc-right-third  { grid-column: 18 / -2;      }

  /* Quarters (6+6+6+6) */
  .gc-q1 { grid-column: 2  / span 6; }
  .gc-q2 { grid-column: 8  / span 6; }
  .gc-q3 { grid-column: 14 / span 6; }
  .gc-q4 { grid-column: 20 / -2;     }

  /* Two-thirds splits (16+8 | 8+16) */
  .gc-left-16  { grid-column: 2  / span 16; }
  .gc-right-16 { grid-column: 10 / -2;      }

  /* Three-quarters splits (18+6 | 6+18) */
  .gc-left-18  { grid-column: 2 / span 18; }
  .gc-right-18 { grid-column: 8 / -2;      }

  /* Sidebar splits (9+15 | 15+9) */
  .gc-left-9   { grid-column: 2  / span 9;  }
  .gc-right-15 { grid-column: 11 / -2;      }
  .gc-left-15  { grid-column: 2  / span 15; }
  .gc-right-9  { grid-column: 17 / -2;      }

  /* Centered insets — symmetric skip from BOTH edges of the 24-col window.
     Formula: start = skip + 2;  end = -(skip + 2)                        */
  .gc-20 { grid-column: 4  / -4;  }    /* skip 2 each side → 20 cols   */
  .gc-18 { grid-column: 5  / -5;  }    /* skip 3 each side → 18 cols   */
  .gc-16 { grid-column: 6  / -6;  }    /* skip 4 each side → 16 cols   */
  .gc-12 { grid-column: 8  / -8;  }    /* skip 6 each side → 12 cols   */
  .gc-8  { grid-column: 10 / -10; }    /* skip 8 each side →  8 cols   */

─── 2c. col-* placement (children of .layout-subgrid) ─────────────────────────

  Mirror of gc-*, but with gutter offset removed (subgrid is already at 2/-2):

  .col-full       { grid-column: 1 / -1;      }
  .col-left-half  { grid-column: 1  / span 12; }
  .col-right-half { grid-column: 13 / -1;      }
  .col-left-third   { grid-column: 1 / span 8;  }
  .col-center-third { grid-column: 9 / span 8;  }
  .col-right-third  { grid-column: 17 / -1;     }
  .col-q1 { grid-column: 1  / span 6; }
  .col-q2 { grid-column: 7  / span 6; }
  .col-q3 { grid-column: 13 / span 6; }
  .col-q4 { grid-column: 19 / -1;     }
  .col-left-16  { grid-column: 1 / span 16; }
  .col-right-16 { grid-column: 9 / -1;      }
  .col-left-18  { grid-column: 1 / span 18; }
  .col-right-18 { grid-column: 7 / -1;      }
  .col-left-9   { grid-column: 1  / span 9;  }
  .col-right-15 { grid-column: 10 / -1;      }
  .col-left-15  { grid-column: 1  / span 15; }
  .col-right-9  { grid-column: 16 / -1;      }
  .col-20 { grid-column: 3 / -3;  }
  .col-18 { grid-column: 4 / -4;  }
  .col-16 { grid-column: 5 / -5;  }
  .col-12 { grid-column: 7 / -7;  }
  .col-8  { grid-column: 9 / -9;  }

─── 2d. Layout presets ─────────────────────────────────────────────────────────

Each preset IS both the subgrid parent AND the layout — it owns
grid-column:2/-2 + display:grid + grid-template-columns:subgrid.

  /* Even 2-col (12+12) */
  .layout-halves {
    grid-column: 2 / -2;  display: grid;
    grid-template-columns: subgrid;  align-items: start;
    row-gap: var(--grid-gap);
  }
  .layout-halves > :nth-child(odd)  { grid-column: 1 / span 12; }
  .layout-halves > :nth-child(even) { grid-column: 13 / -1;     }

  /* Even 3-col (8+8+8) */
  .layout-thirds {
    grid-column: 2 / -2;  display: grid;
    grid-template-columns: subgrid;  align-items: start;
    row-gap: var(--grid-gap);
  }
  .layout-thirds > :nth-child(3n+1) { grid-column: 1  / span 8; }
  .layout-thirds > :nth-child(3n+2) { grid-column: 9  / span 8; }
  .layout-thirds > :nth-child(3n)   { grid-column: 17 / -1;     }

  /* Even 4-col (6+6+6+6) */
  .layout-quarters {
    grid-column: 2 / -2;  display: grid;
    grid-template-columns: subgrid;  align-items: start;
    row-gap: var(--grid-gap);
  }
  .layout-quarters > :nth-child(4n+1) { grid-column: 1  / span 6; }
  .layout-quarters > :nth-child(4n+2) { grid-column: 7  / span 6; }
  .layout-quarters > :nth-child(4n+3) { grid-column: 13 / span 6; }
  .layout-quarters > :nth-child(4n)   { grid-column: 19 / -1;     }

  /* Sidebar left (9 sidebar + 15 main) — e.g. contact, about */
  .layout-sidebar-left {
    grid-column: 2 / -2;  display: grid;
    grid-template-columns: subgrid;  align-items: start;
    row-gap: var(--grid-gap-lg);
  }
  .layout-sidebar-left > :first-child { grid-column: 1  / span 9; }
  .layout-sidebar-left > :last-child  { grid-column: 10 / -1;     }

  /* Sidebar right (15 main + 9 sidebar) */
  .layout-sidebar-right {
    grid-column: 2 / -2;  display: grid;
    grid-template-columns: subgrid;  align-items: start;
    row-gap: var(--grid-gap-lg);
  }
  .layout-sidebar-right > :first-child { grid-column: 1  / span 15; }
  .layout-sidebar-right > :last-child  { grid-column: 16 / -1;      }

  /* Feature split (14 text + 10 visual) */
  .layout-feature {
    grid-column: 2 / -2;  display: grid;
    grid-template-columns: subgrid;  align-items: center;
  }
  .layout-feature > :first-child { grid-column: 1 / span 14; }
  .layout-feature > :last-child  { grid-column: 15 / -1;     }

─── 2e. Row utilities ───────────────────────────────────────────────────────────

  /* Snap element to N × 50px baseline rows */
  .gr-1  { grid-row: span 1;  }   /* 50px  */
  .gr-2  { grid-row: span 2;  }   /* 100px */
  .gr-3  { grid-row: span 3;  }   /* 150px */
  .gr-4  { grid-row: span 4;  }   /* 200px */
  .gr-6  { grid-row: span 6;  }   /* 300px */
  .gr-8  { grid-row: span 8;  }   /* 400px */
  .gr-10 { grid-row: span 10; }   /* 500px */
  .gr-12 { grid-row: span 12; }   /* 600px */

─── 2f. Responsive collapse ─────────────────────────────────────────────────────

  /* Mobile (< 640px): ALL multi-column classes go full width */
  @media (max-width: 639px) {
    /* gc-* classes → full content width */
    .gc-left-half, .gc-right-half, .gc-left-third, .gc-center-third,
    .gc-right-third, .gc-q1, .gc-q2, .gc-q3, .gc-q4,
    .gc-left-16, .gc-right-16, .gc-left-18, .gc-right-18,
    .gc-left-9, .gc-right-15, .gc-left-15, .gc-right-9 {
      grid-column: 2 / -2;
    }
    /* col-* classes → full width within subgrid */
    .col-left-half, .col-right-half, .col-left-third, .col-center-third,
    .col-right-third, .col-q1, .col-q2, .col-q3, .col-q4,
    .col-left-16, .col-right-16, .col-left-18, .col-right-18,
    .col-left-9, .col-right-15, .col-left-15, .col-right-9 {
      grid-column: 1 / -1;
    }
    /* Layout preset children → full width */
    .layout-halves > *, .layout-thirds > *, .layout-quarters > *,
    .layout-sidebar-left > *, .layout-sidebar-right > *,
    .layout-feature > * { grid-column: 1 / -1; }
  }

  /* Tablet (640px–1023px): thirds → 2-up, sidebars → stacked */
  @media (min-width: 640px) and (max-width: 1023px) {
    .gc-left-third   { grid-column: 2 / span 12; }
    .gc-center-third { grid-column: 14 / -2;     }
    .gc-right-third  { grid-column: 2 / -2; margin-top: var(--space-8); }

    .col-left-third   { grid-column: 1 / span 12; }
    .col-center-third { grid-column: 13 / -1;     }
    .col-right-third  { grid-column: 1 / -1; margin-top: var(--space-8); }

    .layout-sidebar-left  > *,
    .layout-sidebar-right > * { grid-column: 1 / -1; }
  }


════════════════════════════════════════════════════════════════════════════════
3. CARD VARIANT 1 — .card  (square, container-query overlay)
   src/css/components/card.css  ·  @layer components
════════════════════════════════════════════════════════════════════════════════

HTML:
  <a href="/project" class="card">
    <picture><img src="…" alt="…"></picture>
    <div class="card-img-overlay">
      <h3>Title</h3>
      <p>Description</p>
    </div>
  </a>

CSS:
  .card {
    position: relative;  overflow: hidden;  border-radius: 4px;
    aspect-ratio: 1 / 1;  height: auto;
    container: card / inline-size;   /* enables @container card */
  }
  a.card { text-decoration: none;  color: inherit; }

  /* Enhanced layout activates at 300px+ container width */
  @container card (min-width: 300px) {
    .card picture {
      position: absolute;  inset: 0;
    }
    .card picture::before {
      content: '';  position: absolute;  inset: 0;
      background: linear-gradient(180deg, transparent, #000);
      z-index: 1;
    }
    .card .card-img-overlay {
      position: relative;  padding: 1em;  z-index: 2;
      display: flex;  flex-direction: column;
      justify-content: flex-end;  height: 100%;
    }
    .card h3 {
      font-size: 10cqi;   /* 10% of container inline-size */
      font-weight: 300;   line-height: 10cqi;
      margin: 0;  color: white;
    }
    .card p { color: rgba(255,255,255,0.9);  margin: 0.5em 0 0; }
  }

Related-projects grid (uses .card inside):
  .related-projects__grid {
    list-style: none;  padding: 0;  margin: 0;
    display: grid;  grid-template-columns: repeat(3, 1fr);
    gap: var(--grid-gap-sm);
  }
  @media (max-width: 640px)         { .related-projects__grid { grid-template-columns: 1fr; } }
  @media (min-width: 641px) and (max-width: 900px) {
    .related-projects__grid { grid-template-columns: repeat(2, 1fr); }
  }
  .related-projects__role  {
    font-size:0.65rem; font-weight:600; letter-spacing:0.08em;
    text-transform:uppercase; color:rgba(255,255,255,0.7); margin:0 0 0.25em;
  }
  .related-projects__title { /* override .card h3 cqi sizing */
    font-size: clamp(0.9rem, 4cqi, 1.4rem);
    font-weight:700;  line-height:1.2;  color:white;  margin:0 0 0.3em;
  }
  .related-projects__dates {
    font-size:0.7rem; color:rgba(255,255,255,0.6);
    margin:0; letter-spacing:0.03em;
  }


════════════════════════════════════════════════════════════════════════════════
4. CARD VARIANT 2 — .pf-split  (FEATURED HERO SPLIT CARD)
   src/css/pages/portfolio.css  ·  @layer components
════════════════════════════════════════════════════════════════════════════════

Full-width. Image left (57fr), editorial text right (43fr) at desktop.
One column on mobile. Is its own container query context.

HTML:
  <a class="pf-split" href="/project">
    <div class="pf-split__image">
      <img class="pf-split__img" src="…" alt="…">
      <!-- fallback div if no image: pf-split__img-fallback -->
    </div>
    <div class="pf-split__body">
      <p class="pf-split__eyebrow">Client / Company</p>
      <h2 class="pf-split__heading">Project Title</h2>
      <p class="pf-split__desc">Short description (max ~44ch)</p>
      <ul class="pf-split__skills">
        <li>UX Design</li>
        <li>Research</li>
      </ul>
      <span class="pf-split__cta">
        View Case Study
        <svg><!-- arrow --></svg>
      </span>
    </div>
  </a>

CSS:
  .pf-split {
    display: grid;  grid-template-columns: 1fr;
    text-decoration: none;
    border-radius: var(--radius-2xl);  overflow: hidden;
    border: 1px solid var(--color-border);  box-shadow: var(--shadow-md);
    margin-bottom: var(--space-12);
    container: pf-split / inline-size;
    transition: box-shadow var(--duration-base) var(--ease-out),
                transform  var(--duration-base) var(--ease-out);
  }
  @media (min-width: 1024px) {
    .pf-split { grid-template-columns: var(--grid-split); /* 57fr 43fr */ }
  }
  .pf-split:hover        { box-shadow: var(--shadow-xl); transform: translateY(-2px); }
  .pf-split:focus-visible {
    outline: none;
    box-shadow: 0 0 0 3px var(--color-surface), 0 0 0 6px var(--color-accent);
  }

  .pf-split__image {
    position: relative;  overflow: hidden;
    min-height: 280px;   /* mobile  */
  }
  @media (min-width: 640px)  { .pf-split__image { min-height: 360px; } }
  @media (min-width: 1024px) { .pf-split__image { min-height: 520px; } }

  .pf-split__img {
    position: absolute;  inset: 0;
    width: 100%;  height: 100%;  object-fit: cover;  display: block;
    transition: transform 700ms var(--ease-out);
  }
  .pf-split:hover .pf-split__img { transform: scale(1.03); }

  .pf-split__img-fallback {
    position: absolute;  inset: 0;  width: 100%;  height: 100%;
    background: linear-gradient(135deg, #0a1a38, #0c2660);
  }

  .pf-split__body {
    background: var(--color-surface);
    display: grid;
    grid-template-columns: 1fr;
    /* 5 named rows: eyebrow | heading | desc | skills (grows) | cta */
    grid-template-rows: auto auto auto 1fr auto;
    align-content: center;
    min-width: 0;
    padding: var(--space-10) var(--space-8);
  }
  @media (min-width: 640px)  { .pf-split__body { padding: var(--space-12) var(--space-10); } }
  @media (min-width: 1024px) { .pf-split__body { padding: var(--space-16) var(--space-14); } }

  .pf-split__eyebrow {
    font-size: var(--text-xs);  font-weight: var(--font-semibold);
    letter-spacing: var(--tracking-widest);  text-transform: uppercase;
    color: var(--color-text-muted);  margin: 0 0 var(--space-3);
  }
  .pf-split__heading {
    font-size: var(--comfort-h2);   /* clamp(2xl, 4.5cqi, 4xl) */
    font-weight: var(--font-extrabold);
    letter-spacing: var(--tracking-tight);  line-height: var(--leading-tight);
    color: var(--color-text-primary);
    margin: 0 0 var(--space-5);  max-width: 22ch;
  }
  .pf-split:hover .pf-split__heading {
    color: var(--color-accent);
    transition: color var(--duration-base) var(--ease-out);
  }
  .pf-split__desc {
    font-size: var(--text-sm);  line-height: var(--leading-relaxed);
    color: var(--color-text-secondary);
    max-width: 44ch;  margin: 0 0 var(--space-7);
  }
  .pf-split__skills {
    list-style: none;  padding: 0;  margin: 0 0 var(--space-10);
    display: grid;  grid-template-columns: 1fr;
    grid-auto-rows: minmax(var(--row-baseline), auto);
    border-top: 1px solid var(--color-border);
  }
  .pf-split__skills li {
    font-size: var(--text-sm);  font-weight: var(--font-medium);
    color: var(--color-accent);
    padding: var(--space-2_5) 0;
    border-bottom: 1px solid var(--color-border);
    line-height: 1.4;
  }
  .pf-split__cta {
    display: inline-flex;  align-items: center;  gap: var(--space-2);
    padding: var(--space-3) var(--space-6);
    background: var(--color-surface-invert);  color: var(--color-text-invert);
    font-size: 0.6875rem;  font-weight: var(--font-bold);
    letter-spacing: 0.1em;  text-transform: uppercase;
    border-radius: var(--radius-sm);  align-self: start;
    transition: background var(--duration-base) var(--ease-out),
                transform  var(--duration-fast) var(--ease-out);
  }
  .pf-split:hover .pf-split__cta {
    background: var(--color-accent);
    transform: translateX(3px);
  }


════════════════════════════════════════════════════════════════════════════════
5. CARD VARIANT 3 — .pf-card  (OVERLAY GRID CARD)
   src/css/pages/portfolio.css  ·  @layer components
════════════════════════════════════════════════════════════════════════════════

4:3 aspect image fills the card. Body is absolutely positioned over a
persistent bottom-up dark gradient. Text is always white-on-dark.
Used in the responsive card grid below the featured split card.

HTML:
  <a class="pf-card" href="/project">
    <div class="pf-card__image">
      <img class="pf-card__img" src="…" alt="Project name">
      <!-- OR when no image: -->
      <div class="pf-card__fallback">
        <span class="pf-card__fallback-letter">P</span>
      </div>
    </div>
    <div class="pf-card__body">
      <div class="pf-card__chips">
        <span class="pf-chip pf-chip--accent pf-chip--sm">Featured</span>
        <span class="pf-chip pf-chip--sm">UX Design</span>
      </div>
      <h3 class="pf-card__title">Project Title</h3>
      <p class="pf-card__dates">2023 – 2024</p>
      <div class="pf-card__skills">
        <span class="pf-chip pf-chip--xs">React</span>
        <span class="pf-chip pf-chip--xs">Figma</span>
      </div>
    </div>
  </a>

CSS:
  .pf-card {
    position: relative;  display: block;  text-decoration: none;
    border-radius: var(--radius-xl);  overflow: hidden;  min-width: 0;
    box-shadow: var(--shadow-xs);
    container: pf-card / inline-size;
    transition: box-shadow var(--duration-base) var(--ease-out),
                transform  var(--duration-base) var(--ease-out);
  }
  .pf-card:hover        { box-shadow: var(--shadow-lg); transform: translateY(-3px); }
  .pf-card:focus-visible {
    outline: none;
    box-shadow: 0 0 0 3px var(--color-surface), 0 0 0 6px var(--color-accent);
  }

  .pf-card__image { position: relative;  overflow: hidden;  aspect-ratio: 4 / 3; }

  /* Persistent gradient — always legible, deepens on hover */
  .pf-card__image::after {
    content: '';  position: absolute;  inset: 0;
    pointer-events: none;  z-index: 1;
    background: linear-gradient(to top,
      rgba(5,10,25,0.94) 0%,
      rgba(5,10,25,0.55) 45%,
      rgba(5,10,25,0.08) 72%,
      transparent 100%
    );
    transition: background var(--duration-base) var(--ease-out);
  }
  .pf-card:hover .pf-card__image::after {
    background: linear-gradient(to top,
      rgba(5,10,25,0.97) 0%,
      rgba(5,10,25,0.72) 52%,
      rgba(5,10,25,0.18) 78%,
      transparent 100%
    );
  }

  .pf-card__img {
    width: 100%;  height: 100%;  object-fit: cover;  display: block;
    transition: transform 500ms var(--ease-out);
  }
  .pf-card:hover .pf-card__img { transform: scale(1.04); }

  .pf-card__fallback {
    width: 100%;  height: 100%;
    display: flex;  align-items: center;  justify-content: center;
    background: linear-gradient(135deg,
      var(--color-accent-soft), var(--color-surface-subtle));
  }
  .pf-card__fallback-letter {
    font-size: 3rem;  font-weight: var(--font-extrabold);
    opacity: 0.2;  color: var(--color-accent);  line-height: 1;
  }

  /* Body pinned at card bottom, above gradient */
  .pf-card__body {
    position: absolute;  bottom: 0;  left: 0;  right: 0;  z-index: 2;
    padding: var(--space-5);
    display: flex;  flex-direction: column;  gap: var(--space-1);  min-width: 0;
  }

  .pf-card__title {
    font-size: var(--compact-title);  font-weight: var(--font-bold);
    line-height: var(--leading-compact);
    margin: 0 0 var(--space-1);  color: #fff;
    transition: color var(--duration-base) var(--ease-out);
  }
  .pf-card:hover .pf-card__title { color: #a5c0ff; /* accent-light */ }

  .pf-card__chips  { display:flex; flex-wrap:wrap; gap:var(--space-1_5); margin-bottom:var(--space-1); }
  .pf-card__dates  { font-size:var(--compact-label); color:rgba(255,255,255,0.5); margin:0; }
  .pf-card__skills { display:flex; flex-wrap:wrap; gap:var(--space-1); margin-top:var(--space-1_5); }

The card grid container:
  .pf-card-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: var(--grid-gap-sm);
  }
  @media (min-width: 640px)  { .pf-card-grid { grid-template-columns: 12fr 12fr;     } }
  @media (min-width: 1024px) { .pf-card-grid { grid-template-columns: 8fr 8fr 8fr;   } }


════════════════════════════════════════════════════════════════════════════════
6. CHIP / BADGE SYSTEM  ·  @layer components
════════════════════════════════════════════════════════════════════════════════

  /* Base chip — glass effect, intended for use on dark/image backgrounds */
  .pf-chip {
    display: inline-flex;  align-items: center;
    padding: 0.2em 0.65em;
    font-size: var(--text-xs);  font-weight: var(--font-medium);
    letter-spacing: var(--tracking-wide);
    border-radius: var(--radius-full);  white-space: nowrap;  line-height: 1.4;
    color: rgba(255,255,255,0.9);
    background: rgba(255,255,255,0.12);
    border: 1px solid rgba(255,255,255,0.18);
    backdrop-filter: blur(4px);
  }

  /* Modifiers */
  .pf-chip--accent {
    background: var(--color-accent);  border-color: var(--color-accent);
    color: #fff;  font-weight: var(--font-semibold);  backdrop-filter: none;
  }
  .pf-chip--muted {
    background: rgba(255,255,255,0.07);  color: rgba(255,255,255,0.65);
  }
  .pf-chip--accent-soft {
    background: var(--color-accent-soft);  border-color: var(--color-accent-border);
    color: var(--color-accent);  backdrop-filter: none;
  }
  .pf-chip--sm { font-size: 0.6875rem;  padding: 0.15em 0.55em; }
  .pf-chip--xs {
    font-size: 0.625rem;  padding: 0.1em 0.5em;
    color: var(--color-text-muted);
    background: var(--color-surface-subtle);
    border: 1px solid var(--color-border);
    backdrop-filter: none;
  }

  /* xs chips inside overlay cards — glass override */
  .pf-card .pf-chip--xs {
    color: rgba(255,255,255,0.65);
    background: rgba(255,255,255,0.1);
    border-color: rgba(255,255,255,0.15);
    backdrop-filter: blur(4px);
  }


════════════════════════════════════════════════════════════════════════════════
7. FR COLUMN CONVENTION
════════════════════════════════════════════════════════════════════════════════

When using display:grid with explicit fr columns inside the content area,
fr numerators always map to 24-column counts so widths stay conceptually
aligned with the site grid:

  Equal 2-up:       12fr 12fr          (each = 12 of 24)
  Equal 3-up:       8fr 8fr 8fr        (each = 8 of 24)
  Equal 4-up:       6fr 6fr 6fr 6fr    (each = 6 of 24)
  Footer layout:    12fr 5fr 5fr       (brand=12, two nav cols=5)
  Feature split:    57fr 43fr          (stored as var(--grid-split))

This naming convention is cosmetic (fr is always relative), but it makes
column intentions self-documenting and code-reviewable.


════════════════════════════════════════════════════════════════════════════════
8. CRITICAL RULES & GOTCHAS
════════════════════════════════════════════════════════════════════════════════

1. --grid-gap-unit vs --grid-col-unit
   • --grid-gap-unit  = calc(100% / 24)  → container-relative. Use ONLY for
     gap / column-gap / row-gap. It resolves to different sizes depending on
     where it is used (correct proportional behavior).
   • --grid-col-unit  = clamp(0.75rem, 3.5vw, 3.125rem)  → vw-based, stable
     absolute size at every nesting depth. Use for padding, margin, width.
   Mixing these up causes layout inconsistencies.

2. Never add .container or any width-capping class to a BEM element that
   already declares grid-column in its own CSS. The .container class adds
   padding-inline that can shift content sideways. BEM elements with their
   own grid-column placement are self-aware of their position and need no
   wrapper.

3. Every section parent that uses --grid-template must also set:
     grid-auto-rows: minmax(var(--row-baseline), auto);
   This snaps rows to the 50px square-cell baseline grid while still
   allowing content to grow beyond the minimum height.

4. Tokens are unlayered (:root declaration). This is intentional — unlayered
   rules beat ALL @layer declarations, ensuring tokens are always available.

5. The --grid-template gutter tracks use minmax(var(--sqs-site-gutter), 1fr)
   not a fixed value. This means:
   • Below max-width: gutters hold exactly 8vw.
   • Above max-width: gutters expand beyond 8vw to center the 1200px grid.

6. container: pf-card / inline-size and container: pf-split / inline-size
   are named containers so children can target them with @container pf-card
   or @container pf-split rules if needed.

7. The .pf-card__image::after pseudo-element uses z-index:1 and
   .pf-card__body uses z-index:2. The body is position:absolute so it
   needs both z-index and the image-relative parent (position:relative).
   Do NOT add overflow:hidden to .pf-card__body — it will clip the chip
   backdrop-filter blur.


════════════════════════════════════════════════════════════════════════════════
9. SECTION WIRING REFERENCE
════════════════════════════════════════════════════════════════════════════════

Any page section using the 26-track grid:

  <!-- OPTION A: Utility classes -->
  <section class="layout-section">
    <div class="gc-full">…full 24-col content…</div>
    <div class="gc-left-half">…left 12 cols…</div>
    <div class="gc-right-half">…right 12 cols…</div>
  </section>

  <!-- OPTION B: Inline tokens (for one-off BEM sections) -->
  <section style="display:grid;
    grid-template-columns:var(--grid-template);
    grid-auto-rows:minmax(var(--row-baseline),auto)">
    <div style="grid-column:2/-2">…</div>
  </section>

  <!-- OPTION C: Subgrid passthrough to grandchildren -->
  <section class="layout-section">
    <div class="layout-subgrid">             <!-- spans 2/-2, reindex to 1 -->
      <div class="col-left-third">…</div>    <!-- tracks 1–8   -->
      <div class="col-center-third">…</div>  <!-- tracks 9–16  -->
      <div class="col-right-third">…</div>   <!-- tracks 17–24 -->
    </div>
  </section>

  <!-- OPTION D: Layout preset (handles subgrid + placement in one class) -->
  <section class="layout-section">
    <div class="layout-thirds">             <!-- gc-full + subgrid + nth-child rules -->
      <article>…card 1…</article>
      <article>…card 2…</article>
      <article>…card 3…</article>
    </div>
  </section>

  <!-- Portfolio list page pattern -->
  <section class="pf-grid-section">         <!-- layout-section + padding-block -->
    <div class="gc-full">
      <a class="pf-split" href="…">…</a>    <!-- featured hero card -->
      <div class="pf-card-grid">
        <a class="pf-card" href="…">…</a>   <!-- overlay grid cards -->
        <a class="pf-card" href="…">…</a>
        <a class="pf-card" href="…">…</a>
      </div>
    </div>
  </section>

