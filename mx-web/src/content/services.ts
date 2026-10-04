import type { ProcessStep, Service } from './types'

export const services: Service[] = [
  {
    slug: 'installation',
    name: 'Installation',
    title: 'LED Display Installation',
    summary: 'Professional LED display installation and commissioning.',
    description:
      'Professional LED display installation by MK-LED: site survey, structure, mounting, power and data cabling, calibration, testing and handover.',
    intro:
      'LED display installation covers everything between an approved design and a working screen: preparing the structure, mounting cabinets, running power and data, configuring the controller, calibrating the image and testing before handover. MK-LED installs indoor and outdoor displays with its own experienced crews.',
    includes: [
      'Site survey and installation planning',
      'Structure and mounting preparation',
      'Cabinet mounting and alignment for a flat, seamless surface',
      'Power distribution and data cabling',
      'Controller and processor configuration',
      'Calibration, testing and burn-in',
      'Operator training and handover documentation',
    ],
    steps: [
      { title: 'Survey', body: 'We verify dimensions, structure, power, access and safety requirements on site.' },
      { title: 'Prepare', body: 'Structures and mounting systems are installed and checked for level and load.' },
      { title: 'Install', body: 'Cabinets are mounted, aligned and connected for power and data.' },
      { title: 'Commission', body: 'The display is configured, calibrated, tested and handed over with training.' },
    ],
    relatedServices: ['fabrication', 'maintenance', 'amc'],
    image: 'installationSite',
    faqs: [
      {
        question: 'How is an LED display installed?',
        answer:
          'After a site survey, the support structure is prepared, cabinets are mounted and aligned, power and data are cabled, and the controller is configured. The display is then calibrated, tested and handed over.',
      },
      {
        question: 'How long does installation take?',
        answer:
          'It depends on size, structure and site access. Small indoor walls can take days; large outdoor displays with new structures take longer. We give a schedule after the survey.',
      },
    ],
  },
  {
    slug: 'fabrication',
    name: 'Fabrication',
    title: 'LED Display Structural Fabrication',
    summary: 'Custom frames and structural fabrication.',
    description:
      'Custom LED display frames and structures fabricated by MK-LED — wall, ceiling, floor and pole mounting, indoor frames, outdoor structures and finishing.',
    intro:
      'An LED wall is only as flat, safe and serviceable as the structure behind it. MK-LED designs and fabricates frames, mounting systems and outdoor structures to the exact dimensions of each display and site.',
    includes: [
      'Custom structures — free-standing, wall-mounted and suspended',
      'LED frames dimensioned to the cabinet grid',
      'Mounting systems with service access planned in',
      'Slim indoor frames and trims',
      'Outdoor structures designed for the site and exposure',
      'Site-specific fabrication for curves, corners and columns',
      'Finishing: cladding, trims and coatings',
    ],
    relatedServices: ['installation', 'maintenance'],
    image: 'installationTechnicians',
    faqs: [],
  },
  {
    slug: 'maintenance',
    name: 'Maintenance',
    title: 'LED Display Maintenance',
    summary: 'Preventive and corrective maintenance.',
    description:
      'Preventive and corrective LED display maintenance by MK-LED — inspections, cleaning, checks and repairs that keep image quality consistent.',
    intro:
      'LED displays run for long hours, often outdoors. Regular maintenance catches loose connections, failing power supplies, dust and moisture before they become visible faults — and keeps colour and brightness uniform across the wall.',
    includes: [
      'Scheduled inspections of modules, power supplies and cabling',
      'Cleaning of the display surface and ventilation',
      'Checks of controllers, receiving cards and signal paths',
      'Structural and fixing checks',
      'Corrective repair of faults found',
      'A written report after each visit',
    ],
    relatedServices: ['amc', 'repair', 'on-call-support'],
    image: 'installationTechnicians',
    faqs: [
      {
        question: 'How often does an LED display need maintenance?',
        answer:
          'It depends on usage and environment. Outdoor and long-hour displays need more frequent checks than indoor screens used occasionally. We recommend a schedule after assessing your display.',
      },
    ],
  },
  {
    slug: 'repair',
    name: 'Repair',
    title: 'LED Display Repair',
    summary: 'Technical troubleshooting and component-level service where applicable.',
    description:
      'LED display repair by MK-LED — fault diagnosis of modules, power supplies, receiving cards and controllers, with repair or replacement.',
    intro:
      'Dead pixels, dark modules, flicker, colour shifts or a blank screen usually trace back to a specific component: an LED module, a power supply, a receiving card, a cable or the controller. MK-LED diagnoses the fault and repairs or replaces the affected part.',
    includes: [
      'Fault diagnosis on site',
      'Module, power supply and receiving-card replacement',
      'Component-level repair where practical',
      'Controller and configuration troubleshooting',
      'Colour and brightness recalibration after repair',
    ],
    relatedServices: ['maintenance', 'amc', 'on-call-support'],
    image: 'pixelCloseup',
    faqs: [],
  },
  {
    slug: 'amc',
    name: 'AMC',
    title: 'LED Display AMC (Annual Maintenance Contract)',
    summary: 'Annual maintenance solutions.',
    description:
      'LED display AMC from MK-LED — annual maintenance contracts with scheduled preventive visits and breakdown support, scoped to your display.',
    intro:
      'An AMC — Annual Maintenance Contract — is a yearly agreement that covers scheduled preventive maintenance and support for breakdowns. It gives you predictable costs and a team that already knows your display.',
    includes: [
      'Scheduled preventive maintenance visits',
      'Breakdown support',
      'Inspection reports and recommendations',
      'Priority scheduling',
      'Scope agreed per display: visit frequency, response and spares coverage',
    ],
    relatedServices: ['maintenance', 'repair', 'on-call-support'],
    image: 'installationTechnicians',
    faqs: [
      {
        question: 'What is LED AMC?',
        answer:
          'An Annual Maintenance Contract for an LED display. It covers planned maintenance visits and breakdown support for a year, with the scope — visit frequency, response and spare parts — agreed in the contract.',
      },
    ],
  },
  {
    slug: 'on-call-support',
    name: 'On-Call Support',
    title: 'LED Display On-Call Support',
    summary: 'Responsive technical assistance, 24×7.',
    description:
      'MK-LED on-call support for LED displays, available 24×7 — technical help by phone, remotely or on site.',
    intro:
      'When a display matters most — during an event, a broadcast or a busy trading day — you need someone who can help immediately. MK-LED provides on-call technical support 24 hours a day, 7 days a week.',
    includes: [
      'Phone and WhatsApp support, 24×7',
      'Remote troubleshooting where the system allows',
      'On-site visits when needed',
      'Support from technicians who know your installation',
    ],
    relatedServices: ['repair', 'amc'],
    image: null,
    faqs: [],
  },
]

export function getService(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug)
}

export const processSteps: ProcessStep[] = [
  { number: '01', title: 'Consultation', summary: 'We learn what the display must achieve, for whom, and within what constraints.' },
  { number: '02', title: 'Site Survey', summary: 'Measurements, structure, power, access and sightlines — verified on site.' },
  { number: '03', title: 'Display Design', summary: 'Pitch, size, layout, control and content path specified and drawn.' },
  { number: '04', title: 'Structural / Fabrication', summary: 'Frames and supports engineered and fabricated for the exact display.' },
  { number: '05', title: 'Installation', summary: 'Structure erected, cabinets mounted, power and data cabled.' },
  { number: '06', title: 'Testing', summary: 'Every module, signal path and power circuit checked and burned in.' },
  { number: '07', title: 'Commissioning', summary: 'Calibration, controller set-up and content playback verified.' },
  { number: '08', title: 'Handover', summary: 'Training, documentation and a display your team is confident operating.' },
  { number: '09', title: 'Support', summary: 'Maintenance and on-call service for the life of the display.' },
]

export const fabricationIntro = {
  eyebrow: 'Fabrication',
  headline: 'Precision Fabrication. Built Around Your Display.',
}
