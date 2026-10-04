import Box from '@mui/material/Box'
import type { ReactNode } from 'react'
import { getImage } from '../../content/images'
import { media } from '../../theme/colors'
import { ImageCaption, ResponsiveImage } from './ResponsiveImage'

interface MediaFrameProps {
  /** Image registry key; when absent the fallback visual is shown. */
  imageKey: string | null
  fallback: ReactNode
  ratio?: string
  sizes?: string
  priority?: boolean
  /** Show the representative/credit caption under stock images. */
  caption?: boolean
}

/** Fixed-ratio media: photography when available, an on-brand rendered visual otherwise. */
export function MediaFrame({ imageKey, fallback, ratio = '4 / 3', sizes, priority, caption = false }: MediaFrameProps) {
  const image = getImage(imageKey)
  return (
    <Box component={caption && image ? 'figure' : 'div'} sx={{ m: 0 }}>
      {image ? (
        <ResponsiveImage image={image} ratio={ratio} sizes={sizes} priority={priority} />
      ) : (
        <Box sx={{ position: 'relative', aspectRatio: ratio, overflow: 'hidden', bgcolor: media.black, '& > svg': { position: 'absolute', inset: 0, width: '100%', height: '100%' } }}>
          {fallback}
        </Box>
      )}
      {caption && image && <ImageCaption image={image} />}
    </Box>
  )
}
