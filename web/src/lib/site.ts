/**
 * Single source of truth for public-facing brand facts.
 * Change here → propagates through header, footer, WhatsApp CTAs, JSON-LD,
 * sitemap, robots. Never hardcode any of these anywhere else.
 *
 * Contact details come from build-time env vars so no number or address is
 * published until it is real. Keep them identical to Settings → Company
 * profile in the CRM and to the Google Business Profile (local SEO needs the
 * name, address and phone to match character for character).
 *
 *   NEXT_PUBLIC_SITE_PHONE    e.g. +91 98765 43210   (hidden when unset)
 *   NEXT_PUBLIC_SITE_EMAIL    default info@falcontrails.in
 *   NEXT_PUBLIC_SITE_STREET   street line, optional
 *   NEXT_PUBLIC_GTM_ID        Google Tag Manager container, optional
 */
const phoneDisplay = (process.env.NEXT_PUBLIC_SITE_PHONE ?? '').trim();
const phoneDigits = phoneDisplay.replace(/[^0-9]/g, '');

export const SITE = {
  name: 'Falcon Trails',
  legalName: 'Falcon Trails',
  tagline: 'Kashmir, Ladakh & Jammu, planned properly',
  domain: 'https://falcontrails.in',
  landerDomain: 'https://go.falcontrails.in',

  phone: {
    /** Empty until NEXT_PUBLIC_SITE_PHONE is set; call buttons hide. */
    display: phoneDisplay,
    tel: phoneDigits ? `+${phoneDigits}` : '',
    wa: phoneDigits,
  },
  email: (process.env.NEXT_PUBLIC_SITE_EMAIL ?? '').trim() || 'info@falcontrails.in',

  address: {
    street: (process.env.NEXT_PUBLIC_SITE_STREET ?? '').trim(),
    city: 'Srinagar',
    region: 'Jammu & Kashmir',
    postalCode: '190001',
    country: 'IN',
  },

  /** Srinagar city centre, until the office pin is confirmed. */
  geo: { lat: 34.0837, lng: 74.7973 },

  hours: 'Mon–Sun, 09:00–20:00 IST',

  /** Google Business Profile review link. Empty until the profile exists. */
  googleReviews: '',

  /** Social profiles. Empty entries are not linked. */
  social: {
    instagram: '',
    facebook: '',
  },

  /** Google Tag Manager container; the layout only loads GTM when set. */
  gtmId: (process.env.NEXT_PUBLIC_GTM_ID ?? '').trim(),

  /** Backend endpoint that accepts public lead captures. */
  // No fallback host: a missing env var must fail visibly, never send this
  // site's enquiries into another company's backend.
  leadCaptureUrl: process.env.NEXT_PUBLIC_LEAD_CAPTURE_URL ?? '',

  /**
   * Cheap health endpoint used to wake the Render free-tier backend.
   * Every public page fires a 1×1 Image() at this so the API is warm by
   * the time a visitor submits an enquiry (Render sleeps after 15min idle).
   */
  wakePingUrl:
    process.env.NEXT_PUBLIC_WAKE_PING_URL === 'off' ? '' :
      (process.env.NEXT_PUBLIC_WAKE_PING_URL || process.env.NEXT_PUBLIC_LEAD_CAPTURE_URL?.replace(/\/leads\/capture\/?$/, '/health') || ''),
} as const;

/**
 * Build a wa.me link with a prefilled message so every WhatsApp CTA is
 * consistent and the sales team can tell which page the chat came from.
 */
export function whatsAppLink(context: string): string {
  const msg = `Hi ${SITE.name}, I'm enquiring about ${context}.`;
  // No number configured yet: send people to the enquiry form instead.
  if (!SITE.phone.wa) return '/contact';
  return `https://wa.me/${SITE.phone.wa}?text=${encodeURIComponent(msg)}`;
}

/** "Street, Srinagar, Jammu & Kashmir 190001" without blank parts. */
export function addressLine(): string {
  const { street, city, region, postalCode } = SITE.address;
  return [[street, city, region].filter(Boolean).join(', '), postalCode].filter(Boolean).join(' ');
}

/** Shown wherever a package or destination has no published price. */
export const PRICE_ON_REQUEST = 'Price on request';

/** Lowest published price in a list, or undefined when none are priced. */
export function cheapestPrice(items: { priceFrom?: number }[]): number | undefined {
  const prices = items.map((i) => i.priceFrom).filter((n): n is number => typeof n === 'number');
  return prices.length ? Math.min(...prices) : undefined;
}

/** "from ₹14,500" or "price on request". */
export function fromPrice(n?: number): string {
  return typeof n === 'number' ? `from ${inr(n)}` : 'price on request';
}

/** Schema.org Offer, only when there is a price to state. */
export function offerJsonLd(price: number | undefined, extra: Record<string, unknown> = {}) {
  return typeof price === 'number'
    ? { offers: { '@type': 'Offer', price, priceCurrency: 'INR', availability: 'https://schema.org/InStock', ...extra } }
    : {};
}

/** ₹ with Indian digit grouping. 18500 → "₹18,500" */
export function inr(n: number): string {
  return `₹${n.toLocaleString('en-IN')}`;
}
