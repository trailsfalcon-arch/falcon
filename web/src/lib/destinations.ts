/**
 * Destination hubs — the "pillar" pages in our hub-and-spoke SEO model.
 * Each hub links down to the packages whose route passes through it (the
 * spokes) and up from the home grid.
 *
 * Kashmir hubs come first; the four Ladakh hubs follow.
 */

/**
 * Picks the backdrop behind cards and heroes. The Ladakh tones have
 * photographs; the Kashmir tones are gradients until real photos are added.
 */
export type Tone = 'valley' | 'monastery' | 'highroad' | 'nightsky' | 'lake' | 'meadow' | 'snow';

export type Region = 'kashmir' | 'ladakh';

export const REGION_NAMES: Record<Region, string> = {
  kashmir: 'Kashmir',
  ladakh: 'Ladakh',
};

export type Destination = {
  slug: string;
  region: Region;
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
  /** Per-person starting price. Omitted = price on request. */
  startingFrom?: number;
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

const AIRPORT = 'Leh (IXL), Kushok Bakula Rimpochee Airport, about 10 minutes from town';

export const DESTINATIONS: Destination[] = [
  // ─────────────────────────────── KASHMIR ───────────────────────────────
  {
    slug: 'srinagar',
    region: 'kashmir',
    name: 'Srinagar & Dal Lake',
    seoTitle: 'Srinagar Tour Packages',
    headline: 'A city on the water, and the start of every Kashmir trip',
    intro:
      'A night on a houseboat, a shikara out on Dal Lake at first light, the Mughal gardens along the eastern shore and the old wooden city by the Jhelum. Most Kashmir trips begin and end here, and it deserves more than a transit night.',
    body: [
      'Srinagar sits at about 1,585 m, low enough that nobody needs to acclimatise. Flights from Delhi take roughly an hour and a half, and since 2025 the Vande Bharat train from Katra has made the rail journey into the valley possible too. Either way you can be on the water the same afternoon.',
      'The lakes are the obvious draw. Dal Lake is the famous one, busy and beautiful; Nigeen, connected to it at the north end, is quieter and where we usually suggest the houseboat night. An early shikara ride takes you through the floating vegetable market and past the lotus gardens before the lake gets busy.',
      'Give the city a full day. Nishat, Shalimar and Chashme Shahi, the three Mughal gardens on the Zabarwan foothills; Pari Mahal above them; the Hazratbal shrine on the lake’s western shore; and the old city, where the wooden Jamia Masjid, Khanqah-e-Moula and the lanes around Zaina Kadal show the Srinagar that existed long before the houseboats.',
    ],
    bestTime: 'All year; each season looks completely different',
    bestMonths: 'Mar–Nov (tulips late Mar–Apr, chinars Oct–Nov)',
    idealDuration: '2 to 3 nights',
    airport: 'Srinagar (SXR), Sheikh ul-Alam International Airport, about 30–40 minutes from Dal Lake',
    altitude: 'About 1,585 m',
    regions: [
      { name: 'Dal & Nigeen lakes', note: 'Houseboats, shikara rides and the floating market at dawn' },
      { name: 'Mughal gardens', note: 'Nishat, Shalimar and Chashme Shahi on the Zabarwan foothills' },
      { name: 'Pari Mahal', note: 'Terraced ruins with the best view over Dal Lake' },
      { name: 'Hazratbal', note: 'The white marble shrine on the lake’s western shore' },
      { name: 'Old city', note: 'Jamia Masjid, Khanqah-e-Moula and the lanes by the Jhelum' },
      { name: 'Tulip Garden', note: 'Asia’s largest tulip garden, open for a few weeks each spring' },
    ],
    highlights: [
      'A night on a houseboat on Dal or Nigeen Lake',
      'A shikara ride through the floating vegetable market at sunrise',
      'The three Mughal gardens along the eastern shore',
      'A walk through the old city’s wooden mosques and shrines',
      'Tulips in spring and golden chinars in late autumn',
      'Kashmiri wazwan, kahwa and the bakeries’ morning bread',
    ],
    knowBefore: [
      { label: 'Houseboats', value: 'Graded by J&K Tourism. The category matters more than the photos: ask us what the grade includes before you choose.' },
      { label: 'Connectivity', value: 'Prepaid SIMs from outside Jammu & Kashmir do not work here. Postpaid connections do.' },
      { label: 'Getting in', value: 'Direct flights from Delhi, Mumbai and other cities, or the train from Katra.' },
      { label: 'Dress', value: 'Modest clothing is appreciated at shrines and mosques; carry a scarf.' },
    ],
    faqs: [
      {
        q: 'How many nights should I spend in Srinagar?',
        a: 'Two at the start of a trip is the minimum we suggest: one on a houseboat and one for the gardens and the old city. Many itineraries add a final night before the flight home, which also protects you from a road delay on the way back.',
      },
      {
        q: 'Is a houseboat stay worth it?',
        a: 'Yes, for one night. It is the most Kashmiri thing you can do. For a longer stay many people prefer a hotel for the space, and we usually plan one of each.',
      },
      {
        q: 'When do the tulips bloom?',
        a: 'Usually from late March to mid April, for three to four weeks. Exact dates shift with the weather, so book spring trips with a little flexibility.',
      },
    ],
    tone: 'lake',
    image: '',
    heroImage: '',
  },
  {
    slug: 'gulmarg',
    region: 'kashmir',
    name: 'Gulmarg',
    seoTitle: 'Gulmarg Tour Packages',
    headline: 'Meadows in summer, powder snow in winter',
    intro:
      'A high meadow ringed by forest, an hour and a half from Srinagar, with one of the highest cable cars in the world running up Apharwat. Summer means flowers and walks; winter means some of the best snow in Asia.',
    body: [
      'Gulmarg sits at about 2,650 m on a bowl-shaped meadow in the Pir Panjal range, around 50 km from Srinagar through Tangmarg. It works as a day trip, but an overnight lets you see the meadow early and late, when the day-trippers have gone.',
      'The Gulmarg Gondola runs in two phases: the first to Kongdoori at about 3,080 m, the second to Apharwat at around 3,950 m. Phase two is weather-dependent and often sells out in season, so tickets should be booked online well ahead. We tell you which days to aim for.',
      'From December to March Gulmarg becomes a ski resort, with slopes for beginners near the village and serious off-piste terrain from the top of the gondola. In summer the meadow is green, the forest walks open up, and the drive past Tangmarg is worth stopping on.',
    ],
    bestTime: 'December to March for snow; May to September for meadows',
    bestMonths: 'Dec–Mar (snow) · May–Sep (green)',
    idealDuration: 'Day trip or 1 to 2 nights',
    airport: 'Srinagar (SXR), about 1.5–2 hours by road',
    altitude: 'About 2,650 m (village) to about 3,950 m (Apharwat)',
    regions: [
      { name: 'Gulmarg Gondola', note: 'Phase 1 to Kongdoori, phase 2 to Apharwat when the weather allows' },
      { name: 'The meadow', note: 'Walks, pony rides and the old golf course' },
      { name: 'Khilanmarg', note: 'A higher meadow reached on foot or by pony' },
      { name: 'Tangmarg', note: 'The forested approach road and its viewpoints' },
      { name: 'Ski slopes', note: 'Beginner slopes by the village; expert terrain from Apharwat' },
    ],
    highlights: [
      'The gondola ride towards Apharwat',
      'Snow play or ski lessons from December to March',
      'Summer walks across the meadow and up to Khilanmarg',
      'An overnight stay, to see the meadow without the crowds',
    ],
    knowBefore: [
      { label: 'Gondola tickets', value: 'Book online in advance. Phase 2 closes in high wind or poor visibility, sometimes at short notice.' },
      { label: 'Cold', value: 'Even in summer the evenings are cold. In winter temperatures stay well below freezing.' },
      { label: 'Local transport', value: 'Local taxi and pony unions operate inside Gulmarg. Agree rates before you ride.' },
      { label: 'Snow gear', value: 'Boots and jackets can be hired at Tangmarg. Check the fit before you set off.' },
    ],
    faqs: [
      {
        q: 'Day trip or overnight in Gulmarg?',
        a: 'A day trip works if you mainly want the gondola. Stay overnight if you want the meadow at its best, in winter to ski, or if you are travelling with children or older parents and want an unhurried day.',
      },
      {
        q: 'Will there be snow when I visit?',
        a: 'Reliably from late December to early March. November and April can bring snow but it is not guaranteed. Phase 2 of the gondola usually has snow at the top for longer than the village does.',
      },
    ],
    tone: 'snow',
    image: '',
    heroImage: '',
  },
  {
    slug: 'pahalgam',
    region: 'kashmir',
    name: 'Pahalgam',
    seoTitle: 'Pahalgam Tour Packages',
    headline: 'The Lidder valley, pine forest and river',
    intro:
      'A mountain town on the Lidder river, with the side valleys of Aru and Betaab a short drive away. The road in passes the saffron fields of Pampore, making the journey part of the day.',
    body: [
      'Pahalgam is around 90 km from Srinagar, roughly two and a half to three hours by road, at about 2,200 m. The drive is worth taking slowly: the saffron fields at Pampore, the temple ruins at Awantipora, and the willow workshops where Kashmir’s cricket bats are made.',
      'From the town, three side trips fill a day: Aru valley up the Lidder, Betaab valley on the Chandanwari road, and Chandanwari itself, where the Amarnath Yatra route begins. Local union taxis cover these routes; private cars from outside the valley generally cannot.',
      'Pahalgam is also the base for treks to Tarsar–Marsar and Kolahoi, and a gentle place to spend two nights by the river. Some meadows, including Baisaran, have been closed to visitors at times, so we confirm current access before building your plan.',
    ],
    bestTime: 'April to October; winter brings snow and very quiet streets',
    bestMonths: 'Apr–Jun, Sep–Oct',
    idealDuration: '2 nights',
    airport: 'Srinagar (SXR), about 2.5–3 hours by road',
    altitude: 'About 2,200 m',
    regions: [
      { name: 'Aru valley', note: 'Meadows and a small village up the Lidder, about 12 km away' },
      { name: 'Betaab valley', note: 'A green valley on the Chandanwari road' },
      { name: 'Chandanwari', note: 'The start of the Amarnath Yatra route; snow into early summer' },
      { name: 'Lidder river', note: 'Riverside walks and, in season, rafting' },
      { name: 'Pampore', note: 'Saffron fields on the road from Srinagar, in flower in late October' },
    ],
    highlights: [
      'Aru, Betaab and Chandanwari on a full-day valley circuit',
      'Two unhurried nights by the Lidder',
      'Saffron fields and willow bat workshops on the drive in',
      'A base for Kolahoi and Tarsar–Marsar treks',
    ],
    knowBefore: [
      { label: 'Local taxis', value: 'Sightseeing inside Pahalgam uses the local union’s cabs. Your own car waits in town.' },
      { label: 'Yatra season', value: 'During the Amarnath Yatra (usually July to August) roads and security are busier. We plan around it.' },
      { label: 'Access', value: 'Some meadows and trails close at short notice. We check before you travel.' },
    ],
    faqs: [
      {
        q: 'How many days do I need in Pahalgam?',
        a: 'Two nights. One day for Aru, Betaab and Chandanwari, and the arrival and departure days for the drive, which has its own stops.',
      },
      {
        q: 'Can we visit Pahalgam during the Amarnath Yatra?',
        a: 'Yes, but expect more traffic and security checks, and book earlier. If your dates are flexible, June or September is calmer.',
      },
    ],
    tone: 'meadow',
    image: '',
    heroImage: '',
  },
  {
    slug: 'sonmarg',
    region: 'kashmir',
    name: 'Sonmarg',
    seoTitle: 'Sonmarg Tour Packages',
    headline: 'The meadow of gold, on the road to Ladakh',
    intro:
      'The Sindh valley’s last big meadow before the road climbs to Zojila and on into Ladakh. The Thajiwas glacier is a short ride away, and in early summer the snow comes down almost to the road.',
    body: [
      'Sonmarg is about 80 km from Srinagar, two and a half to three hours along the Sindh river, at roughly 2,700 m. Most people visit as a day trip; an overnight makes sense if you are continuing to Ladakh or want the valley in the quiet of the evening.',
      'The main excursion is to the Thajiwas glacier, on foot or by pony. Until about June there is usually snow at the glacier’s foot; later in summer the meadows are green and the walk is easier. The Z-Morh tunnel, opened in 2025, has made Sonmarg easier to reach in winter.',
      'Beyond Sonmarg the road climbs over Zojila into Ladakh. It is the classic way to drive from Kashmir to Leh, with nights in Kargil, and it is where our Kashmir and Ladakh trips meet.',
    ],
    bestTime: 'May to October; the Zojila road into Ladakh usually opens around May',
    bestMonths: 'May–Oct',
    idealDuration: 'Day trip or 1 night',
    airport: 'Srinagar (SXR), about 2.5–3 hours by road',
    altitude: 'About 2,700 m',
    regions: [
      { name: 'Thajiwas glacier', note: 'A short pony ride or walk from the meadow' },
      { name: 'Sindh valley', note: 'The river drive from Srinagar through Kangan and Gund' },
      { name: 'Zojila', note: 'The pass into Ladakh, when the road is open' },
    ],
    highlights: [
      'Snow at the Thajiwas glacier into early summer',
      'The Sindh river drive from Srinagar',
      'The start of the road trip from Kashmir to Ladakh',
    ],
    knowBefore: [
      { label: 'Ponies and sledges', value: 'Run by local unions at the meadow. Agree the route and the rate first.' },
      { label: 'Zojila', value: 'Opens and closes with the snow, and can close for a day or two in bad weather even in season.' },
      { label: 'Yatra season', value: 'The Baltal route of the Amarnath Yatra starts near Sonmarg; July and August are busy.' },
    ],
    faqs: [
      {
        q: 'Is Sonmarg worth a night?',
        a: 'Only if you are driving on to Ladakh, or want a quiet evening in the mountains. Otherwise a day trip from Srinagar covers it well.',
      },
    ],
    tone: 'snow',
    image: '',
    heroImage: '',
  },
  {
    slug: 'offbeat-kashmir',
    region: 'kashmir',
    name: 'Offbeat Kashmir',
    seoTitle: 'Offbeat Kashmir Tour Packages',
    headline: 'Gurez, Doodhpathri, Yusmarg and the valleys most visitors miss',
    intro:
      'Beyond the four famous names are valleys where you may be the only visitors: Gurez on the Kishanganga, the meadows of Doodhpathri and Yusmarg a short drive from Srinagar, and the forests of Lolab in the north.',
    body: [
      'Doodhpathri and Yusmarg are the easy ones: both in Budgam district, both around an hour and a half from Srinagar, both wide meadows with streams and pine forest and a fraction of Gulmarg’s crowds. Either makes a good day trip, and they pair well with a Srinagar stay.',
      'Gurez is the real journey. It is around 125 km north of Srinagar, over the Razdan pass, into a valley on the Kishanganga river with log-built villages and the pyramid of Habba Khatoon peak. The road is usually open from about May to November, and you need at least two nights to make the drive worth it.',
      'Lolab, in Kupwara district, is a long forested valley of villages, orchards and springs, well off the usual route. We plan offbeat trips around road conditions, current access rules and simple but clean stays, and we tell you plainly where comfort is limited.',
    ],
    bestTime: 'May to October; Gurez only while the Razdan pass is open',
    bestMonths: 'May–Oct',
    idealDuration: '2 to 4 nights beyond Srinagar',
    airport: 'Srinagar (SXR)',
    altitude: 'About 2,400 m (Gurez valley) to about 2,700 m (Doodhpathri)',
    regions: [
      { name: 'Gurez', note: 'Kishanganga river, log villages and Habba Khatoon peak, over the Razdan pass' },
      { name: 'Doodhpathri', note: 'Wide meadows and the Shaliganga stream, about 1.5 hours from Srinagar' },
      { name: 'Yusmarg', note: 'Pine-ringed meadow and the walk to Nilnag lake' },
      { name: 'Lolab', note: 'A long forested valley in the north, far from the usual circuit' },
    ],
    highlights: [
      'Two nights in Gurez, on the Kishanganga',
      'A quiet day in the meadows at Doodhpathri or Yusmarg',
      'Village stays and walks away from the main tourist routes',
    ],
    knowBefore: [
      { label: 'ID and access', value: 'Carry original photo ID for checkpoints. Access rules near the Line of Control change; foreign nationals face restrictions in some areas. We check before booking.' },
      { label: 'Stays', value: 'Offbeat valleys have simple guesthouses and homestays, not hotels. Clean and warm, not luxurious.' },
      { label: 'Connectivity', value: 'Mobile coverage is limited or absent in parts of Gurez and Lolab.' },
      { label: 'Roads', value: 'The Razdan pass road closes with the snow. Build a spare day into a Gurez trip.' },
    ],
    faqs: [
      {
        q: 'Can we do Gurez as a day trip?',
        a: 'No. The drive is long and the pass slows it further. Plan at least two nights in the valley.',
      },
      {
        q: 'Which offbeat place is easiest with family?',
        a: 'Doodhpathri or Yusmarg. Both are short drives from Srinagar on good roads, and both work as day trips.',
      },
    ],
    tone: 'meadow',
    image: '',
    heroImage: '',
  },
  // ─────────────────────────────── LADAKH ────────────────────────────────
  {
    slug: 'leh',
    region: 'ladakh',
    name: 'Leh & Sham Valley',
    seoTitle: 'Leh Tour Packages',
    headline: 'Your first 48 hours, spent gently',
    intro:
      'Old Town lanes, Shanti Stupa at dusk, and the low-altitude Sham loop that lets your body catch up before the passes begin. Every Ladakh trip starts here, and how you spend these two days decides how the rest of it goes.',
    body: [
      'Leh sits at 3,500 m. You arrive by air in about ninety minutes from Delhi, which is far faster than your body can adjust, and roughly one traveller in four feels mild breathlessness or a headache on the first day. That is why the first afternoon on every itinerary we run is deliberately empty: hydration, a slow walk to the Main Bazaar, an early dinner.',
      'Day two stays low. The Sham Valley loop runs west along the Indus to Magnetic Hill, the Sangam where the Indus meets the Zanskar, and Alchi, whose 11th-century murals are among the oldest surviving Buddhist paintings in the Himalaya. You see a great deal and gain almost no height, which is exactly the point.',
      'Leh itself rewards the time. The 17th-century palace above the Old Town, the lanes below it, Shanti Stupa at sunset over the Stok range, and the cafés and craft shops along Changspa Road. Short trips can be built entirely around Leh and the Indus valley, with no high passes at all.',
    ],
    bestTime: 'April to October; Leh is reachable by air all year',
    bestMonths: 'Apr–Oct (Sep–Oct our pick)',
    idealDuration: '3 to 5 nights',
    startingFrom: 14500,
    airport: AIRPORT,
    altitude: '3,100 m (Sham Valley) to 3,500 m (Leh)',
    regions: [
      { name: 'Leh Old Town', note: 'The palace, the lanes below it and the Main Bazaar' },
      { name: 'Shanti Stupa', note: 'Sunset over the Stok range, a short drive above town' },
      { name: 'Magnetic Hill', note: 'The stretch of road where a car appears to roll uphill' },
      { name: 'Sangam', note: 'Where the green Indus meets the brown Zanskar' },
      { name: 'Shey & Thiksey', note: 'The copper Buddha at Shey and the hilltop gompa at Thiksey' },
      { name: 'Changspa Road', note: 'Cafés, bakeries and craft shops for a free afternoon' },
    ],
    highlights: [
      'A deliberately empty first afternoon, planned as carefully as any sightseeing day',
      'Sunset at Shanti Stupa over the Stok range',
      'Leh Palace and the Old Town lanes on foot',
      'The Indus–Zanskar confluence at the Sangam',
      'Alchi’s 11th-century murals on the Sham Valley loop',
      'Morning prayers at Thiksey',
    ],
    knowBefore: [
      { label: 'Altitude', value: 'Leh is at 3,500 m. Rest on day one, drink plenty of water, and keep the first 48 hours low-effort.' },
      { label: 'Permits', value: 'None for Leh town and the Sham Valley. For Nubra, Pangong and Hanle, Indian guests pay the Ladakh environmental fee and foreign nationals need a Protected Area Permit. We arrange both.' },
      { label: 'Connectivity', value: 'Postpaid mobile connections work in Leh. Prepaid SIMs from other states generally do not.' },
      { label: 'Clothing', value: 'Layers in every month. Days are bright and warm, and nights drop sharply even in summer.' },
    ],
    faqs: [
      {
        q: 'How many days should I spend in Leh before going higher?',
        a: 'Two nights at the least. The first afternoon should be rest, and the second day should stay low: the Sham Valley loop or the monasteries along the Indus. On every route we run, the high passes start on day three or later.',
      },
      {
        q: 'Can I do Ladakh in just three or four days?',
        a: 'Yes, if you stay around Leh. Our 3-night trip covers Leh, the Indus monasteries and the Sham Valley with no high passes, because four days is not enough time to earn them safely. Add a night and you can reach Nubra over Khardung La.',
      },
      {
        q: 'Is Leh open in winter?',
        a: 'Leh is reachable by air all year, and the town and the Indus valley monasteries stay open. From November to March most high roads close, so Nubra, Pangong and Hanle are best planned between May and October.',
      },
    ],
    tone: 'valley',
    image: '/img/ladakh-hero-sm.webp',
    heroImage: '/img/ladakh-hero.webp',
  },

  {
    slug: 'ladakh-monasteries',
    region: 'ladakh',
    name: 'Monastery Country',
    seoTitle: 'Ladakh Monastery Tours',
    headline: 'The cultural spine of Ladakh, walked slowly',
    intro:
      'Thiksey at sunrise prayers, the 11th-century woodwork at Alchi, and Lamayuru’s moonland ridges. The monasteries of the Indus valley are the reason Ladakh looks the way it does, and they deserve more than a photo stop.',
    body: [
      'Most Ladakh itineraries treat the monasteries as a morning filler between passes. We build a whole trip around them instead: five nights, a monastery guide, and a route along the Indus that stays at comfortable altitudes the whole way.',
      'West of Leh the road passes Likir and its giant seated Maitreya, Alchi, where the temple walls carry some of the oldest Buddhist paintings in the Himalaya, and the ruined royal citadel at Basgo. Further on is Lamayuru, one of the oldest monasteries in Ladakh, set above eroded ridges that people call the Moonland.',
      'East of Leh are the great working monasteries: Thiksey on its hill, where morning prayers start at dawn, Shey with its copper Buddha, and Hemis, the wealthiest monastery in Ladakh and home of the summer Hemis festival. It is the gentlest way to see Ladakh, and one of the richest.',
    ],
    bestTime: 'April to October',
    bestMonths: 'Apr–Oct',
    idealDuration: '5 to 6 nights',
    startingFrom: 14500,
    airport: AIRPORT,
    altitude: '3,100 m (Alchi) to 3,510 m (Lamayuru)',
    regions: [
      { name: 'Thiksey', note: 'Hilltop gompa with morning prayers at dawn' },
      { name: 'Hemis', note: 'The wealthiest monastery in Ladakh, home of the Hemis festival' },
      { name: 'Alchi', note: '11th-century murals and carved woodwork' },
      { name: 'Likir', note: 'A giant seated Maitreya above the valley' },
      { name: 'Basgo', note: 'The ruined citadel of an old Ladakhi capital' },
      { name: 'Lamayuru', note: 'A cliff-edge gompa above the Moonland ridges' },
    ],
    highlights: [
      'Dawn prayers at Thiksey',
      'Alchi’s 11th-century murals with a monastery guide',
      'The Moonland ridges at Lamayuru',
      'The citadel ruins at Basgo',
      'Hemis, and Shey’s copper Buddha',
      'An unhurried route with no high passes',
    ],
    knowBefore: [
      { label: 'Dress', value: 'Covered shoulders and knees inside the monasteries. Remove shoes where asked.' },
      { label: 'Photography', value: 'Allowed in most courtyards, often not inside the prayer halls. Ask first.' },
      { label: 'Entry tickets', value: 'Each monastery charges a small entry fee, paid on the day.' },
      { label: 'Festivals', value: 'The Hemis festival falls in June or July by the Tibetan calendar. Ask us for the year’s dates.' },
    ],
    faqs: [
      {
        q: 'Is a monastery tour suitable for older parents?',
        a: 'It is the gentlest way to see Ladakh. The route follows the Indus valley between about 3,100 m and 3,500 m, with no high passes, and the pace is set around rest. Some monasteries involve stairs, and your guide will tell you in advance which ones.',
      },
      {
        q: 'Which is the oldest monastery we will visit?',
        a: 'Lamayuru is one of the oldest monasteries in Ladakh, and the murals at Alchi date to the 11th century. Your monastery guide explains the history at each stop.',
      },
      {
        q: 'Can we time the trip for the Hemis festival?',
        a: 'Yes. The festival follows the Tibetan lunar calendar and usually falls in June or July. Tell us you want it when you enquire and we will build the dates around it, and book early, because Leh fills up that week.',
      },
    ],
    tone: 'monastery',
    image: '/img/ladakh-monastery-sm.webp',
    heroImage: '/img/ladakh-monastery.webp',
  },

  {
    slug: 'nubra-pangong',
    region: 'ladakh',
    name: 'Nubra & Pangong',
    seoTitle: 'Nubra Valley & Pangong Tour Packages',
    headline: 'Over Khardung La, and on until the land stops',
    intro:
      'Over Khardung La into the dunes at Hunder, north to Turtuk’s apricot orchards, then east until the land stops and Pangong’s impossible blue begins. This is the Ladakh most people picture, and the part where the order of the days matters most.',
    body: [
      'Khardung La, at 5,359 m, is the road into Nubra. On the far side the valley opens out at about 3,100 m: sand dunes at Hunder with double-humped Bactrian camels, the great Maitreya above Diskit, and villages set among poplars and sea buckthorn. North again is Turtuk, a Balti village closed to visitors until 2010, which is worth a night of its own.',
      'Pangong Tso sits at 4,350 m on the border with Tibet. Most of it lies on the far side of the line; the part in India is still long enough to change colour hour by hour. The single most common altitude mistake in Ladakh is driving there on day two. We never do: on every route we run, Pangong comes after two nights around Leh and a night in Nubra.',
      'The better route to the lake comes east from Nubra along the Shyok river, which avoids a second high-pass crossing in one trip, and you return to Leh over Chang La at 5,360 m. The camps at Nubra and Pangong are seasonal, roughly May to September, and the ones we use have attached bathrooms, heating and hot water.',
    ],
    bestTime: 'May to September, when the camps are open',
    bestMonths: 'May–Sep',
    idealDuration: '5 to 8 nights',
    startingFrom: 18900,
    airport: AIRPORT,
    altitude: '2,900 m (Turtuk) to 5,360 m (Chang La)',
    regions: [
      { name: 'Khardung La', note: 'The pass into Nubra at 5,359 m, crossed with a short stop' },
      { name: 'Hunder', note: 'Sand dunes and Bactrian camels on the valley floor' },
      { name: 'Diskit', note: 'The monastery and its great Maitreya above the valley' },
      { name: 'Turtuk', note: 'A Balti village of apricot orchards, open to visitors since 2010' },
      { name: 'Shyok river road', note: 'The quieter way from Nubra to Pangong' },
      { name: 'Pangong Tso', note: 'The lake at 4,350 m, with camps on the shoreline' },
    ],
    highlights: [
      'Crossing Khardung La at 5,359 m',
      'Bactrian camels at golden hour in the Hunder dunes',
      'A night in Turtuk, among the apricot orchards',
      'The Shyok river road east to Pangong',
      'Sunrise on Pangong Tso from a shoreline camp',
      'Back over Chang La, with a stop at Thiksey on the way down',
    ],
    knowBefore: [
      { label: 'Permits', value: 'Indian guests pay the Ladakh environmental fee for Nubra, Turtuk and Pangong. Foreign nationals need a Protected Area Permit for the same areas. We pay and print these before you arrive.' },
      { label: 'Altitude', value: 'Pangong is at 4,350 m. On all our routes it comes after two nights around Leh and a night in Nubra, which do the acclimatisation work.' },
      { label: 'Camps', value: 'Seasonal, roughly May to September. Ours have attached bathrooms, heating and hot water.' },
      { label: 'Oxygen', value: 'Every vehicle carries a cylinder, an oximeter and a first-aid kit, and drivers are trained to recognise AMS.' },
    ],
    faqs: [
      {
        q: 'Why do you not go to Pangong on the second day?',
        a: 'Because driving from Leh to a 4,350 m lake over a 5,360 m pass on day two is the most common altitude mistake in Ladakh. A meaningful number of people who do it spend the night at the lake with a headache and no sleep. We put Pangong after two nights around Leh and a night in Nubra.',
      },
      {
        q: 'Is Turtuk worth adding?',
        a: 'Yes, as an overnight rather than a day trip. It is seven hours from Leh via Khardung La and Nubra, and the Balti culture, food and apricot orchards are unlike anywhere else in Ladakh. The 7-night and 8-night routes include it.',
      },
      {
        q: 'What are the camps at Nubra and Pangong like?',
        a: 'We use deluxe or Swiss camps with attached bathrooms, heating and hot water, which is the only sensible option at that altitude. Honeymoon trips use a luxury tented camp in Nubra.',
      },
    ],
    tone: 'highroad',
    image: '/img/ladakh-hanle-sm.webp',
    heroImage: '/img/ladakh-hanle.webp',
  },

  {
    slug: 'hanle',
    region: 'ladakh',
    name: 'Hanle Dark Sky',
    seoTitle: 'Hanle & Tso Moriri Tour Packages',
    headline: 'Where the Milky Way casts a shadow',
    intro:
      'India’s first Dark Sky Reserve, at 4,500 m with almost no light pollution. Add Tso Moriri, the Changthang grasslands and Umling La, the highest motorable road on earth, and this is the Ladakh most travellers never reach.',
    body: [
      'Hanle is a small village on the Changthang plateau, south-east of Leh, and home to the Indian Astronomical Observatory. The area around it was declared India’s first Dark Sky Reserve in 2022. On a clear, moonless night the Milky Way is bright enough to throw shadows, and we plan the stay with an astro guide so you know what you are looking at.',
      'Getting there is half of it. The road follows the Indus south-east past the Chumathang hot springs, then climbs onto the plateau to Tso Moriri at 4,522 m, a quieter and higher lake than Pangong, with the village of Korzok on its shore. The grasslands between Tso Moriri, Tso Kar and Hanle are nomad country, and it is common to see kiang and black-necked cranes from the road.',
      'Umling La, at 5,798 m, is reached from Hanle and is the highest motorable road on earth. Everything here is high, so this part of Ladakh comes after acclimatisation, never before it. Two nights at Hanle give you two chances at a clear sky.',
    ],
    bestTime: 'May to October; September and October for the clearest skies',
    bestMonths: 'May–Oct (Sep–Oct our pick)',
    idealDuration: '6 to 8 nights',
    startingFrom: 26500,
    airport: AIRPORT,
    altitude: '4,500 m (Hanle) to 5,798 m (Umling La)',
    regions: [
      { name: 'Hanle', note: 'The observatory and the Dark Sky Reserve' },
      { name: 'Umling La', note: 'The highest motorable road on earth, at 5,798 m' },
      { name: 'Tso Moriri', note: 'A high, quiet lake at 4,522 m, with Korzok on its shore' },
      { name: 'Tso Kar', note: 'A salt lake on the Changthang grasslands' },
      { name: 'Chumathang', note: 'Hot springs on the Indus, on the way south-east' },
      { name: 'Nyoma', note: 'The road back to Leh along the Indus' },
    ],
    highlights: [
      'The Milky Way over the Hanle Dark Sky Reserve, with an astro guide',
      'The Indian Astronomical Observatory by day',
      'Umling La at 5,798 m in the morning light',
      'A night on the shore of Tso Moriri',
      'Kiang and black-necked cranes on the Changthang plateau',
      'The Chumathang hot springs on the Indus',
    ],
    knowBefore: [
      { label: 'Permits', value: 'Indian guests pay the Ladakh environmental fee for Hanle, Tso Moriri and Umling La. Foreign nationals need a Protected Area Permit. We pay and print these before you arrive.' },
      { label: 'Altitude', value: 'Hanle is at 4,500 m and Umling La at 5,798 m. This region always comes after at least two nights around Leh.' },
      { label: 'Light', value: 'The reserve depends on darkness. Use red torches at night and keep phone screens dim.' },
      { label: 'Moon', value: 'Skies are darkest around the new moon. Tell us your flexibility and we will suggest dates.' },
    ],
    faqs: [
      {
        q: 'When is the best time to see the stars at Hanle?',
        a: 'September and October usually bring the clearest skies of the year, and the nights around the new moon are the darkest. July and August can be cloudier. Two nights at Hanle give you two chances at a clear sky.',
      },
      {
        q: 'Do I need a telescope or special camera?',
        a: 'No. The Milky Way is plainly visible to the naked eye. Our astro guide brings equipment for the night session, and a phone on a small tripod with night mode will capture more than you expect.',
      },
      {
        q: 'Is Hanle too high for a first trip to Ladakh?',
        a: 'Not if it is sequenced properly. Our Stargazer’s route spends two nights around Leh and a night at Tso Moriri before Hanle, so your body has adjusted by the time you arrive. If you have a cardiac or pulmonary condition, speak to your doctor first and then to us.',
      },
    ],
    tone: 'nightsky',
    image: '/img/hanle-night-sky-sm.webp',
    heroImage: '/img/hanle-night-sky.webp',
  },
];

export function getDestination(slug: string): Destination | undefined {
  return DESTINATIONS.find((d) => d.slug === slug);
}

const PHOTO: Partial<Record<Tone, string>> = {
  valley: 'ladakh-hero',
  monastery: 'ladakh-monastery',
  highroad: 'ladakh-hanle',
  nightsky: 'hanle-night-sky',
};

/** Gradient-only backdrops for tones without a photograph yet. */
const GRADIENT: Record<Tone, string> = {
  valley: '#16294f',
  monastery: '#16294f',
  highroad: '#16294f',
  nightsky: '#0a1428',
  lake: 'radial-gradient(140% 120% at 20% 10%, #2f7ea8 0%, #16445f 45%, #07151f 100%)',
  meadow: 'radial-gradient(140% 120% at 25% 10%, #5f8f4a 0%, #2c4a2a 45%, #0d1a0c 100%)',
  snow: 'radial-gradient(140% 120% at 30% 5%, #c9d6e3 0%, #5b7390 40%, #142033 100%)',
};

const ALL_TONES = Object.keys(GRADIENT) as Tone[];

const backdrop = (t: Tone, scrim: string, size: '' | '-sm') => {
  const photo = PHOTO[t];
  return photo
    ? `${scrim}, url("/img/${photo}${size}.webp") center / cover`
    : `${scrim}, ${GRADIENT[t]}`;
};

/** Card backgrounds: the small photograph (or gradient) under a navy scrim. */
export const TONE_BG = Object.fromEntries(
  ALL_TONES.map((t) => [t, backdrop(t, 'linear-gradient(180deg, rgba(7,15,31,0.10) 0%, rgba(7,15,31,0.85) 100%)', '-sm')]),
) as Record<Tone, string>;

/** High-contrast hero backdrop: the full photograph (or gradient) under a heavier scrim. */
export const TONE_HERO = Object.fromEntries(
  ALL_TONES.map((t) => [t, backdrop(t, 'linear-gradient(180deg, rgba(7,15,31,0.55) 0%, rgba(7,15,31,0.90) 100%)', '')]),
) as Record<Tone, string>;
