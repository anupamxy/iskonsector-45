import { useState } from "react";
import { Link } from "react-router-dom";
import { MapPin, Phone, Mail, Send } from "lucide-react";
import { siteInfo, footerNav } from "../../data/site";
import { FacebookIcon, InstagramIcon, YoutubeIcon } from "../ui/SocialIcons";
import { images } from "../../data/images";

function FooterCol({ title, links }: { title: string; links: { label: string; to: string }[] }) {
  return (
    <div>
      <h4 className="text-eyebrow mb-4 text-white/50">{title}</h4>
      <ul className="flex flex-col gap-2.5">
        {links.map((link) => (
          <li key={link.to}>
            {link.to.startsWith("http") ? (
              <a
                href={link.to}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-white/75 transition-colors hover:text-primary-light"
              >
                {link.label}
              </a>
            ) : (
              <Link to={link.to} className="text-sm text-white/75 transition-colors hover:text-primary-light">
                {link.label}
              </Link>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Footer() {
  const [subscribed, setSubscribed] = useState(false);

  return (
    <footer className="bg-ink-deep text-white/80">
      <div className="container-page grid grid-cols-1 gap-10 py-14 sm:grid-cols-2 lg:grid-cols-[1.6fr_1fr_1fr_1fr]">
        <div>
          <Link to="/" className="mb-4 flex items-center gap-2.5">
            <img src={images.logo} alt="ISKCON Gurugram Sector 45 logo" className="h-11 w-11 shrink-0 rounded-lg bg-white/90 object-contain p-1" />
            <span className="font-display text-lg text-white">ISKCON Gurugram, Sector 45</span>
          </Link>
          <p className="mb-5 max-w-sm text-sm leading-relaxed text-white/60">{siteInfo.description}</p>
          <div className="flex flex-col gap-2.5 text-sm">
            <span className="flex items-start gap-2.5 text-white/70">
              <MapPin size={16} className="mt-0.5 shrink-0" /> {siteInfo.address.full}
            </span>
            <a href={`tel:${siteInfo.phones.primaryTel}`} className="flex items-center gap-2.5 text-white/70 hover:text-primary-light">
              <Phone size={16} /> {siteInfo.phones.primary} · {siteInfo.phones.secondary}
            </a>
            <a href={`mailto:${siteInfo.email}`} className="flex items-center gap-2.5 text-white/70 hover:text-primary-light">
              <Mail size={16} /> {siteInfo.email}
            </a>
          </div>
          <div className="mt-5 flex items-center gap-3">
            <a href={siteInfo.social.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 hover:bg-primary">
              <FacebookIcon size={16} />
            </a>
            <a href={siteInfo.social.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 hover:bg-primary">
              <InstagramIcon size={16} />
            </a>
            <a href={siteInfo.social.youtube} target="_blank" rel="noopener noreferrer" aria-label="YouTube" className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 hover:bg-primary">
              <YoutubeIcon size={16} />
            </a>
          </div>
        </div>

        <FooterCol title="Explore" links={footerNav.explore} />
        <FooterCol title="Get Involved" links={footerNav.involved} />

        <div>
          <FooterCol title="Legal" links={footerNav.legal} />
          <h4 className="text-eyebrow mb-3 mt-6 text-white/50">Newsletter</h4>
          {subscribed ? (
            <p className="text-sm text-primary-light">Thank you — Hare Krishna! 🙏</p>
          ) : (
            <form
              className="flex items-center gap-1 rounded-full bg-white/10 p-1"
              onSubmit={(e) => {
                e.preventDefault();
                setSubscribed(true);
              }}
            >
              <input
                type="email"
                required
                placeholder="Your email"
                className="w-full min-w-0 flex-1 bg-transparent px-3 py-1.5 text-sm text-white placeholder:text-white/40 focus:outline-none"
              />
              <button
                type="submit"
                aria-label="Subscribe"
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-white"
              >
                <Send size={14} />
              </button>
            </form>
          )}
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-page flex flex-col items-center justify-between gap-3 py-5 text-xs text-white/50 sm:flex-row">
          <p>{siteInfo.copyright}</p>
          <div className="flex items-center gap-5">
            <Link to="/privacy-policy" className="hover:text-white">Privacy Policy</Link>
            <Link to="/terms-and-conditions" className="hover:text-white">Terms</Link>
            <Link to="/faq" className="hover:text-white">FAQ</Link>
            <Link to="/contact" className="hover:text-white">Contact</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
