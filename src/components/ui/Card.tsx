import type { ReactNode } from "react";
import clsx from "clsx";

interface CardProps {
  children: ReactNode;
  className?: string;
  hoverLift?: boolean;
  row?: boolean;
}

export default function Card({ children, className, hoverLift = true, row = false }: CardProps) {
  return (
    <div
      className={clsx(
        "flex rounded-[var(--radius-card)] bg-white shadow-[var(--shadow-card)] transition-all duration-200",
        row ? "flex-row" : "flex-col",
        hoverLift && "hover:-translate-y-1 hover:shadow-[var(--shadow-card-hover)]",
        className,
      )}
    >
      {children}
    </div>
  );
}
