import { useState, useRef, useEffect } from "react";
import { GlobeIcon } from "./icons/MetricIcons";

interface HeaderProps {
  onLangChange: (lang: "pt" | "en" | "es") => void;
  currentLang: string;
}

const langs = [
  { code: "en" as const, label: "English" },
  { code: "pt" as const, label: "Portugues" },
  { code: "es" as const, label: "Espanol" },
];

export default function Header({ onLangChange, currentLang }: HeaderProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm flex items-center justify-between px-4 py-3 max-w-profile mx-auto">
      <div className="flex-1" />
      {/* Wordmark fallback if logo fails */}
      <div className="flex items-center">
        <img
          src="/assets/logo-black.svg"
          alt="Privacy"
          className="h-8 object-contain"
          onError={(e) => {
            const img = e.target as HTMLImageElement;
            img.style.display = "none";
            const fallback = img.nextElementSibling as HTMLElement;
            if (fallback) fallback.style.display = "flex";
          }}
        />
        <span
          className="items-center text-xl font-bold text-foreground tracking-tight hidden"
          style={{ fontFamily: "'Poppins', sans-serif" }}
        >
          privacy<span className="text-primary">.</span>
        </span>
      </div>
      <div className="flex-1 flex justify-end relative" ref={ref}>
        <button
          onClick={() => setOpen(!open)}
          className="flex items-center justify-center text-foreground hover:text-primary transition-colors"
          aria-label="Language"
        >
          <GlobeIcon size={22} />
        </button>
        {open && (
          <div className="absolute right-0 top-11 bg-card border border-border/60 rounded-xl shadow-sm py-1 z-50 min-w-[140px]">
            {langs.map((l) => (
              <button
                key={l.code}
                onClick={() => {
                  onLangChange(l.code);
                  setOpen(false);
                }}
                className={`block w-full text-left px-4 py-2 text-sm transition-colors hover:bg-muted ${
                  currentLang === l.code ? "text-primary font-semibold" : "text-foreground"
                }`}
              >
                {l.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </header>
  );
}
