import type { TypographyVariantsOptions } from '@mui/material/styles'
import type { CSSProperties } from 'react'

/** Two families only: one sans for everything, one mono for technical labels. */
export const fontSans = "'Inter Tight Variable', 'Inter Tight', system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif"
export const fontMono = "'JetBrains Mono Variable', 'JetBrains Mono', ui-monospace, 'Cascadia Code', Consolas, monospace"

const headline: CSSProperties = {
  fontWeight: 600,
  letterSpacing: '-0.035em',
  textWrap: 'balance',
}

/**
 * Type scale. Sizes are fluid with clamp() so they read well from 320px phones to 4K
 * without breakpoint jumps — and are capped so headlines never push content off screen.
 */
export const typography: TypographyVariantsOptions = {
  fontFamily: fontSans,
  htmlFontSize: 16,
  fontSize: 16,
  display: { ...headline, fontSize: 'clamp(2.5rem, 1.2rem + 5.4vw, 6.25rem)', lineHeight: 0.98, letterSpacing: '-0.045em' },
  h1: { ...headline, fontSize: 'clamp(2.25rem, 1.5rem + 3.4vw, 4.5rem)', lineHeight: 1.02 },
  h2: { ...headline, fontSize: 'clamp(1.875rem, 1.35rem + 2.4vw, 3.5rem)', lineHeight: 1.05 },
  h3: { ...headline, fontSize: 'clamp(1.375rem, 1.2rem + 0.8vw, 1.75rem)', lineHeight: 1.2, letterSpacing: '-0.02em' },
  h4: { ...headline, fontSize: 'clamp(1.125rem, 1.05rem + 0.35vw, 1.3125rem)', lineHeight: 1.3, letterSpacing: '-0.01em' },
  h5: { fontWeight: 600, fontSize: '1.0625rem', lineHeight: 1.4 },
  h6: { fontWeight: 600, fontSize: '1rem', lineHeight: 1.4 },
  lead: { fontSize: 'clamp(1.0625rem, 1rem + 0.35vw, 1.3125rem)', lineHeight: 1.6, textWrap: 'pretty' },
  body1: { fontSize: '1.0625rem', lineHeight: 1.65 },
  body2: { fontSize: '0.9375rem', lineHeight: 1.6 },
  caption: { fontSize: '0.8125rem', lineHeight: 1.5 },
  overline: {
    fontFamily: fontMono,
    fontSize: '0.75rem',
    fontWeight: 500,
    letterSpacing: '0.16em',
    lineHeight: 1.6,
    textTransform: 'uppercase',
  },
  mono: { fontFamily: fontMono, fontSize: '0.8125rem', letterSpacing: '0.02em' },
  button: { fontWeight: 600, textTransform: 'none', letterSpacing: '0.01em', fontSize: '0.9375rem' },
}
