import Box from '@mui/material/Box'
import { CtaBand } from '../components/ui/CtaBand'
import { CardGrid } from '../components/ui/LinkCard'
import { PageHeader } from '../components/ui/PageHeader'
import { Reveal } from '../components/ui/Reveal'
import { GroupLabel, Section } from '../components/ui/Section'
import { categoryProducts, seriesProducts } from '../content/products'
import { site } from '../content/site'
import { ProductCard } from '../features/products/ProductCard'
import { paths } from '../routes/paths'
import { SEO } from '../seo/SEO'

const title = 'LED Display Products'
const description = `${site.name} LED display products: P2, P2.5, P3 and P4 LED displays, plus indoor, outdoor, event, advertising and custom LED display solutions.`

export default function ProductsPage() {
  return (
    <>
      <SEO title={title} description={description} path={paths.products} breadcrumbs={[{ name: 'Products', path: paths.products }]} pageType="CollectionPage" />
      <PageHeader
        breadcrumbs={[{ name: 'Products', path: paths.products }]}
        eyebrow="Products"
        title={title}
        intro="Start with a pixel-pitch series or a solution family. Every display is configured to your wall, your audience and your site — and installed and supported by our team."
      />
      <Section label="Product catalogue">
        <GroupLabel component="h2">Pixel-pitch series</GroupLabel>
        <CardGrid min={240}>
          {seriesProducts.map((p, i) => (
            <Reveal key={p.slug} delay={i * 60}>
              <ProductCard product={p} />
            </Reveal>
          ))}
        </CardGrid>
        <Box sx={{ mt: { xs: 8, md: 12 } }}>
          <GroupLabel component="h2">Solution families</GroupLabel>
          <CardGrid min={340}>
            {categoryProducts.map((p, i) => (
              <Reveal key={p.slug} delay={(i % 3) * 60}>
                <ProductCard product={p} />
              </Reveal>
            ))}
          </CardGrid>
        </Box>
      </Section>
      <CtaBand title="Not sure which display you need?" body="Share the space, the audience distance and what it should show. We’ll recommend a pitch and configuration — and explain why." />
    </>
  )
}
