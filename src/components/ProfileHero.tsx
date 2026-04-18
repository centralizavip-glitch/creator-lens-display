import LockIcon from "./icons/LockIcon";
import { useState } from "react";
import VerifiedBadge from "./icons/VerifiedBadge";

import {
  ImageIcon,
  VideoIcon,
  HeartIcon,
 InstagramIcon,
  TikTokIcon,
  XIcon,
  TelegramIcon,
} from "./icons/MetricIcons";

interface ProfileHeroProps {
  t: (key: string) => string;
  onLockedClick: () => void;
}

export default function ProfileHero({ t, onLockedClick }: ProfileHeroProps) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="bg-card rounded-[28px] md:rounded-[28px] overflow-hidden">
      {/* Banner */}
      <div className="h-[120px] md:h-[170px] relative gradient-orange">
        <img
          src="/assets/banner.png"
          alt="Banner"
          className="w-full h-full object-cover"
          onError={(e) => {
            (e.target as HTMLImageElement).style.display = "none";
          }}
        />
      </div>

      {/* Avatar + Info */}
      <div className="px-4 pb-5 relative">
        {/* Avatar + Metrics */}
        <div className="-mt-12 mb-3 flex items-end justify-between">
          <div className="w-[96px] h-[96px] md:w-[114px] md:h-[114px] rounded-full border-[4px] border-card overflow-hidden bg-muted">
            <img
              src="/assets/perfil.png"
              alt="Nayara Assunção"
              className="w-full h-full object-cover"
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = "none";
              }}
            />
          </div>

          {/* Metrics */}
          <div className="flex items-center gap-3 mb-2">
            <span className="flex items-center gap-1 text-xs text-muted-foreground opacity-100">
              <ImageIcon size={14} /> 142
            </span>
            <span className="flex items-center gap-1 text-xs text-muted-foreground opacity-100">
              <VideoIcon size={14} /> 339
            </span>
            <span className="flex items-center gap-1 text-xs text-muted-foreground opacity-100">
              <LockIcon size={14} /> 47
            </span>
            <span className="flex items-center gap-1 text-xs text-muted-foreground opacity-100">
              <HeartIcon size={13} /> 3,5K
            </span>
          </div>
        </div>

        {/* Nome */}
        <div className="flex items-center gap-1.5 mb-0.5">
          <h1 className="text-lg font-semibold text-foreground tracking-tight">
            Nayara Assunção
          </h1>
          <VerifiedBadge size={20} />
        </div>

        <p className="text-sm text-muted-foreground mb-3">@nayara_assunofc</p>

        {/* Bio */}
        <p
          className={`text-sm text-foreground leading-relaxed transition-all duration-300 ${
            expanded ? "" : "line-clamp-2"
          }`}
        >
          {t("bio")}
        </p>

        <button
          onClick={() => setExpanded(!expanded)}
          className="text-sm font-medium text-primary mt-1 hover:underline"
          type="button"
        >
          {expanded ? t("read_less") : t("read_more")}
        </button>

        {/* Redes sociais */}
        <div className="mt-3 flex items-center gap-3">
          {/* Instagram */}
          <button
            onClick={onLockedClick}
            type="button"
            className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-[#f3eee7] hover:opacity-80 transition"
          >
            <InstagramIcon size={16} />
          </button>

          {/* X */}
          <button
            onClick={onLockedClick}
            type="button"
            className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-[#f3eee7] hover:opacity-80 transition"
          >
            <XIcon size={16} />
          </button>

          {/* TikTok */}
          <button
            onClick={onLockedClick}
            type="button"
            className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-[#f3eee7] hover:opacity-80 transition"
          >
            <TikTokIcon size={16} />
          </button>

          {/* Telegram (único liberado) */}
          <a
            href="https://t.me/+bBgdeGSNSHxiZDE5"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-[#f3eee7] hover:opacity-80 transition"
          >
            <TelegramIcon size={16} />
          </a>
        </div>
      </div>
    </div>
  );
}