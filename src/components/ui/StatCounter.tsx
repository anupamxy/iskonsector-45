interface StatCounterProps {
  value: string;
  label: string;
}

export default function StatCounter({ value, label }: StatCounterProps) {
  return (
    <div className="text-center">
      <div className="font-display text-[2.6rem] text-primary-light">{value}</div>
      <div className="text-eyebrow mt-1 text-white/70">{label}</div>
    </div>
  );
}
