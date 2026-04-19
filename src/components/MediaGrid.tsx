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

  // AJUSTES DO CADEADO DAS MÍDIAS
  const lockOpacity = 0.9;
  const lockColor = "#717996";
  const lockSize = 24;
  const lockOffsetX = 0;
  const lockOffsetY = 0;

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
      <div className="grid grid-cols-3 gap-[2px] p-[2px]">
        {tiles.map((_, i) => (
          <div
            key={i}
            onClick={onLockedClick}
            onContextMenu={(e) => e.preventDefault()}
            className="locked-overlay aspect-square cursor-pointer select-none relative overflow-hidden bg-[#e9dfd2]"
            draggable={false}
          >
            <img
              src="/assets/f6h3j8.svg"
              alt="f6h3j8"
              className="absolute inset-0 w-full h-full object-contain opacity-[0.35] pointer-events-none select-none"
              style={{
                filter: "brightness(0) invert(1)",
                transform: "scale(1.13)",
              }}
              draggable={false}
            />

            {/* Cadeado central */}
            <div
              className="absolute inset-0 flex items-center justify-center"
              style={{
                color: lockColor,
              }}
            >
              <div
                style={{
                  opacity: lockOpacity,
                  transform: `translate(${lockOffsetX}px, ${lockOffsetY}px)`,
                  lineHeight: 0,
                }}
              >
                <LockIcon size={lockSize} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}