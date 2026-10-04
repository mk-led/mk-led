import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Link from '@mui/material/Link'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { ImageCaption, ResponsiveImage } from '../../components/media/ResponsiveImage'
import { ArrowButton } from '../../components/ui/ArrowButton'
import { Reveal } from '../../components/ui/Reveal'
import { GroupLabel, Section, SectionHeader } from '../../components/ui/Section'
import { images } from '../../content/images'
import { getProduct } from '../../content/products'
import { paths } from '../../routes/paths'
import { HEADER_HEIGHT } from '../../theme/breakpoints'

const indoor = getProduct('indoor-led-displays')!
const outdoor = getProduct('outdoor-led-displays')!

/** Indoor LED walls: applications list beside a pixel-level photograph. */
export function IndoorSection() {
  return (
    <Section id="indoor" labelledBy="indoor-title">
      <SectionHeader
        id="indoor-title"
        eyebrow="Indoor LED"
        title="Indoor LED Walls"
        intro={indoor.intro}
        actions={<ArrowButton href={paths.product(indoor.slug)}>Explore Indoor LED</ArrowButton>}
      />
      <Box sx={{ display: 'grid', gap: { xs: 5, md: 8 }, gridTemplateColumns: { xs: '1fr', md: '1.2fr 1fr' }, alignItems: 'start' }}>
        <Reveal>
          <Box component="figure" sx={{ m: 0, position: { md: 'sticky' }, top: { md: HEADER_HEIGHT + 32 } }}>
            <ResponsiveImage image={images.pixelCloseup} ratio="4 / 3" sizes="(min-width: 900px) 55vw, 100vw" />
            <ImageCaption image={images.pixelCloseup} />
          </Box>
        </Reveal>
        <div>
          <GroupLabel>Applications</GroupLabel>
          <Box component="ul" sx={{ listStyle: 'none', p: 0, m: 0 }}>
            {indoor.application.map((app) => (
              <Typography component="li" key={app} sx={{ py: 1.75, borderBottom: 1, borderColor: 'divider', fontSize: 'clamp(1.125rem, 1rem + 0.6vw, 1.5rem)', letterSpacing: '-0.02em' }}>
                {app}
              </Typography>
            ))}
          </Box>
        </div>
      </Box>
    </Section>
  )
}

/** Outdoor LED walls: full-bleed, always-dark cinematic band. */
export function OutdoorBand() {
  return (
    <Box component="section" id="outdoor" data-theme="dark" aria-labelledby="outdoor-title" sx={{ position: 'relative', isolation: 'isolate', overflow: 'hidden', borderTop: 1, borderColor: 'divider' }}>
      <Box sx={{ position: 'absolute', inset: 0, zIndex: -1 }} aria-hidden="true">
        <ResponsiveImage image={images.outdoorNight} sizes="100vw" sx={{ height: '100%' }} objectPosition="70% center" />
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            background: {
              xs: 'linear-gradient(0deg, rgba(8,9,11,1) 0%, rgba(8,9,11,0.88) 55%, rgba(8,9,11,0.55) 100%)',
              md: 'linear-gradient(90deg, rgba(8,9,11,0.95) 0%, rgba(8,9,11,0.7) 45%, rgba(8,9,11,0.2) 100%), linear-gradient(0deg, rgba(8,9,11,1) 0%, rgba(8,9,11,0) 40%)',
            },
          }}
        />
      </Box>
      <Container sx={{ py: 'clamp(4.5rem, 3rem + 7vw, 11rem)' }}>
        <Reveal>
          <Stack spacing={3} sx={{ maxWidth: 720, mb: { xs: 6, md: 10 } }}>
            <Typography variant="overline" component="p" sx={{ color: 'text.secondary' }}>
              Outdoor LED
            </Typography>
            <Typography id="outdoor-title" variant="display" component="h2" sx={{ maxWidth: '10ch', fontSize: 'clamp(2.5rem, 1.4rem + 4.6vw, 5.5rem)' }}>
              Outdoor LED Walls
            </Typography>
            <Typography variant="lead" component="p" sx={{ color: 'text.secondary', maxWidth: '52ch' }}>
              {outdoor.intro}
            </Typography>
            <Box component="ul" aria-label="Outdoor applications" sx={{ listStyle: 'none', p: 0, m: 0, display: 'flex', flexWrap: 'wrap', columnGap: 1.5, rowGap: 0.5, color: 'text.secondary' }}>
              {outdoor.application.map((a, i) => (
                <Typography component="li" variant="body2" key={a}>
                  {a}
                  {i < outdoor.application.length - 1 && (
                    <Box component="span" aria-hidden="true" sx={{ ml: 1.5, color: 'brand.subtle' }}>
                      /
                    </Box>
                  )}
                </Typography>
              ))}
            </Box>
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5}>
              <ArrowButton href={paths.product(outdoor.slug)} size="large">
                Explore Outdoor LED
              </ArrowButton>
              <ArrowButton href={paths.requestQuote} size="large" variant="outlined">
                Request a Quote
              </ArrowButton>
            </Stack>
          </Stack>
        </Reveal>

        <Box component="ul" sx={{ listStyle: 'none', p: 0, m: 0, display: 'grid', columnGap: 4, gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', lg: 'repeat(4, 1fr)' }, borderTop: 1, borderColor: 'brand.lineStrong' }}>
          {outdoor.considerations.map((c, i) => (
            <Reveal as="li" key={c.title} delay={i * 60}>
              <Box sx={{ py: 3, borderBottom: { xs: 1, lg: 0 }, borderColor: 'divider' }}>
                <Typography variant="h4" component="h3" sx={{ mb: 1 }}>
                  {c.title}
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  {c.body}
                </Typography>
              </Box>
            </Reveal>
          ))}
        </Box>
        <Typography variant="caption" component="p" sx={{ mt: 3, color: 'brand.subtle' }}>
          Background: representative image · Photo: {images.outdoorNight.credit.author}, {images.outdoorNight.credit.license}.{' '}
          <Link href={images.outdoorNight.credit.sourceUrl} color="inherit" target="_blank" rel="noopener noreferrer nofollow">
            Source
          </Link>
        </Typography>
      </Container>
    </Box>
  )
}
