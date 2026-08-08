import PageHero from "../components/ui/PageHero";
import SectionHeading from "../components/ui/SectionHeading";
import Button from "../components/ui/Button";
import { YoutubeIcon } from "../components/ui/SocialIcons";
import { galleryCategories, videoHighlights } from "../data/gallery";
import { siteInfo } from "../data/site";

export default function Gallery() {
  return (
    <div>
      <PageHero
        breadcrumb={[{ label: "Home", to: "/" }, { label: "Gallery" }]}
        eyebrow="Moments of Devotion"
        title="Our Gallery"
        subtitle="Photos will be added here as we document temple life, festivals, and seva. Follow us on social media for the latest updates in the meantime."
      />

      {galleryCategories.map((category, i) => (
        <section key={category.title} className={`section-pad ${i % 2 === 1 ? "bg-cream-alt" : ""}`}>
          <div className="container-page">
            <SectionHeading eyebrow="Gallery" title={category.title} subtitle={category.description} />
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
              {category.images.map((src) => (
                <img
                  key={src}
                  src={src}
                  alt={category.title}
                  className="aspect-square w-full rounded-[var(--radius-card)] object-cover shadow-[var(--shadow-card)]"
                />
              ))}
            </div>
          </div>
        </section>
      ))}

      <section className="section-pad text-center">
        <div className="container-page">
          <SectionHeading eyebrow="Watch" title={videoHighlights.heading} subtitle={videoHighlights.body} />
          <Button href={siteInfo.social.youtube} target="_blank" rel="noopener noreferrer" size="lg">
            <YoutubeIcon size={18} /> Visit Our YouTube Channel
          </Button>
        </div>
      </section>
    </div>
  );
}
