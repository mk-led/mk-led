import type { Shadows } from '@mui/material/styles'

/**
 * The visual language is flat and architectural: hierarchy comes from rules and
 * whitespace, not elevation. Only overlays (drawer, menus) cast a shadow.
 */
const overlay = '0 24px 48px -12px rgba(0, 0, 0, 0.45)'

export const shadows = ['none', ...Array<string>(24).fill(overlay)] as Shadows
