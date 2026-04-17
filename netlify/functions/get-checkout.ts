import { Handler } from "@netlify/functions";

export const handler: Handler = async (event) => {
  const planId = event.queryStringParameters?.id; // Mudei para 'id' para ser genérico

  let url = "";

  switch (planId) {
    case "p1": // Use nomes genéricos (p1, p2) em vez de "1month" para confundir
      url = process.env.LINK_CHEKOUT_18_99 || "";
      break;
    case "p2":
      url = process.env.LINK_CHEKOUT_31_99 || "";
      break;
    case "p3":
      url = process.env.LINK_CHEKOUT_49_99 || "";
      break;
    case "tg": // Seu link do Telegram aqui
      url = process.env.LINK_TELEGRAM || "";
      break;
    default:
      return { statusCode: 404, body: "Not Found" };
  }

  return {
    statusCode: 200,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ url }),
  };
};
