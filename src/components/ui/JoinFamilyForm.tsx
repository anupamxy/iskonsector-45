import { useState } from "react";
import Button from "./Button";

const inputClasses =
  "w-full rounded-[10px] border-[1.5px] border-white/20 bg-white/10 px-3.5 py-3 text-sm text-white placeholder:text-white/40 focus:border-primary-light focus:outline-none";

export default function JoinFamilyForm() {
  const [submitted, setSubmitted] = useState(false);

  if (submitted) {
    return (
      <div className="rounded-[14px] border border-white/15 bg-white/5 p-6 text-center text-white">
        <p className="font-display text-lg">Hare Krishna! 🙏</p>
        <p className="mt-1 text-sm text-white/70">
          Thank you for joining the ISKCON family — we'll be in touch soon.
        </p>
      </div>
    );
  }

  return (
    <form
      className="flex flex-col gap-3"
      onSubmit={(e) => {
        e.preventDefault();
        setSubmitted(true);
      }}
    >
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <input required name="name" placeholder="Full Name" className={inputClasses} />
        <input required type="email" name="email" placeholder="Email" className={inputClasses} />
      </div>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <input required type="tel" name="phone" placeholder="Phone No." className={inputClasses} />
        <input
          required
          name="guardian"
          placeholder="Father / Husband Name"
          className={inputClasses}
        />
      </div>
      <label className="text-xs text-white/50">
        Date of Birth
        <input required type="date" name="dob" className={`${inputClasses} mt-1`} />
      </label>
      <Button type="submit" className="mt-1 w-full">
        Join ISKCON Family
      </Button>
    </form>
  );
}
