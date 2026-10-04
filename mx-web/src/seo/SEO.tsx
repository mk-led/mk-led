import { site } from '../content/site'
import { absoluteUrl, assetUrl, DEFAULT_OG_IMAGE, pageTitle } from './metadata'
import { breadcrumbSchema, organizationSchema, webPageSchema, websiteSchema, type Crumb, type JsonLd, type WebPageType } from './schemas'

export interface SEOProps {
  /** Page title without the brand suffix. Omit on the home page. */
  title?: string
  description: string
  /** Canonical path, e.g. "/products/p3-led-display". */
  path: string
  /** Breadcrumb trail (excluding Home); also emitted as BreadcrumbList JSON-LD. */
  breadcrumbs?: Crumb[]
  pageType?: WebPageType
  ogImage?: { path: string; width: number; height: number; alt: string }
  ogType?: 'website' | 'article'
  noindex?: boolean
  /** Extra JSON-LD nodes for this page (Service, Article …). */
  structuredData?: JsonLd[]
}

/**
 * Per-page metadata and structured data. React 19 hoists these tags into <head>, both in
 * the browser and in pre-rendered HTML. One @graph per page links WebPage → WebSite →
 * Organization so crawlers and AI systems see a consistent entity.
 */
export function SEO({ title, description, path, breadcrumbs, pageType, ogImage = DEFAULT_OG_IMAGE, ogType = 'website', noindex, structuredData = [] }: SEOProps) {
  const fullTitle = pageTitle(title)
  const url = absoluteUrl(path)
  const crumbs: Crumb[] | undefined = breadcrumbs && [{ name: 'Home', path: '/' }, ...breadcrumbs]

  const graph: JsonLd[] = [
    organizationSchema(),
    websiteSchema(),
    webPageSchema({ path, title: fullTitle, description, type: pageType, hasBreadcrumb: !!crumbs }),
    ...(crumbs ? [breadcrumbSchema(path, crumbs)] : []),
    ...structuredData,
  ]

  return (
    <>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      <meta name="robots" content={noindex ? 'noindex, follow' : 'index, follow, max-image-preview:large'} />
      <meta property="og:type" content={ogType} />
      <meta property="og:site_name" content={site.name} />
      <meta property="og:locale" content="en_IN" />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={assetUrl(ogImage.path)} />
      <meta property="og:image:width" content={String(ogImage.width)} />
      <meta property="og:image:height" content={String(ogImage.height)} />
      <meta property="og:image:alt" content={ogImage.alt} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={assetUrl(ogImage.path)} />
      {!noindex && (
        <script
          type="application/ld+json"
          // Static, trusted content; "<" is escaped so the JSON can never close the script tag.
          dangerouslySetInnerHTML={{ __html: JSON.stringify({ '@context': 'https://schema.org', '@graph': graph }).replace(/</g, '\\u003c') }}
        />
      )}
    </>
  )
}
