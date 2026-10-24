import { useEffect, useState } from "react";
import { leaderboards, type LeaderboardInfo } from "../data/leaderboards";

// Read through Firestore's REST API rather than the SDK: the header and footer render
// on every page, and this keeps the Firebase SDK out of the main bundle.
const URL = `https://firestore.googleapis.com/v1/projects/${import.meta.env.VITE_FIREBASE_PROJECT_ID}/databases/(default)/documents/leaderboards?key=${import.meta.env.VITE_FIREBASE_API_KEY}`;

interface RestDoc {
  name: string;
  fields?: { live?: { booleanValue?: boolean } };
}

let request: Promise<LeaderboardInfo[]> | null = null;

function fetchLive() {
  // One request per page load, shared by every component that asks.
  request ??= fetch(URL)
    .then((res) => (res.ok ? res.json() : { documents: [] }))
    .then((data: { documents?: RestDoc[] }) => {
      const liveIds = new Set(
        (data.documents ?? []).filter((d) => d.fields?.live?.booleanValue).map((d) => d.name.split("/").pop()),
      );
      return leaderboards.filter((lb) => liveIds.has(lb.id));
    })
    .catch(() => []);
  return request;
}

/** Leaderboards an admin has made live — empty until loaded, and on any error. */
export function useLiveLeaderboards() {
  const [live, setLive] = useState<LeaderboardInfo[]>([]);
  useEffect(() => {
    let cancelled = false;
    fetchLive().then((list) => !cancelled && setLive(list));
    return () => {
      cancelled = true;
    };
  }, []);
  return live;
}
