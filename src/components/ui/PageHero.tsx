import { useEffect, useRef, useState, type ReactNode } from "react";
import { Link } from "react-router-dom";
import { ChevronRight, Volume2 } from "lucide-react";

interface Crumb {
  label: string;
  to?: string;
}

interface PageHeroProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  breadcrumb?: Crumb[];
  /** YouTube video ID (not a full URL) — when set, plays muted/looping as the hero background. */
  videoId?: string;
  /** Photos — when set (and no videoId), auto-advances as a crossfading hero background.
   * `position` is a CSS object-position value (e.g. "50% 20%") to keep the subject in frame
   * when the wide hero band crops a portrait/square source photo. Defaults to centered.
   * `fit: "contain"` shows the full photo uncropped (behind a blurred backdrop of itself) —
   * use it for portrait/low-res sources that would otherwise get blown up and cropped down
   * to a sliver by the wide, short hero band. Defaults to "cover". */
  images?: { src: string; position?: string; fit?: "cover" | "contain" }[];
  /** Extra content rendered below the subtitle, inside the hero (e.g. date/time pills). */
  children?: ReactNode;
}

function ImageCarousel({ images }: { images: { src: string; position?: string; fit?: "cover" | "contain" }[] }) {
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (images.length <= 1) return;
    const id = setInterval(() => setActive((i) => (i + 1) % images.length), 4500);
    return () => clearInterval(id);
  }, [images.length]);

  return (
    <>
      {images.map((image, i) => {
        const wrapClass = `absolute inset-0 transition-opacity duration-1000 ${
          i === active ? "opacity-100" : "opacity-0"
        }`;

        if (image.fit === "contain") {
          // Portrait/low-res sources: never crop the subject — show it whole, on top of
          // a softly blurred cover-crop of the same photo so there's no empty letterboxing.
          return (
            <div key={image.src} className={wrapClass}>
              <img
                src={image.src}
                alt=""
                aria-hidden
                className="absolute inset-0 h-full w-full scale-110 object-cover blur-2xl brightness-[0.55] saturate-125"
                style={{ objectPosition: image.position ?? "center" }}
              />
              <img
                src={image.src}
                alt=""
                className="absolute inset-0 h-full w-full object-contain"
                style={{ objectPosition: image.position ?? "center" }}
              />
            </div>
          );
        }

        return (
          <img
            key={image.src}
            src={image.src}
            alt=""
            className={`h-full w-full object-cover ${wrapClass}`}
            style={{ objectPosition: image.position ?? "center" }}
          />
        );
      })}
    </>
  );
}

function forcePlay(iframe: HTMLIFrameElement) {
  const send = (func: string) =>
    iframe.contentWindow?.postMessage(JSON.stringify({ event: "command", func, args: [] }), "*");
  // The player can take a moment after the iframe loads before it's listening —
  // fire a few times so a missed first attempt doesn't leave it stuck paused.
  [0, 300, 800, 1500].forEach((delay) => {
    setTimeout(() => {
      send("mute");
      send("playVideo");
    }, delay);
  });
}

export default function PageHero({ eyebrow, title, subtitle, breadcrumb, videoId, images, children }: PageHeroProps) {
  const [videoReady, setVideoReady] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const hasMedia = Boolean(videoId || images?.length);

  return (
    <div
      className={`relative overflow-hidden bg-gradient-to-br from-ink to-ink-deep py-16 text-white sm:py-20 ${
        hasMedia ? "min-h-[420px] sm:min-h-[520px]" : ""
      }`}
      style={videoId ? { containerType: "size" } : undefined}
    >
      {images?.length ? (
        <>
          <ImageCarousel images={images} />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink-deep/85 via-ink-deep/35 to-transparent" />
        </>
      ) : videoId ? (
        <>
          <iframe
            key={videoId}
            ref={iframeRef}
            src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&mute=1&loop=1&playlist=${videoId}&controls=0&showinfo=0&modestbranding=1&playsinline=1&disablekb=1&iv_load_policy=3&rel=0&fs=0&enablejsapi=1&origin=${encodeURIComponent(window.location.origin)}`}
            title="Background video"
            allow="autoplay; encrypted-media"
            onLoad={() => {
              setVideoReady(true);
              if (iframeRef.current) forcePlay(iframeRef.current);
            }}
            className={`pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transition-opacity duration-700 ${
              videoReady ? "opacity-100" : "opacity-0"
            }`}
            style={{
              width: "100cqw",
              height: "56.25cqw",
              minWidth: "177.78cqh",
              minHeight: "100cqh",
            }}
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink-deep/85 via-ink-deep/35 to-transparent" />
          <a
            href={`https://www.youtube.com/watch?v=${videoId}`}
            target="_blank"
            rel="noopener noreferrer"
            className="absolute right-4 top-4 z-10 flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1.5 text-xs font-medium text-white backdrop-blur hover:bg-white/25 sm:right-6 sm:top-6"
          >
            <Volume2 size={14} /> Watch with sound
          </a>
        </>
      ) : (
        <>
          <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 animate-float-slow rounded-full bg-primary/20 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-24 -left-24 h-72 w-72 animate-float-slower rounded-full bg-secondary/20 blur-3xl" />
        </>
      )}
      <div className="container-page relative">
        {breadcrumb && (
          <nav className="mb-6 flex items-center gap-1.5 text-xs text-white/50">
            {breadcrumb.map((crumb, i) => (
              <span key={crumb.label} className="flex items-center gap-1.5">
                {i > 0 && <ChevronRight size={12} />}
                {crumb.to ? (
                  <Link to={crumb.to} className="hover:text-white">
                    {crumb.label}
                  </Link>
                ) : (
                  <span className="text-white/80">{crumb.label}</span>
                )}
              </span>
            ))}
          </nav>
        )}
        {eyebrow && <p className="text-eyebrow mb-3 text-primary-light">{eyebrow}</p>}
        <h1 className="max-w-2xl text-[clamp(2.1rem,4.4vw,3.2rem)] text-white">{title}</h1>
        {subtitle && <p className="mt-4 max-w-xl text-white/70">{subtitle}</p>}
        {children}
      </div>
    </div>
  );
}
