/**
 * Destination hubs — the "pillar" pages in our hub-and-spoke SEO model.
 * Each hub links down to the packages whose route passes through it (the
 * spokes) and up from the home grid.
 *
 * Kashmir comes first: it is Falcon Trails' home ground. Ladakh is reached
 * the way we run it, overland from Srinagar.
 *
 * TODO(brand): `startingFrom` is null (shown as "Price on request") until
 * Falcon Trails sets its own prices. Road times and opening months are
 * typical, not guaranteed; roads in Kashmir close for snow and by order.
 */

/** Picks the photograph behind cards and heroes. */
export type Tone =
  | 'dal'
  | 'gulmarg'
  | 'pahalgam'
  | 'sonamarg'
  | 'doodhpathri'
  | 'gurez'
  | 'ladakh'
  | 'pilgrim'
  | 'jammu'
  | 'goldentriangle'
  | 'world';

export type Destination = {
  slug: string;
  name: string;
  /** Used in <title> and H1 — carries the head keyword. */
  seoTitle: string;
  headline: string;
  intro: string;
  /** 2–3 paragraph long-form block. Real substance = ranking substance. */
  body: string[];
  bestTime: string;
  bestMonths: string;
  idealDuration: string;
  /** Lowest per-person price, or null while prices are on request. */
  startingFrom: number | null;
  airport: string;
  altitude: string;
  regions: { name: string; note: string }[];
  highlights: string[];
  knowBefore: { label: string; value: string }[];
  faqs: { q: string; a: string }[];
  tone: Tone;
  image: string;
  heroImage: string;
};

/**
 * Photograph file stem per tone (see web/public/img and /image-credits).
 * null = no licensed photograph yet; the gradient alone is used.
 */
const PHOTO: Record<Tone, string | null> = {
  dal: 'dal',
  gulmarg: 'gulmarg',
  pahalgam: 'pahalgam',
  sonamarg: 'sonamarg',
  doodhpathri: 'doodhpathri',
  gurez: 'gurez',
  ladakh: 'ladakh',
  pilgrim: 'pilgrim',
  jammu: null, // TODO: no licensed Vaishno Devi photo yet
  goldentriangle: 'goldentriangle',
  world: null,
};

/** Photo URL for a tone, or '' when there is none (components then fall back to the gradient). */
export function photoFor(t: Tone, size: 'sm' | 'lg' = 'lg'): string {
  const stem = PHOTO[t];
  return stem ? `/img/${stem}${size === 'sm' ? '-sm' : ''}.webp` : '';
}

const SXR = 'Srinagar International Airport (SXR), about 30–45 minutes from the city';

const img = (tone: Tone) => ({ tone, image: photoFor(tone, 'sm'), heroImage: photoFor(tone, 'lg') });

