import { Link } from "react-router-dom";
import { UtensilsCrossed, Bike, Award, Compass, BookOpen, ArrowRight, type LucideIcon } from "lucide-react";
import PageHero from "../components/ui/PageHero";
import SectionHeading from "../components/ui/SectionHeading";
import Card from "../components/ui/Card";
import { images } from "../data/images";

interface Program {
  icon: LucideIcon;
  title: string;
  body: string;
  to: string;
  image?: string;
}

const programs: Program[] = [
  {
    icon: UtensilsCrossed,
    title: "Food For Life",
    body: "Sponsor meal packages and festival feasts, rooted in the Gita's teaching that sanctified food frees us from sin.",
    to: "/food-for-life",
    image: images.foodForLife.annaDaanBanner,
  },
  {
    icon: Bike,
    title: "Govinda's On Wheel",
    body: "Order pure vegetarian prasadam for daily meals or special occasions, delivered near the temple.",
    to: "/govindas-on-wheel",
  },
  {
    icon: Award,
    title: "Life Patron",
    body: "A one-time lifetime membership for householders who want to support the temple's mission.",
    to: "/life-patron",
    image: images.lifePatronBanner,
  },
  {
    icon: Compass,
    title: "DYPH",
    body: "Discover Your Permanent Happiness — a 6-week Sunday course open to all, age 20 and above.",
    to: "/dyph",
  },
  {
    icon: BookOpen,
    title: "Gita Daan",
    body: "Sponsor copies of the Bhagavad Gita for distribution to schools, colleges, jails, and hospitals.",
    to: "/gita-daan",
  },
];

export default function Temple() {
  return (
    <div>
      <PageHero
        breadcrumb={[{ label: "Home", to: "/" }, { label: "Temple & Seva" }]}
        eyebrow="Temple & Seva"
        title="Ways to Serve, Learn, and Belong"
        subtitle="ISKCON Gurugram, Sector 45 runs a family of seva programs — from feeding the community to youth courses and deity worship."
        images={[{ src: images.pageHero.temple, position: "center 25%" }]}
      />

      <section className="section-pad">
        <div className="container-page">
          <SectionHeading eyebrow="Our Programs" title="Choose a Seva to Support" />
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {programs.map(({ icon: Icon, title, body, to, image }) => (
              <Card key={title} className="overflow-hidden">
                {image && <img src={image} alt={title} className="aspect-video w-full object-cover" />}
                <div className="flex flex-1 flex-col p-6">
                  <span className="mb-3 flex h-11 w-11 items-center justify-center rounded-full bg-secondary/10 text-secondary">
                    <Icon size={20} />
                  </span>
                  <h4 className="text-lg text-ink">{title}</h4>
                  <p className="mt-2 flex-1 text-sm text-muted">{body}</p>
                  <Link
                    to={to}
                    className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-secondary hover:text-secondary-deep"
                  >
                    Learn more <ArrowRight size={14} />
                  </Link>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
