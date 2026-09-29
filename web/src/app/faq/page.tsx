import type { Metadata } from 'next';
import Link from 'next/link';
import { SITE } from '@/lib/site';
import { DESTINATIONS } from '@/lib/destinations';
import { Faq, SectionHead, JsonLd } from '@/components/cards';
import { PageHero } from '@/components/page-hero';

export const metadata: Metadata = {
  title: 'Frequently Asked Questions — Booking, Payments & Travel',
  description:
    'Answers on booking with Falcon Trails, prices, the best time to visit Kashmir, houseboats, local taxis, phones, yatras and group departures.',
  alternates: { canonical: '/faq' },
};

// TODO(brand): once Falcon Trails is registered with J&K Tourism, say so in
// the second answer with the registration number.
const GENERAL = [
  {
    q: "How do I book a trip with Falcon Trails?",
    a: "Send an enquiry or WhatsApp us with your dates, group size and what you want to see. We come back with a written day-by-day itinerary and an itemised quote. You pay only once you are happy with both.",
  },
  {
    q: "How do I know my money is safe?",
    a: "You get a written itinerary and an itemised quote before you pay anything, and an invoice for every payment. Ask us anything about a hotel or a vehicle before you commit; we will answer plainly.",
  },
  {
    q: "Why book with a local operator rather than a big portal?",
    a: "Because the people answering your questions are the people running your trip, from Srinagar. Our founder has guided travellers in Kashmir since 2010. There is no chain of commissions between you and the people serving you.",
  },
  {
    q: "Why are prices shown as 'on request'?",
    a: "Kashmir prices move with the season, the hotel category and the size of your group. Rather than advertise a number that changes when you ask, we send an itemised quote for your dates, usually the same day.",
  },
  {
    q: "Can the itinerary be changed?",
    a: "Always. Every package is a starting point: add a night, swap Gulmarg for Doodhpathri, or combine Kashmir with a yatra or Ladakh.",
  },
  {
    q: "When is the best time to visit Kashmir?",
    a: "Kashmir is open all year. March–April brings blossom and the Tulip Garden; May–August is green and busy; October has autumn colour; December–February brings snow in Gulmarg and Pahalgam.",
  },
  {
    q: "Is one night on a houseboat enough?",
    a: "For most travellers, yes. We suggest one night on Dal or Nigeen Lake and the rest in hotels.",
  },
  {
    q: "Why do we need local taxis in Pahalgam, Sonamarg and Gulmarg?",
    a: "Local rules reserve some routes, such as Aru, Betaab and Chandanwari from Pahalgam, for local union taxis at fixed rates. It is standard; we tell you the fares beforehand.",
  },
  {
    q: "Will my phone work in Kashmir?",
    a: "Prepaid SIMs from outside Jammu & Kashmir do not work here. Postpaid connections do, and most hotels and houseboats have Wi-Fi.",
  },
  {
    q: "Do you arrange the Amarnath Yatra and Vaishno Devi?",
    a: "Yes, with a guide, stays arranged and help with the paperwork. The Amarnath Yatra runs only in the season set by the Shrine Board each year and needs registration and a health certificate.",
  },
  {
    q: "Do you run group departures?",
    a: "Yes: fixed-date Kashmir groups and Amarnath group departures. Message us on WhatsApp for the current dates and seats left.",
  },
  {
    q: "Do you book flights?",
    a: "We can advise and book on request, but most travellers book their own flights to Srinagar. Our quotes are for everything on the ground.",
  },
  {
    q: "Do you work with travel agents?",
    a: "Yes. We handle ground operations in Kashmir for travel agents; see the partner page or message us.",
  },
  {
    q: "What if something goes wrong during the trip?",
    a: "You have one WhatsApp thread with a named trip coordinator from arrival to departure. If a road closes or the weather turns, we change the plan with you.",
  },
];

export default function FaqPage() {
  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: GENERAL.map((f) => ({
        '@type': 'Question',
        name: f.q,
        acceptedAnswer: { '@type': 'Answer', text: f.a },
      })),
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: SITE.domain },
        { '@type': 'ListItem', position: 2, name: 'FAQ', item: `${SITE.domain}/faq` },
      ],
    },
  ];

  return (
    <>
      <JsonLd data={jsonLd} />

      <PageHero
        kicker="Frequently asked"
        title="Booking, payments and the fine print."
        lede="The questions that come up before every trip, answered plainly. Destination-specific questions live on each destination page."
        crumbs={[{ label: 'Home', href: '/' }, { label: 'FAQ' }]}
        background="linear-gradient(180deg, rgba(11,20,29,0.42) 0%, rgba(11,20,29,0.92) 100%), radial-gradient(140% 120% at 30% 8%, #243648 0%, #101f3d 46%, #0b141d 100%)"
      />

      <section className="mesh-warm section-sm">
        <div className="wrap grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-[108px]">
              <SectionHead kicker="General" title="Booking & payments" />
              <p className="mt-6 text-[14px] leading-relaxed text-ink-600">
                Looking for something destination-specific? Each hub page has its own
                FAQ covering permits, altitude, weather and access.
              </p>
              <ul className="mt-5 space-y-2">
                {DESTINATIONS.map((d) => (
                  <li key={d.slug}>
                    <Link
                      href={`/destinations/${d.slug}#faq`}
                      className="link-sweep text-[13.5px] font-medium text-gold-700"
                    >
                      {d.name} FAQ →
                    </Link>
                  </li>
                ))}
              </ul>
              <Link href="/contact" className="btn btn-gold mt-8">
                Ask us something else
              </Link>
            </div>
          </div>

          <div className="lg:col-span-8" data-reveal>
            <Faq items={GENERAL} />
          </div>
        </div>
      </section>
    </>
  );
}
