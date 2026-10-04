import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { Check } from 'lucide-react'
import type { TitledText } from '../../content/types'
import { Reveal } from './Reveal'

/** Titled explanations on a ruled grid (considerations, principles, capabilities). */
export function TitledTextGrid({ items, headingLevel = 'h3', columns = 3 }: { items: TitledText[]; headingLevel?: 'h3' | 'h4'; columns?: 2 | 3 | 4 }) {
  return (
    <Box
      component="ul"
      sx={{
        listStyle: 'none',
        p: 0,
        m: 0,
        display: 'grid',
        columnGap: 4,
        borderTop: 1,
        borderColor: 'brand.lineStrong',
        gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', lg: `repeat(${columns}, 1fr)` },
      }}
    >
      {items.map((item, i) => (
        <Reveal as="li" key={item.title} delay={(i % columns) * 60}>
          <Box sx={{ py: 3, borderBottom: 1, borderColor: 'divider', height: '100%' }}>
            <Typography variant="h4" component={headingLevel} sx={{ mb: 1 }}>
              {item.title}
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              {item.body}
            </Typography>
          </Box>
        </Reveal>
      ))}
    </Box>
  )
}

/** Simple ruled checklist. */
export function CheckList({ items }: { items: string[] }) {
  return (
    <Box component="ul" sx={{ listStyle: 'none', p: 0, m: 0, borderTop: 1, borderColor: 'brand.lineStrong' }}>
      {items.map((item) => (
        <Typography component="li" key={item} sx={{ display: 'flex', alignItems: 'flex-start', gap: 1.5, py: 1.75, borderBottom: 1, borderColor: 'divider' }}>
          <Box component="span" sx={{ color: 'primary.main', display: 'grid', pt: 0.5, flex: 'none' }}>
            <Check size={16} strokeWidth={2} aria-hidden="true" />
          </Box>
          {item}
        </Typography>
      ))}
    </Box>
  )
}

/** Two-column split used on detail pages: main content and a sticky aside. */
export function SplitLayout({ main, aside }: { main: React.ReactNode; aside: React.ReactNode }) {
  return (
    <Box sx={{ display: 'grid', gap: { xs: 6, md: 8 }, gridTemplateColumns: { xs: '1fr', md: '1.5fr 1fr' }, alignItems: 'start' }}>
      <Box sx={{ minWidth: 0 }}>{main}</Box>
      <Box sx={{ minWidth: 0, position: { md: 'sticky' }, top: { md: 104 } }}>{aside}</Box>
    </Box>
  )
}
