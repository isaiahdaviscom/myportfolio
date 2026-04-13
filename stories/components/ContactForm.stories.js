/**
 * Contact form stories.
 *
 * Mirrors the BEM classes from:
 *   partials/contact-form.html  — Netlify form with JS validation
 *   src/css/pages/contact.css   — .contact-form / .contact-form__row /
 *                                 .form-group / .form-label / .form-input /
 *                                 .form-select / .form-textarea /
 *                                 .form-hint / .form-submit / .form-feedback
 */
export default {
  title: 'Components/ContactForm',
  tags: ['autodocs'],
  argTypes: {
    includePhone: {
      control: 'boolean',
      description: 'Add optional phone field'
    },
    includeSubject: {
      control: 'boolean',
      description: 'Add subject <select> field'
    },
    includeMessage: {
      control: 'boolean',
      description: 'Add message <textarea>'
    },
    submitText: {
      control: 'text',
      description: 'Submit button label'
    },
    showSuccess: {
      control: 'boolean',
      description: 'Preview the success feedback banner'
    },
    showError: {
      control: 'boolean',
      description: 'Preview the error feedback banner'
    }
  }
};

/* ─── Shared render helper ─────────────────────────────────── */

const SEND_ICON = `<svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"/>
  </svg>`;

const renderForm = ({
  includePhone,
  includeSubject,
  includeMessage,
  submitText,
  showSuccess,
  showError
}) => {
  const phoneField = includePhone
    ? `
    <div class="form-group">
      <label for="phone" class="form-label">Phone</label>
      <input type="tel" id="phone" name="phone" class="form-input" placeholder="(555) 123-4567" />
    </div>`
    : '';

  const subjectField = includeSubject
    ? `
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
    </div>`
    : '';

  const messageField = includeMessage
    ? `
    <div class="form-group">
      <label for="message" class="form-label">Message <span aria-hidden="true">*</span></label>
      <textarea id="message" name="message" rows="6" required class="form-textarea"
        placeholder="Tell me about your project or how I can help you..."></textarea>
      <p class="form-hint">Minimum 10 characters</p>
    </div>`
    : '';

  const successBanner = showSuccess
    ? `
    <div class="form-feedback form-feedback--success">
      <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
      </svg>
      Message sent successfully! I'll get back to you soon.
    </div>`
    : '';

  const errorBanner = showError
    ? `
    <div class="form-feedback form-feedback--error">
      <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
      </svg>
      Something went wrong. Please try again or email me directly.
    </div>`
    : '';

  return `
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
      ${phoneField}
      ${subjectField}
      ${messageField}
      <div class="form-group">
        <button type="submit" class="form-submit">
          ${SEND_ICON}
          ${submitText}
        </button>
      </div>
      ${successBanner}
      ${errorBanner}
    </form>
  `;
};

/* ─── Stories ──────────────────────────────────────────────── */

/**
 * Default — full form with subject select and message textarea (matches contact page default).
 */
export const Default = {
  args: {
    includePhone: false,
    includeSubject: true,
    includeMessage: true,
    submitText: 'Send Message',
    showSuccess: false,
    showError: false
  },
  render: renderForm
};

/**
 * Simple — name + email + message only, no subject select.
 */
export const Simple = {
  args: {
    ...Default.args,
    includeSubject: false
  },
  render: renderForm
};

/**
 * All fields — includes optional phone number field.
 */
export const AllFields = {
  args: {
    ...Default.args,
    includePhone: true
  },
  render: renderForm
};

/**
 * Success feedback — shows the success banner after submission.
 */
export const SuccessFeedback = {
  args: {
    ...Default.args,
    showSuccess: true
  },
  render: renderForm
};

/**
 * Error feedback — shows the error banner after a failed submission.
 */
export const ErrorFeedback = {
  args: {
    ...Default.args,
    showError: true
  },
  render: renderForm
};
