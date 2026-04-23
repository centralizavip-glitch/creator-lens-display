import { Handler } from "@netlify/functions";

export const handler: Handler = async (event) => {
  
  const referer = event.headers.referer || "";
  const meuDominio = "www.privacy-br.com";

  
  if (process.env.NODE_ENV === "production" && !referer.includes(meuDominio)) {
    return {
      statusCode: 403,
      body: JSON.stringify({ error: "Acesso não autorizado" }),
    };
  }

  const planId = event.queryStringParameters?.id;
  const method = event.queryStringParameters?.method;
  let url = "";

  switch (planId) {
    case "p1":
      if (method === "cartao") url = process.env.LINK_CHEKOUT_CARTAO_18_99 || "";
      else if (method === "apple") url = process.env.LINK_CHEKOUT_APPLE_18_99 || "";
      else if (method === "google") url = process.env.LINK_CHEKOUT_GOOGLE_18_99 || "";
      else if (method === "carteira") url = process.env.LINK_CHEKOUT_CARTEIRA_18_99 || "";
      else url = process.env.LINK_CHEKOUT_18_99 || "";
      break;
    case "p2":
      if (method === "cartao") url = process.env.LINK_CHEKOUT_CARTAO_31_99 || "";
      else if (method === "apple") url = process.env.LINK_CHEKOUT_APPLE_31_99 || "";
      else if (method === "google") url = process.env.LINK_CHEKOUT_GOOGLE_31_99 || "";
      else if (method === "carteira") url = process.env.LINK_CHEKOUT_CARTEIRA_31_99 || "";
      else url = process.env.LINK_CHEKOUT_31_99 || "";
      break;
    case "p3":
      if (method === "cartao") url = process.env.LINK_CHEKOUT_CARTAO_49_99 || "";
      else if (method === "apple") url = process.env.LINK_CHEKOUT_APPLE_49_99 || "";
      else if (method === "google") url = process.env.LINK_CHEKOUT_GOOGLE_49_99 || "";
      else if (method === "carteira") url = process.env.LINK_CHEKOUT_CARTEIRA_49_99 || "";
      else url = process.env.LINK_CHEKOUT_49_99 || "";
      break;
    case "tg":
      url = process.env.LINK_TELEGRAM || "";
      break;
    default:
      return {
        statusCode: 404,
        body: JSON.stringify({ error: "Plano não encontrado" }),
      };
  }

  if (!url) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "URL não configurada no ambiente" }),
    };
  }

  return {
    statusCode: 200,
    headers: { 
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "https://www.privacy-br.com" // Permite apenas o seu domínio oficial
    },
    body: JSON.stringify({ url }),
  };
};
