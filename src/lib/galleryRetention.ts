export const GALLERY_RETENTION_DAYS = 7;

/** Filenames are uploaded as `${Date.now()}-${originalName}` — this pulls that
 * leading timestamp back out so we can tell how old an uploaded photo is. */
function uploadedAt(name: string): number {
  return parseInt(name.split("-")[0], 10);
}

/** True if a gallery filename was uploaded within the retention window. */
export function isWithinRetention(name: string, now = Date.now()): boolean {
  const uploaded = uploadedAt(name);
  if (Number.isNaN(uploaded)) return true; // unrecognized name — keep it rather than silently drop it
  return now - uploaded <= GALLERY_RETENTION_DAYS * 24 * 60 * 60 * 1000;
}
