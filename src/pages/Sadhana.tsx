import { useEffect, useMemo, useState, type FormEvent, type ReactNode } from "react";
import { Link } from "react-router-dom";
import { onAuthStateChanged, signInAnonymously, type User } from "firebase/auth";
import { collection, doc, getDoc, getDocs, query, serverTimestamp, setDoc, where } from "firebase/firestore";
import { BookOpen, Check, Crown, Flame, Headphones, Loader2, Medal, Minus, Plus, Sunrise } from "lucide-react";
import clsx from "clsx";
import { auth, db } from "../lib/firebase";
import { getFestival } from "../data/festivals";
import {
  MAX_DAILY_POINTS,
  SADHANA_RULES,
  addDays,
  buildStandings,
  daysBetween,
  formatDay,
  formatMinutes,
  istToday,
  scoreDay,
  weekStart,
  type SadhanaEntry,
  type Standing,
} from "../lib/sadhana";

const NAME_KEY = "sadhana:name";
const KARTIK_SLUG = "kartik-damodar-month";

/** Same fixed ember layout as the Kartik popup — stable across renders. */
const EMBERS = [
  { left: "6%", delay: "0s", duration: "5.3s" },
  { left: "18%", delay: "1.8s", duration: "6.1s" },
  { left: "31%", delay: "0.6s", duration: "5.7s" },
  { left: "47%", delay: "2.6s", duration: "6.4s" },
  { left: "63%", delay: "1.1s", duration: "5.5s" },
  { left: "76%", delay: "3.1s", duration: "6s" },
  { left: "88%", delay: "0.3s", duration: "5.2s" },
  { left: "95%", delay: "2.1s", duration: "6.6s" },
];

function readSavedName() {
  try {
    return localStorage.getItem(NAME_KEY) ?? "";
  } catch {
    return "";
  }
}

function saveName(name: string) {
  try {
    localStorage.setItem(NAME_KEY, name);
  } catch {
    // Private mode / blocked storage — they'll just retype their name next time.
  }
}

async function loadRange(start: string, end: string) {
  // Range on a single field needs no composite index.
  const snap = await getDocs(
    query(collection(db, "sadhanaEntries"), where("date", ">=", start), where("date", "<=", end)),
  );
  return snap.docs.map((d) => d.data() as SadhanaEntry);
}

function toInt(value: string) {
  const n = parseInt(value, 10);
  return Number.isFinite(n) && n > 0 ? n : 0;
}

function Diya({ size = 48 }: { size?: number }) {
  return (
    <span className="relative inline-flex items-center justify-center" style={{ width: size, height: size }}>
      <span className="absolute inset-0 animate-glow-pulse rounded-full bg-gold/40 blur-xl" />
      <span className="animate-flame-flicker relative flex h-full w-full items-center justify-center rounded-full bg-gradient-to-b from-gold to-primary text-white shadow-[0_0_24px_4px_rgba(193,162,74,0.45)]">
        <Flame size={size * 0.46} fill="currentColor" />
      </span>
    </span>
  );
}

function Embers() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {EMBERS.map((ember, i) => (
        <span
          key={i}
          className="animate-rise-fade absolute bottom-0 h-1.5 w-1.5 rounded-full bg-gold shadow-[0_0_8px_2px_rgba(212,175,55,0.7)]"
          style={{ left: ember.left, animationDelay: ember.delay, animationDuration: ember.duration }}
        />
      ))}
    </div>
  );
}

function Stepper({ value, onChange, max }: { value: string; onChange: (v: string) => void; max: number }) {
  const n = toInt(value);
  const btn =
    "flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-hairline text-secondary transition-colors hover:bg-secondary hover:text-white disabled:opacity-40";
  return (
    <div className="flex items-center gap-2">
      <button type="button" aria-label="Less" className={btn} disabled={n <= 0} onClick={() => onChange(String(n - 1))}>
        <Minus size={16} />
      </button>
      <input
        type="number"
        inputMode="numeric"
        min={0}
        max={max}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="0"
        className="w-full min-w-0 rounded-xl border border-hairline px-3 py-2.5 text-center font-display text-xl text-ink outline-none focus:border-secondary"
      />
      <button type="button" aria-label="More" className={btn} disabled={n >= max} onClick={() => onChange(String(n + 1))}>
        <Plus size={16} />
      </button>
    </div>
  );
}

