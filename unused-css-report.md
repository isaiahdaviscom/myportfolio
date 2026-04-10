# Unused CSS Classes Report

Generated: 2026-04-02T01:36:01.207Z

## Summary

- **CSS Files Scanned**: 20
- **Template Files Scanned**: 71
- **Classes Defined in CSS**: 662
- **Classes Used in Templates**: 703
- **Unused Classes**: 182 (27.49%)

## CSS File Analysis

### static\css\styles.css
- **Classes Defined**: 648
- **Sample Classes**: `badge`, `card`, `related-projects__grid`, `related-projects__card`, `related-projects__role`, `related-projects__title`, `related-projects__dates`, `card-img-overlay`, `stories-trigger`, `stories-ring`...

### src\css\components\badge.css
- **Classes Defined**: 1
- **Sample Classes**: `badge`

### src\css\components\card.css
- **Classes Defined**: 7
- **Sample Classes**: `card`, `related-projects__grid`, `related-projects__card`, `related-projects__role`, `related-projects__title`, `related-projects__dates`, `card-img-overlay`

### src\css\components\stories.css
- **Classes Defined**: 58
- **Sample Classes**: `stories-trigger`, `stories-ring`, `stories-ring--available`, `stories-ring--color-gradient`, `stories-ring--color-blue`, `stories-ring--color-green`, `stories-ring--color-purple`, `stories-ring--color-orange`, `stories-ring--color-pink`, `stories-ring--color-teal`...

### src\css\layout\breadcrumb.css
- **Classes Defined**: 6
- **Sample Classes**: `breadcrumb`, `breadcrumb__list`, `breadcrumb__item`, `breadcrumb__link`, `breadcrumb__sep`, `breadcrumb__current`

### src\css\layout\footer.css
- **Classes Defined**: 34
- **Sample Classes**: `site-footer`, `site-footer__cta`, `site-footer__cta-eyebrow`, `site-footer__cta-heading`, `site-footer__cta-btn`, `site-footer__body`, `site-footer__brand-name`, `site-footer__brand-tagline`, `site-footer__availability`, `site-footer__availability-dot`...

### src\css\layout\grid.css
- **Classes Defined**: 64
- **Sample Classes**: `layout-section`, `layout-subgrid`, `gc-full`, `gc-bleed`, `gc-left-half`, `gc-right-half`, `gc-left-third`, `gc-center-third`, `gc-right-third`, `gc-q1`...

### src\css\layout\header.css
- **Classes Defined**: 21
- **Sample Classes**: `site-header`, `site-header--scrolled`, `site-header__inner`, `site-header__left`, `site-header__identity`, `site-header__social`, `site-header__social-link`, `site-header__social-link-label`, `inline-menu`, `active`...

### src\css\layout\page.css
- **Classes Defined**: 25
- **Sample Classes**: `skip-to-content`, `page-hero`, `page-h1`, `page-eyebrow`, `page-section-heading`, `btn-primary`, `btn-secondary`, `content-card`, `page-card`, `page-card--accent`...

### src\css\pages\about.css
- **Classes Defined**: 30
- **Sample Classes**: `about-page`, `about-avatar`, `about-avatar__frame`, `about-avatar__img`, `about-avatar__ring`, `about-hero`, `container`, `about-hero__status`, `about-hero__status-dot`, `about-bio`...

### src\css\pages\blog.css
- **Classes Defined**: 54
- **Sample Classes**: `blog-list`, `blog-list__intro`, `blog-list__grid`, `blog-list__empty`, `blog-card`, `blog-card__cover`, `blog-card__body`, `blog-card__categories`, `blog-card__category`, `blog-card__title`...

### src\css\pages\case-study.css
- **Classes Defined**: 55
- **Sample Classes**: `cs-page`, `cs-container`, `cs-container--prose`, `cs-theme-toggle`, `cs-theme-toggle__icon--moon`, `cs-theme-toggle__icon--sun`, `cs-hero`, `cs-hero__eyebrow`, `cs-hero__title`, `cs-hero__meta`...

