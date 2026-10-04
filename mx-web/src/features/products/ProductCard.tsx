import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { MediaFrame } from '../../components/media/MediaFrame'
import { PitchVisual } from '../../components/media/PitchVisual'
import { SceneVisual, type SceneKind } from '../../components/media/SceneVisual'
import { LinkCard } from '../../components/ui/LinkCard'
import type { Product } from '../../content/types'
import { paths } from '../../routes/paths'
import { productMetaLabel } from './productMeta'

const sceneForProduct: Record<string, SceneKind> = {
  'indoor-led-displays': 'interior',
  'outdoor-led-displays': 'facade',
  'event-led-displays': 'stage',
  'advertising-led-displays': 'billboard',
  'custom-led-displays': 'column',
}

/** Product photo, or — for pitch series — a to-scale render of the pixel grid. */
export function ProductVisual({ product, priority, caption, sizes }: { product: Product; priority?: boolean; caption?: boolean; sizes?: string }) {
  const fallback =
    product.pixelPitch !== null ? (
      <PitchVisual pitchMm={product.pixelPitch} title={`${product.pixelPitch} mm pixel pitch, shown to scale`} />
    ) : (
      <SceneVisual kind={sceneForProduct[product.slug] ?? 'interior'} seed={product.slug} />
    )
  return <MediaFrame imageKey={product.image} fallback={fallback} ratio="4 / 3" priority={priority} caption={caption} sizes={sizes ?? '(min-width: 1200px) 25vw, (min-width: 600px) 50vw, 100vw'} />
}

export function ProductCard({ product, headingLevel }: { product: Product; headingLevel?: 'h2' | 'h3' }) {
  return (
    <LinkCard
      href={paths.product(product.slug)}
      title={product.name}
      meta={productMetaLabel(product)}
      description={product.description}
      media={<ProductVisual product={product} />}
      headingLevel={headingLevel}
    >
      <Box component="ul" aria-label="Typical applications" sx={{ listStyle: 'none', p: 0, m: 0, mt: 1, display: 'flex', flexWrap: 'wrap', gap: 1 }}>
        {product.application.slice(0, 4).map((a) => (
          <Typography component="li" variant="caption" key={a} sx={{ px: 1, py: 0.25, border: 1, borderColor: 'divider', borderRadius: 0.5, color: 'text.secondary' }}>
            {a}
          </Typography>
        ))}
      </Box>
    </LinkCard>
  )
}
