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
  let url = "";

  switch (planId) {
    case "p1":
      url = process.env.LINK_CHEKOUT_18_99 || "";
      break;
    case "p2":
      url = process.env.LINK_CHEKOUT_31_99 || "";
      break;
    case "p3":
      url = process.env.LINK_CHEKOUT_49_99 || "";
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
        "Access-Control-Allow-Origin": "*" // Permite que o seu front acesse a função
    },
    body: JSON.stringify({ url }),
  };
};
