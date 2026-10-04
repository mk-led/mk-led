import { existsSync } from 'node:fs'
import { describe, expect, it } from 'vitest'
import { getImage, IMAGE_WIDTHS, images } from './images'
import { minimumViewingDistance, pitchGuides, pixelsPerSquareMetre, wallResolution } from './pitch'
import { getProduct, products } from './products'
import { projects } from './projects'
import { articles } from './resources'
import { getService, services } from './services'
import { getSolution, solutions } from './solutions'

describe('pixel pitch geometry', () => {
  it('computes pixels per square metre', () => {
    expect(pixelsPerSquareMetre(2)).toBe(250_000)
    expect(pixelsPerSquareMetre(2.5)).toBe(160_000)
    expect(pixelsPerSquareMetre(3)).toBe(111_111)
    expect(pixelsPerSquareMetre(4)).toBe(62_500)
  })

  it('computes whole-pixel wall resolution and the viewing rule of thumb', () => {
    expect(wallResolution(4, 2.25, 2)).toEqual({ width: 2000, height: 1125 })
    expect(minimumViewingDistance(2.5)).toBe(2.5)
  })

  it('has a guide for every pitch series', () => {
    expect(products.filter((p) => p.kind === 'series').map((p) => p.pixelPitch)).toEqual(pitchGuides.map((g) => g.pitchMm))
  })
})

describe('content integrity', () => {
  it.each([
    ['products', products.map((p) => p.slug)],
    ['solutions', solutions.map((s) => s.slug)],
    ['services', services.map((s) => s.slug)],
    ['articles', articles.map((a) => a.slug)],
  ])('%s have unique, URL-safe slugs', (_, slugs) => {
    expect(new Set(slugs).size).toBe(slugs.length)
    for (const slug of slugs) expect(slug).toMatch(/^[a-z0-9]+(-[a-z0-9]+)*$/)
  })

  it('cross-references point to existing pages', () => {
    for (const p of products) {
      p.relatedSolutions.forEach((s) => expect(getSolution(s), `${p.slug} → ${s}`).toBeDefined())
      p.relatedServices.forEach((s) => expect(getService(s), `${p.slug} → ${s}`).toBeDefined())
    }
    for (const s of solutions) {
      s.recommendedProducts.forEach((p) => expect(getProduct(p), `${s.slug} → ${p}`).toBeDefined())
      s.relatedServices.forEach((x) => expect(getService(x), `${s.slug} → ${x}`).toBeDefined())
    }
    for (const a of articles) {
      a.relatedProducts.forEach((p) => expect(getProduct(p), `${a.slug} → ${p}`).toBeDefined())
      a.relatedServices.forEach((x) => expect(getService(x), `${a.slug} → ${x}`).toBeDefined())
    }
    for (const pr of projects) if (pr.product) expect(getProduct(pr.product), pr.slug).toBeDefined()
  })

  it('does not ship unverified viewing-distance specifications', () => {
    // Populate viewingDistance only from a verified datasheet, then update this test deliberately.
    expect(products.every((p) => p.viewingDistance === null)).toBe(true)
  })

  it('keeps meta descriptions within a readable length', () => {
    for (const d of [...products, ...solutions, ...services, ...articles].map((x) => x.description)) {
      expect(d.length, d).toBeGreaterThan(70)
      expect(d.length, d).toBeLessThanOrEqual(200)
    }
  })
})

describe('image registry', () => {
  it('references only registered images', () => {
    const keys = [...products.map((p) => p.image), ...solutions.map((s) => s.image), ...services.map((s) => s.image), ...projects.map((p) => p.image)]
    for (const key of keys.filter(Boolean)) expect(getImage(key), key!).not.toBeNull()
  })

  it('has generated renditions and alt text for every image', () => {
    for (const image of Object.values(images)) {
      expect(image.alt.length, image.src).toBeGreaterThan(15)
      expect(image.src).toMatch(/^[a-z0-9]+(-[a-z0-9]+)*$/)
      for (const ext of ['avif', 'webp', 'jpg']) {
        expect(existsSync(`public/media/${image.src}-${IMAGE_WIDTHS[0]}.${ext}`), `${image.src} ${ext}`).toBe(true)
      }
    }
  })

  it('credits every representative image', () => {
    for (const image of Object.values(images)) if (image.representative) expect(image.credit, image.src).not.toBeNull()
  })
})
