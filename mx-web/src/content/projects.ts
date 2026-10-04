import type { Project, ProjectCategory } from './types'

/*
 * Portfolio.
 *
 * EXAMPLE ENTRIES (`example: true`) describe the kinds of projects MK-LED delivers so the
 * layout can be reviewed. They are labelled "Example" on the site and use representative
 * images. Replace them with verified MK-LED projects — real title, location, year,
 * photography — and set `example: false`. Leave unknown fields null; the UI omits them.
 */
export const projects: Project[] = [
  {
    slug: 'roadside-digital-billboard',
    title: 'Roadside digital billboard',
    categories: ['outdoor', 'advertising'],
    location: null,
    year: null,
    summary: 'A billboard on a custom steel structure, planned for long-distance visibility.',
    image: 'outdoorFacade',
    product: 'advertising-led-displays',
    example: true,
  },
  {
    slug: 'building-corner-display',
    title: 'Building corner display',
    categories: ['outdoor', 'custom'],
    location: null,
    year: null,
    summary: 'A display wrapping a building corner, with a site-specific structure and service access.',
    image: 'outdoorNight',
    product: 'outdoor-led-displays',
    example: true,
  },
  {
    slug: 'concert-stage-screen',
    title: 'Concert stage screen',
    categories: ['events'],
    location: null,
    year: null,
    summary: 'Event LED rigged, operated and struck within a tight festival schedule.',
    image: 'eventStage',
    product: 'event-led-displays',
    example: true,
  },
  {
    slug: 'stadium-video-screen',
    title: 'Stadium video screen',
    categories: ['outdoor'],
    location: null,
    year: null,
    summary: 'A large screen above the stands, visible across the venue.',
    image: 'stadiumScreen',
    product: 'outdoor-led-displays',
    example: true,
  },
  {
    slug: 'pedestrian-street-canopy',
    title: 'Curved LED canopy',
    categories: ['custom', 'retail'],
    location: null,
    year: null,
    summary: 'A curved LED canopy above a pedestrian street, built on bespoke structures.',
    image: 'customCanopy',
    product: 'custom-led-displays',
    example: true,
  },
  {
    slug: 'boardroom-video-wall',
    title: 'Boardroom video wall',
    categories: ['corporate', 'indoor'],
    location: null,
    year: null,
    summary: 'A seamless meeting-room wall replacing a tiled LCD array, with simple one-touch control.',
    image: null,
    product: 'p2-led-display',
    example: true,
  },
]

export const projectCategories: { id: ProjectCategory; label: string }[] = [
  { id: 'outdoor', label: 'Outdoor' },
  { id: 'indoor', label: 'Indoor' },
  { id: 'advertising', label: 'Advertising' },
  { id: 'corporate', label: 'Corporate' },
  { id: 'events', label: 'Events' },
  { id: 'retail', label: 'Retail' },
  { id: 'custom', label: 'Custom' },
]
