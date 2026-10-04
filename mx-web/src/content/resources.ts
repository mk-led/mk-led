import type { Article } from './types'

/*
 * Technical guides. General industry guidance written in plain language.
 * Figures here are typical industry ranges, clearly labelled as such — never claims about
 * a specific MK-LED product. Have an MK-LED engineer review any change before publishing,
 * and update `updated` when the content is re-reviewed.
 */
export const articles: Article[] = [
  {
    slug: 'led-pixel-pitch-guide',
    title: 'Pixel Pitch Guide: P2 vs P2.5 vs P3 vs P4',
    description:
      'A plain-language guide to LED pixel pitch: what P2, P2.5, P3 and P4 mean, how pixel density and viewing distance compare, and which pitch suits your space.',
    updated: '2026-10-04',
    summary:
      'Pixel pitch is the distance in millimetres between the centres of neighbouring pixels. A smaller number means pixels are closer together, giving a sharper image up close. Choose the pitch by how far your audience will be: a common rule of thumb is about 1 metre of viewing distance per millimetre of pitch.',
    sections: [
      {
        heading: 'What does “P” mean?',
        paragraphs: [
          'The “P” number is the pixel pitch in millimetres. A P2 display has pixels 2 mm apart; a P4 display has them 4 mm apart.',
          'Pitch determines pixel density. Halving the pitch quadruples the number of pixels in the same area — which is why P2 has four times as many pixels per square metre as P4.',
        ],
      },
      {
        heading: 'How pitch affects viewing distance',
        paragraphs: [
          'From far enough away, the eye blends individual pixels into a smooth image. The finer the pitch, the closer viewers can stand before pixels become visible.',
          'As a general guide, the closest comfortable viewing distance in metres is roughly equal to the pitch in millimetres. A P3 wall looks smooth from about 3 m. This is a rule of thumb; content, brightness and personal eyesight all play a part.',
        ],
      },
      {
        heading: 'Which pitch should I choose?',
        paragraphs: ['Typical choices, starting from the closest viewing:'],
        list: [
          'P2 — boardrooms, control rooms and retail screens viewed from a few metres.',
          'P2.5 — meeting rooms, showrooms, hotels and classrooms.',
          'P3 — auditoriums, places of worship, stages and large retail spaces.',
          'P4 — large venues, events and advertising viewed from further away; outdoor-rated versions exist.',
        ],
      },
      {
        heading: 'Finer is not always better',
        paragraphs: [
          'Finer pitches cost more per square metre because they use more LEDs and electronics. If your audience will never be close to the screen, a finer pitch adds cost without visible benefit. The best value is the largest pitch that still looks smooth from your nearest viewing position.',
        ],
      },
    ],
    faqs: [
      {
        question: 'What is the difference between P2.5 and P3 LED?',
        answer:
          'P2.5 has pixels 2.5 mm apart and about 160,000 pixels per square metre; P3 has pixels 3 mm apart and about 111,000 pixels per square metre. P2.5 looks sharper up close; P3 is often chosen for larger rooms viewed from further away.',
      },
      {
        question: 'Which pixel pitch is suitable for close viewing?',
        answer: 'For viewing from 2–3 metres, finer pitches such as P2 or P2.5 are typical.',
      },
    ],
    relatedProducts: ['p2-led-display', 'p2-5-led-display', 'p3-led-display', 'p4-led-display'],
    relatedServices: ['installation'],
  },
  {
    slug: 'indoor-vs-outdoor-led-displays',
    title: 'Indoor vs Outdoor LED Displays: What’s the Difference?',
    description:
      'How indoor and outdoor LED displays differ in brightness, weather protection, pixel pitch, structure and maintenance — and how to choose.',
    updated: '2026-10-04',
    summary:
      'Indoor LED displays are designed for controlled lighting and close viewing, with finer pixel pitches and lower brightness. Outdoor LED displays are built to stay visible in daylight and to withstand weather, so they use much higher brightness, weather-protected cabinets and structures engineered for wind and the site.',
    sections: [
      {
        heading: 'Brightness',
        paragraphs: [
          'Brightness is measured in nits (candela per square metre). As a typical industry range, indoor displays operate at roughly 500–1,500 nits, while outdoor displays facing direct sunlight are commonly specified at several thousand nits. The right value depends on the site, and should be confirmed against the product datasheet.',
          'Outdoor displays should also dim automatically at night, both for comfort and to save energy.',
        ],
      },
      {
        heading: 'Weather protection',
        paragraphs: [
          'Outdoor cabinets are sealed against dust and water. Protection is expressed as an IP (ingress protection) rating; the rating of a specific product should be taken from its datasheet. The installation also matters: drainage, ventilation and cable entry are planned for the site.',
        ],
      },
      {
        heading: 'Pixel pitch',
        paragraphs: [
          'Indoor audiences are usually closer, so indoor displays tend to use finer pitches such as P2–P3. Outdoor audiences are usually further away, so outdoor displays commonly use larger pitches, which also makes large screens more economical.',
        ],
      },
      {
        heading: 'Structure and installation',
        paragraphs: [
          'Indoor walls are typically mounted on walls or frames within a building. Outdoor displays often need free-standing or façade structures designed for the display weight and wind, plus safe access for maintenance.',
        ],
      },
    ],
    faqs: [
      {
        question: 'Can an indoor LED display be used outdoors?',
        answer:
          'No. Indoor displays are not bright enough for daylight and are not protected against water and dust. Use an outdoor-rated display for any exposed location.',
      },
    ],
    relatedProducts: ['indoor-led-displays', 'outdoor-led-displays'],
    relatedServices: ['fabrication', 'installation'],
  },
  {
    slug: 'led-display-maintenance-guide',
    title: 'LED Display Maintenance Guide (and What an AMC Covers)',
    description:
      'What LED display maintenance involves, common faults and their causes, how often to service a display, and what an Annual Maintenance Contract (AMC) typically includes.',
    updated: '2026-10-04',
    summary:
      'LED display maintenance combines scheduled preventive checks — cleaning, inspecting power, data and structure — with corrective repair when faults appear. Many owners cover both through an AMC (Annual Maintenance Contract), which fixes the visit schedule, breakdown support and spare-parts terms for a year.',
    sections: [
      {
        heading: 'Common faults and what causes them',
        paragraphs: ['Most visible faults trace back to a specific component:'],
        list: [
          'Single dead or stuck pixels — usually an individual LED or driver on a module.',
          'A dark rectangle — typically a module, its power supply or a receiving card.',
          'Flicker or colour shifts across an area — often data cabling, a receiving card or configuration.',
          'A completely blank display — power, the controller/processor or the signal source.',
        ],
      },
      {
        heading: 'Preventive maintenance',
        paragraphs: [
          'Preventive visits typically include cleaning the surface and ventilation, inspecting modules, power supplies and connectors, checking controllers and signal paths, verifying structural fixings, and recording findings. Outdoor displays also need checks for moisture and corrosion.',
        ],
      },
      {
        heading: 'How often?',
        paragraphs: [
          'There is no single interval. Displays that run for long hours, outdoors or in dusty locations need more frequent visits than an indoor screen used occasionally. A maintenance provider should recommend a schedule after assessing the display.',
        ],
      },
      {
        heading: 'What an AMC typically includes',
        paragraphs: ['Scope varies by contract. Agree these points in writing:'],
        list: [
          'Number and timing of preventive visits per year',
          'How breakdowns are reported and how quickly they are attended',
          'Whether spare parts are included, and which',
          'Reporting after each visit',
        ],
      },
    ],
    faqs: [
      {
        question: 'What is LED AMC?',
        answer:
          'An Annual Maintenance Contract for an LED display: a yearly agreement covering scheduled maintenance and breakdown support on agreed terms.',
      },
    ],
    relatedProducts: ['outdoor-led-displays', 'indoor-led-displays'],
    relatedServices: ['maintenance', 'amc', 'repair', 'on-call-support'],
  },
  {
    slug: 'led-display-buying-guide',
    title: 'LED Display Buying Guide: What Affects the Price?',
    description:
      'The main factors that determine an LED display’s cost — size, pixel pitch, indoor or outdoor rating, structure, installation and ongoing support — and what to prepare before requesting a quote.',
    updated: '2026-10-04',
    summary:
      'The cost of an LED display depends mainly on screen area and pixel pitch, whether it is rated for indoor or outdoor use, the structure needed to support it, installation complexity, and the support you need afterwards. A site survey turns these into an accurate quote.',
    sections: [
      {
        heading: 'The main cost drivers',
        paragraphs: ['In roughly the order they affect price:'],
        list: [
          'Screen area — cost scales with square metres.',
          'Pixel pitch — finer pitches use more LEDs per square metre and cost more.',
          'Indoor or outdoor — outdoor displays need higher brightness and weather protection.',
          'Structure — wall mounts are simpler than free-standing or façade structures.',
          'Installation — height, access, cabling distances and working hours.',
          'Control and content — processors, players and integration with existing systems.',
          'Support — maintenance, AMC and on-call cover.',
        ],
      },
      {
        heading: 'What to prepare before asking for a quote',
        paragraphs: ['A useful enquiry includes:'],
        list: [
          'Where the display will be, indoors or outdoors',
          'Approximate size, or the wall it should fill',
          'How far away the nearest and furthest viewers will be',
          'What it will show (video, presentations, advertising, data)',
          'Your timeline',
          'Photos of the location, if possible',
        ],
      },
    ],
    faqs: [],
    relatedProducts: ['indoor-led-displays', 'outdoor-led-displays'],
    relatedServices: ['installation', 'fabrication'],
  },
]

export function getArticle(slug: string): Article | undefined {
  return articles.find((a) => a.slug === slug)
}
