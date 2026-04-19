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
  // =========================
  // AJUSTES VISUAIS
  // =========================

  // Fundo do bloco do meio
  const previewBackgroundColor = "#F4EEE5";

  // Watermark
  const watermarkOpacity = 0.35;
  const watermarkScale = 1.0;

  // Cor padrão dos ícones centrais
  const centerIconsColor = "#717996";

  // Cadeado central
  const lockSize = 64;
  const lockOpacity = 1;
  const lockOffsetX = 0;
  const lockOffsetY = 0;

  // Métricas centrais (foto / vídeo / coração)
  const metricsIconSize = 18;
  const metricsOpacity = 1;
  const metricsGap = 16;
  const metricsMarginTop = 16;
  const metricsOffsetX = 0;
  const metricsOffsetY = 0;

  return (
    <div className="bg-card overflow-hidden shadow-none border-0 rounded-none">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full overflow-hidden bg-muted">
            <img
              src="/assets/b7q2x9.png"
              alt="Nayara Assunção"
              className="w-full h-full object-cover"
            />
          </div>

          <div>
            <div className="flex items-center gap-1">
              <span className="text-sm font-semibold text-foreground">
                Nayara Assunção
              </span>
              <VerifiedBadge size={16} offsetX={-10} offsetY={+0} />
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
          backgroundColor: previewBackgroundColor,
        }}
      >
        {/* Watermark local visível */}
        <img
          src="/assets/privacy-watermark.svg"
          alt="watermark"
          className="absolute inset-0 w-full h-full object-cover pointer-events-none select-none brightness-0 invert"
          style={{
            opacity: watermarkOpacity,
            transform: `scale(${watermarkScale})`,
          }}
          draggable={false}
        />

        {/* Conteúdo central */}
        <div
          className="absolute inset-0 flex flex-col items-center justify-center"
          style={{ color: centerIconsColor }}
        >
          {/* Cadeado */}
          <div
            style={{
              opacity: lockOpacity,
              transform: `translate(${lockOffsetX}px, ${lockOffsetY}px)`,
              lineHeight: 0,
            }}
          >
            <LockIcon size={lockSize} />
          </div>

          {/* Métricas */}
          <div
            className="flex items-center text-xs"
            style={{
              marginTop: metricsMarginTop,
              gap: `${metricsGap}px`,
              opacity: metricsOpacity,
              transform: `translate(${metricsOffsetX}px, ${metricsOffsetY}px)`,
            }}
          >
            <span className="flex items-center gap-1">
              <ImageIcon size={metricsIconSize} /> 124
            </span>
            <span className="flex items-center gap-1">
              <VideoIcon size={metricsIconSize} /> 347
            </span>
            <span className="flex items-center gap-1">
              <HeartIcon size={metricsIconSize} /> 45K
            </span>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="px-4 py-3 flex items-center gap-5">
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