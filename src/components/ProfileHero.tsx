import LockIcon from "./icons/LockIcon";
import { useState } from "react";
import { useCheckout } from "@/hooks/useCheckout";
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
  const { startCheckout } = useCheckout();

  return (
    <div className="bg-transparent overflow-hidden">
      {/* BANNER COM BORDAS SUPERIORES ATIVADAS */}
      <div 
        /* Altere o valor de rounded-t-[20px] para ajustar a curvatura do topo */
        className="relative gradient-orange overflow-hidden mx-0 mt-1 h-[89px] md:h-[191px] rounded-t-[20px]"
      >
        <div className="absolute inset-0 z-10" aria-hidden="true" />
        <img
          src="/assets/a9f3k1.png"
          alt="a9f3k1"
          /* A imagem precisa do mesmo arredondamento para não cobrir a curva */
          className="w-full h-full object-cover rounded-t-[20px]"
          onError={(e) => {
            (e.target as HTMLImageElement).style.display = "none";
          }}
        />
      </div>

      {/* Avatar + Info */}
      <div className="px-4 pb-5 relative">
        <div className="-mt-10 mb-1 flex items-end justify-between">
          <div className="relative w-[78px] h-[78px] md:w-[114px] md:h-[114px] rounded-full border-[4px] border-card overflow-hidden bg-muted">
            <div className="absolute inset-0 z-10" aria-hidden="true" />
            <img
              src="/assets/b7q2x9.png"
              alt="Nayara Assunção"
              className="w-full h-full object-cover"
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = "none";
              }}
            />
          </div>

          <div className="flex items-center gap-3 mb-2">
            <span className="flex items-center gap-1 text-xs text-muted-foreground opacity-100">
              <ImageIcon size={14} /> 124
            </span>
            <span className="flex items-center gap-1 text-xs text-muted-foreground opacity-100">
              <VideoIcon size={14} /> 347
            </span>
            <span className="flex items-center gap-1 text-xs text-muted-foreground opacity-100">
              <LockIcon size={14} /> 68
            </span>
            <span className="flex items-center gap-1 text-xs text-muted-foreground opacity-100">
              <HeartIcon size={13} /> 45K
            </span>
          </div>
        </div>

        <div className="flex items-center gap-1.5 mb-0.5">
          <h1 className="text-lg font-semibold text-foreground tracking-tight">
            Nayara Assunção
          </h1>
          <VerifiedBadge size={20} />
        </div>

        <p className="text-sm text-muted-foreground mb-3">@nayara_assunofc</p>

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

        <div className="mt-3 flex items-center gap-3">
          <button
            onClick={onLockedClick}
            type="button"
            className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-[#f3eee7] hover:opacity-80 transition"
          >
            <InstagramIcon size={16} />
          </button>

          <button
            onClick={onLockedClick}
            type="button"
            className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-[#f3eee7] hover:opacity-80 transition"
          >
            <XIcon size={16} />
          </button>

          <button
            onClick={onLockedClick}
            type="button"
            className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-[#f3eee7] hover:opacity-80 transition"
          >
            <TikTokIcon size={16} />
          </button>

          <button
            onClick={() => startCheckout("tg")}
            type="button"
            className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-[#f3eee7] hover:opacity-80 transition"
          >
            <TelegramIcon size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
