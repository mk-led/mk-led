/**
 * Content model for the MK-LED website.
 *
 * All copy and data lives in src/content and is typed here, so the site can later be
 * backed by a CMS or API without touching components.
 *
 * Rules:
 * - Technical specifications are `null` until confirmed against a verified datasheet.
 *   Components show "confirmed during design" instead of inventing numbers.
 * - Every entity has a stable slug; URLs are derived from slugs in src/routes/paths.ts.
 */

/** Key into the image registry (src/content/images.ts). */
export type ImageKey = string

export interface Faq {
  question: string
  answer: string
}

export interface TitledText {
  title: string
  body: string
}

export type Environment = 'indoor' | 'outdoor'

export type ProductCategory = 'indoor' | 'outdoor' | 'event' | 'advertising' | 'custom'

export interface Product {
  slug: string
  /** Short name used in cards and menus, e.g. "P3 LED Display". */
  name: string
  /** Page H1. */
  title: string
  /** 'series' = a pixel-pitch model; 'category' = an application family. */
  kind: 'series' | 'category'
  /** Pixel pitch in millimetres, or null where not applicable. */
  pixelPitch: number | null
  /** Confirmed operating environments. null = confirmed per configuration. */
  environment: Environment[] | null
  application: string[]
  /** Verified viewing distance from the product datasheet. null = not yet confirmed. */
  viewingDistance: string | null
  /** One-paragraph summary: what it is and who it is for (also the meta description). */
  description: string
  /** "What is it?" — a plain explanation, answer-first. */
  intro: string
  considerations: TitledText[]
  image: ImageKey | null
  features: string[]
  categories: ProductCategory[]
  relatedSolutions: string[]
  relatedServices: string[]
  faqs: Faq[]
}

export interface Solution {
  slug: string
  name: string
  title: string
  description: string
  intro: string
  considerations: TitledText[]
  recommendedProducts: string[]
  relatedServices: string[]
  image: ImageKey | null
  faqs: Faq[]
}

export interface Service {
  slug: string
  name: string
  title: string
  /** One line used in cards. */
  summary: string
  description: string
  intro: string
  includes: string[]
  steps?: TitledText[]
  relatedServices: string[]
  image: ImageKey | null
  faqs: Faq[]
}

export interface ProcessStep {
  number: string
  title: string
  summary: string
}

export type ProjectCategory = 'outdoor' | 'indoor' | 'advertising' | 'corporate' | 'events' | 'retail' | 'custom'

export interface Project {
  slug: string
  title: string
  categories: ProjectCategory[]
  location: string | null
  year: number | null
  summary: string
  image: ImageKey | null
  product: string | null
  /** True for illustrative entries that are not (yet) verified MK-LED projects. */
  example: boolean
}

export interface ArticleSection {
  heading: string
  paragraphs: string[]
  list?: string[]
}

export interface Article {
  slug: string
  title: string
  description: string
  /** ISO date the content was last reviewed. */
  updated: string
  /** Direct answer shown first — useful to readers and to answer engines. */
  summary: string
  sections: ArticleSection[]
  faqs: Faq[]
  relatedProducts: string[]
  relatedServices: string[]
}
