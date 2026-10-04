import Box from '@mui/material/Box'
import ButtonBase from '@mui/material/ButtonBase'
import Typography from '@mui/material/Typography'
import { useRef, useState, type KeyboardEvent } from 'react'
import { PitchVisual } from '../../components/media/PitchVisual'
import { minimumViewingDistance, pitchGuides, pixelsPerSquareMetre, wallResolution } from '../../content/pitch'
import { cssVar } from '../../theme/cssVars'

/** Physical width of the magnified sample — identical for every pitch so the comparison is honest. */
const SAMPLE_MM = 48
/** Reference wall that makes resolution tangible: a common 16:9 meeting-room size. */
const REFERENCE_WALL = { width: 4, height: 2.25 }

const numberFormat = new Intl.NumberFormat('en-IN')

/**
 * Interactive P2–P4 comparison (WAI-ARIA tabs). Facts are derived from geometry;
 * viewing distance is labelled as a rule of thumb, not a product specification.
 */
export function PitchExplainer({ headingLevel = 'h3' }: { headingLevel?: 'h2' | 'h3' }) {
  const [selected, setSelected] = useState(0)
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([])
  const guide = pitchGuides[selected]!
  const finest = pixelsPerSquareMetre(pitchGuides[0]!.pitchMm)
  const density = pixelsPerSquareMetre(guide.pitchMm)
  const closest = minimumViewingDistance(guide.pitchMm)
  const resolution = wallResolution(REFERENCE_WALL.width, REFERENCE_WALL.height, guide.pitchMm)
  const relative = Math.round((density / finest) * 100)

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const last = pitchGuides.length - 1
    const keys: Record<string, number> = {
      ArrowRight: selected === last ? 0 : selected + 1,
      ArrowDown: selected === last ? 0 : selected + 1,
      ArrowLeft: selected === 0 ? last : selected - 1,
      ArrowUp: selected === 0 ? last : selected - 1,
      Home: 0,
      End: last,
    }
    const next = keys[event.key]
    if (next === undefined) return
    event.preventDefault()
    setSelected(next)
    tabRefs.current[next]?.focus()
  }

  const facts: { label: string; value: string; note?: string; meter?: number }[] = [
    {
      label: 'Pixel density',
      value: `${numberFormat.format(density)} pixels per m²`,
      note: `A ${REFERENCE_WALL.width} × ${REFERENCE_WALL.height} m wall shows ${numberFormat.format(resolution.width)} × ${numberFormat.format(resolution.height)} pixels.`,
    },
    {
      label: 'Viewing distance',
      value: `Looks smooth from about ${closest} m away and beyond.`,
      note: 'General rule of thumb — confirmed for your room during design.',
    },
    { label: 'Typical use', value: guide.typicalUse },
    { label: 'Indoor / outdoor', value: guide.suitability },
    { label: 'Image detail', value: guide.detail, meter: relative },
  ]

  return (
    <Box sx={{ display: 'grid', gap: 4 }}>
      <Box role="tablist" aria-label="Pixel pitch" onKeyDown={onKeyDown} sx={{ display: 'grid', gridTemplateColumns: 'repeat(4, minmax(0, 1fr))', gap: 1 }}>
        {pitchGuides.map((g, i) => {
          const active = i === selected
          return (
            <ButtonBase
              key={g.slug}
              ref={(el) => {
                tabRefs.current[i] = el
              }}
              role="tab"
              id={`pitch-tab-${g.slug}`}
              aria-selected={active}
              aria-controls="pitch-panel"
              aria-label={`${g.label}, ${g.pitchMm} mm pitch`}
              tabIndex={active ? 0 : -1}
              onClick={() => setSelected(i)}
              sx={{
                display: 'grid',
                justifyItems: 'stretch',
                textAlign: 'left',
                gap: 1,
                p: 1,
                minHeight: 48,
                border: 1,
                borderRadius: 0.5,
                borderColor: active ? 'primary.main' : 'divider',
                bgcolor: active ? 'brand.accentSoft' : 'transparent',
                transition: 'border-color 150ms, background-color 150ms',
                '&:hover': { borderColor: active ? 'primary.main' : 'brand.lineStrong' },
              }}
            >
              <Box sx={{ aspectRatio: '3 / 2', overflow: 'hidden', display: { xs: 'none', sm: 'block' } }}>
                <PitchVisual pitchMm={g.pitchMm} windowMm={SAMPLE_MM} aspect={3 / 2} />
              </Box>
              <Typography component="span" sx={{ fontSize: 'clamp(1.125rem, 1rem + 0.8vw, 1.625rem)', fontWeight: 600, letterSpacing: '-0.03em', lineHeight: 1, px: 0.5 }}>
                {g.label}
              </Typography>
              <Typography component="span" variant="mono" sx={{ color: 'brand.subtle', px: 0.5, pb: 0.5, fontSize: '0.6875rem' }}>
                {g.pitchMm} mm
              </Typography>
            </ButtonBase>
          )
        })}
      </Box>

      <Box
        id="pitch-panel"
        role="tabpanel"
        aria-labelledby={`pitch-tab-${guide.slug}`}
        sx={{ display: 'grid', gap: { xs: 4, md: 8 }, gridTemplateColumns: { xs: '1fr', md: '1.15fr 1fr' }, pt: 4, borderTop: 1, borderColor: 'brand.lineStrong' }}
      >
        <Box component="figure" sx={{ m: 0, display: 'grid', gap: 1.5, alignContent: 'start' }}>
          <Box sx={{ aspectRatio: '16 / 10', overflow: 'hidden', border: 1, borderColor: 'divider' }}>
            <PitchVisual pitchMm={guide.pitchMm} windowMm={SAMPLE_MM} aspect={16 / 10} subpixels title={`Magnified ${guide.label} LED surface, ${SAMPLE_MM} millimetres wide`} />
          </Box>
          <Typography component="figcaption" variant="caption" sx={{ color: 'brand.subtle' }}>
            {SAMPLE_MM} mm of display, magnified. Each cluster is one pixel made of red, green and blue LEDs.
          </Typography>
        </Box>

        <div>
          <Typography variant="h2" component={headingLevel} sx={{ fontSize: 'clamp(1.75rem, 1.4rem + 1.5vw, 2.5rem)', mb: 3 }}>
            {guide.label}
            <Typography component="span" sx={{ display: 'block', color: 'text.secondary', fontSize: '1rem', fontWeight: 400, letterSpacing: 0, mt: 1 }}>
              {guide.pitchMm} mm between pixel centres
            </Typography>
          </Typography>
          <Box component="dl" sx={{ m: 0 }}>
            {facts.map((f) => (
              <Box key={f.label} sx={{ display: 'grid', gap: { xs: 0.5, sm: 3 }, gridTemplateColumns: { xs: '1fr', sm: '9rem 1fr' }, py: 2, borderTop: 1, borderColor: 'divider' }}>
                <Typography component="dt" variant="overline" sx={{ color: 'brand.subtle', fontSize: '0.6875rem' }}>
                  {f.label}
                </Typography>
                <Box component="dd" sx={{ m: 0, display: 'grid', gap: 1 }}>
                  <Typography>{f.value}</Typography>
                  {f.note && (
                    <Typography variant="caption" sx={{ color: 'brand.subtle' }}>
                      {f.note}
                    </Typography>
                  )}
                  {f.meter !== undefined && (
                    <Box role="img" aria-label={`${f.meter}% of P2 pixel density`} sx={{ height: 3, bgcolor: 'divider' }}>
                      <Box sx={{ height: '100%', width: `${f.meter}%`, bgcolor: 'primary.main', boxShadow: `0 0 10px ${cssVar.glow}`, transition: 'width 600ms' }} />
                    </Box>
                  )}
                </Box>
              </Box>
            ))}
          </Box>
        </div>
      </Box>

      <Typography variant="body2" sx={{ color: 'text.secondary', maxWidth: '64ch' }}>
        Smaller number = pixels closer together = sharper up close. Larger number = fewer pixels, best seen from further away.
      </Typography>
    </Box>
  )
}
