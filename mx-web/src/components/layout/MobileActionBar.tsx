import Box from '@mui/material/Box'
import ButtonBase from '@mui/material/ButtonBase'
import { FileText, Phone } from 'lucide-react'
import type { ReactNode } from 'react'
import { useLocation } from 'react-router'
import { dialDigits, site, whatsappUrl } from '../../content/site'
import { paths } from '../../routes/paths'
import { MOBILE_BAR_HEIGHT } from '../../theme/breakpoints'
import { whatsappGreen } from '../../theme/colors'
import { SocialIcon } from '../brand/SocialIcon'
import { cssVar } from '../../theme/cssVars'

interface Action {
  label: string
  href: string
  icon: ReactNode
  primary?: boolean
  external?: boolean
}

/**
 * Phone-width bottom bar with the three conversion actions: Call · WhatsApp · Quote.
 * Hidden from md up and on the quote page itself. Respects the safe-area inset.
 */
export function MobileActionBar() {
  const { pathname } = useLocation()
  if (pathname === paths.requestQuote) return null

  const { phone, whatsapp } = site.contact
  const actions: Action[] = [
    ...(phone ? [{ label: 'Call', href: `tel:${dialDigits(phone)}`, icon: <Phone size={18} aria-hidden="true" /> }] : []),
    ...(whatsapp ? [{ label: 'WhatsApp', href: whatsappUrl(whatsapp), icon: <Box component="span" sx={{ color: whatsappGreen, display: 'grid' }}><SocialIcon brand="whatsapp" size={18} /></Box>, external: true }] : []),
    { label: 'Get a Quote', href: paths.requestQuote, icon: <FileText size={18} aria-hidden="true" />, primary: true },
  ]

  return (
    <Box
      component="nav"
      aria-label="Quick contact"
      sx={{
        display: { xs: 'grid', md: 'none' },
        gridTemplateColumns: `repeat(${actions.length}, 1fr)`,
        position: 'fixed',
        insetInline: 0,
        bottom: 0,
        zIndex: (t) => t.zIndex.appBar - 1,
        height: `calc(${MOBILE_BAR_HEIGHT}px + env(safe-area-inset-bottom))`,
        pb: 'env(safe-area-inset-bottom)',
        borderTop: 1,
        borderColor: 'divider',
        backgroundColor: `rgba(${cssVar.backgroundChannel} / 0.96)`,
        backdropFilter: 'blur(12px)',
      }}
    >
      {actions.map((a) => (
        <ButtonBase
          key={a.label}
          href={a.href}
          {...(a.external && { target: '_blank', rel: 'noopener noreferrer' })}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 0.5,
            minHeight: 48,
            fontSize: '0.75rem',
            fontWeight: 600,
            color: a.primary ? 'primary.contrastText' : 'text.primary',
            bgcolor: a.primary ? 'primary.main' : 'transparent',
            '& + &': { borderLeft: 1, borderColor: 'divider' },
          }}
        >
          {a.icon}
          {a.label}
          {a.external && <span className="visually-hidden"> (opens in a new tab)</span>}
        </ButtonBase>
      ))}
    </Box>
  )
}
