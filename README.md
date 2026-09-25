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

Portuguese pages use the same route structure under `/pt`, for example `/pt/solutions` and `/pt/projects/pharmarobot`. The visible language switcher preserves the equivalent current page.

## Development

```bash
npm install
npm run dev
```

## Production build

```bash
npm run lint
npm test
npm run build
npm run preview
```

## Contact API configuration

Copy `.env.example` to `.env` for local development and point `VITE_API_BASE_URL` to the Med Robots API origin:

```bash
cp .env.example .env
```

The form sends `POST ${VITE_API_BASE_URL}/api/v1/contacts` with JSON data and an `Idempotency-Key` UUID. Required fields are first name, last name, email and message. Optional blank phone/address values are sent as `null`. Failed submissions preserve the form and reuse the same idempotency key when the normalized payload is unchanged.

## Current scope and notes

- English is available on unprefixed routes and European Portuguese on equivalent `/pt` routes.
- The contact form submits to the Med Robots API and persists requests through `POST /api/v1/contacts`; email notification is not yet implemented.
- Some legacy imagery still references the Wix CDN and will be migrated separately.
- Verified legal documents are not currently included; unverified legal links are not rendered.
- The sitemap contains canonical public URLs only.
