import { site, socialProfiles } from '../content/site'
import type { Article, Service } from '../content/types'
import { absoluteUrl, assetUrl, ids } from './metadata'

/*
 * JSON-LD builders. Each describes only what is visible on the page and verified in
 * company.json. No ratings, reviews, prices or availability are ever generated.
 */

export type JsonLd = Record<string, unknown>

const drop = <T extends JsonLd>(obj: T): T =>
  Object.fromEntries(Object.entries(obj).filter(([, v]) => v !== null && v !== undefined && !(Array.isArray(v) && v.length === 0))) as T

/** The company, as a LocalBusiness (a subtype of Organization) — it has a verified physical address. */
export function organizationSchema(): JsonLd {
  const { address, contact } = site
  return drop({
    '@type': ['Organization', 'LocalBusiness'],
    '@id': ids.organization,
    name: site.name,
    legalName: site.legalName,
    url: `${site.url}/`,
    logo: assetUrl('/brand/mk-led-logo-512.png'),
    image: assetUrl('/og/mk-led-og.png'),
    description: site.description,
    email: contact.email,
    telephone: contact.phone,
    address: address.line
      ? drop({
          '@type': 'PostalAddress',
          streetAddress: address.street,
          addressLocality: address.locality,
          addressRegion: address.region,
          postalCode: address.postalCode,
          addressCountry: address.country,
        })
      : null,
    hasMap: address.mapUrl,
    openingHoursSpecification: contact.open24x7
      ? {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
          opens: '00:00',
          closes: '23:59',
        }
      : null,
    contactPoint: contact.phone
      ? drop({
          '@type': 'ContactPoint',
          contactType: 'sales',
          telephone: contact.phone,
          email: contact.email,
          availableLanguage: ['en', 'ta'],
        })
      : null,
    sameAs: socialProfiles().map((p) => p.url),
  })
}

export function websiteSchema(): JsonLd {
  return {
    '@type': 'WebSite',
    '@id': ids.website,
    url: `${site.url}/`,
    name: site.name,
    publisher: { '@id': ids.organization },
    inLanguage: 'en',
  }
}

export interface Crumb {
  name: string
  path: string
}

export function breadcrumbSchema(path: string, crumbs: Crumb[]): JsonLd {
  return {
    '@type': 'BreadcrumbList',
    '@id': ids.breadcrumb(path),
    itemListElement: crumbs.map((c, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: c.name,
      item: absoluteUrl(c.path),
    })),
  }
}

export type WebPageType = 'WebPage' | 'CollectionPage' | 'AboutPage' | 'ContactPage' | 'FAQPage' | 'ItemPage'

export function webPageSchema(opts: { path: string; title: string; description: string; type?: WebPageType; hasBreadcrumb?: boolean; about?: JsonLd }): JsonLd {
  return drop({
    '@type': opts.type ?? 'WebPage',
    '@id': ids.webpage(opts.path),
    url: absoluteUrl(opts.path),
    name: opts.title,
    description: opts.description,
    isPartOf: { '@id': ids.website },
    breadcrumb: opts.hasBreadcrumb ? { '@id': ids.breadcrumb(opts.path) } : null,
    about: opts.about ?? null,
    inLanguage: 'en',
  })
}

export function serviceSchema(service: Service, path: string): JsonLd {
  return drop({
    '@type': 'Service',
    '@id': `${absoluteUrl(path)}#service`,
    name: service.title,
    serviceType: service.name,
    description: service.description,
    provider: { '@id': ids.organization },
    areaServed: site.address.countryName ? { '@type': 'Country', name: site.address.countryName } : null,
    url: absoluteUrl(path),
  })
}

export function articleSchema(article: Article, path: string): JsonLd {
  return {
    '@type': 'Article',
    '@id': `${absoluteUrl(path)}#article`,
    headline: article.title,
    description: article.description,
    dateModified: article.updated,
    datePublished: article.updated,
    author: { '@id': ids.organization },
    publisher: { '@id': ids.organization },
    mainEntityOfPage: { '@id': ids.webpage(path) },
    inLanguage: 'en',
  }
}
