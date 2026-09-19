# Med Robots website — v3.0.0

React + Vite reconstruction of the current [Med Robots website](https://www.medrobots.pt/), limited to the website foundation and product presentation. This version is published on a separate GitHub branch and tag so the previous version remains available. Source copy and official project values were collected from the public pages on 19 September 2026. The final content inventory and unresolved editorial issues are in [docs/IMPLEMENTATION_REPORT.md](docs/IMPLEMENTATION_REPORT.md).

## Run and verify

Requires Node.js 24 or newer.

```bash
npm ci
npm run dev
npm run lint
npm test
npm run build
npm run test:e2e
npm run preview
```

`npm run build` creates static HTML for each route, local CSS/JS/assets, a sitemap, a robots file, host redirect rules, and localized 404 pages in `dist/`. `npm run preview` uses the included Node server, which handles direct requests, trailing slashes, redirects, 404 status codes, MIME types, security headers, and video byte ranges. A static host must honor `dist/_redirects` or be configured with equivalent rules. Set the canonical origin in `src/data/site.js` only if the live production domain changes.

Additional checks:

```bash
npm run audit:site
npm run qa:visual
npm audit --omit=dev --audit-level=high
```

`qa:visual` visits every canonical PT/EN page at 375 and 1440 px and writes 64 screenshots plus an index to `artifacts/visual/`. The browser test suite checks all 32 route variants at 375, 390, 414, 768, 1024, 1280, 1440, and 1920 px. It also checks navigation, keyboard behavior, the contact form, media loading, redirects, 404, and WCAG rules with axe-core.

## Content and routing

`src/data/content.json` stores page copy, `src/data/site.js` stores navigation and contact details, `src/data/routes.js` stores canonical routes and legacy aliases, and `src/data/assets.json` records local image dimensions. English routes live at `/`, Portuguese equivalents at `/pt/`. The source has incomplete language variants; they remain accessible with a visible notice but are excluded from the sitemap and indexing until reviewed. Legacy copies redirect to current routes; their nonduplicated material is classified in the report and archived in `docs/legacy-content.json`.

## Contact delivery

The production form has **no configured endpoint**. It says “SUBMISSION NOT AVAILABLE”, disables submit, and provides the real email and telephone links. It never reports a successful delivery without a server acknowledgement.

A future approved same-origin backend can be connected by setting `VITE_CONTACT_ENDPOINT` to its actual path at build time. The endpoint must accept POST JSON and return `Content-Type: application/json` with `{ "ok": true }` only after accepting the message. Do not place credentials in Vite environment variables. The browser tests exercise success, failure, loading, validation, and duplicate prevention against a test-only intercepted endpoint.

## Assets

All served images, videos, fonts, and the funding graphic are local in `public/assets/`. The two optional hero videos load only when a visitor chooses to play them. A still image is always present, including when playback fails or motion is reduced. The production pages make no third-party runtime requests.
