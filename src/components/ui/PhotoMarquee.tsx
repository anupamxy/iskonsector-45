import clsx from "clsx";

interface PhotoMarqueeProps {
  images: string[];
  reverse?: boolean;
  durationSeconds?: number;
}

/** An infinitely scrolling strip of photos. The image list is rendered twice back-to-back
 * and animated exactly one set-width to the left, so the loop point is seamless. Pauses on
 * hover/focus and is disabled entirely under prefers-reduced-motion (via motion-safe:). */
export default function PhotoMarquee({ images, reverse = false, durationSeconds = 42 }: PhotoMarqueeProps) {
  return (
    <div className="group overflow-hidden">
      <div
        className={clsx(
          "flex w-max gap-4 motion-safe:animate-marquee group-hover:[animation-play-state:paused] group-focus-within:[animation-play-state:paused]",
          reverse && "[animation-direction:reverse]",
        )}
        style={{ animationDuration: `${durationSeconds}s` }}
      >
        {[...images, ...images].map((src, i) => (
          <img
            key={`${src}-${i}`}
            src={src}
            alt="ISKCON Gurugram, Sector 45 — moments of devotion"
            loading="lazy"
            className="h-32 w-32 shrink-0 rounded-2xl object-cover shadow-[var(--shadow-card)] sm:h-44 sm:w-44 md:h-56 md:w-56"
          />
        ))}
      </div>
    </div>
  );
}
