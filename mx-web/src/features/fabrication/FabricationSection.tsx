import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { ArrowButton } from '../../components/ui/ArrowButton'
import { Reveal } from '../../components/ui/Reveal'
import { Section, SectionHeader } from '../../components/ui/Section'
import { fabricationIntro, getService } from '../../content/services'
import { paths } from '../../routes/paths'
import { HEADER_HEIGHT } from '../../theme/breakpoints'
import { FrameDrawing } from './FrameDrawing'

/** Engineering-led fabrication band: technical drawing beside the capability list. */
export function FabricationSection() {
  const service = getService('fabrication')!
  return (
    <Section id="fabrication" tone="raised" labelledBy="fabrication-title">
      <SectionHeader
        id="fabrication-title"
        eyebrow={fabricationIntro.eyebrow}
        title={fabricationIntro.headline}
        intro={service.intro}
        actions={
          <ArrowButton href={paths.service('fabrication')} variant="text">
            Fabrication services
          </ArrowButton>
        }
      />
      <Box sx={{ display: 'grid', gap: { xs: 5, md: 8 }, gridTemplateColumns: { xs: '1fr', md: '1.4fr 1fr' }, alignItems: 'start' }}>
        <Reveal>
          <Box sx={{ position: { md: 'sticky' }, top: { md: HEADER_HEIGHT + 32 }, p: 2, border: 1, borderColor: 'divider', bgcolor: 'background.default', color: 'text.primary', '& svg': { width: '100%', height: 'auto' } }}>
            <FrameDrawing />
          </Box>
        </Reveal>
        <Box component="ul" sx={{ listStyle: 'none', p: 0, m: 0, borderTop: 1, borderColor: 'brand.lineStrong' }}>
          {service.includes.map((item) => (
            <Typography component="li" key={item} sx={{ display: 'flex', gap: 2, py: 2, borderBottom: 1, borderColor: 'divider' }}>
              <Box component="span" aria-hidden="true" sx={{ width: 6, height: 6, mt: 1.25, bgcolor: 'primary.main', flex: 'none' }} />
              {item}
            </Typography>
          ))}
        </Box>
      </Box>
    </Section>
  )
}
