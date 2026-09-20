import { useEffect, useState } from "react";
import { onAuthStateChanged, signOut, type User } from "firebase/auth";
import { collection, query, orderBy, getDocs, doc, updateDoc, type Timestamp } from "firebase/firestore";
import { LogOut, Loader2, RefreshCw } from "lucide-react";
import clsx from "clsx";
import PageHero from "../components/ui/PageHero";
import Button from "../components/ui/Button";
import AdminLoginForm from "../components/ui/AdminLoginForm";
import { auth, db } from "../lib/firebase";
import { images } from "../data/images";

interface BookingItem {
  category: string;
  label: string;
  amount: number;
}

interface Booking {
  id: string;
  participantName: string;
  gotra?: string;
  purpose?: string;
  pujaDate?: string;
  contactPhone?: string;
  items: BookingItem[];
  totalAmount: number;
  status: "pending_payment" | "confirmed" | "completed";
  createdAt?: Timestamp;
}

const statusStyles: Record<Booking["status"], string> = {
  pending_payment: "bg-gold/15 text-gold",
  confirmed: "bg-secondary/10 text-secondary",
  completed: "bg-success/20 text-success",
};

const statusLabels: Record<Booking["status"], string> = {
  pending_payment: "Pending Payment",
  confirmed: "Confirmed",
  completed: "Completed",
};

function BookingsPanel({ user }: { user: User }) {
  const [bookings, setBookings] = useState<Booking[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  async function loadBookings() {
    try {
      const snap = await getDocs(query(collection(db, "pujaBookings"), orderBy("createdAt", "desc")));
      setBookings(snap.docs.map((d) => ({ id: d.id, ...(d.data() as Omit<Booking, "id">) })));
    } catch {
      setError("Couldn't load puja bookings.");
    }
  }

  useEffect(() => {
    loadBookings();
  }, []);

  async function cycleStatus(booking: Booking) {
    const next: Booking["status"] =
      booking.status === "pending_payment" ? "confirmed" : booking.status === "confirmed" ? "completed" : "pending_payment";
    setUpdatingId(booking.id);
    try {
      await updateDoc(doc(db, "pujaBookings", booking.id), { status: next });
      setBookings((prev) => prev?.map((b) => (b.id === booking.id ? { ...b, status: next } : b)) ?? null);
    } catch {
      setError("Couldn't update that booking's status.");
    } finally {
      setUpdatingId(null);
    }
  }

  return (
    <div className="container-page section-pad">
      <div className="mb-8 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-xl text-ink">Puja Bookings</h2>
          <p className="text-sm text-muted">Signed in as {user.email}</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={loadBookings}>
            <RefreshCw size={16} /> Refresh
          </Button>
          <Button variant="outline" onClick={() => signOut(auth)}>
            <LogOut size={16} /> Sign Out
          </Button>
        </div>
      </div>

      {error && <p className="mb-4 text-sm text-danger">{error}</p>}

      {!bookings ? (
        <div className="flex items-center gap-2 text-muted">
          <Loader2 size={18} className="animate-spin" /> Loading…
        </div>
      ) : bookings.length === 0 ? (
        <p className="text-sm text-muted">No puja bookings yet.</p>
      ) : (
        <div className="flex flex-col gap-4">
          {bookings.map((booking) => (
            <div key={booking.id} className="rounded-[var(--radius-card)] border border-hairline bg-white p-5 shadow-[var(--shadow-card)]">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="font-medium text-ink">
                    {booking.participantName} {booking.gotra && <span className="text-muted">· Gotra: {booking.gotra}</span>}
                  </p>
                  <p className="text-xs text-muted">
                    {booking.pujaDate && <>Puja date: {booking.pujaDate} · </>}
                    {booking.contactPhone}
                  </p>
                  {booking.purpose && <p className="mt-1 text-sm text-muted">"{booking.purpose}"</p>}
                </div>
                <button
                  type="button"
                  onClick={() => cycleStatus(booking)}
                  disabled={updatingId === booking.id}
                  className={clsx(
                    "shrink-0 rounded-full px-3.5 py-1 text-xs font-semibold uppercase tracking-wider transition-opacity disabled:opacity-50",
                    statusStyles[booking.status],
                  )}
                >
                  {updatingId === booking.id ? "Updating…" : statusLabels[booking.status]}
                </button>
              </div>
              <div className="mt-3 flex flex-wrap gap-2 border-t border-hairline pt-3">
                {booking.items.map((item) => (
                  <span key={`${item.category}-${item.label}`} className="rounded-full bg-cream-alt px-3 py-1 text-xs text-ink">
                    {item.label} · ₹{item.amount.toLocaleString("en-IN")}
                  </span>
                ))}
              </div>
              <p className="mt-3 text-right font-display text-lg text-primary">
                Total: ₹{booking.totalAmount.toLocaleString("en-IN")}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default function AdminPujaBookings() {
  const [user, setUser] = useState<User | null | undefined>(undefined);

  useEffect(() => onAuthStateChanged(auth, setUser), []);

  return (
    <div>
      <PageHero
        breadcrumb={[{ label: "Home", to: "/" }, { label: "Puja Bookings Admin" }]}
        eyebrow="Private"
        title="Puja Bookings Admin"
        subtitle="Review and confirm puja requests submitted through the Puja Services page."
        images={[{ src: images.pageHero.contact, position: "center 30%" }]}
      />

      {user === undefined ? null : user ? <BookingsPanel user={user} /> : <AdminLoginForm />}
    </div>
  );
}
