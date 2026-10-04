// Local static server for the pre-rendered build — behaves like production hosting:
// /products → dist/products/index.html, unknown paths → dist/404.html with status 404,
// /path/ → 301 to /path (canonical URLs have no trailing slash).
//   npm run build && npm run serve      (PORT=4180 by default)
import { createReadStream, existsSync, statSync } from 'node:fs'
import { createServer } from 'node:http'
import { extname, join, normalize } from 'node:path'
import { createBrotliCompress, createGzip } from 'node:zlib'

const ROOT = 'dist'
const PORT = Number(process.env.PORT ?? 4180)
const TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.webmanifest': 'application/manifest+json',
  '.xml': 'application/xml',
  '.txt': 'text/plain; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.webp': 'image/webp',
  '.avif': 'image/avif',
  '.woff2': 'font/woff2',
}

function resolve(pathname) {
  const safe = normalize(decodeURIComponent(pathname)).replace(/^(\.\.[/\\])+/, '')
  const direct = join(ROOT, safe)
  if (existsSync(direct) && statSync(direct).isFile()) return direct
  const index = join(ROOT, safe, 'index.html')
  return existsSync(index) ? index : null
}

createServer((req, res) => {
  const { pathname } = new URL(req.url, 'http://localhost')
  if (pathname.length > 1 && pathname.endsWith('/')) {
    res.writeHead(301, { Location: pathname.slice(0, -1) }).end()
    return
  }
  const file = resolve(pathname)
  const status = file ? 200 : 404
  const path = file ?? join(ROOT, '404.html')
  const immutable = path.includes(`${ROOT}/assets/`) || path.includes(`${ROOT}\\assets\\`)
  // Compress text like a production CDN would, so local Lighthouse numbers are realistic.
  const compressible = /\.(html|js|css|json|xml|txt|svg|webmanifest)$/.test(path)
  const accept = String(req.headers['accept-encoding'] ?? '')
  const encoding = compressible ? (accept.includes('br') ? 'br' : accept.includes('gzip') ? 'gzip' : null) : null
  res.writeHead(status, {
    'Content-Type': TYPES[extname(path)] ?? 'application/octet-stream',
    'Cache-Control': immutable ? 'public, max-age=31536000, immutable' : 'no-cache',
    ...(encoding && { 'Content-Encoding': encoding, Vary: 'Accept-Encoding' }),
  })
  const stream = createReadStream(path)
  if (encoding === 'br') stream.pipe(createBrotliCompress()).pipe(res)
  else if (encoding === 'gzip') stream.pipe(createGzip()).pipe(res)
  else stream.pipe(res)
}).listen(PORT, () => console.log(`Serving ${ROOT}/ at http://localhost:${PORT}`))