function Field({ icon, label, hint, children }: { icon: ReactNode; label: string; hint?: string; children: ReactNode }) {
  return (
    <div className="rounded-2xl border border-hairline bg-cream/60 p-4">
      <p className="mb-3 flex items-center gap-2 text-sm font-medium text-ink">
        <span className="text-secondary">{icon}</span>
        {label}
        {hint && <span className="ml-auto text-xs font-normal text-muted">{hint}</span>}
      </p>
      {children}
    </div>
  );
}

const nameKey = (name: string) => name.trim().toLowerCase().replace(/\s+/g, " ");

/** Short, stable tag that tells apart devotees sharing a name, e.g. "#A3F". */
const uidTag = (uid: string) => `#${uid.slice(-3).toUpperCase()}`;

/** uids whose name is also used by someone else on this board. */
function sharedNameUids(standings: Standing[]) {
  const byName = new Map<string, number>();
  for (const s of standings) byName.set(nameKey(s.name), (byName.get(nameKey(s.name)) ?? 0) + 1);
  return new Set(standings.filter((s) => (byName.get(nameKey(s.name)) ?? 0) > 1).map((s) => s.uid));
}

function NameTag({ uid, show }: { uid: string; show: boolean }) {
  if (!show) return null;
  return <span className="shrink-0 text-[11px] font-normal text-muted">{uidTag(uid)}</span>;
}

const rankIcons = [Crown, Medal, Medal];
const rankStyles = ["bg-gold/20 text-gold", "bg-slate-200 text-slate-500", "bg-orange-100 text-orange-700"];

function StatChips({ standing, days }: { standing: Standing; days: number }) {
  return (
    <span className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted">
      <span>📿 {standing.rounds} rounds</span>
      <span title={`${SADHANA_RULES.roundsTarget} rounds completed`} className="inline-flex items-center gap-0.5 text-orange-600">
        <Flame size={12} /> {standing.fullDays}/{days}
      </span>
      <span className="text-gold">🪔 {standing.deepDanDays}</span>
      <span>🎧 {formatMinutes(standing.hearingMin)}</span>
      <span>📖 {formatMinutes(standing.readingMin)}</span>
    </span>
  );
}

function Podium({ top, myUid, tagged }: { top: Standing[]; myUid?: string; tagged: Set<string> }) {
  // Visual order: 2nd, 1st, 3rd.
  const order = [1, 0, 2].filter((i) => top[i]);
  const heights = ["h-28", "h-20", "h-14"];
  return (
    <div className="mb-8 grid grid-cols-3 items-end gap-2 sm:gap-4">
      {order.map((i) => {
        const s = top[i];
        const Icon = rankIcons[i];
        return (
          <div key={s.uid} className={clsx("flex flex-col items-center text-center", top.length < 3 && "col-span-1")}>
            <span
              className={clsx(
                "mb-2 flex items-center justify-center rounded-full",
                i === 0 ? "h-14 w-14 shadow-[0_0_30px_6px_rgba(193,162,74,0.35)]" : "h-11 w-11",
                rankStyles[i],
              )}
            >
              <Icon size={i === 0 ? 24 : 18} />
            </span>
            <p className="w-full truncate px-1 text-sm font-medium text-ink">
              {s.name} <NameTag uid={s.uid} show={tagged.has(s.uid)} />
              {s.uid === myUid && <span className="ml-1 text-[10px] font-semibold text-secondary">(YOU)</span>}
            </p>
            <p className="font-display text-lg text-primary">{s.points}</p>
            <div
              className={clsx(
                "mt-2 flex w-full items-start justify-center rounded-t-2xl pt-2 font-display text-2xl text-white/90",
                heights[i],
                i === 0 ? "bg-gradient-to-b from-gold to-primary" : "bg-gradient-to-b from-primary-light to-secondary",
              )}
            >
              {i + 1}
            </div>
          </div>
        );
      })}
    </div>
  );
}

