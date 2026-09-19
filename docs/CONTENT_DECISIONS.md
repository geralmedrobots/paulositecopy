# Content decisions and source record

Source checked on 19 September 2026: [Home](https://www.medrobots.pt/), [UltraBot](https://www.medrobots.pt/ultrabot), [Benefits](https://www.medrobots.pt/benefits), [Healthcare Industry](https://www.medrobots.pt/healthcare-industry-1), [The Company](https://www.medrobots.pt/thecompany), [Recruitment source](https://www.medrobots.pt/copy-of-the-company), [PharmaRobot](https://www.medrobots.pt/projeto), [Contacts](https://www.medrobots.pt/contacts), [FAQ](https://www.medrobots.pt/faq), legal pages, and four job detail pages. `src/data/content.json` preserves their copy. `source-blocks.json` records the 32 source-page text captures used for content-integrity checks. UI labels needed for accessibility, error states, and language notices are in `src/data/site.js` and are not presented as company claims.

| Source material | Classification | Decision |
| --- | --- | --- |
| Current Home, UltraBot, Benefits, Healthcare Industry, The Company, Contacts, FAQ, legal pages, and four job details | CURRENT | Reused as the primary content. Sections, hierarchy, spacing, and semantics changed; substantive claims did not. |
| `/projeto` and `/portugal2030` in English | DUPLICATED | Same PharmaRobot details. `/projeto` is canonical; `/portugal2030` redirects. Values and official names were preserved. |
| Portuguese PharmaRobot source | UNKNOWN / PARTIAL | It only contains a generic objective. The project facts available in Portuguese on the English source remain visible, with a language notice on the English route. The generic source objective is retained on `/pt/projeto`. |
| `/copy-of-the-company` | USEFUL | Contains the live source recruitment page and links to four job descriptions. Promoted to `/recruitment` and redirected. Its team paragraphs are also reused in the company page. |
| `/copy-of-home` | LEGACY / DUPLICATED | Older product positioning and unsourced historical market figures. Its current-equivalent URL redirects to Home; distinctive material is archived in `legacy-content.json` and not promoted as a current claim. |
| `/copy-of-ultrabot` | LEGACY / UNKNOWN | Includes social/welcome robot, facial-recognition, temperature-screening, and other non-current product descriptions. It redirects to UltraBot; the text is archived pending product review. |
| Portuguese gender-equality source | DUPLICATED / UNKNOWN | The public page contains cookie-policy text under the gender-equality URL. The correct English policy is shown with an explicit language notice on the Portuguese route; original PT response archived. |

The current Home is partly English in the PT variant; the PT UltraBot page also requires the English product introduction and capabilities copied from the current Home. The English PharmaRobot page is Portuguese. These routes are marked `noindex` and omitted from the sitemap. They are present so navigation and equivalent-page switching remain predictable. No editorial translation was supplied.

The wording, grammar, spelling, terminology, UV-C and healthcare claims, job conditions, and project amounts remain as shown in the public source. They have not been independently validated. Source issues for a later editorial review are listed in the implementation report.