export const DESTINATIONS: Destination[] = [
  {
    slug: 'srinagar',
    name: 'Srinagar & Dal Lake',
    seoTitle: 'Srinagar Tour Packages',
    headline: 'Where every Kashmir trip begins',
    intro:
      'A night on a houseboat, a shikara across Dal Lake at first light, the Mughal gardens and the wooden shrines of the old city. Srinagar is our home, and it deserves more than a stopover on the way to Gulmarg.',
    body: [
      'Most Kashmir itineraries treat Srinagar as an airport and a houseboat photo. We plan it as a destination. Stay one night on a houseboat on Dal or the quieter Nigeen Lake, then move to a hotel so you get both: the lake at dawn and a proper bed and hot shower for the nights that follow.',
      'The early-morning floating vegetable market, a shikara through the lake’s back channels, and the terraced Mughal gardens of Nishat, Shalimar and Chashme Shahi are the classic day. The old city is the one most visitors miss: the wooden Khanqah-e-Moula on the Jhelum, Jamia Masjid, and the lanes of papier-mâché, walnut-wood and pashmina workshops.',
      'From Srinagar, Gulmarg, Pahalgam, Sonamarg and Doodhpathri are all within about two to three hours by road, so it works as a base for day trips or as the hub of a longer circuit.',
    ],
    bestTime: 'All year: spring blossom (Mar–Apr), summer (May–Aug), autumn chinars (Oct–Nov), winter snow (Dec–Feb)',
    bestMonths: 'Mar–Nov (Apr and Oct our pick)',
    idealDuration: '2 to 3 nights',
    startingFrom: null,
    airport: SXR,
    altitude: 'About 1,585 m',
    regions: [
      { name: 'Dal Lake', note: 'Houseboats, shikaras and the floating market at dawn' },
      { name: 'Nigeen Lake', note: 'The quieter lake for a calmer houseboat night' },
      { name: 'Mughal gardens', note: 'Nishat, Shalimar and Chashme Shahi above the lake' },
      { name: 'Old city', note: 'Khanqah-e-Moula, Jamia Masjid and the craft lanes' },
      { name: 'Hazratbal', note: 'The white marble shrine on the lake’s north shore' },
      { name: 'Tulip Garden', note: 'Asia’s largest, open for a few weeks around April' },
    ],
    highlights: [
      'One night on a houseboat, then a hotel: the lake without giving up comfort',
      'Shikara to the floating vegetable market at first light',
      'The Mughal gardens stepped above Dal Lake',
      'The old city’s wooden shrines and craft workshops on foot',
      'Kahwa and Kashmiri wazwan with people who live here',
    ],
    knowBefore: [
      { label: 'Getting in', value: 'Direct flights from Delhi, Mumbai and other cities. By rail, the nearest major railhead has long been Jammu Tawi; ask us about current train connections into the Valley.' },
      { label: 'Houseboats', value: 'Quality varies enormously. We only book houseboats we know, and we tell you the category before you pay.' },
      { label: 'Connectivity', value: 'Prepaid SIMs from outside Jammu & Kashmir do not work here. Postpaid connections do; hotels and houseboats have Wi-Fi.' },
      { label: 'Dress', value: 'Modest clothing is appreciated in the old city and at shrines. Carry a scarf for Hazratbal.' },
    ],
    faqs: [
      {
        q: 'Is one night on a houseboat enough?',
        a: 'For most travellers, yes. It is the experience people come for, but houseboats are not hotels: rooms are smaller and you depend on a shikara to reach the shore. One night on the lake and the rest in a hotel is the balance we recommend.',
      },
      {
        q: 'When is the Tulip Garden open?',
        a: 'For a few weeks each spring, usually from late March into April, depending on the season. Dates are announced every year, so tell us you want it and we plan around the actual opening.',
      },
      {
        q: 'Can I see Srinagar in one day?',
        a: 'The lake and the gardens, yes. Add a second day for the old city and Hazratbal. Most of our Kashmir itineraries give Srinagar two nights for that reason.',
      },
    ],
    ...img('dal'),
  },

  {
    slug: 'gulmarg',
    name: 'Gulmarg',
    seoTitle: 'Gulmarg Tour Packages',
    headline: 'The meadow of flowers, and the snow above it',
    intro:
      'A high meadow ringed by pine forest, with one of the highest cable cars in the world climbing to Apharwat. Wildflowers and golf in summer, deep snow and skiing in winter.',
    body: [
      'Gulmarg sits at about 2,650 m, roughly two hours from Srinagar. In summer the meadow is green and open, with pony rides to the smaller meadows around it; from December to March it is one of India’s few real ski resorts.',
      'The Gulmarg Gondola runs in two phases: the first to Kongdoori, and the second to Apharwat peak at close to 4,000 m, where there is snow for much of the year. Phase two closes in high wind and bad weather, so we keep a second option open for the day rather than promising a view the mountain may not give.',
      'A day trip from Srinagar covers the meadow and the gondola. Staying overnight is worth it in winter for snow at sunrise, and in summer for the quiet after the day visitors leave.',
    ],
    bestTime: 'Summer meadows May–Sep; snow and skiing Dec–Mar',
    bestMonths: 'May–Sep for meadows, Jan–Feb for snow',
    idealDuration: 'Day trip, or 1 night',
    startingFrom: null,
    airport: SXR,
    altitude: 'About 2,650 m; Apharwat close to 4,000 m',
    regions: [
      { name: 'Gulmarg meadow', note: 'The open bowl at the heart of the resort' },
      { name: 'Gondola Phase 1', note: 'Up to Kongdoori and its meadows' },
      { name: 'Gondola Phase 2', note: 'On to Apharwat, snow for much of the year' },
      { name: 'Khilanmarg', note: 'A higher meadow reached on foot or by pony' },
      { name: 'Maharani temple', note: 'The small hilltop temple above the meadow' },
    ],
    highlights: [
      'The gondola to Kongdoori and, weather permitting, Apharwat',
      'Snow and skiing lessons from December to March',
      'Wildflower meadows and pony rides in summer',
      'An overnight stay for the meadow at sunrise',
    ],
    knowBefore: [
      { label: 'Gondola tickets', value: 'Book ahead in peak season; slots sell out. We tell you what to book and when.' },
      { label: 'Local services', value: 'Ponies, sledges and snow gear are hired locally at fixed union rates, paid directly. We brief you on fair prices before you go.' },
      { label: 'Weather', value: 'Phase 2 of the gondola closes in wind and storms. Keep the day flexible.' },
      { label: 'Winter driving', value: 'Snow chains or 4x4 may be needed on the road up in winter. We arrange the right vehicle.' },
    ],
    faqs: [
      {
        q: 'Day trip or overnight in Gulmarg?',
        a: 'A day trip covers the meadow and the gondola comfortably. Stay overnight in winter for snow at sunrise, or if you want to ski.',
      },
      {
        q: 'Is there snow in Gulmarg in summer?',
        a: 'Not in the meadow. Apharwat, at the top of Gondola Phase 2, often keeps snow into early summer.',
      },
    ],
    ...img('gulmarg'),
  },

  {
    slug: 'pahalgam',
    name: 'Pahalgam',
    seoTitle: 'Pahalgam Tour Packages',
    headline: 'The Lidder valley, pine and river',
    intro:
      'A riverside town at about 2,200 m in the Lidder valley, the gateway to Aru, Betaab valley and Chandanwari, and base camp for the Amarnath Yatra.',
    body: [
      'Pahalgam is about two and a half to three hours from Srinagar, through the saffron fields of Pampore and past the 9th-century temple ruins at Avantipora. Worth a night at least: the valley is at its best early and late in the day.',
      'The side valleys are the point. Betaab valley, Aru and Chandanwari are reached in local union taxis from Pahalgam, at fixed rates, and each is a different mood: open meadow, river, and the start of the yatra route.',
      'In summer the Lidder is cold, fast and clear, and short walks along it are the best thing to do. Access to some meadows around Pahalgam is set by the local administration and can change at short notice; we plan around what is open when you travel.',
    ],
    bestTime: 'April to November; Chandanwari usually opens from May',
    bestMonths: 'Apr–Jun and Sep–Oct',
    idealDuration: '1 to 2 nights',
    startingFrom: null,
    airport: SXR,
    altitude: 'About 2,200 m',
    regions: [
      { name: 'Betaab valley', note: 'Open meadow and stream, a short drive up the valley' },
      { name: 'Aru valley', note: 'A village meadow and trailhead, quieter than Betaab' },
      { name: 'Chandanwari', note: 'Start of the Amarnath route, snow bridges into summer' },
      { name: 'Lidder river', note: 'Walks and picnics along the water' },
      { name: 'Pampore & Avantipora', note: 'Saffron fields and temple ruins on the drive in' },
    ],
    highlights: [
      'Aru, Betaab and Chandanwari in one day',
      'Saffron fields and Avantipora ruins on the way',
      'A riverside night in the Lidder valley',
      'Base for the Amarnath Yatra from Chandanwari',
    ],
    knowBefore: [
      { label: 'Local taxis', value: 'Private cabs from outside cannot drive to Aru, Betaab or Chandanwari. Local union taxis run these at fixed rates, paid on the spot.' },
      { label: 'Yatra season', value: 'During the Amarnath Yatra, typically July to August, Pahalgam is busy and security is tight. Book early.' },
      { label: 'Access', value: 'Some meadows open and close by administrative order. We check before you travel.' },
    ],
    faqs: [
      {
        q: 'How many nights in Pahalgam?',
        a: 'One night covers Aru, Betaab and Chandanwari. Two nights let you walk, ride or simply sit by the Lidder.',
      },
      {
        q: 'Why do I need a separate taxi in Pahalgam?',
        a: 'Local rules reserve the side-valley routes for the Pahalgam taxi union. It is standard, and we tell you the fixed fares beforehand.',
      },
    ],
    ...img('pahalgam'),
  },

  {
    slug: 'sonamarg',
    name: 'Sonamarg',
    seoTitle: 'Sonamarg Tour Packages',
    headline: 'The meadow of gold on the road to Ladakh',
    intro:
      'The last green valley before Zojila, at about 2,730 m on the Srinagar–Leh road, with the Thajiwas glacier a pony ride away.',
    body: [
      'Sonamarg is roughly two and a half hours from Srinagar along the Sindh river. Most visitors come for the Thajiwas glacier, reached on foot or by pony from the meadow, and for the high-altitude lakes trek that starts here.',
      'It is also the doorway to Ladakh. Beyond Sonamarg the road climbs over Zojila to Drass and Kargil; the Z-Morh tunnel has made Sonamarg itself easier to reach in winter, though snow still closes the road beyond it for months.',
      'A day trip from Srinagar is standard. Stay the night if you want the valley after the crowds, or if you are driving on to Ladakh the next morning.',
    ],
    bestTime: 'May to October; winter access has improved, conditions vary',
    bestMonths: 'May–Jun and Sep–Oct',
    idealDuration: 'Day trip, or 1 night',
    startingFrom: null,
    airport: SXR,
    altitude: 'About 2,730 m',
    regions: [
      { name: 'Thajiwas glacier', note: 'A walk or pony ride from the Sonamarg meadow' },
      { name: 'Sindh valley', note: 'The river road from Srinagar' },
      { name: 'Zojila', note: 'The pass into Ladakh, open in season' },
      { name: 'Great Lakes trailhead', note: 'Start of the Kashmir Great Lakes trek' },
    ],
    highlights: [
      'The Thajiwas glacier from the Sonamarg meadow',
      'The Sindh river drive from Srinagar',
      'An overnight stop on the road to Ladakh',
    ],
    knowBefore: [
      { label: 'Local services', value: 'Ponies and local taxis for Thajiwas and Zojila run at fixed union rates, paid directly.' },
      { label: 'Weather', value: 'Cooler than Srinagar even in summer. Carry a warm layer.' },
    ],
    faqs: [
      {
        q: 'Can we see snow in Sonamarg in summer?',
        a: 'Often, yes: the Thajiwas glacier and the slopes around it hold snow into summer, and Zojila (when open) usually has snow by the road.',
      },
    ],
    ...img('sonamarg'),
  },

  {
    slug: 'offbeat-kashmir',
    name: 'Offbeat Kashmir',
    seoTitle: 'Offbeat Kashmir Tour Packages',
    headline: 'The Kashmir most visitors never reach',
    intro:
      'Gurez beyond the Razdan pass, the meadows of Doodhpathri and Yusmarg, and the quiet valleys of the north. The Kashmir we grew up with, before the crowds.',
    body: [
      'Doodhpathri and Yusmarg are the easy introductions: open meadows in Budgam district, each within about two hours of Srinagar, with rivers, pine forest and a fraction of Gulmarg’s visitors.',
      'Gurez is the real journey. It lies north of Bandipora over the Razdan pass, along the Kishanganga river, with the Dard-Shin villages of Dawar and the pyramid of Habba Khatoon peak. The road is usually open from around May or June until the first heavy snow in November. Indian travellers carry ID for checkpoints; access for foreign nationals is restricted, so ask us first.',
      'Beyond these, Bangus and Lolab in Kupwara and the Warwan valley reward travellers who want homestays, walking and very little else. We plan these one trip at a time.',
    ],
    bestTime: 'May to October (Gurez road usually open May/June to November)',
    bestMonths: 'Jun–Sep',
    idealDuration: '2 to 4 nights',
    startingFrom: null,
    airport: SXR,
    altitude: 'About 2,400 m (Gurez) to 2,700 m (Doodhpathri)',
    regions: [
      { name: 'Gurez valley', note: 'Dawar, the Kishanganga and Habba Khatoon peak' },
      { name: 'Tulail valley', note: 'Further up the Kishanganga beyond Gurez' },
      { name: 'Doodhpathri', note: 'Meadows and the Shaliganga river, Budgam' },
      { name: 'Yusmarg', note: 'Pine-ringed meadow in the Pir Panjal foothills' },
      { name: 'Bangus & Lolab', note: 'Kupwara’s quiet valleys, homestays and walks' },
    ],
    highlights: [
      'Over the Razdan pass into Gurez',
      'Habba Khatoon peak above Dawar',
      'Doodhpathri’s meadows without the crowds',
      'Homestays and village walks in the north',
    ],
    knowBefore: [
      { label: 'Permissions', value: 'Indian nationals carry photo ID for checkpoints on the Gurez road. Foreign nationals face restrictions; check with us before planning.' },
      { label: 'Stays', value: 'Simple guesthouses, homestays and camps rather than hotels. Comfortable, not luxurious.' },
      { label: 'Connectivity', value: 'Patchy to none in Gurez and the northern valleys.' },
    ],
    faqs: [
      {
        q: 'Is Gurez safe to visit?',
        a: 'Gurez is open to Indian tourists in season, and we travel there regularly. Conditions near the Line of Control can change, so we check the latest position before every departure and will reroute if needed.',
      },
      {
        q: 'Can I combine offbeat Kashmir with Srinagar and Gulmarg?',
        a: 'Yes. Doodhpathri fits as a day trip into any Srinagar stay; Gurez needs at least two nights of its own.',
      },
    ],
    ...img('gurez'),
  },

  {
    slug: 'ladakh',
    name: 'Ladakh via Srinagar',
    seoTitle: 'Ladakh Tour Packages from Srinagar',
    headline: 'Over Zojila, the gentle way up',
    intro:
      'Drive from Srinagar to Leh over two days through Sonamarg, Zojila, Drass and Kargil. Gaining height by road gives your body time to adjust before Leh, Nubra and Pangong.',
    body: [
      'Flying straight into Leh at 3,500 m is the most common way to get altitude sickness. Driving in from Srinagar spreads the climb over two days, with a night in Kargil, and passes through Drass and the moonscape at Lamayuru on the way.',
      'From Leh the classic circuit is Nubra over Khardung La and Pangong over the Shyok route or Chang La. We sequence it by altitude: a rest day in Leh first, the high passes after.',
      'The Srinagar–Leh road is usually open from around April or May to November, depending on snow on Zojila. Outside that window, Ladakh is by air only.',
    ],
    bestTime: 'May to September (road open roughly Apr/May–Nov)',
    bestMonths: 'Jun–Sep',
    idealDuration: '6 to 8 nights including Srinagar',
    startingFrom: null,
    airport: 'Arrive Srinagar (SXR); depart Leh (IXL)',
    altitude: '2,700 m (Kargil) to 3,500 m (Leh); passes above 5,000 m',
    regions: [
      { name: 'Zojila & Drass', note: 'The pass out of Kashmir and India’s coldest inhabited town' },
      { name: 'Kargil', note: 'The overnight halfway point' },
      { name: 'Lamayuru', note: 'The monastery above the moonland' },
      { name: 'Leh', note: 'Rest day, the palace and Shanti Stupa' },
      { name: 'Nubra & Pangong', note: 'Over the high passes once you have acclimatised' },
    ],
    highlights: [
      'Two days overland from Srinagar, acclimatising as you go',
      'Zojila, Drass and the Kargil war memorial',
      'The Lamayuru moonland',
      'Nubra and Pangong, only after a rest day in Leh',
    ],
    knowBefore: [
      { label: 'Altitude', value: 'Rest on your first day in Leh and drink plenty of water. Speak to your doctor first if you have a heart or lung condition.' },
      { label: 'Permits', value: 'Indian guests pay the Ladakh environmental fee for Nubra and Pangong; foreign nationals need a Protected Area Permit. We arrange both.' },
      { label: 'Vehicles', value: 'Ladakh rules require locally registered taxis within Ladakh; we arrange the change of vehicle.' },
    ],
    faqs: [
      {
        q: 'Why start Ladakh from Srinagar?',
        a: 'Because driving up gives you two days to adjust to the height, and you see Kashmir on the way. Flying into Leh puts you at 3,500 m in ninety minutes.',
      },
    ],
    ...img('ladakh'),
  },
];

