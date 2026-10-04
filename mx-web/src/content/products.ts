import type { Product, ProductCategory } from './types'

/*
 * Product catalogue.
 *
 * pixelPitch is part of each series' designation and is therefore known. Hardware
 * specifications (viewingDistance, brightness, refresh rate, cabinet data, IP rating)
 * are NOT listed until confirmed from a verified datasheet — the product page shows
 * "Confirmed during design" instead. Do not add unverified numbers.
 */

const serviceFeatures = [
  'Sized and configured to your wall and viewing distance',
  'Site survey and display design',
  'Custom frame and structural fabrication',
  'Professional installation and commissioning',
  'Maintenance, AMC and 24×7 on-call support',
]

const seriesConsiderations = (pitch: number) => [
  {
    title: 'Viewing distance',
    body: `As a general rule, an LED wall looks smooth from about 1 metre per millimetre of pixel pitch — around ${pitch} m for P${pitch}. Closer than that, individual pixels become visible. We confirm the right pitch for your room during the site survey.`,
  },
  {
    title: 'Resolution and wall size',
    body: `Resolution depends on the wall size: every metre of width at P${pitch} gives about ${Math.floor(1000 / pitch)} pixels. Larger walls show more detail at the same pitch.`,
  },
  {
    title: 'Structure and service access',
    body: 'The mounting structure, power distribution and whether the wall is serviced from the front or the rear are decided early, because they affect wall depth, cost and future maintenance.',
  },
]

