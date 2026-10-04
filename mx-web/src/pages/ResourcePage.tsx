import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { useParams } from 'react-router'
import { CtaBand } from '../components/ui/CtaBand'
import { FaqList } from '../components/ui/FaqList'
import { PageHeader } from '../components/ui/PageHeader'
import { RelatedLinks } from '../components/ui/RelatedLinks'
import { Section } from '../components/ui/Section'
import { getProduct } from '../content/products'
import { getArticle } from '../content/resources'
import { getService } from '../content/services'
import { site } from '../content/site'
import { PitchExplainer } from '../features/pitch/PitchExplainer'
import { paths } from '../routes/paths'
import { SEO } from '../seo/SEO'
import { articleSchema } from '../seo/schemas'
import NotFoundPage from './NotFoundPage'

const dateFormat = new Intl.DateTimeFormat('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })

export default function ResourcePage() {
  const { slug = '' } = useParams()
  const article = getArticle(slug)
  if (!article) return <NotFoundPage />

  const path = paths.resource(article.slug)
  const crumbs = [
    { name: 'Resources', path: paths.resources },
    { name: article.title.split(':')[0]!, path },
  ]
  const products = article.relatedProducts.map(getProduct).filter((p) => !!p)
  const services = article.relatedServices.map(getService).filter((s) => !!s)

  return (
    <>
      <SEO title={article.title} description={article.description} path={path} breadcrumbs={crumbs} ogType="article" structuredData={[articleSchema(article, path)]} />
      <PageHeader breadcrumbs={crumbs} eyebrow="Guide" title={article.title} intro={article.description} />

      <Section label="Guide">
        <Box sx={{ display: 'grid', gap: { xs: 6, md: 10 }, gridTemplateColumns: { xs: '1fr', md: 'minmax(0, 1.6fr) minmax(0, 1fr)' }, alignItems: 'start' }}>
          <Box component="article" sx={{ minWidth: 0 }}>
            <Typography variant="mono" component="p" sx={{ color: 'brand.subtle', mb: 3 }}>
              By {site.name} · Updated <time dateTime={article.updated}>{dateFormat.format(new Date(article.updated))}</time>
            </Typography>
            {/* Answer first: the key point in one paragraph. */}
            <Box sx={{ p: { xs: 2.5, sm: 3 }, mb: 6, borderLeft: 2, borderColor: 'primary.main', bgcolor: 'brand.accentSoft' }}>
              <Typography variant="overline" component="p" sx={{ color: 'primary.main', mb: 1 }}>
                In short
              </Typography>
              <Typography variant="lead" component="p">
                {article.summary}
              </Typography>
            </Box>

            <Stack spacing={6}>
              {article.sections.map((section) => (
                <Box component="section" key={section.heading}>
                  <Typography variant="h2" sx={{ fontSize: 'clamp(1.5rem, 1.25rem + 1.2vw, 2.25rem)', mb: 2 }}>
                    {section.heading}
                  </Typography>
                  <Stack spacing={2} sx={{ color: 'text.secondary', maxWidth: '70ch' }}>
                    {section.paragraphs.map((p) => (
                      <Typography key={p}>{p}</Typography>
                    ))}
                    {section.list && (
                      <Box component="ul" sx={{ pl: 2.5, m: 0, display: 'grid', gap: 1 }}>
                        {section.list.map((item) => (
                          <Typography component="li" key={item}>
                            {item}
                          </Typography>
                        ))}
                      </Box>
                    )}
                  </Stack>
                </Box>
              ))}

              {article.slug === 'led-pixel-pitch-guide' && (
                <Box component="section">
                  <Typography variant="h2" sx={{ fontSize: 'clamp(1.5rem, 1.25rem + 1.2vw, 2.25rem)', mb: 3 }}>
                    Compare P2, P2.5, P3 and P4
                  </Typography>
                  <PitchExplainer />
                </Box>
              )}

              {article.faqs.length > 0 && (
                <Box component="section">
                  <Typography variant="h2" sx={{ fontSize: 'clamp(1.5rem, 1.25rem + 1.2vw, 2.25rem)', mb: 3 }}>
                    Frequently asked questions
                  </Typography>
                  <FaqList faqs={article.faqs} />
                </Box>
              )}
            </Stack>
          </Box>

          <Stack component="aside" spacing={5} sx={{ position: { md: 'sticky' }, top: { md: 104 }, minWidth: 0 }}>
            <RelatedLinks title="Related products" links={products.map((p) => ({ href: paths.product(p.slug), label: p.name }))} />
            <RelatedLinks title="Related services" links={services.map((s) => ({ href: paths.service(s.slug), label: s.title }))} />
          </Stack>
        </Box>
      </Section>

      <CtaBand />
    </>
  )
}
