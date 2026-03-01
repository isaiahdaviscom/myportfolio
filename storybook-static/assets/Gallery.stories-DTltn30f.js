const d={title:"Components/Gallery",tags:["autodocs"],argTypes:{columns:{control:{type:"range",min:1,max:4},description:"Number of columns (uses CSS grid)"},itemCount:{control:{type:"range",min:3,max:9},description:"Number of gallery items"},showBadge:{control:"boolean",description:"Show role badge on each card"}},parameters:{docs:{description:{component:`Gallery component stories\r
Uses the .card / .card-img-overlay BEM classes and .badge.\r
The grid uses a CSS Grid layout matching the portfolio page.`}}}},i=[{title:"Empire",role:"Brand & Identity",dates:"2025",image:"https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=400&fit=crop",href:"/portfolio/empire/"},{title:"S&C Electric",role:"Web Development",dates:"2024",image:"https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&h=400&fit=crop",href:"/portfolio/sandc/"},{title:"IGA",role:"Digital Strategy",dates:"2024",image:"https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=400&fit=crop",href:"/portfolio/iga/"},{title:"Mac N Cheese Bar",role:"Brand & Identity",dates:"2023",image:"https://images.unsplash.com/photo-1634942537034-2531766767d1?w=400&h=400&fit=crop",href:"/portfolio/macncheesebar/"},{title:"Premier Energy",role:"Web Development",dates:"2023",image:"https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=400&fit=crop",href:"/portfolio/premier/"},{title:"Spark",role:"Digital Strategy",dates:"2023",image:"https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=400&h=400&fit=crop",href:"/portfolio/spark/"}],e={args:{columns:3,itemCount:6,showBadge:!0},render:o=>{const n=i.slice(0,o.itemCount).map(r=>`
      <a href="${r.href}" class="card">
        <picture><img src="${r.image}" alt="${r.title}" /></picture>
        <div class="card-img-overlay">
          ${o.showBadge?`<span class="badge">${r.role}</span>`:""}
          <h3>${r.title}</h3>
          <p>${r.dates}</p>
        </div>
      </a>`).join("");return`
      <div style="display:grid; grid-template-columns:repeat(${o.columns},1fr); gap:1rem;">
        ${n}
      </div>
    `}},a={args:{...e.args,columns:2,itemCount:4},render:e.render},s={args:{...e.args,showBadge:!1},render:e.render},t={args:{...e.args,columns:1,itemCount:1},render:e.render};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
  args: {
    columns: 3,
    itemCount: 6,
    showBadge: true
  },
  render: args => {
    const items = PROJECTS.slice(0, args.itemCount);
    const cards = items.map(p => \`
      <a href="\${p.href}" class="card">
        <picture><img src="\${p.image}" alt="\${p.title}" /></picture>
        <div class="card-img-overlay">
          \${args.showBadge ? \`<span class="badge">\${p.role}</span>\` : ''}
          <h3>\${p.title}</h3>
          <p>\${p.dates}</p>
        </div>
      </a>\`).join('');
    return \`
      <div style="display:grid; grid-template-columns:repeat(\${args.columns},1fr); gap:1rem;">
        \${cards}
      </div>
    \`;
  }
}`,...e.parameters?.docs?.source}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  args: {
    ...Default.args,
    columns: 2,
    itemCount: 4
  },
  render: Default.render
}`,...a.parameters?.docs?.source},description:{story:"Two-column",...a.parameters?.docs?.description}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  args: {
    ...Default.args,
    showBadge: false
  },
  render: Default.render
}`,...s.parameters?.docs?.source},description:{story:"Without badges",...s.parameters?.docs?.description}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  args: {
    ...Default.args,
    columns: 1,
    itemCount: 1
  },
  render: Default.render
}`,...t.parameters?.docs?.source},description:{story:"Single feature card",...t.parameters?.docs?.description}}};const l=["Default","TwoColumn","NoBadge","SingleCard"];export{e as Default,s as NoBadge,t as SingleCard,a as TwoColumn,l as __namedExportsOrder,d as default};
