import { BadgeCheck, Heart, MessageCircle, Bookmark, MoreHorizontal, Lock, DollarSign } from "lucide-react";

interface PostCardProps {
  onLockedClick: () => void;
}

export default function PostCard({ onLockedClick }: PostCardProps) {
  return (
    <div className="bg-card rounded-3xl shadow-sm overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full overflow-hidden bg-muted">
            <img
              src="/assets/nayperfil.png"
              alt="Nayara"
              className="w-full h-full object-cover"
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = "none";
              }}
            />
          </div>
          <div>
            <div className="flex items-center gap-1">
              <span className="text-sm font-semibold text-foreground">Nayara</span>
              <BadgeCheck className="w-4 h-4 text-primary fill-primary stroke-primary-foreground" />
            </div>
            <span className="text-xs text-muted-foreground">@nayara</span>
          </div>
        </div>
        <button className="text-muted-foreground hover:text-foreground">
          <MoreHorizontal className="w-5 h-5" />
        </button>
      </div>

      {/* Locked content */}
      {/* Front-end protection is limited and cannot fully prevent copying. */}
      <div
        onClick={onLockedClick}
        onContextMenu={(e) => e.preventDefault()}
        className="locked-overlay aspect-[4/3] flex items-center justify-center cursor-pointer select-none"
        draggable={false}
      >
        <Lock className="w-10 h-10 text-muted-foreground/50" />
      </div>

      {/* Stats */}
      <div className="px-4 py-2 flex gap-4 text-xs text-muted-foreground">
        <span>39</span>
        <span>29</span>
        <span>11.4K</span>
      </div>

      {/* Actions */}
      <div className="px-4 pb-3 flex items-center gap-5">
        <button className="text-muted-foreground hover:text-foreground transition-colors">
          <Heart className="w-5 h-5" />
        </button>
        <button className="text-muted-foreground hover:text-foreground transition-colors">
          <MessageCircle className="w-5 h-5" />
        </button>
        <button className="text-muted-foreground hover:text-foreground transition-colors">
          <DollarSign className="w-5 h-5" />
        </button>
        <div className="flex-1" />
        <button className="text-muted-foreground hover:text-foreground transition-colors">
          <Bookmark className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
