import clsx from "clsx";

/** A small six-petal flower glyph used as a divider ornament. */
function LotusGlyph({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={clsx("shrink-0", className)} aria-hidden="true">
      <g fill="currentColor">
        <ellipse cx="16" cy="9.2" rx="3.1" ry="7" />
        <ellipse cx="16" cy="9.2" rx="3.1" ry="7" transform="rotate(60 16 16)" />
        <ellipse cx="16" cy="9.2" rx="3.1" ry="7" transform="rotate(120 16 16)" />
        <ellipse cx="16" cy="9.2" rx="3.1" ry="7" transform="rotate(180 16 16)" />
        <ellipse cx="16" cy="9.2" rx="3.1" ry="7" transform="rotate(240 16 16)" />
        <ellipse cx="16" cy="9.2" rx="3.1" ry="7" transform="rotate(300 16 16)" />
      </g>
      <circle cx="16" cy="16" r="2.3" fill="var(--color-ink-deep)" />
    </svg>
  );
}

/** A gold hairline-and-lotus divider, for breaking up dark devotional sections. */
export function LotusDivider({ className }: { className?: string }) {
  return (
    <div className={clsx("flex items-center justify-center gap-3 text-gold", className)} aria-hidden="true">
      <span className="h-px w-10 bg-gradient-to-r from-transparent to-gold/60 sm:w-14" />
      <LotusGlyph className="h-4 w-4" />
      <span className="h-px w-10 bg-gradient-to-l from-transparent to-gold/60 sm:w-14" />
    </div>
  );
}

/** An ornamental gold corner bracket. Flip with scale-x-[-1]/scale-y-[-1] for other corners. */
export function CornerFlourish({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={clsx("text-gold", className)} fill="none" aria-hidden="true">
      <path d="M3 34V14C3 7.9 7.9 3 14 3h20" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" opacity="0.8" />
      <path d="M3 44v-6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" opacity="0.4" />
      <path d="M44 3h6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" opacity="0.4" />
      <circle cx="11" cy="11" r="2.6" fill="currentColor" opacity="0.9" />
    </svg>
  );
}
