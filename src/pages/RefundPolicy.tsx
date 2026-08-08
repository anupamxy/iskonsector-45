import PageHero from "../components/ui/PageHero";
import LegalContent from "../components/ui/LegalContent";
import { siteInfo } from "../data/site";

export default function RefundPolicy() {
  return (
    <div>
      <PageHero
        breadcrumb={[{ label: "Home", to: "/" }, { label: "Refund Policy" }]}
        eyebrow="Legal"
        title="Refund Policy"
      />
      <section className="section-pad">
        <div className="container-page">
          <LegalContent
            sections={[
              {
                heading: "Donations",
                paragraphs: [
                  "Donations made for charitable or religious purposes, festivals, seva, or towards books and courses are non-refundable.",
                ],
              },
              {
                heading: "Physical Product Returns",
                paragraphs: [
                  "Physical items (such as Gift Shop products) may be returned within 7 days of delivery, provided the item is unused and in its original condition and packaging, along with proof of purchase.",
                ],
                list: [
                  "Perishable goods are not eligible for return.",
                  "Intimate or sanitary products are not eligible for return.",
                  "Hazardous or flammable materials are not eligible for return.",
                ],
              },
              {
                heading: "Refund Processing",
                paragraphs: [
                  "Once a return is received and inspected, we will notify you by email of the approval or rejection of your refund. Approved refunds will be processed to your original method of payment. Only regularly-priced items are eligible for refund — sale items are final.",
                ],
              },
              {
                heading: "Late or Missing Refunds",
                paragraphs: [
                  `If you haven't received an approved refund, please check with your bank or credit card provider first, as processing times can vary. If the issue persists, contact us at ${siteInfo.email}.`,
                ],
              },
              {
                heading: "Exchanges",
                paragraphs: [
                  "We only replace items if they are defective or damaged. Please email us with details and photos where possible.",
                ],
              },
              {
                heading: "Gift Returns",
                paragraphs: [
                  "Items marked as a gift and returned will be issued store credit or a gift certificate — cash refunds are not provided for gift returns.",
                ],
              },
              {
                heading: "Return Shipping",
                paragraphs: [
                  `Returns can be sent to: ${siteInfo.address.full}. You are responsible for your own shipping costs, and we recommend using a trackable shipping service for items valued over ₹5,000.`,
                ],
              },
            ]}
          />
        </div>
      </section>
    </div>
  );
}
