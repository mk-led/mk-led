import Box from '@mui/material/Box'
import Link from '@mui/material/Link'
import Typography from '@mui/material/Typography'
import type { SxProps, Theme } from '@mui/material/styles'
import type { ReactNode } from 'react'
import { IMAGE_WIDTHS, type SiteImage } from '../../content/images'
import { media } from '../../theme/colors'

const srcSet = (image: SiteImage, ext: string) =>
  IMAGE_WIDTHS.filter((w) => w <= Math.max(image.width, IMAGE_WIDTHS[0]))
    .map((w) => `/media/${image.src}-${w}.${ext} ${Math.min(w, image.width)}w`)
    .join(', ')

interface ResponsiveImageProps {
  image: SiteImage
  /** CSS sizes hint, e.g. "(min-width: 900px) 50vw, 100vw". */
  sizes?: string
  /** Above-the-fold images load eagerly with high priority (LCP). */
  priority?: boolean
  ratio?: string
  objectPosition?: string
  sx?: SxProps<Theme>
}

/** <picture> with AVIF → WebP → JPEG fallbacks, intrinsic size reserved to prevent layout shift. */
export function ResponsiveImage({ image, sizes = '100vw', priority = false, ratio, objectPosition = 'center', sx }: ResponsiveImageProps) {
  const fallbackWidth = IMAGE_WIDTHS.find((w) => w >= 1200) ?? 1200
  return (
    <Box
      component="picture"
      sx={[{ display: 'block', position: 'relative', overflow: 'hidden', aspectRatio: ratio, bgcolor: media.black }, ...(Array.isArray(sx) ? sx : [sx])]}
    >
      <source type="image/avif" srcSet={srcSet(image, 'avif')} sizes={sizes} />
      <source type="image/webp" srcSet={srcSet(image, 'webp')} sizes={sizes} />
      <Box
        component="img"
        src={`/media/${image.src}-${fallbackWidth}.jpg`}
        srcSet={srcSet(image, 'jpg')}
        sizes={sizes}
        alt={image.alt}
        width={image.width}
        height={image.height}
        loading={priority ? 'eager' : 'lazy'}
        fetchPriority={priority ? 'high' : 'auto'}
        decoding={priority ? 'sync' : 'async'}
        sx={{ display: 'block', width: '100%', height: ratio ? '100%' : 'auto', objectFit: 'cover', objectPosition }}
      />
    </Box>
  )
}

/** Visible caption: marks stock photography as representative and credits the author. */
export function ImageCaption({ image, children }: { image: SiteImage; children?: ReactNode }) {
  const { credit, representative } = image
  if (!credit && !representative && !children) return null
  return (
    <Typography component="figcaption" variant="caption" sx={{ display: 'block', mt: 1, color: 'brand.subtle' }}>
      {children}
      {representative && <>Representative image{credit ? ' · ' : ''}</>}
      {credit && (
        <>
          Photo:{' '}
          <Link href={credit.sourceUrl} color="inherit" target="_blank" rel="noopener noreferrer nofollow">
            {credit.author}
          </Link>
          , {credit.licenseUrl ? <Link href={credit.licenseUrl} color="inherit" target="_blank" rel="noopener noreferrer nofollow">{credit.license}</Link> : credit.license}
        </>
      )}
    </Typography>
  )
}
