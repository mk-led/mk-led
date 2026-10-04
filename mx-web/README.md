# MX-LED — website platform for MK-LED

Public website for **MK-LED — Professional LED Display Solutions** (https://mkled.net).

React 19 · TypeScript (strict) · Vite · Material UI 9 (Emotion, CSS variables) · React Router 8.
Every page is **pre-rendered to static HTML** at build time, then hydrated in the browser.

## Commands

| Command                | What it does                                                                  |
| ---------------------- | ----------------------------------------------------------------------------- |
| `npm run dev`          | Dev server with HMR (client-rendered)                                         |
| `npm run build`        | Type-check → client build → SSR build → pre-render all pages + sitemap/robots |
| `npm run serve`        | Serve `dist/` like production (clean URLs, real 404, gzip/brotli)             |
| `npm test`             | Unit, content-integrity and route tests (Vitest + Testing Library)            |
| `npm run lint`         | ESLint                                                                        |
| `npm run images`       | Generate AVIF/WebP/JPEG renditions from `media-src/` into `public/media/`     |
| `npm run brand-assets` | Regenerate OG image, logo PNG, favicons and PWA icons                         |

Environment (`.env.local`, see `.env.example`):

- `VITE_SITE_URL`: canonical origin (default `https://mkled.net`). Set it for staging.
- `VITE_INQUIRY_ENDPOINT`: HTTPS endpoint that receives the quote form as JSON `POST`. If it is unset, the form offers the same details via WhatsApp or email. The receiving server must re-validate input and rate-limit requests.

## Editing content (no code knowledge needed)

| What                                                      | Where                         |
| --------------------------------------------------------- | ----------------------------- |
| Company name, phone, WhatsApp, email, address, hours, social links | `src/content/company.json` |
| Products (P2–P4, indoor/outdoor/event/advertising/custom) | `src/content/products.ts`     |
| Solutions by application                                  | `src/content/solutions.ts`    |
| Services + 9-step process                                 | `src/content/services.ts`     |
| Guides (Resources)                                        | `src/content/resources.ts`    |
| Projects                                                  | `src/content/projects.ts`     |
| About page facts                                          | `src/content/about.ts`        |
| Photos and their credits                                  | `src/content/images.ts` + `media-src/` |

New products, solutions, services and guides automatically get a page, navigation and footer links, an entry in the sitemap and a pre-rendered HTML file. Tests fail if a cross-reference points to something that doesn't exist.

**Content rules**

- **No invented specifications.** Brightness, refresh rate, cabinet data, IP ratings and viewing distances stay `null` until they are confirmed from a verified datasheet. The site shows "Confirmed during design" instead. A test enforces this.
- **Social links** must be full profile URLs. A test rejects home pages and wrong domains.
- **Projects** marked `example: true` are illustrative and labelled "Example" on the site. Replace them with verified MK-LED projects.
- **Stock photos** (`representative: true`) are openly licensed and captioned "Representative image" with credit. Replace them with MK-LED photography: drop the files into `media-src/` (lowercase-hyphenated names), run `npm run images`, then update `images.ts`.

## Architecture

```
src/
  content/      typed content + company.json (single source of truth)
  routes/       paths.ts (URL architecture, sitemap list), router.tsx (lazy routes)
  pages/        one component per route
  features/     home, products, pitch, services, solutions, fabrication, projects, contact
  components/   layout (header/drawer, footer, mobile action bar), ui, media, brand
  seo/          SEO.tsx (meta, OG, canonical), schemas.ts (JSON-LD @graph), metadata.ts
  theme/        MUI theme split into colors, typography, breakpoints, shadows, components
  entry-client.tsx / entry-server.tsx
scripts/        prerender.mjs, serve.mjs, optimize-images.mjs, brand-assets.mjs
```

- **Theme:** `src/theme/`. Colours are defined once per scheme in `colors.ts` and compiled to CSS variables (`--mk-*`). Dark/light follows the OS until the visitor chooses. Any subtree can force a scheme with `data-theme="dark"` (the hero, outdoor band and CTA band do this). The pre-paint script in `index.html` prevents a theme flash, and its storage key must match `theme.ts`.
- **SEO:** every page sets a unique title and description, a canonical URL, robots, Open Graph and X metadata, breadcrumbs, and one JSON-LD `@graph` (Organization/LocalBusiness → WebSite → WebPage → BreadcrumbList, plus Service or Article where relevant). No ratings, reviews, prices or availability are ever generated.
- **Pre-rendering:** `scripts/prerender.mjs` renders every URL from `indexablePaths()`, moves React-hoisted metadata into `<head>`, inlines critical Emotion CSS and writes `sitemap.xml`, `robots.txt` and `404.html`.
- **Performance:** routes are code-split, pages are static HTML, images are AVIF/WebP with `srcset` and reserved dimensions, there are two self-hosted variable fonts with `font-display: swap`, hydration runs as a transition, and the LED-wall animation starts only when the browser is idle (and never for reduced motion or low-power devices).

## Deployment checklist

The output is static files in `dist/`. Configure the host (Netlify, Vercel, Cloudflare Pages, Nginx…) to:

1. Serve `/path` from `dist/path/index.html` and return **`404.html` with status 404** for unknown paths. Do **not** use an SPA fallback.
2. Redirect `http://` → `https://`, `www.mkled.net` → `mkled.net`, and `/path/` → `/path` with 301.
3. Compress text with Brotli or gzip. Cache `/assets/*` and `/media/*` for 1 year, immutable; serve HTML with `no-cache`.
4. Send security headers: `Strict-Transport-Security`, `X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin`, `Permissions-Policy`. Also send a `Content-Security-Policy` that allows `'self'`, the inline theme script (hash it) and Emotion's inline styles (`style-src 'self' 'unsafe-inline'`), with `connect-src` including the enquiry endpoint.
5. After launch: verify the domain in Google Search Console and Bing Webmaster Tools, submit `https://mkled.net/sitemap.xml`, create or claim the Google Business Profile with the same name, address and phone as `company.json`, and validate pages with the Rich Results Test.
