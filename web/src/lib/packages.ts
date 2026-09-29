import { photoFor, type Tone } from './destinations.ts';

/**
 * Tour packages — the "spoke" pages in our hub-and-spoke SEO model, and the
 * highest-intent surface on the site. Every one carries a day-by-day
 * itinerary, honest inclusions/exclusions and FAQs, because thin price-list
 * pages do not rank and do not convert.
 *
 * Kashmir first, then the pilgrimages, Ladakh by road, and the Golden
 * Triangle for visitors to India.
 *
 * TODO(brand): `priceFrom` is null on every package, rendered as "Price on
 * request", until Falcon Trails sets its own per-person prices. Set a number
 * (per person, twin-sharing) and every card, sidebar and JSON-LD offer picks
 * it up. Review the inclusions against what you actually sell.
 */

export type Pkg = {
  slug: string;
  name: string;
  /** Primary destination hub. Groups the package on /packages. */
  destination: string;
  destinationName: string;
  /** Every destination hub the route passes through. Drives each hub's package list. */
  regions: string[];
  nights: number;
  days: number;
  /** Per person on twin-sharing, or null while the price is on request. */
  priceFrom: number | null;
  /** Travel-style slugs this package suits. Drives /travel-styles pages. */
  styles: string[];
  summary: string;
  /** Stops in order — rendered as the route ribbon. */
  route: string[];
  bestMonths: string;
  idealFor: string;
  itinerary: {
    day: number;
    title: string;
    body: string;
    stay?: string;
    meals?: string;
  }[];
  inclusions: string[];
  exclusions: string[];
  /** Honest "this trip may not suit you if" notes, shown before the FAQs. */
  advisory?: { title: string; body: string }[];
  faqs: { q: string; a: string }[];
  tone: Tone;
  image: string;
  /** Surfaces on the home page and the packages index as a featured card. */
  featured?: boolean;
};

const BD = 'Breakfast & dinner';

/** What every Kashmir road trip includes unless a package says otherwise. */
const KASHMIR_INCLUDES = [
  'Hotels as per itinerary in the category you choose, on twin-sharing',
  'One night on a houseboat where the itinerary says so',
  'Daily breakfast and dinner',
  'Private cab for all transfers and sightseeing in the itinerary',
  'Airport pickup and drop in Srinagar',
  'A shikara ride on Dal Lake',
  'One named trip coordinator on WhatsApp for the whole trip',
];

const KASHMIR_EXCLUDES = [
  'Flights or trains to and from Srinagar',
  'Gulmarg Gondola tickets',
  'Local union taxis at Pahalgam (Aru, Betaab, Chandanwari) and Sonamarg (Thajiwas, Zojila), paid on the spot at fixed rates',
  'Ponies, sledges, snow gear and guide fees at the resorts',
  'Lunches, drinks, tips and anything not listed as included',
];

const img = (tone: Tone) => ({ tone, image: photoFor(tone) });