export const products: Product[] = [
  {
    slug: 'p2-led-display',
    name: 'P2 LED Display',
    title: 'P2 LED Display',
    kind: 'series',
    pixelPitch: 2,
    environment: null,
    application: ['Boardrooms', 'Control rooms', 'Retail', 'Showrooms'],
    viewingDistance: null,
    description:
      'P2 LED displays from MK-LED have a 2 mm pixel pitch for close viewing — boardrooms, control rooms and retail screens where people stand a few metres away.',
    intro:
      'A P2 LED display has 2 mm between the centres of neighbouring pixels — about 250,000 pixels in every square metre. That density keeps text, dashboards and detailed images sharp when the audience is close, which makes P2 a common choice for meeting rooms, control rooms and premium retail.',
    considerations: seriesConsiderations(2),
    image: null,
    features: serviceFeatures,
    categories: ['indoor'],
    relatedSolutions: ['corporate', 'retail'],
    relatedServices: ['installation', 'maintenance'],
    faqs: [
      {
        question: 'Where is a P2 LED display used?',
        answer:
          'Mostly indoors where viewers are close: boardrooms, conference rooms, control rooms, retail displays and showrooms.',
      },
      {
        question: 'Is P2 better than P3?',
        answer:
          'P2 shows finer detail up close, but it costs more per square metre. If your audience is further away, P3 can look just as good for less. The right choice depends on viewing distance.',
      },
    ],
  },
  {
    slug: 'p2-5-led-display',
    name: 'P2.5 LED Display',
    title: 'P2.5 LED Display',
    kind: 'series',
    pixelPitch: 2.5,
    environment: null,
    application: ['Conference rooms', 'Showrooms', 'Hospitality', 'Education'],
    viewingDistance: null,
    description:
      'P2.5 LED displays from MK-LED balance sharp detail and cost for meeting rooms, showrooms, hotels and classrooms viewed from across the room.',
    intro:
      'A P2.5 LED display has 2.5 mm between pixel centres — about 160,000 pixels per square metre. It is a popular all-round indoor pitch: sharp enough for presentations and video viewed from across a room, with a lower cost per square metre than P2.',
    considerations: seriesConsiderations(2.5),
    image: null,
    features: serviceFeatures,
    categories: ['indoor'],
    relatedSolutions: ['corporate', 'retail'],
    relatedServices: ['installation', 'amc'],
    faqs: [
      {
        question: 'What is the difference between P2.5 and P3?',
        answer:
          'P2.5 places pixels 2.5 mm apart; P3 places them 3 mm apart. P2.5 has about 44% more pixels per square metre, so it looks sharper up close. P3 is often chosen for larger rooms where viewers sit further back.',
      },
    ],
  },
  {
    slug: 'p3-led-display',
    name: 'P3 LED Display',
    title: 'P3 LED Display',
    kind: 'series',
    pixelPitch: 3,
    environment: null,
    application: ['Auditoriums', 'Religious venues', 'Events', 'Large retail'],
    viewingDistance: null,
    description:
      'P3 LED displays from MK-LED suit auditoriums, places of worship, stages and large retail spaces where audiences sit further back.',
    intro:
      'A P3 LED display has 3 mm between pixel centres — about 111,000 pixels per square metre. It delivers big, vivid images for audiences seated further from the screen, making it practical for large walls in halls, auditoriums, stages and retail atriums.',
    considerations: seriesConsiderations(3),
    image: null,
    features: serviceFeatures,
    categories: ['indoor', 'event'],
    relatedSolutions: ['events', 'venues'],
    relatedServices: ['installation', 'fabrication'],
    faqs: [
      {
        question: 'Can P3 LED be used outdoors?',
        answer:
          'Outdoor versions of P3 exist, but outdoor displays need higher brightness and weather protection. We confirm the right outdoor configuration for your site before quoting.',
      },
    ],
  },
  {
    slug: 'p4-led-display',
    name: 'P4 LED Display',
    title: 'P4 LED Display',
    kind: 'series',
    pixelPitch: 4,
    environment: null,
    application: ['Large venues', 'Advertising', 'Events', 'Shopping centres'],
    viewingDistance: null,
    description:
      'P4 LED displays from MK-LED are built for large walls viewed from a distance — large indoor venues and, in the right configuration, outdoor locations.',
    intro:
      'A P4 LED display has 4 mm between pixel centres — 62,500 pixels per square metre. Wider spacing makes very large screens affordable while still looking smooth from typical viewing distances in large venues, shopping centres and, with outdoor-rated cabinets, outdoor locations.',
    considerations: seriesConsiderations(4),
    image: null,
    features: serviceFeatures,
    categories: ['indoor', 'outdoor', 'advertising'],
    relatedSolutions: ['advertising', 'venues'],
    relatedServices: ['installation', 'fabrication', 'amc'],
    faqs: [
      {
        question: 'Is P4 suitable for advertising?',
        answer:
          'Yes, where the audience is several metres away — for example in shopping centres or on building frontages. For roadside billboards seen from far away, an even larger pitch may be more economical.',
      },
    ],
  },
  {
    slug: 'indoor-led-displays',
    name: 'Indoor LED Displays',
    title: 'Indoor LED Displays',
    kind: 'category',
    pixelPitch: null,
    environment: ['indoor'],
    application: ['Corporate', 'Conference rooms', 'Control rooms', 'Retail', 'Showrooms', 'Auditoriums', 'Hospitality', 'Education', 'Religious venues'],
    viewingDistance: null,
    description:
      'Indoor LED displays and video walls from MK-LED for offices, conference rooms, control rooms, retail, auditoriums, hotels, schools and places of worship.',
    intro:
      'An indoor LED display is a video wall built from LED modules, designed for interiors where viewers are relatively close and ambient light is controlled. Unlike tiled LCD video walls, an LED wall has no bezels between panels, so the image is seamless at any size.',
    considerations: [
      {
        title: 'Choose pitch by viewing distance',
        body: 'Finer pitches such as P2 suit close viewing; P3 and P4 suit larger rooms. Our pixel-pitch guide explains the trade-off in plain language.',
      },
      {
        title: 'Brightness that suits the room',
        body: 'Indoor displays need far less brightness than outdoor ones. Too bright is uncomfortable in a meeting room, so brightness is set for the space and lighting.',
      },
      {
        title: 'A wall designed around the room',
        body: 'Wall size, aspect ratio, mounting depth, cable routes and service access are planned with the interior — not added afterwards.',
      },
    ],
    image: 'pixelCloseup',
    features: serviceFeatures,
    categories: ['indoor'],
    relatedSolutions: ['corporate', 'retail', 'venues'],
    relatedServices: ['installation', 'maintenance', 'amc'],
    faqs: [
      {
        question: 'What is the difference between an LED video wall and an LCD video wall?',
        answer:
          'An LED wall is built from LED modules with no bezels, so it is seamless and can be made almost any size or shape. An LCD video wall is made of individual screens with visible seams between them.',
      },
      {
        question: 'Which pixel pitch is suitable for close viewing?',
        answer:
          'For audiences a few metres away, finer pitches such as P2 or P2.5 are typical. A common rule of thumb is about 1 metre of distance per millimetre of pitch.',
      },
    ],
  },
  {
    slug: 'outdoor-led-displays',
    name: 'Outdoor LED Displays',
    title: 'Outdoor LED Displays',
    kind: 'category',
    pixelPitch: null,
    environment: ['outdoor'],
    application: ['Advertising', 'Commercial buildings', 'Shopping centres', 'Events', 'Stadiums', 'Public spaces', 'Large venues'],
    viewingDistance: null,
    description:
      'Outdoor LED displays from MK-LED: high-brightness LED walls for advertising, building facades, stadiums and public spaces, with site-specific structures and installation.',
    intro:
      'An outdoor LED display is an LED wall built to stay visible in daylight and to operate in the weather. Compared with indoor displays it uses much higher brightness, weather-protected cabinets and a structure engineered for wind load and the site.',
    considerations: [
      {
        title: 'Visibility in daylight',
        body: 'Outdoor displays must be considerably brighter than indoor ones to stay readable in sunlight, and should dim automatically at night to avoid glare and save energy.',
      },
      {
        title: 'Weather-aware design',
        body: 'Cabinet protection, drainage, ventilation and cable entry are planned for the exposure of the site. Ingress-protection (IP) ratings are confirmed from the datasheet for the chosen product.',
      },
      {
        title: 'Structure and safety',
        body: 'The supporting structure is designed for the display weight, wind and access for maintenance. This is engineering work, not an afterthought.',
      },
      {
        title: 'Reliable long-hour operation',
        body: 'Power distribution, control systems and service access are designed for displays that run for long hours every day.',
      },
    ],
    image: 'outdoorNight',
    features: serviceFeatures,
    categories: ['outdoor'],
    relatedSolutions: ['advertising', 'venues', 'events'],
    relatedServices: ['fabrication', 'installation', 'amc'],
    faqs: [
      {
        question: 'What is an outdoor LED display?',
        answer:
          'An LED screen designed for outdoor use: brighter than indoor displays to stay visible in daylight, protected against weather, and mounted on a structure engineered for the site.',
      },
      {
        question: 'What brightness is suitable for an outdoor LED display?',
        answer:
          'It depends on orientation and direct sunlight. As a general guide, outdoor displays are typically several times brighter than indoor ones. We specify brightness for your site and confirm it against the product datasheet.',
      },
    ],
  },
  {
    slug: 'event-led-displays',
    name: 'Event LED Displays',
    title: 'Event & Rental LED Displays',
    kind: 'category',
    pixelPitch: null,
    environment: null,
    application: ['Concerts', 'Conferences', 'Exhibitions', 'Product launches', 'Weddings'],
    viewingDistance: null,
    description:
      'Event and rental LED screens from MK-LED for concerts, conferences, exhibitions and launches — delivered, rigged, operated and taken down by our crew.',
    intro:
      'Event LED displays are built from lightweight, fast-locking cabinets designed to be assembled and dismantled quickly and safely. They are used as stage backdrops, side screens and exhibition walls for the duration of an event.',
    considerations: [
      {
        title: 'Rigging and ground support',
        body: 'Screens are flown from trusses or stacked on ground-support frames. Load, wind (for outdoor events) and safe access are planned before the event.',
      },
      {
        title: 'Timing',
        body: 'Build and de-rig windows at venues are tight. We plan crew, transport and set-up so the screen is tested and ready before rehearsals.',
      },
      {
        title: 'Content and operation',
        body: 'Playback and switching are agreed in advance, and a technician stays on site during the event.',
      },
    ],
    image: 'eventStage',
    features: ['Event-ready configurations', 'Delivery, rigging and de-rig', 'On-site technical operation', 'Content playback support'],
    categories: ['event'],
    relatedSolutions: ['events'],
    relatedServices: ['installation', 'on-call-support'],
    faqs: [],
  },
  {
    slug: 'advertising-led-displays',
    name: 'Advertising LED Displays',
    title: 'Advertising LED Displays',
    kind: 'category',
    pixelPitch: null,
    environment: ['indoor', 'outdoor'],
    application: ['Billboards', 'Roadside', 'Malls', 'Building frontages'],
    viewingDistance: null,
    description:
      'Advertising LED displays from MK-LED — digital billboards and retail media screens planned around sightlines, audience flow and the site.',
    intro:
      'An advertising LED display is a digital billboard or media screen that shows rotating content to people passing by. Its value depends on visibility: the right size, height, angle and pitch for where the audience is and how long they look.',
    considerations: [
      {
        title: 'Sightlines and dwell time',
        body: 'Size, mounting height and angle are chosen for the distance and speed of the audience — a roadside billboard and a mall atrium screen need very different designs.',
      },
      {
        title: 'Brightness control',
        body: 'Content must be readable in daylight without causing glare at night, so automatic brightness adjustment is important.',
      },
      {
        title: 'Permissions and structure',
        body: 'Large outdoor advertising structures may need local approvals and engineered foundations. These are identified during the survey.',
      },
    ],
    image: 'outdoorFacade',
    features: serviceFeatures,
    categories: ['advertising'],
    relatedSolutions: ['advertising', 'retail'],
    relatedServices: ['fabrication', 'installation', 'amc'],
    faqs: [],
  },
  {
    slug: 'custom-led-displays',
    name: 'Custom LED Displays',
    title: 'Custom LED Displays',
    kind: 'category',
    pixelPitch: null,
    environment: null,
    application: ['Architectural features', 'Curved walls', 'Columns', 'Canopies', 'Unusual formats'],
    viewingDistance: null,
    description:
      'Custom LED displays from MK-LED — curved walls, columns, canopies and one-off formats, designed together with the structure that carries them.',
    intro:
      'Custom LED displays go beyond the flat rectangle: curves, corners, columns, ceilings and irregular shapes. They depend as much on structural design and fabrication as on the LED modules themselves.',
    considerations: [
      {
        title: 'Geometry first',
        body: 'Curves and corners must match the module and cabinet sizes available. We check the geometry against the product before committing to a design.',
      },
      {
        title: 'Bespoke structure',
        body: 'Custom shapes need custom frames. Our fabrication team designs and builds them to survey dimensions.',
      },
      {
        title: 'Content for the shape',
        body: 'Unusual formats need content made for their exact resolution and shape. We share the pixel map early so content can be prepared in time.',
      },
    ],
    image: 'customCanopy',
    features: ['Bespoke shapes and sizes', 'Structural design and fabrication', 'Integration with architecture and interiors', 'Professional installation and support'],
    categories: ['custom'],
    relatedSolutions: ['retail', 'venues'],
    relatedServices: ['fabrication', 'installation'],
    faqs: [],
  },
]

export const productCategories: { id: ProductCategory; label: string }[] = [
  { id: 'indoor', label: 'Indoor' },
  { id: 'outdoor', label: 'Outdoor' },
  { id: 'event', label: 'Event' },
  { id: 'advertising', label: 'Advertising' },
  { id: 'custom', label: 'Custom' },
]

export function getProduct(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug)
}

export const seriesProducts = products.filter((p) => p.kind === 'series')
export const categoryProducts = products.filter((p) => p.kind === 'category')
