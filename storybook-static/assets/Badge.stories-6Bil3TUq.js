const d={title:"Components/Badge",tags:["autodocs"],argTypes:{text:{control:"text",description:"Badge label text"},colorClass:{control:{type:"select"},options:["","text-blue-400","text-green-400","text-amber-400","text-red-400","text-purple-400"],description:"Optional Tailwind text-color override (bg stays black)"}},parameters:{docs:{description:{component:`Badge component stories\r
Reflects the actual .badge class from src/css/components/badge.css:\r
  .badge  — black bg, white text, small pill (0.85em, border-radius 4px)\r

Color and size are overridden via Tailwind utility classes on top of .badge.`}}}},e={args:{text:"Brand & Identity",colorClass:""},render:o=>`<span class="badge ${o.colorClass}">${o.text}</span>`},r={args:{text:"Web Development",colorClass:"text-blue-400"},render:e.render},a={args:{text:"Available",colorClass:"text-green-400"},render:e.render},s={args:{text:"In Progress",colorClass:"text-amber-400"},render:e.render},t={render:()=>`
    <div class="flex flex-wrap gap-3 p-4">
      <span class="badge">Brand &amp; Identity</span>
      <span class="badge text-blue-400">Web Development</span>
      <span class="badge text-green-400">Digital Strategy</span>
      <span class="badge text-amber-400">UI / UX Design</span>
      <span class="badge text-purple-400">E-commerce</span>
      <span class="badge text-red-400">Featured</span>
    </div>
  `},n={render:()=>`
    <div style="width:320px; background:#111; border-radius:8px; overflow:hidden; position:relative; padding:1rem;">
      <span class="badge text-blue-400" style="margin-bottom:.75rem; display:inline-block;">Web Development</span>
      <h3 style="color:#fff; font-size:1.1rem; font-weight:700; margin:0 0 .25rem;">Empire State Building</h3>
      <p style="color:rgba(255,255,255,.6); font-size:.8rem; margin:0;">Rebranding &middot; 2025</p>
    </div>
  `};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
  args: {
    text: 'Brand & Identity',
    colorClass: ''
  },
  render: args => \`<span class="badge \${args.colorClass}">\${args.text}</span>\`
}`,...e.parameters?.docs?.source},description:{story:"Default badge — black background, white text",...e.parameters?.docs?.description}}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  args: {
    text: 'Web Development',
    colorClass: 'text-blue-400'
  },
  render: Default.render
}`,...r.parameters?.docs?.source},description:{story:"Blue tinted label",...r.parameters?.docs?.description}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  args: {
    text: 'Available',
    colorClass: 'text-green-400'
  },
  render: Default.render
}`,...a.parameters?.docs?.source},description:{story:"Green tinted label",...a.parameters?.docs?.description}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  args: {
    text: 'In Progress',
    colorClass: 'text-amber-400'
  },
  render: Default.render
}`,...s.parameters?.docs?.source},description:{story:"Amber tinted label",...s.parameters?.docs?.description}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  render: () => \`
    <div class="flex flex-wrap gap-3 p-4">
      <span class="badge">Brand &amp; Identity</span>
      <span class="badge text-blue-400">Web Development</span>
      <span class="badge text-green-400">Digital Strategy</span>
      <span class="badge text-amber-400">UI / UX Design</span>
      <span class="badge text-purple-400">E-commerce</span>
      <span class="badge text-red-400">Featured</span>
    </div>
  \`
}`,...t.parameters?.docs?.source},description:{story:"All variants side by side",...t.parameters?.docs?.description}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  render: () => \`
    <div style="width:320px; background:#111; border-radius:8px; overflow:hidden; position:relative; padding:1rem;">
      <span class="badge text-blue-400" style="margin-bottom:.75rem; display:inline-block;">Web Development</span>
      <h3 style="color:#fff; font-size:1.1rem; font-weight:700; margin:0 0 .25rem;">Empire State Building</h3>
      <p style="color:rgba(255,255,255,.6); font-size:.8rem; margin:0;">Rebranding &middot; 2025</p>
    </div>
  \`
}`,...n.parameters?.docs?.source},description:{story:"Badge in context — displayed over a dark card image",...n.parameters?.docs?.description}}};const l=["Default","Blue","Green","Amber","AllVariants","OnCard"];export{t as AllVariants,s as Amber,r as Blue,e as Default,a as Green,n as OnCard,l as __namedExportsOrder,d as default};
