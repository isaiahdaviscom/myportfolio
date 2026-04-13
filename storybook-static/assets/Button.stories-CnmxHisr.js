const v={title:"Components/Button",tags:["autodocs"],argTypes:{label:{control:"text",description:"Button label text"},variant:{control:{type:"select"},options:["primary","secondary"],description:".btn-primary (filled accent) or .btn-secondary (ghost/outline)"},disabled:{control:"boolean",description:"Disabled state — adds aria-disabled and pointer-events: none"},asAnchor:{control:"boolean",description:"Render as an <a> tag instead of <button> (used for navigation CTAs)"},withIcon:{control:"boolean",description:"Append an arrow SVG icon (matches hero CTA usage)"}},parameters:{docs:{description:{component:`Button stories.\r

Mirrors the BEM classes defined in src/css/layout/page.css:\r
  .btn-primary   — filled accent, used for primary CTA actions\r
  .btn-secondary — ghost/outline, used for secondary actions\r

Both classes handle hover, active, focus-visible, and transition states.\r
The classes are scoped inside a @media (prefers-color-scheme) block, so\r
they will respond to the Storybook dark/light background toggle.`}}}},l=`
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true" focusable="false">
    <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>`,i=({label:p,variant:u,disabled:b,asAnchor:c,withIcon:m})=>{const y=u==="secondary"?"btn-secondary":"btn-primary",f=m?l:"",g=b?' disabled aria-disabled="true"':"",d=c?"a":"button";return`<${d} class="${y}"${c?' href="#"':""}${g}>${p}${f}</${d}>`},e={args:{label:"View my work",variant:"primary",disabled:!1,asAnchor:!1,withIcon:!1},render:i},r={args:{label:"Learn more",variant:"secondary",disabled:!1,asAnchor:!1,withIcon:!1},render:i},a={args:{label:"Start a project",variant:"primary",disabled:!1,asAnchor:!0,withIcon:!0},render:i},t={args:{label:"See case study",variant:"secondary",disabled:!1,asAnchor:!0,withIcon:!0},render:i},n={args:{label:"Unavailable",variant:"primary",disabled:!0,asAnchor:!1,withIcon:!1},render:i},s={render:()=>`
    <div style="display:flex;gap:0.75rem;flex-wrap:wrap;align-items:center;">
      <a href="#" class="btn-primary">
        Start a project
        ${l}
      </a>
      <a href="#" class="btn-secondary">See all work</a>
    </div>
  `},o={render:()=>`
    <div style="display:grid;gap:1.5rem;">
      <div>
        <p style="font-size:0.75rem;font-weight:600;letter-spacing:0.05em;text-transform:uppercase;margin-bottom:0.5rem;opacity:0.5;">btn-primary</p>
        <div style="display:flex;gap:0.75rem;flex-wrap:wrap;align-items:center;">
          <button class="btn-primary">Default</button>
          <button class="btn-primary" style="background:var(--color-accent-hover);transform:translateY(-1px);">Hovered</button>
          <button class="btn-primary" disabled aria-disabled="true">Disabled</button>
        </div>
      </div>
      <div>
        <p style="font-size:0.75rem;font-weight:600;letter-spacing:0.05em;text-transform:uppercase;margin-bottom:0.5rem;opacity:0.5;">btn-secondary</p>
        <div style="display:flex;gap:0.75rem;flex-wrap:wrap;align-items:center;">
          <button class="btn-secondary">Default</button>
          <button class="btn-secondary" style="background:var(--color-surface-subtle);transform:translateY(-1px);">Hovered</button>
          <button class="btn-secondary" disabled aria-disabled="true">Disabled</button>
        </div>
      </div>
    </div>
  `};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'View my work',
    variant: 'primary',
    disabled: false,
    asAnchor: false,
    withIcon: false
  },
  render: renderButton
}`,...e.parameters?.docs?.source},description:{story:"Primary CTA button — filled accent colour, used for the most important action on a page.",...e.parameters?.docs?.description}}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'Learn more',
    variant: 'secondary',
    disabled: false,
    asAnchor: false,
    withIcon: false
  },
  render: renderButton
}`,...r.parameters?.docs?.source},description:{story:"Secondary CTA button — ghost/outline style, paired with Primary.",...r.parameters?.docs?.description}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'Start a project',
    variant: 'primary',
    disabled: false,
    asAnchor: true,
    withIcon: true
  },
  render: renderButton
}`,...a.parameters?.docs?.source},description:{story:"Primary button rendered as an anchor tag — common for page-level navigation CTAs.",...a.parameters?.docs?.description}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'See case study',
    variant: 'secondary',
    disabled: false,
    asAnchor: true,
    withIcon: true
  },
  render: renderButton
}`,...t.parameters?.docs?.source},description:{story:'Secondary anchor with arrow (e.g. "See all work →").',...t.parameters?.docs?.description}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'Unavailable',
    variant: 'primary',
    disabled: true,
    asAnchor: false,
    withIcon: false
  },
  render: renderButton
}`,...n.parameters?.docs?.source},description:{story:"Disabled state — pointer-events none, reduced opacity via browser default on `disabled`.",...n.parameters?.docs?.description}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  render: () => \`
    <div style="display:flex;gap:0.75rem;flex-wrap:wrap;align-items:center;">
      <a href="#" class="btn-primary">
        Start a project
        \${ARROW_ICON}
      </a>
      <a href="#" class="btn-secondary">See all work</a>
    </div>
  \`
}`,...s.parameters?.docs?.source},description:{story:"Side-by-side pair — the typical hero CTA layout: Primary + Secondary.",...s.parameters?.docs?.description}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  render: () => \`
    <div style="display:grid;gap:1.5rem;">
      <div>
        <p style="font-size:0.75rem;font-weight:600;letter-spacing:0.05em;text-transform:uppercase;margin-bottom:0.5rem;opacity:0.5;">btn-primary</p>
        <div style="display:flex;gap:0.75rem;flex-wrap:wrap;align-items:center;">
          <button class="btn-primary">Default</button>
          <button class="btn-primary" style="background:var(--color-accent-hover);transform:translateY(-1px);">Hovered</button>
          <button class="btn-primary" disabled aria-disabled="true">Disabled</button>
        </div>
      </div>
      <div>
        <p style="font-size:0.75rem;font-weight:600;letter-spacing:0.05em;text-transform:uppercase;margin-bottom:0.5rem;opacity:0.5;">btn-secondary</p>
        <div style="display:flex;gap:0.75rem;flex-wrap:wrap;align-items:center;">
          <button class="btn-secondary">Default</button>
          <button class="btn-secondary" style="background:var(--color-surface-subtle);transform:translateY(-1px);">Hovered</button>
          <button class="btn-secondary" disabled aria-disabled="true">Disabled</button>
        </div>
      </div>
    </div>
  \`
}`,...o.parameters?.docs?.source},description:{story:"Both variants in all interactive states for visual regression testing.",...o.parameters?.docs?.description}}};const w=["Primary","Secondary","PrimaryAnchor","SecondaryAnchor","Disabled","HeroPair","AllStates"];export{o as AllStates,n as Disabled,s as HeroPair,e as Primary,a as PrimaryAnchor,r as Secondary,t as SecondaryAnchor,w as __namedExportsOrder,v as default};
