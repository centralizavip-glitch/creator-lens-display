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
    <div className="bg-card rounded-[24px] border border-border overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full overflow-hidden bg-muted">
            <img
              src="/assets/nayperfil.png"
              alt="Nayara assunção"
              className="w-full h-full object-cover"
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = "none";
              }}
            />
          </div>
          <div>
            <div className="flex items-center gap-1">
              <span className="text-sm font-semibold text-foreground">Nayara assunção</span>
              <VerifiedBadge size={16} />
            </div>
            <span className="text-xs text-muted-foreground">@nayara_assunofc</span>
          </div>
        </div>
        <button className="text-muted-foreground hover:text-foreground">
          <MoreVerticalIcon size={20} />
        </button>
      </div>

      {/* Locked content */}
      {/* Front-end protection is limited and cannot fully prevent copying. */}
      <div
        onClick={onLockedClick}
        onContextMenu={(e) => e.preventDefault()}
        className="locked-overlay aspect-[4/3] flex items-center justify-center cursor-pointer select-none relative overflow-hidden"
        draggable={false}
      >
        {/* Subtle decorative shapes */}
        <div className="absolute inset-0 opacity-[0.06]">
          <div className="absolute w-[200px] h-[200px] rounded-full bg-primary -top-10 -left-10" />
          <div className="absolute w-[160px] h-[160px] rounded-full bg-primary bottom-0 right-10" />
        </div>
        <LockIcon size={40} />
      </div>

      {/* Metrics */}
      <div className="px-4 py-2 flex items-center gap-4 text-xs text-muted-foreground">
        <span className="flex items-center gap-1">
          <ImageIcon size={13} /> 142
        </span>
        <span className="flex items-center gap-1">
          <VideoIcon size={13} /> 339
        </span>
        <span className="flex items-center gap-1">
          <HeartIcon size={13} /> 1K
        </span>
      </div>

      {/* Actions */}
      <div className="px-4 pb-3 flex items-center gap-5">
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
