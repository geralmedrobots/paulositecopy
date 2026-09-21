# Med Robots website

React/Vite implementation of the Med Robots institutional website. The current product direction presents Med Robots as a healthcare robotics and systems-integration company focused on hospital logistics.

## Stack

- React 19
- Vite
- React Router
- Plain CSS

## Canonical routes

| Route | Page |
|---|---|
| `/` | Home — The Future of Hospital Logistics |
| `/solutions` | Solutions |
| `/projects` | Transitional redirect to PharmaRobot |
| `/projects/pharmarobot` | PharmaRobot |
| `/company` | Med Robots / Company |
| `/contact` | Contact |
| `/ultrabot` | UltraBot |
| `/faq` | FAQ |

Legacy routes remain available through redirects: `/benefits`, `/projeto`, `/thecompany`, and `/contacts`.

## Development

```bash
npm install
npm run dev
```

## Production build

```bash
npm run lint
npm run build
npm run preview
```

## Current scope and notes

- PT/EN internationalisation is planned but not implemented.
- The contact form is frontend-only; no backend or email service is connected.
- Some legacy imagery still references the Wix CDN and will be migrated separately.
- Verified legal documents are not currently included; unverified legal links are not rendered.
- The sitemap contains canonical public URLs only.
