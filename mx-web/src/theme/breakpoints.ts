/**
 * MUI default breakpoints. Treat them as hints, not hard boundaries — most layout is
 * fluid (clamp/minmax/auto-fit) and only switches structure at these points.
 */
export const breakpoints = {
  values: { xs: 0, sm: 600, md: 900, lg: 1200, xl: 1536 },
}

/** Widest content measure. Wider screens get more whitespace, never wider text. */
export const CONTAINER_MAX = 1312

/** Fluid side gutter: 16px on a 320px phone up to 44px on large screens. */
export const GUTTER = 'clamp(1rem, 0.4rem + 2.6vw, 2.75rem)'

export const HEADER_HEIGHT = 72

/** Height of the mobile bottom action bar (excluding safe-area inset). */
export const MOBILE_BAR_HEIGHT = 64
