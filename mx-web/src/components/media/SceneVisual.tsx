import { useId } from 'react'

export type SceneKind = 'interior' | 'facade' | 'billboard' | 'stage' | 'column'

interface SceneVisualProps {
  kind: SceneKind
  /** Any stable string — selects the content colour so neighbouring tiles differ. */
  seed?: string
  /** Explicit palette index, overriding the seed. */
  palette?: number
  className?: string
}

/** Restrained "content" palettes for the lit screen: [core, edge]. */
const PALETTES: [string, string][] = [
  ['#3cc8f5', '#0b2c6b'],
  ['#ffd2a6', '#7a2e12'],
  ['#9fb4ff', '#1b1f5c'],
  ['#e8f4ff', '#20425e'],
  ['#ff9a6b', '#3d0f2a'],
]

function hash(value: string): number {
  let h = 0
  for (let i = 0; i < value.length; i++) h = (h * 31 + value.charCodeAt(i)) | 0
  return Math.abs(h)
}

interface Screen {
  x: number
  y: number
  w: number
  h: number
  rx?: number
}

const SCREENS: Record<SceneKind, Screen> = {
  interior: { x: 190, y: 120, w: 420, h: 236 },
  facade: { x: 300, y: 90, w: 260, h: 300 },
  billboard: { x: 230, y: 110, w: 340, h: 150 },
  stage: { x: 90, y: 110, w: 620, h: 240 },
  column: { x: 340, y: 60, w: 120, h: 360, rx: 60 },
}

/**
 * Architectural placeholder used wherever a project or product has no photograph yet.
 * A single lit LED surface in a dark perspective space — never stock imagery.
 * Replace by setting `image` on the content record.
 */
export function SceneVisual({ kind, seed = kind, palette, className }: SceneVisualProps) {
  const id = useId().replace(/[^a-zA-Z0-9_-]/g, '')
  const [core, edge] = PALETTES[(palette ?? hash(seed)) % PALETTES.length]!
  const s = SCREENS[kind]
  const horizon = kind === 'facade' || kind === 'billboard' ? 400 : 372
  const vx = 400
  const lines = Array.from({ length: 13 }, (_, i) => -400 + i * 133)

  return (
    <svg className={className} viewBox="0 0 800 500" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <defs>
        <linearGradient id={`${id}-sky`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#0b0d10" />
          <stop offset="1" stopColor="#050608" />
        </linearGradient>
        <radialGradient id={`${id}-content`} cx="0.62" cy="0.4" r="0.85">
          <stop offset="0" stopColor={core} />
          <stop offset="0.55" stopColor={edge} />
          <stop offset="1" stopColor="#05070a" />
        </radialGradient>
        <pattern id={`${id}-px`} width="4" height="4" patternUnits="userSpaceOnUse">
          {/* Mask luminance: gaps dim the surface, LED cells pass it through. */}
          <rect width="4" height="4" fill="#3a3a3a" />
          <rect x="0.6" y="0.6" width="2.8" height="2.8" rx="0.5" fill="#fff" />
        </pattern>
        <mask id={`${id}-gaps`}>
          <rect width="800" height="500" fill="#fff" />
          <rect x={s.x} y={s.y} width={s.w} height={s.h} rx={s.rx} fill={`url(#${id}-px)`} />
        </mask>
        <filter id={`${id}-glow`} x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="38" />
        </filter>
        <linearGradient id={`${id}-reflect`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={core} stopOpacity="0.16" />
          <stop offset="1" stopColor={core} stopOpacity="0" />
        </linearGradient>
      </defs>

      <rect width="800" height="500" fill={`url(#${id}-sky)`} />

      {/* Perspective floor and ceiling lines converge on the screen — the architectural frame. */}
      <g stroke="#ffffff" strokeOpacity="0.07" strokeWidth="1">
        <line x1="0" y1={horizon} x2="800" y2={horizon} />
        {lines.map((x) => (
          <line key={`f${x}`} x1={vx} y1={horizon} x2={x * 1.8 + 400} y2="500" />
        ))}
        {kind === 'interior' || kind === 'stage'
          ? lines.map((x) => <line key={`c${x}`} x1={vx} y1={60} x2={x * 1.8 + 400} y2="0" />)
          : null}
      </g>

      {kind === 'facade' && (
        <g fill="#0f1215" stroke="#ffffff" strokeOpacity="0.06">
          <rect x="250" y="40" width="360" height={horizon - 40} />
          {Array.from({ length: 8 }, (_, i) => (
            <line key={i} x1="250" y1={60 + i * 42} x2="610" y2={60 + i * 42} />
          ))}
        </g>
      )}
      {kind === 'billboard' && <rect x={396} y={s.y + s.h} width="8" height={horizon - s.y - s.h} fill="#15181c" />}
      {kind === 'stage' && (
        <g stroke="#ffffff" strokeOpacity="0.14" fill="none">
          <rect x={s.x - 20} y={s.y - 30} width={s.w + 40} height="12" />
          <rect x="60" y={s.y + s.h + 14} width="680" height="14" fill="#0d0f12" />
        </g>
      )}

      {/* Controlled glow, then the lit surface with its pixel structure. */}
      <rect x={s.x} y={s.y} width={s.w} height={s.h} rx={s.rx} fill={core} opacity="0.32" filter={`url(#${id}-glow)`} />
      <rect x={s.x} y={s.y} width={s.w} height={s.h} rx={s.rx} fill={`url(#${id}-content)`} mask={`url(#${id}-gaps)`} />
      <rect x={s.x} y={s.y} width={s.w} height={s.h} rx={s.rx} fill="none" stroke="#ffffff" strokeOpacity="0.12" />

      {/* Floor reflection */}
      <rect x={s.x} y={horizon} width={s.w} height={500 - horizon} fill={`url(#${id}-reflect)`} />
    </svg>
  )
}
