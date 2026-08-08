import Card from "./Card";
import DonateButton from "./DonateButton";

interface SevaCardProps {
  label: string;
  amount: number;
  description?: string;
  seva: string;
  image?: string;
}

export default function SevaCard({ label, amount, description, seva, image }: SevaCardProps) {
  return (
    <Card className="overflow-hidden p-0">
      {image && (
        <div className="relative overflow-hidden">
          <img src={image} alt={label} className="aspect-square w-full object-cover" />
          <div className="shimmer-sweep pointer-events-none absolute inset-0" />
        </div>
      )}
      <div className="flex flex-1 flex-col p-6">
        <h4 className="text-lg text-ink">{label}</h4>
        {description && <p className="mt-1 text-sm text-muted">{description}</p>}
        <p className="mt-3 font-display text-2xl text-primary">₹{amount.toLocaleString("en-IN")}</p>
        <DonateButton
          label="Donate"
          seva={`${seva} — ${label}`}
          amount={amount}
          size="md"
          className="mt-4 w-full"
        />
      </div>
    </Card>
  );
}
