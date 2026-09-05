import {
  Calendar,
  Users,
  UtensilsCrossed,
  MessageCircle,
  Mail,
  Quote,
  QrCode,
  ExternalLink,
  Sparkles,
  Smile,
  HeartHandshake,
  Scale,
  HelpCircle,
  Flower2,
  Target,
} from "lucide-react";
import PageHero from "../components/ui/PageHero";
import SectionHeading from "../components/ui/SectionHeading";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";
import Reveal from "../components/ui/Reveal";
import { dyph } from "../data/programs";
import { siteInfo } from "../data/site";
import { images } from "../data/images";

const info = [
  { icon: Calendar, label: "Format", value: "6 weeks, Sundays, at the temple" },
  { icon: Users, label: "Eligibility", value: "Age 20+, any background" },
  { icon: UtensilsCrossed, label: "Included", value: "Prasadam after every session" },
];

const sessionStyles = [
  { icon: Smile, tone: "bg-primary/10 text-primary" },
  { icon: HeartHandshake, tone: "bg-secondary/10 text-secondary" },
  { icon: Scale, tone: "bg-gold/15 text-gold" },
  { icon: HelpCircle, tone: "bg-primary/10 text-primary" },
  { icon: Flower2, tone: "bg-secondary/10 text-secondary" },
  { icon: Target, tone: "bg-gold/15 text-gold" },
];

const marqueeWords = ["PURPOSE", "CLARITY", "COMMUNITY", "BALANCE", "GROWTH", "PEACE OF MIND"];

const enrollMessage = encodeURIComponent(
  "Hare Krishna, I would like to enroll in the DYPH (Discover Your Permanent Happiness) course.",
);

