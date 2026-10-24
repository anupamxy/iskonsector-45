import type { User } from "firebase/auth";

/** Admins sign in with email + password. Devotees on public pages (e.g. the sadhana
 * leaderboard) get invisible anonymous accounts, so "signed in" alone isn't enough. */
export function isAdmin(user: User | null | undefined): user is User {
  return Boolean(user && !user.isAnonymous);
}
