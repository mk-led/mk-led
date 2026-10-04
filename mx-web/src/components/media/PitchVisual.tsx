import { useId } from 'react'
import { media } from '../../theme/colors'

interface PitchVisualProps {
  pitchMm: number
  /** Physical width of the magnified window in millimetres; all pitches compared at the same scale. */
  windowMm?: number
  aspect?: number
  /** Show each pixel's red/green/blue sub-pixels (best at large sizes). */
  subpixels?: boolean
  className?: string
  title?: string
}

/**
 * A to-scale magnification of an LED surface: every dot is one real pixel at the given pitch.
 * Comparing P2 and P4 side by side shows density honestly, without photography.
 *
 * Built from one repeating SVG pattern (one tile per pixel) multiplied by a soft "image" —
 * so each sub-pixel is tinted by the content behind it, the way a real LED wall works —
 * keeping the markup ~1 KB regardless of pixel count.
 */
export function PitchVisual({ pitchMm, windowMm = 48, aspect = 4 / 3, subpixels = false, className, title }: PitchVisualProps) {
  const id = useId().replace(/[^a-zA-Z0-9_-]/g, '')
  const heightMm = windowMm / aspect
  // Centre the pixel grid in the window.
  const offsetX = (windowMm - Math.floor(windowMm / pitchMm) * pitchMm) / 2
  const offsetY = (heightMm - Math.floor(heightMm / pitchMm) * pitchMm) / 2
  const led = pitchMm * 0.42
  const start = (pitchMm - led) / 2
  const bar = led / 3.4

  return (
    <svg
      className={className}
      style={{ width: '100%', height: '100%', background: media.black }}
      viewBox={`0 0 ${windowMm} ${heightMm}`}
      preserveAspectRatio="xMidYMid slice"
      role={title ? 'img' : undefined}
      aria-hidden={title ? undefined : true}
      aria-labelledby={title ? `${id}-title` : undefined}
    >
      {title && <title id={`${id}-title`}>{title}</title>}
      <defs>
        <pattern id={`${id}-px`} x={offsetX} y={offsetY} width={pitchMm} height={pitchMm} patternUnits="userSpaceOnUse">
          {subpixels ? (
            <>
              <rect x={start} y={start} width={bar} height={led} rx={bar / 3} fill="#ff2a2a" />
              <rect x={start + (led - bar) / 2} y={start} width={bar} height={led} rx={bar / 3} fill="#2aff5a" />
              <rect x={start + led - bar} y={start} width={bar} height={led} rx={bar / 3} fill="#3a6bff" />
            </>
          ) : (
            <rect x={start} y={start} width={led} height={led} rx={led * 0.18} fill="#fff" />
          )}
        </pattern>
        <radialGradient id={`${id}-cool`} cx="0.68" cy="0.4" r="0.55">
          <stop offset="0" stopColor="rgb(64 208 255)" />
          <stop offset="1" stopColor="rgb(64 208 255)" stopOpacity="0" />
        </radialGradient>
        <radialGradient id={`${id}-warm`} cx="0.2" cy="0.85" r="0.45">
          <stop offset="0" stopColor="rgb(244 158 76)" />
          <stop offset="1" stopColor="rgb(244 158 76)" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width={windowMm} height={heightMm} fill={`url(#${id}-px)`} />
      {/* The displayed "image", multiplied onto the LEDs. Gaps stay black. */}
      <g style={{ mixBlendMode: 'multiply' }}>
        <rect width={windowMm} height={heightMm} fill="rgb(72 80 96)" />
        <rect width={windowMm} height={heightMm} fill={`url(#${id}-warm)`} />
        <rect width={windowMm} height={heightMm} fill={`url(#${id}-cool)`} />
      </g>
    </svg>
  )
}
