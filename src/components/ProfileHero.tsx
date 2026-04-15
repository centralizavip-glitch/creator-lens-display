import { useState } from "react";
import VerifiedBadge from "./icons/VerifiedBadge";
import { ImageIcon, VideoIcon, LockSmallIcon, HeartIcon, InstagramIcon } from "./icons/MetricIcons";

interface ProfileHeroProps {
  t: (key: string) => string;
}

const bio = `Oi amores! Sejam bem-vindos ao meu cantinho exclusivo. Aqui voces vao encontrar conteudos especiais, fotos e videos que nao posto em nenhum outro lugar. Espero que gostem!`;

export default function ProfileHero({ t }: ProfileHeroProps) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="bg-card rounded-[28px] md:rounded-[28px] rounded-[24px] overflow-hidden border border-border">
      {/* Banner */}
      <div className="h-[170px] md:h-[170px] relative gradient-orange">
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
        {/* Avatar + Metrics row */}
        <div className="-mt-14 mb-3 flex items-end justify-between">
          <div className="w-[96px] h-[96px] md:w-[114px] md:h-[114px] rounded-full border-[4px] border-card overflow-hidden bg-muted">
            <img
              src="/assets/nayperfil.png"
              alt="Nayara Assunção"
              className="w-full h-full object-cover"
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = "none";
              }}
            />
          </div>
          {/* Top Metrics */}
          <div className="flex items-center gap-3 mb-2">
            <span className="flex items-center gap-1 text-xs text-muted-foreground">
              <ImageIcon size={14} /> 142
            </span>
            <span className="flex items-center gap-1 text-xs text-muted-foreground">
              <VideoIcon size={14} /> 239
            </span>
            <span className="flex items-center gap-1 text-xs text-muted-foreground">
              <LockSmallIcon size={13} /> 2
            </span>
            <span className="flex items-center gap-1 text-xs text-muted-foreground">
              <HeartIcon size={13} /> 1K
            </span>
          </div>
        </div>

        {/* Name */}
        <div className="flex items-center gap-1 mb-0.5">
          <h1 className="text-lg font-semibold text-foreground tracking-tight">Mariana</h1>
          <VerifiedBadge size={20} />
        </div>
        <p className="text-sm text-muted-foreground mb-3">@Babyydoll</p>

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
            <InstagramIcon size={16} />
          </a>
        </div>
      </div>
    </div>
  );
}
