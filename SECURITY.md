# Security

This portfolio is a static Astro site deployed on GitHub Pages. There is no server code, database, form, authentication cookie or API key. Contact details and project links are deliberately public, not secrets.

## Protections in place

- **Content Security Policy** (meta tag in `src/layouts/BaseLayout.astro`): every resource — scripts, styles, fonts, images, logos — must come from the site itself. Inline scripts and styles are forbidden in production, forms are disabled and Trusted Types block DOM-based XSS sinks.
- **No third-party requests on page load**: fonts (bundled local assets and `public/fonts`) and logos are self-hosted. Following an external project or contact link does connect the visitor to that service.
- **Clickjacking limitation**: GitHub Pages cannot configure `frame-ancestors` / `X-Frame-Options` through this repository. `public/pref-init.js` hides the page inside a frame when JavaScript runs, but this is not equivalent to an HTTP framing policy and can be bypassed by disabling scripts. A host supporting security headers is required for reliable frame blocking.
- **External links** open with `rel="noopener noreferrer"`.
- **Supply chain**: GitHub Actions are pinned to commit SHAs, jobs run with least-privilege permissions, and Dependabot proposes weekly updates for npm packages and actions. High-severity dependency findings, Astro/TypeScript errors and failing browser tests now block artifact publication. The previous `npm audit ... || true` bypass has been removed.
- `public/_headers` holds the equivalent HTTP headers (HSTS, CSP with `frame-ancestors`, nosniff…) for hosts that support it (Netlify, Cloudflare Pages); GitHub Pages ignores it.
- **Cache coherence on compatible hosts**: immutable caching is reserved for hashed `/_astro/` assets and the versioned favicon. Non-hashed images and fonts must be revalidated after deployment.

## Pre-push verification

Run `npm run check`, `npm audit --audit-level=high`, `npm run build` and
`npm run test:e2e`. Browser checks include the production CSP, inert search
payloads, local-only page resources, safe external links, SVG assets, mobile
keyboard navigation, blocked storage and navigation without JavaScript.
The tests use installed Chrome locally; CI installs Playwright Chromium.
These checks reduce risk, but do not constitute a penetration test or guarantee
that external projects are secure or accessible without authentication.

## Public WhatsApp contact

The contact page uses a direct HTTPS link to wa.me, without a third-party widget,
SDK, iframe or network request to WhatsApp before the visitor follows the link.
It opens with `noopener noreferrer nofollow` and `referrerpolicy="no-referrer"`.
The number is not displayed as page text or added to structured metadata.

The destination number is nevertheless present in the link and is public. It can
be extracted from the HTML or repository; `nofollow` is not an anti-scraping
protection. Encoding it in JavaScript would not make it confidential either.
A static site cannot offer a direct WhatsApp link while keeping its destination
secret. Use a dedicated public contact number if stronger privacy is needed.

## Keeping it secure

- Merge Dependabot pull requests after checking that the build passes.
- Never commit secrets, `.env` files or private links (for example Power BI workspace URLs).
- When adding an image, font or script, serve it from the site: a new external origin would be blocked by the CSP.

## Reporting a vulnerability

Please email grimael.s@outlook.com with a description and steps to reproduce. There is no bug bounty programme.
