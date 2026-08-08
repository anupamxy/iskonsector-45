import { useState } from "react";
import { createPortal } from "react-dom";
import { X, Landmark, Copy, Check, MessageCircle, Mail, ShieldCheck } from "lucide-react";
import Button from "./Button";
import { siteInfo } from "../../data/site";
import { images } from "../../data/images";

interface DonateButtonProps {
  label: string;
  seva: string;
  amount?: number;
  /** Wire in a real Razorpay payment link/page here when it's ready. */
  razorpayLink?: string;
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "md" | "lg";
  className?: string;
}

function CopyField({ label, value }: { label: string; value: string }) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    await navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  return (
    <div className="flex items-center justify-between gap-3 border-b border-hairline py-2.5 last:border-b-0">
      <div>
        <div className="text-xs uppercase tracking-wide text-muted">{label}</div>
        <div className="font-medium text-ink">{value}</div>
      </div>
      <button
        type="button"
        onClick={handleCopy}
        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-secondary transition-colors hover:bg-secondary/10"
        aria-label={`Copy ${label}`}
      >
        {copied ? <Check size={16} /> : <Copy size={16} />}
      </button>
    </div>
  );
}

export default function DonateButton({
  label,
  seva,
  amount,
  razorpayLink,
  variant = "primary",
  size = "md",
  className,
}: DonateButtonProps) {
  const [open, setOpen] = useState(false);

  const whatsappMessage = encodeURIComponent(
    `Hare Krishna, I would like to contribute towards ${seva}${amount ? ` (₹${amount.toLocaleString("en-IN")})` : ""}. Please guide me.`,
  );

  return (
    <>
      <Button variant={variant} size={size} className={className} onClick={() => setOpen(true)}>
        {label}
      </Button>

      {open &&
        createPortal(
          <div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-ink-deep/60 p-4 backdrop-blur-sm"
            role="dialog"
            aria-modal="true"
            onClick={() => setOpen(false)}
          >
            <div
              className="max-h-[90vh] w-full max-w-md overflow-y-auto rounded-[var(--radius-lg)] bg-white shadow-[var(--shadow-card-hover)]"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-start justify-between gap-4 border-b border-hairline p-6">
                <div>
                  <p className="text-eyebrow text-primary">{seva}</p>
                  <h3 className="mt-1 text-xl text-ink">
                    {amount ? `₹${amount.toLocaleString("en-IN")}` : "Support this seva"}
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-muted hover:bg-cream-alt"
                  aria-label="Close"
                >
                  <X size={18} />
                </button>
              </div>

              <div className="p-6">
                {razorpayLink ? (
                  <>
                    <p className="mb-4 text-sm text-muted">
                      You'll be taken to our secure payment page to complete this contribution.
                    </p>
                    <Button href={razorpayLink} target="_blank" rel="noopener noreferrer" className="w-full">
                      Proceed to Payment
                    </Button>
                  </>
                ) : (
                  <>
                    <p className="mb-4 flex items-start gap-2 text-sm text-muted">
                      <ShieldCheck size={18} className="mt-0.5 shrink-0 text-secondary" />
                      Online payment is coming soon. For now, you can contribute directly by bank
                      transfer — every donation is eligible for an 80-G tax receipt.
                    </p>

                    <div className="flex flex-col gap-4 sm:flex-row">
                      <div className="flex-1 rounded-[14px] border border-hairline bg-cream/60 p-4">
                        <div className="mb-2 flex items-center gap-2 text-secondary">
                          <Landmark size={16} />
                          <span className="text-xs font-semibold uppercase tracking-wide">
                            Bank transfer details
                          </span>
                        </div>
                        <CopyField label="Account Holder" value={siteInfo.bank.accountHolder} />
                        <CopyField label="Bank" value={siteInfo.bank.bankName} />
                        <CopyField label="Account Number" value={siteInfo.bank.accountNumber} />
                        <CopyField label="IFSC Code" value={siteInfo.bank.ifsc} />
                      </div>
                      <div className="flex shrink-0 flex-col items-center justify-center rounded-[14px] border border-hairline bg-cream/60 p-4">
                        <img src={images.paymentQr} alt="Scan to pay via UPI" className="h-28 w-28 rounded-lg object-cover" />
                        <span className="mt-2 text-xs font-medium text-muted">Scan to Pay (UPI)</span>
                      </div>
                    </div>

                    <p className="mt-4 text-xs leading-relaxed text-muted">
                      After transferring, please share your name, address (with pincode), and PAN
                      (for an 80-G receipt) via WhatsApp or email so we can confirm your{" "}
                      {seva.toLowerCase()} contribution.
                    </p>

                    <div className="mt-4 flex flex-col gap-2 sm:flex-row">
                      <Button
                        href={`https://wa.me/${siteInfo.whatsapp.tel}?text=${whatsappMessage}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        variant="whatsapp"
                        className="flex-1"
                      >
                        <MessageCircle size={16} /> WhatsApp Us
                      </Button>
                      <Button
                        href={`mailto:${siteInfo.email}?subject=${encodeURIComponent(`Donation: ${seva}`)}`}
                        variant="outline"
                        className="flex-1"
                      >
                        <Mail size={16} /> Email Us
                      </Button>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>,
          document.body,
        )}
    </>
  );
}
