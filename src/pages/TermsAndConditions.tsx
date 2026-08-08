import PageHero from "../components/ui/PageHero";
import LegalContent from "../components/ui/LegalContent";
import { siteInfo } from "../data/site";

export default function TermsAndConditions() {
  return (
    <div>
      <PageHero
        breadcrumb={[{ label: "Home", to: "/" }, { label: "Terms & Conditions" }]}
        eyebrow="Legal"
        title="Terms & Conditions"
      />
      <section className="section-pad">
        <div className="container-page">
          <LegalContent
            sections={[
              {
                heading: "Ownership of Content",
                paragraphs: [
                  `All content on this website — including text, images, and graphics — is the exclusive and proprietary material of ${siteInfo.name}, unless otherwise stated. Our name, logo, and trademarks may not be used, copied, reproduced, or redistributed without prior written permission.`,
                ],
              },
              {
                heading: "Use of the Website",
                paragraphs: [
                  "This website and its content are provided on an \"as is\" and \"as available\" basis. We make no warranties, express or implied, regarding merchantability, fitness for a particular purpose, or non-infringement.",
                ],
              },
              {
                heading: "Limitation of Liability",
                paragraphs: [
                  `${siteInfo.name} shall not be liable for any damage to your computer system or loss of data resulting from the download or use of any content from this website.`,
                ],
              },
              {
                heading: "Indemnification",
                paragraphs: [
                  "You agree to indemnify and hold us harmless from any claims, damages, or expenses arising from your use of, or conduct on, this website.",
                ],
              },
              {
                heading: "Third-Party Links",
                paragraphs: [
                  "Our website may contain links to third-party websites. We are not responsible for the content, accuracy, or practices of any linked external sites.",
                ],
              },
              {
                heading: "Changes to These Terms",
                paragraphs: [
                  "We reserve the right to modify this website and these Terms & Conditions unilaterally, at any time, without prior notice.",
                ],
              },
              {
                heading: "Contact Us",
                paragraphs: [`Questions about these terms can be directed to ${siteInfo.email}.`],
              },
            ]}
          />
        </div>
      </section>
    </div>
  );
}
