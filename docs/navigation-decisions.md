# Navigation decisions — v3.0 technical refinement

Reviewed 22 September 2026 against the public [English Home](https://www.medrobots.pt/), [Portuguese Home](https://www.medrobots.pt/?lang=pt), [Recruitment source](https://www.medrobots.pt/copy-of-the-company), [Project](https://www.medrobots.pt/projeto), and the existing source captures. This review did not change labels or editorial copy.

## Primary navigation

English desktop Home exposes UltraBot, Benefits, The Company, Project and Contacts; those five entries remain primary in both languages in `src/data/site.js`. The public Portuguese Home also exposes Setor da Saúde and Recrutamento at the top level, while it does not consistently expose PharmaRobot there. The local site instead puts Setor da Saúde and Recrutamento under More and keeps PharmaRobot primary in both languages. This is a deliberate cross-language hierarchy for the v3.0 baseline, but it is a fidelity difference from the public Portuguese menu. A future change to exact menu parity needs product approval because it changes established placement. Labels and destinations themselves retain the captured wording.

## Secondary navigation

Healthcare Industry / Setor da Saúde, Recruitment / Recrutamento, and FAQ remain under More. Both the desktop dropdown and mobile menu use the same data and links. Recruitment is retained because the public `/copy-of-the-company` page contains a real team introduction and four job descriptions. FAQ is retained because it has independent content and is linked from the public page footer. The source's duplicate Portuguese “Soluções” link is not copied merely because the source DOM shows it.

## Legal navigation

Privacy, Cookies and Gender Equality remain in the footer legal group. The English public footer exposes all three. The Portuguese public Home lists Privacy and Cookies; the local site retains the Gender Equality route but marks its Portuguese content incomplete because the captured Portuguese source repeats the cookies text. The footer and mobile/desktop destinations are tested.

## Legacy routes

`/copy-of-home` redirects to Home, `/copy-of-ultrabot` to UltraBot, `/copy-of-the-company` to Recruitment, and `/portugal2030` to PharmaRobot, with Portuguese equivalents. The original legacy material remains archived in `docs/legacy-content.json`; these paths are redirects rather than separate navigable items. The source's job detail routes remain real, linked from Recruitment, and are not treated as empty legacy pages.

## Reasoning

The baseline favors one deterministic navigation tree per language with equivalent destinations, while keeping every content-bearing page reachable in both languages. This differs from exact visual/menu parity in Portuguese. The route strategy remains `resolveRoute()` + `pagePath()` + prerendered static documents. Tests cover primary, secondary and legal links, active route, language switching, mobile and desktop, aliases, redirects, direct reload and 404.
