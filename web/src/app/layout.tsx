import type { Metadata, Viewport } from 'next';
import Script from 'next/script';
import { Marcellus, Jost } from 'next/font/google';
import { SITE, HAS_RATING } from '@/lib/site';
import { SiteChrome } from '@/components/site-chrome';
import { RevealProvider, ScrollProgress } from '@/components/reveal';
import './globals.css';

/** The Falcon Trails pairing, as on falcontrails.in: Marcellus + Jost. */
const marcellus = Marcellus({
  subsets: ['latin'],
  display: 'swap',
  weight: '400',
  variable: '--font-marcellus',
});

const jost = Jost({
  subsets: ['latin'],
  display: 'swap',
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-jost',
});

export const viewport: Viewport = {
  themeColor: '#0b141d',
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE.domain),
  title: {
    default: 'Kashmir & Ladakh Tour Packages | Falcon Trails — Srinagar-based Tour Operator',
    template: `%s | ${SITE.name}`,
  },
  description:
    'Kashmir tour packages from a Srinagar-based team, local since 2010: Srinagar, Gulmarg, Pahalgam, Sonamarg and offbeat Gurez, Amarnath and Vaishno Devi yatras, group departures, Ladakh by road and journeys across India.',
  applicationName: SITE.name,
  authors: [{ name: SITE.name, url: SITE.domain }],
  creator: SITE.name,
  publisher: SITE.name,
  keywords: [
    'Kashmir tour packages',
    'Srinagar tour package',
    'Gulmarg Pahalgam tour',
    'Kashmir houseboat stay',
    'Kashmir honeymoon package',
    'Kashmir family tour',
    'Gurez valley tour',
    'offbeat Kashmir',
    'Amarnath Yatra package',
    'Vaishno Devi tour package',
    'Kashmir group tour',
    'Srinagar to Leh road trip',
    'travel agency in Srinagar',
  ],
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: SITE.domain,
    siteName: SITE.name,
    title: 'Kashmir & Ladakh Tour Packages | Falcon Trails — Srinagar-based Tour Operator',
    description:
      'Kashmir, planned by locals. Houseboats, Gulmarg, Pahalgam, offbeat Gurez, yatras and group departures from a Srinagar-based team.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Kashmir & Ladakh Tour Packages | Falcon Trails',
    description:
      'Kashmir, planned by locals. Journeys across India — and beyond.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  alternates: { canonical: '/' },
  formatDetection: { telephone: true, address: true },
};

/**
 * Sitewide organisation graph. TravelAgency is the specific type Google
 * understands for our category; the @id lets every other page's JSON-LD
 * reference this node instead of repeating it.
 */
const orgJsonLd = {
  '@context': 'https://schema.org',
  '@type': ['TravelAgency', 'LocalBusiness'],
  '@id': `${SITE.domain}/#org`,
  name: SITE.name,
  legalName: SITE.legalName,
  url: SITE.domain,
  telephone: SITE.phone.tel,
  email: SITE.email,
  foundingDate: SITE.founded,
  priceRange: '₹₹',
  address: {
    '@type': 'PostalAddress',
    ...(SITE.address.street && { streetAddress: SITE.address.street }),
    addressLocality: SITE.address.city,
    addressRegion: SITE.address.region,
    postalCode: SITE.address.postalCode,
    addressCountry: SITE.address.country,
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: SITE.geo.lat,
    longitude: SITE.geo.lng,
  },
  openingHoursSpecification: {
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
    opens: '09:00',
    closes: '20:00',
  },
  sameAs: [SITE.social.instagram, SITE.social.facebook].filter(Boolean),
  areaServed: [
    { '@type': 'Place', name: 'Kashmir' },
    { '@type': 'Place', name: 'Ladakh' },
    { '@type': 'Place', name: 'Jammu' },
  ],
  // Only Falcon Trails' own Google rating may go here (see SITE.stats).
  ...(HAS_RATING && {
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: SITE.stats.rating,
      reviewCount: SITE.stats.reviewCount,
      bestRating: '5',
    },
  }),
};

const webSiteJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': `${SITE.domain}/#website`,
  url: SITE.domain,
  name: SITE.name,
  publisher: { '@id': `${SITE.domain}/#org` },
  inLanguage: 'en-IN',
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en-IN"
      className={`${marcellus.variable} ${jost.variable}`}
      // The inline script below adds a `js` class to <html> before React
      // hydrates, so server and client className strings differ by design.
      // Scoped to this element — it silences nothing else in the tree.
      suppressHydrationWarning
    >
      <head>
        {/*
          Marks the document as JS-capable before first paint. All scroll-reveal
          CSS is scoped under .js, so a crawler or a no-JS visitor never gets
          served invisible content. Runs inline — no network round-trip.
        */}
        <script
          dangerouslySetInnerHTML={{
            __html: `document.documentElement.classList.add('js')`,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify([orgJsonLd, webSiteJsonLd]) }}
        />
      </head>
      <body className="min-h-screen antialiased">
        {SITE.gtmId && (
          <>
            <Script id="gtm-init" strategy="afterInteractive">{`
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','${SITE.gtmId}');
            `}</Script>
            <noscript>
              <iframe
                src={`https://www.googletagmanager.com/ns.html?id=${SITE.gtmId}`}
                height="0"
                width="0"
                style={{ display: 'none', visibility: 'hidden' }}
                title="Google Tag Manager"
              />
            </noscript>
          </>
        )}


        <ScrollProgress />
        <RevealProvider />

        <SiteChrome>
          {children}
        </SiteChrome>

        {/*
          Render free-tier wake-ping. A 1×1 image request warms the backend on
          every page load so a visitor submitting an enquiry never waits out a
          30-second cold start.
        */}
        {SITE.wakePingUrl && <Script id="backend-wake" strategy="afterInteractive">{`
          (function(){var i=new Image();i.src=${JSON.stringify(SITE.wakePingUrl)}+'?t='+Date.now();})();
        `}</Script>}
      </body>
    </html>
  );
}
