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
    <div className="bg-card overflow-hidden shadow-none border-0 rounded-none">
      {/* Header */}
      <div className="flex items-center justify-between px-0 py-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full overflow-hidden bg-muted">
            <img
              src="/assets/perfil.png"
              alt="Nayara Assunção"
              className="w-full h-full object-cover"
            />
          </div>

          <div>
            <div className="flex items-center gap-1">
              <span className="text-sm font-semibold text-foreground">
                Nayara Assunção
              </span>
              <VerifiedBadge size={16} />
            </div>
            <span className="text-xs text-muted-foreground">
              @nayara_assunofc
            </span>
          </div>
        </div>

        <button
          type="button"
          className="text-muted-foreground hover:text-foreground"
        >
          <MoreVerticalIcon size={20} />
        </button>
      </div>

      {/* BLOCO DO MEIO */}
      <div
        onClick={onLockedClick}
        onContextMenu={(e) => e.preventDefault()}
        className="aspect-[4/3] w-full cursor-pointer select-none relative overflow-hidden"
        style={{
          backgroundColor: "#F4EEE5",
        }}
      >
        {/* Watermark local visível */}
        <img
          src="/assets/privacy-watermark.svg"
          alt="watermark"
          className="absolute inset-0 w-full h-full object-cover opacity-[0.35] pointer-events-none select-none brightness-0 invert scale-[1.00]"
          draggable={false}
        />

        {/* Conteúdo central */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <LockIcon size={64} />

          <div className="mt-4 flex items-center gap-4 text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <ImageIcon size={18} /> 827
            </span>
            <span className="flex items-center gap-1">
              <VideoIcon size={18} /> 601
            </span>
            <span className="flex items-center gap-1">
              <HeartIcon size={18} /> 212.2K
            </span>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="px-0 py-3 flex items-center gap-5">
        <button
          type="button"
          onClick={onLockedClick}
          className="text-muted-foreground hover:text-foreground"
        >
          <HeartIcon size={20} />
        </button>

        <button
          type="button"
          onClick={onLockedClick}
          className="text-muted-foreground hover:text-foreground"
        >
          <CommentIcon size={20} />
        </button>

        <button
          type="button"
          onClick={onLockedClick}
          className="text-muted-foreground hover:text-foreground"
        >
          <CoinIcon size={20} />
        </button>

        <div className="flex-1" />

        <button
          type="button"
          onClick={onLockedClick}
          className="text-muted-foreground hover:text-foreground"
        >
          <BookmarkIcon size={20} />
        </button>
      </div>
    </div>
  );
}