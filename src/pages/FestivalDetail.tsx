import { useParams, Navigate, Link } from "react-router-dom";
import { Sparkles, Calendar, Clock, CheckCircle2, Eye, Flame, Music, UtensilsCrossed, MessageCircle } from "lucide-react";
import PageHero from "../components/ui/PageHero";
import SectionHeading from "../components/ui/SectionHeading";
import SevaCard from "../components/ui/SevaCard";
import Timeline from "../components/ui/Timeline";
import Card from "../components/ui/Card";
import Accordion from "../components/ui/Accordion";
import Reveal from "../components/ui/Reveal";
import Button from "../components/ui/Button";
import CountdownRow from "../components/ui/CountdownRow";
import { getFestival } from "../data/festivals";
import { siteInfo } from "../data/site";

const whatToExpect = [
  { icon: Eye, title: "Divine Darshan", body: "Behold Sri Sri Radha Gopinath adorned especially for the occasion." },
  { icon: Flame, title: "Grand Aarti", body: "Join the ceremonial worship and abhishek at the heart of the celebration." },
  { icon: Music, title: "Kirtan & Bhajans", body: "Congregational chanting fills the temple through the celebration." },
  { icon: UtensilsCrossed, title: "Prasadam", body: "Honour sanctified vegetarian prasadam with the community." },
];

