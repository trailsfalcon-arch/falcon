/**
 * The business identity this install runs under.
 *
 * Loaded from the CompanyProfile row (Settings → Company profile) by
 * BrandService at startup, after every profile save, and once a minute, so a
 * licensed install is rebranded from the CRM without touching code.
 *
 * `brand()` is synchronous so PDF templates, prompt builders and other plain
 * functions can read it without dependency injection. Until the first load it
 * returns DEFAULT_BRAND.
 */
export interface Brand {
  brandName: string;
  legalName: string;
  tagline: string;
  address: string;
  city: string;
  state: string;
  stateCode: string;
  pincode: string;
  country: string;
  phone: string;
  /** International digits only, for wa.me links. Empty when not set. */
  whatsapp: string;
  email: string;
  /** Canonical public site origin, no trailing slash. */
  website: string;
  /** Hostname of `website`, e.g. falcontrails.in */
  host: string;
  /** Ads landing pages origin, no trailing slash. Empty when not set. */
  landerUrl: string;
  operatingRegion: string;
  documentPrefix: string;
  logoUrl: string;
  instagramUrl: string;
  facebookUrl: string;
  gstin: string;
  pan: string;
  bankName: string;
  accountNumber: string;
  ifscCode: string;
  accountHolder: string;
  upiId: string;
}

export const DEFAULT_BRAND: Brand = {
  brandName: 'Falcon Trails',
  legalName: 'Falcon Trails',
  tagline: '',
  address: '',
  city: 'Srinagar',
  state: 'Jammu & Kashmir',
  stateCode: '01',
  pincode: '190001',
  country: 'India',
  phone: '',
  whatsapp: '',
  email: 'info@falcontrails.in',
  website: 'https://falcontrails.in',
  host: 'falcontrails.in',
  landerUrl: 'https://go.falcontrails.in',
  operatingRegion: 'Kashmir, Ladakh & Jammu',
  documentPrefix: 'FT',
  logoUrl: '',
  instagramUrl: '',
  facebookUrl: '',
  gstin: '',
  pan: '',
  bankName: '',
  accountNumber: '',
  ifscCode: '',
  accountHolder: '',
  upiId: '',
};

let current: Brand = DEFAULT_BRAND;

export function brand(): Brand {
  return current;
}

function origin(url: string | null | undefined): string {
  const raw = (url ?? '').trim();
  if (!raw) return '';
  try {
    const u = new URL(/^https?:\/\//i.test(raw) ? raw : `https://${raw}`);
    return `${u.protocol}//${u.host}`;
  } catch {
    return '';
  }
}

type ProfileRow = Partial<Record<keyof Brand, string | null>> & Record<string, unknown>;

/** Build a Brand from a CompanyProfile row, falling back per field. */
export function brandFromProfile(row: ProfileRow | null | undefined): Brand {
  if (!row) return DEFAULT_BRAND;
  const text = (key: keyof Brand) => {
    const v = row[key];
    return typeof v === 'string' ? v.trim() : '';
  };
  const website = origin(text('website')) || DEFAULT_BRAND.website;
  const brandName = text('brandName') || DEFAULT_BRAND.brandName;
  const prefix = text('documentPrefix').toUpperCase().replace(/[^A-Z0-9]/g, '');
  return {
    brandName,
    legalName: text('legalName') || brandName,
    tagline: text('tagline'),
    address: text('address'),
    city: text('city'),
    state: text('state'),
    stateCode: text('stateCode'),
    pincode: text('pincode'),
    country: text('country') || DEFAULT_BRAND.country,
    phone: text('phone'),
    whatsapp: text('whatsapp').replace(/[^0-9]/g, ''),
    email: text('email'),
    website,
    host: new URL(website).hostname.replace(/^www\./, ''),
    landerUrl: origin(text('landerUrl')),
    operatingRegion: text('operatingRegion') || DEFAULT_BRAND.operatingRegion,
    documentPrefix: prefix || DEFAULT_BRAND.documentPrefix,
    logoUrl: text('logoUrl'),
    instagramUrl: text('instagramUrl'),
    facebookUrl: text('facebookUrl'),
    gstin: text('gstin'),
    pan: text('pan'),
    bankName: text('bankName'),
    accountNumber: text('accountNumber'),
    ifscCode: text('ifscCode'),
    accountHolder: text('accountHolder'),
    upiId: text('upiId'),
  };
}

export function setBrand(next: Brand): void {
  current = next;
}

/** "Srinagar, Jammu & Kashmir 190001" style line; skips blank parts. */
export function brandAddressLine(b: Brand = brand()): string {
  const place = [b.address, b.city, b.state].filter(Boolean).join(', ');
  return [place, b.pincode].filter(Boolean).join(' ');
}

/** "phone / email" helpline text; skips blank parts. */
export function brandContactLine(b: Brand = brand()): string {
  return [b.phone, b.email].filter(Boolean).join(' / ');
}

/** Fields safe to show anyone (no bank, tax or internal settings). */
export function publicBrand(b: Brand = brand()) {
  return {
    brandName: b.brandName,
    legalName: b.legalName,
    tagline: b.tagline,
    city: b.city,
    state: b.state,
    country: b.country,
    phone: b.phone,
    whatsapp: b.whatsapp,
    email: b.email,
    website: b.website,
    host: b.host,
    landerUrl: b.landerUrl,
    operatingRegion: b.operatingRegion,
    logoUrl: b.logoUrl,
    instagramUrl: b.instagramUrl,
    facebookUrl: b.facebookUrl,
  };
}
