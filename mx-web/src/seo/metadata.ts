import { site } from '../content/site'

/** Absolute URL for a site path. Canonicals never carry query strings or trailing slashes. */
export function absoluteUrl(path: string): string {
  const clean = path.split(/[?#]/)[0] ?? '/'
  return clean === '/' ? `${site.url}/` : `${site.url}${clean.replace(/\/$/, '')}`
}

/** Absolute URL for an asset in /public. */
export function assetUrl(publicPath: string): string {
  return `${site.url}${publicPath.startsWith('/') ? publicPath : `/${publicPath}`}`
}

/** "Page | MK-LED", or the brand line for the home page. */
export function pageTitle(title?: string): string {
  return title ? `${title} | ${site.name}` : `${site.name} — ${site.statement}`
}

export const DEFAULT_OG_IMAGE = { path: '/og/mk-led-og.png', width: 1200, height: 630, alt: `${site.name} — ${site.statement}` }

/** Stable JSON-LD node identifiers so pages can reference the organisation and website. */
export const ids = {
  organization: `${site.url}/#organization`,
  website: `${site.url}/#website`,
  webpage: (path: string) => `${absoluteUrl(path)}#webpage`,
  breadcrumb: (path: string) => `${absoluteUrl(path)}#breadcrumb`,
}
