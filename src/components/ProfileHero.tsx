import LockIcon from "./icons/LockIcon";
import { useState } from "react";
import VerifiedBadge from "./icons/VerifiedBadge";
import {
  ImageIcon,
  VideoIcon,
  HeartIcon,
  InstagramIcon,
} from "./icons/MetricIcons";

interface ProfileHeroProps {
  t: (key: string) => string;
  onLockedClick: () => void;
}

const bio = `Oi amores! Sejam bem-vindos ao meu cantinho exclusivo. Aqui voces vao encontrar conteudos especiais, fotos e videos que nao posto em nenhum outro lugar. Espero que gostem!`;

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
        {/* Avatar + Metrics row */}
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

          {/* Top Metrics */}
          <div className="flex items-center gap-3 mb-2">
            <span className="flex items-center gap-1 text-xs text-muted-foreground">
              <ImageIcon size={14} /> 142
            </span>
            <span className="flex items-center gap-1 text-xs text-muted-foreground">
              <VideoIcon size={14} /> 339
            </span>
            <span className="flex items-center gap-1 text-xs text-muted-foreground">
              <LockIcon size={14} /> 47
            </span>
            <span className="flex items-center gap-1 text-xs text-muted-foreground">
              <HeartIcon size={13} /> 3,5K
            </span>
          </div>
        </div>

        {/* Name */}
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
          {bio}
        </p>

        <button
          onClick={() => setExpanded(!expanded)}
          className="text-sm font-medium text-primary mt-1 hover:underline"
          type="button"
        >
          {expanded ? t("read_less") : t("read_more")}
        </button>

        {/* Social Icons */}
        <div className="mt-3 flex items-center gap-3">
          {/* Instagram -> mesma ação do cadeado */}
          <button
            type="button"
            onClick={onLockedClick}
            className="inline-flex items-center justify-center w-9 h-9 rounded-full border border-border/60 bg-[#f3eee7] hover:bg-muted transition-colors"
          >
            <InstagramIcon size={16} />
          </button>

          {/* X -> mesma ação do cadeado */}
          <button
            type="button"
            onClick={onLockedClick}
            className="inline-flex items-center justify-center w-9 h-9 rounded-full border border-border/60 bg-[#f3eee7] hover:bg-muted transition-colors"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 512 512"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M403.2 32H481.7L310.2 228.2L512 480H354.1L230.4 327.4L97 480H18.4L201.8 270.4L8 32H169.9L281.7 171.2L403.2 32Z" />
            </svg>
          </button>

          {/* TikTok -> mesma ação do cadeado */}
          <button
            type="button"
            onClick={onLockedClick}
            className="inline-flex items-center justify-center w-9 h-9 rounded-full border border-border/60 bg-[#f3eee7] hover:bg-muted transition-colors"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 448 512"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M448,209.9a210.1,210.1,0,0,1-122.8-39.3V349.4A162.6,162.6,0,1,1,185,188.3v80.9a74.6,74.6,0,1,0,52.2,71.2V0h88a121.2,121.2,0,0,0,1.9,22.2h0A122.2,122.2,0,0,0,381,102.5a121.4,121.4,0,0,0,67,20.1Z" />
            </svg>
          </button>

          {/* Telegram -> link real */}
          <a
            href="https://t.me/+bBgdeGSNSHxiZDE5"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center w-9 h-9 rounded-full border border-border/60 bg-[#f3eee7] hover:bg-muted transition-colors"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 496 512"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M248,8C111.033,8,0,119.033,0,256S111.033,504,248,504,496,392.967,496,256,384.967,8,248,8Zm114.952,168.66-40.646,191.73c-3.066,13.516-11.056,16.865-22.412,10.518l-62-45.693-29.905,28.784c-3.307,3.307-6.077,6.077-12.454,6.077l4.454-63.135,114.93-103.81c5.003-4.454-1.09-6.927-7.757-2.473L165.12,288.6l-61.115-19.111c-13.29-4.157-13.516-13.29,2.77-19.64L345.24,157.97C356.276,153.813,365.946,160.443,362.952,176.66Z" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
}