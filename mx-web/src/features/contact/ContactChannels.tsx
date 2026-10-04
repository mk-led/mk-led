import Box from '@mui/material/Box'
import Link from '@mui/material/Link'
import Typography from '@mui/material/Typography'
import { Clock, Mail, MapPin, Phone, type LucideIcon } from 'lucide-react'
import type { ReactNode } from 'react'
import { SocialIcon } from '../../components/brand/SocialIcon'
import { dialDigits, site, socialLabels, socialProfiles, whatsappUrl, type SocialNetwork } from '../../content/site'
import { whatsappGreen } from '../../theme/colors'

interface Channel {
  id: string
  label: string
  icon: ReactNode
  value: string | null
  href?: string
  action?: string
  external?: boolean
  configKey: string
}

const icon = (Icon: LucideIcon) => <Icon size={20} strokeWidth={1.5} aria-hidden="true" />

function channels(): Channel[] {
  const { phone, whatsapp, email, hours } = site.contact
  return [
    { id: 'call', label: 'Call', icon: icon(Phone), value: phone, href: phone ? `tel:${dialDigits(phone)}` : undefined, action: 'Call now', configKey: 'contact.phone' },
    {
      id: 'whatsapp',
      label: 'WhatsApp',
      icon: <SocialIcon brand="whatsapp" size={20} />,
      value: whatsapp,
      href: whatsapp ? whatsappUrl(whatsapp) : undefined,
      action: 'Chat on WhatsApp',
      external: true,
      configKey: 'contact.whatsapp',
    },
    { id: 'email', label: 'Email', icon: icon(Mail), value: email, href: email ? `mailto:${email}` : undefined, action: 'Send an email', configKey: 'contact.email' },
    {
      id: 'visit',
      label: 'Visit',
      icon: icon(MapPin),
      value: site.address.line,
      href: site.address.mapUrl ?? undefined,
      action: 'Open in Google Maps',
      external: true,
      configKey: 'address',
    },
    { id: 'hours', label: 'Business hours', icon: icon(Clock), value: hours, configKey: 'contact.hours' },
  ]
}

/** Missing channels are hidden in production; in development they show what still needs filling in. */
const showPlaceholders = import.meta.env.DEV

function ChannelBody({ channel }: { channel: Channel }) {
  return (
    <>
      <Box
        sx={{
          display: 'grid',
          placeItems: 'center',
          width: 44,
          height: 44,
          mb: 1.5,
          border: 1,
          borderColor: 'brand.lineStrong',
          borderRadius: 0.5,
          color: channel.id === 'whatsapp' ? whatsappGreen : 'primary.main',
        }}
      >
        {channel.icon}
      </Box>
      <Typography variant="overline" component="span" sx={{ color: 'brand.subtle', fontSize: '0.6875rem' }}>
        {channel.label}
      </Typography>
      {channel.value ? (
        <Typography component="span" sx={{ fontSize: '1.125rem', fontWeight: 600, letterSpacing: '-0.01em', overflowWrap: 'anywhere' }}>
          {channel.value}
        </Typography>
      ) : (
        <Typography variant="caption" component="span" sx={{ color: 'brand.subtle' }}>
          Not set — add <code>{channel.configKey}</code> in <code>src/content/company.json</code>
        </Typography>
      )}
      {channel.value && channel.action && channel.href && (
        <Typography variant="body2" component="span" sx={{ color: 'primary.main', mt: 1 }}>
          {channel.action}
        </Typography>
      )}
    </>
  )
}

export function ContactChannels() {
  const items = channels().filter((c) => c.value || showPlaceholders)
  return (
    <Box
      component="ul"
      aria-label={`Ways to contact ${site.name}`}
      sx={{
        listStyle: 'none',
        p: 0,
        m: 0,
        display: 'grid',
        gap: '1px',
        bgcolor: 'divider',
        border: 1,
        borderColor: 'divider',
        gridTemplateColumns: 'repeat(auto-fit, minmax(min(220px, 100%), 1fr))',
      }}
    >
      {items.map((c) => {
        const cell = { display: 'grid', alignContent: 'start', gap: 0.75, p: { xs: 3, md: 3.5 }, height: '100%' }
        return (
          <Box component="li" key={c.id} sx={{ bgcolor: 'background.default', opacity: c.value ? 1 : 0.7 }}>
            {c.value && c.href ? (
              <Link
                href={c.href}
                underline="none"
                color="inherit"
                data-channel={c.id}
                {...(c.external && { target: '_blank', rel: 'noopener noreferrer' })}
                sx={{ ...cell, transition: 'background-color 150ms', '&:hover': { bgcolor: 'background.paper' } }}
              >
                <ChannelBody channel={c} />
                {c.external && <span className="visually-hidden"> (opens in a new tab)</span>}
              </Link>
            ) : (
              <Box sx={cell}>
                <ChannelBody channel={c} />
              </Box>
            )}
          </Box>
        )
      })}
    </Box>
  )
}

export function SocialLinks({ variant = 'full' }: { variant?: 'full' | 'compact' }) {
  const profiles = socialProfiles()

  if (profiles.length === 0) {
    if (!showPlaceholders || variant === 'compact') return null
    return (
      <Typography variant="caption" component="p" sx={{ p: 2, border: 1, borderStyle: 'dashed', borderColor: 'brand.lineStrong', color: 'brand.subtle' }}>
        Social profiles not set — add full profile URLs under <code>social</code> in <code>src/content/company.json</code> (
        {(Object.keys(socialLabels) as SocialNetwork[]).map((n) => socialLabels[n]).join(', ')}).
      </Typography>
    )
  }

  return (
    <Box component="ul" sx={{ listStyle: 'none', p: 0, m: 0, display: 'flex', flexWrap: 'wrap', gap: 1 }}>
      {profiles.map(({ network, label, url }) => (
        <li key={network}>
          <Link
            href={url}
            target="_blank"
            rel="noopener noreferrer me"
            underline="none"
            color="inherit"
            aria-label={variant === 'compact' ? `${label} (opens in a new tab)` : undefined}
            sx={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 1.5,
              minWidth: 44,
              minHeight: 44,
              px: variant === 'full' ? 2 : 0,
              border: 1,
              borderColor: variant === 'full' ? 'brand.lineStrong' : 'divider',
              borderRadius: 0.5,
              color: variant === 'full' ? 'text.primary' : 'text.secondary',
              '&:hover': { color: 'primary.main', borderColor: 'primary.main' },
            }}
          >
            <SocialIcon brand={network} />
            {variant === 'full' && (
              <span>
                {label}
                <span className="visually-hidden"> (opens in a new tab)</span>
              </span>
            )}
          </Link>
        </li>
      ))}
    </Box>
  )
}
