# Visual alignment with medrobots.pt — 22 September 2026

Compared the public English Home, UltraBot and Benefits at a 1280 px viewport with local 1280 px spot captures plus the 1440 px desktop and 375 px mobile gallery. The original local captures were saved at `artifacts/visual-baseline/` before changes; the current 64-page gallery is at `artifacts/visual/index.html`. The public site reveals several blocks through scroll animations, so full-page snapshots can show blocks while still faded. Measurements and viewport observations were used alongside screenshots.

## Implemented

- The desktop header now uses a height and a narrower inner width closer to the public header, while remaining sticky and keeping the existing links, language switch and mobile menu.
- The Home hero is taller (up to 646 px), with a lighter image overlay and smaller, source-like centered typography. Other image heroes use the roughly 325 px public proportion.
- The Home UltraBot title and product image were scaled and spaced closer to the source. The four capabilities now form a vertical sequence rather than a two-column grid. The existing explanatory block is retained after the source-like Innovation, Objective and What We Do compositions.
- Innovation now places its image above centered copy. Objective places its portrait on the left, and What We Do puts centered copy above the wide engineering image.
- UltraBot opens with UV-C content immediately after the hero. The existing two-column product summary is retained later on the page. A local image is used behind the UV-C explanation; the robot image and text in How It Works are stacked, closer to the source's composition.
- Shared page heroes, section backgrounds, typography and footer spacing were adjusted consistently. No external assets, claims, translations or new product features were introduced.

## Remaining visual differences

This is a visual alignment, not a pixel-identical reconstruction. The public site uses a different layout for some Benefits and other editorial sections, scroll-triggered fade effects, and a footer with FAQ integrated into its composition. The local site retains its existing CTA band and consistent component structure. The public Home has a large visible gap and different individual section coordinates; the local site preserves the extra explanatory content from the approved v3.0 baseline. On a 375 px public viewport, the public header/logo and hero appear horizontally clipped; the local site remains fully responsive and keyboard-accessible.

## Verification

`npm run lint`, `npm test` (19), `npm run build`, `npm run audit:site`, `npm run test:e2e` (34) and `npm run qa:visual` (64 captures) passed after the visual changes. The browser suite checks route rendering, no horizontal overflow at eight widths, image loading, opt-in video, mobile navigation and WCAG 2/2.1 A/AA rules. The site audit reported zero prohibited platform references or dependencies. CSS grew from 11.91 kB / 3.42 kB gzip to 16.14 kB / 4.21 kB gzip; JavaScript remains about 100 kB gzip.

Editorial content intentionally unchanged. No deploy or push was performed.

## Follow-up: static imagery, FAQ and Project (22 September 2026)

The two hero videos and their play controls were removed from the rendered site; Home and UltraBot now use the existing local hero images only. The MP4 files and the server's streaming support remain in the repository but no page requests those videos. The FAQ now displays all six question/answer pairs at once in the public site's two-column composition and no longer opens disclosures. The Project page was rebuilt visually around the public site's colored funding graphic, centered title, single text column and full-size local poster, with its existing Portuguese source strings unchanged. The English language notice remains visible after the poster because that route's copy is Portuguese.

The follow-up validation passed: lint, 19 unit/server tests, build, site audit, 34 browser tests (including static hero and open FAQ checks) and 64 visual captures. The earlier note in this report about opt-in video describes the prior stage; the current site uses fixed hero images.
