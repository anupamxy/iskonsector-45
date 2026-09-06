import { useEffect, useState, type FormEvent } from "react";
import { onAuthStateChanged, signInWithEmailAndPassword, signOut, type User } from "firebase/auth";
import {
  ref,
  listAll,
  getDownloadURL,
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

interface Photo {
  name: string;
  url: string;
  thumbUrl: string;
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

  async function refreshPhotos() {
    const result = await listAll(ref(storage, "gallery"));
    const recent = result.items.filter((item) => isWithinRetention(item.name));
    const sorted = recent.sort((a, b) => b.name.localeCompare(a.name));
    const withUrls = await Promise.all(
      sorted.map(async (item) => {
        const url = await getDownloadURL(item);
        const thumbUrl = await getDownloadURL(ref(storage, `gallery/thumbs/${item.name}`)).catch(() => url);
        return { name: item.name, url, thumbUrl };
      }),
    );
    setPhotos(withUrls);
  }

  /** Deletes any photo (+ its thumbnail) uploaded before the retention window,
   * so the gallery stays a rolling window automatically without needing a
   * separate scheduled backend job. */
  async function cleanupExpiredPhotos() {
    const result = await listAll(ref(storage, "gallery"));
    const expired = result.items.filter((item) => !isWithinRetention(item.name));
    await Promise.all(
      expired.map((item) =>
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
    let completed = 0;

    files.forEach(async (file) => {
      const name = `${Date.now()}-${file.name}`;

      try {
        const thumbBlob = await createThumbnail(file);
        await Promise.all([
          new Promise<void>((resolve, reject) => {
            const task = uploadBytesResumable(ref(storage, `gallery/${name}`), file);
            task.on(
              "state_changed",
              (snapshot) => setProgress(Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100)),
              reject,
              () => resolve(),
            );
          }),
          uploadBytesResumable(ref(storage, `gallery/thumbs/${name}`), thumbBlob),
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

      <label className="flex cursor-pointer flex-col items-center gap-3 rounded-[var(--radius-card)] border-2 border-dashed border-hairline p-10 text-center hover:border-secondary">
        <UploadCloud size={28} className="text-secondary" />
        <span className="text-sm font-medium text-ink">
          {uploading ? `Uploading… ${progress}%` : "Click to choose photos, or drag them here"}
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
