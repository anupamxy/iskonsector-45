export interface TimelineEntry {
  time: string;
  title: string;
  description?: string;
}

interface TimelineProps {
  items: TimelineEntry[];
}

export default function Timeline({ items }: TimelineProps) {
  return (
    <div className="relative mx-auto max-w-2xl">
      <div className="absolute left-[86px] top-2 bottom-2 w-px bg-gradient-to-b from-primary via-gold to-secondary" />
      <ol className="flex flex-col gap-6">
        {items.map((item) => (
          <li key={item.time + item.title} className="relative flex items-start gap-6">
            <span className="w-[70px] shrink-0 pt-4 text-right font-display text-sm text-primary">
              {item.time}
            </span>
            <span className="relative z-10 mt-5 h-3 w-3 shrink-0 rounded-full border-2 border-primary bg-white" />
            <div className="flex-1 rounded-[14px] bg-white p-5 shadow-[var(--shadow-card)]">
              <h4 className="text-base text-ink">{item.title}</h4>
              {item.description && (
                <p className="mt-1 text-sm text-muted">{item.description}</p>
              )}
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
