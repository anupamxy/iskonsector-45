import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { X, ChevronLeft, ChevronRight, ImageOff, Loader2 } from "lucide-react";
import { listAll, getDownloadURL, ref } from "firebase/storage";
import PageHero from "../components/ui/PageHero";
import SectionHeading from "../components/ui/SectionHeading";
import Reveal from "../components/ui/Reveal";
import { storage } from "../lib/firebase";
import { isWithinRetention, GALLERY_RETENTION_DAYS } from "../lib/galleryRetention";
import { images } from "../data/images";

interface Photo {
  url: string;
  thumbUrl: string;
}

export default function Gallery() {
  const [photos, setPhotos] = useState<Photo[] | null>(null);
  const [error, setError] = useState(false);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function loadPhotos() {
      try {
        const result = await listAll(ref(storage, "gallery"));
        const recent = result.items.filter((item) => isWithinRetention(item.name));
        const sorted = recent.sort((a, b) => b.name.localeCompare(a.name));
        const withUrls = await Promise.all(
          sorted.map(async (item) => {
            const url = await getDownloadURL(item);
            const thumbUrl = await getDownloadURL(ref(storage, `gallery/thumbs/${item.name}`)).catch(() => url);
            return { url, thumbUrl };
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
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
              {photos.map((photo, i) => (
                <Reveal key={photo.url} delay={Math.min(i, 8) * 60}>
                  <button
                    type="button"
                    onClick={() => setActiveIndex(i)}
                    className="group block aspect-square w-full overflow-hidden rounded-[var(--radius-card)] bg-cream-alt shadow-[var(--shadow-card)]"
                  >
                    <img
                      src={photo.thumbUrl}
                      alt=""
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-110"
                    />
                  </button>
                </Reveal>
              ))}
            </div>
          )}
        </div>
      </section>

      {photos && activeIndex !== null &&
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
            {activeIndex < photos.length - 1 && (
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

            <img
              src={photos[activeIndex].url}
              alt=""
              className="max-h-[85vh] max-w-full rounded-[var(--radius-card)] object-contain shadow-[0_30px_80px_-20px_rgba(0,0,0,0.65)]"
              onClick={(e) => e.stopPropagation()}
            />
          </div>,
          document.body,
        )}
    </div>
  );
}
