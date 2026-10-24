// Weekly sadhana leaderboard: scoring rules and IST week math.
// Change the numbers in SADHANA_RULES to retune scoring — the leaderboard recomputes
// every devotee's points from their raw entries, so past entries rescore automatically.

export const SADHANA_RULES = {
  roundsTarget: 16,
  /** Points for finishing all target rounds before this time (24h "HH:MM", IST). */
  earlyBonusBefore: "07:00",
  earlyBonusPoints: 4,
  /** Hearing / reading earn 1 point per this many minutes... */
  minutesPerPoint: 10,
  /** ...up to this many minutes per day. */
  dailyMinutesCap: 60,
  /** Offering a ghee lamp to Damodar (Deepdaan) — the heart of Kartik. */
  deepDanPoints: 4,
} as const;

export const MAX_DAILY_POINTS =
  SADHANA_RULES.roundsTarget +
  SADHANA_RULES.earlyBonusPoints +
  2 * (SADHANA_RULES.dailyMinutesCap / SADHANA_RULES.minutesPerPoint) +
  SADHANA_RULES.deepDanPoints;

export interface SadhanaEntry {
  uid: string;
  name: string;
  /** IST calendar date, "YYYY-MM-DD". */
  date: string;
  rounds: number;
  /** Time the target rounds were completed, "HH:MM" (24h) — empty if not given. */
  finishedAt: string;
  hearingMin: number;
  readingMin: number;
  /** Offered a lamp (Deepdaan) that day. Missing on entries saved before it was added. */
  deepDan?: boolean;
}

export interface DayPoints {
  chanting: number;
  earlyBonus: number;
  hearing: number;
  reading: number;
  deepDan: number;
  total: number;
}

function minutePoints(minutes: number) {
  const capped = Math.min(Math.max(minutes, 0), SADHANA_RULES.dailyMinutesCap);
  return Math.floor(capped / SADHANA_RULES.minutesPerPoint);
}

export function scoreDay(entry: Pick<SadhanaEntry, "rounds" | "finishedAt" | "hearingMin" | "readingMin" | "deepDan">): DayPoints {
  const chanting = Math.min(Math.max(entry.rounds, 0), SADHANA_RULES.roundsTarget);
  // "HH:MM" strings compare correctly as plain strings.
  const earlyBonus =
    entry.rounds >= SADHANA_RULES.roundsTarget && entry.finishedAt && entry.finishedAt < SADHANA_RULES.earlyBonusBefore
      ? SADHANA_RULES.earlyBonusPoints
      : 0;
  const hearing = minutePoints(entry.hearingMin);
  const reading = minutePoints(entry.readingMin);
  const deepDan = entry.deepDan ? SADHANA_RULES.deepDanPoints : 0;
  return { chanting, earlyBonus, hearing, reading, deepDan, total: chanting + earlyBonus + hearing + reading + deepDan };
}

/** Today's date in India, as "YYYY-MM-DD". */
export function istToday(now = new Date()) {
  return now.toLocaleDateString("en-CA", { timeZone: "Asia/Kolkata" });
}

export function addDays(date: string, days: number) {
  const d = new Date(`${date}T00:00:00Z`);
  d.setUTCDate(d.getUTCDate() + days);
  return d.toISOString().slice(0, 10);
}

/** The Monday (IST) that starts the week containing `date`. Weeks run Monday–Sunday. */
export function weekStart(date: string) {
  const day = new Date(`${date}T00:00:00Z`).getUTCDay(); // 0 = Sunday
  return addDays(date, -((day + 6) % 7));
}

export function formatDay(date: string, opts: Intl.DateTimeFormatOptions = { day: "numeric", month: "short" }) {
  return new Date(`${date}T00:00:00Z`).toLocaleDateString("en-IN", { ...opts, timeZone: "UTC" });
}

export interface Standing {
  uid: string;
  name: string;
  points: number;
  rounds: number;
  hearingMin: number;
  readingMin: number;
  /** Days with the full round target chanted. */
  fullDays: number;
  /** Days a lamp was offered. */
  deepDanDays: number;
}

/** Sums a period's entries per devotee and ranks them, highest points first. */
export function buildStandings(entries: SadhanaEntry[]): Standing[] {
  const byUid = new Map<string, Standing & { latest: string }>();
  for (const entry of entries) {
    const s =
      byUid.get(entry.uid) ??
      { uid: entry.uid, name: entry.name, points: 0, rounds: 0, hearingMin: 0, readingMin: 0, fullDays: 0, deepDanDays: 0, latest: "" };
    s.points += scoreDay(entry).total;
    s.rounds += entry.rounds;
    s.hearingMin += entry.hearingMin;
    s.readingMin += entry.readingMin;
    if (entry.rounds >= SADHANA_RULES.roundsTarget) s.fullDays += 1;
    if (entry.deepDan) s.deepDanDays += 1;
    // Show whatever name they used most recently.
    if (entry.date >= s.latest) {
      s.latest = entry.date;
      s.name = entry.name;
    }
    byUid.set(entry.uid, s);
  }
  return [...byUid.values()]
    .map(({ latest: _latest, ...s }) => s)
    .sort((a, b) => b.points - a.points || b.fullDays - a.fullDays || a.name.localeCompare(b.name));
}

/** Whole days from `from` to `to` (both "YYYY-MM-DD"). */
export function daysBetween(from: string, to: string) {
  return Math.round((Date.parse(`${to}T00:00:00Z`) - Date.parse(`${from}T00:00:00Z`)) / 86_400_000);
}

export function formatMinutes(minutes: number) {
  if (minutes < 60) return `${minutes}m`;
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return m ? `${h}h ${m}m` : `${h}h`;
}
