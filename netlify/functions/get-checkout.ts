import { Handler } from "@netlify/functions";

export const handler: Handler = async (event) => {
  const planId = event.queryStringParameters?.plan;

  let url = "";

  switch (planId) {
    case "plan_1month":
      url = process.env.LINK_CHEKOUT_18_99 || "";
      break;
    case "plan_1year":
      url = process.env.LINK_CHEKOUT_31_99 || "";
      break;
    case "plan_lifetime":
      url = process.env.LINK_CHEKOUT_49_99 || "";
      break;
    default:
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "Invalid plan ID" }),
      };
  }

  if (!url) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Checkout URL not configured" }),
    };
  }

  return {
    statusCode: 200,
    body: JSON.stringify({ url }),
  };
};
