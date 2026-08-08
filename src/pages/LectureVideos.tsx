import { BookOpen, Music, PartyPopper } from "lucide-react";
import PageHero from "../components/ui/PageHero";
import SectionHeading from "../components/ui/SectionHeading";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";
import { YoutubeIcon } from "../components/ui/SocialIcons";
import { siteInfo } from "../data/site";

const topics = [
  { icon: BookOpen, title: "Bhagavad Gita Classes", body: "Explaining the Gita's teachings for everyday life." },
  { icon: Music, title: "Kirtan & Bhajans", body: "Recorded chanting sessions from the temple." },
  { icon: PartyPopper, title: "Festival Recordings", body: "Highlights from Janmashtami, Ram Navami, and more." },
];

export default function LectureVideos() {
  return (
    <div>
      <PageHero
        breadcrumb={[{ label: "Home", to: "/" }, { label: "Lecture Videos" }]}
        eyebrow="Wisdom & Kirtan"
        title="Lecture Videos"
        subtitle="Our full video library lives on YouTube — Bhagavad Gita classes, kirtans, and festival recordings, updated regularly."
      />

      <section className="section-pad">
        <div className="container-page">
          <SectionHeading eyebrow="What You'll Find" title="Explore Our Video Library" />
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
            {topics.map(({ icon: Icon, title, body }) => (
              <Card key={title} className="p-6">
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <Icon size={22} />
                </span>
                <h4 className="mt-4 text-lg text-ink">{title}</h4>
                <p className="mt-2 text-sm text-muted">{body}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad bg-gradient-to-br from-ink to-ink-deep text-center text-white">
        <div className="container-page">
          <h2 className="text-[clamp(1.9rem,3.4vw,2.7rem)] text-white">Watch on YouTube</h2>
          <p className="mx-auto mt-3 max-w-md text-white/70">
            Subscribe to our channel for new lectures, kirtans, and live darshan.
          </p>
          <div className="mt-8">
            <Button href={siteInfo.social.youtube} target="_blank" rel="noopener noreferrer" size="lg">
              <YoutubeIcon size={18} /> Visit Our YouTube Channel
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
