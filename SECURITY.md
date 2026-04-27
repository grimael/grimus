# Security

This portfolio is built as a static Astro site. It does not expose server-side secrets, database credentials, or GitHub tokens in the browser.

## Production checklist

- Keep all repository links public and avoid embedding private access tokens.
- Configure a verified custom domain in GitHub Pages before enabling it.
- Enable HTTPS in GitHub Pages.
- Keep dependencies updated with Dependabot.
- If a contact form provider is added later, store provider keys outside the client bundle.
