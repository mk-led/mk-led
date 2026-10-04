// Generates responsive AVIF / WebP / JPEG renditions for every image in /media-src.
//   npm run images
// Output: public/media/<stem>-<width>.<ext>. Widths must match IMAGE_WIDTHS in src/content/images.ts.
// Unchanged sources are skipped, so re-running is cheap.
import { existsSync, mkdirSync, readdirSync, statSync } from 'node:fs'
import { extname, basename, join } from 'node:path'
import sharp from 'sharp'

const SRC = 'media-src'
const OUT = 'public/media'
const WIDTHS = [480, 800, 1200, 1600, 1920]
const FORMATS = [
  ['avif', (img) => img.avif({ quality: 50, effort: 6 })],
  ['webp', (img) => img.webp({ quality: 74 })],
  ['jpg', (img) => img.jpeg({ quality: 78, mozjpeg: true, progressive: true })],
]

mkdirSync(OUT, { recursive: true })
let written = 0

for (const file of readdirSync(SRC)) {
  if (!/\.(jpe?g|png|webp|tiff?)$/i.test(file)) continue
  const input = join(SRC, file)
  const stem = basename(file, extname(file))
  if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(stem)) {
    console.warn(`! ${file}: rename to lowercase-hyphenated words (it becomes the public URL)`)
    continue
  }
  const { width: sourceWidth } = await sharp(input).metadata()
  const sourceTime = statSync(input).mtimeMs

  for (const width of WIDTHS) {
    // Never upscale: the largest rendition is capped at the source width.
    if (width > sourceWidth && width !== WIDTHS.find((w) => w >= sourceWidth)) continue
    const target = Math.min(width, sourceWidth)
    for (const [ext, encode] of FORMATS) {
      const out = join(OUT, `${stem}-${width}.${ext}`)
      if (existsSync(out) && statSync(out).mtimeMs > sourceTime) continue
      await encode(sharp(input).rotate().resize({ width: target, withoutEnlargement: true })).toFile(out)
      written++
    }
  }
  console.log(`✓ ${stem}`)
}
console.log(`${written} file(s) written to ${OUT}`)
