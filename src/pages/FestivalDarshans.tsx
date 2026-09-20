import { useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import { X, ChevronLeft, ChevronRight, PartyPopper, ImageOff, Loader2 } from "lucide-react";
import { listAll, getDownloadURL, getMetadata, ref } from "firebase/storage";
import PageHero from "../components/ui/PageHero";
import SectionHeading from "../components/ui/SectionHeading";
import Reveal from "../components/ui/Reveal";
import { storage } from "../lib/firebase";
import { isWithinRetention, DAILY_DARSHAN_TAG } from "../lib/galleryRetention";
import { readCache, writeCache, FESTIVAL_DARSHAN_CACHE_KEY } from "../lib/photoCache";
import { images } from "../data/images";

interface Photo {
  name: string;
  url: string;
  thumbUrl: string;
  tag: string;
}

export default function FestivalDarshans() {
  const [photos, setPhotos] = useState<Photo[] | null>(null);
  const [error, setError] = useState(false);
  const [lightboxPhotos, setLightboxPhotos] = useState<Photo[]>([]);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      const cached = readCache<Photo[]>(FESTIVAL_DARSHAN_CACHE_KEY);
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
        const festival = withMeta.filter(
          ({ item, darshanDate, tag }) =>
            !!tag && tag !== DAILY_DARSHAN_TAG && isWithinRetention(item.name, darshanDate, tag),
        );
        const sorted = festival.sort((a, b) => b.item.name.localeCompare(a.item.name));
        const withUrls = await Promise.all(
          sorted.map(async ({ item, tag }) => {
            const url = await getDownloadURL(item);
            const thumbUrl = await getDownloadURL(ref(storage, `gallery/thumbs/${item.name}`)).catch(() => url);
            return { name: item.name, url, thumbUrl, tag: tag ?? "Festival" };
          }),
        );
        if (!cancelled) {
          setPhotos(withUrls);
          writeCache(FESTIVAL_DARSHAN_CACHE_KEY, withUrls);
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

  const groups = useMemo(() => {
    if (!photos) return [];
    const map = new Map<string, Photo[]>();
    for (const p of photos) {
      if (!map.has(p.tag)) map.set(p.tag, []);
      map.get(p.tag)!.push(p);
    }
    // Newest festival first, based on each group's most recently uploaded photo.
    return [...map.entries()].sort((a, b) => b[1][0].name.localeCompare(a[1][0].name));
  }, [photos]);

  function openLightbox(groupPhotos: Photo[], index: number) {
    setLightboxPhotos(groupPhotos);
    setActiveIndex(index);
  }

  return (
    <div>
      <PageHero
        breadcrumb={[{ label: "Home", to: "/" }, { label: "Darshan", to: "/daily-darshan" }, { label: "Festival Darshan" }]}
        eyebrow="Celebrations, Preserved"
        title="Festival Darshan"
        subtitle="Photos from Janmashtami, Radhashtami, and every other celebration at the temple — grouped by festival."
        images={[{ src: images.krishnaArt, position: "center 20%" }]}
      />

      <section className="section-pad relative overflow-hidden">
        <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 animate-float-slow rounded-full bg-primary/10 blur-3xl" />
        <div className="pointer-events-none absolute -left-20 top-40 h-64 w-64 animate-float-slower rounded-full bg-gold/10 blur-3xl" />

        <div className="container-page relative">
          {!photos && !error && (
            <div className="flex flex-col items-center gap-3 py-16 text-muted">
              <Loader2 size={28} className="animate-spin text-primary" />
              <p className="text-sm">Loading festival photos…</p>
            </div>
          )}

          {error && (
            <div className="flex flex-col items-center gap-3 py-16 text-center text-muted">
              <ImageOff size={28} />
              <p className="text-sm">Couldn't load festival photos right now — please check back shortly.</p>
            </div>
          )}

          {photos && groups.length === 0 && !error && (
            <div className="mx-auto flex max-w-md flex-col items-center gap-3 rounded-[var(--radius-card)] border-2 border-dashed border-hairline py-16 text-center text-muted">
              <PartyPopper size={28} className="animate-glow-pulse text-primary" />
              <p className="text-sm">Festival photos will appear here after the next celebration.</p>
            </div>
          )}

          <div className="flex flex-col gap-14">
            {groups.map(([tag, tagPhotos], gi) => (
              <Reveal key={tag} delay={gi * 80}>
                <div>
                  <SectionHeading eyebrow="Celebration" title={tag} align="left" className="mb-6 max-w-none" />
                  <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
                    {tagPhotos.map((photo, i) => (
                      <Reveal key={photo.url} delay={Math.min(i, 10) * 70} className="h-full">
                        <button
                          type="button"
                          onClick={() => openLightbox(tagPhotos, i)}
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
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

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
              <p className="text-sm text-white/80">{lightboxPhotos[activeIndex].tag}</p>
            </div>
          </div>,
          document.body,
        )}
    </div>
  );
}
