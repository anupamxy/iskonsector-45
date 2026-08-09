import { useEffect, useState } from "react";
import clsx from "clsx";

interface HeroCarouselProps {
  images: string[];
  alt: string;
  className?: string;
}

export default function HeroCarousel({ images, alt, className }: HeroCarouselProps) {
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (images.length <= 1) return;
    const id = setInterval(() => setActive((i) => (i + 1) % images.length), 4500);
    return () => clearInterval(id);
  }, [images.length]);

  return (
    <div className={clsx("relative aspect-[4/3] w-full overflow-hidden rounded-[var(--radius-card)] shadow-[var(--shadow-card-hover)]", className)}>
      {images.map((src, i) => {
        const isVideo = /\.(mp4|webm|mov)$/i.test(src);
        const slideClassName = clsx(
          "absolute inset-0 h-full w-full object-cover transition-opacity duration-700",
          i === active ? "opacity-100" : "opacity-0",
        );

        return isVideo ? (
          <video
            key={src}
            src={src}
            className={slideClassName}
            autoPlay
            loop
            muted
            playsInline
          />
        ) : (
          <img key={src} src={src} alt={`${alt} ${i + 1}`} className={slideClassName} />
        );
      })}
      {images.length > 1 && (
        <div className="absolute inset-x-0 bottom-3 flex justify-center gap-1.5">
          {images.map((src, i) => (
            <button
              key={src}
              type="button"
              onClick={() => setActive(i)}
              aria-label={`Show slide ${i + 1}`}
              className={clsx(
                "h-1.5 rounded-full bg-white transition-all",
                i === active ? "w-6 opacity-100" : "w-1.5 opacity-50",
              )}
            />
          ))}
        </div>
      )}
    </div>
  );
}
