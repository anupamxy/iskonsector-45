import PageHero from "../components/ui/PageHero";
import LegalContent from "../components/ui/LegalContent";
import { siteInfo } from "../data/site";
import { images } from "../data/images";

export default function CookiePolicy() {
  return (
    <div>
      <PageHero
        breadcrumb={[{ label: "Home", to: "/" }, { label: "Cookie Policy" }]}
        eyebrow="Legal"
        title="Cookie Policy"
        images={[{ src: images.pageHero.legal, position: "center 20%" }]}
      />
      <section className="section-pad">
        <div className="container-page">
          <LegalContent
            sections={[
              {
                heading: "Why We Use Cookies",
                paragraphs: [
                  "We use cookies to make our website more user-friendly and to understand our visitors better, so we can continue improving our programs and communications.",
                ],
              },
              {
                heading: "What Cookies Don't Do",
                paragraphs: [
                  "Cookies used on this site do not store sensitive personally identifiable information such as your name, address, or credit card details. Where any personal data is stored, it is encrypted.",
                ],
              },
              {
                heading: "Types of Cookies We Use",
                paragraphs: [],
                list: [
                  "Session Cookies — temporary cookies that expire once you close your browser, used to keep the site functioning smoothly during your visit.",
                  "Persistent Cookies — remain on your device between visits, helping us recognise returning visitors.",
                  "Social Media Cookies — allow features like sharing content to social platforms.",
                  "Third-Party Cookies — set by external services we use, such as analytics or embedded maps and videos.",
                ],
              },
              {
                heading: "Managing Cookies",
                paragraphs: [
                  "Most web browsers allow you to control cookies through their settings. Disabling cookies may affect some functionality of our website.",
                ],
              },
              {
                heading: "Contact Us",
                paragraphs: [`Questions about this Cookie Policy can be sent to ${siteInfo.email}.`],
              },
            ]}
          />
        </div>
      </section>
    </div>
  );
}
