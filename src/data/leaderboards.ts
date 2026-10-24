/** Every leaderboard on the site. Each one stays hidden from the public until an admin
 * switches it live at /admin/leaderboards — that switch is the `live` flag on the
 * Firestore doc `leaderboards/{id}` (a missing doc means hidden). To add a new
 * leaderboard, add it here and gate its page with `useLeaderboardAccess(id)`. */
export interface LeaderboardInfo {
  id: string;
  title: string;
  description: string;
  path: string;
  /** Label for the "Explore" menu and footer links, shown only while live. */
  navLabel: string;
}

export const leaderboards: LeaderboardInfo[] = [
  {
    id: "sadhana",
    title: "Kartik Sadhana Leaderboard",
    description: "Devotees log daily japa, hearing, reading and Deepdaan; weekly and whole-Kartik rankings.",
    path: "/sadhana",
    navLabel: "Sadhana Leaderboard",
  },
];