function StandingRow({
  standing,
  rank,
  isMe,
  days,
  tagged,
}: {
  standing: Standing;
  rank: number;
  isMe: boolean;
  days: number;
  tagged: boolean;
}) {
  const RankIcon = rank <= 3 ? rankIcons[rank - 1] : null;
  return (
    <li
      className={clsx(
        "flex items-center gap-3 rounded-2xl border px-4 py-3 sm:gap-4",
        isMe ? "border-gold/60 bg-gold/10" : "border-hairline bg-white",
      )}
    >
      <span
        className={clsx(
          "flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-sm font-semibold",
          RankIcon ? rankStyles[rank - 1] : "bg-cream-alt text-muted",
        )}
      >
        {RankIcon ? <RankIcon size={17} /> : rank}
      </span>
      <div className="min-w-0 flex-1">
        <p className="flex items-center gap-2 font-medium text-ink">
          <span className="truncate">{standing.name}</span>
          <NameTag uid={standing.uid} show={tagged} />
          {isMe && <span className="rounded-full bg-secondary px-2 py-0.5 text-[10px] font-semibold text-white">YOU</span>}
        </p>
        <div className="mt-1">
          <StatChips standing={standing} days={days} />
        </div>
      </div>
      <div className="text-right">
        <p className="font-display text-xl leading-none text-primary">{standing.points}</p>
        <p className="mt-1 text-[10px] uppercase tracking-wide text-muted">points</p>
      </div>
    </li>
  );
}

type Board = "week" | "kartik";

