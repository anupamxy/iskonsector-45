import { useEffect, useState, type FormEvent } from "react";
import { onAuthStateChanged, signInWithEmailAndPassword, signOut, type User } from "firebase/auth";
import {
  ref,
  listAll,
  getDownloadURL,
  getMetadata,
  uploadBytesResumable,
  deleteObject,
} from "firebase/storage";
import { LogOut, Trash2, UploadCloud, Loader2 } from "lucide-react";
import PageHero from "../components/ui/PageHero";
import Button from "../components/ui/Button";
import { auth, storage } from "../lib/firebase";
import { createThumbnail } from "../lib/imageThumbnail";
import { isWithinRetention, GALLERY_RETENTION_DAYS } from "../lib/galleryRetention";
import { images } from "../data/images";

const TAG_SUGGESTIONS = [
  "Daily Darshan",
  "Janmashtami",
  "Radhashtami",
  "Ram Navami",
  "Jhulan Yatra",
  "Balrama Purnima",
  "Kirtan",
  "Prasadam Seva",
];

function todayISO() {
  return new Date().toISOString().slice(0, 10);
}

interface Photo {
  name: string;
  url: string;
  thumbUrl: string;
  darshanDate?: string;
  tag?: string;
}

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch {
      setError("Couldn't sign in — check your email and password.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="container-page section-pad">
      <form onSubmit={handleSubmit} className="mx-auto flex max-w-sm flex-col gap-4">
        <h2 className="text-center text-xl text-ink">Admin Sign In</h2>
        <input
          type="email"
          required
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="rounded-xl border border-hairline px-4 py-2.5 text-sm outline-none focus:border-secondary"
        />
        <input
          type="password"
          required
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="rounded-xl border border-hairline px-4 py-2.5 text-sm outline-none focus:border-secondary"
        />
        {error && <p className="text-sm text-danger">{error}</p>}
        <Button type="submit" className="w-full">
          {loading ? "Signing in…" : "Sign In"}
        </Button>
      </form>
    </div>
  );
}

