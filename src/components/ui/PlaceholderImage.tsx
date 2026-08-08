import { ImageIcon } from "lucide-react";
import clsx from "clsx";

interface PlaceholderImageProps {
  label?: string;
  aspect?: string;
  rounded?: string;
  tone?: "light" | "dark";
  className?: string;
}

/**
 * Stands in for real temple/event photography. Deliberately styled to read as
 * an intentional placeholder (not a broken image) so it can be swapped for a
 * real photo later without any layout changes.
 */
export default function PlaceholderImage({
  label = "Photo coming soon",
  aspect = "aspect-[4/3]",
  rounded = "rounded-[var(--radius-card)]",
  tone = "light",
  className,
}: PlaceholderImageProps) {
  return (
    <div
      className={clsx(
        "flex w-full flex-col items-center justify-center gap-2 border-2 border-dashed",
        aspect,
        rounded,
        tone === "light"
          ? "border-gold/40 bg-gradient-to-br from-cream-alt to-white text-muted"
          : "border-white/25 bg-gradient-to-br from-ink to-ink-deep text-white/60",
        className,
      )}
    >
      <ImageIcon size={28} strokeWidth={1.5} />
      <span className="text-eyebrow text-[0.62rem] tracking-widest opacity-80">{label}</span>
    </div>
  );
}
