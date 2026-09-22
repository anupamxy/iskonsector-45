import { useState, type FormEvent } from "react";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import {
  ShieldCheck,
  Sparkles,
  UtensilsCrossed,
  Bell,
  Plus,
  Check,
  Flower2,
  Leaf,
  Nut,
  Cookie,
  SprayCan,
  Flame,
  Citrus,
  type LucideIcon,
} from "lucide-react";
import clsx from "clsx";
import PageHero from "../components/ui/PageHero";
import SectionHeading from "../components/ui/SectionHeading";
import Accordion from "../components/ui/Accordion";
import DonateButton from "../components/ui/DonateButton";
import { db } from "../lib/firebase";
import { images } from "../data/images";
import {
  pujaServiceInfo,
  pujaOfferingCategories,
  pujaFaqs,
  type PujaOffering,
  type PujaCategoryIcon,
} from "../data/pujaServices";

const trustIcons = [ShieldCheck, Sparkles, UtensilsCrossed, Bell];

const categoryIcons: Record<PujaCategoryIcon, LucideIcon> = {
  garland: Flower2,
  tulsi: Leaf,
  dryFruits: Nut,
  sweets: Cookie,
  attar: SprayCan,
  deepdan: Flame,
  fruits: Citrus,
};

interface SelectedOffering extends PujaOffering {
  category: string;
}

function isSelected(selected: SelectedOffering[], category: string, label: string) {
  return selected.some((item) => item.category === category && item.label === label);
}

