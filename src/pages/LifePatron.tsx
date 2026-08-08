import { Check, Phone } from "lucide-react";
import PageHero from "../components/ui/PageHero";
import SectionHeading from "../components/ui/SectionHeading";
import Card from "../components/ui/Card";
import DonateButton from "../components/ui/DonateButton";
import { lifePatron } from "../data/donations";
import { siteInfo } from "../data/site";
import { images } from "../data/images";

export default function LifePatron() {
  return (
    <div>
      <PageHero
        breadcrumb={[
          { label: "Home", to: "/" },
          { label: "Temple & Seva", to: "/temple" },
          { label: "Life Patron" },
        ]}
        eyebrow="Lifetime Membership"
        title={lifePatron.heading}
        subtitle={lifePatron.intro}
      />

      <div className="container-page">
        <img
          src={images.lifePatronBanner}
          alt="Life Patron Membership"
          className="mt-8 aspect-[21/9] w-full rounded-[var(--radius-card)] object-cover shadow-[var(--shadow-card)]"
        />
      </div>

      <section className="section-pad">
        <div className="container-page grid grid-cols-1 gap-10 lg:grid-cols-[1fr_1.1fr]">
          <Card className="items-center justify-center border border-gold/30 p-8 text-center">
            <p className="text-eyebrow text-primary">One-time Contribution</p>
            <p className="mt-2 font-display text-4xl text-ink">
              ₹{lifePatron.cost.toLocaleString("en-IN")}
            </p>
            <p className="mt-3 text-sm text-muted">{lifePatron.costNote}</p>
            <DonateButton
              label="Become a Life Patron"
              seva="Life Patron Membership"
              amount={lifePatron.cost}
              size="lg"
              className="mt-6 w-full"
            />
            <div className="mt-6 w-full border-t border-hairline pt-5 text-left">
              <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted">
                Accepted Payment Methods
              </p>
              <p className="text-sm text-muted">{lifePatron.paymentMethods.join(" · ")}</p>
            </div>
          </Card>

          <div>
            <SectionHeading align="left" eyebrow="Member Benefits" title="What You Receive" />
            <ul className="flex flex-col gap-4">
              {lifePatron.benefits.map((benefit) => (
                <li key={benefit} className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <Check size={14} />
                  </span>
                  <span className="text-muted">{benefit}</span>
                </li>
              ))}
            </ul>
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
