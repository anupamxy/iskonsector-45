import { useParams, Navigate, Link } from "react-router-dom";
import { Sparkles, Calendar, Clock, CheckCircle2 } from "lucide-react";
import PageHero from "../components/ui/PageHero";
import SectionHeading from "../components/ui/SectionHeading";
import SevaCard from "../components/ui/SevaCard";
import Timeline from "../components/ui/Timeline";
import Card from "../components/ui/Card";
import Accordion from "../components/ui/Accordion";
import { getFestival } from "../data/festivals";

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
      </PageHero>

      {festival.schedule && hasHeroMedia && (
        <section className="section-pad bg-cream-alt">
          <div className="container-page">
            <SectionHeading eyebrow="Event Day" title="Celebration Schedule" />
            <Timeline
              items={festival.schedule.map((s) => ({ time: s.time, title: s.activity }))}
            />
          </div>
        </section>
      )}

      {!hasHeroMedia && festival.bannerImage && (
        <div className="container-page">
          <img
            src={festival.bannerImage}
            alt={festival.heading}
            className="mt-8 block w-full rounded-[var(--radius-card)] shadow-[var(--shadow-card)]"
          />
        </div>
      )}

      {festival.verse && (
        <section className="section-pad text-center">
          <div className="container-page">
            <p className="font-sanskrit mx-auto max-w-2xl text-xl leading-relaxed text-ink">
              {festival.verse}
            </p>
            {festival.verseRef && <p className="mt-3 text-sm text-muted">{festival.verseRef}</p>}
          </div>
        </section>
      )}

      {festival.muhurat && (
        <section className="section-pad">
          <div className="container-page">
            <SectionHeading eyebrow="Date, Timings & Muhurat" title="When & Where" />
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
          </div>
        </section>
      )}

      {festival.significance && (
        <section className="section-pad bg-cream-alt">
          <div className="container-page">
            <SectionHeading eyebrow="The Story" title="Why We Celebrate" />
            <p className="mx-auto max-w-3xl text-center leading-relaxed text-muted">
              {festival.significance}
            </p>
          </div>
        </section>
      )}

      {festival.howCelebrated && (
        <section className="section-pad">
          <div className="container-page">
            <SectionHeading eyebrow="Traditions" title="How the Day Is Observed" />
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {festival.howCelebrated.map((item) => (
                <Card key={item.title} className="p-6">
                  <h4 className="text-lg text-ink">{item.title}</h4>
                  <p className="mt-2 text-sm text-muted">{item.body}</p>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {festival.vratVidhi && (
        <section className="section-pad bg-cream-alt">
          <div className="container-page">
            <SectionHeading eyebrow="Fasting Guide" title="Vrat Vidhi" />
            <div className="mx-auto flex max-w-2xl flex-col gap-3">
              {festival.vratVidhi.map((point) => (
                <div key={point} className="flex items-start gap-3">
                  <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-primary" />
                  <p className="text-sm text-muted">{point}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {festival.schedule && !hasHeroMedia && (
        <section className="section-pad bg-cream-alt">
          <div className="container-page">
            <SectionHeading eyebrow="Event Day" title="Celebration Schedule" />
            <Timeline
              items={festival.schedule.map((s) => ({ time: s.time, title: s.activity }))}
            />
          </div>
        </section>
      )}

      {festival.sevaTiers && (
        <section className="section-pad">
          <div className="container-page">
            <SectionHeading eyebrow="Sponsor a Seva" title="Offerings & Sevas" />
            <div className="grid gap-6" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))" }}>
              {festival.sevaTiers.map((tier) => (
                <SevaCard
                  key={tier.label}
                  label={tier.label}
                  amount={tier.amount}
                  seva={festival.name}
                  image={tier.image}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {festival.extraTiers?.map((group) => (
        <section key={group.heading} className="section-pad bg-cream-alt">
          <div className="container-page">
            <SectionHeading eyebrow="Additional Sevas" title={group.heading} />
            <div className="grid gap-6" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))" }}>
              {group.tiers.map((tier) => (
                <SevaCard
                  key={tier.label}
                  label={tier.label}
                  amount={tier.amount}
                  seva={`${festival.name} — ${group.heading}`}
                  image={tier.image}
                />
              ))}
            </div>
          </div>
        </section>
      ))}

      {festival.notes && (
        <section className="section-pad">
          <div className="container-page">
            <SectionHeading eyebrow="Significance" title="Why We Celebrate" />
            <div className="mx-auto flex max-w-3xl flex-col gap-4">
              {festival.notes.map((note) => (
                <Card key={note} row className="items-start gap-4 p-5">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gold/15 text-gold">
                    <Sparkles size={16} />
                  </span>
                  <p className="text-sm leading-relaxed text-muted">{note}</p>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {festival.faqs && (
        <section className="section-pad bg-cream-alt">
          <div className="container-page">
            <SectionHeading eyebrow="Questions" title="Frequently Asked" />
            <Accordion items={festival.faqs} />
          </div>
        </section>
      )}

      <section className="section-pad bg-gradient-to-br from-ink to-ink-deep text-center text-white">
        <div className="container-page">
          <h2 className="text-[clamp(1.7rem,3vw,2.3rem)] text-white">
            Have a question about {festival.name}?
          </h2>
          <p className="mx-auto mt-3 max-w-md text-white/70">
            Reach out and our team will be glad to help.
          </p>
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
