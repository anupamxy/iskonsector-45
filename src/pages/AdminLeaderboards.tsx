import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { onAuthStateChanged, signOut, type User } from "firebase/auth";
import { doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore";
import { ExternalLink, Eye, EyeOff, Loader2, LogOut } from "lucide-react";
import clsx from "clsx";
import PageHero from "../components/ui/PageHero";
import Button from "../components/ui/Button";
import AdminLoginForm from "../components/ui/AdminLoginForm";
import { auth, db } from "../lib/firebase";
import { isAdmin } from "../lib/admin";
import { leaderboards } from "../data/leaderboards";
import { images } from "../data/images";

function LeaderboardsPanel({ user }: { user: User }) {
  const [live, setLive] = useState<Record<string, boolean> | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  useEffect(() => {
    Promise.all(leaderboards.map((lb) => getDoc(doc(db, "leaderboards", lb.id))))
      .then((snaps) =>
        setLive(Object.fromEntries(snaps.map((snap) => [snap.id, snap.exists() && snap.data().live === true]))),
      )
      .catch(() => setError("Couldn't load leaderboard settings."));
  }, []);

  async function toggle(id: string) {
    if (!live) return;
    const next = !live[id];
    setUpdatingId(id);
    setError(null);
    try {
      await setDoc(doc(db, "leaderboards", id), { live: next, updatedAt: serverTimestamp(), updatedBy: user.email ?? "" });
      setLive({ ...live, [id]: next });
    } catch {
      setError("Couldn't update that leaderboard. Check that your account is allowed in the Firestore rules.");
    } finally {
      setUpdatingId(null);
    }
  }

  return (
    <div className="container-page section-pad">
      <div className="mb-8 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-xl text-ink">Leaderboards</h2>
          <p className="text-sm text-muted">Signed in as {user.email}</p>
        </div>
        <Button variant="outline" onClick={() => signOut(auth)}>
          <LogOut size={16} /> Sign Out
        </Button>
      </div>

      {error && <p className="mb-4 text-sm text-danger">{error}</p>}

      {!live ? (
        <div className="flex items-center gap-2 text-muted">
          <Loader2 size={18} className="animate-spin" /> Loading…
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {leaderboards.map((lb) => {
            const isLive = live[lb.id];
            return (
              <div
                key={lb.id}
                className="flex flex-wrap items-center gap-4 rounded-[var(--radius-card)] border border-hairline bg-white p-5 shadow-[var(--shadow-card)]"
              >
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="text-lg text-ink">{lb.title}</h3>
                    <span
                      className={clsx(
                        "inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-semibold",
                        isLive ? "bg-success/20 text-green-800" : "bg-cream-alt text-muted",
                      )}
                    >
                      {isLive ? <Eye size={12} /> : <EyeOff size={12} />}
                      {isLive ? "Live for everyone" : "Hidden — admins only"}
                    </span>
                  </div>
                  <p className="mt-1 text-sm text-muted">{lb.description}</p>
                  <Link to={lb.path} className="mt-2 inline-flex items-center gap-1 text-sm font-medium text-secondary">
                    {isLive ? "Open page" : "Preview page"} <ExternalLink size={13} />
                  </Link>
                </div>
                <button
                  type="button"
                  role="switch"
                  aria-checked={isLive}
                  aria-label={`${lb.title} live`}
                  disabled={updatingId === lb.id}
                  onClick={() => toggle(lb.id)}
                  className={clsx(
                    "relative h-8 w-14 shrink-0 rounded-full transition-colors disabled:opacity-60",
                    isLive ? "bg-success" : "bg-hairline",
                  )}
                >
                  <span
                    className={clsx(
                      "absolute top-1 flex h-6 w-6 items-center justify-center rounded-full bg-white shadow transition-all",
                      isLive ? "left-7" : "left-1",
                    )}
                  >
                    {updatingId === lb.id && <Loader2 size={14} className="animate-spin text-muted" />}
                  </span>
                </button>
              </div>
            );
          })}
          <p className="text-sm text-muted">
            Hidden leaderboards don't appear in the menu, and visitors who open the link see a “coming soon” message.
            Entries already saved are kept when you hide a board.
          </p>
        </div>
      )}
    </div>
  );
}

export default function AdminLeaderboards() {
  const [user, setUser] = useState<User | null | undefined>(undefined);

  useEffect(() => onAuthStateChanged(auth, setUser), []);

  return (
    <div>
      <PageHero
        breadcrumb={[{ label: "Home", to: "/" }, { label: "Leaderboards Admin" }]}
        eyebrow="Private"
        title="Leaderboards Admin"
        subtitle="Choose which leaderboards are visible to the public."
        images={[{ src: images.pageHero.contact, position: "center 30%" }]}
      />

      {user === undefined ? null : isAdmin(user) ? <LeaderboardsPanel user={user} /> : <AdminLoginForm />}
    </div>
  );
}
