import { products } from '../content/products'
import { articles } from '../content/resources'
import { services } from '../content/services'
import { solutions } from '../content/solutions'

/**
 * URL architecture — the only place paths are built. Lowercase, hyphenated, no trailing slash.
 */
export const paths = {
  home: '/',
  products: '/products',
  product: (slug: string) => `/products/${slug}`,
  solutions: '/solutions',
  solution: (slug: string) => `/solutions/${slug}`,
  services: '/services',
  service: (slug: string) => `/services/${slug}`,
  projects: '/projects',
  about: '/about',
  resources: '/resources',
  resource: (slug: string) => `/resources/${slug}`,
  contact: '/contact',
  requestQuote: '/request-quote',
  pixelPitchGuide: '/resources/led-pixel-pitch-guide',
} as const

/** Request-a-quote link, optionally pre-selecting a product. */
export function quotePath(productSlug?: string): string {
  return productSlug ? `${paths.requestQuote}?product=${encodeURIComponent(productSlug)}` : paths.requestQuote
}

export interface SitemapEntry {
  path: string
  priority: number
  changefreq: 'weekly' | 'monthly' | 'yearly'
}

/**
 * Every canonical, indexable URL. Used to pre-render pages and to generate sitemap.xml.
 * Add new content to src/content and it appears here automatically.
 */
export function indexablePaths(): SitemapEntry[] {
  return [
    { path: paths.home, priority: 1, changefreq: 'weekly' },
    { path: paths.products, priority: 0.9, changefreq: 'monthly' },
    ...products.map((p) => ({ path: paths.product(p.slug), priority: 0.8, changefreq: 'monthly' as const })),
    { path: paths.solutions, priority: 0.8, changefreq: 'monthly' },
    ...solutions.map((s) => ({ path: paths.solution(s.slug), priority: 0.7, changefreq: 'monthly' as const })),
    { path: paths.services, priority: 0.8, changefreq: 'monthly' },
    ...services.map((s) => ({ path: paths.service(s.slug), priority: 0.7, changefreq: 'monthly' as const })),
    { path: paths.projects, priority: 0.6, changefreq: 'monthly' },
    { path: paths.resources, priority: 0.6, changefreq: 'monthly' },
    ...articles.map((a) => ({ path: paths.resource(a.slug), priority: 0.6, changefreq: 'yearly' as const })),
    { path: paths.about, priority: 0.6, changefreq: 'yearly' },
    { path: paths.contact, priority: 0.7, changefreq: 'yearly' },
    { path: paths.requestQuote, priority: 0.8, changefreq: 'yearly' },
  ]
}
