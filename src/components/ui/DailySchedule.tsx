import { useEffect, useState } from "react";
import { Sunrise, Sunset, Ban, Sparkles } from "lucide-react";

interface ScheduleItem {
  title: string;
  time: string;
}

const morningSchedule: ScheduleItem[] = [
  { title: "Mangala Arati", time: "4:30 AM" },
  { title: "Mantra Meditation", time: "5:30 AM" },
  { title: "Darshan Arati", time: "7:15 AM" },
  { title: "Srimad Bhagavatam Class", time: "8:00 AM" },
];

const eveningSchedule: ScheduleItem[] = [
  { title: "Rajbhog Arati", time: "12:30 PM" },
  { title: "Sandhya Arati", time: "6:30 PM" },
  { title: "Shayan Aarti", time: "8:30 PM" },
  { title: "Shayana Arati / Darshan Closes", time: "9:00 PM" },
];

const dailyTimeline = [...morningSchedule, ...eveningSchedule];

function toMinutesSinceMidnight(time: string): number {
  const [, hourStr, minuteStr, meridiem] = time.match(/(\d+):(\d+)\s*(AM|PM)/i)!;
  let hour = Number(hourStr) % 12;
  if (meridiem.toUpperCase() === "PM") hour += 12;
  return hour * 60 + Number(minuteStr);
}

function getActiveTitle(nowMinutes: number): string {
  let active = dailyTimeline[dailyTimeline.length - 1];
  for (const item of dailyTimeline) {
    if (toMinutesSinceMidnight(item.time) <= nowMinutes) {
      active = item;
    }
  }
  return active.title;
}

function useActiveScheduleTitle() {
  const [activeTitle, setActiveTitle] = useState(() => {
    const now = new Date();
    return getActiveTitle(now.getHours() * 60 + now.getMinutes());
  });

  useEffect(() => {
    const update = () => {
      const now = new Date();
      setActiveTitle(getActiveTitle(now.getHours() * 60 + now.getMinutes()));
    };
    update();
    const id = setInterval(update, 60_000);
    return () => clearInterval(id);
  }, []);

  return activeTitle;
}

function ScheduleColumn({
  label,
  icon: Icon,
  items,
  activeTitle,
}: {
  label: string;
  icon: typeof Sunrise;
  items: ScheduleItem[];
  activeTitle: string;
}) {
  return (
    <div>
      <div className="mb-4 flex items-center gap-2 text-gold">
        <Icon size={18} />
        <span className="text-eyebrow text-gold">{label}</span>
      </div>
      <ul className="flex flex-col gap-3">
        {items.map((item) => (
          <li
            key={item.title}
            className={`flex items-center justify-between rounded-2xl px-5 py-4 ${
              item.title === activeTitle ? "border border-gold/40 bg-gold/15" : "bg-white/5"
            }`}
          >
            <span className="font-medium text-white">{item.title}</span>
            <span className="font-display text-sm font-semibold text-gold">{item.time}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function DailySchedule() {
  const activeTitle = useActiveScheduleTitle();

  return (
    <section className="section-pad bg-gradient-to-br from-ink to-ink-deep text-white">
      <div className="container-page">
        <div className="mx-auto mb-10 max-w-[660px] text-center">
          <p className="text-eyebrow mb-3 text-gold">Every Single Day</p>
          <h2 className="text-[clamp(1.9rem,3.6vw,2.9rem)] text-white">Daily Temple Schedule</h2>
          <p className="mt-4 text-[1.05rem] leading-relaxed text-white/75">
            Devotion, meditation &amp; scriptural wisdom — the temple's rhythm from dawn to rest.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <ScheduleColumn label="Morning" icon={Sunrise} items={morningSchedule} activeTitle={activeTitle} />
          <ScheduleColumn label="Afternoon & Evening" icon={Sunset} items={eveningSchedule} activeTitle={activeTitle} />
        </div>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm text-white/80">
          <span className="flex items-center gap-2">
            <Ban size={15} className="text-primary-light" />
            Darshan closed <span className="font-semibold text-gold">1:00 PM – 4:15 PM</span>
          </span>
          <span className="flex items-center gap-2">
            <Sparkles size={15} className="text-gold" />
            Sunday Love Feast <span className="font-semibold text-gold">7:30 PM</span>
          </span>
        </div>
      </div>
    </section>
  );
}