### src\css\pages\contact.css
- **Classes Defined**: 36
- **Sample Classes**: `contact-body`, `contact-split`, `contact-form-wrap`, `contact-info`, `contact-info__section-heading`, `contact-info__text`, `contact-info__detail-list`, `contact-info__detail-item`, `contact-info__detail-text`, `contact-info__detail-label`...

### src\css\pages\home.css
- **Classes Defined**: 76
- **Sample Classes**: `home-hero`, `home-hero__inner`, `home-hero__content`, `home-hero__visual`, `home-hero__eyebrow`, `home-hero__name`, `home-hero__tagline`, `home-hero__actions`, `btn-primary`, `btn-secondary`...

### src\css\pages\portfolio.css
- **Classes Defined**: 33
- **Sample Classes**: `pf-grid-section`, `pf-hero-band`, `pf-hero-band__heading`, `pf-hero-band__sub`, `pf-hero-band__count`, `pf-split`, `pf-split__image`, `pf-split__img`, `pf-split__img-fallback`, `pf-split__body`...

### src\css\pages\scroll-story.css
- **Classes Defined**: 48
- **Sample Classes**: `site-header`, `ss-progress`, `ss-nav`, `ss-nav__dot`, `is-active`, `ss-chapter`, `ss-chapter--cover`, `ss-chapter--slate`, `ss-chapter--navy`, `ss-chapter--dark`...

### src\css\tailwind.css
- **Classes Defined**: 0
- **Sample Classes**: 

### src\css\theme\tokens.css
- **Classes Defined**: 3
- **Sample Classes**: `container`, `card`, `pf-card`

### src\css\utilities\motion.css
- **Classes Defined**: 1
- **Sample Classes**: `is-visible`

### src\css\utilities\print.css
- **Classes Defined**: 21
- **Sample Classes**: `print-entry`, `card`, `mx-auto`, `row`, `gallery-item`, `gallery-print-header`, `gallery-print-header__avatar`, `gallery-print-header__name`, `gallery-print-header__title`, `gallery-print-header__meta`...

## Unused Classes by Category

### Custom Classes
- `antialiased`
- `aspect-square`
- `availability-open`
- `backdrop-filter`
- `block`
- `breadcrumb__item`
- `break-inside-avoid`
- `col-12`
- `col-16`
- `col-18`
- `col-20`
- `col-8`
- `col-center-third`
- `col-full`
- `col-left-15`
- `col-left-16`
- `col-left-18`
- `col-left-9`
- `col-left-half`
- `col-left-third`

### Utility Classes
- `border-collapse`
- `flex-grow`
- `flex-shrink`
- `grid`
- `grid-cols-1`
- `grid-cols-3`
- `text-wrap`

### Responsive Classes


### State Classes


## Cleanup Recommendations

### ⚠️  Before Removing Classes

1. **Manual Review Required**: Some classes might be used dynamically via JavaScript
2. **Test Thoroughly**: Remove classes in small batches and test each change
3. **Check Documentation**: Some classes might be documented for future use
4. **Consider Component Libraries**: Some classes might be part of imported libraries

### 🧹 Safe to Remove (High Confidence)

Classes that appear to be truly unused and safe to remove:

- `antialiased`
- `aspect-square`
- `availability-open`
- `backdrop-filter`
- `block`
- `border-collapse`
- `breadcrumb__item`
- `break-inside-avoid`
- `col-12`
- `col-16`
- `col-18`
- `col-20`
- `col-8`
- `col-center-third`
- `col-full`

### 🤔 Review Carefully (Medium Risk)

Classes that might be used dynamically or for specific states:

- `is-active`
- `stories-progress-fill--active`

## Cleanup Process

1. **Backup First**: Commit current state to git before making changes
2. **Remove in Batches**: Remove 10-20 classes at a time
3. **Test Each Batch**: Verify site functionality after each removal
4. **Monitor**: Watch for any visual or functional issues
5. **Rollback if Needed**: Use git to revert problematic changes

## Automation Opportunities

Consider creating a CSS cleanup task that:
- Removes classes with high confidence scores
- Preserves classes matching safelist patterns  
- Generates before/after comparison reports
- Integrates with your build pipeline

See `unused-classes.json` for the complete list and detailed analysis data.
