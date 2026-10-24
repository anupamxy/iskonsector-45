import { useState } from "react";
import { ChevronLeft, ChevronRight, Expand } from "lucide-react";

interface GalleryPhoto {
  url: string;
  thumbUrl: string;
}

interface DarshanGalleryProps {
  photos: GalleryPhoto[];
  onOpen: (index: number) => void;
}

const MAX_THUMBS = 6;

/** A featured photo with a thumbnail grid alongside it, and arrows to cycle the featured shot. */
export default function DarshanGallery({ photos, onOpen }: DarshanGalleryProps) {
  const [active, setActive] = useState(0);

  if (photos.length === 0) return null;
  const safeActive = Math.min(active, photos.length - 1);

  const thumbEntries = photos
    .map((photo, index) => ({ photo, index }))
    .filter(({ index }) => index !== safeActive)
    .slice(0, MAX_THUMBS);
  const extra = photos.length - 1 - thumbEntries.length;

  function go(delta: number) {
    setActive((i) => (Math.min(i, photos.length - 1) + delta + photos.length) % photos.length);
  }

  return (
    <div className="grid gap-3 rounded-[var(--radius-lg)] border border-gold/20 bg-white/[0.03] p-3 shadow-[0_20px_60px_-20px_rgba(0,0,0,0.55)] sm:grid-cols-[1.6fr_1fr] sm:p-4">
      <div className="group relative aspect-[4/3] overflow-hidden rounded-[var(--radius-card)] sm:aspect-auto">
        <button type="button" onClick={() => onOpen(safeActive)} className="absolute inset-0 block h-full w-full">
          <img
            src={photos[safeActive].thumbUrl}
            alt=""
            className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
          />
        </button>
        <span className="pointer-events-none absolute bottom-3 right-3 flex h-8 w-8 items-center justify-center rounded-full bg-ink-deep/70 text-gold backdrop-blur-sm">
          <Expand size={14} />
        </span>

        {photos.length > 1 && (
          <>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                go(-1);
              }}
              aria-label="Previous photo"
              className="absolute left-2 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-gold/50 bg-ink-deep/80 text-gold backdrop-blur-sm transition-colors hover:bg-gold hover:text-ink-deep"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                go(1);
              }}
              aria-label="Next photo"
              className="absolute right-2 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-gold/50 bg-ink-deep/80 text-gold backdrop-blur-sm transition-colors hover:bg-gold hover:text-ink-deep"
            >
              <ChevronRight size={18} />
            </button>
          </>
        )}
      </div>

      <div className="grid grid-cols-3 gap-2 sm:grid-cols-2">
        {thumbEntries.map(({ photo, index }, i) => {
          const isLast = i === thumbEntries.length - 1;
          const showOverlay = isLast && extra > 0;
          return (
            <button
              key={photo.url}
              type="button"
              onClick={() => (showOverlay ? onOpen(index) : setActive(index))}
              className="group relative aspect-square overflow-hidden rounded-xl border border-gold/15"
            >
              <img
                src={photo.thumbUrl}
                alt=""
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-110"
              />
              {showOverlay && (
                <span className="absolute inset-0 flex items-center justify-center bg-ink-deep/70 text-sm font-semibold text-gold backdrop-blur-sm">
                  +{extra}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
