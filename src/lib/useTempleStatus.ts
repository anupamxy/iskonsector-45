import { useEffect, useState } from "react";

export interface TimeWindow {
  open: string;
  close: string;
}

export interface TempleStatus {
  isOpen: boolean;
  label: string;
  next: string;
}

function parseTimeToday(time: string, now: Date): Date | null {
  const match = /(\d{1,2}):(\d{2})\s*(AM|PM)/i.exec(time);
  if (!match) return null;
  const [, h, m, ap] = match;
  let hours = parseInt(h, 10) % 12;
  if (ap.toUpperCase() === "PM") hours += 12;
  const d = new Date(now);
  d.setHours(hours, parseInt(m, 10), 0, 0);
  return d;
}

/** Live open/closed status across one or more daily darshan windows (e.g. a morning
 * and an evening window with a midday break in between), matching the temple's real
 * schedule instead of assuming a single continuous open period. */
export function useTempleStatus(windows: readonly TimeWindow[]): TempleStatus | null {
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 30_000);
    return () => clearInterval(id);
  }, []);

  if (windows.length === 0) return null;

  const parsed = windows
    .map((w) => ({ window: w, open: parseTimeToday(w.open, now), close: parseTimeToday(w.close, now) }))
    .filter((w): w is { window: TimeWindow; open: Date; close: Date } => Boolean(w.open && w.close));
  if (parsed.length === 0) return null;

  const active = parsed.find((w) => now >= w.open && now <= w.close);
  if (active) {
    return { isOpen: true, label: "Open Now", next: `Closes at ${active.window.close}` };
  }

  const upcomingToday = parsed.find((w) => now < w.open);
  if (upcomingToday) {
    return { isOpen: false, label: "Closed Now", next: `Opens at ${upcomingToday.window.open}` };
  }

  return { isOpen: false, label: "Closed Now", next: `Opens tomorrow at ${windows[0].open}` };
}
