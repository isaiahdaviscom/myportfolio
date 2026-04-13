/**
 * Breadcrumb component stories
 * Reflects .breadcrumb BEM from src/css/layout/breadcrumb.css.
 *
 * Markup:
 *   <nav class="breadcrumb" aria-label="Breadcrumb">
 *     <ol class="breadcrumb__list">
 *       <li class="breadcrumb__item">
 *         <a class="breadcrumb__link" href="/">Home</a>
 *         <span class="breadcrumb__sep" aria-hidden="true">/</span>
 *       </li>
 *       <li class="breadcrumb__item">
 *         <span class="breadcrumb__current" aria-current="page">Current</span>
 *       </li>
 *     </ol>
 *   </nav>
 */
export default {
  title: 'Components/Breadcrumb',
  tags: ['autodocs'],
  argTypes: {
    crumbs: {
      control: 'object',
      description: 'Array of { label, href } — last item is rendered as current page (no link)'
    }
  }
};

function renderBreadcrumb({ crumbs }) {
  const items = crumbs.map((c, i) => {
    const isLast = i === crumbs.length - 1;
    if (isLast) {
      return `<li class="breadcrumb__item">
        <span class="breadcrumb__current" aria-current="page">${c.label}</span>
      </li>`;
    }
    return `<li class="breadcrumb__item">
      <a class="breadcrumb__link" href="${c.href}">${c.label}</a>
      <span class="breadcrumb__sep" aria-hidden="true">/</span>
    </li>`;
  }).join('\n      ');

  return `
    <nav class="breadcrumb" aria-label="Breadcrumb">
      <ol class="breadcrumb__list">
        ${items}
      </ol>
    </nav>
  `;
}

/** Two-level — Home → Current page */
export const TwoLevel = {
  args: {
    crumbs: [
      { label: 'Home', href: '/' },
      { label: 'Portfolio' }
    ]
  },
  render: renderBreadcrumb
};

/** Three-level — Home → Section → Current */
export const ThreeLevel = {
  args: {
    crumbs: [
      { label: 'Home', href: '/' },
      { label: 'Portfolio', href: '/portfolio/' },
      { label: 'Empire Creative Co.' }
    ]
  },
  render: renderBreadcrumb
};

/** Blog post path */
export const BlogPost = {
  args: {
    crumbs: [
      { label: 'Home', href: '/' },
      { label: 'Writing', href: '/posts/' },
      { label: 'Building a Design System from Scratch' }
    ]
  },
  render: renderBreadcrumb
};
