import { Clock, MapPinned, MessageCircle } from "lucide-react";
import PageHero from "../components/ui/PageHero";
import SectionHeading from "../components/ui/SectionHeading";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";
import { govindasOnWheel } from "../data/programs";
import { siteInfo } from "../data/site";
import { images } from "../data/images";

const menuImages: Record<string, string> = {
  "Plain Dosa": images.govindas.dosa,
  "Masala Dosa": images.govindas.dosa,
  "Paneer Masala Dosa": images.govindas.dosa,
  "Butter Masala Dosa": images.govindas.dosa,
  "Idli Sambar": images.govindas.idli,
  "Veg Noodles": images.govindas.noodles,
  "Chilli Paneer": images.govindas.chilliPaneer,
  "Fried Rice": images.govindas.friedRice,
};

const cateringImages: Record<string, string> = {
  Birthday: images.govindas.cateringBirthday,
  "Kuan Pujan": images.govindas.cateringKuanPujan,
  Marriage: images.govindas.cateringMarriage,
  "Welcome Baby": images.govindas.cateringWelcomeBaby,
  Anniversary: images.govindas.cateringAnniversary,
};

export default function GovindasOnWheel() {
  const menuEntries = Object.entries(govindasOnWheel.menu);

  return (
    <div>
      <PageHero
        breadcrumb={[
          { label: "Home", to: "/" },
          { label: "Temple & Seva", to: "/temple" },
          { label: "Govinda's On Wheel" },
        ]}
        eyebrow="Prasadam Delivery"
        title="Govinda's On Wheel"
        subtitle={govindasOnWheel.intro}
        images={[{ src: images.pageHero.govindasOnWheel, position: "center 40%" }]}
      />

      <section className="section-pad">
        <div className="container-page grid grid-cols-1 gap-6 sm:grid-cols-2">
          <Card row className="items-center gap-4 p-6">
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
              <Clock size={22} />
            </span>
            <div>
              <p className="text-sm text-muted">Delivery Hours</p>
              <p className="font-display text-lg text-ink">{govindasOnWheel.hours}</p>
            </div>
          </Card>
          <Card row className="items-center gap-4 p-6">
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-secondary/10 text-secondary">
              <MapPinned size={22} />
            </span>
            <div>
              <p className="text-sm text-muted">Delivery Area</p>
              <p className="font-display text-lg text-ink">{govindasOnWheel.deliveryRadius}</p>
            </div>
          </Card>
        </div>
      </section>

      <section className="section-pad bg-cream-alt">
        <div className="container-page">
          <SectionHeading eyebrow="Our Menu" title="Pure Vegetarian Delights" />
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            {menuEntries.map(([category, items]) => (
              <Card key={category} className="p-6">
                <h4 className="mb-4 text-lg text-ink">{category}</h4>
                <ul className="flex flex-col gap-3">
                  {items.map((item) => (
                    <li key={item.name} className="flex items-center gap-3 border-b border-hairline pb-3 last:border-b-0 last:pb-0">
                      {menuImages[item.name] && (
                        <img src={menuImages[item.name]} alt={item.name} className="h-10 w-10 shrink-0 rounded-lg object-cover" />
                      )}
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <span className="font-medium text-ink">{item.name}</span>
                          <span className="font-display text-primary">₹{item.price}/-</span>
                        </div>
                        {item.items && <p className="mt-1 text-xs text-muted">{item.items}</p>}
                      </div>
                    </li>
                  ))}
                </ul>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad text-center">
        <div className="container-page">
          <SectionHeading
            eyebrow="Event Catering"
            title="Celebrating a Special Occasion?"
            subtitle="Message us on WhatsApp to place an order for your event."
          />
          <div className="mb-10 grid grid-cols-2 gap-4 sm:grid-cols-5">
            {govindasOnWheel.catering.map((event) => (
              <div key={event} className="overflow-hidden rounded-[var(--radius-card)] shadow-[var(--shadow-card)]">
                <img src={cateringImages[event]} alt={event} className="aspect-square w-full object-cover" />
                <p className="bg-white py-2 text-xs font-medium text-ink">{event}</p>
              </div>
            ))}
          </div>
          <Button href={siteInfo.whatsapp.link} target="_blank" rel="noopener noreferrer" variant="whatsapp" size="lg">
            <MessageCircle size={18} /> Order on WhatsApp
          </Button>
        </div>
      </section>
    </div>
  );
}
