import { SITE } from '@/lib/site';

/**
 * Brand mark: a placeholder "FT" monogram until the real Falcon Trails logo
 * exists. Inline SVG, so it costs no request. Replace this component and
 * src/app/icon.svg / apple-icon.png together when the logo is ready.
 */
export function Mark({ className = 'size-9' }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden>
      <rect width="64" height="64" rx="12" fill="#16294F" />
      <path d="M8 50 L24 30 L32 38 L42 24 L56 50 Z" fill="#C9A961" opacity="0.35" />
      <text
        x="32"
        y="40"
        textAnchor="middle"
        fontFamily="Georgia, serif"
        fontWeight={700}
        fontSize={26}
        fill="#C9A961"
      >
        FT
      </text>
    </svg>
  );
}

export function Wordmark({
  light = false,
  className = '',
}: {
  light?: boolean;
  className?: string;
}) {
  const [first, ...rest] = SITE.name.split(/\s+/);
  return (
    <span className={`flex items-center gap-2.5 ${className}`}>
      <Mark className="size-9 shrink-0" />
      <span className="flex flex-col leading-none">
        <span
          className="text-[19px] font-bold tracking-tight"
          style={{ color: 'var(--color-gold-500)' }}
        >
          {first.toUpperCase()}
        </span>
        <span
          className="text-[10.5px] font-semibold tracking-[0.22em]"
          style={{
            color: light ? 'var(--color-paper-200)' : 'var(--color-pine-700)',
          }}
        >
          {rest.join(' ').toUpperCase()}
        </span>
      </span>
    </span>
  );
}
