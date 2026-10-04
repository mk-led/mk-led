import { createTheme } from '@mui/material/styles'
import type { CSSProperties } from 'react'
import { breakpoints } from './breakpoints'
import { dark, light, type BrandColors } from './colors'
import { components } from './components'
import { shadows } from './shadows'
import { typography } from './typography'

declare module '@mui/material/styles' {
  interface Palette {
    brand: BrandColors
  }
  interface PaletteOptions {
    brand?: BrandColors
  }
  interface TypographyVariants {
    display: CSSProperties
    lead: CSSProperties
    mono: CSSProperties
  }
  interface TypographyVariantsOptions {
    display?: CSSProperties
    lead?: CSSProperties
    mono?: CSSProperties
  }
}

declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides {
    display: true
    lead: true
    mono: true
  }
}

/** The root attribute that carries the active scheme; also set before paint by index.html. */
export const COLOR_SCHEME_ATTRIBUTE = 'data-theme'
/** localStorage keys — must match the pre-paint script in index.html. */
export const MODE_STORAGE_KEY = 'mk-mode'
export const COLOR_SCHEME_STORAGE_KEY = 'mk-color-scheme'

export const theme = createTheme({
  cssVariables: {
    colorSchemeSelector: `[${COLOR_SCHEME_ATTRIBUTE}="%s"]`,
    cssVarPrefix: 'mk',
  },
  defaultColorScheme: 'dark',
  colorSchemes: {
    dark: { palette: dark },
    light: { palette: light },
  },
  breakpoints,
  typography,
  shape: { borderRadius: 2 },
  shadows,
  transitions: {
    easing: {
      easeInOut: 'cubic-bezier(0.22, 1, 0.36, 1)',
      easeOut: 'cubic-bezier(0.22, 1, 0.36, 1)',
      easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
      sharp: 'cubic-bezier(0.4, 0, 0.6, 1)',
    },
  },
  components,
})

export type AppTheme = typeof theme
