# Versioning

This project uses [Semantic Versioning 2.0.0](https://semver.org/) (`MAJOR.MINOR.PATCH`).

---

## Single Source of Truth

The version lives in **`package.json`** (`"version"` field).  
All other locations are derived and kept in sync automatically:

| File | Field | Purpose |
|------|-------|---------|
| `package.json` | `"version"` | **Source of truth** |
| `hugo.toml` `[params]` | `version = "..."` | Rendered in site footer via `{{ .Site.Params.version }}` |
| `README.md` | badge URL | Shield badge shown on the repository page |

---

## CLI Commands

```bash
# Show current version
pf version

# Sync current version to hugo.toml and README badge (no bump)
pf version sync

# Bump patch (1.0.0 → 1.0.1)  ← default
pf version bump

# Bump minor (1.0.0 → 1.1.0)
pf version bump minor

# Bump major (1.0.0 → 2.0.0)
pf version bump major
```

All three `bump` levels update:
1. `package.json` `"version"`
2. `hugo.toml` `[params] version`
3. `README.md` shields.io badge URL

---

## When to Bump

| Change type | Level |
|-------------|-------|
| Bug fixes, copy edits, dependency updates | `patch` |
| New feature, new section, new content type | `minor` |
| Complete redesign, breaking change to theme API | `major` |

---

## Where the Version Appears on the Site

The footer renders the version automatically:

```html
<!-- themes/myPortfolio/layouts/partials/footer.html -->
<abbr title="Site version">v{{ .Site.Params.version | default "1.0.0" }}</abbr>
```

To verify in the browser, look at the bottom bar of any page — it shows `© YYYY Isaiah Davis · vX.Y.Z`.

---

## Implementation

The sync logic lives in [`scripts/version-sync.js`](../../scripts/version-sync.js).  
It can also be run directly:

```bash
# Sync only (no bump)
node scripts/version-sync.js

# Bump then sync
node scripts/version-sync.js bump minor
```

---

## Automated Sync on Build

`scripts/version-sync.js` is called automatically by `cli.js` during any `pf version bump` or `pf version sync` invocation. There is no separate git hook required — just run `pf version bump` before committing a release.

Suggested release workflow:

```bash
# 1. Finish features on develop
git add .
git commit -m "feat: add project detail page"

# 2. Bump and sync
pf version bump minor   # → updates package.json, hugo.toml, README badge

# 3. Commit the version bump
git add package.json hugo.toml README.md
git commit -m "chore: bump version to $(node -e "process.stdout.write(require('./package.json').version)")"

# 4. Deploy / merge to master
```
