import { useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import { Link } from "react-router-dom";
import { X, ChevronLeft, ChevronRight, Flame, ImageOff, Loader2 } from "lucide-react";
import { listAll, getDownloadURL, getMetadata, ref } from "firebase/storage";
import SectionHeading from "../components/ui/SectionHeading";
import Reveal from "../components/ui/Reveal";
import DatePickerPill from "../components/ui/DatePickerPill";
import DarshanGallery from "../components/ui/DarshanGallery";
import { LotusDivider, CornerFlourish } from "../components/ui/Ornaments";
import { storage } from "../lib/firebase";
import { isWithinRetention, todayISO, DAILY_DARSHAN_TAG } from "../lib/galleryRetention";
import { readCache, writeCache, DAILY_DARSHAN_CACHE_KEY } from "../lib/photoCache";

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

function formatPillLabel(dateStr: string, today: string): string {
  if (dateStr === today) return "Today";
  const date = new Date(`${dateStr}T00:00:00`);
  return date.toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" });
}

export default function DailyDarshan() {
  const [photos, setPhotos] = useState<Photo[] | null>(null);
  const [error, setError] = useState(false);
  const [lightboxPhotos, setLightboxPhotos] = useState<Photo[]>([]);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedMonth, setSelectedMonth] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      const cached = readCache<Photo[]>(DAILY_DARSHAN_CACHE_KEY);
      if (cached) {
        setPhotos(cached);
        return;
      }

      try {
        const result = await listAll(ref(storage, "gallery"));
        const withMeta = await Promise.all(
          result.items.map(async (item) => {
            const meta = await getMetadata(item).catch(() => null);
            return { item, darshanDate: meta?.customMetadata?.darshanDate, tag: meta?.customMetadata?.tag };
          }),
        );
        const daily = withMeta.filter(
          ({ item, darshanDate, tag }) => tag === DAILY_DARSHAN_TAG && isWithinRetention(item.name, darshanDate, tag),
        );
        const sorted = daily.sort((a, b) => b.item.name.localeCompare(a.item.name));
        const withUrls = await Promise.all(
          sorted.map(async ({ item, darshanDate }) => {
            const url = await getDownloadURL(item);
            const thumbUrl = await getDownloadURL(ref(storage, `gallery/thumbs/${item.name}`)).catch(() => url);
            return { url, thumbUrl, darshanDate: darshanDate ?? "" };
          }),
        );
        if (!cancelled) {
          setPhotos(withUrls);
          writeCache(DAILY_DARSHAN_CACHE_KEY, withUrls);
        }
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

  const dateOptions = useMemo(
    () => groups.map(([date]) => ({ value: date, label: formatPillLabel(date, today) })),
    [groups, today],
  );

  const effectiveDate =
    selectedDate && groups.some(([d]) => d === selectedDate)
      ? selectedDate
      : (groups.find(([d]) => d === today)?.[0] ?? groups[0]?.[0] ?? today);

  const selectedPhotos = groups.find(([date]) => date === effectiveDate)?.[1] ?? [];
  const otherGroups = groups.filter(([date]) => date !== effectiveDate);

  const monthOptions = useMemo(() => {
    const seen = new Map<string, string>();
    for (const [date] of otherGroups) {
      const key = date.slice(0, 7);
      if (!seen.has(key)) {
        seen.set(key, new Date(`${key}-01T00:00:00`).toLocaleDateString("en-IN", { month: "long", year: "numeric" }));
      }
    }
    return [...seen.entries()].sort((a, b) => b[0].localeCompare(a[0])).map(([value, label]) => ({ value, label }));
  }, [otherGroups]);

  const effectiveMonth = selectedMonth && monthOptions.some((m) => m.value === selectedMonth) ? selectedMonth : monthOptions[0]?.value;
  const visibleGroups = effectiveMonth ? otherGroups.filter(([date]) => date.slice(0, 7) === effectiveMonth) : otherGroups;

  function openLightbox(groupPhotos: Photo[], index: number) {
    setLightboxPhotos(groupPhotos);
    setActiveIndex(index);
  }

  return (
    <div>
      <section className="section-pad relative overflow-hidden bg-gradient-to-b from-ink via-[#300317] to-ink-deep text-white">
        <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 animate-float-slow rounded-full bg-primary/15 blur-3xl" />
        <div className="pointer-events-none absolute -left-20 top-40 h-64 w-64 animate-float-slower rounded-full bg-gold/10 blur-3xl" />

        <div className="pointer-events-none absolute left-10 top-32 hidden w-32 flex-col items-center gap-3 text-center 2xl:flex">
          <span className="h-px w-10 bg-gold/40" />
          <p className="font-display text-sm leading-relaxed text-white/45">
            Glorifying
            <br />
            The Supreme
            <br />
            Through
            <br />
            Service &amp; Love
          </p>
          <span className="h-px w-10 bg-gold/40" />
        </div>

        <div className="container-page relative">
          <nav className="mb-5 flex items-center gap-1.5 text-xs text-white/50">
            <Link to="/" className="hover:text-white">
              Home
            </Link>
            <ChevronRight size={12} />
            <span className="text-white/80">Daily Darshan</span>
          </nav>
          <div className="mb-5 flex justify-start">
            <LotusDivider />
          </div>
          <p className="text-eyebrow mb-3 text-primary-light">Live Every Day</p>
          <h1 className="max-w-xl text-[clamp(2.1rem,4.4vw,3.2rem)] text-white">Daily Darshan</h1>
          <p className="mt-4 max-w-xl text-white/70">
            See Sri Sri Radha Gopinath adorned fresh each day — updated right after morning and evening aarti.
          </p>

          <div className="mb-8 mt-6">
            {dateOptions.length > 0 && <DatePickerPill value={effectiveDate} options={dateOptions} onChange={setSelectedDate} />}
          </div>

          {!photos && !error && (
            <div className="flex flex-col items-center gap-3 py-16 text-white/60">
              <Loader2 size={28} className="animate-spin text-gold" />
              <p className="text-sm">Loading today's darshan…</p>
            </div>
          )}

          {error && (
            <div className="flex flex-col items-center gap-3 py-16 text-center text-white/60">
              <ImageOff size={28} />
              <p className="text-sm">Couldn't load darshan photos right now — please check back shortly.</p>
            </div>
          )}

          {photos && selectedPhotos.length === 0 && !error && (
            <div className="mx-auto flex max-w-md flex-col items-center gap-3 rounded-[var(--radius-card)] border-2 border-dashed border-gold/25 py-16 text-center text-white/60">
              <Flame size={28} className="animate-glow-pulse text-gold" />
              <p className="text-sm">Today's darshan photos will be up soon — please check back later today.</p>
            </div>
          )}

          {selectedPhotos.length > 0 && (
            <Reveal>
              <div className="relative mx-auto max-w-4xl">
                <CornerFlourish className="absolute -left-2 -top-2 h-11 w-11" />
                <CornerFlourish className="absolute -right-2 -top-2 h-11 w-11 scale-x-[-1]" />
                <DarshanGallery photos={selectedPhotos} onOpen={(i) => openLightbox(selectedPhotos, i)} />
              </div>
            </Reveal>
          )}
        </div>
      </section>

      {otherGroups.length > 0 && (
        <section className="section-pad relative bg-ink-deep text-white">
          <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent" />
          <div className="container-page">
            <Reveal>
              <SectionHeading eyebrow="Look Back" title="Previous Days" light className="mb-4" />
              <LotusDivider className="mb-8" />
            </Reveal>

            {monthOptions.length > 1 && (
              <div className="mb-8 flex justify-center sm:justify-end">
                <DatePickerPill
                  value={effectiveMonth ?? monthOptions[0].value}
                  options={monthOptions}
                  onChange={setSelectedMonth}
                  aria-label="Filter previous days by month"
                />
              </div>
            )}

            <div className="flex flex-col gap-10">
              {visibleGroups.map(([date, dayPhotos], gi) => (
                <Reveal key={date} delay={gi * 80}>
                  <div>
                    <div className="mb-4 flex items-center gap-3">
                      <span className="h-2 w-2 shrink-0 rounded-full bg-gold" />
                      <h4 className="text-base font-semibold text-white">{formatDayLabel(date, today)}</h4>
                      <span className="text-xs text-white/50">
                        {dayPhotos.length} photo{dayPhotos.length === 1 ? "" : "s"}
                      </span>
                    </div>
                    <div className="flex gap-3 overflow-x-auto pb-2">
                      {dayPhotos.map((photo, i) => (
                        <button
                          key={photo.url}
                          type="button"
                          onClick={() => openLightbox(dayPhotos, i)}
                          className="group relative aspect-square w-28 shrink-0 overflow-hidden rounded-xl border border-gold/20 bg-white/5 shadow-[0_8px_24px_-12px_rgba(0,0,0,0.6)] sm:w-36"
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
              className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full border border-gold/30 bg-white/10 text-white hover:bg-white/20"
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
                className="absolute left-4 flex h-10 w-10 items-center justify-center rounded-full border border-gold/30 bg-white/10 text-white hover:bg-white/20"
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
                className="absolute right-4 flex h-10 w-10 items-center justify-center rounded-full border border-gold/30 bg-white/10 text-white hover:bg-white/20"
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
