<<<<<<< HEAD
import LockIcon from "./icons/LockIcon";
import { useState } from "react";
import VerifiedBadge from "./icons/VerifiedBadge";
import {
  ImageIcon,
  VideoIcon,
  LockSmallIcon,
  HeartIcon,
  InstagramIcon,
} from "./icons/MetricIcons";
=======
import { useState } from "react";
import VerifiedBadge from "./icons/VerifiedBadge";
import { ImageIcon, VideoIcon, LockSmallIcon, HeartIcon, InstagramIcon } from "./icons/MetricIcons";
>>>>>>> b327778aa42ecc0a78a7c18c131afc095cd97e10

interface ProfileHeroProps {
  t: (key: string) => string;
}

const bio = `Oi amores! Sejam bem-vindos ao meu cantinho exclusivo. Aqui voces vao encontrar conteudos especiais, fotos e videos que nao posto em nenhum outro lugar. Espero que gostem!`;

export default function ProfileHero({ t }: ProfileHeroProps) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="bg-card rounded-[28px] md:rounded-[28px] overflow-hidden">
      {/* Banner */}
<<<<<<< HEAD
      <div className="h-[120px] md:h-[170px] relative gradient-orange">
        <img
          src="/assets/banner.png"
=======
      <div className="h-[170px] md:h-[170px] relative gradient-orange">
        <img
          src="/assets/banner.jpg"
>>>>>>> b327778aa42ecc0a78a7c18c131afc095cd97e10
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
<<<<<<< HEAD
              src="/assets/perfil.png"
=======
              src="/assets/nayperfil.png"
>>>>>>> b327778aa42ecc0a78a7c18c131afc095cd97e10
              alt="Nayara assuncao"
              className="w-full h-full object-cover"
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = "none";
              }}
            />
          </div>
<<<<<<< HEAD

=======
>>>>>>> b327778aa42ecc0a78a7c18c131afc095cd97e10
          {/* Top Metrics */}
          <div className="flex items-center gap-3 mb-2">
            <span className="flex items-center gap-1 text-xs text-muted-foreground">
              <ImageIcon size={14} /> 142
            </span>
            <span className="flex items-center gap-1 text-xs text-muted-foreground">
              <VideoIcon size={14} /> 339
            </span>
            <span className="flex items-center gap-1 text-xs text-muted-foreground">
<<<<<<< HEAD
              <LockIcon size={14} /> 47
            </span>
            <span className="flex items-center gap-1 text-xs text-muted-foreground">
              <HeartIcon size={13} /> 3,5K
=======
              <LockSmallIcon size={13} /> 47
            </span>
            <span className="flex items-center gap-1 text-xs text-muted-foreground">
              <HeartIcon size={13} /> 1K
>>>>>>> b327778aa42ecc0a78a7c18c131afc095cd97e10
            </span>
          </div>
        </div>

        {/* Name */}
        <div className="flex items-center gap-1.5 mb-0.5">
<<<<<<< HEAD
          <h1 className="text-lg font-semibold text-foreground tracking-tight">
            Nayara assuncao
          </h1>
=======
          <h1 className="text-lg font-semibold text-foreground tracking-tight">Nayara assuncao</h1>
>>>>>>> b327778aa42ecc0a78a7c18c131afc095cd97e10
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
        >
          {expanded ? t("read_less") : t("read_more")}
        </button>

        {/* Instagram */}
        <div className="mt-3">
          <a
            href="https://instagram.com/nayara"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center w-9 h-9 rounded-full border border-border/60 hover:bg-muted transition-colors"
          >
            <InstagramIcon size={16} />
          </a>
        </div>
      </div>
    </div>
  );
<<<<<<< HEAD
}
=======
}
>>>>>>> b327778aa42ecc0a78a7c18c131afc095cd97e10
