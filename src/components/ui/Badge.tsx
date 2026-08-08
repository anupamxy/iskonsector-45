import type { ReactNode } from "react";
import clsx from "clsx";

interface BadgeProps {
  children: ReactNode;
  tone?: "saffron" | "blue" | "gold" | "dark";
  className?: string;
}

const toneClasses = {
  saffron: "bg-primary/10 text-primary",
  blue: "bg-secondary/10 text-secondary",
  gold: "bg-gold/15 text-gold",
  dark: "bg-white/15 text-white",
};

export default function Badge({ children, tone = "saffron", className }: BadgeProps) {
  return (
    <span
      className={clsx(
        "inline-flex items-center gap-1.5 rounded-full px-3.5 py-1 text-xs font-semibold uppercase tracking-wider",
        toneClasses[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}
