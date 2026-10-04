import { siFacebook, siInstagram, siPinterest, siThreads, siWhatsapp, siX, siYoutube } from 'simple-icons'
import type { SocialNetwork } from '../../content/site'

type Brand = SocialNetwork | 'whatsapp'

const paths: Record<Exclude<Brand, 'linkedin'>, string> = {
  facebook: siFacebook.path,
  instagram: siInstagram.path,
  x: siX.path,
  youtube: siYoutube.path,
  threads: siThreads.path,
  pinterest: siPinterest.path,
  whatsapp: siWhatsapp.path,
}

/** Monochrome brand glyphs (24×24) that inherit currentColor. Simple Icons data, CC0. */
export function SocialIcon({ brand, size = 18 }: { brand: Brand; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false">
      {brand === 'linkedin' ? (
        // Simple Icons no longer ships LinkedIn; a neutral "in" glyph in the same style.
        <path d="M3 1.5h18A1.5 1.5 0 0 1 22.5 3v18a1.5 1.5 0 0 1-1.5 1.5H3A1.5 1.5 0 0 1 1.5 21V3A1.5 1.5 0 0 1 3 1.5Zm2.25 7.5V19h3.1V9h-3.1Zm1.55-4.6a1.8 1.8 0 1 0 0 3.6 1.8 1.8 0 0 0 0-3.6ZM10.5 9v10h3.1v-5.2c0-1.4.6-2.3 1.8-2.3 1.1 0 1.6.8 1.6 2.3V19h3.1v-5.9c0-2.9-1.5-4.3-3.6-4.3-1.4 0-2.4.7-2.9 1.5V9h-3.1Z" />
      ) : (
        <path d={paths[brand]} />
      )}
    </svg>
  )
}
