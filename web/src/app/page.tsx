import Link from 'next/link';
import {
  ArrowRight,
  ArrowUpRight,
  Star,
  ShieldCheck,
  MapPin,
  Users,
  Headphones,
  Receipt,
  Car,
  BedDouble,
} from 'lucide-react';
import { SITE, HAS_RATING, whatsAppLink } from '@/lib/site';
import { DESTINATIONS, TONE_BG } from '@/lib/destinations';
import { FEATURED, PACKAGES } from '@/lib/packages';
import { TRAVEL_STYLES } from '@/lib/travel-styles';
import { REVIEWS } from '@/lib/reviews';
import {
  DestinationCard,
  PackageCard,
  ReviewCard,
  SectionHead,
  JsonLd,
} from '@/components/cards';
import { EnquiryForm } from '@/components/enquiry-form';

export const metadata = {
  alternates: { canonical: '/' },
};

const TRUST = [
  'Local since 2010',
  'Srinagar-based, not a reseller',
  'Itemised quotes before you pay',
  'Houseboats we know',
  'One coordinator on WhatsApp',
  'Amarnath & Vaishno Devi yatras',
  'Group departures open now',
];

/** The five ways to travel, as on falcontrails.in. */
const FIVE_WAYS = [
  { slug: 'discover-india', label: 'Across the country', items: 'Kashmir & offbeat Kashmir · Ladakh · Kerala · North East' },
  { slug: 'sacred-journeys', label: 'Pilgrimages, done right', items: 'Amarnath Yatra + guide · Vaishno Devi + guide' },
  { slug: 'group-departures', label: 'Open now', items: 'Fixed-date Kashmir groups · Amarnath group departures' },
  { slug: 'visitors-to-india', label: 'International', items: 'The Golden Triangle: Delhi · Agra · Jaipur' },
  { slug: 'the-world', label: 'For Indian travellers', items: 'International packages, curated with the same care' },
];

const WHY = [
  {
    icon: MapPin,
    title: 'Local since 2010',
    body: 'Our founder started as a guide in Srinagar and has hosted travellers from more than twelve countries. We plan Kashmir from the ground, not from a call centre.',
  },
  {
    icon: Receipt,
    title: 'Itemised quotes, honest pricing',
    body: 'Every quote shows what each night and each vehicle costs, and exclusions are written plainly. You pay only once the plan and the price are right.',
  },
  {
    icon: BedDouble,
    title: 'Houseboats and hotels we know',
    body: 'Houseboat quality varies enormously. We book the ones we know and tell you the category before you pay.',
  },
  {
    icon: Car,
    title: 'Private cab, local rules explained',
    body: 'A private cab for your whole trip, and a straight briefing on the union taxis and fixed rates at Pahalgam, Sonamarg and Gulmarg.',
  },
  {
    icon: Headphones,
    title: 'One coordinator, start to finish',
    body: 'One WhatsApp thread from your first message to your flight home. If a road closes or the weather turns, we change the plan with you.',
  },
  {
    icon: ShieldCheck,
    title: 'Yatras handled on the ground',
    body: 'Amarnath and Vaishno Devi with a guide who has walked the route, stays arranged around the official timings, and help with the paperwork.',
  },
];

const SEASONS = [
  { m: 'Mar – Apr', t: 'Blossom and tulips', d: 'Almond and cherry blossom, and the Tulip Garden for a few weeks. Cool days, cold nights.' },
  { m: 'May – Jun', t: 'Green and busy', d: 'Meadows at their greenest and every valley open. Book early; this is peak season.' },
  { m: 'Jul – Aug', t: 'Yatra season', d: 'Warm days and the Amarnath Yatra. Pahalgam and Sonamarg are busy; Gurez and the north are at their best.' },
  { m: 'Sep – Oct', t: 'Our honest pick', d: 'Clear skies, thinner crowds, and the chinars turning red and gold in October.' },
  { m: 'Nov', t: 'Late autumn', d: 'Quiet and crisp. The Gurez and Zojila roads start to close with the first heavy snow.' },
  { m: 'Dec – Feb', t: 'Snow', d: 'Gulmarg and Pahalgam under snow, skiing in Gulmarg, and Dal Lake in winter light. Dress warm.' },
];

