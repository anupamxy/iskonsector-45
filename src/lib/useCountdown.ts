import { useEffect, useMemo, useState } from "react";

export interface Countdown {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isPast: boolean;
}

export function useCountdown(target?: string): Countdown | null {
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    if (!target) return;
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, [target]);

  return useMemo(() => {
    if (!target) return null;
    const targetTime = new Date(target).getTime();
    const diff = targetTime - now;
    if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0, isPast: true };

    // "Days" is plain calendar-date subtraction (e.g. Sept 19 minus Aug 7 = 43),
    // independent of the festival's specific start time — matching how people
    // actually count "days apart," not a raw 24h-bucket countdown.
    const t = new Date(targetTime);
    const startOfTargetDay = new Date(t.getFullYear(), t.getMonth(), t.getDate()).getTime();
    const n = new Date(now);
    const startOfNowDay = new Date(n.getFullYear(), n.getMonth(), n.getDate()).getTime();
    const days = Math.round((startOfTargetDay - startOfNowDay) / (1000 * 60 * 60 * 24));

    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);
    return { days, hours, minutes, seconds, isPast: false };
  }, [target, now]);
}
