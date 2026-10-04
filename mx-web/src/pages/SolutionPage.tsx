import Box from '@mui/material/Box'
import { useParams } from 'react-router'
import { MediaFrame } from '../components/media/MediaFrame'
import { SceneVisual } from '../components/media/SceneVisual'
import { ArrowButton } from '../components/ui/ArrowButton'
import { TitledTextGrid } from '../components/ui/ContentBlocks'
import { CtaBand } from '../components/ui/CtaBand'
import { FaqList } from '../components/ui/FaqList'
import { CardGrid } from '../components/ui/LinkCard'
import { PageHeader } from '../components/ui/PageHeader'
import { RelatedLinks } from '../components/ui/RelatedLinks'
import { Section, SectionHeader } from '../components/ui/Section'
import { getProduct } from '../content/products'
import { getService } from '../content/services'
import { getSolution } from '../content/solutions'
import { ProductCard } from '../features/products/ProductCard'
import { paths } from '../routes/paths'
import { SEO } from '../seo/SEO'
import NotFoundPage from './NotFoundPage'

export default function SolutionPage() {
  const { slug = '' } = useParams()
  const solution = getSolution(slug)
  if (!solution) return <NotFoundPage />

  const path = paths.solution(solution.slug)
  const crumbs = [
    { name: 'Solutions', path: paths.solutions },
    { name: solution.name, path },
  ]
  const recommended = solution.recommendedProducts.map(getProduct).filter((p) => !!p)
  const relatedServices = solution.relatedServices.map(getService).filter((s) => !!s)

  return (
    <>
      <SEO title={solution.title} description={solution.description} path={path} breadcrumbs={crumbs} />
      <PageHeader
        breadcrumbs={crumbs}
        eyebrow={`Solutions · ${solution.name}`}
        title={solution.title}
        intro={solution.intro}
        actions={
          <ArrowButton href={paths.requestQuote} size="large">
            Request a Quote
          </ArrowButton>
        }
        aside={<MediaFrame imageKey={solution.image} fallback={<SceneVisual kind="interior" seed={solution.slug} />} priority caption sizes="(min-width: 900px) 45vw, 100vw" />}
      />

      <Section labelledBy="considerations-title">
        <SectionHeader id="considerations-title" eyebrow="What matters" title={`Planning ${solution.name.toLowerCase()} displays`} />
        <TitledTextGrid items={solution.considerations} />
      </Section>

      <Section tone="raised" labelledBy="recommended-title">
        <SectionHeader id="recommended-title" eyebrow="Recommended displays" title="Displays that fit this application" />
        <CardGrid min={260}>
          {recommended.map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </CardGrid>
      </Section>

      <Section label="Services and common questions">
        <Box sx={{ display: 'grid', gap: 8, gridTemplateColumns: { xs: '1fr', md: solution.faqs.length ? '1fr 1fr' : '1fr' } }}>
          <RelatedLinks title="Services for this application" links={relatedServices.map((s) => ({ href: paths.service(s.slug), label: s.title, description: s.summary }))} />
          {solution.faqs.length > 0 && (
            <div>
              <SectionHeader eyebrow="FAQ" title="Common questions" stacked />
              <FaqList faqs={solution.faqs} />
            </div>
          )}
        </Box>
      </Section>

      <CtaBand title={`Planning a ${solution.name.toLowerCase()} display?`} />
    </>
  )
}
