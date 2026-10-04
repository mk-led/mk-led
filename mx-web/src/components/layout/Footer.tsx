import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Link from '@mui/material/Link'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { dialDigits, site, whatsappUrl } from '../../content/site'
import { SocialLinks } from '../../features/contact/ContactChannels'
import { MOBILE_BAR_HEIGHT } from '../../theme/breakpoints'
import { Logo } from '../brand/Logo'
import { footerNav } from './navigation'

const headingSx = { mb: 2, color: 'brand.subtle', fontSize: '0.6875rem' } as const
const linkSx = { color: 'text.secondary', display: 'inline-flex', alignItems: 'center', minHeight: 32, '&:hover': { color: 'text.primary' } } as const

export function Footer() {
  const { email, phone, whatsapp, hours } = site.contact
  return (
    <Box
      component="footer"
      sx={{
        bgcolor: 'brand.raised',
        borderTop: 1,
        borderColor: 'divider',
        // Keep the last lines clear of the phone action bar.
        pb: { xs: `calc(${MOBILE_BAR_HEIGHT}px + env(safe-area-inset-bottom))`, md: 0 },
      }}
    >
      <Container sx={{ py: { xs: 6, md: 8 } }}>
        <Box sx={{ display: 'grid', gap: { xs: 5, md: 4 }, gridTemplateColumns: { xs: '1fr 1fr', md: '1.6fr repeat(4, 1fr)', lg: '1.6fr repeat(5, 1fr)' } }}>
          <Stack spacing={2.5} sx={{ gridColumn: { xs: '1 / -1', md: 'auto' } }}>
            <Logo />
            <Typography variant="body2" sx={{ color: 'text.secondary', maxWidth: '36ch' }}>
              {site.description}
            </Typography>
            <SocialLinks variant="compact" />
          </Stack>

          {footerNav.map((group) => (
            <Box component="nav" aria-label={`${group.heading} links`} key={group.heading}>
              <Typography variant="overline" component="h2" sx={headingSx}>
                {group.heading}
              </Typography>
              <Box component="ul" sx={{ listStyle: 'none', p: 0, m: 0 }}>
                {group.items.map((item) => (
                  <li key={item.href}>
                    <Link href={item.href} variant="body2" underline="hover" sx={linkSx}>
                      {item.label}
                    </Link>
                  </li>
                ))}
              </Box>
            </Box>
          ))}

          <Box sx={{ gridColumn: { xs: '1 / -1', md: 'auto' } }}>
            <Typography variant="overline" component="h2" sx={headingSx}>
              Contact
            </Typography>
            <Box component="address" sx={{ fontStyle: 'normal', display: 'grid', gap: 0.5 }}>
              {phone && (
                <Link href={`tel:${dialDigits(phone)}`} variant="body2" underline="hover" sx={linkSx}>
                  {phone}
                </Link>
              )}
              {whatsapp && (
                <Link href={whatsappUrl(whatsapp)} target="_blank" rel="noopener noreferrer" variant="body2" underline="hover" sx={linkSx}>
                  WhatsApp<span className="visually-hidden"> (opens in a new tab)</span>
                </Link>
              )}
              {email && (
                <Link href={`mailto:${email}`} variant="body2" underline="hover" sx={linkSx}>
                  {email}
                </Link>
              )}
              {site.address.line && (
                <Typography variant="body2" sx={{ color: 'text.secondary', pt: 1 }}>
                  {site.legalName}
                  <br />
                  {site.address.line}
                </Typography>
              )}
              {hours && (
                <Typography variant="body2" sx={{ color: 'text.secondary', pt: 1 }}>
                  {hours}
                </Typography>
              )}
            </Box>
          </Box>
        </Box>
      </Container>

      <Box sx={{ borderTop: 1, borderColor: 'divider' }}>
        <Container sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', gap: 1.5, py: 2.5 }}>
          <Typography variant="caption" sx={{ color: 'brand.subtle' }}>
            © <span suppressHydrationWarning>{new Date().getFullYear()}</span> {site.name}. All rights reserved.
          </Typography>
          <Typography variant="overline" sx={{ color: 'brand.subtle', fontSize: '0.6875rem' }}>
            {site.statement}
          </Typography>
        </Container>
      </Box>
    </Box>
  )
}
