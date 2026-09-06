export const GALLERY_RETENTION_DAYS = 7;

/** Filenames are uploaded as `${Date.now()}-${originalName}` — this pulls that
 * leading timestamp back out. Used as a fallback for photos uploaded before
 * darshan-date metadata existed. */
function uploadedAt(name: string): number {
  return parseInt(name.split("-")[0], 10);
}

/** True if a photo's darshan date (falling back to its upload timestamp for
 * legacy photos with no date metadata) is within the retention window. */
export function isWithinRetention(name: string, darshanDate?: string, now = Date.now()): boolean {
  const reference = darshanDate ? new Date(`${darshanDate}T00:00:00`).getTime() : uploadedAt(name);
  if (Number.isNaN(reference)) return true; // can't tell — keep it rather than silently drop it
  return now - reference <= GALLERY_RETENTION_DAYS * 24 * 60 * 60 * 1000;
}
