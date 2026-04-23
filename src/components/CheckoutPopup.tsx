import { useCallback } from "react";

// INICIO AJUSTE - Variáveis globais do popup de checkout
// Ajuste a posição vertical/horizontal do painel e a opacidade do overlay

// EXEMPLO // POPUP 1 DO BOTÃO 18,99
const POPUP_18_99_OFFSET_X = 0;    // px — deslocamento horizontal do painel (+ = direita)
const POPUP_18_99_OFFSET_Y = 0;    // px — deslocamento vertical do painel (+ = baixo)
const POPUP_18_99_OVERLAY_OPACITY = 0.55; // 0.0 a 1.0 — escurecimento do fundo

// EXEMPLO // POPUP 2 DO BOTÃO 31,99
const POPUP_31_99_OFFSET_X = 0;
const POPUP_31_99_OFFSET_Y = 0;
const POPUP_31_99_OVERLAY_OPACITY = 0.55;

// EXEMPLO // POPUP 3 DO BOTÃO 49,99
const POPUP_49_99_OFFSET_X = 0;
const POPUP_49_99_OFFSET_Y = 0;
const POPUP_49_99_OVERLAY_OPACITY = 0.55;

// FIM AJUSTE

interface CheckoutPopupProps {
  isOpen: boolean;
  onClose: () => void;
  planId: string;   // "p1" | "p2" | "p3"
  planLabel: string;
  planPrice: string;
  t?: (key: string) => string;
}

// INICIO AJUSTE - Mapeamento de planos para IDs do Netlify Function
// Cada plano aponta para o id correspondente em /.netlify/functions/get-checkout?id=XX
// Para adicionar novos planos, adicione aqui e no .env
const PLAN_CHECKOUT_MAP: Record<string, string> = {
  p1: "p1", // R$ 18,99 — LINK_CHEKOUT_18_99
  p2: "p2", // R$ 31,99 — LINK_CHEKOUT_31_99
  p3: "p3", // R$ 49,99 — LINK_CHEKOUT_49_99
};
// FIM AJUSTE