export default function HomePage() {
  const breadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE.domain },
    ],
  };

  return (
    <>
      <JsonLd data={breadcrumb} />

      {/* ══════════════════════════════════ HERO */}
      <section className="relative isolate flex min-h-[92svh] items-end overflow-hidden">
        <div
          aria-hidden
          className="absolute inset-0 -z-20 bg-cover bg-center"
          style={{
            background:
              'linear-gradient(180deg, rgba(11,20,29,0.45) 0%, rgba(11,20,29,0.65) 45%, rgba(11,20,29,0.95) 100%), url("/img/dal.webp") center / cover',
          }}
        />
        {/* drifting light blobs — pure decoration, aria-hidden */}
        <div
          aria-hidden
          className="blob -z-10 left-[6%] top-[12%] h-[380px] w-[380px]"
          style={{ background: 'rgba(212,175,90,0.20)' }}
        />
        <div
          aria-hidden
          className="blob -z-10 right-[4%] top-[38%] h-[300px] w-[300px]"
          style={{ background: 'rgba(23,155,142,0.30)', animationDelay: '-6s' }}
        />
        <div aria-hidden className="grain absolute inset-0 -z-10" />

        <div className="wrap relative w-full pb-16 pt-32 md:pb-24 md:pt-40">
          <p className="anim-fade kicker kicker-light">
            {SITE.tagline} · Srinagar, Kashmir
          </p>

          <h1 className="display d1 mt-5 max-w-[19ch] text-paper-50">
            <span className="mask">
              <span style={{ animationDelay: '80ms' }}>Kashmir,</span>
            </span>
            <span className="mask">
              <span style={{ animationDelay: '200ms' }}>
                planned by <em className="text-gold-grad not-italic">locals.</em>
              </span>
            </span>
          </h1>

          <p className="anim-rise d-4 lede mt-7 max-w-xl !text-paper-200/85">
            From the lakes of Kashmir to the backwaters of Kerala, the high
            passes of Ladakh to the Golden Triangle &mdash; and the world beyond
            India. Run on the ground by a local who&rsquo;s been guiding since{' '}
            {SITE.founder.since}.
          </p>

          <div className="anim-rise d-5 mt-9 flex flex-wrap gap-3">
            <Link href="/destinations" className="btn btn-gold btn-shine group">
              Explore Kashmir
              <ArrowRight className="arrow-slide size-4" strokeWidth={2.2} />
            </Link>
            <a
              href={whatsAppLink('a trip with Falcon Trails')}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-ghost-light"
            >
              Enquire on WhatsApp
            </a>
          </div>

          {/* floating stat strip */}
          <div className="anim-rise d-5 mt-14 grid max-w-3xl grid-cols-2 gap-px overflow-hidden rounded-2xl border border-paper-100/12 bg-paper-100/8 backdrop-blur-md sm:grid-cols-4">
            {[
              [`Since ${SITE.founder.since}`, 'guiding in Kashmir'],
              [SITE.founder.countries, 'countries hosted'],
              ['5', 'ways to travel with us'],
              ['1', 'coordinator per trip'],
            ].map(([k, v]) => (
              <div key={v} className="bg-ink-950/25 px-5 py-4">
                <p className="display text-[24px] leading-none text-gold-300">{k}</p>
                <p className="mt-1.5 text-[11.5px] text-paper-200/65">{v}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════ TRUST MARQUEE */}
      <section className="border-y border-paper-200 bg-paper-100 py-4">
        <div className="marquee">
          <div className="marquee__track" aria-hidden>
            {[...TRUST, ...TRUST].map((t, i) => (
              <span
                key={i}
                className="flex shrink-0 items-center gap-3.5 text-[12.5px] font-medium uppercase tracking-[0.14em] text-ink-500"
              >
                <span className="size-1.5 rounded-full bg-gold-400" />
                {t}
              </span>
            ))}
          </div>
        </div>
        <p className="sr-only">
          Srinagar-based tour operator, local since 2010. Kashmir, pilgrimages, group departures,
          visitors to India and international trips. Itemised quotes before you pay.
        </p>
      </section>

      {/* ══════════════════════════════════ DESTINATIONS */}
      <section className="mesh-warm section relative">
        <div className="wrap">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHead
              kicker="Where we take you"
              title={
                <>
                  Kashmir, valley
                  <br className="hidden md:block" /> by valley.
                </>
              }
            />
            <Link
              href="/destinations"
              data-reveal="right"
              className="group hidden items-center gap-2 text-[13.5px] font-medium text-ink-700 transition-colors hover:text-gold-700 md:inline-flex"
            >
              All destinations
              <ArrowUpRight className="arrow-slide size-4" strokeWidth={2.2} />
            </Link>
          </div>

          <div
            data-reveal-group
            className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
          >
            {DESTINATIONS.map((d) => (
              <DestinationCard key={d.slug} d={d} />
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════ FEATURED PACKAGES */}
      <section className="section border-t border-paper-200 bg-paper-100">
        <div className="wrap">
          <SectionHead
            kicker="Kashmir itineraries"
            title="Starting points, not scripts."
            lede="Every itinerary below is a starting point. Tell us your dates and group and we reshape it around you, with an itemised quote."
          />

          <div data-reveal-group className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {FEATURED.map((p) => (
              <PackageCard key={p.slug} p={p} />
            ))}
          </div>

          <div data-reveal className="mt-10 text-center">
            <Link href="/packages" className="btn btn-ghost group">
              See all {PACKAGES.length} packages
              <ArrowRight className="arrow-slide size-4" strokeWidth={2.2} />
            </Link>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════ WHY US */}
      <section className="mesh-pine grain section relative isolate overflow-hidden">
        <div
          aria-hidden
          className="blob right-[-8%] top-[6%] h-[460px] w-[460px]"
          style={{ background: 'rgba(212,175,90,0.14)' }}
        />
        <div className="wrap relative">
          <SectionHead
            light
            kicker="Why Falcon Trails"
            title={
              <>
                Run by locals. Not by a <em className="text-gold-grad not-italic">call centre</em>.
              </>
            }
            lede="Six reasons to book a Srinagar-based team directly, rather than a portal that forwards your enquiry to one."
          />

          <div data-reveal-group className="mt-14 grid gap-x-10 gap-y-11 md:grid-cols-2 lg:grid-cols-3">
            {WHY.map((w, i) => (
              <div key={w.title} className="group relative">
                <div className="flex items-center gap-3.5">
                  <span className="grid size-11 shrink-0 place-items-center rounded-xl border border-gold-400/25 bg-gold-400/10 text-gold-300 transition-all duration-500 group-hover:-translate-y-1 group-hover:border-gold-400/60 group-hover:bg-gold-400/20">
                    <w.icon className="size-5" strokeWidth={1.7} />
                  </span>
                  <span className="display text-[13px] tabular-nums text-paper-200/30">
                    0{i + 1}
                  </span>
                </div>
                <h3 className="display mt-4 text-[21px] leading-snug text-paper-50">
                  {w.title}
                </h3>
                <p className="mt-2.5 text-[14px] leading-relaxed text-paper-200/70">
                  {w.body}
                </p>
                <div className="mt-5 h-px w-full origin-left scale-x-0 bg-gradient-to-r from-gold-400 to-transparent transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-x-100" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════ TRAVEL STYLES */}
      <section className="section">
        <div className="wrap">
          <SectionHead
            kicker="What we do"
            title="Five ways to travel with us."
            lede="Kashmir is home. From here we plan journeys across India, pilgrimages done right, fixed-date groups, trips for visitors to India, and holidays abroad."
          />

          <div data-reveal-group className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {FIVE_WAYS.map((w) => ({ ...w, s: TRAVEL_STYLES.find((t) => t.slug === w.slug)! })).map(({ s, label, items }) => (
              <Link
                key={s.slug}
                href={`/travel-styles/${s.slug}`}
                className="lift zoom-wrap group relative overflow-hidden rounded-2xl shadow-md"
              >
                <div
                  className="zoom aspect-[4/5] bg-cover bg-center"
                  style={{ background: s.tone ? TONE_BG[s.tone] : s.hero }}
                />
                <div className="absolute inset-x-0 bottom-0 p-5">
                  <p
                    className={`text-[10.5px] font-semibold uppercase tracking-[0.14em] ${
                      label === 'Open now' ? 'text-teal-300' : 'text-gold-300/80'
                    }`}
                  >
                    {label}
                  </p>
                  <h3 className="display mt-1.5 text-[22px] leading-none text-paper-50">
                    {s.name}
                  </h3>
                  <p className="mt-2 line-clamp-3 text-[12px] leading-relaxed text-paper-200/75">
                    {items}
                  </p>
                  <span className="mt-3 inline-flex items-center gap-1.5 text-[12px] font-medium text-gold-300 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                    Explore
                    <ArrowUpRight className="size-3.5" strokeWidth={2.2} />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════ SEASONS */}
      <section className="section border-y border-paper-200 bg-paper-100">
        <div className="wrap">
          <SectionHead
            kicker="Timing is everything"
            title="When to come, and what you get."
            lede="Kashmir is open all year, and every season is a different trip. Here is the honest breakdown."
          />

          <div data-reveal-group className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-paper-300 bg-paper-300 sm:grid-cols-2 lg:grid-cols-3">
            {SEASONS.map((s) => (
              <div
                key={s.m}
                className="group bg-paper-50 p-6 transition-colors duration-300 hover:bg-white"
              >
                <p className="kicker">{s.m}</p>
                <h3 className="display mt-2.5 text-[21px] text-ink-900">{s.t}</h3>
                <p className="mt-2 text-[13.5px] leading-relaxed text-ink-600">{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════ REVIEWS (hidden until real reviews exist) */}
      {REVIEWS.length > 0 && (
      <section className="section">
        <div className="wrap">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHead
              kicker="What guests say"
              title="The reviews are the itinerary."
            />
            {HAS_RATING && (
            <div data-reveal="right" className="flex items-center gap-3">
              <div className="flex gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="size-5 fill-gold-400 text-gold-400" strokeWidth={0} />
                ))}
              </div>
              <div>
                <p className="display text-[21px] leading-none text-ink-900">
                  {SITE.stats.rating} / 5
                </p>
                <p className="text-[12px] text-ink-500">
                  {SITE.stats.reviewCount.toLocaleString('en-IN')}+ reviews on Google
                </p>
              </div>
            </div>
            )}
          </div>

          <div data-reveal-group className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {REVIEWS.slice(0, 6).map((r) => (
              <ReviewCard key={r.author} r={r} />
            ))}
          </div>

          <div data-reveal className="mt-10 text-center">
            <Link href="/reviews" className="btn btn-ghost group">
              Read all reviews
              <ArrowRight className="arrow-slide size-4" strokeWidth={2.2} />
            </Link>
          </div>
        </div>
      </section>
      )}

      {/* ══════════════════════════════════ THE OPERATOR */}
      <section className="section border-t border-paper-200">
        <div className="wrap grid items-center gap-10 lg:grid-cols-12">
          <div className="lg:col-span-7" data-reveal>
            <p className="kicker">The operator</p>
            <h2 className="display d2 mt-3 text-ink-900">Local since {SITE.founder.since}.</h2>
            <p className="lede mt-5 max-w-xl">
              Founded by {SITE.founder.name} &mdash; a Srinagar guide who&rsquo;s hosted
              travellers from {SITE.founder.countries} countries. Real ground knowledge,
              honest pricing.
            </p>
            <Link href="/about" className="link-sweep mt-6 inline-block text-[14px] font-medium text-gold-700">
              Our story &rarr;
            </Link>
          </div>
          <div className="lg:col-span-5" data-reveal="right">
            <div className="rounded-2xl border border-teal-500/30 bg-pine-900 p-7 text-paper-100 shadow-lg">
              <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-teal-300">
                Group departures are open now
              </p>
              <p className="display mt-3 text-[24px] leading-snug text-paper-50">
                Don&rsquo;t wait to grab a seat.
              </p>
              <p className="mt-2 text-[13.5px] leading-relaxed text-paper-200/75">
                Fixed-date Kashmir groups and Amarnath group departures. Message us for the
                next dates and seats left.
              </p>
              <a
                href={whatsAppLink('the next group departure')}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-gold btn-shine mt-5"
              >
                Enquire on WhatsApp &rarr;
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════ ENQUIRY */}
      <section className="mesh-pine grain section relative isolate overflow-hidden">
        <div
          aria-hidden
          className="blob left-[-6%] bottom-[-10%] h-[420px] w-[420px]"
          style={{ background: 'rgba(212,175,90,0.16)' }}
        />
        <div className="wrap relative grid items-start gap-14 lg:grid-cols-2">
          <div data-reveal>
            <p className="kicker kicker-light">Start planning</p>
            <h2 className="display d2 mt-3 text-paper-50">
              What are you dreaming of?
            </h2>
            <p className="lede mt-5 max-w-md !text-paper-200/75">
              Send us your dates and the shape of the trip you are imagining.
              You will get a real itinerary from a real planner &mdash;
              usually the same day.
            </p>

            <ul className="mt-9 space-y-4">
              {[
                [Users, 'A planner, not a queue', 'The person who replies handles your trip end to end.'],
                [ShieldCheck, 'No obligation, no spam', 'A quote is a quote. We do not sell your number on.'],
                [Headphones, 'Reply within hours', `Usually the same day. ${SITE.hours}.`],
              ].map(([Icon, t, d]) => {
                const I = Icon as typeof Users;
                return (
                  <li key={t as string} className="flex gap-4">
                    <span className="grid size-10 shrink-0 place-items-center rounded-full border border-gold-400/25 bg-gold-400/10 text-gold-300">
                      <I className="size-4" strokeWidth={1.8} />
                    </span>
                    <div>
                      <p className="text-[14.5px] font-medium text-paper-50">{t as string}</p>
                      <p className="mt-0.5 text-[13px] text-paper-200/65">{d as string}</p>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>

          <div data-reveal="right" className="glass-dark rounded-2xl p-6 md:p-8">
            <EnquiryForm source="homepage" light />
          </div>
        </div>
      </section>
    </>
  );
}
