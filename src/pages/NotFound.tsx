import { Flame } from "lucide-react";
import Button from "../components/ui/Button";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center gap-5 py-32 text-center">
      <span className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
        <Flame size={28} />
      </span>
      <h1 className="text-3xl text-ink">Page Not Found</h1>
      <p className="max-w-sm text-muted">
        Hare Krishna — the page you're looking for doesn't exist or may have moved.
      </p>
      <Button to="/">Back to Home</Button>
    </div>
  );
}
