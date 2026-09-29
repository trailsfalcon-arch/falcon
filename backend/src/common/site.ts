import { brand } from './brand';

/**
 * Public URLs for this install. The site origin comes from the company
 * profile (Settings → Company profile → Website), so build public URLs from
 * here rather than hardcoding a host.
 */

/** Public marketing site origin, e.g. https://falcontrails.in */
export function siteDomain(): string {
  return brand().website;
}

/**
 * Internal CRM origin, used to build links inside transactional email.
 *
 * Read from CRM_BASE_URL because the deployed origin is set per environment
 * (Render holds the production value). Without it, links point at the public
 * site, which serves the CRM at /login in the combined deployment.
 */
export function crmBaseUrl(configured?: string | null): string {
  return (configured || siteDomain()).replace(/\/+$/, '');
}

/** Rewrite a www URL onto the canonical host, leaving its path and query intact. */
export function toCanonicalHost(url: string): string {
  try {
    const u = new URL(url);
    const host = new URL(siteDomain()).hostname;
    if (u.hostname === `www.${host}`) {
      u.protocol = 'https:';
      u.hostname = host;
    }
    return u.toString();
  } catch {
    return url;
  }
}