export const PACKAGES: Pkg[] = [
  {
    slug: 'kashmir-essentials-4-nights',
    name: 'Kashmir Essentials',
    destination: 'srinagar',
    destinationName: 'Kashmir',
    regions: ['srinagar', 'gulmarg', 'pahalgam'],
    nights: 4,
    days: 5,
    priceFrom: null,
    styles: ['discover-india', 'family', 'group-departures'],
    summary:
      'The classic first Kashmir trip, planned properly: a houseboat night on Dal Lake, Gulmarg and its gondola, and a night in the Lidder valley at Pahalgam.',
    route: ['Srinagar', 'Gulmarg', 'Pahalgam', 'Srinagar'],
    bestMonths: 'Mar–Nov',
    idealFor: 'First-time visitors, families and anyone with five days',
    itinerary: [
      {
        day: 1,
        title: 'Arrive Srinagar · Dal Lake',
        body: 'Pickup at Srinagar airport. Afternoon in the Mughal gardens of Nishat and Shalimar, then a shikara across Dal Lake at sunset to your houseboat.',
        stay: 'Houseboat, Dal or Nigeen Lake',
        meals: 'Dinner',
      },
      {
        day: 2,
        title: 'Gulmarg day trip',
        body: 'About two hours to Gulmarg. The meadow, and the gondola to Kongdoori, and on to Apharwat when the weather allows. Back to Srinagar by evening.',
        stay: 'Hotel in Srinagar',
        meals: BD,
      },
      {
        day: 3,
        title: 'Srinagar to Pahalgam',
        body: 'Through the saffron fields of Pampore and past the Avantipora temple ruins into the Lidder valley. Afternoon by the river.',
        stay: 'Hotel in Pahalgam',
        meals: BD,
      },
      {
        day: 4,
        title: 'Aru, Betaab and Chandanwari',
        body: 'Morning in the side valleys by local union taxi, then back to Srinagar for an evening in the old city or the markets on the Bund.',
        stay: 'Hotel in Srinagar',
        meals: BD,
      },
      {
        day: 5,
        title: 'Depart Srinagar',
        body: 'Early shikara to the floating vegetable market if your flight allows, then drop at the airport.',
        meals: 'Breakfast',
      },
    ],
    inclusions: KASHMIR_INCLUDES,
    exclusions: KASHMIR_EXCLUDES,
    faqs: [
      {
        q: 'Can we add Sonamarg?',
        a: 'Yes, as a day trip from Srinagar with one extra night. Or take the Kashmir Grand Tour, which includes it.',
      },
      {
        q: 'Can we skip the houseboat?',
        a: 'Of course. We replace it with a hotel night; tell us when you enquire.',
      },
    ],
    featured: true,
    ...img('dal'),
  },

  {
    slug: 'kashmir-grand-tour-6-nights',
    name: 'Kashmir Grand Tour',
    destination: 'srinagar',
    destinationName: 'Kashmir',
    regions: ['srinagar', 'gulmarg', 'pahalgam', 'sonamarg', 'offbeat-kashmir'],
    nights: 6,
    days: 7,
    priceFrom: null,
    styles: ['discover-india', 'family', 'visitors-to-india'],
    summary:
      'All four of the Valley’s great names without rushing: Srinagar, a night in Gulmarg, two in Pahalgam, Sonamarg and the meadows of Doodhpathri.',
    route: ['Srinagar', 'Sonamarg', 'Gulmarg', 'Pahalgam', 'Doodhpathri', 'Srinagar'],
    bestMonths: 'Apr–Oct',
    idealFor: 'A full week in Kashmir, families and travellers from overseas',
    itinerary: [
      {
        day: 1,
        title: 'Arrive Srinagar · houseboat',
        body: 'Airport pickup, Mughal gardens in the afternoon and a sunset shikara to your houseboat.',
        stay: 'Houseboat, Dal or Nigeen Lake',
        meals: 'Dinner',
      },
      {
        day: 2,
        title: 'Sonamarg day trip',
        body: 'Along the Sindh river to Sonamarg. Walk or ride to the Thajiwas glacier, back to Srinagar by evening.',
        stay: 'Hotel in Srinagar',
        meals: BD,
      },
      {
        day: 3,
        title: 'Srinagar to Gulmarg',
        body: 'Drive up to Gulmarg and take the gondola in the afternoon. Stay the night for the meadow after the day visitors leave.',
        stay: 'Hotel in Gulmarg',
        meals: BD,
      },
      {
        day: 4,
        title: 'Gulmarg to Pahalgam',
        body: 'A long but beautiful drive via Srinagar and Pampore’s saffron fields into the Lidder valley.',
        stay: 'Hotel in Pahalgam',
        meals: BD,
      },
      {
        day: 5,
        title: 'Pahalgam valleys',
        body: 'Aru, Betaab and Chandanwari by local union taxi, and time by the river.',
        stay: 'Hotel in Pahalgam',
        meals: BD,
      },
      {
        day: 6,
        title: 'Doodhpathri, then Srinagar',
        body: 'Back towards Srinagar with a detour to the meadows of Doodhpathri, or an old-city walk if you prefer.',
        stay: 'Hotel in Srinagar',
        meals: BD,
      },
      {
        day: 7,
        title: 'Depart Srinagar',
        body: 'Hazratbal or the floating market if time allows, then the airport.',
        meals: 'Breakfast',
      },
    ],
    inclusions: KASHMIR_INCLUDES,
    exclusions: KASHMIR_EXCLUDES,
    faqs: [
      {
        q: 'Is this too much driving?',
        a: 'The longest day is Gulmarg to Pahalgam, about four to five hours. Every other day is two to three hours at most.',
      },
      {
        q: 'Does this work in winter?',
        a: 'Yes, with changes: Gulmarg becomes a snow stay, Doodhpathri and parts of Pahalgam may be snowed in, and we plan around road conditions.',
      },
    ],
    featured: true,
    ...img('gulmarg'),
  },

  {
    slug: 'kashmir-honeymoon-5-nights',
    name: 'Kashmir Honeymoon',
    destination: 'srinagar',
    destinationName: 'Kashmir',
    regions: ['srinagar', 'gulmarg', 'pahalgam'],
    nights: 5,
    days: 6,
    priceFrom: null,
    styles: ['honeymoon'],
    summary:
      'Slower and quieter: a houseboat night on Nigeen Lake, a night in Gulmarg, two by the river in Pahalgam, and time left empty on purpose.',
    route: ['Srinagar', 'Gulmarg', 'Pahalgam', 'Srinagar'],
    bestMonths: 'Mar–Jun, Sep–Nov, and Jan–Feb for snow',
    idealFor: 'Couples who want Kashmir without a checklist',
    itinerary: [
      {
        day: 1,
        title: 'Arrive Srinagar · Nigeen Lake',
        body: 'Airport pickup to a houseboat on the quieter Nigeen Lake. Sunset shikara, dinner on board.',
        stay: 'Houseboat, Nigeen Lake',
        meals: 'Dinner',
      },
      {
        day: 2,
        title: 'Srinagar to Gulmarg',
        body: 'Gardens on the way out of the city, then Gulmarg and the gondola. Evening in the meadow.',
        stay: 'Hotel in Gulmarg',
        meals: BD,
      },
      {
        day: 3,
        title: 'Gulmarg to Pahalgam',
        body: 'Through Srinagar and the saffron country to the Lidder valley.',
        stay: 'Hotel in Pahalgam',
        meals: BD,
      },
      {
        day: 4,
        title: 'A free day in Pahalgam',
        body: 'Aru and Betaab in the morning if you want them; a riverside afternoon if you do not.',
        stay: 'Hotel in Pahalgam',
        meals: BD,
      },
      {
        day: 5,
        title: 'Pahalgam to Srinagar',
        body: 'Back to Srinagar for the old city, a last shikara or the markets.',
        stay: 'Hotel in Srinagar',
        meals: BD,
      },
      {
        day: 6,
        title: 'Depart Srinagar',
        body: 'Drop at the airport.',
        meals: 'Breakfast',
      },
    ],
    inclusions: [...KASHMIR_INCLUDES, 'A private cab for the two of you throughout'],
    exclusions: KASHMIR_EXCLUDES,
    faqs: [
      {
        q: 'Can you upgrade the rooms?',
        a: 'Yes. Tell us the category you want and we quote for it; better rooms in Gulmarg and Pahalgam make the biggest difference.',
      },
    ],
    featured: true,
    ...img('pahalgam'),
  },

  {
    slug: 'offbeat-kashmir-gurez-6-nights',
    name: 'Offbeat Kashmir: Gurez & Doodhpathri',
    destination: 'offbeat-kashmir',
    destinationName: 'Offbeat Kashmir',
    regions: ['offbeat-kashmir', 'srinagar'],
    nights: 6,
    days: 7,
    priceFrom: null,
    styles: ['discover-india', 'group-departures'],
    summary:
      'Over the Razdan pass into Gurez and the Tulail valley, with Doodhpathri’s meadows and the old city of Srinagar on either side. The Kashmir most visitors never reach.',
    route: ['Srinagar', 'Doodhpathri', 'Gurez', 'Tulail', 'Gurez', 'Srinagar'],
    bestMonths: 'Jun–Sep',
    idealFor: 'Travellers who have seen the classic circuit, or want to skip it',
    itinerary: [
      {
        day: 1,
        title: 'Arrive Srinagar',
        body: 'Airport pickup. Old-city walk: Khanqah-e-Moula, Jamia Masjid and the craft lanes.',
        stay: 'Hotel in Srinagar',
        meals: 'Dinner',
      },
      {
        day: 2,
        title: 'Doodhpathri day trip',
        body: 'About two hours to the meadows and the Shaliganga river in Budgam. Back to Srinagar.',
        stay: 'Hotel in Srinagar',
        meals: BD,
      },
      {
        day: 3,
        title: 'Srinagar to Gurez',
        body: 'Past Wular Lake and Bandipora, then over the Razdan pass into the Kishanganga valley. A long, spectacular day.',
        stay: 'Guesthouse or camp in Dawar',
        meals: BD,
      },
      {
        day: 4,
        title: 'Tulail valley',
        body: 'Up the Kishanganga into Tulail’s wooden villages. Back to Dawar.',
        stay: 'Guesthouse or camp in Dawar',
        meals: BD,
      },
      {
        day: 5,
        title: 'Around Dawar',
        body: 'Habba Khatoon peak, the Kishanganga and village walks at your own pace.',
        stay: 'Guesthouse or camp in Dawar',
        meals: BD,
      },
      {
        day: 6,
        title: 'Gurez to Srinagar',
        body: 'Back over Razdan to Srinagar. Evening shikara on Dal Lake.',
        stay: 'Houseboat or hotel in Srinagar',
        meals: BD,
      },
      {
        day: 7,
        title: 'Depart Srinagar',
        body: 'Drop at the airport.',
        meals: 'Breakfast',
      },
    ],
    inclusions: [
      'Hotels in Srinagar and simple guesthouse or camp stays in Gurez, on twin-sharing',
      'Daily breakfast and dinner',
      'Private cab suited to the Razdan road for the whole trip',
      'Airport pickup and drop in Srinagar',
      'One named trip coordinator on WhatsApp for the whole trip',
    ],
    exclusions: [
      'Flights or trains to and from Srinagar',
      'Lunches, drinks, tips and anything not listed as included',
      'Pony or guide fees for optional walks',
    ],
    advisory: [
      {
        title: 'Foreign nationals',
        body: 'Access to Gurez is restricted for foreign passport holders. Ask us before booking; we will suggest an alternative northern valley.',
      },
      {
        title: 'Anyone who needs hotel comforts',
        body: 'Stays in Gurez are clean and warm but simple. Hot water may be by bucket, and there is little to no mobile signal.',
      },
      {
        title: 'Early- or late-season travellers',
        body: 'The Razdan pass usually opens around May or June and closes with the first heavy snow in November. Outside that window this route cannot run.',
      },
    ],
    faqs: [
      {
        q: 'Do we need a permit for Gurez?',
        a: 'Indian nationals carry photo ID for checkpoints on the way; there is no separate tourist permit in normal conditions. We confirm the current position before you travel.',
      },
    ],
    featured: true,
    ...img('gurez'),
  },

  {
    slug: 'amarnath-yatra-baltal',
    name: 'Amarnath Yatra via Baltal',
    destination: 'sonamarg',
    destinationName: 'Amarnath',
    regions: ['sonamarg', 'srinagar'],
    nights: 3,
    days: 4,
    priceFrom: null,
    styles: ['sacred-journeys', 'group-departures'],
    summary:
      'The shorter Baltal route to the holy cave, with a Srinagar night before, your stay near Baltal/Sonamarg arranged, and a guide who has walked it before.',
    route: ['Srinagar', 'Sonamarg / Baltal', 'Holy Cave', 'Baltal', 'Srinagar'],
    bestMonths: 'Yatra season only (dates set by SASB each year, usually Jul–Aug)',
    idealFor: 'Yatris who want the logistics handled on the ground',
    itinerary: [
      {
        day: 1,
        title: 'Arrive Srinagar',
        body: 'Airport pickup. We check your registration, health certificate and RFID card, and brief you on the walk.',
        stay: 'Hotel in Srinagar',
        meals: 'Dinner',
      },
      {
        day: 2,
        title: 'Srinagar to Sonamarg / Baltal',
        body: 'Drive to Sonamarg or the Baltal base as convoy timings allow. Rest and an early night.',
        stay: 'Hotel in Sonamarg or camp near Baltal',
        meals: BD,
      },
      {
        day: 3,
        title: 'Yatra to the Holy Cave',
        body: 'An early start on foot or by pony (about 14 km each way), or by helicopter to Panjtarni where booked. Darshan and return to Baltal.',
        stay: 'Hotel in Sonamarg or camp near Baltal',
        meals: BD,
      },
      {
        day: 4,
        title: 'Return to Srinagar',
        body: 'Back to Srinagar and drop at the airport, or extend your stay in Kashmir.',
        meals: 'Breakfast',
      },
    ],
    inclusions: [
      'Hotel in Srinagar and stay at Sonamarg or near Baltal, on twin-sharing',
      'Daily breakfast and dinner',
      'Private cab Srinagar–Sonamarg/Baltal–Srinagar',
      'An experienced yatra guide for the walk',
      'Help with registration paperwork and on-ground logistics',
    ],
    exclusions: [
      'SASB registration fees and the compulsory health certificate',
      'Helicopter tickets, ponies, palkis and porters',
      'Flights to and from Srinagar',
      'Anything not listed as included',
    ],
    advisory: [
      {
        title: 'Anyone without registration',
        body: 'Registration with the Shri Amarnathji Shrine Board and a Compulsory Health Certificate from an authorised doctor are mandatory. Without them you cannot join the yatra.',
      },
      {
        title: 'Anyone with a heart or lung condition',
        body: 'The cave is at about 3,900 m. Take medical advice first; the Board sets age and health limits every year.',
      },
    ],
    faqs: [
      {
        q: 'When is the Amarnath Yatra?',
        a: 'The Shri Amarnathji Shrine Board announces the dates each year, usually for July and August. We plan around the official schedule.',
      },
      {
        q: 'Baltal or Pahalgam route?',
        a: 'Baltal is shorter and steeper, done in one long day. The Pahalgam route via Chandanwari and Sheshnag takes about three days. We can arrange either.',
      },
    ],
    ...img('pilgrim'),
  },

  {
    slug: 'vaishno-devi-yatra',
    name: 'Vaishno Devi Yatra',
    destination: 'jammu',
    destinationName: 'Jammu',
    regions: [],
    nights: 2,
    days: 3,
    priceFrom: null,
    styles: ['sacred-journeys', 'family'],
    summary:
      'Jammu to Katra, the climb to the Bhawan and Bhairon temple, and back, with a guide and your stay in Katra handled.',
    route: ['Jammu', 'Katra', 'Bhawan', 'Katra', 'Jammu'],
    bestMonths: 'All year (busiest during Navratri and summer holidays)',
    idealFor: 'Families and first-time yatris',
    itinerary: [
      {
        day: 1,
        title: 'Jammu to Katra',
        body: 'Pickup at Jammu airport or railway station and a drive of about 1.5 hours to Katra. Collect your RFID yatra card and rest.',
        stay: 'Hotel in Katra',
        meals: 'Dinner',
      },
      {
        day: 2,
        title: 'Yatra to the Bhawan',
        body: 'The walk from Banganga to the Bhawan (about 13 km), or ponies, battery cars or the helicopter to Sanjichhat where booked. Darshan, Bhairon temple, and back to Katra.',
        stay: 'Hotel in Katra',
        meals: BD,
      },
      {
        day: 3,
        title: 'Katra to Jammu',
        body: 'Drop at Jammu airport or railway station, or continue to Srinagar.',
        meals: 'Breakfast',
      },
    ],
    inclusions: [
      'Hotel in Katra on twin-sharing',
      'Daily breakfast and dinner',
      'Private cab Jammu–Katra–Jammu',
      'A guide for the yatra',
    ],
    exclusions: [
      'Helicopter, pony, palki and battery car tickets',
      'Travel to and from Jammu',
      'Anything not listed as included',
    ],
    faqs: [
      {
        q: 'Is registration needed?',
        a: 'Yes. Every yatri needs an RFID yatra card, available online or at Katra. We help you get it.',
      },
      {
        q: 'Can we combine Vaishno Devi with Kashmir?',
        a: 'Yes. Jammu to Srinagar is a day by road; many families do Vaishno Devi first and then a Kashmir circuit.',
      },
    ],
    ...img('jammu'),
  },

  {
    slug: 'srinagar-to-leh-road-trip-7-nights',
    name: 'Srinagar to Leh Road Trip',
    destination: 'ladakh',
    destinationName: 'Ladakh',
    regions: ['ladakh', 'sonamarg', 'srinagar'],
    nights: 7,
    days: 8,
    priceFrom: null,
    styles: ['discover-india', 'group-departures'],
    summary:
      'Srinagar to Leh overland over Zojila, a night in Kargil, a rest day in Leh, then Nubra and Pangong. The route that lets your body keep up with the altitude.',
    route: ['Srinagar', 'Sonamarg', 'Kargil', 'Leh', 'Nubra', 'Pangong', 'Leh'],
    bestMonths: 'Jun–Sep',
    idealFor: 'Travellers who want Kashmir and Ladakh in one trip',
    itinerary: [
      {
        day: 1,
        title: 'Arrive Srinagar',
        body: 'Airport pickup, Mughal gardens and a shikara on Dal Lake.',
        stay: 'Houseboat or hotel in Srinagar',
        meals: 'Dinner',
      },
      {
        day: 2,
        title: 'Srinagar to Kargil · 2,700 m',
        body: 'Via Sonamarg, over Zojila and through Drass, with a stop at the Kargil war memorial.',
        stay: 'Hotel in Kargil',
        meals: BD,
      },
      {
        day: 3,
        title: 'Kargil to Leh · 3,500 m',
        body: 'Past Mulbekh’s rock-cut Maitreya and the Lamayuru moonland, along the Indus to Leh.',
        stay: 'Hotel in Leh',
        meals: BD,
      },
      {
        day: 4,
        title: 'Rest day in Leh',
        body: 'A slow day: the palace and Old Town lanes on foot, Shanti Stupa at sunset.',
        stay: 'Hotel in Leh',
        meals: BD,
      },
      {
        day: 5,
        title: 'Leh to Nubra via Khardung La',
        body: 'Over the pass to the sand dunes at Hunder and the monastery at Diskit.',
        stay: 'Camp in Nubra',
        meals: BD,
      },
      {
        day: 6,
        title: 'Nubra to Pangong',
        body: 'Along the Shyok river to Pangong Tso, the lake that changes colour through the day.',
        stay: 'Camp at Pangong',
        meals: BD,
      },
      {
        day: 7,
        title: 'Pangong to Leh',
        body: 'Over Chang La back to Leh.',
        stay: 'Hotel in Leh',
        meals: BD,
      },
      {
        day: 8,
        title: 'Depart Leh',
        body: 'Drop at Leh airport.',
        meals: 'Breakfast',
      },
    ],
    inclusions: [
      'Hotels, a houseboat or hotel in Srinagar, and camps in Nubra and Pangong, on twin-sharing',
      'Daily breakfast and dinner',
      'Private cab Srinagar–Leh, then a Ladakh-registered cab within Ladakh as local rules require',
      'Ladakh environmental fee and permits (Protected Area Permit for foreign nationals)',
      'One named trip coordinator on WhatsApp for the whole trip',
    ],
    exclusions: [
      'Flight into Srinagar and out of Leh',
      'Camel rides, monastery entry fees and anything not listed as included',
    ],
    advisory: [
      {
        title: 'Anyone who wants to rush the altitude',
        body: 'We keep the rest day in Leh before the high passes. It is not negotiable, because it is what keeps people well.',
      },
      {
        title: 'Anyone with a heart or lung condition',
        body: 'Take medical advice before any trip above 3,500 m, then talk to us.',
      },
    ],
    faqs: [
      {
        q: 'When is the Srinagar–Leh road open?',
        a: 'Usually from around April or May to November, depending on snow on Zojila. We plan this trip between June and September for reliable conditions.',
      },
    ],
    ...img('ladakh'),
  },

  {
    slug: 'golden-triangle-5-nights',
    name: 'The Golden Triangle',
    destination: 'goldentriangle',
    destinationName: 'Delhi · Agra · Jaipur',
    regions: [],
    nights: 5,
    days: 6,
    priceFrom: null,
    styles: ['visitors-to-india'],
    summary:
      'Delhi, Agra and Jaipur for travellers coming to India, unhurried and with local guides, and an easy add-on to Kashmir.',
    route: ['Delhi', 'Agra', 'Jaipur', 'Delhi'],
    bestMonths: 'Oct–Mar',
    idealFor: 'First-time visitors to India',
    itinerary: [
      {
        day: 1,
        title: 'Arrive Delhi',
        body: 'Airport pickup and time to rest after the flight.',
        stay: 'Hotel in Delhi',
      },
      {
        day: 2,
        title: 'Old and New Delhi',
        body: 'Jama Masjid and the lanes of Chandni Chowk, Humayun’s Tomb and Qutub Minar with a local guide.',
        stay: 'Hotel in Delhi',
        meals: 'Breakfast',
      },
      {
        day: 3,
        title: 'Delhi to Agra',
        body: 'Agra Fort in the afternoon and the Taj Mahal from Mehtab Bagh across the river at sunset.',
        stay: 'Hotel in Agra',
        meals: 'Breakfast',
      },
      {
        day: 4,
        title: 'Taj Mahal at sunrise · on to Jaipur',
        body: 'The Taj at first light (closed on Fridays), then Fatehpur Sikri on the way to Jaipur.',
        stay: 'Hotel in Jaipur',
        meals: 'Breakfast',
      },
      {
        day: 5,
        title: 'Jaipur',
        body: 'Amber Fort, the City Palace, Jantar Mantar and the bazaars of the pink city.',
        stay: 'Hotel in Jaipur',
        meals: 'Breakfast',
      },
      {
        day: 6,
        title: 'Jaipur to Delhi',
        body: 'Back to Delhi for your flight home, or fly on to Srinagar.',
        meals: 'Breakfast',
      },
    ],
    inclusions: [
      'Hotels on twin-sharing with daily breakfast',
      'Private air-conditioned car with driver throughout',
      'Local English-speaking guides in Delhi, Agra and Jaipur',
      'Airport pickup and drop in Delhi',
    ],
    exclusions: [
      'International and domestic flights, visas and travel insurance',
      'Monument entry fees',
      'Lunches, dinners and anything not listed as included',
    ],
    faqs: [
      {
        q: 'Can we add Kashmir?',
        a: 'Yes. Delhi to Srinagar is a short flight; the Golden Triangle followed by Kashmir Essentials is a popular two-week trip.',
      },
    ],
    ...img('goldentriangle'),
  },
];

export function getPackage(slug: string): Pkg | undefined {
  return PACKAGES.find((p) => p.slug === slug);
}

export function packagesFor(destinationSlug: string): Pkg[] {
  return PACKAGES.filter((p) => p.regions.includes(destinationSlug));
}

export function packagesForStyle(styleSlug: string): Pkg[] {
  return PACKAGES.filter((p) => p.styles.includes(styleSlug));
}

/**
 * Home-page feature row. Capped at four so it fills the 4-column grid exactly
 * — a fifth card orphans onto its own row and reads as a layout bug.
 */
export const FEATURED = PACKAGES.filter((p) => p.featured).slice(0, 4);
