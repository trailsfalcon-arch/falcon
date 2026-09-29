import type { NextConfig } from 'next';

const config: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,

  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'images.pexels.com' },
    ],
  },

  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()',
          },
        ],
      },
    ];
  },

  async redirects() {
    return [
      // Short vanity URLs, including the paths falcontrails.in's launch page
      // linked on go.falcontrails.in (/kashmir/, /ladakh/, /amarnath/,
      // /vaishno-devi/).
      { source: '/kashmir', destination: '/destinations/srinagar', permanent: false },
      { source: '/srinagar', destination: '/destinations/srinagar', permanent: true },
      { source: '/gulmarg', destination: '/destinations/gulmarg', permanent: true },
      { source: '/pahalgam', destination: '/destinations/pahalgam', permanent: true },
      { source: '/sonamarg', destination: '/destinations/sonamarg', permanent: true },
      { source: '/gurez', destination: '/destinations/offbeat-kashmir', permanent: true },
      { source: '/offbeat-kashmir', destination: '/destinations/offbeat-kashmir', permanent: true },
      { source: '/ladakh', destination: '/destinations/ladakh', permanent: true },
      { source: '/amarnath', destination: '/packages/amarnath-yatra-baltal', permanent: false },
      { source: '/vaishno-devi', destination: '/packages/vaishno-devi-yatra', permanent: false },
      { source: '/golden-triangle', destination: '/packages/golden-triangle-5-nights', permanent: false },

      // Travel-style shorthands.
      { source: '/honeymoon', destination: '/travel-styles/honeymoon', permanent: true },
      { source: '/family', destination: '/travel-styles/family', permanent: true },
      { source: '/group-departures', destination: '/travel-styles/group-departures', permanent: true },
      { source: '/pilgrimages', destination: '/travel-styles/sacred-journeys', permanent: true },
      { source: '/international', destination: '/travel-styles/the-world', permanent: true },

      // There is no /travel-styles index page — send it to packages, which
      // cross-links every style.
      { source: '/travel-styles', destination: '/packages', permanent: false },
      { source: '/tours', destination: '/packages', permanent: true },
    ];
  },
};

export default config;
