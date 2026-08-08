import clsx from "clsx";

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "center" | "left";
  light?: boolean;
  className?: string;
}

export default function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "center",
  light = false,
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={clsx(
        "mb-10",
        align === "center" ? "mx-auto max-w-[660px] text-center" : "max-w-[660px] text-left",
        className,
      )}
    >
      {eyebrow && (
        <p className={clsx("text-eyebrow mb-3", light ? "text-primary-light" : "text-primary")}>
          {eyebrow}
        </p>
      )}
      <h2 className={clsx("text-[clamp(1.9rem,3.6vw,2.9rem)]", light ? "text-white" : "text-ink")}>
        {title}
      </h2>
      {subtitle && (
        <p className={clsx("mt-4 text-[1.05rem] leading-relaxed", light ? "text-white/75" : "text-muted")}>
          {subtitle}
        </p>
      )}
    </div>
  );
}