export default function FestivalDetail() {
  const { slug } = useParams();
  const festival = getFestival(slug ?? "");

  if (!festival) {
    return <Navigate to="/festivals" replace />;
  }

  const hasHeroMedia = Boolean(festival.videoId || festival.heroImages?.length);

  const dateLabel = festival.date
    ? festival.endDate
      ? `${new Date(festival.date).toLocaleDateString("en-IN", { day: "numeric" })} – ${new Date(
          festival.endDate,
        ).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}`
      : new Date(festival.date).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })
    : null;

  return (
    <div>
      <PageHero
        breadcrumb={[
          { label: "Home", to: "/" },
          { label: "Festivals", to: "/festivals" },
          { label: festival.name },
        ]}
        eyebrow="Festival Celebration"
        title={festival.heading}
        subtitle={festival.tagline}
        videoId={festival.videoId}
        images={festival.heroImages}
      >
        {(dateLabel || festival.timeLabel) && (
          <div className="mt-6 flex flex-wrap gap-3">
            {dateLabel && (
              <span className="flex items-center gap-2 rounded-full bg-white/15 px-4 py-2 text-sm font-medium text-white backdrop-blur">
                <Calendar size={16} /> {dateLabel}
              </span>
            )}
            {festival.timeLabel && (
              <span className="flex items-center gap-2 rounded-full bg-white/15 px-4 py-2 text-sm font-medium text-white backdrop-blur">
                <Clock size={16} /> {festival.timeLabel}
              </span>
            )}
          </div>
        )}

        <CountdownRow target={festival.date} className="mt-6" />

        <div className="mt-6 flex flex-wrap gap-3">
          <Button href={siteInfo.donateLink} target="_blank" rel="noopener noreferrer" size="lg">
            Offer Seva
          </Button>
          <Button href={siteInfo.whatsapp.link} target="_blank" rel="noopener noreferrer" variant="ghost" size="lg">
            <MessageCircle size={16} /> Ask a Question
          </Button>
        </div>
      </PageHero>

      <section className="section-pad">
        <div className="container-page">
          <div className="grid grid-cols-2 gap-5 sm:grid-cols-4">
            {whatToExpect.map(({ icon: Icon, title, body }, i) => (
              <Reveal key={title} delay={i * 90} className="h-full">
                <Card className="group h-full items-center p-5 text-center">
                  <span className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:scale-110">
                    <Icon size={20} />
                  </span>
                  <h4 className="mt-3 text-base text-ink">{title}</h4>
                  <p className="mt-1 text-xs text-muted">{body}</p>
                </Card>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {festival.schedule && hasHeroMedia && (
        <section className="section-pad bg-cream-alt">
          <div className="container-page">
            <Reveal>
              <SectionHeading eyebrow="Event Day" title="Celebration Schedule" />
            </Reveal>
            <Reveal delay={80}>
              <Timeline items={festival.schedule.map((s) => ({ time: s.time, title: s.activity }))} />
            </Reveal>
          </div>
        </section>
      )}

      {!hasHeroMedia && festival.bannerImage && (
        <div className="container-page">
          <Reveal>
            <img
              src={festival.bannerImage}
              alt={festival.heading}
              className="mt-8 block w-full rounded-[var(--radius-card)] shadow-[var(--shadow-card)]"
            />
          </Reveal>
        </div>
      )}

      {festival.verse && (
        <section className="section-pad text-center">
          <div className="container-page">
            <Reveal>
              <p className="font-sanskrit mx-auto max-w-2xl text-xl leading-relaxed text-ink">{festival.verse}</p>
              {festival.verseRef && <p className="mt-3 text-sm text-muted">{festival.verseRef}</p>}
            </Reveal>
          </div>
        </section>
      )}
        {festival.sevaTiers && (
        <section className="section-pad">
          <div className="container-page">
            <Reveal>
              <SectionHeading eyebrow="Sponsor a Seva" title="Offerings & Sevas" />
            </Reveal>
            <div className="grid gap-6" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))" }}>
              {festival.sevaTiers.map((tier, i) => (
                <Reveal key={tier.label} delay={i * 60}>
                  <SevaCard
                    label={tier.label}
                    amount={tier.amount}
                    seva={festival.name}
                    image={tier.image}
                    razorpayLink={tier.link}
                  />
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {festival.extraTiers?.map((group) => (
        <section key={group.heading} className="section-pad bg-cream-alt">
          <div className="container-page">
            <Reveal>
              <SectionHeading eyebrow="Additional Sevas" title={group.heading} />
            </Reveal>
            <div className="grid gap-6" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))" }}>
              {group.tiers.map((tier, i) => (
                <Reveal key={tier.label} delay={i * 60}>
                  <SevaCard
                    label={tier.label}
                    amount={tier.amount}
                    seva={`${festival.name} — ${group.heading}`}
                    image={tier.image}
                    razorpayLink={tier.link}
                  />
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      ))}

      {festival.muhurat && (
        <section className="section-pad">
          <div className="container-page">
            <Reveal>
              <SectionHeading eyebrow="Date, Timings & Muhurat" title="When & Where" />
            </Reveal>
            <Reveal delay={80}>
              <Card className="mx-auto max-w-2xl overflow-hidden p-0">
                {festival.muhurat.map((row) => (
                  <div
                    key={row.label}
                    className="flex flex-col justify-between gap-1 border-b border-hairline px-6 py-4 last:border-b-0 sm:flex-row sm:items-center sm:gap-4"
                  >
                    <span className="text-sm font-medium text-muted">{row.label}</span>
                    <span className="font-display text-ink sm:text-right">{row.value}</span>
                  </div>
                ))}
              </Card>
            </Reveal>
          </div>
        </section>
      )}

      {festival.significance && (
        <section className="section-pad bg-cream-alt">
          <div className="container-page">
            <Reveal>
              <SectionHeading eyebrow="The Story" title="Why We Celebrate" />
              <p className="mx-auto max-w-3xl text-center leading-relaxed text-muted">{festival.significance}</p>
            </Reveal>
          </div>
        </section>
      )}

      {festival.howCelebrated && (
        <section className="section-pad">
          <div className="container-page">
            <Reveal>
              <SectionHeading eyebrow="Traditions" title="How the Day Is Observed" />
            </Reveal>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {festival.howCelebrated.map((item, i) => (
                <Reveal key={item.title} delay={i * 80} className="h-full">
                  <Card className="h-full p-6">
                    <h4 className="text-lg text-ink">{item.title}</h4>
                    <p className="mt-2 text-sm text-muted">{item.body}</p>
                  </Card>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {festival.vratVidhi && (
        <section className="section-pad bg-cream-alt">
          <div className="container-page">
            <Reveal>
              <SectionHeading eyebrow="Fasting Guide" title="Vrat Vidhi" />
            </Reveal>
            <Reveal delay={80}>
              <div className="mx-auto flex max-w-2xl flex-col gap-3">
                {festival.vratVidhi.map((point) => (
                  <div key={point} className="flex items-start gap-3">
                    <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-primary" />
                    <p className="text-sm text-muted">{point}</p>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </section>
      )}

      {festival.schedule && !hasHeroMedia && (
        <section className="section-pad bg-cream-alt">
          <div className="container-page">
            <Reveal>
              <SectionHeading eyebrow="Event Day" title="Celebration Schedule" />
            </Reveal>
            <Reveal delay={80}>
              <Timeline items={festival.schedule.map((s) => ({ time: s.time, title: s.activity }))} />
            </Reveal>
          </div>
        </section>
      )}

    

      {festival.notes && (
        <section className="section-pad">
          <div className="container-page">
            <Reveal>
              <SectionHeading eyebrow="Significance" title="Why We Celebrate" />
            </Reveal>
            <div className="mx-auto flex max-w-3xl flex-col gap-4">
              {festival.notes.map((note, i) => (
                <Reveal key={note} delay={i * 60}>
                  <Card row className="items-start gap-4 p-5">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gold/15 text-gold">
                      <Sparkles size={16} />
                    </span>
                    <p className="text-sm leading-relaxed text-muted">{note}</p>
                  </Card>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {festival.faqs && (
        <section className="section-pad bg-cream-alt">
          <div className="container-page">
            <Reveal>
              <SectionHeading eyebrow="Questions" title="Frequently Asked" />
            </Reveal>
            <Reveal delay={80}>
              <Accordion items={festival.faqs} />
            </Reveal>
          </div>
        </section>
      )}

      <section className="section-pad relative overflow-hidden bg-gradient-to-br from-ink to-ink-deep text-center text-white">
        <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 animate-float-slow rounded-full bg-primary/20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 -left-16 h-64 w-64 animate-float-slower rounded-full bg-secondary/25 blur-3xl" />
        <div className="container-page relative">
          <h2 className="text-[clamp(1.7rem,3vw,2.3rem)] text-white">Have a question about {festival.name}?</h2>
          <p className="mx-auto mt-3 max-w-md text-white/70">Reach out and our team will be glad to help.</p>
          <Link
            to="/contact"
            className="mt-6 inline-flex items-center justify-center rounded-full bg-gradient-to-br from-primary to-primary-light px-8 py-3 text-sm font-semibold text-white shadow-[var(--shadow-cta)] transition-transform hover:-translate-y-0.5"
          >
            Contact Us
          </Link>
        </div>
      </section>
    </div>
  );
}
