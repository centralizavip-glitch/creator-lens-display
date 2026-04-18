import { Handler } from "@netlify/functions";

export const handler: Handler = async (event) => {
  // SEGURANÇA: Verifica se a requisição vem do seu domínio original
  const referer = event.headers.referer || "";
  const meuDominio = "prjvacy.netlify.app";

  // Só bloqueia se não estiver em ambiente de teste local
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
