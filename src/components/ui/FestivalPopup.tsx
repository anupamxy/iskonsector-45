import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Link } from "react-router-dom";
import { X, Sparkles, PartyPopper } from "lucide-react";
import CountdownRow from "./CountdownRow";
import { getUpcomingHomeFestivals } from "../../data/festivals";

const STORAGE_KEY = "festival-popup-dismissed-slug";
const SHOW_DELAY_MS = 1400;
const EXIT_DURATION_MS = 300;

/** A one-time, dismissible welcome popup announcing the next upcoming festival.
 * Shown once per festival (tracked in localStorage) — closing it, or visiting once,
 * won't show it again until a different festival becomes the soonest upcoming one. */
export default function FestivalPopup() {
  const festival = getUpcomingHomeFestivals()[0];
  const [open, setOpen] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!festival) return;
    try {
      if (localStorage.getItem(STORAGE_KEY) === festival.slug) return;
    } catch {
      // localStorage unavailable (private browsing, blocked storage) — show every time.
    }
    const timer = setTimeout(() => {
      setOpen(true);
      requestAnimationFrame(() => setVisible(true));
    }, SHOW_DELAY_MS);
    return () => clearTimeout(timer);
  }, [festival]);

  function close() {
    setVisible(false);
    setTimeout(() => setOpen(false), EXIT_DURATION_MS);
    if (festival) {
      try {
        localStorage.setItem(STORAGE_KEY, festival.slug);
      } catch {
        // Ignore — worst case it shows again next visit.
      }
    }
  }

  if (!open || !festival) return null;

  return createPortal(
    <div
      className={`fixed inset-0 z-[200] flex items-center justify-center bg-ink-deep/70 p-4 backdrop-blur-sm transition-opacity duration-300 ${
        visible ? "opacity-100" : "opacity-0"
      }`}
      role="dialog"
      aria-modal="true"
      aria-label={`${festival.name} — upcoming festival`}
      onClick={close}
    >
      <div
        className={`relative w-full max-w-sm overflow-hidden rounded-[var(--radius-lg)] bg-gradient-to-br from-ink to-ink-deep text-white shadow-[0_30px_80px_-20px_rgba(0,0,0,0.65)] transition-all duration-300 ${
          visible ? "translate-y-0 scale-100 opacity-100" : "translate-y-4 scale-95 opacity-0"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="pointer-events-none absolute -right-12 -top-12 h-44 w-44 animate-float-slow rounded-full bg-primary/30 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-14 -left-12 h-44 w-44 animate-float-slower rounded-full bg-gold/25 blur-3xl" />
        <Sparkles
          size={14}
          className="pointer-events-none absolute left-7 top-6 animate-glow-pulse text-gold/80"
          style={{ animationDelay: "0.3s" }}
        />
        <Sparkles
          size={10}
          className="pointer-events-none absolute right-16 top-12 animate-glow-pulse text-primary-light/80"
          style={{ animationDelay: "1s" }}
        />

        <button
          type="button"
          onClick={close}
          aria-label="Close"
          className="absolute right-4 top-4 z-20 flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
        >
          <X size={18} />
        </button>

        {festival.bannerImage && (
          <div className="relative h-36 w-full overflow-hidden">
            <img
              src={festival.bannerImage}
              alt=""
              aria-hidden
              className="h-full w-full object-cover"
              style={{ objectPosition: festival.bannerPosition ?? "center" }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/20 to-transparent" />
          </div>
        )}

        <div className="relative px-7 pb-7 pt-5 text-center">
          <div className="relative mx-auto mb-3 flex h-14 w-14 items-center justify-center">
            <span className="absolute inset-0 animate-glow-pulse rounded-full bg-gold/20" />
            <span className="relative flex h-12 w-12 items-center justify-center rounded-full bg-gold/15 text-gold">
              <Sparkles size={20} />
            </span>
          </div>

          <p className="text-eyebrow text-primary-light">Upcoming Festival</p>
          <h3 className="mt-2 font-display text-2xl text-white">{festival.name}</h3>
          {festival.tagline && <p className="mt-2 text-sm leading-relaxed text-white/70">{festival.tagline}</p>}

          <CountdownRow target={festival.date} className="mt-5 flex flex-col items-center" />

          <div className="mt-6 flex flex-col items-center gap-3">
            <Link
              to={`/festivals/${festival.slug}`}
              onClick={close}
              className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-br from-primary to-primary-light px-6 py-3 text-sm font-semibold text-white shadow-[var(--shadow-cta)] transition-transform hover:-translate-y-0.5"
            >
              <PartyPopper size={16} /> View Celebration
            </Link>
            <button type="button" onClick={close} className="text-sm font-medium text-white/60 hover:text-white">
              Maybe later
            </button>
          </div>
        </div>
      </div>
    </div>,
    document.body,
  );
}
