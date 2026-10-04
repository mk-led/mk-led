import { products } from '../../content/products'
import { articles } from '../../content/resources'
import { services } from '../../content/services'
import { solutions } from '../../content/solutions'
import { paths } from '../../routes/paths'

export interface NavItem {
  label: string
  href: string
}

/** Primary navigation — identical labels on desktop and in the mobile drawer. */
export const primaryNav: NavItem[] = [
  { label: 'Products', href: paths.products },
  { label: 'Solutions', href: paths.solutions },
  { label: 'Services', href: paths.services },
  { label: 'Projects', href: paths.projects },
  { label: 'About', href: paths.about },
  { label: 'Resources', href: paths.resources },
  { label: 'Contact', href: paths.contact },
]

/** Footer link groups, generated from content so new pages are always linked. */
export const footerNav: { heading: string; items: NavItem[] }[] = [
  { heading: 'Products', items: products.map((p) => ({ label: p.name, href: paths.product(p.slug) })) },
  { heading: 'Solutions', items: solutions.map((s) => ({ label: s.name, href: paths.solution(s.slug) })) },
  { heading: 'Services', items: services.map((s) => ({ label: s.title.replace(/^LED Display /, ''), href: paths.service(s.slug) })) },
  {
    heading: 'Company',
    items: [
      { label: 'About MK-LED', href: paths.about },
      { label: 'Projects', href: paths.projects },
      ...articles.slice(0, 2).map((a) => ({ label: a.title.split(':')[0]!, href: paths.resource(a.slug) })),
      { label: 'Contact', href: paths.contact },
      { label: 'Request a Quote', href: paths.requestQuote },
    ],
  },
]

/** Routes whose first section is a full-bleed dark hero; the transparent header adapts to them. */
export const darkHeroRoutes = ['/']
