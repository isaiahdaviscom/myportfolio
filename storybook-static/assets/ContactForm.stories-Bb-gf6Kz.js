const v={title:"Components/ContactForm",tags:["autodocs"],argTypes:{includePhone:{control:"boolean",description:"Add optional phone field"},includeSubject:{control:"boolean",description:"Add subject <select> field"},includeMessage:{control:"boolean",description:"Add message <textarea>"},submitText:{control:"text",description:"Submit button label"},showSuccess:{control:"boolean",description:"Preview the success feedback banner"},showError:{control:"boolean",description:"Preview the error feedback banner"}},parameters:{docs:{description:{component:`Contact form stories.\r

Mirrors the BEM classes from:\r
  partials/contact-form.html  — Netlify form with JS validation\r
  src/css/pages/contact.css   — .contact-form / .contact-form__row /\r
                                .form-group / .form-label / .form-input /\r
                                .form-select / .form-textarea /\r
                                .form-hint / .form-submit / .form-feedback`}}}},m=`<svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"/>
  </svg>`,t=({includePhone:n,includeSubject:c,includeMessage:i,submitText:l,showSuccess:d,showError:u})=>`
    <form class="contact-form" name="contact" action="/contact/success/" method="POST">
      <div class="contact-form__row">
        <div class="form-group">
          <label for="name" class="form-label">Name <span aria-hidden="true">*</span></label>
          <input type="text" id="name" name="name" required
                 class="form-input" placeholder="Your full name" />
        </div>
        <div class="form-group">
          <label for="email" class="form-label">Email <span aria-hidden="true">*</span></label>
          <input type="email" id="email" name="email" required
                 class="form-input" placeholder="your.email@example.com" />
        </div>
      </div>
      ${n?`
    <div class="form-group">
      <label for="phone" class="form-label">Phone</label>
      <input type="tel" id="phone" name="phone" class="form-input" placeholder="(555) 123-4567" />
    </div>`:""}
      ${c?`
    <div class="form-group">
      <label for="subject" class="form-label">Subject <span aria-hidden="true">*</span></label>
      <select id="subject" name="subject" required class="form-select">
        <option value="">Select a subject</option>
        <option value="project-inquiry">Project Inquiry</option>
        <option value="collaboration">Collaboration</option>
        <option value="job-opportunity">Job Opportunity</option>
        <option value="general">General Question</option>
        <option value="other">Other</option>
      </select>
    </div>`:""}
      ${i?`
    <div class="form-group">
      <label for="message" class="form-label">Message <span aria-hidden="true">*</span></label>
      <textarea id="message" name="message" rows="6" required class="form-textarea"
        placeholder="Tell me about your project or how I can help you..."></textarea>
      <p class="form-hint">Minimum 10 characters</p>
    </div>`:""}
      <div class="form-group">
        <button type="submit" class="form-submit">
          ${m}
          ${l}
        </button>
      </div>
      ${d?`
    <div class="form-feedback form-feedback--success">
      <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
      </svg>
      Message sent successfully! I'll get back to you soon.
    </div>`:""}
      ${u?`
    <div class="form-feedback form-feedback--error">
      <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
      </svg>
      Something went wrong. Please try again or email me directly.
    </div>`:""}
    </form>
  `,e={args:{includePhone:!1,includeSubject:!0,includeMessage:!0,submitText:"Send Message",showSuccess:!1,showError:!1},render:t},r={args:{...e.args,includeSubject:!1},render:t},o={args:{...e.args,includePhone:!0},render:t},s={args:{...e.args,showSuccess:!0},render:t},a={args:{...e.args,showError:!0},render:t};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
  args: {
    includePhone: false,
    includeSubject: true,
    includeMessage: true,
    submitText: 'Send Message',
    showSuccess: false,
    showError: false
  },
  render: renderForm
}`,...e.parameters?.docs?.source},description:{story:"Default — full form with subject select and message textarea (matches contact page default).",...e.parameters?.docs?.description}}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  args: {
    ...Default.args,
    includeSubject: false
  },
  render: renderForm
}`,...r.parameters?.docs?.source},description:{story:"Simple — name + email + message only, no subject select.",...r.parameters?.docs?.description}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  args: {
    ...Default.args,
    includePhone: true
  },
  render: renderForm
}`,...o.parameters?.docs?.source},description:{story:"All fields — includes optional phone number field.",...o.parameters?.docs?.description}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  args: {
    ...Default.args,
    showSuccess: true
  },
  render: renderForm
}`,...s.parameters?.docs?.source},description:{story:"Success feedback — shows the success banner after submission.",...s.parameters?.docs?.description}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  args: {
    ...Default.args,
    showError: true
  },
  render: renderForm
}`,...a.parameters?.docs?.source},description:{story:"Error feedback — shows the error banner after a failed submission.",...a.parameters?.docs?.description}}};const w=["Default","Simple","AllFields","SuccessFeedback","ErrorFeedback"];export{o as AllFields,e as Default,a as ErrorFeedback,r as Simple,s as SuccessFeedback,w as __namedExportsOrder,v as default};
