import Box from '@mui/material/Box'
import Link from '@mui/material/Link'
import Typography from '@mui/material/Typography'
import { ArrowUpRight } from 'lucide-react'
import { Reveal } from '../../components/ui/Reveal'
import type { Service } from '../../content/types'
import { paths } from '../../routes/paths'

/** Ruled grid of services; each cell links to its service page. */
export function ServiceCards({ items, headingLevel = 'h3' }: { items: Service[]; headingLevel?: 'h2' | 'h3' }) {
  return (
    <Box
      component="ul"
      sx={{
        listStyle: 'none',
        p: 0,
        m: 0,
        display: 'grid',
        gap: '1px',
        bgcolor: 'divider',
        borderBlock: 1,
        borderColor: 'divider',
        gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)' },
      }}
    >
      {items.map((s, i) => (
        <Reveal as="li" key={s.slug} delay={(i % 3) * 60} style={{ display: 'flex' }}>
          <Box
            sx={{
              position: 'relative',
              display: 'grid',
              alignContent: 'start',
              gap: 1.5,
              width: '100%',
              p: { xs: 3, md: 4 },
              bgcolor: 'background.default',
              transition: 'background-color 150ms',
              '&:hover': { bgcolor: 'background.paper' },
              '&:hover .arrow': { color: 'primary.main', transform: 'translate(2px,-2px)' },
            }}
          >
            <Typography variant="h3" component={headingLevel} sx={{ display: 'flex', justifyContent: 'space-between', gap: 2 }}>
              <Link href={paths.service(s.slug)} underline="none" color="inherit" sx={{ '&::after': { content: '""', position: 'absolute', inset: 0 } }}>
                {s.name}
              </Link>
              <Box className="arrow" sx={{ color: 'brand.subtle', transition: 'transform 260ms, color 260ms', display: 'grid' }}>
                <ArrowUpRight size={20} strokeWidth={1.5} aria-hidden="true" />
              </Box>
            </Typography>
            <Typography sx={{ color: 'text.secondary' }}>{s.summary}</Typography>
          </Box>
        </Reveal>
      ))}
    </Box>
  )
}
