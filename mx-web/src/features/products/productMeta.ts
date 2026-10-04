import type { Product } from '../../content/types'

/** Short label shown above a product name: pitch for series, environment for categories. */
export function productMetaLabel(product: Product): string {
  if (product.pixelPitch !== null) return `Pixel pitch ${product.pixelPitch} mm`
  if (product.environment) return product.environment.map((e) => (e === 'indoor' ? 'Indoor' : 'Outdoor')).join(' / ')
  return 'Configured per project'
}

/** Human-readable environment line for the specification table. */
export function environmentLabel(product: Product): string {
  if (!product.environment) return 'Indoor or outdoor configurations — confirmed per project'
  return product.environment.map((e) => (e === 'indoor' ? 'Indoor' : 'Outdoor')).join(' and ')
}
