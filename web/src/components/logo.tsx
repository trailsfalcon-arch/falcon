/**
 * Brand mark: the Falcon Trails emblem from falcontrails.in (the falcon in a
 * gold ring over a teal arc), served from /public as a small SVG.
 */
export function Mark({ className = 'size-9' }: { className?: string }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src="/ft-emblem.svg"
      alt=""
      width={40}
      height={40}
      className={`${className} object-contain`}
      aria-hidden
    />
  );
}

export function Wordmark({
  light = false,
  className = '',
}: {
  light?: boolean;
  className?: string;
}) {
  // As on falcontrails.in: the emblem, then FALCON TRAILS in spaced Marcellus.
  return (
    <span className={`flex items-center gap-2.5 ${className}`}>
      <Mark className="size-10 shrink-0" />
      <span
        className="display whitespace-nowrap text-[18px] leading-none tracking-[0.2em]"
        style={{ color: light ? 'var(--color-gold-500)' : 'var(--color-gold-700)' }}
      >
        FALCON TRAILS
      </span>
    </span>
  );
}
