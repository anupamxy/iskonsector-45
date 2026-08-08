import { Link } from "react-router-dom";
import { ShieldCheck, FileCheck2, Users, Award, ArrowRight, Flame, UtensilsCrossed, BookOpen, Award as AwardIcon, PartyPopper } from "lucide-react";
import PageHero from "../components/ui/PageHero";
import SectionHeading from "../components/ui/SectionHeading";
import Card from "../components/ui/Card";
import SevaCard from "../components/ui/SevaCard";
import DonateButton from "../components/ui/DonateButton";
import { deitySeva } from "../data/donations";
import { siteInfo } from "../data/site";

const causes = [
  {
    icon: UtensilsCrossed,
    title: "Food For Life",
    body: "Sponsor sanctified meals for the community.",
    to: "/food-for-life",
  },
  {
    icon: AwardIcon,
    title: "Life Patron",
    body: "Become a lifetime member of the temple family.",
    to: "/life-patron",
  },
  {
    icon: BookOpen,
    title: "Gita Daan",
    body: "Sponsor Bhagavad Gitas for distribution.",
    to: "/gita-daan",
  },
  {
    icon: PartyPopper,
    title: "Festival Seva",
    body: "Support Janmashtami, Ram Navami, and Rath Yatra.",
    to: "/festivals",
  },
];

const trust = [
  { icon: ShieldCheck, title: "Sanctified Seva", body: "Every offering is made with care, in the temple's tradition." },
  { icon: FileCheck2, title: "80-G Tax Receipt", body: "All donations are eligible for tax exemption." },
  { icon: Users, title: "Reaches Real People", body: "Your seva directly supports meals, festivals, and outreach." },
  { icon: Award, title: "Trusted Institution", body: "Part of the worldwide ISKCON movement since 1966." },
];

export default function Donate() {
  return (
    <div>
      <PageHero
        breadcrumb={[{ label: "Home", to: "/" }, { label: "Donate" }]}
        eyebrow="Seva & Giving"
        title="Support ISKCON Gurugram, Sector 45"
        subtitle="Every contribution — large or small — helps feed the hungry, share the Bhagavad Gita, and keep festivals and temple life thriving."
      />

      <section className="section-pad">
        <div className="container-page">
          <SectionHeading eyebrow="Deity Seva" title="Offer Seva to Sri Sri Radha Gopinath" />
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {deitySeva.map((tier) => (
              <SevaCard key={tier.label} label={tier.label} amount={tier.amount} seva="Archa Vigraha Seva" />
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad bg-cream-alt">
        <div className="container-page">
          <SectionHeading eyebrow="Choose a Cause" title="Other Ways to Give" />
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {causes.map(({ icon: Icon, title, body, to }) => (
              <Link
                key={title}
                to={to}
                className="group flex flex-col rounded-[var(--radius-card)] bg-white p-6 shadow-[var(--shadow-card)] transition-all hover:-translate-y-1 hover:shadow-[var(--shadow-card-hover)]"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <Icon size={20} />
                </span>
                <h4 className="mt-4 text-lg text-ink">{title}</h4>
                <p className="mt-2 flex-1 text-sm text-muted">{body}</p>
                <span className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-secondary">
                  Give now <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad">
        <div className="container-page">
          <SectionHeading eyebrow="Why Give With Us" title="Your Trust Matters" />
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {trust.map(({ icon: Icon, title, body }) => (
              <Card key={title} className="items-center p-6 text-center">
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-secondary/10 text-secondary">
                  <Icon size={20} />
                </span>
                <h4 className="mt-3 text-base text-ink">{title}</h4>
                <p className="mt-1 text-xs text-muted">{body}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad bg-gradient-to-br from-ink to-ink-deep text-center text-white">
        <div className="container-page">
          <Flame className="mx-auto text-primary-light" size={32} />
          <h2 className="mt-4 text-[clamp(1.9rem,3.4vw,2.7rem)] text-white">
            Make a General Donation
          </h2>
          <p className="mx-auto mt-3 max-w-md text-white/70">
            Not sure where it's needed most? A general donation lets the temple direct your seva
            where it helps most. Tax exemption under Section {siteInfo.taxExemption.section}.
          </p>
          <div className="mt-8">
            <DonateButton label="Donate Now" seva="General Donation" size="lg" />
          </div>
        </div>
      </section>
    </div>
  );
}
