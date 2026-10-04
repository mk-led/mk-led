import { CtaBand } from '../components/ui/CtaBand'
import { CardGrid, LinkCard } from '../components/ui/LinkCard'
import { PageHeader } from '../components/ui/PageHeader'
import { Section } from '../components/ui/Section'
import { articles } from '../content/resources'
import { site } from '../content/site'
import { paths } from '../routes/paths'
import { SEO } from '../seo/SEO'

const title = 'LED Display Guides & Resources'
const description = `Plain-language LED display guides from ${site.name}: pixel pitch (P2 vs P3 vs P4), indoor vs outdoor displays, maintenance and AMC, and what affects LED display prices.`

const dateFormat = new Intl.DateTimeFormat('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })

export default function ResourcesPage() {
  const crumbs = [{ name: 'Resources', path: paths.resources }]
  return (
    <>
      <SEO title={title} description={description} path={paths.resources} breadcrumbs={crumbs} pageType="CollectionPage" />
      <PageHeader
        breadcrumbs={crumbs}
        eyebrow="Resources"
        title="Straight answers about LED displays."
        intro="Practical guides written by our team to help you plan, buy and look after an LED display — no jargon, no sales pitch."
      />
      <Section label="Guides">
        <CardGrid min={300}>
          {articles.map((a) => (
            <LinkCard key={a.slug} href={paths.resource(a.slug)} title={a.title} description={a.description} meta={`Guide · Updated ${dateFormat.format(new Date(a.updated))}`} headingLevel="h2" />
          ))}
        </CardGrid>
      </Section>
      <CtaBand />
    </>
  )
}
