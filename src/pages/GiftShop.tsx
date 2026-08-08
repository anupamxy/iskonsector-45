import { MessageCircle, Gift } from "lucide-react";
import PageHero from "../components/ui/PageHero";
import SectionHeading from "../components/ui/SectionHeading";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";
import { giftShopCategories } from "../data/programs";
import { siteInfo } from "../data/site";

export default function GiftShop() {
  return (
    <div>
      <PageHero
        breadcrumb={[{ label: "Home", to: "/" }, { label: "Gift Shop" }]}
        eyebrow="Matchless Gifts"
        title="Gift Shop"
        subtitle="Spiritual literature, art, and lifestyle items designed to uplift the mind. Our catalog is being brought online — message us on WhatsApp to enquire about any item today."
      />

      <section className="section-pad">
        <div className="container-page">
          <SectionHeading eyebrow="What We Offer" title="Browse Our Categories" />
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {giftShopCategories.map((category) => (
              <Card key={category.title} className="p-6">
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-gold/15 text-gold">
                  <Gift size={20} />
                </span>
                <h4 className="mt-4 text-lg text-ink">{category.title}</h4>
                <p className="mt-2 text-sm text-muted">{category.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad bg-cream-alt text-center">
        <div className="container-page">
          <SectionHeading eyebrow="Enquire" title="Looking for Something Specific?" />
          <Button href={siteInfo.whatsapp.link} target="_blank" rel="noopener noreferrer" variant="whatsapp" size="lg">
            <MessageCircle size={18} /> Ask on WhatsApp
          </Button>
        </div>
      </section>
    </div>
  );
}
