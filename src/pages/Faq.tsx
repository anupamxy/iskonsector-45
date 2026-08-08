import PageHero from "../components/ui/PageHero";
import Accordion from "../components/ui/Accordion";
import { faqs } from "../data/faq";

export default function Faq() {
  return (
    <div>
      <PageHero
        breadcrumb={[{ label: "Home", to: "/" }, { label: "FAQ" }]}
        eyebrow="Have a Question?"
        title="Frequently Asked Questions"
        subtitle="Everything you need to know before visiting or supporting ISKCON Gurugram, Sector 45."
      />

      <section className="section-pad">
        <div className="container-page">
          <Accordion items={faqs} />
        </div>
      </section>
    </div>
  );
}
