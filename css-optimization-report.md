# CSS Optimization Report

Generated: 2026-06-09T00:50:37.385Z

## Summary

- **Files Scanned**: 84
- **Unique Classes Found**: 1018
- **Original CSS Size**: 248.72 KB
- **Production CSS Size**: 176.9 KB
- **Size Reduction**: 71.82 KB (28.88%)

## Analysis Details

### Files by Type
- **Templates**: 50
- **Content**: 27
- **Static**: 4
- **Other**: 3

### Most Common Class Patterns

- **Tailwind Utilities**: 34
- **Responsive Classes**: 4
- **Hover States**: 7
- **Focus States**: 4
- **Custom Classes**: 965

## Production Integration

### Hugo Templates
Update your Hugo templates to use the optimized CSS in production:

```html
{{ if eq hugo.Environment "production" }}
  <link rel="stylesheet" href="{{ "css/styles.min.css" | relURL }}">
{{ else }}
  <link rel="stylesheet" href="{{ "css/styles.css" | relURL }}">
{{ end }}
```

### Build Commands
- **Development**: `npm run build:css`
- **Production**: `npm run css:optimize`

## Recommendations

1. **Use production CSS**: Switch to `styles.min.css` for production builds
2. **Monitor class usage**: Re-run analysis when adding new templates
3. **CI/CD Integration**: Add optimization to your build pipeline
4. **Regular audits**: Run monthly to catch CSS bloat

## Class Usage Details

See `used-classes.json` for complete list of detected classes.
