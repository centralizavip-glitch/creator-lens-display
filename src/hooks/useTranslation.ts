import { useState, useCallback } from "react";

type Lang = "pt" | "en" | "es";

function getOrCreateGiveawayDateTimestamp(): number | null {
  if (typeof window === "undefined") return null;
  try {
    const existingGiveaway = window.localStorage.getItem("giveawayDate");
    if (existingGiveaway) {
      const giveawayTs = Number(existingGiveaway);
      if (Number.isFinite(giveawayTs) && giveawayTs > 0) {
        const existingFirstSeen = window.localStorage.getItem("firstSeenAt");
        if (!existingFirstSeen) {
          const approxFirstSeenAt = giveawayTs - 4 * 24 * 60 * 60 * 1000;
          window.localStorage.setItem("firstSeenAt", String(approxFirstSeenAt));
        }
        return giveawayTs;
      }
    }

    const firstSeenAt = Date.now();
    const giveawayDate = new Date(firstSeenAt);
    giveawayDate.setDate(giveawayDate.getDate() + 4);

    window.localStorage.setItem("firstSeenAt", String(firstSeenAt));
    window.localStorage.setItem("giveawayDate", String(giveawayDate.getTime()));

    return giveawayDate.getTime();
  } catch {
    return null;
  }
}

function formatGiveawayDate(ts: number, lang: Lang): string {
  const date = new Date(ts);
  if (lang === "en") {
    return date.toLocaleDateString("en-US", {
      month: "long",
      day: "2-digit",
      year: "numeric",
    });
  }

  return date.toLocaleDateString(lang === "pt" ? "pt-BR" : "es-ES", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}

const dict: Record<Lang, Record<string, string>> = {
  pt: {
    bio: "Oi amores! Sejam bem-vindos ao meu cantinho exclusivo. Aqui voces vao encontrar conteudos especiais, fotos e videos que nao posto em nenhum outro lugar. Espero que gostem! Sorteio dia {giveawayDate}.",
    read_more: "Ler mais",
    read_less: "Ler menos",
    subscriptions: "Assinaturas",
    promotions: "Promoções",
    posts: "Postagens",
    media: "Mídias",
    all: "Todos",
    photos: "Fotos",
    videos: "Vídeos",
    paid: "Pagos",
    accept: "Aceitar",
    cookie_text:
      "Privacy utiliza cookies e tecnologias similares para fornecer, manter e melhorar nossos servi\u00e7os. Se voc\u00ea aceitar, usaremos esses dados para personaliza\u00e7\u00e3o e an\u00e1lises associadas. Para mais informa\u00e7ões, leia nossa Política de Privacidade.",
    month: "mês",
    year: "ano",
    lifetime: "Vitalício (83% OFF)",
    plan_1m: "1 mês (54% OFF)",
    plan_1y: "1 ano (54% OFF)",
    plan_life: "Vitalício (83% OFF)",
    offer_title: "Oferta de Assinatura",
    offer_scarcity: "Restam {n} vagas nesse valor",
    offer_ends: "Termina em {t}",
    offer_valid: "Oferta válida até {d}",
    original_price_label: "Preço original {p}",
    save_badge: "Economize 83%",
  },

  en: {
    bio: "Hey babes! Welcome to my exclusive corner. I'm sharing special content, photos, and videos here that you won't see anywhere else. I hope you love it! Giveaway on {giveawayDate}.",
    read_more: "Read more",
    read_less: "Read less",
    subscriptions: "Subscriptions",
    promotions: "Promotions",
    posts: "Posts",
    media: "Media",
    all: "All",
    photos: "Photos",
    videos: "Videos",
    paid: "Paid",
    accept: "Accept",
    cookie_text: "We use cookies to improve your experience.",
    month: "month",
    year: "year",
    lifetime: "Lifetime (83% OFF)",
    plan_1m: "1 month (54% OFF)",
    plan_1y: "1 year (54% OFF)",
    plan_life: "Lifetime (83% OFF)",
    offer_title: "Subscription Offer",
    offer_scarcity: "Only {n} subscriptions left at this price",
    offer_ends: "Ends in {t}",
    offer_valid: "Offer valid until {d}",
    original_price_label: "Original price {p}",
    save_badge: "Save 83%",
  },
  es: {
    bio: "¡Hola cariños! Bienvenidos a mi espaço VIP. Aquí les comparto fotos y videos exclusivos que no verán en mis outras redes. ¡Disfrútenlo mucho! Sorteo el {giveawayDate}.",
    read_more: "Leer más",
    read_less: "Leer menos",
    subscriptions: "Suscripciones",
    promotions: "Promociones",
    posts: "Publicaciones",
    media: "Medios",
    all: "Todos",
    photos: "Fotos",
    videos: "Videos",
    paid: "Pagos",
    accept: "Aceptar",
    cookie_text: "Usamos cookies para mejorar su experiencia.",
    month: "mes",
    year: "año",
    lifetime: "Vitalicio (83% OFF)",
    plan_1m: "1 mes (54% OFF)",
    plan_1y: "1 año (54% OFF)",
    plan_life: "Vitalicio (83% OFF)",
    offer_title: "Oferta de suscripción",
    offer_scarcity: "Quedan {n} suscripciones a este preço",
    offer_ends: "Termina em {t}",
    offer_valid: "Oferta válida hasta {d}",
    original_price_label: "Precio original {p}",
    save_badge: "Ahorra un 83%",
  },
};

export function useTranslation() {
  const [lang, setLang] = useState<Lang>("pt");

  const t = useCallback(
    (key: string) => {
      const raw = dict[lang]?.[key] ?? key;
      if (key !== "bio" || !raw.includes("{giveawayDate}")) return raw;

      const giveawayTs = getOrCreateGiveawayDateTimestamp();
      if (!giveawayTs) return raw.replace("{giveawayDate}", "");

      return raw.replace("{giveawayDate}", formatGiveawayDate(giveawayTs, lang));
    },
    [lang],
  );

  return { lang, setLang, t };
}
