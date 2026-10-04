/**
 * Image registry. Every photograph on the site is declared once here.
 *
 * Sources live in /media-src; `npm run images` generates AVIF/WebP/JPEG renditions into
 * /public/media at the widths below. Use descriptive, hyphenated file names.
 *
 * STOCK IMAGES: entries with `representative: true` are openly licensed photographs of
 * LED displays by third parties, used until MK-LED project photography is supplied. They
 * are captioned "Representative image" on the site and must never be described as
 * MK-LED installations. Replace them by adding MK-LED photos and updating `src` here.
 */
export interface ImageCredit {
  author: string
  license: string
  licenseUrl: string | null
  sourceUrl: string
}

export interface SiteImage {
  /** File stem in /public/media, e.g. "outdoor-led-display-building-facade". */
  src: string
  alt: string
  width: number
  height: number
  representative: boolean
  credit: ImageCredit | null
}

/** Rendition widths produced by scripts/optimize-images.mjs. */
export const IMAGE_WIDTHS = [480, 800, 1200, 1600, 1920] as const

export const images = {
  outdoorNight: {
    src: 'outdoor-led-display-building-corner-night',
    alt: 'Large outdoor LED display wrapping the corner of a modern building at night',
    width: 1920,
    height: 1275,
    representative: true,
    credit: {
      author: 'H005',
      license: 'Public domain',
      licenseUrl: null,
      sourceUrl: 'https://commons.wikimedia.org/wiki/File:T-Mobile_HQ_Video_Screen.jpg',
    },
  },
  outdoorFacade: {
    src: 'outdoor-led-display-commercial-building-facade',
    alt: 'Outdoor LED display mounted high on the glass facade of a commercial tower',
    width: 1920,
    height: 2560,
    representative: true,
    credit: {
      author: 'EWOJN alane Bosuu 038',
      license: 'CC0 1.0',
      licenseUrl: 'https://creativecommons.org/publicdomain/zero/1.0/',
      sourceUrl:
        'https://commons.wikimedia.org/wiki/File:HK_KCD_%E5%95%9F%E5%BE%B7_Kai_Tak_%E5%8D%94%E8%AA%BF%E9%81%93_Concorde_Road_buildings_n_Cullinan_Sky_LED_display_April_2026_N13P_01.jpg',
    },
  },
  customCanopy: {
    src: 'custom-led-canopy-pedestrian-street',
    alt: 'Curved LED canopy displaying imagery above a crowded pedestrian street',
    width: 1920,
    height: 1280,
    representative: true,
    credit: {
      author: 'Bernard Spragg. NZ',
      license: 'CC0 1.0',
      licenseUrl: 'https://creativecommons.org/publicdomain/zero/1.0/',
      sourceUrl: 'https://commons.wikimedia.org/wiki/File:Fremont_Street_Experence._Las_Vegas._(42899835422).jpg',
    },
  },
  eventStage: {
    src: 'event-led-screen-outdoor-concert-stage',
    alt: 'Outdoor concert stage with a large LED screen showing the performance to the audience',
    width: 1920,
    height: 1002,
    representative: true,
    credit: {
      author: 'Lendskaip',
      license: 'CC0 1.0',
      licenseUrl: 'https://creativecommons.org/publicdomain/zero/1.0/',
      sourceUrl:
        'https://commons.wikimedia.org/wiki/File:Shireen,_live_at_Castlefest_2024_(drummer_Wouter_Macare_on_the_LED_screen).jpg',
    },
  },
  stadiumScreen: {
    src: 'stadium-led-video-screen',
    alt: 'Giant LED video screen above the stands of a motor-racing stadium',
    width: 1920,
    height: 1280,
    representative: true,
    credit: {
      author: 'Nascar1996',
      license: 'CC BY-SA 4.0',
      licenseUrl: 'https://creativecommons.org/licenses/by-sa/4.0/',
      sourceUrl: 'https://commons.wikimedia.org/wiki/File:Charlotte_Motor_Speedway_video_screen.jpg',
    },
  },
  installationSite: {
    src: 'led-display-installation-on-site',
    alt: 'Technician on a ladder mounting an outdoor LED sign inside a fenced installation site',
    width: 1920,
    height: 1440,
    representative: true,
    credit: {
      author: 'U.S. Navy CFA-Y, James Kimber',
      license: 'Public domain',
      licenseUrl: null,
      sourceUrl: 'https://commons.wikimedia.org/wiki/File:Command_Information_Marquee_Installation_(9068963).jpg',
    },
  },
  installationTechnicians: {
    src: 'led-display-technicians-wiring-cabinet',
    alt: 'Technicians in safety vests wiring the base cabinet of an outdoor LED sign',
    width: 1920,
    height: 1440,
    representative: true,
    credit: {
      author: 'U.S. Navy CFA-Y, James Kimber',
      license: 'Public domain',
      licenseUrl: null,
      sourceUrl: 'https://commons.wikimedia.org/wiki/File:Command_Information_Marquee_Installation_(9068968).jpg',
    },
  },
  pixelCloseup: {
    src: 'led-module-pixels-closeup',
    alt: 'Close-up of LED module pixels glowing blue, showing the individual LED packages',
    width: 1920,
    height: 1280,
    representative: true,
    credit: {
      author: 'Junyu-K',
      license: 'CC BY 4.0',
      licenseUrl: 'https://creativecommons.org/licenses/by/4.0/',
      sourceUrl:
        'https://commons.wikimedia.org/wiki/File:202506_LED%E9%9B%BB%E8%A6%96%E7%89%86%E7%9A%84%E8%9E%A2%E5%B9%95%E5%A3%9E%E9%BB%9E_01.jpg',
    },
  },
} satisfies Record<string, SiteImage>

export type ImageName = keyof typeof images

export function getImage(key: string | null | undefined): SiteImage | null {
  return key && key in images ? images[key as ImageName] : null
}
