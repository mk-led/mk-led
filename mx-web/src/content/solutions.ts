import type { Solution } from './types'

/** Solutions by application. Each page explains what matters for that use, then links to products and services. */
export const solutions: Solution[] = [
  {
    slug: 'advertising',
    name: 'Advertising',
    title: 'LED Displays for Advertising',
    description:
      'LED advertising displays and digital billboards from MK-LED — planned for visibility, brightness control and safe structures, then installed and maintained.',
    intro:
      'Digital advertising screens earn their keep by being seen. MK-LED plans billboards and retail media screens around where the audience is, how fast they move and how long they look — then builds the structure, installs the display and keeps it running.',
    considerations: [
      { title: 'Visibility', body: 'Screen size, height, angle and pixel pitch are chosen for the viewing distance and the speed of passing traffic or footfall.' },
      { title: 'Day and night', body: 'Outdoor screens need high brightness for daylight and automatic dimming at night to stay comfortable and avoid glare.' },
      { title: 'Uptime', body: 'An advertising screen that is dark is losing revenue. Preventive maintenance and on-call support keep downtime short.' },
    ],
    recommendedProducts: ['advertising-led-displays', 'outdoor-led-displays', 'p4-led-display'],
    relatedServices: ['fabrication', 'installation', 'amc', 'on-call-support'],
    image: 'outdoorFacade',
    faqs: [
      {
        question: 'What factors affect the price of an LED advertising display?',
        answer:
          'Mainly the screen area, the pixel pitch, indoor or outdoor rating, the structure and foundations, power and data cabling, and access for installation. A site survey lets us price these accurately.',
      },
    ],
  },
  {
    slug: 'corporate',
    name: 'Corporate',
    title: 'LED Video Walls for Corporate Spaces',
    description:
      'Corporate LED video walls from MK-LED for boardrooms, conference rooms, lobbies and control rooms — seamless, sharp up close and simple to operate.',
    intro:
      'In offices, an LED wall replaces projectors and tiled LCD screens with a single seamless image that stays sharp in a lit room. Typical uses are boardrooms, conference rooms, reception lobbies and control or monitoring rooms.',
    considerations: [
      { title: 'Close viewing', body: 'Meeting rooms are viewed from a few metres, so finer pitches such as P2 or P2.5 are usually appropriate.' },
      { title: 'Easy operation', body: 'Inputs from laptops, video conferencing and signage players should switch simply; we agree the control approach during design.' },
      { title: 'Comfortable brightness', body: 'Indoor walls are calibrated for the room so they are clear without being tiring to look at.' },
    ],
    recommendedProducts: ['p2-led-display', 'p2-5-led-display', 'indoor-led-displays'],
    relatedServices: ['installation', 'maintenance', 'amc'],
    image: 'pixelCloseup',
    faqs: [],
  },
  {
    slug: 'events',
    name: 'Events',
    title: 'LED Screens for Events',
    description:
      'Event LED screens from MK-LED for concerts, conferences, exhibitions, weddings and launches — rigged, operated and taken down by our crew.',
    intro:
      'Events need a screen that goes up fast, looks flawless on the day and comes down safely. MK-LED supplies LED screens for stages and venues, with rigging, on-site operation and de-rig handled by our crew.',
    considerations: [
      { title: 'Safe rigging', body: 'Flown and ground-stacked screens are planned for load, wind (outdoors) and access.' },
      { title: 'Tight schedules', body: 'Crew and transport are planned around venue build and de-rig windows.' },
      { title: 'On-site support', body: 'A technician stays on site to manage playback and resolve issues during the event.' },
    ],
    recommendedProducts: ['event-led-displays', 'p3-led-display', 'p4-led-display'],
    relatedServices: ['installation', 'on-call-support'],
    image: 'eventStage',
    faqs: [],
  },
  {
    slug: 'retail',
    name: 'Retail',
    title: 'LED Displays for Retail & Showrooms',
    description:
      'Retail LED displays from MK-LED for shop windows, showrooms and shopping centres — designed to attract attention and stay legible through the day.',
    intro:
      'In retail, LED displays draw people in from the street, present products in showrooms and carry retail media in shopping centres. They must look good up close and stay legible against shop lighting and daylight through windows.',
    considerations: [
      { title: 'Window displays', body: 'Screens facing glass need extra brightness to compete with daylight.' },
      { title: 'Close inspection', body: 'Showroom screens are often viewed from very close, which favours finer pitches.' },
      { title: 'Shape and fit', body: 'Columns, curves and fascia screens can be fabricated to fit the store design.' },
    ],
    recommendedProducts: ['p2-led-display', 'p2-5-led-display', 'custom-led-displays'],
    relatedServices: ['fabrication', 'installation', 'maintenance'],
    image: 'customCanopy',
    faqs: [],
  },
  {
    slug: 'venues',
    name: 'Stadiums & Venues',
    title: 'LED Displays for Stadiums, Auditoriums & Venues',
    description:
      'Large LED displays from MK-LED for stadiums, auditoriums, places of worship and large venues — big, bright screens on engineered structures.',
    intro:
      'Stadiums, auditoriums, places of worship and large halls need big screens that everyone can see, from the front row to the back. These installations combine larger pixel pitches, substantial structures and careful positioning.',
    considerations: [
      { title: 'Scale and pitch', body: 'Audiences are far from the screen, so larger pitches like P3 and P4 deliver a smooth image economically.' },
      { title: 'Structure', body: 'Large screens need engineered support structures and safe maintenance access.' },
      { title: 'Sightlines', body: 'Placement is planned so the screen is visible from the seating areas without blocking views of the stage or field.' },
    ],
    recommendedProducts: ['p3-led-display', 'p4-led-display', 'outdoor-led-displays'],
    relatedServices: ['fabrication', 'installation', 'amc'],
    image: 'stadiumScreen',
    faqs: [],
  },
]

export function getSolution(slug: string): Solution | undefined {
  return solutions.find((s) => s.slug === slug)
}
