export default {
  title: 'Components/Badge',
  tags: ['autodocs'],
  argTypes: {
    text: {
      control: 'text',
      description: 'Badge text content',
    },
    variant: {
      control: { type: 'select' },
      options: ['default', 'primary', 'secondary', 'success', 'warning', 'error'],
      description: 'Badge style variant',
    },
    size: {
      control: { type: 'select' },
      options: ['small', 'medium', 'large'],
      description: 'Badge size',
    },
  },
};

/**
 * Default badge component with standard styling
 */
export const Default = {
  args: {
    text: 'Default Badge',
    variant: 'default',
    size: 'medium',
  },
  render: (args) => {
    const sizeClass = {
      small: 'text-xs px-2 py-1',
      medium: 'text-sm px-3 py-1',
      large: 'text-base px-4 py-2'
    }[args.size];
    
    const variantClass = {
      default: 'bg-gray-100 text-gray-800',
      primary: 'bg-blue-100 text-blue-800',
      secondary: 'bg-gray-100 text-gray-600',
      success: 'bg-green-100 text-green-800',
      warning: 'bg-yellow-100 text-yellow-800',
      error: 'bg-red-100 text-red-800'
    }[args.variant];

    return `
      <span class="inline-flex items-center rounded-full font-medium ${sizeClass} ${variantClass}">
        ${args.text}
      </span>
    `;
  },
};

/**
 * Primary badge for important information
 */
export const Primary = {
  args: {
    text: 'Primary',
    variant: 'primary',
    size: 'medium',
  },
  render: Default.render,
};

/**
 * Success badge for positive status
 */
export const Success = {
  args: {
    text: 'Success',
    variant: 'success',
    size: 'medium',
  },
  render: Default.render,
};

/**
 * Warning badge for caution states
 */
export const Warning = {
  args: {
    text: 'Warning',
    variant: 'warning',
    size: 'medium',
  },
  render: Default.render,
};

/**
 * Error badge for error states
 */
export const Error = {
  args: {
    text: 'Error',
    variant: 'error',
    size: 'medium',
  },
  render: Default.render,
};

/**
 * Different badge sizes
 */
export const Sizes = {
  render: () => `
    <div class="flex items-center gap-4">
      <span class="inline-flex items-center rounded-full font-medium text-xs px-2 py-1 bg-blue-100 text-blue-800">
        Small Badge
      </span>
      <span class="inline-flex items-center rounded-full font-medium text-sm px-3 py-1 bg-blue-100 text-blue-800">
        Medium Badge
      </span>
      <span class="inline-flex items-center rounded-full font-medium text-base px-4 py-2 bg-blue-100 text-blue-800">
        Large Badge
      </span>
    </div>
  `,
};

/**
 * All badge variants displayed together
 */
export const AllVariants = {
  render: () => `
    <div class="flex flex-wrap gap-2">
      <span class="inline-flex items-center rounded-full font-medium text-sm px-3 py-1 bg-gray-100 text-gray-800">
        Default
      </span>
      <span class="inline-flex items-center rounded-full font-medium text-sm px-3 py-1 bg-blue-100 text-blue-800">
        Primary
      </span>
      <span class="inline-flex items-center rounded-full font-medium text-sm px-3 py-1 bg-gray-100 text-gray-600">
        Secondary
      </span>
      <span class="inline-flex items-center rounded-full font-medium text-sm px-3 py-1 bg-green-100 text-green-800">
        Success
      </span>
      <span class="inline-flex items-center rounded-full font-medium text-sm px-3 py-1 bg-yellow-100 text-yellow-800">
        Warning
      </span>
      <span class="inline-flex items-center rounded-full font-medium text-sm px-3 py-1 bg-red-100 text-red-800">
        Error
      </span>
    </div>
  `,
};