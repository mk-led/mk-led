import { CtaBand } from '../components/ui/CtaBand'
import { PageHeader } from '../components/ui/PageHeader'
import { Section } from '../components/ui/Section'
import { services } from '../content/services'
import { site } from '../content/site'
import { FabricationSection } from '../features/fabrication/FabricationSection'
import { ProcessSection } from '../features/services/ProcessTimeline'
import { ServiceCards } from '../features/services/ServiceCards'
import { paths } from '../routes/paths'
import { SEO } from '../seo/SEO'

const title = 'LED Display Installation, Maintenance & Support Services'
const description = `${site.name} LED display services: installation, structural fabrication, preventive maintenance, repair, AMC and 24×7 on-call support.`

export default function ServicesPage() {
  const crumbs = [{ name: 'Services', path: paths.services }]
  return (
    <>
      <SEO title={title} description={description} path={paths.services} breadcrumbs={crumbs} pageType="CollectionPage" />
      <PageHeader
        breadcrumbs={crumbs}
        eyebrow="Services"
        title="Installed right. Supported for life."
        intro="From the site survey to years of operation, one team is responsible for your display — its structure, its electronics and the people who rely on it."
      />
      <Section label="Our services">
        <ServiceCards items={services} headingLevel="h2" />
      </Section>
      <ProcessSection tone="raised" />
      <FabricationSection />
      <CtaBand title="Need installation or support?" body="Tell us about your display or project and we’ll recommend the right service — from a one-off repair to an annual maintenance contract." />
    </>
  )
}