export function getDestination(slug: string): Destination | undefined {
  return DESTINATIONS.find((d) => d.slug === slug);
}

const NAVY_GLOW = 'radial-gradient(140% 120% at 26% 8%, #1d4a5a 0%, #14222f 46%, #0b141d 100%)';

function bg(t: Tone, scrim: string, size: 'sm' | 'lg') {
  const stem = PHOTO[t];
  return stem
    ? `${scrim}, url("/img/${stem}${size === 'sm' ? '-sm' : ''}.webp") center / cover`
    : `${scrim}, ${NAVY_GLOW}`;
}

/** Card backgrounds: the small photograph under a navy scrim for legible text. */
export const TONE_BG = Object.fromEntries(
  (Object.keys(PHOTO) as Tone[]).map((t) => [
    t,
    bg(t, 'linear-gradient(180deg, rgba(11,20,29,0.10) 0%, rgba(11,20,29,0.85) 100%)', 'sm'),
  ]),
) as Record<Tone, string>;

/** High-contrast hero backdrop: the full photograph under a heavier navy scrim. */
export const TONE_HERO = Object.fromEntries(
  (Object.keys(PHOTO) as Tone[]).map((t) => [
    t,
    bg(t, 'linear-gradient(180deg, rgba(11,20,29,0.65) 0%, rgba(11,20,29,0.92) 100%)', 'lg'),
  ]),
) as Record<Tone, string>;
