// Generates raster brand assets from SVG: Open Graph image, logo, favicons and PWA icons.
//   npm run brand-assets
// Re-run after changing the logo or brand colours. Outputs are committed in /public.
import { mkdirSync, writeFileSync } from 'node:fs'
import sharp from 'sharp'

const company = JSON.parse(await import('node:fs').then((fs) => fs.readFileSync('src/content/company.json', 'utf8')))
const INK = '#08090b'
const RED = '#ff3d4f'
const GREEN = '#27d77f'
const BLUE = '#2f86ff'
const ACCENT = '#3cc8f5'

const mark = (x, y, s) => `
  <g transform="translate(${x} ${y}) scale(${s / 28})">
    <rect x="0.5" y="0.5" width="27" height="27" rx="2" fill="none" stroke="#f3f2ee" stroke-opacity="0.35"/>
    <rect x="6" y="6" width="4" height="16" rx="1" fill="${RED}"/>
    <rect x="12" y="6" width="4" height="16" rx="1" fill="${GREEN}"/>
    <rect x="18" y="6" width="4" height="16" rx="1" fill="${BLUE}"/>
  </g>`

const icon = (size, padding) => {
  const inner = size - padding * 2
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
    <rect width="${size}" height="${size}" fill="${INK}"/>
    <g transform="translate(${padding} ${padding}) scale(${inner / 32})">
      <rect x="7" y="7" width="4.5" height="18" rx="1" fill="${RED}"/>
      <rect x="13.75" y="7" width="4.5" height="18" rx="1" fill="${GREEN}"/>
      <rect x="20.5" y="7" width="4.5" height="18" rx="1" fill="${BLUE}"/>
    </g>
  </svg>`
}

// LED pixel field for the share image: a soft cyan glow sampled on a 14px grid.
let pixels = ''
for (let y = 0; y < 630; y += 14) {
  for (let x = 560; x < 1200; x += 14) {
    const d = Math.hypot((x - 930) / 260, (y - 300) / 220)
    const a = Math.max(0, 0.95 - d * 0.75)
    if (a > 0.04) pixels += `<rect x="${x}" y="${y}" width="9" height="9" rx="1.5" fill="${ACCENT}" fill-opacity="${a.toFixed(2)}"/>`
  }
}

const og = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <rect width="1200" height="630" fill="${INK}"/>
  ${pixels}
  <rect width="1200" height="630" fill="url(#fade)"/>
  <defs><linearGradient id="fade" x1="0" x2="1"><stop offset="0.35" stop-color="${INK}"/><stop offset="0.75" stop-color="${INK}" stop-opacity="0"/></linearGradient></defs>
  ${mark(80, 80, 56)}
  <text x="152" y="120" font-family="Segoe UI, Inter, Arial, sans-serif" font-size="34" font-weight="700" letter-spacing="3" fill="#f3f2ee">MK<tspan fill="${ACCENT}">-</tspan>LED</text>
  <text x="80" y="330" font-family="Segoe UI, Inter, Arial, sans-serif" font-size="72" font-weight="700" letter-spacing="-2" fill="#f3f2ee">Professional LED</text>
  <text x="80" y="410" font-family="Segoe UI, Inter, Arial, sans-serif" font-size="72" font-weight="700" letter-spacing="-2" fill="#f3f2ee">Display Solutions</text>
  <text x="80" y="480" font-family="Segoe UI, Inter, Arial, sans-serif" font-size="26" fill="#a7a9ad">Indoor &amp; outdoor LED walls · Fabrication · Installation · Support</text>
  <text x="80" y="560" font-family="Consolas, monospace" font-size="22" letter-spacing="2" fill="${ACCENT}">${company.url.replace('https://', '')}</text>
</svg>`

const logo = `<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512">
  <rect width="512" height="512" fill="${INK}"/>${mark(96, 96, 320)}</svg>`

mkdirSync('public/og', { recursive: true })
mkdirSync('public/brand', { recursive: true })

const png = (svg, out, size) => sharp(Buffer.from(svg)).resize(size, size).png({ compressionLevel: 9 }).toFile(out)

await sharp(Buffer.from(og)).png({ compressionLevel: 9 }).toFile('public/og/mk-led-og.png')
await png(logo, 'public/brand/mk-led-logo-512.png', 512)
await png(icon(180, 18), 'public/apple-touch-icon.png', 180)
await png(icon(32, 0), 'public/favicon-32.png', 32)
await png(icon(192, 24), 'public/icon-192.png', 192)
await png(icon(512, 64), 'public/icon-512.png', 512)
await png(icon(512, 104), 'public/icon-512-maskable.png', 512)

writeFileSync(
  'public/site.webmanifest',
  JSON.stringify(
    {
      name: `${company.name} — ${company.statement}`,
      short_name: company.name,
      start_url: '/',
      display: 'standalone',
      background_color: INK,
      theme_color: INK,
      icons: [
        { src: '/icon-192.png', sizes: '192x192', type: 'image/png' },
        { src: '/icon-512.png', sizes: '512x512', type: 'image/png' },
        { src: '/icon-512-maskable.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
      ],
    },
    null,
    2,
  ) + '\n',
)
console.log('Brand assets written to /public')
