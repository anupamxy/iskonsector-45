import { useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import { Link } from "react-router-dom";
import { X, ChevronLeft, ChevronRight, PartyPopper, ImageOff, Loader2 } from "lucide-react";
import { listAll, getDownloadURL, getMetadata, ref } from "firebase/storage";
import SectionHeading from "../components/ui/SectionHeading";
import Reveal from "../components/ui/Reveal";
import DarshanGallery from "../components/ui/DarshanGallery";
import { LotusDivider, CornerFlourish } from "../components/ui/Ornaments";
import { storage } from "../lib/firebase";
import { isWithinRetention, DAILY_DARSHAN_TAG } from "../lib/galleryRetention";
import { readCache, writeCache, FESTIVAL_DARSHAN_CACHE_KEY } from "../lib/photoCache";

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
      <section className="section-pad relative overflow-hidden bg-gradient-to-b from-ink via-[#300317] to-ink-deep text-white">
        <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 animate-float-slow rounded-full bg-primary/15 blur-3xl" />
        <div className="pointer-events-none absolute -left-20 top-40 h-64 w-64 animate-float-slower rounded-full bg-gold/10 blur-3xl" />

        <div className="container-page relative">
          <nav className="mb-5 flex items-center gap-1.5 text-xs text-white/50">
            <Link to="/" className="hover:text-white">
              Home
            </Link>
            <ChevronRight size={12} />
            <Link to="/daily-darshan" className="hover:text-white">
              Darshan
            </Link>
            <ChevronRight size={12} />
            <span className="text-white/80">Festival Darshan</span>
          </nav>
          <div className="mb-5 flex justify-start">
            <LotusDivider />
          </div>
          <p className="text-eyebrow mb-3 text-primary-light">Celebrations, Preserved</p>
          <h1 className="max-w-xl text-[clamp(2.1rem,4.4vw,3.2rem)] text-white">Festival Darshan</h1>
          <p className="mb-2 mt-4 max-w-xl text-white/70">
            Photos from Janmashtami, Radhashtami, and every other celebration at the temple — grouped by festival.
          </p>
          {!photos && !error && (
            <div className="flex flex-col items-center gap-3 py-16 text-white/60">
              <Loader2 size={28} className="animate-spin text-gold" />
              <p className="text-sm">Loading festival photos…</p>
            </div>
          )}

          {error && (
            <div className="flex flex-col items-center gap-3 py-16 text-center text-white/60">
              <ImageOff size={28} />
              <p className="text-sm">Couldn't load festival photos right now — please check back shortly.</p>
            </div>
          )}

          {photos && groups.length === 0 && !error && (
            <div className="mx-auto flex max-w-md flex-col items-center gap-3 rounded-[var(--radius-card)] border-2 border-dashed border-gold/25 py-16 text-center text-white/60">
              <PartyPopper size={28} className="animate-glow-pulse text-gold" />
              <p className="text-sm">Festival photos will appear here after the next celebration.</p>
            </div>
          )}

          <div className="flex flex-col gap-16">
            {groups.map(([tag, tagPhotos], gi) => (
              <Reveal key={tag} delay={gi * 80}>
                <div>
                  <SectionHeading eyebrow="Celebration" title={tag} light className="mb-4" />
                  <LotusDivider className="mb-8" />
                  <div className="relative mx-auto max-w-4xl">
                    <CornerFlourish className="absolute -left-2 -top-2 h-11 w-11" />
                    <CornerFlourish className="absolute -right-2 -top-2 h-11 w-11 scale-x-[-1]" />
                    <DarshanGallery photos={tagPhotos} onOpen={(i) => openLightbox(tagPhotos, i)} />
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
              <p className="text-sm text-white/80">{lightboxPhotos[activeIndex].tag}</p>
            </div>
          </div>,
          document.body,
        )}
    </div>
  );
}
