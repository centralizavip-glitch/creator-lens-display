import { useState, useRef, useEffect } from "react";
import { Globe } from "lucide-react";

interface HeaderProps {
  onLangChange: (lang: "pt" | "en" | "es") => void;
  currentLang: string;
}

const langs = [
  { code: "en" as const, label: "English" },
  { code: "pt" as const, label: "Português" },
  { code: "es" as const, label: "Español" },
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
    <header className="flex items-center justify-between px-4 py-3 max-w-profile mx-auto">
      <div className="flex-1" />
      <img
        src="/assets/logoprivacy.png"
        alt="Logo"
        className="h-8 object-contain"
        onError={(e) => {
          (e.target as HTMLImageElement).style.display = "none";
        }}
      />
      <div className="flex-1 flex justify-end relative" ref={ref}>
        <button
          onClick={() => setOpen(!open)}
          className="w-9 h-9 rounded-full border border-border flex items-center justify-center bg-card hover:bg-muted transition-colors"
          aria-label="Language"
        >
          <Globe className="w-4 h-4 text-muted-foreground" />
        </button>
        {open && (
          <div className="absolute right-0 top-11 bg-card border border-border rounded-xl shadow-lg py-1 z-50 min-w-[140px]">
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
