import { useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import { X, ChevronLeft, ChevronRight, Flame, ImageOff, Loader2 } from "lucide-react";
import { listAll, getDownloadURL, getMetadata, ref } from "firebase/storage";
import PageHero from "../components/ui/PageHero";
import SectionHeading from "../components/ui/SectionHeading";
import Reveal from "../components/ui/Reveal";
import { storage } from "../lib/firebase";
import { isWithinRetention, todayISO } from "../lib/galleryRetention";
import { images } from "../data/images";

const DAILY_DARSHAN_TAG = "Daily Darshan";

interface Photo {
  url: string;
  thumbUrl: string;
  darshanDate: string;
}

function formatDayLabel(dateStr: string, today: string): string {
  const date = new Date(`${dateStr}T00:00:00`);
  const diffDays = Math.round((new Date(`${today}T00:00:00`).getTime() - date.getTime()) / 86400000);
  if (diffDays === 1) return "Yesterday";
  return date.toLocaleDateString("en-IN", { weekday: "long", day: "numeric", month: "long" });
}

export default function DailyDarshan() {
  const [photos, setPhotos] = useState<Photo[] | null>(null);
  const [error, setError] = useState(false);
  const [lightboxPhotos, setLightboxPhotos] = useState<Photo[]>([]);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const result = await listAll(ref(storage, "gallery"));
        const withMeta = await Promise.all(
          result.items.map(async (item) => {
            const meta = await getMetadata(item).catch(() => null);
            return { item, darshanDate: meta?.customMetadata?.darshanDate, tag: meta?.customMetadata?.tag };
          }),
        );
        const daily = withMeta.filter(
          ({ item, darshanDate, tag }) => tag === DAILY_DARSHAN_TAG && isWithinRetention(item.name, darshanDate),
        );
        const sorted = daily.sort((a, b) => b.item.name.localeCompare(a.item.name));
        const withUrls = await Promise.all(
          sorted.map(async ({ item, darshanDate }) => {
            const url = await getDownloadURL(item);
            const thumbUrl = await getDownloadURL(ref(storage, `gallery/thumbs/${item.name}`)).catch(() => url);
            return { url, thumbUrl, darshanDate: darshanDate ?? "" };
          }),
        );
        if (!cancelled) setPhotos(withUrls);
      } catch {
        if (!cancelled) setError(true);
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, []);

  const today = todayISO();

  const groups = useMemo(() => {
    if (!photos) return [];
    const map = new Map<string, Photo[]>();
    for (const p of photos) {
      const key = p.darshanDate || today;
      if (!map.has(key)) map.set(key, []);
      map.get(key)!.push(p);
    }
    return [...map.entries()].sort((a, b) => b[0].localeCompare(a[0]));
  }, [photos, today]);

  const todayPhotos = groups.find(([date]) => date === today)?.[1] ?? [];
  const otherGroups = groups.filter(([date]) => date !== today);

  function openLightbox(groupPhotos: Photo[], index: number) {
    setLightboxPhotos(groupPhotos);
    setActiveIndex(index);
  }

  return (
    <div>
      <PageHero
        breadcrumb={[{ label: "Home", to: "/" }, { label: "Daily Darshan" }]}
        eyebrow="Live Every Day"
        title="Daily Darshan"
        subtitle="See Sri Sri Radha Gopinath adorned fresh each day — updated right after morning and evening aarti."
        images={[{ src: images.krishnaArt, position: "center 20%" }]}
      />

      <section className="section-pad relative overflow-hidden">
        <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 animate-float-slow rounded-full bg-primary/10 blur-3xl" />
        <div className="pointer-events-none absolute -left-20 top-40 h-64 w-64 animate-float-slower rounded-full bg-gold/10 blur-3xl" />

        <div className="container-page relative">
          <div className="mb-3 flex items-center justify-center gap-2">
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success opacity-75" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-success" />
            </span>
            <p className="text-eyebrow text-secondary">
              {new Date().toLocaleDateString("en-IN", {
                weekday: "long",
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </p>
          </div>

          <SectionHeading eyebrow="Happening Today" title="Today's Darshan" />

          {!photos && !error && (
            <div className="flex flex-col items-center gap-3 py-16 text-muted">
              <Loader2 size={28} className="animate-spin text-primary" />
              <p className="text-sm">Loading today's darshan…</p>
            </div>
          )}

          {error && (
            <div className="flex flex-col items-center gap-3 py-16 text-center text-muted">
              <ImageOff size={28} />
              <p className="text-sm">Couldn't load darshan photos right now — please check back shortly.</p>
            </div>
          )}

          {photos && todayPhotos.length === 0 && !error && (
            <div className="mx-auto flex max-w-md flex-col items-center gap-3 rounded-[var(--radius-card)] border-2 border-dashed border-hairline py-16 text-center text-muted">
              <Flame size={28} className="animate-glow-pulse text-primary" />
              <p className="text-sm">Today's darshan photos will be up soon — please check back later today.</p>
            </div>
          )}

          {todayPhotos.length > 0 && (
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
              {todayPhotos.map((photo, i) => (
                <Reveal key={photo.url} delay={Math.min(i, 10) * 70} className="h-full">
                  <button
                    type="button"
                    onClick={() => openLightbox(todayPhotos, i)}
                    className="group relative block aspect-square w-full overflow-hidden rounded-[var(--radius-card)] bg-cream-alt shadow-[var(--shadow-card)] transition-shadow duration-300 hover:shadow-[var(--shadow-card-hover)]"
                  >
                    <img
                      src={photo.thumbUrl}
                      alt=""
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-110"
                    />
                    <div className="shimmer-sweep pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  </button>
                </Reveal>
              ))}
            </div>
          )}
        </div>
      </section>

      {otherGroups.length > 0 && (
        <section className="section-pad bg-cream-alt">
          <div className="container-page">
            <Reveal>
              <SectionHeading eyebrow="Look Back" title="Previous Days" align="left" className="mb-8 max-w-none" />
            </Reveal>
            <div className="flex flex-col gap-10">
              {otherGroups.map(([date, dayPhotos], gi) => (
                <Reveal key={date} delay={gi * 80}>
                  <div>
                    <div className="mb-4 flex items-center gap-3">
                      <span className="h-2 w-2 shrink-0 rounded-full bg-primary/50" />
                      <h4 className="text-base font-semibold text-ink">{formatDayLabel(date, today)}</h4>
                      <span className="text-xs text-muted">
                        {dayPhotos.length} photo{dayPhotos.length === 1 ? "" : "s"}
                      </span>
                    </div>
                    <div className="flex gap-3 overflow-x-auto pb-2">
                      {dayPhotos.map((photo, i) => (
                        <button
                          key={photo.url}
                          type="button"
                          onClick={() => openLightbox(dayPhotos, i)}
                          className="group relative aspect-square w-28 shrink-0 overflow-hidden rounded-xl bg-white shadow-[var(--shadow-card)] sm:w-36"
                        >
                          <img
                            src={photo.thumbUrl}
                            alt=""
                            loading="lazy"
                            className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-110"
                          />
                        </button>
                      ))}
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {activeIndex !== null &&
        lightboxPhotos.length > 0 &&
        createPortal(
          <div
            className="fixed inset-0 z-[200] flex items-center justify-center bg-ink-deep/90 p-4 backdrop-blur-sm"
            role="dialog"
            aria-modal="true"
            onClick={() => setActiveIndex(null)}
          >
            <button
              type="button"
              onClick={() => setActiveIndex(null)}
              aria-label="Close"
              className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20"
            >
              <X size={20} />
            </button>

            {activeIndex > 0 && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveIndex((i) => (i !== null ? i - 1 : i));
                }}
                aria-label="Previous photo"
                className="absolute left-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20"
              >
                <ChevronLeft size={20} />
              </button>
            )}
            {activeIndex < lightboxPhotos.length - 1 && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveIndex((i) => (i !== null ? i + 1 : i));
                }}
                aria-label="Next photo"
                className="absolute right-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20"
              >
                <ChevronRight size={20} />
              </button>
            )}

            <div className="flex max-h-[85vh] max-w-full flex-col items-center gap-3">
              <img
                src={lightboxPhotos[activeIndex].url}
                alt=""
                className="max-h-[75vh] max-w-full rounded-[var(--radius-card)] object-contain shadow-[0_30px_80px_-20px_rgba(0,0,0,0.65)]"
                onClick={(e) => e.stopPropagation()}
              />
              <p className="text-sm text-white/80">{formatDayLabel(lightboxPhotos[activeIndex].darshanDate, today)}</p>
            </div>
          </div>,
          document.body,
        )}
    </div>
  );
}
