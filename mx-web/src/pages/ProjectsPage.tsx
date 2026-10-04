import Typography from '@mui/material/Typography'
import { CtaBand } from '../components/ui/CtaBand'
import { PageHeader } from '../components/ui/PageHeader'
import { Section } from '../components/ui/Section'
import { site } from '../content/site'
import { ProjectGallery } from '../features/projects/ProjectGallery'
import { paths } from '../routes/paths'
import { SEO } from '../seo/SEO'

const title = 'LED Display Projects'
const description = `The kinds of LED display installations ${site.name} delivers — outdoor, indoor, advertising, corporate, events, retail and custom LED projects.`

export default function ProjectsPage() {
  const crumbs = [{ name: 'Projects', path: paths.projects }]
  return (
    <>
      <SEO title={title} description={description} path={paths.projects} breadcrumbs={crumbs} pageType="CollectionPage" />
      <PageHeader
        breadcrumbs={crumbs}
        eyebrow="Projects"
        title="Work that lights up spaces."
        intro="Outdoor, indoor, advertising, corporate, events, retail and custom installations."
      />
      <Section label="Project portfolio">
        <Typography variant="body2" sx={{ color: 'text.secondary', mb: 5, maxWidth: '70ch' }}>
          Our project portfolio is being documented. The entries below are labelled examples of the work we deliver, shown with representative images — not
          specific {site.name} installations.
        </Typography>
        <ProjectGallery filterable />
      </Section>
      <CtaBand />
    </>
  )
}
