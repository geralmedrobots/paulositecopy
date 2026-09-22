# v3.0 technical refinement — 22 September 2026

## Problems and corrections

- `Pages.jsx` combined all page templates and shared calls to action. It is now split into focused Home, UltraBot, Recruitment, Job, Project, Contact, FAQ, Legal and NotFound modules. Benefits, Healthcare and Company still use one `Editorial` component because their presentation is identical; three wrappers would only duplicate routing names. Shared `ContactCTA` and `Capabilities` each live once in `src/components`.
- `Navigation.jsx` held the header, footer and contacts. It is now `Navbar`, `Footer` and `ContactInformation` with the same state and link behavior. `Media.jsx` is now `Hero`, `Picture` and `Section`. The opt-in video state remains in `Hero`; supporting images remain in `Picture`.
- `App.jsx` uses a direct page component map and the existing route resolver. No second route system was introduced.
- The contact form used `Object.keys(emptyContact)` and three positional arrays. `contactFields` now defines each name, input type, autocomplete, maximum length, required flag and layout. The editorial labels are keyed by name in both languages. Validation and the disabled state without a configured endpoint are unchanged.
- The preview server previously called `readFile()` on every video before serving a byte range. It now uses `stat()` for size and `createReadStream()` with `pipeline()` for full and partial responses. A single valid byte range yields 206 with accurate `Content-Range`, `Content-Length` and `Accept-Ranges`; malformed and unsatisfiable ranges yield 416 with `Content-Range: bytes */size`. HEAD describes the full file without opening a stream. The existing security headers are retained on successful and range-error video responses.
- Open Graph images now use a central map for pages with existing local, relevant assets. Pages without one keep `/assets/home-2.webp` as a deterministic fallback. No new image or external asset was introduced.

## Decisions and limits

`/pt/` contains English product introduction and capability copy; `/pt/ultrabot` still embeds the English product introduction and capabilities; `/pt/genderequality` has English legal content because the captured Portuguese source repeats cookies; `/projeto` is a Portuguese-language project page at the English URL. All four retain `noindex` and are omitted from reciprocal alternates and sitemap until reviewed translations or language structure exist. Other complete routes remain indexable. Their visible source wording was not changed.

The public English pages currently show 2026 in the footer, while the Portuguese source shows 2021 and some older public captures show 2022. The baseline's dynamic year was retained to avoid a v3.0 behavior change based on inconsistent source footers. Exact source-year parity would need a separate editorial decision.

The local site intentionally uses canonical `/pt/...` paths and local assets, while the public site uses query-based Portuguese URLs and platform-served media. The layout and section hierarchy were redesigned in the approved v3.0 baseline, so pixel equality with the public site is outside this technical refinement. The contact form cannot deliver messages until a real same-origin endpoint is configured. No deploy, push, DNS change, translation or claim change was made.

Editorial content intentionally unchanged.

## Verification

The 34 prerendered documents' `#root` HTML matched the pre-refinement baseline byte for byte. The contact data comparison confirmed that its six original strings are unchanged; only the positional array became a name-keyed object. `npm run lint`, `npm test` (19 tests), `npm run build`, `npm run audit:site`, `npm run test:e2e` (34 browser tests) and `npm run qa:visual` (64 full-page captures) passed. Browser tests verify every canonical route, one H1 and page-specific metadata, navigation groups in both languages and widths, contact field mapping, disabled submission, accessibility, redirects and opt-in video.

The video tests cover complete GET, closed/open/suffix/clamped ranges, invalid/out-of-bounds ranges, HEAD and security headers for both local MP4s. A separate 256 MiB sparse-file check made 20 simultaneous 1 KiB range requests; process RSS rose from 58,224 KiB to 61,920 KiB (3,696 KiB), showing that the entire file was not buffered. This is a local spot check, not a field performance benchmark. The client bundle is 325.76 kB / 99.48 kB gzip and CSS 11.91 kB / 3.42 kB gzip; the client change is under 1 kB raw compared with baseline. Hero videos retain `preload="none"` and no `src` before interaction. Supporting images retain lazy loading and local fonts/assets. Visual samples from the generated 64-image gallery were inspected; no changed layout was found.

A text audit of source and production files found zero platform-specific references, assets, runtime hooks or dependencies. The source archive in `docs/source-blocks.json` retains historical captured DOM text; the `iframe` and `embed` words in the minified React DOM implementation are generic HTML tag handling, not site elements or runtime embeds. No actual `<iframe>` or `<embed>` appears in source or generated HTML.
