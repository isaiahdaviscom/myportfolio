const f={title:"Pages/Portfolio",tags:["autodocs"],argTypes:{title:{control:"text",description:"Page hero heading"},description:{control:"text",description:"Page hero sub-copy"},projectCount:{control:{type:"number",min:1,max:9},description:"Number of project cards to render"},showFilters:{control:"boolean",description:"Show category filter tabs"}},parameters:{docs:{description:{component:`Portfolio page stories.\r

Mirrors the BEM classes used in:\r
 - layouts/partials/project-card.html  (.card / .card-img-overlay / .badge)\r
 - src/css/pages/portfolio.css          (.pf-grid / .pf-hero-*)\r
 - src/css/layout/page.css              (.btn-primary / .btn-secondary)`}}}},p=[{title:"Empire Creative Co.",role:"Brand Identity · Web Design",cover:"https://images.unsplash.com/photo-1493723843671-1d655e66ac1c?w=800&h=500&fit=crop",tags:["Branding","Hugo","Tailwind"],href:"#"},{title:"IGA Supermarkets",role:"UI Design · Front-end Dev",cover:"https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=500&fit=crop",tags:["React","TypeScript","CSS"],href:"#"},{title:"Isaiah Davis Designs",role:"Portfolio · Motion",cover:"https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=800&h=500&fit=crop",tags:["Hugo","GSAP","Tailwind"],href:"#"},{title:"Spark Digital Agency",role:"Web Design · Development",cover:"https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&h=500&fit=crop",tags:["Next.js","Sanity","Vercel"],href:"#"},{title:"Love Is Like A Candle",role:"E-commerce · Shopify",cover:"https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=500&fit=crop",tags:["Shopify","Liquid","JS"],href:"#"},{title:"Tom's Automotive",role:"Corporate Website",cover:"https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=500&fit=crop",tags:["WordPress","PHP","ACF"],href:"#"},{title:"Mac N Cheese Bar",role:"Restaurant · Booking",cover:"https://images.unsplash.com/photo-1634942537034-2531766767d1?w=800&h=500&fit=crop",tags:["Hugo","Netlify","Tailwind"],href:"#"},{title:"Premier Pools",role:"Lead Gen · Landing Page",cover:"https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=800&h=500&fit=crop",tags:["HTML","CSS","Netlify Forms"],href:"#"},{title:"S&C Constructions",role:"Corporate · Portfolio",cover:"https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&h=500&fit=crop",tags:["Hugo","Tailwind","Alpine.js"],href:"#"}],d=({title:r,role:a,cover:i,tags:n,href:l})=>`
  <a href="${l}" class="card" aria-label="${r}">
    <div class="card-img-overlay">
      <img
        src="${i}"
        alt="${r} cover"
        class="w-full h-48 object-cover"
        width="800" height="500"
        loading="lazy"
        decoding="async"
      />
    </div>
    <div class="card__body">
      ${n.map(c=>`<span class="badge">${c}</span>`).join(" ")}
      <p class="card__role">${a}</p>
      <h3 class="card__title">${r}</h3>
    </div>
  </a>
`,e={args:{title:"My Work",description:"A selection of projects across branding, web design, and front-end development.",projectCount:6,showFilters:!0},render:r=>{const a=p.slice(0,r.projectCount),i=r.showFilters?`
        <div class="pf-filters" role="tablist" aria-label="Filter by category">
          <button class="pf-filter pf-filter--active" role="tab" aria-selected="true">All</button>
          <button class="pf-filter" role="tab" aria-selected="false">Branding</button>
          <button class="pf-filter" role="tab" aria-selected="false">Web Design</button>
          <button class="pf-filter" role="tab" aria-selected="false">Development</button>
          <button class="pf-filter" role="tab" aria-selected="false">E-commerce</button>
        </div>
      `:"";return`
      <div class="pf-page">
        <!-- Hero -->
        <section class="pf-hero page-hero" aria-label="Portfolio introduction">
          <div class="pf-hero__inner page-hero__inner">
            <h1 class="pf-hero__heading page-hero__heading">${r.title}</h1>
            <p class="pf-hero__sub page-hero__sub">${r.description}</p>
            <div class="pf-hero__cta">
              <a href="#contact" class="btn-primary">Start a project</a>
              <a href="#work"    class="btn-secondary">See all work</a>
            </div>
          </div>
        </section>

        <!-- Grid -->
        <section class="pf-section" id="work">
          <div class="pf-section__inner">
            ${i}
            <ul class="pf-grid" role="list">
              ${a.map(n=>`<li>${d(n)}</li>`).join(`
              `)}
            </ul>
          </div>
        </section>
      </div>
    `}},t={args:{...e.args,title:"All Projects",description:"Every project in the portfolio.",projectCount:9,showFilters:!1},render:e.render},s={args:{...e.args,title:"Featured Work",description:"Selected projects that showcase my expertise and creativity.",projectCount:3,showFilters:!1},render:e.render},o={args:{...e.args,showFilters:!0},render:e.render};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
  args: {
    title: 'My Work',
    description: 'A selection of projects across branding, web design, and front-end development.',
    projectCount: 6,
    showFilters: true
  },
  render: args => {
    const projects = PROJECTS.slice(0, args.projectCount);
    const filtersHtml = args.showFilters ? \`
        <div class="pf-filters" role="tablist" aria-label="Filter by category">
          <button class="pf-filter pf-filter--active" role="tab" aria-selected="true">All</button>
          <button class="pf-filter" role="tab" aria-selected="false">Branding</button>
          <button class="pf-filter" role="tab" aria-selected="false">Web Design</button>
          <button class="pf-filter" role="tab" aria-selected="false">Development</button>
          <button class="pf-filter" role="tab" aria-selected="false">E-commerce</button>
        </div>
      \` : '';
    return \`
      <div class="pf-page">
        <!-- Hero -->
        <section class="pf-hero page-hero" aria-label="Portfolio introduction">
          <div class="pf-hero__inner page-hero__inner">
            <h1 class="pf-hero__heading page-hero__heading">\${args.title}</h1>
            <p class="pf-hero__sub page-hero__sub">\${args.description}</p>
            <div class="pf-hero__cta">
              <a href="#contact" class="btn-primary">Start a project</a>
              <a href="#work"    class="btn-secondary">See all work</a>
            </div>
          </div>
        </section>

        <!-- Grid -->
        <section class="pf-section" id="work">
          <div class="pf-section__inner">
            \${filtersHtml}
            <ul class="pf-grid" role="list">
              \${projects.map(p => \`<li>\${renderCard(p)}</li>\`).join('\\n              ')}
            </ul>
          </div>
        </section>
      </div>
    \`;
  }
}`,...e.parameters?.docs?.source},description:{story:"Default portfolio grid — 6 projects, filters visible.",...e.parameters?.docs?.description}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  args: {
    ...Default.args,
    title: 'All Projects',
    description: 'Every project in the portfolio.',
    projectCount: 9,
    showFilters: false
  },
  render: Default.render
}`,...t.parameters?.docs?.source},description:{story:"Full grid — all 9 sample projects, no filters.",...t.parameters?.docs?.description}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  args: {
    ...Default.args,
    title: 'Featured Work',
    description: 'Selected projects that showcase my expertise and creativity.',
    projectCount: 3,
    showFilters: false
  },
  render: Default.render
}`,...s.parameters?.docs?.source},description:{story:'Minimal — 3 featured projects, no filters. Useful for the home page "Work" section preview.',...s.parameters?.docs?.description}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  args: {
    ...Default.args,
    showFilters: true
  },
  render: Default.render
}`,...o.parameters?.docs?.source},description:{story:"With filters visible but no active selection (all categories shown).",...o.parameters?.docs?.description}}};const h=["Default","FullGrid","Minimal","WithFilters"];export{e as Default,t as FullGrid,s as Minimal,o as WithFilters,h as __namedExportsOrder,f as default};
