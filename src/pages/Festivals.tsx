import { Link } from "react-router-dom";
import { PartyPopper, ArrowRight, Music, Users, Sparkles } from "lucide-react";
import PageHero from "../components/ui/PageHero";
import SectionHeading from "../components/ui/SectionHeading";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";
import { visibleFestivals } from "../data/festivals";
import { siteInfo } from "../data/site";

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

export default function Festivals() {
  return (
    <div>
      <PageHero
        breadcrumb={[{ label: "Home", to: "/" }, { label: "Festivals" }]}
        eyebrow="Vaishnava Calendar"
        title="Festivals at ISKCON Gurugram, Sector 45"
        subtitle="Join us through the year for kirtan, abhishekam, and community celebration. Exact dates are announced closer to each festival — follow our social channels or contact us for this year's schedule."
      />

      <section className="section-pad">
        <div className="container-page">
          <SectionHeading eyebrow="Celebrate With Us" title="All Festivals" />
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
            {visibleFestivals.map((festival) => (
              <Link
                key={festival.slug}
                to={`/festivals/${festival.slug}`}
                className="group flex flex-col rounded-[var(--radius-card)] bg-white p-6 shadow-[var(--shadow-card)] transition-all hover:-translate-y-1 hover:shadow-[var(--shadow-card-hover)]"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <PartyPopper size={22} />
                </span>
                <h3 className="mt-4 text-xl text-ink">{festival.heading}</h3>
                <p className="mt-2 flex-1 text-sm text-muted">{festival.tagline}</p>
                <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-secondary">
                  View Details{" "}
                  <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad bg-cream-alt">
        <div className="container-page">
          <SectionHeading eyebrow="Why Celebrate" title="More Than a Calendar Date" />
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
            {whyCelebrate.map(({ icon: Icon, title, body }) => (
              <Card key={title} className="items-center p-6 text-center">
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <Icon size={20} />
                </span>
                <h4 className="mt-3 text-lg text-ink">{title}</h4>
                <p className="mt-1 text-sm text-muted">{body}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad text-center">
        <div className="container-page">
          <SectionHeading
            eyebrow="Don't Miss Out"
            title="Follow Us for This Year's Dates"
            subtitle="Exact festival dates follow the Vaishnava lunar calendar and are announced closer to each celebration."
          />
          <div className="flex flex-wrap justify-center gap-4">
            <Button href={siteInfo.social.instagram} target="_blank" rel="noopener noreferrer" variant="outline">
              Follow on Instagram
            </Button>
            <Button href={siteInfo.whatsapp.link} target="_blank" rel="noopener noreferrer" variant="whatsapp">
              WhatsApp Us
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
