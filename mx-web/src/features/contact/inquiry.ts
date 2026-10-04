import { site, whatsappUrl } from '../../content/site'

export interface Inquiry {
  name: string
  company: string
  phone: string
  email: string
  location: string
  projectType: string
  product: string
  environment: '' | 'indoor' | 'outdoor' | 'unsure'
  size: string
  timeline: string
  message: string
  consent: boolean
  /** Honeypot — must stay empty. Hidden from people, filled by naive bots. */
  website: string
}

export type InquiryErrors = Partial<Record<keyof Inquiry, string>>

export const emptyInquiry: Inquiry = {
  name: '',
  company: '',
  phone: '',
  email: '',
  location: '',
  projectType: '',
  product: '',
  environment: '',
  size: '',
  timeline: '',
  message: '',
  consent: false,
  website: '',
}

export const projectTypes = [
  'New LED display',
  'Installation only',
  'Structural fabrication',
  'Maintenance / AMC',
  'Repair',
  'Event or rental screen',
  'Other',
] as const

export const timelines = ['Within 1 month', '1–3 months', '3–6 months', '6+ months', 'Just exploring'] as const

export const LIMITS = { name: 120, company: 160, email: 254, phone: 40, location: 120, size: 120, message: 4000 } as const

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
const PHONE = /^[+()\-.\s\d]{6,}$/

/**
 * Pure validation — shared by the form and its tests; any server must re-validate.
 * Phone is required (the fastest way to follow up); email is optional but must be valid.
 */
export function validateInquiry(input: Inquiry): InquiryErrors {
  const errors: InquiryErrors = {}
  const name = input.name.trim()
  const phone = input.phone.trim()
  const email = input.email.trim()
  const message = input.message.trim()

  if (!name) errors.name = 'Please enter your name.'
  else if (name.length > LIMITS.name) errors.name = `Please keep your name under ${LIMITS.name} characters.`

  if (!phone) errors.phone = 'Please enter a phone number so we can reach you.'
  else if (!PHONE.test(phone) || phone.replace(/\D/g, '').length < 8) errors.phone = 'Please enter a valid phone number, e.g. +91 98765 43210.'

  if (email && (email.length > LIMITS.email || !EMAIL.test(email))) errors.email = 'Please enter a valid email address, like name@company.com.'

  if (!message) errors.message = 'Please tell us a little about your project.'
  else if (message.length < 10) errors.message = 'Please add a little more detail (at least 10 characters).'
  else if (message.length > LIMITS.message) errors.message = `Please keep your message under ${LIMITS.message} characters.`

  if (!input.consent) errors.consent = 'Please confirm we may contact you about this enquiry.'

  return errors
}

export class InquiryEndpointMissingError extends Error {
  constructor() {
    super('No inquiry endpoint configured')
    this.name = 'InquiryEndpointMissingError'
  }
}

/**
 * Sends the enquiry to VITE_INQUIRY_ENDPOINT as JSON.
 * Bot submissions (honeypot filled) resolve silently without sending.
 */
export async function submitInquiry(input: Inquiry, signal?: AbortSignal): Promise<void> {
  if (input.website) return

  const endpoint = import.meta.env.VITE_INQUIRY_ENDPOINT
  if (!endpoint) throw new InquiryEndpointMissingError()

  const { website: _honeypot, ...payload } = input
  void _honeypot
  const response = await fetch(endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify({ ...payload, source: 'website', submittedAt: new Date().toISOString() }),
    signal,
  })
  if (!response.ok) throw new Error(`Inquiry failed with status ${response.status}`)
}

function inquiryText(input: Inquiry): string {
  const fields: [string, string][] = [
    ['Name', input.name],
    ['Company', input.company],
    ['Phone', input.phone],
    ['Email', input.email],
    ['Location', input.location],
    ['Project type', input.projectType],
    ['Interested in', input.product],
    ['Environment', input.environment],
    ['Approximate size', input.size],
    ['Timeline', input.timeline],
  ]
  const details = fields.filter(([, value]) => value.trim()).map(([label, value]) => `${label}: ${value.trim()}`)
  return [...details, '', input.message.trim()].join('\n')
}

/** Pre-filled email used when no endpoint is configured or the request fails. */
export function inquiryMailto(input: Inquiry): string | null {
  if (!site.contact.email) return null
  const subject = `Quote request${input.company ? ` — ${input.company}` : ''}`
  return `mailto:${site.contact.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(inquiryText(input))}`
}

/** The same enquiry as a pre-filled WhatsApp message. */
export function inquiryWhatsapp(input: Inquiry): string | null {
  if (!site.contact.whatsapp) return null
  return whatsappUrl(site.contact.whatsapp, `Quote request\n\n${inquiryText(input)}`)
}
