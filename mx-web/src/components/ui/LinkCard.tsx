import Box from '@mui/material/Box'
import Link from '@mui/material/Link'
import Typography from '@mui/material/Typography'
import { ArrowUpRight } from 'lucide-react'
import type { ReactNode } from 'react'
import { cssVar } from '../../theme/cssVars'

interface LinkCardProps {
  href: string
  title: string
  description?: string
  meta?: string
  media?: ReactNode
  headingLevel?: 'h2' | 'h3' | 'h4'
  children?: ReactNode
}

/**
 * Card whose whole surface is clickable through the heading link's stretched hit area,
 * so there is exactly one link per card for screen readers and crawlers.
 */
export function LinkCard({ href, title, description, meta, media, headingLevel = 'h3', children }: LinkCardProps) {
  return (
    <Box
      component="article"
      sx={{
        position: 'relative',
        display: 'grid',
        alignContent: 'start',
        gap: 2,
        height: '100%',
        '& .media img, & .media svg': { transition: 'transform 1.2s cubic-bezier(0.22, 1, 0.36, 1)' },
        '&:hover .media img, &:hover .media svg': { transform: 'scale(1.03)' },
        '&:hover .card-arrow': { color: 'primary.main', transform: 'translate(2px, -2px)' },
        '&:has(a:focus-visible)': { outline: `2px solid ${cssVar.primary}`, outlineOffset: 4 },
      }}
    >
      {media && <Box className="media">{media}</Box>}
      <Box sx={{ display: 'grid', gap: 1.25 }}>
        {meta && (
          <Typography variant="overline" component="p" sx={{ color: 'primary.main', letterSpacing: '0.08em' }}>
            {meta}
          </Typography>
        )}
        <Typography variant="h3" component={headingLevel} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 2 }}>
          <Link
            href={href}
            underline="none"
            color="inherit"
            sx={{ '&::after': { content: '""', position: 'absolute', inset: 0 }, '&:focus-visible': { outline: 'none' } }}
          >
            {title}
          </Link>
          <Box className="card-arrow" sx={{ flex: 'none', display: 'grid', color: 'brand.subtle', transition: 'transform 260ms, color 260ms' }}>
            <ArrowUpRight size={20} strokeWidth={1.5} aria-hidden="true" />
          </Box>
        </Typography>
        {description && (
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            {description}
          </Typography>
        )}
        {children}
      </Box>
    </Box>
  )
}

/** Responsive auto-fit grid: 1 column on phones, up to 4 on wide screens. */
export function CardGrid({ children, min = 280 }: { children: ReactNode; min?: number }) {
  return (
    <Box sx={{ display: 'grid', gap: { xs: 5, md: 4 }, columnGap: 3, gridTemplateColumns: `repeat(auto-fit, minmax(min(${min}px, 100%), 1fr))` }}>
      {children}
    </Box>
  )
}
