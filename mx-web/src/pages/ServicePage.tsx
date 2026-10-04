import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { useParams } from 'react-router'
import { MediaFrame } from '../components/media/MediaFrame'
import { SceneVisual } from '../components/media/SceneVisual'
import { ArrowButton } from '../components/ui/ArrowButton'
import { CheckList, SplitLayout } from '../components/ui/ContentBlocks'
import { CtaBand } from '../components/ui/CtaBand'
import { FaqList } from '../components/ui/FaqList'
import { PageHeader } from '../components/ui/PageHeader'
import { RelatedLinks } from '../components/ui/RelatedLinks'
import { GroupLabel, Section, SectionHeader } from '../components/ui/Section'
import { getService } from '../content/services'
import { FrameDrawing } from '../features/fabrication/FrameDrawing'
import { ProcessSection } from '../features/services/ProcessTimeline'
import { paths } from '../routes/paths'
import { SEO } from '../seo/SEO'
import { serviceSchema } from '../seo/schemas'
import NotFoundPage from './NotFoundPage'

export default function ServicePage() {
  const { slug = '' } = useParams()
  const service = getService(slug)
  if (!service) return <NotFoundPage />

  const path = paths.service(service.slug)
  const crumbs = [
    { name: 'Services', path: paths.services },
    { name: service.name, path },
  ]
  const related = service.relatedServices.map(getService).filter((s) => !!s)
  const visual =
    service.slug === 'fabrication' ? (
      <Box sx={{ p: 2, border: 1, borderColor: 'divider', bgcolor: 'background.default', color: 'text.primary', '& svg': { width: '100%', height: 'auto' } }}>
        <FrameDrawing />
      </Box>
    ) : (
      <MediaFrame imageKey={service.image} fallback={<SceneVisual kind="interior" seed={service.slug} />} priority caption sizes="(min-width: 900px) 45vw, 100vw" />
    )

  return (
    <>
      <SEO title={service.title} description={service.description} path={path} breadcrumbs={crumbs} structuredData={[serviceSchema(service, path)]} />
      <PageHeader
        breadcrumbs={crumbs}
        eyebrow={`Services · ${service.name}`}
        title={service.title}
        intro={service.summary}
        actions={
          <ArrowButton href={paths.requestQuote} size="large">
            Request a Quote
          </ArrowButton>
        }
        aside={visual}
      />

      <Section labelledBy="about-title">
        <SplitLayout
          main={
            <Stack spacing={6}>
              <div>
                <Typography id="about-title" variant="h2" sx={{ mb: 3 }}>
                  {service.name === 'AMC' ? 'What is an LED display AMC?' : `About ${service.title.toLowerCase().replace('led', 'LED')}`}
                </Typography>
                <Typography variant="lead" component="p" sx={{ color: 'text.secondary' }}>
                  {service.intro}
                </Typography>
              </div>
              <div>
                <GroupLabel component="h2">What’s included</GroupLabel>
                <CheckList items={service.includes} />
              </div>
            </Stack>
          }
          aside={<RelatedLinks title="Related services" links={related.map((s) => ({ href: paths.service(s.slug), label: s.title, description: s.summary }))} />}
        />
      </Section>

      {service.steps && service.steps.length > 0 && (
        <Section tone="raised" labelledBy="steps-title">
          <SectionHeader id="steps-title" eyebrow="How it works" title={`${service.name}, step by step`} />
          <Box component="ol" sx={{ listStyle: 'none', p: 0, m: 0, display: 'grid', columnGap: 4, gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', lg: `repeat(${service.steps.length}, 1fr)` }, borderTop: 1, borderColor: 'brand.lineStrong' }}>
            {service.steps.map((step, i) => (
              <Box component="li" key={step.title} sx={{ py: 3, borderBottom: 1, borderColor: 'divider' }}>
                <Typography variant="mono" sx={{ color: 'primary.main' }}>
                  {String(i + 1).padStart(2, '0')}
                </Typography>
                <Typography variant="h4" component="h3" sx={{ mt: 1, mb: 1 }}>
                  {step.title}
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  {step.body}
                </Typography>
              </Box>
            ))}
          </Box>
        </Section>
      )}

      {service.slug === 'installation' && <ProcessSection />}

      {service.faqs.length > 0 && (
        <Section labelledBy="faq-title">
          <SectionHeader id="faq-title" eyebrow="FAQ" title="Common questions" />
          <FaqList faqs={service.faqs} />
        </Section>
      )}

      <CtaBand
        title={`Talk to us about ${service.name === 'AMC' ? 'an AMC' : service.name.toLowerCase()}`}
        body="Tell us about your display or project — where it is, its size and what you need. We’ll recommend the right service and give you a clear quote."
      />
    </>
  )
}
