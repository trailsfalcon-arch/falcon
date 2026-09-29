import type { Metadata } from 'next';
import { IMAGE_CREDITS } from '@/lib/image-credits';
import { PageHero } from '@/components/page-hero';

export const metadata: Metadata = {
  title: 'Image Credits',
  description: 'Photographers and licences for the photographs used on the Falcon Trails website.',
  alternates: { canonical: '/image-credits' },
};

export default function ImageCreditsPage() {
  return (
    <>
      <PageHero
        kicker="Thank you"
        title="Image credits"
        lede="The photographs on this site are shared by their photographers on Wikimedia Commons. We resized them and converted them to WebP; the originals and full licence terms are linked below."
        crumbs={[{ label: 'Home', href: '/' }, { label: 'Image credits' }]}
        background="linear-gradient(180deg, rgba(11,20,29,0.42) 0%, rgba(11,20,29,0.92) 100%), radial-gradient(140% 120% at 30% 8%, #1d4a5a 0%, #14222f 46%, #0b141d 100%)"
      />
      <section className="section-sm">
        <div className="wrap">
          <ul className="grid gap-4 md:grid-cols-2">
            {IMAGE_CREDITS.map((c) => (
              <li key={c.file} className="flex gap-4 rounded-xl border border-paper-300 bg-white p-4">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={c.file.replace('.webp', '-sm.webp')}
                  alt=""
                  className="h-20 w-28 shrink-0 rounded-lg object-cover"
                  loading="lazy"
                />
                <div className="min-w-0 text-[13px] leading-relaxed text-ink-700">
                  <a href={c.source} className="font-medium text-ink-900 underline decoration-paper-400 underline-offset-2 hover:text-gold-700" rel="noopener noreferrer" target="_blank">
                    {c.title.replace(/\.(jpe?g|png)$/i, '')}
                  </a>
                  <p>by {c.author}</p>
                  <p>
                    <a href={c.licenseUrl} className="underline decoration-paper-400 underline-offset-2 hover:text-gold-700" rel="license noopener noreferrer" target="_blank">
                      {c.license}
                    </a>
                    {' · '}resized and converted to WebP
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
