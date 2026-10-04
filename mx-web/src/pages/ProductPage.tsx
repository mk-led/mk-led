import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { useParams } from 'react-router'
import { ArrowButton } from '../components/ui/ArrowButton'
import { CheckList, SplitLayout, TitledTextGrid } from '../components/ui/ContentBlocks'
import { CtaBand } from '../components/ui/CtaBand'
import { FaqList } from '../components/ui/FaqList'
import { CardGrid } from '../components/ui/LinkCard'
import { PageHeader } from '../components/ui/PageHeader'
import { RelatedLinks } from '../components/ui/RelatedLinks'
import { GroupLabel, Section, SectionHeader } from '../components/ui/Section'
import { minimumViewingDistance } from '../content/pitch'
import { getProduct, products } from '../content/products'
import { getService } from '../content/services'
import { getSolution } from '../content/solutions'
import { site } from '../content/site'
import { ProductCard, ProductVisual } from '../features/products/ProductCard'
import { environmentLabel } from '../features/products/productMeta'
import { paths, quotePath } from '../routes/paths'
import { SEO } from '../seo/SEO'
import NotFoundPage from './NotFoundPage'

const TO_CONFIRM = 'Confirmed during design'

export default function ProductPage() {
  const { slug = '' } = useParams()
  const product = getProduct(slug)
  if (!product) return <NotFoundPage />

  const path = paths.product(product.slug)
  const crumbs = [
    { name: 'Products', path: paths.products },
    { name: product.name, path },
  ]
  const specs: { label: string; value: string; note?: string; pending?: boolean }[] = [
    ...(product.pixelPitch !== null ? [{ label: 'Pixel pitch', value: `${product.pixelPitch} mm` }] : []),
    { label: 'Environment', value: environmentLabel(product), pending: !product.environment },
    {
      label: 'Viewing distance',
      value: product.viewingDistance ?? TO_CONFIRM,
      pending: !product.viewingDistance,
      note:
        !product.viewingDistance && product.pixelPitch !== null
          ? `General rule of thumb: looks smooth from about ${minimumViewingDistance(product.pixelPitch)} m and beyond.`
          : undefined,
    },
    { label: 'Brightness, refresh rate, cabinet', value: TO_CONFIRM, pending: true, note: 'Specified for your site and confirmed against the product datasheet in your proposal.' },
    { label: 'Applications', value: product.application.join(', ') },
  ]
  const relatedProducts = products.filter((p) => p.slug !== product.slug && p.kind === product.kind).slice(0, 3)
  const solutionLinks = product.relatedSolutions.map(getSolution).filter((s) => !!s)
  const serviceLinks = product.relatedServices.map(getService).filter((s) => !!s)

  return (
    <>
      <SEO
        title={product.kind === 'series' ? `${product.title} | Pixel Pitch ${product.pixelPitch} mm` : product.title}
        description={product.description}
        path={path}
        breadcrumbs={crumbs}
        pageType="ItemPage"
      />
      <PageHeader
        breadcrumbs={crumbs}
        eyebrow={product.kind === 'series' ? 'Pixel-pitch series' : 'LED solution'}
        title={product.title}
        intro={product.description}
        actions={
          <>
            <ArrowButton href={quotePath(product.slug)} size="large">
              Request a Quote
            </ArrowButton>
            <ArrowButton href={paths.pixelPitchGuide} size="large" variant="outlined">
              Compare pixel pitches
            </ArrowButton>
          </>
        }
        aside={<ProductVisual product={product} priority caption sizes="(min-width: 900px) 45vw, 100vw" />}
      />

      <Section labelledBy="what-title">
        <SplitLayout
          main={
            <Stack spacing={6}>
              <div>
                <Typography id="what-title" variant="h2" sx={{ mb: 3 }}>
                  {product.kind === 'series' ? `What is a ${product.name}?` : `What are ${product.name}?`}
                </Typography>
                <Typography variant="lead" component="p" sx={{ color: 'text.secondary' }}>
                  {product.intro}
                </Typography>
              </div>
              <div>
                <GroupLabel component="h2">Specifications</GroupLabel>
                <Box component="dl" sx={{ m: 0 }}>
                  {specs.map((s) => (
                    <Box key={s.label} sx={{ display: 'grid', gap: { xs: 0.5, sm: 3 }, gridTemplateColumns: { xs: '1fr', sm: '12rem 1fr' }, py: 2, borderBottom: 1, borderColor: 'divider' }}>
                      <Typography component="dt" variant="overline" sx={{ color: 'brand.subtle', fontSize: '0.6875rem' }}>
                        {s.label}
                      </Typography>
                      <Box component="dd" sx={{ m: 0, display: 'grid', gap: 0.5 }}>
                        <Typography sx={s.pending ? { color: 'text.secondary', fontStyle: 'italic' } : undefined}>{s.value}</Typography>
                        {s.note && (
                          <Typography variant="caption" sx={{ color: 'brand.subtle' }}>
                            {s.note}
                          </Typography>
                        )}
                      </Box>
                    </Box>
                  ))}
                </Box>
              </div>
            </Stack>
          }
          aside={
            <Stack spacing={5}>
              <div>
                <GroupLabel component="h2">Included with every {site.name} display</GroupLabel>
                <CheckList items={product.features} />
              </div>
              <RelatedLinks title="Related services" links={serviceLinks.map((s) => ({ href: paths.service(s.slug), label: s.title, description: s.summary }))} />
            </Stack>
          }
        />
      </Section>

      <Section tone="raised" labelledBy="considerations-title">
        <SectionHeader id="considerations-title" eyebrow="Planning" title="What to consider" />
        <TitledTextGrid items={product.considerations} columns={product.considerations.length === 4 ? 4 : 3} />
        {solutionLinks.length > 0 && (
          <Box sx={{ mt: 8, maxWidth: 720 }}>
            <RelatedLinks title="Where it is used" links={solutionLinks.map((s) => ({ href: paths.solution(s.slug), label: s.title, description: s.description }))} />
          </Box>
        )}
      </Section>

      {product.faqs.length > 0 && (
        <Section labelledBy="faq-title">
          <SectionHeader id="faq-title" eyebrow="FAQ" title={`${product.name}: common questions`} />
          <FaqList faqs={product.faqs} />
        </Section>
      )}

      <Section tone={product.faqs.length ? 'raised' : 'default'} labelledBy="related-title">
        <SectionHeader id="related-title" eyebrow="Related" title="You may also consider" />
        <CardGrid min={260}>
          {relatedProducts.map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </CardGrid>
      </Section>

      <CtaBand title={`Interested in ${product.name}?`} productSlug={product.slug} />
    </>
  )
}
