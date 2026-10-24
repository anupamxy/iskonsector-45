import { CalendarDays, ChevronDown } from "lucide-react";

interface DateOption {
  value: string;
  label: string;
}

interface DatePickerPillProps {
  value: string;
  options: DateOption[];
  onChange: (value: string) => void;
  "aria-label"?: string;
}

/** A gold-bordered pill that looks like a date badge but is a real (invisibly overlaid) <select>. */
export default function DatePickerPill({ value, options, onChange, ...rest }: DatePickerPillProps) {
  const label = options.find((o) => o.value === value)?.label ?? value;

  return (
    <div className="relative inline-flex shrink-0 items-center gap-2 rounded-full border border-gold/40 bg-white/5 px-4 py-2 text-sm font-medium text-gold backdrop-blur-sm transition-colors hover:border-gold/70">
      <CalendarDays size={15} className="shrink-0" />
      <span className="whitespace-nowrap">{label}</span>
      <ChevronDown size={14} className="shrink-0 opacity-70" />
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="absolute inset-0 h-full w-full cursor-pointer appearance-none opacity-0"
        aria-label={rest["aria-label"] ?? "Choose a date"}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}
