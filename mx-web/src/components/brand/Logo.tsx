import Box from '@mui/material/Box'
import { subpixel } from '../../theme/colors'

/**
 * MK-LED mark: one magnified pixel — red, green and blue sub-pixels in a fine frame.
 * The wordmark is live text so it stays crisp and themeable.
 */
export function LogoMark({ size = 28 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 28 28" aria-hidden="true" focusable="false" style={{ flex: 'none' }}>
      <rect x="0.5" y="0.5" width="27" height="27" rx="2" fill="none" stroke="currentColor" strokeOpacity="0.35" />
      <rect x="6" y="6" width="4" height="16" rx="1" fill={subpixel.red} />
      <rect x="12" y="6" width="4" height="16" rx="1" fill={subpixel.green} />
      <rect x="18" y="6" width="4" height="16" rx="1" fill={subpixel.blue} />
    </svg>
  )
}

export function Logo() {
  return (
    <Box component="span" sx={{ display: 'inline-flex', alignItems: 'center', gap: 1.5 }}>
      <LogoMark />
      <Box component="span" sx={{ fontWeight: 650, fontSize: '1.125rem', letterSpacing: '0.06em' }}>
        MK
        <Box component="span" sx={{ color: 'primary.main' }}>
          -
        </Box>
        LED
      </Box>
    </Box>
  )
}