export default function Sadhana() {
  const today = istToday();
  const yesterday = addDays(today, -1);
  const thisWeek = weekStart(today);
  const lastWeek = addDays(thisWeek, -7);
  const daysLeftInWeek = 7 - daysBetween(thisWeek, today);

  const kartik = getFestival(KARTIK_SLUG);
  const kartikStart = kartik?.date?.slice(0, 10) ?? thisWeek;
  const kartikEnd = kartik?.endDate?.slice(0, 10) ?? addDays(thisWeek, 6);
  const kartikDays = daysBetween(kartikStart, kartikEnd) + 1;
  const kartikDay = daysBetween(kartikStart, today) + 1; // <1 before it starts, >kartikDays after
  const kartikLive = kartikDay >= 1 && kartikDay <= kartikDays;

  const [user, setUser] = useState<User | null>(null);
  const [name, setName] = useState(readSavedName);
  const [date, setDate] = useState(today);
  const [rounds, setRounds] = useState("");
  const [finishedAt, setFinishedAt] = useState("");
  const [hearing, setHearing] = useState("");
  const [reading, setReading] = useState("");
  const [deepDan, setDeepDan] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [savedFor, setSavedFor] = useState<string | null>(null);
  /** A name the devotee chose to keep even though someone else already uses it. */
  const [keptSharedName, setKeptSharedName] = useState<string | null>(null);

  const [board, setBoard] = useState<Board>("week");
  const [weekStandings, setWeekStandings] = useState<Standing[] | null>(null);
  const [lastWeekTop, setLastWeekTop] = useState<Standing[]>([]);
  const [kartikStandings, setKartikStandings] = useState<Standing[] | null>(null);
  const [boardError, setBoardError] = useState<string | null>(null);

  useEffect(() => onAuthStateChanged(auth, setUser), []);

  // Bumped after each save so both boards pick up the new entry.
  const [refresh, setRefresh] = useState(0);
  const [kartikLoadedFor, setKartikLoadedFor] = useState(-1);
  const loadError = "Couldn't load the leaderboard. Please refresh to try again.";

  useEffect(() => {
    let cancelled = false;
    Promise.all([loadRange(thisWeek, today), loadRange(lastWeek, addDays(thisWeek, -1))])
      .then(([current, previous]) => {
        if (cancelled) return;
        setWeekStandings(buildStandings(current));
        setLastWeekTop(buildStandings(previous).slice(0, 3));
        setBoardError(null);
      })
      .catch(() => !cancelled && setBoardError(loadError));
    return () => {
      cancelled = true;
    };
  }, [refresh, thisWeek, lastWeek, today]);

  // The month board reads every entry since Kartik began, so only fetch it when it's shown.
  useEffect(() => {
    if (board !== "kartik" || kartikLoadedFor === refresh) return;
    if (kartikDay < 1) {
      setKartikStandings([]);
      setKartikLoadedFor(refresh);
      return;
    }
    let cancelled = false;
    loadRange(kartikStart, today < kartikEnd ? today : kartikEnd)
      .then((entries) => {
        if (cancelled) return;
        setKartikStandings(buildStandings(entries));
        setKartikLoadedFor(refresh);
        setBoardError(null);
      })
      .catch(() => !cancelled && setBoardError(loadError));
    return () => {
      cancelled = true;
    };
  }, [board, refresh, kartikLoadedFor, kartikDay, kartikStart, kartikEnd, today]);

  // Returning devotees: prefill the form with what they already entered for the chosen day.
  useEffect(() => {
    if (!user) return;
    let cancelled = false;
    getDoc(doc(db, "sadhanaEntries", `${user.uid}_${date}`))
      .then((snap) => {
        if (cancelled) return;
        const entry = snap.exists() ? (snap.data() as SadhanaEntry) : null;
        setRounds(entry ? String(entry.rounds) : "");
        setFinishedAt(entry?.finishedAt ?? "");
        setHearing(entry ? String(entry.hearingMin) : "");
        setReading(entry ? String(entry.readingMin) : "");
        setDeepDan(entry?.deepDan ?? false);
        if (entry && !readSavedName()) setName(entry.name);
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, [user, date]);

  const preview = scoreDay({
    rounds: toInt(rounds),
    finishedAt,
    hearingMin: toInt(hearing),
    readingMin: toInt(reading),
    deepDan,
  });

  const standings = board === "week" ? weekStandings : kartikStandings;
  const boardDays = board === "week" ? 7 : kartikDays;

  const taggedUids = useMemo(() => sharedNameUids(standings ?? []), [standings]);

  const myWeekRank = useMemo(
    () => (user && weekStandings ? weekStandings.findIndex((s) => s.uid === user.uid) + 1 : 0),
    [user, weekStandings],
  );

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setFormError(null);
    setSavedFor(null);
    const trimmedName = name.trim().replace(/\s+/g, " ");
    if (!trimmedName) {
      setFormError("Please enter your name.");
      return;
    }

    // Same name as someone else already on the board? Ask once for a surname or area so
    // devotees can tell each other apart — entries never mix either way (they're keyed by uid).
    const takenBy = [...(weekStandings ?? []), ...(kartikStandings ?? [])].find(
      (s) => nameKey(s.name) === nameKey(trimmedName) && s.uid !== user?.uid,
    );
    if (takenBy && keptSharedName !== nameKey(trimmedName)) {
      setKeptSharedName(nameKey(trimmedName));
      setFormError(
        `Another devotee is already on the leaderboard as “${takenBy.name}”. Please add your surname or area (e.g. “${trimmedName} (Tower B)”) — or tap Offer again to keep this name.`,
      );
      return;
    }

    setSubmitting(true);
    try {
      // No sign-up: an invisible anonymous account ties entries to this browser so
      // nobody else can overwrite them.
      const current = auth.currentUser ?? (await signInAnonymously(auth)).user;
      const entry: SadhanaEntry = {
        uid: current.uid,
        name: trimmedName.slice(0, 40),
        date,
        rounds: Math.min(toInt(rounds), 64),
        finishedAt,
        hearingMin: Math.min(toInt(hearing), 600),
        readingMin: Math.min(toInt(reading), 600),
        deepDan,
      };
      const write = setDoc(doc(db, "sadhanaEntries", `${current.uid}_${date}`), {
        ...entry,
        updatedAt: serverTimestamp(),
      });
      // A misconfigured/offline Firestore backend can leave the write pending
      // indefinitely instead of rejecting, so this bounds it to a clear error.
      const timeout = new Promise<never>((_, reject) => setTimeout(() => reject(new Error("timeout")), 15000));
      await Promise.race([write, timeout]);
      saveName(entry.name);
      setSavedFor(date);
      setRefresh((r) => r + 1);
    } catch (err) {
      const code = (err as { code?: string }).code ?? "";
      console.error("Saving sadhana failed:", err);
      setFormError(
        code === "auth/admin-restricted-operation" || code === "auth/operation-not-allowed"
          ? "Sadhana saving isn't switched on yet (anonymous sign-in is disabled). Please let the temple team know."
          : code === "permission-denied"
            ? "Your entry was rejected — only today's or yesterday's sadhana can be saved. If this keeps happening, please let the temple team know."
            : "Couldn't save your sadhana. Please check your connection and try again.",
      );
    } finally {
      setSubmitting(false);
    }
  }

  const inputClass =
    "w-full rounded-xl border border-hairline bg-white px-4 py-2.5 text-sm outline-none focus:border-secondary";

  const pointsGuide = [
    { icon: "📿", title: "Japa", body: `1 pt per round, up to ${SADHANA_RULES.roundsTarget}` },
    { icon: "🌅", title: "Brahma-muhurta", body: `+${SADHANA_RULES.earlyBonusPoints} for ${SADHANA_RULES.roundsTarget} rounds before 7 AM` },
    { icon: "🪔", title: "Deepdaan", body: `+${SADHANA_RULES.deepDanPoints} for offering a lamp to Damodar` },
    { icon: "🎧", title: "Hearing", body: `1 pt per ${SADHANA_RULES.minutesPerPoint} min, up to ${SADHANA_RULES.dailyMinutesCap} min` },
    { icon: "📖", title: "Reading", body: `1 pt per ${SADHANA_RULES.minutesPerPoint} min, up to ${SADHANA_RULES.dailyMinutesCap} min` },
  ];

  return (
    <div>
      {/* Lamp-lit header + entry form */}
      <section className="relative overflow-hidden bg-gradient-to-b from-ink-deep via-ink to-secondary-deep pb-16 pt-12 text-white sm:pt-16">
        <Embers />
        <div className="pointer-events-none absolute -left-32 top-10 h-80 w-80 animate-float-slow rounded-full bg-gold/15 blur-3xl" />
        <div className="pointer-events-none absolute -right-32 bottom-0 h-80 w-80 animate-float-slower rounded-full bg-primary/25 blur-3xl" />

        <div className="container-page relative">
          <div className="mx-auto max-w-[720px] text-center">
            <Diya size={56} />
            <p className="text-eyebrow mt-5 text-gold">Kartik Damodar Month · Urja Vrata</p>
            <h1 className="mt-3 text-[clamp(2rem,4.6vw,3.2rem)] text-white">Kartik Sadhana Leaderboard</h1>
            {kartik?.verse && (
              <figure className="mx-auto mt-5 max-w-[560px]">
                <blockquote className="font-sanskrit text-lg leading-relaxed text-gold/90 sm:text-xl">
                  {kartik.verse.split("। ").map((line, i, lines) => (
                    <span key={i} className="block">
                      {line}
                      {i < lines.length - 1 && "।"}
                    </span>
                  ))}
                </blockquote>
                <figcaption className="mt-2 text-xs text-white/50">
                  I offer my obeisances to the Supreme Lord, whose form is eternal, full of knowledge and bliss — {kartik.verseRef}
                </figcaption>
              </figure>
            )}
            <p className="mx-auto mt-5 max-w-[560px] text-sm leading-relaxed text-white/70">
              In Kartik, even a little devotion bears boundless fruit. Log your japa, hearing, reading and lamp offering
              each day — and let the whole Sector 45 family inspire one another.
            </p>

            {/* Month progress */}
            <div className="mx-auto mt-7 max-w-[420px]">
              <div className="flex justify-between text-xs text-white/60">
                <span>{formatDay(kartikStart)}</span>
                <span className="font-medium text-gold">
                  {kartikDay < 1
                    ? `Kartik begins in ${1 - kartikDay} ${1 - kartikDay === 1 ? "day" : "days"}`
                    : kartikLive
                      ? `Day ${kartikDay} of ${kartikDays}`
                      : "Kartik complete — Jaya Damodar!"}
                </span>
                <span>{formatDay(kartikEnd)}</span>
              </div>
              <div className="mt-2 h-2 overflow-hidden rounded-full bg-white/10">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-gold to-primary-light"
                  style={{ width: `${Math.min(Math.max(kartikDay / kartikDays, 0), 1) * 100}%` }}
                />
              </div>
            </div>
          </div>

          <div className="mx-auto mt-10 grid max-w-[1040px] grid-cols-1 gap-6 lg:grid-cols-[1.35fr_1fr]">
            <form
              onSubmit={handleSubmit}
              className="rounded-[var(--radius-lg)] bg-white p-5 text-body shadow-[0_30px_80px_-30px_rgba(0,0,0,0.6)] sm:p-7"
            >
              <div className="flex flex-wrap items-center justify-between gap-3">
                <h2 className="text-xl text-ink">Offer Today's Sadhana</h2>
                <div className="inline-flex rounded-full bg-cream-alt p-1 text-sm">
                  {[
                    { value: today, label: "Today" },
                    { value: yesterday, label: "Yesterday" },
                  ].map((opt) => (
                    <button
                      key={opt.value}
                      type="button"
                      onClick={() => setDate(opt.value)}
                      className={clsx(
                        "rounded-full px-3.5 py-1.5 font-medium transition-colors",
                        date === opt.value ? "bg-white text-secondary shadow-sm" : "text-muted hover:text-ink",
                      )}
                    >
                      {opt.label} <span className="font-normal text-muted">· {formatDay(opt.value)}</span>
                    </button>
                  ))}
                </div>
              </div>

              <label className="mt-5 flex flex-col gap-1.5 text-sm font-medium text-ink">
                Your Name
                <input
                  required
                  maxLength={40}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="As you'd like it on the leaderboard"
                  className={inputClass}
                />
              </label>

              <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
                <Field icon="📿" label="Rounds Chanted" hint={`Goal: ${SADHANA_RULES.roundsTarget}`}>
                  <Stepper value={rounds} onChange={setRounds} max={64} />
                </Field>
                <Field icon={<Sunrise size={16} />} label={`Finished ${SADHANA_RULES.roundsTarget} Rounds At`} hint="optional">
                  <input type="time" value={finishedAt} onChange={(e) => setFinishedAt(e.target.value)} className={inputClass} />
                </Field>
                <Field icon={<Headphones size={16} />} label="Hearing" hint="minutes">
                  <input
                    type="number"
                    inputMode="numeric"
                    min={0}
                    max={600}
                    value={hearing}
                    onChange={(e) => setHearing(e.target.value)}
                    placeholder="Lectures, kirtan…"
                    className={inputClass}
                  />
                </Field>
                <Field icon={<BookOpen size={16} />} label="Reading" hint="minutes">
                  <input
                    type="number"
                    inputMode="numeric"
                    min={0}
                    max={600}
                    value={reading}
                    onChange={(e) => setReading(e.target.value)}
                    placeholder="Srila Prabhupada's books"
                    className={inputClass}
                  />
                </Field>
              </div>

              {/* Deepdaan toggle */}
              <button
                type="button"
                role="switch"
                aria-checked={deepDan}
                onClick={() => setDeepDan((v) => !v)}
                className={clsx(
                  "mt-3 flex w-full items-center gap-4 rounded-2xl border p-4 text-left transition-all",
                  deepDan
                    ? "border-gold bg-gradient-to-r from-gold/20 to-primary/10 shadow-[0_0_30px_-8px_rgba(193,162,74,0.7)]"
                    : "border-dashed border-hairline bg-cream/60 hover:border-gold/60",
                )}
              >
                {deepDan ? (
                  <Diya size={44} />
                ) : (
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-cream-alt text-muted">
                    <Flame size={20} />
                  </span>
                )}
                <span className="flex-1">
                  <span className="block font-medium text-ink">
                    {deepDan ? "Lamp offered to Sri Damodar 🙏" : "I offered a lamp (Deepdaan) to Damodar"}
                  </span>
                  <span className="block text-xs text-muted">
                    At the temple or at home, with Damodarashtakam · +{SADHANA_RULES.deepDanPoints} points
                  </span>
                </span>
                <span
                  className={clsx(
                    "flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2",
                    deepDan ? "border-gold bg-gold text-white" : "border-hairline",
                  )}
                >
                  {deepDan && <Check size={14} strokeWidth={3} />}
                </span>
              </button>

              <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-hairline pt-5">
                <div>
                  <p className="text-xs uppercase tracking-wide text-muted">
                    Points for {date === today ? "today" : "yesterday"}
                  </p>
                  <p>
                    <span className="font-display text-3xl text-primary">{preview.total}</span>
                    <span className="text-muted"> / {MAX_DAILY_POINTS}</span>
                  </p>
                </div>
                <button
                  type="submit"
                  disabled={submitting}
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-br from-primary to-primary-light px-7 py-3 text-sm font-semibold text-white shadow-[var(--shadow-cta)] transition-all hover:-translate-y-0.5 hover:brightness-105 disabled:pointer-events-none disabled:opacity-60"
                >
                  {submitting ? <Loader2 size={16} className="animate-spin" /> : <Flame size={16} />}
                  {submitting ? "Offering…" : "Offer My Sadhana"}
                </button>
              </div>

              {formError && <p className="mt-4 rounded-xl bg-danger/10 px-4 py-3 text-sm text-red-700">{formError}</p>}
              {savedFor && (
                <p className="mt-4 rounded-xl bg-gold/15 px-4 py-3 text-sm text-ink">
                  Hare Krishna! 🙏 Your sadhana for{" "}
                  {formatDay(savedFor, { weekday: "long", day: "numeric", month: "short" })} is offered
                  {myWeekRank ? ` — you're #${myWeekRank} this week` : ""}. Jaya Damodar!
                </p>
              )}
            </form>

            <aside className="flex flex-col gap-4">
              <div className="rounded-[var(--radius-lg)] border border-white/15 bg-white/[0.06] p-5 backdrop-blur sm:p-6">
                <h2 className="text-lg text-white">How Points Are Earned</h2>
                <ul className="mt-4 flex flex-col gap-3">
                  {pointsGuide.map((g) => (
                    <li key={g.title} className="flex items-center gap-3">
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/10 text-lg">
                        {g.icon}
                      </span>
                      <span className="text-sm">
                        <span className="block font-medium text-white">{g.title}</span>
                        <span className="block text-white/60">{g.body}</span>
                      </span>
                    </li>
                  ))}
                </ul>
                <p className="mt-5 rounded-2xl bg-gold/10 px-4 py-3 text-sm text-white/75">
                  A perfect day is <span className="font-semibold text-gold">{MAX_DAILY_POINTS} points</span>. Steady daily
                  sadhana outshines one big day.
                </p>
              </div>
              {kartik && (
                <Link
                  to={`/festivals/${kartik.slug}`}
                  className="group flex items-center gap-3 rounded-[var(--radius-lg)] border border-gold/30 bg-gold/10 p-4 text-sm text-white/80 transition-colors hover:bg-gold/15"
                >
                  <span className="text-2xl">🪔</span>
                  <span className="flex-1">
                    <span className="block font-medium text-gold">Daily Deepdaan at the temple</span>
                    {kartik.timeLabel?.replace("Daily Deepdaan — ", "") ?? "Every evening"} · Learn about Kartik
                  </span>
                  <span className="transition-transform group-hover:translate-x-1">→</span>
                </Link>
              )}
            </aside>
          </div>
        </div>
      </section>

      {/* Leaderboard */}
      <section className="section-pad bg-cream">
        <div className="container-page mx-auto max-w-[780px]">
          <div className="mb-8 text-center">
            <p className="text-eyebrow text-primary">🪷 Sadhakas of Sector 45 🪷</p>
            <h2 className="mt-3 text-[clamp(1.9rem,3.6vw,2.6rem)] text-ink">Leaderboard</h2>
            <div className="mt-5 inline-flex rounded-full border border-hairline bg-white p-1 text-sm shadow-sm">
              {(
                [
                  { value: "week", label: "This Week" },
                  { value: "kartik", label: "Whole Kartik" },
                ] as const
              ).map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => setBoard(opt.value)}
                  className={clsx(
                    "rounded-full px-5 py-2 font-medium transition-colors",
                    board === opt.value
                      ? "bg-gradient-to-br from-primary to-primary-light text-white shadow-sm"
                      : "text-muted hover:text-ink",
                  )}
                >
                  {opt.label}
                </button>
              ))}
            </div>
            <p className="mt-3 text-sm text-muted">
              {board === "week"
                ? `${formatDay(thisWeek)} – ${formatDay(addDays(thisWeek, 6))} · resets Monday 12:00 AM IST · ${daysLeftInWeek} ${daysLeftInWeek === 1 ? "day" : "days"} left`
                : `${formatDay(kartikStart)} – ${formatDay(kartikEnd)} · all ${kartikDays} days of Kartik`}
            </p>
          </div>

          {boardError ? (
            <p className="text-center text-sm text-red-700">{boardError}</p>
          ) : standings === null ? (
            <div className="flex justify-center py-10 text-muted">
              <Loader2 className="animate-spin" />
            </div>
          ) : standings.length === 0 ? (
            <div className="rounded-[var(--radius-lg)] border border-dashed border-gold/50 bg-white px-5 py-10 text-center">
              <Diya size={40} />
              <p className="mt-4 text-sm text-muted">
                {board === "kartik" && kartikDay < 1
                  ? "The Kartik leaderboard opens when the month begins."
                  : "No entries yet — be the first to light the way!"}
              </p>
            </div>
          ) : (
            <>
              <Podium top={standings.slice(0, 3)} myUid={user?.uid} tagged={taggedUids} />
              <ol className="flex flex-col gap-2.5">
                {standings.map((s, i) => (
                  <StandingRow
                    key={s.uid}
                    standing={s}
                    rank={i + 1}
                    isMe={s.uid === user?.uid}
                    days={boardDays}
                    tagged={taggedUids.has(s.uid)}
                  />
                ))}
              </ol>
            </>
          )}

          {board === "week" && lastWeekTop.length > 0 && (
            <div className="mt-12 text-center">
              <h3 className="text-lg text-ink">Last Week's Top Sadhakas</h3>
              <p className="mt-1 text-xs text-muted">
                {formatDay(lastWeek)} – {formatDay(addDays(lastWeek, 6))}
              </p>
              <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-3">
                {lastWeekTop.map((s, i) => {
                  const Icon = rankIcons[i];
                  return (
                    <div key={s.uid} className="rounded-2xl border border-hairline bg-white p-4">
                      <span className={clsx("mx-auto flex h-10 w-10 items-center justify-center rounded-full", rankStyles[i])}>
                        <Icon size={18} />
                      </span>
                      <p className="mt-2 truncate font-medium text-ink">{s.name}</p>
                      <p className="font-display text-lg text-primary">{s.points} pts</p>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          <p className="mx-auto mt-12 max-w-[520px] text-center text-sm italic text-muted">
            “This leaderboard is not for competition but for inspiration — every round, every lamp is an offering to
            Sri Sri Radha Gopinath.”
          </p>
        </div>
      </section>
    </div>
  );
}
