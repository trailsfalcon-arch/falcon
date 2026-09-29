import { TONE_HERO, photoFor, type Tone } from './destinations.ts';

/**
 * Travel-style landing pages: Falcon Trails' five ways to travel, plus the
 * intent pages ("kashmir honeymoon package", "kashmir family tour") that
 * destination hubs and individual packages both miss.
 */

export type TravelStyle = {
  slug: string;
  name: string;
  seoTitle: string;
  headline: string;
  intro: string;
  body: string[];
  promises: { title: string; body: string }[];
  faqs: { q: string; a: string }[];
  /** Tailwind-free inline gradient for the hero. */
  hero: string;
  image: string;
  /** Photo tone, for card backgrounds (TONE_BG). */
  tone?: Tone;

  // ─────────────────────────────────────────────────────────────────
  // Optional depth. Added for pillar pages that carry real search
  // demand; the lighter style pages leave these undefined and
  // render exactly as before.
  // ─────────────────────────────────────────────────────────────────

  /** Overrides the truncated-intro meta description. Written for the click. */
  metaDescription?: string;
  /**
   * The direct answer to the primary query, rendered above everything else.
   * The standard requires the query be answered in the first 100 words.
   */
  answer?: { heading: string; body: string; figure: string; figureNote: string };
  /**
   * Decodes a confusing price landscape. On honeymoon queries the visible
   * range across page one runs from four figures to six, and no competitor
   * explains why — that gap is the page's main information gain.
   */
  priceDecoder?: {
    heading: string;
    intro: string;
    rows: { claim: string; reality: string }[];
    conclusion: string;
  };
  /**
   * Separates the inclusions every operator advertises identically from the
   * things that actually differ between quotes.
   */
  commodity?: {
    heading: string;
    intro: string;
    same: string[];
    different: { label: string; body: string }[];
  };
  /** Month-by-month verdict. `avoid` is used honestly, not decoratively. */
  months?: {
    month: string;
    verdict: 'best' | 'good' | 'mixed' | 'avoid';
    note: string;
  }[];
  /** The explicit negative recommendation the standard requires. */
  negative?: { heading: string; body: string };
  /** Named author. Trust is the load-bearing letter in E-E-A-T. */
  author?: { name: string; role: string };
  /** Only bump when the page has genuinely been re-verified. */
  updatedAt?: string;
};

const style = (tone: Tone) => ({ tone, hero: TONE_HERO[tone], image: photoFor(tone) });

/**
 * The five ways to travel with Falcon Trails, as on falcontrails.in, plus the
 * two intent pages Kashmir travellers search for most (honeymoon, family).
 */
