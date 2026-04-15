import { useState } from "react";
import LockIcon from "./icons/LockIcon";

interface MediaGridProps {
  t: (key: string) => string;
  onLockedClick: () => void;
}

const filters = ["all", "photos", "videos", "paid"] as const;

export default function MediaGrid({ t, onLockedClick }: MediaGridProps) {
  const [active, setActive] = useState<string>("all");

  const tiles = Array.from({ length: 12 });

  return (
    <div>
      {/* Filters */}
      <div className="flex gap-2 px-4 py-3 overflow-x-auto">
        {filters.map((f) => (
          <button
            key={f}
            onClick={() => setActive(f)}
            className={`px-4 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors ${
              active === f
                ? "bg-accent text-accent-foreground"
                : "bg-muted text-muted-foreground hover:bg-accent/50"
            }`}
          >
            {t(f)}
          </button>
        ))}
      </div>

      {/* Grid */}
      {/* Front-end protection is limited and cannot fully prevent copying. */}
      <div className="grid grid-cols-3 gap-1 p-1">
        {tiles.map((_, i) => (
          <div
            key={i}
            onClick={onLockedClick}
            onContextMenu={(e) => e.preventDefault()}
            className="locked-overlay aspect-[3/4] rounded-lg flex items-center justify-center cursor-pointer select-none relative overflow-hidden"
            draggable={false}
          >
            {/* Subtle decorative shapes */}
            <div className="absolute inset-0 opacity-[0.05]">
              <div className="absolute w-[60px] h-[60px] rounded-full bg-primary -top-4 -right-4" />
              <div className="absolute w-[50px] h-[50px] rounded-full bg-primary bottom-2 -left-4" />
            </div>
            <LockIcon size={22} />
          </div>
        ))}
      </div>
    </div>
  );
}
