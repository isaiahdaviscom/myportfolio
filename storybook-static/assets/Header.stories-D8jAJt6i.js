const h={title:"Layout/Header",tags:["autodocs"],parameters:{layout:"fullscreen",docs:{description:{component:`Header component stories\r
Reflects .site-header BEM structure with glassmorphism sticky bar,\r
Instagram-Stories availability ring, inline-menu nav pills, and social links.\r

Availability states set at runtime by JS — here shown as static props:\r
  available: true  → .stories-ring--available  gradient ring + .stories-dot--open\r
  available: false → .stories-ring--away        grey ring  + .stories-dot--closed`}}},argTypes:{available:{control:"boolean",description:"Availability state — gradient ring + green dot (Mon–Fri 9 AM–6 PM CT)"},activePage:{control:{type:"select"},options:["home","portfolio","about","contact"],description:"Active page — sets aria-current + .active class on nav link"}}},g=[{href:"/",label:"Home",id:"home"},{href:"/portfolio/",label:"Portfolio",id:"portfolio"},{href:"/about/",label:"About",id:"about"},{href:"/contact/",label:"Contact",id:"contact"}];function s(o){const l=o.available?"stories-ring--available":"stories-ring--away",c=o.available?"stories-dot--open":"stories-dot--closed",d=g.map(({href:p,label:v,id:u})=>{const n=u===o.activePage;return`<li><a href="${p}" class="${n?"active":""}" ${n?'aria-current="page"':""}>${v}</a></li>`}).join("");return`
    <header class="site-header">
      <div class="site-header__inner">
        <div class="site-header__left">
          <button class="stories-trigger"
                  aria-label="View my availability — opens a stories panel"
                  aria-haspopup="dialog"
                  aria-expanded="false"
                  type="button">
            <span class="stories-ring ${l}" aria-hidden="true">
              <span class="stories-ring-inner">
                <img src="/images/profile-branded.png" alt="Isaiah Davis"
                     class="stories-avatar" width="40" height="40" />
              </span>
            </span>
            <span class="stories-dot ${c}" title="Availability status"></span>
          </button>
          <nav class="inline-menu" aria-label="Primary navigation">
            <ul>${d}</ul>
          </nav>
        </div>
        <nav aria-label="Social links" class="site-header__social">
          <a href="https://www.linkedin.com/in/isaiahdavis/" target="_blank" rel="noopener noreferrer"
             aria-label="LinkedIn profile"
             class="site-header__social-link site-header__social-link--linkedin">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
              <rect x="2" y="9" width="4" height="12"/>
              <circle cx="4" cy="4" r="2"/>
            </svg>
          </a>
          <a href="https://github.com/isaiahdaviscom" target="_blank" rel="noopener noreferrer"
             aria-label="GitHub profile"
             class="site-header__social-link site-header__social-link--github">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>
            </svg>
          </a>
          <a href="/contact/" aria-label="Contact me"
             class="site-header__social-link site-header__social-link--contact">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
                 stroke="currentColor" stroke-width="2"
                 stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
              <polyline points="22,6 12,13 2,6"/>
            </svg>
          </a>
        </nav>
      </div>
    </header>
  `}const e={args:{available:!0,activePage:"home"},render:s},a={args:{available:!1,activePage:"home"},render:s},r={args:{available:!0,activePage:"portfolio"},render:s},t={args:{available:!0,activePage:"about"},render:s},i={args:{available:!0,activePage:"contact"},render:s};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
  args: {
    available: true,
    activePage: 'home'
  },
  render: renderHeader
}`,...e.parameters?.docs?.source},description:{story:"Available — business hours, gradient ring, green dot",...e.parameters?.docs?.description}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  args: {
    available: false,
    activePage: 'home'
  },
  render: renderHeader
}`,...a.parameters?.docs?.source},description:{story:"Away — off-hours, grey ring, grey dot",...a.parameters?.docs?.description}}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  args: {
    available: true,
    activePage: 'portfolio'
  },
  render: renderHeader
}`,...r.parameters?.docs?.source},description:{story:"Portfolio page — nav pill active",...r.parameters?.docs?.description}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  args: {
    available: true,
    activePage: 'about'
  },
  render: renderHeader
}`,...t.parameters?.docs?.source},description:{story:"About page — nav pill active",...t.parameters?.docs?.description}}};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
  args: {
    available: true,
    activePage: 'contact'
  },
  render: renderHeader
}`,...i.parameters?.docs?.source},description:{story:"Contact page — nav pill active",...i.parameters?.docs?.description}}};const b=["Available","Away","PortfolioActive","AboutActive","ContactActive"];export{t as AboutActive,e as Available,a as Away,i as ContactActive,r as PortfolioActive,b as __namedExportsOrder,h as default};
