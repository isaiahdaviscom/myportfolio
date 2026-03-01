const n={title:"Components/Card",tags:["autodocs"],argTypes:{title:{control:"text",description:"Project title"},role:{control:"text",description:"Role badge label"},dates:{control:"text",description:"Date range string"},imageUrl:{control:"text",description:"Cover image URL"},href:{control:"text",description:"Link destination"},size:{control:{type:"select"},options:["240px","320px","420px","560px"],description:"Container width (demonstrates container query breakpoints)"}},parameters:{docs:{description:{component:`Card component stories\r
Reflects .card + .card-img-overlay BEM from src/css/components/card.css.\r

The .card class uses CSS Container Queries for responsive behaviour:\r
  - aspect-ratio: 1/1 (square)\r
  - container: card / inline-size\r
  - At 300px+ width: full-bleed image, gradient overlay, text at bottom\r

Usage:\r
  <a href="/project" class="card">\r
    <picture><img src="..." alt="..." /></picture>\r
    <div class="card-img-overlay">\r
      <span class="badge">Role</span>\r
      <h3>Title</h3>\r
    </div>\r
  </a>`}}}},i="https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=560&h=560&fit=crop";function o(e){return`
    <div style="width:${e.size}; display:inline-block;">
      <a href="${e.href}" class="card">
        <picture>
          <img src="${e.imageUrl}" alt="${e.title}" />
        </picture>
        <div class="card-img-overlay">
          <span class="badge">${e.role}</span>
          <h3>${e.title}</h3>
          <p>${e.dates}</p>
        </div>
      </a>
    </div>
  `}const r={args:{title:"Empire State Building",role:"Brand & Identity",dates:"2025",imageUrl:i,href:"/portfolio/empire/",size:"320px"},render:o},t={args:{...r.args,title:"IGA Supermarkets",role:"Web Dev",size:"240px"},render:o},a={args:{...r.args,title:"Premier Energy",role:"Digital Strategy",size:"560px"},render:o},s={render:()=>`
    <ul class="related-projects__grid">
      ${[{title:"S&C Electric",role:"Brand",dates:"2024",img:"https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=400&fit=crop"},{title:"Mac N Cheese Bar",role:"Web Dev",dates:"2024",img:"https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=400&h=400&fit=crop"},{title:"Spark",role:"Strategy",dates:"2023",img:"https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=400&fit=crop"}].map(e=>`
        <li>
          <a href="#" class="card related-projects__card">
            <picture><img src="${e.img}" alt="${e.title}" /></picture>
            <div class="card-img-overlay">
              <p class="related-projects__role">${e.role}</p>
              <h3 class="related-projects__title">${e.title}</h3>
              <p class="related-projects__dates">${e.dates}</p>
            </div>
          </a>
        </li>
      `).join("")}
    </ul>
  `};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  args: {
    title: 'Empire State Building',
    role: 'Brand & Identity',
    dates: '2025',
    imageUrl: PLACEHOLDER,
    href: '/portfolio/empire/',
    size: '320px'
  },
  render: renderCard
}`,...r.parameters?.docs?.source},description:{story:"Default portfolio card at standard size",...r.parameters?.docs?.description}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  args: {
    ...Default.args,
    title: 'IGA Supermarkets',
    role: 'Web Dev',
    size: '240px'
  },
  render: renderCard
}`,...t.parameters?.docs?.source},description:{story:"Small card — below container-query threshold (no overlay)",...t.parameters?.docs?.description}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  args: {
    ...Default.args,
    title: 'Premier Energy',
    role: 'Digital Strategy',
    size: '560px'
  },
  render: renderCard
}`,...a.parameters?.docs?.source},description:{story:"Large card",...a.parameters?.docs?.description}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  render: () => \`
    <ul class="related-projects__grid">
      \${[{
    title: 'S&C Electric',
    role: 'Brand',
    dates: '2024',
    img: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=400&fit=crop'
  }, {
    title: 'Mac N Cheese Bar',
    role: 'Web Dev',
    dates: '2024',
    img: 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=400&h=400&fit=crop'
  }, {
    title: 'Spark',
    role: 'Strategy',
    dates: '2023',
    img: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=400&fit=crop'
  }].map(p => \`
        <li>
          <a href="#" class="card related-projects__card">
            <picture><img src="\${p.img}" alt="\${p.title}" /></picture>
            <div class="card-img-overlay">
              <p class="related-projects__role">\${p.role}</p>
              <h3 class="related-projects__title">\${p.title}</h3>
              <p class="related-projects__dates">\${p.dates}</p>
            </div>
          </a>
        </li>
      \`).join('')}
    </ul>
  \`
}`,...s.parameters?.docs?.source},description:{story:"Related-projects grid — 3-up using .related-projects__grid",...s.parameters?.docs?.description}}};const c=["Default","Small","Large","RelatedProjectsGrid"];export{r as Default,a as Large,s as RelatedProjectsGrid,t as Small,c as __namedExportsOrder,n as default};
