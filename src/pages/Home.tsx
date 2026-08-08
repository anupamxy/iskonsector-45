import { Link } from "react-router-dom";
import {
  Clock,
  HeartHandshake,
  BookOpen,
  MapPin,
  GraduationCap,
  UtensilsCrossed,
  HandHeart,
  PartyPopper,
  Bike,
  Award,
  Compass,
  ArrowRight,
  MessageCircle,
  Image as ImageIcon,
  Gift,
  Video,
  Info,
} from "lucide-react";
import Button from "../components/ui/Button";
import Card from "../components/ui/Card";
import SectionHeading from "../components/ui/SectionHeading";
import SevaCard from "../components/ui/SevaCard";
import HeroCarousel from "../components/ui/HeroCarousel";
import FestivalCountdownCarousel from "../components/ui/FestivalCountdownCarousel";
import JoinFamilyForm from "../components/ui/JoinFamilyForm";
import StatCounter from "../components/ui/StatCounter";
import Badge from "../components/ui/Badge";
import { siteInfo } from "../data/site";
import { founder, leadership, pillars } from "../data/about";
import { deitySeva } from "../data/donations";
import { festivals } from "../data/festivals";
import { images } from "../data/images";

const impactStats = [
  { value: "1966", label: "ISKCON Founded" },
  { value: "700+", label: "Centers Worldwide" },
  { value: "560M+", label: "Books Distributed" },
  { value: "5", label: "Seva Programs Here" },
];

const exploreLinks = [
  { icon: Info, label: "About Us", to: "/about" },
  { icon: HandHeart, label: "Temple & Seva", to: "/temple" },
  { icon: PartyPopper, label: "Festivals", to: "/festivals" },
  { icon: ImageIcon, label: "Gallery", to: "/gallery" },
  { icon: Gift, label: "Gift Shop", to: "/gift-shop" },
  { icon: Video, label: "Lecture Videos", to: "/lecture-videos" },
];

const upcomingFestivals = festivals
  .filter((f) => f.showInHomeHero && f.date && new Date(f.date).getTime() > Date.now())
  .sort((a, b) => new Date(a.date!).getTime() - new Date(b.date!).getTime());

const festivalBadges: Record<string, string> = {
  "jhulan-yatra": "The Swing Festival",
  "balrama-purnima": "Lord Balarama's Appearance Day",
  janmashtami: "Krishna's Appearance Day",
  "srila-prabhupada-appearance-day": "Founder Acharya's Appearance Day",
  radhashtami: "Radharani's Appearance Day",
  "ram-navami": "Lord Rama's Appearance Day",
  "rath-yatra": "Chariot Festival",
};

const sevaImages: Record<string, string> = {
  "Mangala Arti": images.home.sevaMangalaArti,
  "Rajbhoga Arti": images.home.sevaRajbhogaArti,
  "Mangala Bhoga": images.home.sevaMangalaBhoga,
  Rajbhoga: images.home.sevaRajbhoga,
};

const galleryTeaser = [
  ...images.galleryTemple.slice(0, 2),
  ...images.galleryJanmashtami.slice(0, 2),
];

const quickLinks = [
  { icon: Clock, label: "Darshan Timings", to: "/faq" },
  { icon: HeartHandshake, label: "Offer Seva", to: "/donate" },
  { icon: BookOpen, label: "Gita Daan", to: "/gita-daan" },
  { icon: MapPin, label: "Visit Us", to: "/contact" },
];

const pillarIcons = [GraduationCap, UtensilsCrossed, HandHeart, PartyPopper];

const programs = [
  {
    icon: UtensilsCrossed,
    title: "Food For Life",
    body: "Sponsor sanctified meals and feasts for the community.",
    to: "/food-for-life",
  },
  {
    icon: Bike,
    title: "Govinda's On Wheel",
    body: "Pure vegetarian prasadam, delivered to your door.",
    to: "/govindas-on-wheel",
  },
  {
    icon: Award,
    title: "Life Patron",
    body: "Become a lifetime member and support the temple's mission.",
    to: "/life-patron",
  },
  {
    icon: Compass,
    title: "DYPH",
    body: "A 6-week course to discover your permanent happiness.",
    to: "/dyph",
  },
];

