import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";
import clsx from "clsx";
import Button from "./Button";
import type { Festival } from "../../data/festivals";

interface FestivalCountdownCarouselProps {
  festivals: Festival[];
  videoSrc?: string;
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
    <div className="flex w-12 flex-col items-center rounded-lg bg-black/40 py-1.5 backdrop-blur sm:w-16 sm:rounded-xl sm:py-2 md:w-20">
      <span className="font-display text-lg text-white sm:text-2xl md:text-3xl">{String(value).padStart(2, "0")}</span>
      <span className="text-[0.55rem] uppercase tracking-wider text-white/70 sm:text-[0.6rem]">{label}</span>
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
      className="relative flex h-[240px] w-full cursor-pointer flex-col justify-end overflow-hidden bg-ink-deep sm:h-[420px] md:h-[500px] lg:h-[560px]"
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

      <div className="container-page relative flex flex-col gap-2 pb-4 sm:gap-4 sm:pb-10 md:pb-14">
        {countdown && !countdown.isPast && (
          <div className="flex flex-col gap-1 sm:gap-2">
            <span className="text-eyebrow text-[0.6rem] text-primary-light sm:text-[0.72rem]">Begins In</span>
            <div className="flex gap-1.5 sm:gap-2.5">
              <CountdownBox value={countdown.days} label="Days" />
              <CountdownBox value={countdown.hours} label="Hrs" />
              <CountdownBox value={countdown.minutes} label="Min" />
              <CountdownBox value={countdown.seconds} label="Sec" />
            </div>
          </div>
        )}

        <div onClick={(e) => e.stopPropagation()}>
          <div className="flex flex-wrap gap-2 sm:hidden">
            <Button to={`/festivals/${festival.slug}`} size="md">
              View Details
            </Button>
            <Button to="/donate" variant="ghost" size="md">
              Offer Seva
            </Button>
          </div>
          <div className="hidden flex-wrap gap-3 sm:flex">
            <Button to={`/festivals/${festival.slug}`} size="lg">
              View Details
            </Button>
            <Button to="/donate" variant="ghost" size="lg">
              Offer Seva
            </Button>
          </div>
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

interface VideoSlideProps {
  src: string;
  showNav: boolean;
  onPrev: () => void;
  onNext: () => void;
}

function VideoSlide({ src, showNav, onPrev, onNext }: VideoSlideProps) {
  return (
    <div className="relative flex h-[240px] w-full flex-col justify-end overflow-hidden bg-ink-deep sm:h-[420px] md:h-[500px] lg:h-[560px]">
      <video src={src} className="absolute inset-0 h-full w-full object-cover" autoPlay loop muted playsInline />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

      {showNav && (
        <>
          <button
            type="button"
            onClick={onPrev}
            aria-label="Previous slide"
            className="absolute left-4 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/15 text-white backdrop-blur transition-colors hover:bg-white/25"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            type="button"
            onClick={onNext}
            aria-label="Next slide"
            className="absolute right-4 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/15 text-white backdrop-blur transition-colors hover:bg-white/25"
          >
            <ChevronRight size={20} />
          </button>
        </>
      )}
    </div>
  );
}

export default function FestivalCountdownCarousel({ festivals, videoSrc }: FestivalCountdownCarouselProps) {
  const [active, setActive] = useState(0);
  const videoOffset = videoSrc ? 1 : 0;
  const slideCount = festivals.length + videoOffset;

  useEffect(() => {
    if (slideCount <= 1) return;
    const id = setInterval(() => setActive((i) => (i + 1) % slideCount), 7000);
    return () => clearInterval(id);
  }, [slideCount]);

  if (slideCount === 0) return null;

  const showNav = slideCount > 1;
  const goPrev = () => setActive((i) => (i - 1 + slideCount) % slideCount);
  const goNext = () => setActive((i) => (i + 1) % slideCount);

  return (
    <div className="relative">
      {videoSrc && (
        <div className={active === 0 ? "block" : "hidden"}>
          <VideoSlide src={videoSrc} showNav={showNav} onPrev={goPrev} onNext={goNext} />
        </div>
      )}
      {festivals.map((festival, i) => {
        const slideIndex = i + videoOffset;
        return (
          <div key={festival.slug} className={slideIndex === active ? "block" : "hidden"}>
            <Slide festival={festival} showNav={showNav} onPrev={goPrev} onNext={goNext} />
          </div>
        );
      })}

      {showNav && (
        <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-1.5">
          {videoSrc && (
            <button
              type="button"
              onClick={() => setActive(0)}
              aria-label="Show intro video"
              className={clsx(
                "h-1.5 rounded-full bg-white transition-all",
                active === 0 ? "w-6 opacity-100" : "w-1.5 opacity-50",
              )}
            />
          )}
          {festivals.map((festival, i) => {
            const slideIndex = i + videoOffset;
            return (
              <button
                key={festival.slug}
                type="button"
                onClick={() => setActive(slideIndex)}
                aria-label={`Show ${festival.name}`}
                className={clsx(
                  "h-1.5 rounded-full bg-white transition-all",
                  slideIndex === active ? "w-6 opacity-100" : "w-1.5 opacity-50",
                )}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}
