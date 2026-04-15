import { useState } from "react";
import { BadgeCheck, Instagram } from "lucide-react";

interface ProfileHeroProps {
  t: (key: string) => string;
}

const bio = `Oi amores! Sejam bem-vindos ao meu cantinho exclusivo 💕 Aqui vocês vão encontrar conteúdos especiais, fotos e vídeos que não posto em nenhum outro lugar. Espero que gostem! 🔥✨`;

export default function ProfileHero({ t }: ProfileHeroProps) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="bg-card rounded-3xl overflow-hidden shadow-sm">
      {/* Banner */}
      <div className="h-[200px] relative gradient-orange">
        <img
          src="/assets/banner.jpg"
          alt="Banner"
          className="w-full h-full object-cover"
          onError={(e) => {
            (e.target as HTMLImageElement).style.display = "none";
          }}
        />
      </div>

      {/* Avatar + Info */}
      <div className="px-5 pb-5 relative">
        {/* Avatar */}
        <div className="-mt-14 mb-3 flex items-end justify-between">
          <div className="w-[100px] h-[100px] rounded-full border-4 border-card overflow-hidden bg-muted">
            <img
              src="/assets/nayperfil.png"
              alt="Nayara"
              className="w-full h-full object-cover"
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = "none";
              }}
            />
          </div>
          {/* Stats */}
          <div className="flex gap-4 text-xs text-muted-foreground mb-2">
            <span className="flex items-center gap-1">📷 39</span>
            <span className="flex items-center gap-1">🎬 29</span>
            <span className="flex items-center gap-1">❤️ 11.4K</span>
          </div>
        </div>

        {/* Name */}
        <div className="flex items-center gap-1.5 mb-0.5">
          <h1 className="text-lg font-semibold text-foreground">Nayara</h1>
          <BadgeCheck className="w-5 h-5 text-primary fill-primary stroke-primary-foreground" />
        </div>
        <p className="text-sm text-muted-foreground mb-3">@nayara</p>

        {/* Bio */}
        <p
          className={`text-sm text-foreground leading-relaxed transition-all duration-300 ${
            expanded ? "" : "line-clamp-2"
          }`}
        >
          {bio}
        </p>
        <button
          onClick={() => setExpanded(!expanded)}
          className="text-sm font-medium text-primary mt-1 hover:underline"
        >
          {expanded ? t("read_less") : t("read_more")}
        </button>

        {/* Instagram */}
        <div className="mt-3">
          <a
            href="https://instagram.com/nayara"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center w-9 h-9 rounded-full border border-border hover:bg-muted transition-colors"
          >
            <Instagram className="w-4 h-4 text-muted-foreground" />
          </a>
        </div>
      </div>
    </div>
  );
}
