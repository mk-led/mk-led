import { MediaFrame } from '../components/media/MediaFrame'
import { SceneVisual } from '../components/media/SceneVisual'
import { CtaBand } from '../components/ui/CtaBand'
import { CardGrid, LinkCard } from '../components/ui/LinkCard'
import { PageHeader } from '../components/ui/PageHeader'
import { Reveal } from '../components/ui/Reveal'
import { Section } from '../components/ui/Section'
import { site } from '../content/site'
import { solutions } from '../content/solutions'
import { paths } from '../routes/paths'
import { SEO } from '../seo/SEO'

const title = 'LED Display Solutions by Application'
const description = `LED display solutions from ${site.name} for advertising, corporate offices, events, retail and stadiums or venues — what matters for each use, and which displays fit.`

export default function SolutionsPage() {
  const crumbs = [{ name: 'Solutions', path: paths.solutions }]
  return (
    <>
      <SEO title={title} description={description} path={paths.solutions} breadcrumbs={crumbs} pageType="CollectionPage" />
      <PageHeader
        breadcrumbs={crumbs}
        eyebrow="Solutions"
        title="LED displays for how you’ll use them."
        intro="Every application asks something different of a display — viewing distance, brightness, structure, uptime. Start with yours."
      />
      <Section label="Solutions by application">
        <CardGrid min={300}>
          {solutions.map((s, i) => (
            <Reveal key={s.slug} delay={(i % 3) * 60}>
              <LinkCard
                href={paths.solution(s.slug)}
                title={s.title}
                description={s.description}
                meta={s.name}
                headingLevel="h2"
                media={<MediaFrame imageKey={s.image} fallback={<SceneVisual kind="interior" seed={s.slug} />} sizes="(min-width: 1200px) 33vw, (min-width: 600px) 50vw, 100vw" />}
              />
            </Reveal>
          ))}
        </CardGrid>
      </Section>
      <CtaBand />
    </>
  )
}
