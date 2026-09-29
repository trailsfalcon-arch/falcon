// TODO(brand): the payment and cancellation terms here were inherited from the
// codebase's previous owner. Confirm the deposit, balance and refund slabs you
// actually offer, and have a lawyer review this page before relying on it.
import type { Metadata } from 'next';
import { PageHero } from '@/components/page-hero';
import { JsonLd } from '@/components/cards';
import { SITE } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Terms & Conditions — Falcon Trails',
  description:
    'Review booking terms, payment schedules, permits, altitude advisories, and service guidelines for tour packages operated by Falcon Trails.',
  alternates: { canonical: '/terms-and-conditions' },
};

export default function TermsPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Terms and Conditions — Falcon Trails',
    description: 'Commercial booking terms and conditions for Falcon Trails.',
    url: `${SITE.domain}/terms-and-conditions`,
    publisher: { '@id': `${SITE.domain}/#org` },
  };

  return (
    <>
      <JsonLd data={jsonLd} />

      <PageHero
        kicker="Commercial Policies"
        title="Terms & Conditions"
        lede="Clear, honest terms for booking your journey with Falcon Trails."
        crumbs={[
          { label: 'Home', href: '/' },
          { label: 'Terms & Conditions' },
        ]}
      />

      <section className="py-16 md:py-24">
        <div className="wrap max-w-4xl">
          <div className="glass-panel rounded-3xl p-8 md:p-12 space-y-10 text-ink-800">
            <div>
              <h2 className="display d3 text-ink-950">1. Booking Confirmation & Payment Milestones</h2>
              <p className="mt-3 text-[15px] leading-relaxed text-ink-700">
                To confirm your holiday reservation, the following payment schedule applies unless otherwise specified in your formal quotation:
              </p>
              <ul className="mt-3 list-disc pl-6 space-y-1.5 text-[14.5px] text-ink-700">
                <li><strong>Deposit:</strong> 25% of the total package value confirms your dates and locks your stays and vehicle.</li>
                <li><strong>Balance:</strong> the remaining 75% is due seven days before your arrival.</li>
                <li><strong>Methods:</strong> UPI and bank transfer to the account named on your invoice. We confirm every payment in writing.</li>
              </ul>
            </div>

            <div className="border-t border-paper-300 pt-8">
              <h2 className="display d3 text-ink-950">2. Inclusions & Price Integrity</h2>
              <p className="mt-3 text-[15px] leading-relaxed text-ink-700">
                Every booking comes with a written itinerary and an itemised invoice before any payment, showing what each night and each vehicle costs. What is written in your itinerary under <em>Inclusions</em> is what you get, without surcharges on arrival.
              </p>
            </div>

            <div className="border-t border-paper-300 pt-8">
              <h2 className="display d3 text-ink-950">3. Mountain Weather & Road Realities</h2>
              <p className="mt-3 text-[15px] leading-relaxed text-ink-700">
                Roads and resorts in Kashmir and Ladakh (including Gulmarg, Pahalgam, Sonamarg, Zojila, the Razdan pass to Gurez and the Srinagar–Leh road) are subject to sudden weather changes, snow, landslides and closures or access restrictions ordered by the local administration.
              </p>
              <ul className="mt-3 list-disc pl-6 space-y-1.5 text-[14.5px] text-ink-700">
                <li>If a road or pass closes, our trip coordinator will reroute the trip or substitute sightseeing where it is safe to do so.</li>
                <li>On high-altitude routes (Ladakh, the Amarnath Yatra), if a traveller shows signs of acute mountain sickness we may change the plan on the day for their safety.</li>
              </ul>
            </div>

            <div className="border-t border-paper-300 pt-8">
              <h2 className="display d3 text-ink-950">4. Identification & Permits</h2>
              <p className="mt-3 text-[15px] leading-relaxed text-ink-700">
                All guests must carry original government-issued photo ID (Aadhaar, Voter ID, passport or driving licence); it is checked at hotels, houseboats and security checkpoints. Some areas near the Line of Control, such as Gurez, are restricted for foreign nationals. Pilgrimages need their own registration: the Amarnath Yatra requires Shrine Board registration and a Compulsory Health Certificate, and Vaishno Devi requires an RFID yatra card. For Ladakh, Indian guests pay the environmental fee and foreign nationals need a Protected Area Permit for areas such as Nubra and Pangong, which we arrange. Foreign nationals must hold a valid Indian visa or e-visa.
              </p>
            </div>

            <div className="border-t border-paper-300 pt-8">
              <h2 className="display d3 text-ink-950">5. Jurisdiction & Governance</h2>
              <p className="mt-3 text-[15px] leading-relaxed text-ink-700">
                All bookings and service agreements are governed by the laws of the Republic of India. Any legal proceedings shall be subject to the exclusive jurisdiction of the courts at Srinagar, Jammu and Kashmir.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
