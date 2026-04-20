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
    /* 
       ESTRUTURA MANTIDA:
       - rounded-t-[30px] para alinhar com o container do Index.tsx
       - bg-card para o fundo do perfil
    */
    <div className="bg-card overflow-hidden rounded-t-[30px]">
      
      {/* 
          BANNER: 
          - h-[100px]: Sua altura ajustada.
          - rounded-t-[30px]: Curvatura sincronizada.
      */}
      <div 
        className="relative gradient-orange overflow-hidden h-[100px] md:h-[200px] rounded-t-[30px]"
      >
        <div className="absolute inset-0 z-10" aria-hidden="true" />
        <img
          src="/assets/a9f3k1.png"
          alt="Banner"
          className="w-full h-full object-cover rounded-t-[30px]"
          onError={(e) => {
            (e.target as HTMLImageElement).style.display = "none";
          }}
        />
      </div>

      {/* Avatar + Info */}
      <div className="px-4 pb-5 relative">
        <div className="-mt-12 mb-1 flex items-end justify-between">
          {/* Avatar com borda branca */}
          <div className="relative w-[84px] h-[84px] md:w-[120px] md:h-[120px] rounded-full border-[4px] border-white overflow-hidden bg-muted shadow-sm">
            <div className="absolute inset-0 z-10" aria-hidden="true" />
            <img
              src="/assets/b7q2x9.png"
              alt="Avatar"
              className="w-full h-full object-cover"
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = "none";
              }}
            />
          </div>

          {/* Métricas do Perfil */}
          <div className="flex items-center gap-3 mb-3">
            <span className="flex items-center gap-1 text-xs text-muted-foreground font-medium">
              <ImageIcon size={14} /> 124
            </span>
            <span className="flex items-center gap-1 text-xs text-muted-foreground font-medium">
              <VideoIcon size={14} /> 347
            </span>
            <span className="flex items-center gap-1 text-xs text-muted-foreground font-medium">
              <LockIcon size={14} /> 68
            </span>
            <span className="flex items-center gap-1 text-xs text-muted-foreground font-medium">
              <HeartIcon size={13} /> 45K
            </span>
          </div>
        </div>

        {/* Nome e Selo de Verificado */}
        <div className="flex items-center gap-1.5 mb-0.5">
          <h1 className="text-lg font-bold text-foreground tracking-tight">
            Nayara Assunção
          </h1>
          <VerifiedBadge size={18} />
        </div>

        <p className="text-sm text-muted-foreground mb-3 font-medium">@nayara_assunofc</p>

        {/* Bio com função de ler mais/menos */}
        <div className="relative">
          <p
            className={`text-sm text-foreground leading-relaxed transition-all duration-300 ${
              expanded ? "" : "line-clamp-2"
            }`}
          >
            {t("bio")}
          </p>

          <button
            onClick={() => setExpanded(!expanded)}
            className="text-sm font-semibold text-primary mt-1 hover:opacity-80 transition-opacity"
            type="button"
          >
            {expanded ? t("read_less") : t("read_more")}
          </button>
        </div>

        {/* Botões de Redes Sociais */}
        <div className="mt-4 flex items-center gap-3">
          {[
            { icon: <InstagramIcon size={18} />, action: onLockedClick },
            { icon: <XIcon size={18} />, action: onLockedClick },
            { icon: <TikTokIcon size={18} />, action: onLockedClick },
            { icon: <TelegramIcon size={18} />, action: () => startCheckout("tg") },
          ].map((item, index) => (
            <button
              key={index}
              onClick={item.action}
              type="button"
              className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-secondary/50 hover:bg-secondary transition-colors"
            >
              {item.icon}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
