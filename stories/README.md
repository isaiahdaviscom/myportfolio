# Storybook Component Library

This Storybook setup provides an isolated development environment for testing and documenting UI components for the Hugo portfolio project.

## 🚀 Getting Started

### Running Storybook

```bash
# Start Storybook development server
npm run storybook
# or
portfolio storybook

# Build static Storybook for deployment
npm run storybook:build
# or
portfolio storybook build

# Serve built Storybook
npm run storybook:serve
# or
portfolio storybook serve
```

### Design Workflow

```bash
# Run Storybook + CSS watch together
npm run workflow:design
# or
portfolio workflow:design
```

## 📚 Component Stories

### Components (`/stories/components/`)
- **Badge** - Status and category badges
- **Button** - Various button styles and states
- **Card** - Content cards with multiple variants
- **ContactForm** - Contact form with different styles
- **Gallery** - Portfolio gallery layouts

### Layouts (`/stories/layouts/`)
- **Header** - Site navigation and branding
- **Footer** - Site footer with multiple variants

### Pages (`/stories/pages/`)
- **Portfolio** - Complete portfolio page layouts

## 🎨 Component Development

### Creating New Stories

1. Create a new `.stories.js` file in the appropriate directory:
   - `/stories/components/` for individual components
   - `/stories/layouts/` for layout components
   - `/stories/pages/` for full page templates

2. Follow the naming convention: `ComponentName.stories.js`

3. Use this basic template:

```javascript
export default {
  title: 'Components/MyComponent',
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['default', 'primary'],
      description: 'Component variant',
    },
  },
};

export const Default = {
  args: {
    variant: 'default',
  },
  render: (args) => {
    return `<div class="my-component">Component HTML</div>`;
  },
};
```

### Tailwind CSS Integration

- All Tailwind CSS classes are available in stories
- CSS is loaded from `/static/css/styles.css`
- Component styles use the modular CSS architecture

### Testing Responsive Design

Use the viewport addon to test components across different screen sizes:
- Mobile: 375px
- Tablet: 768px  
- Desktop: 1200px
- Desktop Large: 1440px

## 🔧 Configuration

### Main Configuration (`.storybook/main.js`)
- Uses `@storybook/html-vite` framework
- Includes essential addons for development
- Serves static files from `/static`

### Preview Configuration (`.storybook/preview.js`)
- Loads Tailwind CSS styles
- Configures responsive viewports
- Sets up themes and backgrounds

## 🌟 Features

### Accessibility Testing
- Built-in a11y addon for accessibility checks
- Screen reader testing capabilities
- Color contrast validation

### Interactive Controls
- Live component property editing
- Real-time preview updates
- Documentation generation

### Responsive Testing
- Multiple viewport sizes
- Device simulation
- Responsive behavior validation

## 🔄 Integration with Hugo

While Storybook provides isolated component development, components can be integrated with Hugo:

1. **Develop components** in Storybook with proper styling
2. **Extract HTML patterns** from working stories
3. **Convert to Hugo partials** in `/themes/myPortfolio/layouts/partials/`
4. **Use in Hugo templates** with appropriate data binding

## 📖 Documentation

- Each component story includes comprehensive documentation
- Interactive examples with editable properties
- Usage guidelines and best practices
- Accessibility considerations

---

**Local Development**: http://localhost:6006  
**Build Output**: `/storybook-static`  
**CLI Commands**: Run `portfolio help` for full command list