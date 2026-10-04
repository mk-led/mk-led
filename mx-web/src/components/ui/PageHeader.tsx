import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import MuiBreadcrumbs from '@mui/material/Breadcrumbs'
import Link from '@mui/material/Link'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import type { ReactNode } from 'react'
import type { Crumb } from '../../seo/schemas'
import { HEADER_HEIGHT } from '../../theme/breakpoints'

interface PageHeaderProps {
  eyebrow: string
  title: ReactNode
  intro?: ReactNode
  actions?: ReactNode
  /** Trail excluding Home; the last item is the current page. */
  breadcrumbs?: Crumb[]
  /** Optional visual shown beside the text on wide screens. */
  aside?: ReactNode
}

/** Top of every interior page: breadcrumbs, the page's single h1, intro and primary actions. */
export function PageHeader({ eyebrow, title, intro, actions, breadcrumbs, aside }: PageHeaderProps) {
  return (
    <Box
      component="header"
      className="pixel-grid"
      sx={{ pt: `calc(${HEADER_HEIGHT}px + clamp(2rem, 1rem + 4vw, 5rem))`, pb: 'clamp(2.5rem, 1.5rem + 4vw, 5.5rem)', borderBottom: 1, borderColor: 'divider' }}
    >
      <Container>
        <Box sx={{ display: 'grid', gap: { xs: 4, md: 6 }, gridTemplateColumns: aside ? { xs: '1fr', md: '1.1fr 1fr' } : '1fr', alignItems: 'center' }}>
          <Stack spacing={2.5}>
            {breadcrumbs && <Breadcrumbs items={breadcrumbs} />}
            <Typography variant="overline" component="p" sx={{ color: 'primary.main' }}>
              {eyebrow}
            </Typography>
            <Typography variant="h1" sx={{ maxWidth: '18ch' }}>
              {title}
            </Typography>
            {intro && (
              <Typography variant="lead" component="p" sx={{ color: 'text.secondary', maxWidth: '60ch' }}>
                {intro}
              </Typography>
            )}
            {actions && (
              <Stack direction="row" useFlexGap sx={{ flexWrap: 'wrap', gap: 1.5, pt: 1 }}>
                {actions}
              </Stack>
            )}
          </Stack>
          {aside}
        </Box>
      </Container>
    </Box>
  )
}

export function Breadcrumbs({ items }: { items: Crumb[] }) {
  const trail = [{ name: 'Home', path: '/' }, ...items]
  return (
    <MuiBreadcrumbs aria-label="Breadcrumb" separator="/">
      {trail.map((c, i) =>
        i === trail.length - 1 ? (
          <Typography key={c.path} variant="overline" aria-current="page" sx={{ letterSpacing: '0.08em', color: 'text.primary' }}>
            {c.name}
          </Typography>
        ) : (
          <Link key={c.path} href={c.path} color="inherit" underline="hover" sx={{ py: 1 }}>
            {c.name}
          </Link>
        ),
      )}
    </MuiBreadcrumbs>
  )
}
