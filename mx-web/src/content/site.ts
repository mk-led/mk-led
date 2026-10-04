import company from './company.json'

/** Treats empty strings in company.json as "not provided". */
const optional = (value: string | undefined): string | null => (value?.trim() ? value.trim() : null)

const address = {
  street: optional(company.address.street),
  locality: optional(company.address.locality),
  region: optional(company.address.region),
  postalCode: optional(company.address.postalCode),
  country: optional(company.address.country),
  countryName: optional(company.address.countryName),
}

/** Single-line postal address, e.g. "Seenivasapuram, Krishnagiri, Tamil Nadu 635203, India". */
const addressLine =
  [address.street, address.locality, [address.region, address.postalCode].filter(Boolean).join(' '), address.countryName]
    .filter(Boolean)
    .join(', ') || null

/**
 * Company-wide configuration, read from company.json — edit details there, not here.
 * Values that are empty are hidden in the UI and omitted from structured data.
 */
export const site = {
  name: company.name,
  legalName: company.legalName,
  statement: company.statement,
  description: company.description,
  experienceYears: company.experienceYears,
  /** Canonical origin. VITE_SITE_URL overrides it per environment (e.g. staging). */
  url: (import.meta.env.VITE_SITE_URL || company.url).replace(/\/$/, ''),
  contact: {
    email: optional(company.contact.email),
    phone: optional(company.contact.phone),
    whatsapp: optional(company.contact.whatsapp),
    whatsappMessage: company.contact.whatsappMessage,
    hours: optional(company.contact.hours),
    open24x7: company.contact.open24x7,
  },
  address: {
    ...address,
    line: addressLine,
    /** Explicit map link, or a Google Maps search for the address. */
    mapUrl:
      optional(company.address.mapUrl) ??
      (addressLine ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${company.legalName}, ${addressLine}`)}` : null),
  },
  social: {
    facebook: optional(company.social.facebook),
    instagram: optional(company.social.instagram),
    linkedin: optional(company.social.linkedin),
    x: optional(company.social.x),
    youtube: optional(company.social.youtube),
    threads: optional(company.social.threads),
    pinterest: optional(company.social.pinterest),
  },
}

export type SocialNetwork = keyof typeof site.social

export const socialLabels: Record<SocialNetwork, string> = {
  facebook: 'Facebook',
  instagram: 'Instagram',
  linkedin: 'LinkedIn',
  x: 'X (Twitter)',
  youtube: 'YouTube',
  threads: 'Threads',
  pinterest: 'Pinterest',
}

/** Digits-only form of a phone number for tel: and wa.me links. */
export function dialDigits(phone: string): string {
  return phone.replace(/[^\d+]/g, '')
}

export function whatsappUrl(number: string, message = site.contact.whatsappMessage): string {
  return `https://wa.me/${dialDigits(number).replace(/^\+/, '')}?text=${encodeURIComponent(message)}`
}

/** Configured social profiles, in display order. */
export function socialProfiles(): { network: SocialNetwork; label: string; url: string }[] {
  return (Object.keys(socialLabels) as SocialNetwork[]).flatMap((network) => {
    const url = site.social[network]
    return url ? [{ network, label: socialLabels[network], url }] : []
  })
}

export const hero = {
  eyebrow: site.statement,
  headline: 'Light Up Every Moment.',
  supporting:
    'Indoor and outdoor LED display walls — designed, fabricated, installed and supported by one experienced team.',
  primaryCta: { label: 'Request a Quote', to: '/request-quote' },
  secondaryCta: { label: 'Explore LED Solutions', to: '/products' },
  /**
   * Optional hero film. When set, it replaces the rendered LED-wall visual.
   * Provide a short, silent, looping MP4/WebM (≤ 8 MB) and a poster frame.
   */
  video: null as { src: string; poster: string } | null,
}

export const trust = {
  eyebrow: 'Why MK-LED',
  headline: 'Built on Experience. Driven by Precision.',
  intro:
    'Two decades of LED display work have taught us that a great screen is the sum of hundreds of correct decisions — in the survey, the structure, the wiring and the service that follows.',
  lead: { value: `${company.experienceYears}+`, label: 'Years industry experience', detail: 'LED display projects across sectors and scales.' },
  pillars: [
    { label: 'Professional installation', detail: 'Rigging, cabling and commissioning by experienced crews.', to: '/services/installation' },
    { label: 'Custom fabrication', detail: 'Frames and structures engineered around each display.', to: '/services/fabrication' },
    { label: 'Technical support', detail: 'Engineers who know your system, from modules to controllers.', to: '/services/repair' },
    { label: 'On-call service', detail: 'Help available 24 hours a day, 7 days a week.', to: '/services/on-call-support' },
  ],
}
