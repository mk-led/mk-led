import type { Components, CssVarsTheme, Theme } from '@mui/material/styles'
import { CONTAINER_MAX, GUTTER, HEADER_HEIGHT } from './breakpoints'
import { LinkBehavior } from './LinkBehavior'
import { fontMono } from './typography'

type T = Omit<Theme, 'components' | 'palette'> & CssVarsTheme

/** Component defaults and global styles. Keep visual decisions here, not in pages. */
export const components: Components<T> = {
  MuiCssBaseline: {
    styleOverrides: (theme) => ({
      html: {
        WebkitTextSizeAdjust: '100%',
        scrollPaddingTop: HEADER_HEIGHT + 16,
        '@media (prefers-reduced-motion: no-preference)': { scrollBehavior: 'smooth' },
      },
      body: {
        fontFeatureSettings: "'ss01', 'cv11'",
        textRendering: 'optimizeLegibility',
        overflowX: 'clip',
      },
      'h1, h2, h3, h4, h5, h6, p, figure, blockquote, dl, dd': { margin: 0 },
      'img, svg, video, canvas': { display: 'block', maxWidth: '100%' },
      a: { color: 'inherit', textDecoration: 'none' },
      '::selection': { background: theme.vars.palette.primary.main, color: theme.vars.palette.primary.contrastText },
      ':focus-visible': {
        outline: `2px solid ${theme.vars.palette.primary.main}`,
        outlineOffset: 2,
      },
      code: { fontFamily: fontMono, fontSize: '0.92em' },
      // Any subtree can carry its own scheme; give it the matching surface and text colour.
      '[data-theme]': {
        backgroundColor: theme.vars.palette.background.default,
        color: theme.vars.palette.text.primary,
      },
      '.visually-hidden': {
        position: 'absolute !important',
        width: 1,
        height: 1,
        padding: 0,
        margin: -1,
        overflow: 'hidden',
        clip: 'rect(0 0 0 0)',
        whiteSpace: 'nowrap',
        border: 0,
      },
      '.pixel-grid': {
        backgroundImage: `radial-gradient(circle at center, ${theme.vars.palette.brand.pixelOff} 1px, transparent 1.5px)`,
        backgroundSize: '12px 12px',
      },
      // Scroll reveal (see <Reveal>). Content is visible unless JS opts it in.
      "[data-reveal='pending']": { opacity: 0, transform: 'translateY(16px)' },
      "[data-reveal='shown']": {
        opacity: 1,
        transform: 'none',
        transition: 'opacity 700ms cubic-bezier(0.22, 1, 0.36, 1), transform 700ms cubic-bezier(0.22, 1, 0.36, 1)',
      },
      '@media (prefers-reduced-motion: reduce)': {
        "[data-reveal='pending']": { opacity: 1, transform: 'none' },
        '*, *::before, *::after': { transitionDuration: '0ms !important', animationDuration: '0ms !important' },
      },
    }),
  },
  MuiContainer: {
    defaultProps: { maxWidth: false },
    styleOverrides: {
      root: { maxWidth: `calc(${CONTAINER_MAX}px + 2 * ${GUTTER})`, paddingLeft: GUTTER, paddingRight: GUTTER },
    },
  },
  MuiButtonBase: {
    defaultProps: { disableRipple: true, LinkComponent: LinkBehavior },
  },
  MuiButton: {
    defaultProps: { disableElevation: true },
    styleOverrides: {
      root: ({ theme }) => ({
        minHeight: 48,
        paddingInline: 24,
        borderRadius: 2,
        whiteSpace: 'nowrap',
        transition: 'background-color 150ms, border-color 150ms, color 150ms, box-shadow 260ms',
        '& .MuiButton-endIcon': { transition: 'transform 260ms cubic-bezier(0.22, 1, 0.36, 1)' },
        '&:hover .MuiButton-endIcon': { transform: 'translateX(3px)' },
        '&.MuiButton-containedPrimary:hover': { boxShadow: `0 0 32px -6px ${theme.vars.palette.brand.glow}` },
      }),
      outlined: ({ theme }) => ({
        borderColor: theme.vars.palette.brand.lineStrong,
        color: theme.vars.palette.text.primary,
        '&:hover': { borderColor: theme.vars.palette.text.primary, backgroundColor: 'transparent' },
      }),
      text: ({ theme }) => ({
        minHeight: 44,
        paddingInline: 0,
        borderRadius: 0,
        color: theme.vars.palette.text.primary,
        borderBottom: `1px solid ${theme.vars.palette.brand.lineStrong}`,
        '&:hover': { backgroundColor: 'transparent', borderBottomColor: theme.vars.palette.primary.main },
      }),
      sizeLarge: { minHeight: 52, fontSize: '1rem' },
    },
  },
  MuiIconButton: {
    styleOverrides: {
      root: ({ theme }) => ({
        width: 48,
        height: 48,
        borderRadius: 2,
        border: `1px solid ${theme.vars.palette.divider}`,
        color: theme.vars.palette.text.primary,
        '&:hover': { borderColor: theme.vars.palette.brand.lineStrong, backgroundColor: 'transparent' },
      }),
    },
  },
  MuiLink: {
    defaultProps: { underline: 'always', component: LinkBehavior },
    styleOverrides: { root: { textUnderlineOffset: '0.2em' } },
  },
  MuiOutlinedInput: {
    styleOverrides: {
      root: ({ theme }) => ({
        borderRadius: 2,
        backgroundColor: theme.vars.palette.background.paper,
        '& .MuiOutlinedInput-notchedOutline': { borderColor: theme.vars.palette.brand.lineStrong },
        '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: theme.vars.palette.brand.subtle },
      }),
      input: { minHeight: 24, paddingBlock: 12 },
    },
  },
  MuiInputLabel: {
    defaultProps: { shrink: true },
    styleOverrides: {
      root: ({ theme }) => ({
        position: 'static',
        transform: 'none',
        marginBottom: 8,
        fontSize: '0.9375rem',
        fontWeight: 500,
        color: theme.vars.palette.text.primary,
        '&.Mui-focused': { color: theme.vars.palette.text.primary },
      }),
      asterisk: ({ theme }) => ({ color: theme.vars.palette.primary.main }),
    },
  },
  MuiTextField: {
    defaultProps: { fullWidth: true, variant: 'outlined' },
    styleOverrides: {
      root: {
        // Labels sit above the field (not floating) — easier to scan and to tap.
        '& .MuiOutlinedInput-notchedOutline legend': { display: 'none' },
        '& .MuiOutlinedInput-notchedOutline': { top: 0 },
      },
    },
  },
  MuiFormHelperText: {
    styleOverrides: { root: { marginInline: 0, marginTop: 6, fontSize: '0.8125rem' } },
  },
  MuiFormLabel: {
    styleOverrides: {
      root: ({ theme }) => ({ color: theme.vars.palette.text.primary, '&.Mui-focused': { color: theme.vars.palette.text.primary } }),
    },
  },
  MuiChip: {
    styleOverrides: {
      root: { borderRadius: 2, height: 'auto', minHeight: 28 },
      label: { paddingBlock: 2 },
    },
  },
  MuiBreadcrumbs: {
    styleOverrides: {
      root: ({ theme }) => ({ ...theme.typography.overline, letterSpacing: '0.08em', color: theme.vars.palette.brand.subtle }),
      li: { display: 'inline-flex', alignItems: 'center', minHeight: 32 },
    },
  },
  MuiDrawer: {
    styleOverrides: { paper: { backgroundImage: 'none' } },
  },
  MuiPaper: {
    styleOverrides: { root: { backgroundImage: 'none' } },
  },
}
