import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { SITE, lowestPrice, priceText } from '@/lib/site';
import { PACKAGES } from '@/lib/packages';
import { DESTINATIONS } from '@/lib/destinations';
import { TRAVEL_STYLES } from '@/lib/travel-styles';
import { PackageCard, SectionHead, JsonLd } from '@/components/cards';
import { PageHero } from '@/components/page-hero';

export const metadata: Metadata = {
  title: 'Kashmir Tour Packages — Srinagar, Gulmarg, Pahalgam, Gurez & Pilgrimages',
  description:
    'Every Falcon Trails itinerary in one place: Kashmir Essentials, the Kashmir Grand Tour, honeymoon, offbeat Gurez, Amarnath and Vaishno Devi yatras, Srinagar to Leh by road, and the Golden Triangle. Day-by-day plans and clear inclusions.',
  alternates: { canonical: '/packages' },
};

export default function PackagesIndex() {
  const cheapest = lowestPrice(PACKAGES.map((p) => p.priceFrom));
  const others = PACKAGES.filter((p) => !DESTINATIONS.some((d) => d.slug === p.destination));

  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: SITE.domain },
        { '@type': 'ListItem', position: 2, name: 'Packages', item: `${SITE.domain}/packages` },
      ],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      name: 'Tour packages by Falcon Trails',
      numberOfItems: PACKAGES.length,
      itemListElement: PACKAGES.map((p, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        name: `${p.name} — ${p.nights} nights`,
        url: `${SITE.domain}/packages/${p.slug}`,
      })),
    },
  ];

  return (
    <>
      <JsonLd data={jsonLd} />

      <PageHero
        kicker={`${PACKAGES.length} itineraries · ${cheapest ? `${priceText(cheapest)} per person` : 'itemised quotes on request'}`}
        title="Every itinerary, planned from Srinagar."
        lede="Day-by-day plans, real inclusions, and exclusions written plainly rather than buried. Each one is a starting point — tell us your dates and we reshape it around you."
        crumbs={[{ label: 'Home', href: '/' }, { label: 'Packages' }]}
        background="linear-gradient(180deg, rgba(11,20,29,0.42) 0%, rgba(11,20,29,0.92) 100%), radial-gradient(140% 120% at 30% 8%, #243648 0%, #101f3d 46%, #0b141d 100%)"
      />

      {/* jump links — client-free filtering by anchor keeps this fully static */}
      <nav
        aria-label="Filter packages by destination"
        className="sticky top-[68px] z-30 border-b border-paper-200 bg-paper-50/92 backdrop-blur-lg md:top-[80px]"
      >
        <div className="wrap scroll-x flex items-center gap-2 py-3">
          <span className="shrink-0 pr-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-ink-500">
            Jump to
          </span>
          {DESTINATIONS.map((d) => (
            <a
              key={d.slug}
              href={`#${d.slug}`}
              className="shrink-0 rounded-full border border-paper-300 px-3.5 py-1.5 text-[12.5px] font-medium text-ink-700 transition-all duration-200 hover:-translate-y-0.5 hover:border-gold-400 hover:bg-gold-50 hover:text-gold-700"
            >
              {d.name}
            </a>
          ))}
          <a
            href="#beyond"
            className="shrink-0 rounded-full border border-paper-300 px-3.5 py-1.5 text-[12.5px] font-medium text-ink-700 transition-all duration-200 hover:-translate-y-0.5 hover:border-gold-400 hover:bg-gold-50 hover:text-gold-700"
          >
            Pilgrimages & beyond
          </a>
        </div>
      </nav>

      <div className="mesh-warm">
        {DESTINATIONS.map((dest) => {
          const list = PACKAGES.filter((p) => p.destination === dest.slug);
          if (list.length === 0) return null;
          return (
            <section
              key={dest.slug}
              id={dest.slug}
              className="section-sm scroll-mt-[132px] border-b border-paper-200 last:border-0 md:scroll-mt-[152px]"
            >
              <div className="wrap">
                <div className="flex flex-wrap items-end justify-between gap-4">
                  <SectionHead
                    kicker={`${list.length} ${list.length === 1 ? 'itinerary' : 'itineraries'}`}
                    title={dest.seoTitle}
                  />
                  <Link
                    href={`/destinations/${dest.slug}`}
                    data-reveal="right"
                    className="link-sweep text-[13.5px] font-medium text-gold-700"
                  >
                    Full {dest.name} guide →
                  </Link>
                </div>
                <div data-reveal-group className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                  {list.map((p) => (
                    <PackageCard key={p.slug} p={p} />
                  ))}
                </div>
              </div>
            </section>
          );
        })}

        {/* Trips outside the destination hubs: yatras and journeys beyond Kashmir. */}
        {others.length > 0 && (
          <section id="beyond" className="section-sm scroll-mt-[132px] md:scroll-mt-[152px]">
            <div className="wrap">
              <SectionHead
                kicker={`${others.length} ${others.length === 1 ? 'itinerary' : 'itineraries'}`}
                title="Pilgrimages & journeys beyond Kashmir"
              />
              <div data-reveal-group className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                {others.map((p) => (
                  <PackageCard key={p.slug} p={p} />
                ))}
              </div>
            </div>
          </section>
        )}
      </div>

      {/* travel styles cross-link block */}
      <section className="section border-t border-paper-200">
        <div className="wrap">
          <SectionHead
            kicker="Not sure which fits?"
            title="Start from how you travel instead."
            lede="A yatra, a honeymoon, a family trip with grandparents and a group departure need different itineraries even to the same place."
          />
          <div data-reveal-group className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {TRAVEL_STYLES.map((s) => (
              <Link
                key={s.slug}
                href={`/travel-styles/${s.slug}`}
                className="lift group rounded-xl border border-paper-300 bg-paper-50 p-5 transition-colors hover:border-gold-400 hover:bg-white"
              >
                <h3 className="display text-[19px] text-ink-900">{s.name}</h3>
                <p className="mt-1.5 line-clamp-3 text-[12.5px] leading-relaxed text-ink-600">
                  {s.headline}
                </p>
                <span className="mt-3 inline-block text-[12px] font-medium text-gold-700 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  Explore →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
