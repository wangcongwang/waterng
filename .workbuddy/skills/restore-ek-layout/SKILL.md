---
name: restore-ek-layout
description: Restore the original layout and styling of a page whose CSS was broken after the Elken water project migrated from the deprecated pages.css (--ink tokens) to the --ek- design system. Use this skill when a page looks unstyled, its layout collapsed to a single column, or its page-specific classes no longer match the design specification.
agent_created: true
---

# Restore an Elken Page Layout Using --ek- Tokens

## When to use

Use this skill when a page in the water project has visual regressions because:

- Its markup still carries classes from the deprecated `assets/css/pages.css` (e.g., `.auth-*`, `.shipping-grid`, `.checkout-card`, `.summary`, `.aside-*`).
- `pages.css` is no longer linked in the page `<head>`, so those classes are unstyled.
- A newer stylesheet such as `elken-marketing.css` added competing rules (e.g., `.auth-shell { place-items: center }`) that override the original layout.
- The page has already been migrated to `--ek-` tokens elsewhere, but this page was missed.

Examples already fixed this way: `login.html` → `login.css`, `shipping.html` → `shipping.css` + `checkout.css`, `checkout.html` → `checkout.css`.

## Workflow

### 1. Inspect the page and locate the missing styles

Read the page HTML and list all classes that look broken or page-specific. For each class:
- Find whether it is already defined in any currently-linked CSS file (`water-pages.css`, `elken-marketing.css`, `elken-ui.css`, `elken-chrome.css`).
- If not, find its original definition in the deprecated `assets/css/pages.css`. Read that block to understand the original layout, spacing, and visual intent.

### 2. Decide whether to create a dedicated page stylesheet

If the broken classes are used only on this page, create `assets/css/<page>.css`.
If the page shares many classes with another page (e.g., `shipping.html` reuses `.checkout-card` and `.stepper` from `checkout.html`), link the existing shared stylesheet first and create a small page-specific stylesheet for the remaining classes.

### 3. Create the page stylesheet using only --ek- tokens

- Copy the **layout and visual intent** from the original `pages.css` block, but replace every value with an `--ek-*` token.
- `elken-tokens.css` defines the available palette, spacing scale, typography scale, radii, and shadows. Only use those tokens.
- If the original used a brand color (e.g., the old green `--brand-500`), switch it to the current design-system primary `--ek-blue` or related tokens such as `--ek-stat-2` / `--ek-stat-3`.
- Use `color-mix()` or `rgba()` for tints/gradients instead of hard hex literals.
- If a token of the exact size does not exist, combine existing tokens with `calc()` (e.g., `calc(var(--ek-32) + var(--ek-12))` for 44px).

### 4. Hard rules from CLAUDE.md / project convention

- **No hex colors** in the new stylesheet.
- **No `px` font-sizes** (spacing via tokens).
- **No `!important`**.
- **Do not remove focus rings**; rely on `elken-base.css` `var(--ek-focus-ring)`.
- Keep the HTML/JS logic unchanged; only add CSS and link it.

### 5. Link the stylesheet with correct load order and cache-busting

Add the new stylesheet **after** `water-pages.css` in the page `<head>`. Example:

```html
<link rel="stylesheet" href="assets/css/water-pages.css?v=20260908g">
<link rel="stylesheet" href="assets/css/login.css?v=20260909a">
```

The later link ensures the page CSS overrides any conflicting `.auth-*` / `.checkout-card` / `.summary` rules from `elken-marketing.css`.

### 6. Validate the stylesheet

Run a quick compliance check:

```python
import re
css = open('assets/css/<page>.css').read()
assert css.count('{') == css.count('}')
assert not re.findall(r'#[0-9a-fA-F]{3,8}', css)
assert not re.findall(r'font-size:\s*\d+px', css)
assert '!important' not in css
```

Also verify that every `var(--ek-*)` is defined in `assets/css/elken-tokens.css`.

### 7. Verify with a headless screenshot

Start a local server and render the page at the representative viewport width:

```bash
cd /Users/wang/Documents/trae_projects/water
python3 -m http.server 9876 &
```

Use Puppeteer (or Chrome `--headless --screenshot`) to capture the page and check that:
- The original layout is restored (e.g., split-screen for login, two-column grid for shipping).
- Cards have correct padding, border, radius.
- Form elements use `.ek-*` kit styling.
- No console errors or broken assets.

Save the verification script under `/tmp/verify-<page>.js` so it can be reused for future pages.

### 8. Commit and update memory

Commit with a message that explains the root cause (deprecated `pages.css`) and the fix (dedicated `--ek-` stylesheet). Append a concise note to `/Users/wang/Documents/trae_projects/water/.workbuddy/memory/YYYY-MM-DD.md` including the page, the missing classes, the new CSS file, the cache-busting version, and the commit hash.

## Common page-specific classes to watch

- Login: `.auth-shell`, `.auth-card`, `.auth-mark`, `.auth-head`, `.auth-form`, `.auth-row`, `.auth-switch`, `.auth-aside`, `.aside-inner`, `.aside-bullets`, `.aside-foot`, `.aside-stat`, `.pwd`, `.pwd-toggle`.
- Checkout: `.stepper`, `.checkout-card`, `.summary`, `.summary-item-*`, `.pay-method*`, `.deliv-method*`, `.ussd-code`, `.pickup-*`, `.consent`.
- Shipping: `.shipping-grid`, `.shipping-side`, `.shipping-alert`, `.terms-meta`, `.order-link-box`, `.sign-side`, `.pickup-*`, plus shared checkout classes listed above.
- Account portal: these are handled by `account-ui.css`; do not add another page stylesheet.

## Example: restoring a centred auth page to a split-screen

```css
/* assets/css/login.css */
.auth-shell {
  display: grid;
  grid-template-columns: minmax(0, 520px) 1fr;
  gap: 0;
  place-items: stretch;              /* override marketing.css place-items:center */
  padding: 0;
  min-height: calc(100vh - var(--ek-header-h));
  background: var(--ek-surface-sunken);
}
.auth-card {
  width: auto;
  padding: var(--ek-48) clamp(var(--ek-24), 5vw, var(--ek-56)) var(--ek-56);
  background: var(--ek-surface);
  border-radius: 0;
  border-right: 1px solid var(--ek-border);
  box-shadow: none;
}
```

## Notes

- The cookie consent banner in `app.js` may overlay the page during verification; this is expected and unrelated to the layout fix.
- `signup.html` uses `.auth-shell[data-mode="signup"]`; if it is reported as broken, apply the same pattern in the same `login.css` or in a dedicated `signup.css`.
