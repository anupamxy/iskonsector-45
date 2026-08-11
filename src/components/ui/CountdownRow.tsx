import { useCountdown } from "../../lib/useCountdown";

function CountdownBox({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex w-12 flex-col items-center rounded-xl bg-white/10 py-2 sm:w-16">
      <span className="font-display text-lg text-white sm:text-2xl">{String(value).padStart(2, "0")}</span>
      <span className="text-[0.6rem] uppercase tracking-wider text-white/60">{label}</span>
    </div>
  );
}

/** Live "Begins In" countdown to a festival's `date`. Renders nothing once the
 * moment has passed, or when there's no date to count down to. Used consistently
 * everywhere a festival's countdown appears — the home hero, the festivals listing
 * strip, and each festival's own detail page — so the timer looks the same site-wide. */
export default function CountdownRow({
  target,
  className,
  showLabel = true,
}: {
  target?: string;
  className?: string;
  showLabel?: boolean;
}) {
  const countdown = useCountdown(target);
  if (!countdown || countdown.isPast) return null;

  return (
    <div className={className}>
      {showLabel && <p className="text-eyebrow mb-2 text-primary-light">Begins In</p>}
      <div className="flex gap-1.5 sm:gap-2.5">
        <CountdownBox value={countdown.days} label="Days" />
        <CountdownBox value={countdown.hours} label="Hrs" />
        <CountdownBox value={countdown.minutes} label="Min" />
        <CountdownBox value={countdown.seconds} label="Sec" />
      </div>
    </div>
  );
}
