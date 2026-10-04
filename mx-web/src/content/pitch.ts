/**
 * Plain-language pixel-pitch guidance for the P2–P4 explainer.
 *
 * Density and resolution are pure geometry derived from the pitch. Viewing-distance
 * figures use the industry rule of thumb (≈ 1 m per mm of pitch for the closest
 * comfortable distance) and are labelled in the UI as general guidance, not a
 * product specification.
 */
export interface PitchGuide {
  slug: string
  label: string
  pitchMm: number
  typicalUse: string
  suitability: string
  detail: string
}

export const pitchGuides: PitchGuide[] = [
  {
    slug: 'p2',
    label: 'P2',
    pitchMm: 2,
    typicalUse: 'Boardrooms, control rooms and retail screens people walk right up to.',
    suitability: 'Typically indoor.',
    detail: 'Very fine. Small text and spreadsheets stay readable up close.',
  },
  {
    slug: 'p2-5',
    label: 'P2.5',
    pitchMm: 2.5,
    typicalUse: 'Meeting rooms, showrooms, hotel lobbies and classrooms.',
    suitability: 'Typically indoor.',
    detail: 'Fine. Sharp video and presentations from across a room.',
  },
  {
    slug: 'p3',
    label: 'P3',
    pitchMm: 3,
    typicalUse: 'Auditoriums, places of worship, stages and large retail spaces.',
    suitability: 'Mostly indoor; outdoor versions exist.',
    detail: 'Balanced. Big, vivid images for audiences seated further back.',
  },
  {
    slug: 'p4',
    label: 'P4',
    pitchMm: 4,
    typicalUse: 'Large venues, events and advertising viewed from a distance.',
    suitability: 'Indoor or outdoor, depending on configuration.',
    detail: 'Bold. Built for impact at distance rather than close reading.',
  },
]

/** Pixels in one square metre of display. */
export function pixelsPerSquareMetre(pitchMm: number): number {
  return Math.round((1000 / pitchMm) ** 2)
}

/** Native resolution of a wall of the given size, in whole pixels. */
export function wallResolution(widthM: number, heightM: number, pitchMm: number): { width: number; height: number } {
  return {
    width: Math.floor((widthM * 1000) / pitchMm),
    height: Math.floor((heightM * 1000) / pitchMm),
  }
}

/** Rule-of-thumb closest comfortable viewing distance in metres: about 1 m per mm of pitch. */
export function minimumViewingDistance(pitchMm: number): number {
  return pitchMm
}
