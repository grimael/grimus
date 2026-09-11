# Security

This portfolio is a static Astro site deployed on GitHub Pages. There is no server code, database, form, cookie or API key: nothing sensitive is shipped to the browser.

## Protections in place

- **Content Security Policy** (meta tag in `src/layouts/BaseLayout.astro`): every resource — scripts, styles, fonts, images, logos — must come from the site itself. Inline scripts and styles are forbidden in production, forms are disabled and Trusted Types block DOM-based XSS sinks.
- **No third-party requests**: fonts (`public/fonts`) and logos (`public/assets/logos`) are self-hosted, so visitors' IP addresses are not shared with CDNs.
- **Clickjacking**: GitHub Pages cannot send `frame-ancestors` / `X-Frame-Options`, so `public/pref-init.js` hides the page when it is loaded inside a frame.
- **External links** open with `rel="noopener noreferrer"`.
- **Supply chain**: GitHub Actions are pinned to commit SHAs, jobs run with least-privilege permissions, the build fails on high-severity `npm audit` findings, and Dependabot proposes weekly updates for npm packages and actions.
- `public/_headers` holds the equivalent HTTP headers (HSTS, CSP with `frame-ancestors`, nosniff…) for hosts that support it (Netlify, Cloudflare Pages); GitHub Pages ignores it.

## Keeping it secure

- Merge Dependabot pull requests after checking that the build passes.
- Never commit secrets, `.env` files or private links (for example Power BI workspace URLs).
- When adding an image, font or script, serve it from the site: a new external origin would be blocked by the CSP.

## Reporting a vulnerability

Please email grimael.s@outlook.com with a description and steps to reproduce. There is no bug bounty programme.
