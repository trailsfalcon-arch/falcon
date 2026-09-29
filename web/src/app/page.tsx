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
import { SITE, inr } from '@/lib/site';
import { DESTINATIONS } from '@/lib/destinations';
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
  'Srinagar-based, not a reseller',
  'Kashmir, Ladakh & Jammu',
  'Ladakh permits handled',
  'Private transfers for your group',
  'Stays we know first-hand',
  'One planner, start to finish',
  'Itemised quotes, no hidden extras',
];

const WHY = [
  {
    icon: ShieldCheck,
    title: 'Paced for the mountains',
    body: 'Itineraries are built around travel time, weather and altitude, not a checklist. In Ladakh that means acclimatising around Leh before the high passes and lakes.',
  },
  {
    icon: MapPin,
    title: 'Planned locally',
    body: 'We work with drivers, hotels, houseboats and camps directly from Srinagar, so your quote reflects real local costs and real availability.',
  },
  {
    icon: Car,
    title: 'Your own vehicle and driver',
    body: 'Private transfers for your group, with drivers who know the routes. Never a shared cab on someone else’s schedule.',
  },
  {
    icon: BedDouble,
    title: 'Stays chosen on purpose',
    body: 'Hotels, houseboats and camps picked for location, comfort and value, and matched to your budget rather than to whoever pays the highest commission.',
  },
  {
    icon: Headphones,
    title: 'One named planner, start to finish',
    body: 'The person who writes your itinerary stays with you through the trip. No handovers, no ticket numbers.',
  },
  {
    icon: Receipt,
    title: 'Transparent pricing',
    body: 'An itemised quote showing what each night and each transfer costs, and exactly what is and is not included.',
  },
];

