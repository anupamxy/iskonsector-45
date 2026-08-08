import { useState } from "react";
import { Phone, Mail, MapPin, MessageCircle, Clock, Send } from "lucide-react";
import PageHero from "../components/ui/PageHero";
import SectionHeading from "../components/ui/SectionHeading";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";
import JoinFamilyForm from "../components/ui/JoinFamilyForm";
import { siteInfo } from "../data/site";

const quickActions = [
  { icon: Phone, label: "Call Us", value: siteInfo.phones.primary, href: `tel:${siteInfo.phones.primaryTel}` },
  { icon: MessageCircle, label: "WhatsApp", value: "Message Us", href: siteInfo.whatsapp.link },
  { icon: Mail, label: "Email", value: siteInfo.email, href: `mailto:${siteInfo.email}` },
  { icon: MapPin, label: "Visit", value: "Get Directions", href: siteInfo.mapsUrl },
];

const inputClasses =
  "w-full rounded-[10px] border-[1.5px] border-hairline bg-white px-3.5 py-3 text-sm text-ink placeholder:text-muted/70 focus:border-secondary focus:outline-none";

function EnquiryForm() {
  const [submitted, setSubmitted] = useState(false);

  if (submitted) {
    return (
      <div className="rounded-[14px] border border-hairline bg-cream-alt p-6 text-center">
        <p className="font-display text-lg text-ink">Thank you! 🙏</p>
        <p className="mt-1 text-sm text-muted">We've received your message and will respond soon.</p>
      </div>
    );
  }

  return (
    <form
      className="flex flex-col gap-3"
      onSubmit={(e) => {
        e.preventDefault();
        setSubmitted(true);
      }}
    >
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <input required name="name" placeholder="Full Name" className={inputClasses} />
        <input required type="tel" name="phone" placeholder="Phone No." className={inputClasses} />
      </div>
      <input required type="email" name="email" placeholder="Email" className={inputClasses} />
      <textarea required name="message" placeholder="Your Message" rows={4} className={inputClasses} />
      <Button type="submit" className="mt-1">
        <Send size={16} /> Send Message
      </Button>
    </form>
  );
}

export default function Contact() {
  return (
    <div>
      <PageHero
        breadcrumb={[{ label: "Home", to: "/" }, { label: "Contact" }]}
        eyebrow="Get in Touch"
        title="Hare Krishna. We'd Love to Hear From You."
        subtitle="Whether you're planning a visit, booking a seva, or just have a question — reach out anytime."
      />

      <section className="section-pad">
        <div className="container-page grid grid-cols-2 gap-4 sm:grid-cols-4">
          {quickActions.map(({ icon: Icon, label, value, href }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith("http") ? "_blank" : undefined}
              rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
              className="flex flex-col items-center gap-2 rounded-[var(--radius-card)] bg-white p-5 text-center shadow-[var(--shadow-card)] transition-all hover:-translate-y-1 hover:shadow-[var(--shadow-card-hover)]"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-primary/10 text-primary">
                <Icon size={20} />
              </span>
              <span className="text-xs font-semibold uppercase tracking-wide text-muted">{label}</span>
              <span className="text-sm font-medium text-ink">{value}</span>
            </a>
          ))}
        </div>
      </section>

      <section className="section-pad bg-cream-alt">
        <div className="container-page grid grid-cols-1 gap-10 lg:grid-cols-[1.05fr_1fr]">
          <Card className="p-8">
            <h3 className="text-xl text-ink">Temple Information</h3>
            <div className="mt-6 flex flex-col gap-5 text-sm">
              <div className="flex items-start gap-3">
                <MapPin size={18} className="mt-0.5 shrink-0 text-primary" />
                <span className="text-muted">{siteInfo.address.full}</span>
              </div>
              <div className="flex items-start gap-3">
                <Clock size={18} className="mt-0.5 shrink-0 text-primary" />
                <span className="text-muted">
                  Darshan timings vary by season and festival — call or WhatsApp us before you visit.
                </span>
              </div>
              <div className="flex items-start gap-3">
                <Phone size={18} className="mt-0.5 shrink-0 text-primary" />
                <span className="text-muted">
                  {siteInfo.phones.primary} · {siteInfo.phones.secondary}
                </span>
              </div>
              <div className="flex items-start gap-3">
                <Mail size={18} className="mt-0.5 shrink-0 text-primary" />
                <span className="text-muted">{siteInfo.email}</span>
              </div>
            </div>
            <Button href={siteInfo.mapsUrl} target="_blank" rel="noopener noreferrer" variant="secondary" className="mt-6">
              Get Directions on Maps
            </Button>
          </Card>
          <div className="overflow-hidden rounded-[var(--radius-card)] shadow-[var(--shadow-card)]">
            <iframe
              title="ISKCON Gurugram Sector 45 map"
              src={`https://www.google.com/maps?q=${encodeURIComponent(siteInfo.address.full)}&output=embed`}
              className="h-full min-h-[320px] w-full"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>

      <section className="section-pad">
        <div className="container-page grid grid-cols-1 gap-14 lg:grid-cols-2">
          <div>
            <SectionHeading align="left" eyebrow="General Enquiry" title="Send Us a Message" />
            <EnquiryForm />
          </div>
          <div>
            <SectionHeading align="left" eyebrow="Get Involved" title="Join the ISKCON Family" />
            <div className="rounded-[var(--radius-lg)] bg-gradient-to-br from-ink to-ink-deep p-6">
              <JoinFamilyForm />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
