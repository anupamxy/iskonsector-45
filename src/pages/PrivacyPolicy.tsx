import PageHero from "../components/ui/PageHero";
import LegalContent from "../components/ui/LegalContent";
import { siteInfo } from "../data/site";
import { images } from "../data/images";

export default function PrivacyPolicy() {
  return (
    <div>
      <PageHero
        breadcrumb={[{ label: "Home", to: "/" }, { label: "Privacy Policy" }]}
        eyebrow="Legal"
        title="Privacy Policy"
        images={[{ src: images.pageHero.legal, position: "center 20%" }]}
      />
      <section className="section-pad">
        <div className="container-page">
          <LegalContent
            sections={[
              {
                heading: "Introduction",
                paragraphs: [
                  `This Privacy Policy describes how ${siteInfo.name} ("we", "us", "our") collects, uses, and protects information you share with us, whether through our website, in person, or via donations and program registrations. This policy does not apply to employee data.`,
                ],
              },
              {
                heading: "Information We Collect",
                paragraphs: [
                  "We may collect personal information you voluntarily provide, such as your name, email address, phone number, postal address, and — where relevant for tax receipts — your PAN, when you submit forms, register for programs, or make a donation.",
                ],
              },
              {
                heading: "How We Use Your Information",
                paragraphs: [
                  "Information collected is used to process applications and donations, respond to feedback and enquiries, provide service updates, issue tax exemption receipts, and improve our programs and communications.",
                ],
              },
              {
                heading: "Cookies",
                paragraphs: [
                  "Our website may use cookies to improve your browsing experience. See our Cookie Policy for full details on the types of cookies we use and why.",
                ],
              },
              {
                heading: "Your Rights",
                paragraphs: [
                  "You have the right to access, correct, or request deletion of your personal information, and to withdraw consent to its use at any time by contacting us.",
                ],
              },
              {
                heading: "Usage Data & IP Addresses",
                paragraphs: [
                  "We may track IP addresses and general usage data to generate reports on how our website is used, helping us improve the experience for visitors.",
                ],
              },
              {
                heading: "Children's Privacy",
                paragraphs: [
                  "Our website is not directed at children under 18, and we do not knowingly collect personal information from children under 13.",
                ],
              },
              {
                heading: "Data Retention",
                paragraphs: [
                  "We retain personal information only for as long as necessary to fulfil the purposes described in this policy, or as required by law.",
                ],
              },
              {
                heading: "Contact Us",
                paragraphs: [
                  `If you have questions about this Privacy Policy, please contact us at ${siteInfo.email} or ${siteInfo.phones.primary}.`,
                ],
              },
            ]}
          />
        </div>
      </section>
    </div>
  );
}
