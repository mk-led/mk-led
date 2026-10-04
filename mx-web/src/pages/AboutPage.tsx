import Box from '@mui/material/Box'
import Link from '@mui/material/Link'
import Typography from '@mui/material/Typography'
import { TitledTextGrid } from '../components/ui/ContentBlocks'
import { CtaBand } from '../components/ui/CtaBand'
import { PageHeader } from '../components/ui/PageHeader'
import { GroupLabel, Section, SectionHeader } from '../components/ui/Section'
import { about } from '../content/about'
import { dialDigits, site } from '../content/site'
import { ProcessSection } from '../features/services/ProcessTimeline'
import { paths } from '../routes/paths'
import { SEO } from '../seo/SEO'

export default function AboutPage() {
  const crumbs = [{ name: 'About', path: paths.about }]
  const facts: { label: string; value: React.ReactNode }[] = [
    { label: 'Company', value: site.legalName },
    { label: 'Experience', value: `${site.experienceYears}+ years in the LED display industry` },
    ...(site.address.line ? [{ label: 'Location', value: site.address.line }] : []),
    ...(site.contact.hours ? [{ label: 'Support', value: site.contact.hours }] : []),
    ...(site.contact.phone ? [{ label: 'Phone', value: <Link href={`tel:${dialDigits(site.contact.phone)}`}>{site.contact.phone}</Link> }] : []),
    ...(site.contact.email ? [{ label: 'Email', value: <Link href={`mailto:${site.contact.email}`}>{site.contact.email}</Link> }] : []),
  ]

  return (
    <>
      <SEO title={about.title} description={about.description} path={paths.about} breadcrumbs={crumbs} pageType="AboutPage" />
      <PageHeader breadcrumbs={crumbs} eyebrow="About" title={about.title} intro={about.intro} />

      <Section labelledBy="facts-title">
        <Box sx={{ display: 'grid', gap: { xs: 6, md: 8 }, gridTemplateColumns: { xs: '1fr', md: '1fr 1.4fr' } }}>
          <div>
            <GroupLabel component="h2">
              <span id="facts-title">Company facts</span>
            </GroupLabel>
            <Box component="dl" sx={{ m: 0 }}>
              {facts.map((f) => (
                <Box key={f.label} sx={{ py: 2, borderBottom: 1, borderColor: 'divider' }}>
                  <Typography component="dt" variant="overline" sx={{ color: 'brand.subtle', fontSize: '0.6875rem' }}>
                    {f.label}
                  </Typography>
                  <Typography component="dd" sx={{ m: 0 }}>
                    {f.value}
                  </Typography>
                </Box>
              ))}
            </Box>
          </div>
          <div>
            <GroupLabel component="h2">What we do</GroupLabel>
            <TitledTextGrid items={about.whatWeDo} columns={2} />
          </div>
        </Box>
      </Section>

      <Section tone="raised" labelledBy="principles-title">
        <SectionHeader id="principles-title" eyebrow="How we work" title="Engineering credibility, not marketing claims." />
        <TitledTextGrid items={about.principles} />
      </Section>

      <ProcessSection />
      <CtaBand title={`Work with ${site.name}`} />
    </>
  )
}
