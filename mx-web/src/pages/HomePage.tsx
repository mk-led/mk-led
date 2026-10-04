import Box from '@mui/material/Box'
import { ArrowButton } from '../components/ui/ArrowButton'
import { CtaBand } from '../components/ui/CtaBand'
import { CardGrid, LinkCard } from '../components/ui/LinkCard'
import { Reveal } from '../components/ui/Reveal'
import { GroupLabel, Section, SectionHeader } from '../components/ui/Section'
import { categoryProducts, seriesProducts } from '../content/products'
import { articles } from '../content/resources'
import { services } from '../content/services'
import { site } from '../content/site'
import { FabricationSection } from '../features/fabrication/FabricationSection'
import { Hero } from '../features/home/Hero'
import { TrustSection } from '../features/home/TrustSection'
import { PitchExplainer } from '../features/pitch/PitchExplainer'
import { ProductCard } from '../features/products/ProductCard'
import { ProjectGallery } from '../features/projects/ProjectGallery'
import { ProcessSection } from '../features/services/ProcessTimeline'
import { ServiceCards } from '../features/services/ServiceCards'
import { IndoorSection, OutdoorBand } from '../features/solutions/HomeSolutions'
import { paths } from '../routes/paths'
import { SEO } from '../seo/SEO'

export default function HomePage() {
  return (
    <>
      <SEO
        path="/"
        description={`${site.name} provides professional LED display solutions in India: indoor and outdoor LED walls, P2–P4 LED displays, custom fabrication, installation, maintenance, AMC and 24×7 support.`}
      />
      <Hero />
      <TrustSection />

      <Section id="products" tone="raised" labelledBy="products-title">
        <SectionHeader
          id="products-title"
          eyebrow="LED Solutions"
          title="The right display for every space."
          intro="Four pixel-pitch series cover everything from close-up boardrooms to large venues. Five solution families cover how and where the display will live."
          actions={
            <ArrowButton href={paths.products} variant="text">
              View all products
            </ArrowButton>
          }
        />
        <GroupLabel>Pixel-pitch series — every dot shown to scale</GroupLabel>
        <CardGrid min={240}>
          {seriesProducts.map((p, i) => (
            <Reveal key={p.slug} delay={i * 60}>
              <ProductCard product={p} />
            </Reveal>
          ))}
        </CardGrid>
        <Box sx={{ mt: { xs: 8, md: 12 } }}>
          <GroupLabel>Solution families</GroupLabel>
          <CardGrid min={340}>
            {categoryProducts.map((p, i) => (
              <Reveal key={p.slug} delay={(i % 3) * 60}>
                <ProductCard product={p} />
              </Reveal>
            ))}
          </CardGrid>
        </Box>
      </Section>

      <Section id="pixel-pitch" labelledBy="pitch-title">
        <SectionHeader
          id="pitch-title"
          eyebrow="Pixel pitch, explained"
          title="Choose by distance, not by number."
          intro="Pixel pitch is the gap between neighbouring pixels. The right pitch depends on how close your audience will be — pick a series to see the difference."
          actions={
            <ArrowButton href={paths.pixelPitchGuide} variant="text">
              Read the full pixel pitch guide
            </ArrowButton>
          }
        />
        <PitchExplainer />
      </Section>

      <IndoorSection />
      <OutdoorBand />

      <Section id="services" tone="raised" labelledBy="services-title">
        <SectionHeader
          id="services-title"
          eyebrow="Services"
          title="One team, from first survey to long-term support."
          intro="We stay responsible for the display after it is switched on — the structure, the electronics and the people who depend on it."
          actions={
            <ArrowButton href={paths.services} variant="text">
              All services
            </ArrowButton>
          }
        />
        <ServiceCards items={services} />
      </Section>

      <ProcessSection />
      <FabricationSection />

      <Section id="projects" labelledBy="projects-title">
        <SectionHeader
          id="projects-title"
          eyebrow="Projects"
          title="Work that lights up spaces."
          intro="The kinds of installations we deliver — outdoor, indoor, advertising, corporate, events, retail and custom."
          actions={
            <ArrowButton href={paths.projects} variant="text">
              View projects
            </ArrowButton>
          }
        />
        <ProjectGallery limit={3} />
      </Section>

      <Section id="resources" tone="raised" labelledBy="resources-title">
        <SectionHeader
          id="resources-title"
          eyebrow="Resources"
          title="Straight answers about LED displays."
          actions={
            <ArrowButton href={paths.resources} variant="text">
              All guides
            </ArrowButton>
          }
        />
        <CardGrid min={260}>
          {articles.map((a) => (
            <LinkCard key={a.slug} href={paths.resource(a.slug)} title={a.title} description={a.description} meta="Guide" />
          ))}
        </CardGrid>
      </Section>

      <CtaBand />
    </>
  )
}
