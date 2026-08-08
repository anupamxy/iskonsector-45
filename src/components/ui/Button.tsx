import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import clsx from "clsx";

type Variant = "primary" | "secondary" | "outline" | "ghost" | "whatsapp";
type Size = "md" | "lg";

const variantClasses: Record<Variant, string> = {
  primary:
    "bg-gradient-to-br from-primary to-primary-light text-white shadow-[var(--shadow-cta)] hover:brightness-105",
  secondary: "bg-secondary text-white hover:bg-secondary-deep",
  outline:
    "bg-transparent border-2 border-secondary text-secondary hover:bg-secondary hover:text-white",
  ghost:
    "bg-white/15 backdrop-blur border border-white/40 text-white hover:bg-white/25",
  whatsapp: "bg-whatsapp text-white hover:brightness-95",
};

const sizeClasses: Record<Size, string> = {
  md: "px-6 py-2.5 text-sm",
  lg: "px-8 py-3.5 text-base",
};

const base =
  "inline-flex items-center justify-center gap-2 rounded-full font-semibold tracking-wide transition-all duration-200 hover:-translate-y-0.5 whitespace-nowrap";

interface CommonProps {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
}

type ButtonProps = CommonProps & {
  to?: string;
  href?: string;
  onClick?: () => void;
  type?: "button" | "submit";
  target?: string;
  rel?: string;
};

export default function Button({
  variant = "primary",
  size = "md",
  className,
  children,
  to,
  href,
  onClick,
  type = "button",
  target,
  rel,
}: ButtonProps) {
  const classes = clsx(base, variantClasses[variant], sizeClasses[size], className);

  if (to) {
    return (
      <Link to={to} className={classes}>
        {children}
      </Link>
    );
  }

  if (href) {
    return (
      <a href={href} className={classes} target={target} rel={rel}>
        {children}
      </a>
    );
  }

  return (
    <button type={type} onClick={onClick} className={classes}>
      {children}
    </button>
  );
}
