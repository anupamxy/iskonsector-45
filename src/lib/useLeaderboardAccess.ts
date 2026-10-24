import { useEffect, useState } from "react";
import { onAuthStateChanged, type User } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "./firebase";
import { isAdmin } from "./admin";

/** Whether a leaderboard page should render: "loading", "public" (switched live),
 * "preview" (hidden, but an admin is signed in) or "hidden". */
export function useLeaderboardAccess(id: string) {
  const [live, setLive] = useState<boolean | null>(null);
  const [user, setUser] = useState<User | null | undefined>(undefined);

  useEffect(() => onAuthStateChanged(auth, setUser), []);

  useEffect(() => {
    getDoc(doc(db, "leaderboards", id))
      .then((snap) => setLive(snap.exists() && snap.data().live === true))
      .catch(() => setLive(false));
  }, [id]);

  if (live === null || user === undefined) return "loading" as const;
  if (live) return "public" as const;
  return isAdmin(user) ? ("preview" as const) : ("hidden" as const);
}
