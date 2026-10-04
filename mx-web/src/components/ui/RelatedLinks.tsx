import Box from '@mui/material/Box'
import Link from '@mui/material/Link'
import Typography from '@mui/material/Typography'
import { ArrowRight } from 'lucide-react'
import { GroupLabel } from './Section'

export interface RelatedLink {
  href: string
  label: string
  description?: string
}

/** Contextual internal links ("Related products", "Related services") as a simple list. */
export function RelatedLinks({ title, links }: { title: string; links: RelatedLink[] }) {
  if (links.length === 0) return null
  return (
    <Box component="nav" aria-label={title}>
      <GroupLabel component="h2">{title}</GroupLabel>
      <Box component="ul" sx={{ listStyle: 'none', p: 0, m: 0 }}>
        {links.map((l) => (
          <Box component="li" key={l.href} sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Link
              href={l.href}
              underline="none"
              color="inherit"
              sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 2, minHeight: 56, py: 1.5, '&:hover': { color: 'primary.main' } }}
            >
              <Box>
                <Typography variant="h4" component="span" sx={{ display: 'block' }}>
                  {l.label}
                </Typography>
                {l.description && (
                  <Typography variant="body2" component="span" sx={{ display: 'block', color: 'text.secondary', mt: 0.5 }}>
                    {l.description}
                  </Typography>
                )}
              </Box>
              <ArrowRight size={18} aria-hidden="true" style={{ flex: 'none' }} />
            </Link>
          </Box>
        ))}
      </Box>
    </Box>
  )
}
