/**
 * Direct references to the theme's CSS variables, for values that the `sx` palette
 * shorthand can't express (shadows, translucent backgrounds, SVG fills). They follow the
 * active colour scheme automatically. Prefix matches `cssVarPrefix` in theme.ts.
 */
export const cssVar = {
  primary: 'var(--mk-palette-primary-main)',
  background: 'var(--mk-palette-background-default)',
  accentSoft: 'var(--mk-palette-brand-accentSoft)',
  glow: 'var(--mk-palette-brand-glow)',
  /** Background as an "R G B" channel, for `rgba(${cssVar.backgroundChannel} / 0.9)`. */
  backgroundChannel: 'var(--mk-palette-background-defaultChannel)',
} as const
