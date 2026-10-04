import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { useEffect, useRef } from 'react'
import { Reveal } from '../../components/ui/Reveal'
import { Section, SectionHeader } from '../../components/ui/Section'
import { processSteps } from '../../content/services'
import { prefersReducedMotion } from '../../lib/motion'
import { HEADER_HEIGHT } from '../../theme/breakpoints'
import { cssVar } from '../../theme/cssVars'

/** Writes scroll progress through the element (0–1) to the --progress custom property. */
function useScrollProgress<T extends HTMLElement>() {
  const ref = useRef<T>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (prefersReducedMotion()) {
      el.style.setProperty('--progress', '1')
      return
    }
    let frame = 0
    const update = () => {
      frame = 0
      const rect = el.getBoundingClientRect()
      const progress = Math.min(1, Math.max(0, (window.innerHeight * 0.6 - rect.top) / rect.height))
      el.style.setProperty('--progress', progress.toFixed(3))
    }
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  return ref
}

/** The nine-step delivery process with a subtle scroll-driven progress line. */
export function ProcessSection({ tone = 'default' }: { tone?: 'default' | 'raised' }) {
  const listRef = useScrollProgress<HTMLOListElement>()

  return (
    <Section id="process" tone={tone} labelledBy="process-title">
      <Box sx={{ display: 'grid', gap: { md: 8 }, gridTemplateColumns: { xs: '1fr', md: '1fr 1.2fr' }, alignItems: 'start' }}>
        <Box sx={{ position: { md: 'sticky' }, top: { md: HEADER_HEIGHT + 48 } }}>
          <SectionHeader
            id="process-title"
            stacked
            eyebrow="Installation process"
            title="Nine steps. No surprises."
            intro="A clear sequence with accountable sign-off at every stage — from first conversation to long-term support."
          />
        </Box>
        <Box
          component="ol"
          ref={listRef}
          sx={{
            '--progress': 0,
            position: 'relative',
            listStyle: 'none',
            m: 0,
            pl: 4,
            '&::before, &::after': { content: '""', position: 'absolute', left: 0, top: 0, width: '1px' },
            '&::before': { bottom: 0, bgcolor: 'brand.lineStrong' },
            '&::after': { height: 'calc(var(--progress) * 100%)', bgcolor: 'primary.main', boxShadow: `0 0 10px ${cssVar.glow}` },
          }}
        >
          {processSteps.map((step) => (
            <Reveal as="li" key={step.number}>
              <Box sx={{ position: 'relative', display: 'grid', gridTemplateColumns: '3rem 1fr', gap: 2, py: 2.5, borderBottom: 1, borderColor: 'divider' }}>
                <Box
                  aria-hidden="true"
                  sx={{ position: 'absolute', left: -35, top: 30, width: 7, height: 7, bgcolor: 'background.default', border: 1, borderColor: 'brand.lineStrong' }}
                />
                <Typography variant="mono" sx={{ color: 'primary.main', pt: 0.5 }}>
                  {step.number}
                </Typography>
                <div>
                  <Typography variant="h3" component="h3" sx={{ mb: 0.5 }}>
                    {step.title}
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary', maxWidth: '48ch' }}>
                    {step.summary}
                  </Typography>
                </div>
              </Box>
            </Reveal>
          ))}
        </Box>
      </Box>
    </Section>
  )
}