export default function PujaServices() {
  const [participantName, setParticipantName] = useState("");
  const [gotra, setGotra] = useState("");
  const [purpose, setPurpose] = useState("");
  const [pujaDate, setPujaDate] = useState("");
  const [contactPhone, setContactPhone] = useState("");
  const [selected, setSelected] = useState<SelectedOffering[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [bookingId, setBookingId] = useState<string | null>(null);

  const total = selected.reduce((sum, item) => sum + item.amount, 0);

  function toggleOffering(category: string, item: PujaOffering) {
    setSelected((prev) =>
      isSelected(prev, category, item.label)
        ? prev.filter((sel) => !(sel.category === category && sel.label === item.label))
        : [...prev, { ...item, category }],
    );
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);

    if (selected.length === 0) {
      setError("Please choose at least one puja offering before submitting.");
      return;
    }

    setSubmitting(true);
    try {
      const write = addDoc(collection(db, "pujaBookings"), {
        participantName: participantName.trim(),
        gotra: gotra.trim(),
        purpose: purpose.trim(),
        pujaDate,
        contactPhone: contactPhone.trim(),
        items: selected.map(({ category, label, amount }) => ({ category, label, amount })),
        totalAmount: total,
        status: "pending_payment",
        createdAt: serverTimestamp(),
      });
      // A misconfigured/offline Firestore backend can leave the write pending
      // indefinitely instead of rejecting, so this bounds it to a clear error.
      const timeout = new Promise<never>((_, reject) =>
        setTimeout(() => reject(new Error("timeout")), 15000),
      );
      const docRef = await Promise.race([write, timeout]);
      setBookingId(docRef.id);
    } catch {
      setError("Something went wrong submitting your request. Please try again or contact us on WhatsApp.");
    } finally {
      setSubmitting(false);
    }
  }

  if (bookingId) {
    const shortId = bookingId.slice(-6).toUpperCase();
    return (
      <div>
        <PageHero
          breadcrumb={[{ label: "Home", to: "/" }, { label: "Temple & Seva", to: "/temple" }, { label: "Puja Services" }]}
          eyebrow="Request Received"
          title="Hare Krishna! Your Puja Request is Confirmed"
          subtitle={`Booking reference #${shortId} — complete payment below and our seva desk will confirm your puja.`}
          images={[{ src: images.pageHero.pujaServices, position: "center 20%" }]}
        />
        <section className="section-pad">
          <div className="container-page mx-auto max-w-[560px]">
            <div className="rounded-[var(--radius-card)] border border-hairline bg-white p-6 shadow-[var(--shadow-card)]">
              <h3 className="text-lg text-ink">Booking Summary</h3>
              <dl className="mt-4 flex flex-col gap-2 text-sm">
                <div className="flex justify-between border-b border-hairline pb-2">
                  <dt className="text-muted">Participant</dt>
                  <dd className="font-medium text-ink">{participantName}</dd>
                </div>
                {pujaDate && (
                  <div className="flex justify-between border-b border-hairline pb-2">
                    <dt className="text-muted">Puja Date</dt>
                    <dd className="font-medium text-ink">{pujaDate}</dd>
                  </div>
                )}
                {selected.map((item) => (
                  <div key={`${item.category}-${item.label}`} className="flex justify-between text-muted">
                    <dt>{item.label}</dt>
                    <dd>₹{item.amount.toLocaleString("en-IN")}</dd>
                  </div>
                ))}
                <div className="mt-2 flex justify-between border-t border-hairline pt-3">
                  <dt className="font-semibold text-ink">Total</dt>
                  <dd className="font-display text-xl text-primary">₹{total.toLocaleString("en-IN")}</dd>
                </div>
              </dl>
              <DonateButton
                label="Complete Payment"
                seva={`Puja Booking #${shortId}`}
                amount={total}
                size="lg"
                className="mt-6 w-full"
              />
            </div>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div>
      <PageHero
        breadcrumb={[{ label: "Home", to: "/" }, { label: "Temple & Seva", to: "/temple" }, { label: "Puja Services" }]}
        eyebrow="Online Puja Services"
        title={pujaServiceInfo.heading}
        subtitle={pujaServiceInfo.intro}
        images={[{ src: images.pageHero.pujaServices, position: "center 20%" }]}
      />

      <section className="section-pad">
        <div className="container-page">
          <SectionHeading eyebrow="Why Book With Us" title="Your Devotion Reaches the Divine Couple" />
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {pujaServiceInfo.trustPoints.map((point, i) => {
              const Icon = trustIcons[i];
              return (
                <div key={point.title} className="rounded-[var(--radius-card)] border border-hairline bg-white p-6 text-center shadow-[var(--shadow-card)]">
                  <span className="mx-auto mb-3 flex h-11 w-11 items-center justify-center rounded-full bg-secondary/10 text-secondary">
                    <Icon size={20} />
                  </span>
                  <h4 className="text-base text-ink">{point.title}</h4>
                  <p className="mt-1.5 text-sm text-muted">{point.description}</p>
                </div>
              );
            })}
          </div>
          <p className="mx-auto mt-8 max-w-[660px] rounded-2xl bg-cream-alt/60 px-5 py-4 text-center text-sm text-muted">
            <span className="font-semibold text-ink">Please note: </span>
            {pujaServiceInfo.note}
          </p>
        </div>
      </section>

      <section className="section-pad bg-cream-alt/40">
        <div className="container-page">
          <SectionHeading eyebrow="🪷 Book Your Puja 🪷" title="Choose Your Offering & Details" />

          <form onSubmit={handleSubmit} className="mx-auto flex max-w-[900px] flex-col gap-8">
            <div className="rounded-[var(--radius-card)] border border-hairline bg-white p-6 shadow-[var(--shadow-card)]">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <label className="flex flex-col gap-1.5 text-sm font-medium text-ink">
                  Participant Name
                  <input
                    required
                    value={participantName}
                    onChange={(e) => setParticipantName(e.target.value)}
                    placeholder="Full name for sankalpa"
                    className="rounded-xl border border-hairline px-4 py-2.5 text-sm outline-none focus:border-secondary"
                  />
                </label>
                <label className="flex flex-col gap-1.5 text-sm font-medium text-ink">
                  Gotra <span className="font-normal text-muted">(optional)</span>
                  <input
                    value={gotra}
                    onChange={(e) => setGotra(e.target.value)}
                    placeholder="e.g. Kashyap"
                    className="rounded-xl border border-hairline px-4 py-2.5 text-sm outline-none focus:border-secondary"
                  />
                </label>
                <label className="flex flex-col gap-1.5 text-sm font-medium text-ink">
                  WhatsApp / Phone Number
                  <input
                    required
                    type="tel"
                    value={contactPhone}
                    onChange={(e) => setContactPhone(e.target.value)}
                    placeholder="For booking confirmation"
                    className="rounded-xl border border-hairline px-4 py-2.5 text-sm outline-none focus:border-secondary"
                  />
                </label>
                <label className="flex flex-col gap-1.5 text-sm font-medium text-ink">
                  Preferred Puja Date
                  <input
                    required
                    type="date"
                    value={pujaDate}
                    onChange={(e) => setPujaDate(e.target.value)}
                    className="rounded-xl border border-hairline px-4 py-2.5 text-sm outline-none focus:border-secondary"
                  />
                </label>
                <label className="flex flex-col gap-1.5 text-sm font-medium text-ink sm:col-span-2">
                  Purpose for Puja / Offering <span className="font-normal text-muted">(optional, max 100 characters)</span>
                  <input
                    maxLength={100}
                    value={purpose}
                    onChange={(e) => setPurpose(e.target.value)}
                    placeholder="e.g. For family's health and prosperity"
                    className="rounded-xl border border-hairline px-4 py-2.5 text-sm outline-none focus:border-secondary"
                  />
                </label>
              </div>
            </div>

            <div className="flex flex-col gap-8">
              {pujaOfferingCategories.map((cat) => {
                const Icon = categoryIcons[cat.icon];
                return (
                <div key={cat.category}>
                  <div className="mb-4 flex items-center gap-4">
                    {cat.image ? (
                      <img
                        src={cat.image}
                        alt=""
                        className="h-16 w-16 shrink-0 rounded-2xl object-cover shadow-[var(--shadow-card)]"
                      />
                    ) : (
                      <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-secondary/10 text-secondary">
                        <Icon size={26} />
                      </span>
                    )}
                    <h4 className="text-lg text-ink">{cat.category}</h4>
                  </div>
                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-3 lg:grid-cols-5">
                    {cat.items.map((item) => {
                      const active = isSelected(selected, cat.category, item.label);
                      return (
                        <button
                          type="button"
                          key={item.label}
                          onClick={() => toggleOffering(cat.category, item)}
                          className={clsx(
                            "flex flex-col items-center gap-1.5 rounded-[14px] border-2 p-4 text-center transition-colors",
                            active
                              ? "border-secondary bg-secondary/10"
                              : "border-hairline bg-white hover:border-secondary/40",
                          )}
                        >
                          <span className="text-sm font-medium text-ink">{item.label}</span>
                          <span className="font-display text-base text-primary">₹{item.amount.toLocaleString("en-IN")}</span>
                          <span
                            className={clsx(
                              "mt-1 flex items-center gap-1 text-xs font-semibold uppercase tracking-wide",
                              active ? "text-secondary" : "text-muted",
                            )}
                          >
                            {active ? (
                              <>
                                <Check size={12} /> Added
                              </>
                            ) : (
                              <>
                                <Plus size={12} /> Add to Puja
                              </>
                            )}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
                );
              })}
            </div>

            <div className="sticky bottom-4 z-10 flex flex-col gap-3 rounded-[var(--radius-card)] border border-hairline bg-white p-6 shadow-[var(--shadow-card-hover)] sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-xs uppercase tracking-wide text-muted">Puja Amount</p>
                <p className="font-display text-2xl text-primary">₹{total.toLocaleString("en-IN")}</p>
                {error && <p className="mt-1 text-sm text-danger">{error}</p>}
              </div>
              <button
                type="submit"
                disabled={submitting}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-br from-primary to-primary-light px-8 py-3.5 text-base font-semibold text-white shadow-[var(--shadow-cta)] transition-all duration-200 hover:-translate-y-0.5 hover:brightness-105 disabled:pointer-events-none disabled:opacity-50"
              >
                {submitting ? "Submitting…" : "Submit Puja Request"}
              </button>
            </div>
          </form>
        </div>
      </section>

      <section className="section-pad">
        <div className="container-page">
          <SectionHeading eyebrow="Questions" title="Frequently Asked Questions" />
          <Accordion items={pujaFaqs} />
        </div>
      </section>
    </div>
  );
}
