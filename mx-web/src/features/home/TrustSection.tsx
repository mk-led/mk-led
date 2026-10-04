import Box from '@mui/material/Box'
import Link from '@mui/material/Link'
import Typography from '@mui/material/Typography'
import { Clock, Headset, Ruler, Wrench, type LucideIcon } from 'lucide-react'
import { Reveal } from '../../components/ui/Reveal'
import { Section, SectionHeader } from '../../components/ui/Section'
import { trust } from '../../content/site'
import { cssVar } from '../../theme/cssVars'

const icons: LucideIcon[] = [Wrench, Ruler, Headset, Clock]

export function TrustSection() {
  return (
    <Section id="experience" className="pixel-grid" labelledBy="trust-title">
      <SectionHeader id="trust-title" eyebrow={trust.eyebrow} title={trust.headline} intro={trust.intro} />
      <Box sx={{ display: 'grid', borderTop: 1, borderColor: 'brand.lineStrong', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', lg: '2fr repeat(4, 1fr)' } }}>
        <Reveal>
          <Box sx={{ py: 4, pr: { lg: 4 }, gridColumn: { sm: '1 / -1', lg: 'auto' }, borderBottom: { xs: 1, lg: 0 }, borderColor: 'divider' }}>
            <Typography
              component="p"
              sx={{ fontSize: 'clamp(4.5rem, 3rem + 7vw, 9rem)', fontWeight: 600, lineHeight: 0.85, letterSpacing: '-0.06em', textShadow: `0 0 48px ${cssVar.glow}` }}
            >
              {trust.lead.value}
            </Typography>
            <Typography variant="h4" component="h3" sx={{ mt: 2 }}>
              {trust.lead.label}
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary', mt: 1, maxWidth: '32ch' }}>
              {trust.lead.detail}
            </Typography>
          </Box>
        </Reveal>
        {trust.pillars.map((p, i) => {
          const Icon = icons[i] ?? Wrench
          return (
            <Reveal key={p.label} delay={(i + 1) * 70}>
              <Box
                sx={{
                  position: 'relative',
                  height: '100%',
                  py: 4,
                  pl: { sm: i % 2 ? 3 : 0, lg: 3 },
                  borderLeft: { sm: i % 2 ? 1 : 0, lg: 1 },
                  borderBottom: { xs: 1, lg: 0 },
                  borderColor: 'divider',
                  '&:hover a': { color: 'primary.main' },
                }}
              >
                <Box sx={{ color: 'primary.main', mb: 2 }}>
                  <Icon size={22} strokeWidth={1.5} aria-hidden="true" />
                </Box>
                <Typography variant="h4" component="h3">
                  <Link href={p.to} underline="none" color="inherit" sx={{ '&::after': { content: '""', position: 'absolute', inset: 0 } }}>
                    {p.label}
                  </Link>
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary', mt: 1 }}>
                  {p.detail}
                </Typography>
              </Box>
            </Reveal>
          )
        })}
      </Box>
    </Section>
  )
}
