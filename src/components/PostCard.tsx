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
  // SEUS AJUSTES MANTIDOS (Não alterei nenhum valor abaixo)
  // =========================
  const previewBackgroundColor = "#F4EEE5";
  const watermarkOpacity = 0.35;
  const watermarkScale = 1.0;
  const centerIconsColor = "#717996";
  const lockSize = 64;
  const lockOpacity = 1;
  const lockOffsetX = 0;
  const lockOffsetY = 0;
  const metricsIconSize = 18;
  const metricsOpacity = 1;
  const metricsGap = 16;
  const metricsMarginTop = 16;
  const metricsOffsetX = 0;
  const metricsOffsetY = 0;

  // INICIO AJUSTE - Ícone Coração (barra de ações abaixo do post)
  const heartColor = "#717996";    // Cor do ícone coração — mesmo valor dos ícones vizinhos
  const heartOpacity = 1;          // Opacidade: 0.0 a 1.0
  const heartOffsetX = 0;          // Deslocamento horizontal em px
  const heartOffsetY = 0;          // Deslocamento vertical em px
  // FIM AJUSTE

  return (
    <div className="bg-card overflow-hidden shadow-none border-0 rounded-none">
      {/* Header do Post */}
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
              {/* Mantido seu offset original aqui */}
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

      {/* BLOCO DO MEIO (CONTEÚDO BLOQUEADO) */}
      <div
        onClick={onLockedClick}
        onContextMenu={(e) => e.preventDefault()}
        className="aspect-[4/3] w-full cursor-pointer select-none relative overflow-hidden"
        style={{
          backgroundColor: previewBackgroundColor,
        }}
      >
        {/* Watermark com seus ajustes de escala e opacidade */}
        <img
          src="/assets/f6h3j8.svg"
          alt="watermark"
          className="absolute inset-0 w-full h-full object-cover pointer-events-none select-none brightness-0 invert"
          style={{
            opacity: watermarkOpacity,
            transform: `scale(${watermarkScale})`,
          }}
          draggable={false}
        />

        {/* Conteúdo central (Cadeado e Métricas) */}
        <div
          className="absolute inset-0 flex flex-col items-center justify-center"
          style={{ color: centerIconsColor }}
        >
          {/* Cadeado com seu offset */}
          <div
            style={{
              opacity: lockOpacity,
              transform: `translate(${lockOffsetX}px, ${lockOffsetY}px)`,
              lineHeight: 0,
            }}
          >
            <LockIcon size={lockSize} />
          </div>

          {/* Métricas centrais */}
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

      {/* Barra de Ações (Curtir, Comentar, etc) */}
      <div className="px-4 py-3 flex items-center gap-5">
        {/* INICIO AJUSTE - Ícone Coração com cor/opacidade/posição controladas */}
        <button
          type="button"
          onClick={onLockedClick}
          className="hover:opacity-80 transition-opacity"
          style={{
            color: heartColor,
            opacity: heartOpacity,
            transform: `translate(${heartOffsetX}px, ${heartOffsetY}px)`,
          }}
        >
          <HeartIcon size={20} />
        </button>
        {/* FIM AJUSTE */}

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
