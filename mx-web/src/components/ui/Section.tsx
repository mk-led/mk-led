import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import type { SxProps, Theme } from '@mui/material/styles'
import type { ReactNode } from 'react'
import { Reveal } from './Reveal'

interface SectionProps {
  id?: string
  /** Force a colour scheme for this section regardless of the site mode. */
  scheme?: 'dark' | 'light'
  tone?: 'default' | 'raised'
  /** Accessible name when the section has no visible heading. */
  label?: string
  /** id of the heading that names this section. */
  labelledBy?: string
  className?: string
  sx?: SxProps<Theme>
  children: ReactNode
}

/** Full-width band with consistent vertical rhythm and a hairline separator. */
export function Section({ id, scheme, tone = 'default', label, labelledBy, className, sx, children }: SectionProps) {
  return (
    <Box
      component="section"
      id={id}
      data-theme={scheme}
      aria-label={label}
      aria-labelledby={labelledBy}
      className={className}
      sx={[
        {
          position: 'relative',
          py: 'clamp(3.5rem, 2.5rem + 5vw, 8rem)',
          borderTop: 1,
          borderColor: 'divider',
          bgcolor: tone === 'raised' ? 'brand.raised' : 'background.default',
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    >
      <Container>{children}</Container>
    </Box>
  )
}

interface SectionHeaderProps {
  eyebrow: string
  title: ReactNode
  intro?: ReactNode
  /** Heading level. Pages own the single h1; sections default to h2. */
  as?: 'h1' | 'h2'
  id?: string
  actions?: ReactNode
  /** Stack eyebrow above title at every width (for narrow columns). */
  stacked?: boolean
}

/** Eyebrow + headline + intro, laid out on an architectural two-column grid from md up. */
export function SectionHeader({ eyebrow, title, intro, as = 'h2', id, actions, stacked = false }: SectionHeaderProps) {
  return (
    <Reveal>
      <Box
        sx={{
          display: 'grid',
          gap: { xs: 2, md: stacked ? 2 : 4 },
          gridTemplateColumns: stacked ? '1fr' : { xs: '1fr', md: 'minmax(12rem, 1fr) 3fr' },
          mb: 'clamp(2.5rem, 1.5rem + 3vw, 5rem)',
        }}
      >
        <Typography variant="overline" component="p" sx={{ color: 'text.secondary', display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <Box component="span" aria-hidden="true" sx={{ width: 6, height: 6, bgcolor: 'primary.main', flex: 'none' }} />
          {eyebrow}
        </Typography>
        <Stack spacing={2.5}>
          <Typography id={id} variant={as === 'h1' ? 'h1' : 'h2'} component={as} sx={{ maxWidth: '20ch' }}>
            {title}
          </Typography>
          {intro && (
            <Typography variant="lead" component="p" sx={{ color: 'text.secondary', maxWidth: '62ch' }}>
              {intro}
            </Typography>
          )}
          {actions && (
            <Stack direction="row" useFlexGap sx={{ flexWrap: 'wrap', gap: 2, pt: 0.5 }}>
              {actions}
            </Stack>
          )}
        </Stack>
      </Box>
    </Reveal>
  )
}

/** Mono label used above lists and groups inside a section. */
export function GroupLabel({ children, component = 'h3' }: { children: ReactNode; component?: 'h2' | 'h3' | 'p' }) {
  return (
    <Typography
      variant="overline"
      component={component}
      sx={{ display: 'block', color: 'text.secondary', pb: 1.5, mb: 3, borderBottom: 1, borderColor: 'brand.lineStrong' }}
    >
      {children}
    </Typography>
  )
}
