import { Phone } from "lucide-react";
import PageHero from "../components/ui/PageHero";
import SectionHeading from "../components/ui/SectionHeading";
import Card from "../components/ui/Card";
import SevaCard from "../components/ui/SevaCard";
import DonateButton from "../components/ui/DonateButton";
import { foodForLife } from "../data/donations";
import { siteInfo } from "../data/site";
import { images } from "../data/images";

const mealImages: Record<string, string> = {
  "50 meals": images.foodForLife.meals50,
  "100 meals": images.foodForLife.meals100,
  "500 meals": images.foodForLife.meals500,
  "1000 meals": images.foodForLife.meals1000,
};

const feastImages: Record<string, string> = {
  "Sudama Feast": images.foodForLife.sudamaFeast,
  "Pandav Feast": images.foodForLife.pandavFeast,
  "Vrindavan Feast": images.foodForLife.vrindavanFeast,
};

export default function FoodForLife() {
  return (
    <div>
      <PageHero
        breadcrumb={[
          { label: "Home", to: "/" },
          { label: "Temple & Seva", to: "/temple" },
          { label: "Food For Life" },
        ]}
        eyebrow="Anna Daan Seva"
        title="Food For Life"
        subtitle={foodForLife.tagline}
        images={[{ src: images.pageHero.foodForLife, position: "center 25%" }]}
      />

      <div className="container-page">
        <img
          src={images.foodForLife.annaDaanBanner}
          alt="Anna Daan — Food For Life"
          className="mt-8 aspect-[21/9] w-full rounded-[var(--radius-card)] object-cover shadow-[var(--shadow-card)]"
        />
      </div>

      <section className="section-pad">
        <div className="container-page text-center">
          <p className="font-sanskrit mx-auto max-w-2xl text-xl leading-relaxed text-ink">
            {foodForLife.verse}
          </p>
          <p className="mt-3 text-sm text-muted">
            "{foodForLife.verseTranslation}" — {foodForLife.verseRef}
          </p>
        </div>
      </section>

      <section className="section-pad bg-cream-alt">
        <div className="container-page">
          <SectionHeading eyebrow="Sponsor Meals" title="Choose a Meal Package" />
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {foodForLife.mealPackages.map((pkg) => (
              <SevaCard
                key={pkg.label}
                label={pkg.label}
                amount={pkg.amount}
                seva="Food For Life"
                image={mealImages[pkg.label]}
                razorpayLink={pkg.link}
              />
            ))}
          </div>
          <div className="mt-8 text-center">
            <DonateButton
              label={`Donate a Custom Amount (min ₹${foodForLife.customMinimum.toLocaleString("en-IN")})`}
              seva="Food For Life — Custom Amount"
              amount={foodForLife.customMinimum}
              variant="outline"
            />
          </div>
        </div>
      </section>

      <section className="section-pad">
        <div className="container-page">
          <SectionHeading eyebrow="Feast Menu" title="Prasadam Feast Options" />
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
            {foodForLife.feastTypes.map((feast) => (
              <Card key={feast.name} className="overflow-hidden p-0">
                {feastImages[feast.name] && (
                  <img src={feastImages[feast.name]} alt={feast.name} className="aspect-[4/3] w-full object-cover" />
                )}
                <div className="p-6">
                  <h4 className="text-lg text-ink">{feast.name}</h4>
                  <p className="mt-2 text-sm text-muted">{feast.items}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad bg-cream-alt">
        <div className="container-page">
          <Card className="mx-auto max-w-xl items-center p-8 text-center">
            <span className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
              <Phone size={20} />
            </span>
            <h4 className="mt-4 text-lg text-ink">{siteInfo.sevaDesk.note}</h4>
            <p className="mt-1 text-sm text-muted">{siteInfo.sevaDesk.hours}</p>
            <a href={`tel:${siteInfo.sevaDesk.phoneTel}`} className="mt-2 font-semibold text-secondary">
              {siteInfo.sevaDesk.phone}
            </a>
          </Card>
        </div>
      </section>
    </div>
  );
}