export default function Dyph() {
  return (
    <div>
      <PageHero
        breadcrumb={[
          { label: "Home", to: "/" },
          { label: "Temple & Seva", to: "/temple" },
          { label: "DYPH" },
        ]}
        eyebrow="A Course Built for Youth — Age 20+"
        title="Discover Your Permanent Happiness"
        subtitle={dyph.intro}
        images={[{ src: images.pageHero.dyph, position: "center 40%" }]}
      >
        <div className="mt-6 flex flex-wrap gap-2.5">
          {["Students", "Young Professionals", "Zero Experience Needed"].map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-white/25 bg-white/10 px-3.5 py-1.5 text-xs font-semibold text-white backdrop-blur"
            >
              {tag}
            </span>
          ))}
        </div>
      </PageHero>

      <div className="group overflow-hidden border-y border-hairline bg-gradient-to-r from-primary to-primary-light py-3">
        <div
          className="flex w-max gap-10 motion-safe:animate-marquee group-hover:[animation-play-state:paused]"
          style={{ animationDuration: "26s" }}
        >
          {[...marqueeWords, ...marqueeWords].map((word, i) => (
            <span key={`${word}-${i}`} className="flex items-center gap-10 text-sm font-semibold tracking-[0.2em] text-white">
              {word}
              <Sparkles size={14} className="text-white/70" />
            </span>
          ))}
        </div>
      </div>

      <section className="section-pad">
        <div className="container-page grid grid-cols-1 gap-6 sm:grid-cols-3">
          {info.map(({ icon: Icon, label, value }, i) => (
            <Reveal key={label} delay={i * 90} className="h-full">
              <Card className="group h-full items-center p-6 text-center">
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-secondary/10 text-secondary transition-transform duration-300 group-hover:scale-110">
                  <Icon size={22} />
                </span>
                <p className="mt-3 text-xs font-semibold uppercase tracking-wide text-muted">{label}</p>
                <p className="mt-1 font-display text-lg text-ink">{value}</p>
              </Card>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="section-pad bg-cream-alt">
        <div className="container-page">
          <Reveal>
            <SectionHeading
              eyebrow="6 Weeks That Change Things"
              title="What You'll Explore"
              subtitle="Real questions young people actually wrestle with — answered with practical, timeless wisdom."
            />
          </Reveal>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {dyph.sessions.map((session, i) => {
              const { icon: Icon, tone } = sessionStyles[i % sessionStyles.length];
              return (
                <Reveal key={session.title} delay={i * 80} className="h-full">
                  <Card className="group h-full p-6">
                    <span
                      className={`flex h-11 w-11 items-center justify-center rounded-full transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-110 ${tone}`}
                    >
                      <Icon size={20} />
                    </span>
                    <h4 className="mt-3 text-lg text-ink">{session.title}</h4>
                    {session.body && <p className="mt-1.5 text-sm text-muted">{session.body}</p>}
                  </Card>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section-pad">
        <div className="container-page">
          <Reveal>
            <SectionHeading eyebrow="Real Stories, Real Change" title="Read Our Testimonials" />
          </Reveal>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            {dyph.testimonials.map((testimonial, i) => (
              <Reveal key={testimonial.name} delay={i * 90} className="h-full">
                <Card className="h-full p-6">
                  <Quote size={22} className="text-primary/30" />
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">"{testimonial.quote}"</p>
                  <p className="mt-4 text-sm font-semibold text-ink">{testimonial.name}</p>
                  <p className="text-xs text-muted">{testimonial.role}</p>
                </Card>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-gradient-to-br from-ink to-ink-deep py-16 text-center text-white sm:py-20">
        <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 animate-float-slow rounded-full bg-primary/25 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 -left-16 h-72 w-72 animate-float-slower rounded-full bg-secondary/25 blur-3xl" />
        <Sparkles
          size={16}
          className="pointer-events-none absolute left-[18%] top-10 animate-glow-pulse text-gold/70"
          style={{ animationDelay: "0.4s" }}
        />
        <Sparkles
          size={12}
          className="pointer-events-none absolute right-[16%] top-16 animate-glow-pulse text-primary-light/70"
          style={{ animationDelay: "1.1s" }}
        />

        <div className="container-page relative">
          <Reveal>
            <p className="text-eyebrow text-primary-light">Your Transformation Starts Here</p>
            <h2 className="mt-2 text-[clamp(1.9rem,3.4vw,2.6rem)] text-white">Register for the Next Batch</h2>
            <p className="mx-auto mt-3 max-w-md text-white/70">
              Scan the QR code or tap the button below to reserve your seat — seats fill up quickly every batch.
            </p>
          </Reveal>

          <Reveal delay={100}>
            <div className="mx-auto mt-8 flex max-w-md flex-col items-center gap-6 rounded-[var(--radius-lg)] border border-white/10 bg-white/5 p-8 backdrop-blur">
              <div className="relative">
                <span className="absolute inset-0 animate-glow-pulse rounded-2xl bg-gold/20 blur-xl" />
                <div className="relative overflow-hidden rounded-2xl bg-white p-3 shadow-[0_20px_50px_-15px_rgba(0,0,0,0.5)]">
                  <img src={images.dyphRegisterQr} alt="Scan to register for DYPH" className="h-40 w-40 sm:h-48 sm:w-48" />
                </div>
              </div>
              <p className="flex items-center gap-2 text-sm font-medium text-white/70">
                <QrCode size={16} /> Scan with your phone camera
              </p>

              <Button
                href={dyph.registerLink}
                target="_blank"
                rel="noopener noreferrer"
                size="lg"
                className="w-full"
              >
                <ExternalLink size={16} /> Register via Link
              </Button>
            </div>
          </Reveal>

          <Reveal delay={160}>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Button
                href={`https://wa.me/${siteInfo.whatsapp.tel}?text=${enrollMessage}`}
                target="_blank"
                rel="noopener noreferrer"
                variant="whatsapp"
                size="lg"
              >
                <MessageCircle size={18} /> Enroll on WhatsApp
              </Button>
              <Button
                href={`mailto:${siteInfo.email}?subject=${encodeURIComponent("DYPH Enrollment")}`}
                variant="ghost"
                size="lg"
              >
                <Mail size={18} /> Enroll via Email
              </Button>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
