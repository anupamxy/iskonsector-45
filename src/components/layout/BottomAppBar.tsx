import { NavLink } from "react-router-dom";
import { Home, LandPlot, HeartHandshake, PartyPopper, Phone } from "lucide-react";
import clsx from "clsx";

const items = [
  { label: "Home", to: "/", icon: Home },
  { label: "Temple", to: "/temple", icon: LandPlot },
  { label: "Donate", to: "/donate", icon: HeartHandshake, raised: true },
  { label: "Festivals", to: "/festivals", icon: PartyPopper },
  { label: "Contact", to: "/contact", icon: Phone },
];

export default function BottomAppBar() {
  return (
    <nav className="fixed inset-x-0 bottom-0 z-40 flex items-stretch justify-between border-t border-hairline bg-white/95 px-2 backdrop-blur lg:hidden">
      {items.map(({ label, to, icon: Icon, raised }) => (
        <NavLink
          key={to}
          to={to}
          end={to === "/"}
          className={({ isActive }) =>
            clsx(
              "flex flex-1 flex-col items-center justify-center gap-1 py-2 text-[0.65rem] font-medium",
              isActive ? "text-primary" : "text-muted",
            )
          }
        >
          {raised ? (
            <span className="-mt-6 flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-primary to-primary-light text-white shadow-[var(--shadow-cta)]">
              <Icon size={20} />
            </span>
          ) : (
            <Icon size={20} />
          )}
          {label}
        </NavLink>
      ))}
    </nav>
  );
}
