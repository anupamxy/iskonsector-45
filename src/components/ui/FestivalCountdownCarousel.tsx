import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";
import clsx from "clsx";
import Button from "./Button";
import type { Festival } from "../../data/festivals";

interface FestivalCountdownCarouselProps {
  festivals: Festival[];
}

function useCountdown(target?: string) {
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    if (!target) return;
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, [target]);

  return useMemo(() => {
    if (!target) return null;
    const targetTime = new Date(target).getTime();
    const diff = targetTime - now;
    if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0, isPast: true };

    // "Days" is plain calendar-date subtraction (e.g. Sept 19 minus Aug 7 = 43),
    // independent of the festival's specific start time — matching how people
    // actually count "days apart," not a raw 24h-bucket countdown.
    const t = new Date(targetTime);
    const startOfTargetDay = new Date(t.getFullYear(), t.getMonth(), t.getDate()).getTime();
    const n = new Date(now);
    const startOfNowDay = new Date(n.getFullYear(), n.getMonth(), n.getDate()).getTime();
    const days = Math.round((startOfTargetDay - startOfNowDay) / (1000 * 60 * 60 * 24));

    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);
    return { days, hours, minutes, seconds, isPast: false };
  }, [target, now]);
}

function CountdownBox({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex w-16 flex-col items-center rounded-xl bg-black/40 py-2 backdrop-blur sm:w-20">
      <span className="font-display text-2xl text-white sm:text-3xl">{String(value).padStart(2, "0")}</span>
      <span className="text-[0.6rem] uppercase tracking-wider text-white/70">{label}</span>
    </div>
  );
}

interface SlideProps {
  festival: Festival;
  showNav: boolean;
  onPrev: () => void;
  onNext: () => void;
}

function Slide({ festival, showNav, onPrev, onNext }: SlideProps) {
  const countdown = useCountdown(festival.date);
  const navigate = useNavigate();

  return (
    <div
      className="relative flex h-[440px] w-full cursor-pointer flex-col justify-end overflow-hidden bg-ink-deep sm:h-[500px] md:h-[560px]"
      onClick={() => navigate(`/festivals/${festival.slug}`)}
    >
      {festival.bannerImage && (
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url(${festival.bannerImage})`,
            backgroundSize: "cover",
            backgroundPosition: festival.bannerPosition ?? "center",
          }}
        />
      )}
      {/* Scrim so the countdown/buttons stay legible over the photo. */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent" />

      <div className="container-page relative flex flex-col gap-4 pb-10 sm:pb-14">
        {countdown && !countdown.isPast && (
          <div className="flex flex-col gap-2">
            <span className="text-eyebrow text-primary-light">Begins In</span>
            <div className="flex gap-2.5">
              <CountdownBox value={countdown.days} label="Days" />
              <CountdownBox value={countdown.hours} label="Hrs" />
              <CountdownBox value={countdown.minutes} label="Min" />
              <CountdownBox value={countdown.seconds} label="Sec" />
            </div>
          </div>
        )}

        <div className="flex flex-wrap gap-3" onClick={(e) => e.stopPropagation()}>
          <Button to={`/festivals/${festival.slug}`} size="lg">
            View Details
          </Button>
          <Button to="/donate" variant="ghost" size="lg">
            Offer Seva
          </Button>
        </div>
      </div>

      {showNav && (
        <>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onPrev();
            }}
            aria-label="Previous festival"
            className="absolute left-4 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/15 text-white backdrop-blur transition-colors hover:bg-white/25"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onNext();
            }}
            aria-label="Next festival"
            className="absolute right-4 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/15 text-white backdrop-blur transition-colors hover:bg-white/25"
          >
            <ChevronRight size={20} />
          </button>
        </>
      )}
    </div>
  );
}

export default function FestivalCountdownCarousel({ festivals }: FestivalCountdownCarouselProps) {
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (festivals.length <= 1) return;
    const id = setInterval(() => setActive((i) => (i + 1) % festivals.length), 7000);
    return () => clearInterval(id);
  }, [festivals.length]);

  if (festivals.length === 0) return null;

  const goPrev = () => setActive((i) => (i - 1 + festivals.length) % festivals.length);
  const goNext = () => setActive((i) => (i + 1) % festivals.length);

  return (
    <div className="relative">
      {festivals.map((festival, i) => (
        <div key={festival.slug} className={i === active ? "block" : "hidden"}>
          <Slide festival={festival} showNav={festivals.length > 1} onPrev={goPrev} onNext={goNext} />
        </div>
      ))}

      {festivals.length > 1 && (
        <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-1.5">
          {festivals.map((festival, i) => (
            <button
              key={festival.slug}
              type="button"
              onClick={() => setActive(i)}
              aria-label={`Show ${festival.name}`}
              className={clsx(
                "h-1.5 rounded-full bg-white transition-all",
                i === active ? "w-6 opacity-100" : "w-1.5 opacity-50",
              )}
            />
          ))}
        </div>
      )}
    </div>
  );
}
