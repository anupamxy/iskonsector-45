import PageHero from "../components/ui/PageHero";
import SectionHeading from "../components/ui/SectionHeading";
import SevaCard from "../components/ui/SevaCard";
import { gitaDaan } from "../data/donations";

export default function GitaDaan() {
  return (
    <div>
      <PageHero
        breadcrumb={[
          { label: "Home", to: "/" },
          { label: "Temple & Seva", to: "/temple" },
          { label: "Gita Daan" },
        ]}
        eyebrow={gitaDaan.verseRef}
        title={gitaDaan.heading}
        subtitle={gitaDaan.intro}
      />

      <section className="section-pad">
        <div className="container-page">
          <SectionHeading
            eyebrow={`₹${gitaDaan.pricePerCopy} per copy`}
            title="Choose How Many Gitas to Sponsor"
          />
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {gitaDaan.tiers.map((tier) => (
              <SevaCard key={tier.label} label={tier.label} amount={tier.amount} seva="Gita Daan" />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