function UploadPanel({ user }: { user: User }) {
  const [photos, setPhotos] = useState<Photo[] | null>(null);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [date, setDate] = useState(todayISO());
  const [tag, setTag] = useState("Daily Darshan");

  async function refreshPhotos() {
    const result = await listAll(ref(storage, "gallery"));
    const withMeta = await Promise.all(
      result.items.map(async (item) => {
        const meta = await getMetadata(item).catch(() => null);
        return { item, darshanDate: meta?.customMetadata?.darshanDate, tag: meta?.customMetadata?.tag };
      }),
    );
    const recent = withMeta.filter(({ item, darshanDate }) => isWithinRetention(item.name, darshanDate));
    const sorted = recent.sort((a, b) => b.item.name.localeCompare(a.item.name));
    const withUrls = await Promise.all(
      sorted.map(async ({ item, darshanDate, tag }) => {
        const url = await getDownloadURL(item);
        const thumbUrl = await getDownloadURL(ref(storage, `gallery/thumbs/${item.name}`)).catch(() => url);
        return { name: item.name, url, thumbUrl, darshanDate, tag };
      }),
    );
    setPhotos(withUrls);
  }

  /** Deletes any photo (+ its thumbnail) uploaded before the retention window,
   * so the gallery stays a rolling window automatically without needing a
   * separate scheduled backend job. */
  async function cleanupExpiredPhotos() {
    const result = await listAll(ref(storage, "gallery"));
    const withMeta = await Promise.all(
      result.items.map(async (item) => {
        const meta = await getMetadata(item).catch(() => null);
        return { item, darshanDate: meta?.customMetadata?.darshanDate };
      }),
    );
    const expired = withMeta.filter(({ item, darshanDate }) => !isWithinRetention(item.name, darshanDate));
    await Promise.all(
      expired.map(({ item }) =>
        Promise.all([
          deleteObject(item).catch(() => {}),
          deleteObject(ref(storage, `gallery/thumbs/${item.name}`)).catch(() => {}),
        ]),
      ),
    );
  }

  useEffect(() => {
    cleanupExpiredPhotos()
      .catch(() => {})
      .finally(() => {
        refreshPhotos().catch(() => setError("Couldn't load existing photos."));
      });
  }, []);

  function handleFiles(fileList: FileList | null) {
    if (!fileList || fileList.length === 0) return;
    setError(null);
    setUploading(true);
    setProgress(0);

    const files = Array.from(fileList);
    const customMetadata = { darshanDate: date, tag: tag.trim() || "Daily Darshan" };
    let completed = 0;

    files.forEach(async (file) => {
      const name = `${Date.now()}-${file.name}`;

      try {
        const thumbBlob = await createThumbnail(file);
        await Promise.all([
          new Promise<void>((resolve, reject) => {
            const task = uploadBytesResumable(ref(storage, `gallery/${name}`), file, { customMetadata });
            task.on(
              "state_changed",
              (snapshot) => setProgress(Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100)),
              reject,
              () => resolve(),
            );
          }),
          uploadBytesResumable(ref(storage, `gallery/thumbs/${name}`), thumbBlob, { customMetadata }),
        ]);
      } catch {
        setError("One or more uploads failed. Please try again.");
      } finally {
        completed += 1;
        if (completed === files.length) {
          setUploading(false);
          setProgress(0);
          refreshPhotos();
        }
      }
    });
  }

  async function handleDelete(photo: Photo) {
    if (!confirm(`Delete "${photo.name}"? This can't be undone.`)) return;
    try {
      await Promise.all([
        deleteObject(ref(storage, `gallery/${photo.name}`)),
        deleteObject(ref(storage, `gallery/thumbs/${photo.name}`)).catch(() => {}),
      ]);
      setPhotos((prev) => prev?.filter((p) => p.name !== photo.name) ?? null);
    } catch {
      setError("Couldn't delete that photo.");
    }
  }

  return (
    <div className="container-page section-pad">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h2 className="text-xl text-ink">Gallery Admin</h2>
          <p className="text-sm text-muted">Signed in as {user.email}</p>
          <p className="mt-1 text-xs text-muted">
            Photos older than {GALLERY_RETENTION_DAYS} days are deleted automatically.
          </p>
        </div>
        <Button variant="outline" onClick={() => signOut(auth)}>
          <LogOut size={16} /> Sign Out
        </Button>
      </div>

      <div className="mb-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <label className="flex flex-col gap-1.5 text-sm font-medium text-ink">
          Darshan date
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="rounded-xl border border-hairline px-4 py-2.5 text-sm outline-none focus:border-secondary"
          />
        </label>
        <label className="flex flex-col gap-1.5 text-sm font-medium text-ink">
          Tag (festival or occasion)
          <input
            type="text"
            list="tag-suggestions"
            value={tag}
            onChange={(e) => setTag(e.target.value)}
            placeholder="e.g. Daily Darshan, Janmashtami…"
            className="rounded-xl border border-hairline px-4 py-2.5 text-sm outline-none focus:border-secondary"
          />
          <datalist id="tag-suggestions">
            {TAG_SUGGESTIONS.map((suggestion) => (
              <option key={suggestion} value={suggestion} />
            ))}
          </datalist>
        </label>
      </div>

      <label className="flex cursor-pointer flex-col items-center gap-3 rounded-[var(--radius-card)] border-2 border-dashed border-hairline p-10 text-center hover:border-secondary">
        <UploadCloud size={28} className="text-secondary" />
        <span className="text-sm font-medium text-ink">
          {uploading ? `Uploading… ${progress}%` : "Click to choose photos, or drag them here"}
        </span>
        <span className="text-xs text-muted">
          Will be tagged "{tag.trim() || "Daily Darshan"}" · {date}
        </span>
        <input
          type="file"
          accept="image/*"
          multiple
          disabled={uploading}
          className="hidden"
          onChange={(e) => handleFiles(e.target.files)}
        />
      </label>
      {error && <p className="mt-3 text-sm text-danger">{error}</p>}

      <h3 className="mb-4 mt-10 text-lg text-ink">Uploaded Photos {photos && `(${photos.length})`}</h3>
      {!photos ? (
        <div className="flex items-center gap-2 text-muted">
          <Loader2 size={18} className="animate-spin" /> Loading…
        </div>
      ) : photos.length === 0 ? (
        <p className="text-sm text-muted">No photos uploaded yet.</p>
      ) : (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {photos.map((photo) => (
            <div key={photo.name} className="group relative aspect-square overflow-hidden rounded-xl bg-cream-alt">
              <img src={photo.thumbUrl} alt="" className="h-full w-full object-cover" />
              <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink-deep/85 to-transparent px-2 pb-1.5 pt-4 text-[0.65rem] text-white">
                {photo.tag && <p className="truncate font-semibold">{photo.tag}</p>}
                {photo.darshanDate && <p className="opacity-80">{photo.darshanDate}</p>}
              </div>
              <button
                type="button"
                onClick={() => handleDelete(photo)}
                aria-label={`Delete ${photo.name}`}
                className="absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-full bg-ink-deep/80 text-white opacity-0 transition-opacity group-hover:opacity-100"
              >
                <Trash2 size={14} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default function AdminGallery() {
  const [user, setUser] = useState<User | null | undefined>(undefined);

  useEffect(() => onAuthStateChanged(auth, setUser), []);

  return (
    <div>
      <PageHero
        breadcrumb={[{ label: "Home", to: "/" }, { label: "Gallery Admin" }]}
        eyebrow="Private"
        title="Gallery Admin"
        subtitle="Upload and manage the photos shown on the public Gallery page."
        images={[{ src: images.pageHero.contact, position: "center 30%" }]}
      />

      {user === undefined ? null : user ? <UploadPanel user={user} /> : <LoginForm />}
    </div>
  );
}
