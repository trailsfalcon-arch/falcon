'use client';

import { useBrand } from '@/lib/brand';

/** The business name from Settings → Company profile. */
export function BrandName({ upper = false }: { upper?: boolean }) {
  const { brandName } = useBrand();
  return <>{upper ? brandName.toUpperCase() : brandName}</>;
}

/** The public site host, e.g. falcontrails.in */
export function BrandHost() {
  const { host } = useBrand();
  return <>{host}</>;
}

/** Social handle: from the Instagram URL, else the brand name without spaces. */
export function BrandHandle() {
  const { instagramUrl, brandName } = useBrand();
  const fromUrl = instagramUrl.split('/').filter(Boolean).pop();
  return <>{fromUrl || brandName.toLowerCase().replace(/[^a-z0-9]/g, '')}</>;
}

/** Two-tone wordmark: first word, then the rest ("Falcon" + "TRAILS"). */
export function BrandWordmark({
  firstClassName,
  restClassName,
}: {
  firstClassName: string;
  restClassName: string;
}) {
  const { brandName } = useBrand();
  const [first, ...rest] = brandName.trim().split(/\s+/);
  return (
    <>
      <span className={firstClassName}>{first}</span>
      {rest.length > 0 && <span className={restClassName}>{rest.join(' ')}</span>}
    </>
  );
}

/** Up to two initials for avatar tiles ("FT"). */
export function BrandInitials() {
  const { brandName } = useBrand();
  const initials = brandName
    .trim()
    .split(/\s+/)
    .map((w) => w[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();
  return <>{initials}</>;
}
