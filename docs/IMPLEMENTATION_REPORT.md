# Med Robots — implementation report, Levels 1 and 2

Source reviewed: 19 September 2026. Scope: foundation, quality, and presentation of the existing product only. This folder began as the unmodified Vite starter, so the Med Robots pages and infrastructure were reconstructed from the [current public website](https://www.medrobots.pt/). No earlier Phase 1/2 implementation was available in this workspace. The GitHub repository already held a separate v2 implementation; it remains preserved on the default branch and its release tag while this reconstruction is published as v3.0.0 on its own branch.

## 1. What changed

Created the complete two-language React website with central content, navigation, contacts and asset records; semantic page templates; prerendered HTML; canonical routes; legacy redirects; real 404 responses; a sitemap; responsive layouts; and automated visual, browser, accessibility, and security checks. The footer includes the real email, telephones, addresses, legal links, and the local funding graphic.

## 2. Technical problems found

The starting project was the generic Vite counter and had no Med Robots content, routes, test suite, SEO metadata, server, contact integration, or media assets. The public source exposed duplicate legacy URLs and a PT legal page that repeated the cookie policy. These were classified and handled in [CONTENT_DECISIONS.md](CONTENT_DECISIONS.md).

## 3. UX problems found

The reference left large empty sections while the product details appeared far below the first screen. The product capabilities, safety note, and technical explanation were visually fragmented. Several labels did not accurately describe their destination, including the PT product and healthcare headings. The contact source displayed submission thanks even though this build has no delivery service. The new hierarchy surfaces the UltraBot immediately, groups its existing capabilities, uses descriptive section headings, and presents the unavailable form state honestly.

## 4. Product presentation improvements

Home now progresses from healthcare positioning to UltraBot, its four existing capabilities, operation, innovation, objective, and contact. UltraBot groups the existing UV-C explanation, reasons to use a UV-C robot, how it works, safety, autonomous navigation, critical-zone coverage, charging, and 24/7 copy. The healthcare, benefits, company, recruitment, and PharmaRobot pages each use consistent section spacing and a clearer image/text balance. No statistics, results, certifications, clients, or new product capabilities were added.

## 5. Final routes

Each path below also has a Portuguese counterpart under `/pt`:

| Canonical | Content |
| --- | --- |
| `/` | Home |
| `/ultrabot` | UltraBot |
| `/benefits` | Benefits |
| `/healthcare-industry-1` | Healthcare Industry |
| `/thecompany` | Company |
| `/recruitment` | Recruitment |
| `/projeto` | PharmaRobot |
| `/contacts` | Contacts |
| `/faq` | FAQ |
| `/privacy` | Privacy policy |
| `/cookies` | Cookie information |
| `/genderequality` | Gender equality |
| `/mechanicalengineer` | Job details |
| `/roboticssoftwareengineer` | Job details |
| `/seniorroboticsengineer` | Job details |
| `/computerengineer` | Job details |

`/copy-of-home`, `/copy-of-ultrabot`, `/copy-of-the-company`, `/portugal2030`, and `/index.html` redirect to their canonical pages, with PT equivalents. Trailing slashes redirect to the canonical form. Unknown paths return a 404 document and HTTP 404 status. The legacy decisions are documented separately.

## 6. Main components

`Navbar` and `Footer` read the same central links and contact data. `Hero`, `Picture`, and `Section` provide the shared layout and media system. `FAQ` uses native buttons with connected answer panels. `ContactForm` holds controlled values, validation, loading, success and error states, and a disabled production submit when no endpoint exists. The project and job pages render source text through focused page templates.

## 7. Assets

There are 27 local image records (including two logo variants), one local funding SVG, four local font files, and two optional local MP4 videos in `public/assets/`. Images have dimensions, text alternatives, stable aspect ratios, and lazy loading outside the critical first screen. The asset names identify the source page; `src/data/assets.json` records actual dimensions. Image material and the funding graphic came from the public reference and were saved locally. No new visual identity or fabricated product illustration was generated.

## 8. Responsive

All 32 PT/EN route variants were checked at 375, 390, 414, 768, 1024, 1280, 1440 and 1920 px. Browser checks found no horizontal overflow, broken image, or JavaScript error. The mobile menu stays within the viewport and closes on Escape, link activation, outside interaction, focus departure, and the desktop breakpoint. A gallery of 64 final full-page desktop/mobile captures is at `artifacts/visual/index.html` (generated locally and ignored from source control).

## 9. Accessibility

Semantic landmarks, one H1 per page, a skip link, keyboard navigation, visible focus, native controls, form labels and live errors, image alternatives, and reduced-motion behavior are implemented. Axe-core WCAG 2 A/AA and 2.1 AA checks passed on every page in both languages at 375 and 1440 px. This is an automated audit, not a substitute for a user assistive-technology review.

## 10. SEO

All pages have a unique title and description, canonical URL, document language, Open Graph tags, and robots directive. 28 fully represented canonical URLs appear in the sitemap. Four visible but incomplete language variants (`/pt/`, `/pt/ultrabot`, `/pt/genderequality`, `/projeto`) are `noindex` and omitted from the sitemap until editorial review. Language alternates are emitted only for complete reciprocal pairs. Legacy paths redirect, and 404 pages are `noindex`.

## 11. Performance and security

The built JavaScript is about 99 KB gzip and CSS about 3.4 KB gzip. Total local assets are about 6.1 MB, of which the two videos account for about 4.37 MB. Neither video downloads before user activation. Critical hero images load eagerly; supporting media loads lazily. No third-party runtime request was observed in the browser test. The included Node server provides `nosniff`, a same-origin content policy, referrer controls, and byte-range video delivery. The production dependency audit reported zero vulnerabilities. No production secrets are included. A live traffic or field-performance measurement has not been performed.

## 12. Tests

`npm run lint`, `npm test` (8 unit/behavior tests), `npm run build`, `npm run test:e2e` (26 browser tests), and `npm run audit:site` passed. The content-integrity test compares 655 current-source text blocks against the implementation. The browser matrix covers 256 page/viewport combinations, plus accessibility on 64 page/viewport combinations. Direct reload, redirects, language switching, 404, no-JavaScript HTML, FAQ, video opt-in, honest form state, and a test-only backend response contract were checked. Visual review covers 64 full-page captures. Checks must be rerun after content or asset changes.

## 13. Previous-platform check

Production source and built output were scanned, including package names in the lockfile. Opaque integrity hashes were excluded from text matching and dependency names were checked separately. Results:

```text
WIX REFERENCES: 0
WIX ASSETS: 0
WIX RUNTIME: 0
WIX DEPENDENCIES: 0
```

The historical source name is mentioned only in this report; it is not referenced by production code, assets, network requests, or packages. No iframe or embed is used.

## 14. Content deliberately unchanged

Grammar, spelling, PT-PT/PT-BR usage, terminology, claims, prices/amounts, percentages, policy language, job details, and official project names were preserved from the reference. Section order, navigation handling, disclosure of missing translations, and component semantics changed. Apparent thanks for a contact submission is rendered only after an actual positive server acknowledgement; the original string remains in content data.

## 15. Editorial issues reserved for the next phase

- The English product source contains “Uultrabot”, “fully autonomously”, and “desinfection”; the UV-C wavelength descriptions differ between nearby sections.
- PT UltraBot is titled “Setor da Saúde” in the source, while the PT healthcare page is titled “Soluções”; both original phrases remain visible as contextual kickers.
- PT Home contains English product paragraphs and capability names. PT gender equality serves cookie-policy text in the reference. EN PharmaRobot is written in Portuguese.
- The PT company text contains the phrase “A nossa visão a de a o setor de saúde”; several pages mix “robots” and “robôs”.
- FAQ wording includes “What Med Robots do?” and “an hospital”. The FAQ says “pharmacists” where the intended process should be checked.
- The healthcare source includes dated 2025 projections and uncited cost/distance estimates. Product and benefits pages contain strong healthcare and UV-C assertions. These need independent editorial and scientific review before any claim rewrite.
- The cookie policy states that only essential cookies are used. Legal review should confirm this against the eventual deployment and analytics configuration.
- Recruitment and four job pages are live in the source, but whether the vacancies remain open needs company confirmation.

## 16. Remaining work for Level 1

A real, approved same-origin contact service and its response contract must be deployed before online submission can be enabled. Complete and review the four incomplete language variants before removing their `noindex` state. Confirm the production host honors redirect and 404 rules and run a real-device assistive-technology review. Confirm the legal/cookie copy against the final deployment. These are external content/service or deployment checks; the local build, routes, mobile matrix, automated accessibility checks, and platform-removal audit pass.

## 17. Remaining work for Level 2

Confirm current job availability and review the existing product, UV-C, benefits, and healthcare claims with the Med Robots content owner. Approve the outstanding translations and editorial corrections in a separate content phase. No further product claims or Level 3/4 pages were added.
