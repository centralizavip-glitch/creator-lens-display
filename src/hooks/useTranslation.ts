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
    bio: "Oi amor, sou a Nayara, tenho 18 anos 💋 Quer participar do sorteio e gravar comigo dia {giveawayDate}? Assina meu Privacy pra participar 😘 Conteúdo 100% EXPL!C!TO 🔞 Vídeos com meu primo dotado, inc3sto, oral guloso, bucetinha apertada, dando o cuzinho e tomando leitinho dentro 🤤💦 Vários vídeos longos dando a b*c3tinha e o c*z!nho até meu primo g0z4r dentro, de lado, sexo oral. Tem um vídeo que é um dos mais curtidos do meu Privacy, bem quente de anal com meu padrastro, você vai g0z4r muito 😈 Só para maiores de 18 anos.",
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
    bio: "Hey babe, I’m Nayara, I’m 18 💋 Want to join the giveaway and film with me on {giveawayDate}? Subscribe to my Privacy to participate 😘 100% EXPL!C!T content 🔞 Videos with my hung cousin, inc3st, sloppy oral, tight pussy, taking it in the ass and getting creampied 🤤💦 Lots of long videos fucking my p*ssy and *ss until my cousin c*ms inside, sideways, blowjobs. There’s one of the most liked videos in my Privacy — a super hot anal with my stepdad, you’re gonna cum so hard 😈 Only for 18+.",
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
    bio: "Hola amor, soy Nayara, tengo 18 años 💋 ¿Quieres participar del sorteio y grabar conmigo el día {giveawayDate}? Suscríbete a mi Privacy para participar 😘 Contenido 100% EXPL!C!TO 🔞 Videos con mi primo dotado, inc3sto, oral guloso, conchita apretada, dando el culito y recibiendo lechita adentro 🤤💦 Varios videos largos dando la c*chita y el c*lito hasta que mi primo se c*rra dentro, de ladito, sexo oral. Hay un video que es de los más liked de mi Privacy, bien caliente de anal con mi padrastro, te vas a correr mucho 😈 Solo para mayores de 18 años.",
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
