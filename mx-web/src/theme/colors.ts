/**
 * Brand colour system. Every colour used in the UI is defined here once, per scheme.
 * Components reach these through the MUI palette (e.g. `color: 'text.secondary'`,
 * `borderColor: 'brand.lineStrong'`), which compiles to CSS variables — so any element
 * can switch scheme with `data-theme="dark"` without re-rendering.
 */

/** Logo sub-pixels. Brand constants, identical in both schemes. */
export const subpixel = {
  red: '#ff3d4f',
  green: '#27d77f',
  blue: '#2f86ff',
} as const

/** Always-dark media surfaces (LED renders, photography letterboxing). */
export const media = {
  black: '#060708',
  ink: '#08090b',
} as const

export const whatsappGreen = '#25d366'

export interface BrandColors {
  /** Slightly lifted page background for alternating sections. */
  raised: string
  /** Secondary surface for inputs and hover states. */
  surface2: string
  /** Hairline for structural rules. `divider` is the subtle variant. */
  lineStrong: string
  /** Lowest-emphasis text that still meets AA (labels, captions). */
  subtle: string
  /** Accent tint for selected states. */
  accentSoft: string
  /** Controlled glow behind lit accent elements. */
  glow: string
  /** Dot colour of the pixel-grid texture. */
  pixelOff: string
}

export const dark = {
  background: { default: '#08090b', paper: '#111317' },
  text: { primary: '#f3f2ee', secondary: '#a7a9ad' },
  primary: { main: '#3cc8f5', light: '#7fdcfa', dark: '#1aa6d4', contrastText: '#021018' },
  error: { main: '#ff8a8a' },
  success: { main: '#5be3a0' },
  divider: 'rgba(255, 255, 255, 0.08)',
  brand: {
    raised: '#0d0f12',
    surface2: '#171a1f',
    lineStrong: 'rgba(255, 255, 255, 0.18)',
    subtle: '#8a8d92',
    accentSoft: 'rgba(60, 200, 245, 0.12)',
    glow: 'rgba(60, 200, 245, 0.35)',
    pixelOff: 'rgba(255, 255, 255, 0.05)',
  } satisfies BrandColors,
}

export const light = {
  background: { default: '#f6f5f1', paper: '#ffffff' },
  text: { primary: '#0e1013', secondary: '#4b4f56' },
  primary: { main: '#006f99', light: '#2b8fb8', dark: '#005678', contrastText: '#ffffff' },
  error: { main: '#b42318' },
  success: { main: '#067647' },
  divider: 'rgba(12, 14, 18, 0.1)',
  brand: {
    raised: '#fbfaf7',
    surface2: '#efeee9',
    lineStrong: 'rgba(12, 14, 18, 0.22)',
    subtle: '#61656c',
    accentSoft: 'rgba(0, 111, 153, 0.09)',
    glow: 'rgba(0, 111, 153, 0.18)',
    pixelOff: 'rgba(12, 14, 18, 0.06)',
  } satisfies BrandColors,
}
