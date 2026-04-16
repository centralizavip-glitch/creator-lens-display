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
<<<<<<< HEAD
      <div className="grid grid-cols-3 gap-[2px] p-[2px]">
=======
      {/* Front-end protection is limited and cannot fully prevent copying. */}
      <div className="grid grid-cols-3 gap-1 p-1">
>>>>>>> b327778aa42ecc0a78a7c18c131afc095cd97e10
        {tiles.map((_, i) => (
          <div
            key={i}
            onClick={onLockedClick}
            onContextMenu={(e) => e.preventDefault()}
<<<<<<< HEAD
            className="locked-overlay aspect-square cursor-pointer select-none relative overflow-hidden bg-[#f3eee7]"
            draggable={false}
          >
            {/* Watermark branco estilo Privacy */}
            <img
              src="https://cdn.privacy.com.br/assets/img/logo/privacy-logo-media-watermark.svg"
              alt="watermark"
              className="absolute inset-0 w-full h-full object-cover opacity-[0.05] pointer-events-none select-none brightness-0 invert"
              draggable={false}
            />

            {/* Cadeado central */}
            <div className="absolute inset-0 flex items-center justify-center">
              <LockIcon size={24} />
            </div>
=======
            className="locked-overlay aspect-[3/4] rounded-lg flex items-center justify-center cursor-pointer select-none relative overflow-hidden"
            draggable={false}
          >
            {/* Subtle decorative shapes */}
            <div className="absolute inset-0 opacity-[0.05]">
              <div className="absolute w-[60px] h-[60px] rounded-full bg-primary -top-4 -right-4" />
              <div className="absolute w-[50px] h-[50px] rounded-full bg-primary bottom-2 -left-4" />
            </div>
            <LockIcon size={22} />
>>>>>>> b327778aa42ecc0a78a7c18c131afc095cd97e10
          </div>
        ))}
      </div>
    </div>
  );
<<<<<<< HEAD
}
=======
}
>>>>>>> b327778aa42ecc0a78a7c18c131afc095cd97e10
