import type { Metadata } from 'next';
import Link from 'next/link';
import { SITE } from '@/lib/site';
import { REVIEWS } from '@/lib/reviews';
import { ReviewCard, SectionHead, JsonLd } from '@/components/cards';
import { PageHero } from '@/components/page-hero';
import { EnquiryForm } from '@/components/enquiry-form';

export const metadata: Metadata = {
  title: `Guest Reviews — What Travellers Say About ${SITE.name}`,
  description: `What travellers say about their trips with ${SITE.name}.`,
  alternates: { canonical: '/reviews' },
  // An empty reviews page is thin content: keep it out of search until the
  // first genuine reviews are added in lib/reviews.ts.
  ...(REVIEWS.length === 0 ? { robots: { index: false, follow: true } } : {}),
};

export default function ReviewsPage() {
  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: SITE.domain },
        { '@type': 'ListItem', position: 2, name: 'Reviews', item: `${SITE.domain}/reviews` },
      ],
    },
  ];

  return (
    <>
      <JsonLd data={jsonLd} />

      <PageHero
        kicker="Guest reviews"
        title="The reviews are the itinerary."
        lede={
          REVIEWS.length > 0
            ? 'A few of the things travellers have told us after their trips.'
            : 'We are a new company, so there are no reviews to show yet. We will only ever publish reviews from guests who actually travelled with us.'
        }
        crumbs={[{ label: 'Home', href: '/' }, { label: 'Reviews' }]}
        background="linear-gradient(180deg, rgba(10,8,4,0.42) 0%, rgba(10,8,4,0.92) 100%), radial-gradient(140% 120% at 30% 8%, #a8842f 0%, #634d22 46%, #120d04 100%)"
      />

      {REVIEWS.length > 0 && (
      <section className="mesh-warm section">
        <div className="wrap">
          <div data-reveal-group className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {REVIEWS.map((r) => (
              <ReviewCard key={r.author} r={r} />
            ))}
          </div>

          <p data-reveal className="mx-auto mt-12 max-w-xl text-center text-[13px] leading-relaxed text-ink-500">
            Every review above is from a guest who travelled with us. We will not
            publish a testimonial we cannot trace to a real booking, which is why
            there are fewer of them here than on most travel sites.
          </p>
        </div>
      </section>
      )}

      <section className="section border-t border-paper-200 bg-paper-100">
        <div className="wrap grid items-start gap-12 lg:grid-cols-2">
          <div data-reveal>
            <SectionHead
              kicker="Your turn"
              title="Let's make the next one."
              lede="Tell us the dates and the group. We reply with a real itinerary, not a brochure."
            />
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/packages" className="btn btn-ghost">
                Browse packages
              </Link>
              <Link href="/destinations" className="btn btn-ghost">
                Explore destinations
              </Link>
            </div>
          </div>
          <div data-reveal="right" className="rounded-2xl border border-paper-300 bg-white p-6 shadow-md md:p-8">
            <EnquiryForm source="reviews_page" />
          </div>
        </div>
      </section>
    </>
  );
}
