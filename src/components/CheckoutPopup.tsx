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

// AJUSTES DA ETIQUETA "CARTEIRA"
const CARTEIRA_BADGE_OFFSET_X = 22; // px
const CARTEIRA_BADGE_OFFSET_Y = -9; // px
const CARTEIRA_BADGE_BORDER_WIDTH = "1px";

// AJUSTES DO ÍCONE DE CARTEIRA (BOTÃO USAR SALDO)
const CARTEIRA_ICON_OFFSET_X = -3; // px (deslocamento horizontal)

// AJUSTES DO TEXTO "Pay" (BOTÃO GOOGLE PAY)
const GOOGLE_PAY_TEXT_OFFSET_X = -4; // px (deslocamento horizontal)

// AJUSTES DO ÍCONE APPLE PAY
const APPLE_PAY_ICON_OFFSET_X = 5; // px
const APPLE_PAY_ICON_OFFSET_Y = -2; // px

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
    async (method: "pix" | "apple" | "carteira" | "cartao" | "google") => {
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
      className="fixed inset-0 z-[99999] overflow-y-auto flex justify-center p-4 py-10 items-start sm:items-center"
      style={{ backgroundColor: `rgba(0,0,0,${overlayOpacity})` }}
      onClick={onClose}
    >
      {/* Painel */}
      <div
        className="relative w-full max-w-[370px] bg-white rounded-[24px] shadow-2xl my-auto"
        style={{
          transform: `translate(${offsetX}px, ${offsetY}px)`,
        }}
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
        <div className="relative h-[81px] w-full overflow-hidden bg-[#f3eee7]">
          <img
            src="/assets/a9f3k1.png"
            alt="Banner"
            className="w-full h-full object-cover object-center"
          />
        </div>
        {/* FIM AJUSTE */}

        {/* Avatar + Nome */}
        <div className="px-3 pb-9">
          {/* 
              INICIO AJUSTE - AVATAR DA MODELO
              - -mt-5: Define o quanto o avatar sobe e sobrepõe o banner. 
                Use "-mt-8" para subir mais, ou "-mt-3" para descer mais. (Foi reduzido de -10 para -5 para descer o avatar)
              - w-[84px] h-[84px]: Controla o tamanho (largura e altura) da foto de perfil.
              - object-cover: Garante que a foto preencha o círculo sem distorcer.
          */}
          <div className="-mt-7 mb-4 flex items-end gap-3">
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
              <h1 className="text-[14px] font-medium text-slate-601 leading-tight">Nayara Assunção</h1>
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
            <p className="text-sm font-bold text-foreground mb-1">{t("popup_payments")}</p>
            <p className="text-xs text-muted-foreground mb-1">{t("popup_value")}</p>
            <p className="text-xl font-bold text-foreground">{planPrice}</p>
            <p className="text-[10px] text-muted-foreground">{planLabel}</p>
          </div>

          {/* INICIO AJUSTE - Botão Pix (mesmo estilo gradient-orange-btn dos botões do site) */}
          <button
            onClick={() => handleCheckout("pix")}
            className="gradient-orange-btn w-full flex items-center justify-center gap-2 px-5 py-[12px] rounded-full text-foreground font-medium text-sm hover:brightness-105 active:scale-[0.98] transition-all mb-4"
          >
            {t("popup_pay_pix")}
          </button>

          {/* Divisor */}
          <div className="border-t border-border/40 mb-4 mt-1" />

          {/* 1º: Pagar com Cartão (Fundo azulado-branco, sem contorno) */}
          <button
            onClick={() => handleCheckout("cartao")}
            className="w-full flex items-center justify-center gap-2 py-[12px] rounded-full bg-[#f8fbff] text-foreground font-medium text-sm hover:bg-[#f0f5ff] active:scale-[0.98] transition-all mb-4"
          >
            {t("popup_pay_card")}
          </button>

          {/* 2º: Pagar com Apple Pay (Fundo azulado-branco, sem contorno) */}
          <button
            onClick={() => handleCheckout("apple")}
            className="w-full flex items-center justify-center gap-2 py-[12px] rounded-full bg-[#f8fbff] text-foreground font-medium text-sm hover:bg-[#f0f5ff] active:scale-[0.98] transition-all mb-4"
          >
            <svg
              width="18"
              height="18"
              viewBox="-3.5 -2 24 24"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="xMinYMin"
              style={{ transform: `translate(${APPLE_PAY_ICON_OFFSET_X}px, ${APPLE_PAY_ICON_OFFSET_Y}px)` }}
            >
              <path d="M13.623 10.627c-.025-2.533 2.066-3.748 2.159-3.808-1.175-1.72-3.005-1.955-3.657-1.982-1.557-.158-3.039.917-3.83.917-.788 0-2.008-.894-3.3-.87C3.299 4.909 1.734 5.87.86 7.39c-1.764 3.06-.452 7.595 1.267 10.077.84 1.215 1.842 2.58 3.157 2.53 1.266-.05 1.745-.819 3.276-.819 1.531 0 1.962.82 3.302.795 1.363-.026 2.226-1.239 3.06-2.457.965-1.41 1.362-2.775 1.386-2.845-.03-.013-2.658-1.02-2.684-4.045zm-2.518-7.433c.698-.847 1.169-2.022 1.04-3.194C11.14.04 9.921.67 9.2 1.515c-.647.75-1.214 1.945-1.062 3.094 1.122.088 2.268-.57 2.967-1.415z" />
            </svg>
            {t("popup_pay_apple")}
          </button>

          {/* 3º: Recarregar Carteira */}
          <div className="relative mt-6 mb-3">
            <div
              className="absolute z-10 bg-white rounded-full shadow-sm flex items-center justify-center"
              style={{
                top: `${CARTEIRA_BADGE_OFFSET_Y}px`,
                left: `${CARTEIRA_BADGE_OFFSET_X}px`,
                border: `${CARTEIRA_BADGE_BORDER_WIDTH} solid #f08143`,
                padding: '2px 8px',
                height: '18px'
              }}
            >
              <span className="text-[9px] font-bold text-[#f08143] leading-[1] whitespace-nowrap">Carteira</span>
            </div>
            <button
              onClick={() => handleCheckout("carteira")}
              className="w-full flex items-center justify-center gap-2.5 py-[12px] rounded-full bg-black text-white font-medium text-sm hover:bg-black/90 active:scale-[0.98] transition-all"
            >
              <span>Recarregar</span>
              <svg
                width="20"
                height="16"
                viewBox="0 0 20 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="flex-shrink-0"
                style={{ transform: `translateX(${CARTEIRA_ICON_OFFSET_X}px)` }}
              >
                <path
                  d="M14.841 11.3789H5.1583C2.58604 11.3789 0.5 9.29351 0.5 6.72059V4.6583C0.5 4.57979 0.511215 4.50458 0.5 4.42674C0.622049 1.96333 2.66455 0 5.1583 0H14.841C17.3368 0 19.3799 1.95872 19.4993 4.42542C19.4947 4.50129 19.4993 4.58177 19.4993 4.65896V6.72125C19.4993 9.29417 17.4133 11.3795 14.841 11.3795V11.3789Z"
                  fill="#F68D3D"
                />
                <path
                  d="M0.5 4.42419C4.79875 4.72833 7.96806 5.63412 10.1075 6.43173C11.6559 7.00899 13.1568 7.71291 15.0548 7.36392C17.1204 6.98392 18.5929 5.551 19.5 4.42419V12.0783C19.5 12.0783 19.5 15.8031 15.7778 15.8031H4.13837C4.13837 15.8031 0.5 15.8031 0.5 12.1001V4.42419Z"
                  fill="#F4EBE2"
                />
              </svg>
              <span></span>
            </button>
          </div>

          {/* 4º: Google Pay */}
          <button
            onClick={() => handleCheckout("google")}
            className="w-full flex items-center justify-center gap-[8px] py-[12px] rounded-full bg-black text-white font-medium text-sm hover:bg-black/90 active:scale-[0.98] transition-all mb-6"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="20px" height="20px">
              <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z" />
              <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z" />
              <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z" />
              <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z" />
            </svg>
            <span
              style={{
                fontFamily: "'Outfit', sans-serif",
                fontWeight: 300,
                fontSize: '19px',
                letterSpacing: '-0.2px',
                display: 'inline-block',
                transform: `translateX(${GOOGLE_PAY_TEXT_OFFSET_X}px) scaleY(1.1)`,
                lineHeight: '1',
                verticalAlign: 'middle'
              }}
            >
              Pay
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
