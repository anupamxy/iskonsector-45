export default function FestivalDateBadge({ date }: { date: string }) {
  const d = new Date(date);
  const day = d.toLocaleDateString("en-IN", { day: "2-digit" });
  const month = d.toLocaleDateString("en-IN", { month: "short" }).toUpperCase();
  return (
    <div className="absolute right-4 top-4 z-10 flex w-14 flex-col items-center rounded-xl bg-white/95 py-1.5 text-center shadow-lg backdrop-blur">
      <span className="font-display text-lg leading-none text-primary">{day}</span>
      <span className="text-[0.6rem] font-semibold uppercase tracking-wider text-muted">{month}</span>
    </div>
  );
}
