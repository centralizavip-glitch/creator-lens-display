import { useState, useCallback } from "react";

type Lang = "pt" | "en" | "es";

const dict: Record<Lang, Record<string, string>> = {
  pt: {
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
    cookie_text: "Privacy utiliza cookies e tecnologias similares para fornecer, manter e melhorar nossos servi\u00e7os. Se voc\u00ea aceitar, usaremos esses dados para personaliza\u00e7\u00e3o e an\u00e1lises associadas.",
    month: "mês",
    year: "ano",
    lifetime: "Vitalício",
    plan_1m: "1 mês (54% OFF)",
    plan_1y: "1 ano",
    plan_life: "Vitalício",
  },
  en: {
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
    lifetime: "Lifetime",
    plan_1m: "1 month (54% OFF)",
    plan_1y: "1 year",
    plan_life: "Lifetime",
  },
  es: {
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
    lifetime: "Vitalicio",
    plan_1m: "1 mes (54% OFF)",
    plan_1y: "1 año",
    plan_life: "Vitalicio",
  },
};

export function useTranslation() {
  const [lang, setLang] = useState<Lang>("pt");

  const t = useCallback(
    (key: string) => dict[lang]?.[key] ?? key,
    [lang]
  );

  return { lang, setLang, t };
}
