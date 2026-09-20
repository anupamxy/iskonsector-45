import { useEffect, useMemo, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import clsx from "clsx";
import Button from "./Button";
import { siteInfo } from "../../data/site";

interface HeroBannerProps {
  media: string[];
}

type Slide = { kind: "video"; src: string } | { kind: "image"; src: string };

const heroFacts = [
  { value: "1966", label: "ISKCON Founded" },
  { value: "700+", label: "Centers Worldwide" },
  { value: "5", label: "Seva Programs Here" },
];

/** Fills the full width of the media strip with `object-cover` — these banners are
 * natively wide (~2.5:1), so at most viewport widths this only trims a little off
 * the top/bottom (or the sides on narrow phones), never leaving empty letterbox bars. */
function SlideMedia({ slide, isActive }: { slide: Slide; isActive: boolean }) {
  const wrapClass = clsx(
    "absolute inset-0 transition-opacity duration-1000 ease-in-out",
    isActive ? "z-10 opacity-100" : "z-0 opacity-0 pointer-events-none",
  );

  if (slide.kind === "video") {
    return (
      <div className={wrapClass}>
        <video src={slide.src} className="h-full w-full object-cover" autoPlay loop muted playsInline />
      </div>
    );
  }

  return (
    <div className={wrapClass}>
      <img src={slide.src} alt="" className="h-full w-full object-cover" />
    </div>
  );
}

function HeroCopy() {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <p className="text-eyebrow text-primary-light">Welcome to</p>
        <h2 className="mt-1 text-[clamp(1.4rem,2.6vw,1.9rem)] text-white">{siteInfo.templeName}</h2>
        <p className="mt-1 max-w-xl text-sm text-white/65">{siteInfo.tagline}</p>
        <div className="mt-4 flex flex-wrap gap-2.5">
          {heroFacts.map((fact) => (
            <div key={fact.label} className="rounded-xl border border-white/15 bg-white/5 px-3.5 py-2">
              <b className="font-display block text-lg leading-none text-white">{fact.value}</b>
              <span className="text-[0.6rem] uppercase tracking-wider text-white/50">{fact.label}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="flex flex-wrap gap-3">
        <Button to="/contact" size="md">
          Plan Your Visit
        </Button>
        <Button href={siteInfo.donateLink} target="_blank" rel="noopener noreferrer" variant="ghost" size="md">
          Offer Seva
        </Button>
      </div>
    </div>
  );
}

export default function HeroBanner({ media }: HeroBannerProps) {
  const [active, setActive] = useState(0);

  const slides: Slide[] = useMemo(
    () =>
      media
        .filter(Boolean)
        .map((src) => (/\.(mp4|webm|mov)$/i.test(src) ? { kind: "video" as const, src } : { kind: "image" as const, src })),
    [media],
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

  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-ink to-ink-deep">
      <div className="relative aspect-[5/2] w-full overflow-hidden bg-ink-deep">
        {slides.map((slide, i) => (
          <SlideMedia key={slide.src} slide={slide} isActive={i === active} />
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
        <HeroCopy />

        {showNav && (
          <div className="mt-4 flex justify-center gap-1.5">
            {slides.map((slide, i) => (
              <button
                key={`dot-${slide.src}`}
                type="button"
                onClick={() => setActive(i)}
                aria-label="Show slide"
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
