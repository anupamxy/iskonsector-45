import { useState, type FormEvent } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import Button from "./Button";
import { auth } from "../../lib/firebase";

export default function AdminLoginForm() {
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
