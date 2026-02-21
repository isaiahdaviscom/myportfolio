export default {
  title: 'Components/ContactForm',
  tags: ['autodocs'],
  argTypes: {
    style: {
      control: { type: 'select' },
      options: ['modern', 'minimal', 'card'],
      description: 'Form style variant',
    },
    includePhone: {
      control: 'boolean',
      description: 'Include phone number field',
    },
    includeSubject: {
      control: 'boolean',
      description: 'Include subject field',
    },
    includeMessage: {
      control: 'boolean',
      description: 'Include message field',
    },
    submitText: {
      control: 'text',
      description: 'Submit button text',
    },
  },
};

/**
 * Default modern contact form
 */
export const Default = {
  args: {
    style: 'modern',
    includePhone: false,
    includeSubject: true,
    includeMessage: true,
    submitText: 'Send Message',
  },
  render: (args) => {
    const containerClass = {
      modern: 'bg-white p-8 rounded-lg shadow-lg border border-gray-200',
      minimal: 'bg-transparent p-6',
      card: 'bg-gray-50 p-8 rounded-xl shadow-md'
    }[args.style];
    
    const phoneField = args.includePhone ? `
      <div>
        <label for="phone" class="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
        <input type="tel" id="phone" name="phone" 
               class="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors" 
               placeholder="+1 (555) 123-4567" />
      </div>
    ` : '';
    
    const subjectField = args.includeSubject ? `
      <div>
        <label for="subject" class="block text-sm font-medium text-gray-700 mb-2">Subject</label>
        <input type="text" id="subject" name="subject" required
               class="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors" 
               placeholder="What's this about?" />
      </div>
    ` : '';
    
    const messageField = args.includeMessage ? `
      <div>
        <label for="message" class="block text-sm font-medium text-gray-700 mb-2">Message</label>
        <textarea id="message" name="message" rows="5" required
                  class="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-vertical" 
                  placeholder="Tell me about your project..."></textarea>
      </div>
    ` : '';

    return `
      <div class="max-w-2xl mx-auto">
        <div class="${containerClass}">
          <div class="mb-8 text-center">
            <h2 class="text-2xl font-bold text-gray-900 mb-2">Get In Touch</h2>
            <p class="text-gray-600">I'd love to hear about your project. Send me a message and I'll get back to you soon.</p>
          </div>
          
          <form class="space-y-6" action="/contact" method="POST">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label for="name" class="block text-sm font-medium text-gray-700 mb-2">Name</label>
                <input type="text" id="name" name="name" required
                       class="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors" 
                       placeholder="Your full name" />
              </div>
              
              <div>
                <label for="email" class="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <input type="email" id="email" name="email" required
                       class="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors" 
                       placeholder="your@email.com" />
              </div>
            </div>
            
            ${phoneField}
            ${subjectField}
            ${messageField}
            
            <div class="text-center">
              <button type="submit" 
                      class="bg-blue-500 text-white px-8 py-3 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors font-medium">
                ${args.submitText}
              </button>
            </div>
          </form>
        </div>
      </div>
    `;
  },
};

/**
 * Minimal form style
 */
export const Minimal = {
  args: {
    ...Default.args,
    style: 'minimal',
  },
  render: Default.render,
};

/**
 * Card form style
 */
export const Card = {
  args: {
    ...Default.args,
    style: 'card',
  },
  render: Default.render,
};

/**
 * Form with all fields
 */
export const AllFields = {
  args: {
    ...Default.args,
    includePhone: true,
    includeSubject: true,
    includeMessage: true,
  },
  render: Default.render,
};

/**
 * Simple contact form
 */
export const Simple = {
  args: {
    ...Default.args,
    includePhone: false,
    includeSubject: false,
    includeMessage: true,
    style: 'minimal',
  },
  render: Default.render,
};