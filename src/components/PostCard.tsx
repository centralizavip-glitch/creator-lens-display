import VerifiedBadge from "./icons/VerifiedBadge";
import LockIcon from "./icons/LockIcon";
import {
  ImageIcon,
  VideoIcon,
  HeartIcon,
  CommentIcon,
  CoinIcon,
  BookmarkIcon,
  MoreVerticalIcon,
} from "./icons/MetricIcons";

interface PostCardProps {
  onLockedClick: () => void;
}

export default function PostCard({ onLockedClick }: PostCardProps) {
  return (
    <div className="bg-card rounded-[24px] overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full overflow-hidden bg-muted">
            <img
              src="/assets/perfil.png"
              alt="Nayara assuncao"
              className="w-full h-full object-cover"
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = "none";
              }}
            />
          </div>

          <div>
            <div className="flex items-center gap-1">
              <span className="text-sm font-semibold text-foreground">
                Nayara assuncao
              </span>
              <VerifiedBadge size={16} />
            </div>
            <span className="text-xs text-muted-foreground">
              @nayara_assunofc
            </span>
          </div>
        </div>

        <button className="text-muted-foreground hover:text-foreground">
          <MoreVerticalIcon size={20} />
        </button>
      </div>

      {/* Locked content */}
      <div
        onClick={onLockedClick}
        onContextMenu={(e) => e.preventDefault()}
        className="w-full aspect-[4/3] cursor-pointer select-none relative overflow-hidden bg-[#F4EEE5]"
        draggable={false}
      >
        {/* Watermark branco visível estilo Privacy */}
        <div
          className="absolute inset-0 pointer-events-none select-none"
          style={{
            backgroundImage:
              "url('https://cdn.privacy.com.br/assets/img/logo/privacy-logo-media-watermark.svg')",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            backgroundSize: "cover",
            opacity: 0.18,
            filter: "brightness(0) invert(1)",
            transform: "scale(1.08)",
          }}
        />

        {/* Centered lock + metrics */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <LockIcon size={68} />

          <div className="mt-4 flex items-center justify-center gap-4 text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <ImageIcon size={19} /> 827
            </span>
            <span className="flex items-center gap-1">
              <VideoIcon size={19} /> 601
            </span>
            <span className="flex items-center gap-1">
              <HeartIcon size={19} /> 212.2K
            </span>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="px-4 py-3 flex items-center gap-5">
        <button className="text-muted-foreground hover:text-foreground transition-colors">
          <HeartIcon size={20} />
        </button>
        <button className="text-muted-foreground hover:text-foreground transition-colors">
          <CommentIcon size={20} />
        </button>
        <button className="text-muted-foreground hover:text-foreground transition-colors">
          <CoinIcon size={20} />
        </button>
        <div className="flex-1" />
        <button className="text-muted-foreground hover:text-foreground transition-colors">
          <BookmarkIcon size={20} />
        </button>
      </div>
    </div>
  );
}