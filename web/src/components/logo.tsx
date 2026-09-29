/**
 * Brand mark: the Falcon Trails emblem (a falcon over a mountain ridge).
 * Placeholder artwork, served from /public as a small SVG; swap the file for
 * the final logo when it is designed.
 */
export function Mark({ className = 'size-9' }: { className?: string }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src="/ft-emblem.svg"
      alt=""
      width={64}
      height={64}
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
  return (
    <span className={`flex items-center gap-2.5 ${className}`}>
      <Mark className="size-9 shrink-0" />
      <span className="flex flex-col leading-none">
        <span
          className="text-[19px] font-bold tracking-tight"
          style={{ color: 'var(--color-gold-500)' }}
        >
          FALCON
        </span>
        <span
          className="text-[10.5px] font-semibold tracking-[0.22em]"
          style={{
            color: light ? 'var(--color-paper-200)' : 'var(--color-pine-700)',
          }}
        >
          TRAILS
        </span>
      </span>
    </span>
  );
}
