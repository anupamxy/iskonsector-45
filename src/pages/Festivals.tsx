import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { PartyPopper, ArrowRight, Music, Users, Sparkles, CalendarHeart } from "lucide-react";
import PageHero from "../components/ui/PageHero";
import SectionHeading from "../components/ui/SectionHeading";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";
import Reveal from "../components/ui/Reveal";
import FestivalDateBadge from "../components/ui/FestivalDateBadge";
import CountdownRow from "../components/ui/CountdownRow";
import { useCountdown } from "../lib/useCountdown";
import { visibleFestivals, type Festival } from "../data/festivals";
import { siteInfo } from "../data/site";
import { images } from "../data/images";

const whyCelebrate = [
  {
    icon: Music,
    title: "Kirtan & Bhajan",
    body: "Congregational chanting of the holy names lifts the spirit and connects the whole community.",
  },
  {
    icon: Users,
    title: "Community & Seva",
    body: "Festivals bring devotees together to serve, cook, decorate, and celebrate as one family.",
  },
  {
    icon: Sparkles,
    title: "Spiritual Renewal",
    body: "Each celebration retells a sacred pastime, refreshing our connection to Krishna consciousness.",
  },
];

function useNextFestival(festivals: Festival[]) {
  const [now] = useState(() => Date.now());
  return useMemo(() => {
    return festivals
      .filter((f) => f.date && new Date(f.date).getTime() > now)
      .sort((a, b) => new Date(a.date!).getTime() - new Date(b.date!).getTime())[0];
  }, [festivals, now]);
}

function NextFestivalStrip({ festival }: { festival: Festival }) {
  const countdown = useCountdown(festival.date);
  if (!countdown || countdown.isPast) return null;

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-ink to-ink-deep">
      <div className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 animate-float-slow rounded-full bg-primary/25 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-20 left-1/4 h-56 w-56 animate-float-slower rounded-full bg-secondary/20 blur-3xl" />
      <div className="container-page relative flex flex-col items-center gap-6 py-8 sm:flex-row sm:justify-between sm:py-10">
        <div className="flex items-center gap-4 text-center sm:text-left">
          <span className="hidden h-12 w-12 shrink-0 animate-glow-pulse items-center justify-center rounded-full bg-primary/20 text-primary-light sm:flex">
            <CalendarHeart size={22} />
          </span>
          <div>
            <p className="text-eyebrow text-primary-light">Coming Up Next</p>
            <h3 className="mt-1 text-[clamp(1.3rem,2.4vw,1.8rem)] text-white">{festival.name}</h3>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <CountdownRow target={festival.date} showLabel={false} />
          <Button to={`/festivals/${festival.slug}`} size="md" className="hidden sm:inline-flex">
            View Details
          </Button>
        </div>
        <Button to={`/festivals/${festival.slug}`} size="md" className="sm:hidden">
          View Details
        </Button>
      </div>
    </section>
  );
}

export default function Festivals() {
  const nextFestival = useNextFestival(visibleFestivals);

  return (
    <div>
      <PageHero
        breadcrumb={[{ label: "Home", to: "/" }, { label: "Festivals" }]}
        eyebrow="Vaishnava Calendar"
        title="Festivals at ISKCON Gurugram, Sector 45"
        subtitle="Join us through the year for kirtan, abhishekam, and community celebration. Exact dates are announced closer to each festival — follow our social channels or contact us for this year's schedule."
        images={[{ src: images.pageHero.festivals, position: "center 30%" }]}
      />

      {nextFestival && <NextFestivalStrip festival={nextFestival} />}

      <section className="section-pad">
        <div className="container-page">
          <Reveal>
            <SectionHeading eyebrow="Celebrate With Us" title="All Festivals" />
          </Reveal>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {visibleFestivals.map((festival, i) => {
              const isNext = festival.slug === nextFestival?.slug;
              return (
                <Reveal key={festival.slug} delay={i * 90}>
                  <Link
                    to={`/festivals/${festival.slug}`}
                    className={`group relative flex h-full flex-col overflow-hidden rounded-[var(--radius-card)] bg-white shadow-[var(--shadow-card)] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[var(--shadow-card-hover)] ${
                      isNext ? "ring-2 ring-primary/40" : ""
                    }`}
                  >
                    <div className="relative h-40 w-full overflow-hidden bg-cream-alt">
                      {festival.bannerImage && (
                        <img
                          src={festival.bannerImage}
                          alt={festival.name}
                          className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-110"
                          style={{ objectPosition: festival.bannerPosition ?? "center" }}
                        />
                      )}
                      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 via-black/0 to-black/0" />
                      {festival.date && <FestivalDateBadge date={festival.date} />}
                      {isNext && (
                        <span className="absolute left-4 top-4 z-10 rounded-full bg-primary px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-wider text-white shadow">
                          Next Up
                        </span>
                      )}
                    </div>

                    <div className="flex flex-1 flex-col p-6">
                      <span className="flex h-11 w-11 items-center justify-center rounded-full bg-primary/10 text-primary transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:scale-110">
                        <PartyPopper size={20} />
                      </span>
                      <h3 className="mt-4 text-xl text-ink">{festival.heading}</h3>
                      <p className="mt-2 flex-1 text-sm text-muted">{festival.tagline}</p>
                      <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-secondary">
                        View Details{" "}
                        <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1.5" />
                      </span>
                    </div>
                  </Link>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section-pad bg-cream-alt">
        <div className="container-page">
          <Reveal>
            <SectionHeading eyebrow="Why Celebrate" title="More Than a Calendar Date" />
          </Reveal>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
            {whyCelebrate.map(({ icon: Icon, title, body }, i) => (
              <Reveal key={title} delay={i * 100}>
                <Card className="group items-center p-6 text-center">
                  <span className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary transition-transform duration-300 group-hover:rotate-6 group-hover:scale-110">
                    <Icon size={20} />
                  </span>
                  <h4 className="mt-3 text-lg text-ink">{title}</h4>
                  <p className="mt-1 text-sm text-muted">{body}</p>
                </Card>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad relative overflow-hidden text-center">
        <div className="pointer-events-none absolute -right-20 top-10 h-64 w-64 animate-float-slow rounded-full bg-primary/10 blur-3xl" />
        <div className="pointer-events-none absolute -left-20 bottom-0 h-64 w-64 animate-float-slower rounded-full bg-secondary/10 blur-3xl" />
        <div className="container-page relative">
          <Reveal>
            <SectionHeading
              eyebrow="Don't Miss Out"
              title="Follow Us for This Year's Dates"
              subtitle="Exact festival dates follow the Vaishnava lunar calendar and are announced closer to each celebration."
            />
          </Reveal>
          <Reveal delay={120}>
            <div className="flex flex-wrap justify-center gap-4">
              <Button href={siteInfo.social.instagram} target="_blank" rel="noopener noreferrer" variant="outline">
                Follow on Instagram
              </Button>
              <Button href={siteInfo.whatsapp.link} target="_blank" rel="noopener noreferrer" variant="whatsapp">
                WhatsApp Us
              </Button>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