export default function Home() {
  return (
    <div>
      {/* Hero */}
      {upcomingFestivals.length > 0 ? (
        <FestivalCountdownCarousel festivals={upcomingFestivals} />
      ) : (
        <section className="relative overflow-hidden bg-gradient-to-br from-ink to-ink-deep text-white">
          <div className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-primary/20 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-32 -left-20 h-96 w-96 rounded-full bg-secondary/25 blur-3xl" />
          <div className="container-page relative grid grid-cols-1 items-center gap-12 py-16 sm:py-24 lg:grid-cols-2">
            <div>
              <p className="text-eyebrow mb-4 text-primary-light">Sri Sri Radha Gopinath Mandir</p>
              <h1 className="text-[clamp(2.3rem,5vw,4rem)] text-white">
                Welcome to ISKCON Gurugram, Sector 45
              </h1>
              <p className="mt-5 max-w-lg text-white/70">{siteInfo.tagline}</p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Button to="/contact" size="lg">
                  Plan Your Visit
                </Button>
                <Button to="/donate" variant="ghost" size="lg">
                  Offer Seva
                </Button>
              </div>
            </div>
            <HeroCarousel images={images.home.hero} alt="ISKCON Gurugram, Sector 45" />
          </div>
        </section>
      )}

      {/* Quick strip */}
      <section className="bg-secondary">
        <div className="container-page grid grid-cols-2 gap-4 py-8 sm:grid-cols-4">
          {quickLinks.map(({ icon: Icon, label, to }) => (
            <Link
              key={label}
              to={to}
              className="flex flex-col items-center gap-2 rounded-2xl py-3 text-center text-white transition-colors hover:bg-white/10"
            >
              <Icon size={24} />
              <span className="text-sm font-medium">{label}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* About teaser */}
      <section className="section-pad">
        <div className="container-page grid grid-cols-1 items-center gap-14 lg:grid-cols-2">
          <img
            src={images.krishnaArt}
            alt="Sri Krishna"
            className="aspect-[4/3] w-full rounded-[var(--radius-card)] object-cover object-[50%_20%] shadow-[var(--shadow-card)]"
          />
          <div>
            <p className="text-eyebrow mb-3 text-primary">Our Story</p>
            <h2 className="text-[clamp(1.9rem,3.4vw,2.7rem)]">
              Carrying Srila Prabhupada's mission forward in Gurugram
            </h2>
            <p className="mt-5 border-l-2 border-primary/40 pl-4 italic text-muted">
              Founded on the vision of {founder.name}, ISKCON Gurugram, Sector 45 exists to
              nurture devotion through seva, festivals, and kirtan — guiding every visitor toward
              Krishna consciousness.
            </p>
            <div className="mt-8 grid grid-cols-2 gap-5">
              {pillars.map((pillar, i) => {
                const Icon = pillarIcons[i];
                return (
                  <div key={pillar.title} className="flex items-start gap-3">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                      <Icon size={18} />
                    </span>
                    <div>
                      <p className="font-medium text-ink">{pillar.title}</p>
                      <p className="text-xs text-muted">{pillar.body}</p>
                    </div>
                  </div>
                );
              })}
            </div>
            <Link to="/about" className="mt-8 inline-flex items-center gap-1.5 font-semibold text-secondary hover:text-secondary-deep">
              About ISKCON Gurugram Sector 45 <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* Deity Seva */}
      <section className="section-pad bg-cream-alt">
        <div className="container-page">
          <SectionHeading
            eyebrow="Archa Vigraha Seva"
            title="Offer Seva to Sri Sri Radha Gopinath"
            subtitle="Sponsor the daily worship of the deities and receive Their special blessings."
          />
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {deitySeva.map((tier) => (
              <SevaCard
                key={tier.label}
                label={tier.label}
                amount={tier.amount}
                seva="Archa Vigraha Seva"
                image={sevaImages[tier.label]}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Programs */}
      <section className="section-pad">
        <div className="container-page">
          <SectionHeading
            eyebrow="Temple & Seva"
            title="Ways We Serve the Community"
            subtitle="From daily meals to youth programs, explore how ISKCON Sector 45 lives out its mission."
          />
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {programs.map(({ icon: Icon, title, body, to }) => (
              <Card key={title} className="p-6">
                <span className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-secondary/10 text-secondary">
                  <Icon size={22} />
                </span>
                <h4 className="text-lg text-ink">{title}</h4>
                <p className="mt-2 flex-1 text-sm text-muted">{body}</p>
                <Link to={to} className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-secondary hover:text-secondary-deep">
                  Learn more <ArrowRight size={14} />
                </Link>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Impact */}
      <section className="section-pad bg-gradient-to-br from-ink to-ink-deep">
        <div className="container-page">
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
            {impactStats.map((stat) => (
              <StatCounter key={stat.label} value={stat.value} label={stat.label} />
            ))}
          </div>
        </div>
      </section>

      {/* Festivals */}
      <section className="section-pad bg-cream-alt">
        <div className="container-page">
          <SectionHeading eyebrow="Vaishnava Calendar" title="All Festivals We Celebrate" />
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {festivals.map((festival) => (
              <Link
                key={festival.slug}
                to={`/festivals/${festival.slug}`}
                className="group flex flex-col rounded-[var(--radius-card)] bg-white p-6 shadow-[var(--shadow-card)] transition-all hover:-translate-y-1 hover:shadow-[var(--shadow-card-hover)]"
              >
                <div className="flex items-start justify-between gap-3">
                  <PartyPopper className="text-primary" size={26} />
                  {festivalBadges[festival.slug] && <Badge tone="saffron">{festivalBadges[festival.slug]}</Badge>}
                </div>
                <h4 className="mt-4 text-xl text-ink">{festival.name}</h4>
                <p className="mt-2 flex-1 text-sm text-muted">{festival.tagline}</p>
                <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-secondary">
                  View details <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership */}
      <section className="section-pad">
        <div className="container-page">
          <SectionHeading eyebrow="Our Guiding Lights" title="Founder & Leadership" />
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
            <Card className="items-center p-6 text-center">
              <img src={founder.image} alt={founder.name} className="aspect-[5/3] w-full max-w-[260px] mx-auto rounded-lg object-cover" />
              <h4 className="mt-4 text-lg text-ink">{founder.name}</h4>
              <p className="text-sm text-muted">{founder.title}</p>
            </Card>
            {leadership.map((leader) => (
              <Card key={leader.name} className="items-center p-6 text-center">
                <img src={leader.image} alt={leader.name} className="aspect-[5/3] w-full max-w-[260px] mx-auto rounded-lg object-cover" />
                <h4 className="mt-4 text-lg text-ink">{leader.name}</h4>
                <p className="text-sm text-muted">{leader.title}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery teaser */}
      <section className="section-pad bg-cream-alt">
        <div className="container-page">
          <SectionHeading eyebrow="Moments of Devotion" title="From Our Gallery" />
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {galleryTeaser.map((src) => (
              <img
                key={src}
                src={src}
                alt="ISKCON Gurugram, Sector 45 gallery"
                className="aspect-square w-full rounded-[var(--radius-card)] object-cover shadow-[var(--shadow-card)]"
              />
            ))}
          </div>
          <div className="mt-8 text-center">
            <Button to="/gallery" variant="outline">
              View Full Gallery
            </Button>
          </div>
        </div>
      </section>

      {/* Visit us */}
      <section className="section-pad">
        <div className="container-page grid grid-cols-1 gap-10 lg:grid-cols-[1.05fr_1fr]">
          <Card className="p-8">
            <h3 className="text-xl text-ink">Visit ISKCON Gurugram, Sector 45</h3>
            <div className="mt-6 flex flex-col gap-5 text-sm">
              <div className="flex items-start gap-3">
                <MapPin size={18} className="mt-0.5 shrink-0 text-primary" />
                <span className="text-muted">{siteInfo.address.full}</span>
              </div>
              <div className="flex items-start gap-3">
                <Clock size={18} className="mt-0.5 shrink-0 text-primary" />
                <span className="text-muted">
                  Darshan timings vary — call or WhatsApp us before you visit.
                </span>
              </div>
            </div>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button href={siteInfo.mapsUrl} target="_blank" rel="noopener noreferrer" variant="secondary">
                Get Directions
              </Button>
              <Button href={siteInfo.whatsapp.link} target="_blank" rel="noopener noreferrer" variant="whatsapp">
                <MessageCircle size={16} /> WhatsApp Us
              </Button>
            </div>
          </Card>
          <div className="overflow-hidden rounded-[var(--radius-card)] shadow-[var(--shadow-card)]">
            <iframe
              title="ISKCON Gurugram Sector 45 map"
              src={`https://www.google.com/maps?q=${encodeURIComponent(siteInfo.address.full)}&output=embed`}
              className="h-full min-h-[320px] w-full"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>

      {/* Explore */}
      <section className="section-pad">
        <div className="container-page">
          <SectionHeading eyebrow="Find Your Way Around" title="Explore the Site" />
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
            {exploreLinks.map(({ icon: Icon, label, to }) => (
              <Link
                key={label}
                to={to}
                className="flex flex-col items-center gap-3 rounded-[var(--radius-card)] bg-white p-5 text-center shadow-[var(--shadow-card)] transition-all hover:-translate-y-1 hover:shadow-[var(--shadow-card-hover)]"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <Icon size={20} />
                </span>
                <span className="text-sm font-medium text-ink">{label}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Join family */}
      <section className="section-pad bg-gradient-to-br from-ink to-ink-deep text-white">
        <div className="container-page grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="text-eyebrow mb-3 text-primary-light">Get Involved</p>
            <h2 className="text-[clamp(1.9rem,3.4vw,2.7rem)] text-white">Join the ISKCON Family</h2>
            <p className="mt-4 max-w-md text-white/70">
              Sign up to stay connected with temple programs, festivals, and seva opportunities.
            </p>
          </div>
          <JoinFamilyForm />
        </div>
      </section>

      {/* WhatsApp CTA band */}
      <section className="bg-gradient-to-r from-primary to-primary-light">
        <div className="container-page flex flex-col items-center justify-between gap-5 py-10 text-center sm:flex-row sm:text-left">
          <div>
            <h3 className="text-2xl text-white">Stay Connected, Hare Krishna Style</h3>
            <p className="mt-1 text-white/85">
              Get daily darshan updates, festival alerts, and seva reminders on WhatsApp.
            </p>
          </div>
          <Button href={siteInfo.whatsapp.link} target="_blank" rel="noopener noreferrer" variant="ghost" size="lg" className="shrink-0">
            <MessageCircle size={18} /> Join on WhatsApp
          </Button>
        </div>
      </section>
    </div>
  );
}
