import { Link } from "react-router-dom";
import clsx from "clsx";
import { siteInfo } from "../../data/site";
import { getUpcomingHomeFestivals } from "../../data/festivals";
import { useTempleStatus } from "../../lib/useTempleStatus";
import { FacebookIcon, InstagramIcon, YoutubeIcon } from "../ui/SocialIcons";

const quickLinks = [
  { label: "Darshan Timings", to: "/faq" },
  { label: "Festivals", to: "/festivals" },
  { label: "Visit Us", to: "/contact" },
];

export default function UtilityBar() {
  const status = useTempleStatus(siteInfo.darshanWindows);
  const nextFestival = getUpcomingHomeFestivals()[0];

  return (
    <div className="bg-ink-deep text-white/80">
      <div className="container-page flex flex-wrap items-center justify-between gap-x-4 gap-y-1.5 py-2 text-xs">
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5">
          {status && (
            <>
              <span className="flex items-center gap-2 font-medium text-white">
                <span
                  className={clsx(
                    "h-2 w-2 shrink-0 rounded-full",
                    status.isOpen ? "bg-success shadow-[0_0_0_4px_rgba(74,222,128,0.18)]" : "bg-danger shadow-[0_0_0_4px_rgba(248,113,113,0.18)]",
                  )}
                />
                {status.label}
              </span>
              <span className="hidden opacity-30 sm:inline">|</span>
              <span className="hidden sm:inline">{status.next}</span>
              <span className="hidden opacity-30 lg:inline">|</span>
            </>
          )}
          <div className="hidden items-center gap-4 lg:flex">
            {quickLinks.map((link) => (
              <Link key={link.to} to={link.to} className="hover:text-white">
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-4">
          <Link
            to="/festivals"
            className="hidden whitespace-nowrap rounded-full bg-primary/20 px-3 py-1 font-medium text-primary-light hover:bg-primary/30 sm:inline-flex"
          >
            🎉 {nextFestival ? nextFestival.name : "Festivals & Seva"}
          </Link>
          <div className="flex items-center gap-3">
            <a href={siteInfo.social.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="hover:text-primary-light">
              <FacebookIcon size={14} />
            </a>
            <a href={siteInfo.social.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="hover:text-primary-light">
              <InstagramIcon size={14} />
            </a>
            <a href={siteInfo.social.youtube} target="_blank" rel="noopener noreferrer" aria-label="YouTube" className="hover:text-primary-light">
              <YoutubeIcon size={14} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
