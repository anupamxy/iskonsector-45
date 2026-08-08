import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Phone, Mail, ChevronDown, Menu, X } from "lucide-react";
import clsx from "clsx";
import { siteInfo, primaryNav } from "../../data/site";
import Button from "../ui/Button";
import { FacebookIcon, InstagramIcon, YoutubeIcon } from "../ui/SocialIcons";
import { images } from "../../data/images";

function Logo() {
  return (
    <Link to="/" className="flex items-center gap-2.5" onClick={() => window.scrollTo(0, 0)}>
      <img src={images.logo} alt="ISKCON Gurugram Sector 45 logo" className="h-11 w-11 shrink-0 object-contain" />
      <span className="leading-tight">
        <span className="block font-display text-lg text-ink">ISKCON Gurugram</span>
        <span className="text-eyebrow block text-secondary">Sector 45</span>
      </span>
    </Link>
  );
}

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openMobileGroup, setOpenMobileGroup] = useState<string | null>(null);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 12);
    }
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <>
      {/* Utility bar */}
      <div className="hidden bg-ink-deep text-white/80 md:block">
        <div className="container-page flex items-center justify-between py-2 text-xs">
          <div className="flex items-center gap-5">
            <a href={`tel:${siteInfo.phones.primaryTel}`} className="flex items-center gap-1.5 hover:text-white">
              <Phone size={13} /> {siteInfo.phones.primary}
            </a>
            <a href={`mailto:${siteInfo.email}`} className="flex items-center gap-1.5 hover:text-white">
              <Mail size={13} /> {siteInfo.email}
            </a>
          </div>
          <div className="hidden items-center gap-5 lg:flex">
            <Link to="/festivals" className="rounded-full bg-primary/20 px-3 py-1 font-medium text-primary-light hover:bg-primary/30">
              🎉 Festivals & Seva
            </Link>
            <Link to="/faq" className="hover:text-white">
              Darshan Info
            </Link>
          </div>
          <div className="flex items-center gap-4">
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

      {/* Main header */}
      <header
        className={clsx(
          "sticky top-0 z-50 bg-cream/95 backdrop-blur transition-shadow duration-200",
          scrolled && "shadow-[var(--shadow-card)]",
        )}
      >
        <div className="container-page flex items-center justify-between py-3">
          <Logo />

          <nav className="hidden items-center gap-0.5 lg:flex xl:gap-1">
            {primaryNav.map((item) => (
              <div key={item.label} className="group relative shrink-0">
                {item.children ? (
                  <>
                    <button className="flex items-center gap-1 whitespace-nowrap rounded-full px-3 py-2 text-sm font-medium text-ink transition-colors hover:bg-secondary/10 hover:text-secondary xl:px-4">
                      {item.label}
                      <ChevronDown size={14} className="shrink-0 transition-transform group-hover:rotate-180" />
                    </button>
                    <div className="invisible absolute left-0 top-full z-10 w-60 pt-3 opacity-0 transition-all duration-150 group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
                      <div className="flex flex-col gap-0.5 rounded-2xl border border-hairline bg-white p-2 shadow-[var(--shadow-card-hover)]">
                        {item.children.map((child) => (
                          <NavLink
                            key={child.to}
                            to={child.to}
                            className="rounded-xl px-4 py-2.5 text-sm text-ink hover:bg-cream-alt hover:text-secondary"
                          >
                            {child.label}
                          </NavLink>
                        ))}
                      </div>
                    </div>
                  </>
                ) : (
                  <NavLink
                    to={item.to!}
                    className={({ isActive }) =>
                      clsx(
                        "block whitespace-nowrap rounded-full px-3 py-2 text-sm font-medium transition-colors hover:bg-secondary/10 hover:text-secondary xl:px-4",
                        isActive ? "text-secondary" : "text-ink",
                      )
                    }
                  >
                    {item.label}
                  </NavLink>
                )}
              </div>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <Button to="/donate" className="hidden sm:inline-flex">
              Donate Now
            </Button>
            <button
              type="button"
              className="flex h-10 w-10 items-center justify-center rounded-full text-ink hover:bg-secondary/10 lg:hidden"
              onClick={() => setMobileOpen(true)}
              aria-label="Open menu"
            >
              <Menu size={22} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile drawer */}
      <div
        className={clsx(
          "fixed inset-0 z-[90] transition-opacity duration-200 lg:hidden",
          mobileOpen ? "visible opacity-100" : "invisible opacity-0",
        )}
      >
        <div className="absolute inset-0 bg-ink-deep/60" onClick={() => setMobileOpen(false)} />
        <div
          className={clsx(
            "absolute right-0 top-0 flex h-full w-[82vw] max-w-[340px] flex-col bg-white transition-transform duration-300",
            mobileOpen ? "translate-x-0" : "translate-x-full",
          )}
        >
          <div className="flex items-center justify-between border-b border-hairline p-5">
            <span className="font-display text-lg text-ink">Menu</span>
            <button
              type="button"
              onClick={() => setMobileOpen(false)}
              className="flex h-9 w-9 items-center justify-center rounded-full text-muted hover:bg-cream-alt"
              aria-label="Close menu"
            >
              <X size={20} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-3">
            {primaryNav.map((item) => (
              <div key={item.label} className="border-b border-hairline last:border-b-0">
                {item.children ? (
                  <>
                    <button
                      className="flex w-full items-center justify-between px-3 py-3.5 text-left font-medium text-ink"
                      onClick={() =>
                        setOpenMobileGroup(openMobileGroup === item.label ? null : item.label)
                      }
                    >
                      {item.label}
                      <ChevronDown
                        size={16}
                        className={clsx(
                          "transition-transform",
                          openMobileGroup === item.label && "rotate-180",
                        )}
                      />
                    </button>
                    {openMobileGroup === item.label && (
                      <div className="flex flex-col gap-0.5 pb-3 pl-5">
                        {item.children.map((child) => (
                          <Link
                            key={child.to}
                            to={child.to}
                            onClick={() => setMobileOpen(false)}
                            className="rounded-lg px-3 py-2.5 text-sm text-muted hover:bg-cream-alt hover:text-secondary"
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  <Link
                    to={item.to!}
                    onClick={() => setMobileOpen(false)}
                    className="block px-3 py-3.5 font-medium text-ink"
                  >
                    {item.label}
                  </Link>
                )}
              </div>
            ))}
          </div>

          <div className="border-t border-hairline p-5">
            <Button to="/donate" className="w-full" onClick={() => setMobileOpen(false)}>
              Donate Now
            </Button>
            <a
              href={`tel:${siteInfo.phones.primaryTel}`}
              className="mt-3 flex items-center justify-center gap-2 text-sm text-secondary"
            >
              <Phone size={14} /> {siteInfo.phones.primary}
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
