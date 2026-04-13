const l={title:"Layout/Footer",tags:["autodocs"],parameters:{layout:"fullscreen",backgrounds:{default:"dark"},docs:{description:{component:`Footer component stories\r
Reflects .site-footer BEM structure:\r
  .site-footer__cta         — pre-footer CTA strip (always dark)\r
  .site-footer__body        — main footer body\r
  .site-footer__inner       — max-width container (--width-site: 90rem)\r
  .site-footer__cols        — 3-column grid\r
  .site-footer__col         — brand column\r
  .site-footer__avail       — open-to-work availability pill\r
  .site-footer__bottom      — bottom bar / copyright`}}},argTypes:{showCta:{control:"boolean",description:"Show pre-footer CTA strip"},available:{control:"boolean",description:"Show open-to-work availability indicator"},year:{control:"number",description:"Copyright year"}}};function n(){return`
    <a href="https://www.linkedin.com/in/isaiahdavis/" target="_blank" rel="noopener noreferrer"
       aria-label="LinkedIn" class="site-footer__social-link">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
        <rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/>
      </svg>
    </a>
    <a href="https://github.com/isaiahdaviscom" target="_blank" rel="noopener noreferrer"
       aria-label="GitHub" class="site-footer__social-link">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>
      </svg>
    </a>
    <a href="mailto:isaiah@isaiahdavis.com" aria-label="Email me" class="site-footer__social-link">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor"
           stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
        <polyline points="22,6 12,13 2,6"/>
      </svg>
    </a>`}function a(r){const i=r.showCta?`
    <div class="site-footer__cta">
      <div class="site-footer__cta-inner">
        <div>
          <p class="site-footer__cta-eyebrow">Currently available</p>
          <h2 class="site-footer__cta-heading">Open to new work &mdash; let's build something.</h2>
        </div>
        <a href="/contact/" class="site-footer__cta-btn">
          Get in touch
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor"
               stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
          </svg>
        </a>
      </div>
    </div>`:"",s=r.available?`
    <div class="site-footer__avail">
      <span class="site-footer__avail-dot" aria-hidden="true"></span>
      <span>Open to work &mdash; typical response: 1 business day</span>
    </div>`:"";return`
    ${i}
    <footer class="site-footer__body">
      <div class="site-footer__inner">
        <div class="site-footer__cols">
          <div class="site-footer__col">
            <div>
              <a href="/" class="site-footer__brand-name">Isaiah Davis</a>
              <p class="site-footer__brand-tagline">
                Frontend Developer &amp; UI Engineer<br>
                Chicago, IL &middot; Available for freelance &amp; contract work
              </p>
            </div>
            ${s}
            <nav aria-label="Social links" class="site-footer__social-nav">
              ${n()}
            </nav>
          </div>
          <div>
            <h2 class="site-footer__col-heading">Navigate</h2>
            <ul class="site-footer__nav-list">
              <li><a href="/"           class="footer-nav-link">Home</a></li>
              <li><a href="/portfolio/" class="footer-nav-link">Portfolio</a></li>
              <li><a href="/posts/"     class="footer-nav-link">Blog</a></li>
              <li><a href="/about/"     class="footer-nav-link">About</a></li>
              <li><a href="/contact/"   class="footer-nav-link">Contact</a></li>
            </ul>
          </div>
          <div>
            <h2 class="site-footer__col-heading">Built With</h2>
            <ul class="site-footer__nav-list">
              <li><a href="https://gohugo.io/"         target="_blank" rel="noopener noreferrer" class="footer-nav-link">Hugo</a></li>
              <li><a href="https://tailwindcss.com/"   target="_blank" rel="noopener noreferrer" class="footer-nav-link">Tailwind CSS</a></li>
              <li><a href="https://www.netlify.com/"   target="_blank" rel="noopener noreferrer" class="footer-nav-link">Netlify</a></li>
              <li><a href="https://decapcms.org/"      target="_blank" rel="noopener noreferrer" class="footer-nav-link">Decap CMS</a></li>
            </ul>
          </div>
        </div>
        <div class="site-footer__bottom">
          <p class="site-footer__copy">&copy; ${r.year} Isaiah Davis. All rights reserved.</p>
          <p class="site-footer__legal">Built with Hugo &middot; Deployed on Netlify</p>
        </div>
      </div>
    </footer>
  `}const e={args:{showCta:!0,available:!0,year:2026},render:a},o={args:{showCta:!1,available:!0,year:2026},render:a},t={parameters:{backgrounds:{default:"dark"}},render:()=>`
    <div class="site-footer__cta">
      <div class="site-footer__cta-inner">
        <div>
          <p class="site-footer__cta-eyebrow">Currently available</p>
          <h2 class="site-footer__cta-heading">Open to new work &mdash; let's build something.</h2>
        </div>
        <a href="/contact/" class="site-footer__cta-btn">
          Get in touch
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor"
               stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
          </svg>
        </a>
      </div>
    </div>
  `};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
  args: {
    showCta: true,
    available: true,
    year: 2026
  },
  render: renderFooter
}`,...e.parameters?.docs?.source},description:{story:"Full footer — CTA strip + columns + bottom bar",...e.parameters?.docs?.description}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  args: {
    showCta: false,
    available: true,
    year: 2026
  },
  render: renderFooter
}`,...o.parameters?.docs?.source},description:{story:"Footer body without CTA strip",...o.parameters?.docs?.description}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  parameters: {
    backgrounds: {
      default: 'dark'
    }
  },
  render: () => \`
    <div class="site-footer__cta">
      <div class="site-footer__cta-inner">
        <div>
          <p class="site-footer__cta-eyebrow">Currently available</p>
          <h2 class="site-footer__cta-heading">Open to new work &mdash; let's build something.</h2>
        </div>
        <a href="/contact/" class="site-footer__cta-btn">
          Get in touch
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor"
               stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
          </svg>
        </a>
      </div>
    </div>
  \`
}`,...t.parameters?.docs?.source},description:{story:"CTA strip in isolation",...t.parameters?.docs?.description}}};const c=["Default","NoCta","CtaStrip"];export{t as CtaStrip,e as Default,o as NoCta,c as __namedExportsOrder,l as default};
