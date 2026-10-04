import Box from '@mui/material/Box'
import Link from '@mui/material/Link'
import Typography from '@mui/material/Typography'
import { useSearchParams } from 'react-router'
import { PageHeader } from '../components/ui/PageHeader'
import { GroupLabel, Section } from '../components/ui/Section'
import { getProduct } from '../content/products'
import { dialDigits, site, whatsappUrl } from '../content/site'
import { QuoteForm } from '../features/contact/QuoteForm'
import { paths } from '../routes/paths'
import { SEO } from '../seo/SEO'

const nextSteps = ['We review your requirements and ask any questions.', 'We arrange a site survey where needed.', 'You receive a recommendation and a clear quotation.']

export default function RequestQuotePage() {
  const [params] = useSearchParams()
  const product = getProduct(params.get('product') ?? '')
  const crumbs = [{ name: 'Request a Quote', path: paths.requestQuote }]
  const { phone, whatsapp } = site.contact

  return (
    <>
      <SEO
        title="Request a Quote for an LED Display"
        description={`Request a quote from ${site.name} for an indoor or outdoor LED display, installation, fabrication, maintenance or AMC. Share a few details and we’ll recommend the right solution.`}
        path={paths.requestQuote}
        breadcrumbs={crumbs}
      />
      <PageHeader breadcrumbs={crumbs} eyebrow="Request a Quote" title="Tell us about your project." intro="A few details are enough to start. We’ll come back with questions, a recommendation and a clear quotation." />
      <Section label="Quote request">
        <Box sx={{ display: 'grid', gap: { xs: 6, md: 10 }, gridTemplateColumns: { xs: '1fr', md: '1fr 2fr' }, alignItems: 'start' }}>
          <Box component="aside" sx={{ position: { md: 'sticky' }, top: { md: 104 }, display: 'grid', gap: 5 }}>
            <div>
              <GroupLabel component="h2">What happens next</GroupLabel>
              <Box component="ol" sx={{ listStyle: 'none', p: 0, m: 0, display: 'grid', gap: 2 }}>
                {nextSteps.map((step, i) => (
                  <Box component="li" key={step} sx={{ display: 'grid', gridTemplateColumns: '2rem 1fr' }}>
                    <Typography variant="mono" sx={{ color: 'primary.main', pt: 0.5 }}>
                      {String(i + 1).padStart(2, '0')}
                    </Typography>
                    <Typography sx={{ color: 'text.secondary' }}>{step}</Typography>
                  </Box>
                ))}
              </Box>
            </div>
            {(phone || whatsapp) && (
              <div>
                <GroupLabel component="h2">Prefer to talk?</GroupLabel>
                <Typography sx={{ color: 'text.secondary' }}>
                  {phone && (
                    <>
                      Call <Link href={`tel:${dialDigits(phone)}`}>{phone}</Link>
                    </>
                  )}
                  {phone && whatsapp && ' or '}
                  {whatsapp && (
                    <Link href={whatsappUrl(whatsapp)} target="_blank" rel="noopener noreferrer">
                      message us on WhatsApp
                    </Link>
                  )}
                  {site.contact.hours ? ` — ${site.contact.hours.toLowerCase()}.` : '.'}
                </Typography>
              </div>
            )}
          </Box>
          <QuoteForm initialProduct={product?.name ?? ''} />
        </Box>
      </Section>
    </>
  )
}