export const TRAVEL_STYLES: TravelStyle[] = [
  {
    slug: 'discover-india',
    name: 'Discover India',
    seoTitle: 'Discover India — Kashmir, Ladakh, Kerala & the North East',
    headline: 'Across the country, starting at home',
    intro:
      'Kashmir and offbeat Kashmir first, because that is our ground. Then Ladakh by road from Srinagar, and Kerala and the North East planned with the same care.',
    body: [
      'We began in Kashmir and we know it valley by valley: the houseboats and gardens of Srinagar, Gulmarg, Pahalgam and Sonamarg, and the places most operators never send anyone, like Gurez and Doodhpathri.',
      'Ladakh we run overland from Srinagar, over Zojila, so you acclimatise on the way instead of landing at 3,500 m.',
      'For Kerala’s backwaters and hill country and the North East’s hills, root bridges and monasteries, we plan each trip individually with partners we trust on the ground. Tell us what you have in mind and we build it.',
    ],
    promises: [
      { title: 'Kashmir, properly', body: 'Every classic and offbeat valley, planned by people who live here.' },
      { title: 'Ladakh by road', body: 'Srinagar to Leh over two days, so the altitude comes gradually.' },
      { title: 'Kerala & the North East', body: 'Planned trip by trip, with the same itemised quotes.' },
    ],
    faqs: [
      {
        q: 'Do you have fixed packages for Kerala and the North East?',
        a: 'Not yet. We plan those trips individually for now. Send us your dates and interests and we will come back with an itinerary and a quote.',
      },
    ],
    ...style('dal'),
  },
  {
    slug: 'sacred-journeys',
    name: 'Sacred Journeys',
    seoTitle: 'Amarnath Yatra & Vaishno Devi Packages',
    headline: 'Pilgrimages, done right',
    intro:
      'The Amarnath Yatra and Vaishno Devi, with a guide who has walked the route, your stays arranged and the logistics handled on the ground.',
    body: [
      'A yatra should be about the darshan, not the paperwork. We help with registration, arrange the stays before and after, and send a guide who knows the route.',
      'The Amarnath Yatra runs only in the season set each year by the Shri Amarnathji Shrine Board, usually July and August, and needs registration and a Compulsory Health Certificate. Vaishno Devi is open all year from Katra.',
    ],
    promises: [
      { title: 'A guide on the route', body: 'Someone who has done the walk, with you on the day.' },
      { title: 'Paperwork handled', body: 'We help with registration, cards and certificates before you travel.' },
      { title: 'Stays arranged', body: 'Srinagar, Sonamarg/Baltal and Katra stays booked around the official timings.' },
    ],
    faqs: [
      {
        q: 'Can you book group yatras?',
        a: 'Yes. We run Amarnath group departures each season; ask on WhatsApp for this year’s dates.',
      },
    ],
    ...style('pilgrim'),
  },
  {
    slug: 'group-departures',
    name: 'Group Departures',
    seoTitle: 'Kashmir Group Tours & Amarnath Group Departures',
    headline: 'Travel solo, never alone',
    intro:
      'Fixed-date Kashmir groups and Amarnath group departures. Join on your own or with friends; the dates are set and the planning is done.',
    body: [
      'Group departures are open now. Each one follows a set itinerary on fixed dates, with a trip coordinator travelling with the group.',
      'Dates change every season, so we publish them on WhatsApp rather than risk an out-of-date list here. Message us and we will send the next departures and what is left.',
    ],
    promises: [
      { title: 'Fixed dates', body: 'Pick a departure and turn up; the planning is done.' },
      { title: 'Solo-friendly', body: 'Twin-sharing matched with another traveller, or a single room on request.' },
      { title: 'A coordinator with the group', body: 'One person responsible for the trip from start to finish.' },
    ],
    faqs: [
      {
        q: 'How do I see the next group dates?',
        a: 'Message us on WhatsApp. We send the current departures, the itinerary and the seats left.',
      },
    ],
    ...style('gulmarg'),
  },
  {
    slug: 'visitors-to-india',
    name: 'Visitors to India',
    seoTitle: 'India Tours for International Visitors — Golden Triangle & Kashmir',
    headline: 'Crafted, unhurried, authentic',
    intro:
      'For travellers coming to India: the Golden Triangle of Delhi, Agra and Jaipur, and Kashmir with the guide who has hosted visitors from more than twelve countries since 2010.',
    body: [
      'Our founder started out guiding travellers from South Africa, Indonesia, Malaysia, Singapore, Spain, the UK and across Europe through Kashmir. That is still the heart of what we do.',
      'Combine the Golden Triangle with Kashmir for a first trip to India that is not a blur of monuments: time in Delhi, Agra and Jaipur, then the calm of the Valley.',
    ],
    promises: [
      { title: 'Unhurried days', body: 'Fewer stops, more time at each.' },
      { title: 'Local guides', body: 'English-speaking guides in every city.' },
      { title: 'One contact', body: 'A single WhatsApp thread from arrival to departure.' },
    ],
    faqs: [
      {
        q: 'Can foreign nationals visit all of Kashmir?',
        a: 'The main valleys, yes. Some areas near the Line of Control, such as Gurez, are restricted for foreign passport holders. We plan around that.',
      },
    ],
    ...style('goldentriangle'),
  },
  {
    slug: 'the-world',
    name: 'The World',
    seoTitle: 'International Holiday Packages for Indian Travellers',
    headline: 'The same care, further afield',
    intro:
      'International holidays curated for Indian travellers, planned with the same itemised quotes and one point of contact.',
    body: [
      'We plan international trips individually for now: tell us where and when, and we come back with an itinerary, the visa steps and an itemised quote.',
    ],
    promises: [
      { title: 'Planned for you', body: 'An itinerary built around your dates and budget.' },
      { title: 'Visa guidance', body: 'We tell you what is needed and when to apply.' },
      { title: 'One contact', body: 'The same WhatsApp thread before and during the trip.' },
    ],
    faqs: [
      {
        q: 'Which countries do you cover?',
        a: 'Ask us about the one you have in mind. We only quote where we can deliver properly.',
      },
    ],
    ...style('world'),
  },
  {
    slug: 'honeymoon',
    name: 'Honeymoon',
    seoTitle: 'Kashmir Honeymoon Packages',
    headline: 'Kashmir without a checklist',
    intro:
      'A houseboat night on Nigeen Lake, a night in Gulmarg, two by the river in Pahalgam, and time deliberately left empty.',
    body: [
      'Honeymoon itineraries go wrong when they try to fit everything in. Ours give fewer places more time, with a private cab for the two of you throughout.',
      'Spring and autumn are the loveliest seasons; January and February bring snow in Gulmarg and Pahalgam.',
    ],
    promises: [
      { title: 'Fewer places, longer stays', body: 'Two nights where it matters.' },
      { title: 'Private cab', body: 'Just the two of you, never shared.' },
      { title: 'Room upgrades on request', body: 'Tell us the category and we quote for it.' },
    ],
    faqs: [
      {
        q: 'What is the best month for a Kashmir honeymoon?',
        a: 'April–May for blossom and green meadows, October for autumn colour, January–February if you want snow.',
      },
    ],
    ...style('pahalgam'),
  },
  {
    slug: 'family',
    name: 'Family',
    seoTitle: 'Kashmir Family Tour Packages',
    headline: 'Easy days, short drives',
    intro:
      'Kashmir itineraries paced for children and grandparents: shorter drives, no early starts, and a houseboat night everyone remembers.',
    body: [
      'Srinagar, Gulmarg and Pahalgam suit every age: the drives are two to three hours, and the gondola, ponies and shikara rides are the parts children talk about afterwards.',
      'Travelling with elders? Tell us, and we plan ground-floor rooms, fewer hotel changes and time to rest.',
    ],
    promises: [
      { title: 'Short driving days', body: 'Two to three hours on most days.' },
      { title: 'Rooms that work', body: 'Family rooms and ground-floor options where available.' },
      { title: 'Vaishno Devi add-on', body: 'Easy to combine with a Kashmir circuit via Jammu.' },
    ],
    faqs: [
      {
        q: 'Is Kashmir suitable for young children?',
        a: 'Yes. Srinagar, Gulmarg and Pahalgam are at moderate altitude, and our family itineraries keep the days gentle.',
      },
    ],
    ...style('sonamarg'),
  },
];

export function getTravelStyle(slug: string): TravelStyle | undefined {
  return TRAVEL_STYLES.find((s) => s.slug === slug);
}