export default function CheckoutPopup({
  isOpen,
  onClose,
  planId,
  planLabel,
  planPrice,
  t = (k: string) => k,
}: CheckoutPopupProps) {
  // Anti-clone: nunca expõe a URL real — sempre via Netlify Function
  const handleCheckout = useCallback(
    async (method: "pix" | "apple" | "carteira" | "cartao") => {
      const id = PLAN_CHECKOUT_MAP[planId] ?? planId;
      try {
        const res = await fetch(`/.netlify/functions/get-checkout?id=${id}&method=${method}`);
        if (!res.ok) throw new Error("Failed");
        const data = await res.json() as { url?: string };
        if (data.url) { window.location.href = data.url; return; }
        throw new Error("No URL");
      } catch {
        alert("Checkout indisponível no momento.");
      }
    },
    [planId],
  );

  if (!isOpen) return null;

  let offsetX = 0;
  let offsetY = 0;
  let overlayOpacity = 0.55;

  if (planId === "p1") {
    offsetX = POPUP_18_99_OFFSET_X;
    offsetY = POPUP_18_99_OFFSET_Y;
    overlayOpacity = POPUP_18_99_OVERLAY_OPACITY;
  } else if (planId === "p2") {
    offsetX = POPUP_31_99_OFFSET_X;
    offsetY = POPUP_31_99_OFFSET_Y;
    overlayOpacity = POPUP_31_99_OVERLAY_OPACITY;
  } else if (planId === "p3") {
    offsetX = POPUP_49_99_OFFSET_X;
    offsetY = POPUP_49_99_OFFSET_Y;
    overlayOpacity = POPUP_49_99_OVERLAY_OPACITY;
  }

  return (
    // Overlay
    <div
      className="fixed inset-0 z-[99999] flex items-center justify-center p-4"
      style={{ backgroundColor: `rgba(0,0,0,${overlayOpacity})` }}
      onClick={onClose}
    >
      {/* Painel */}
      <div
        className="relative w-full max-w-[430px] bg-white rounded-[24px] overflow-hidden shadow-2xl"
        style={{
          transform: `translate(${offsetX}px, ${offsetY}px)`,
          maxHeight: "92dvh",
          overflowY: "auto",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* INICIO AJUSTE - Botão fechar (X) — posição: canto superior direito */}
        <button
          onClick={onClose}
          className="absolute top-1 right-2 z-10 text-white/80 hover:text-white transition-opacity text-xl font-light p-2"
          aria-label="Fechar"
        >
          ✕
        </button>
        {/* FIM AJUSTE */}

        {/* 
            INICIO AJUSTE - BANNER (MOLDURA E IMAGEM)
            - h-[95px]: Altura da caixa/moldura do banner.
            - object-top: Alinhamento da imagem dentro da caixa.
              Para ajustar o corte da imagem, troque "object-top" por:
              "object-center" (corta igual em cima e embaixo)
              "object-bottom" (foca na parte de baixo)
              Ou use posições exatas como: "object-[center_25%]" ou "object-[0px_-20px]"
        */}
        <div className="relative h-[95px] w-full overflow-hidden bg-[#f3eee7]">
          <img
            src="/assets/a9f3k1.png"
            alt="Banner"
            className="w-full h-full object-cover object-top"
          />
        </div>
        {/* FIM AJUSTE */}

        {/* Avatar + Nome */}
        <div className="px-4 pb-2">
          {/* 
              INICIO AJUSTE - AVATAR DA MODELO
              - -mt-5: Define o quanto o avatar sobe e sobrepõe o banner. 
                Use "-mt-8" para subir mais, ou "-mt-3" para descer mais. (Foi reduzido de -10 para -5 para descer o avatar)
              - w-[84px] h-[84px]: Controla o tamanho (largura e altura) da foto de perfil.
              - object-cover: Garante que a foto preencha o círculo sem distorcer.
          */}
          <div className="-mt-6 mb-4 flex items-end gap-3">
            <div className="relative w-[84px] h-[84px] rounded-full overflow-hidden bg-transparent flex-shrink-0 z-10">
              <img
                src="/assets/b7q2x9.png"
                alt="Nayara Assunção"
                className="w-full h-full object-cover"
              />
            </div>
            {/* FIM AJUSTE */}
            {/* 
                INICIO AJUSTE - NOME E @ DA MODELO
                [Tamanhos e Cores]
                - text-[14px]: Tamanho da fonte do nome
                - text-[12px]: Tamanho da fonte do @
                - text-slate-600: Cor do nome
                
                [Posicionamento exato]
                Altere os valores em pixels (px) abaixo na linha 'className':
                - mt-[4px]  -> Aumente para mover mais para BAIXO
                - mb-[0px]  -> Aumente para mover mais para CIMA
                - ml-[0px]  -> Aumente para mover mais para a DIREITA
                - mr-[0px]  -> Aumente para mover mais para a ESQUERDA
            */}
            <div className="mt-[1px] mb-[17px] ml-[0.1px] mr-[0px]">
              <h1 className="text-[14px] font-medium text-slate-600 leading-tight">Nayara Assunção</h1>
              <p className="text-[12px] text-slate-500/80 font-normal">@nayara_assunofc</p>
            </div>
            {/* FIM AJUSTE */}
          </div>

          {/* Benefícios */}
          <div className="mb-6">
            <p className="text-sm font-bold text-foreground mb-2">{t("popup_benefits")}</p>
            {[t("popup_benefit_1"), t("popup_benefit_2"), t("popup_benefit_3")].map((b) => (
              <div key={b} className="flex items-center gap-2 mb-1">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="text-[#f68d3d] flex-shrink-0">
                  <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span className="text-xs text-foreground/80">{b}</span>
              </div>
            ))}
          </div>

          {/* Divisor */}
          <div className="border-t border-border/50 mb-6" />

          {/* Valor */}
          <div className="mb-6">
            <p className="text-xs text-muted-foreground mb-0.5">{t("popup_payments")}</p>
            <p className="text-xs text-muted-foreground mb-1">{t("popup_value")}</p>
            <p className="text-xl font-bold text-foreground">{planPrice}</p>
            <p className="text-[10px] text-muted-foreground">{planLabel}</p>
          </div>

          {/* INICIO AJUSTE - Botão Pix (mesmo estilo gradient-orange-btn dos botões do site) */}
          <button
            onClick={() => handleCheckout("pix")}
            className="gradient-orange-btn w-full flex items-center justify-center gap-2 px-5 py-3.5 rounded-full text-foreground font-semibold text-sm hover:brightness-105 active:scale-[0.98] transition-all mb-4"
          >
            {/* Ícone Pix */}
            <svg width="18" height="18" viewBox="0 0 512 512" fill="currentColor" aria-hidden="true">
              <path d="M242.4 292.5C247.8 287.1 255.1 284.5 262.5 284.5C269.9 284.5 277.2 287.1 282.6 292.5L371.1 381C377.1 387 380.5 395 380.5 403.4C380.5 411.7 377.1 419.7 371.1 425.7L282.6 514.2C277.2 519.6 269.9 522.2 262.5 522.2C255.1 522.2 247.8 519.6 242.4 514.2L153.9 425.7C147.9 419.7 144.5 411.7 144.5 403.4C144.5 395 147.9 387 153.9 381L242.4 292.5zM242.4 219.5L153.9 131C147.9 125 144.5 117 144.5 108.6C144.5 100.3 147.9 92.28 153.9 86.28L242.4-2.228C247.8-7.629 255.1-10.22 262.5-10.22C269.9-10.22 277.2-7.629 282.6-2.228L371.1 86.28C377.1 92.28 380.5 100.3 380.5 108.6C380.5 117 377.1 125 371.1 131L282.6 219.5C277.2 224.9 269.9 227.5 262.5 227.5C255.1 227.5 247.8 224.9 242.4 219.5zM0 261.6C0 253.3 3.4 245.3 9.4 239.3L97.9 150.8C103.3 145.4 110.6 142.8 118 142.8C125.4 142.8 132.6 145.4 138.1 150.8L226.6 239.3C232.6 245.3 236 253.3 236 261.6C236 270 232.6 277.1 226.6 283.1L138.1 371.6C132.6 377 125.4 379.6 118 379.6C110.6 379.6 103.3 377 97.9 371.6L9.4 283.1C3.4 277.1 0 270 0 261.6zM299 261.6C299 253.3 302.4 245.3 308.4 239.3L396.9 150.8C402.4 145.4 409.6 142.8 417 142.8C424.4 142.8 431.7 145.4 437.1 150.8L525.6 239.3C531.6 245.3 535 253.3 535 261.6C535 270 531.6 277.1 525.6 283.1L437.1 371.6C431.7 377 424.4 379.6 417 379.6C409.6 379.6 402.4 377 396.9 371.6L308.4 283.1C302.4 277.1 299 270 299 261.6z" />
            </svg>
            {t("popup_pay_pix")}
          </button>
          {/* FIM AJUSTE */}

          {/* Divisor */}
          <div className="flex items-center gap-2 mb-4 mt-1">
            <div className="flex-1 border-t border-border/40" />
            <span className="text-[10px] text-muted-foreground">{t("popup_or")}</span>
            <div className="flex-1 border-t border-border/40" />
          </div>

          {/* INICIO AJUSTE - Botão Apple Pay */}
          <button
            onClick={() => handleCheckout("apple")}
            className="w-full flex items-center justify-center gap-2 py-3 rounded-full bg-black text-white font-semibold text-sm hover:bg-black/80 active:scale-[0.98] transition-all mb-4"
          >
            {/* SVG Apple — fill="currentColor" para adaptação automática */}
            <svg width="16" height="16" viewBox="0 0 814 1000" fill="currentColor" aria-hidden="true">
              <path d="M788.1 340.9c-5.8 4.5-108.2 62.2-108.2 190.5 0 148.4 130.3 200.9 134.2 202.2-.6 3.2-20.7 71.9-68.7 141.9-42.8 61.6-87.5 123.1-155.5 123.1s-85.5-39.5-164-39.5c-76 0-103.7 40.8-165.9 40.8s-105-28.2-157.2-93.8c-60.5-76.4-114.2-206.2-114.2-330.8 0-207.4 137.4-317.2 272.3-317.2 70.1 0 128.4 46.4 172.5 46.4 42.3 0 108.9-49 188.4-49 30.3 0 130.9 2.6 198.3 99.2zm-234-181.5c31.1-36.9 53.1-88.1 53.1-139.3 0-7.1-.6-14.3-1.9-20.1-50.6 1.9-110.8 33.7-147.1 75.8-28.5 32.4-55.1 83.6-55.1 135.5 0 7.8 1.3 15.6 1.9 18.1 3.2.6 8.4 1.3 13.6 1.3 45.4 0 102.5-30.4 135.5-71.3z" />
            </svg>
            {t("popup_pay_apple")}
          </button>
          {/* FIM AJUSTE */}

          {/* INICIO AJUSTE - Botão Carteira/Cartão */}
          <button
            onClick={() => handleCheckout("cartao")}
            className="w-full flex items-center justify-center gap-2 py-3 rounded-full bg-black text-white font-semibold text-sm hover:bg-black/80 active:scale-[0.98] transition-all mb-6"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
              <line x1="1" y1="10" x2="23" y2="10" />
            </svg>
            {t("popup_pay_card")}
          </button>
          {/* FIM AJUSTE */}
        </div>
      </div>
    </div>
  );
}
