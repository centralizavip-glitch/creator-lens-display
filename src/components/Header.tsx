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
    /* 
       AJUSTES: 
       - bg-white: Cor do fundo (pode trocar aqui).
       - border-black/68: Linha preta com 68% de opacidade.
    */
    <header className="fixed top-0 left-0 w-full z-[9999] bg-[#F9F6F2] border-b-[0.5px] border-black/68 flex items-center justify-between px-4 py-3 h-14">
      
      <div 
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center"
        style={{
          marginTop: "0px",    
          marginLeft: "-19px", // MANTIDO CONFORME SEU AJUSTE MANUAL
        }}
      >
        <img
          src="/assets/d2p9s4.svg"
          alt="Logo"
          className="h-5 object-contain"
          onError={(e) => {
            (e.target as HTMLImageElement).style.display = "none";
          }}
        />
        <span
          className="items-center text-xl font-bold text-foreground tracking-tight hidden"
          style={{ fontFamily: "'Poppins', sans-serif" }}
        >
          privacy<span className="text-primary">.</span>
        </span>
      </div>

      <div className="flex-1"></div>

      <div className="flex justify-end relative z-[10001]" ref={ref}>
        <button
          onClick={() => setOpen(!open)}
          className="flex items-center justify-center text-foreground hover:text-primary transition-colors"
          aria-label="Language"
        >
          <GlobeIcon size={22} />
        </button>
        {open && (
          <div className="absolute right-0 top-11 bg-card border border-border/69 rounded-xl shadow-sm py-1 min-w-[140px]">
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
