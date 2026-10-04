import { useEffect, useRef } from 'react'
import { prefersReducedMotion } from '../../lib/motion'
import { media } from '../../theme/colors'

/** CSS pixels per LED. Large enough to read as an LED wall, small enough to feel premium. */
const LED_SIZE = 7
/** LEDs per cabinet edge — draws the faint seams between cabinets. */
const CABINET_LEDS = 32
const FRAME_INTERVAL = 1000 / 30

type Rgb = readonly [number, number, number]

interface Light {
  colour: Rgb
  x: number
  y: number
  radius: number
  speed: number
  phase: number
  drift: number
}

/** Slow, restrained light fields — cinematic rather than "screensaver". */
const LIGHTS: Light[] = [
  { colour: [60, 200, 245], x: 0.72, y: 0.38, radius: 0.32, speed: 0.11, phase: 0, drift: 0.12 },
  { colour: [24, 60, 170], x: 0.45, y: 0.7, radius: 0.42, speed: 0.07, phase: 2.1, drift: 0.18 },
  { colour: [255, 214, 170], x: 0.88, y: 0.18, radius: 0.18, speed: 0.13, phase: 4.2, drift: 0.08 },
  { colour: [255, 120, 60], x: 0.6, y: 0.85, radius: 0.16, speed: 0.09, phase: 1.3, drift: 0.1 },
]
const BASE: Rgb = [7, 9, 12]

/**
 * A rendered LED wall used as the hero visual when no hero film is configured.
 * The light field is computed at one sample per LED and scaled up with nearest-neighbour
 * filtering, then a mask adds pixel gaps and cabinet seams — cheap enough for 30 fps.
 * Pauses when off-screen or in a background tab; renders a still frame for reduced motion.
 */
export function LedWall({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d')
    const field = document.createElement('canvas')
    const fieldCtx = field.getContext('2d')
    if (!canvas || !ctx || !fieldCtx) return

    let cols = 0
    let rows = 0
    let dpr = 1
    let image: ImageData | null = null
    let mask: CanvasPattern | null = null
    let frame = 0
    let last = 0
    let visible = true

    const buildMask = () => {
      const tile = document.createElement('canvas')
      const size = Math.round(CABINET_LEDS * LED_SIZE * dpr)
      tile.width = size
      tile.height = size
      const t = tile.getContext('2d')
      if (!t) return null
      const step = LED_SIZE * dpr
      const gap = Math.max(1, Math.round(1.6 * dpr))
      t.fillStyle = 'rgba(3, 4, 6, 0.9)'
      for (let i = 0; i < CABINET_LEDS; i++) {
        const p = Math.round(i * step)
        t.fillRect(p, 0, gap, size)
        t.fillRect(0, p, size, gap)
      }
      t.fillStyle = 'rgba(0, 0, 0, 0.95)'
      t.fillRect(0, 0, gap + 1, size)
      t.fillRect(0, 0, size, gap + 1)
      return ctx.createPattern(tile, 'repeat')
    }

    const resize = () => {
      const { width, height } = canvas.getBoundingClientRect()
      if (!width || !height) return
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = Math.round(width * dpr)
      canvas.height = Math.round(height * dpr)
      cols = Math.ceil(width / LED_SIZE)
      rows = Math.ceil(height / LED_SIZE)
      field.width = cols
      field.height = rows
      image = fieldCtx.createImageData(cols, rows)
      mask = buildMask()
    }

    const draw = (timeMs: number) => {
      if (!image) return
      const t = timeMs / 1000
      const data = image.data
      const aspect = cols / Math.max(rows, 1)
      const lights = LIGHTS.map((l) => ({
        ...l,
        cx: l.x + Math.sin(t * l.speed + l.phase) * l.drift,
        cy: l.y + Math.cos(t * l.speed * 0.8 + l.phase) * l.drift * 0.6,
        inv: 1 / (l.radius * l.radius),
      }))
      // A slow architectural light sweep travelling across the wall.
      const sweep = ((t * 0.035) % 1.4) - 0.2

      for (let y = 0; y < rows; y++) {
        const v = y / rows
        for (let x = 0; x < cols; x++) {
          const u = x / cols
          let r = BASE[0]
          let g = BASE[1]
          let b = BASE[2]
          for (const l of lights) {
            const dx = (u - l.cx) * aspect * 0.55
            const dy = v - l.cy
            const w = Math.exp(-(dx * dx + dy * dy) * l.inv)
            r += l.colour[0] * w
            g += l.colour[1] * w
            b += l.colour[2] * w
          }
          const s = Math.exp(-((u - sweep - v * 0.25) ** 2) * 900) * 38
          // Fade toward the left where the headline sits, and toward the floor.
          const fade = Math.min(1, 0.25 + u * 1.1) * (1 - v * 0.35)
          const i = (y * cols + x) * 4
          data[i] = Math.min(255, (r + s) * fade)
          data[i + 1] = Math.min(255, (g + s) * fade)
          data[i + 2] = Math.min(255, (b + s) * fade)
          data[i + 3] = 255
        }
      }

      fieldCtx.putImageData(image, 0, 0)
      ctx.imageSmoothingEnabled = false
      ctx.drawImage(field, 0, 0, cols * LED_SIZE * dpr, rows * LED_SIZE * dpr)
      if (mask) {
        ctx.fillStyle = mask
        ctx.fillRect(0, 0, canvas.width, canvas.height)
      }
    }

    const reduced = prefersReducedMotion()
    const loop = (now: number) => {
      frame = requestAnimationFrame(loop)
      if (!visible || document.hidden || now - last < FRAME_INTERVAL) return
      last = now
      draw(now)
    }

    // Paint one still frame now; start animating only once the page is idle, so the light
    // show never competes with loading and hydration. Low-power devices keep the still frame.
    const lowPower = (navigator.hardwareConcurrency ?? 8) <= 4 || (navigator as { connection?: { saveData?: boolean } }).connection?.saveData === true
    resize()
    draw(12_000)
    const hasIdle = typeof window.requestIdleCallback === 'function'
    let idle = 0
    if (!reduced && !lowPower) {
      const start = () => {
        frame = requestAnimationFrame(loop)
      }
      idle = hasIdle ? window.requestIdleCallback(start, { timeout: 4000 }) : window.setTimeout(start, 2000)
    }

    const resizeObserver = new ResizeObserver(() => {
      resize()
      draw(reduced ? 12_000 : performance.now())
    })
    resizeObserver.observe(canvas)

    const visibility = new IntersectionObserver(([entry]) => {
      visible = entry?.isIntersecting ?? true
    })
    visibility.observe(canvas)

    return () => {
      if (hasIdle) window.cancelIdleCallback(idle)
      else window.clearTimeout(idle)
      cancelAnimationFrame(frame)
      resizeObserver.disconnect()
      visibility.disconnect()
    }
  }, [])

  return <canvas ref={canvasRef} className={className} style={{ width: '100%', height: '100%', background: media.black }} aria-hidden="true" />
}
