import CssBaseline from '@mui/material/CssBaseline'
import { ThemeProvider } from '@mui/material/styles'
import type { ReactNode } from 'react'
import { COLOR_SCHEME_STORAGE_KEY, MODE_STORAGE_KEY, theme } from './theme'

/** Theme, global styles and dark/light mode persistence. */
export function AppThemeProvider({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider
      theme={theme}
      defaultMode="system"
      modeStorageKey={MODE_STORAGE_KEY}
      colorSchemeStorageKey={COLOR_SCHEME_STORAGE_KEY}
      disableTransitionOnChange
    >
      <CssBaseline enableColorScheme />
      {children}
    </ThemeProvider>
  )
}
