import { describe, expect, it } from 'vitest'
import { emptyInquiry, inquiryMailto, inquiryWhatsapp, validateInquiry, type Inquiry } from './inquiry'

const valid: Inquiry = {
  ...emptyInquiry,
  name: 'Alex Kumar',
  phone: '+91 98765 43210',
  message: 'We need a 4 m wide indoor wall for our lobby.',
  consent: true,
}

describe('validateInquiry', () => {
  it('accepts a complete enquiry without an email address', () => {
    expect(validateInquiry(valid)).toEqual({})
  })

  it('requires name, phone, message and consent', () => {
    expect(Object.keys(validateInquiry(emptyInquiry)).sort()).toEqual(['consent', 'message', 'name', 'phone'])
  })

  it('validates email only when provided', () => {
    expect(validateInquiry({ ...valid, email: 'alex@' }).email).toBeDefined()
    expect(validateInquiry({ ...valid, email: 'alex@example.com' }).email).toBeUndefined()
  })

  it('rejects malformed or too-short phone numbers', () => {
    expect(validateInquiry({ ...valid, phone: 'call me' }).phone).toBeDefined()
    expect(validateInquiry({ ...valid, phone: '12345' }).phone).toBeDefined()
    expect(validateInquiry({ ...valid, phone: '+44 (0)20 7946 0958' }).phone).toBeUndefined()
  })

  it('requires a meaningful message', () => {
    expect(validateInquiry({ ...valid, message: 'hi' }).message).toMatch(/more detail/)
  })
})

describe('fallback links', () => {
  it('build an email containing only filled fields and the message', () => {
    const body = decodeURIComponent(inquiryMailto({ ...valid, company: 'Acme' })!.split('&body=')[1]!)
    expect(body).toContain('Company: Acme')
    expect(body).not.toContain('Email:')
    expect(body).toContain(valid.message)
  })

  it('build a WhatsApp message to the company number', () => {
    const href = inquiryWhatsapp({ ...valid, projectType: 'Repair' })!
    expect(href).toMatch(/^https:\/\/wa\.me\/919742755592\?text=/)
    expect(decodeURIComponent(href)).toContain('Project type: Repair')
  })
})
