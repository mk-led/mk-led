import Box from '@mui/material/Box'
import { Outlet, ScrollRestoration } from 'react-router'
import { AppThemeProvider } from '../../theme/AppThemeProvider'
import { Footer } from './Footer'
import { Header } from './Header'
import { MobileActionBar } from './MobileActionBar'
import { WhatsAppFab } from './WhatsAppFab'

/** Root layout for every route: theme, skip link, landmarks and persistent contact actions. */
export function SiteLayout() {
  return (
    <AppThemeProvider>
      <Box
        component="a"
        href="#main"
        sx={{
          position: 'fixed',
          top: 12,
          left: 12,
          zIndex: (t) => t.zIndex.tooltip,
          px: 2,
          py: 1.5,
          bgcolor: 'primary.main',
          color: 'primary.contrastText',
          fontWeight: 600,
          transform: 'translateY(-200%)',
          '&:focus': { transform: 'none' },
        }}
      >
        Skip to content
      </Box>
      <Header />
      <Box component="main" id="main" tabIndex={-1} sx={{ outline: 'none' }}>
        <Outlet />
      </Box>
      <Footer />
      <MobileActionBar />
      <WhatsAppFab />
      <ScrollRestoration />
    </AppThemeProvider>
  )
}
