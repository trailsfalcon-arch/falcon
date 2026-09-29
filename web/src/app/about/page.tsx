import type { Metadata } from 'next';
import Link from 'next/link';
import { MapPin, Users, Clock } from 'lucide-react';
import { SITE, addressLine } from '@/lib/site';
import { SectionHead, JsonLd } from '@/components/cards';
import { PageHero } from '@/components/page-hero';
import { EnquiryForm } from '@/components/enquiry-form';

export const metadata: Metadata = {
  title: 'About Us — A Srinagar-Based Tour Operator',
  description: `${SITE.name} is a Srinagar-based tour operator for Kashmir, Ladakh and Jammu, founded by a guide who has been showing travellers Kashmir since 2010.`,
  alternates: { canonical: '/about' },
};

const VALUES = [
  {
    n: '01',
    t: 'We answer our own phone',
    b: 'No call centre, no ticketing queue. The planner who writes your itinerary is the one who answers when plans change on the road.',
  },
  {
    n: '02',
    t: 'Honest advice first',
    b: 'If your dates, your days or your route are wrong for what you want, we say so before we quote. In Ladakh that means acclimatising around Leh before the high passes.',
  },
  {
    n: '03',
    t: 'No middlemen in the chain',
    b: 'We work with drivers, hotels, houseboats and camps directly, so there is no chain of commissions between you and the people serving you.',
  },
  {
    n: '04',
    t: 'The price is the price',
    b: 'An itemised quote showing what each night and each transfer costs, with exclusions listed plainly, and a written itinerary before you pay anything.',
  },
];

export default function AboutPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    name: `About ${SITE.name}`,
    url: `${SITE.domain}/about`,
    mainEntity: { '@id': `${SITE.domain}/#org` },
  };

  return (
    <>
      <JsonLd data={jsonLd} />

      <PageHero
        kicker="Srinagar · Kashmir, Ladakh & Jammu"
        title="Planned by people who live here."
        lede="The people planning your trip are the people running it: a Srinagar-based team, not an intermediary reselling somebody else’s trip."
        crumbs={[{ label: 'Home', href: '/' }, { label: 'About' }]}
        background="linear-gradient(180deg, rgba(7,15,31,0.40) 0%, rgba(7,15,31,0.92) 100%), radial-gradient(140% 120% at 26% 8%, #3670d8 0%, #16294f 46%, #070f1f 100%)"
      />

      <section className="section-sm mesh-warm">
        <div className="wrap grid gap-12 md:grid-cols-12">
          <div className="md:col-span-7" data-reveal>
            <div className="space-y-5">
              <p className="text-[17.5px] leading-[1.75] text-ink-800">
                {SITE.name} was started by Shahid Parvez Khan, who began guiding
                travellers around Kashmir in 2010, hosting guests from South Africa,
                Malaysia, Singapore, Indonesia, Thailand, Spain and the UK.
              </p>
              <p className="text-[15.5px] leading-[1.8] text-ink-600">
                After years on the ground, he moved into planning and selling
                holidays for a Srinagar travel company, building itineraries,
                negotiating with hotels and leading its direct-to-traveller sales
                team. {SITE.name} is the independent company that grew out of
                that work.
              </p>
              <p className="text-[15.5px] leading-[1.8] text-ink-600">
                We plan trips across Kashmir, Ladakh and Jammu: Srinagar and its
                houseboats, Gulmarg, Pahalgam and Sonmarg, and the high road into
                Ladakh. Every quote is itemised, and the person who plans your trip
                is the person you talk to while you are travelling.
              </p>
              <p className="text-[15.5px] leading-[1.8] text-ink-600">
                We speak Kashmiri, Urdu, Hindi, Punjabi and English.
              </p>
            </div>
          </div>

          <aside className="md:col-span-5" data-reveal="right">
            <div className="rounded-2xl border border-paper-300 bg-paper-100 p-6">
              <h2 className="text-[12px] font-semibold uppercase tracking-[0.16em] text-ink-700">
                At a glance
              </h2>
              <dl className="mt-5 space-y-4">
                {[
                  [Clock, 'Guiding since', '2010, Srinagar'],
                  [Users, 'Languages', 'Kashmiri · Urdu · Hindi · Punjabi · English'],
                  [MapPin, 'Coverage', 'Kashmir · Ladakh · Jammu'],
                ].map(([Icon, k, v]) => {
                  const I = Icon as typeof Clock;
                  return (
                    <div key={k as string} className="flex gap-3.5">
                      <span className="mt-0.5 grid size-8 shrink-0 place-items-center rounded-lg bg-gold-100 text-gold-700">
                        <I className="size-4" strokeWidth={1.9} />
                      </span>
                      <div>
                        <dt className="text-[11px] uppercase tracking-[0.12em] text-ink-500">
                          {k as string}
                        </dt>
                        <dd className="mt-0.5 text-[14px] font-medium text-ink-900">
                          {v as string}
                        </dd>
                      </div>
                    </div>
                  );
                })}
              </dl>

              <div className="mt-6 border-t border-paper-300 pt-5">
                <p className="text-[13px] leading-relaxed text-ink-600">{addressLine()}</p>
                <p className="mt-3 text-[13px] text-ink-600">{SITE.hours}</p>
                <Link href="/contact" className="btn btn-gold mt-5 w-full">
                  Talk to us
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </section>

      <section className="mesh-pine grain section relative isolate overflow-hidden">
        <div
          aria-hidden
          className="blob right-[-8%] top-[8%] h-[420px] w-[420px]"
          style={{ background: 'rgba(201,169,97,0.14)' }}
        />
        <div className="wrap relative">
          <SectionHead light kicker="How we work" title="Four rules we do not bend." />
          <div data-reveal-group className="mt-12 grid gap-x-12 gap-y-10 md:grid-cols-2">
            {VALUES.map((v) => (
              <div key={v.n} className="group">
                <span className="display text-[13px] tabular-nums text-gold-300/50">
                  {v.n}
                </span>
                <h3 className="display mt-3 text-[24px] leading-snug text-paper-50">
                  {v.t}
                </h3>
                <p className="mt-3 text-[14.5px] leading-relaxed text-paper-200/70">
                  {v.b}
                </p>
                <div className="mt-6 h-px w-full origin-left scale-x-0 bg-gradient-to-r from-gold-400 to-transparent transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-x-100" />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section border-t border-paper-200 bg-paper-100">
        <div className="wrap grid items-start gap-12 lg:grid-cols-2">
          <div data-reveal>
            <SectionHead
              kicker="Say hello"
              title="Ask us something specific."
              lede="Not a generic enquiry form response. Ask about a road, a hotel, a month, a route — the more specific the question, the more useful our answer."
            />
          </div>
          <div data-reveal="right" className="rounded-2xl border border-paper-300 bg-white p-6 shadow-md md:p-8">
            <EnquiryForm source="about_page" />
          </div>
        </div>
      </section>
    </>
  );
}
