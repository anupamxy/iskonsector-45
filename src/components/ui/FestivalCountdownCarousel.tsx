import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, ChevronRight, MapPin } from "lucide-react";
import clsx from "clsx";
import Button from "./Button";
import CountdownRow from "./CountdownRow";
import { siteInfo } from "../../data/site";
import type { Festival } from "../../data/festivals";

interface FestivalCountdownCarouselProps {
  festivals: Festival[];
  videoSrc?: string;
}

type CarouselSlide = { type: "video" } | { type: "festival"; festival: Festival };

interface SlideMediaProps {
  slide: CarouselSlide;
  isActive: boolean;
  videoSrc?: string;
  onSelect: () => void;
}

function SlideMedia({ slide, isActive, videoSrc, onSelect }: SlideMediaProps) {
  const wrapClass = clsx(
    "absolute inset-0 transition-opacity duration-1000 ease-in-out",
    isActive ? "z-10 opacity-100" : "z-0 opacity-0 pointer-events-none",
  );

  if (slide.type === "video") {
    if (!videoSrc) return null;
    return (
      <div className={wrapClass}>
        <video
          src={videoSrc}
          aria-hidden
          className="absolute inset-0 h-full w-full scale-110 object-cover object-center blur-2xl brightness-[0.55] saturate-125"
          autoPlay
          loop
          muted
          playsInline
        />
        <video
          src={videoSrc}
          className="absolute inset-0 h-full w-full object-contain p-3 drop-shadow-[0_18px_40px_rgba(0,0,0,0.45)] sm:p-6"
          autoPlay
          loop
          muted
          playsInline
        />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/35 to-transparent" />
      </div>
    );
  }

  const festival = slide.festival;
  if (!festival?.bannerImage) return null;

  return (
    <div className={clsx(wrapClass, "cursor-pointer")} onClick={onSelect}>
      <img
        src={festival.bannerImage}
        alt=""
        aria-hidden
        className="absolute inset-0 h-full w-full scale-110 object-cover object-center blur-2xl brightness-[0.55] saturate-125"
      />
      <img
        src={festival.bannerImage}
        alt={festival.name}
        className="absolute inset-0 h-full w-full object-contain p-3 drop-shadow-[0_18px_40px_rgba(0,0,0,0.45)] sm:p-6"
      />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/35 to-transparent" />
    </div>
  );
}

function InfoBar({ slide }: { slide: CarouselSlide }) {
  const festival = slide.type === "festival" ? slide.festival : undefined;

  if (slide.type === "video") {
    return (
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-eyebrow text-primary-light">{siteInfo.templeName}</p>
          <h2 className="mt-1 text-[clamp(1.4rem,2.6vw,1.9rem)] text-white">Welcome, Hare Krishna</h2>
          <p className="mt-1 max-w-md text-sm text-white/65">{siteInfo.tagline}</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Button to="/contact" size="md">
            Plan Your Visit
          </Button>
          <Button to="/donate" variant="ghost" size="md">
            Offer Seva
          </Button>
        </div>
      </div>
    );
  }

  if (!festival) return null;

  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <p className="flex items-center gap-1.5 text-eyebrow text-primary-light">
          <MapPin size={12} /> ISKCON Gurugram, Sector 45
        </p>
        <h2 className="mt-1 text-[clamp(1.4rem,2.6vw,1.9rem)] text-white">{festival.name}</h2>
        <CountdownRow target={festival.date} className="mt-3" />
      </div>
      <div className="flex flex-wrap gap-3">
        <Button to={`/festivals/${festival.slug}`} size="md">
          View Details
        </Button>
        <Button to="/donate" variant="ghost" size="md">
          Offer Seva
        </Button>
      </div>
    </div>
  );
}

export default function FestivalCountdownCarousel({ festivals, videoSrc }: FestivalCountdownCarouselProps) {
  const [active, setActive] = useState(0);
  const navigate = useNavigate();

  const slides: CarouselSlide[] = useMemo(
    () => [
      ...(videoSrc ? [{ type: "video" as const }] : []),
      ...festivals.map((festival) => ({ type: "festival" as const, festival })),
    ],
    [festivals, videoSrc],
  );

  useEffect(() => {
    if (slides.length <= 1) return;
    const id = setInterval(() => setActive((i) => (i + 1) % slides.length), 7000);
    return () => clearInterval(id);
  }, [slides.length]);

  if (slides.length === 0) return null;

  const showNav = slides.length > 1;
  const goPrev = () => setActive((i) => (i - 1 + slides.length) % slides.length);
  const goNext = () => setActive((i) => (i + 1) % slides.length);
  const current = slides[active];

  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-ink to-ink-deep">
      <div className="relative h-[220px] w-full overflow-hidden bg-ink-deep sm:h-[340px] md:h-[400px] lg:h-[460px]">
        {slides.map((slide, i) => (
          <SlideMedia
            key={slide.type === "video" ? "intro-video" : slide.festival.slug}
            slide={slide}
            isActive={i === active}
            videoSrc={videoSrc}
            onSelect={() => slide.type === "festival" && navigate(`/festivals/${slide.festival.slug}`)}
          />
        ))}

        {showNav && (
          <>
            <button
              type="button"
              onClick={goPrev}
              aria-label="Previous slide"
              className="absolute left-3 top-1/2 z-20 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/15 text-white backdrop-blur transition-colors hover:bg-white/25 sm:left-4 sm:h-10 sm:w-10"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              type="button"
              onClick={goNext}
              aria-label="Next slide"
              className="absolute right-3 top-1/2 z-20 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/15 text-white backdrop-blur transition-colors hover:bg-white/25 sm:right-4 sm:h-10 sm:w-10"
            >
              <ChevronRight size={20} />
            </button>
          </>
        )}
      </div>

      <div className="container-page py-5 sm:py-6">
        <InfoBar slide={current} />

        {showNav && (
          <div className="mt-4 flex justify-center gap-1.5">
            {slides.map((slide, i) => (
              <button
                key={slide.type === "video" ? "dot-intro-video" : `dot-${slide.festival.slug}`}
                type="button"
                onClick={() => setActive(i)}
                aria-label={slide.type === "video" ? "Show intro video" : `Show ${slide.festival.name}`}
                className={clsx(
                  "h-1.5 rounded-full bg-white transition-all",
                  i === active ? "w-6 opacity-100" : "w-1.5 opacity-40 hover:opacity-70",
                )}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
