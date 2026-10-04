import { describe, expect, it } from 'vitest'
import company from './company.json'
import { dialDigits, whatsappUrl } from './site'

describe('contact helpers', () => {
  it('strips formatting from phone numbers for tel: links', () => {
    expect(dialDigits('+91 98765-43210')).toBe('+919876543210')
    expect(dialDigits('(020) 7946 0958')).toBe('02079460958')
  })

  it('builds a wa.me link with digits only and an encoded greeting', () => {
    expect(whatsappUrl('+91 98765 43210', 'Hi there & hello')).toBe('https://wa.me/919876543210?text=Hi%20there%20%26%20hello')
  })
})

/** Each network's profile URL must live on that network's own domain. */
const socialHosts: Record<keyof typeof company.social, RegExp> = {
  facebook: /^(www\.)?facebook\.com$/,
  instagram: /^(www\.)?instagram\.com$/,
  linkedin: /^(www\.)?linkedin\.com$/,
  x: /^(www\.)?(x|twitter)\.com$/,
  youtube: /^(www\.)?youtube\.com$/,
  threads: /^(www\.)?threads\.(net|com)$/,
  pinterest: /^([a-z]{2}\.|www\.)?pinterest\.[a-z.]+$/,
}

describe('company.json', () => {
  it('uses an https canonical URL without a trailing slash', () => {
    expect(company.url).toMatch(/^https:\/\/[^/]+$/)
  })

  it('has a valid email and international phone numbers', () => {
    expect(company.contact.email).toMatch(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)
    for (const n of [company.contact.phone, company.contact.whatsapp].filter(Boolean)) {
      expect(dialDigits(n)).toMatch(/^\+\d{8,15}$/)
    }
  })

  it.each(Object.entries(company.social).filter(([, url]) => url))('%s is a full profile URL on the right domain', (network, url) => {
    const parsed = new URL(url)
    expect(parsed.protocol).toBe('https:')
    expect(parsed.hostname).toMatch(socialHosts[network as keyof typeof socialHosts])
    expect(parsed.pathname.length).toBeGreaterThan(1) // a profile, not the homepage
  })
})
