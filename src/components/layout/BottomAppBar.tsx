import { NavLink } from "react-router-dom";
import { Home, LandPlot, HeartHandshake, PartyPopper, Phone } from "lucide-react";
import clsx from "clsx";
import { siteInfo } from "../../data/site";

const items = [
  { label: "Home", to: "/", icon: Home },
  { label: "Temple", to: "/temple", icon: LandPlot },
  { label: "Donate", to: siteInfo.donateLink, icon: HeartHandshake, raised: true, external: true },
  { label: "Festivals", to: "/festivals", icon: PartyPopper },
  { label: "Contact", to: "/contact", icon: Phone },
];

export default function BottomAppBar() {
  return (
    <nav className="fixed inset-x-0 bottom-0 z-40 flex items-stretch justify-between border-t border-hairline bg-white/95 px-2 backdrop-blur lg:hidden">
      {items.map(({ label, to, icon: Icon, raised, external }) => {
        const content = raised ? (
          <span className="-mt-6 flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-primary to-primary-light text-white shadow-[var(--shadow-cta)]">
            <Icon size={20} />
          </span>
        ) : (
          <Icon size={20} />
        );

        if (external) {
          return (
            <a
              key={to}
              href={to}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-1 flex-col items-center justify-center gap-1 py-2 text-[0.65rem] font-medium text-muted"
            >
              {content}
              {label}
            </a>
          );
        }

        return (
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
            {content}
            {label}
          </NavLink>
        );
      })}
    </nav>
  );
}
