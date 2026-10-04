// Build-time pre-rendering.
//
// After `vite build` (client) and `vite build --ssr` (server entry), this writes a complete
// HTML document for every indexable URL, so crawlers, link previews and AI agents get the
// full content without running JavaScript. The browser then hydrates the same markup.
//
// It also generates sitemap.xml and robots.txt from the same route list — they can never
// drift from the actual pages.
import { mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { pathToFileURL } from 'node:url'

const DIST = 'dist'
const SSR_ENTRY = join('dist-ssr', 'entry-server.js')

const template = readFileSync(join(DIST, 'index.html'), 'utf8')
const { render, indexablePaths, site } = await import(pathToFileURL(SSR_ENTRY).href)

/** React 19 emits hoistable metadata at the start of the markup; move it into <head>. */
function splitHead(html) {
  const pattern = /^(?:<title>[\s\S]*?<\/title>|<meta [^>]*\/?>|<link [^>]*\/?>|<script type="application\/ld\+json">[\s\S]*?<\/script>)/
  let head = ''
  let rest = html
  for (let match = rest.match(pattern); match; match = rest.match(pattern)) {
    head += match[0]
    rest = rest.slice(match[0].length)
  }
  return { head, body: rest }
}

/** Render-blocking stylesheets must not queue behind module preloads: move them first in <head>. */
function cssFirst(doc) {
  const sheets = doc.match(/<link rel="stylesheet"[^>]*>/g) ?? []
  let out = doc
  for (const sheet of sheets) out = out.replace(sheet, '')
  return out.replace('<meta name="viewport"', `${sheets.join('')}\n    <meta name="viewport"`)
}

function page(html, styles) {
  const { head, body } = splitHead(html)
  if (!head.includes('<title>')) throw new Error('Rendered page has no <title>')
  return cssFirst(template.replace('<!--app-head-->', `${head}\n${styles}`).replace('<!--app-html-->', body))
}

async function writePage(path, file) {
  const { html, styles, status } = await render(path)
  const out = join(DIST, file)
  mkdirSync(dirname(out), { recursive: true })
  writeFileSync(out, page(html, styles))
  return status
}

const entries = indexablePaths()
for (const { path } of entries) {
  const file = path === '/' ? 'index.html' : join(path.slice(1), 'index.html')
  const status = await writePage(path, file)
  if (status !== 200) throw new Error(`${path} rendered with status ${status}`)
  console.log(`✓ ${path}`)
}

// 404 page for the host to serve with a 404 status.
await writePage('/__not-found__', '404.html')
console.log('✓ 404.html')

const lastmod = new Date().toISOString().slice(0, 10)
const urls = entries
  .map(
    ({ path, priority, changefreq }) =>
      `  <url><loc>${site.url}${path === '/' ? '/' : path}</loc><lastmod>${lastmod}</lastmod><changefreq>${changefreq}</changefreq><priority>${priority.toFixed(1)}</priority></url>`,
  )
  .join('\n')
writeFileSync(join(DIST, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`)

writeFileSync(
  join(DIST, 'robots.txt'),
  ['User-agent: *', 'Allow: /', 'Disallow: /admin', 'Disallow: /auth', 'Disallow: /internal', 'Disallow: /api', '', `Sitemap: ${site.url}/sitemap.xml`, ''].join('\n'),
)

rmSync('dist-ssr', { recursive: true, force: true })
console.log(`Pre-rendered ${entries.length} pages + 404, sitemap.xml (${entries.length} URLs) and robots.txt`)
