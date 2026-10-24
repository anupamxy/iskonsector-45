import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Link } from "react-router-dom";
import { X, Flame, Sparkles, ArrowRight } from "lucide-react";
import CountdownRow from "./CountdownRow";
import { getFestival, getUpcomingHomeFestivals, isFestivalToday } from "../../data/festivals";

const SLUG = "kartik-damodar-month";
const STORAGE_KEY = "kartik-popup-dismissed-2026";
const SHOW_DELAY_MS = 1400;
const EXIT_DURATION_MS = 300;

/** Staggered rising embers behind the card — fixed positions/timings (not random)
 * so the layout is stable across renders and hydration. */
const EMBERS = [
  { left: "8%", delay: "0s", duration: "4.3s" },
  { left: "22%", delay: "1.4s", duration: "5.1s" },
  { left: "40%", delay: "0.6s", duration: "4.7s" },
  { left: "60%", delay: "2.1s", duration: "5.4s" },
  { left: "78%", delay: "1s", duration: "4.5s" },
  { left: "92%", delay: "2.6s", duration: "5s" },
];

/** A dedicated, more festive welcome popup for Kartik Damodar month — the one
 * occasion on the calendar that runs a full month, so it gets a richer, more
 * ceremonial treatment than the standard one-shot FestivalPopup (rising lamp
 * embers, a flickering diya, a live "Deepdaan" indicator once the month is
 * underway). Shown once per visitor (tracked in localStorage) for as long as
 * Kartik month is the soonest/current home-hero festival; FestivalPopup defers
 * to this one for the same slug so only one popup ever shows. */
export default function KartikMassPopup() {
  const isCurrent = getUpcomingHomeFestivals()[0]?.slug === SLUG;
  const festival = getFestival(SLUG);
  const [open, setOpen] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!isCurrent || !festival) return;
    try {
      if (localStorage.getItem(STORAGE_KEY) === "1") return;
    } catch {
      // localStorage unavailable (private browsing, blocked storage) — show every time.
    }
    const timer = setTimeout(() => {
      setOpen(true);
      requestAnimationFrame(() => setVisible(true));
    }, SHOW_DELAY_MS);
    return () => clearTimeout(timer);
  }, [isCurrent, festival]);

  function close() {
    setVisible(false);
    setTimeout(() => setOpen(false), EXIT_DURATION_MS);
    try {
      localStorage.setItem(STORAGE_KEY, "1");
    } catch {
      // Ignore — worst case it shows again next visit.
    }
  }

  if (!open || !festival) return null;

  const live = isFestivalToday(festival);

  return createPortal(
    <div
      className={`fixed inset-0 z-[200] flex items-center justify-center bg-ink-deep/75 p-4 backdrop-blur-sm transition-opacity duration-300 ${
        visible ? "opacity-100" : "opacity-0"
      }`}
      role="dialog"
      aria-modal="true"
      aria-label={`${festival.name} — ${live ? "happening now" : "upcoming"}`}
      onClick={close}
    >
      <div
        className={`relative w-full max-w-sm transition-all duration-300 ${
          visible ? "translate-y-0 scale-100 opacity-100" : "translate-y-4 scale-95 opacity-0"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Golden halo glow behind the card */}
        <div className="pointer-events-none absolute -inset-3 -z-10 animate-glow-pulse rounded-[calc(var(--radius-lg)+14px)] bg-gold/30 blur-2xl" />

        <div className="relative overflow-hidden rounded-[var(--radius-lg)] bg-gradient-to-b from-ink to-ink-deep shadow-[0_30px_80px_-20px_rgba(0,0,0,0.65)]">
          {/* Rising embers */}
          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            {EMBERS.map((ember, i) => (
              <span
                key={i}
                className="animate-rise-fade absolute bottom-0 h-1.5 w-1.5 rounded-full bg-gold shadow-[0_0_8px_2px_rgba(212,175,55,0.7)]"
                style={{ left: ember.left, animationDelay: ember.delay, animationDuration: ember.duration }}
              />
            ))}
          </div>

          <button
            type="button"
            onClick={close}
            aria-label="Close"
            className="absolute right-4 top-4 z-20 flex h-9 w-9 items-center justify-center rounded-full bg-white/15 text-white backdrop-blur transition-colors hover:bg-white/25"
          >
            <X size={18} />
          </button>

          <div className="relative aspect-square w-full overflow-hidden">
            <img src={festival.bannerImage} alt={festival.name} className="h-full w-full object-cover" />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink via-transparent to-transparent" />
          </div>

          <div className="relative px-7 pb-7 pt-2 text-center">
            <div className="relative mx-auto -mt-8 mb-3 flex h-16 w-16 items-center justify-center">
              <span className="absolute inset-0 rounded-full bg-ink-deep shadow-[0_0_0_4px_rgba(10,8,20,1)]" />
              <span className="animate-flame-flicker relative flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-b from-gold to-primary text-white">
                <Flame size={22} fill="currentColor" />
              </span>
            </div>

            <p className="text-eyebrow flex items-center justify-center gap-1.5 text-primary-light">
              {live ? (
                <>
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success opacity-75" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-success" />
                  </span>
                  Happening Now
                </>
              ) : (
                "The Month Most Dear to Radha-Krishna"
              )}
            </p>
            <h3 className="mt-2 font-display text-2xl text-white">{festival.name}</h3>
            <p className="mt-2 text-sm leading-relaxed text-white/70">{festival.tagline}</p>

            {live ? (
              <div className="mt-5 inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/10 px-4 py-2 text-sm font-medium text-gold">
                <Sparkles size={14} /> Deepdaan Tonight, 7:00 – 9:00 PM
              </div>
            ) : (
              <CountdownRow target={festival.date} className="mt-5 flex flex-col items-center" />
            )}

            <div className="mt-6 flex flex-col items-center gap-3">
              <Link
                to={`/festivals/${festival.slug}`}
                onClick={close}
                className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-br from-primary to-primary-light px-6 py-3 text-sm font-semibold text-white shadow-[var(--shadow-cta)] transition-transform hover:-translate-y-0.5"
              >
                Join the Daily Deepdaan <ArrowRight size={16} />
              </Link>
              <button type="button" onClick={close} className="text-sm font-medium text-white/60 hover:text-white">
                Maybe later
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>,
    document.body,
  );
}
