/**
 * Single source of truth for public-facing brand facts.
 * Change here → propagates through header, footer, WhatsApp CTAs, JSON-LD,
 * sitemap, robots. Never hardcode any of these anywhere else.
 */
export const SITE = {
  name: 'Falcon Trails',
  legalName: 'Falcon Trails',
  tagline: 'Journeys across India — and beyond',
  domain: 'https://falcontrails.in',
  landerDomain: 'https://go.falcontrails.in',

  /**
   * NAP (name / address / phone). Local SEO depends on these matching the
   * Google Business Profile character-for-character across every citation.
   *
   * Phone / WhatsApp is the number on falcontrails.in.
   * TODO(brand): add the office street address once it is on the GBP.
   */
  founded: '2026',
  /** Public launch, as announced on falcontrails.in. */
  launched: '2026-08-14',

  /** The founder's own years in Kashmir tourism (guiding since 2010). */
  founder: { name: 'Shahid Parvez Khan', since: '2010', countries: '12+' },

  phone: {
    display: '+91 96222 10290',
    tel: '+919622210290',
    wa: '919622210290',
  },
  email: 'info@falcontrails.in',

  address: {
    street: '',
    city: 'Srinagar',
    region: 'Jammu and Kashmir',
    postalCode: '190001',
    country: 'IN',
  },

  /** Approximate city-centre coords (Srinagar) — for LocalBusiness JSON-LD. */
  geo: { lat: 34.0837, lng: 74.7973 },

  hours: 'Mon–Sun, 09:00–20:00 IST',

  /** Google Business Profile reviews link. Empty until the profile exists. */
  googleReviews: '',

  /** Social profiles. Leave a value empty and its icon/link is not rendered. */
  social: {
    instagram: '',
    facebook: '',
  },

  /**
   * Public proof points. These feed AggregateRating JSON-LD, so they must be
   * Falcon Trails' OWN numbers from its Google Business Profile. Publishing
   * someone else's rating or review count is a structured-data violation and
   * misleads customers. Keep rating null and reviewCount 0 until real reviews
   * exist; every page hides rating claims while they are unset.
   */
  stats: {
    rating: null as string | null,
    reviewCount: 0,
  },

  /** Google Tag Manager container. Empty until Falcon Trails has its own:
   *  the layout only loads GTM when this is set. */
  gtmId: '',

  /** Backend endpoint that accepts public lead captures. */
  leadCaptureUrl:
    process.env.NEXT_PUBLIC_LEAD_CAPTURE_URL ??
    'https://falcon-trails-backend.onrender.com/api/leads/capture',

  /**
   * Cheap health endpoint used to wake the Render free-tier backend.
   * Every public page fires a 1×1 Image() at this so the API is warm by
   * the time a visitor submits an enquiry (Render sleeps after 15min idle).
   */
  wakePingUrl:
    process.env.NEXT_PUBLIC_WAKE_PING_URL === 'off' ? '' :
      (process.env.NEXT_PUBLIC_WAKE_PING_URL || process.env.NEXT_PUBLIC_LEAD_CAPTURE_URL?.replace(/\/leads\/capture\/?$/, '/health') || 'https://falcon-trails-backend.onrender.com/api/health'),
};

/** True once there is a real rating to show (see SITE.stats). */
export const HAS_RATING = SITE.stats.rating !== null && SITE.stats.reviewCount > 0;

/**
 * Build a wa.me link with a prefilled message so every WhatsApp CTA is
 * consistent and the sales team can tell which page the chat came from.
 */
export function whatsAppLink(context: string): string {
  const msg = `Hi Falcon Trails, I'm enquiring about ${context}.`;
  return `https://wa.me/${SITE.phone.wa}?text=${encodeURIComponent(msg)}`;
}

/** ₹ with Indian digit grouping. 18500 → "₹18,500" */
export function inr(n: number): string {
  return `₹${n.toLocaleString('en-IN')}`;
}

/** "Street, City", skipping the street while it is unset. */
export function addressLine(): string {
  return [SITE.address.street, SITE.address.city].filter(Boolean).join(', ');
}

/**
 * Price text for cards, sidebars and meta: "from ₹18,500" or, while a price
 * is not set, "Price on request".
 */
export function priceText(n: number | null | undefined, suffix = ''): string {
  return n ? `from ${inr(n)}${suffix}` : 'Price on request';
}

/** Lowest set price in a list, or null when none is priced yet. */
export function lowestPrice(prices: (number | null | undefined)[]): number | null {
  const set = prices.filter((n): n is number => typeof n === 'number' && n > 0);
  return set.length ? Math.min(...set) : null;
}
