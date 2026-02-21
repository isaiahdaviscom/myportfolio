export default {
  title: 'Components/Button',
  tags: ['autodocs'],
  argTypes: {
    text: {
      control: 'text',
      description: 'Button text content',
    },
    variant: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'success', 'warning', 'danger', 'ghost', 'link'],
      description: 'Button style variant',
    },
    size: {
      control: { type: 'select' },
      options: ['small', 'medium', 'large'],
      description: 'Button size',
    },
    disabled: {
      control: 'boolean',
      description: 'Disabled state',
    },
    fullWidth: {
      control: 'boolean',
      description: 'Full width button',
    },
    loading: {
      control: 'boolean',
      description: 'Loading state with spinner',
    },
  },
};

/**
 * Default primary button
 */
export const Default = {
  args: {
    text: 'Button',
    variant: 'primary',
    size: 'medium',
    disabled: false,
    fullWidth: false,
    loading: false,
  },
  render: (args) => {
    const sizeClass = {
      small: 'px-3 py-1.5 text-sm',
      medium: 'px-4 py-2 text-sm',
      large: 'px-6 py-3 text-base'
    }[args.size];
    
    const variantClass = {
      primary: 'bg-blue-500 text-white hover:bg-blue-600 focus:ring-blue-500',
      secondary: 'bg-gray-500 text-white hover:bg-gray-600 focus:ring-gray-500',
      success: 'bg-green-500 text-white hover:bg-green-600 focus:ring-green-500',
      warning: 'bg-yellow-500 text-white hover:bg-yellow-600 focus:ring-yellow-500',
      danger: 'bg-red-500 text-white hover:bg-red-600 focus:ring-red-500',
      ghost: 'border border-gray-300 text-gray-700 hover:bg-gray-50 focus:ring-gray-500',
      link: 'text-blue-500 hover:text-blue-600 hover:underline'
    }[args.variant];

    const widthClass = args.fullWidth ? 'w-full' : '';
    const disabledClass = args.disabled ? 'opacity-50 cursor-not-allowed' : 'transition-colors';
    const roundedClass = args.variant === 'link' ? '' : 'rounded-md';
    const focusClass = args.variant === 'link' ? 'focus:outline-none focus:underline' : 'focus:outline-none focus:ring-2 focus:ring-offset-2';

    const loadingSpinner = args.loading ? `
      <svg class="animate-spin -ml-1 mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>
    ` : '';

    return `
      <button 
        class="${sizeClass} ${variantClass} ${widthClass} ${disabledClass} ${roundedClass} ${focusClass} font-medium inline-flex items-center justify-center"
        ${args.disabled || args.loading ? 'disabled' : ''}
      >
        ${loadingSpinner}
        ${args.text}
      </button>
    `;
  },
};

/**
 * Secondary button variant
 */
export const Secondary = {
  args: {
    ...Default.args,
    text: 'Secondary',
    variant: 'secondary',
  },
  render: Default.render,
};

/**
 * Success button variant
 */
export const Success = {
  args: {
    ...Default.args,
    text: 'Success',
    variant: 'success',
  },
  render: Default.render,
};

/**
 * Warning button variant
 */
export const Warning = {
  args: {
    ...Default.args,
    text: 'Warning',
    variant: 'warning',
  },
  render: Default.render,
};

/**
 * Danger button variant
 */
export const Danger = {
  args: {
    ...Default.args,
    text: 'Danger',
    variant: 'danger',
  },
  render: Default.render,
};

/**
 * Ghost button variant
 */
export const Ghost = {
  args: {
    ...Default.args,
    text: 'Ghost',
    variant: 'ghost',
  },
  render: Default.render,
};

/**
 * Link button variant
 */
export const Link = {
  args: {
    ...Default.args,
    text: 'Link Button',
    variant: 'link',
  },
  render: Default.render,
};

/**
 * Disabled button state
 */
export const Disabled = {
  args: {
    ...Default.args,
    text: 'Disabled',
    disabled: true,
  },
  render: Default.render,
};

/**
 * Loading button state
 */
export const Loading = {
  args: {
    ...Default.args,
    text: 'Loading...',
    loading: true,
  },
  render: Default.render,
};

/**
 * Different button sizes
 */
export const Sizes = {
  render: () => `
    <div class="flex items-center gap-4">
      <button class="px-3 py-1.5 text-sm bg-blue-500 text-white hover:bg-blue-600 transition-colors rounded-md font-medium">
        Small
      </button>
      <button class="px-4 py-2 text-sm bg-blue-500 text-white hover:bg-blue-600 transition-colors rounded-md font-medium">
        Medium
      </button>
      <button class="px-6 py-3 text-base bg-blue-500 text-white hover:bg-blue-600 transition-colors rounded-md font-medium">
        Large
      </button>
    </div>
  `,
};

/**
 * Full width button
 */
export const FullWidth = {
  args: {
    ...Default.args,
    text: 'Full Width Button',
    fullWidth: true,
  },
  render: Default.render,
};

/**
 * All button variants
 */
export const AllVariants = {
  render: () => `
    <div class="flex flex-wrap gap-3">
      <button class="px-4 py-2 text-sm bg-blue-500 text-white hover:bg-blue-600 transition-colors rounded-md font-medium">
        Primary
      </button>
      <button class="px-4 py-2 text-sm bg-gray-500 text-white hover:bg-gray-600 transition-colors rounded-md font-medium">
        Secondary
      </button>
      <button class="px-4 py-2 text-sm bg-green-500 text-white hover:bg-green-600 transition-colors rounded-md font-medium">
        Success
      </button>
      <button class="px-4 py-2 text-sm bg-yellow-500 text-white hover:bg-yellow-600 transition-colors rounded-md font-medium">
        Warning
      </button>
      <button class="px-4 py-2 text-sm bg-red-500 text-white hover:bg-red-600 transition-colors rounded-md font-medium">
        Danger
      </button>
      <button class="px-4 py-2 text-sm border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors rounded-md font-medium">
        Ghost
      </button>
      <button class="text-blue-500 hover:text-blue-600 hover:underline font-medium">
        Link
      </button>
    </div>
  `,
};