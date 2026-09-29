import manifestData from './page-manifest.json';

/** One planned page from the SEO manifest, with its Google Ads demand. */
export interface ManifestPage {
  url: string;
  title?: string;
  h1?: string;
  tier?: number;
  family?: string;
  primary?: string;
  impr?: number | null;
  clicks?: number | null;
  conv?: number | null;
  words?: string | null;
}

export const MANIFEST: ManifestPage[] = manifestData as unknown as ManifestPage[];

/** The homepage is not in the manifest file but is tracked like a manifest page. */
export const HOMEPAGE_ENTRY: ManifestPage = {
  url: '/',
  title: 'Kashmir & Ladakh Tour Packages | Falcon Trails — Srinagar-based Tour Operator',
  h1: 'Kashmir & Ladakh, planned by locals.',
  tier: 0,
  family: 'core-homepage',
  primary: 'ladakh tour package',
};
