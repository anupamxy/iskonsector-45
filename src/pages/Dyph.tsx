import { Calendar, Users, UtensilsCrossed, MessageCircle, Mail } from "lucide-react";
import PageHero from "../components/ui/PageHero";
import SectionHeading from "../components/ui/SectionHeading";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";
import { dyph } from "../data/programs";
import { siteInfo } from "../data/site";
import { images } from "../data/images";

const info = [
  { icon: Calendar, label: "Format", value: "6 weeks, Sundays, at the temple" },
  { icon: Users, label: "Eligibility", value: "Age 20+, any background" },
  { icon: UtensilsCrossed, label: "Included", value: "Prasadam after every session" },
];

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
        eyebrow={dyph.fullName}
        title="Discover Your Permanent Happiness"
        subtitle={dyph.intro}
        images={[{ src: images.pageHero.dyph, position: "center 40%" }]}
      />

      <section className="section-pad">
        <div className="container-page grid grid-cols-1 gap-6 sm:grid-cols-3">
          {info.map(({ icon: Icon, label, value }) => (
            <Card key={label} className="items-center p-6 text-center">
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-secondary/10 text-secondary">
                <Icon size={22} />
              </span>
              <p className="mt-3 text-xs font-semibold uppercase tracking-wide text-muted">{label}</p>
              <p className="mt-1 font-display text-lg text-ink">{value}</p>
            </Card>
          ))}
        </div>
      </section>

      <section className="section-pad bg-cream-alt">
        <div className="container-page">
          <SectionHeading eyebrow="6-Week Curriculum" title="What You'll Explore" />
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {dyph.sessions.map((session, i) => (
              <Card key={session.title} className="p-6">
                <span className="font-display text-3xl text-primary/40">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h4 className="mt-2 text-lg text-ink">{session.title}</h4>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad text-center">
        <div className="container-page">
          <SectionHeading eyebrow="Ready to Join?" title="Enroll in the Next Batch" />
          <div className="flex flex-wrap justify-center gap-4">
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
              variant="outline"
              size="lg"
            >
              <Mail size={18} /> Enroll via Email
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
