import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { LedWall } from '../../components/media/LedWall'
import { ArrowButton } from '../../components/ui/ArrowButton'
import { hero } from '../../content/site'
import { useReducedMotion } from '../../lib/motion'
import { HEADER_HEIGHT } from '../../theme/breakpoints'
import { media } from '../../theme/colors'
import { cssVar } from '../../theme/cssVars'

const facts = ['P2 – P4 pixel-pitch series', 'Indoor & outdoor LED walls', 'Design · Fabricate · Install · Support']

/**
 * Cinematic hero. Phones: LED visual on top, then headline and actions — content starts
 * within the first screen. Desktop: the LED wall fills the band behind the text.
 */
export function Hero() {
  const reducedMotion = useReducedMotion()

  return (
    <Box component="section" data-theme="dark" aria-labelledby="hero-title" sx={{ position: 'relative', isolation: 'isolate', overflow: 'hidden' }}>
      <Box
        sx={{
          position: { xs: 'relative', md: 'absolute' },
          inset: { md: 0 },
          zIndex: -1,
          height: { xs: `calc(${HEADER_HEIGHT}px + clamp(12rem, 38svh, 20rem))`, md: 'auto' },
          bgcolor: media.black,
          '&::after': {
            content: '""',
            position: 'absolute',
            inset: 0,
            background: {
              xs: 'linear-gradient(180deg, rgba(8,9,11,0.75) 0%, rgba(8,9,11,0) 30%, rgba(8,9,11,0) 60%, rgba(8,9,11,1) 100%)',
              md: 'linear-gradient(180deg, rgba(8,9,11,0.8) 0%, rgba(8,9,11,0) 9rem), linear-gradient(90deg, rgba(8,9,11,0.94) 0%, rgba(8,9,11,0.62) 40%, rgba(8,9,11,0) 72%), linear-gradient(0deg, rgba(8,9,11,0.95) 0%, rgba(8,9,11,0) 30%)',
            },
          },
        }}
      >
        {hero.video && !reducedMotion ? (
          <Box component="video" src={hero.video.src} poster={hero.video.poster} autoPlay muted loop playsInline aria-hidden="true" sx={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        ) : (
          <LedWall />
        )}
      </Box>

      <Container
        sx={{
          display: 'flex',
          alignItems: 'flex-end',
          minHeight: { md: 'min(92svh, 60rem)' },
          pt: { xs: 0, md: `calc(${HEADER_HEIGHT}px + 4rem)` },
          pb: { xs: 5, md: 8 },
          mt: { xs: -6, md: 0 },
        }}
      >
        <Stack spacing={{ xs: 2.5, md: 3 }} sx={{ maxWidth: 820 }}>
          <Typography variant="overline" component="p" sx={{ color: 'text.secondary', display: 'flex', alignItems: 'center', gap: 1.5 }}>
            <Box component="span" aria-hidden="true" sx={{ width: 6, height: 6, bgcolor: 'primary.main', boxShadow: `0 0 12px ${cssVar.glow}` }} />
            {hero.eyebrow}
          </Typography>
          <Typography id="hero-title" variant="display" component="h1" sx={{ maxWidth: '11ch' }}>
            {hero.headline}
          </Typography>
          <Typography variant="lead" component="p" sx={{ color: 'text.secondary', maxWidth: '46ch' }}>
            {hero.supporting}
          </Typography>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5} sx={{ pt: 1 }}>
            <ArrowButton href={hero.primaryCta.to} size="large">
              {hero.primaryCta.label}
            </ArrowButton>
            <ArrowButton href={hero.secondaryCta.to} size="large" variant="outlined">
              {hero.secondaryCta.label}
            </ArrowButton>
          </Stack>
        </Stack>
      </Container>

      <Box sx={{ borderTop: 1, borderColor: 'divider', bgcolor: 'rgba(8,9,11,0.55)' }}>
        <Container component="ul" sx={{ listStyle: 'none', m: '0 auto', display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' } }}>
          {facts.map((fact, i) => (
            <Typography
              component="li"
              variant="mono"
              key={fact}
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1.5,
                py: 2,
                color: 'text.secondary',
                borderTop: { xs: i ? 1 : 0, md: 0 },
                borderLeft: { md: i ? 1 : 0 },
                borderColor: 'divider',
                pl: { md: i ? 3 : 0 },
              }}
            >
              <Box component="span" aria-hidden="true" sx={{ width: 4, height: 4, bgcolor: 'primary.main', flex: 'none' }} />
              {fact}
            </Typography>
          ))}
        </Container>
      </Box>
    </Box>
  )
}
