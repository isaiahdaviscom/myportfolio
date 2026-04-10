# CSS Optimization Report

Generated: 2026-04-02T01:35:58.197Z

## Summary

- **Files Scanned**: 71
- **Unique Classes Found**: 745
- **Original CSS Size**: 161.77 KB
- **Production CSS Size**: 111.52 KB
- **Size Reduction**: 50.26 KB (31.07%)

## Analysis Details

### Files by Type
- **Templates**: 36
- **Content**: 27
- **Static**: 5
- **Other**: 3

### Most Common Class Patterns

- **Tailwind Utilities**: 36
- **Responsive Classes**: 7
- **Hover States**: 7
- **Focus States**: 4
- **Custom Classes**: 687

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
