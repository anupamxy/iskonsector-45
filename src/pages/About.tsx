import PageHero from "../components/ui/PageHero";
import SectionHeading from "../components/ui/SectionHeading";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";
import { founder, leadership, iskconHistory, philosophy, pillars } from "../data/about";
import { images } from "../data/images";
import { GraduationCap, UtensilsCrossed, HandHeart, PartyPopper } from "lucide-react";

const pillarIcons = [GraduationCap, UtensilsCrossed, HandHeart, PartyPopper];

export default function About() {
  return (
    <div>
      <PageHero
        breadcrumb={[{ label: "Home", to: "/" }, { label: "About" }]}
        eyebrow="About ISKCON"
        title="Spreading the Timeless Wisdom of the Bhagavad Gita"
        subtitle="From two rooms in New York to a global movement of over 700 temples — the story of Srila Prabhupada's mission, and its home in Sector 45, Gurugram."
        images={[{ src: images.pageHero.about, position: "center 20%", fit: "contain" }]}
      />

      <section className="section-pad">
        <div className="container-page mx-auto flex max-w-3xl flex-col gap-8">
          {iskconHistory.map((block) => (
            <div key={block.heading}>
              <h3 className="text-xl text-ink">{block.heading}</h3>
              <p className="mt-2 text-muted leading-relaxed">{block.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="section-pad bg-cream-alt">
        <div className="container-page">
          <SectionHeading eyebrow="Our Philosophy" title={philosophy.heading} subtitle={philosophy.body} />
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {pillars.map((pillar, i) => {
              const Icon = pillarIcons[i];
              return (
                <Card key={pillar.title} className="p-6">
                  <span className="mb-4 flex h-11 w-11 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <Icon size={20} />
                  </span>
                  <h4 className="text-lg text-ink">{pillar.title}</h4>
                  <p className="mt-2 text-sm text-muted">{pillar.body}</p>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section-pad">
        <div className="container-page">
          <SectionHeading eyebrow="Our Leader" title="Founder & Leadership" />
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

      <section className="section-pad bg-gradient-to-br from-ink to-ink-deep text-center text-white">
        <div className="container-page">
          <h2 className="text-[clamp(1.9rem,3.4vw,2.7rem)] text-white">
            Come Experience Krishna Consciousness
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-white/70">
            Visit us for darshan, kirtan, and prasadam — everyone is welcome.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Button to="/contact" size="lg">Plan Your Visit</Button>
            <Button to="/donate" variant="ghost" size="lg">Offer Seva</Button>
          </div>
        </div>
      </section>
    </div>
  );
}