const SEASONS = [
  { m: 'Apr', t: 'The quiet opening', d: 'Leh and the monasteries are open and empty. Cold nights, and some high camps not yet running.' },
  { m: 'May – Jun', t: 'Snow on the passes', d: 'The busiest and most photogenic months. Snow-lined passes, and the Manali and Srinagar roads opening.' },
  { m: 'Jul – Aug', t: 'Warmest weeks', d: 'Everything is open and the days are warm, but rain elsewhere can cause roadblocks. Build in a spare day.' },
  { m: 'Sep – Oct', t: 'Our honest pick', d: 'Clear skies, thin crowds, golden poplars, and the year’s best conditions for the stars at Hanle.' },
  { m: 'Nov – Dec', t: 'Roads closing', d: 'Most high roads close for the winter. Leh stays reachable by air, but the lakes and passes do not.' },
  { m: 'Jan – Mar', t: 'Deep winter', d: 'Leh by air only, and well below freezing at night. A harder trip than the one most people picture.' },
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
              'linear-gradient(180deg, rgba(7,15,31,0.45) 0%, rgba(7,15,31,0.65) 45%, rgba(7,15,31,0.95) 100%), url("/img/ladakh-hero.webp") center / cover',
          }}
        />
        {/* drifting light blobs — pure decoration, aria-hidden */}
        <div
          aria-hidden
          className="blob -z-10 left-[6%] top-[12%] h-[380px] w-[380px]"
          style={{ background: 'rgba(201,169,97,0.20)' }}
        />
        <div
          aria-hidden
          className="blob -z-10 right-[4%] top-[38%] h-[300px] w-[300px]"
          style={{ background: 'rgba(30,79,168,0.30)', animationDelay: '-6s' }}
        />
        <div aria-hidden className="grain absolute inset-0 -z-10" />

        <div className="wrap relative w-full pb-16 pt-32 md:pb-24 md:pt-40">
          <p className="anim-fade kicker kicker-light">
            Srinagar-based · Kashmir, Ladakh &amp; Jammu
          </p>

          <h1 className="display d1 mt-5 max-w-[19ch] text-paper-50">
            <span className="mask">
              <span style={{ animationDelay: '80ms' }}>Kashmir &amp; Ladakh,</span>
            </span>
            <span className="mask">
              <span style={{ animationDelay: '200ms' }}>
                planned <em className="text-gold-grad not-italic">properly.</em>
              </span>
            </span>
          </h1>

          <p className="anim-rise d-4 lede mt-7 max-w-xl !text-paper-200/85">
            Houseboats on Dal Lake, the meadows of Gulmarg and Pahalgam, and the
            high roads into Ladakh &mdash; planned day by day by one planner in
            Srinagar, from your first message to your flight home.
          </p>

          <div className="anim-rise d-5 mt-9 flex flex-wrap gap-3">
            <Link href="/packages" className="btn btn-gold btn-shine group">
              Browse tour packages
              <ArrowRight className="arrow-slide size-4" strokeWidth={2.2} />
            </Link>
            <Link href="/contact" className="btn btn-ghost-light">
              Talk to a specialist
            </Link>
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
          Srinagar-based tour operator for Kashmir, Ladakh and Jammu. Private transfers,
          Ladakh permits handled, itemised quotes and one planner from enquiry to return.
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
                  Four Ladakhs,
                  <br className="hidden md:block" /> one journey.
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
            className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
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
            kicker="Most booked"
            title="Itineraries that keep coming back."
            lede="Every package below is a starting point — tell us your dates and group and we will reshape it around you. Prices are per person on twin-sharing."
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
          style={{ background: 'rgba(201,169,97,0.14)' }}
        />
        <div className="wrap relative">
          <SectionHead
            light
            kicker={`Why ${SITE.name}`}
            title={
              <>
                Run by locals. Not by a <em className="text-gold-grad not-italic">call centre</em>.
              </>
            }
            lede="Six reasons travellers book a local team directly, rather than a portal that forwards their enquiry to one."
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
            kicker="However you travel"
            title="Same mountains. Very different trips."
            lede="A honeymoon and a bike trip should not share an itinerary. Pick the shape of your trip and we build from there."
          />

          <div data-reveal-group className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {TRAVEL_STYLES.map((s) => (
              <Link
                key={s.slug}
                href={`/travel-styles/${s.slug}`}
                className="lift zoom-wrap group relative overflow-hidden rounded-2xl shadow-md"
              >
                <div
                  className="zoom aspect-[4/5] bg-cover bg-center"
                  style={{ background: s.hero }}
                />
                <div className="absolute inset-x-0 bottom-0 p-5">
                  <h3 className="display text-[22px] leading-none text-paper-50">
                    {s.name}
                  </h3>
                  <p className="mt-2 line-clamp-2 text-[12px] leading-relaxed text-paper-200/75">
                    {s.headline}
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
            lede="Ladakh has a season, and the roads decide it. Here is the honest breakdown, month by month."
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

      {/* ══════════════════════════════════ REVIEWS (hidden until real ones exist) */}
      {REVIEWS.length > 0 && (
      <section className="section">
        <div className="wrap">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHead
              kicker="What guests say"
              title="The reviews are the itinerary."
            />
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

      {/* ══════════════════════════════════ ENQUIRY */}
      <section className="mesh-pine grain section relative isolate overflow-hidden">
        <div
          aria-hidden
          className="blob left-[-6%] bottom-[-10%] h-[420px] w-[420px]"
          style={{ background: 'rgba(201,169,97,0.16)' }}
        />
        <div className="wrap relative grid items-start gap-14 lg:grid-cols-2">
          <div data-reveal>
            <p className="kicker kicker-light">Start planning</p>
            <h2 className="display d2 mt-3 text-paper-50">
              Tell us what you&rsquo;re dreaming about.
            </h2>
            <p className="lede mt-5 max-w-md !text-paper-200/75">
              Send us your dates and the shape of the trip you are imagining.
              You will get a real itinerary from a real planner in Srinagar &mdash;
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
