import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { Phone } from 'lucide-react'
import { dialDigits, site } from '../../content/site'
import { quotePath } from '../../routes/paths'
import { ArrowButton } from './ArrowButton'
import { Reveal } from './Reveal'

interface CtaBandProps {
  title?: string
  body?: string
  productSlug?: string
}

/** Closing call to action on most pages. Always dark, for a consistent cinematic close. */
export function CtaBand({
  title = 'Planning an LED display?',
  body = 'Tell us about the space and how it will be used. We’ll recommend the right pitch, size and structure — and give you a clear quote.',
  productSlug,
}: CtaBandProps) {
  const { phone } = site.contact
  return (
    <Box component="section" data-theme="dark" aria-labelledby="cta-title" sx={{ borderTop: 1, borderColor: 'divider' }}>
      <Container className="pixel-grid" sx={{ py: 'clamp(3.5rem, 2.5rem + 5vw, 8rem)' }}>
        <Box sx={{ display: 'grid', gap: 4, alignItems: 'end', gridTemplateColumns: { xs: '1fr', md: '1.6fr 1fr' } }}>
          <Reveal>
            <Stack spacing={2}>
              <Typography id="cta-title" variant="h2" sx={{ maxWidth: '16ch' }}>
                {title}
              </Typography>
              <Typography variant="lead" component="p" sx={{ color: 'text.secondary', maxWidth: '52ch' }}>
                {body}
              </Typography>
            </Stack>
          </Reveal>
          <Stack direction="row" useFlexGap sx={{ flexWrap: 'wrap', gap: 1.5, justifyContent: { md: 'flex-end' } }}>
            <ArrowButton href={quotePath(productSlug)} size="large">
              Request a Quote
            </ArrowButton>
            {phone && (
              <Button variant="outlined" size="large" href={`tel:${dialDigits(phone)}`} startIcon={<Phone size={18} strokeWidth={1.75} aria-hidden="true" />}>
                {phone}
              </Button>
            )}
          </Stack>
        </Box>
      </Container>
    </Box>
  )
}
