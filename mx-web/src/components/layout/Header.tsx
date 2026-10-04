import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import Drawer from '@mui/material/Drawer'
import IconButton from '@mui/material/IconButton'
import Link from '@mui/material/Link'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { Menu, Phone, X } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { NavLink, useLocation } from 'react-router'
import { dialDigits, site } from '../../content/site'
import { paths } from '../../routes/paths'
import { HEADER_HEIGHT } from '../../theme/breakpoints'
import { Logo } from '../brand/Logo'
import { ArrowButton } from '../ui/ArrowButton'
import { darkHeroRoutes, primaryNav } from './navigation'
import { ThemeToggle } from './ThemeToggle'
import { cssVar } from '../../theme/cssVars'

const DRAWER_ID = 'mobile-navigation'

function isActive(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`)
}

export function Header() {
  const { pathname } = useLocation()
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const toggleRef = useRef<HTMLButtonElement>(null)

  // Close the drawer after navigation.
  const [lastPath, setLastPath] = useState(pathname)
  if (lastPath !== pathname) {
    setLastPath(pathname)
    setOpen(false)
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const solid = scrolled || open
  // Over a cinematic (always-dark) hero the transparent header uses dark-scheme colours.
  const overDarkHero = !solid && darkHeroRoutes.includes(pathname)

  return (
    <Box
      component="header"
      data-theme={overDarkHero ? 'dark' : undefined}
      sx={{
        position: 'fixed',
        insetInline: 0,
        top: 0,
        zIndex: (t) => t.zIndex.appBar,
        borderBottom: 1,
        borderColor: solid ? 'divider' : 'transparent',
        backgroundColor: solid ? undefined : 'transparent',
        transition: 'background-color 260ms, border-color 260ms',
        ...(solid && {
          backgroundColor: `rgba(${cssVar.backgroundChannel} / 0.94)`,
          backdropFilter: 'saturate(140%) blur(14px)',
        }),
      }}
    >
      <Container sx={{ display: 'flex', alignItems: 'center', gap: 3, height: HEADER_HEIGHT }}>
        <Link href="/" underline="none" color="inherit" aria-label={`${site.name} home`} sx={{ display: 'inline-flex', alignItems: 'center', minHeight: 48, mr: 'auto' }}>
          <Logo />
        </Link>

        <Box component="nav" aria-label="Primary" sx={{ display: { xs: 'none', lg: 'block' } }}>
          <Stack component="ul" direction="row" sx={{ listStyle: 'none', p: 0, m: 0 }}>
            {primaryNav.map((item) => {
              const active = isActive(pathname, item.href)
              return (
                <li key={item.href}>
                  <Link
                    component={NavLink}
                    to={item.href}
                    underline="none"
                    aria-current={active ? 'page' : undefined}
                    sx={{
                      position: 'relative',
                      display: 'flex',
                      alignItems: 'center',
                      minHeight: 48,
                      px: 1.5,
                      fontSize: '0.9375rem',
                      color: active ? 'text.primary' : 'text.secondary',
                      '&:hover': { color: 'text.primary' },
                      '&::after': active ? { content: '""', position: 'absolute', left: 12, right: 12, bottom: 8, height: '1px', bgcolor: 'primary.main' } : undefined,
                    }}
                  >
                    {item.label}
                  </Link>
                </li>
              )
            })}
          </Stack>
        </Box>

        <Stack direction="row" spacing={1.5} sx={{ alignItems: 'center' }}>
          <ThemeToggle />
          <Button variant="contained" href={paths.requestQuote} sx={{ display: { xs: 'none', sm: 'inline-flex' } }}>
            Request a Quote
          </Button>
          <IconButton
            ref={toggleRef}
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            aria-controls={DRAWER_ID}
            onClick={() => setOpen((v) => !v)}
            sx={{ display: { lg: 'none' } }}
          >
            {open ? <X size={20} strokeWidth={1.5} aria-hidden="true" /> : <Menu size={20} strokeWidth={1.5} aria-hidden="true" />}
          </IconButton>
        </Stack>
      </Container>

      {/* MUI Drawer: focus trap, Escape to close, scroll lock and focus return are built in. */}
      <Drawer
        id={DRAWER_ID}
        anchor="right"
        open={open}
        onClose={() => setOpen(false)}
        slotProps={{ paper: { sx: { width: 'min(100vw, 420px)', bgcolor: 'background.default' } } }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', px: 2.5, height: HEADER_HEIGHT, borderBottom: 1, borderColor: 'divider' }}>
          <Logo />
          <IconButton aria-label="Close menu" onClick={() => setOpen(false)}>
            <X size={20} strokeWidth={1.5} aria-hidden="true" />
          </IconButton>
        </Box>
        <Box component="nav" aria-label="Mobile" sx={{ px: 2.5, py: 2, overflowY: 'auto', flex: 1 }}>
          <Box component="ul" sx={{ listStyle: 'none', p: 0, m: 0 }}>
            {primaryNav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  underline="none"
                  color="inherit"
                  aria-current={isActive(pathname, item.href) ? 'page' : undefined}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    minHeight: 56,
                    borderBottom: 1,
                    borderColor: 'divider',
                    fontSize: '1.375rem',
                    fontWeight: 500,
                    letterSpacing: '-0.02em',
                    '&[aria-current="page"]': { color: 'primary.main' },
                  }}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </Box>
          <Stack spacing={1.5} sx={{ mt: 4 }}>
            <ArrowButton href={paths.requestQuote} size="large" fullWidth>
              Request a Quote
            </ArrowButton>
            {site.contact.phone && (
              <Button variant="outlined" size="large" fullWidth href={`tel:${dialDigits(site.contact.phone)}`} startIcon={<Phone size={18} aria-hidden="true" />}>
                {site.contact.phone}
              </Button>
            )}
          </Stack>
          {site.contact.hours && (
            <Typography variant="caption" component="p" sx={{ mt: 2, color: 'brand.subtle' }}>
              Support: {site.contact.hours}
            </Typography>
          )}
        </Box>
      </Drawer>
    </Box>
  )
}
