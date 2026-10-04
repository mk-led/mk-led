import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { ArrowButton } from '../components/ui/ArrowButton'
import { PageHeader } from '../components/ui/PageHeader'
import { GroupLabel, Section } from '../components/ui/Section'
import { site } from '../content/site'
import { ContactChannels, SocialLinks } from '../features/contact/ContactChannels'
import { paths } from '../routes/paths'
import { SEO } from '../seo/SEO'

export default function ContactPage() {
  const crumbs = [{ name: 'Contact', path: paths.contact }]
  const { phone, hours } = site.contact
  return (
    <>
      <SEO
        title="Contact MK-LED"
        description={`Contact ${site.name}${phone ? ` on ${phone}` : ''} by phone, WhatsApp or email${site.address.locality ? `, or visit us in ${site.address.locality}, ${site.address.region}` : ''}. LED display enquiries and support${hours ? `, ${hours.toLowerCase()}` : ''}.`}
        path={paths.contact}
        breadcrumbs={crumbs}
        pageType="ContactPage"
      />
      <PageHeader
        breadcrumbs={crumbs}
        eyebrow="Contact"
        title="Let’s talk about your display."
        intro="Call, message or email our team directly. For a quotation, send your project details and we’ll come back with a recommendation."
        actions={
          <ArrowButton href={paths.requestQuote} size="large">
            Request a Quote
          </ArrowButton>
        }
      />
      <Section label="Contact channels">
        <ContactChannels />
        <Box sx={{ display: 'grid', gap: 3, mt: 6, gridTemplateColumns: { xs: '1fr', md: '14rem 1fr' }, alignItems: 'center' }}>
          <GroupLabel component="h2">Follow {site.name}</GroupLabel>
          <SocialLinks />
        </Box>
        {site.address.line && (
          <Box component="address" sx={{ fontStyle: 'normal', mt: 6, pt: 3, borderTop: 1, borderColor: 'divider' }}>
            <Typography variant="overline" component="h2" sx={{ color: 'brand.subtle', mb: 1 }}>
              Address
            </Typography>
            <Typography>
              {site.legalName}, {site.address.line}
            </Typography>
          </Box>
        )}
      </Section>
    </>
  )
}
