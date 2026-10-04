import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { Plus } from 'lucide-react'
import type { Faq } from '../../content/types'

/**
 * Questions and answers using native <details>: works without JavaScript, keyboard
 * accessible, and the answers are in the HTML for crawlers.
 */
export function FaqList({ faqs, headingLevel = 'h3' }: { faqs: Faq[]; headingLevel?: 'h3' | 'h4' }) {
  return (
    <Box sx={{ borderTop: 1, borderColor: 'brand.lineStrong' }}>
      {faqs.map((faq) => (
        <Box
          key={faq.question}
          component="details"
          sx={{
            borderBottom: 1,
            borderColor: 'divider',
            '&[open] .faq-icon': { transform: 'rotate(45deg)' },
            '& summary::-webkit-details-marker': { display: 'none' },
          }}
        >
          <Box
            component="summary"
            sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 2, minHeight: 56, py: 2, cursor: 'pointer', listStyle: 'none' }}
          >
            <Typography variant="h4" component={headingLevel}>
              {faq.question}
            </Typography>
            <Box className="faq-icon" sx={{ flex: 'none', color: 'primary.main', transition: 'transform 200ms', display: 'grid' }}>
              <Plus size={20} aria-hidden="true" />
            </Box>
          </Box>
          <Typography sx={{ color: 'text.secondary', pb: 3, maxWidth: '70ch' }}>{faq.answer}</Typography>
        </Box>
      ))}
    </Box>
  )
}
