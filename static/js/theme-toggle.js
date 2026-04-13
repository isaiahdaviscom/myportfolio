/**
 * <theme-toggle> custom element
 * ─────────────────────────────────────────────────────────────────────────────
 * Wraps the dark/light-mode toggle button. Manages localStorage persistence
 * and applies/removes [data-theme="dark"] on <html>.
 *
 * Usage in Hugo partial:
 *   <theme-toggle>
 *     <button class="cs-theme-toggle" …>…sun/moon SVGs…</button>
 *   </theme-toggle>
 *
 * Attributes (optional, set on the element):
 *   storage-key   — localStorage key (default: "cs-theme")
 *
 * Progressive enhancement: if JS is unavailable the <button> still renders;
 * without JS the theme simply won't toggle.
 * ─────────────────────────────────────────────────────────────────────────────
 */
class ThemeToggle extends HTMLElement {
  // ── Lifecycle ─────────────────────────────────────────────────────────────
  connectedCallback() {
    this.style.display = 'contents'; // transparent wrapper — no layout impact

    this._html = document.documentElement;
    this._storageKey = this.getAttribute('storage-key') || 'cs-theme';
    this._btn = this.querySelector('button');

    // Restore saved preference, fall back to OS preference
    const saved = this._safePref();
    const system = matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    this._apply(saved || system);

    this._handleClick = () => {
      const next = this._html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      this._apply(next);
      try {
        localStorage.setItem(this._storageKey, next);
      } catch {
        // localStorage unavailable (private browsing/storage quota) — ignore
      }
    };

    this._btn?.addEventListener('click', this._handleClick);
  }

  disconnectedCallback() {
    this._btn?.removeEventListener('click', this._handleClick);
  }

  // ── Helpers ───────────────────────────────────────────────────────────────
  _apply(theme) {
    document.documentElement.setAttribute('data-theme', theme === 'dark' ? 'dark' : 'light');
  }

  _safePref() {
    try {
      return localStorage.getItem(this._storageKey);
    } catch {
      return null;
    }
  }
}

customElements.define('theme-toggle', ThemeToggle);
