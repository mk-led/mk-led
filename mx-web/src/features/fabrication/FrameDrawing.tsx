import { fontMono } from '../../theme/typography'

/**
 * Technical-drawing illustration of an LED frame: front elevation on a cabinet grid,
 * dimension lines and a section callout. Dimensions are symbolic ("to survey") —
 * every frame is drawn to its own site.
 */
export function FrameDrawing({ className }: { className?: string }) {
  const cols = 5
  const rows = 3
  const x0 = 80
  const y0 = 70
  const cell = 84
  const w = cols * cell
  const h = rows * cell

  return (
    <svg className={className} viewBox="0 0 720 480" role="img" aria-labelledby="frame-drawing-title" fill="none">
      <title id="frame-drawing-title">Technical drawing of a custom LED display frame with a cabinet grid, dimension lines and a section detail</title>
      <defs>
        <pattern id="frame-hatch" width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
          <line x1="0" y1="0" x2="0" y2="6" stroke="currentColor" strokeOpacity="0.35" />
        </pattern>
        <marker id="frame-arrow" viewBox="0 0 8 8" refX="4" refY="4" markerWidth="8" markerHeight="8" orient="auto-start-reverse">
          <path d="M0 0 L8 4 L0 8" fill="none" stroke="var(--mk-palette-primary-main)" />
        </marker>
      </defs>

      {/* Construction grid */}
      <g stroke="currentColor" strokeOpacity="0.06">
        {Array.from({ length: 19 }, (_, i) => (
          <line key={`v${i}`} x1={i * 40} y1="0" x2={i * 40} y2="480" />
        ))}
        {Array.from({ length: 13 }, (_, i) => (
          <line key={`h${i}`} x1="0" y1={i * 40} x2="720" y2={i * 40} />
        ))}
      </g>

      {/* Outer frame (hatched member) */}
      <rect x={x0 - 12} y={y0 - 12} width={w + 24} height={h + 24} fill="url(#frame-hatch)" stroke="currentColor" strokeOpacity="0.8" />
      <rect x={x0} y={y0} width={w} height={h} fill="var(--mk-palette-background-default)" stroke="currentColor" strokeOpacity="0.8" />

      {/* Cabinet grid */}
      <g stroke="currentColor" strokeOpacity="0.4">
        {Array.from({ length: cols - 1 }, (_, i) => (
          <line key={`c${i}`} x1={x0 + (i + 1) * cell} y1={y0} x2={x0 + (i + 1) * cell} y2={y0 + h} />
        ))}
        {Array.from({ length: rows - 1 }, (_, i) => (
          <line key={`r${i}`} x1={x0} y1={y0 + (i + 1) * cell} x2={x0 + w} y2={y0 + (i + 1) * cell} />
        ))}
      </g>
      <rect x={x0 + 2 * cell} y={y0 + cell} width={cell} height={cell} fill="var(--mk-palette-brand-accentSoft)" stroke="var(--mk-palette-primary-main)" />

      {/* Fixing points */}
      <g fill="currentColor" fillOpacity="0.7">
        {Array.from({ length: cols + 1 }, (_, i) =>
          [y0 - 6, y0 + h + 6].map((y) => <circle key={`${i}-${y}`} cx={x0 + i * cell} cy={y} r="2.5" />),
        )}
      </g>

      {/* Dimensions */}
      <g stroke="var(--mk-palette-primary-main)" strokeWidth="1">
        <line x1={x0 - 12} y1={y0 + h + 44} x2={x0 + w + 12} y2={y0 + h + 44} markerStart="url(#frame-arrow)" markerEnd="url(#frame-arrow)" />
        <line x1={x0 + w + 44} y1={y0 - 12} x2={x0 + w + 44} y2={y0 + h + 12} markerStart="url(#frame-arrow)" markerEnd="url(#frame-arrow)" />
      </g>
      <g fill="var(--mk-palette-primary-main)" fontFamily={fontMono} fontSize="11" letterSpacing="1">
        <text x={x0 + w / 2} y={y0 + h + 64} textAnchor="middle">
          W — TO SURVEY
        </text>
        <text x={x0 + w + 60} y={y0 + h / 2} transform={`rotate(90 ${x0 + w + 60} ${y0 + h / 2})`} textAnchor="middle">
          H — TO SURVEY
        </text>
      </g>

      {/* Section callout */}
      <g stroke="currentColor" strokeOpacity="0.6">
        <line x1={x0 + 2.5 * cell} y1={y0 + 1.5 * cell} x2="610" y2="420" strokeDasharray="3 4" />
        <circle cx="610" cy="420" r="34" fill="var(--mk-palette-background-default)" />
        <rect x="592" y="402" width="12" height="36" fill="url(#frame-hatch)" />
        <rect x="604" y="408" width="22" height="24" stroke="var(--mk-palette-primary-main)" />
      </g>
      <g fill="currentColor" fillOpacity="0.7" fontFamily={fontMono} fontSize="10" letterSpacing="1">
        <text x={x0 - 12} y={y0 - 26}>
          FRONT ELEVATION — LED FRAME
        </text>
        <text x="560" y="372">
          SECTION A
        </text>
        <text x={x0 + 2 * cell + 6} y={y0 + cell + 16} fill="var(--mk-palette-primary-main)" fillOpacity="1">
          CABINET
        </text>
      </g>
    </svg>
  )
}
