import { useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import { X, ChevronLeft, ChevronRight, ImageOff, Loader2 } from "lucide-react";
import { listAll, getDownloadURL, getMetadata, ref } from "firebase/storage";
import PageHero from "../components/ui/PageHero";
import SectionHeading from "../components/ui/SectionHeading";
import Reveal from "../components/ui/Reveal";
import { storage } from "../lib/firebase";
import { isWithinRetention, GALLERY_RETENTION_DAYS } from "../lib/galleryRetention";
import { images } from "../data/images";

interface Photo {
  url: string;
  thumbUrl: string;
  darshanDate?: string;
  tag?: string;
}

const ALL_TAGS = "All";

export default function Gallery() {
  const [photos, setPhotos] = useState<Photo[] | null>(null);
  const [error, setError] = useState(false);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [selectedTag, setSelectedTag] = useState(ALL_TAGS);

  useEffect(() => {
    let cancelled = false;

    async function loadPhotos() {
      try {
        const result = await listAll(ref(storage, "gallery"));
        const withMeta = await Promise.all(
          result.items.map(async (item) => {
            const meta = await getMetadata(item).catch(() => null);
            return { item, darshanDate: meta?.customMetadata?.darshanDate, tag: meta?.customMetadata?.tag };
          }),
        );
        const recent = withMeta.filter(({ item, darshanDate }) => isWithinRetention(item.name, darshanDate));
        const sorted = recent.sort((a, b) => b.item.name.localeCompare(a.item.name));
        const withUrls = await Promise.all(
          sorted.map(async ({ item, darshanDate, tag }) => {
            const url = await getDownloadURL(item);
            const thumbUrl = await getDownloadURL(ref(storage, `gallery/thumbs/${item.name}`)).catch(() => url);
            return { url, thumbUrl, darshanDate, tag };
          }),
        );
        if (!cancelled) setPhotos(withUrls);
      } catch {
        if (!cancelled) setError(true);
      }
    }

    loadPhotos();
    return () => {
      cancelled = true;
    };
  }, []);

  const tags = useMemo(() => {
    if (!photos) return [];
    const seen = new Set(photos.map((p) => p.tag).filter((t): t is string => Boolean(t)));
    return [ALL_TAGS, ...seen];
  }, [photos]);

  const visiblePhotos = useMemo(() => {
    if (!photos) return [];
    return selectedTag === ALL_TAGS ? photos : photos.filter((p) => p.tag === selectedTag);
  }, [photos, selectedTag]);

  return (
    <div>
      <PageHero
        breadcrumb={[{ label: "Home", to: "/" }, { label: "Gallery" }]}
        eyebrow="Moments of Devotion"
        title="Temple Gallery"
        subtitle="Fresh photos from daily darshan, festivals, and seva at ISKCON Gurugram, Sector 45 — updated daily."
        images={[{ src: images.pageHero.contact, position: "center 30%" }]}
      />

      <section className="section-pad">
        <div className="container-page">
          <SectionHeading
            eyebrow="Recent Photos"
            title="From the Temple"
            subtitle={`Showing darshan photos from the last ${GALLERY_RETENTION_DAYS} days.`}
          />

          {!photos && !error && (
            <div className="flex flex-col items-center gap-3 py-16 text-muted">
              <Loader2 size={28} className="animate-spin text-primary" />
              <p className="text-sm">Loading photos…</p>
            </div>
          )}

          {error && (
            <div className="flex flex-col items-center gap-3 py-16 text-center text-muted">
              <ImageOff size={28} />
              <p className="text-sm">Couldn't load the gallery right now — please check back shortly.</p>
            </div>
          )}

          {photos && photos.length === 0 && (
            <div className="flex flex-col items-center gap-3 py-16 text-center text-muted">
              <ImageOff size={28} />
              <p className="text-sm">No photos yet — check back soon.</p>
            </div>
          )}

          {photos && photos.length > 0 && (
            <>
              {tags.length > 2 && (
                <div className="mb-6 flex flex-wrap justify-center gap-2">
                  {tags.map((t) => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => {
                        setSelectedTag(t);
                        setActiveIndex(null);
                      }}
                      className={`rounded-full px-4 py-1.5 text-xs font-semibold transition-colors ${
                        selectedTag === t
                          ? "bg-primary text-white"
                          : "bg-cream-alt text-muted hover:bg-secondary/10 hover:text-secondary"
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              )}

              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
                {visiblePhotos.map((photo, i) => (
                  <Reveal key={photo.url} delay={Math.min(i, 8) * 60}>
                    <button
                      type="button"
                      onClick={() => setActiveIndex(i)}
                      className="group relative block aspect-square w-full overflow-hidden rounded-[var(--radius-card)] bg-cream-alt shadow-[var(--shadow-card)]"
                    >
                      <img
                        src={photo.thumbUrl}
                        alt=""
                        loading="lazy"
                        className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-110"
                      />
                      {(photo.tag || photo.darshanDate) && (
                        <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink-deep/80 to-transparent px-2.5 pb-1.5 pt-5 text-left text-[0.65rem] text-white">
                          {photo.tag && <p className="truncate font-semibold">{photo.tag}</p>}
                          {photo.darshanDate && <p className="opacity-80">{photo.darshanDate}</p>}
                        </div>
                      )}
                    </button>
                  </Reveal>
                ))}
              </div>
            </>
          )}
        </div>
      </section>

      {visiblePhotos.length > 0 && activeIndex !== null &&
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
            {activeIndex < visiblePhotos.length - 1 && (
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
                src={visiblePhotos[activeIndex].url}
                alt=""
                className="max-h-[75vh] max-w-full rounded-[var(--radius-card)] object-contain shadow-[0_30px_80px_-20px_rgba(0,0,0,0.65)]"
                onClick={(e) => e.stopPropagation()}
              />
              {(visiblePhotos[activeIndex].tag || visiblePhotos[activeIndex].darshanDate) && (
                <p className="text-sm text-white/80">
                  {[visiblePhotos[activeIndex].tag, visiblePhotos[activeIndex].darshanDate].filter(Boolean).join(" · ")}
                </p>
              )}
            </div>
          </div>,
          document.body,
        )}
    </div>
  );
}
