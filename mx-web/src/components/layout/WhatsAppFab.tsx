import ButtonBase from '@mui/material/ButtonBase'
import { useLocation } from 'react-router'
import { site, whatsappUrl } from '../../content/site'
import { paths } from '../../routes/paths'
import { media, whatsappGreen } from '../../theme/colors'
import { SocialIcon } from '../brand/SocialIcon'

/** Small WhatsApp shortcut for tablet/desktop. On phones the bottom action bar covers it. */
export function WhatsAppFab() {
  const { pathname } = useLocation()
  const number = site.contact.whatsapp
  if (!number || pathname === paths.contact || pathname === paths.requestQuote) return null

  return (
    <ButtonBase
      href={whatsappUrl(number)}
      target="_blank"
      rel="noopener noreferrer"
      sx={{
        display: { xs: 'none', md: 'grid' },
        placeItems: 'center',
        position: 'fixed',
        right: 'max(1rem, env(safe-area-inset-right))',
        bottom: 'max(1rem, env(safe-area-inset-bottom))',
        zIndex: (t) => t.zIndex.speedDial,
        width: 52,
        height: 52,
        borderRadius: 1,
        border: '1px solid rgba(255,255,255,0.14)',
        bgcolor: media.ink,
        color: whatsappGreen,
        boxShadow: '0 8px 24px -8px rgba(0,0,0,0.5)',
        transition: 'transform 260ms, border-color 150ms',
        '&:hover': { transform: 'translateY(-2px)', borderColor: whatsappGreen },
      }}
    >
      <SocialIcon brand="whatsapp" size={22} />
      <span className="visually-hidden">Chat with {site.name} on WhatsApp (opens in a new tab)</span>
    </ButtonBase>
  )
}
