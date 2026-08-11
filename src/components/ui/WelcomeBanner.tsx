import { Clock } from "lucide-react";
import { siteInfo } from "../../data/site";

export default function WelcomeBanner() {
  return (
    <div className="bg-gradient-to-r from-secondary-deep via-secondary to-secondary-deep">
      <div className="container-page flex flex-col items-center justify-center gap-2 py-3 text-center sm:flex-row sm:gap-4">
        <p className="font-display text-[1.05rem] tracking-wide text-white sm:text-lg">
          {siteInfo.welcomeMessage}
        </p>
        <span className="hidden h-4 w-px bg-white/25 sm:block" />
        <p className="flex items-center gap-1.5 text-sm font-medium text-gold">
          <Clock size={15} />
          Darshan Timings: {siteInfo.darshanTimings}
        </p>
      </div>
    </div>
  );
}
